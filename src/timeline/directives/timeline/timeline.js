angular.module('vitae.timeline')
    .directive('vitaeTimeline', function () {
        return {
            restrict: 'E',
            templateUrl: 'timeline.html',
            scope: {
                data: '='
            },
            controller: function () {
                this.data = [];
            },
            controllerAs: 'vitaeTimelineCtrl'
        };
    });