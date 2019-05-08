var data = (function(){
  var data = {
    price: 0,
    history: [],
  };

  var importData = localStorage.getItem('bank');
  if (!!importData) {
    data = JSON.parse(importData);
  }

  function saveData(type, price, msg){
    data.price += type ? price : price * -1;
    var log = makeLog(type, price, msg);
    data.history.push(log);
    localStorage.setItem('bank', JSON.stringify(data));
    log.status = true;
    return log;
  };

  function makeLog(type, value, msg) {
    var now =  new Date();
    var id = (function(){
      var lastLog = data.history[data.history.length - 1];
      return lastLog
      ? lastLog.id + 1
      : 1;
    })();
    return {
      id: id,
      type: type,
      price: value,
      msg: msg,
      current: data.price,
      timestamp: now.valueOf(),
    };
  };
  return {
    add: function(e, msg){
      return saveData(true, e, msg);
    },
    sub: function(e, msg){
      return (e > data.price)
      ? {status: false, msg: '잔액이 부족합니다.'}
      : saveData(false, e, msg);
    },
    log: function(){
      return {
        history: data.history,
        price: data.price,
      };
    },
  }
})();
