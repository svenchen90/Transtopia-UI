/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var index = 0;
var name;
var files;
var names = [];

var monitorUpload;
var processFlag = false;
function showFileOperation(id)
{
    var ids = 'project_item_operation_' + id;
    document.getElementById(ids).style.display = "block";
}

function fadeFileOperation(id)
{
    var ids = 'project_item_operation_' + id;
    document.getElementById(ids).style.display = "none";


}

function openNewPageTag(option,id)
{
    option=parseInt(option);
    if(option===2)
    {
       window.open('../Survey/index1.jsp?id='+id,'_blank'); 
    }
    else if(option===3)
    {
        window.open('../Survey/intersection.jsp?id='+id,'_blank'); 
    }
}

function showIntersectionPS()
{
    //window.location.href = "index.jsp?showop=3";
    updatePage(3, 0, '');
}

function showSegPS()
{
    //window.location.href = "index.jsp?showop=4";
    updatePage(4, 0, '');
}

function showLightPS()
{
    //window.location.href = "index.jsp?showop=5";
    updatePage(5, 0, '');
}

function showTextPS()
{
    //window.location.href = "index.jsp?showop=21";
    updatePage(21, 0, '');
}

function showImagePS()
{
    //window.location.href = "index.jsp?showop=22";
    updatePage(22, 0, '');
}

function showPDFPS()
{
    //window.location.href = "index.jsp?showop=23";
    updatePage(23, 0, '');
}

function showWordPS()
{
    //window.location.href = "index.jsp?showop=24";
    updatePage(24, 0, '');
}

function showExcelPS()
{
    //window.location.href = "index.jsp?showop=25";
    updatePage(25, 0, '');
}


function showPPTPS()
{
    //window.location.href = "index.jsp?showop=26";
    updatePage(26, 0, '');
}



function showDeleteProjectList()
{
    //window.location.href = "index.jsp?showop=-1";
    updatePage(-1, 0, '');
}

function clearTrashOut()
{
    if (cf("你确定要清空回收站吗？"))
    {
        $.post("../../HandleRemoveProject", {option: 3}, function (result)
        {
            if (result === "-1")
            {
                alert("系统出现异常，请重新尝试");
            }
            else if (result === "0")
            {
                alert("清空垃圾箱成功");
                var showOP = $("#allProjectList").attr("showOP");
                var parentID = $("#allProjectList").attr("parentID");
                var key = $("#allProjectList").attr("key");
                updatePage(showOP, parentID, key);
            }

        });
    }
}


function createProject()
{
    //document.getElementById("tempFile").style.display = "block";
    var pp_id = $("#allProjectSection").attr("ppid");
    getProjectType(pp_id);

}

function createProjectFolder()
{
    //document.getElementById("tempFile").style.display = "block";
    var pp_id = $("#allProjectSection").attr("ppid");
    var dig = document.getElementById("myModal");
    dig.innerHTML = getProjectTypeFolder(pp_id);

    $('#myModal').modal({backdrop: 'static', keyboard: false});
}


function initNewProject(pp_id)
{
    pp_id = parseInt(pp_id);
    if (pp_id === 0)
    {
        if (canDoFileOpeartion())
        {
            createNewProject_1(pp_id);
        } else
        {
            alert("你不能进行此操作");
        }
    }
    else
    {
        if (canDoFileOpeartion())
        {
            $.post("../../HandleGetRoleInfo", {pid: pp_id}, function (result)
            {
                if (result === "1")
                {
                    alert("你没有权限创建项目文件");
                }
                else if (result === "0")
                {
                    alert("数据库发生异常，请重新尝试");
                }
                else
                {
                    createNewProject_1(pp_id);
                }

            });
        } else
        {
            alert("你不能进行此操作");
        }
    }
}

function initNewProjectFolder(pp_id)
{
    pp_id = parseInt(pp_id);
    if (pp_id === 0)
    {
        if (canDoFileOpeartion())
        {
            createNewProjectFolder(pp_id);
        } else
        {
            alert("你不能进行此操作");
        }
    }
    else
    {
        if (canDoFileOpeartion())
        {
            $.post("../../HandleGetRoleInfo", {pid: pp_id}, function (result)
            {
                if (result === "1")
                {
                    alert("你没有权限创建项目文件");
                }
                else if (result === "0")
                {
                    alert("数据库发生异常，请重新尝试");
                }
                else
                {
                    createNewProjectFolder(pp_id);
                }

            });
        } else
        {
            alert("你不能进行此操作");
        }
    }
}

function createNewProjectFolder(pp_id)
{
    var type = 1;
    type = parseInt(type);
    var name = $("#p_type_name").val();
    name = name.trim();
    if (type === 0 || name === "")
    {
        alert("请先选择你要创建的项目类型/填写项目的名称");
    }
    else
    {
        if (checkFileNameFormat(name) && !name.includes('.'))
        {
            processFlag = true;
            buttonOperation("mp2", 0);
            $.post("../../HandleCreateNewFolder", {name: name, ppid: pp_id, type: type}, function (result)
            {

                if (result === "-1")
                {
                    buttonOperation("mp2", 1);
                    processFlag = false;
                    alert(name + " 此项目创建失败，请重新创建");

                }
                else if (result === "2")
                {
                    buttonOperation("mp2", 1);
                    processFlag = false;
                    alert(name + " 已经存在，请修改名字！");
                }
                else if (result === "4")
                {
                    buttonOperation("mp2", 1);
                    processFlag = false;
                    alert(name + "写入数据发生错误！");
                }
                else if (result.startsWith("0"))
                {
                    buttonOperation("mp2", 1);
                    processFlag = false;
                    $("#myModal").modal("hide");
                    var outs = result.split("?");
                    if (outs[1] === "0")
                    {
                        //window.location.href = "index.jsp";
                        var showOP = $("#allProjectList").attr("showOP");
                        var parentID = $("#allProjectList").attr("parentID");
                        var key = $("#allProjectList").attr("key");
                        updatePage(showOP, parentID, key);
                    }
                    else
                    {
                        // window.location.href = "index.jsp?ppid=" + outs[1];
                        var showOP = $("#allProjectList").attr("showOP");
                        var parentID = $("#allProjectList").attr("parentID");
                        var key = $("#allProjectList").attr("key");
                        updatePage(showOP, parentID, key);
                    }
//                window.loaction("index.jsp?ppid=<%=p.id%>&pname=<%=p.name%>");
//                addNewProject_Revised(name, outs[0], outs[1], outs[2], outs[3], uid, type);

                }
            });
        }
        else
        {
            alert("你输入的文件名称格式不正确，请用数字，英文，下划线或者汉字表示");
        }
    }
}

function createNewProject_1(pp_id)
{
    var type = $("#f_project_type").val();
    type = parseInt(type);
    var name = $("#p_Name").val();
    name = name.trim();
    var description = $("#p_Description").val();
    var province = $("#province").val();
    var city = $("#city").val();
    var town = $("#town").val();
    if (town === null)
    {
        town = "";
    }
     var stime;
    var etime ;
    var budget ;
    if(type===3)
    {
        stime = $("#pstime").val();
        etime = $("#petime").val();
        budget = $("#p_budget").val();
    }
    else if(type===4)
    {
        stime ="";
        etime = "";
        budget =0;
        
    }
   
    var data = '{"stime":"' + stime + '","etime":"' + etime + '","name":"' + name + '","id":"' + 0 + '","budget":"' + budget + '","province":"' + province + '","city":"' + city + '","town":"' + town + '","pid":"' + 0 + '","parentID":"' + pp_id + '","description":"' + description + '"}';
    
    if (type === 0 || name === "")
    {
        alert("请先选择你要创建的项目类型/填写项目的名称");
    }
    else
    {
        if (checkFileNameFormat(name) && !name.includes('.'))
        {
            processFlag = true;
            buttonOperation("mp1", 0);
            $.post("../../HandleCreateNewFolder", {name: name, ppid: pp_id, type: type,data:data}, function (result)
            {

                if (result === "-1")
                {
                    buttonOperation("mp1", 1);
                    processFlag = false;
                    alert(name + " 此项目创建失败，请重新创建");

                }
                else if (result === "2")
                {
                    buttonOperation("mp1", 1);
                    processFlag = false;
                    alert(name + " 已经存在，请修改名字！");
                }
                else if (result === "4")
                {
                    buttonOperation("mp1", 1);
                    processFlag = false;
                    alert(name + "写入数据发生错误！");
                }
                else if (result.startsWith("0"))
                {
                    buttonOperation("mp1", 1);
                    processFlag = false;
                    $("#myModal").modal("hide");
                    var outs = result.split("?");
                    if (outs[1] === "0")
                    {
                        //window.location.href = "index.jsp";
                        var showOP = $("#allProjectList").attr("showOP");
                        var parentID = $("#allProjectList").attr("parentID");
                        var key = $("#allProjectList").attr("key");
                        updatePage(showOP, parentID, key);
                    }
                    else
                    {
                        // window.location.href = "index.jsp?ppid=" + outs[1];
                        var showOP = $("#allProjectList").attr("showOP");
                        var parentID = $("#allProjectList").attr("parentID");
                        var key = $("#allProjectList").attr("key");
                        updatePage(showOP, parentID, key);
                    }

//                window.loaction("index.jsp?ppid=<%=p.id%>&pname=<%=p.name%>");
//                addNewProject_Revised(name, outs[0], outs[1], outs[2], outs[3], uid, type);

                }
            });
        }
        else
        {
            alert("你输入的文件名称格式不正确，请用数字，英文，下划线或者汉字表示");
        }
    }
}

