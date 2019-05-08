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
  function makeLog(type, value) {
    var type_msg = type ? '입금' : '출금';
    var result = {
      type: type,
      price: value,
      current: price,
      timestamp: timestamp(),
    };
    result.message = result.timestamp + ' ' + value + '원 ' + type_msg + ' 잔액' + price + '원';
    return result;
  };
  return {
    add: function(e){
      price += e;
      var log = makeLog(true, e);
      history.push(log);
      return log.message;
    },
    sub: function(e){
      if (e > price) return alert('잔액이 부족합니다.');
      price -= e;
      var log = makeLog(false, e);
      history.push(log);
      return log.message;
    },
    history: function(){
      return {
        history: history,
        price: price,
      };
    },
  }
})();
