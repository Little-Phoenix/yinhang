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


  var selectGroups = doc.getElementsByClassName('select-group');

  //下拉框操作
  function selectGroupOption() {
    for(var i=0; i<selectGroups.length; i++) {
      var selectGroup = selectGroups[i];
      let showInput = selectGroup.getElementsByTagName('input')[0];//name='show'的input框
      let keyInput = selectGroup.getElementsByTagName('input')[1];//name='key'的input框
      let options = selectGroup.getElementsByTagName('ul')[0];//ul
      function init() {

        let firstOption = options.children[0];
        let key = firstOption.id;
        let value = firstOption.innerHTML;

        showInput.value = value;
        keyInput.value = key;

        setOptionSelect(options.children, key);

        clickOptions(options.children);//在ul中点击li
      }

      init();

      function setOptionSelect(options, key) {
        for(var i=0; i<options.length; i++){
          var option = options[i];
          if(option.id === key) {
            option.className = option.className + ' option-selected'
          } else {
            option.className = option.className.replace('option-selected', '');
          }
        }
      }

      function clickOptions(options) {
        for(var i=0; i<options.length; i++) {
          let option = options[i];
          option.addEventListener('click', function(event){
            let key = event.target.id;
            let value = event.target.innerHTML;

            showInput.value = value;
            keyInput.value = key;

            setOptionSelect(options, key);

            event.target.parentNode.className = event.target.parentNode.className + ' input-hide';
          })
        }
      }

      selectGroup.addEventListener('click', function(event) {
        if(event.target.name === 'show') {
          let ul = event.target.parentNode.getElementsByTagName('ul')[0];
          if(ul.className.indexOf('input-hide') >= 0) {
            ul.className = ul.className.replace('input-hide', '');
          } else {
            ul.className = ul.className + ' input-hide';
          }
        }
      })
    }
  }

  addPanelClickEvent();
  formShouQi();
  selectGroupOption();

})(window, document)
