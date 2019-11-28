//json connect
var jsonhttp = new XMLHttpRequest();
var jsonFile = [];
var date = [];
var arr = [];
var temp = [];

function chdt() {
  for (var i = 0; i < arr.latest_songs.length; i++) {
    date.push(new Date(arr.latest_songs[i].release_date));
  }
}

function pushdate() {
  for (var i = 0; i < arr.latest_songs.length; i++) {
    arr.latest_songs[i].release_date = date[i];
  }
}

function sortarr() {
  function sort(a, b) {
    return new Date(a.release_date).getTime() - new Date(b.release_date).getTime();
  }
  var array = arr.latest_songs;
  temp = array.sort(sort);
  arr.latest_songs = temp.reverse();
  jsonFile = arr;
}

function reqJson() {
  if (this.readyState === 4 && this.status === 200) {
    arr = JSON.parse(this.responseText);
    chdt();
    pushdate();
    sortarr();
  }
}
jsonhttp.onreadystatechange = reqJson;
jsonhttp.open("GET", "json/music.json", true);
jsonhttp.send();

var audio = document.createElement('audio');
audio.id = 'crt-song-file';
audio.src = '';
document.body.appendChild(audio);

var script = document.createElement('script');
script.src = "js/mscript.min.js";
document.head.appendChild(script);

var script = document.createElement('script');
script.src = "js/b.js";
document.head.appendChild(script);
