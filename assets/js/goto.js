
$('#back').on('click', function () {
  $('html, body').animate({
    scrollTop: 0
  }, 500);
});

$('#a').on('click', function () {
  $('html, body').animate({
    scrollTop: $("#slides-container").offset().top
  }, 500);
  return false;
});

$('.title-spoiler').on('click', function () {
  $(this).next().slideToggle(300);
});
