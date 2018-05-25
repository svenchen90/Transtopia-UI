/* Promise */
/* URL */
const URLPrefix = '';

/* 文件操作 */
/* 1. 获取文件（夹）的可见者列表 */
const GET_FILE_VISIBILITY_LIST = URLPrefix +  "/get_file_visibility_list";
const GET_FOLDER_VISIBILITY_LIST = URLPrefix +  '/get_folder_visibility_list';
var getVisibilityList = function(fid, type){
	var url;
	if(type == 1){
		// 文件
		url = GET_FILE_VISIBILITY_LIST;
	}else if(type == 2){
		// 文件夹
		url = GET_FOLDER_VISIBILITY_LIST;
	}else{
		console.log('error');
	};
	
	return new Promise(function(resolve, reject){
		$.ajax({
			url : url,
			data: {
				id: fid
			},
			type : "GET",
			dataType : 'json',
			success : function (result){
				// result {value, sublist, tail}
				if(result == 0){
					reject('请求失败1');
				}else{
					resolve(result);
				}
			},
			error: function(err){
				reject('请求失败2');
			}
		});
	});
};

/* 2. 获取文件（夹）的可编辑者列表 */
const GET_FILE_Editable_LIST = URLPrefix +  "/get_file_visibility_list";
const GET_FOLDER_Editable_LIST = URLPrefix +  '/get_folder_visibility_list';
var getEditableList = function(fid, type){
	var url;
	if(type == 1){
		// 文件
		url = GET_FILE_Editable_LIST;
	}else if(type == 2){
		// 文件夹
		url = GET_FOLDER_Editable_LIST;
	}else{
		console.log('error');
	};
	
	return new Promise(function(resolve, reject){
		$.ajax({
			url : url,
			data: {
				id: fid
			},
			type : "GET",
			dataType : 'json',
			success : function (result){
				// result {value, sublist, tail}
				if(result == 0){
					reject('请求失败1');
				}else{
					resolve(result);
				}
			},
			error: function(err){
				reject('请求失败2');
			}
		});
	});
};

/* 3. 修改文件（夹）观看权限表 */
const UPDATE_FILE_FOLDER_VISIBILITY = URLPrefix +  'update_file_folder_visibility';
var updateFileFolderVisibility = function(fid, type, tagadd, tagdelete, useradd, userdelete){
	return new Promise(function(resolve, reject){
		$.ajax({
			url : UPDATE_FILE_FOLDER_VISIBILITY,
			data: {
				fid: fid,
				type: type,
				tagadd: tagadd,
				tagdelete: tagdelete,
				useradd: useradd,
				userdelete: userdelete
			},
			type : "GET",
			dataType : 'json',
			success : function (result){
				// result {value, sublist, tail}
				if(result == 0){
					reject('请求失败1');
				}else{
					resolve(result);
				}
			},
			error: function(err){
				reject('请求失败2');
			}
		});
	});
};

/* 4. 修改文件（夹）修改权限表 */
const UPDATE_FILE_FOLDER_Editable = URLPrefix +  'update_file_folder_visibility';
var updateFileFolderEditable = function(fid, type, tagadd, tagdelete, useradd, userdelete){
	return new Promise(function(resolve, reject){
		$.ajax({
			url : UPDATE_FILE_FOLDER_Editable,
			data: {
				fid: fid,
				type: type,
				tagadd: tagadd,
				tagdelete: tagdelete,
				useradd: useradd,
				userdelete: userdelete
			},
			type : "GET",
			dataType : 'json',
			success : function (result){
				// result {value, sublist, tail}
				if(result == 0){
					reject('请求失败1');
				}else{
					resolve(result);
				}
			},
			error: function(err){
				reject('请求失败2');
			}
		});
	});
};

/* 5. 获取文件夹操作权限 */
const GET_AUTHORITY_FOLDER = URLPrefix +  '/folder_authority';
var getFolderAuthority = function(fid){
	return new Promise(function(resolve, reject){
		$.ajax({
			url : GET_AUTHORITY_FOLDER,
			data: {
				fid: fid,
			},
			type : "GET",
			dataType : 'json',
			success : function (result){
				resolve(result);
			},
			error: function(err){
				reject('请求失败2');
			}
		});
	});
};

/* 6. 获取文件操作权限 */
const GET_AUTHORITY_FILE = URLPrefix +  '/file_authority';
var getFileAuthority = function(fid){
	return new Promise(function(resolve, reject){
		$.ajax({
			url : GET_AUTHORITY_FILE,
			data: {
				fid: fid,
			},
			type : "GET",
			dataType : 'json',
			success : function (result){
				if(result == 0){
					reject('请求失败1');
				}else{
					resolve(result);
				}
			},
			error: function(err){
				reject('请求失败2');
			}
		});
	});
};

