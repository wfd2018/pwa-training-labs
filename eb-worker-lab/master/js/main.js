/*
Copyright 2016 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
(function() {
  'use strict';

  if (!('Worker' in window)) {
    console.log('Worker is not supported');
    return;
  }

  var worker = new Worker('js/web-worker.js');

  function recalculate() {
    var data = {
      initial: document.getElementById('initial').value,
      interest: document.getElementById('interest').value,
      years: document.getElementById('years').value
    };
    worker.postMessage(data);
  }

  document.getElementById('recalculate').addEventListener('click', recalculate);

  recalculate();

  worker.addEventListener('message', updatePage);

  function updatePage(messageEvent) {
    var final = messageEvent.data.final;
    var finalElem = document.getElementById('final');
    finalElem.value = final;

    var record = messageEvent.data.record;
    var history = document.getElementById('history');
    var recordElem = document.createElement('li');
    recordElem.innerHTML = record;
    history.appendChild(recordElem);
  }

})();
