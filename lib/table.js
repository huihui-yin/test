// 以表格形式输出模板信息
const Table = require('cli-table');
const tip = require('./tip');

const table = new Table({
    head: ['name', 'description', 'branch'],
    style: {
        head: ['cyan']
    }
});
let obj = {
    
}
// 此处的config为存入项目中的所有模板JSON对象
// eg.{"manage":{"url":"..."},...}
module.exports = (config) => {
    const keys = Object.keys(config); // 对象遍历结果存在key数组中
    
    if(keys.length) {
        keys.forEach(key => {
            let value = config[key];
            // 将模板名+模板信息放入表格中
            table.push(
                [`${key}`, value.description, value.branch]
            )
        });
        // 将table输出
        const list = table.toString();
        if (list) {
            tip.info('template list: ');
            console.log(`${list} \n`);
        } else {
            tip.fail('no template in the list');
        }
    } else {
        tip.fail('no template in the list');
    }
};
