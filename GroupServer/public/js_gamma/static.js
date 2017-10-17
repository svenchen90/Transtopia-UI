// 模态框
$.fn.modal.Constructor.DEFAULTS.backdrop = 'static';


const ANIMATION_TIME = 400;
const FILE_LOAD_LIMIT = 20;

const LEFT_COLLAPSE = [
	{
		icon: '<i class="fa fa-list-ol"></i>',
		name: '动态',
		href: '#'
	},
	{
		icon: '<i class="fa fa-fire"></i>',
		name: '社群',
		href: '#'
	},
	{
		icon: '<i class="fa fa-users"></i>',
		name: '人脉',
		href: '#'
	},
	{
		icon: '<i class="fa fa-user-circle"></i>',
		name: '个人',
		href: '#'
	},
	{
		icon: '<i class="fa fa-commenting-o"></i>',
		name: '消息',
		href: '#'
	},
	'divider',
	{
		icon: '<i class="fa fa-gear"></i>',
		name: '设置',
		href: '#'
	},
	{
		icon: '<i class="fa fa-exclamation-triangle"></i>',
		name: '反馈',
		href: '#'
	},
	{
		icon: '<i class="fa fa-question-circle"></i>',
		name: '帮助',
		href: '#'
	}
];