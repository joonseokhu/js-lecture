var data = (function(){
  var price = 0;
  var history = [];
  function timestamp() {
    var now = new Date();
    var result = now.getFullYear() + '/' +
    (now.getMonth() + 1) + '/' +
    now.getDate() + ' ' +
    now.getHours() + ':' +
    now.getMinutes() + ':' +
    now.getSeconds();
    return result;
  }
  return {
    add: function(e) {
      price += e;
      var log = timestamp() + '. 입금 ' + e + '원. 잔액 ' + price + '원';
      history.push(log);
      return log;
    },
    sub: function(e) {
      if (e > price) return alert('잔액이 부족합니다.');
      price -= e;
      var log = timestamp() + '. 출금 ' + e + '원. 잔액 ' + price + '원';
      history.push(log);
      return log;
    },
    history: function(){
      return history.join('\n') + '\n총 잔액 ' + price + '원';
    },
  }
})();
