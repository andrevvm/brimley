$(function() {
  funVerbs();
  instanames();
  teamViewer();
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
  var singular_verbs = new Array("hates","is disgusted by","loathes","despises","dislikes")
  $(".verb").each(function() {
    var noteCount = $(this).prev('.note-count').find('span').text();
    if (noteCount == 1) {
      var v = singular_verbs[Math.floor(Math.random()*singular_verbs.length)];
      $(this).prev('people').text('person');
    } else {
      var v = verbs[Math.floor(Math.random()*verbs.length)];
    }
    
    $(this).text(v);
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

var index = 0;
var team_count = $(".team-list li").length - 1;

function teamViewer() {
  $(".team-list a").click(function(e) {
    index = $(this).parent('li').index();
    goToImage();
    e.preventDefault();
    setTimeout(function() {
      $("window").scrollTop(260);
      $(".team-viewer").addClass('show');
      $(".team-viewer.show").click(function(e){
        if(!$(e.target).hasClass('arrow')) {
          $(this).removeClass('show');
        }
      });
    }, 10);
    
  });
}

$(".arrow.right").click(function(e) {
  e.preventDefault();
  if(index === team_count) {
    index = 0;
  } else {
    index++;
  }
  goToImage();
});

$(".arrow.left").click(function(e) {
  e.preventDefault();
  if(index === 0) {
    index = team_count;
  } else {
    index--;
  }
  goToImage();
});

function goToImage() {
  left = -(index * 940);
  $(".team-slider").css('left',left);
}