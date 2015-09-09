(function () {
    'use strict';

    describe('vitae', function () {
        describe('vitaeCtrl', function () {

            var $rootScope, mockVitaeDataService, controller, scope;

            beforeEach(module('vitae'));

            beforeEach(inject(function ($controller, _$rootScope_, $q) {
                $rootScope = _$rootScope_;
                mockVitaeDataService = function () {
                    var deferred = $q.defer();
                    deferred.resolve({
                        data: 'test data'
                    });
                    return deferred.promise;
                };

                scope = $rootScope.$new();
                controller = $controller('VitaeCtrl', {
                    $scope: scope,
                    vitaeDataService: mockVitaeDataService
                });
            }));

            it('assigns retrieved json to scope vitaeData', function () {
                var expected = 'test data';

                $rootScope.$digest();
                expect(scope.vitaeData).toEqual(expected);
            });

        });
    });
}());