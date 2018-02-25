/***
Metronic AngularJS App Main Script
***/

/* Metronic App */
var curtain = angular.module("curtain", [
    "ui.router",
    "oc.lazyLoad",
   // "ui.bootstrap",
]);

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
//curtain.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
//    $ocLazyLoadProvider.config({
//        cssFilesInsertBefore: 'ng_load_plugins_before' // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
//    });
//}]);

/********************************************
 BEGIN: BREAKING CHANGE in AngularJS v1.3.x:
*********************************************/
/**
`$controller` will no longer look for controllers on `window`.
The old behavior of looking on `window` for controllers was originally intended
for use in examples, demos, and toy apps. We found that allowing global controller
functions encouraged poor practices, so we resolved to disable this behavior by
default.

To migrate, register your controllers with modules rather than exposing them
as globals:

Before:

```javascript
function MyController() {
  // ...
}
```

After:

```javascript
angular.module('myApp', []).controller('MyController', [function() {
  // ...
}]);

Although it's not recommended, you can re-enable the old behavior like this:

```javascript
angular.module('myModule').config(['$controllerProvider', function($controllerProvider) {
  // this option might be handy for migrating old apps, but please don't use it
  // in new ones!
  $controllerProvider.allowGlobals();
}]);
**/

//AngularJS v1.3.x workaround for old style controller declarition in HTML
curtain.config(['$controllerProvider', function ($controllerProvider) {
    // this option might be handy for migrating old apps, but please don't use it
    // in new ones!
    $controllerProvider.allowGlobals();
}]);

/********************************************
 END: BREAKING CHANGE in AngularJS v1.3.x:
*********************************************/

/* Setup global settings */
curtain.factory('settings', ['$rootScope', function ($rootScope) {
    // supported languages
    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        layoutImgPath: Metronic.getAssetsPath() + 'img/',
        layoutCssPath: Metronic.getAssetsPath() + 'css/'
    };

    $rootScope.settings = settings;

    return settings;
}]);

/* Setup App Main Controller */
curtain.controller('AppController', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.$on('$viewContentLoaded', function () {
        Metronic.initComponents(); // init core components
        //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive 
    });
}]);

/***
Layout Partials.
By default the partials are loaded through AngularJS ng-include directive. In case they loaded in server side(e.g: PHP include function) then below partial 
initialization can be disabled and Layout.init() should be called on page load complete as explained above.
***/

/* Setup Layout Part - Header */
curtain.controller('HeaderController', ['$scope', function ($scope) {
    $scope.$on('$includeContentLoaded', function () {
        Layout.initHeader(); // init header
    });
   
}]);

/* Setup Layout Part - Sidebar */
curtain.controller('SidebarController', ['$scope', function ($scope) {
    $scope.$on('$includeContentLoaded', function () {
        Layout.initSidebar(); // init sidebar
    });
}]);

/* Setup Layout Part - Sidebar */
curtain.controller('PageHeadController', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.$on('$includeContentLoaded', function () {
        Demo.init(); // init theme panel

        $rootScope.tab = 1;

    });
}]);

/* Setup Layout Part - Footer */
curtain.controller('FooterController', ['$scope', function ($scope) {
    $scope.$on('$includeContentLoaded', function () {
        Layout.initFooter(); // init footer
    });
}]);

/* Setup Rounting For All Pages */
curtain.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    // Redirect any unmatched url
    $urlRouterProvider.otherwise("/home");
    //if (window.history && history.pushState) {
    //    $locationProvider.html5Mode({
    //        enabled: true,
    //        requireBase: false
    //    });
    //};

    $stateProvider

        // Home
        .state('home', {
            url: "/home",
            templateUrl: "../assets/js/views/home/home.html",
            data: { pageTitle: 'BİNBİRGECE', pageSubTitle: 'Ana Sayfa' },
            controller: "DashboardController",
            resolve: {
                deps: [
                    '$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'curtain',
                            files: [
                                '../assets/js/controllers/dashboard.js'
                            ]
                        });
                    }
                ]
            }
        })
        // Dashboard
        .state('manage', {
            url: "/manage",
            templateUrl: "../areas/manage/assets/js/views/shared/dashboard.html",
            data: { pageTitle: 'Yönetim Paneli' },
            controller: "DashboardController",
            resolve: {
                deps: [
                    '$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'curtain',
                            files: [
                                '../areas/manage/assets/js/controllers/dashboard.js'
                            ]
                        });
                    }
                ]
            }
        });
}]);

/* Init global settings and run the app */
curtain.run(["$rootScope", "settings", "$state", function ($rootScope, settings, $state) {
    $rootScope.$state = $state; // state to be accessed from view
}]);