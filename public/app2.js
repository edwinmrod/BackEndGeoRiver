

(function() {
  var Myapp= angular.module('userStore', []);
  //var url = 'http://172.16.71.189/BackEndGeoRiver2.0/public/API/Admin ?callback=JSON_CALLBACK';

  Myapp.controller('StoreController',function($scope, $http) {  
  // 

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


    $http.post('http://localhost:8088/BackEndGeoRiver2.0/public/Admin',dataUser).success(function (data, status, headers, config)
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
      



   $http.delete('http://localhost:8088/BackEndGeoRiver2.0/public/API/Admin/'+$id)
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
        /*// Cuando se cargue la página, pide del API todos los TODOs
    $http.jsonp("http://localhost:8088/BackEndGeoRiver/public/API/Admin").success(function(response) {
            //  window.alert(data); 
             console.log('entro');
            console.log('aja' + response);
            $scope.users=response;
          //  this.users = teachers;
            
         
        })
         .error(function(response) {
            console.log('Error: ' + response);

    //  // console.log('ola los datos: ' + data);

     })

      

      $http({ method: 'jsonp', url: 'http://localhost:8088/BackEndGeoRiver/public/API/Admin', cache: true }).
    success(function(data, status,message) {
      $scope.users = data
    }).
    error(function(data, status,message) {
      console.log('Status: ' + status);
      console.log('datos: ' + data);
      console.log('ensaje: ' + message);
    });

    */

   
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
  }


  );



  Myapp.controller("TabController", function() {
    this.tab = 1;

    this.isSet = function(checkTab) {
      return this.tab === checkTab;
    };

    this.setTab = function(setTab) {
      this.tab = setTab;
    };
  });


  
 

  
 

  Myapp.controller("ReviewController", function(){

    this.review = {};

    this.addReview = function(product){
      this.review.createdOn = Date.now();
      product.reviews.push(this.review);
      this.review = {};
    };
  });



  

  
 var teachers= [{
      firstName: 'Luis',
      lastName: "Gomez",
      userName: "lgo@gmail.com",
      password: "********",
      program: "Ambiental",
      color: '#CCC',
      faces: 14
    }, {
      firstName: 'Laura',
      lastName: "Ramirez",
      userName: "lau@gmail.com",
      password: "********",
      program: "Ambiental",
      color: '#CCC',
      faces: 14
    }, 
    {
      firstName: 'pedro',
      lastName: "Infante",
      userName: "pedroinfante@gmail.com",
      password: "********",
      program: "Ambiental",
      color: '#CCC',
      faces: 14
    }, 
    ];
})();
