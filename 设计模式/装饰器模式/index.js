const kuanWrite = function () {
  this.writeChinese = function () {
    console.log('我只会写中文');
  };
};

// 通过装饰器给阿宽加上写英文的能力
const Decorator = function (old) {
  this.oldWrite = old.writeChinese;
  this.writeEnglish = function () {
    console.log('给阿宽赋予写英文的能力');
  };
  this.newWrite = function () {
    this.oldWrite();
    this.writeEnglish();
  };
};

const oldKuanWrite = new kuanWrite();
const decorator = new Decorator(oldKuanWrite);
decorator.newWrite();
// 输出
// 我只会写中文
// 给阿宽赋予写英文的能力