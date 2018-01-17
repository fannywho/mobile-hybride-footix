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



function ajaxClubFind() {
  var xhr        = new XMLHttpRequest(),
      url        = 'http://localhost:8000/clubs';
  xhr.open('GET', url, false);

  xhr.addEventListener("load", function () {
    if (xhr.status >= 200 && xhr.status < 400) {
      var res = JSON.parse(xhr.responseText);

      return res;

    }else{
      console.error(xhr.status);
    }
  });

  xhr.send();
}

function ajaxBadgeFind() {
  var xhr        = new XMLHttpRequest(),
      url        = 'http://localhost:8000/badges';
  xhr.open('GET', url, false);

  xhr.addEventListener("load", function () {
    if (xhr.status >= 200 && xhr.status < 400) {
      var res = JSON.parse(xhr.responseText);
      var container_img  = document.querySelector('.badges__tabs ul');
      var container_text = document.querySelector('.badges__tabs');
      console.log(container_img);
      console.log(container_text);
      for (var i = 0; i < res.length; i++) {
        console.log(res[i]);
        if (i === 0) {
          container_img.innerHTML += '<li class="active"><img src ="img/img-layout/'+res[i].icon+'"></li>';
        } else {
          container_img.innerHTML += '<li><img src ="img/img-layout/'+res[i].icon+'"></li>';
        }
      }

      for (var i = 0; i < res.length; i++) {
        if (i === 0) {
          container_text.innerHTML += '<ons-card class="active"><img src="img/img-layout/'+res[i].icon+'"><h3>'+res[i].name+'</h3><p>'+res[i].description+'</p></ons-card>'
        } else {
          container_text.innerHTML += '<ons-card><img src="img/img-layout/'+res[i].icon+'"><h3>'+res[i].name+'</h3><p>'+res[i].description+'</p></ons-card>'
        }
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


// Get URI params
function $_GET(param) {
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace(
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;
	}
	return vars;
}
