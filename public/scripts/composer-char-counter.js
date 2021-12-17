
$(document).ready(function() {


  // On input (and on load), update counter
  // value and highlight if over 140 chars
  const $textarea = $('#tweet-text');
  const $counter = $('.counter');
  const updateCharCountAndOverlimitClass = function($textarea, $counter) {
    $counter.text(140 - $textarea.val().length);
    if ($textarea.val().length > 140) {
      $counter.toggleClass('overlimit', true);
    } else {
      $counter.toggleClass('overlimit', false);
    }
  };
  updateCharCountAndOverlimitClass($textarea, $counter);
  $textarea.on('input change', function(event) {
    updateCharCountAndOverlimitClass($textarea, $counter);
  });
});