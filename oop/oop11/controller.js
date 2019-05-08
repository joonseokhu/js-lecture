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

  function getMoneyStr(num) {
    return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원';
  }

  function getTypeMsg(bool) {
    if (bool === undefined) return null;
    return bool ? '입금' : '출금';
  }

  function makeLog(log) {
    var html = [];
    function td(value) {
      html.push('<td>'+value+'</td>');
    }
    var logTypeClassName = log.type ? 'add' : 'sub';
    html.push('<tr id="bank_log_'+ log.id +'" class="bank_log_'+logTypeClassName+'">');
    td(log.id)
    td(timestamp(log.timestamp))
    td(getTypeMsg(log.type))
    td(getMoneyStr(log.price))
    td(log.msg)
    td(getMoneyStr(log.current))
    html.push('</tr>');
    return html.join('\n');
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
    el.history.innerHTML = html.join('\n');
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
