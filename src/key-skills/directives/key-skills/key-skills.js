angular.module('vitae.keySkills')
    .directive('vitaeKeySkills', function () {
        return {
            restrict: 'E',
            templateUrl: 'key-skills.html',
            scope: {
                data: '='
            },
            controller: function () {
                this.data = [];
            },
            controllerAs: 'keySkillsCtrl'
        };
    });