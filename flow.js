console.log("flow.js")

let scl = 20,
	inc = 0.01,
	cols,
	rows,
	particles = [],
	flowfield = []

class Particle {
	constructor() {
		this.pos = createVector(0, 0)
		this.vel = createVector(0, 0)
		this.acc = createVector(0, 0)
	}

	update() {
		this.pos.add(this.vel)
		this.vel.add(this.acc)
		this.acc.mult(0)
	}

	applyForce(force) {

		this.acc.add(force)

	}

	display() {

	}

	follow() {
		
	}

}



function setup() {
	createCanvas(windowWidth, windowHeight)

	cols = floor(width / scl)
	rows = floor(height / scl)

}

let t = 0

function draw() {
	background(220)


	let yoff = 0
	for (let x = 0; x < cols; x++) {
		let xoff = 0
		for (let y = 0; y < rows; y++) {

			noiseDetail(2, 1.8)
			let n = noise(xoff, yoff)
			let angle = n * TWO_PI
			let v = p5.Vector.fromAngle(angle)
			xoff += inc

			stroke(n * 56, n * 128, n * 25, n * 255)

			push()
			translate(x * scl, y * scl)
			rotate(v.heading())
			line(0, 0, scl, 0)
			pop()

		}
		yoff += inc

	}


}