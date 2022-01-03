let line
let lastPoint
let letters
let choices
let choiceNum

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
  choices = "My business idea     ".split("")
  choiceNum = 0

  line = new Snake(choices.length)
}

function draw() {
  background("#6943FF")

  line.draw()

  letters.forEach(letter => {
    letter.draw()
  })
}

function mouseMoved() {
  let currentPoint = createVector(mouseX, mouseY)

  let distance = 10000
  if (lastPoint) {
    distance = p5.Vector.dist(lastPoint, currentPoint)
  }

  let rotation = 0
  if (lastPoint) {
    let diffVector = currentPoint.copy().sub(lastPoint)
    rotation = diffVector.heading()
  }

  if (distance > 35) {
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
