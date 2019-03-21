
class Mountain {
    constructor(color, y) {
        this.c = color
        this.y = y
        this.offset = random(100, 200)
        this.t = 0
    }
  
    display() {
        let xoff = 0
    
        noStroke()
        fill(this.c)
    
        noiseDetail(1.7, .8)
    
        beginShape()
            for (let x = 0; x <= width + 25; x += 25) {
                let yoff = map(noise(xoff + this.offset, this.t + this.offset), 0, 1, 0, yScale) 
                let y = this.y - yoff
                vertex(x, y)
        
                xoff += .08  
            }
            vertex(width + 100, height)
            vertex(0, height)
        endShape(CLOSE)

        if (isMoving) {
            this.t += 0.003
        }
    }
  
  }
  
function growMountains() {
    let colorSelected = random(colors)
    let c = color(colorSelected.hexcode)

    let cName = colorSelected.name
    document.querySelector('.colorName').innerHTML = cName

    new Array(5).fill(1).map((_, i) => {
        let a = 255 - 50 * i
        c.setAlpha(a)
        let h = height - 50 * i
        let m = new Mountain(c, h)
        mountains.push(m)
    })
}

const colors = [
    {
        name: '黛紫',
        hexcode: '#574266'
    },
    {
        name: '青矾绿',
        hexcode: '#2c9678'
    },
    {
        name: '赭',
        hexcode: '#9c5333'
    },
    {
        name: '飞燕草蓝',
        hexcode: '#0f59a4'
    },
    {
        name: '胭脂',
        hexcode: '#c03f3c'
    },
    {
        name: '鹅冠红',
        hexcode: '#d11a2d'
    },
    {
        name: '尖晶玉红',
        hexcode: '#cc163a'
    },
    {
        name: '北瓜黄',
        hexcode: '#fc8c23'
    },
    {
        name: '蔻梢绿',
        hexcode: '#5dbe8a'
    },
    {
        name: '枯绿',
        hexcode: '#b78d12'
    },
    {
        name: '宝蓝',
        hexcode: '#4B5CC4'
    },
    {
        name: '枇杷黄',
        hexcode: '#fca106'
    },
    {
        name: '苍蓝',
        hexcode: '#134857'
    },
    {
        name: '玄青',
        hexcode: '#3D3B4F'
    },
    {
        name: '嫩菱红',
        hexcode: '#de3f7c'
    }
]