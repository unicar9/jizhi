console.log("flow.js")

let scl = 20, 
	inc = 0.01,
	cols,
	rows,
	particles = [],
	flowfield = []

class Particle {
	constructor() {
		this.pos = createVector(random(width), random(height))
		this.vel = createVector(0, 0)
		this.acc = createVector(0, 0)
		this.maxspeed = 4
	}

	update() {
		this.vel.add(this.acc)
		this.vel.limit(this.maxspeed)
		this.pos.add(this.vel)
		this.acc.mult(0)
	}

	follow(vectors) {
		const x = floor(this.pos.x / scl)
		const y = floor(this.pos.y / scl)
		const index = x + y * cols
		const force = vectors[index]
		this.applyForce(force)
	}

	applyForce(force) {
		this.acc.add(force)
	}

	edges() {
		if (this.pos.x > width) this.pos.x = 0
		if (this.pos.x < 0) this.pos.x = width
		if (this.pos.y > height) this.pos.y = 0
		if (this.pos.y < 0) this.pos.y = height
	}

	display() {
		stroke(0, 5)
		strokeWeight(1)
		point(this.pos.x, this.pos.y)
	}

}

let photo

function preload() {
	photo = loadImage('photo1.jpg')
}

function setup() {
	createCanvas(windowWidth, windowHeight)

	// cols = floor( width / scl )
	// rows = floor( height / scl )

	// fx = img.width + random(width - img.width)
	// fy = img.height + random(height - img.height)

	cols = photo.width
	rows = photo.height

	// for (let x = 0; x < cols; x++) {
	// 	for (let y = 0; y < rows; y++) {
	// 		let c = color(photo.get(x, y))
	// 		fill(c)
	// 		ellipse(x, y, 5, 5)
	// 	}
		
	// }



	flowfield = new Array(cols * rows)

	// new Array(400).fill(1).map((_, i) => {
	// 	particles[i] = new Particle
	// })

}


let t = 0


function draw() {
	// background(220)
	// // image(photo, 0, 0)

	// let yoff = 0
	// for (let x = 0; x < cols; x++) {
	// 	let xoff = 0
	// 	for (let y = 0; y < rows; y++) {

	// 		let index = x + y * cols

	// 		noiseDetail(2, 1.8)
	// 		let n = noise(xoff, yoff, t)
	// 		let angle = n * TWO_PI
	// 		let v = p5.Vector.fromAngle( angle )
	// 		v.setMag(5)
	// 		flowfield[index] = v
	// 		xoff += inc

	// 		let c = color(photo.get(x, y))

	// 		// stroke( n * 56, n * 128, n * 25, n * 255)
	// 		stroke(c)
	// 		strokeWeight(1)

	// 		// push()
	// 		// 	translate( x * scl, y * scl )
	// 		// 	rotate( v.heading() )
	// 		// 	ellipse(0, 0, scl)
	// 		// 	line(0, 0, scl, 0)
	// 		// pop()

	// 		fill(c)
	// 		ellipse(x, y, 5, 5)

	// 	}
	// 	yoff += inc    
	// }

	// t += 0.02

	// particles.forEach(p => {
	// 	p.follow(flowfield)
	// 	p.update()
	// 	p.display()
	// 	p.edges()
	// })  

}