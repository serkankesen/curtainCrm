/***
GLobal Directives
***/

// Route State Load Spinner(used on page or content load)
curtain.directive('ngSpinnerBar', ['$rootScope',
    function ($rootScope) {
        return {
            link: function (scope, element, attrs) {
                // by defult hide the spinner bar
                element.addClass('hide'); // hide spinner bar by default

                // display the spinner bar whenever the route changes(the content part started loading)
                $rootScope.$on('$stateChangeStart', function () {
                    element.removeClass('hide'); // show spinner bar  
                });

                // hide the spinner bar on rounte change success(after the content loaded)
                $rootScope.$on('$stateChangeSuccess', function () {
                    element.addClass('hide'); // hide spinner bar
                    $('body').removeClass('page-on-load'); // remove page loading indicator
                    Layout.setSidebarMenuActiveLink('match'); // activate selected link in the sidebar menu

                    // auto scorll to page top
                    setTimeout(function () {
                        Metronic.scrollTop(); // scroll to the top on content load
                    }, $rootScope.settings.layout.pageAutoScrollOnLoad);
                });

                // handle errors
                $rootScope.$on('$stateNotFound', function () {
                    element.addClass('hide'); // hide spinner bar
                });

                // handle errors
                $rootScope.$on('$stateChangeError', function () {
                    element.addClass('hide'); // hide spinner bar
                });
            }
        };
    }
])

// Handle global LINK click
curtain.directive('a',
    function () {
        return {
            restrict: 'E',
            link: function (scope, elem, attrs) {
                if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
                    elem.on('click', function (e) {
                        e.preventDefault(); // prevent link click for above criteria
                    });
                }
            }
        };
    });

// Handle Dropdown Hover Plugin Integration
curtain.directive('dropdownMenuHover', function () {
    return {
        link: function (scope, elem) {
            elem.dropdownHover();
        }
    };
});

curtain.directive('validmax', function () {
   return {
       restrict: 'A',
       require: 'ngModel',
       link: function ($scope, $element, $attrs, ngModel) {
           $scope.$watch($attrs.ngModel, function (value) {
               console.log(ngModel);
               if (value > 19)
                   toastr.info('Girilen kişi sayısı en fazla 20  olmalı.', 'Bilgilendirme');
               if(ngModel.$viewValue>20)
                   toastr.info('Girilen kişi sayısı en fazla 20  olmalı.', 'Bilgilendirme');

           });
       }
   }

});



