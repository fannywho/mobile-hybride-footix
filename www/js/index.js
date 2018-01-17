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
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

document.addEventListener('init', function(event) {

    // TABS //

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
  console.log(listingElements);
  var btnCount = document.querySelector('.counter');

  btnCount.innerHTML = listingElements.length;
});

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





