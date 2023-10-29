export default class LocalStorage {
  static setLocalStorageItem<T>(key: string, value: T) {
    const result = JSON.stringify(value);
    localStorage.setItem(key, result);
  }

  static removeLocalStorageItem(key: string) {
    localStorage.removeItem(key);
  }

  static getLocalStorageItem<T>(key: string): T | null {
    // 获取 值
    const item = localStorage.getItem(key);
    // 判断是否为空
    if (item == null) {
      return null;
    }
    // 不为空返回解析后的值
    const result: T = JSON.parse(item);
    return result;
  }
}
