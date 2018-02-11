'use strict';
BackOffice.controller('CustomersController', function ($rootScope, $scope) {
    $scope.$on('$viewContentLoaded', function () {
        // initialize core components
        Metronic.initAjax();
    });


})

BackOffice.controller('CustomerSetController', function ($rootScope, $scope) {
    $scope.$on('$viewContentLoaded', function () {
        // initialize core components
        Metronic.initAjax();
    });
    $scope.model = { Customers: { CurtainInfoes: [{ Columns: [] }] } };

    $scope.model.Customers.CurtainInfoes.splice(0, 1);

    var ie1 = 0;
    var ise1 = 0;
    $scope.e1 = function () {
        $scope.model.Customers.CurtainInfoes.push({ sayi: ie1, yeni: 1, isActive: true, Columns: [] });
        ie1 += 1;
    }

    $scope.splice = function (i, id) {
        $scope.model.Customers.CurtainInfoes.splice(i, 1);
        if (id != null) {
            $http({
                method: 'post',
                url: '/manage/contact/RemoveContact',
                data: { id: id }
            }).success(function (data) {
                toastr.success("İşlem Başarılı", "Bilgilendirme");
                $state.reload();
            }).error(function () {
                toastr.error("İşlem Başarısız", "Bilgilendirme");
            });
        }
    }

    $scope.e1clone = function (value) {
        $scope.model.Customers.CurtainInfoes[value].Columns.push({ sayi: ise1, yeni: 1 });
        ise1 = +1;
    }
    $scope.splicese1 = function (i, value) {
        $scope.model.Customers.CurtainInfoes[value].Columns.splice(i, 1);
    }
})

BackOffice.controller('CustomerController', function ($rootScope, $scope) {
    $scope.$on('$viewContentLoaded', function () {
        // initialize core components
        Metronic.initAjax();
    });


})