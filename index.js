async function getVerses() {
    const result = await chrome.storage.sync.get(['verses'])
    const verses = await (!result.verses || result.verses.length === 0) ? INITIAL_VERSES : result.verses

    fetchVerses()
    return verses
}

async function fetchVerses() {
    let res = await fetch('https://api.gushi.ci/all.json')
    let verses = await res.json()

    chrome.storage.sync.set({ verses: verses })
}

const INITIAL_VERSES = {
        "author": "王维",
        "content": "红豆生南国，春来发几枝。",
        "origin": "相思"
    }

let yScale = 200,
    font,
    canvas,
    verses

const mountains = []

function preload() {
    font = loadFont('fonts/FZXiJinLJW.TTF')
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight)

    textFont(font)
    textAlign(CENTER, CENTER)

    growMountains()
}
  

function draw() {
    background(230)
    
    fill(0)
    textSize(40)
    text(verses.content, width / 2, height / 3)
    textSize(20)
    text(`${verses.author} 《${verses.origin}》`, width / 2, (height / 3) + 50)
    
    mountains.forEach(m => m.display())
}


window.onload = function () {
    document.querySelector('#save').addEventListener('click', () => {
        saveCanvas(canvas, 'myCanvas', 'jpg')
    })

    getVerses().then((res) => {
        verses = res
    })
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}