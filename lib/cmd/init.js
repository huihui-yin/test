'use strict'
// 使用模板初始化项目

const tpls = require('../../templates.json');
const tip = require('../tip');
const co = require("co");
const prompt = require('co-prompt');
const ora = require('ora');

const exec = require('child_process').exec; // 衍生 shell，然后在 shell 中执行 command，并缓冲任何产生的输出
const spinner = ora('new template ing...'); // 进度条

// 进行错误 / 正确信息打印
const execRm = (err, projectName) => {
    spinner.stop(); // loading结束

    if (err) {
        console.log(err);
        tip.fail('throw err, try again!');
        process.exit();
    }

    tip.suc(`${projectName} init successfully!`);
    tip.info(`please cd ${projectName} && npm install`);
    process.exit();
}

// 进行删除git文件
const download = (err, projectName) => {
    if (err) {
        console.log(err);
        tip.fail('download err, please try again!');
        process.exit();
    }
    // 删除git文件(在衍生shell中执行脚本命令)
    // exec('cd ' + projectName + ' && rm -rf .git', (err, out) => {
    //     execRm(err, projectName);
    // });
}

// 成功回调
const resolve = (result) => {
    const {tplName, projectName, url, branch} = result;

    // 进行git拉取远程项目并自定义项目名
    const cmdStr = `git clone ${url} ${projectName} && cd ${projectName} && git checkout ${branch}`

    spinner.start(); // loading开始
    exec(cmdStr, (err) => {
        // download(err, projectName);
        execRm(err, projectName);
    })
    
}

module.exports = () => {
    co(function*(){
        const tplName = yield prompt('template name: ');
        const projectName = yield prompt('project name: ')

        if (!tpls[tplName]) {
            tip.fail(`template ${tplName} is not exist`);
            process.exit();
        }

        return new Promise((resolve, reject) => {
            resolve({
                tplName,
                projectName,
                ...tpls[tplName]
            })
        })
    }).then(resolve) // co 函数返回一个 Promise 对象，因此可以用 then 方法添加回调函数
}