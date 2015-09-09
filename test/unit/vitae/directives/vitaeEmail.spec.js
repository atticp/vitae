(function () {
    'use strict';

    describe('vitae', function () {
        describe('vitaeEmail directive', function () {

            var element, $scope;
            beforeEach(module('vitae'));
            beforeEach(inject(function (_$compile_, _$rootScope_) {
                $scope = _$rootScope_.$new();
                element = _$compile_('<vitae-email email="testData"></vitae-email>')($scope);
                $scope.testData = 'test-email';
                $scope.$digest();
            }));

            it('displays the email address', function () {
                expect(element.text()).toBe(' test-email');
            });
        });
    });
}());