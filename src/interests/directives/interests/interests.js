angular.module('vitae.interests')
    .directive('vitaeInterests', function () {
        return {
            restrict: 'E',
            templateUrl: 'interests.html',
            scope: {
                data: '='
            },
            controller: function () {
                this.data = [];
            },
            controllerAs: 'interestsCtrl'
        };
    });