# 几枝 | Jizhi
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors)

支持自定义新标签页的 Chrome/Firefox 扩展，几枝将在新标签页上展示中国传统色的层叠波浪动画效果搭配经典诗词。

A Chrome/Firefox extension with custom new tab page featuring Chinese poems and P5.js enabled noise waves in traditional Chinese colors

[Chrome Web Store 地址](https://chrome.google.com/webstore/detail/%E5%87%A0%E6%9E%9D/hfohpokminpknagcgncibpacohagppjn) | [Firefox Add-ons 地址](https://addons.mozilla.org/en-US/firefox/addon/jizhi/)

## 功能请查看[更新日志](./CHANGELOG.md)

## Chrome 本地装载

* 下载最新的 release 打包文件，首先运行 `yarn` 再运行 `yarn build` 生成 **builds 文件夹(包含 Chrome 和 Firefox 的 build 文件以及压缩包)**
* 在Chrome浏览器里输入 chrome://extensions/ 进入插件管理页面
* 打开右上角开发者模式（Developer mode）
* 点击左上角 **Load unpacked** 按钮并选取刚刚生成的 **build_chrome 文件夹**
* 「几枝」装载成功，打开新标签页试试吧

![jizhi-2.1.0 gif](https://github.com/unicar9/jizhi/blob/master/examples/jizhi-2.1.0.gif)
![jizhi gif](https://github.com/unicar9/jizhi/blob/master/examples/jizhi.gif)

## 示例

![jizhi bg 1](https://github.com/unicar9/jizhi/blob/master/examples/jizhi-bg-1.jpg)
![jizhi bg 2](https://github.com/unicar9/jizhi/blob/master/examples/jizhi-bg-2.jpg)
![jizhi bg 3](https://github.com/unicar9/jizhi/blob/master/examples/jizhi-bg-3.jpg)

## 鸣谢

* 使用的字体为[方正金陵系列](http://www.foundertype.com/index.php/FontInfo/index/id/202#)的金陵细简体。
* 层叠的波浪动画效果是利用[P5.js](http://p5js.org/)实现的。
* 诗词名句调用使用[古诗词·一言API](https://gushi.ci/)。
* 中国传统色名称及色号参考了以下来源：
  * [中国色－中国传统颜色](http://zhongguose.com/)
  * [Traditional Chinese Colors | 中国传统颜色](http://boxingp.github.io/traditional-chinese-colors/)
  * [中国传统色彩](https://color.uisdc.com/)
  * [最全！超美中国传统色 含RGB、CMYK色值！值得收藏！](https://www.weibo.com/ttarticle/p/show?id=2309404248238352952773)





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