function selectProjectType(type)
{
    var number = $("#project_types").attr("number");
    number = parseInt(number);
    for (var i = 1; i <= number; i++)
    {
        if (i !== 2)
        {
            $("#p_type_" + i).attr("class", "list-group-item");
        }
    }
    $("#project_types").attr("type", type);
    $("#p_type_" + type).attr("class", "list-group-item active");
}

function projectInstanceChange()
{
    var value=parseInt($("#f_project_type").val());
    if(value===3)
    {
        $("#project_time_range").show();
        $("#project_budget").show();
    }
    else if(value===4)
    {
        $("#project_time_range").hide();
        $("#project_budget").hide();
    }
}

function getProjectType(pp_id)
{
    var content;
    content = '<div class="modal-dialog">'

            + '<div class="modal-content">'
            + '<div class="modal-header">'
            + '<button type="button" class="close" onclick="closeModal()">&times;</button>'
            + '<h4 class="modal-title">创建项目</h4>'
            + '</div>'
            + '<div id="project_types" class="modal-body" type="0" number="3">';

    content += '<div><span>选择项目类型:&nbsp;&nbsp;&nbsp;</span><select class="list-group" id="f_project_type" onchange="projectInstanceChange()">'
            + '<option value="3" id="p_type_3">调查项目</option>'
            + '<option value="4" id="p_type_4">交叉口草绘渠化项目</option>'
            + ' </select></div>'
            + '<div><table class="table table-condensed" style="border:none; text-align: left;">'
            + '<tbody>'
            + '<tr >'
            + '<td style="border:none">项目名称:</td>'
            + '<td style="border:none"><input type="text" name="pName" id="p_Name" value=""></td>'
            + '</tr>'
            + '<tr style="border:none">'
            + '<td style="border:none">项目描述:</td>'
            + '<td style="border:none"><textarea name="pName" id="p_Description"></textarea></td>'
            + '</tr>'
            + '<tr>'
            + '<td style="border:none">项目地点:</td>'
            + '<td style="border:none">'
            + '<div id="city2">'
            + '<select name="province" id="province" class="prov" style="width:100px;">'
            + '</select>'
            + '<select name="city" id="city" class="city"  disabled="disabled" style="width:100px;">'
            + '</select>'
            + '<select name="area" id="town" class="dist"  disabled="disabled" style="width:100px;">'
            + '</select>'
            + '</div>'
            + '</td>'
            + '</tr>'
            + '<tr id="project_budget">'
            + '<td style="border:none">项目预算:</td>'
            + '<td style="border:none"><input type="text" name="pPrice" id="p_budget">单位:元</td>'
            + '</tr>'
            + '<tr id="project_time_range">'
            + '<td style="border:none">项目时间节点:</td>'
            + '<td style="border:none"><input  name="ptime_s" id="pstime" type="date"> 到'
            + '<input type="date" name="ptime_e" id="petime"></td>'
            + '</tr>'
            + '</tbody>'
            + '</table></div>'

            + '<div class="modal-footer">'
            + '<button type="button" class="btn btn-default" onclick="closeModal()">关闭</button>'
            + '<button type="button" class="btn btn-default" id="mp1" onclick="initNewProject(\'' + pp_id + '\')">确定</button>'
            + '</div>'
            + '</div>'
            + '</div>';

    var dig = document.getElementById("myModal");
    dig.innerHTML = content;
    $("#city2").citySelect({prov: "北京", nodata: "none"});
    $('#myModal').modal({backdrop: 'static', keyboard: false});
}

function getProjectTypeFolder(pp_id)
{
    var content;
    content = '<div class="modal-dialog">'

            + '<div class="modal-content">'
            + '<div class="modal-header">'
            + '<button type="button" class="close" onclick="closeModal()">&times;</button>'
            + '<h4 class="modal-title">新建文件夹</h4>'
            + '</div>'
            + '<div id="project_types" class="modal-body" type="0" number="3">';

    content += '<span>填写文件夹名称:&nbsp;</span><input type="text" id="p_type_name" class=""></div>'
            + '<div class="modal-footer">'
            + '<button type="button" class="btn btn-default" onclick="closeModal()">关闭</button>'
            + '<button type="button" class="btn btn-default" id="mp2" onclick="initNewProjectFolder(\'' + pp_id + '\')">确定</button>'
            + '</div>'
            + '</div>'
            + '</div>';
    return content;
}

var ppid = 0;

function showLoadFile()
{
    var pp_id = $("#allProjectList").attr("parentID");
    pp_id = parseInt(pp_id);
    if (pp_id === 0)
    {
        if (canDoFileOpeartion())
        {
            showLoadFileView(pp_id);
        }
        else
        {
            alert("你不能进行此操作");
        }
    }
    else
    {
        if (canDoFileOpeartion())
        {
            $.post("../../HandleGetRoleInfo", {pid: pp_id}, function (result)
            {
                if (result === "1")
                {
                    alert("你没有权限创建项目文件");
                }
                else if (result === "0")
                {
                    alert("数据库发生异常，请重新尝试");
                }
                else
                {
                    showLoadFileView(pp_id);
                }

            });
        } else
        {
            alert("你不能进行此操作");
        }
    }
}

function showLoadFileView(pp_id)
{
    var show = $("#myFileModal").attr("show");
    if (show === "0")
    {
        ppid = pp_id;
        $("#myFileModal").attr("show", "1");
        var dig = document.getElementById("myFileModal");
        dig.innerHTML = getloadFile();
        $('#myFileModal').modal({backdrop: false});
        $('#myFileModal').on('hidden.bs.modal', function ()
        {
            var showOP = $("#allProjectList").attr("showOP");
            var parentID = $("#allProjectList").attr("parentID");
            var key = $("#allProjectList").attr("key");
            $("#myFileModal").attr("show", "0");
            updatePage(showOP, parentID, key);
        });
    }
    else
    {
        $('#myFileModal').show();
    }
}

function checkUploadFormat(name)
{
    var format = "pdf,docx,txt,xlsx,xls,ppt,pptx,doc,png,jpeg,jpg";
    name = name.trim();
    name = name.split(".");
    if (name.length > 2)
    {
        return false;
    }
    else
    {
        var fname = name[0];
        if (checkFileNameFormat(fname))
        {
            name = name[name.length - 1];
            name = name.toLocaleLowerCase();
            return format.includes(name);
        }
        else
        {
            return false;
        }
    }
}

function getloadFile()
{
    var content;
    content = '<div class="modal-dialog">'

            + '<div class="modal-content">'
            + '<div class="modal-header">'
            + '&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" id="uploadFileButtonClose" class="close" onclick="closeFileModal()">&times;</button><button type="button" style="position:relative;left:-10px;"id="uploadFileButtonMinus" class="close" onclick="minFileModal()">&minus;</button>'
            + '<h4 class="modal-title">上传文件到Transtopia</h4>'
            + '</div>'
            + '<div class="modal-body" id="uploadBodyPart" size="0" donesize="0">'
            + '<p>请上传文件到Transtopia,你可以一次上传多个文件</p><table id="addedFiles" index="0"><tr><th class="uploadTD1">文件名称</th><th class="uploadTD2">文件大小</th><th class="uploadTD3">上传进度</th></tr></table>';
    content += '</div>'
            + '<div class="modal-footer">'
            + '<form id="formData"  method="post" name="files[]" enctype="multipart/form-data">'
            + '  <input id="uploadFile_mine" type="file" style="visibility:hidden" class="upinput" multiple name="files[]" onchange="showFileProcess_1()"> '
            + '<span class="btn btn-primary upbutton" onclick="loadFileButton();">'
            + '<span class="btn btn-primary upname">选择文件</span>'

            + '</span>'
            + '</form>'
            + '</div>'
            + '</div>'
            + '</div>';
    return content;
}

function uploadProgress(evt, id) {
    if (evt.lengthComputable) {
        var percentComplete = Math.round(evt.loaded * 100 / evt.total);
        if (percentComplete < 90)
        {
            var progress = document.getElementById("uprogress_" + id);
            var value = 2.35 * percentComplete;
            value = parseInt(value);
            progress.setAttribute("style", "width:" + value + "px;");
            progress.innerHTML = percentComplete.toString() + '%';
        }
    }
    else {
        progress.innerHTML = '无法计算';
    }
}


