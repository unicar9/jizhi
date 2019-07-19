import html2canvas from 'html2canvas'

export const saveBackground = () => {
  const node = document.getElementById('root')
  html2canvas(node).then((canvas) => {
    const dataUrl = canvas.toDataURL('image/png')
    var link = document.createElement('a')
    link.download = 'jizhi.png'
    link.href = dataUrl
    link.click()
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
