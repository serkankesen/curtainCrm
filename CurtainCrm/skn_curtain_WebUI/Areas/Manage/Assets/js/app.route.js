'use strict';
BackOffice.controller('AppController', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.$on('$viewContentLoaded', function () {
        Metronic.initComponents();
    }); 

}]);
BackOffice.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise("/customers");
    //if (window.history && history.pushState) {
    //    $locationProvider.html5Mode({
    //        enabled: true,
    //        requireBase: false
    //    });
    //};

    $stateProvider
    // Dashboard
    .state('dashboard', {
        url: "/dashboard",
        templateUrl: "../areas/manage/assets/js/views/layout/content.html",
        data: { pageTitle: 'Dashboard', pageSubTitle: 'istatistik & rapor' },
        controller: "ContentController",
        resolve: {
            deps: [
                '$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'BackOffice',
                        files: [
                            '../areas/manage/assets/js/views/layout/content.controller.js'
                        ]
                    });
                }
            ]
        }
    })

    //Customers
    .state('customers', {
        url: "/customers",
        templateUrl: "../areas/manage/assets/js/views/customers/customers.html",
        data: { pageTitle: 'Müşteriler', pageSubTitle: 'Müşteriler' },
        controller: "CustomersController",
        resolve: {
            deps: [
                '$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'BackOffice',
                        files: [
                            '../areas/manage/assets/js/views/customers/customers.controller.js'
                        ]
                    });
                }
            ]
        }
    })

    .state('customer-detail', {
        url: "/customer-detail/:id",
        templateUrl: "../areas/manage/assets/js/views/customers/customer-detail.html",
        data: { pageTitle: 'Müşteri Detay', pageSubTitle: 'Müşteri Detay' },
        controller: "CustomerController",
        resolve: {
            deps: [
                '$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'BackOffice',
                        files: [
                            '../areas/manage/assets/libs/jquery.ui.widget.js',
                            '../areas/manage/assets/libs/fancybox/source/jquery.fancybox.css',
                            '../areas/manage/assets/libs/fancybox/source/jquery.fancybox.pack.js',
                            '../areas/manage/assets/js/vendor/jquery.fileDownload.js',
                            '../areas/manage/assets/js/vendor/jquery.fileupload.js',
                            '../areas/manage/assets/js/views/customers/customers.controller.js'
                        ]
                    });
                }
            ]
        }
    })

    .state('customer-set', {
        url: "/customer-set",
        templateUrl: "../areas/manage/assets/js/views/customers/customer-set.html",
        data: { pageTitle: 'Müşteriler', pageSubTitle: 'Müşteri Ekle' },
        controller: "CustomerSetController",
        resolve: {
            deps: [
                '$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'BackOffice',
                        files: [
                            '../areas/manage/assets/libs/jquery.ui.widget.js',
                            '../areas/manage/assets/libs/fancybox/source/jquery.fancybox.css',
                            '../areas/manage/assets/libs/fancybox/source/jquery.fancybox.pack.js',
                            '../areas/manage/assets/js/vendor/jquery.fileDownload.js',
                            '../areas/manage/assets/js/vendor/jquery.fileupload.js',
                            '../areas/manage/assets/js/views/customers/customers.controller.js',
                            //'../areas/manage/assets/libs/jquery-minicolors/jquery.minicolors.css',
                            //'../areas/manage/assets/libs/jquery-minicolors/jquery.minicolors.min.js',
                        ]
                    });
                }
            ]
        }
    })
}]);
BackOffice.run(["$rootScope", "settings", "$state", function ($rootScope, settings, $state) {
    $rootScope.$state = $state; // state to be accessed from view
}]);
