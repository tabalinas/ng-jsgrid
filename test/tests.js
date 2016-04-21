
describe('ng-grid', function() {
    var $compile;
    var $scope;
    var $timeout;

    beforeEach(module('ngjsgrid'));

    beforeEach(inject(function(_$compile_, _$rootScope_, _$timeout_){
        $compile = _$compile_;
        $scope = _$rootScope_;
        $timeout = _$timeout_;
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
        $timeout.flush();

        var newModelValue = [];

        // act
        $scope.config.data = newModelValue;
        $scope.$digest();

        // assert
        expect($(element).jsGrid('option', 'data')).toBe(newModelValue);
    });

    it('should prevent option changing on initialization', function() {
        // arrange
        var optionChangedCalled = 0;

        $scope.config = {
            data: [],
            onOptionChanged: function() {
                optionChangedCalled++;
            }
        };

        // act
        var element = $compile('<div ng-jsgrid="{ data: config.data, onOptionChanged: config.onOptionChanged }"></div>')($scope);
        $scope.$digest();
        $timeout.flush();

        // assert
        expect(optionChangedCalled).toBe(0);
    });

});