/* 7. 获取文件夹内子文件（夹） */
const GET_ALL_IN_FOLDER = URLPrefix +  '/getallinfolder';
var getAllInFolder = function(id){
	return new Promise(function(resolve, reject){
		$.ajax({
			url : GET_ALL_IN_FOLDER,
			data: {
				fid: id,
			},
			type : "GET",
			dataType : 'json',
			success : function (result){
				if(result == 0){
					reject('请求失败1');
				}else{
					resolve(result);
				}
			},
			error: function(err){
				reject('请求失败2');
			}
		});
	});
};

/* 8. 复制文件 */
const COPY_FILE_TO = URLPrefix +  '/copy_file_to';
var copyFileTo_Proxy = function(id, idTarget){
	return new Promise(function(resolve, reject){
		$.ajax({
			url : COPY_FILE_TO,
			data: {
				id: id,
				idTarget: idTarget
			},
			type : "GET",
			dataType : 'json',
			success : function (result){
				if(result == 0){
					reject('请求失败1');
				}else{
					resolve(result);
				}
			},
			error: function(err){
				reject('请求失败2');
			}
		});
	});
};

/* 9. 复制文件夹 */
const COPY_FOLDER_TO = URLPrefix +  '/copy_folder_to';
var copyFolderTo_Proxy = function(id, idTarget){
	return new Promise(function(resolve, reject){
		$.ajax({
			url : COPY_FOLDER_TO,
			data: {
				id: id,
				idTarget: idTarget
			},
			type : "GET",
			dataType : 'json',
			success : function (result){
				if(result == 0){
					reject('请求失败1');
				}else{
					resolve(result);
				}
			},
			error: function(err){
				reject('请求失败2');
			}
		});
	});
};

/* 10. 移动文件 */
const MOVE_FILE_TO = URLPrefix +  '/move_file_to';
var moveFileTo_Proxy = function(id, idTarget){
	return new Promise(function(resolve, reject){
		$.ajax({
			url : MOVE_FILE_TO,
			data: {
				id: id,
				idTarget: idTarget
			},
			type : "GET",
			dataType : 'json',
			success : function (result){
				if(result == 0){
					reject('请求失败1');
				}else{
					resolve(result);
				}
			},
			error: function(err){
				reject('请求失败2');
			}
		});
	});
};

/* 11. 移动文件夹 */
const MOVE_FOLDER_TO = URLPrefix +  '/move_folder_to';
var moveFolderTo_Proxy = function(id, idTarget){
	return new Promise(function(resolve, reject){
		$.ajax({
			url : MOVE_FOLDER_TO,
			data: {
				id: id,
				idTarget: idTarget
			},
			type : "GET",
			dataType : 'json',
			success : function (result){
				if(result == 0){
					reject('请求失败1');
				}else{
					resolve(result);
				}
			},
			error: function(err){
				reject('请求失败2');
			}
		});
	});
};

/* 12. 删除文件 */
const DELETE_FILE = URLPrefix +  '/delete_file';
var deleteFile_Proxy = function(fid){
	return new Promise(function(resolve, reject){
		$.ajax({
			url : DELETE_FILE,
			data: {
				fid: fid,
			},
			type : "GET",
			dataType : 'json',
			success : function (result){
				if(result == 0){
					reject('请求失败1');
				}else{
					resolve(result);
				}
			},
			error: function(err){
				reject('请求失败2');
			}
		});
	});
};

/* 13. 删除文件夹 */
const DELETE_FOLDER = URLPrefix +  '/delete_folder';
var deleteFolder_Proxy = function(fid){
	return new Promise(function(resolve, reject){
		$.ajax({
			url : DELETE_FOLDER,
			data: {
				fid: fid,
			},
			type : "GET",
			dataType : 'json',
			success : function (result){
				if(result == 0){
					reject('请求失败1');
				}else{
					resolve(result);
				}
			},
			error: function(err){
				reject('请求失败2');
			}
		});
	});
};

/* 14. 重命名文件 */
const RENAME_FILE = URLPrefix +  '/rename_file';
var renameFile_Proxy = function(fid, newName){
	return new Promise(function(resolve, reject){
		$.ajax({
			url : RENAME_FILE,
			data: {
				fid: fid,
				name: newName
			},
			type : "GET",
			dataType : 'json',
			success : function (result){
				if(result == 0){
					reject('请求失败1');
				}else{
					resolve(result);
				}
			},
			error: function(err){
				reject('请求失败2');
			}
		});
	});
};

