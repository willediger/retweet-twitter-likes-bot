var Twitter = require('twitter');
var credentials = require('./credentials');
var client = new Twitter(credentials);

// Runs a Twitter search for the specified `query` and retweets all the results.
function searchAndTweet(succeed, fail) {
  console.log("search and tweet");
  client.get('favorites/list', {screen_name: 'TuckerMax', count: 5}, function(err, tweets, response) {
    if (!tweets.statuses) {
      fail(err);
    }

    tweets.forEach(function(tweet) {
      var tweetId = tweet.id_str;
      client.post('statuses/retweet/' + tweetId, function(err, tweet, id) {
        // Will return an error if we try to retweet a tweet that we've already
        // retweeted.
        console.log(err || tweet.text);
      });
    });
    succeed("success");
  });
}

searchAndTweet(console.log, console.log);
setInterval(function() {
  searchAndTweet(console.log, console.log);
}, 5 * 60 * 1000);