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
