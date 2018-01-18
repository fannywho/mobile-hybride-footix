/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

document.addEventListener('init', function(event) {
  var page = event.target;

  if (page.id === 'home') {
    var pushBtn = page.querySelectorAll('.push-button');
    for (var i = 0; i < pushBtn.length; i++) {
      pushBtn[i].onclick = function() {
        document.querySelector('#myNavigator').pushPage('single.html', {data: {title: 'Single'}});
      };
    }
  }
});

document.addEventListener('deviceready', function() {
  function showForms() {
    var forms = document.querySelectorAll('.form-step');
    var nextBtn = document.querySelectorAll('.next');
    var index = 0;

    forms[index].classList.add("show-form");

    for (var i = 0; i < nextBtn.length; i++) {
      nextBtn[i].addEventListener('click', function() {
        forms[index].classList.remove("show-form");
        index++;
        forms[index].classList.add("show-form");
      });
    }
  }

  function getItems() {
    var listNumber = document.querySelectorAll('.listing__container').length;
    var moreBtn = document.querySelector('.show-more > span');

    moreBtn.innerHTML = listNumber;
  }

  showForms();
  getItems();
})

function display() {
  var btn = document.querySelector('.listing > .show-more');
  var elem = document.querySelectorAll('.listing .card');

  for (i = 0; i < elem.length; i++) {
    if (elem[i].className != "show") {
      elem[i].classList.add("show");
    }
  }
  btn.classList.add("hide");
}
