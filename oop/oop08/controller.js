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
  function showHistory() {
    var history = data.history();
    el.history.innerHTML = JSON.stringify(history);
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
