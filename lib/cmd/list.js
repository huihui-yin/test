"use strict"
// 显示所有模板信息

const table = require('../table');
const tpls = require('../../templates');


// 定义resolve函数
const resolve = () => {
    
    // 显示当前所有模板信息
    process.exit();
}

module.exports = () => {
    table(tpls);
    process.exit();
}