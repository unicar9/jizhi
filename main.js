
let offScale = 100

class Mountain {
  constructor(color, y) {
   this.c = color
   this.y = y
   this.xoff = random(100, 200)
  }

  display() {
    let xoff1 = 0

    noStroke()
    fill(this.c)

    noiseDetail(1.5, .7)

    beginShape()
      for (let x1 = 0; x1 <= width + 25; x1+=25) {
        let y1off = map(noise(xoff1 + this.xoff), 0, 1, 0, 200) 
        let y1 = this.y - y1off
        vertex(x1, y1)
        xoff1 += .08  
      }
      vertex(width + 100, height)
      vertex(0, height)
    endShape(CLOSE)
  }

}

function growMountains() {
  new Array(5).fill(1).map((_, i) => {
    let a = 255 - 50 * i
    let c = color(44, 150, 120, a)
    // let c = color(15, 89, 164, a)
    let h = height - 50 * i
    let m = new Mountain(c, h)
    m.display()
  })
}


function setup() {
  createCanvas(windowWidth, windowHeight)
  background(220)
  growMountains()
}


function draw() {

}

