
//  Client-side JS logic 

const renderTweets = function(arrOfTweetObjs) {
  const $tweetContainer = $('section.tweets').empty();
  const arrOfTweetsSorted = arrOfTweetObjs.sort((a, b) => b.created_at - a.created_at);
  for (const tweetObj of arrOfTweetsSorted) {
    const $tweet = createTweetElement(tweetObj);
    $tweetContainer.append($tweet);
  }
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

$(() => {

  // Handle new tweet form submission POST req
  const $form = $('#form-new-tweet');
  $form.on('submit', (event) => {
    event.preventDefault();
    const tweetData = $form.serialize();

    // Input validation
    const tweetText = $form.children('#tweet-text').val().trim();
    if (!tweetText.length) {
      return alert('Tweet text cannot be empty');
    } else if (tweetText.length > 140) {
      return alert('Tweet is too long');
    }

    $.ajax('/tweets', { type: 'POST', data: tweetData })
      .then(function() {
        console.log('POST tweet request successful');
      })
      .then(loadTweets())
      .catch(function(error) {
        console.error(`Failed to POST new tweet (Status: ${error.statusText})`);
      });
  });

  // Handle GET tweets req
  const loadTweets = function() {
    $.ajax('/tweets', { type: 'GET' })
      .then(function(tweets) {
        console.log('GET tweets request successful');
        renderTweets(tweets);
      })
      .catch(function(error) {
        console.error(`Failed to GET tweets (Status: ${error.statusText})`);
      });
  };

  loadTweets();

});;
