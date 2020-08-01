import domtoimage from 'retina-dom-to-image'

export const saveBackground = () => {
  const node = document.getElementById('root')
  const githubLink = 'https://github.com/unicar9/jizhi/issues'
  domtoimage.toPng(node)
    .then(function (dataUrl) {
      var link = document.createElement('a')
      link.download = 'jizhi.png'
      link.href = dataUrl
      link.click()
    })
    .catch(function (error) {
      console.error(`截图失败，联系我们: ${githubLink}`, error)
    })
}

/*
    filter out Chinese chars:
    。  \u3002
    ，  \uff0c
    、  \u3001
    ？  \uff1f
    ！  \uff01
*/
export const pureWords = (sentense = '') => {
  const regex = /[\u3002|\uff0c|\u3001|\uff1f|\uff01]/gi
  return sentense.replace(regex, ' ')
}

export const cleanIdioms = (idiom = '') => {
  const regex = /[\u201D]/gi
  return idiom.replace(regex, '')
}

export const cleanExample = (example = '', word = '') => {
  if (example === '无') {
    return ''
  } else {
    return example.replace('～', word)
  }
}
