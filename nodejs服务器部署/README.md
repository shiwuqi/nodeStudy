## 环境：腾讯云 CentOS 7.4 64位
## 工具：Xshell

### 安装nodejs、npm
  1、nodejs下载
    * wget https://npm.taobao.org/mirrors/node/v12.10.0/node-v12.10.0-linux-x64.tar.xz
    ![](https://github.com/shiwuqi/master/nodeStudy/nodejs服务器部署/assets/images/node-download.png)

  2、nodejs解压
    * tar -xvf node-v12.10.0-linux-x64.tar.xz
    ![](https://github.com/shiwuqi/master/nodeStudy/nodejs服务器部署/assets/images/node-decompression.png)

  3、更改文件名称
    * mv node-v12.10.0-linux-x64 node
    ![](https://github.com/shiwuqi/master/nodeStudy/nodejs服务器部署/assets/images/node-catalog.png)
  
  4、设置node、npm为全局变量，检测node、npm是否安装成功
    * ln -s /root/node/bin/node /usr/sbin/node
    * ln -s /root/node/bin/npm /usr/sbin/npm
    * node -v
    * npm -v
    ![](https://github.com/shiwuqi/master/nodeStudy/nodejs服务器部署/assets/images/node-setting.png)

  