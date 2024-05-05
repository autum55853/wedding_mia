var bouncingAnimMap = [];
var transformStatMap = [];
var isPlaying = false;

function doMainPageAnim(isLandscape, callback) {
  const shouldHideText = isLandscape;
  const shouldFadeInformationIn = isLandscape;
  anime({
    targets: "#main-img",
    easing: "linear",
    translateX: [50, 0],
    translateY: [-40, 0],
    duration: 3000,
    complete: anim => {
      if (!isLandscape) {
        callback();
      }
    }
  });

  anime({
    targets: "#main-img",
    easing: "linear",
    opacity: [0, 1],
    duration: 1000
  });

  anime({
    targets: "#top-text",
    easing: "linear",
    translateX: [-10, 0],
    translateY: [-40, 0],
    duration: 3000,
    complete: anim => {
      showButtons(shouldFadeInformationIn);

      if (shouldHideText) {
        anime({
          targets: "#top-text",
          easing: "linear",
          opacity: [1, 0],
          duration: 1000
        });
      }
    }
  });

  anime({
    targets: "#top-text",
    easing: "linear",
    opacity: [0, 1],
    duration: 1000
  });

  anime({
    targets: "#main-text",
    easing: "linear",
    translateX: [-10, 0],
    translateY: [-40, 0],
    duration: 3000,
    complete: anim => {
      showButtons(shouldFadeInformationIn);

      if (shouldHideText) {
        anime({
          targets: "#main-text",
          easing: "linear",
          opacity: [1, 0],
          duration: 1000
        });
      }
    }
  });

  anime({
    targets: "#main-text",
    easing: "linear",
    opacity: [0, 1],
    duration: 1000
  });
}

function showButtons(shouldFadeInformationIn) {
  const ids = ["#btn-info", "#btn-music", "#btn-map", "#btn-photo", "#btn-secret", "#bottom-text"];
  if (shouldFadeInformationIn) {
    ids.push("#information");
  }
  for (let i = 0; i < ids.length; i++) {
    anime({
      targets: ids[i],
      opacity: [0, 1],
      easing: "linear",
      duration: 1000
    });
  }
}

function initButtonsAnim(isLandscape) {
  let targets = [];
  if (isLandscape) {
    targets = [
      { id: "btn-music", delay: 200, duration: 800 },
      { id: "btn-map", delay: 0, duration: 1000 },
      { id: "btn-photo", delay: 100, duration: 1900 },
      { id: "btn-secret", delay: 500, duration: 1200 },
    ];
  } else {
    targets = [
      //{ id: "btn-music", delay: 200, duration: 800 }
    ];
  }

  for (let i = 0; i < targets.length; i++) {
    const options = {
      targets: "#" + targets[i].id,
      direction: "alternate",
      loop: true,
      translateY: -10,
      easing: "linear",
      duration: targets[i].duration
    };
    
    bouncingAnimMap[targets[i].id] = anime(options);

    document
      .getElementById(targets[i].id)
      .addEventListener(
        "mouseenter",
        () => hoverButton(targets[i].id, true),
        false
      );
    document
      .getElementById(targets[i].id)
      .addEventListener(
        "mouseleave",
        () => hoverButton(targets[i].id, false),
        false
      );
  }
}

function hoverButton(id, isEnter) {
  if (isEnter) {
    bouncingAnimMap[id].pause();
    transformStatMap[id] = document.getElementById(id).style.webkitTransform;
    document.getElementById(id).style.webkitTransform += "scale(1.4)";
  } else {
    bouncingAnimMap[id].play();
    document.getElementById(id).style.webkitTransform = transformStatMap[id];
  }
}

function getForYouObject() {
  const id = parseInt(findGetParameter('id'));
  const key = findGetParameter('key');
  if (id === null || key === null) return null;
  return retrieveForYouData(id, key);
}

function setupForYou(isLandscape) {
  (async () => {
    const element = document.getElementById('for-you-text');
    const forYouObject = await getForYouObject();
    console.log('forU: ', forYouObject);
    if (!forYouObject || !forYouObject.name || !forYouObject.msg) {
      element.innerHTML = "誠摯邀請您來參加我們的婚禮，非常期待當天能與您聊聊天、好好吃頓飯：）";
    } else {
      element.innerHTML = "Hi " + forYouObject.name + ", </br></br>"
          + forYouObject.msg;
      if (forYouObject.is11) {
        if (isLandscape) {
          document.getElementById("information").src = "image/images.png";
        } else {
          //document.getElementById("bottom-text").src = "image/location.png";
          document.getElementById("information").src = "image/light.png";
        }
      }
    }
  })();
}

function addEvent(object, type, callback) {
  if (object == null || typeof(object) == 'undefined') return;
  if (object.addEventListener) {
      object.addEventListener(type, callback, false);
  } else if (object.attachEvent) {
      object.attachEvent("on" + type, callback);
  } else {
      object["on"+type] = callback;
  }
};

function initMusicBtn() {
  const element = document.getElementById("music");
  element.onplaying = () => { isPlaying = true; }
  element.onpause = () => { isPlaying = false; }
  element.muted = true;
  isPlaying=true;
}

function toggleMusicBtn() {
  console.log(isPlaying);
  if (isPlaying) {
    document.getElementById("btn-music").style.backgroundImage = 'url("image/music_close.png")';
    // document.getElementById("music").pause();
   pauseAudio();
    isPlaying=true;
  } else {
     document.getElementById("btn-music").style.backgroundImage = 'url("image/music_open.png")';
    // document.getElementById("music").play();
    playAudio();
    isPlaying=false;
  }
}

//解決browser限制頁面載入時的自動撥放問題
function playAudio() {
  console.log('撥放音樂');
    var audio = document.getElementById("music");
    audio.play();
  }

  function pauseAudio() {
    console.log('暫停音樂');
    var audio = document.getElementById("music");
    audio.pause();
  }