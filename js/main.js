$(function() {
  funVerbs();
  instanames();
  if($("body").hasClass('feed')) {
    $(window).scroll(function() {
      var hue = Math.round($(window).scrollTop() / 12);
      $("body").css({
        "background-color": "hsl("+hue+", 100%, 70%)"
      });
    });
  }
  
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
  var count = -1;
  var lCount = -1;
  for(var i = 0; i < str.length; i++) {
    lCount ++;
    if(str[i] === '☀') {
      output += '☀';
      lCount++;
      continue;
    }
    if(str[i] === ' ') {
      output += " ";
      lCount ++;
      continue;
    }
    if(lCount % 2 === 0) {
      c = "v";
    } else {
      c ="v-alt";
    }
    output += "<span class='a "+c+"'>"+str[i]+"</span>";
  }
  regex = /(☀)/ig;
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
  $(".note-count").each(function() {
    if($(this).text() === "1") {
      $(this).next('.person').text("people");
    }
  });
}

function instanames() {
  $(".instagram .caption:contains('@')").each(function(){
    var regex = /@([^\s]+)/ig;
    var str = $(this).html();
    var matches = str.match(regex);
    function instalink(str, p1, offset, s) {
      var username = p1.split("@")[0];
      var result = '<a href="http://instagram.com/'+username+'" target="_blank">'+str+'</a>';
      return result;
    }
    str = str.replace(regex, instalink);
    $(this).html(str);
  });
}