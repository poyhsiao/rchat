String.prototype.toText = function () {
  var div = document.createElement('div'),
    o;
  div.appendChild(document.createTextNode(this));
  o = div.innerHTML;
  delete div;
  return o;
}

function DropdownCtrl($scope, $filter) {
  $scope.dropdown = true;
  $scope.status = {
    isopen: false
  };

  $scope.showDropdown = function () {
    $scope.dropdown = !$scope.dropdown;
    // console.log($scope.dropdown);
    if ($scope.dropdown) {
      document.querySelector('.dropdown-menu').style.display = 'block';
    } else {
      document.querySelector('.dropdown-menu').style.display = 'none';
    }
  }

  $scope.toggleDropdown = function ($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  }

  $scope.submitText = function () {
    var currentTime = new Date(),
      epoch = currentTime.getTime(),
      now = $filter('date')(currentTime, 'yyyy/MM/dd HH:mm:ss'),
      data = {},
      id = socket.socket.sessionid;
    if ($scope.newtext) {
      $scope.newtext = $scope.newtext.toText();
      document.querySelector('.chatarea').innerHTML += '<div class="right">' + $scope.newtext + '&nbsp;<span title="' + id + '">Me</span>:&nbsp;<span>[' + now + ']&nbsp;</span></div>';
      objScrollToBottm({
        el: '.chatarea'
      });

      data = {
        'useragent': navigator.userAgent,
        'sender': 'myself',
        'username': id,
        'display_name': '',
        'sendEpoch': epoch,
        'sendFormatTime': now,
        'message': $scope.newtext
      };

      saveLocal({
        opt: 'save',
        message: data
      });

      socket.emit('newtext', data);

      $scope.newtext = '';
    }
  };
}

function checkLogin($scope, $filter) {
  $scope.doRegister = function () {
    return window.location.href = '/register';
  }
}

function doRegister($scope, $http) {
  $scope.error = false; /* password and chkpass is dismatched ? */
  $scope.showme = false; /* display password */
  $scope.pwd = 'password'; /* default password field is password or text*/

  $scope.checkData = function (opt) {
    var valObj = ['account', 'name', 'password', 'chkpass'];
    console.dir(opt);

    if ('all' === opt || 'password' === opt) {
      chkpass();
    }

    function chkpass() {
      if ($scope.user.password !== $scope.user.chkpass) {
        $scope.error = true;
        return false;
      } else {
        $scope.error = false;
        return false;
      }
    }
  };

  $scope.changePWD = function () {
    if ('password' === $scope.pwd) {
      return $scope.pwd = 'text';
    } else {
      return $scope.pwd = 'password';
    }
  };

  $scope.submitForm = function (form) {
    alert(form.$valid);
    return false;
  };

  $scope.today = function () {
    $scope.today = new Date();
  }
  $scope.today();

  $scope.openCal = function ($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };
}
