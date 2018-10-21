var tab1 = {
	lid: localIDGenerator(),
	name: '标签1',
	key: localIDGenerator(),
	questions: [
		QUESTION_DEFAULT_JSON_MAP['text'].getDefaultJson(),
		QUESTION_DEFAULT_JSON_MAP['singleSelect'].getDefaultJson(),
		// QUESTION_DEFAULT_JSON_MAP['multiSelect'].getDefaultJson(),
		// QUESTION_DEFAULT_JSON_MAP['singleDropdown'].getDefaultJson(),
		// QUESTION_DEFAULT_JSON_MAP['multiDropdown'].getDefaultJson(),
		// QUESTION_DEFAULT_JSON_MAP['input'].getDefaultJson(),
		// QUESTION_DEFAULT_JSON_MAP['file'].getDefaultJson(),
		
		// QUESTION_DEFAULT_JSON_MAP['rating'].getDefaultJson(),
		// QUESTION_DEFAULT_JSON_MAP['slide'].getDefaultJson(),
		QUESTION_DEFAULT_JSON_MAP['ranking'].getDefaultJson(),
		// QUESTION_DEFAULT_JSON_MAP['table_singleselect'].getDefaultJson(),
		// QUESTION_DEFAULT_JSON_MAP['table_multiselect'].getDefaultJson(),
		// QUESTION_DEFAULT_JSON_MAP['table_input'].getDefaultJson(),
		// QUESTION_DEFAULT_JSON_MAP['table_singledropdown'].getDefaultJson(),
		// QUESTION_DEFAULT_JSON_MAP['table_rating'].getDefaultJson(),
		// QUESTION_DEFAULT_JSON_MAP['table_nested'].getDefaultJson(),
		// QUESTION_DEFAULT_JSON_MAP['tagButton'].getDefaultJson(),
		// QUESTION_DEFAULT_JSON_MAP['colorPicker'].getDefaultJson(),
		// QUESTION_DEFAULT_JSON_MAP['counter'].getDefaultJson(),
		// QUESTION_DEFAULT_JSON_MAP['currentTimer'].getDefaultJson(),
		// QUESTION_DEFAULT_JSON_MAP['comment'].getDefaultJson(),
		// QUESTION_DEFAULT_JSON_MAP['simpleCounter'].getDefaultJson(),
	] 
};

var left_data = [
	{
		id: '1',
		name: 'abc',
		image: 'dist/img/email.png'
	},
	{
		id: '2',
		name: 'def',
		image: 'dist/img/email.png'
	},
	{
		id: '3',
		name: 'ghi',
		image: 'dist/img/email.png'
	},
	{
		id: '4',
		name: 'jkl',
		image: 'dist/img/email.png'
	}
];

var right_data = [
	{
		id: '1',
		name: 'abc',
		image: 'dist/img/email.png'
	}
];


/* FormDisplay({
	lid: localIDGenerator(),
	name: '新的物品',
	tabs: [tab1]
}, function(a){console.log(a)});
 */
/* FormDisplay_mobile({
	lid: localIDGenerator(),
	name: '新的物品',
	tabs: [tab1]
}, function(a){console.log(a)}); */


/* $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
	checkboxClass: 'icheckbox_flat-green',
	radioClass: 'iradio_flat-green'
}); */
/* 
FormDesigner({
	lid: localIDGenerator(),
	name: '新的物品',
	tabs: [tab1]
}, function(a){console.log(a)}); */

