# 几枝 | Jizhi

支持自定义新标签页的 Chrome 扩展，几枝将在新标签页上展示中国传统色的层叠波浪动画效果搭配经典诗词。

A Chrome extension with custom new tab page featuring Chinese poems and P5.js enabled noise waves in Chinese traditional colors

## 更新信息

* 新版本用 React 重写了几枝，使用了 [neutrino](https://neutrinojs.org/packages/react/) 的配置
* 使用了新版本[今日诗词 API](https://www.jinrishici.com/)
* 使用了 [Evergreen React UI library](https://evergreen.segment.com/)  

## 本地装载

* 下载最新的 release 打包文件，首先运行 `yarn` 再运行 `yarn build` 生成 **build 文件夹**
* 在浏览器里输入 chrome://extensions/ 进入插件管理页面
* 打开右上角开发者模式（Developer mode）
* 点击左上角 **Load unpacked** 按钮并选取刚刚生成的 **build 文件夹**
* 几枝装载成功，打开新标签页试试吧

## 功能

### 2.1.0 更新

- 新增 Blobs 背景附带鼠标交互效果
- 新增快捷键控制动画播放 (Space) 和背景保存 (S)

### 2.0.1 更新

- 右下角新增弹出菜单
- 可设置默认播放动画
- 可设置保留颜色名不淡出消失
- 可点击诗词名自动连接到 Google 搜索
- 修改诗词显示方式，解决了文字显示不全的问题
- 字体大小响应屏幕宽度

---------

* 左侧淡出中国色名称。
* 右下播放键为动效开关。
* 右下下载键储存 JPEG 格式背景图到本地。

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




