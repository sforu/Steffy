"use strict";
var document, window;
var audioFile = document.getElementById('crt-song-file');
var play_btn = document.getElementById('plSong');
var song_cover = document.getElementById('song-cover');
var ctr_trk = document.getElementById('current-track');
var trk_dur = document.getElementById('track-time');
var default_bar = document.getElementById('defaultBar');
var progress_bar = document.getElementById('progressBar');
var progress_barb = document.getElementById('crtProgress');
var seek_dot = document.getElementById('seek-dot');
var songId = 0;
var pre_song = document.getElementById('preSong');
var next_song = document.getElementById('nxtSong');
var song_name = document.getElementById("s-nm-main");
var s_ar = document.getElementById('ar-nm-main');
var song_cover_img = document.getElementById('song-cover-img');
var buf_bar = document.getElementById('buffer-bar');
var buf_amt = document.getElementById('buffer-amt');
var rpt_btn = document.getElementById('rpt-song');
var vol = document.getElementById('vol-state');
var vol_cont = document.getElementById('vol-cont');
var artist_name = document.getElementById('ar-nm');
var s_nm = document.getElementById('s-nm');
var min_plbtn = document.getElementById('pl-state');
var pl_o_ar = document.getElementById('pl_o_aero');
var ar_h_i = document.getElementById('s-m-img');
var updateCrtTime;
var play_song = document.getElementById('play-song');
var plSong = document.getElementById('plSong');
var crt_list = document.getElementById('song-items');


window.addEventListener('online', function() {
  document.getElementById('online-status').style.backgroundColor = 'green';
  document.getElementById('on_st_txt').innerHTML = "Back online! Please reload again!";
  document.getElementById('online-status').style.top = '0px';
  setTimeout(function() {
    document.getElementById('online-status').style.display = 'none';
  }, 2000);
  return false;
});
window.addEventListener('offline', function() {
  document.getElementById('online-status').style.backgroundColor = 'red';
  document.getElementById('on_st_txt').innerHTML = "You are offline!";
  document.getElementById('online-status').style.top = '0px';
  setTimeout(function() {
    document.getElementById('online-status').style.display = 'none';
  }, 2000);
  return false;
});


//player control for mainPlayer
function pl_track() {
  plSong.style.backgroundImage = 'linear-gradient(150deg, #d2039e, #1703d2)';
  if (!audioFile.paused && !audioFile.ended) {
    audioFile.pause();
    window.clearInterval(updateCrtTime);
    min_plbtn.innerHTML = '<svg width="26" height="20" viewBox="-6 0 24 24"> <path class="fill_path" fill="#d2039e" fill-rule="evenodd" d="M0 0v24l20-12z"></path> </svg>';
    play_song.innerHTML = '<svg width="24" height="24" viewBox="-13 -3 35 24" fill="#FFFFFF"><path class="fill_path" fill-rule="evenodd" d="M0 0v24l20-12z"></path></svg>';
  } else if (audioFile.paused) {
    audioFile.play();
    min_plbtn.innerHTML = '<svg width="33" height="33" viewBox="0 0 24 24" version="1.1"> <defs></defs> <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g transform="translate(-280.000000, -239.000000)" fill="#1703d2" fill-rule="nonzero"> <g transform="translate(20.000000, 213.000000)"> <g transform="translate(260.000000, 26.000000)"> <path class="fill_path" d="M14,19 L18,19 L18,5 L14,5 L14,19 Z M6,19 L10,19 L10,5 L6,5 L6,19 Z"></path> </g> </g> </g> </g> </svg>';
    play_song.innerHTML = '<svg width="24px" height="24px" viewBox="-3 -3 24 24" version="1.1"><defs></defs><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-280.000000, -239.000000)" fill="#FFFFFF" fill-rule="nonzero"><g transform="translate(20.000000, 213.000000)"><g transform="translate(260.000000, 26.000000)"><path class="fill_path" d="M14,19 L18,19 L18,5 L14,5 L14,19 Z M6,19 L10,19 L10,5 L6,5 L6,19 Z"></path></g></g></g></g></svg>';
  }
}


