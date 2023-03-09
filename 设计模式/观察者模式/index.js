// 创建一个群，保存通知，通知变化之后通知每个家长（触发所有观察者对象）
class Group {
  constructor() {
    this.message = '暂无通知';
    this.parents = [];
  }
  getMessage() {
    return this.message;
  }
  setMassage(message) {
    this.message = message;
    this.notifyAllObservers();
  }
  notifyAllObservers() {
    this.parents.forEach((parent) => {
      parent.update();
    });
  }
  attach(parent) {
    this.parents.push(parent);
  }
}

// 观察者，每个家长
class Parent {
  constructor(name, group) {
    this.name = name;
    this.group = group;
    this.group.attach(this);
  }
  update() {
    console.log(`${this.name} 收到通知: ${this.group.getMessage()}`);
  }
}

let group = new Group();
let t1 = new Parent('李妈妈', group);
let t2 = new Parent('王爸爸', group);
let t3 = new Parent('张爷爷', group);

group.setMassage('开家长会');
group.setMassage('开运动会');
/*
李妈妈 收到通知: 开家长会
王爸爸 收到通知: 开家长会
张爷爷 收到通知: 开家长会
李妈妈 收到通知: 开运动会
王爸爸 收到通知: 开运动会
张爷爷 收到通知: 开运动会
*/