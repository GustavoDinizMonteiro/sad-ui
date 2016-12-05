angular.module("myApp.create", ['ngRoute'])

	.config(['$routeProvider', function($routeProvider, $http) {
	  $routeProvider.when('/create', {
	    templateUrl: 'create/create.html',
	    controller: 'CreateCtrl'
	  });
	}])



	.controller('CreateCtrl',['$scope', '$http',function($scope,$http, formService){


			var begin =  function(){

					
				$scope.questions = [];	

				$scope.types = [];
			}

			var loadQuestion = function() {
				$http.get("http://localhost:3412/questions").success(function(data, status){

					$scope.questions = data;

				});
			}

			var loadTypes = function() {
				$http.get("http://localhost:3412/types").success( function(data, status){

					$scope.types = data;

				});
			}

			$scope.addQuestion = function(question){

				$http.post("http://localhost:3412/questions", question).success(function(data){

					delete $scope.question;
					loadQuestion();
				});


			}


			$scope.isQuestionSelected = function (questions){
					return questions.some(function (question){
						return question.selected;
				});
			}


			$scope.deleteQuestion = function(questions){

				$scope.questions = questions.filter(function(question){
					if (!question.selected) return question;

				});	

				removeLocalStorage(questions);
			}

			var removeLocalStorage = function(questions){

				var dado = localStorage.getItem("questions");
				var array = JSON.parse(dado);

				array = questions.filter(function(question){
					if(!question.selected) return question;
				});
				localStorage.setItem("questions", JSON.stringify(array));




			}

			begin();
			loadQuestion();
			loadTypes();


	}])


