
$(document).ready(function() {


  // On input, update counter value & highlight if over 140 chars
  const textarea = $('#tweet-text');
  const counter = $('.counter');
  textarea.on('input', function(event) {
    counter.text(140 - textarea.val().length);
    if (textarea.val().length > 140) {
      counter.toggleClass('overlimit', true);
    } else {
      counter.toggleClass('overlimit', false);
    }
  });
});