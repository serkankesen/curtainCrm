
//BackOffice.filter("mydate", function () {
//    return function (value) {
//        if (!angular.isUndefined(value)) {
//            return new Date(parseInt(value.substring(6)));
//        }
//        else {
//            return '';
//        }
//    };
//});
BackOffice.filter("datetimeconverter", function () {
    return function (value, format) {
        if (angular.isUndefined(value))
            return;

       
        //var date = (new Date(parseInt(value.substr(6)))).toLocaleString();;
        //date = new Date(date);
        var date = new Date(parseInt(value.substr(6)));

        if (angular.isUndefined(format))
            format = "dd-MM-yyyy";

        format = format.replace("dd", (date.getDate() < 10 ? '0' : '') + date.getDate());
        format = format.replace("MM", (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1));
        format = format.replace("yyyy", date.getFullYear());
        return format;
    };
});

BackOffice.filter("dateconverterforcharitable", function () {
    return function (value, format) {
        if (angular.isUndefined(value))
            return;

        var date = new Date(parseInt(value.substr(6)));
   
        if (value == "/Date(-62135596800000)/") {
            return "Bağış yapılmadı";
        }

        if (angular.isUndefined(format))
            format = "yyyy-MM-dd";

        format = format.replace("dd", (date.getDate() < 10 ? '0' : '') + date.getDate());
        format = format.replace("MM", (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1));
        format = format.replace("yyyy", date.getFullYear());
        return format;
    };
});


BackOffice.filter("dateconverter", function () {
    return function (value, format) {
        if (angular.isUndefined(value))
            return;

        var date = new Date(parseInt(value.substr(6)));
     

        if (angular.isUndefined(format))
            format = "yyyy-MM-dd";

        format = format.replace("dd", (date.getDate() < 10 ? '0' : '') + date.getDate()); 
        format = format.replace("MM", (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1));
        format = format.replace("yyyy", date.getFullYear());
        return format;
    };
});

function dateformat(value) {
    if (angular.isUndefined(value))
        return;
    return new Date(parseInt(value.substr(6)));
};

BackOffice.directive('sort', function () {
    return {
        restrict: 'EA',
        transclude: true,
        template:
             '<a ng-click="onClick()">' +
                '<span ng-transclude></span>' +
                '<i class="fa pull-right" ng-class="{\'fa-caret-up\' : order === by && !reverse,  \'fa-caret-down\' : order===by && reverse}"></i>' +
            '</a>' +
            '<a ng-show="isfilter" ng-click="onShow()" class="pull-right">' + '<i class="fa fa-filter"></i>' + '</a>' +
             '<div class="form-group margin-top-10" ng-show="order === by && isFilterInput">' +
                    '<input class="form-control margin-bottom-5" placeholder="Filtrelenecek değer giriniz." type="text" buyukyaz ng-model="filter">' +
                    '<button data-ng-click="filtering()" class="btn btn-success">' + 'Filtre' + '</button>' +
                    '<button ng-click="clear()" class="btn red">' + 'Temizle' + '</button>' +
             '</div>',
        scope: {
            order: '=',
            by: '=',
            reverse: '=',
            filter: '=',
            isfilter: '=',
            filtering: '&'
        },
        link: function (scope, element, attrs) {
            scope.reverse = false;
            scope.onClick = function () {
                if (scope.order === scope.by) {
                    scope.reverse = !scope.reverse;
                } else {
                    scope.by = scope.order;
                    scope.reverse = false;
                }
            }
            scope.onShow = function () {
                if (scope.order === scope.by) {
                    scope.isFilterInput = !scope.isFilterInput;
                }
                else {
                    scope.by = scope.order;
                    scope.filter = null;
                    scope.isFilterInput = true;
                }
            }
            scope.clear = function () {
                scope.filter = null;
            }
        }

    }
});