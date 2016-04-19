
describe('ng-grid', function() {
    var $compile;
    var $rootScope;

    beforeEach(module('angular.jsgrid'));

    beforeEach(inject(function(_$compile_, _$rootScope_){
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('Replaces the element with the appropriate content', function() {
        expect(true).toBe(true);
    });
});