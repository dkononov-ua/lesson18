
$('#back').on('click', function () {
  $('html, body').animate({
    scrollTop: 0
  }, 1000);
});

$('#a').on('click', function () {
  $('html, body').animate({
    scrollTop: $("#slides-container").offset().top
  }, 1000);
  return false;
});

$('.title_description').on('click', function () {
  $(this).next().slideToggle(300);
});
