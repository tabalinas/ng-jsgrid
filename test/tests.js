
describe('ng-grid', function() {
    var $compile;
    var $scope;

    beforeEach(module('angular.jsgrid'));

    beforeEach(inject(function(_$compile_, _$rootScope_){
        $compile = _$compile_;
        $scope = _$rootScope_;
    }));

    it('should create jsGrid providing options', function() {
        // arrange
        var data = [];
        $scope.config = {
            data: data
        };

        // act
        var element = $compile('<div ng-jsgrid="config"></div>')($scope);
        $scope.$digest();

        // assert
        expect($(element).data('JSGrid')).toBeDefined();
        expect($(element).jsGrid('option', 'data')).toBe(data);
    });

    it('should change option when model property is changed', function() {
        // arrange
        $scope.config = {
            data: []
        };
        var element = $compile('<div ng-jsgrid="config"></div>')($scope);
        $scope.$digest();
        var newModelValue = [];

        // act
        $scope.config.data = newModelValue;
        $scope.$digest();

        // assert
        expect($(element).jsGrid('option', 'data')).toBe(newModelValue);
    });

});