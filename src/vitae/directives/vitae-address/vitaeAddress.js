angular.module('vitae')
    .directive('vitaeAddress', function () {
        return {
            restrict: 'E',
            template: '<img src="images/glyphicons_020_home.png" height=16/> {{address}}',
            scope: {
                address: '='
            },
            controller: function () {
                this.address = [];
            },
            controllerAs: 'vitaeAddressCtrl'
        };
    });