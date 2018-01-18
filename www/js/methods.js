function ajaxPlaceFind() {
  var xhr = new XMLHttpRequest(),
      url = 'http://localhost:8000/results';
  xhr.open('GET', url, false);
  xhr.addEventListener("load", function () {
    if (xhr.status >= 200 && xhr.status < 400) {
      var card_list       = JSON.parse(xhr.responseText),
          container_card  = document.querySelector('#home .listing');
          container_card.innerHTML = '<h2>Notre sélection</h2>';
          for (var i = 0; i < card_list.length; i++) {
            var club_url = 'http://localhost:8000/clubs/'+card_list[i].club,
                club     = new XMLHttpRequest(),
                this_club;

            club.open('GET', club_url, false);

            club.addEventListener("load", function () {
              this_club  = JSON.parse(club.responseText);
            })

            club.send();
            container_card.innerHTML += '<ons-card><div class="listing__container" data-id="'+card_list[i]._id+'"><img class="listing__container__img" src="img/'+card_list[i].photos[0]+'" style="height:150px" alt=""><div class="listing__container__text"><div class="listing__container__text_info"><span>'+card_list[i].type+'</span><span>'+card_list[i].name+'</span></div><div><img src="img/'+this_club.icon+'" alt=""></div></div></div></ons-card>';
          };
      container_card.innerHTML += '<ons-button class="show-more" modifier="large" onclick="display()">Tout afficher (<span class="counter">60</span>)</ons-button>';

    }else{
      console.error(xhr.status);
    }
  });

  xhr.send();
}

function ajaxPlaceFindOne(param) {
  var xhr  = new XMLHttpRequest(),
      club = new XMLHttpRequest(),
      badge= new XMLHttpRequest(),
      url  = 'http://localhost:8000/results/id/'+param;
  xhr.open('GET', url, false);
  xhr.addEventListener("load", function () {
    if (xhr.status >= 200 && xhr.status < 400) {
      var card            = JSON.parse(xhr.responseText),
          container_card  = document.querySelector('#single .details__informations'),
          container_pic   = document.querySelector('#single ons-carousel .ons-swiper-target'),
          burl            = 'http://localhost:8000/badges/'+card.badges[0],
          curl            = 'http://localhost:8000/clubs/'+card.club,
          this_club,
          this_badge;

      badge.open('GET', burl, false);
      club.open('GET', curl, false);

      badge.addEventListener("load", function () {
        this_badge = JSON.parse(badge.responseText);
      })

      club.addEventListener("load", function () {
        this_club  = JSON.parse(club.responseText);
      })

      club.send();
      badge.send();

      var pic = card.photos;
      container_pic.innerHTML = '';

      for (var i = 0; i < pic.length; i++) {
        container_pic.innerHTML += '<ons-carousel-item><div class="item-label"><img src="img/'+pic[i]+'"></div></ons-carousel-item>'
      }

      container_card.innerHTML ='<div class="details__club"><h3>Club affilié</h3><img src="img/'+this_club.icon+'"><p>'+this_club.name+'</p></div><div class="details__title"><h3>'+card.name+'</h2><p>Pub</p><address>'+card.adresse+'</address></div><div class="details__cta"><a class="details__link" href=""><ons-button class="show" modifier="large">Y aller<img src="img/img-layout/maps.png"></ons-button></a></div><div class="details__badges"><h3>Badges <a href="#"></a></h3><img src="img/img-layout/'+this_badge.icon+'"><p>'+this_badge.name+'</p></div><div class="details__hours"><h3>Horaires</h3><p>Du lundi au samedi</p><div class="bar-opening__container"><p class="bar-opening">open</p><p>'+card.openHour+'</p><p class="bar-opening">closed</p><p>'+card.closeHour+'</p></div></div>';

      var link = document.querySelector('.details__link');

      console.log(link);

      link.setAttribute('href', 'https://www.google.com/maps/search/?api=1&query=' + card.adresse);
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
      var container_text = document.querySelector('.badges__tabs');
      container_text.innerHTML = '<ul></ul>'
      var container_img  = document.querySelector('.badges__tabs ul');
      for (var i = 0; i < res.length; i++) {
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

          var badges = document.querySelectorAll('.badges__tabs ul li');
          var tabs = document.querySelectorAll('.badges__tabs ons-card');
          var active = 0;

          for (var i = 0; i < badges.length; i++) {
            addLinkToDiv(i);
          }

          function addLinkToDiv(index) {
            badges[index].addEventListener('click', function () {
              badges[active].classList.remove('active');
              tabs[active].classList.remove('active');

              badges[index].classList.add('active');
              tabs[index].classList.add('active');
              active = index;
            });
          }

        var listingElements = document.querySelectorAll('.listing__container');
        // console.log(listingElements);
        var btnCount = document.querySelector('.counter');

        btnCount.innerHTML = listingElements.length;
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
      var div = document.querySelector('#search .listing');
      div.innerHTML = '<h2>Ne cherchez plus</h2>'
        for (var i = 0; i < res.length; i++) {
          var club_url = 'http://localhost:8000/clubs/'+res[i].club,
              club     = new XMLHttpRequest(),
              this_club;

          club.open('GET', club_url, false);

          club.addEventListener("load", function () {
            this_club  = JSON.parse(club.responseText);
          })

          club.send();

          div.innerHTML += '<ons-card><div class="listing__container" data-id="'+res[i]._id+'"><img class="listing__container__img" src="img/'+res[i].photos[0]+'" style="height:150px" alt=""><div class="listing__container__text"><div class="listing__container__text_info"><span>'+res[i].type+'</span><span>'+res[i].name+'</span></div><div><img src="img/'+this_club.icon+'" alt=""></div></div></div></ons-card>';
      }
      var cards = document.querySelectorAll('ons-card .listing__container'),
          nav   = document.querySelector('#myNavigator');
      for (var i = 0; i < cards.length; i++) {
        cards[i].onclick = function() {
          nav.pushPage('single.html', {data: {id: this.dataset.id}});
        }
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
