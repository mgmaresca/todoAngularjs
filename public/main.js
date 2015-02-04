angular.module('angularTodo', []);

function mainController($scope, $http){

	//$scope se emplea para alamacenar todas las variables dentro del ambito del controlador
	//Todo lo que en el HTML se encuentre bajo la directiva ng-controller="mainController", puede
	//controlarse con el objeto $scope.
	$scope.formData = {};

	//Al cargar la pagina pedimos al API la lista de TODO
	$http.get('/api/todos')
		.success(function(data){
			$scope.todos = data;
			console.log(data);
		})
		.error(function(msg){
			console.log('Error: ' + msg);
		});

	//Cuando añadimos un TODO, mandamos el texto a la API
	$scope.createTodo = function(){
		$http.post('/api/todos', $scope.formData)
			.success(function(data){
				$scope.formData = {};
				$scope.todos = data;
				console.log(data);
			})
			.error(function(msg){
				console.log('Error: ' + msg);
			});
	};

	//Borra un TODO despues de chequearlo como acabado
	$scope.deleteTodo = function(id){
		$http.delete('/api/todos/' + id)
			.success(function(data){
				$scope.todos = data;
				console.log(data);
			})
			.error(function(msg){
				console.log('Error: ' + msg);
			});
	};

};