### 简介

此项目是学习构建工具 webpack、babel 相关实践，记录学习的点滴，方便以后忘记可以从学习轨迹中迅速上手。

### 项目结构

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
├── simple-diy                                  webpack 简版实现

```

## 学习参考

- [webpack 官方文档](https://webpack.js.org/)
- [babel 官方文档](https://babeljs.io/)
- [极客时间 - 玩转 webpack](https://time.geekbang.org/course/intro/100028901)
