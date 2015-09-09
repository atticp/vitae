(function () {
    'use strict';

    describe('vitae', function () {
        describe('vitaeDataService', function () {

            var $httpBackend, VitaeDataServiceObj;
            beforeEach(module('vitae'));

            beforeEach(inject(function (_vitaeDataService_, _$httpBackend_) {
                $httpBackend = _$httpBackend_;
                VitaeDataServiceObj = _vitaeDataService_;
            }));

            afterEach(function () {
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });

            it('should call http.get to load vitea json data', function () {

                $httpBackend.expectGET('vitae.json').respond(200);

                var succeeded;
                new VitaeDataServiceObj()
                    .then(function () {
                        succeeded = true;
                    });
                $httpBackend.flush();
                expect(succeeded).toBe(true);
            });

            it('should only get json data once', function () {
                var requestCount = 0,
                    actualData1,
                    actualData2;

                $httpBackend.whenGET('vitae.json').respond(function () {
                    requestCount += 1;
                    return [200, requestCount];
                });

                new VitaeDataServiceObj().success(function (data) {
                    actualData1 = data;
                });
                new VitaeDataServiceObj().success(function (data) {
                    actualData2 = data;
                });

                $httpBackend.flush();
                expect(actualData1).toBe(1);
                expect(actualData2).toBe(1);

            });
        });
    });
}());