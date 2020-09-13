var $ = require('jquery');
var swal = require('sweetalert');

module.exports = function() {
  var childs = $('.download-bar').children();
  for (var i = 0; i < childs.length; i++) {
    var child = childs[i];
    var url = child.href;
    url = url.replace("http://localhost:3000/", "").replace("https://tindhair.christianabdelmassih.com/", "");
    if (url.length === 0) {
      $(child).click(function(e) {
        e.preventDefault();

        var a = document.createElement("a");
        a.href = "mailto:chrabd@kth.se";
        a.innerHTML = 'chrabd@kth.se';
        a.className = 'send-mail';

        swal({
          title: "Hi there!",
          text: "Feel free to contact me to get a demo of the app, you'll find my email bellow. Look forward to hear from you 😊",
          type: "info",
          content: a,
        });

      })
    } else {
      $(child).click(function(e) {
        $('.hash-container').animate({opacity: 1},200);
      })
    }
  }
}
