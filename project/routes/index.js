var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/cloud_index', function(req, res, next) {
  res.render('cloud_index', {});
});

router.get('/project_index', function(req, res, next) {
  res.render('project_index', {});
});

router.get('/getallinfolder', function(req, res, next) {
	var temp = new Date().getTime();
	var dataListOfFolder = [
		{
			id: '1',
			type: '1',
			hasAuthority: 1,
			isShare : 1,
			isPublic : 1,
			initDate: new Date(temp),
			name: '工作区1'
		},
		{
			id: '2',
			type: '2',
			hasAuthority: 1,
			initDate: new Date(temp+3000),
			name: '地图2'
		},
		{
			id: '3',
			hasAuthority: 1,
			initDate: new Date(temp+2000),
			name: '工作区3'
		},
		{
			id: '4',
			hasAuthority: 1,
			initDate: new Date(temp+1000),
			name: '工作区4'
		}
	];
	
	var dataListOfCollection = [
		{
			id: '1',
			type: '1',
			hasAuthority: 1,
			isShare : 1,
			isPublic : 1,
			initDate: new Date(temp),
			name: '集合1'
		},
		{
			id: '2',
			type: '2',
			hasAuthority: 1,
			initDate: new Date(temp+3000),
			name: '集合2'
		}
	];
	
	
	var dataListOfFile = [
		{
			id: '1',
			type: '1',
			hasAuthority: 0,
			initDate: new Date(temp+6000),
			name: 'New Text Document.txt',
			src: 'http://127.0.0.1:3000/dist/img/New Text Document.txt'
		},
		{
			id: '2',
			type: '2',
			hasAuthority: 1,
			initDate: new Date(temp+7000),
			name: 'extofgong_chen.pdf',
			src: 'http://127.0.0.1:3000/dist/img/extofgong_chen.pdf'
		},
		{
			id: '3',
			hasAuthority: 1,
			initDate: new Date(temp+8000),
			name: '阿尔法.png',
			src: 'http://127.0.0.1:3000/dist/img/photo1.png'
		},
		{
			id: '4',
			hasAuthority: 2,
			initDate: new Date(temp+9000),
			name: '阿尔法2.js',
			src: 'http://127.0.0.1:3000/dist/img/controller.js'
		},
		{
			id: '5',
			hasAuthority: 2,
			initDate: new Date(temp+10000),
			name: '定价模型_beta.docx',
			src: 'http://127.0.0.1:3000/TransCloud/交托帮/定价模型_beta.docx'
		}
	];
	
	var dataListOfDir = [

	];
	
	console.log(req.query.id);
	
	res.json({
		folder: dataListOfFolder,
		collection: dataListOfCollection,
		file: dataListOfFile,
		dir: dataListOfDir
	});
});

router.get('/folder_authority', function(req, res, next) {
	res.json(2);
});

router.get('/file_authority', function(req, res, next) {
	res.json(2);
});

module.exports = router;
