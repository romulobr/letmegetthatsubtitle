app = app || {};

app.viewModel = {
  languages: ko.observableArray(_.sortBy(app.languages, 'languageName')),
  dragMessage: ko.observable('Drop your files here'),
  isLoading: ko.observable(false),
  isDropping: ko.observable(false),

  startLoading: function () {
    app.viewModel.dragMessage('Please wait...');
    app.viewModel.isDropping(false);
    app.viewModel.isLoading(true);
  },
  finishLoading: function () {
    app.viewModel.dragMessage('Drop your files here');
    app.viewModel.isDropping(false);
    app.viewModel.isLoading(false);
  }
};