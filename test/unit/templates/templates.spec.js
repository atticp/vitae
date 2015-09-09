(function () {
    'use strict';

    describe('vitae.templates', function () {
        describe('template cache', function () {

            var $templateCache;
            beforeEach(module('vitae.templates'));
            beforeEach(inject(function (_$templateCache_) {
                $templateCache = _$templateCache_;
            }));

            it('has an interests template', function () {
                expect($templateCache.get('interests.html')).toBeDefined();
            });

            it('has a keySkills template', function () {
                expect($templateCache.get('keySkills.html')).toBeDefined();
            });

            it('has a timeline template', function () {
                expect($templateCache.get('timeline.html')).toBeDefined();
            });

            it('has a vitae template', function () {
                expect($templateCache.get('vitae.html')).toBeDefined();
            });
        });
    });
}());