(function () {
    'use strict';

    describe('vitae', function () {
        describe('vitaePhone directive', function () {

            var element, $scope;
            beforeEach(module('vitae'));
            beforeEach(inject(function (_$compile_, _$rootScope_) {
                $scope = _$rootScope_.$new();
                element = _$compile_('<vitae-phone phone="testData"></vitae-phone>')($scope);
                $scope.testData = 'test-phone';
                $scope.$digest();
            }));

            it('displays the phone number', function () {
                expect(element.text()).toBe(' test-phone');
            });
        });
    });
}());