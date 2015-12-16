(function() {

  $(document).ready(function() {
    //simply render the tag value in the DOM - very naive here
    if (typeof window.tag !== 'undefined') {
      $('body').html('You are browser ' + window.tag);
    } else {
      $('body').html('I do not know who you are');
    }
  })


})();