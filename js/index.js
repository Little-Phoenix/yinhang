var nav = document.getElementsByClassName('left-nav')[0];
(function(doc, nav){
  nav.style.width = '210px';

  var bindClick = function() {
    var leftNav = doc.getElementsByClassName('left-nav')[0];

    leftNav.addEventListener('click', function(e) {

      if(e.target.name != 'toggleNav') {
        var navBtns = doc.getElementsByClassName('nav-btn');
        for(var i=0; i<navBtns.length; i++) {
          let navBtn = navBtns[i];
          if(navBtn) {
            navBtn.className = 'nav-btn';
          }
        }

        var btnId = e.target.id || e.target.parentElement.id;
        var navBtn = doc.getElementById(btnId);
        navBtn.className = navBtn.className + ' selected';
        if(btnId) {
          var contentFrame = doc.getElementsByClassName('content-frame')[0];
          contentFrame.src = './' + btnId + '.html';
        }
      }


    }, true)
  }

  bindClick();
})(document, nav)

var toggleNav = function(event) {
  var width = nav.style.width;
  if(width === '210px') {
    nav.style.width = '0px';
    event.target.innerHTML = '展开';
    nav.className = nav.className + ' unfold';
  } else {
    nav.style.width = '210px';
    event.target.innerHTML = '收起';
    nav.className = nav.className.replace(' unfold', '');
  }

}
