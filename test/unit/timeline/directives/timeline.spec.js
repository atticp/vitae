(function () {
    'use strict';

    describe('vitae.timeline', function () {
        describe('vitaeTimeline directive', function () {

            var element, $scope;
            beforeEach(module('vitae.timeline', function ($compileProvider) {
                $compileProvider.directive('vitaeTimelineChart', function () {
                    return {
                        restrict: 'E',
                        priority: 100,
                        terminal: true,
                        template: 'mock-timeline-chart'
                    }
                });
            }));

            beforeEach(inject(function (_$compile_, _$rootScope_) {
                $scope = _$rootScope_.$new();
                element = _$compile_('<vitae-timeline data="testData"></vitae-timeline>')($scope);
                $scope.testData = 'test data';
                $scope.$digest();
            }));

            it('has a timeline heading', function () {
                expect(element.find('h2').text()).toBe('TIMELINE');
            });

            it('has a timeline chart', function () {
                expect(element.find('vitae-timeline-chart').text()).toBe('mock-timeline-chart');
            });

            it('sets data on the timeline chart', function () {
                expect(element.find('vitae-timeline-chart').attr('data')).toBe('data');
            });
        });
    });
}());