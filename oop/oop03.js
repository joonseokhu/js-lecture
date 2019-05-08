var data = (function(){
  var price = 0;
  var history = [];

  return {
    add: function(e){
      price += e;
      var log = '입금 ' + e + '원. 잔액 ' + price + '원';
      history.push(log);
      return log;
    },
    sub: function(e){
      if (e > price) return alert('잔액이 부족합니다.');
      price -= e;
      var log = '출금 ' + e + '원. 잔액 ' + price + '원';
      history.push(log);
      return log;
    },
    history: function(){
      return history.join('\n') + '\n총 잔액 ' + price + '원';
    },
  }
})();
