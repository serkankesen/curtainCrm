'use strict';

BackOffice.controller('ContentController', function ($rootScope, $scope) {
    $scope.$on('$viewContentLoaded', function () {

        // initialize core components
        Metronic.initAjax();
    });

});