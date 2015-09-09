angular.module('vitae.keySkills')
    .directive('vitaeKeySkills', function () {
        return {
            restrict: 'E',
            templateUrl: 'keySkills.html',
            scope: {
                data: '='
            },
            controller: function () {
                this.data = [];
            },
            controllerAs: 'keySkillsCtrl'
        };
    });