//player controls for loadeddata
function preloadAudio() {
  play_btn.removeEventListener('click', pl_track);
  min_plbtn.removeEventListener('click', pl_track);
  var a = document.getElementById('csli-src');
  var b = document.getElementById('cs_li_image');
  var c = document.getElementById('cs_li_n');
  var d = document.getElementById('cs_li_ar');
  a.setAttribute("url", jsonFile.latest_songs[songId].url);
  a.setAttribute("name", jsonFile.latest_songs[songId].name);
  a.setAttribute("image", jsonFile.latest_songs[songId].image);
  a.setAttribute("artist", jsonFile.latest_songs[songId].artist);
  b.src = jsonFile.latest_songs[songId].image;
  c.innerHTML = jsonFile.latest_songs[songId].name;
  d.innerHTML = jsonFile.latest_songs[songId].artist;
  if (!audioFile.paused && !audioFile.ended) {
    audioFile.pause();
    window.clearInterval(updateCrtTime);
    min_plbtn.innerHTML = '<svg width="26" height="20" viewBox="-6 0 24 24"> <path class="fill_path" fill="#d2039e" fill-rule="evenodd" d="M0 0v24l20-12z"></path> </svg>';
    play_song.innerHTML = '<svg width="24" height="24" viewBox="-13 -3 35 24" fill="#FFFFFF"><path class="fill_path" fill-rule="evenodd" d="M0 0v24l20-12z"></path></svg>';
  } else if (audioFile.paused) {
    plSong.style.backgroundImage = '';
    min_plbtn.innerHTML = '<a class="preloadMin"><svg class="circular" width="35px" height="35px" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"></circle></svg></a>';
    play_song.innerHTML = '<a class="preloadMain"><svg class="circular-main" style="pointer-events: none" width="35px" height="35px" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="3" stroke-miterlimit="10"></circle></svg></a>';
    audioFile.play();
  }
}

//nxt song

function pl_nxt() {
  if (songId < (crt_list.children.length - 1) && sufCk !== true) {
    songId = songId + 1;
    s_ar.innerHTML = crt_list.children[songId].getAttribute('artist');
    artist_name.innerHTML = crt_list.children[songId].getAttribute('artist');
    song_name.innerHTML = crt_list.children[songId].getAttribute('name');
    s_nm.innerHTML = crt_list.children[songId].getAttribute('name');
    audioFile.src = crt_list.children[songId].getAttribute('url');
    song_cover_img.src = crt_list.children[songId].getAttribute('image');
    progress_bar.style.width = '0%';
    progress_barb.style.width = '0%';
    seek_dot.style.left = '0%';
    buf_amt.style.width = '0%';
    window.clearInterval(updateCrtTime);
    ctr_trk.innerHTML = '00:00';
    trk_dur.innerHTML = '00:00';
    preloadAudio();
  } else if(sufCk === true){
    suf();
  }
}

next_song.addEventListener('click', pl_nxt);

// pre song
pre_song.addEventListener('click', function() {
  var cl = document.getElementById('preCheckColor');
  if (songId > 0 && sufCk === false) {
    songId = songId - 1;
    s_ar.innerHTML = crt_list.children[songId].getAttribute('artist');
    artist_name.innerHTML = crt_list.children[songId].getAttribute('artist');
    song_name.innerHTML = crt_list.children[songId].getAttribute('name');
    s_nm.innerHTML = crt_list.children[songId].getAttribute('name');
    audioFile.src = crt_list.children[songId].getAttribute('url');
    song_cover_img.src = crt_list.children[songId].getAttribute('image');
    progress_bar.style.width = '0%';
    progress_barb.style.width = '0%';
    seek_dot.style.left = '0%';
    buf_amt.style.width = '0%';
    window.clearInterval(updateCrtTime);
    ctr_trk.innerHTML = '00:00';
    trk_dur.innerHTML = '00:00';
    preloadAudio();
  } else if(sufCk === true){
    suf();
  }
});

//suffle songs
var sufCk = false;

function suf() {
  if (songId < (crt_list.children.length - 1)) {
    songId = Math.floor(Math.random() * crt_list.children.length);
    s_ar.innerHTML = crt_list.children[songId].getAttribute('artist');
    artist_name.innerHTML = crt_list.children[songId].getAttribute('artist');
    song_name.innerHTML = crt_list.children[songId].getAttribute('name');
    s_nm.innerHTML = crt_list.children[songId].getAttribute('name');
    audioFile.src = crt_list.children[songId].getAttribute('url');
    song_cover_img.src = crt_list.children[songId].getAttribute('image');
    progress_bar.style.width = '0%';
    progress_barb.style.width = '0%';
    seek_dot.style.left = '0%';
    buf_amt.style.width = '0%';
    window.clearInterval(updateCrtTime);
    ctr_trk.innerHTML = '00:00';
    trk_dur.innerHTML = '00:00';
    preloadAudio();
  }
}
document.getElementById('sufSong').addEventListener('click', function() {
  var sufStatus = document.getElementById('sufSongColor');
  if (sufCk === false) {
    sufCk = true;
    sufStatus.setAttribute('fill', '#E72C30');
  } else {
    sufCk = false;
    sufStatus.setAttribute('fill', '#000000');
  }
});

