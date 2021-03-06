'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://127.0.0.1:9110"',
  // OSS_PATH: '"https://edu-college.oss-cn-shenzhen.aliyuncs.com"'
  OSS_PATH: '"https://grad-file.oss-cn-chengdu.aliyuncs.com"'
})
