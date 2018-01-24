var promiseProxy = function(url, data, type){
	return new Promise(function(resolve, reject){
		$.ajax({
			url : url,
			data: data!=undefined ? data : [],
			type : type!=undefined ? type : 'GET',
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

/* 1. 获取当前用户信息 */
const GET_CURRENT_USER = URLPrefix +  '/get-current-user';
var getCurrentUser = function(){
	return promiseProxy(GET_CURRENT_USER);
};

/* 2. 获取当前用户和物品之间的关系 */
const GET_ROLE_FOR_OBJECT = URLPrefix +  '/get-role-for-object';
var getRoleForObject = function(objectID){
	return promiseProxy(GET_ROLE_FOR_OBJECT, {id: objectID});
};

/* 3. 获取Object动态 */
const GET_POST_FOR_OBJECT = URLPrefix +  '/get_post_for_object';
var getPostForObject = function(objectID){
	return promiseProxy(GET_POST_FOR_OBJECT, {id: objectID});
};

/* 4. 获取版本内容 */
const GET_VERSION = URLPrefix +  '/get_version';
var getVersion = function(versionID){
	return promiseProxy(GET_VERSION, {id: versionID});
};