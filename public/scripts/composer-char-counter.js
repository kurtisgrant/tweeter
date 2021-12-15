
$(document).ready(function() {


  const input = $('#tweet-text');
  input.on('input', function(event) {
    const counter = $('.counter');
    if (input.val().length > 140) {
      counter.toggleClass('overlimit', true);
    } else {
      counter.toggleClass('overlimit', false);
    }
    counter.text(140 - input.val().length);
  });
});