"use strict"
// 添加模板

const co = require('co');
const prompt = require('co-prompt');
const fs = require("fs"); // 用于读写template.js文件

const table = require('../table');
const tip = require('../tip');
const tpls = require('../../templates');

// 定义写入文件操作后的回调函数
const writeFile = (err) => {
    // 处理错误
    if (err) {
        console.log(err);
        tip.fail('throw err, try again');
        process.exit(); // 退出进程
    }
    // 显示当前所有模板信息
    table(tpls);
    tip.suc('delete template successfully!');
    process.exit();
}

// 定义resolve函数
const resolve = (tplName) => {
    // 解构赋值
    if (tpls[tplName]) { 
        delete tpls[tplName];
    } else { // 原模块中没有新增的模块
        // 输出错误
        tip.fail(`template ${tplName} is not exist`);
        process.exit();
        
    }
    // 将新增的模板信息写入template.json中
    fs.writeFile(__dirname + '/../../templates.json', JSON.stringify(tpls), 'utf-8', writeFile);
    
}

module.exports = () => {
    // co中接受一个generator函数
    co(function*() {
        // 进行命令交互，接受用户输入的模板参数
        const tplName = yield prompt('name: ');
        return new Promise((resolve, reject) => {
            resolve(tplName);
        });
    }).then(resolve);
}