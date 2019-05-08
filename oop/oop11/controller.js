var bankController = (function(){
  var $ = function(id){
    return document.getElementById(id);
  };
  var el = {
    type: $('type'),
    money: $('money'),
    msg: $('msg'),
    current: $('current'),
    history: $('history'),
  }
  
  function timestamp(data) {
    var time = new Date(data);
    var result = time.getFullYear() + '/' +
    (time.getMonth() + 1) + '/' +
    time.getDate() + ' ' +
    time.getHours() + ':' +
    time.getMinutes() + ':' +
    time.getSeconds();
    return result;
  }

  function getTypeMsg(bool) {
    if (bool === undefined) return null;
    return bool ? '입금' : '출금';
  }

  function makeLog(log) {
    var html = [];
    html.push('<tr id="bank_log_'+ log.id +'">');
    html.push('<td>'+ log.id +'</td>');
    html.push('<td>'+ timestamp(log.timestamp) +'</td>');
    html.push('<td>'+ getTypeMsg(log.type) +'</td>');
    html.push('<td>'+ log.price +'원 </td>');
    html.push('<td>'+ log.msg +'</td>');
    html.push('<td>'+ log.current +'원 </td>');
    return html.join(' ');
  };

  function error(msg, type) {
    return alert((getTypeMsg(type) || '거래') + '에 실패했습니다.\n' + msg);
  }

  function showHistory() {
    var log = data.log();
    var html = [];
    for (var i = 0; i < log.history.length; i++) {
      html.push(makeLog(log.history[i]));
    }
    el.history.innerHTML = html.join(' ');
  }
  
  showHistory();
  return {
    use: function(){
      var type = !!Number(el.type.value);

      var num = Number(el.money.value);
      if (isNaN(num)) return error('거래금액은 숫자여야합니다.', type);
      el.money.value = '';
      
      var msg = el.msg.value;
      if (msg.length === 0) return error('거래내용을 입력해야 합니다.', type);
      el.msg.value = '';

      var result = type ? data.add(num, msg) : data.sub(num, msg);
      console.log(result);
      if (!result.status) alert('실패했습니다.\n' + result.msg)
      showHistory();
    }
  }
})();
