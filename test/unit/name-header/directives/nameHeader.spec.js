(function () {
    'use strict';

    describe('vitae.nameHeader', function () {
        describe('vitaeNameHeader directive', function () {

            var element, $scope, $q, $window, testData;
            beforeEach(module('vitae.nameHeader'));
            beforeEach(module(function ($provide) {
                $provide.provider('d3Service', function () {
                    this.$get = function () {
                        var d = $q.defer();
                        d.resolve($window.d3);
                        return {
                            d3: function () {
                                return d.promise;
                            }
                        };
                    };
                });

                $provide.provider('d3UtilsService', function () {
                    this.$get = function () {
                        return {
                            wrapSVGText: function (textNode, options) {
                                var caption = options.caption ? options.caption : "";
                                textNode.text(caption);
                            }
                        };
                    };
                });
            }));


            beforeEach(inject(function (_$compile_, _$rootScope_, _$q_, _$window_) {

                testData = {
                    name: 'test-name',
                    description: 'test-description'
                };

                $q = _$q_;
                $window = _$window_;

                element = angular.element('<vitae-name-header data="testData"></vitae-name-header>');
                $scope = _$rootScope_.$new();
                $scope.testData = testData;

                _$compile_(element)($scope);
                $scope.$digest();
            }));


            it('should create an svg element', function () {
                var chartSvg = element.find('svg');
                expect(chartSvg.length).toBe(1);
            });

            it('should draw a text element for the name', function () {
                var name = element.find('svg .vitae-header-name');
                expect(name.length).toBe(1);
                expect(name.text()).toBe(testData.name);
            });

            it('should draw a text element for the description', function () {
                var desc = element.find('svg .vitae-header-description');
                expect(desc.length).toBe(1);
                expect(desc.text()).toBe(testData.description);
            });
        });

        // No Data Tests
        describe('vitaeNameHeader directive', function () {            
            var element, $scope, $q, $window;
            beforeEach(module('vitae.nameHeader'));
            beforeEach(module(function ($provide) {
                $provide.provider('d3Service', function () {
                    this.$get = function () {
                        var d = $q.defer();
                        d.resolve($window.d3);
                        return {
                            d3: function () {
                                return d.promise;
                            }
                        };
                    };
                });

                $provide.provider('d3UtilsService', function () {
                    this.$get = function () {
                        return {
                            wrapSVGText: function (textNode, options) {
                                var caption = options.caption ? options.caption : "";
                                textNode.text(caption);
                            }
                        };
                    };
                });
            }));


            beforeEach(inject(function (_$compile_, _$rootScope_, _$q_, _$window_) {
                $q = _$q_;
                $window = _$window_;

                element = angular.element('<vitae-name-header></vitae-name-header>');
                $scope = _$rootScope_.$new();

                _$compile_(element)($scope);
                $scope.$digest();
            }));


            it('should create an empty svg element when no data is provided', function () {
                var chartSvg = element.find('svg');
                expect(chartSvg.length).toBe(1);
                expect(chartSvg[0].childElementCount).toBe(0);
            });
        });
    });
}());