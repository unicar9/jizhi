import React from 'react'
import { Text } from 'evergreen-ui'

const Legal = () => (
  <div style={{ height: 50 }}>
    <Text margin={20} lineHeight='50px' color='muted'>
      本扩展使用了
      <a href='https://www.jinrishici.com/' target='_blank' rel='noopener noreferrer'>今日诗词 API </a>
      与
      <a href='https://github.com/pwxcoo/chinese-xinhua' target='_blank' rel='noopener noreferrer'> Github 新华字典数据库</a>
    </Text>
  </div>
)

export default Legal