function addFileItemInfo(name, size, id)
{
    var parent = document.getElementById("addedFiles");
    var item = document.createElement("tr");
    item.setAttribute("id", "uploadItem_" + id);
    var content = '<td  class="uploadTD1" id="upfilename_' + id + '">' + name + '</td>'
            + '<td class="uploadTD2" id="upfilesize_' + id + '">' + size
            + '</td>'
            + '<td class="uploadTD3"><div  style="display:inline" class="progress">'
            + '<div id="uprogress_' + id + '" class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 0px;">'
            + '</div></div></td>';
    +'<td class="uploadTD2" id="upfilesize_' + id + '">' + '<i class="fa fa-trash" aria-hidden="true" onclick="deleteUploadFile(\'' + id + '\')"></i>'
            + '</td>';
    item.innerHTML = content;
    parent.appendChild(item);
    var progress = document.getElementById("uprogress_" + id);
    progress.setAttribute("style", "width:0px;");
    progress.innerHTML = '0%';
}

function uploadFile_1(ppid, file, id) {
    var xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", function (evt) {
        uploadProgress(evt, id);
    }, false);
    var formData = new FormData();
    formData.append("myFile", file);
    xhr.open("POST", "../../HandleUploadFile?ppid=" + ppid);
    xhr.send(formData);
    xhr.onreadystatechange = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200)
            {
                if (xhr.responseText === "-1" || xhr.responseText === "4")
                {
                    var dz = $("#uploadBodyPart").attr("donesize");
                    dz = parseInt(dz) + 1;
                    $("#uploadBodyPart").attr("donesize", dz);
                    var progress = document.getElementById("uprogress_" + id);
                    var value = 2.35 * 100;
                    value = parseInt(value);
                    progress.setAttribute("style", "width:" + value + "px;background:red");
                    progress.innerHTML = '上传失败';

                }
                else if (xhr.responseText === "2")
                {
                    //alert(file.name + "已经存在，请修改名字！");
                    var dz = $("#uploadBodyPart").attr("donesize");
                    dz = parseInt(dz) + 1;
                    $("#uploadBodyPart").attr("donesize", dz);
                }
                else
                {
                    var dz = $("#uploadBodyPart").attr("donesize");
                    dz = parseInt(dz) + 1;
                    $("#uploadBodyPart").attr("donesize", dz);
                    var progress = document.getElementById("uprogress_" + id);
                    var value = 2.35 * 100;
                    value = parseInt(value);
                    progress.setAttribute("style", "width:" + value + "px;");
                    progress.innerHTML = '上传完成';
                }

            }

        }
    };
}

