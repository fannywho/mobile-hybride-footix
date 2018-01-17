function ajaxPlaceFind(url, container) {
  var xhr = new XMLHttpRequest();
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
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, false);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xhr.send(data);
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


function ajaxAddFormSubmit(form) {
  $(form).submit(function( event ) {

    var data  = $(form).serialize(),
        url   = 'http://localhost:8000/add';

    ajaxPlaceAdd(url, data);
    // TODO: Redirect After Submit
  });
}


function ajaxSearch(url) {
  var xhr = new XMLHttpRequest();
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
