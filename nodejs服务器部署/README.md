# 环境：腾讯云 CentOS 7.4 64位
# 工具：Xshell

## 安装nodejs、npm
------

#### 1、nodejs下载  

wget https://npm.taobao.org/mirrors/node/v12.10.0/node-v12.10.0-linux-x64.tar.xz   

![下载](https://github.com/shiwuqi/nodeStudy/blob/master/nodejs%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%83%A8%E7%BD%B2/assets/images/node-download.png)

#### 2、nodejs解压  

tar -xvf node-v12.10.0-linux-x64.tar.xz  

![解压](https://github.com/shiwuqi/nodeStudy/blob/master/nodejs%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%83%A8%E7%BD%B2/assets/images/node-decompression.png)

#### 3、重命名  

mv node-v12.10.0-linux-x64 node  

![更改名称](https://github.com/shiwuqi/nodeStudy/blob/master/nodejs%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%83%A8%E7%BD%B2/assets/images/node-catalog.jpg)
  
#### 4、设置node、npm为全局变量，检测node、npm是否安装成功  

ln -s /root/node/bin/node /usr/sbin/node  
ln -s /root/node/bin/npm /usr/sbin/npm  
node -v  
npm -v  

![设置全局变量](https://github.com/shiwuqi/nodeStudy/blob/master/nodejs%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%83%A8%E7%BD%B2/assets/images/node-setting.jpg)



## 安装mongodb
------

#### 1、mongodb安装

wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-3.4.16.tgz

![下载](https://github.com/shiwuqi/nodeStudy/blob/master/nodejs%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%83%A8%E7%BD%B2/assets/images/mongodb-download.png)

#### 2、mongodb解压

tar -xvf mongodb-linux-x86_64-3.4.16.tgz

![解压](https://github.com/shiwuqi/nodeStudy/blob/master/nodejs%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%83%A8%E7%BD%B2/assets/images/mongodb-decompression.png)

#### 3、移动文件

mv mongodb-linux-x86_64-3.4.16 /usr/local/mongodb

![移动](https://github.com/shiwuqi/nodeStudy/blob/master/nodejs%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%83%A8%E7%BD%B2/assets/images/mongodb-move.png)

#### 4、创建数据库文件夹与日志文件

mkdir /usr/local/mongodb/data  
touch /usr/local/mongodb/logs

![创建数据库文件夹与日志文件](https://github.com/shiwuqi/nodeStudy/blob/master/nodejs%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%83%A8%E7%BD%B2/assets/images/mongodb-data.png)

![结果](https://github.com/shiwuqi/nodeStudy/blob/master/nodejs%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%83%A8%E7%BD%B2/assets/images/mongodb-data-result.png)

#### 5、启动mongodb

/usr/local/mongodb/bin/mongod --dbpath=/usr/local/mongodb/data --logpath=/usr/local/mongodb/logs --logappend --port=27017 --fork

![结果](https://github.com/shiwuqi/nodeStudy/blob/master/nodejs%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%83%A8%E7%BD%B2/assets/images/mongodb-start.png)

![成功](https://github.com/shiwuqi/nodeStudy/blob/master/nodejs%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%83%A8%E7%BD%B2/assets/images/mongodb-success.png)

## 安装pm2
------

#### 全局安装pm2  

npm install -g pm2  

## 启动项目

#### 1、项目放到opt目录下

![项目](https://github.com/shiwuqi/nodeStudy/blob/master/nodejs%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%83%A8%E7%BD%B2/assets/images/pj-result.png)

#### 2、安装依赖 npm install

#### 3、配置nginx.conf

![ngnix配置](https://github.com/shiwuqi/nodeStudy/blob/master/nodejs%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%83%A8%E7%BD%B2/assets/images/pj-nginx_conf.png)

#### 4、启动项目

pm2 start index.js

  