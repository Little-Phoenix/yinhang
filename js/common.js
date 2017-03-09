(function(win, doc){

  var panels = doc.getElementsByClassName('tab-panel');
  var tabBtns = doc.getElementsByName('panel-btn');

  function addPanelClickEvent() {

    for(var i=0; i<panels.length; i++ ){
      let panel = panels[i];
      panel.addEventListener('click', function(event) {
        if(event.target.tagName === 'A' && event.target.name === 'panel-btn') {
          //切换content
          var panelFor = event.target.getAttribute('for');
          var panels = doc.getElementsByClassName('panel-content');
          for(var i=0; i<panels.length; i++) {
            var currentPanel = panels[i];
            if(currentPanel.id === panelFor && currentPanel.parentNode.className === event.target.parentNode.className) {
              currentPanel.className = 'panel-content';
            } else if(currentPanel.parentNode.className === event.target.parentNode.className){
              currentPanel.className = 'panel-content panel-hide';
            }
          }


          //将所有的tabbtn改为位选中状态
          for(var i=0; i<tabBtns.length; i++) {
            if(tabBtns[i].parentNode.className === event.target.parentNode.className) {
              tabBtns[i].className = 'panel';
            }

          }
          event.target.className = event.target.className + ' current';

        }
      })
    }
  }


  var showqiBtn = doc.getElementsByClassName('operate');

  function formShouQi() {
    for(var i=0; i<showqiBtn.length; i++) {
      var btn = showqiBtn[i];
      btn.addEventListener('click', function(event) {
        let classNames = event.target.className.split(' ');
        var panelContent = event.target.parentNode.parentElement.getElementsByClassName('content')[0];
        if(classNames.indexOf('zk') >= 0) {
          event.target.innerHTML = '收起';
          event.target.className = event.target.className.replace(' zk', '');
          panelContent.className = panelContent.className.replace(' hide-content', '');
        } else {
          event.target.innerHTML = '展开';
          event.target.className = event.target.className + ' zk';
          panelContent.className = panelContent.className + ' hide-content';
        }
      });
    }
  }

  addPanelClickEvent();
  formShouQi();

})(window, document)
