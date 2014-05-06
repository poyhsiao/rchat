/**
 * Save data to local storage with limit number of items
 * @param  {Object} opt json style with {
 * opt = [save(save new data),
 *   get(get data according to key) -- default,
 *   cleanup(cleanup all stored data)],
 * limit(limit the items save to localStorage)
 * data(data to store to localStorage),
 * key(key to identification 'cahttext' is default key)}
 * @return {[type]}     [description]
 */
function saveLocal(opt) {
  // try {
  /* number of items can be stored */
  var limit = opt.limit || 20,
    op = opt.opt || 'get',
    key = opt.key || 'chattext',
    data = opt.message || 'no data',
    val = [];
  if ('save' === op) {
    /* already in localStorage */
    if (key in localStorage) {
      val = localStorage.getItem(key);
      val = JSON.parse(val);
      if (val instanceof Array) {
        if (val.length >= limit) {
          /* remove oldest data */
          val.shift();
        }
      } else {
        localStorage.removeItem(key);
      }
    }

    val.push(data);
    val = JSON.stringify(val);
    localStorage.setItem(key, val);
    return JSON.parse(val);
  } else if ('get' === op) {
    /* get data from localStorage */
    if (key in localStorage) {
      val = localStorage.getItem(key);
      return JSON.parse(val);
    } else {
      return false;
    }
  } else if ('cleanup' === op) {
    return localStorage.clear();
  }
  // } catch(e) {
  //   console.log('error occured');
  //   console.dir(e);
  //   return false;
  // }
}

/**
 * scroll object to bottom
 * @param  {object} opt with follow parameters
 *   el: element - selector (required)
 *   interval: time to scroll to bottom
 * @return {boolean}     always return false
 */
function objScrollToBottm(opt) {
  if ('el' in opt) {
    var ele = opt.el,
      o = document.querySelector(ele),
      h = o.scrollHeight;
    o.scrollTop = h;
    return false;
  }
}

var socket = io.connect();
socket.on('connect', function () {
  socket.on('newtext', function (data) {
    // var t = new Date(),
    t = new Date(data.sendEpoch),
    n = {
      year: t.getFullYear(),
      month: (t.getMonth() + 1) < 10 ? ('0' + (t.getMonth() + 1)) : (t.getMonth() + 1),
      date: (t.getDate()) < 10 ? ('0' + t.getDate()) : t.getDate(),
      hour: (t.getHours()) < 10 ? ('0' + t.getHours()) : t.getHours(),
      min: (t.getMinutes()) < 10 ? ('0' + t.getMinutes()) : t.getMinutes(),
      sec: (t.getSeconds()) < 10 ? ('0' + t.getSeconds()) : t.getSeconds()
    },
    now = n.year + '/' + n.month + '/' + n.date + ' ' + n.hour + ':' + n.min + ':' + n.sec;

    saveLocal({
      opt: 'save',
      message: data
    });

    document.querySelector('.chatarea').innerHTML += '<div><span title="' + data.username + '">' + data['display_name'] + '</span>&nbsp;<span>[' + now + ']&nbsp;</span>&nbsp;:&nbsp;' + data.message + '</div>';

    objScrollToBottm({
      el: '.chatarea'
    });
  });
});
