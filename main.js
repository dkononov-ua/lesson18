(function () {
const container = document.querySelector("#carousel");
const slides = container.querySelectorAll(".slide");
const indicatorsContainer = container.querySelector("#indicators-container");
const indicators = indicatorsContainer.querySelectorAll(".indicator");
const pauseBtn = container.querySelector("#btn-pause");
const prevBtn = container.querySelector("#btn-prev");
const nextBtn = container.querySelector("#btn-next");

const SLIDES_COUNT = slides.length;
const CODE_LEFT_ARROW = "ArrowLeft";
const CODE_RIGHT_ARROW = "ArrowRight";
const CODE_SPACE = "Space";
const FA_PAUSE = '<i class="fas fa-pause-circle"></i>';
const FA_PLAY = '<i class="fas fa-play-circle"></i>';

let currentSlide = 0;
let isPlaying = true;
let timerID = null;
let startPosX = null;
let endPosX = null;
let interval = 5000;

function gotoNth(n) {
  slides[currentSlide].classList.toggle("active");
  indicators[currentSlide].classList.toggle("active");
  currentSlide = (n + SLIDES_COUNT) % SLIDES_COUNT;
  indicators[currentSlide].classList.toggle("active");
  slides[currentSlide].classList.toggle("active");
}

function gotoPrev() {
  gotoNth(currentSlide - 1);
}

function gotoNext() {
  gotoNth(currentSlide + 1);
}

function pause() {
  pauseBtn.innerHTML = FA_PLAY;
  isPlaying = false;
  clearInterval(timerID);
}

function play() {
  pauseBtn.innerHTML = FA_PAUSE;
  isPlaying = true;
  timerID = setInterval(gotoNext, interval);
}

function pausePlay() {
  isPlaying ? pause() : play();
}

function prev() {
  gotoPrev();
  pause();
}

function next() {
  gotoNext();
  pause();
}

function indicate(e) {
  const target = e.target;

  if (target && target.classList.contains("indicator")) {
    pause();
    gotoNth(+target.dataset.slideTo);
  }
}

function pressKey(e) {
  if (e.code === CODE_LEFT_ARROW) prev();
  if (e.code === CODE_RIGHT_ARROW) next();
  if (e.code === CODE_SPACE) pausePlay();
}

function swipeStart(e) {
  if (e instanceof MouseEvent) {
    startPosX = e.pageX;

    return;
  }

  if (e instanceof TouchEvent) {
    endPosX = e.changedTouches[0].pageX;
  }
}

function swipeEnd(e) {
  if (e instanceof MouseEvent) {
    endPosX = e.pageX;
  } else if (e instanceof TouchEvent) {
    startPosX = e.changedTouches[0].pageX;
  }

  if (endPosX - startPosX < -100) next();
  if (endPosX - startPosX > 100) prev();
}

function initListener() {
  pauseBtn.addEventListener("click", pausePlay);
  prevBtn.addEventListener("click", prev);
  nextBtn.addEventListener("click", next);
  indicatorsContainer.addEventListener("click", indicate);
  container.addEventListener("touchstart", swipeStart);
  container.addEventListener("mousedown", swipeStart);
  container.addEventListener("touchend", swipeEnd);
  container.addEventListener("mouseup", swipeEnd);
  document.addEventListener("keydown", pressKey);
}

function init() {
  initListener();
  timerID = setInterval(gotoNext, interval);
}

init();
}());