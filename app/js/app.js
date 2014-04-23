var _ = require("underscore");
var subtitlesDownloader = require('subtitles-downloader');
var async = require("async");
var glob = require("glob");

document.addEventListener("dragenter", function( event ) {
  app.viewModel.isDropping(true);
}, false);

document.addEventListener("drop", function( event ) {
  app.viewModel.startLoading();
  var options = {};
  var language = $('#language option:selected').val() || 'en'
  options.filepath = event.dataTransfer.files[0].path;

  subtitlesDownloader.downloadSubtitle(options.filepath, language, function (err, path) {
    if (err) {
      alertify.error("I'm so sorry, I couldn't find it, maybe next time.");
    }else {
      alertify.success("Got it! The subtitles are now on your video folder.");
    }
    app.viewModel.finishLoading();
  });
  event.preventDefault();
}, false);

document.addEventListener("dragover", function( event ) {
  event.preventDefault();
}, false);
