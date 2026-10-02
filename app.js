let line
let lastPoint
let letters
let choices
let choiceNum
let letterSize
let lastInput
let autoTime
let autoPoint
let reduceMotion

function preload() {
  // choices = [
  //   loadImage("project-1.jpg"),
  //   loadImage("project-2.jpg"),
  //   loadImage("project-3.jpg"),
  //   loadImage("project-4.jpg"),
  //   loadImage("project-1.jpg"),
  //   loadImage("project-2.jpg"),
  //   loadImage("project-3.jpg"),
  //   loadImage("project-4.jpg")
  // ]
}

function setup() {
  createCanvas(windowWidth, windowHeight)

  letters = []
  choices = "GOMMA is an interaction design studio based in London     ".split("")
  choiceNum = 0
  letterSize = width < 600 ? 34 : 48
  lastInput = -Infinity
  autoTime = 0
  reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  line = new Snake(choices.length)

  // pointer events cover mouse, touch and pen alike
  window.addEventListener("pointerdown", pointerMoved)
  window.addEventListener("pointermove", pointerMoved)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  letterSize = width < 600 ? 34 : 48
}

function draw() {
  background("#6943FF")

  // nobody is drawing: write the sentence along a figure of eight
  if (!reduceMotion && millis() - lastInput > 4000) {
    autoTime = autoTime + 0.012
    let across = width > height ? 1 : 2
    let target = createVector(
      width / 2 + sin(autoTime * across) * width * 0.36,
      height / 2 + sin(autoTime * (3 - across)) * height * 0.33
    )

    // glide over from wherever the last drawing ended, rather than jumping
    if (!autoPoint) {
      autoPoint = target
    }
    let catchUp = p5.Vector.sub(target, autoPoint).limit(max(width, height) * 0.015)
    autoPoint = p5.Vector.add(autoPoint, catchUp)

    trail(autoPoint)
  }

  line.draw()

  letters.forEach(letter => {
    letter.draw()
  })
}

function pointerMoved(event) {
  lastInput = millis()
  autoPoint = createVector(event.clientX, event.clientY)
  trail(autoPoint)
}

function trail(currentPoint) {
  let distance = 10000
  if (lastPoint) {
    distance = p5.Vector.dist(lastPoint, currentPoint)
  }

  let rotation = 0
  if (lastPoint) {
    let diffVector = currentPoint.copy().sub(lastPoint)
    rotation = diffVector.heading()
  }

  if (distance > letterSize * 0.73) {
    line.push(currentPoint)

    letters.push(
    	new Letter(choices[choiceNum], currentPoint, rotation)
    )
    letters = letters.slice(-1 * choices.length)

    lastPoint = currentPoint

    choiceNum = choiceNum + 1
    if (choiceNum > choices.length - 1) {
      choiceNum = 0
    }
  }
}
