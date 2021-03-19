#!/usr/bin/env node
"use strict"

// 上句命令用于指定脚本的执行程序，只能在开头，此处指定的是node
console.log('wahh')
// 引入命令
const program = require('commander');
const packJson = require('../package.json');

// 引入自定义命令处理
const addCom = require('../lib/cmd/add');
const listCom = require('../lib/cmd/list');
const delCom = require('../lib/cmd/delete');
const initCom = require('../lib/cmd/init');
const test1Com = require('../lib/cmd/test1');

// 定义版本号
program
    .version(packJson.version)

// 添加模板
program
    .command('add')
    .description('add one template')
    .alias('a')
    .action(() => {
        console.log("add命令运行")
        addCom();
    })

// 初始命令
program
    .command('init')
    .description('use template init one program')
    .alias('i')
    .action(() => {
        console.log('init 命令执行')
        initCom();
    })

// 显示模板信息
program
    .command('list')
    .description('display templates information')
    .alias('l')
    .action(() => {
        listCom();
    })

// 删除模板命令
program
    .command('delete')
    .description('delete a template')
    .action(() => {
        delCom();
    })

// 测试命令
program
    .command('t1')
    .description('test1 cmd')
    .action(() => {
        test1Com();
    })

// process.argv:包含node进程启动时传递的自定义命令行参数的数组
// 通过program.parse(arguments)方法处理参数，没有被使用的选项会存放在program.args数组中。该方法的参数是可选的，默认值为process.argv。
program.parse(process.argv);

if (!program.args.length) {
    program.help(); // 当于执行命令的--help选项，显示help信息，这是commander内置的一个命令选项
}