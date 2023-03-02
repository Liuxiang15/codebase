// 普通写法
function checkAuth(data) {
  if (data.role !== 'juejin') {
    console.log('不是掘金用户');
    return false;
  }
  if (data.grade < 1) {
    console.log('掘金等级小于 1 级');
    return false;
  }
  if (data.job !== 'FE') {
    console.log('不是前端开发');
    return false;
  }
  if (data.type !== 'eat melons') {
    console.log('不是吃瓜群众');
    return false;
  }
}

// 策略模式写法（策略 + 组合）
// 维护权限列表
const jobList = ['FE', 'BE']; // FE

// 策略
var strategies = {
  checkRole: function (value) {
    return value === 'juejin';
  },
  checkGrade: function (value) {
    return value >= 1;
  },
  checkJob: function (value) {
    return jobList.indexOf(value) > 1;
  },
  checkEatType: function (value) {
    return value === 'eat melons';
  }
};

// 校验规则
var Validator = function () {
  this.cache = [];

  // 添加策略事件
  this.add = function (value, method) {
    this.cache.push(function () {
      return strategies[method](value);
    });
  };

  // 检查
  this.check = function () {
    for (let i = 0; i < this.cache.length; i++) {
      let valiFn = this.cache[i];
      var data = valiFn(); // 开始检查
      if (!data) {
        return false;
      }
    }
    return true;
  };
};

// test1
// 小彭同学需要进行权限验证的条件为 :
// 掘金用户
// 掘金等级 1 级以上
// 那么代码就可以这么写 :
var compose1 = function () {
  var validator = new Validator();
  const data1 = {
    role: 'juejin',
    grade: 3
  };
  validator.add(data1.role, 'checkRole');
  validator.add(data1.grade, 'checkGrade');
  const result = validator.check();
  console.log('check result:', result)
  return result;
};

compose1()

// test1
// 另一个小伙伴阿宽，他可能需要进行权限验证的条件为 :
// 1、掘金用户
// 2、前端工程师
// 阿宽使用策略模式进行操作
var compose2 = function () {
  var validator = new Validator();
  const data2 = {
    role: 'juejin',
    job: 'FE'
  };
  validator.add(data2.role, 'checkRole');
  validator.add(data2.job, 'checkJob');
  const result = validator.check();
  console.log('check result:', result)
  return result;
};
compose2()

// 我的写法，希望将策略和组合全部放在一个类上
class AuthValidator {
  /**
   * @param {Object} targetObj: 待检查对象
   * 格式：{ role:  'xx', grade: 'xx' , job:"", eatType:''}

   */
  constructor(targetObj) {
    // 策略配置
    this.strategies = {
      // 注意：传入的对象中
      role: function (value) {
        return value === 'juejin';
      },
      grade: function (value) {
        return value >= 1;
      },
      job: function (value) {
        return jobList.indexOf(value) > 1;
      },
      eatType: function (value) {
        return value === 'eat melons';
      }
      // TODO 如果有新的权限种类验证先在这里加
    }

    this.targetObj = targetObj
    // 缓存校验的结果
    this.cache = []
    this.add()
  }

  add() {
    for (let key in this.targetObj) {
      const checkMethod = this.strategies[key]
      const value =
        this.targetObj[key]

      this.cache.push(checkMethod(value))
    }
  }

  // 检查
  check() {
    const result = this.cache.every(i => i)
    console.log('check result:', result)
    return result;
  };
}

const person1 = {
  role: 'juejin',
  grade: 3
}
const validatorObj = new AuthValidator(person1)
validatorObj.check()
const person2 = {
  role: 'juejin',
  job: 'FE'
};
const validatorObj2 = new AuthValidator(person2)
validatorObj2.check()