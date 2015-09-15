(function () {
    'use strict';

    describe('vitae', function () {
        describe('vitaeCtrl', function () {

            var mockVitaeDataService, controller, scope;

            beforeEach(module('vitae'));

            beforeEach(inject(function ($controller, _$rootScope_, $q) {
                mockVitaeDataService = function () {
                    var deferred = $q.defer();
                    deferred.resolve({
                        data: 'test data'
                    });
                    return deferred.promise;
                };

                scope = _$rootScope_.$new();
                controller = $controller('VitaeCtrl', {
                    $scope: scope,
                    vitaeDataService: mockVitaeDataService
                });
            }));

            it('assigns retrieved json to scope vitaeData', function () {
                var expected = 'test data';

                scope.$digest();
                expect(scope.vitaeData).toEqual(expected);
            });

        });
    });
}());