function showFileProcess_1(e)
{
    if (!e)
        var e = window.event;
    var files = null;
    e.stopPropagation();
    e.preventDefault();
    e.target.className = (e.type === "dragover" ? "hover" : "");

    // fetch FileList object
    files = e.target.files || e.dataTransfer.files;

    var flag = true;
    for (var i = 0; i < files.length; i++)
    {
        if (checkUploadFormat(files[i].name))
        {
            flag = true;
        }
        else
        {
            flag = false;
            break;
        }
    }
    if (flag)

    {
        // process all File objects
        var index = $("#addedFiles").attr("index");
        index = parseInt(index);
        var fsize = $("#uploadBodyPart").attr("size");
        fsize = parseInt(fsize) + files.length;
        $("#uploadBodyPart").attr("size", fsize);
        processFlag = true;
        monitorUpload = setInterval(myUploadMonitor, 1000);
        $("#uploadIcon").attr("class", "fa fa-cloud-upload fa-2x my_nav_icon myanimation");
        for (var i = 0; i < files.length; i++)
        {
            var f = files[i];
            var fileSize = 0;

            if (f.size > 1024 * 1024)
                fileSize = (Math.round(f.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
            else
                fileSize = (Math.round(f.size * 100 / 1024) / 100).toString() + 'KB';

            var name = f.name;
            var size = fileSize;
            addFileItemInfo(name, size, i + index);
            uploadFile_1(ppid, f, i + index);
        }
        index = index + files.length;
        $("#addedFiles").attr("index", index);
    }
    else
    {
        $("#uploadFile_mine").val("");
        alert("我们仅支持 pdf,docx,txt,xlsx,xls,ppt,pptx,doc,png,jpeg,jpg的文件，或者你的文件名称包含非法字符，文件名称有英文数字或者汉字组成");
    }
}

function myUploadMonitor() {
    var dz = $("#uploadBodyPart").attr("donesize");
    var size = $("#uploadBodyPart").attr("size");
    if (dz === size)
    {
        processFlag = false;
        $("#uploadFile_mine").val("");
        $("#uploadIcon").attr("class", "fa fa-cloud-upload fa-2x my_nav_icon");
        clearTimeout(monitorUpload);
    }
}

var temppid, tuserid;

function showShareFolderAction(pid, userid)
{
    getSharePeopleListBefore(pid, userid);

}

function getSharePeopleListBefore(pid, userid)
{
    $.post("../../HandleGetUserInfo", {pid: pid, option: "1"}, function (result)
    {

        if (result === "0")
        {
            alert("分享获取数据操作失败，请重试！");

        }
        else
        {
            temppid = pid;
            tuserid = userid;
            var id = "file" + pid + "_button";
            var item = document.getElementById(id);
            item.setAttribute("items", result);
            var uid = parseInt(userid);

            var pps = item.getAttribute("items").trim('\"');
            var pps = '{"shareItem":[' + pps + ']}';
            var obj = JSON.parse(pps);
            getSharePeopleList(obj.shareItem[0], uid);
        }
        //$("span").html(result);
    });
}

function getSharePeopleList(pps, uid)
{
    var content = "";
    var role;

    var selection = "";
    if (pps.items.length > 0)
    {
        var roleM = 0;
        for (var i = 0; i < pps.items.length; i++)
        {
            if (pps.items[i].id === uid)
            {

                if (pps.items[i].role === 1)
                {
                    roleM = 1;
                    selection = '<option value="0">权限设置</option>'
                            + '<option value="1">只读</option>';
                }
                else if (pps.items[i].role === 2)
                {
                    roleM = 2;
                    selection = '<option value="0">权限设置</option>'
                            + '<option value="1">只读</option>'
                            + '<option value="2">读写</option>';
                }
                else if (pps.items[i].role === 3)
                {
                    roleM = 3;
                    selection = '<option value="0">权限设置</option>'
                            + '<option value="1">只读</option>'
                            + '<option value="2">读写</option>'
                            + '<option value="3">管理员</option>';
                }
            }
        }
        content += '<div class="modal-dialog">'
                + '<div class="modal-content">'
                + '<div class="modal-header">'
                + '<button type="button" class="close" onclick="closeModal()">&times;</button>'
                + '<h4 class="modal-title">分享项目--' + pps.fileName + '</h4>'
                + '</div>'
                + '<div class="modal-body" style="background: #f6f9fc">'
                + '<span style="font-size:14px;font-weight: bold;margin-left: 5px;">' + pps.pNumber + '个用户:</span>'
                + '<div style="background:white;height:200px;width:inherit;overflow-y:scroll;"><table id="shareListID" style="background-color:white;width:100%">';



        for (var i = 0; i < pps.items.length; i++)
        {
            content += '<tr class="sharePeopleItem" id="share_' + pps.items[i].id + '">'
                    + '<td style="text-align: left;">';
            if (pps.items[i].id === uid)
            {
                content += '<div class="c-avatar--no-img c-avatar--circle c-avatar c-avatar--s fileContent" style="color:hsl(' + pps.items[i].color + ', 60%, 53%);">' + pps.items[i].abb + '</div>&nbsp;' + pps.items[i].name;

            }
            else
            {
                content += '<div class="c-avatar--no-img c-avatar--circle c-avatar c-avatar--s fileContent" style="color:hsl(' + pps.items[i].color + ', 60%, 53%);">' + pps.items[i].abb + '</div>&nbsp;' + pps.items[i].name;

            }
            content += '</td>'
                    + '<td  style="text-align: left">';
            if (pps.items[i].role === 1)
            {
                role = "允许只读";
            }
            else if (pps.items[i].role === 2)
            {
                role = "允许读写";
            }
            else if (pps.items[i].role === 3)
            {
                role = "管理员";
            }
            content += '<div class="fileContent" style="color:black" id="croleName_' + pps.items[i].id + '">' + role + '</div>'
                    + '</td>'
                    + '<td style="text-align: right;width:80px;">';
            if (pps.items[i].id === uid)
            {
                var cc = '<select class="form-control shareOption" id="croleValue" disabled style="color:black;">'
                        + '<option value="0">用户本人</option>'
                        + '<option value="1">只读</option>'
                        + '<option value="2">读写</option>'
                        + '<option value="3">管理员</option>'
                        + '<option value="4">删除</option></select>';
                //content += '<div class="fileContent" style=""><a href="javascript:void(0)" onclick="removeSharePeople(' + pps.pid + ',' + pps.items[i].id + ')"><img src="./img/sm/close.png" style="width:15px;height:15px;"></a></div>';
                content += cc;
            }
            else
            {
                if (pps.items[i].role <= roleM && roleM === 3)
                {
                    var cc = '<select class="form-control shareOption" class="shareFileRoleClass" id="croleValue_' + pps.items[i].id + '" onchange=changeShareRole(\'' + pps.items[i].id + '\',\'' + pps.pid + '\')>';
                    cc += '<option value="0">更改权限</option>';
                    if (pps.items[i].role !== 1)
                    {
                        cc += '<option value="1">只读</option>';
                    }
                    if (pps.items[i].role !== 2)
                    {
                        cc += '<option value="2">读写</option>';
                    }
                    if (pps.items[i].role !== 3)
                    {
                        cc += '<option value="3">管理员</option>';
                    }
                    if (pps.items[i].role !== 4)
                    {
                        cc += '<option value="4">删除</option>';
                    }
                    cc += '</select>';
                    //content += '<div class="fileContent" style=""><a href="javascript:void(0)" onclick="removeSharePeople(' + pps.pid + ',' + pps.items[i].id + ')"><img src="./img/sm/close.png" style="width:15px;height:15px;"></a></div>';
                    content += cc;
                }
                else
                {
                    var cc = '<select class="form-control shareOption" id="croleValue" disabled style="color:black;">'
                            + '<option value="0">没有权限</option>'
                            + '<option value="1">只读</option>'
                            + '<option value="2">读写</option>'
                            + '<option value="3">管理员</option>'
                            + '<option value="4">删除</option></select>';
                    //content += '<div class="fileContent" style=""><a href="javascript:void(0)" onclick="removeSharePeople(' + pps.pid + ',' + pps.items[i].id + ')"><img src="./img/sm/close.png" style="width:15px;height:15px;"></a></div>';
                    content += cc;
                }
            }




            content += '</td>'
                    + '</tr>';
        }
    }


    content += '</table></div>'
            + '<form>'
            + '<div class="dropdown roleShare" style="right:7px;">'

            + '<select class="form-control shareOption" id="roleValue">'
            + selection
            + '</select>'
            + '</div>'
            + '<div class="row" style="background-color:white;border:1px solid gainsboro;margin:5px; width:400px;">'

            + '<div style="" id="shareFormArea" style="height: 30px;">'
            + '<div>'
            + '<input type="text" id="mailLists" name="mailist" />'
            + '</div>'


            + '</div>'
            + '</div>'

            + '<div class="row" style="background-color:#f6f9fc;margin:5px;margin-bottom: 0px; margin-top: 10px;">'
            + '<div style="text-align: right">'
            + '<button type="button" class="btn btn-default shareButtonStyle" id="mp4" onclick="confirmShareDiag(' + pps.pid + ');" style="background: #428bca;color:white">分享</button>'
            + '</div></div></form> </div></div></div>';

    var dig = document.getElementById("myModal");
    dig.innerHTML = content;
    $('#myModal').modal({backdrop: 'static', keyboard: false});
    $("#mailLists").tokenInput("../../HandleSearchMailList", {
        theme: "facebook"
    });

    $('#token-input-mailLists').keypress(function (e) {
        var key = e.which;
        if (key === 13)  // the enter key code
        {
            var email = $("#token-input-mailLists").val();
            addToMailList(email);
            return false;
        }
    });
}

var tempID = 100;
function addToMailList(email)
{
    tempID++;
    $("#mailLists").tokenInput("add", {id: tempID, name: email});
}

function confirmShareDiag(pid)
{
    //var names = document.getElementById("tokenfield-1").value;

    var names = $("#mailLists").tokenInput("get");
    var email = "";
    for (var i = 0; i < names.length; i++)
    {
        if (email === "")
        {
            email += names[i].name;
        }
        else
        {
            email += "," + names[i].name;
        }
    }
    if (email === "")
    {
        alert("请输入要分享的名单");
    }
    else
    {
        var role = document.getElementById("roleValue").value;
        if (role === 0)
        {
            alert("请输入要分享的权限");
        }
        else
        {
            buttonOperation("mp4", 0);
            processFlag = true;
            $.post("../../HandleShareFile", {pid: pid, names: email, role: role}, function (result)
            {

                if (result === "1")
                {
                    buttonOperation("mp4", 1);
                    processFlag = false;
                    alert("系统不存在此帐号，我们已经发送链接邀请他/她注册");
                }
                else if (result === "-1")
                {
                    buttonOperation("mp4", 1);
                    processFlag = false;
                    alert("分享操作失败,请重新邀请分享");
                }
                else if (result === "2")
                {
                    buttonOperation("mp4", 1);
                    processFlag = false;
                    alert("此帐号，已经在分享列表中");
                }
                else
                {
                    //alert("已经分享成功");
                    buttonOperation("mp4", 1);
                    processFlag = false;
                    showShareFolderAction(temppid, tuserid);
                    alert("已经分享成功");
                    var showOP = $("#allProjectList").attr("showOP");
                    var parentID = $("#allProjectList").attr("parentID");
                    var key = $("#allProjectList").attr("key");
                    updatePage(showOP, parentID, key);
//                    var ids=result.split("?");
//                    updatePage(0,ids[1],"");

                }
                //$("span").html(result);
            });
        }
    }


}


function sortUsingNestedText(parent, childSelector, keySelector, option) {
    var items = parent.children(childSelector).sort(function (a, b) {
        var vA = $(keySelector, a).text();
        var vB = $(keySelector, b).text();
        if (option === 1)
        {
            return (vA < vB) ? -1 : (vA > vB) ? 1 : 0;
        }
        else
        {
            return (vB < vA) ? -1 : (vB > vA) ? 1 : 0;
        }
    });
    parent.append(items);
}

function sortProject(option)
{
    var list = document.getElementById("allProjects");
    var tempFile = document.getElementById("tempFile");
    list.removeChild(tempFile);
    var sortName = parseInt(list.getAttribute("sortName"));
    var sortTime = parseInt(list.getAttribute("sortTime"));
    if (option === 1)
    {
        if (sortName === 1)
        {
            list.setAttribute("sortName", "2");
            sortUsingNestedText($('#allProjects'), "div", "span.nameTitle", 1);
        }
        else
        {
            list.setAttribute("sortName", "1");
            sortUsingNestedText($('#allProjects'), "div", "span.nameTitle", 2);
        }
    }
    else
    {
        if (sortTime === 1)
        {
            list.setAttribute("sortTime", "2");
            sortUsingNestedText($('#allProjects'), "div", "span.timeTitle", 1);
        }
        else
        {
            list.setAttribute("sortTime", "1");
            sortUsingNestedText($('#allProjects'), "div", "span.timeTitle", 2);
        }
    }
    addTempAddFile();
}

function showRightMenu(id, uid)
{
    var cont = '<div class="list-group">'
            + '<a href="#" class="list-group-item tb_aa" onclick="showShareFolderAction(' + id + ',' + uid + ')"><img class="tb_img" src="./img/tb/share_tb.jpg">分享...</a>'
            + '<a href="#" class="list-group-item tb_aa" onclick="downloadFile(' + id + ',' + uid + ')"><img class="tb_img" src="./img/tb/db_tb.jpg">下载...</a>'
            + '<a href="#" class="list-group-item tb_aa" onclick="deleteFile(' + id + ')"><img class="tb_img" src="./img/tb/del_tb.jpg">删除...</a>'
            + '<a href="#" class="list-group-item tb_aa" onclick="showProjectListDiag(' + id + ')"><img class="tb_img" src="./img/tb/move_tb.jpg">移动...</a>'
            + '<a href="#" class="list-group-item tb_aa" onclick="renameProject(' + id + ')"><img class="tb_img" src="./img/tb/rename_tb.jpg">重命名</a>'
            + '</div>';
    $("#a_temp_id_" + id).popover({content: cont, html: true, placement: "right"});
    $("#a_temp_id_" + id).popover('show');
}

function getProjectListModal(result)
{
    var content;
    content = '<div class="modal-dialog">'

            + '<div class="modal-content">'
            + '<div class="modal-header">'
            + '<button type="button" class="close" onclick="closeModal()">&times;</button>'
            + '<h4 class="modal-title">请选择移动的文件位置</h4>'
            + '</div>'
            + '<div class="modal-body">'

            + result;
    content += '</div>'
            + '<div class="modal-footer">'
            + '<button type="button" class="btn btn-default" onclick="closeModal()">关闭</button>'

            + '<button type="button" class="btn btn-default" id="mp5" onclick="doMoveFile()">确定</button>'
            + '</div>'
            + '</div>'
            + '</div>';
    return content;
}

function getProjectListModalCopy(result)
{
    var content;
    content = '<div class="modal-dialog">'

            + '<div class="modal-content">'
            + '<div class="modal-header">'
            + '<button type="button" class="close" onclick="closeModal()">&times;</button>'
            + '<h4 class="modal-title">请选择你要粘贴的文件位置</h4>'
            + '</div>'
            + '<div class="modal-body">'

            + result;
    content += '</div>'
            + '<div class="modal-footer">'
            + '<button type="button" class="btn btn-default" onclick="closeModal()">关闭</button>'

            + '<button type="button" class="btn btn-default" id="mp6" onclick="doCopyFile()">确定</button>'
            + '</div>'
            + '</div>'
            + '</div>';
    return content;
}

function listCollaspA(id)
{
    var flag = $("#fList_a_" + id).attr("flag");
    if (flag === "0")
    {
        $("#fList_a_" + id).html('<i class="fa fa-minus" aria-hidden=true"></i>');
        $("#fList_a_" + id).attr("flag", "1");
        $("#filelist_nav_" + id).collapse("show");
    }
    else
    {
        $("#fList_a_" + id).html('<i class="fa fa-plus" aria-hidden=true"></i>');
        $("#fList_a_" + id).attr("flag", "0");
        $("#filelist_nav_" + id).collapse("hide");
    }

}

function showProjectListDiag(id)
{
    $.post("../../HandleGetProjectList", {pid: id}, function (result)
    {

        if (result === "0")
        {
            alert("获取项目列表失败，请重试！");

        }
        else if (result === "1")
        {
            alert("你暂时没有项目文件，不能进行移动！");
        }
        else
        {
            var dig = document.getElementById("myModal");
            dig.innerHTML = getProjectListModal(result);
            $('#myModal').modal({backdrop: 'static', keyboard: false});
        }
        //$("span").html(result);
    });
}

function showProjectListDiagCopy(id)
{
    $.post("../../HandleGetProjectList", {pid: id}, function (result)
    {

        if (result === "0")
        {
            alert("获取项目列表失败，请重试！");

        }
        else if (result === "1")
        {
            alert("你暂时没有项目文件，不能进行移动！");
        }
        else
        {
            var dig = document.getElementById("myModal");
            dig.innerHTML = getProjectListModalCopy(result);
            $('#myModal').modal({backdrop: 'static', keyboard: false});
//            $(".moveFileListUL").on("hide.bs.collapse", function () {
//                var id=$(this).attr("ids");
//                
//                $("#fList_a_"+id).html('<i class="fa fa-plus" aria-hidden=true"></i>');
//            });
//            $(".moveFileListUL").on("show.bs.collapse", function () {
//                var id=$(this).attr("ids");
//                
//                $("#fList_a_"+id).html('<i class="fa fa-minus" aria-hidden=true"></i>');
//            });
        }
        //$("span").html(result);
    });
}

function copyFileSelect(id)
{
    var pid = "fList" + id;
    var parent = document.getElementById("projectList");
    var cid = parent.getAttribute("currentActive");
    if (cid !== "0")
    {
        var tempid = "fList" + cid;
        var temp = document.getElementById(tempid);
        temp.style.background = "white";
        var pd = document.getElementById(pid);
        pd.style.background = "#E3F2FF";
        parent.setAttribute("currentActive", id);
    }
    else
    {
        var pd = document.getElementById(pid);
        pd.style.background = "#E3F2FF";
        parent.setAttribute("currentActive", id);
    }

}

function moveFileSelect(id)
{
    var pid = "fList" + id;
    var parent = document.getElementById("projectList");
    var cid = parent.getAttribute("currentActive");
    if (cid !== "0")
    {
        var tempid = "fList" + cid;
        var temp = document.getElementById(tempid);
        temp.style.background = "white";
        var pd = document.getElementById(pid);
        pd.style.background = "#E3F2FF";
        parent.setAttribute("currentActive", id);
    }
    else
    {
        var pd = document.getElementById(pid);
        pd.style.background = "#E3F2FF";
        parent.setAttribute("currentActive", id);
    }

}

function doMoveFile()
{
    var parent = document.getElementById("projectList");
    var id = parent.getAttribute("moveid");
    var target = parent.getAttribute("currentActive");
    var tname = "";
    buttonOperation("mp5", 0);
    $.post("../../HandleRenameCheck", {pid: id, tid: target}, function (re)
    {
        var flag = true;
        if (re.startsWith("1"))
        {
            flag = true;
        }
        else if (re.startsWith("2"))
        {
            var names = re.split("!");
            if (cf("目标文件夹存在相同文件名称，系统将会重名要移动的文件为--" + names[1] + ", 请确定你的选择？"))
            {
                flag = true;
                tname = names[1];
            }
            else
            {
                flag = false;
            }
        }
        else
        {
            flag = false;
        }
        if (flag)
        {
            var pp_id = parseInt(target);
            processFlag = true;
            if (pp_id === 0)
            {
                $.post("../../HandleMoveProject", {pid: id, targetid: target, name: tname}, function (result)
                {
                    if (result === "0")
                    {
                        buttonOperation("mp5", 1);
                        processFlag = false;
                        alert("移动成功");
                        //window.location.reload();
                        //updatePage(0, target, '');
                        $("#myModal").modal('hide');
                        var showOP = $("#allProjectList").attr("showOP");
                        var parentID = $("#allProjectList").attr("parentID");
                        var key = $("#allProjectList").attr("key");
                        updatePage(showOP, target, key);
                    }
                    else if (result === "2")
                    {
                        buttonOperation("mp5", 1);
                        processFlag = false;
                        alert("目标项目中已经存在相同的项目/文件名称，不用移动！");
                    }
                    else if (result === "1")
                    {
                        buttonOperation("mp5", 1);
                        processFlag = false;
                        alert("此项目/文件已经在目标项目/文件中，不用移动！");
                    }
                    else if (result === "3")
                    {
                        processFlag = false;
                        alert("目标项目不是文件夹/可以接受移动的项目");
                    }
                    else if (result === "-1")
                    {
                        processFlag = false;
                        alert("移动项目失败，请重试！");
                    }
                    else if (result === "inusing")
                    {
                        buttonOperation("mp5", 1);
                        processFlag = false;
                        alert("要移动的项目中，某些文件正在被编辑，请稍后再试");
                    }
                    //$("span").html(result);
                });
            }
            else
            {
                $.post("../../HandleGetRoleInfo", {pid: target}, function (result)
                {
                    if (result === "1" || result === "2")
                    {

                        alert("你没有权限移动到目标项目/文件");
                    }
                    else if (result === "0")
                    {

                        alert("数据库发生异常，请重新尝试");
                    }
                    else
                    {

                        $.post("../../HandleMoveProject", {pid: id, targetid: target, name: tname}, function (result)
                        {
                            if (result === "0")
                            {
                                buttonOperation("mp5", 1);
                                processFlag = false;
                                alert("移动成功");
                                //window.location.reload();
                                //updatePage(0, target, '');
                                $("#myModal").modal('hide');
                                var showOP = $("#allProjectList").attr("showOP");
                                var parentID = $("#allProjectList").attr("parentID");
                                var key = $("#allProjectList").attr("key");
                                updatePage(showOP, target, key);

                            }
                            else if (result === "2")
                            {
                                buttonOperation("mp5", 1);
                                processFlag = false;
                                alert("目标项目中已经存在相同的项目/文件名称，不用移动！");
                            }
                            else if (result === "1")
                            {
                                buttonOperation("mp5", 1);
                                processFlag = false;
                                alert("此项目/文件已经在目标项目/文件中，不用移动！");
                            }
                            else if (result === "3")
                            {
                                buttonOperation("mp5", 1);
                                processFlag = false;
                                alert("目标项目不是文件夹/可以接受移动的项目");
                            }
                            else if (result === "-1")
                            {
                                buttonOperation("mp5", 1);
                                processFlag = false;
                                alert("移动项目失败，请重试！");
                            }
                            else if (result === "inusing")
                            {
                                buttonOperation("mp5", 1);
                                processFlag = false;
                                alert("要移动的项目中，某些文件正在被编辑，请稍后再试");
                            }
                            //$("span").html(result);
                        });
                    }

                });
            }
        }
        else
        {
            alert("系统出现错误，请重新尝试");
        }
    });

}


function deleteFile(id)
{
    id = parseInt(id);
    if (id === 0)
    {
        if (cf("你确定删除此项目/文件吗？"))
        {
            deleteFileDone(id);
        }
    }
    else
    {
        $.post("../../HandleGetRoleInfo", {pid: id}, function (result)
        {
            if (result === "1")
            {
                alert("你没有权限创建项目文件");
            }
            else if (result === "0")
            {
                alert("数据库发生异常，请重新尝试");
            }
            else
            {
                if (cf("你确定删除此项目/文件吗？"))
                {
                    deleteFileDone(id);
                }

            }

        });
    }
}


function deleteFileDone(id)
{

    $.post("../../HandleRemoveProject", {pid: id, option: 1}, function (result)
    {

        if (result.startsWith("0"))
        {
            alert("删除项目/文件成功");
//            var ppid = $("#allProjectSection").attr("ppid");
//            var ids=result.split("?");
//            updatePage(0,ids[1],"");
            var showOP = $("#allProjectList").attr("showOP");
            var parentID = $("#allProjectList").attr("parentID");
            var key = $("#allProjectList").attr("key");
            updatePage(showOP, parentID, key);
        }
        else if (result === "inusing")
        {

            alert("要重名名的项目中，某些文件正在被编辑，请稍后再试");
        }
        else
        {
            alert("删除项目/文件失败，请重试");

        }
        //$("span").html(result);
    });
}

function clearProejctItem(id)
{
    $.post("../../HandleRemoveProject", {pid: id, option: 4}, function (result)
    {

        if (result === "0")
        {
            alert("清空项目/文件成功");
            //allProjectList
            var showOP = $("#allProjectList").attr("showOP");
            var parentID = $("#allProjectList").attr("parentID");
            var key = $("#allProjectList").attr("key");
            updatePage(showOP, parentID, key);
        }
        else
        {
            alert("清空项目/文件失败，请重试");

        }
        //$("span").html(result);
    });
}

function restoreAction(pid)
{
    if (cf("你确定要还原此项目/文件吗？"))
    {

        var ppid, name;
        $.post("../../HandleNameAndParentIDCheck", {pid: pid}, function (re)
        {
            var flag = true;
            if (re.startsWith("-1"))
            {
                flag = false;
            }
            else
            {
                var names = re.split("?");
                if (names[3] === "1")
                {
                    if (cf("目标文件夹已经不存在，系统会还原文件到我的Transtopia,请确定你的选择？"))
                    {
                        if (names[0] === "1")
                        {
                            if (cf("目标文件夹存在相同文件名称，系统将会重名要还原的文件为--" + names[2] + ", 请确定你的选择？"))
                            {
                                flag = true;
                                name = names[2];
                                ppid = names[1];
                            }
                        }
                        else
                        {
                            flag = true;
                            ppid = names[1];
                            name = names[2];
                        }
                    }
                    else
                    {
                        flag = false;
                    }
                }
                else
                {
                    if (names[0] === "1")
                    {
                        if (cf("目标文件夹存在相同文件名称，系统将会重名要还原的文件为--" + names[2] + ", 请确定你的选择？"))
                        {
                            flag = true;
                            name = names[2];
                            ppid = names[1];
                        }
                        else
                        {
                            flag = false;
                        }
                    }
                    else
                    {
                        flag = true;
                        ppid = names[1];
                        name = names[2];
                    }
                }

            }
            if (flag)
            {
                processFlag = true;
                $.post("../../HandleRemoveProject", {pid: pid, parentID: ppid, name: name, option: 2}, function (result)
                {

                    if (result === "-1")
                    {
                        processFlag = false;
                        alert("还复项目失败，请重试！");
                    }
                    else if (result === "3")
                    {
                        processFlag = false;
                        alert("此文件所在的文件夹已经被删除,不能进行还原");
                    }
                    else if (result === "0")
                    {
                        processFlag = false;
                        alert("还原成功");
                        var showOP = $("#allProjectList").attr("showOP");
                        var parentID = $("#allProjectList").attr("parentID");
                        var key = $("#allProjectList").attr("key");
                        updatePage(showOP, parentID, key);

                    }
                    else if (result === "2")
                    {
                        processFlag = false;
                        alert("此文件所在的文件夹已经存在相同名称的文件，不能进行还原");
                    }
                    //$("span").html(result);
                });
            }
        });
    }
}

function changeShareRole(userid, pid)
{
    var role = $("#croleValue_" + userid).val();
    role = parseInt(role);
    {
        if (role !== 0)
        {
            if (cf("你确定要更改此用户的权限吗？"))
            {
                buttonOperationClass("shareFileRoleClass", 0);
                buttonOperation("mp4", 0);
                processFlag = true;
                $.post("../../HandleRemoveShareFile", {uid: userid, pid: pid, role: role}, function (result)
                {

                    if (result === "0")
                    {
                        buttonOperationClass("shareFileRoleClass", 1);
                        processFlag = false;
                        alert("权限更改失败！");
                    }
                    else
                    {
                        if (role === 4)
                        {
                            buttonOperation("mp4", 1);
                            buttonOperationClass("shareFileRoleClass", 1);
                            processFlag = false;
                            alert("删除用户成功");
                            $("#share_" + userid).remove();
                            var showOP = $("#allProjectList").attr("showOP");
                            var parentID = $("#allProjectList").attr("parentID");
                            var key = $("#allProjectList").attr("key");
                            updatePage(showOP, parentID, key);
                        }
                        else {
                            buttonOperation("mp4", 1);
                            buttonOperationClass("shareFileRoleClass", 1);
                            processFlag = false;
                            alert("权限更改成功");
                            var cc = "";
                            cc += '<option value="0">更改权限</option>';
                            if (role !== 1)
                            {
                                cc += '<option value="1">只读</option>';
                            }
                            if (role !== 2)
                            {
                                cc += '<option value="2">读写</option>';
                            }
                            if (role !== 3)
                            {
                                cc += '<option value="3">管理员</option>';
                            }
                            if (role !== 4)
                            {
                                cc += '<option value="4">删除</option>';
                            }
                            var s = document.getElementById("croleValue_" + userid);
                            s.innerHTML = cc;
                            var p = document.getElementById("croleName_" + userid);
                            if (role === 1)
                            {
                                role = "允许只读";
                            }
                            else if (role === 2)
                            {
                                role = "允许读写";
                            }
                            else if (role === 3)
                            {
                                role = "管理员";
                            }
                            p.innerHTML = role;
                            var showOP = $("#allProjectList").attr("showOP");
                            var parentID = $("#allProjectList").attr("parentID");
                            var key = $("#allProjectList").attr("key");
                            updatePage(showOP, parentID, key);
                        }
                    }
                    //$("span").html(result);
                });
            }
        }
    }
}


function renameProject(id, name)
{
    id = parseInt(id);
    if (id === 0)
    {
        getReNameContent(id);
    }
    else
    {

        $.post("../../HandleGetRoleInfo", {pid: id}, function (result)
        {
            if (result === "1")
            {
                alert("你没有权限创建项目文件");
            }
            else if (result === "0")
            {
                alert("数据库发生异常，请重新尝试");
            }
            else
            {
                getReNameContent(id, name);
            }

        });
    }
}


function getReNameContent(pid, name)
{
    var content;
    content = '<div class="modal-dialog">'

            + '<div class="modal-content">'
            + '<div class="modal-header">'
            + '<button type="button" class="close" onclick="closeModal()">&times;</button>'
            + '<h4 class="modal-title">重命名操作</h4>'
            + '</div>'
            + '<div class="modal-body">'

            + '<span>当前的文件名称:</span>&nbsp;&nbsp;<input id="ff_name" value="' + name + '" disabled><br/><br/>'
            + '<span>修改的文件名称:</span>&nbsp;&nbsp;<input id="mm_name" value=""><br/>';
    content += '</div>'
            + '<div class="modal-footer">'
            + '<button type="button" class="btn btn-default" id="mp8" onclick="changeNameProject(\'' + pid + '\')">确定</button>'
            + '</div>'
            + '</div>'
            + '</div>';

    var dig = document.getElementById("myModal");
    dig.innerHTML = content;
    $('#myModal').modal({backdrop: 'static', keyboard: false});
}

function modifySurveyProject(pid, name)
{
    $.post("../../HandleGetSurveyProjectInfoByPID", {pid: pid}, function (result)
    {
        if (result !== "0")
        {
            var obj = JSON.parse(result);
            var content;
            content = '<div class="modal-dialog">'

                    + '<div class="modal-content">'
                    + '<div class="modal-header">'
                    + '<button type="button" class="close" onclick="closeModal()">&times;</button>'
                    + '<h4 class="modal-title">编辑项目基本信息</h4>'
                    + '</div>'
                    + '<div class="modal-body">'
                    + '<table class="table table-condensed" style="border:none; text-align: left;">'
                    + '<tbody>'
                    + '<tr >'
                    + '<td style="border:none">项目名称:</td>'
                    + '<td style="border:none"><input type="text" name="pName" id="p_Name" value=""></td>'
                    + '</tr>'
                    + '<tr style="border:none">'
                    + '<td style="border:none">项目描述:</td>'
                    + '<td style="border:none"><textarea name="pName" id="p_Description"></textarea></td>'
                    + '</tr>'
                    + '<tr>'
                    + '<td style="border:none">项目地点:</td>'
                    + '<td style="border:none">'
                    + '<div id="city2">'
                    + '<select name="province" id="province" class="prov" style="width:100px;">'
                    + '</select>'
                    + '<select name="city" id="city" class="city"  disabled="disabled" style="width:100px;">'
                    + '</select>'
                    + '<select name="area" id="town" class="dist"  disabled="disabled" style="width:100px;">'
                    + '</select>'
                    + '</div>'
                    + '</td>'
                    + '</tr>'
                    + '<tr>'
                    + '<td style="border:none">项目预算:</td>'
                    + '<td style="border:none"><input type="text" name="pPrice" id="p_budget">单位:元</td>'
                    + '</tr>'
                    + '<tr>'
                    + '<td style="border:none">项目时间节点:</td>'
                    + '<td style="border:none"><input  name="ptime_s" id="pstime" type="date"> 到'
                    + '<input type="date" name="ptime_e" id="petime"></td>'
                    + '</tr>'
                    + '</tbody>'
                    + '</table>';
            content += '</div>'
                    + '<div class="modal-footer">'
                    + '<button type="button" class="btn btn-default" onclick="modifySurveyProject_Do(\'' + pid + '\',\''+obj.id+ '\',\''+obj.parentID+'\')">修改</button>'
                    + '</div>'
                    + '</div>'
                    + '</div>';

            var dig = document.getElementById("myModal");
            dig.innerHTML = content;
            $("#p_Name").val(obj.name);
            $("#p_Description").val(obj.description);
            $("#province").val(obj.province);
            $("#city").val(obj.city);
            if (obj.town !== "")
            {
                $("#city2").citySelect({prov: obj.province, city: obj.city, dist: obj.town, nodata: "none"});
            }
            else
            {
                $("#city2").citySelect({prov: obj.province, city: obj.city, nodata: "none"});
            }
            $("#pstime").val(obj.stime);
            $("#petime").val(obj.etime);
            $("#p_budget").val(obj.budget);
            $('#myModal').modal({backdrop: 'static', keyboard: false});
        }
        else
        {
            alert("出现错误，请重试");
        }
    });

}


function modifySurveyProject_Do(pid, sid, parentID)
{
    var name = $("#p_Name").val();
    var description = $("#p_Description").val();
    var province = $("#province").val();
    var city = $("#city").val();
    var town = $("#town").val();
    if (town === null)
    {
        town = "";
    }
    var stime = $("#pstime").val();
    var etime = $("#petime").val();
    var budget = $("#p_budget").val();
    var data = '{"stime":"' + stime + '","etime":"' + etime + '","name":"' + name + '","id":"' + sid + '","budget":"' + budget + '","province":"' + province + '","city":"' + city + '","town":"' + town + '","pid":"' + pid + '","parentID":"' + parentID + '","description":"' + description + '"}';
    if (checkFileNameFormat(name))
    {
        $.post("../../HandleModifySurveyProject", {data: data}, function (result)
        {
            if (result === "-1")
            {
                alert("修改项目信息失败，请重新尝试！");
            }
            else if (result === "2")
            {
                alert("此项目名称已经存在，请重新命名！");
            }
            else if(result==="inusing")
            {
                alert("要修改的项目中，某些文件正在被编辑，请稍后再试");
            }
            else
            {
                alert("修改项目信息成功");
                $('#myModal').modal("hide");
                var showOP = $("#allProjectList").attr("showOP");
                var parentID = $("#allProjectList").attr("parentID");
                var key = $("#allProjectList").attr("key");
                updatePage(showOP, parentID, key);
            }
        });
    } else
    {
        alert("你输入的项目名称含有不合法字符，请用数字或者字母表示。");
    }
}

function changeNameProject(pid)
{
    var onames = $("#ff_name").val();
    onames = onames.split(".");
    var oname = "";
    var ftype = "";
    if (onames.length > 1)
    {
        ftype = "." + onames[onames.length - 1];
        oname = onames[0];
    }
    else
    {
        oname = onames[0];
    }
    var name = $("#mm_name").val();
    name = name.trim();
    if (oname !== name)
    {
        if (checkFileNameFormat(name) && !name.includes('.'))
        {
            name = name + ftype;
            buttonOperation("mp8", 0);
            processFlag = true;
            $.post("../../HandleRenameProject", {pid: pid, name: name}, function (result)
            {

                if (result === "0")
                {
                    buttonOperation("mp8", 1);
                    processFlag = false;
                    alert("更改项目名称失败，请重试！");
                }

                else if (result === "1")
                {
                    buttonOperation("mp8", 1);
                    processFlag = false;
                    alert("项目名称已经存在，请重新命名！");
                }
                else if (result === "2")
                {
                    buttonOperation("mp8", 1);
                    processFlag = false;
                    alert("数据库异常，请重新操作！");
                }
                else if (result.startsWith("3"))
                {
                    buttonOperation("mp8", 1);
                    processFlag = false;
                    alert("重新命名成功");

                    var showOP = $("#allProjectList").attr("showOP");
                    var parentID = $("#allProjectList").attr("parentID");
                    var key = $("#allProjectList").attr("key");
                    updatePage(showOP, parentID, key);
                    $("#myModal").modal('hide');
                }
                else if (result === "inusing")
                {
                    buttonOperation("mp8", 1);
                    processFlag = false;
                    alert("要重名名的项目中，某些文件正在被编辑，请稍后再试");
                }
                //$("span").html(result);
            });
        }
        else
        {
            alert("你输入的文件名称格式不正确，请用数字，英文，下划线或者汉字表示");
        }
    }
    else
    {
        alert("你输入的文件名称和原文件名称一致，请重新输入");
    }
}

function doSearch()
{
    var input = document.getElementById("search_text");
    var key = input.value;
    if (key !== "")
    {
        updatePage(100, 0, key);
    }
    else
    {
        alert("请输入查询的关键字");
    }
}

function OpenInNewTabWinBrowser(url) {
    var win = window.open(url, '_blank');
    win.focus();
}

function doSearch1()
{

    var input = document.getElementById("search_text");
    var key = input.value;
    if (key !== "")
    {
        // $("#searchResults").show();
        $.post("../../HandleSearchProject", {key: key}, function (result)
        {

            if (result === "0")
            {
                var parent = document.getElementById("ul_searchList");
                parent.innerHTML = "";
                var item = document.createElement("li");
                item.setAttribute("class", "searchListItem");
                //item.setAttribute("style", "width:180px;height:20px;");
                //item.setAttribute("class", "list-group-item");
                item.setAttribute("role", "presentation");

                item.setAttribute("href", "javascript:void(0)");
                item.innerHTML = "<span class='searchItemClass'>没有匹配的结果</span>";
                parent.appendChild(item);
                $("#search_text").dropdown("toggle");
            }
            else
            {
                var ps = JSON.parse(result);
                var parent = document.getElementById("ul_searchList");
                parent.innerHTML = "";
                for (var i = 0; i < ps.length; i++)
                {
                    var item = document.createElement("li");
                    item.setAttribute("class", "searchListItem");
                    //item.setAttribute("style", "width:180px;height:20px;");
                    //item.setAttribute("role", "presentation");
                    var hef;
                    if (ps[i].type === 2)
                    {
                        var name = ps[i].name;
                        hef = '../../../TData/' + ps[i].path + '/' + ps[i].id + name;
                        item.setAttribute("onclick", "OpenInNewTabWinBrowser('showPage.jsp?path=" + hef + "')");
                        item.innerHTML = "<span class='searchItemClass'>" + name + "</span>";
                    }
                    else if (ps[i].type === 1)
                    {
                        var name = ps[i].name;
                        //hef = '<a role="menuitem" tabindex="-1" href="index.jsp?ppid=' + ps[i].id + '">' + ps[i].name + '</a>';
                        item.setAttribute("onclick", "updatePage(0,'" + ps[i].id + "','')");
                        item.innerHTML = "<span class='searchItemClass'>" + name + "</span>";
                    }
                    else
                    {
                        var name = ps[i].name;
                        //hef = '<a role="menuitem" tabindex="-1" onclick="window.parent.cnewTag(2, \'' + ps[i].id + '\',\'' + ps[i].name + '\')" href="javascript:void(0)">' + ps[i].name + '</a>';
                        item.setAttribute("onclick", "window.parent.cnewTag(2, '" + ps[i].id + "','" + name + "')");
                        item.innerHTML = "<span class='searchItemClass'>" + name + "</span>";
                    }

                    parent.appendChild(item);
                }
                $("#search_text").dropdown("toggle");

            }
        });
    }
    else
    {
        var parent = document.getElementById("ul_searchList");
        parent.innerHTML = "";
        var item = document.createElement("li");
        item.setAttribute("class", "searchListItem");
        item.setAttribute("href", "javascript:void(0)");
        item.innerHTML = "<span class='searchItemClass'>输入你要查询的内容</span>";
        parent.appendChild(item);
        $("#search_text").dropdown("toggle");
    }
}


function sbox(option, name) {
    if (option === 1)
    {
        $("#dialog-message").dialog({
            modal: true,
            buttons: {
                Ok: function () {
                    $(this).dialog("close");
                }
            }
        });
    }
    else if (option === 2)
    {
        $("#dialog-confirm").dialog({
            resizable: false,
            height: "auto",
            width: 400,
            modal: true,
            buttons: {
                name: function () {
                    $(this).dialog("close");
                    return true;
                },
                Cancel: function () {
                    $(this).dialog("close");
                    return false;
                }
            }
        });
    }

}

function cf(name) {
    var r = confirm(name);
    return r;
}


function sortTh(item) {
    var table = item.parents('table').eq(0);
    var rows = table.find('tr:gt(0)').toArray().sort(comparer(item.index()));
    item.asc = !item.asc;
    if (!item.asc) {
        rows = rows.reverse();
    }
    for (var i = 0; i < rows.length; i++) {
        table.append(rows[i]);
    }
}
function comparer(index) {
    return function (a, b) {
        var valA = getCellValue(a, index), valB = getCellValue(b, index);
        return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.localeCompare(valB);
    };
}
function getCellValue(row, index) {
    return $(row).children('td').eq(index).html();
}

function checkFileNameFormat(name)
{
    var flag = name.search(/^[$_a-zA-Z0-9\u4e00-\u9fa5][$_()\-a-zA-Z0-9.\u4e00-\u9fa5\s]*$/);
    if (flag === -1)
    {
        return false;
    }
    else
    {
        var names = name.split(".");
        if (names.length > 2)
        {
            return false;
        }
        if (name.endsWith("."))
        {
            return false;
        }
        return true;
    }

}

function loadFileButton()
{
    $('#uploadFile_mine').trigger('click');
    // $("#uploadFile_mine").click();
}

function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}


function doCopyFile()
{
    var parent = document.getElementById("projectList");
    var id = parent.getAttribute("moveid");
    var target = parent.getAttribute("currentActive");
    var tname = "";
    buttonOperation("mp6", 0);
    $.post("../../HandleRenameCheck", {pid: id, tid: target}, function (re)
    {
        var flag = true;
        if (re.startsWith("1"))
        {
            flag = true;
        }
        else if (re.startsWith("2"))
        {
            var names = re.split("!");
            if (cf("目标文件夹存在相同文件名称，系统将会重名要复制的文件为--" + names[1] + ", 请确定你的选择？"))
            {
                flag = true;
                tname = names[1];
            }
            else
            {
                flag = false;
            }
        }
        else
        {
            flag = false;
        }
        if (flag)
        {
            var pp_id = parseInt(target);
            processFlag = true;
            if (pp_id === 0)
            {
                $.post("../../HandleCopyProject", {pid: id, targetid: target, name: tname}, function (result)
                {
                    if (result === "0")
                    {
                        buttonOperation("mp6", 1);
                        processFlag = false;
                        alert("复制成功");
                        $("#myModal").modal('hide');
                        var showOP = $("#allProjectList").attr("showOP");
                        //var parentID=$("#allProjectList").attr("parentID");
                        var key = $("#allProjectList").attr("key");
                        updatePage(showOP, target, key);
                    }
                    else if (result === "2")
                    {
                        buttonOperation("mp6", 1);
                        processFlag = false;
                        alert("目标项目中已经存在相同的项目/文件名称，不用移动！");
                    }
                    else if (result === "1")
                    {
                        buttonOperation("mp6", 1);
                        processFlag = false;
                        alert("此项目/文件已经在目标项目/文件中，不用复制！");
                    }
                    else if (result === "3")
                    {
                        buttonOperation("mp6", 1);
                        processFlag = false;
                        alert("目标项目不是文件夹/可以接受复制的项目");
                    }
                    else if (result === "-1")
                    {
                        buttonOperation("mp6", 1);
                        processFlag = false;
                        alert("复制项目失败，请重试！");
                    }
                    else if (result === "inusing")
                    {
                        buttonOperation("mp6", 1);
                        processFlag = false;
                        alert("复制的项目中，某些文件正在被编辑，请稍后再试");
                    }
                    //$("span").html(result);
                });
            }
            else
            {
                $.post("../../HandleGetRoleInfo", {pid: target}, function (result)
                {
                    if (result === "1" || result === "2")
                    {
                        alert("你没有权限移动到目标项目/文件");
                    }
                    else if (result === "0")
                    {
                        alert("数据库发生异常，请重新尝试");
                    }
                    else
                    {
                        $.post("../../HandleCopyProject", {pid: id, targetid: target, name: tname}, function (result)
                        {
                            if (result === "0")
                            {
                                buttonOperation("mp6", 1);
                                processFlag = false;
                                alert("复制成功");
                                $("#myModal").modal('hide');
                                var showOP = $("#allProjectList").attr("showOP");
                                //var parentID=$("#allProjectList").attr("parentID");
                                var key = $("#allProjectList").attr("key");
                                updatePage(showOP, target, key);
                            }
                            else if (result === "2")
                            {
                                buttonOperation("mp6", 1);
                                processFlag = false;
                                alert("目标项目中已经存在相同的项目/文件名称，不用复制！");
                            }
                            else if (result === "1")
                            {
                                buttonOperation("mp6", 1);
                                processFlag = false;
                                alert("此项目/文件已经在目标项目/文件中，不用复制！");
                            }
                            else if (result === "3")
                            {
                                buttonOperation("mp6", 1);
                                processFlag = false;
                                alert("目标项目不是文件夹/可以接受复制的项目");
                            }
                            else if (result === "-1")
                            {
                                buttonOperation("mp6", 1);
                                processFlag = false;
                                alert("复制项目失败，请重试！");
                            }
                            else if (result === "inusing")
                            {
                                buttonOperation("mp6", 1);
                                processFlag = false;
                                alert("复制的项目中，某些文件正在被编辑，请稍后再试");
                            }
                            //$("span").html(result);
                        });
                    }

                });
            }
        }
        else
        {
            alert("系统出现错误，请重新尝试");
        }
    });

}


function updatePage(showOP, ppid, key)
{
    $.post("../../HandleGetPage", {ppid: ppid, showOP: showOP, key: key}, function (result)
    {
        if (result === "0")
        {
            alert("系统出现错误，请稍后再试");
        }
        else
        {
            var info = JSON.parse(result);

            $("#projectHeadBar").empty();
            $("#projectHeadBar").html(info.head);
            $("#allProjectSection").empty();
            $("#allProjectSection").html(info.content);
            $("#allProjectSection").attr("ppid", info.ppid);
            var ps = info.ps;
            $("#ptotalsize").text(ps.total_p_size);
            $("#p3size").text(ps.intersection_size);
            $("#p4size").text(ps.seg_size);
            $("#p5size").text(ps.light_size);
            $("#p21size").text(ps.text_size);
            $("#p22size").text(ps.image_size);
            $("#p23size").text(ps.pdf_size);
            $("#p24size").text(ps.word_size);
            $("#p25size").text(ps.excel_size);
            $("#p26size").text(ps.ppt_size);
            $("#p100size").text(ps.d_size);

            $('.f_table_thc').click(function () {
                var table = $(this).parents('table').eq(0);
                var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()));
                this.asc = !this.asc;
                if (!this.asc) {
                    rows = rows.reverse();
                }
                for (var i = 0; i < rows.length; i++) {
                    table.append(rows[i]);
                }
            });
        }
    });
}

