var createCookie, getActiveStyleSheet, getPreferredStyleSheet, linkIsProper, links, readCookie, setActiveStyleSheet, setMyStyle;

linkIsProper = function(link) {
  if ((link.getAttribute('rel')).indexOf('style' !== -1 && link.getAttribute('title'))) {
    return true;
  } else {
    return false;
  }
};

links = function() {
  var a, i, len, ref, results;
  ref = document.getElementsByTagName('link');
  results = [];
  for (i = 0, len = ref.length; i < len; i++) {
    a = ref[i];
    if (linkIsProper(a)) {
      results.push(a);
    }
  }
  return results;
};

setActiveStyleSheet = function(title) {
  var a, i, len, ref, results;
  ref = links();
  results = [];
  for (i = 0, len = ref.length; i < len; i++) {
    a = ref[i];
    results.push((a.getAttribute('title')) === title ? a.disabled = false : a.disabled = true);
  }
  return results;
};

getActiveStyleSheet = function() {
  var a;
  return ((function() {
    var i, len, ref, results;
    ref = links();
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      a = ref[i];
      if (!a.disabled) {
        results.push(a.getAttribute('title'));
      }
    }
    return results;
  })())[0];
};

getPreferredStyleSheet = function() {
  var a;
  return ((function() {
    var i, len, ref, results;
    ref = links();
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      a = ref[i];
      if (!a.getAttribute('disabled')) {
        results.push(a.getAttribute('title'));
      }
    }
    return results;
  })())[0];
};

createCookie = function(name, value, days) {
  var date, expires;
  if (days) {
    date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toGMTString();
  } else {
    expires = '';
  }
  return document.cookie = name + '=' + value + expires + '; path=/';
};

readCookie = function(name) {
  var a, ca;
  ca = ((function() {
    var i, len, ref, results;
    ref = document.cookie.split(';');
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      a = ref[i];
      results.push(a);
    }
    return results;
  })()).reduce(function(t, c) {
    var cs;
    console.log(c);
    cs = c.split('=');
    t[cs[0]] = cs[1];
    return t;
  }, {});
  return ca[name];
};

setMyStyle = function() {
  var cookie, title;
  cookie = readCookie('style');
  console.log('...cookie...' + cookie);
  title = cookie != null ? cookie : {
    cookie: getPreferredStyleSheet()
  };
  console.log('default... ' + title);
  return setActiveStyleSheet(title);
};

window.onload = function(e) {
  var a, i, len, ref, results;
  setMyStyle();
  ref = document.getElementsByClassName('css-switch');
  results = [];
  for (i = 0, len = ref.length; i < len; i++) {
    a = ref[i];
    console.log('event set... ' + a.id);
    results.push(a.addEventListener('click', function() {
      var b, j, len1, ref1;
      setActiveStyleSheet(this.id);
      ref1 = document.getElementsByClassName('css-switch');
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        b = ref1[j];
        b.classList.remove('active');
      }
      this.classList.add('active');
      return console.log('click... ' + this.id);
    }));
  }
  return results;
};

window.onunload = function(e) {
  var title;
  title = getActiveStyleSheet();
  return createCookie('style', title, 365);
};

setMyStyle();
