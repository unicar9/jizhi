
let blobsArray = []
export default function blobs (p) {
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight)
    generateBlobs(p)
  }

  p.draw = function () {
    p.clear()
    p.background(230)
    p.noStroke()

    blobsArray.forEach(blob => blob.display(p))
  }

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight)
  }

  p.myCustomRedrawAccordingToNewPropsHandler = function (newProps) {
    !newProps.isPlaying ? p.frameRate(0) : p.frameRate(30)
  }
}

class Blob {
  constructor (offset, scale, x, y, tSpeed, color) {
    this.offset = offset
    this.scale = scale
    this.x = x
    this.y = y
    this.tSpeed = tSpeed
    this.c = color
    this.t = 0
    this.s = 0
  }

  display (p) {
    p.push()
    let color = p.color(this.c)
    color.setAlpha(230)
    p.fill(color)
    p.translate(this.x, this.y)

    this.s = p.lerp(this.s, 1, 0.07)
    p.scale(this.s)

    p.noiseDetail(2, 0.9)
    p.beginShape()
    for (let i = 0; i < p.TWO_PI; i += p.radians(1)) {
      let xOff = this.offset * p.cos(i) + this.offset
      let yOff = this.offset * p.sin(i) + this.offset

      let r = 230 + p.map(p.noise(xOff, yOff, this.t), 0, 1, -this.scale, this.scale)
      let x = r * p.cos(i)
      let y = r * p.sin(i)

      p.vertex(x, y)
    }
    p.endShape()
    this.t += this.tSpeed
    p.pop()
  }
}

function generateBlobs (p) {
  const colors = ['#1383d8', '#53ace2', '#6e6cd1', '#fcd09f']

  const offset = p.random(0.2, 0.9)

  new Array(4).fill(1).map((_, i) => {
    const scale = p.random(20, 60)

    const x = (i % 2) ? (p.width / 4 + p.random(-300, 0)) : (p.width / 4 * 3 + p.random(0, 300))
    const y = (i < 2) ? (p.height / 4 + p.random(-100, 0)) : (p.height / 4 * 3 + p.random(0, 100))

    const tSpeed = p.random(0.02, 0.06)
    const color = colors[i % 4]

    let blob = new Blob(offset, scale, x, y, tSpeed, color)
    blobsArray.push(blob)
  })
}
