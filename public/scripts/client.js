
//  Client-side JS logic 

const renderTweets = function(arrOfTweetObjs) {
  const $tweetContainer = $('section.tweets');
  const arrOfTweetsSorted = arrOfTweetObjs.sort((a, b) => b.created_at - a.created_at);
  for (const tweetObj of arrOfTweetsSorted) {
    const $tweet = createTweetElement(tweetObj);
    $tweetContainer.append($tweet);
    $;
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
    <p class="tweet-body">${content.text}</p>
    <footer class="tweet-footer">
      <small>${timeago.format(timestamp)}</small>
      <div class="icon-container">
        <a href="#"><i class="fas fa-flag"></i></a>
        <a href="#"><i class="fas fa-retweet"></i></a>
        <a href="#"><i class="fas fa-heart"></i></a>
      </div>
    </footer>
  `);
  return $twArticle;
};

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Kurtis",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@kurtisbgrant"
    },
    "content": {
      "text": "If a man knows not which port he sails, no wind is favorable. —Marcus Aurelius —Kurtis Grant"
    },
    "created_at": 1637485006795
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

$(() => {
  renderTweets(data);
});
