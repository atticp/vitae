angular.module('vitae')
    .factory('vitaeDataService', ['$http', function ($http) {
        var promise = null;

        return function () {
            if (promise) {
                return promise;
            } else {
                promise = $http.get('vitae.json');
                return promise;
            }
        };
    }]);