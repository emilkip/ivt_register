var data = require('./testData'),
	request = require('superagent'),
	positionId = 0;


describe('Работа с модулем "должность" ', function() {


	it('Должен создать новую должность', function(done) {

		request
			.post('http://localhost:3000/api/position/create')
			.send({ title: data.position.title })
			.end(function(err, res) {
				if(res.body.status) done();
			});
	});

	it('Должен удалить существующую должность', function(done) {

		request
			.post('http://localhost:3000/api/position/delete')
			.send({ id: positionId })
			.end(function(err, res) {
				if(res.body.status) done();
			});
	});
});