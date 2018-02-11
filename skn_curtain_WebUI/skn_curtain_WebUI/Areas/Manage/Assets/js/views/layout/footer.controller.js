'use strict';
BackOffice.controller('FooterController', ['$scope', function ($scope) {
    $scope.$on('$includeContentLoaded', function () {
        Layout.initFooter(); // init footer
    });
    $scope.text = '© 2018 Binbirgece perde';
}]);