var AUapp=angular.module('authApp', ['ui.router', 'satellizer'])
.run(function($rootScope) {
    $rootScope.$on('$stateChangeError', console.log.bind(console));
})

AUapp.config( function ($stateProvider, $urlRouterProvider, $authProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.tpl.html',
            controller: 'LoginCtrl as login'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'templates/register.tpl.html',
            controller: 'RegisterCtrl as register'
        })
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'templates/dashboard.tpl.html',
                 resolve: {
          authenticated: ['$location', '$auth', function($location, $auth) {
            if ($auth.isAuthenticated()==false) {
              return $location.path('/login');
            }
          }]
        },
            controller: 'DashboardCtrl as dashboard'
        });

    $urlRouterProvider.otherwise('/login');

    $authProvider.loginUrl = 'http://localhost:8088/BackEndGeoRiver/public/auth_login';
    $authProvider.signupUrl = 'http://localhost:8088/BackEndGeoRiver/public/api/register';
})
AUapp.factory('UserService', function ($http) {
    return {

    };
})

AUapp.controller('LoginCtrl', function ($state, $auth) {
    var vm = this;

    vm.user = {};

    vm.login = function __login() {
        $auth.login({
            userName: vm.user.email,
            password: vm.user.password
        }).then(function (response) {
            console.log(response);
            $state.go('dashboard');
        }).catch(function (response) {
            console.log(response);
            window.alert('Error: Login failed');
        });
    };
})

AUapp.controller('RegisterCtrl', function ($state, $auth) {
    var vm = this;
    
    vm.user = {};

    vm.register = function __register() {
        $auth.signup({
            firstName: vm.user.name,
            lastName: vm.user.lname,
            userName: vm.user.email,
            password: vm.user.password,
            program: vm.user.program,
            role:1
        }).then(function (response) {
            console.log(response);
            $state.go('dashboard');
        }).catch(function (response) {
            console.log(response);
            window.alert('Error: Register failed');
        });
    };
})

AUapp.controller('DashboardCtrl', function ($state, $auth) {
    var vm = this;
    
    vm.logout = function __logout() {
        $auth.logout();
  $auth.removeToken();
        if($auth.isAuthenticated()==false){


        $state.go('login');

    }
    };
});

function _skipIfAuthenticated($q, $state, $auth) {
  var defer = $q.defer();
  if($auth.authenticate()) {
    defer.reject(); /* (1) */
  } else {
    defer.resolve(); /* (2) */
  }
  return defer.promise;
}
 
function _redirectIfNotAuthenticated($q, $state, $auth) {
  var defer = $q.defer();
  if($auth.authenticate()) {
    defer.resolve(); /* (3) */
  } else {
    $timeout(function () {
      $state.go('login'); /* (4) */
    });
    defer.reject();
  }
  return defer.promise;
}

//----------------------------------------------
  //var url = 'http://172.16.71.189/BackEndGeoRiver2.0/public/API/Admin ?callback=JSON_CALLBACK';

  AUapp.controller('StoreController',function($scope, $http) {  
  // 
  
  console.log('ola');

this.addUser = function($fname,$lname,$email,$pssw,$program,$Tuser){

console.log("'"+$fname+"'");


var dataUser = {
    
      'firstName':$fname,
      'lastName':$lname,
      'userName':$email,
      'password':$pssw,
      'program':$program,
      'role':$Tuser

    };  


    $http.post('http://localhost:8088/BackEndGeoRiver/public/Admin',dataUser).success(function (data, status, headers, config)
        {
//location.reload(true);
            // $window.location.reload();



          console.log('FUNCIONO Post');
        })
  
        .error(function ()
        {
          console.log('nO fUN Post');

   });
}


$scope.updateUser = function($id,$fname,$lname,$email,$pssw,$program,$Tuser){

console.log("nombre enviado  "+$id);


var dataUser = {
    
      'firstName':$fname,
      'lastName':$lname,
      'userName':$email,
      'password':$pssw,
      'program':$program,
      'role':$Tuser

    };  

    


    $http.put('http://localhost:8088/BackEndGeoRiver/public/Admin/'+$id,dataUser).success(function (data, status, headers, config)
        {
//location.reload(true);
            // $window.location.reload();



          console.log('FUNCIONO put');
        })
  
        .error(function ()
        {
          console.log('nO fUN put');

   });
}


 
this.deleteCall = function($id){


console.log('entro: AL DELETE');
console.log($id);
  /* var params = {
        param1: $scope.id
      };

      var config = {
        params: params
      };*/
var value=1;
//http://172.16.71.189/BackEndGeoRiver2.0/public/API/Admin

var data=$scope.id;
      



   $http.delete('http://localhost:8088/BackEndGeoRiver/public/API/Admin/'+$id)
       .success(function (data, status, headers, config)
        {
//location.reload(true);
            // $window.location.reload();



          console.log('FUNCIONO DELETE');
        })
    
        .error(function ()
        {
          console.log('nO fUN DELETE');

   });



   

  }
       

   
      $http.jsonp('http://localhost:8088/BackEndGeoRiver/public/API/Admin?callback=JSON_CALLBACK').success(function(data) 
    {

       console.log('entro: ' + data);
        $scope.users = data;//así enviamos los posts a la vista

$scope.firstName = data.firstName;
    })

      .error(function(data, status,message) {
      console.log('Status: ' + status);
      console.log('datos: ' + data);
      console.log('ensaje: ' + message);
    });
  });



  AUapp.controller("TabController", function() {
    this.tab = 1;

    this.isSet = function(checkTab) {
      return this.tab === checkTab;
    };

    this.setTab = function(setTab) {
      this.tab = setTab;
    };
  });


  
 

  
 

  AUapp.controller("ReviewController", function(){

    this.review = {};

    this.addReview = function(product){
      this.review.createdOn = Date.now();
      product.reviews.push(this.review);
      this.review = {};
    };
  });



  