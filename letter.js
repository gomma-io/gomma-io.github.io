class Letter {
  constructor(text, position, rotation) {
    // this is the setup!
    this.text = text
    this.position = position
    this.rotation = rotation
  }

  draw() {
    textSize(48)
    textFont("Kade")
    textAlign(CENTER, CENTER)
    noStroke()
    fill("#fcfcfc")

    push()
    translate(this.position.x, this.position.y)
    rotate(this.rotation)
    text(this.text, 0, 0)
//     imageMode(CENTER)
//     image(this.text, 0, 0, this.text.width / 2, this.text.height / 2)
    pop()

  }
}
