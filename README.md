## 简介

此项目是学习构建工具 webpack、babel 相关实践，记录学习的点滴，方便以后忘记可以从学习轨迹中迅速上手。

## 项目启动

```bash
# 安装依赖
$ npm install

# 测试 webpack.base.js 文件
$ npm run test:base

# 测试 webpack.dll.js 文件
$ npm run test:dll

# 测试 webpack.prod.js 文件
$ npm run test:prod
```

## 目录结构

```
├── lib
    ├── webpack.base.js                         webpack 基础配置
    ├── webpack.dll.js                          webpack 三方包构建配置          
    ├── webpack.dev.js                          webpack 开发环境配置
    ├── webpack.prod.js                         webpack 生成环境配置
    ├── webpack.ssr.js                          webpack ssr环境配置
├── test
    ├── cases                                   测试用例
    ├── template                                测试模版          
    ├── unit                                    冒烟测试
├── webpack-diy                                 webpack 简版实现
├── webpack-loaders                             webpack 自定义 loaders
├── webpack-plugins                             webpack 自定义 plugins
```

## 参考资料

- [webpack 官方文档](https://webpack.js.org/)
- [babel 官方文档](https://babeljs.io/)
- [玩转 webpack](https://time.geekbang.org/course/intro/100028901)
- [3步助你理解webpack构建原理](https://learn.kaikeba.com/catalog/211875)
- [Webpack揭秘——走向高阶前端的必经之路 ](https://juejin.im/post/6844903685407916039)
- [webpack4 新特性](https://lz5z.com/webpack4-new/)
- [Babel是如何读懂JS代码的](https://zhuanlan.zhihu.com/p/27289600)
- [Babel 的工作原理以及怎么写一个 Babel 插件](https://cloud.tencent.com/developer/article/1520124)
