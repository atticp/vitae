(function () {
    'use strict';

    describe('vitae', function () {
        describe('vitaeAddress directive', function () {

            var element, $scope;
            beforeEach(module('vitae'));
            beforeEach(inject(function (_$compile_, _$rootScope_) {
                $scope = _$rootScope_.$new();
                element = _$compile_('<vitae-address address="testData"></vitae-address>')($scope);
                $scope.testData = 'test-address';
                $scope.$digest();
            }));

            it('displays the address', function () {
                expect(element.text()).toBe(' test-address');
            });
        });
    });
}());