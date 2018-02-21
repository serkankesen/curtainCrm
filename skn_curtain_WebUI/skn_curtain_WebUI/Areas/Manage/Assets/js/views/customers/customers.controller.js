'use strict';
BackOffice.controller('CustomersController', function ($rootScope, $scope, $http, $state) {
    $scope.$on('$viewContentLoaded', function () {
        // initialize core components
        Metronic.initAjax();
    });
    $scope.redirectform = function (id) {
        console.log(id);
        $state.go("customer-detail", { id: id });
    }

    $scope.delete = function (id) {
        $http({
            method: 'post',
            url: 'manage/Customers/RemoveMove',
            data: { id: id }
        }).success(function (data) {
            if (data) {
                toastr.success("Silme işleminiz başarılı", "Bilgilendirme");
                $state.reload();
            }
        });
    }


    $scope.search = () => {
        $http({
            method: 'get',
            url: 'manage/Customers/GetAllCustomers',
            params: { search: $scope.text }
        }).success(function (data, status, headers, config) {
            $scope.customers = data.data;
            $scope.paging = data.paging;
            console.log(data.paging);
        }).error(function (data, status, headers, config) {
        });
    }

    $http({
        method: "get",
        url: "manage/Customers/GetAllCustomers",
    }).success(function (data) {
        $scope.customers = data.data;
        $scope.paging = data.paging;
    }).error(function (data) {
        toastr.error("Teknik problem meydana geldi", "Bilgilendirme");
    });

   

    $scope.getList = function (page, pageSize) {
        $http({
            method: 'get',
            url: 'manage/Customers/GetAllCustomers',
            params: { page: page.value, pageSize: pageSize }
        }).success(function (data, status, headers, config) {
            $scope.customers = data.data;
            $scope.paging = data.paging;
            console.log(data.paging);
        }).error(function (data, status, headers, config) {
        });
    };
})

BackOffice.controller('CustomerSetController', function ($rootScope, $scope, $http, $state) {
    $scope.$on('$viewContentLoaded', function () {
        // initialize core components
        Metronic.initAjax();
    });
    $scope.model = { CurtainInfoes: [ { Columns: [] }] };
    
    $scope.save = function () {
        $scope.condition = false;
        $http({
            method: 'post',
            url: 'manage/Customers/AddCustomer',
            data: { model: $scope.model }
        }).success(function (data) {
            if (data > 0) {
                $state.go('customer-detail', { 'id': data });
                toastr.success("İşlem Başarılı", "Bilgilendirme");
            } else {
                toastr.error("Sayfa eklenemedi.", "Bilgilendirme");
            }
        }).error(function () {
            toastr.error("İşlem Başarısız", "Bilgilendirme");
        });

    }
    

    $scope.model.CurtainInfoes.splice(0, 1);

    var ie1 = 0;
    var ise1 = 0;
    $scope.e1 = function () {
        $scope.model.CurtainInfoes.push({ sayi: ie1, yeni: 1, isActive: true, Columns: [] });
        ie1 += 1;
    }

    $scope.splice = function (i, id) {
        $scope.model.CurtainInfoes.splice(i, 1);
        if (id != null) {
            $http({
                method: 'post',
                url: '/manage/Customers/RemoveCurtain',
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
        $scope.model.CurtainInfoes[value].Columns.push({ sayi: ise1, yeni: 1 });
        ise1 = +1;
    }
    $scope.splicese1 = function (i, value) {
        $scope.model.CurtainInfoes[value].Columns.splice(i, 1);
       
    }
})

BackOffice.controller('CustomerController', function ($rootScope, $scope, $http, $state) {
    $scope.$on('$viewContentLoaded', function () {
        // initialize core components
        Metronic.initAjax();
    });
    $scope.model = { CurtainInfoes: [{ Columns: [] }] };
    $scope.splicese1 = function (i, value,id) {
        //$scope.model.CurtainInfoes[value].Columns.splice(i, 1);
        if (id != null) {
            $http({
                method: 'post',
                url: '/manage/Customers/RemoveColumn',
                data: { id: id }
            }).success(function (data) {
                toastr.success("İşlem Başarılı", "Bilgilendirme");
                $state.reload();
            }).error(function () {
                toastr.error("İşlem Başarısız", "Bilgilendirme");
            });
        }
    }

    $scope.splice = function (i, id) {
        //$scope.model.CurtainInfoes.splice(i, 1);
        if (id != null) {
            $http({
                method: 'post',
                url: '/manage/Customers/RemoveCurtain',
                data: { id: id }
            }).success(function (data) {
                toastr.success("İşlem Başarılı", "Bilgilendirme");
                $state.reload();
            }).error(function () {
                toastr.error("İşlem Başarısız", "Bilgilendirme");
            });
        }
    }
    $http({
        method: 'get',
        url: '/manage/Customers/Detail',
        params: { id: $state.params.id }
    }).success(function (data) {
        $scope.model = data;
    });

})