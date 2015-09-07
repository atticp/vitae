angular.module('vitae')
    .controller('VitaeCtrl', ['$scope', 'vitaeDataService', function ($scope, vitaeDataService) {
        vitaeDataService().success(function (data) {
            $scope.vitaeData = data;
        });
    }]);