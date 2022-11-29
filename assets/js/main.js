let $slides = $(".slides__item"),
  $indContainer = $(".indicators"),
  $indItems = $(".indicators__item"),
  currentSlide = 0,
  carouselInterval = 2000;
const SPACE = " ",
  LEFT_ARROW = "ArrowLeft",
  RIGHT_ARROW = "ArrowRight",
  FA_PAUSE = '<i class="fas fa-play-circle"></i>',
  FA_PLAY = '<i class="fas fa-pause-circle"></i>';
$indContainer.css("display", "flex"), $(".controls").css("display", "block");
let gotoNSlide = (e) => {
    $($slides[currentSlide]).toggleClass("active"),
      $($indItems[currentSlide]).toggleClass("active"),
      (currentSlide = (e + $slides.length) % $slides.length),
      $($slides[currentSlide]).toggleClass("active"),
      $($indItems[currentSlide]).toggleClass("active");
  },
  gotoNextSlide = () => gotoNSlide(currentSlide + 1),
  gotoPrevSlide = () => gotoNSlide(currentSlide - 1),
  playbackStatus = !0,
  $pausePlayBtn = $(".controls__pause"),
  $nextBtn = $(".controls__next"),
  $prevBtn = $(".controls__prev"),
  slideInterval = setInterval(gotoNextSlide, carouselInterval),
  pauseSlideShow = () => {
    playbackStatus &&
      ($pausePlayBtn.html(FA_PAUSE),
      (playbackStatus = !playbackStatus),
      clearInterval(slideInterval));
  },
  playSlideShow = () => {
    $pausePlayBtn.html(FA_PLAY),
      (playbackStatus = !playbackStatus),
      (slideInterval = setInterval(gotoNextSlide, carouselInterval));
  },
  clickPausePlayBtn = () =>
    playbackStatus ? pauseSlideShow() : playSlideShow(),
  clickNextBtn = () => {
    pauseSlideShow(), gotoNextSlide();
  },
  clickPrevBtn = () => {
    pauseSlideShow(), gotoPrevSlide();
  };
$pausePlayBtn.on("click", clickPausePlayBtn),
  $nextBtn.on("click", clickNextBtn),
  $prevBtn.on("click", clickPrevBtn);
let clickIndicatorBtn = (e) => {
  pauseSlideShow(), gotoNSlide(+e.target.getAttribute("data-slide-to"));
};
$indContainer.on("click", ".indicators__item", clickIndicatorBtn);
let pressKeyControl = (e) => {
  e.key === LEFT_ARROW && clickPrevBtn(),
    e.key === RIGHT_ARROW && clickNextBtn(),
    " " === e.key && clickPausePlayBtn();
};
$(document).on("keydown", pressKeyControl);
