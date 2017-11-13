const ANIMATION_TIME = 400;
	
var FilePanel = function(type, id){
	// type 1. 私人; 2. 群组;  
	// id: userID 或者 GroupID
	var module = $(
		'<div class="file-panel" style="min-height: 50vh;">\n' +
		'	<!-- 目录内容 -->\n' +
		'	<div class="form-group pull-right" style="width: 200px;">\n' +
		'		<div class="input-group">\n' +
		'			<input type="text" class="form-control" placeholder="搜索..." data-action="search" />\n' +
		'			<div class="input-group-addon" style="cursor: pointer;">\n' +
		'				<i class="fa fa-search"></i>\n' +
		'			</div>\n' +
		'		</div>\n' +
		'	</div>\n' +
		'	<div class="clearfix"></div>\n' +
		'	<!-- 文件内容 -->\n' +
		'</div>'
	);
	var obj = this;
	var directory = new Directory();
	var fileBlock = new FileBlock(FileCard, FolderCard);
	
	// 加载
	this.load = function(dirID){
		getPublicFilesFolders(type, id, dirID)
			.then(function(result){
				// 加载DIR
				directory.load(result.dir);
				// 加载文件
				fileBlock.load(result.files, result.folders);
				// 搜索框重置
				module.find('[data-action="search"]').val("");
			}).catch(function(reason){
				console.log(reason);
			});
	};
	
	
	// 获取模块组
	this.getModule = function(){
		return module;
	};
	
	(function(){
		// 加载目录模块
		module.find('.dir').remove();
		module.prepend(directory.getModule());
		// 加载文件（夹）模块
		module.find('.file-block').remove();
		module.append(fileBlock.getModule());
		obj.load(0);
		
		// 1)点击文件夹
		module.on('click', '[data-type="folder"]', function(ev){
			var id = $(this).find('[data-type="name"]').attr('data-id');
			obj.load(id);
		});
		
		// 2)点击文件
		module.on('click', '[data-type="file"]', function(ev){
			var src = $(this).find('[data-type="name"]').attr('data-src');
			window.open(src, '_blank');
		});
		
		// 3)点击目录
		module.on('click', '.dir-item', function(ev){
			var id = $(this).attr('data-id');
			obj.load(id);
		});
		
		// 4)搜索
		module.on('change', '[data-action="search"]', function(ev){
			var query = this.value;
			
			$.each(module.find('[data-type="file"], [data-type="folder"]'), function(index,item){
				var name = $(item).find('[data-type="name"]').text();
				
				if(!name.match(query)){
					$(item).hide(ANIMATION_TIME);
				}else{
					$(item).show(ANIMATION_TIME);
				}
			});
		});
		
	})();
};

// 目录
var Directory = function(){
	var dir = $(
		'<div class="dir">\n' +
		'	<!-- 目录内容 -->\n' +
		'</div>'
	);

	//加载
	this.load = function(list){
		dir.find('.dir-item:not(.dir-base)').remove();
		var target = dir;
		var length = list.length;
		
		$.each(list, function(index, item){
			if(index < length-1){
				target.append('<span class="dir-item" data-id="' + item.id +'"><span>' + item.name + '</span> <i class="fa fa-caret-right"></i></span>\n');
			}else if(index == length-1){
				target.append('<span class="dir-item" data-id="' + item.id +'"><span>' + item.name + '</span> <i class="fa fa-caret-down"></i></span>\n');
			}else{
				console.log('error');
			}
			
		});
	};
	
	this.getModule = function(){
		return dir;
	};
	
	(function(){
		// 加载base目录
		dir.find('.dir-base').remove();
		dir.prepend('<span class="dir-item dir-base" data-id="0"><span>公开文件夹</span></span>\n');
	})();
	
	
};

// 文件(夹)容器
var FileBlock = function(fileCard, folderCard){
	var block = $(
		'<div class="file-block row" style="height: 50vh;">\n' +
		'		<!-- 插入文件内容 -->\n' +
		'</div>'
	);
	
	// 加载
	this.load = function(files, folders){
		this.clear();
		// 加载文件夹
		$.each(folders, function(index, item){
			block.append(folderCard(item));
		});
		
		// 加载文件
		$.each(files, function(index, item){
			block.append(fileCard(item));
		});
	};
	
	// 清空
	this.clear = function(){
		block.empty();
	};
	
	// 获取模块
	this.getModule = function(){
		return block;
	};
};

// 文件样式
var FileCard = function(data){
	return $(
		'<div class="col-lg-2 col-md-3 col-sm-4" allowsearch data-type="file">\n' +
		'	<div class="file-card" style="background-color: rgb(229, 57, 53);">\n' +
		'		<div class="card-body">\n' +
		'			<div class="content-default">\n' +
		'				<i class="fa fa-file"></i>\n' +
		'				<div data-type="name" data-id="' + data.id + '" data-src="' + data.src + '">' + data.name + '</div>\n' +
		'			</div>\n' +
		'		</div>\n' +
		'	</div>\n' +
		'</div>'
	);
};

//文件夹样式
var FolderCard = function(data){
	return $(
		'<div class="col-lg-2 col-md-3 col-sm-4" allowsearch data-type="folder">\n' +
		'	<div class="file-card" style="background-color: rgb(29, 135, 228);">\n' +
		'		<div class="card-body">\n' +
		'			<div class="content-default">\n' +
		'				<i class="fa fa-folder"></i>\n' +
		'				<div data-type="name" data-id="' + data.id + '" data-src="' + data.src + '">' + data.name + '</div>\n' +
		'			</div>\n' +
		'		</div>\n' +
		'	</div>\n' +
		'</div>'
	);
};


/* Promise */
const GET_PUBLIC_FILES_FOLDERS = URLPrefix +  '/get_public_files_folders';
var getPublicFilesFolders = function(type, id, dirID){
	return new Promise(function(resolve, reject){
		$.ajax({
			url : GET_PUBLIC_FILES_FOLDERS,
			data: {
				type: type, // 1. 私人; 2. 群组
				id: id,	// userID 或者 GroupID
				dirID: dirID
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


