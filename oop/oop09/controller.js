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
  
  function makeLog(log) {
    var html = [];
    var type_msg = log.type ? '입금' : '출금';
    html.push('<tr>');
    html.push('<td>'+ log.timestamp +'</td>');
    html.push('<td>'+ type_msg +'</td>');
    html.push('<td>'+ log.price +'</td>');
    html.push('<td>'+ log.current +'</td>');
    return html.join(' ');
  };

  function showHistory() {
    var history = data.history();
    var html = [];
    for (var i = 0; i < history.history.length; i++) {
      html.push(makeLog(history.history[i]));
    }
    el.history.innerHTML = html.join(' ');
  }
  
  showHistory();
  return {
    use: function(){
      var type = !!Number(el.type.value);
      var num = Number(el.money.value);
      var result = type ? data.add(num) : data.sub(num);
      console.log(result);
      showHistory();
    }
  }
})();
