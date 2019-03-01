
let yScale = 200

const mountains = []

class Mountain {
  constructor(color, y) {
   this.c = color
   this.y = y
   this.offset = random(100, 200)
  }

  display() {
    let xoff = 0

    noStroke()
    fill(this.c)

    noiseDetail(1.5, .7)

    beginShape()
      for (let x = 0; x <= width + 25; x+=25) {
        let yoff = map(noise(xoff + this.offset), 0, 1, 0, yScale) 
        let y = this.y - yoff
        vertex(x, y)

        xoff += .08  
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
    mountains.push(m)
  })
}


function setup() {
  createCanvas(windowWidth, windowHeight)
  growMountains()
}


function draw() {
  background(220)
  mountains.forEach( m => {
    m.display()
  })

}

