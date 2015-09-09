angular.module('vitae')
    .directive('vitaePhone', function () {
        return {
            restrict: 'E',
            template: '<img src="images/glyphicons_163_iphone.png" height=16/> {{phone}}',
            scope: {
                phone: '='
            },
            controller: function () {
                this.phone = [];
            },
            controllerAs: 'vitaePhoneCtrl'
        };
    });