/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function (tweetObject) {
  const markup = `
<section class = "tweet">
<header class>
  <div> <img src=${tweetObject.user.avatars}"> </div>
  <div>${tweetObject.user.name}</div>
  <div class= "handle">${tweetObject.user.handle}</div>
</header>
<article>
${tweetObject.content.text}
</article>
<footer>
  <div>${timeago.format(new Date(tweetObject.created_at))}</div>
  <div class="tweet-buttons"> 
    <div><i class="fa-solid fa-flag"></i></div>
    <div><i class="fa-solid fa-retweet"></i></div>
    <div><i class="fa-solid fa-heart"></i></div>
  </div>
</footer>
</section>

`;
  return markup;

};

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (const tweetData of tweets){
    let $tweet = createTweetElement(tweetData);
    $('#tweets').append($tweet);  // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  }

}

// Test / driver code (temporary). Eventually will get this from the server.



$(document).ready(function () {
  $.ajax('/tweets', { method: 'GET' })
    .then((res) => renderTweets(res))

  $("form").on("submit", function(event) {
    event.preventDefault();
    console.log(this)
    console.log( $( this ).serialize() );
    $.ajax({
      type : 'POST',
      url : '/tweets',
      data : $(this).serialize()
    })
    $.ajax('/tweets', { method: 'GET' })
      .then((res) => renderTweets(res))
  });
});



