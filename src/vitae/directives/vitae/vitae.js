angular.module('vitae')
    .directive('vitae', function () {
        return {
            restrict: 'E',
            templateUrl: 'vitae.html',
            scope: {
                data: '='
            },
            controller: function () {
                this.data = [];
            },
            controllerAs: 'vitaeCtrl'
        };
    });