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
    $scope.model = { CurtainInfoes: [{ Columns: [] }] };

   
    $http({
        method: 'get',
        url: 'manage/Customers/GetAllCity',
    }).success(function (data, status, headers, config) {
        $scope.city = data;
    });

    $scope.getCity = () => {
        $http({
            method: 'get',
            url: 'manage/Customers/GetCountyByCity',
            params: { id: $scope.model.CityId}
        }).success(function (data, status, headers, config) {
            $scope.county = data;
        });
    }
    
    
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
    $http({
        method: 'get',
        url: 'manage/Customers/GetAllCity',
    }).success(function (data, status, headers, config) {
        $scope.city = data;
    });

    $scope.getCity = () => {
        debugger
        $http({
            method: 'get',
            url: 'manage/Customers/GetCountyByCity',
            params: { id: $scope.model.CityId }
        }).success(function (data, status, headers, config) {
            $scope.county = data;
        });
    }
    $scope.save = function () {
        $scope.condition = false;
        angular.forEach($scope.model.CurtainInfoes, function (e) {
            if (!e.CustomerId)
                e.CustomerId = $scope.model.ID
            angular.forEach(e.Columns, function (f) {
                if (!f.CurtainInfoesId)
                    f.CurtainInfoesId = e.ID
            });
        });

        $http({
            method: 'post',
            url: 'manage/Customers/EditCustomer',
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


    $scope.splicese1 = function (i, value,colunmIndex , id) {
        debugger
        $scope.model.CurtainInfoes[value].Columns.splice(i, 1);
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

    $scope.splice = function (i, id, sayi) {
        debugger
        sayi != null && $scope.model.CurtainInfoes.splice(i, 1);
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
    $scope.ie1 = 0;
    $scope.ise1 = 0;
    $scope.e1 = function () {
        debugger
        $scope.model.CurtainInfoes.push({ sayi: $scope.ie1, yeni: 1, isActive: true, Columns: [] });
        $scope.ie1 += 1;
    }

    $scope.e1clone = function (value) {
        debugger
        $scope.model.CurtainInfoes[value].Columns.push({ sayi: $scope.ise1, yeni: 1 });
        $scope.ise1 = +1;
    }

    $http({
        method: 'get',
        url: '/manage/Customers/Detail',
        params: { id: $state.params.id }
    }).success(function (data) {
        angular.forEach(data.CurtainInfoes, function (e) {
            e.sayi = $scope.ie1;
            $scope.ie1 += 1;
            angular.forEach(e.Columns, function (f) {
                f.sayi = $scope.ise1;
                $scope.ise1+=1;
            });
            
        });
        $scope.model = data;
        $scope.getCity()
    });

})