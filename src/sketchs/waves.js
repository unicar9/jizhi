import { wavesColors } from '../utils/colors'

export default function waves (p) {
  let mountains = []

  console.log('Waveeeeee')

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight)
    growMountains(p, mountains)
    p.background(230)
    mountains.forEach(m => m.display(p))
  }

  p.draw = function () {
    p.background(230)
    mountains.forEach(m => m.display(p))
  }

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight)
  }

  p.myCustomRedrawAccordingToNewPropsHandler = function (newProps) {
    !newProps.isPlaying ? p.frameRate(0) : p.frameRate(30)
  }
}

class Mountain {
  constructor (color, y, p) {
    this.c = color
    this.y = y
    this.offset = p.random(100, 200)
    this.t = 0
  }

  display (p) {
    let xoff = 0

    p.noStroke()
    p.fill(this.c)

    p.noiseDetail(1.7, 1.3)

    p.beginShape()
    for (let x = 0; x <= p.width + 25; x += 25) {
      let yoff = p.map(
        p.noise(xoff + this.offset, this.t + this.offset),
        0,
        1,
        0,
        200
      )
      let y = this.y - yoff
      p.vertex(x, y)

      xoff += 0.08
    }
    p.vertex(p.width + 100, p.height)
    p.vertex(0, p.height)
    p.endShape(p.CLOSE)

    this.t += 0.005
  }
}

function growMountains (p, mountains) {
  let colorSelected = p.random(wavesColors)
  let c = p.color(colorSelected.hexcode)

  // document.getElementById('color-name').innerText = colorSelected.name

  new Array(5).fill(1).map((_, i) => {
    let a = 255 - 50 * i
    c.setAlpha(a)
    let h = p.height - 50 * i
    let m = new Mountain(c, h, p)
    mountains.push(m)
  })
}
