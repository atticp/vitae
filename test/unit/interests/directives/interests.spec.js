(function () {
    'use strict';

    describe('vitae.interests', function () {
        describe('vitaeInterests directive', function () {

            var element, $scope;
            beforeEach(module('vitae.interests', function ($compileProvider) {
                $compileProvider.directive('vitaeInterestsChart', function () {
                    return {
                        restrict: 'E',
                        priority: 100,
                        terminal: true,
                        template: 'mock-interests-chart'
                    }
                });
            }));

            beforeEach(inject(function (_$compile_, _$rootScope_) {
                $scope = _$rootScope_.$new();
                element = _$compile_('<vitae-interests data="testData"></vitae-interests>')($scope);
                $scope.testData = 'test data';
                $scope.$digest();
            }));

            it('has an interests heading', function () {
                expect(element.find('h2').text()).toBe('INTERESTS');
            });

            it('has an interests chart', function () {
                expect(element.find('vitae-interests-chart').text()).toBe('mock-interests-chart');
            });

            it('sets data on the interests chart', function () {
                expect(element.find('vitae-interests-chart').attr('data')).toBe('data');
            });
        });
    });
}());