function doSearchKey(event)
{
    event = window.event;
    if (event.which === 13) {
        doSearch();
    }
    else
    {
        doSearch1();
    }

}

function downloadFile(url, name)
{
    var link = document.createElement("a");
    link.download = name;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
}

function closeModal()
{
    if (processFlag === true)
    {
        alert("对不起，操作正在进行中，你不能关闭此页面，请安心等待");
    }
    else
    {
        $("#myModal").modal('hide');
    }
}

function closeFileModal()
{
    if (processFlag === true)
    {
        alert("对不起，操作正在进行中，你不能关闭此页面，请安心等待");
    }
    else
    {
        $("#myFileModal").modal('hide');
    }
}

function buttonOperation(id, option)
{
    if (option === 0)
    {
        $('#' + id).prop('disabled', true);
    }
    else
    {
        $('#' + id).prop('disabled', false);
    }

}

function buttonOperationClass(id, option)
{
    if (option === 0)
    {
        $('.' + id).prop('disabled', true);
    }
    else
    {
        $('.' + id).prop('disabled', false);
    }

}

function minFileModal()
{
    $("#myFileModal").hide();
}

function canDoFileOpeartion()
{
    var showop = $("#allProjectList").attr("showOP");
    //var ppid= $("#allProjectList").attr("showOP");
    if (showop !== "0")
    {
        return false;
    }
    else
    {
        return true;
    }
}

