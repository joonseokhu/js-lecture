var data = (function(){
  var price = 0;
  var log = [];
  return {
    add: function(e){
      price += e;
      log.push('입금 ' + e + '원');
    },
    sub: function(e){
      if (e > price) return alert('잔액이 부족합니다.');
      price -= e;
      log.push('출금 ' + e + '원');
    },
    history: function(){
      return log.join('\n') + '\n잔액 ' + price + '원';
    },
  }
})();
