/***GLobal Directives***/
BackOffice.directive('ngSpinnerBar', ['$rootScope', function ($rootScope) {
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
}]);

BackOffice.directive('loading', ['$http', function ($http) {
    return {
        restrict: 'A',
        link: function (scope, elm, attrs) {
            scope.isLoading = function () {
                return $http.pendingRequests.length > 0;
            };

            scope.$watch(scope.isLoading, function (v) {
                if (v) {
                    elm.show();
                } else {
                    elm.hide();
                }
            });
        }
    };
}]);

BackOffice.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.myEnter);
                    element.next().focus();

                });

                event.preventDefault();
                element.next().focus();
            }
        });
    };
});

BackOffice.directive('buyukyaz', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            var buyukyaz = function (inputValue) {
                if (inputValue == undefined) inputValue = '';
                var kocamanyap = inputValue.toUpperCase();
                if (kocamanyap !== inputValue) {
                    modelCtrl.$setViewValue(kocamanyap);
                    modelCtrl.$render();
                }
                return kocamanyap;
            }
            modelCtrl.$parsers.push(buyukyaz);
            buyukyaz(scope[attrs.ngModel]);
        }
    };
});
// Route State Load Spinner(used on page or content load)
BackOffice.directive('ngSpinnerBar', ['$rootScope', function ($rootScope) {
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
}]);
// Handle global LINK click
BackOffice.directive('a', function () {
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
BackOffice.directive('dropdownMenuHover', function () {
    return {
        link: function (scope, elem) {
            elem.dropdownHover();
        }
    };
});

BackOffice.directive('ngLength', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
            ngLength: '='
        },
        link: function ($scope, $element, $attrs, ngModel) {
            $scope.$watch($attrs.ngModel, function (value) {
                var isValid = (value.length === $scope.ngLength);
                ngModel.$setValidity($attrs.ngModel, isValid);
            });
        }
    }
});
BackOffice.directive('mypaging', function () {
    //alert("directive");
    //transclude:true,
    ///template: '<div>heyyy</div>'
    //template: '<input type="text" ng-model={{aaa}}"/>'
    return {
        //require: '^pageinfo',
        restrict: 'E',
        scope: {
            paging: '=pageinfo',
            getList: '=getlist'
        },
        //replace: true,
        templateUrl: '../areas/manage/assets/js/views/general/pagination.html',
        controller: function ($scope) {    //c_ defines computing value
            $scope.c_totalPages = function (totalItems, pageSize) {

                $scope.numbers = new Array();
                var ceil = Math.ceil(totalItems / pageSize);
                $scope.totalPages = ceil;
                for (var i = 1; i <= ceil; i++) {
                    $scope.numbers.push({ value: i });
                }
            };
            $scope.c_totalPages();
        },
        link: function (scope, element, attrs, ctrl) {
            var d;
            scope.$watch('paging', function (newValue) {
                if (newValue === undefined || newValue.totalItems == 0) return false;
                else {
                    d = scope.paging;
                    scope.c_totalPages(d.totalItems, d.pageSize);

                    scope.first = { isShow: d.currentPage == 1 ? false : true, value: 1 };
                    scope.last = {
                        isShow: (d.currentPage == scope.numbers.length) ? false : true,
                        value: scope.numbers.length
                    };

                    scope.prev = { isShow: (d.currentPage - 1 <= 0) ? false : true, value: d.currentPage - 1 };
                    scope.prevStep = { isShow: (d.currentPage - 4 <= 0) ? false : true, value: d.currentPage - 4 };
                    scope.next = { isShow: (d.currentPage < scope.numbers.length) ? true : false, value: d.currentPage + 1 };
                    scope.nextStep = { isShow: (d.currentPage < scope.numbers.length) ? true : false, value: d.currentPage + 4 };
                    scope.lastNumber = { isShow: (d.currentPage === scope.numbers.length) ? false : true, value: scope.numbers.length }

                    var begin;
                    var end;
                    if (d.currentPage - 3 < 0) {
                        begin = 0;
                        end = begin + 3;
                    } else {
                        begin = d.currentPage - 3;
                        end = begin + 5;

                    }

                    scope.numbers = scope.numbers.slice(begin, end);
                }
            });
        }
    };
});


BackOffice.directive('redirect', function () {

    return {
        restrict: 'A',
        scope: {

        },
        link: function () {

        }
    }

});

BackOffice.filter('IfNull', function () {
    return function (val) {
        if (angular.isUndefined(val) || val === null || val === '') {
            return 'Belirtilmedi';
        }
    };
});

BackOffice.filter('split', function () {
    return function (input, splitChar, splitIndex) {
        // do some bounds checking here to ensure it has that index
        return input.split(splitChar)[splitIndex];
    }
});

BackOffice.directive('focusMe', function () {
    return {
        link: function (scope, element, attrs) {
            scope.$watch(attrs.focusMe, function (value) {
                if (value === true) {
                    console.log('value=', value);
                    //$timeout(function() {
                    element[0].focus();
                    scope[attrs.focusMe] = false;
                    //});
                }
            });
        }
    };
});

BackOffice.directive("formatDate", function() {
    return {
        require: 'ngModel',
        link: function(scope, elem, attr, modelCtrl) {
            modelCtrl.$formatters.push(function(modelValue) {
                return new Date(modelValue);
            })
        }
    }
});


