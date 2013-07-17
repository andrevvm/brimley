$(function() {
  $(window).scroll(function() {
    var hue = Math.round($(window).scrollTop() / 12);
    $("body").css({
      "background-color": "hsl("+hue+", 100%, 80%)"
    });
  });
});
