(function () {
    'use strict';

    describe('vitae.keySkills', function () {
        describe('vitaeKeySkills directive', function () {

            var element, $scope;
            beforeEach(module('vitae.keySkills'));
            beforeEach(inject(function (_$compile_, _$rootScope_) {
                $scope = _$rootScope_.$new();
                element = _$compile_('<vitae-key-skills data="testData"></vitae-key-skills>')($scope);
                $scope.testData = ['test-skill-1', 'test-skill-2', 'test-skill-3'];
                $scope.$digest();
            }));

            it('has a key skills heading', function () {
                expect(element.find('h2').text()).toBe('KEY SKILLS');
            });

            it('lists all key skills', function () {
                var items = element.find('li');
                expect(items.length).toBe(3);
                expect(angular.element(items[0]).text()).toBe('test-skill-1');
                expect(angular.element(items[1]).text()).toBe('test-skill-2');
                expect(angular.element(items[2]).text()).toBe('test-skill-3');
            });
        });
    });
}());