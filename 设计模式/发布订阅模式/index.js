const EventEmit = function () {
  this.events = {};
  this.on = function (name, cb) {
    if (this.events[name]) {
      this.events[name].push(cb);
    } else {
      this.events[name] = [cb];
    }
  };
  this.trigger = function (name, ...arg) {
    if (this.events[name]) {
      this.events[name].forEach(eventListener => {
        eventListener(...arg);
      });
    }
  };
};



let event = new EventEmit();
// 注意：先绑定监听on，然后再触发trigger
// MessageCenter.fetch() {
event.on('success', () => {
  console.log('更新消息中心');
});
// }
// Order.update() {
event.on('success', () => {
  console.log('更新订单信息');
});
// }
// Checker.alert() {
event.on('success', () => {
  console.log('通知管理员');
});
// }


event.trigger('success');

// 输出
// 更新消息中心
// 更新订单信息
// 通知管理员