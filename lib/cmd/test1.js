'use strict'
const inquirer = require('inquirer')

const promptList1 = [{
    type: 'input',
    message: '用户名：',
    name: 'name',
    default: 'test_user'
},{
    type: 'input',
    message: '请输入手机号',
    name: 'phone',
    validate: (val) => {
        if(!val.match(/\d{11}/g)) {
            return "请输入11位数字"
        }
        return true
    }
}];

const promptList2 = [{
    type: 'confirm', 
    name: 'test', 
    message: '测试输入?', 
    default: true 
}];

const promptList3 = [{
    type: 'list',
    message: '请选择一种水果:',
    name: 'fruit',
    choices: [
        "Apple",
        "Pear",
        "Banana"
    ],
    filter: function (val) { // 使用filter将回答变为小写
        return val.toLowerCase();
    }
}];

module.exports = () => {
    inquirer.prompt(promptList3).then(answers => {
        console.log('输出信息:')
        console.log(answers)
    })
}