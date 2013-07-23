$(function() {
  $(window).scroll(function() {
    var hue = Math.round($(window).scrollTop() / 12);
    $("body").css({
      "background-color": "hsl("+hue+", 100%, 70%)"
    });
  });
  $("nav a").each(function() {
    $(this).html(animateLetters($(this).html()));
  });
  $("nav a").hover(function() {
    startAnimateLetters($(this));
  }, function(){
    stopAnimateLetters($(this));
  });

  funVerbs();
});

function startAnimateLetters(el) {
  // animations = new Array("h","h-alt","r","r-alt","s","v","v-alt");
  // $("nav .a").removeClass("h h-alt r r-alt s v v-alt");
  // $("nav .a").each(function() {
  //   var c = animations[Math.floor(Math.random()*animations.length)];
  //   $(this).addClass(c);
  // });
  el.removeClass("pause");
}

function stopAnimateLetters(el) {
    var newone = el.clone(true);
    el.addClass('remove');
    el.before(newone);
    newone.addClass("pause");
    $(".remove").remove();
}

function animateLetters(str) {
  var output = "";
  str = str.split("");
  for(var i = 0; i < str.length; i++) {
    if(i % 2 === 0) {
      c = "v";
    } else {
      c ="v-alt";
    }
    output += "<span class='a "+c+"'>"+str[i]+"</span>";
  }
  return output;
}

function funVerbs() {
  var verbs = new Array("hate","are disgusted by","loathe","despise","dislike");
  $(".verb").each(function() {
    var v = verbs[Math.floor(Math.random()*verbs.length)];
    $(this).text(v);
  });
}