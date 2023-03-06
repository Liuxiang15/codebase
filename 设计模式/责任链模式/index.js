const Chain = function (fn) {
  this.fn = fn;
  this.nextChain = null

  this.setNext = function (nextChain) {
    this.nextChain = nextChain
    return this.nextChain
  }

  this.run = function () {
    this.fn();
    this.nextChain && this.nextChain.run()
  }
}

const applyDevice = function () {
  console.log('applyDevice')
}
const chainApplyDevice = new Chain(applyDevice);

const selectAddress = function () {
  console.log('selectAddress')
}
const chainSelectAddress = new Chain(selectAddress);

const selectChecker = function () {
  console.log('selectChecker')
}
const chainSelectChecker = new Chain(selectChecker);

// 运用责任链模式实现上边功能
chainApplyDevice.setNext(chainSelectAddress).setNext(chainSelectChecker);
chainApplyDevice.run();

// 输出
// applyDevice
// selectAddress
// selectChecker