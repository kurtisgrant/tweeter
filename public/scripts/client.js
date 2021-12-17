

//  Client-side JS logic 

// On document load:
$(() => {

  // Make GET request for tweets and pass 
  // the resulting array to renderTweets
  const loadTweets = function() {
    $.ajax('/tweets', { type: 'GET' })
      .then(function(tweets) {
        renderTweets(tweets);
      })
      .catch(function(error) {
        console.error(`Failed to GET tweets (Status: ${error.statusText})`);
      });
  };


  const createTweetElement = function(tweetObj) {
    const { user, content, created_at: timestamp } = tweetObj;
    const $twArticle = $('<article>').html(`
      <header class="tweet-header">
        <div class="container">
          <div class="img-container">
            <img src="${user.avatars}" alt="profile image">
          </div>
          <span class="username">${user.name}</span>
        </div>
        <span class="handle">${user.handle}</span>
      </header>
      <p class="tweet-body"></p>
      <footer class="tweet-footer">
        <small>${timeago.format(timestamp)}</small>
        <div class="icon-container">
          <a href="#"><i class="fas fa-flag"></i></a>
          <a href="#"><i class="fas fa-retweet"></i></a>
          <a href="#"><i class="fas fa-heart"></i></a>
        </div>
      </footer>
    `);
    $twArticle.children('p.tweet-body').text(content.text);
    return $twArticle;
  };


  // Loop through tweets creating tweet
  // elements and appending each into the DOM
  const renderTweets = function(arrOfTweetObjs) {
    const $tweetContainer = $('section.tweets').empty();
    for (const tweetObj of arrOfTweetObjs.reverse()) {
      const $tweet = createTweetElement(tweetObj);
      $tweetContainer.append($tweet);
    }
  };


  // Custom alert functionality
  const $alert = $('.alert');
  const clearAlert = () => {
    $alert.removeClass('show');
    setTimeout(() => $alert.empty(), 550);
  };
  const custAlert = (mainMsg, smMsg) => {
    $alert.append($('<span>').text(mainMsg));
    if (smMsg) {
      $alert.append($('<small>').text(smMsg));
    }
    $alert.addClass('show');
    setTimeout(() => clearAlert(), 5000);
  };


  // POST net tweet if validation passes
  const $newTweetForm = $('#new-tweet-form');
  const submitNewTweet = (event) => {
    const $textarea = $('#tweet-text');
    event.preventDefault();

    // Input validation
    const tweetText = $textarea.val();
    if (!tweetText.length) {
      return custAlert('That all you got?', "(Tweets can't be empty)");
    } else if (tweetText.length > 140) {
      return custAlert('Too Long!');
    }

    // POST request
    const tweetData = $newTweetForm.serialize();
    $.ajax('/tweets', { type: 'POST', data: tweetData })
      .then(function() {
        clearAlert();
        // Clear textarea, blur & trigger change to update character count
        $textarea.val('').trigger('blur').trigger('change');
        loadTweets();
      })
      .catch(function(error) {
        console.error(`Failed to POST new tweet (Status: ${error.statusText})`);
      });
  };


  // New tweet form listeners
  $newTweetForm.on('submit', submitNewTweet);
  // Submit form on press of ENTER/RETURN unless SHIFT also pressed
  $('#tweet-text').keypress((event) => {
    if (event.which === 13 && !event.shiftKey) {
      event.preventDefault();
      $newTweetForm.submit();
    }
  });

  loadTweets();

});;