//for track time and progress bar
function crt_time() {
  var crt_min = parseInt(audioFile.currentTime / 60);
  var crt_sec = parseInt(audioFile.currentTime % 60);
  var trk_min = parseInt(audioFile.duration / 60);
  var trk_sec = parseInt(audioFile.duration % 60);
  if (!audioFile.ended) {
    ctr_trk.innerHTML = ("0" + crt_min).slice(-2) + ":" + ("0" + crt_sec).slice(-2);
    trk_dur.innerHTML = ("0" + trk_min).slice(-2) + ":" + ("0" + trk_sec).slice(-2);
  } else if (audioFile.ended && (audioFile.loop === false) && (sufCk === false)) {
    pl_nxt();
  } else if (audioFile.ended && (sufCk === true)) {
    suf();
  }
}

//min player
function fst_load() {
  s_ar.innerHTML = crt_list.children[0].getAttribute('artist');
  artist_name.innerHTML = crt_list.children[0].getAttribute('artist');
  song_name.innerHTML = crt_list.children[0].getAttribute('name');
  s_nm.innerHTML = crt_list.children[0].getAttribute('name');
  audioFile.src = crt_list.children[0].getAttribute('url');
  song_cover_img.src = crt_list.children[0].getAttribute('image');
  ar_h_i.style.backgroundColor = "transparent";
  pl_o_ar.innerHTML = '<svg width="55px" height="55px" viewBox="-9 -9 41 41" version="1.1"> <defs></defs> <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g transform="translate(-153.000000, -832.000000)" fill="#807d7d" fill-rule="nonzero"> <g transform="translate(19.000000, 581.000000)"> <g transform="translate(134.000000, 251.000000)"> <polygon class="fill_path" transform="translate(12.000000, 12.000000) rotate(270.000000) translate(-12.000000, -12.000000) " points="8 16.58 12.9446694 12 8 7.41 9.52226721 6 16 12 9.52226721 18"></polygon> </g> </g> </g> </g> </svg>';
  preloadAudio();
  pl_o_ar.addEventListener('click', function() {
    var main_pl = document.getElementById('main-player');
    var min_pl = document.getElementById('min-player');
    main_pl.style.display = 'block';
    min_pl.style.display = 'none';
  });
  min_plbtn.removeEventListener('click', fst_load);
}


//for buffering and progress bar
window.addEventListener('load', function() {
  audioFile.addEventListener('progress', function() {
    var duration = audioFile.duration,
      i;
    if (duration > 0) {
      for (i = 0; i < audioFile.buffered.length; i += 1) {
        if (audioFile.buffered.start(audioFile.duration.length - 1 - i) < audioFile.currentTime) {
          buf_amt.style.width = (audioFile.buffered.end(audioFile.duration.length - 1 - i) / audioFile.duration) * 100 + '%';
          break;
        }
      }
    }
  });

  audioFile.addEventListener('timeupdate', function() {
    var duration = audioFile.duration;
    if (duration > 0) {
      progress_bar.style.width = (audioFile.currentTime / audioFile.duration) * 100 + '%';
      progress_barb.style.width = (audioFile.currentTime / audioFile.duration) * 100 + '%';
      seek_dot.style.left = ((audioFile.currentTime / audioFile.duration) * 100) - 0.53 + '%';
    }
  });
});

// for seek song

function seek(e) {
  var seek_pos_x = (e.pageX - default_bar.offsetLeft) / default_bar.offsetWidth;
  var seek_time = seek_pos_x * audioFile.duration;
  audioFile.currentTime = seek_time;
  progress_bar.style.width = seek_time + 'px';
  progress_barb.style.width = seek_time + 'px';
}
default_bar.addEventListener('click', seek);
default_bar.addEventListener('mouseup', seek);

function touchSeek(e) {
  e.preventDefault;
  var seek_pos_x = (e.touches[0].pageX - default_bar.offsetLeft) / default_bar.offsetWidth;
  var seek_time = seek_pos_x * audioFile.duration;
  audioFile.currentTime = seek_time;
  progress_bar.style.width = seek_time + 'px';
  progress_barb.style.width = seek_time + 'px';
  var crt_min = parseInt(audioFile.currentTime / 60),
    crt_sec = parseInt(audioFile.currentTime % 60);
  ctr_trk.innerHTML = ("0" + crt_min).slice(-2) + ":" + ("0" + crt_sec).slice(-2);
  audioFile.pause();
}

default_bar.addEventListener('touchmove', touchSeek);
default_bar.addEventListener('touchend', pl_track);
default_bar.addEventListener('touchstart', touchSeek);


