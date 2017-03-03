var userNameClear = function(event) {
  var userName = document.getElementsByName('username')[0];
  userName.value = '';
}

var passwordShow = function (event) {
  var password = document.getElementsByName('password')[0];
  var eye = event.target;
  if(password.type === 'text'){
    password.type = 'password';
    eye.className = 'icon icon-right icon-eye icon-opacity';
  } else {
    password.type = 'text';
    eye.className = 'icon icon-right icon-eye';
  }
}


var login = function() {
  alert('请补充登录方法')
}
