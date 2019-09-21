## 环境：腾讯云 CentOS 7.4 64位
## 工具：Xshell

![下载](https://github.com/shiwuqi/nodeStudy/blob/master/nodejs%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%83%A8%E7%BD%B2/assets/images/node-download.png)

### 安装nodejs、npm
  #### 1、nodejs下载 <br />
    wget https://npm.taobao.org/mirrors/node/v12.10.0/node-v12.10.0-linux-x64.tar.xz
    ![下载](https://github.com/shiwuqi/nodeStudy/blob/master/nodejs%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%83%A8%E7%BD%B2/assets/images/node-download.png)

  #### 2、nodejs解压<br />
    tar -xvf node-v12.10.0-linux-x64.tar.xz
    ![解压](https://github.com/shiwuqi/nodeStudy/blob/master/nodejs%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%83%A8%E7%BD%B2/assets/images/node-decompression.png)

  #### 3、更改文件名称<br />
    mv node-v12.10.0-linux-x64 node
    ![更改名称](https://github.com/shiwuqi/nodeStudy/blob/master/nodejs%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%83%A8%E7%BD%B2/assets/images/node-catalog.jpg)
  
  #### 4、设置node、npm为全局变量，检测node、npm是否安装成功 <br />
    ln -s /root/node/bin/node /usr/sbin/node <br />
    ln -s /root/node/bin/npm /usr/sbin/npm <br />
    node -v <br />
    npm -v <br />
    ![设置全局变量](https://github.com/shiwuqi/nodeStudy/blob/master/nodejs%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%83%A8%E7%BD%B2/assets/images/node-setting.jpg)

  