window.addEventListener('keyup', function(ev) {
  if (ev.keyCode === 75) {
    ev.preventDefault();
    play_btn.click();
    if (audioFile.paused) {
      play_btn.setAttribute('title', 'play(k)');
    } else {
      play_btn.setAttribute('title', 'pause(k)');
    }
  }
});
window.addEventListener('keyup', function(ev) {
  if (ev.keyCode === 76) {
    ev.preventDefault();
    next_song.click();
  }
});
window.addEventListener('keyup', function(ev) {
  if (ev.keyCode === 74) {
    ev.preventDefault();
    pre_song.click();
  }
});
audioFile.volume = 1;
window.addEventListener('keydown', function(ev) {
  if (ev.keyCode === 77) {
    ev.preventDefault();
    audioFile.muted = false;
    if (audioFile.volume < 1) {
      audioFile.volume = audioFile.volume + 0.1;
    }
  }
});
window.addEventListener('keydown', function(ev) {
  if (ev.keyCode === 78) {
    ev.preventDefault();
    if (audioFile.volume > 0.1) {
      audioFile.volume = audioFile.volume - 0.1;
      if (audioFile.volume > 0.1) {
        audioFile.muted = false;
        if (audioFile.volume < 0.1) {
          audioFile.muted = true;
        }
      }
    }
  }

});

//for repeat button

function rpt_song() {
  var rpt_status = document.getElementById('rptChangeOnClick');
  if (audioFile.loop !== true) {
    sufCk = false;
    audioFile.loop = true;
    rpt_status.setAttribute('fill', '#E72C30');
  } else {
    audioFile.loop = false;
    rpt_status.setAttribute('fill', '#000000');
  }
}
rpt_btn.addEventListener('click', rpt_song);


function gnl() {
  var ul = document.getElementById('song-items'),
    i, j, k;
  for (i = 0; i < jsonFile.latest_songs.length; i++) {
    var li = document.createElement('li'),
      div = document.createElement('div');
    div.className = 'det_hold';
    li.className = 'song-list-src';
    li.setAttribute("url", jsonFile.latest_songs[i].url);
    li.setAttribute("name", jsonFile.latest_songs[i].name);
    li.setAttribute("image", jsonFile.latest_songs[i].image);
    li.setAttribute("artist", jsonFile.latest_songs[i].artist);
    li.setAttribute('index', i);
    var arr = ["s_li_img", "s_li_n", "s_li_ar", "rm_li_song", "mv_cr_pl"];
    for (j = 0; j < arr.length; j++) {
      var span = document.createElement('span');
      span.className = arr[j];
      if (j <= 2) {
        div.appendChild(span);
      } else {
        li.appendChild(span);
      }
      li.appendChild(div);
      // li.appendChild(span);
    }
    ul.appendChild(li);
  }

  function spl() {
    var a = document.getElementsByClassName('s_li_img'),
      s = document.getElementsByClassName('s_li_n'),
      d = document.getElementsByClassName('s_li_ar'),
      f = document.getElementsByClassName('rm_li_song'),
      g = document.getElementsByClassName('det_hold'),
      h = document.getElementById('mv_cr_pl');
    for (k = 0; k < a.length; k++) {
      var img = document.createElement('img');
      img.className = 's_li_image';
      img.alt = "";
      img.src = a[k].parentElement.parentElement.getAttribute('image');
      a[k].appendChild(img);
      s[k].innerHTML = s[k].parentElement.parentElement.getAttribute('name');
      d[k].innerHTML = d[k].parentElement.parentElement.getAttribute('artist');
      f[k].innerHTML = '<svg id="Outlined" viewBox="-8 -8 50 50" fill="#bbbbbb"><title/><g id="Fill"><path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,26A12,12,0,1,1,28,16,12,12,0,0,1,16,28Z"/><rect height="2" width="12" x="10" y="15"/></g></svg>';
      f[k].addEventListener('click', function() {
        this.parentNode.parentNode.removeChild(this.parentNode);
      });
      g[k].addEventListener('click', function() {
        songId = Number(this.parentElement.getAttribute('index'));
        progress_bar.style.width = '0%';
        progress_barb.style.width = '0%';
        seek_dot.style.left = '0%';
        buf_amt.style.width = '0%';
        window.clearInterval(updateCrtTime);
        ctr_trk.innerHTML = '00:00';
        trk_dur.innerHTML = '00:00';
        audioFile.src = this.parentElement.getAttribute('url');
        s_ar.innerHTML = this.parentElement.getAttribute('artist');
        song_name.innerHTML = this.parentElement.getAttribute('name');
        song_cover_img.src = this.parentElement.getAttribute('image');
        preloadAudio();
      });
    }
  }
  spl();
  min_plbtn.addEventListener('click', fst_load);
}
window.onload = gnl;

