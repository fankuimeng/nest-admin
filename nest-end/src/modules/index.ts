import { Type } from '@nestjs/common';
import * as fs from 'fs';

const filterModules = ['base'];

const exportModule = getFilesAndFoldersInDir(__dirname)
  .filter(
    (item) =>
      item.name.endsWith('.module.js') &&
      filterModules.some(
        (module) => !item.name.endsWith(`${module}.module.js`),
      ),
  )
  .map((value) => {
    const dirName = value.name.split('.')[0];
    const moduleObjct = require(`./${dirName}/${value.name}`);
    return Object.values(moduleObjct)[0];
  }) as Array<Type<any>>;

function getFilesAndFoldersInDir(path) {
  const filesList = [];
  readFile(path, filesList);
  return filesList;
}

// 遍历读取文件
function readFile(path, filesList) {
  const files = fs.readdirSync(path); // 需要用到同步读取
  files.forEach(walk);
  function walk(file) {
    const states = fs.statSync(path + '/' + file);
    if (states.isDirectory()) {
      readFile(path + '/' + file, filesList);
    } else {
      // 创建一个对象保存信息
      const obj = { size: 0, name: '', path: '' };
      obj.size = states.size; // 文件大小，以字节为单位
      obj.name = file; // 文件名
      obj.path = path + '/' + file; // 文件绝对路径
      filesList.push(obj);
    }
  }
}

export default exportModule;
