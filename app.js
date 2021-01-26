$(document).ready(function() {
  $('.favorite').on('click', function(e) {
    const tweetID = $(e.currentTarget).data('tweetid');
    const url = 'tweets/' + tweetID + '/favorites';
    $.ajax({
      type: 'POST',
      url: url,
      success: function(data) {
        console.log('send a favorite');
      },
      error: function(data) {
        console.log('not sent');
      },
    });
  });

  $('.profile__follow-button').on('click', function(e) {
    const userID = $(e.currentTarget).data('userid');
    const url = '/users/' + userID + '/follow';
    if ($(this).hasClass('following')) {
      $(this).text('Follow');
      $(this).removeClass('following');
    } else {
      $(this).text('Unfollow');
      $(this).addClass('following');
    }
    $.ajax({
      type: 'POST',
      url: url,
      success: function(data) {
        console.log('Followed the user');
      },
      error: function(data) {
        console.log('not sent');
      },
    });
  });

  $('.tweet__edit').on('click', function(e) {
    e.preventDefault();
    let $editButton = $(e.target);
    if ($editButton.hasClass('tweet__edit')) {
      // Change "edit" to "save" on the button
      $editButton
        .text('Save')
        .removeClass('tweet__edit')
        .addClass('tweet__save');
      // Get the tweet content text
      let $originalTweet = $editButton
        .parent()
        .siblings('.tweet__content');
      let tweetText = $originalTweet.text();
      // Replace the tweet text element with a textarea element
      let $modifiedText = $('<textarea>')
        .addClass('edit-tweet')
        .val(tweetText)
        .attr('placeholder', tweetText);
      $originalTweet.after($modifiedText).remove();
    } else if ($editButton.hasClass('tweet__save')) {
      // Change "save" to "edit" on the button
      $editButton
        .text('Edit')
        .removeClass('tweet__save')
        .addClass('tweet__edit');
      let $modifiedTweet = $(e.target)
        .parent()
        .siblings('textarea');
      let originalText = $modifiedTweet.attr('placeholder');
      let modifiedText = $modifiedTweet.val();
      if (modifiedText !== originalText) {
        \
      
      // The same replace method in tweeet.pug file
      // TODO: find solution to reuse the same code
      modifiedText = modifiedText.replace(/#(\w+)/g, '<a href="/tweets/hashtag/$1">#$1</a>');
      let $tweetElement = $('<p>')
        .addClass('tweet__content');
        //.text(modifiedText);
      $tweetElement.append(modifiedText);
      $modifiedTweet.after($tweetElement).remove();
    }
  });

});
