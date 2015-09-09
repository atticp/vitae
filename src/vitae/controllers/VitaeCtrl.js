angular.module('vitae')
    .controller('VitaeCtrl', ['$scope', 'vitaeDataService', function ($scope, vitaeDataService) {
        vitaeDataService().then(function (response) {
            $scope.vitaeData = response.data;
        });
    }]);