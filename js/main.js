$(function() {
  funVerbs();

  $(window).scroll(function() {
    var hue = Math.round($(window).scrollTop() / 12);
    $("body").css({
      "background-color": "hsl("+hue+", 100%, 70%)"
    });
  });
  $("a").addClass('pause');
  var $splits = $("a:not(.no-split)");
  $splits.each(function() {
    $(this).html(splitLetters($(this)));
  });
  $splits.hover(function() {
    startAnimateLetters($(this));
  }, function(){
    stopAnimateLetters($(this));
  });

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

function splitLetters(el) {
  var str = el.html();
  var output = "";
  var regex = /(<([^>]+)>)/ig;
  var matches = str.match(regex);
  var htmls = [];
  function convert(str, p1, p2, offset, s)
  {
    htmls.push(p1);
    return "☀";
  }
  var result = str.replace(regex, convert);
  el.html(result);
  str = el.html();
  str = str.split("");
  for(var i = 0; i < str.length; i++) {
    if(str[i] === '☀') {
      output += '☀';
      continue;
    }
    if(i % 2 === 0) {
      c = "v";
    } else {
      c ="v-alt";
    }
    output += "<span class='a "+c+"'>"+str[i]+"</span>";
  }
  regex = /(☀)/ig;
  var count = -1;
  function restore(str, p1, offset, s)
  {
    count++;
    return htmls[count];
  }
  var finale = output.replace(regex,restore);
  return finale;
}

function funVerbs() {
  var verbs = new Array("hate","are disgusted by","loathe","despise","dislike");
  $(".verb").each(function() {
    var v = verbs[Math.floor(Math.random()*verbs.length)];
    $(this).text(v);
  });
}