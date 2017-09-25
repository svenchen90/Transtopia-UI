/* 
Beta版本: 模块
1. 顶端一级导航栏 - FirstNavTop
2. 顶端二级导航栏 - SecondNavTop
 */
 
// 1. 顶端一级导航栏 
// brand,leftList,search,rightList
var FirstNavTop = function(){
	var module = $(
		'<nav class="navbar" style="margin-bottom:0; border-radius:0;border-bottom: none;">\n' +
		'	<div class="container-fluid">\n' +
		'		<!-- Brand and toggle get grouped for better mobile display -->\n' +
		'		<div class="navbar-header">\n' +
		'			<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-1">\n' +
		'			<span class="icon-bar"></span>\n' +
		'			<span class="icon-bar"></span>\n' +
		'			<span class="icon-bar"></span>\n' +
		'			</button>\n' +
		'			<a class="navbar-brand" href="#"></a>\n' +
		'		</div>\n' +
		'		<!-- Collect the nav links, forms, and other content for toggling -->\n' +
		'		<div class="collapse navbar-collapse" id="navbar-collapse-1">\n' +
		'			<ul class="nav navbar-nav" data-type="left-list">\n' +
		'				<!-- 左侧按钮列表 -->\n' +
		'					<a href="#" data-type="btn-collapse">\n' +
		'						<i class="fa fa-bars"></i>\n' +
		'					</a>\n' +
		'				</li>\n' +
		'				<li><a href="#">{link1}</a></li>\n' +
		'				<li class="dropdown">\n' +
		'					<a href="#" class="dropdown-toggle" data-toggle="dropdown">{Dropdown}<span class="caret"></span></a>\n' +
		'					<ul class="dropdown-menu">\n' +
		'						<li><a href="#">{sublink}</a></li>\n' +
		'						<li><a href="#">{sublink}</a></li>\n' +
		'						<li><a href="#">{sublink}</a></li>\n' +
		'						<li class="divider"></li>\n' +
		'						<li><a href="#">{sublink}</a></li>\n' +
		'						<li class="divider"></li>\n' +
		'						<li><a href="#">{sublink}</a></li>\n' +
		'					</ul>\n' +
		'				</li>\n' +
		'			</ul>\n' +
		'			<form class="navbar-form navbar-left">\n' +
		'				<div class="form-group">\n' +
		'					<input type="text" class="form-control" placeholder="Search">\n' +
		'				</div>\n' +
		'			</form>\n' +
		'			<ul class="nav navbar-nav navbar-right">\n' +
		'				<li><a href="#">{link1}</a></li>\n' +
		'				<li class="dropdown">\n' +
		'					<a href="#" class="dropdown-toggle" data-toggle="dropdown">{Dropdown}<span class="caret"></span></a>\n' +
		'					<ul class="dropdown-menu">\n' +
		'						<li><a href="#">{sublink}</a></li>\n' +
		'						<li><a href="#">{sublink}</a></li>\n' +
		'						<li><a href="#">{sublink}</a></li>\n' +
		'						<li class="divider"></li>\n' +
		'						<li><a href="#">{sublink}</a></li>\n' +
		'						<li class="divider"></li>\n' +
		'						<li><a href="#">{sublink}</a></li>\n' +
		'					</ul>\n' +
		'				</li>\n' +
		'			</ul>\n' +
		'		</div>\n' +
		'	</div\n' +
		'</nav>'
	);
	//brand,leftList,search,rightList
	// 设置商标
	this.setBrand = function(title, href){
		module.find('.navbar-brand').attr('href', brand.href).text(title);
	};
	// 设置collapse btn
	this.setCollapse = function(callback){
		module.find('[data-type="btn-collapse"]')
			.unbind('click')
			.click(function(){
				callback();
			});
	};
	// 设置靠左list
	this.setLeftBtnList = function(leftList){
		var container = module.find('[data-type="left-list"]');
		
	}
	
}