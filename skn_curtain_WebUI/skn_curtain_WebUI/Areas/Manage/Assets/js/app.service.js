/***
GLobal Services
***/
'use strict';
BackOffice.factory('exceptionhandler', function () {
    return function (exception, cause) {
        exception.message += "caused by: " + cause;
    };
});

BackOffice.factory('settings', ['$rootScope', function ($rootScope) {
    // supported languages
    var settings = {
        layout: {
            pageSidebarClosed: true, // sidebar state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        layoutImgPath: Metronic.getAssetsPath() + 'img/',
        layoutCssPath: Metronic.getAssetsPath() + 'css/'
    };

    $rootScope.settings = settings;

    return settings;
}]);


