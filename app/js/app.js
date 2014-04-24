var _ = require("underscore");
var subtitlesDownloader = require('./js/subtitles-downloader/subtitles-downloader.js');
var ErrorReporter = require('./js/errorReporter.js');
var async = require("async");
var glob = require("glob");
var Q = require('Q');

var errorReporter = ErrorReporter.create();

var getFilePaths = function (files) {
  return _.map(files, function (item) {
    return item.path;
  });
};

var getSubtitles = function (filepath, language, token) {
  var deferred = Q.defer();
  subtitlesDownloader.downloadSubtitleWithToken(token, filepath, language, function (err, path) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(path);
    }
  });
  return deferred.promise;
};

var getToken = function () {
  var deferred = Q.defer();
  subtitlesDownloader.fetchToken(function (err, token) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.fulfill(token);
    }
  });
  return deferred.promise;
};

document.addEventListener("dragenter", function (event) {
  app.viewModel.isDropping(true);
}, false);

document.addEventListener("drop", function (event) {
  app.viewModel.startLoading();
  var language = $('#language option:selected').val() || 'eng'
  var filepaths = getFilePaths(event.dataTransfer.files);
  getToken().then(function (token) {
    var subtitlePromisses = _.map(filepaths, function (path) {
      return getSubtitles(path, language, token);
    });
    Q.allSettled(subtitlePromisses).then(
      function (statuses) {
        errorReporter.reset();
        app.viewModel.finishLoading();
        _.each(statuses, function (status) {
          if (status.state == 'fulfilled') {
            errorReporter.addSuccess();
          } else {
            errorReporter.addFail();
          }
        });
        var report = errorReporter.report();
        if (report.success && !report.fail) {
        alertify.success(report.message);
        }
        else if (report.fail && !report.success) {
        alertify.error(report.message);
        }
        else {
        alertify.log(report.message);
        }
      });
  });
  event.preventDefault();
}, false);

document.addEventListener("dragover", function (event) {
  event.preventDefault();
}, false);
