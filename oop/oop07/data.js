var data = (function(){
  var data = {
    price: 0,
    history: [],
  };

  var importData = localStorage.getItem('bank');
  if (!!importData) {
    data = JSON.parse(importData);
  }

  function saveData(type, price){
    data.price += type ? price : price * -1;
    var log = makeLog(type, price);
    data.history.push(log);
    localStorage.setItem('bank', JSON.stringify(data));
    return log.message;
  };
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
      current: data.price,
      timestamp: timestamp(),
    };
    result.message = result.timestamp + ' ' + value + '원 ' + type_msg + ' 잔액' + result.current + '원';
    return result;
  };
  return {
    add: function(e){
      return saveData(true, e);
    },
    sub: function(e){
      if (e > data.price) return alert('잔액이 부족합니다.');
      return saveData(false, e);
    },
    history: function(){
      return {
        history: data.history,
        price: data.price,
      };
    },
  }
})();
