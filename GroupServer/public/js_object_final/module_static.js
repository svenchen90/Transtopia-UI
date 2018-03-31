var INPUT_SUBTYPE = {
	"default": {
		'name': '默认',
		"icon": 'fa-keyboard-o',
		'placeholder': '请输入..',
		'textType': 'text',
		'validation': function(input){
			return '';
		}
	},
	"number": {
		'name': '整数',
		"icon": 'fa-sort-numeric-asc',
		'placeholder': '请输入数字..',
		'textType': 'text',
		'validation': function(input){
			var re = /^\d*$/;
			if(re.test(String(input).toLowerCase()))
				return '';
			else
				return '请输入数字！'
		}
	},
	"time": {
		'name': '时间',
		"icon": 'fa-clock-o',
		'placeholder': '请输入时间..',
		'textType': 'time',
		'validation': function(input){
			return '';
		}
	},
	"date": {
		'name': '日期',
		"icon": 'fa-calendar',
		'placeholder': '请输入日期..',
		'textType': 'date',
		'validation': function(input){
			return '';
		}
	},
	"datetime": {
		'name': '日期及时间',
		"icon": 'fa-calendar-check-o',
		'placeholder': '请输入日期和时间..',
		'textType': 'texttime-local',
		'validation': function(input){
			return '';
		}
	},
	"email": {
		'name': '邮件',
		"icon": 'fa-envelope-o',
		'placeholder': '请输入Email..',
		'textType': 'text',
		'validation': function(input){
			var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if(re.test(String(input).toLowerCase()))
				return '';
			else
				return '请输入正确的email地址！'
		}
	},
	"phone": {
		'name': '电话',
		"icon": 'fa-phone',
		'placeholder': '请输入电话..',
		'textType': 'text',
		'validation': function(input){
			var re = /^1[358][0-9]{9}$/;
			if(re.test(input))
				return '';
			else
				return '请输入10位有效电话号码！'
		}
	}
};