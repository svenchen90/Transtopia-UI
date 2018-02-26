/* # */
/* 双行模态框 */
var TwinRow = function(title, selected, URL_GET_ALL, all_data, URL_ADD_SINGLE, execution) {
    var controller = $('<div class="modal fade" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">\n' +
        '<div class="modal-dialog modal-dialog-centered" role="document">\n' +
        '<div class="modal-content">\n' +
        '<div class="modal-header">\n' +
        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
        '<span aria-hidden="true">&times;</span>\n' +
        '</button>\n' +
        '<h5 class="modal-title" data-name="title"></h5>\n' +
        '</div>\n' +
        '<div class="modal-body">\n' +
        '<div class="container-fluid" style="padding-left:0px; padding-right:0px;">\n' +
        '<div class="row" data-name="modal-head-info" style="margin-top:0px; border-bottom:1px solid #e5e5e5" >\n' +
        '<div class="col-md-12" data-name="block-header">\n' +
        '<input type="text" class="form-control" placeholder="填写名称" data-name="created-name" style="border:none;position:  relative;top: -5px;"/>\n' +
        '</div>\n' +
        '</div>\n' +
        '<div class="row" style="margin-top:0px;">\n' +
        '<div class="col-md-8" data-name="left-block-list" style="margin-top:0px; border-right:1px solid #e5e5e5">\n' +
        '<div class="form-group" style="margin-top:12px;">\n' +
        '<span class="fa fa-plus" data-action="add-single" data-name="add-button" style="font-size: 30px;width: 10%;height: 34px;color: rgb(229, 229, 229);padding-left: 5px;border: 1px solid rgb(229, 229, 229);"></span>\n' +
        '<input type="text" class="form-control" placeholder="搜索...(区分大小写)" data-action="searchbot" data-name="searchbutton" style="float:right;width:88%"/ >\n' +
        '</div>\n' +
        '<div class="clearfix" data-name="delete-selected"></div>\n' +
        '<div class="row-bot" data-name="all-data"><ul class="list-group" data-name="all-data-content" id="all_data_content" style="margin-top:10px;"></ul>\n' +
        '</div>\n' +
        '</div>\n' +
        '<div class="col-md-4"  style="background-color:#f6f7f9;">\n' +
        '<div  data-name="right-selected-area"><span style="float:left; margin-top:5px;">选择的</span><span style="float:right; margin-top:5px;" data-name="selected-number">0</span><ul data-name="selected-data" class="list-group" style="padding-top:40px; background:transparent;"></ul></div>\n' +
        '</div>\n' +
        '</div>\n' +
        '</div>\n' +
        '<div class="modal-footer">\n' +
        '<button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>\n' +
        '<button type="button" class="btn btn-primary" data-action="submit">确定</button>\n' +
        '</div>\n' + '</div>\n' + ' </div>\n' + '</div>');

    /* 初始化 */
    (function() {
        // 加载第一行搜索
        controller.find('[data-name="title"]').html(title);
        if (URL_ADD_SINGLE == null) {
            controller.find('[data-name="add-button"]').hide();
            controller.find('[data-name="modal-head-info"]').show();
            controller.find('[data-name="searchbutton"]').css("width", "100%");
            
            
        } else {
            controller.find('[data-name="add-button"]').show();
            controller.find('[data-name="modal-head-info"]').hide();
            controller.find('[data-name="add-button"]').on('click',
            function() {
            	var diag=SingleRowInput("新创建的窗口", "请输入内容", function(name){
            		ajaxGetAction(URL_ADD_SINGLE, {name:name},function(){messageAlert("发送请求失败， 请重新尝试","clear", function(){});},function(result){
            			if(result==1)
            			{
            				messageAlert("此名称已经存在", "warning", function() {});
            			}
            			else if(result==2)
            			{
            				messageAlert("创建成功", "done", function() {});
            				diag.close();
            			}
            		})
            	});
            	
            });
        }
 
        controller.find('[data-name="all-data"]').slimScroll({
            height: '400px'
        });

        controller.find('[data-name="right-selected-area"]').slimScroll({
            height: '446px'
        });

        $.each(selected, function(i, user) {
            if (typeof user === "string") {
                controller.find('[data-name="selected-data"]').append(
                    '<li class="list-group-item list-item-twin-row" style="padding-left:0px; padding-right:0px; background:transparent;" data-cid="' + user + '" data-action="delete-selected" onclick="removeSelected(this);">\n' +
                    '<span class="fa fa-tag"></span>\n'+
                    '		<span name="name">' + user + '</span>\n' +
                    '		<span class="pull-right">\n' +
                    '		<i class="fa fa-window-close" style="position:relative; top:3px; color:#2489c5" data-name="close"></i></div>\n' +
                    '		</span>\n' +
                    '</li>'
                );
            } else if (user !== null) {
                controller.find('[data-name="selected-data"]').append(
                    '<li class="list-group-item list-item-twin-row" style="padding-left:0px; padding-right:0px; background:transparent;" data-cid="' + user.id + '"  data-uid="' + user.uid + '" data-action="delete-selected" onclick="removeSelected(this);">\n' +
                    '		<img class="img-circle img-sm" src="' + ImageURLPrefix + user.image + '" alt="User Image">\n' +
                    '		<span name="name">' + user.name + '</span>\n' +
                    '		<span class="pull-right">\n' +
                    '		<i class="fa fa-window-close" style="position:relative; top:3px; color:#2489c5"  data-name="close"></i></div>\n' +
                    '		</span>\n' +
                    '</li>'
                );
            }

        });

        if (selected != null) {
            controller.find('[data-name="selected-number"]').text(selected.length);
        }


       

        ajaxGetAction(URL_GET_ALL, all_data,
            function(result) {
                messageAlert("获取数据失败", "error", function() {});
            },
            function(result) {

                $.each(result, function(i, user) {
                	var checked=false;
                    if (typeof user === "string") {
                    	checked=isExisted(0, user, selected);
                    	var info='<li class="list-group-item  list-item-twin-row" data-name="'+user+'" clicked="'+checked+'" data-id="' + user + '" data-action="add-selected" data-type="string">\n' +
                    	'<span class="fa fa-tag"></span>\n'+
                        '		<span name="name">' + user + '</span>\n' +
                        '		<span class="pull-right"  data-name="item-check-info">\n';
                        if(checked==0)
                        {
                        	info+='<i class="fa fa-square-o"></i>\n';
                        }
                        else
                        {
                        	info+='<i class="fa fa-check-square" style="color:#2489c5"></i>\n';
                        }
                        
                        info+='</span></li>';
                        controller.find('[data-name="all-data-content"]').append(info);

                    } else if (user !== null) {
                    	checked=isExisted(1, user, selected);
                    	var info='<li class="list-group-item list-item-twin-row" clicked="'+checked+'" data-id="' + user.id + '" data-uid="' + user.uid + '" data-action="add-selected" data-image="' + ImageURLPrefix + user.image + '" data-name="' + user.name + '" data-type="object">\n' +
                        '		<img class="img-circle img-sm" src="' + ImageURLPrefix + user.image + '" alt="User Image">\n' +
                        '		<span name="name">' + user.name + '</span>\n' +
                        '		<span class="pull-right"  data-name="item-check-info">\n';
                    	  if(checked==0)
                          {
                          	info+='<i class="fa fa-square"></i>\n';
                          }
                          else
                          {
                          	info+='<i class="fa fa-check-square" style="color:#2489c5"></i>\n';
                          }
                          
                          info+='</span></li>';
                        controller.find('[data-name="all-data-content"]').append(info);

                    }
                });
                
                controller.find('[data-action="add-selected"]').on('click',
                    function() {
                        //console.log($(this).find('.icheckbox_square-blue').attr("aria-checked"));
                        if ($(this).attr("clicked") == "1") {
                            $(this).attr('clicked',"0");
                            $(this).find('[data-name="item-check-info"]').html('<i class="fa fa-square-o"></i>');
                            controller.find('[data-cid="' + $(this).attr("data-id") + '"]').remove();
                            // this.remove();
                            var value = controller.find('[data-name="selected-number"]').text();
                            value = parseInt(value) - 1;
                            controller.find('[data-name="selected-number"]').text(value);
                        } else {
                        	 $(this).attr("clicked","1");
                             $(this).find('[data-name="item-check-info"]').html('<i class="fa fa-check-square" style="color:#2489c5"></i>');
                            if ($(this).attr('data-type') === "string") {
                                controller.find('[data-name="selected-data"]').append(
                                    '<li class="list-group-item list-item-twin-row" style="padding-left:0px; padding-right:0px; background:transparent;" data-cid="' + $(this).attr("data-id") + '" data-action="delete-selected">\n' +
                                    '<span class="fa fa-tag"></span>\n'+
                                    '		<span name="name">' + $(this).attr("data-id") + '</span>\n' +
                                    '		<span class="pull-right">\n' +
                                    '		<i class="fa fa-window-close" style="position:relative; top:3px; color:#2489c5" data-name="close"></i></div>\n' +
                                    '		</span>\n' +
                                    '</li>'
                                );
                            } else if ($(this).attr("data-type") == "object") {
                                controller.find('[data-name="selected-data"]').append(
                                    '<li class="list-group-item list-item-twin-row" style="padding-left:0px; padding-right:0px; background:transparent;" data-cid="' + $(this).attr("data-id") + '"  data-uid="' + $(this).attr("data-uid") + '" data-action="delete-selected">\n' +
                                    '		<img class="img-circle img-sm" src="' + $(this).attr("data-image") + '" alt="User Image">\n' +
                                    '		<span name="name">' + $(this).attr("data-name") + '</span>\n' +
                                    '		<span class="pull-right">\n' +
                                    '		<i class="fa fa-window-close" style="position:relative; top:3px; color:#2489c5" data-name="close"></i></div>\n' +
                                    '		</span>\n' +
                                    '</li>'
                                );
                            }
                            var value = controller.find('[data-name="selected-number"]').text();
                            value = parseInt(value) + 1;
                            controller.find('[data-name="selected-number"]').text(value);
                        }

                    });
            });

        controller.find('[data-action="submit"]').on('click',
            function() {
                var name = controller.find('[data-name="created-name"]').val();
                var c_data = [];
                var collection=controller.find('[data-name="selected-data"]');
                
                $.each(collection.find('li'), function(i, item) {
                	c_data.push($(item).attr("data-cid"));
                });
                
                if (URL_ADD_SINGLE == null) {
                	execution(name, c_data);
                }
                else
                {
                	execution(c_data);
                }
                controller.modal('hide');
               // console.log(c_data);
                
            });

        
        controller.on('click', '[data-action="delete-selected"]', function(){
        	 var value = controller.find('[data-name="selected-number"]').text();
        	  value = parseInt(value) - 1;
        	  controller.find('[data-name="selected-number"]').text(value);
        	  var item=controller.find('[data-id="' + $(this).attr("data-cid") + '"]');
        	  $(item).find('[data-name="item-check-info"]').html('<i class="fa fa-square-o"></i>');
        	  console.log("test");
        	  $(this).remove();
        	});
        
        
        controller.find('[data-name="searchbutton"]').on("keyup", function() {
            var value = $(this).val();
            $("#all_data_content li").filter(function() {
            	var filter=$(this).attr("data-name").indexOf(value) > -1
                $(this).toggle(filter);
            });
          });
        
        controller.modal('show');

    })();


};

function isExisted(flag, item, all)
{
	var result=0;
	if(all==null||all.length==0)
	{
		return 0;
	}
	if(flag==0)
	{
		$.each(all, function(i, user) {
            if(user==item)
            {
            	  result= 1;
            	  return false;
            }
        });
		return result;
	}
	else
	{
		$.each(all, function(i, user) {
            if(user.id==item.id)
            {
            	result= 1;
            	return false;
            }
        });
		return result;
	}
}



var SingleRowInput=function(title, mesg, execution)
{
	var diag=BootstrapDialog.show({
        message: mesg+': <input type="text" class="form-control">',
        buttons: [{
            label: '取消',
            action: function(dialogRef) {
                dialogRef.close();
            }
        },
        {
            label: '确定',
            action: function(dialogRef) {
            	var name=dialogRef.getModalBody().find('input').val();
            	execution(name);
            }
        }],
        title:title,
        type:BootstrapDialog.TYPE_INFO
    });
	return diag;
}