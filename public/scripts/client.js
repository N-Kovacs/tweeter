/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//escape function to sanitize inputs
const escapeFunc = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


//returns tweet element from tweet object
const createTweetElement = function (tweetObject) {
  const markup = `
<section class = "tweet">
<header class>
  <div> <img src=${tweetObject.user.avatars}"> </div>
  <div>${escapeFunc(tweetObject.user.name)}</div>
  <div class= "handle">${escapeFunc(tweetObject.user.handle)}</div>
</header>
<article>
${escapeFunc(tweetObject.content.text)}
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

//returns error markup to be displayed on error, when given an error
const errorMarkup = function (errorReason) {
  $('#error').empty();
  const markup = `
  <header>
  Error!
</header>
<article>
  ${errorReason}
</article>
<section>
  <i class="fa-solid fa-triangle-exclamation"></i>
</section>

`;
  return markup;
};


//renders tweets using createTweetelement data
const renderTweets = function (tweets) {
  $('#tweets').empty();
  for (const tweetData of tweets) {
    let $tweet = createTweetElement(tweetData);
    $('#tweets').append($tweet);  // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  }

};

//webpage ajax and display
$(document).ready(function () {
  $("#error").slideUp(0);
  //display tweets
  $.ajax('/tweets', { method: 'GET' })
    .then((res) => renderTweets(res));
  //check for errors, if found display, if not, post serialized to /tweets
  $("form").on("submit", function (event) {
    event.preventDefault();
    const textbox = document.querySelector('.textbox');
    if (textbox.value === "" || textbox.value === null) {
      let $error = errorMarkup("No/Null Tweet Entry");
      $('#error').append($error);
      $("#error").slideDown(1000);
    } else if (textbox.value.length > 140) {
      let $error = errorMarkup("Tweets cannot exceed 140 characters");
      $('#error').append($error);
      $("#error").slideDown(1000);
      textbox.value = "";
    } else {
      $("#error").slideUp(1000);
      $('#error').empty();
      $.ajax({
        type: 'POST',
        url: '/tweets',
        data: $(this).serialize()
      }).then((res) => $.ajax('/tweets', { method: 'GET' }))
        .then((res) => renderTweets(res))
        .then((res) => textbox.value = "")
        .catch((err) => console.log(err));
    }
  });
});




