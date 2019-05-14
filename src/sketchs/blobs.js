
let blobsArray = []
export default function blobs (p) {
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight)
    generateBlobs(p)
  }

  p.draw = function () {
    p.clear()
    p.background(220)
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
    p.fill(this.c)
    p.translate(this.x, this.y)

    this.s = p.lerp(this.s, 1, 0.07)
    p.scale(this.s)

    p.noiseDetail(1, 0.8)
    p.beginShape()
    for (let i = 0; i < p.TWO_PI; i += p.radians(1)) {
      let xOff = this.offset * p.cos(i) + this.offset
      let yOff = this.offset * p.sin(i) + this.offset

      let r = 200 + p.map(p.noise(xOff, yOff, this.t), 0, 1, -this.scale, this.scale)
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

  const offset = p.random(0.2, 0.8)

  new Array(4).fill(1).map((_, i) => {
    const scale = p.random(20, 80)

    const x = (p.windowWidth / 2 * (i % 2)) + p.random(0, 500)
    const y = (p.windowHeight / 2 * (i % 2)) + p.random(0, 500)

    const tSpeed = p.random(0.02, 0.1)
    const color = colors[i % 4]

    let blob = new Blob(offset, scale, x, y, tSpeed, color)
    console.log('blob', blobsArray)
    blobsArray.push(blob)
  })
}
