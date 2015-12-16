(function() {

  $(document).ready(function() {

    //report the value of window.tag back to the server to track visits
    if (typeof window.tag !== 'undefined') {
      $.ajax({
        url: '/report/' + window.tag
      });
    }
  });

})();