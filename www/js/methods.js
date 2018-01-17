function ajaxPlaceFind(url, container) {
  var xhr        = new XMLHttpRequest();
  xhr.open('GET', url, false);

  xhr.addEventListener("load", function () {
    if (xhr.status >= 200 && xhr.status < 400) {
      var res = JSON.parse(xhr.responseText);
      if (res instanceof Array){
        for (var i = 0; i < res.length; i++) {
          console.log(res[i]);
        }
      }else{
        console.log(res);
      }
    }else{
      console.error(xhr.status);
    }
  });

  xhr.send();
}

// TODO: Prevent Form Submit Action
function ajaxPlaceAdd(url, data) {
  // var mdr = JSON.stringify(data);
  var mdr = 'name='+data.name+'&type='+data.type+'&city='+data.city+'&club='+data.club;
  // console.log(data.type);
  // console.log(mdr);
  // return false;
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, false);

  xhr.send(mdr);
}



function ajaxClubFind(url, container) {
  var xhr        = new XMLHttpRequest();
  xhr.open('GET', url, false);

  xhr.addEventListener("load", function () {
    if (xhr.status >= 200 && xhr.status < 400) {
      var res = JSON.parse(xhr.responseText);
      if (res instanceof Array){
        for (var i = 0; i < res.length; i++) {
          console.log(res[i]);
        }
      }else{
        console.log(res);
      }
    }else{
      console.error(xhr.status);
    }
  });

  xhr.send();
}
