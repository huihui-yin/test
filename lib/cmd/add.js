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
    tip.suc('add a new template');
    process.exit();
}

// 定义resolve函数
const resolve = (result) => {
    // 解构赋值
    const { tplName, gitUrl, branch, description } = result;
    if (!tpls[tplName]) { // 原模块中没有新增的模块
        // 将模板信息添加到模板名对象中
        tpls[tplName] = {};
        tpls[tplName]['url'] = gitUrl;
        tpls[tplName]['branch'] = branch;
        tpls[tplName]['description'] = description;
    } else {
        tip.fail(`template ${tpl} is already init!`);
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
        const gitUrl = yield prompt('git https url: ');
        const branch = yield prompt('git branch: ');
        const description = yield prompt('template description: ');
        if (tplName === '' || gitUrl === '' || branch === '') {
            tip.fail('please input template name and git url and git branch!')
            process.exit();
        }
        return new Promise((resolve, reject) => {
            resolve({
                tplName,
                gitUrl,
                branch,
                description
            });
        });
    }).then(resolve);
}