'use strict';

var addUserModal = function (modal) {
    return modal.open({
        templateUrl: "../areas/manage/assets/js/views/users/addUserModal.html",
        controller: "AddUserModalController",
        backdrop: "static",
        resolve: {
            total: function () {
                return null;

            }
        }
    });
};



BackOffice.controller('SidebarController', function ($scope, $modal) {
    $scope.$on('$includeContentLoaded', function () {
        Layout.initSidebar(); // init sidebar
    });

    $scope.addUserModal = function () {
        return addUserModal($modal);
    };

});
