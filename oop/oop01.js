var data = (function(){
  var data = 0;
  return {
    get: function(){
      return data;
    },
    set: function(e){
      data = e;
    },
  }
})();
