App.controller('ProductsCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
  $scope.products = [];
  $scope.previous = 1;
  $scope.next = 1;
  $scope.current_page = 1;

  var init = function () {
    var product = $location.search().search;
    var page = parseInt($location.search().page);
    paginate(product, page);
    var skip_amount = 0;

    if (page && page > 1) {
      skip_amount = (page - 1)*20
    }

    $http.get("http://api.vip.supplyhub.com:19000/products?limit=20&search="+product+"&skip="+skip_amount)
      .success(function(response){
        $scope.products = response; 
      })
  };

  var paginate = function(product, page) {
    $http.get("http://api.vip.supplyhub.com:19000/products?count=1&search="+product)
      .success(function(response){
        $scope.total = response.count;
        update_pagination(page);
      })
  }

  var update_pagination = function(page) {
    if ($scope.total > 20) {
      if (page && page > 1) {
        current_amount = page * 20;
        $scope.previous = page - 1;
        $scope.next = current_amount <= $scope.total ? page + 1 : page;
        $scope.current_page = page;
      } else {
        $scope.next = 2;
      }
    }
  }

  $scope.getProducts = function(){
    var product = $scope.product;
    $location.search('search='+product)
    $http.get("http://api.vip.supplyhub.com:19000/products?limit=20&search="+product+"&skip="+0)
      .success(function(response){
        $scope.products = response; 
      })
    $scope.previous = 1;
    $scope.next = 1;
    $scope.current_page = 1;
    paginate(product, 1)
  };

  $scope.changePage = function(page) {
    page = parseInt(page);
    var product = $location.search().search;
    $location.search('search='+product+"&page="+page);
    update_pagination(page);

    var skip_amount = 0;
    if (page && page > 1) {
      skip_amount = (page - 1)*20
    }

    $http.get("http://api.vip.supplyhub.com:19000/products?limit=20&search="+product+"&skip="+skip_amount)
      .success(function(response){
        $scope.products = response; 
      })
  }

  init();
}]);