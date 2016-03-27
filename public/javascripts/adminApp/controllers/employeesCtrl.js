// AdminApp

angular
	.module('employeesCtrl', [])

	.controller('indexEmployeesCtrl', ['$scope', 'EmployeesService', 
		function($scope, EmployeesService){

			EmployeesService
				.getAllEmpl()
				.then(function(data) {
					$scope.employees = data.data.employees;
				});

			$scope.delete = function(employees, index) {

				var question = confirm('Удалить сотрудника?');

				if(question) {
					EmployeesService
						.deleteEmpl(employees.id)
						.then(function(data) {
							if(data.data.status)
								$scope.employees.splice(index, 1);
						});
				}
			}
		}
	])

	.controller('createEmployeesCtrl', [
		'$scope', 
		'EmployeesService', 
		'PositionService', 
		'GradeService', 
		'UniversityService', 
		'FacultyService', 
		'Upload', 
		'$location', 
		function($scope, EmployeesService, PositionService, GradeService, UniversityService, FacultyService, Upload, $location) {

			$scope.employees = {};
			$scope.employees.firstName = '';
			$scope.employees.lastName = '';
			$scope.employees.middleName = '';
			$scope.employees.passportNum = '';
			$scope.employees.address = '';
			$scope.employees.telephone = '';
			$scope.employees.birthday = { year: '', month: '', day: '' };
			$scope.childs = [];
			$scope.educations = [];
			$scope.emplGrades = [];
			$scope.emplPositions = [];
			$scope.faculties = [];
			$scope.specs = [];


			PositionService
				.getAllPosition()
				.then(function(data) {
					$scope.positions = data.data.position;
				});

			FacultyService
				.getAllFaculty()
				.then(function(data) {
					$scope.faculties = data.data.faculties;
				});

			GradeService
				.getAllGrade()
				.then(function(data) {
					$scope.grades = data.data.grade;
				});

			UniversityService
				.getAllUniversity()
				.then(function(data) {
					$scope.universities = data.data.university;
				});


			$scope.selectFaculty = function(id) {
				for(var i = 0; i < $scope.faculties.length; i++) {
					if($scope.faculties[i].id == id) {
						$scope.specs = $scope.faculties[i].specialization;
						break;
					}
				}
			}

			$scope.getUnivTitle = function(id) {
				for(var i = 0; i < $scope.universities.length; i += 1) {
					if($scope.universities[i].id == id)
						return $scope.universities[i].title;
				}
			}

			$scope.addPosition = function(position) {

				if(typeof position.id != 'undefined') {
					$scope.emplPositions.push({
						position: position.id,
						faculty: position.faculty,
						spec: position.spec,
						documentNum: position.documentNum,
						yearOfBegin: position.yearOfBegin,
						yearOfEnd: position.yearOfEnd
					});

					$scope.position = {};
				}
			}

			$scope.removePosition = function(index) {
				$scope.emplPositions.splice(index, 1);
			}

			$scope.getPositionTitle = function(id) {
				for(var i = 0; i < $scope.positions.length; i += 1) {
					if($scope.positions[i].id == id)
						return $scope.positions[i].title;
				}
			}

			$scope.getSpecTitle = function(id) {
				for(var i = 0; i < $scope.specs.length; i += 1) {
					if($scope.specs[i].id == id)
						return $scope.specs[i].title;
				}
			}

			$scope.addChild = function(child) {

				$scope.childs.push({
					firstName: child.firstName,
					lastName: child.lastName,
					birthday: new Date(child.birthday.year, child.birthday.month - 1, child.birthday.day)
				});

				$scope.child = {};
			}

			$scope.removeChild = function(index) {
				$scope.childs.splice(index, 1);
			}

			$scope.addEducation = function(education) {

				if(typeof education.university != 'undefined') {
					$scope.educations.push({
						university: education.university,
						spec: education.spec,
						yearOfBegin: education.yearOfBegin,
						yearOfEnd: education.yearOfEnd,
						documentNum: education.documentNum
					});

					$scope.education = {};
				}
			}

			$scope.removeEducation = function(index) {
				$scope.educations.splice(index, 1);
			}

			$scope.getGradeTitle = function(id) {
				for(var i = 0; i < $scope.grades.length; i += 1) {
					if($scope.grades[i].id == id)
						return $scope.grades[i].title;
				}
			}

			$scope.addGrade = function(grade) {

				if(typeof grade.id != 'undefined') {
					$scope.emplGrades.push({
						grade: grade.id,
						documentNum: grade.documentNum,
						year: grade.year
					});

					$scope.grade = {};
				}
			}

			$scope.removeGrade = function(index) {
				$scope.emplGrades.splice(index, 1);
			}

			$scope.formValidation = function(employees) {

				$scope.invalidGroup1 = false;

				if(employees.firstName == '' || employees.lastName == '' || employees.middleName == '') {
					$scope.invalidGroup1 = true;
					return false;
				}
				$scope.invalidGroup1 = false;
				return true;
			}

			$scope.create = function(employees) {


				employees.childs = $scope.childs;
				employees.educations = $scope.educations;
				employees.positions = $scope.emplPositions;
				employees.grades = $scope.emplGrades;

				if($scope.formValidation(employees)) {

					Upload.upload({
							url: '/api/employees/create',
							method: 'POST',
							headers:{
								'Content-Type': 'multipart/form-data'
							},
							fields: employees,
							file: $scope.avatar
						})
						.then(function (resp) {
							if (resp.data.status)
								$location.url('/employees');
						});
				}
			}
		}
	])

	.controller('editEmployeesCtrl', [
		'$scope', 
		'EmployeesService', 
		'PositionService', 
		'FacultyService', 
		'GradeService', 
		'UniversityService', 
		'Upload', 
		'$location',
		'$routeParams',
		function($scope, EmployeesService, PositionService, FacultyService, GradeService, UniversityService, Upload, $location, $routeParams){

			PositionService
				.getAllPosition()
				.then(function(data) {
					$scope.positions = data.data.position;
				});

			GradeService
				.getAllGrade()
				.then(function(data) {
					$scope.grades = data.data.grade;
				});

			FacultyService
				.getAllSpecialization()
				.then(function(data) {
					$scope.specs = data.data.specs;
				});

			FacultyService
				.getAllFaculty()
				.then(function(data) {
					$scope.faculties = data.data.faculties;
				});

			UniversityService
				.getAllUniversity()
				.then(function(data) {
					$scope.universities = data.data.university;
				});

			EmployeesService
				.getOneEmpl($routeParams.id)
				.then(function(data) {

					var birthday;
					$scope.childs = [];
					$scope.educations = [];

					$scope.employees = data.data.employees;

					$scope.employees.grades = data.data.grades;
					$scope.employees.positions = data.data.positions;
					$scope.employees.childs = data.data.childs;
					$scope.employees.educations = data.data.educations;

					if(data.data.employees.birthday != null) {
						birthday = new Date(data.data.employees.birthday);
						$scope.employees.birthday = {};
						$scope.employees.birthday.day =  birthday.getDate();
						$scope.employees.birthday.month =  birthday.getMonth() + 1;
						$scope.employees.birthday.year =  birthday.getFullYear();
					} else {
						$scope.employees.birthday = {};
						$scope.employees.birthday.day = '';
						$scope.employees.birthday.month = '';
						$scope.employees.birthday.year = '';
					}

					$scope.employees.passportNum = parseInt($scope.employees.passportNum);
				});

			$scope.selectFaculty = function(id) {
				for(var i = 0; i < $scope.faculties.length; i++) {
					if($scope.faculties[i].id == id) {
						$scope.specs = $scope.faculties[i].specialization;
						break;
					}
				}
			}

			$scope.addPosition = function(position) {

				if(typeof position.position != 'undefined') {
					$scope.employees.positions.push({
						position: position.position,
						faculty: position.faculty,
						specialization: position.specialization,
						documentNum: position.documentNum,
						yearOfBegin: position.yearOfBegin,
						yearOfEnd: position.yearOfEnd
					});

					$scope.position = {};
				}
			}

			$scope.removePosition = function(index) {
				$scope.employees.positions.splice(index, 1);
			}

			$scope.addGrade = function(grade) {

				if(typeof grade.grade != 'undefined') {
					$scope.employees.grades.push({
						grade: grade.grade,
						documentNum: grade.documentNum,
						year: grade.year
					});
				}

				$scope.grade = {};
			}

			$scope.removeGrade = function(index) {
				$scope.employees.grades.splice(index, 1);
			}


			$scope.getUnivTitle = function(id) {
				for(var i = 0; i < $scope.universities.length; i += 1) {
					if($scope.universities[i].id == id)
						return $scope.universities[i].title;
				}
			}

			$scope.addChild = function(child) {

				$scope.employees.childs.push({
					firstName: child.firstName,
					lastName: child.lastName,
					birthday: new Date(child.birthday.year, child.birthday.month - 1, child.birthday.day)
				});

				$scope.child = undefined;
			}

			$scope.removeChild = function(index) {
				$scope.employees.childs.splice(index, 1);
			}

			$scope.addEducation = function(education) {

				$scope.employees.educations.push({
					university: education.university,
					spec: education.spec,
					yearOfBegin: education.yearOfBegin,
					yearOfEnd: education.yearOfEnd,
					documentNum: education.documentNum
				});

				$scope.education = undefined;
			}

			$scope.removeEducation = function(index) {
				$scope.employees.educations.splice(index, 1);
			}

			$scope.formValidation = function(employees) {

				$scope.invalidGroup1 = false;

				if(employees.firstName == '' || employees.lastName == '' || employees.middleName == '') {
					$scope.invalidGroup1 = true;
					return false;
				}
				$scope.invalidGroup1 = false;
				return true;
			}


			$scope.save = function(employees) {

				console.log(employees);

				if($scope.formValidation(employees)) {

					Upload.upload({
							url: '/api/employees/edit',
							method: 'POST',
							headers:{
								'Content-Type': 'multipart/form-data'
							},
							fields: employees,
							file: $scope.avatar
						})
						.then(function (resp) {
							if (resp.data.status) {
								console.log('route');
								$location.path('/employees');
							}
						});
				}
			}
		}
	]);