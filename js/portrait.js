var buttonSize = 0;
function setTitle(){
  document.getElementsByTagName("title")[0].innerHTML = "Mia & XXX Wedding Invitation";
}
function initUI() {
  const buttonIds = ["btn-info", "btn-map", "btn-photo", "btn-secret"];
  const screenWidth = screen.width;
  const screenHeight = screen.height;
  const margin = screenWidth * 0.035;
  const maxButtonSize = (screenWidth * 0.7 - margin * 3) / 4;
  const minButtonSize = screenHeight * 0.1;
  buttonSize = Math.min(minButtonSize, maxButtonSize);

  for (const id of buttonIds) {
    // if (id !== "btn-secret") {
    //   document.getElementById(id).style.marginRight = margin;
    // }
    document.getElementById(id).style.width = buttonSize;
    document.getElementById(id).style.height = buttonSize;
  }

  //document.getElementById("top-text").style.height = screenHeight * 0.08;
  document.getElementById("main-img").style.height = screenHeight * 0.4;
  //document.getElementById("bottom-text").style.height = screenHeight * 0.08;
  document.getElementById("btn-container").style.paddingTop = screenHeight * 0.02;

  initMusicBtnLocation();
}

function initMusicBtnLocation() {
  var rect = document.getElementById("main-img").getBoundingClientRect();
  const element = document.getElementById("btn-music");
  element.style.width = buttonSize * 0.9;
  element.style.height = buttonSize * 0.9;
  element.style.left = rect.left + rect.width;
  element.style.top = rect.top + rect.height - buttonSize * 0.9;
}

document.addEventListener("DOMContentLoaded", async () => {
  MicroModal.init({
    disableFocus: true,
    awaitCloseAnimation: true
  });
  setTitle();
  // Dynamically determine some UI elements based on the screen size.
  initUI();
  initMusicBtn();

  lightGallery(document.getElementById('photo-gallery'));
  lightGallery(document.getElementById('map-gallery'));
  doMainPageAnim(false, () => {
    initMusicBtnLocation();

    const element = document.getElementById("btn-music");
    element.style.display = 'block';
    element.addEventListener('click', toggleMusicBtn);
  });
  initButtonsAnim(false);
  setupForYou(false);

  addEvent(window, "resize", function(event) {
    setTitle();
    initUI();
  });
});
