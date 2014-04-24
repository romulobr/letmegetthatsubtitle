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
      if (failCount + successCount == 1) {
        if (failCount == 1) {
          return {
            status: "fail",
            message: "I'm so sorry, I couldn't find it, maybe next time."
          }
        } else {
          return {
            status: "ok",
            message: "Got it! The subtitles are now on your video folder."
          }
        }
      }
      if (failCount == 0) {
        return {
          status: "ok",
          message: "Hurray, we got " + successCount + " subtitles, enjoy!"
        }
      } else if (successCount == 0) {
        return {
          status: "fail",
          message: "We couln't get any of your subtitles, is you internet working?"
        }
      }
      else {
        status:"mixed",
        return "We got " + successCount + " subtitles, but failed to get the other" + failCount + ".";
      }
    }
  };
}

exports.create = create;