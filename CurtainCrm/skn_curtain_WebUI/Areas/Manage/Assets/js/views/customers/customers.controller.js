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
    $scope.model = { CurtainInfoes: [{ Pictures: [] }] };
    $scope.showCommit = false;

    $('body').on('click', '.fileupload', function () {
        $(this).bind('fileuploaddone', function (e, data) {
            debugger
            if (data.result.isValid === true) {  
                if ($scope.model.CurtainInfoes[parseInt(data.fileInput.context.alt)].Pictures.find(a => a.name === data.result.name)) {
                    return;
                }
                $scope.$apply($scope.model.CurtainInfoes[parseInt(data.fileInput.context.alt)].Pictures.push(data.result));
                toastr.info("Resim eklendi.", "Bilgilendirme");

            } else {
                alert(data.result.message);
                return false;
            }
            return false;
        });
    });

    $scope.removeFile = function (path,rowId) {
        
        console.log(path);
        console.log($scope.model);
        debugger
        $scope.model.CurtainInfoes[parseInt(rowId)].Pictures.splice($scope.model.CurtainInfoes[parseInt(rowId)].Pictures.indexOf(path), 1);
        $http({
            method: 'get',
            url: 'Driver/RemoveImage',
            params: { name: path.name },
        }).success(function (data, status, headers, config) {
            //$.gritter.add({ text: "success" });
            toastr.info("Resim(ler) silindi.", "Bilgilendirme");
        }).error(function (data, status, headers, config) {
            //$.gritter.add({ text: 'Beklenmedik bir hata oluştu,lütfen tekrar deneyiniz' });
            console.log(data);
        });
    };

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
        $scope.model.City = $scope.city.find(e => e.CityId === $scope.model.CityId).Name;
        $scope.model.County = $scope.county.find(e => e.CountyId === $scope.model.CountyId).Name;
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
        $scope.model.CurtainInfoes.push({ sayi: ie1, yeni: 1, isActive: true, Pictures: [] });
        ie1 += 1;
        $scope.showCommit = true;
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
        $scope.model.CurtainInfoes[value].Pictures.push({ sayi: ise1, yeni: 1 });
        ise1 = +1;
    }
    $scope.splicese1 = function (i, value) {
        $scope.model.CurtainInfoes[value].Pictures.splice(i, 1);
       
    }
})

BackOffice.controller('CustomerController', function ($rootScope, $scope, $http, $state) {
    $scope.$on('$viewContentLoaded', function () {
        // initialize core components
        Metronic.initAjax();
    });
    $scope.model = { CurtainInfoes: [{ Pictures: [] }] };
    $scope.showCommit = false;
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
            params: { id: $scope.model.CityId }
        }).success(function (data, status, headers, config) {
            $scope.county = data;
        });
    }

    $('body').on('click', '.fileupload', function () {
        $(this).bind('fileuploaddone', function (e, data) {
            if (data.result.isValid === true) {
                if ($scope.model.CurtainInfoes[parseInt(data.fileInput.context.alt)].Pictures.find(a => a.name === data.result.name)) {
                    return;
                }
                $scope.$apply($scope.model.CurtainInfoes[parseInt(data.fileInput.context.alt)].Pictures.push(data.result));
                toastr.info("Resim eklendi.", "Bilgilendirme");

            } else {
                alert(data.result.message);
                return false;
            }
            return false;
        });
    });

    $scope.removeFile = function (path, rowId) {
        debugger
        console.log(path);
        console.log($scope.model);
        $http({
            method: 'post',
            url: 'manage/Customers/RemovePicture',
            data: { id: path.ID },
        }).success(function (data, status, headers, config) {
        }).error(function (data, status, headers, config) {

            console.log(data);
        });
        $scope.model.CurtainInfoes[parseInt(rowId)].Pictures.splice($scope.model.CurtainInfoes[parseInt(rowId)].Pictures.indexOf(path), 1);
        $http({
            method: 'get',
            url: 'Driver/RemoveImage',
            params: { name: path.name },
        }).success(function (data, status, headers, config) {
            //$.gritter.add({ text: "success" });
            toastr.info("Resim(ler) silindi.", "Bilgilendirme");
        }).error(function (data, status, headers, config) {
            //$.gritter.add({ text: 'Beklenmedik bir hata oluştu,lütfen tekrar deneyiniz' });
            console.log(data);
        });
    };
    $scope.save = function () {
        $scope.condition = false;
        //$scope.model.OpenAddress = $scope.model.OpenAddress + " - " + $scope.county.find(e => e.CountyId === $scope.model.CountyId).Name + " - " + $scope.city.find(e => e.CityId===$scope.model.CityId).Name;
        $scope.model.City = $scope.city.find(e => e.CityId === $scope.model.CityId).Name;
        $scope.model.County = $scope.county.find(e => e.CountyId === $scope.model.CountyId).Name;
        angular.forEach($scope.model.CurtainInfoes, function (e) {
            if (!e.CustomerId)
                e.CustomerId = $scope.model.ID
            angular.forEach(e.Pictures, function (f) {
                if (!f.CurtainInfoesId)
                    f.CurtainInfoesId = e.ID
            });
           
        });
        debugger




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
        $scope.model.CurtainInfoes[value].Pictures.splice(i, 1);
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
        $scope.model.CurtainInfoes.push({ sayi: $scope.ie1, yeni: 1, isActive: true, Pictures: [] });
        $scope.ie1 += 1;
    }

    $scope.e1clone = function (value) {
        $scope.model.CurtainInfoes[value].Pictures.push({ sayi: $scope.ise1, yeni: 1 });
        $scope.ise1 = +1;
    }

    $http({
        method: 'get',
        url: '/manage/Customers/Detail',
        params: { id: $state.params.id }
    }).success(function (data) {
        //angular.forEach(data.CurtainInfoes, function (e) {
        //    $scope.showCommit = true;
        //    e.sayi = $scope.ie1;
        //    $scope.ie1 += 1;
        //    angular.forEach(e.Columns, function (f) {
        //        f.sayi = $scope.ise1;
        //        $scope.ise1+=1;
        //    });
            
        //});
        $scope.model = data;
        $scope.getCity()
    });

})
