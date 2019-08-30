const Router = require('koa-router')
const fs = require('fs')
const path = require('path')
const efs = new Router()

// 同步读取文件内容
efs.get('/', async (ctx, next) => {
  try {
    fs.mkdirSync(path.join(__dirname, '../static/syncfiles'), { recursive: true }, function(err) {
      if (err) {
        throw new String('创建文件目录失败')
      }
    })
    fs.writeFileSync(path.join(__dirname, '../static/syncfiles/test.txt'), '这是同步写入的数据！', function (err) {
      if (err) {
        throw new String('写入数据失败')
      }
    })
    const result = fs.readFileSync(path.join(__dirname, '../static/syncfiles/test.txt'), 'utf-8', function (err, data) {
      if (err) {
        throw new String('文件读取失败')
      }
    })
    ctx.response.status = 200
    ctx.response.body = result
  } catch (e) {
    ctx.response.body = e
  }
})

function getFileSync(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', function (err, data) {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

function mkdirFolder(folderPath) {
  return new Promise((resolve, reject) => {
    fs.mkdir(folderPath, { recursive: true }, function (err) {
      if (err) {
        reject('创建文件失败')
      } else {
        resolve(true)
      }
    })
  })
}

function writeFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, '这是异步写入的数据！', function (err) {
      if (err) {
        reject('写入数据失败')
      } else {
        resolve(true)
      }
    })
  })
}

// 异步创建文件目录、写入文件、读取文件
efs.get('/async', async (ctx, next) => {
  try {
    await mkdirFolder(path.join(__dirname, '../static/asyncfiles'))
    await writeFile(path.join(__dirname, '../static/asyncfiles/test.txt'))
    const response = await getFileSync(path.join(__dirname, '../static/asyncfiles/test.txt'))
    ctx.response.body = response
  } catch (e) {
    ctx.response.body = e
  }
})

function readdirFolder(folderFile) {
  return new Promise((resolve, reject) => {
    fs.readdir(folderFile, function(err, files) {
      if (err) {
        reject(err)
      } else {
        resolve(files)
      }
    })
  })
}

// 异步读取目录内容
efs.get('/readdir', async (ctx, next) => {
  try {
    const result = await readdirFolder(path.join(__dirname, '../static/syncfiles'))
    ctx.response.body = result
  } catch (e) {
    ctx.response.body = e
  }
})

// 同步读取目录内容
efs.get('/readdirSync', async (ctx, next) => {
  const result = fs.readdirSync(path.join(__dirname, '../static/syncfiles'))
  ctx.response.body = result
})

function statFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, function(err, stats) {
      if (err) {
        reject(err)
      } else {
        resolve(stats)
      }
    })
  })
}

//异步读取目录下的文件的元数据
efs.get('/stat', async (ctx, next) => {
  try {
    const pages = await readdirFolder(path.join(__dirname, '../static/asyncfiles'))
    let stats = new Map()
    for(let i in pages) {
      const stat = await statFile(path.join(__dirname, '../static/asyncfiles/' + pages[i]))
      stats.set(pages[i], stat)
    }
    ctx.response.body = Array.from(stats)
  } catch (e) {
    ctx.response.body = e
  }
})

// 同步读取目录下的文件的元数据
efs.get('/statSync', async (ctx, next) => {
  try {
    const pages = fs.readdirSync(path.join(__dirname, '../static/syncfiles'))
    let stats = new Map()
    for(let i in pages) {
      const stat = fs.statSync(path.join(__dirname, '../static/syncfiles/' + pages[i]))
      stats.set(pages[i], stat)
    }
    ctx.response.body = Array.from(stats)
  } catch (e) {
    ctx.response.body = e
  }
})

// 异步打开文件
function openFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.open(filePath, 'r', function (err, fd) {
      if (err) {
        reject(err)
      } else {
        resolve(fd)
      }
    })
  })
}

// 同步打开文件
efs.get('/open', async (ctx, next) => {
  const result = await openFile(path.join(__dirname, '../static/files/async.txt'))
  if (result) {
    ctx.response.body = '打开成功！'
  } else {
    ctx.response.body = '打开失败！'
  }
})

module.exports = efs