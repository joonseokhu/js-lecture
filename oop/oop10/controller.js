var bankController = (function(){
  var $ = function(id){
    return document.getElementById(id);
  };
  var el = {
    type: $('type'),
    money: $('money'),
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

  function makeLog(log) {
    var html = [];
    var type_msg = log.type ? '입금' : '출금';
    html.push('<tr id="bank_log_'+ log.id +'">');
    html.push('<td>'+ log.id +'</td>');
    html.push('<td>'+ timestamp(log.timestamp) +'</td>');
    html.push('<td>'+ type_msg +'</td>');
    html.push('<td>'+ log.price +'원 </td>');
    html.push('<td>'+ log.current +'원 </td>');
    return html.join(' ');
  };


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
      if (isNaN(num)) return alert('실패했습니다.\n' + '거래금액은 숫자여야합니다.');
      el.money.value = '';
      var result = type ? data.add(num) : data.sub(num);
      console.log(result);
      if (!result.status) alert('실패했습니다.\n' + result.msg)
      showHistory();
    }
  }
})();
