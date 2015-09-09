angular.module('vitae')
    .directive('vitaeEmail', function () {
        return {
            restrict: 'E',
            template: '<img src="images/glyphicons_010_envelope.png" height=16/> {{email}}',
            scope: {
                email: '='
            },
            controller: function () {
                this.email = [];
            },
            controllerAs: 'vitaeEmailCtrl'
        };
    });