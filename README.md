# React Chat App

## 简介

1. 前端基于 React，后端基于 Nodejs
2. 聊天模式基于，聊天室的创建和加入聊天室
3. 分别启动一个后端服务和两个前端服务后，可实现两人聊天回复
4. 10 秒后若对方未回复，会有相应的聊天机器人回复提示消息
5. 前后端基于 websocket 通信协议实现

## 本地启动方式 （建议先观看视频演示操作，熟知后在具体在本地操作，以防遇到各种环境问题，注意如果本地电脑 Node 版本过低，请升级到新版本以免导致依赖包无法正常安装）

### 分别执行如下命令：

- 1.打开第一个终端窗口，在根目录下的 server 目录下执行 `npm install`，安装后端依赖包，安装完成后依旧在此目录下执行 `npm start`，启动后端服务，此时后台服务默认运行在`localhost:3000`端口
- 2.打开第二个终端窗口，回到项目根目录执行 `npm install`，安装前端依赖包，安装完成后依旧在此目录下执行 `npm start`，启动第一个前端服务，会提示 3000 端口被占用，是否启用新端口，输入 yes 启动，启动后浏览器默认打开新页面，此时服务默认运行在浏览器`localhost:3001`端口
- 3.打开第三个终端窗口，此项目根目录下执行 `npm start`，启动第二个前端服务，如上，会提示是否启用新端口，输入 yes 启动，启动后浏览器默认打开新页面，，此时服务默认运行在浏览器`localhost:3002`端口
- 4.至此，我们现在一共有 1 个后端 nodejs 服务，两个前端 React 服务同时运行
- 5.此时在两个前端浏览器窗口中即可进行两人聊天对话的场景，具体可观看视频演示中的操作