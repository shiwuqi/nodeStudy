const { MongoClient } = require('mongodb')
const { MongoUrl } = require('../config')

class ConnectMongo {
  constructor() {
    this.url = MongoUrl
    this.db
  }
  open() { // 连接数据库
    const _this = this
    MongoClient.connect(this.url, { useUnifiedTopology: true }, function(err, db) {
      if (err) {
        return console.dir('数据库连接失败：' + err)
      }
      _this.db = db.db('test')
      console.log('数据库连接成功！')
    })
  }
  /**
   * @description 连接表、集合
   * @param {string}table 表名
   * @param {function}cb 回调函数
   */
  connect(table, cb) {
    this.db.collection(table, function(err, result) {
      cb && cb (err, result)
    })    
  }
  /**
   * @description 插入单个数据
   * @param {string}table 表名 
   * @param {any}data 要插入的数据
   * @param {function}cb 回调函数 
   */
  insert(table, data, cb) {
    this.connect(table, function(err, result) {
      if (err) {
        throw err
      } else {
        result.insertOne(data, function(err, result) {
          if (err) {
            console.log('插入数据失败：' + err)
          }
          cb && cb(result)
        })
      }
    })
  }

  /**
   * @description 删除数据
   * @param {string}table 表名 
   * @param {any}data 要插入的数据
   * @param {function}cb 回调函数
   */
  remove(table, data, cb) {
    this.connect(table, function(err, result) {
      if (err) {
        throw err
      } else {
        result.remove(data, function(err, result) {
          if (err) {
            console.log('删除数据失败：' + err)
          }
          cb && cb(result)
        })
      }
    })
  }
}

exports.ConnectMongo = ConnectMongo