//on media loaded
audioFile.addEventListener('loadeddata', function() {
  updateCrtTime = setInterval(crt_time, 500);
  plSong.style.backgroundImage = 'linear-gradient(150deg, #d2039e, #1703d2)';
  min_plbtn.innerHTML = '<svg width="33" height="33" viewBox="0 0 24 24" version="1.1"> <defs></defs> <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g transform="translate(-280.000000, -239.000000)" fill="#1703d2" fill-rule="nonzero"> <g transform="translate(20.000000, 213.000000)"> <g transform="translate(260.000000, 26.000000)"> <path class="fill_path" d="M14,19 L18,19 L18,5 L14,5 L14,19 Z M6,19 L10,19 L10,5 L6,5 L6,19 Z"></path> </g> </g> </g> </g> </svg>';
  play_song.innerHTML = '<svg width="24px" height="24px" viewBox="-3 -3 24 24" version="1.1"><defs></defs><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-280.000000, -239.000000)" fill="#FFFFFF" fill-rule="nonzero"><g transform="translate(20.000000, 213.000000)"><g transform="translate(260.000000, 26.000000)"><path class="fill_path" d="M14,19 L18,19 L18,5 L14,5 L14,19 Z M6,19 L10,19 L10,5 L6,5 L6,19 Z"></path></g></g></g></g></svg>';
  play_btn.removeEventListener('click', preloadAudio);
  play_btn.addEventListener('click', pl_track);
  min_plbtn.removeEventListener('click', preloadAudio);
  min_plbtn.addEventListener('click', pl_track);
});



//close main player
var clmnpl = document.getElementById('clMnPl');
clmnpl.addEventListener('click', function() {
  var c = document.getElementById('main-player');
  var m = document.getElementById('min-player');
  if (c.style.display === 'none') {
    c.style.display = 'block';
    m.style.display = 'none';
  } else {
    c.style.display = 'none';
    m.style.display = 'block';
  }
});


// list opener
var li_opn = document.getElementById('cr_li_opn');
var li_opn_t = document.getElementById('opntext');
var li_y;

function li_op_s(ev) {
  ev.preventDefault;
  li_opn_t.innerHTML = 'Swipe up';
  li_y = ev.touches[0].pageY / window.innerHeight * 100;
}
li_opn.addEventListener('touchstart', li_op_s);

function li_op_e(ev) {
  var l = document.getElementById('song-list-tab');
  ev.preventDefault;
  li_opn_t.innerHTML = 'Swipe up to open playlist';
  if (li_y < 50) {
    l.style.display = 'block';
    li_opn.style.top = '-' + li_opn.offsetHeight + 'px';
  } else {
    li_opn.style.top = '69%';
  }
}
li_opn.addEventListener('touchend', li_op_e);

function li_op_m(ev) {
  ev.preventDefault;
  li_y = ev.touches[0].pageY / window.innerHeight * 100;
  var l = document.getElementById('song-list-tab');
  li_opn.style.top = ev.touches[0].pageY / window.innerHeight * 100 + '%';
}
li_opn.addEventListener('touchmove', li_op_m);

//list close
var li_close = document.getElementById('cr_li_close');
var li_close_t = document.getElementById('closetext');
var li_cy;
var li_tab = document.getElementById('song-list-tab');

function li_op_cs(ev) {
  ev.preventDefault;
  li_tab.style.overflow = 'hidden';
  li_close_t.innerHTML = 'Swipe';
  li_cy = ev.touches[0].pageY / window.innerHeight * 100;
}
li_close.addEventListener('touchstart', li_op_cs);

function li_op_ce(ev) {
  ev.preventDefault;
  li_tab.style.overflow = 'scroll';
  li_close_t.innerHTML = 'Swipe down to close playlist';
  if (li_cy < 20) {
    li_tab.style.display = 'block';
  } else {
    li_tab.style.display = 'none';
    li_opn.style.display = 'block';
    li_opn.style.top = '69%';
  }
}
li_close.addEventListener('touchend', li_op_ce);

function li_op_cm(ev) {
  ev.preventDefault;
  li_tab.style.overflow = 'hidden';
  li_close_t.innerHTML = 'Swipe';
  if (li_cy > 20) {
    li_close_t.innerHTML = 'Close!';
  }
  li_cy = ev.touches[0].pageY / window.innerHeight * 100;
}
li_close.addEventListener('touchmove', li_op_cm);
