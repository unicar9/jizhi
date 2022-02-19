# 几枝 | Jizhi

[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors)

支持自定义新标签页的 Chrome/Firefox/Edge 扩展，几枝将在新标签页上展示中国传统色的层叠波浪动画效果搭配经典诗词。

A Chrome/Firefox extension with custom new tab page featuring Chinese poems and P5.js enabled noise waves in traditional Chinese colors

[Chrome Web Store 地址](https://chrome.google.com/webstore/detail/%E5%87%A0%E6%9E%9D/hfohpokminpknagcgncibpacohagppjn) | [Firefox Add-ons 地址](https://addons.mozilla.org/en-US/firefox/addon/jizhi/) | [Edge Add-ons 地址](https://microsoftedge.microsoft.com/addons/detail/%E5%87%A0%E6%9E%9D/jpfojjhemjbonldgbbfplhnpjdfhlppe)

## 功能请查看[更新日志](./CHANGELOG.md)

---

## 相关创意编程（Creative Coding）教程（我参与哒~）

文字版课程搭配 Web IDE，实例多多，干货多多。很可能是中文全网 p5.js 最系统最实用的教程了。对编程和 Web 开发有兴趣的同学可以学学，应该会有不一样的体会和认识，也欢迎帮忙宣传一下：）

- [p5.js 创意编程之旅 - 蓝桥云课](https://www.lanqiao.cn/courses/3117)

我和国内首次 Processing 社区日的组织者之一 [Ye Qianqian](https://www.qianqian-ye.com/about.html) 也合作录过两个《几枝》相关的迷你视频教程：

- [Guest Tutorial #1: p5.js Noise with Unicar - Youtube](https://www.youtube.com/watch?v=QxsFY2GOhNU&t=3s) | [bilibili](https://www.bilibili.com/video/BV1WJ411K7E4?from=search&seid=11104983032650609196)
- [Guest Tutorial #2: Noise Waves in p5.js with Unicar - Youtube](https://www.youtube.com/watch?v=3E8Kt8Sx_x4&t=11s) | [bilibili](https://www.bilibili.com/video/BV1qJ411w7nJ?from=search&seid=11104983032650609196)

---

## 中文字体说明

几枝目前使用了以下几种字体：

- [江西拙楷体](https://mp.weixin.qq.com/s/H_jrZJIHwNCSyUncVpyXUQ)

江西拙楷体是设计师黄煜臣的个人原创字体，可免费商用。字体本身有一种拙朴憨厚的气质，设计师也想就此推广一下自己的家乡文化。

- [字体圈欣意吉祥宋](https://mp.weixin.qq.com/s/WCwaKtfAiPD8uwSBGU4dNg)

字体圈欣意吉祥宋是设计师邹乐伟的个人原创字体，可免费商用。字体本身是圆润娟秀的感觉，是非常有设计感的宋体。

- [方正细金陵](http://www.foundertype.com/index.php/FontInfo/index/id/202#)

《几枝》从一开始使用了方正细金陵体，该字体支持设计师免费自用，但《几枝》在最初的源代码中附上了字体文件，并且在浏览器扩展中使用应该也超过了“设计师自用”的范畴，算是一种侵权行为。因此《几枝》会在不久的将来将该字体移除，同时探索一个能在不侵权的情况下让大家有更多选择的方案。

对于中文字体的使用，我们纠结了很久，一直没有找到完美的解决方案。中文字体本身字形复杂，设计一套完整的中文字体比英文字体要复杂得多，而且中文字体文件一般比较大，在网页端使用也会造成一些性能上的问题，无论如何，我们都希望在推广中文字体的同时能尊重中文字体设计师的巧思和辛劳。关于中文字体的使用权限有很多类别，有些字体可供个人免费使用，有些字体可用于个人商用但不支持软件的嵌入式使用，我也购买了相关中文字体，但无奈这些有设计感的中文字体都无法在《几枝》中嵌入使用。总的来说，我们希望可以在尊重原创尊重版权的同时，提供更大的自由度和更多的可能性，同时也希望能通过《几枝》推广更多的中文原创字体。

如果大家在字体方面有任何想法和建议，也欢迎随时和我联系：）

---

## Chrome 本地装载

- 下载最新的 release 打包文件，首先运行 `yarn` 再运行 `yarn build` 生成 **builds 文件夹(包含 Chrome 和 Firefox 的 build 文件以及压缩包)**
- 在 Chrome 浏览器里输入 chrome://extensions/ 进入插件管理页面
- 打开右上角开发者模式（Developer mode）
- 点击左上角 **Load unpacked** 按钮并选取刚刚生成的 **build_chrome 文件夹**
- 「几枝」装载成功，打开新标签页试试吧

![jizhi-2.1.0 gif](https://github.com/unicar9/jizhi/blob/master/examples/jizhi-2.1.0.gif)
![jizhi gif](https://github.com/unicar9/jizhi/blob/master/examples/jizhi.gif)

## 示例 - 最新版 2.4.0

![bg-1](https://github.com/unicar9/jizhi/blob/master/examples/jizhi-2.4.0-1.jpeg)
![bg-2](https://github.com/unicar9/jizhi/blob/master/examples/jizhi-2.4.0-2.jpeg)
![bg-3](https://github.com/unicar9/jizhi/blob/master/examples/jizhi-2.4.0-3.jpeg)

## 鸣谢

- 使用的字体为[方正金陵系列](http://www.foundertype.com/index.php/FontInfo/index/id/202#)的金陵细简体。
- 层叠的波浪动画效果是利用[p5.js](http://p5js.org/)实现的。
- 诗词名句调用使用[今日诗词 API](https://www.jinrishici.com/)。
- 中国传统色名称及色号参考了以下来源：
  - [中国色－中国传统颜色](http://zhongguose.com/)
  - [Traditional Chinese Colors | 中国传统颜色](http://boxingp.github.io/traditional-chinese-colors/)
  - [中国传统色彩](https://color.uisdc.com/)
  - [最全！超美中国传统色 含 RGB、CMYK 色值！值得收藏！](https://www.weibo.com/ttarticle/p/show?id=2309404248238352952773)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/arthur-zheng"><img src="https://avatars1.githubusercontent.com/u/4089684?v=4" width="100px;" alt="Arthur Zheng"/><br /><sub><b>Arthur Zheng</b></sub></a><br /><a href="https://github.com/unicar9/jizhi/commits?author=arthur-zheng" title="Code">💻</a> <a href="#ideas-arthur-zheng" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/unicar9/jizhi/issues?q=author%3Aarthur-zheng" title="Bug reports">🐛</a> <a href="#design-arthur-zheng" title="Design">🎨</a></td>
    <td align="center"><a href="https://xnngs.cn"><img src="https://avatars3.githubusercontent.com/u/38936252?v=4" width="100px;" alt="xnng"/><br /><sub><b>xnng</b></sub></a><br /><a href="https://github.com/unicar9/jizhi/commits?author=xnng" title="Code">💻</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