/* 15. 重命名文件夹 */
const RENAME_FOLDER = URLPrefix +  '/rename_folder';
var renameFolder_Proxy = function(fid, newName){
	return new Promise(function(resolve, reject){
		$.ajax({
			url : RENAME_FOLDER,
			data: {
				fid: fid,
				name: newName
			},
			type : "GET",
			dataType : 'json',
			success : function (result){
				if(result == 0){
					reject('请求失败1');
				}else{
					resolve(result);
				}
			},
			error: function(err){
				reject('请求失败2');
			}
		});
	});
};
/* !文件操作 */


/* 其他 */
// A) 获取个人好友标签列表
const GET_FRIEND_TAG_LIST = URLPrefix +  '/get_friend_tag_list';
var getFriendTags = function(){
	return new Promise(function(resolve, reject){
		$.ajax({
			url : GET_FRIEND_TAG_LIST,
			type : "GET",
			dataType : 'json',
			success : function (result){
				// result {value, sublist, tail}
				if(result == 0){
					reject('请求失败1');
				}else{
					resolve(result);
				}
			},
			error: function(err){
				reject('请求失败2');
			}
		});
	});
};

// B) 获取个人好友列表
const GET_FRIEND_LIST = URLPrefix +  '/get_friend_list';
var getFriends = function(){
	return new Promise(function(resolve, reject){
		$.ajax({
			url : GET_FRIEND_LIST,
			type : "GET",
			dataType : 'json',
			success : function (result){
				// result {value, sublist, tail}
				if(result == 0){
					reject('请求失败1');
				}else{
					resolve(result);
				}
			},
			error: function(err){
				reject('请求失败2');
			}
		});
	});
};

// C) 获取群组成员列表
const GET_GROUP_MEMBER_LIST = URLPrefix +  '/get_group_member_list';
var getGroupMembers = function(groupid){
	return new Promise(function(resolve, reject){
		$.ajax({
			url : GET_GROUP_MEMBER_LIST,
			data: {
				id: groupid
			},
			type : "GET",
			dataType : 'json',
			success : function (result){
				// result {value, sublist, tail}
				if(result == 0){
					reject('请求失败1');
				}else{
					resolve(result);
				}
			},
			error: function(err){
				reject('请求失败2');
			}
		});
	});
};

// D) 获取好友tag中的好友
const GET_FRIEND_IN_TAG = URLPrefix +  '/get_friend_in_tag';
var getFriendInTag = function(name){
	return new Promise(function(resolve, reject){
		$.ajax({
			url : GET_FRIEND_IN_TAG,
			data: {
				name: name
			},
			type : "GET",
			dataType : 'json',
			success : function (result){
				// result {value, sublist, tail}
				if(result == 0){
					reject('请求失败1');
				}else{
					resolve(result);
				}
			},
			error: function(err){
				reject('请求失败2');
			}
		});
	});
};

// E) 创建新好友标签
const CREATE_FRIEND_TAG = URLPrefix +  '/create_friend_tag';
var createFriendTag = function(name, user){
	return new Promise(function(resolve, reject){
		$.ajax({
			url : CREATE_FRIEND_TAG,
			data: {
				name: name,
				user: user
			},
			type : "GET",
			dataType : 'json',
			success : function (result){
				// result {value, sublist, tail}
				if(result == 0){
					reject('请求失败1');
				}else{
					resolve(result);
				}
			},
			error: function(err){
				reject('请求失败2');
			}
		});
	});
};

// D) 更新好友标签
const UPDATE_FRIEND_TAG = URLPrefix +  '/update_friend_tag';
var updateFriendTag = function(name, user){
	return new Promise(function(resolve, reject){
		$.ajax({
			url : UPDATE_FRIEND_TAG,
			data: {
				name: name,
				user: user
			},
			type : "GET",
			dataType : 'json',
			success : function (result){
				// result {value, sublist, tail}
				if(result == 0){
					reject('请求失败1');
				}else{
					resolve(result);
				}
			},
			error: function(err){
				reject('请求失败2');
			}
		});
	});
};
/* !其他 */

const GET_MY_FOLDER = URLPrefix +  '/getmyfolder';
var getMyFolder = function(id){
	return new Promise(function(resolve, reject){
		$.ajax({
			url : GET_MY_FOLDER,
			data: {
				id: id
			},
			type : "GET",
			dataType : 'json',
			success : function (result){
				// result {value, sublist, tail}
				if(result == 0){
					reject('请求失败1');
				}else{
					resolve(result);
				}
			},
			error: function(err){
				reject('请求失败2');
			}
		});
	});
};
