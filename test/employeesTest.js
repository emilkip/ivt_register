
var data = require('./testData');
var request = require('superagent'),
	employeesId = 0;



describe('Модуль работы с моделью "преподаватель" ', function() {

	it('Должен получить всех "преподавателей" из базы', function(done) {

		request
			.get('http://localhost:3000/api/employees')
			.end(function(err, res) {
				if(res.body.status) done();
			});
	});


	it('Должен создать нового "преподавателя" ', function(done) {

		request
			.post('http://localhost:3000/api/employees/create')
			.send({
				firstName: 	data.employees.firstName,
				lastName: 	data.employees.lastName,
				middleName: data.employees.middleName,
				position: 	data.employees.position,
				grade: 		data.employees.grade,
				birthday: 	data.employees.birthday,
				education: [],
				childs: []
			})
			.end(function(err, res) {
				if(res.body.status) {
					employeesId = res.body.employees.id;
					done();
				}
			});
	});


	it('Должен удалить существующего "преподавателя" ', function(done) {

		request
			.post('http://localhost:3000/api/employees/delete')
			.send({ id: employeesId })
			.end(function(err, res) {
				if(res.body.status) done();
			});
	});
});