function showDynamicMessages()
{
    var status = $('#show_dynamic_message').attr("status");
    if (status === "0")
    {
        $('#show_dynamic_message').dropdown();
        $('#show_dynamic_message').attr("status", "1");
    }
    else
    {
        $('#show_dynamic_message').dropdown("toggle");
        $('#show_dynamic_message').attr("status", "0");
    }

}


var monitorMessage;
function monitorMessageUpdate()
{
    $.post("../../HandleShowMessage", {option: 1}, function (result)
    {
        if (result === "")
        {
            monitorMessage = setInterval(getLocalMessageUpdate, 3000);
        }
        else
        {
            var info = JSON.parse(result);

            $("#dynamic_message").attr("number", info.length);
            var parent = document.getElementById("dynamic_message");
            parent.innerHTML = "";
            for (var i = 0; i < info.length; i++)
            {
                var li = document.createElement("li");
                var content = '<a href="javascript:void(0);">' + info[i].mtime + '&nbsp;' + info[i].message + '</a>';
                li.innerHTML = content;
                parent.appendChild(li);
            }
            monitorMessage = setInterval(getLocalMessageUpdate, 3000);

        }
    });

}

function getLocalMessageUpdate()
{
    $.post("../../HandleShowMessage", {option: 1}, function (result)
    {
        if (result === "")
        {
            $("#message_number").hide();
            $("#dynamic_message").html("");
        }
        else
        {
            var info = JSON.parse(result);
            var csize = $("#dynamic_message").attr("number");
            csize = parseInt(csize);
            if (csize < info.length)
            {
                $("#dynamic_message").attr("numberT", info.length);
                var diff = info.length - csize;
                $("#message_number").text(diff);
                $("#message_number").show();
                var parent = document.getElementById("dynamic_message");
                parent.innerHTML = "";
                for (var i = 0; i < info.length; i++)
                {
                    var li = document.createElement("li");
                    var content = '<a href="javascript:void(0);">' + info[i].mtime + '&nbsp;' + info[i].message + '</a>';
                    li.innerHTML = content;
                    parent.appendChild(li);
                }
            }
        }
    });
}
