import blobsColors from '../constants/colors';

export default function blobs(p) {
  const blobsArray = [];
  const colors = p.random(blobsColors);

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    generateBlobs(p, blobsArray, colors);
  };

  p.draw = function () {
    p.clear();
    p.background(230);
    p.noStroke();

    blobsArray.forEach((blob) => blob.display(p));
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.mousePressed = function () {
    generateBlobs(p, blobsArray, colors, p.mouseX, p.mouseY);
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function (newProps) {
    !newProps.isPlaying ? p.frameRate(0) : p.frameRate(30);
  };
}

class Blob {
  constructor(radius, offset, scale, x, y, tSpeed, color) {
    this.radius = radius;
    this.offset = offset;
    this.scale = scale;
    this.x = x;
    this.y = y;
    this.tSpeed = tSpeed;
    this.c = color;
    this.t = 0;
    this.s = 0;
  }

  display(p) {
    p.push();
    const color = p.color(this.c);
    color.setAlpha(230);
    p.fill(color);
    p.translate(this.x, this.y);

    this.s = p.lerp(this.s, 1, 0.07);
    p.scale(this.s);

    p.noiseDetail(2, 0.9);
    p.beginShape();
    for (let i = 0; i < p.TWO_PI; i += p.radians(1)) {
      const xOff = this.offset * p.cos(i) + this.offset;
      const yOff = this.offset * p.sin(i) + this.offset;

      const r = this.radius + p.map(p.noise(xOff, yOff, this.t), 0, 1, -this.scale, this.scale);
      const x = r * p.cos(i);
      const y = r * p.sin(i);

      p.vertex(x, y);
    }
    p.endShape();
    this.t += this.tSpeed;
    p.pop();
  }
}

function generateBlobs(p, blobsArray, colors, positionX = null, positionY = null) {
  const offset = p.random(0.2, 0.6);

  if (positionX && positionY) {
    const scale = p.random(20, 40);

    const tSpeed = p.random(0.02, 0.05);
    const color = p.random(colors);

    const blob = new Blob(70, offset, scale, positionX, positionY, tSpeed, color);
    blobsArray.push(blob);
  } else {
    new Array(4).fill(1).map((_, i) => {
      const scale = p.random(20, 60);

      const x = i % 2 ? p.width / 4 + p.random(-200, 0) : (p.width / 4) * 3 + p.random(0, 200);
      const y = i < 2 ? p.height / 4 + p.random(-200, 0) : (p.height / 4) * 3 + p.random(0, 200);

      const tSpeed = p.random(0.02, 0.06);
      const color = colors[i % 4];

      const blob = new Blob(250, offset, scale, x, y, tSpeed, color);
      blobsArray.push(blob);
    });
  }
}
