// 模态框
$.fn.modal.Constructor.DEFAULTS.backdrop = 'static';
/* URL */
const URLPrefix = '';

const GET_AUTHORITY_FOLDER = '/folder_authority';
const GET_AUTHORITY_FILE = '/file_authority';
const GET_ALL_IN_FOLDER = '/getallinfolder';
const COPY_FILE_TO = '/copy_file_to';
const COPY_FOLDER_TO = '/copy_folder_to';
const MOVE_FILE_TO = '/move_file_to';
const MOVE_FOLDER_TO = '/move_folder_to';
const DELETE_FILE = '/delete_file';
const DELETE_FOLDER = '/delete_folder';
const RENAME_FILE = '/rename_file';
const RENAME_FOLDER = '/rename_folder';
const GET_FILE_VISIBILITY_LIST = "/get_file_visibility_list";
const GET_FOLDER_VISIBILITY_LIST = '/get_folder_visibility_list';

// 其它
const GET_FRIEND_TAG_LIST = '/get_friend_tag_list';
const CREATE_FRIEND_TAG = '/create_friend_tag';
const UPDATE_FRIEND_TAG = '/update_friend_tag';
const GET_FRIEND_LIST = '/get_friend_list';
const GET_FRIEND_IN_TAG = '/get_friend_in_tag';

const ANIMATION_TIME = 200;
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