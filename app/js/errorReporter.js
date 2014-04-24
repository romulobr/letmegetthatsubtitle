var create = function () {
  var failCount = 0;
  var successCount = 0;

  return {
    reset: function () {
      failCount = 0;
      successCount = 0;
    },
    addFail: function () {
      failCount++;
    },
    addSuccess: function () {
      successCount++;
    },
    report: function () {
      var result = {
        fail: false,
        success: false,
        message: 'no message',
        successCount: successCount,
        failCount: failCount
      };

      result.fail = failCount > 0;
      result.success = successCount > 0;

      if (failCount + successCount == 1) {
        if (failCount > 0) {
          result.message = "I couldn't find it, maybe next time.";
        } else {
          result.message = "Got it! The subtitles are now on your video folder.";
        }
      } else {
        if (successCount > 0 && failCount == 0) {
          result.message = "Hurray, I got all the " + successCount + " subtitles, enjoy!";
        } else if (failCount > 0 && successCount == 0) {
          result.message = "I couldn't get any of your subtitles.";
        }
        else {
          result.message = "I got " + successCount + " subtitles, but failed to get the other " + failCount + ".";
        }
      }
      return result;
    }
  };
}
exports.create = create;