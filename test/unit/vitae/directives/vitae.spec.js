(function () {
    'use strict';

    describe('vitae', function () {
        describe('vitae directive', function () {

            var element, $scope;
            beforeEach(module('vitae', function ($compileProvider) {
                $compileProvider.directive('vitaeNameHeader', function () {
                        return {
                            restrict: 'E',
                            priority: 100,
                            terminal: true,
                            template: 'mock-name-header'
                        }
                    })
                    .directive('vitaeKeySkills', function () {
                        return {
                            restrict: 'E',
                            priority: 100,
                            terminal: true,
                            template: 'mock-key-skills'
                        }
                    })
                    .directive('vitaeTimeline', function () {
                        return {
                            restrict: 'E',
                            priority: 100,
                            terminal: true,
                            template: 'mock-timeline'
                        }
                    })
                    .directive('vitaeInterests', function () {
                        return {
                            restrict: 'E',
                            priority: 100,
                            terminal: true,
                            template: 'mock-interests'
                        }
                    })
                    .directive('vitaeAddress', function () {
                        return {
                            restrict: 'E',
                            priority: 100,
                            terminal: true,
                            template: 'mock-address'
                        }
                    })
                    .directive('vitaePhone', function () {
                        return {
                            restrict: 'E',
                            priority: 100,
                            terminal: true,
                            template: 'mock-phone'
                        }
                    })
                    .directive('vitaeEmail', function () {
                        return {
                            restrict: 'E',
                            priority: 100,
                            terminal: true,
                            template: 'mock-email'
                        }
                    });
            }));

            beforeEach(inject(function (_$compile_, _$rootScope_) {
                $scope = _$rootScope_.$new();
                element = _$compile_('<vitae data="testData"></vitae>')($scope);
                $scope.testData = {
                    name: 'test-name',
                    address: 'test-address',
                    phone: 'test-phone',
                    email: 'test-email',
                    keyskills: 'test-keyskills',
                    experience: 'test-experience',
                    interests: 'test-interests'
                };
                $scope.$digest();
            }));

            it('has a name header', function () {
                expect(element.find('vitae-name-header').text()).toBe('mock-name-header');
            });

            it('sets data on the name header', function () {
                expect(element.find('vitae-name-header').attr('data')).toBe('data');
            });

            it('has a key-skills section', function () {
                expect(element.find('vitae-key-skills').text()).toBe('mock-key-skills');
            });

            it('sets key skills data', function () {
                expect(element.find('vitae-key-skills').attr('data')).toBe('data.keyskills');
            });

            it('has a timeline section', function () {
                expect(element.find('vitae-timeline').text()).toBe('mock-timeline');
            });

            it('sets timeline data', function () {
                expect(element.find('vitae-timeline').attr('data')).toBe('data.experience');
            });

            it('has an interests section', function () {
                expect(element.find('vitae-interests').text()).toBe('mock-interests');
            });

            it('sets interests data', function () {
                expect(element.find('vitae-interests').attr('data')).toBe('data.interests');
            });

            it('has an address section', function () {
                expect(element.find('vitae-address').text()).toBe('mock-address');
            });

            it('sets address data', function () {
                expect(element.find('vitae-address').attr('address')).toBe('data.address');
            });

            it('has an phone section', function () {
                expect(element.find('vitae-phone').text()).toBe('mock-phone');
            });

            it('sets phone data', function () {
                expect(element.find('vitae-phone').attr('phone')).toBe('data.phone');
            });

            it('has an email section', function () {
                expect(element.find('vitae-email').text()).toBe('mock-email');
            });

            it('sets interests data', function () {
                expect(element.find('vitae-email').attr('email')).toBe('data.email');
            });

        });
    });
}());