/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var buttonProcessFlag = false;


var monitor1 = null;
var monitor2 = null, monitor3 = null;
var timeRefresh = 1 * 60 * 1000;
function monitorProjectUpdate(pid)
{
    $.post("../../HandleUpdateCurrentState", {id: pid, option: 1}, function (result)
    {
        if (result === "0")
        {
            alert("系统出现错误，请重试！");


        }
        else if (result === "1")
        {

        }
    });
}

function monitorProject()
{
    var pid = $("#bodyOne").attr("pid");
    pid = parseInt(pid);
    if (pid !== 0)
    {
        $.post("../../HandleAddCurrentState", {id: pid, option: 1}, function (result)
        {

            if (result === "0")
            {
                alert("系统出现错误，请重试！");

            }
            else if (result === "1")
            {
                monitor1 = setInterval(function () {
                    monitorProjectUpdate(pid);
                }, timeRefresh);
            }
        });
    }
}

function monitorSTMIDUpdate(stmid)
{

    $.post("../../HandleUpdateCurrentState", {id: stmid, option: 2}, function (result)
    {

        if (result === "0")
        {
            alert("系统出现错误，请重试！");


        }
        else if (result === "1")
        {
        }
    });
}

function monitorSTMID(stmid)
{
    stmid = parseInt(stmid);
    if (stmid !== 0)
    {
        $.post("../../HandleAddCurrentState", {id: stmid, option: 2}, function (result)
        {

            if (result === "0")
            {
                alert("系统出现错误，请重试！");

            }
            else if (result === "1")
            {
                monitor2 = setInterval(function () {
                    monitorSTMIDUpdate(stmid);
                }, timeRefresh);
            }
        });
    }
}

function monitorAssignUpdate(spid)
{
    $.post("../../HandleUpdateCurrentState", {id: spid, option: 3}, function (result)
    {

        if (result === "0")
        {
            alert("系统出现错误，请重试！");


        }
        else if (result === "1")
        {
        }
    });
}

function monitorAssign()
{
    var spid = $("#bodyOne").attr("spid");
    spid = parseInt(spid);
    if (spid !== 0)
    {
        $.post("../../HandleAddCurrentState", {id: spid, option: 3}, function (result)
        {

            if (result === "0")
            {
                alert("系统出现错误，请重试！");

            }
            else if (result === "1")
            {
                monitor3 = setInterval(function () {
                    monitorAssignUpdate(spid);
                }, timeRefresh);
            }
        });
    }
}

function stopMonitorSTMID()
{
    if (monitor2 !== null)
    {
        var stmid = $("#bodyOne").attr("stmid");
        $("#bodyOne").attr("stmid", "0");
        clearInterval(monitor2);
        monitor2 = null;
        if (stmid !== "0")
        {

            $.post("../../HandleRemoveCurrentState", {id: stmid, option: 2}, function (result)
            {

                if (result === "0")
                {
                    alert("系统出现错误，请重试！");

                }
            });
        }
    }
}

function stopMonitorAssign()
{
    if (monitor3 !== null)
    {
        var spid = $("#bodyOne").attr("spid");
        clearInterval(monitor3);
        monitor3 = null;
        if (spid !== "0")
        {

            $.post("../../HandleRemoveCurrentState", {id: spid, option: 2}, function (result)
            {

                if (result === "0")
                {
                    alert("系统出现错误，请重试！");

                }
            });
        }
    }
}

function showSurveyOption(option)
{
    stopMonitorSTMID();
    if (option !== 3)
    {
        stopMonitorAssign();
    }
    if (option === 1)
    {
        //createIntersectionModel1();
        var spid = $("#mainSurveyPage").attr("spid");
        if (spid === "0")
        {
            getBasciInfoPage(1);
        }
        else
        {
            getBasciInfoPage(2);
        }

    }
    else if (option === 0)
    {
        $("#mapShowSection").show();
        $("#mainSurveyPage").hide();
        $("#nav_tb_map").hide();
        loadTaskModelsInfo();
    }
    else if (option === 2)
    {
        $("#mapShowSection").show();
        $("#mainSurveyPage").hide();
        $("#nav_tb_map").show();
        loadTaskModelsInfo();
    }
    else if (option === 3)
    {
        monitorAssign();
    }


}

function closeModal()
{
    if (buttonProcessFlag === true)
    {
        alert("对不起，操作正在进行中，你不能关闭此页面，请安心等待");
    }
    else
    {
        $("#myModalSurvey").modal('hide');
    }
}

function buttonOperation(id, option)
{
    if (option === 0)
    {
        buttonProcessFlag = true;
        $('#' + id).prop('disabled', true);
    }
    else
    {
        buttonProcessFlag = false;
        $('#' + id).prop('disabled', false);
    }

}

//Basic Info Section

function save_basic_info()
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
    var pid = $("#mainSurveyPage").attr("pid");
    var map = province + city + town;
    var sid = $("#mainSurveyPage").attr("spid");
    var parentID = $("#mainSurveyPage").attr("parentID");
    var data = '{"stime":"' + stime + '","etime":"' + etime + '","name":"' + name + '","id":"' + sid + '","budget":"' + budget + '","province":"' + province + '","city":"' + city + '","town":"' + town + '","pid":"' + pid + '","parentID":"' + parentID + '","description":"' + description + '"}';

    if (checkFileNameFormat(name))
    {
        buttonOperation("smp5", 0);
        $.post("../../HandleAddSurveyProject", {data: data}, function (result)
        {
            if (result === "-1")
            {
                buttonOperation("smp5", 1);
                alert("创建的新的项目失败，请重新尝试！");
            }
            else if (result === "2")
            {
                buttonOperation("smp5", 1);
                alert("此项目名称已经存在，请重新命名！");
            }
            else
            {
                buttonOperation("smp5", 1);
                alert("已经保存信息成功");
                $("#sp_title").text(name);
                var info = result.split("?");
                $("#mainSurveyPage").attr("spid", info[0]);
                $("#mainSurveyPage").attr("pid", info[1]);
                $("#bodyOne").attr("spid", info[0]);
                $("#bodyOne").attr("pid", info[1]);
                theLocation(map);
            }
        });
    } else
    {
        alert("你输入的项目名称含有不合法字符，请用数字或者字母表示。");
    }
}

function theLocation(value) {
    map.centerAndZoom(value, 11);
}

function getProjectListModal(result)
{
    var content;
    content = '<div class="modal-dialog">'

            + '<div class="modal-content">'
            + '<div class="modal-header">'
            + '<button type="button" class="close" onclick="closeModal()">&times;</button>'
            + '<h4 class="modal-title">请选择存储项目的位置</h4>'
            + '</div>'
            + '<div class="modal-body">'

            + result;
    content += '</div>'
            + '<div class="modal-footer">'
            + '<button type="button" class="btn btn-default" onclick="closeModal()">关闭</button>'

            + '<button type="button" class="btn btn-default" id="smp5" onclick="doMoveFile()">确定</button>'
            + '</div>'
            + '</div>'
            + '</div>';
    return content;

}

function showProjectListDiag()
{
    var id = $("#mainSurveyPage").attr("pid");
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
            var dig = document.getElementById("myModalSurvey");
            dig.innerHTML = getProjectListModal(result);
            $('#myModalSurvey').modal({backdrop: 'static', keyboard: false});
        }
        //$("span").html(result);
    });
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
    var target = parent.getAttribute("currentActive");
    $("#mainSurveyPage").attr("parentID", target);
    var id = $("#mainSurveyPage").attr("pid");
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
            if (cf("目标文件夹存在相同项目名称，系统将会重名要移动的项目为--" + names[1] + ", 请确定你的选择？"))
            {
                flag = true;
                $("#p_Name").val(names[1]);
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
            $.post("../../HandleProjectPath", {pid: target}, function (re1)
            {
                if (re1 === "0")
                {
                    alert("系统出现错误，请重新尝试");
                }
                else
                {
                    $("#p_path").val(re1);
                    $('#myModalSurvey').modal("hide");
                }
            });
        }
        else
        {
            alert("系统出现错误，请重新尝试");
        }
    });

}

function getBasciInfoPage(option)
{
    $("#mapShowSection").hide();
    $("#mainSurveyPage").show();
    var content = "";
    content += '<div  style="text-align: left" id="basic_project_info" stid="0">'
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
            + '<td style="border:none"><input type="text" name="pPrice" id="p_budget"></td>'
            + '</tr>'
            + '<tr>'
            + '<td style="border:none">项目时间节点:</td>'
            + '<td style="border:none"><input  name="ptime_s" id="pstime" type="date"> 到'
            + '<input type="date" name="ptime_e" id="petime"></td>'
            + '</tr>'
            + '<tr>'
            + '<td style="border:none">项目存储位置:</td>'
            + '<td style="border:none"><input type="text" name="pName" id="p_path" value="">&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" class="btn btn-success" onclick="showProjectListDiag();">浏览</button></td>'
            + '</tr>'
            + '<tr>'
            + '<td colspan="2" style="border:none"><button type="button" class="btn btn-success" onclick="save_basic_info()">确定</button></td>'
            + '</tr>'
            + '</tbody>'
            + '</table>'
            + '</div>';
    if (option === 1)//create Project
    {
        $("#mainSurveyPage").html(content);
        $("#city2").citySelect({prov: "北京", nodata: "none"});
        var pid = $("#mainSurveyPage").attr("pid");
        pid = parseInt(pid);
        if (pid !== 0)
        {
            $.post("../../HandleGetProjectInfo", {pid: pid}, function (re)
            {
                if (re === "0")
                {
                    alert("系统出现错误，请重新尝试！");
                }
                else
                {
                    var obj = JSON.parse(re);
                    if (obj !== null)
                    {
                        //$("#mainSurveyPage").html(content);
                        $("#p_Name").val(obj.name);
                        $("#p_path").val(obj.abPath);
                        $("#mainSurveyPage").attr("parentID", obj.parentID);
                    }
                }
            });
        }
    }
    else if (option === 2)//get project
    {
        var sid = $("#mainSurveyPage").attr("spid");
        $.post("../../HandleGetSurvey_Project_BasicInfo", {sid: sid}, function (re)
        {
            if (re === "0")
            {
                alert("系统出现错误，请重新尝试！");
            }
            else
            {
                var obj = JSON.parse(re);
                if (obj !== null)
                {
                    $("#mainSurveyPage").html(content);
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
                    $("#mainSurveyPage").attr("parentID", obj.parentID);
                    $("#pstime").val(obj.stime);
                    $("#petime").val(obj.etime);
                    $("#p_budget").val(obj.budget);
                    $("#p_path").val(obj.path);
                }
            }
        });
    }


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
        if (name.includes("."))
        {
            return false;
        }
        return true;
    }

}


//mapSection
//
//


function MyControl() {
    // 设置默认停靠位置和偏移量  
    this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;//设置控件默认位置
    this.defaultOffset = new BMap.Size(300, 23);//设置偏移
}

function selectIntersection()
{
    //drawSeg.close();
    var flag = $("#road_intersection_id").attr("flag");
    if (flag === "0")
    {
        $("#road_intersection_id").attr("flag", "1");
        $("#road_seg_id").attr("flag", "0");
        map.setDefaultCursor("crosshair");

        var objP = document.getElementById("road_intersection_id");
        objP.setAttribute("class", "mapICONBorder");

        var objL = document.getElementById("road_seg_id");
        objL.setAttribute("class", "mapICON");


    }
    else
    {
        var objP = document.getElementById("road_intersection_id");
        objP.setAttribute("class", "mapICON");
        $("#road_intersection_id").attr("flag", "0");
        $("#road_seg_id").attr("flag", "0");

    }
}

function selectLight()
{
    drawSeg.close();
    var flag = $("#road_light_id").attr("flag");
    if (flag === "0")
    {
        $("#road_intersection_id").attr("flag", "0");
        $("#road_light_id").attr("flag", "1");
        $("#road_seg_id").attr("flag", "0");
        map.setDefaultCursor("crosshair");
        var objP = document.getElementById("road_intersection_id");
        objP.setAttribute("class", "mapICON");

        var objL = document.getElementById("road_seg_id");
        objL.setAttribute("class", "mapICON");


    }
    else
    {
        var objS = document.getElementById("road_light_id");
        objS.setAttribute("class", "mapICON");
        $("#road_intersection_id").attr("flag", "0");
        $("#road_light_id").attr("flag", "0");
        $("#road_seg_id").attr("flag", "0");
    }

}

function selectLaneSeg()
{
    var flag = $("#road_seg_id").attr("flag");
    if (flag === "0")
    {

        $("#road_intersection_id").attr("flag", "0");

        $("#road_seg_id").attr("flag", "1");
        //drawSeg.open();
        map.setDefaultCursor("crosshair");
        var objP = document.getElementById("road_intersection_id");
        objP.setAttribute("class", "mapICON");

        var objL = document.getElementById("road_seg_id");
        objL.setAttribute("class", "mapICONBorder");


    }
    else
    {
        // drawSeg.close();
        var objL = document.getElementById("road_seg_id");
        objL.setAttribute("class", "mapICON");
        $("#road_intersection_id").attr("flag", "0");
        $("#road_seg_id").attr("flag", "0");
    }
}

function deleteCurrentModel()
{
    map.removeOverlay(currentMarker);
}



function escModelMapEdit()
{
    var flag_seg = $("#road_seg_id").attr("flag");
    var flag_intersection = $("#road_intersection_id").attr("flag");
    if (flag_seg === "1")
    {
        drawSeg.close();
        var objL = document.getElementById("road_seg_id");
        objL.setAttribute("class", "mapICON");
        $("#road_intersection_id").attr("flag", "0");
        $("#road_seg_id").attr("flag", "0");
    }

    if (flag_intersection === "1")
    {
        var objP = document.getElementById("road_intersection_id");
        objP.setAttribute("class", "mapICON");
        $("#road_intersection_id").attr("flag", "0");
        $("#road_seg_id").attr("flag", "0");
    }
}


var map;
var iconW = 60;
var iconH = 77;
var onIcon = false;
var currentMarker = null;
var currentPoint = null;
var myValue;
var removeMarker = function (e, ee, marker) {

    map.removeOverlay(marker);
};




function initMap(caddress, city)
{
    map = new BMap.Map("l-map");
    map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
    map.enableContinuousZoom();
    var size = new BMap.Size(10, 20);
    map.addControl(new BMap.CityListControl({
        anchor: BMAP_ANCHOR_TOP_LEFT,
        offset: size,
        // 切换城市之间事件
        // onChangeBefore: function(){
        //    alert('before');
        // },
        // 切换城市之后事件
        // onChangeAfter:function(){
        //   alert('after');
        // }
    }));

//    var navigationControl = new BMap.NavigationControl({
//        // 靠左上角位置
//        anchor: BMAP_ANCHOR_TOP_RIGHT,
//        // LARGE类型
//        type: BMAP_NAVIGATION_CONTROL_LARGE,
//        // 启用显示定位
//        enableGeolocation: true
//    });
//    map.addControl(navigationControl);
    // 添加定位控件
    var geolocationControl = new BMap.GeolocationControl();
    geolocationControl.addEventListener("locationSuccess", function (e) {
        // 定位成功事件
        var address = '';
        address += e.addressComponent.province;
        address += e.addressComponent.city;
        address += e.addressComponent.district;
        address += e.addressComponent.street;
        address += e.addressComponent.streetNumber;
        alert("当前定位地址为：" + address);
    });
    geolocationControl.addEventListener("locationError", function (e) {
        // 定位失败事件
        alert(e.message);
    });
    map.addControl(geolocationControl);
    MyControl.prototype = new BMap.Control();
    MyControl.prototype.initialize = function (map) {
        var div = document.createElement("div");
        div.innerHTML = "<div class='nav_map_bar' style='display:none' flag='false' id='nav_tb_map'>\n\
         <img id='road_intersection_id' flag='0' onclick='selectIntersection()' class='mapICON' src='./mapIcon/intersection_tb.png'>\n\
        <img id='road_seg_id' flag='0' onclick='selectLaneSeg()' class='mapICON' src='./mapIcon/seg_tb.png'>\n\
        </div>";

        div.style.cursor = "pointer";
        map.getContainer().appendChild(div);
        // 将DOM元素返回  
        return div;
    };

    map.addControl(new BMap.MapTypeControl());
    var myCtrl = new MyControl();
    map.addControl(myCtrl);
    if (caddress === "")
    {
        var point = new BMap.Point(116.400244, 39.92556);
        map.centerAndZoom(point, 14);
        map.setCurrentCity("北京");
    }
    else
    {
        map.centerAndZoom(caddress, 14);
        map.setCurrentCity(city);
    }



//    var marker = new BMap.Marker(point);// 创建标注
//    map.addOverlay(marker);             // 将标注添加到地图中
    //marker.disableDragging();
    var styleOptions = {
        strokeColor: "red", //边线颜色。
        fillColor: "red", //填充颜色。当参数为空时，圆形将没有填充效果。
        strokeWeight: 3, //边线的宽度，以像素为单位。
        strokeOpacity: 0.8, //边线透明度，取值范围0 - 1。
        fillOpacity: 0.6, //填充的透明度，取值范围0 - 1。
        strokeStyle: 'solid' //边线的样式，solid或dashed。
    };

    function clearAll() {
        for (var i = 0; i < overlays.length; i++) {
            map.removeOverlay(overlays[i]);
        }
        overlays.length = 0;
    }
    var overlays = [];
    var overlay = null;
    var drawPoint = null;
    var points = [];

    function drawSeg()
    {

        overlays.push(overlay);
        var myIcon = new BMap.Icon("./mapIcon/seg_tb.png", new BMap.Size(iconW, iconH));
        var path = overlay.getPath();//Array<Point> 返回多边型的点数组
        var spoint_seg, epoint_seg;
        var marker = null;
        for (var i = 0; i < path.length; i++) {
            if (i === 0)
            {
                spoint_seg = new BMap.Point(path[i].lng, path[i].lat);
            }
            if (i + 1 === path.length)
            {
                epoint_seg = new BMap.Point(path[i].lng, path[i].lat);
            }
        }
        clearAll();

        var degree = getAngle(spoint_seg.lat, spoint_seg.lng, epoint_seg.lat, epoint_seg.lng);
        var point_seg = new BMap.Point((spoint_seg.lng + epoint_seg.lng) / 2, (spoint_seg.lat + epoint_seg.lat) / 2);
        $("#mainSurveyPage").attr("lat", (spoint_seg.lng + epoint_seg.lng) / 2);
        $("#mainSurveyPage").attr("lng", (spoint_seg.lat + epoint_seg.lat) / 2);
        currentPoint = point_seg;
        var sContent = '<div class="model_info_tb">\n\
                <a class="model_info_tb_add" href="javascript:void(0);" onclick="createSegModel(\'0\',\'' + point_seg.lat + '\',\'' + point_seg.lng + '\',\'' + degree + '\')"><i class="icon-icon-add" data-toggle="tooltip" data-placement="bottom" title="新建调查"></i></a>\n\
                <a class="model_info_tb_add" href="javascript:void(0);" onclick="pasteCurrentModel(\'' + point_seg.lat + '\',\'' + point_seg.lng + '\')"><i class="icon-icon-paste" data-toggle="tooltip" data-placement="bottom" title="粘贴调查"></i></a>\n\
                <a class="model_info_tb_add" href="javascript:void(0);" onclick="deleteCurrentModel()"><i class="icon-icon-delete" data-toggle="tooltip" data-placement="bottom" title="删除调查"></i></a></br>';
        marker = new BMap.Marker(point_seg, {icon: myIcon});
        currentMarker = marker;
        marker.enableDragging();
        map.addOverlay(marker);
        marker.addEventListener("mouseover", function (e) {
            onIcon = true;

        });
        marker.addEventListener("mouseout", function (e) {

            onIcon = false;

        });

        var infoWindow = new BMap.InfoWindow(sContent);
        marker.addEventListener("click", function () {
            currentMarker = this;
            this.openInfoWindow(infoWindow);
        });

        marker.addEventListener("dragend", function () {
            var pos = marker.getPosition();
            var newContent = '<div class="model_info_tb">\n\
                <a class="model_info_tb_add" href="javascript:void(0);" onclick="createSegModel(\'0\',\'' + pos.lat + '\',\'' + pos.lng + '\')"><i class="icon-icon-add" data-toggle="tooltip" data-placement="bottom" title="新建调查"></i></a>\n\
                <a class="model_info_tb_add" href="javascript:void(0);" onclick="pasteCurrentModel(\'' + pos.lat + '\',\'' + pos.lng + '\')"><i class="icon-icon-paste" data-toggle="tooltip" data-placement="bottom" title="粘贴调查"></i></a>\n\
                <a class="model_info_tb_add" href="javascript:void(0);" onclick="deleteCurrentModel()"><i class="icon-icon-delete" data-toggle="tooltip" data-placement="bottom" title="删除调查"></i></a></br>';
            infoWindow = new BMap.InfoWindow(newContent);
            currentMarker = this;
        });
        points.length = 0;
        drawPoint.length = 0;
        overlay = null;


    }

    //添加鼠标绘制工具监听事件，用于获取绘制结果
    var mousemoveAction = function (e) {
        if (isSegClick && !onIcon)
        {
            overlay.setPositionAt(drawPoint.length - 1, e.point);
        }
    };

    var isSegClick = false;
    map.addEventListener("click", function (e) {
        var inter_check = $("#road_intersection_id").attr("flag");
        var seg_check = $("#road_seg_id").attr("flag");
        if (inter_check === "1" && !onIcon)
        {
            var sContent = '<div class="model_info_tb">\n\
                <a class="model_info_tb_add" href="javascript:void(0);" onclick="createIntersectionModel(\'0\',\'' + e.point.lat + '\',\'' + e.point.lng + '\')"><i class="icon-icon-add" data-toggle="tooltip" data-placement="bottom" title="新建调查"></i></a>\n\
                <a class="model_info_tb_add" href="javascript:void(0);" onclick="pasteCurrentModel(\'' + e.point.lat + '\',\'' + e.point.lng + '\')"><i class="icon-icon-paste" data-toggle="tooltip" data-placement="bottom" title="粘贴调查"></i></a>\n\
                <a class="model_info_tb_add" href="javascript:void(0);" onclick="deleteCurrentModel()"><i class="icon-icon-delete" data-toggle="tooltip" data-placement="bottom" title="删除调查"></i></a></br>';

            var point = new BMap.Point(e.point.lng, e.point.lat);
//            $("#mainSurveyPage").attr("lat",e.point.lat);
//            $("#mainSurveyPage").attr("lng",e.point.lng);
            currentPoint = point;
            var myIcon = new BMap.Icon("./mapIcon/intersection_tb.png", new BMap.Size(iconW, iconH));
            var marker = new BMap.Marker(point, {icon: myIcon});
            currentMarker = marker;
            marker.enableDragging();
            map.addOverlay(marker);
            var infoWindow = new BMap.InfoWindow(sContent);
            marker.addEventListener("click", function () {
                this.openInfoWindow(infoWindow);
                currentMarker = this;
            });

            marker.addEventListener("dragend", function () {
                var pos = marker.getPosition();
                var newContent = '<div class="model_info_tb">\n\
                <a class="model_info_tb_add" href="javascript:void(0);" onclick="createIntersectionModel(\'0\',\'' + pos.lat + '\',\'' + pos.lng + '\')"><i class="icon-icon-add" data-toggle="tooltip" data-placement="bottom" title="新建调查"></i></a>\n\
                <a class="model_info_tb_add" href="javascript:void(0);" onclick="pasteCurrentModel(\'' + pos.lat + '\',\'' + pos.lng + '\')"><i class="icon-icon-paste" data-toggle="tooltip" data-placement="bottom" title="粘贴调查"></i></a>\n\
                <a class="model_info_tb_add" href="javascript:void(0);" onclick="deleteCurrentModel()"><i class="icon-icon-delete" data-toggle="tooltip" data-placement="bottom" title="删除调查"></i></a></br>';
                infoWindow = new BMap.InfoWindow(newContent);
                currentMarker = this;
            });

            marker.addEventListener("mouseover", function (e) {
                onIcon = true;
            });
            marker.addEventListener("mouseout", function (e) {
                onIcon = false;
            });
        }

        if (seg_check === "1" && !onIcon)
        {
            if (!isSegClick)
            {
                points.push(e.point);
                drawPoint = points.concat(points[points.length - 1]);
                if (points.length === 1) {
                    overlay = new BMap.Polyline(drawPoint, styleOptions);
                    map.addOverlay(overlay);
                } else {
                    overlay.setPath(drawPoint);
                }
                isSegClick = true;
            }
            else
            {
                points.push(e.point);
                drawPoint = points.concat(points[points.length - 1]);
                isSegClick = false;
                overlay.setPath(points);
                drawSeg();

            }
        }
    });

    map.addEventListener('mousemove', mousemoveAction);


//    var ac = new BMap.Autocomplete(//建立一个自动完成的对象
//            {"input": "suggestId"
//                , "location": map
//            });
//
//    ac.addEventListener("onhighlight", function (e) {  //鼠标放在下拉列表上的事件
//        var str = "";
//        var _value = e.fromitem.value;
//        var value = "";
//        if (e.fromitem.index > -1) {
//            value = _value.province + _value.city + _value.district + _value.street + _value.business;
//        }
//        str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
//
//        value = "";
//        if (e.toitem.index > -1) {
//            _value = e.toitem.value;
//            value = _value.province + _value.city + _value.district + _value.street + _value.business;
//        }
//        str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
//        G("searchResultPanel").innerHTML = str;
//    });
//
//
//    ac.addEventListener("onconfirm", function (e) {    //鼠标点击下拉列表后的事件
//        var _value = e.item.value;
//        myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
//        G("searchResultPanel").innerHTML = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
//
//        setPlace();
//    });


}



// Modeling Section

function loadTaskModelsInfo()
{
    var sid = $("#mainSurveyPage").attr("spid");
    if (sid === "0")
    {
        alert("请先创建项目文件");
    }
    else
    {
        $.ajax({
            url: "../../HandleGetAllModels",
            data: {"sid": sid},
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
            },
            success: function (result) {
                if (result.startsWith("111_"))
                {
                    alert(result);
                }
                else if (result === "")
                {

                }
                else
                {
                    loadTaskModels(result);
                }
            }
        });
    }

}

function getAngle(lat, lng, lat1, lng1)
{
    var sa = 1000000;
    var xc = lng * sa;
    var yc = lat * sa;
    var tx, ty, rx, ry;
    var thet;
    tx = lng1 * sa;
    ty = lat1 * sa;
    rx = parseInt((tx - xc) / 1000);
    ry = parseInt((ty - yc) / 1000);

    if (rx === 0)
    {
        if (ry > 0)
        {
            thet = Math.PI / 2;
        }
        else
        {
            thet = Math.PI * 3 / 2;
        }
    }
    else if (ry === 0)
    {
        if (rx < 0)
        {
            thet = Math.PI;
        }
        else
        {
            thet = 0;
        }
    }
    else
    {
        thet = Math.atan2(ry, rx);
        if (thet < 0)
        {
            if (ry < 0)
            {
                thet = Math.PI * 2 + thet;
            }
            else
            {
                thet = Math.PI + thet;
            }
        }
        else
        {
            if (rx < 0)
            {
                thet = Math.PI + thet;
            }
            else
            {
                thet = thet;
            }
        }
    }
    thet = parseInt(180 * thet / Math.PI);
    return thet;
}

var allMarker = [];
function loadTaskModels(info)
{
    var content = "";
    for (var j = 0; j < allMarker.length; j++)
    {
        map.removeOverlay(allMarker[j]);
    }
    allMarker = [];
    if (info !== "")
    {
        info = JSON.parse(info);

        for (var i = 0; i < info.length; i++)
        {
            var models = info[i].tmodels;
            var ids = "";
            var lat = info[i].lat;
            var lng = info[i].lng;
            content = '<div class="model_info_tb" id="model_show_window_' + info[i].id + '" data=""><div class="model_info_tb_nav" id="model_info_tb_nav" index="0"><a class="model_info_tb_add" style=" margin-right: 20px;" href="javascript:void(0);" onclick="addNewModel(\'' + info[i].type + '\',\'' + info[i].lat + '\',\'' + info[i].lng + '\',\'' + info[i].degree + '\')"><i class="icon-icon-add" data-toggle="tooltip" data-placement="bottom" title="新建调查"></i></a>';
            content += '<a class="model_info_tb_copy" href="javascript:void(0);" onclick="showModelCopy(\'' + info[i].id + '\')"><i class="icon-icon-copy" data-toggle="tooltip" data-placement="bottom" title="复制调查"></i></a><a class="model_info_tb_delete" href="javascript:void(0);" onclick="pasteCurrentModel(\'' + lat + '\',\'' + lng + '\')"><i class="icon-icon-paste" data-toggle="tooltip" data-placement="bottom" title="粘贴调查"></i></a><a class="model_info_tb_delete" href="javascript:void(0);" onclick="deleteModel(\'' + info[i].id + '\')"><i class="icon-icon-delete" data-toggle="tooltip" data-placement="bottom" title="删除调查"></i></a></div>';
            content += '<div style="overflow-y:scroll;margin-top: 10px;" class="model_info_tb_items"><table style="width:100%;">';

            for (var j = 0; j < models.length; j++)
            {
                if (ids === "")
                {
                    ids += models[j].id;
                }
                else
                {
                    ids += "_" + models[j].id;
                }
                content += '<tr><td><a class="model_info_tb_item" href="javascript:void(0);" onclick="goModel(\'' + models[j].id + '\')">' + getNameByTime(models[j].mdate) + '(创建者:' + models[j].username + ')' + '</a></td>';
                content += '<td><input type="checkbox" id="model_select_id_' + models[j].id + '" onchange="modelMenuSelcted(\'' + models[j].id + '\',\'' + info[i].id + '\')"></td></tr>';
            }

            content += '</table></div></div>';
            addTaskModel(info[i], ids, content);

        }


    }
}

function deleteModel(id)
{
    var parent = $("#model_show_window_" + id);
    var data = parent.attr("data");
    if (data === "")
    {
        alert("你还没有选中要删除的的调查");
    }
    else
    {
        data = JSON.parse(data);
        var ids = "";
        for (var i = 0; i < data.length; i++)
        {
            if (ids === "")
            {
                ids += data[i].mid;
            }
            else
            {
                ids += "_" + data[i].mid;
            }
        }

        if (confirm("你确定要删除你选择的调查吗?"))
        {
            $.ajax({
                url: "../../HandleDeleteTask_Model",
                data: {"ids": ids},
                type: "GET",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
                },
                success: function (result) {
                    if (result === "0")
                    {
                        alert("删除操作没有完成，出现异常，请重试");
                    }
                    else if (result === "inusing")
                    {
                        alert("有调查正在被编辑中，暂时不能被复制");
                    }
                    else
                    {
                        loadTaskModelsInfo();
                        alert("删除操作完成");
                    }
                }
            });
        }

    }
}

function modelMenuSelcted(id, pid)
{
    //var item=$("#model_select_id_"+id);
    var item = document.getElementById("model_select_id_" + id);
    var parent = $("#model_show_window_" + pid);
    var data = parent.attr("data");
    if (data === "")
    {
        data = [];
        if (item.checked)
        {
            var item_id = {mid: id};
            data.push(item_id);
            parent.attr("data", JSON.stringify(data));
        }
    }
    else
    {
        data = JSON.parse(data);
        if (item.checked)
        {
            var item_id = {mid: id};
            data.push(item_id);
            parent.attr("data", JSON.stringify(data));
        }
        else
        {
            var ndata = [];
            for (var i = 0; i < data.length; i++)
            {
                if (data[i].mid !== id)
                {
                    ndata.push(data[i]);
                }
            }
            if (ndata.length > 0)
            {
                parent.attr("data", JSON.stringify(ndata));
            }
            else
            {
                parent.attr("data", "");
            }
        }
    }



}

function showModelCopy(id)
{
    var parent = $("#model_show_window_" + id);
    var data = parent.attr("data");
    if (data === "")
    {
        alert("你还没有选中要复制的调查，请选择一个调查");
    }
    else
    {
        data = JSON.parse(data);
        if (data.length > 1)
        {
            alert("你只能选择一个调查进行复制操作");
            return 0;
        }
        var item = data[0];
        $.post("../../HandleGetCurrentWorkingStatus", {stmid: item.mid, option: 2}, function (result)
        {
            if (result === "1")
            {
                alert("此调查正在被编辑中，暂时不能被复制");
            }
            else
            {
                var parent = window.parent.document.getElementById('mainBody');
                parent.setAttribute("copyid", item.mid);
                //$("#mapShowSection").attr("copyid", );
                alert("此调查已经被复制到你当前的粘贴板，请在目标位置进行粘贴操作完成复制");
            }
        });

    }
}

function pasteCurrentModel(lat, lng)
{
    var parent = window.parent.document.getElementById('mainBody');
    var mid = parent.getAttribute("copyid");
    //var mid = $("#mapShowSection").attr("copyid");

    if (mid === "")
    {
        alert("你当前没有被复制的项目存在，不能进行粘贴操作");
        return 0;
    }
    else
    {
        $.post("../../HandleGetCurrentWorkingStatus", {stmid: mid, option: 2}, function (re)
        {

            if (re === "1")
            {
                alert("所复制的调查正在被编辑中，暂时不能被复制");
            }
            else
            {
                if (confirm("你确定将粘贴板中被复制的任务粘贴此位置吗?"))
                {

                    var content;
                    content = '<div class="modal-dialog">'

                            + '<div class="modal-content">'
                            + '<div class="modal-header">'
                            + '<button type="button" class="close" onclick="closeModal()">&times;</button>'
                            + '<h4 class="modal-title">请选择复制项目的时间</h4>'
                            + '</div>'
                            + '<div class="modal-body">'
                            + '<div id="model_date" class="model_date">'
                            + '<span style="color:black;font-size:16px; margin-right: 5px;" >调查日期:</span><input style="font-size:18px;color:black; width:170px;" type="date" id="t_copy_model_date" placeholder="调查日期" >'
                            + '</div>';
                    content += '</div>'
                            + '<div class="modal-footer">'
                            + '<button type="button" class="btn btn-default" onclick="closeModal()">关闭</button>'

                            + '<button type="button" class="btn btn-default" id="smp5" onclick="doConfirmPasterModel(' + mid + ',' + lat + ',' + lng + ')">确定</button>'
                            + '</div>'
                            + '</div>'
                            + '</div>';
                    var dig = document.getElementById("myModalSurvey");
                    dig.innerHTML = content;
                    $('#myModalSurvey').modal({backdrop: 'static', keyboard: false});
                }
            }
        });
    }
}

function doConfirmPasterModel(mid, lat, lng)
{
    var date = $("#t_copy_model_date").val();
    if (date === "")
    {
        alert("日期不能为空");
    }
    else
    {
        var spid = $("#bodyOne").attr("spid");
        $.ajax({
            url: "../../HandleCreateCopyedModel",
            data: {"stmid": mid, lat: lat, lng: lng, date: date, spid: spid},
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
            },
            success: function (result) {
                if (result === "0")
                {
                    alert("调查没有复制成功，请重新尝试");
                    $('#myModalSurvey').modal("hide");
                }
                else
                {
                    loadTaskModelsInfo();
                    alert("复制成功");
                    var parent = window.parent.document.getElementById('mainBody');
                    parent.setAttribute("copyid", "");
                    $("#mapShowSection").attr("copyid", "");
                    $('#myModalSurvey').modal("hide");
                }
            }
        });
    }
}

function getNameByTime(time)
{
    var ts = time.split("-");
    var year = ts[0];
    var month = parseInt(ts[1]);
    var day = parseInt(ts[2]);
    var info = year + "年" + month + "月" + day + "日的调查";
    return info;
}

function changeProjectLatLng(ids, lat1, lng1)
{
    $.post("../../HandleChangeProjectLatLng", {ids: ids, newLat: lat1, newLng: lng1}, function (result)
    {
        if (result === "0")
        {
            alert("调查项目位置移动没有成功，请重新尝试");
            loadTaskModelsInfo();
        }
        else if (result === "1")
        {
            loadTaskModelsInfo();
            alert("调查项目位置移动成功");
        }
        else if (result === "-1")
        {
            loadTaskModelsInfo();
            alert("调查项目正在被编辑中，无法完成移动操作");
        }
    });
}

function addTaskModel(info, ids, sContent)
{
    var point = new BMap.Point(info.lng, info.lat);
    var myIcon;
    if (info.type === 1)
    {
        myIcon = new BMap.Icon("./mapIcon/intersection_tb.png", new BMap.Size(iconW, iconH));
    }
    else if (info.type === 2)
    {
        myIcon = new BMap.Icon("./mapIcon/seg_tb.png", new BMap.Size(iconW, iconH));
    }
    else if (info.type === 3)
    {
        myIcon = new BMap.Icon("./mapIcon/light_tb.png", new BMap.Size(iconW, iconH));
    }

    var marker = new BMap.Marker(point, {icon: myIcon});
    marker.enableDragging();
    var infoWindow = new BMap.InfoWindow(sContent);
    marker.addEventListener("click", function () {
        this.openInfoWindow(infoWindow);
    });


    marker.addEventListener("dragend", function () {
        var pos = marker.getPosition();
        changeProjectLatLng(ids, pos.lat, pos.lng);
    });

    marker.addEventListener("mouseover", function (e) {
        onIcon = true;

    });
    marker.addEventListener("mouseout", function (e) {
        onIcon = false;
    });
    map.addOverlay(marker);
    allMarker.push(marker);

}

function addNewModel(type, lat, lng, degree)
{
    type = parseInt(type);
    if (type === 2)
    {
        createSegModel(0, lat, lng, degree);
    }
    else if (type === 1)
    {
        createIntersectionModel(0, lat, lng);
    }
    else
    {

    }

}

function goModel(stmid)
{
    stmid = parseInt(stmid);
    $.post("../../HandleGetCurrentWorkingStatus", {stmid: stmid, option: 2}, function (result)
    {
        if (result === "0")
        {
            $.post("../../HandleAddCurrentState", {id: stmid, option: 2}, function (result)
            {
                if (result === "0")
                {
                    alert("系统出现错误，请重试！");

                }
                else if (result === "1")
                {
                    $("#bodyOne").attr("stmid", stmid);
                    $.post("../../HandleGetModelInfo", {id: stmid}, function (out)
                    {
                        if (out.startsWith("111_"))
                        {
                            alert(out);
                        }
                        else
                        {
                            var model = JSON.parse(out);
                            if (model.type === 1)
                            {
                                createIntersectionModel(model.id, model.lat, model.lng);
                                $("#task_info").attr("laneinfo", model.laneinfo);
                                $("#task_info").attr("lanes", JSON.stringify(model.lanes));
                                $("#task_info").attr("task_img", model.img_path);
                                $("#task_info").attr("xcenter", model.xcenter);
                                $("#task_info").attr("ycenter", model.ycenter);
                                $("#imag1").attr("src", model.img_path);
                                $("#t_model_date").val(model.mdate);
                                $("#img_result").attr("src", model.img_path);
                                $("#intersection").attr("laneinfo", model.laneinfo);
                                setLanesObject(model.laneinfo);
                                loadTaskItems(model.group_tasks, model.type);
                            }
                            else if (model.type === 2)
                            {
                                createSegModel(model.id, model.lat, model.lng, model.degree);
                                $("#task_info_seg").attr("downnumber", model.downnumber);
                                $("#task_info_seg").attr("upnumber", model.upnumber);
                                $("#task_info_seg").attr("degree", model.degree);
                                $("#task_info_seg").attr("task_img", model.img_path);
                                $("#task_info_seg").attr("name", model.name);
                                $("#imag1_seg").attr("src", model.img_path);
                                $("#t_seg_date").val(model.mdate);
                                //setLanesObject(model.laneinfo);
                                loadTaskItems(model.group_tasks, model.type);
                            }
                            else
                            {

                            }
                        }
                    });
                    monitor2 = setInterval(function () {
                        monitorSTMIDUpdate(stmid);
                    }, timeRefresh);
                }
            });

        }
        else if (result === "-1")
        {
            alert("Error");
        }
        else
        {
            alert("其他用户正在编辑，请稍后！");
        }
    });
}


function setTasksReady(index)
{
    var parent = $("#t_interval_" + index);
    var untids = parent.attr("untids");
    if (untids === "0")
    {
        var total = parent.attr("total");
        if (total === "0")
        {
            alert("此时段当前没有任务可以发布");
        }
        else
        {
            alert("此时段的任务已经全部完成发布");
        }

    }
    else
    {
        if (cf("你确定要发布此时段的任务吗？"))
        {
            var stmid = $("#intersection_section").attr("stmid");
            $.post("../../HandleTasksReadyAssign", {ids: untids, stmid: stmid}, function (result)
            {
                if (result === "0")
                {
                    alert("系统出现错误，请重新尝试");
                }
                else
                {
                    var model = JSON.parse(result);
                    if (model.type === 1)
                    {

                        createIntersectionModel(model.id, model.lat, model.lng);
                        $("#task_info").attr("laneinfo", model.laneinfo);
                        $("#task_info").attr("lanes", JSON.stringify(model.lanes));
                        $("#task_info").attr("xcenter", model.xcenter);
                        $("#task_info").attr("ycenter", model.ycenter);
                        $("#task_info").attr("task_img", model.img_path);
                        $("#imag1").attr("src", model.img_path);
                        $("#t_model_date").val(model.mdate);
                        $("#img_result").attr("src", model.img_path);
                        $("#intersection").attr("laneinfo", model.laneinfo);
                        setLanesObject(model.laneinfo);
                        loadTaskItems(model.group_tasks, model.type);
                        alert("时段任务发布成功");

                        //cancelTaskToTimedRange();
                    }

                }

            });
        }
    }
}

function loadTaskItems(items, type)
{
    if (type === 1)
    {
        if (items !== undefined && items !== null && items.length > 0)
        {
            for (var i = 0; i < items.length; i++)
            {
                var tgroup = items[i];
                var tasks = tgroup.tasks;
                var total = 0;
                if (tasks !== null)
                {
                    total = tasks.length;
                }
                var index = $("#task_info").attr("timeIndex");
                index = parseInt(index) + 1;

                $("#task_info").attr("timeIndex", index);
                var name = "时间段:" + tgroup.stime + "--" + tgroup.etime + ", " + tgroup.duration + "分钟";
                var item;
                if (tgroup.untids !== "0" || total === 0)
                {
                    item = '<li class="list-group-item list_time_group" ids="" untids="' + tgroup.untids + '" preImage="" preslanesOld="" preslanes="' + tgroup.preslanes + '" id="t_interval_' + tgroup.id + '" stime="' + tgroup.stime + '" etime="' + tgroup.etime + '" duration="' + tgroup.duration + '" total="' + total + '" show="0" index="0"><a href="javascript:void(0)" onclick="showSubTasks(\'' + tgroup.id + '\');" ><span id="t_interval_name_' + tgroup.id + '" style="color:#c9302c" >' + name + ', 共</span><span id="t_interval_total_' + tgroup.id + '" style="color:#c9302c" >' + total + '个任务</span></a>';

                }
                else
                {
                    var item = '<li class="list-group-item list_time_group" ids="" untids="' + tgroup.untids + '" preImage="" preslanesOld="" preslanes="' + tgroup.preslanes + '" id="t_interval_' + tgroup.id + '" stime="' + tgroup.stime + '" etime="' + tgroup.etime + '" duration="' + tgroup.duration + '" total="' + total + '" show="0" index="0"><a href="javascript:void(0)" onclick="showSubTasks(\'' + tgroup.id + '\');" ><span id="t_interval_name_' + tgroup.id + '" style="color:#449d44" >' + name + ', 共</span><span id="t_interval_total_' + tgroup.id + '" style="color:#449d44" >' + total + '个任务</span></a>';

                }
                item += '<i class="fa fa-check-square-o taskTimeIcon" aria-hidden="true" onclick="setTasksReady(\'' + tgroup.id + '\');"></i><i class="fa  fa-plus-circle taskTimeIcon" aria-hidden="true" onclick="showAddTimedTask(\'' + tgroup.id + '\');"></i><i class="fa fa-trash taskTimeIcon" aria-hidden="true" onclick="deleteTaskTimedRange(\'' + tgroup.id + '\');"></i><i class="fa fa-clone taskTimeIcon" aria-hidden="true" onclick="copyTaskTimedRange(\'' + tgroup.id + '\');"></i><i class="fa fa-pencil-square-o taskTimeIcon" aria-hidden="true" onclick="showEditTimedTask(\'' + tgroup.id + '\');"></i></li>';
                var ltime = $(item);
                $("#task_info").append(ltime);
                var item1 = '<li class="list-group-item" id="t_interval_tasks_' + tgroup.id + '" style="display:none;"><ul class="list-group" id="t_interval_tasks_group_' + tgroup.id + '"></ul></li>';
                var ltime1 = $(item1);
                $("#task_info").append(ltime1);

                var tids = "";
                if (tasks !== null)
                {
                    for (var j = 0; j < tasks.length; j++)
                    {
                        var task = tasks[j];
                        var group = tgroup.id;
                        var carinfo = JSON.stringify(task.peizhi);
                        if (carinfo === "")
                        {
                            alert("请先配置车型");
                            return 0;
                        }
                        var tdate = task.tdate;
                        var alllanes = $("#task_info").attr("laneinfo");
                        var slanes = task.slanes;
                        if (slanes === "")
                        {
                            alert("车流不正确");
                            return 0;
                        }
                        var stmid = $("#intersection_section").attr("stmid");
                        var ttype = task.type;
                        var method = task.method;
                        method = parseInt(method);
                        var mname = "";
                        if (method === 1)
                        {

                            mname = "视频";
                        }
                        if (method === 2)
                        {
                            method = 2;
                            mname = "人工";
                        }

                        var stime = task.stime;
                        var etime = task.etime;
                        var duration = task.duration;
                        var img_path = task.img_path;
                        var data = '{"stime":"' + stime + '","tdate":"' + tdate + '","alllanes":"' + alllanes + '","stmid":"' + stmid + '","id":"' + task.id + '","type":"' + ttype + '","duration":"' + duration + '","img_path":"' + img_path + '","etime":"' + etime + '","slanes":"' + slanes + '","c_status":"' + task.c_status + '","method":"' + method + '","light_type":"' + task.light_type + '","peizhi":' + carinfo + '}';
                        var tss = tdate.split("-");
                        var name = " 流量, " + tss[0] + "年" + tss[1] + "月" + tss[2] + "日, " + stime + "--" + etime + ": ";
                        name += "方式:" + mname;
                        var cars = getCarTypesHTML(JSON.parse(carinfo));
                        var index0 = task.id;
                        name = '<div onclick="showTaskImageInfo(\'' + index0 + '\');" class="task_item_name">' + name + '</div>';
                        var titem = '<li class="list-group-item taskitemicon taskitemclass" id="t_task_' + index0 + '" data=\'' + data + '\' pindex="' + group + '" preindex="' + index0 + '" status="' + task.c_status + '">';
                        titem += name;
                        titem += cars;


                        var cstatus = task.c_status;
                        cstatus = parseInt(cstatus);
                        var sname = "";
                        if (cstatus === 2)
                        {
                            sname = "等待接受中";
                        }
                        else if (cstatus === 3)
                        {
                            sname = "任务进行中";
                        }
                        else if (cstatus === 4)
                        {
                            sname = "任务审核中";
                        }
                        else if (cstatus === 5)
                        {
                            sname = "任务完成";
                        }
                        else if (cstatus === 6)
                        {
                            sname = "任务重做中";
                        }
                        else if (cstatus === 1)
                        {
                            sname = "等待分配中";
                        }
                        else if (cstatus === 0)
                        {
                            sname = "等待发布中";
                        }
                        var itemStatus = '<div class="task_item_status">任务状态:<span class="task_item_status_name">' + sname + '</span></div>';
                        titem += itemStatus;
                        titem += '<div class="task_operation_icon"><i class="fa fa-trash taskTimeIcon" aria-hidden="true" onclick="deleteTask(\'' + index0 + '\');"></i><i class="fa fa-clone taskTimeIcon" aria-hidden="true" onclick="copyTask(\'' + index0 + '\');"></i><i class="fa fa-pencil-square-o taskTimeIcon" aria-hidden="true" onclick="showEditedTask(\'' + index0 + '\');"></i></div></li>';
                        var tltime = $(titem);
                        $("#t_interval_tasks_group_" + group).append(tltime);

                        if (tids === "")
                        {
                            tids += task.id;
                        }
                        else
                        {
                            tids += "_" + task.id;
                        }
                    }
                }

                $('#t_interval_' + tgroup.id).attr("ids", tids);

            }
        }
    }
    else if (type === 2)
    {
        if (items !== undefined && items !== null && items.length > 0)
        {
            for (var i = 0; i < items.length; i++)
            {
                var tgroup = items[i];
                var tasks = tgroup.tasks;
                var index = $("#task_info_seg").attr("timeIndex");
                index = parseInt(index) + 1;
                $("#task_info_seg").attr("timeIndex", index);
                var name = "时间段:" + tgroup.stime + "--" + tgroup.etime + ", " + tgroup.duration + "分钟";
                var item = '<li class="list-group-item list_time_group" ids="" id="t_interval_' + index + '" stime="' + tgroup.stime + '" etime="' + tgroup.etime + '" duration="' + tgroup.duration + '" total="' + tasks.length + '" show="0" index="0"><a href="javascript:void(0)" onclick="showSubTasks_Seg(\'' + index + '\');" ><span id="t_interval_name_' + index + '" >' + name + '</span>, 共<span id="t_interval_total_' + index + '" >' + tasks.length + '</span>个任务</a>';
                item += '<i class="fa  fa-plus-circle taskTimeIcon" aria-hidden="true" onclick="showAddTimedTask_Seg(\'' + index + '\');"></i><i class="fa fa-trash taskTimeIcon" aria-hidden="true" onclick="deleteTaskTimedRange_Seg(\'' + index + '\');"></i><i class="fa fa-clone taskTimeIcon" aria-hidden="true" onclick="copyTaskTimedRange_Seg(\'' + index + '\');"></i><i class="fa fa-pencil-square-o taskTimeIcon" aria-hidden="true" onclick="showEditTimedTask_Seg(\'' + index + '\');"></i></li>';
                var ltime = $(item);
                $("#task_info_seg").append(ltime);
                var item1 = '<li class="list-group-item" id="t_interval_tasks_' + index + '" style="display:none;"><ul class="list-group" id="t_interval_tasks_group_' + index + '"></ul></li>';
                var ltime1 = $(item1);
                $("#task_info_seg").append(ltime1);

                var tids = "";
                for (var j = 0; j < tasks.length; j++)
                {
                    var task = tasks[j];
                    var group = index;
                    var carinfo = JSON.stringify(task.peizhi);
                    if (carinfo === "")
                    {
                        alert("请先配置车型");
                        return 0;
                    }
                    var tdate = task.tdate;
                    var stmid = $("#seg_section").attr("stmid");
                    var ttype = task.type;
                    var method = task.method;
                    method = parseInt(method);
                    var mname = "";
                    if (method === 1)
                    {

                        mname = "视频";
                    }
                    if (method === 2)
                    {
                        method = 2;
                        mname = "人工";
                    }

                    var stime = task.stime;
                    var etime = task.etime;
                    var duration = task.duration;
                    var img_path = task.img_path;
                    var slanes = task.slanes;
                    var data = '{"stime":"' + stime + '","tdate":"' + tdate + '","stmid":"' + stmid + '","id":"' + task.id + '","type":"' + ttype + '","duration":"' + duration + '","img_path":"' + img_path + '","etime":"' + etime + '","slanes":"' + slanes + '","c_status":"' + task.c_status + '","method":"' + method + '","light_type":"' + task.light_type + '","peizhi":' + carinfo + '}';
                    var tss = tdate.split("-");
                    var name = " 流量, " + tss[0] + "年" + tss[1] + "月" + tss[2] + "日, " + stime + "--" + etime + ": ";
                    name += "方式:" + mname;
                    var cars = getCarTypesHTML(JSON.parse(carinfo));
                    var index0 = task.id;
                    name = '<div onclick="showTaskImageInfo_Seg(\'' + index0 + '\');" class="task_item_name">' + name + '</div>';
                    var titem = '<li class="list-group-item taskitemicon taskitemclass" id="t_task_' + index0 + '" data=\'' + data + '\' pindex="' + group + '" preindex="' + index0 + '" status="' + task.c_status + '">';
                    titem += name;
                    titem += cars;


                    var cstatus = task.c_status;
                    cstatus = parseInt(cstatus);
                    var sname = "";
                    if (cstatus === 1)
                    {
                        sname = "等待接受中";
                    }
                    else if (cstatus === 2)
                    {
                        sname = "任务进行中";
                    }
                    else if (cstatus === 3)
                    {
                        sname = "任务审核中";
                    }
                    else if (cstatus === 4)
                    {
                        sname = "任务完成";
                    }
                    else if (cstatus === 5)
                    {
                        sname = "任务重做中";
                    }
                    else
                    {
                        sname = "未分配";
                    }
                    var itemStatus = '<div class="task_item_status">任务状态:<span class="task_item_status_name">' + sname + '</span></div>';
                    titem += itemStatus;
                    titem += '<div class="task_operation_icon"><i class="fa fa-trash taskTimeIcon" aria-hidden="true" onclick="deleteTask_Seg(\'' + index0 + '\');"></i><i class="fa fa-clone taskTimeIcon" aria-hidden="true" onclick="copyTask_Seg(\'' + index0 + '\');"></i><i class="fa fa-pencil-square-o taskTimeIcon" aria-hidden="true" onclick="showEditedTask_Seg(\'' + index0 + '\');"></i></div></li>';
                    var tltime = $(titem);
                    $("#t_interval_tasks_group_" + group).append(tltime);

                    if (tids === "")
                    {
                        tids += task.id;
                    }
                    else
                    {
                        tids += "_" + task.id;
                    }
                }

                $('#t_interval_' + index).attr("ids", tids);

            }
        }
    }
}

function createIntersectionModelImage()
{
    var option = $("#intersection_model_option").val();
    if (option === "0" || option === "-1")
    {

        var time_tasks = $("#task_info").find(".list_time_group");
        if (time_tasks === undefined || time_tasks === null || time_tasks.length === 0)
        {
            //alert("没有当前存在的时段");

            if (option === "0")
            {
                $("#task_info").attr("laneinfo", "");
                $("#task_info").attr("task_img", "");
                $("#task_info").attr("lanes", "");
                $("#imag1").attr("src", "");
            }
            $("#intersection_quhua").show();
            $("#intersection_task").hide();
            $("#intersection_cars").hide();
            $("#intersection_image_save").show();
        }
        else
        {
            alert("你的调查存在任务，你不能进行渠化修改");
        }
    }
    else
    {
        var lanes = $("#model_image_nav_" + option).attr("intersection");
        var img_path = $("#model_image_nav_" + option).attr("img_path");
        $("#task_info").attr("lanes", getLanesObject(lanes));
        $("#task_info").attr("laneinfo", lanes);
        $("#task_info").attr("task_img", img_path);
        $("#imag1").attr("src", img_path);
        $("#intersection_quhua").hide();
        $("#intersection_task").show();
        $("#intersection_cars").show();
        $("#intersection_image_save").hide();
    }
}

function task_time_Save()
{
    var timage = $("#task_info").attr("task_img");
    if (timage === "")
    {
        alert("你还没有创建交叉口渠化模型");
    }
    else
    {
        var stime = $('#stime').val();
        var etime = $('#etime').val();
        var duration = getTimeDiff(stime, etime);
        if (duration <= 0)
        {
            alert("时间选择不正确");
        }
        else
        {
            var copyItem = null;
            var tgs = $("#task_info").find(".list_time_group");
            if (tgs !== undefined && tgs !== null && tgs.length > 0)
            {
                for (var i = 0; i < tgs.length; i++)
                {
                    var temp = tgs[i];
                    if (stime === $(temp).attr("stime") && etime === $(temp).attr("etime"))
                    {
                        copyItem = temp;
                        break;
                    }
                }
            }
            if (copyItem !== null)
            {
                alert("已经存在相同的调查时间段");
            }
            else
            {
//                var index = $("#task_info").attr("timeIndex");
//                index = parseInt(index) + 1;
//                $("#task_info").attr("timeIndex", index);
//                var name = "时间段:" + stime + "--" + etime + ", " + duration + "分钟";
//                var item = '<li class="list-group-item list_time_group" id="t_interval_' + index + '" preImage="" preslanes="" preslaneOld="" stime="' + stime + '" etime="' + etime + '" duration="' + duration + '" total="0" show="0" index="0"><a href="javascript:void(0)" onclick="showSubTasks(\'' + index + '\');" ><span id="t_interval_name_' + index + '" >' + name + '</span>, 共<span id="t_interval_total_' + index + '" >0</span>个任务</a>';
//                item += '<i class="fa  fa-plus-circle taskTimeIcon" aria-hidden="true" onclick="showAddTimedTask(\'' + index + '\');"></i><i class="fa fa-trash taskTimeIcon" aria-hidden="true" onclick="deleteTaskTimedRange(\'' + index + '\');"></i><i class="fa fa-clone taskTimeIcon" aria-hidden="true" onclick="copyTaskTimedRange(\'' + index + '\');"></i><i class="fa fa-pencil-square-o taskTimeIcon" aria-hidden="true" onclick="showEditTimedTask(\'' + index + '\');"></i></li>';
//                var ltime = $(item);
//                $("#task_info").append(ltime);
//                var item1 = '<li class="list-group-item" id="t_interval_tasks_' + index + '" style="display:none;"><ul class="list-group" id="t_interval_tasks_group_' + index + '"></ul></li>';
//                var ltime1 = $(item1);
//                $("#task_info").append(ltime1);
//                $("#task_time_box").hide();
                var stmid = $("#intersection_section").attr("stmid");
                var data = {stmid: stmid, stime: stime, etime: etime, duration: duration, type: 1};
                data = JSON.stringify(data);
                $.post("../../HandleCreateTaskGroup", {data: data}, function (out)
                {
                    if (out !== "0")
                    {
                        var model = JSON.parse(out);
                        if (model.type === 1)
                        {
                            createIntersectionModel(model.id, model.lat, model.lng);
                            $("#task_info").attr("laneinfo", model.laneinfo);
                            $("#task_info").attr("lanes", JSON.stringify(model.lanes));
                            $("#task_info").attr("task_img", model.img_path);
                            $("#task_info").attr("xcenter", model.xcenter);
                            $("#task_info").attr("ycenter", model.ycenter);
                            $("#imag1").attr("src", model.img_path);
                            $("#t_model_date").val(model.mdate);
                            $("#img_result").attr("src", model.img_path);
                            $("#intersection").attr("laneinfo", model.laneinfo);
                            setLanesObject(model.laneinfo);
                            loadTaskItems(model.group_tasks, model.type);
                        }
                    }
                    else
                    {
                        alert("创建失败！请重新尝试");
                    }

                });

            }
        }
    }
}

function showSubTasks(index)
{
    var parent = $("#t_interval_" + index);
    var show = parent.attr("show");
    if (show === "0" && parent.attr("total") !== "0")
    {
        $("#t_interval_tasks_" + index).slideDown();
        parent.attr("show", "1");
        var t_interval = $("#t_interval_" + index);
        var data = $("#task_info").attr("laneinfo");
        var pid = $("#mainSurveyPage").attr("pid");
        var slanes = "";
        var preslanes = t_interval.attr("preslanes");
        var spoints = "0_0";

        var preslanesOld = t_interval.attr("preslanesOld");
        var preImage = t_interval.attr("preImage");
        if (preslanes !== preslanesOld && preslanes !== "")
        {
            var xcenter = $("#task_info").attr("xcenter");
            var ycenter = $("#task_info").attr("ycenter");
            var data1 = xcenter + "_" + ycenter + "D" + data;
            $.post("../../HandleCreateTask", {data: data1, spoints: spoints, slanes: slanes, pid: pid, preslanes: preslanes, option: 0}, function (result)
            {

                if (result.startsWith("1_"))
                {
                    alert(result);
                }
                else
                {
                    var out = result.split("M");
                    var t = new Date().getTime();
                    $("#imag1").attr('src', out[1] + '?t=' + t);
                    t_interval.attr("preImage", out[1]);
                }
            });
        }
        else
        {

            var t = new Date().getTime();
            if (preslanes === "")
            {
                var img_path = $("#task_info").attr("task_img");
                $("#imag1").attr('src', img_path + "?t=" + t);
            }
            else
            {
                $("#imag1").attr('src', preImage + "?t=" + t);
            }
        }
    }
    else
    {
        parent.attr("show", "0");
        $("#t_interval_tasks_" + index).slideUp();
        var img_path = $("#task_info").attr("task_img");
        $("#imag1").attr('src', img_path + "?t=" + t);
    }


}

function createTimedTask()
{
    $("#task_create_time_interval").attr("onclick", "task_time_Save();");
    $("#task_time_box").show();
}

function showEditTimedTask(index)
{

    var parent = $("#t_interval_" + index);
    var ids = parent.attr("ids");
    if (ids !== undefined && ids !== "")
    {
        ids = ids.split("_");
        for (var i = 0; i < ids.length; i++)
        {
            var status = $("#t_task_" + ids[i]).attr("status");
            if (status !== "0")
            {
                alert("此调查时段包含已经进行或者完成的任务，你不能修改此调查时段");
                return false;
            }
        }
    }
    $("#task_create_time_interval").attr("onclick", "editTaskTimedRange('" + index + "');");
    $("#task_time_box").show();
}

function showAddTimedTask(index)
{
    var t_interval = $("#t_interval_" + index);
    var data = $("#task_info").attr("laneinfo");
    var pid = $("#mainSurveyPage").attr("pid");
    var slanes = "";
    var preslanes = t_interval.attr("preslanes");
    var spoints = "0_0";

    var preslanesOld = t_interval.attr("preslanesOld");
    var preImage = t_interval.attr("preImage");
    if (preslanes !== preslanesOld)
    {
        var xcenter = $("#task_info").attr("xcenter");
        var ycenter = $("#task_info").attr("ycenter");
        var data1 = xcenter + "_" + ycenter + "D" + data;
        $.post("../../HandleCreateTask", {data: data1, spoints: spoints, slanes: slanes, pid: pid, preslanes: preslanes, option: 0}, function (result)
        {

            if (result.startsWith("1_"))
            {
                alert(result);
            }
            else
            {
                var out = result.split("M");
                var t = new Date().getTime();
                $("#imag1").attr('src', out[1] + '?t=' + t);
                t_interval.attr("preImage", out[1]);
                $("#task_item_show").show();
                //t_interval = $("#t_interval_" + index);
                $("#task_item_show").attr("timeGroup", index);
                t_interval.attr("preslanesOld", preslanes);
                $("#task_item_show").attr("preslanes", preslanes);
                $("#task_item_show").attr("option", "1");
                var stime = t_interval.attr("stime");
                var etime = t_interval.attr("etime");
                $("#t_task_show_time").html(stime + "--" + etime);
                //showDirections(out[0], out[2]);


                $("#task_cars_info").html("");
                var ptasks = $("#t_interval_tasks_group_" + index);
                var allPs = ptasks.find(".taskitemclass");
                if (allPs !== undefined && allPs !== null)
                {
                    var data = $(allPs[0]).attr("data");
                    data = JSON.parse(data);
                    var cars = data.peizhi;
                    for (var i = 0; i < cars.length; i++)
                    {

                        var car = cars[i];
                        var caricon = getCarICON(cars[i].type, 0);

                        var content = '<div class="dropdown iconCarDiv" id="car_type_icon_temp_div_' + car.id + '" data=\'' + JSON.stringify(car) + '\'><i class="' + caricon + ' carIconTask" aria-hidden="true" data-toggle="dropdown"  data-placement="bottom" title="' + car.name + '" id="car_type_icon_temp_' + car.id + '" ></i>'
                                + '<div class="dropdown-menu" style="width:240px;height:120px;background:gainsboro;" aria-labelledby="car_type_icon_temp_' + i + '">'
                                + '<table class="table table-condensed" style="border:none;width:100%;">'
                                + '<tbody>'
                                + '<tr>'
                                + '<td style="border:none">车型:</td><td style="border:none">' + car.name + '</td>'
                                + '</tr>';
//                                + '<tr>'
//                                + '<td style="border:none">车长:</td>'
//                                + '<td style="border:none"><input type="text" id="c_min_length_temp_' + car.id + '"style="width:60px;" value="' + car.min_length + '">--<input type="text" style="width:60px;" id="c_max_length_temp_' + car.id + '" name="pei_name" value="' + car.max_length + '">米</td>'
//                                + '</tr>'
//                                + '<tr>'
//                                + '<td style="border:none">载重:</td>'
//                                + '<td style="border:none">'
//                                + '<input type="text" name="pei_name" style="width:60px;" id="c_min_weight_temp_' + car.id + '" value="' + car.min_weight + '">--<input type="text" name="pei_name" style="width:60px;" id="c_max_weight_temp_' + car.id + '" value="' + car.max_weight + '">吨</td>'
//                                + '</tr>';

                        if (car.car_factor !== 0)
                        {
                            content += '<tr>'
                                    + '<td style="border:none" colspan="2">小汽车换算系数:&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" name="pei_name" style="width:60px;" id="car_factor_temp_' + car.id + '" value="' + car.car_factor + '"></td>'

                                    + '</tr>';
                        }

                        content += '<tr>'
                                + '<td style="border:none; text-align: left" colspan="2">'
                                + '<button type="button" class="btn btn-success" onclick="carTypeConfirm_Temp(\'' + car.id + '\')">修改</button>'
                                + '</td>'
                                + '</tr>'
                                + '</tbody>'
                                + '</table>'
                                + '</div>'
                                + '<br/><div style="width:inherit;text-align:center;"><i class="fa fa-times-circle carTempICOND"  aria-hidden="true" onclick="removeTaskCarTemp(\'' + car.id + '\')"></i></div></div>';
                        var item = $(content);
                        $("#task_cars_info").append(item);
                    }
                }



            }
        });
    }
    else
    {

        var t = new Date().getTime();

        if (preslanes === "")
        {
            var img_path = $("#task_info").attr("task_img");
            $("#imag1").attr('src', img_path + "?t=" + t);
        }
        else
        {
            $("#imag1").attr('src', preImage + "?t=" + t);
        }

        $("#task_item_show").show();

        $("#task_item_show").attr("timeGroup", index);
        $("#task_item_show").attr("preslanes", preslanes);
        $("#task_item_show").attr("option", "1");
        var stime = t_interval.attr("stime");
        var etime = t_interval.attr("etime");
        $("#t_task_show_time").html(stime + "--" + etime);
        $("#task_cars_info").html("");
        var ptasks = $("#t_interval_tasks_group_" + index);
        var allPs = ptasks.find(".taskitemclass");
        if (allPs !== undefined && allPs !== null)
        {
            var data = $(allPs[0]).attr("data");
            data = JSON.parse(data);
            var cars = data.peizhi;
            for (var i = 0; i < cars.length; i++)
            {

                var car = cars[i];
                var caricon = getCarICON(cars[i].type, 0);

                var content = '<div class="dropdown iconCarDiv" id="car_type_icon_temp_div_' + car.id + '" data=\'' + JSON.stringify(car) + '\'><i class="' + caricon + ' carIconTask" aria-hidden="true" data-toggle="dropdown"  data-placement="bottom" title="' + car.name + '" id="car_type_icon_temp_' + car.id + '" ></i>'
                        + '<div class="dropdown-menu" style="width:240px;height:120px;background:gainsboro;" aria-labelledby="car_type_icon_temp_' + i + '">'
                        + '<table class="table table-condensed" style="border:none;width:100%;">'
                        + '<tbody>'
                        + '<tr>'
                        + '<td style="border:none">车型:</td><td style="border:none">' + car.name + '</td>'
                        + '</tr>';
//                        + '<tr>'
//                        + '<td style="border:none">车长:</td>'
//                        + '<td style="border:none"><input type="text" id="c_min_length_temp_' + car.id + '"style="width:60px;" value="' + car.min_length + '">--<input type="text" style="width:60px;" id="c_max_length_temp_' + car.id + '" name="pei_name" value="' + car.max_length + '">米</td>'
//                        + '</tr>'
//                        + '<tr>'
//                        + '<td style="border:none">载重:</td>'
//                        + '<td style="border:none">'
//                        + '<input type="text" name="pei_name" style="width:60px;" id="c_min_weight_temp_' + car.id + '" value="' + car.min_weight + '">--<input type="text" name="pei_name" style="width:60px;" id="c_max_weight_temp_' + car.id + '" value="' + car.max_weight + '">吨</td>'
//                        + '</tr>'
//                        + '<tr>';

                if (car.car_factor !== 0)
                {
                    content += '<tr>'
                            + '<td style="border:none" colspan="2">小汽车换算系数:&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" name="pei_name" style="width:60px;" id="car_factor_temp_' + car.id + '" value="' + car.car_factor + '"></td>'

                            + '</tr>';
                }

                content += '<tr>'
                        + '<td style="border:none; text-align: left" colspan="2">'
                        + '<button type="button" class="btn btn-success" onclick="carTypeConfirm_Temp(\'' + car.id + '\')">修改</button>'
                        + '</td>'
                        + '</tr>'
                        + '</tbody>'
                        + '</table>'
                        + '</div>'
                        + '<br/><div style="width:inherit;text-align:center;"><i class="fa fa-times-circle carTempICOND"  aria-hidden="true" onclick="removeTaskCarTemp(\'' + car.id + '\')"></i></div></div>';
                var item = $(content);
                $("#task_cars_info").append(item);
            }
        }
    }


}

function cancelTaskToTimedRange()
{
    task_disableClick();
    $("#task_cars_info").html("");
    $("#task_item_show").hide();
    $("#task_info").attr("imagePick", "0");
    $("#task_item_show").attr("current_slanes", "");
    $("#task_item_show").attr("current_spoints", "");
    var imgPath = $("#task_info").attr("task_img");
    $("#imag1").attr('src', imgPath);

}

function deleteTaskTimedRange(index)
{
    var parent = $("#t_interval_" + index);
    var ids = parent.attr("ids");
    if (ids === undefined)
    {
        parent.remove();
    }
    else
    {
        if (ids !== "")
        {
            ids = ids.split("_");
            for (var i = 0; i < ids.length; i++)
            {
                var status = $("#t_task_" + ids[i]).attr("status");
                if (status !== "0")
                {
                    alert("此调查时段包含已经进行或者完成的任务，你不能删除此调查时段");
                    return false;
                }
            }
        }
        if (confirm("你确定要删除此调查时段和它包含的所有任务吗？"))
        {
            var ids = parent.attr("ids");
            $.ajax({
                url: "../../HandleDeleteGroupTaskItem",
                data: {"ids": ids, tgid: index},
                type: "GET",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
                },
                success: function (result) {
                    if (result === "0")
                    {
                        alert("调查时段没有删除成功，请重新尝试");
                    }
                    else
                    {
                        var model = JSON.parse(result);
                        if (model.type === 1)
                        {

                            createIntersectionModel(model.id, model.lat, model.lng);
                            $("#task_info").attr("laneinfo", model.laneinfo);
                            $("#task_info").attr("lanes", JSON.stringify(model.lanes));
                            $("#task_info").attr("xcenter", model.xcenter);
                            $("#task_info").attr("ycenter", model.ycenter);
                            $("#task_info").attr("task_img", model.img_path);
                            $("#imag1").attr("src", model.img_path);
                            $("#t_model_date").val(model.mdate);
                            $("#img_result").attr("src", model.img_path);
                            $("#intersection").attr("laneinfo", model.laneinfo);
                            setLanesObject(model.laneinfo);
                            loadTaskItems(model.group_tasks, model.type);
                            alert("调查时段删除成功");
                            $("#task_time_box").hide();
                            //cancelTaskToTimedRange();
                        }
                    }
                }
            });
        }
    }
}

function copyTaskTimedRange(index)
{
    selectTimedTaskRange(index);
}

function doCopyTaskTimedRange(index)
{
    var stime = $("#t_task_copy_stime").val();
    var etime = $("#t_task_copy_etime").val();
    var duration = getTimeDiff(stime, etime);
    if (duration <= 0)
    {
        alert("时间选择不正确");
        return false;
    }
    var parent = $("#t_interval_" + index);
    var copyItem = null;
    var tgs = $("#task_info").find(".list_time_group");
    if (tgs !== undefined && tgs !== null && tgs.length > 0)
    {
        for (var i = 0; i < tgs.length; i++)
        {
            var temp = tgs[i];
            if (stime === $(temp).attr("stime") && etime === $(temp).attr("etime"))
            {
                copyItem = temp;
                break;
            }
        }
    }
    if (copyItem !== null)
    {
        alert("已经存在相同的时间的调查时段，你不能重复复制创建");
        return false;
    }
    var ids = parent.attr("ids");
    if (ids === undefined || ids === "")
    {
        alert("你当前的调查时段没有任务，不能进行复制操作");
        return false;
    }
    else
    {
        $.ajax({
            url: "../../HandleCopyGroupTaskItem",
            data: {"ids": ids, stime: stime, etime: etime, duration: duration, tgid: index},
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
            },
            success: function (result) {
                if (result === "0")
                {
                    alert("复制调查时段没有成功，请重新尝试");
                }
                else
                {
                    var model = JSON.parse(result);
                    if (model.type === 1)
                    {

                        createIntersectionModel(model.id, model.lat, model.lng);
                        $("#task_info").attr("laneinfo", model.laneinfo);
                        $("#task_info").attr("lanes", JSON.stringify(model.lanes));
                        $("#task_info").attr("task_img", model.img_path);
                        $("#task_info").attr("xcenter", model.xcenter);
                        $("#task_info").attr("ycenter", model.ycenter);
                        $("#imag1").attr("src", model.img_path);
                        $("#t_model_date").val(model.mdate);
                        $("#img_result").attr("src", model.img_path);
                        $("#intersection").attr("laneinfo", model.laneinfo);
                        setLanesObject(model.laneinfo);
                        loadTaskItems(model.group_tasks, model.type);
                        alert("复制调查时段成功");
                        $("#myModalSurvey").modal("hide");
                        //cancelTaskToTimedRange();
                    }
                }
            }
        });
    }


}

function selectTimedTaskRange(index)
{
    var content;
    content = '<div class="modal-dialog">'

            + '<div class="modal-content">'
            + '<div class="modal-header">'
            + '<button type="button" class="close" data-dismiss="modal">&times;</button>'
            + '<h4 class="modal-title">请选新复制的调查时段的时间:</h4>'
            + '</div>'
            + '<div class="modal-body">'
            + '<span style="font-size:18px;color:black;margin-left: 40px;">调查开始的时间:</span><select style="font-size:18px;color:black;"  name="t_task_copy_date" id="t_task_copy_stime"></select><br/>'
            + '<span style="font-size:18px;color:black;margin-left: 40px;">调查结束的时间:</span><select style="font-size:18px;color:black;" name="t_task_copy_date" id="t_task_copy_etime"></select>';
    content += '</div>'
            + '<div class="modal-footer">'
            + '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>'

            + '<button type="button" class="btn btn-default" onclick="doCopyTaskTimedRange(\'' + index + '\')">确定</button>'
            + '</div>'
            + '</div>'
            + '</div>';

    var dig = document.getElementById("myModalSurvey");
    dig.innerHTML = "";
    dig.innerHTML = content;
    getTimeSlots("t_task_copy_stime");
    getTimeSlots("t_task_copy_etime");
    $("#myModalSurvey").modal();
}

function editTaskTimedRange(index)
{
    index = parseInt(index);
    var stime = $('#stime').val();
    var etime = $('#etime').val();
    var duration = getTimeDiff(stime, etime);
    if (duration <= 0)
    {
        alert("时间选择不正确");
    }
    else
    {
        var parent = $("#t_interval_" + index);

        //change childern
        var copyItem = null;
        var tgs = $("#task_info").find(".list_time_group");
        if (tgs !== undefined && tgs !== null && tgs.length > 0)
        {
            for (var i = 0; i < tgs.length; i++)
            {
                var temp = tgs[i];
                if (stime === $(temp).attr("stime") && etime === $(temp).attr("etime"))
                {
                    copyItem = temp;
                    break;
                }
            }
        }
        if (copyItem !== null)
        {
            if (confirm("已经存在相同的调查时段，你想合并到此调查时段吗？"))
            {
                var ids = parent.attr("ids");
                if (ids === undefined)
                {
                    parent.remove();
                }
                else
                {
                    $.ajax({
                        url: "../../HandleModifyGroupTaskItem",
                        data: {"ids": ids, stime: stime, etime: etime, duration: duration, tgid: index},
                        type: "GET",
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
                        },
                        success: function (result) {
                            if (result === "0")
                            {
                                alert("调查时段没有修改成功，请重新尝试");
                            }
                            else
                            {
                                var model = JSON.parse(result);
                                if (model.type === 1)
                                {

                                    createIntersectionModel(model.id, model.lat, model.lng);
                                    $("#task_info").attr("laneinfo", model.laneinfo);
                                    $("#task_info").attr("lanes", JSON.stringify(model.lanes));
                                    $("#task_info").attr("task_img", model.img_path);
                                    $("#task_info").attr("xcenter", model.xcenter);
                                    $("#task_info").attr("ycenter", model.ycenter);
                                    $("#imag1").attr("src", model.img_path);
                                    $("#t_model_date").val(model.mdate);
                                    $("#img_result").attr("src", model.img_path);
                                    $("#intersection").attr("laneinfo", model.laneinfo);
                                    setLanesObject(model.laneinfo);
                                    loadTaskItems(model.group_tasks, model.type);
                                    alert("调查时段修改成功");
                                    $("#task_time_box").hide();
                                    //cancelTaskToTimedRange();
                                }
                            }
                        }
                    });
                }
            }
        }
        else
        {
            var ids = parent.attr("ids");
            if (ids === undefined)
            {
                var name = "时间段:" + stime + "--" + etime + ", " + duration + "分钟";
                $("#t_interval_name_" + index).text(name);
                parent.attr("stime", stime);
                parent.attr("etime", etime);
                parent.attr("duration", duration);
            }
            else
            {
                $.ajax({
                    url: "../../HandleModifyGroupTaskItem",
                    data: {"ids": ids, stime: stime, etime: etime, duration: duration, tgid: index},
                    type: "GET",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
                    },
                    success: function (result) {
                        if (result === "0")
                        {
                            alert("调查时段没有修改成功，请重新尝试");
                        }
                        else
                        {
                            var model = JSON.parse(result);
                            if (model.type === 1)
                            {
                                createIntersectionModel(model.id, model.lat, model.lng);
                                $("#task_info").attr("laneinfo", model.laneinfo);
                                $("#task_info").attr("lanes", JSON.stringify(model.lanes));
                                $("#task_info").attr("task_img", model.img_path);
                                $("#task_info").attr("xcenter", model.xcenter);
                                $("#task_info").attr("ycenter", model.ycenter);
                                $("#imag1").attr("src", model.img_path);
                                $("#t_model_date").val(model.mdate);
                                $("#img_result").attr("src", model.img_path);
                                $("#intersection").attr("laneinfo", model.laneinfo);
                                setLanesObject(model.laneinfo);
                                loadTaskItems(model.group_tasks, model.type);
                                alert("调查时段修改成功");
                                $("#task_time_box").hide();
                                //cancelTaskToTimedRange();
                            }
                        }
                    }
                });
            }
        }




    }
}

function task_time_Cancel()
{
    $("#task_time_box").hide();
}

function getModelCarsTypes()
{
    var stmid = $("#intersection_section").attr("stmid");
    $.post("../../HandleGetModelCarTypes", {stmid: stmid}, function (result)
    {
        if (result === "0")
        {
            alert("系统出现错误，请刷新页面");
        }
        else if (result === "")
        {
            alert("数据库发生异常，刷新页面");
        }
        else
        {
            var cars = JSON.parse(result);
            loadAllNavCarsTypeOwn(cars);

        }

    });
}

function carTypeConfirm(id)
{
    var stmid = $("#intersection_section").attr("stmid");
    if (stmid === "0")
    {
        var car = $("#car_type_icon_" + id).attr("data");
        car = JSON.parse(car);
//        car.min_length = $("#c_min_length_" + id).val();
//        car.max_length = $("#c_max_length_" + id).val();
//        car.min_weight = $("#c_min_weight_" + id).val();
//        car.max_weight = $("#c_max_weight_" + id).val();
        car.car_factor = $("#car_factor_" + id).val();
        car = JSON.stringify(car);
        $("#car_type_icon_" + id).attr("data", car);
        alert("修改成功");
    }
    else
    {

        var car = $("#car_type_icon_" + id).attr("data");
        car = JSON.parse(car);
//        car.min_length = $("#c_min_length_" + id).val();
//        car.max_length = $("#c_max_length_" + id).val();
//        car.min_weight = $("#c_min_weight_" + id).val();
//        car.max_weight = $("#c_max_weight_" + id).val();
        car.car_factor = $("#car_factor_" + id).val();
        $.ajax({
            url: "../../HandleModifyModelCar",
            data: {"car": car, "stmid": stmid},
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
            },
            success: function (result) {
                if (result === "0")
                {
                    alert("车型信息没有修改成功，请重新尝试");
                }
                else
                {
                    var cars = JSON.parse(result);
                    loadAllNavCarsTypeOwn(cars);
                }
            }
        });
    }
}

function loadAllNavCarsType(cars)
{
    $("#intersection_cars").html("");
    var title = $('<span style="color:black;font-size:16px; margin-right: 10px;" >调查车型库:</span>');
    $("#intersection_cars").append(title);
    for (var i = 0; i < cars.length && i < 9; i++)
    {
        var caricon = getCarICON(cars[i].type, 1);
        var content = "";
        var title = '<div class="dropdown iconCarDiv" id="car_nav_block_' + cars[i].id + '"><i class="' + caricon + ' fa-2x carIcon modelCarICON navBarCarICON" aria-hidden="true" data-toggle="dropdown"  data-placement="bottom" title="' + cars[i].name + '" id="car_type_icon_' + (cars[i].id) + '" data=\'' + JSON.stringify(cars[i]) + '\'></i>';
        var title1 = '<div class="dropdown iconCarDiv" id="car_nav_block_' + cars[i].id + '"><i class="fa ' + caricon + ' fa-2x carIcon modelCarICON navBarCarICON" aria-hidden="true" data-toggle="dropdown"  data-placement="bottom" title="' + cars[i].name + '" id="car_type_icon_' + (cars[i].id) + '" data=\'' + JSON.stringify(cars[i]) + '\'></i>';

        content += title + '<div class="dropdown-menu" style="" aria-labelledby="car_type_icon_' + (cars[i].id) + '">'
                + '<table class="table table-condensed" style="border:none;width:100%;">'
                + '<tbody>'
                + '<tr>'
                + '<td style="border:none">车型:</td><td style="border:none">' + cars[i].name + '</td>'
                + '</tr>';
//                + '<tr>'
//                + '<td style="border:none">车长:</td>'
//                + '<td style="border:none"><input type="text" id="c_min_length_' + (cars[i].id) + '"style="width:60px;" value="' + cars[i].min_length + '">--<input type="text" style="width:60px;" id="c_max_length_' + (cars[i].id) + '" name="pei_name" value="' + cars[i].max_length + '">米</td>'
//                + '</tr>'
//                + '<tr>'
//                + '<td style="border:none">载重:</td>'
//                + '<td style="border:none">'
//                + '<input type="text" name="pei_name" style="width:60px;" id="c_min_weight_' + (cars[i].id) + '" value="' + cars[i].min_weight + '">--<input type="text" name="pei_name" style="width:60px;" id="c_max_weight_' + (cars[i].id) + '" value="' + cars[i].max_weight + '">吨</td>'
//                + '</tr>'
//                + '<tr>';

        if (cars[i].car_factor !== 0)
        {
            content += '<tr>'
                    + '<td style="border:none" colspan="2">小汽车换算系数:&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" name="pei_name" style="width:60px;" id="car_factor_temp_' + cars[i].id + '" value="' + cars[i].car_factor + '"></td>'

                    + '</tr>';
        }

        content += '<tr>'
                + '<td style="border:none; text-align: left" colspan="2">'
                + '<button type="button" class="btn btn-success" onclick="carTypeConfirm(\'' + (cars[i].id) + '\')">修改</button>'
                + '</td>'
                + '</tr>'
                + '</tbody>'
                + '</table>'
                + '</div></div>';
        var item = $(content);
        $("#intersection_cars").append(item);
//        $('#car_nav_block_' + cars[i].id).on("show.bs.dropdown", function (event) {
//            var car = $("#car_type_icon_" + cars[i].id).attr("data");
//            car = JSON.parse(car);
//            $("c_min_length_" + car.id).val(car.min_length);
//            $("c_max_length_" + car.id).val(car.max_length);
//            $("c_min_weight_" + car.id).val(car.min_weight);
//            $("c_max_weight_" + car.id).val(car.max_weight);
//            $("car_factor_" + car.id).val(car.car_factor);
//        });
    }

    var addOP = '<div class="dropdown iconCarDiv" id="default_car_add"><i class="fa fa-plus-circle fa-2x carIcon" aria-hidden="true" onclick="showAddNewCarType();"></i></div>';
    $("#intersection_cars").append(addOP);
    loadDraggable_Model_Cars();
}

function loadAllNavCarsTypeOwn(cars)
{
    $("#intersection_cars").html("");
    var title = $('<span style="color:black;font-size:16px; margin-right: 10px;" >调查车型库:</span>');
    $("#intersection_cars").append(title);
    for (var i = 0; i < cars.length && i < 9; i++)
    {
        var caricon = getCarICON(cars[i].type, 1);
        var content = "";
        var title = '<div class="dropdown iconCarDiv" id="car_nav_block_' + cars[i].id + '"><i class="' + caricon + ' carIcon_nav modelCarICON navBarCarICON" aria-hidden="true" data-toggle="dropdown"  data-placement="bottom" title="' + cars[i].name + '" id="car_type_icon_' + (cars[i].id) + '" data=\'' + JSON.stringify(cars[i]) + '\'></i>';
        content += title + '<div class="dropdown-menu" style="width:240px;height:120px;background:gainsboro;" aria-labelledby="car_type_icon_' + (cars[i].id) + '">'
                + '<table class="table table-condensed" style="border:none;width:100%;">'
                + '<tbody>'
                + '<tr>'
                + '<td style="border:none">车型:</td><td style="border:none">' + cars[i].name + '</td>'
                + '</tr>';
//                + '<tr>'
//                + '<td style="border:none">车长:</td>'
//                + '<td style="border:none"><input type="text" id="c_min_length_' + (cars[i].id) + '"style="width:60px;" value="' + cars[i].min_length + '">--<input type="text" style="width:60px;" id="c_max_length_' + (cars[i].id) + '" name="pei_name" value="' + cars[i].max_length + '">米</td>'
//                + '</tr>'
//                + '<tr>'
//                + '<td style="border:none">载重:</td>'
//                + '<td style="border:none">'
//                + '<input type="text" name="pei_name" style="width:60px;" id="c_min_weight_' + (cars[i].id) + '" value="' + cars[i].min_weight + '">--<input type="text" name="pei_name" style="width:60px;" id="c_max_weight_' + (cars[i].id) + '" value="' + cars[i].max_weight + '">吨</td>'
//                + '</tr>';

        if (cars[i].car_factor !== 0)
        {
            content += '<tr>'
                    + '<td style="border:none" colspan="2">小汽车换算系数:&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" name="pei_name" style="width:60px;" id="car_factor_temp_' + cars[i].id + '" value="' + cars[i].car_factor + '"></td>'

                    + '</tr>';
        }

        content += '<tr>'
                + '<td style="border:none; text-align: left" colspan="2">'
                + '<button type="button" class="btn btn-success" onclick="carTypeConfirm(\'' + (cars[i].id) + '\')">修改</button>'
                + '</td>'
                + '</tr>'
                + '</tbody>'
                + '</table>'
                + '</div></div>';
        var item = $(content);
        $("#intersection_cars").append(item);

    }

    var addOP = '<div class="dropdown iconCarDiv" id="default_car_add"><i class="carIcon fa fa-caret-square-o-down fa-2x" id="show_more_cars_icon" onclick="showAllCarTypes();"></i></div>' + showOtherCarICONS(cars);
    $("#intersection_cars").append(addOP);
    loadDraggable_Model_Cars();
}

function showOtherCarICONS(cars)
{
    var content = '<div id="showOtherCars" class="otherCars" style="width:250px;display:none;"><table style="margin-top:5px;margin-left:10px;">';
    for (var i = 9; i < cars.length; i++)
    {
        var m = i - 9;
        var caricon = getCarICON(cars[i].type, 0);
        var title;
        if (m % 6 === 0)
        {
            title = '<tr><td><div class="dropdown iconCarDiv" id="car_nav_block_' + cars[i].id + '"><i class="' + caricon + ' carIcon_nav modelCarICON navBarCarICON" aria-hidden="true" data-toggle="dropdown"  data-placement="bottom" title="' + cars[i].name + '" id="car_type_icon_' + (cars[i].id) + '" data=\'' + JSON.stringify(cars[i]) + '\'></i>';

        }
        else
        {
            title = '<td><div class="dropdown iconCarDiv" id="car_nav_block_' + cars[i].id + '"><i class="' + caricon + ' carIcon_nav modelCarICON navBarCarICON" aria-hidden="true" data-toggle="dropdown"  data-placement="bottom" title="' + cars[i].name + '" id="car_type_icon_' + (cars[i].id) + '" data=\'' + JSON.stringify(cars[i]) + '\'></i>';

        }
        content += title + '<div class="dropdown-menu" style="width:240px;height:120px;background:gainsboro;" aria-labelledby="car_type_icon_' + (cars[i].id) + '">'
                + '<table class="table table-condensed" style="border:none;width:100%;">'
                + '<tbody>'
                + '<tr>'
                + '<td style="border:none">车型:</td><td style="border:none">' + cars[i].name + '</td>'
                + '</tr>';
//                + '<tr>'
//                + '<td style="border:none">车长:</td>'
//                + '<td style="border:none"><input type="text" id="c_min_length_' + (cars[i].id) + '"style="width:60px;" value="' + cars[i].min_length + '">--<input type="text" style="width:60px;" id="c_max_length_' + (cars[i].id) + '" name="pei_name" value="' + cars[i].max_length + '">米</td>'
//                + '</tr>'
//                + '<tr>'
//                + '<td style="border:none">载重:</td>'
//                + '<td style="border:none">'
//                + '<input type="text" name="pei_name" style="width:60px;" id="c_min_weight_' + (cars[i].id) + '" value="' + cars[i].min_weight + '">--<input type="text" name="pei_name" style="width:60px;" id="c_max_weight_' + (cars[i].id) + '" value="' + cars[i].max_weight + '">吨</td>'
//                + '</tr>';

        if (cars[i].car_factor !== 0)
        {
            content += '<tr>'
                    + '<td style="border:none" colspan="2">小汽车换算系数:&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" name="pei_name" style="width:60px;" id="car_factor_temp_' + cars[i].id + '" value="' + cars[i].car_factor + '"></td>'

                    + '</tr>';
        }

        content += '<tr>'
                + '<td style="border:none; text-align: left" colspan="2">'
                + '<button type="button" class="btn btn-success" onclick="carTypeConfirm(\'' + (cars[i].id) + '\')">修改</button>'
                + '</td>'
                + '</tr>'
                + '</tbody>'
                + '</table>'
                + '</div></div></td>';
        if ((m + 1) % 6 === 0 && i + 1 !== cars.length)
        {
            content += '</tr>';
        }
        if (i + 1 === cars.length)
        {
            content += '</tr>';
        }
    }
    content += '</table></div>';
    return content;
}

function showAllCarTypes()
{

    var isShown = $("#showOtherCars").is(':visible');
    if (isShown)
    {
        $("#showOtherCars").hide();
    }
    else
    {
        $("#showOtherCars").show();
    }
}

function confirmAddNewCarType()
{
    var stmid = $("#intersection_section").attr("stmid");
    if (stmid === "0")
    {

    }
    else
    {
        var name = $("add_nav_car_name").val();
        var min_length = $("add_nav_car_min_length").val();
        var max_length = $("add_nav_car_max_length").val();
        var min_weight = $("add_nav_car_min_weight").val();
        var max_weight = $("add_nav_car_max_weight").val();
        var car_factor = $("add_nav_car_car_factor").val();
    }
}

function confirmIntersectionModel()
{
    var allslanes = $("#intersection").attr("laneInfo");
    if (allslanes === "")
    {
        alert("请先创建交叉口渠化模型");
    }
    else
    {
        var stmid = $("#intersection_section").attr("stmid");
        if (stmid === "0")
        {
            createTaskModelFirst();
        }
        else
        {
            updateTaskModelFirst();
        }
    }
}

function getNavSelectionModel(spid, stmid, lat, lng)
{
    stmid = parseInt(stmid);
    var content = "";
    content += '<select id="intersection_model_option" class="form-control" style="width:200px; color:black;" onchange="createIntersectionModelImage()">';

    $.post("../../HandleGetModelImageHistory", {spid: spid, lat: lat, lng: lng}, function (out)
    {
        if (out === "" || out === "0")
        {

            content += '<option disabled selected>选择交叉口渠化模型</div>'
                    + '<option value="0" id="model_image_nav_0">新建渠化模型</div>'
                    + '</select>';
            $("#intersection_model").html(content);
        }
        else
        {
            var models = JSON.parse(out);
            if (stmid === 0)
            {
                content += '<option disabled selected>选择交叉口渠化模型</div>'
                        + '<option value="0" id="model_image_nav_0">新建渠化模型</div>';
                for (var i = 0; i < models.length; i++)
                {
                    var model = models[i];
                    var tss = model.mdate.split("-");
                    var name = tss[0] + "年" + tss[1] + "月" + tss[2] + "日的调查模型";
                    content += '<option value="' + model.id + '" id="model_image_nav_' + model.id + '" intersection=\'' + model.laneinfo + '\' img_path=\'' + model.img_path + '\'>' + name + '</div>';
                }
                content += '</select>';

            }
            else
            {
                for (var i = 0; i < models.length; i++)
                {
                    var model = models[i];

                    if (stmid === model.id)
                    {
                        var tss = model.mdate.split("-");
                        var name = "当前的调查模型";

                        content += '<option selected value="' + model.id + '" id="model_image_nav_' + model.id + '" intersection=\'' + model.laneinfo + '\' img_path=\'' + model.img_path + '\'>' + name + '</div>';
                        content += '<option value="-1" id="model_image_nav_01">修改渠化模型</div>';
                    }
                    else
                    {
                        //content += '<option value="' + models.id + '" id="model_image_nav_' + models.id + '" intersection=\'' + model.laneinfo + '\' img_path=\'' + model.img_path + '\'>' + name + '</div>';
                    }
                }
                content += '</select>';
            }

            $("#intersection_model").html(content);

        }
    });
}

function createIntersectionModel(stmid, lat1, lng1)
{

    var content = "";
    content += '<div  id="intersection_section" min-width:1800px; stmid="' + stmid + '" style="display:block;" lat="' + lat1 + '" lng="' + lng1 + '">'
            + '<div style="width:inherit;height: 40px;margin-left: 30px;">'
            + '<div id="model_date" class="model_date">'
            + '<span style="color:black;font-size:16px; margin-right: 5px;" >调查日期:</span><input style="font-size:18px;color:black; width:170px;" type="date" name="t_model_date" id="t_model_date" placeholder="调查日期" >'
            + '</div>'
            + '<div id="intersection_model" class="con_buttons intersection_bottom_button1" style="display:inline-block;">'

            + '</div>'

            + '<div id="intersection_cars" class="con_buttons carIcons">'

            + '</div>'

            + '<div class="model_date" style="position:relative;top:-5px;">'
            + '<button type="button" class="btn btn-success" style="margin-left:20px; display:none;" id="intersection_image_save"" onclick="confirmIntersectionModel()">使用此渠化模型</button>'
            + '</div>'
            + '</div>'
            + '<div class="in_section_1" style="display:none;" id="intersection_quhua" flag="false">'
            + '<div class="demo lock nav_body nav_layout">'
            + '<div class="left_nav" style="width:450px;height:300px;">'
            + '<div id="tb-map" style="width:450px;height:300px;">'

            + '</div>'

            + '<div id="intersection_canvas" operation="0" style="position:relative;top:-40px;">'
            + '<canvas id="inter_template" style="width:450px;height:360px;"></canvas>'
            + '</div>'

            + '</div>'
            + '<div class="canvas_buttons"> <button type="button" id="cavans_button_add" class="btn btn-success canvas_button" onclick="enableAddLink()"><i class="icon-icon-add" data-toggle="tooltip" data-placement="bottom" title="添加车道"></i></button>'
            + '<button type="button" class="btn btn-success canvas_button" id="cavans_button_rotate" onclick="enableRotateLink()"><i class="icon-icon-rotate" data-toggle="tooltip" data-placement="bottom" title="旋转车道"></i></button>'
            + '<button type="button" class="btn btn-success canvas_button" id="cavans_button_delete" onclick="enableDeleteLink()"><i class="icon-icon-delete" data-toggle="tooltip" data-placement="bottom" title="删除车道"></i></button></div>'
            + '<div class="sideBySide nav_side">'
            + '<div class="tool_bar">'
            + '<div>'
            + '<span>进口道车道功能</span>'
            + ' <ul class="nav nav-pills sourcejQ_inter" style="width:450px;margin-bottom: 5px;">'


            + '<li type="1" class="r_li"><img src="./roadSym/1.jpg" class="r_tb" alt="调头行车道"></li>'
            + '<li type="2" class="r_li"><img src="./roadSym/2.jpg" class="r_tb" alt="左转掉头行车道"></li>'
            + '<li type="4" class="r_li"><img src="./roadSym/4.jpg" class="r_tb" alt="左转行车道"></li>'
            + '<li type="7" class="r_li"><img src="./roadSym/7.jpg" class="r_tb" alt="出直行车道"></li>'
            + '<li type="9" class="r_li"><img src="./roadSym/9.jpg" class="r_tb" alt="右转行车道"></li>'
            + '<li type="5" class="r_li"><img src="./roadSym/5.jpg" class="r_tb" alt="左转直行车道"></li>'
            + '<li type="8" class="r_li"><img src="./roadSym/8.jpg" class="r_tb" alt="右转直行车道"></li>'
            + '<li type="6" class="r_li"><img src="./roadSym/6.jpg" class="r_tb" alt="左右直行车道"></li>'


            + '</ul>'
            + '</div>'
            + '<div>'
            + '<ul class="nav nav-pills sourcejQ_inter" style="width:450px;margin-bottom: 5px;">'
            + '<li type="10" class="r_li"><img src="./roadSym/10.jpg" class="r_tb" alt="调头行车道"></li>'
            + '<li type="11" class="r_li"><img src="./roadSym/11.jpg" class="r_tb" alt="左转掉头行车道"></li>'
            + '<li type="13" class="r_li"><img src="./roadSym/13.jpg" class="r_tb" alt="左转行车道"></li>'
            + '<li type="16" class="r_li"><img src="./roadSym/16.jpg" class="r_tb" alt="出直行车道"></li>'
            + '<li type="18" class="r_li"><img src="./roadSym/18.jpg" class="r_tb" alt="右转行车道"></li>'
            + '<li type="14" class="r_li"><img src="./roadSym/14.jpg" class="r_tb" alt="左转直行车道"></li>'
            + '<li type="17" class="r_li"><img src="./roadSym/17.jpg" class="r_tb" alt="右转直行车道"></li>'
            + '<li type="15" class="r_li"><img src="./roadSym/15.jpg" class="r_tb" alt="左右直行车道"></li>'
            + '</ul>'
            + '</div>'

            + '<div>'
            + '<ul class="nav nav-pills sourcejQ_inter" style="width:450px;margin-bottom: 5px;">'
            + '<li type="21" class="r_li"><img src="./roadSym/21.jpg" class="r_tb" alt="左转行车道"></li>'
            + '<li type="19" class="r_li"><img src="./roadSym/19.jpg" class="r_tb" alt="出直行车道"></li>'
            + '<li type="24" class="r_li"><img src="./roadSym/24.jpg" class="r_tb" alt="右转行车道"></li>'
            + '<li type="22" class="r_li"><img src="./roadSym/22.jpg" class="r_tb" alt="左转直行车道"></li>'
            + '<li type="23" class="r_li"><img src="./roadSym/23.jpg" class="r_tb" alt="右转直行车道"></li>'
            + '<li type="25" class="r_li"><img src="./roadSym/25.jpg" class="r_tb" alt="左右直行车道"></li>'
            + '</ul>'
            + '</div>'

            + '<div>'
            + '<span>出口道车道功能</span>'
            + '<ul class="nav nav-pills sourcejQ_inter" style="width:450px;margin-bottom: 5px;">'
            + '<li type="0" class="r_li"><img src="./roadSym/0.jpg" class="r_tb" alt="进直行车道"></li>'
            + '<li type="27" class="r_li"><img src="./roadSym/27.jpg" class="r_tb" alt="公交车车道"></li>'
            + '<li type="26" class="r_li"><img src="./roadSym/26.jpg" class="r_tb" alt="自行车"></li>'
            + '</ul>'
            + '</div>'
            + '</div>'
            + '<div class="intersection" showDone="0" thets="0_90_180_270" name="" id="intersection" currentLaneID="0" lanes="" currentLaneDegree="" laneInfo="">'
            + '<p style="color:black;">进口渠化方案:</p>'
            + '<ol id="outresultOut" class="nav nav-pills targetjQ_inter ui-sortable outview" data="0" style="border:1px solid white;" index="0">'
            + '</ol>'
            + '<div style="margin-bottom:10px;">'
            + '<span>左侧展宽:</span><select id="leftmergenumber" onchange="onChangeLaneSetting(\'7\')"><option value="0">0</div></select>'
            + '<span>右侧展宽:</span><select id="rightmergenumber" onchange="onChangeLaneSetting(\'8\')"><option value="0">0</div></select>'
            + '<span>左转待行区?</span><select id="leftturnshow" onchange="onChangeLaneSetting(\'11\')"><option value="0">否</div><option value="1">是</div></select>'
            + '</div>'
            + '<p style="color:black;">出口车道布置:</p>'
            + '<ol id="outresultIn" class="nav nav-pills targetjQ_inter ui-sortable outview" data="0" style="border:1px solid white;" index="0">'
            + '</ol>'
            + '<div>'
            + '<span>机非分割带?</span><select id="isbikeline" onchange="onChangeLaneSetting(\'5\')"><option value="0">否</div><option value="1">是</div></select>'
            + '<span>中央分割带?</span><select id="isyellowline" onchange="onChangeLaneSetting(\'3\')"><option value="1">单黄线</div><option value="2">双黄线</div><option value="3">分割带</div></select>'
            + '<span>过节横道?</span><select id="iswalkline" onchange="onChangeLaneSetting(\'4\')"><option value="0">否</div><option value="1">是</div></select>'
            + '<span>安全岛?</span><select id="iswalksafearea" onchange="onChangeLaneSetting(\'6\')"><option value="0">否</div><option value="1">是</div></select>'
            + '</div>'
            + '</div>'

            + '</div>'
            + '</div>'
            + '<div class="img_show nav_layout">'
            + '<img src="" alt="请创建你的交叉口渠化模型" id="img_result" class="img_out zoom" onmousedown="getStartIntersectionImage(event)" onmouseup="movingIntersectionImage(event)"  move="0" draggable="false" >'
            + '</div>'
            + '<i class="icon-icon-refresh inter_img_button intersection_icon_G" onclick="generateIntersection_S()" data-toggle="tooltip" data-placement="bottom" title="生成交叉口图" style="font-size: 18px;margin-left: 10px;"/></i><i style="font-size: 18px;margin-left:5px;" data-toggle="tooltip" data-placement="bottom" title="移动交叉口图" class="icon-icon-movepicture inter_img_button intersection_icon_G" style="font-size: 18px;" onclick="startIntersectionMoving()"/></i>'
            + '<br/><img src="./roadSym/compass.jpg" alt="坐标方向图" id="img_compass_1" class="image_compass_1" draggable="false" >'
            + '</div>'

            + '<div class="all_task" style="display:block;" id="intersection_task" flag="false">'
            + '<div class="nav_task task_align">'
            + '<div  id="task_info" class="list-group task_info" timeIndex="0" index="0" task_img="" laneinfo="" lanes="" imageClick="0" xstart="0" ystart="0" xcenter="0" ycenter="0">'
            + '<li class="list-group-item" style="text-align:center;background:#3c8dbc; color:white;">调查的全部任务</li>'
            + '</div>'

            + '<div class="task_create" style="text-align: center">'
            + '<button type="button" class="btn btn-success" id="task_create" onclick="createTimedTask()">新建调查时段</button>'
            + '</div>'
            + '</div>'
            + '<div class="img_area1 task_align" id="image_show_area"> '
            + '<img id="imag1" onclick="showCoords(event)" src="" class="img_out" alt="请创建你的交叉口渠化模型" image="">'
            + '</div>'
            + '</br><img src="./roadSym/compass.jpg" alt="坐标方向图" id="img_compass_2" class="image_compass_2" draggable="false" ><br/>'
            + '<div style="position:relative;top:-1330px;left:465px;"><span>已选任务流向</span><img src="./roadSym/prelane.jpeg" alt="坐标方向图" id="prelaneArrow" class="laneArrow" draggable="false" >'
            + '<span>当前任务流向</span><img src="./roadSym/clane.jpeg" alt="坐标方向图" id="claneArrow" class="laneArrow" draggable="false" ></div>'

            // create TaskTimedInterval
            + '<div class="task_time" id="task_time_box" style="background-color: gray; display:none;width:380px;height: 80px;border:2px solid gray;position: absolute;top: 111px;left: 267px;" data="">'
            + '<table class="table table-condensed" style="border:none; text-align: center;width:100%;">'
            + '<tbody>'
            + '<tr>'
            + '<td style="border:none;color:white;">起始时间:</td>'
            + '<td style="border:none; width:100px;" ><select style="width:100px; color:black;" name="bdaytime" id="stime"></select></td>'

            + '<td style="border:none;color:white;">结束时间:</td>'
            + '<td style="border:none;width:100px;"><select style="width:100px;color:black;" name="bdaytime" id="etime"></select></td>'
            + '</tr>'
            + '<tr>'
            + '<td style="border:none; text-align: left" colspan="4">'
            + '<button type="button" class="btn btn-success" id="task_create_time_interval" onclick="task_time_Save()">保存调查时段</button>'
            + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
            + '<button type="button" class="btn btn-success" onclick="task_time_Cancel()">取消</button>'
            + '</td>'
            + '</tr>'
            + '</tbody>'
            + '</table>'
            + '</div>'

            // create Task into Time Interval
            + '<div class="task_time" id="task_item_show" taskindex="0" current_spoints="" current_slanes="" preslanes="" option="" timeGroup="" style="background-color: gray; display:none;width:380px;height: 180px;border:2px solid gray;position: absolute;top: 111px;left: 267px;" data="">'
            + '<table class="table table-condensed" style="border:none;width:100%;">'
            + '<tbody>'
            + '<tr><td style="border:none; width:80px;color:white;">任务时间:</td>'
            + '<td style="border:none;color:white;" id="t_task_show_time">'
            + '</td>'
            + '</tr>'
            + '<tr><td style="border:none; width:80px;color:white;">采集方式</td>'
            + '<td style="border:none; color:white;" colspan="2">'
            + '<input type="radio" name="vehicle" value="1" name="视频" id="shipin">&nbsp;&nbsp;&nbsp;视频&nbsp;&nbsp;&nbsp;'
            + '<input type="radio" name="vehicle" value="2" name="人工" id="rengong">&nbsp;&nbsp;&nbsp;人工<br>'
            + '</td>'
            + '</tr>'
            + '<tr>'
            + '<td style="border:none;color:white;width:80px;">采集车型</td>'
            + '<td style="border:1px solid white;height:50px;"><div id="task_cars_info" class="task_car_drop" style="width:inherit;height:inherit;" number="0" data=""></div></td>'
            + '</tr>'
            + '<tr>'
            + '<td style="border:none; text-align: left" colspan="4">'
            + '<button type="button" class="btn btn-success" style="margin-top:5px;" id="task_enable_click" onclick="task_enableClick()">配置流向</button>'
            + '<button type="button" class="btn btn-success" style="margin-top:5px;" id="task_create_intersection" onclick="taskinfoSaveConfirm();">保存任务</button>'
            + '<button type="button" class="btn btn-success" style="margin-top:5px;" onclick="cancelTaskToTimedRange()">取消</button>'
            + '</td>'
            + '</tr>'
            + '</tbody>'
            + '</table>'
            + '</div>'

            + '<div class="task_time" style=" z-index: 3000; background-color: graytext; display:none;width:300px;height: 290px;border:2px solid gray;position: absolute;top: 380px;left: 30px;" id="task_direction_pane" data="" buttonFlag="0">'
            + '</div>'
            + '</div>'
            + '</div>';


    $("#mainSurveyPage").html(content);
    var sid = $("#mainSurveyPage").attr("spid");
    getNavSelectionModel(sid, stmid, lat1, lng1);
    getTimeSlots("stime");
    getTimeSlots("etime");
    getModelCarsTypes();
    $("#mapShowSection").hide();
    $("#mainSurveyPage").show();
    $("#task_item_show").draggable();

    initTBMap_Intersection(lng1, lat1);
    loadDraggable_Intersection();

    stmid = parseInt(stmid);
    if (stmid === 0)
    {
        setLanesObject("1_未命名道路_0_1_1_0_0_0_0_0_0_0#L2_未命名道路_90_1_1_0_0_0_0_0_0_0#L3_未命名道路_180_1_1_0_0_0_0_0_0_0#L4_未命名道路_270_1_1_0_0_0_0_0_0_0#");
    }
}

function task_enableClick()
{
    if ($("#task_info").attr("imageClick") === "0")
    {
        $("#task_info").attr("imageClick", "1");
        $("#task_enable_click").prop("disabled", true);
    }
    else
    {
        alert("你已经开启配置车流功能");
    }
}

function task_disableClick()
{
    $("#task_info").attr("imageClick", "0");
    $("#task_enable_click").prop("disabled", false);
}

function initTBMap_Intersection(lng, lat)
{
    var map = new BMap.Map("tb-map");
    lat = parseFloat(lat);
    lng = parseFloat(lng);
    map.centerAndZoom(new BMap.Point(lng, lat), 16);  // 初始化地图,设置中心点坐标和地图级别
    //map.addControl(new BMap.MapTypeControl());   //添加地图类型控件     // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(false);
    $("#intersection").attr("lat", lat);
    $("#intersection").attr("lng", lng);
}


var createLink = false;
var rotateLink = false;
var deleteLink = false;
function enableAddLink()
{
    if (!createLink)
    {
        currentLine = null;
        preCLine = null;
        createLink = true;
        //document.getElementById("cavans_button_add").disabled = true;
        document.getElementById("cavans_button_rotate").disabled = true;
        document.getElementById("cavans_button_delete").disabled = true;

        $("#cavans_button_add").css("background-color", "red");
        canvas.forEachObject(function (obj) {
            if (obj.idName !== 0)
            {
                obj.setStroke("gray");
            }
        });
        canvas.renderAll();
    }


}

function enableResetLink()
{
    createLink = false;
    rotateLink = false;
    deleteLink = false;
    document.getElementById("cavans_button_add").disabled = false;
    document.getElementById("cavans_button_rotate").disabled = false;
    document.getElementById("cavans_button_delete").disabled = false;
    $("#cavans_button_add").css("background-color", "#00a65a");
    $("#cavans_button_rotate").css("background-color", "#00a65a");
    $("#cavans_button_delete").css("background-color", "#00a65a");
    canvas.forEachObject(function (obj) {
        if (obj.idName !== 0)
        {
            obj.setStroke("gray");
        }
    });
    canvas.renderAll();

}

function enableRotateLink()
{
    if (!rotateLink)
    {
        currentLine = null;
        preCLine = null;
        rotateLink = true;
        document.getElementById("cavans_button_add").disabled = true;
        //document.getElementById("cavans_button_rotate").disabled = true;
        document.getElementById("cavans_button_delete").disabled = true;
        $("#cavans_button_rotate").css("background-color", "red");
        canvas.forEachObject(function (obj) {
            if (obj.idName !== 0)
            {
                obj.setStroke("gray");
            }
        });
        canvas.renderAll();
    }

}

function enableDeleteLink()
{
    if (!deleteLink)
    {
        currentLine = null;
        preCLine = null;
        deleteLink = true;
        document.getElementById("cavans_button_add").disabled = true;
        document.getElementById("cavans_button_rotate").disabled = true;
        //document.getElementById("cavans_button_delete").disabled = true;
        $("#cavans_button_delete").css("background-color", "red");
        canvas.forEachObject(function (obj) {
            if (obj.idName !== 0)
            {
                obj.setStroke("gray");
            }
        });
        canvas.renderAll();
    }

}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

var canvas;
var currentLine = null;
var preCLine = null;
function loadCanvasIntersection()
{
    var totalLinks = 0;
    var pp = document.getElementById("intersection_canvas");
    pp.innerHTML = '<canvas id="inter_template" style="width:450px;height:300px;"></canvas>';
    canvas = new fabric.Canvas('inter_template');
    canvas.setHeight(300);
    canvas.setWidth(450);
    fabric.Object.prototype.transparentCorners = false;

    var xcenter = 225;
    var ycenter = 150;
    var long = 80;
    var angle = 10;
    var laneWidth = 10;
    var disR = 20;
    var preX, preY;

    var preID = null;
    var isMouseMove = false;
    var fontSize = 15;
    var idIndex = 0;
    var start_createLink = false;
    var start_rotateLink = false;

    var isObjSelect = false;

    var circle = new fabric.Circle({
        left: xcenter - disR,
        top: ycenter - disR,
        originX: 'left',
        originY: 'top',
        radius: disR,
        fill: 'rgba(255,0,0,1)',
        transparentCorners: false
    });
    circle.degree = -10;
    circle.idName = 0;
    circle.hasControls = false;
    circle.hasRotatingPoint = false;
    circle.centeredRotation = false;
    circle.lockMovementX = true;
    circle.lockMovementY = true;
    canvas.hoverCursor = 'pointer';
    var lanes = JSON.parse($("#intersection").attr("lanes"));

    for (var i = 1; i <= lanes.length; i++)
    {
        var thet = 360 - parseInt(lanes[i - 1].degree);
        var points = [xcenter, ycenter, xcenter + long * Math.cos(Math.PI * thet / 180.0), ycenter + long * Math.sin(Math.PI * thet / 180.0)];

        var lane = new fabric.Line(points, {
            strokeWidth: laneWidth,
            fill: 'gray',
            stroke: 'gray',
            originX: 'center',
            originY: 'center'
        });

        lane.setControlsVisibility({
            mt: false,
            mb: false,
            ml: false,
            mr: false,
            tr: false,
            tl: false,
            br: false,
            bl: false
        });

        lane.hasRotatingPoint = false;
        lane.centeredRotation = false;
        lane.lockMovementX = true;
        lane.lockMovementY = true;
        lane.idName = parseInt(lanes[i - 1].id);
        idIndex++;
        lane.degree = parseInt(lanes[i - 1].degree);
        var xxcenter = xcenter + long * Math.cos(Math.PI * thet / 180.0);
        var yycenter = ycenter + long * Math.sin(Math.PI * thet / 180.0);
        lane.xxcenter = xxcenter;
        lane.yycenter = yycenter;
        lane.Name = lanes[i - 1].name;
        ;
        lane.isInited = false;
        lane.text_name = addTextRegion(xxcenter, yycenter, parseInt(lanes[i - 1].degree), laneWidth, lane.Name, lane);
        canvas.add(lane.text_name);
        canvas.add(lane);
        totalLinks++;
    }

    canvas.add(circle);

    canvas.on('mouse:down', function (options) {
        //console.log(options.e.clientX, options.e.clientY);
        preX = options.e.layerX;
        preY = options.e.layerY;
        if (rotateLink)
        {
            start_rotateLink = true;
        }

        if (isObjSelect)
        {
            isObjSelect = false;

        }
        else
        {
            //enableResetLink();
            canvas.forEachObject(function (obj) {
                if (obj.idName !== 0)
                {
                    obj.setStroke("gray");
                }
            });
            canvas.renderAll();
            canvas.discardActiveObject();
            currentLine = null;

        }

        //console.log("testMouseDown");

    });
    canvas.on('mouse:up', function (options) {
        if (createLink && start_createLink)
        {
            start_createLink = false;
            if (isMouseMove)
            {
                var angle = 0;
                var result = diff(options.e.layerX, options.e.layerY);
                if (result <= 0)
                {
                    angle = 0 - result;
                }
                else
                {
                    angle = 360 - result;
                }
                addLane(angle, long, 1);
                isMouseMove = false;
            }
        }

        if (rotateLink)
        {
            start_rotateLink = false;
        }

        console.log("testMoveUp");
        //sleep(1000);
        // deleteLinkDelay();
        //canvas.discardActiveGroup();

    });
    canvas.on('mouse:move', function (options) {
        if (rotateLink && start_rotateLink)
        {
            var angle = 0;
            var result = diff(options.e.layerX, options.e.layerY);
            if (result <= 0)
            {
                angle = 0 - result;
            }
            else
            {
                angle = 360 - result;
            }
            console.log(angle);
            updateAngle(angle);
        }
        if (createLink && start_createLink)
        {
            isMouseMove = true;
            var angle = 0;
            var result = diff(options.e.layerX, options.e.layerY);
            if (result <= 0)
            {
                angle = 0 - result;
            }
            else
            {
                angle = 360 - result;
            }
            var dis = dist(options.e.layerX, options.e.layerY);
            addLane(angle, dis, 0);
            $("#intersection").attr("hasLinkImage", "0");
        }
    });

    canvas.on({'object:selected': onSelected});



    function diff(x, y) {
        var dx = x - (xcenter);
        var dy = y - (ycenter);
        return Math.atan2(dy, dx) * (180 / Math.PI);
    }

    function addTextRegion(x, y, degree, lw, name, lane)
    {
        var left, top, lw_2 = lw / 2;
        var dis = 30, length = 150;
        degree = parseInt(degree);
        if (degree === 360 || degree >= 0 && degree <= 90)
        {
            left = x - length * Math.sin(Math.PI * degree / 180.0) / 2 + dis;
            top = y - lw - (fontSize) * Math.sin(Math.PI * degree / 180.0);
            var lane_name = addText(left, top, name, lane);
            return lane_name;
            //canvas.add(lane_name);
        }
        else if (degree > 90 && degree <= 180)
        {
            left = x + length * Math.sin(Math.PI * degree / 180.0) / 2 - length + dis;
            top = y - lw - (fontSize) * Math.sin(Math.PI * degree / 180.0);
            var lane_name = addText(left, top, name, lane);
            return lane_name;
            //canvas.add(lane_name);
        }
        else if (degree > 180 && degree <= 270)
        {
            left = x - length * Math.sin(Math.PI * degree / 180.0) / 2 - length + dis;
            top = y + lw_2 - (fontSize) * Math.sin(Math.PI * degree / 180.0);
            var lane_name = addText(left, top, name, lane);
            return lane_name;
            //canvas.add(lane_name);
        }
        else if (degree > 270 && degree < 360)
        {
            left = x + length * Math.sin(Math.PI * degree / 180.0) / 2 + dis;
            top = y + lw_2 - (fontSize) * Math.sin(Math.PI * degree / 180.0);
            var lane_name = addText(left, top, name, lane);
            return lane_name;
        }
    }

    function addText(left, top, name, lane)
    {
        var SINGLE_LINE = false;
        var $itext;
        //var canvas = new fabric.Canvas('canvas');

// custom input area
        if (SINGLE_LINE) {
            $itext = $('<input/>').attr('type', 'text').addClass('itext');
        }
        else {
            $itext = $('<textarea/>').addClass('itext');
        }

        var text = name;
        var itext = new fabric.IText(text, {
            left: left,
            top: top,
            fontSize: 20,
            width: 150,
            textAlign: 'center',
            fill: 'black'
        })
                .on('editing:entered', function (e) {
                    var obj = this;
                    if (SINGLE_LINE) {
                        var keyDownCode = 0;
                    }

                    canvas.remove(obj);

                    // show input area
                    $itext.css({
                        left: obj.left,
                        top: obj.top,
                        'line-height': obj.lineHeight,
                        'font-family': obj.fontFamily,
                        'font-size': Math.floor(obj.fontSize * Math.min(obj.scaleX, obj.scaleY)) + 'px',
                        'font-weight': obj.fontWeight,
                        'font-style': obj.fontStyle,
                        color: obj.fill
                    })
                            .val(obj.text)
                            .appendTo($(canvas.wrapperEl).closest('.canvas-container'));

                    // text submit event
                    if (SINGLE_LINE)
                    {
                        // submit text by ENTER key
                        $itext.on('keydown', function (e) {
                            // save the key code of a pressed key while kanji conversion (it differs from the code for keyup)
                            keyDownCode = e.which;
                        })
                                .on('keyup', function (e) {
                                    if (e.keyCode === 13 && e.which === keyDownCode) {
                                        obj.exitEditing();
                                        obj.set('text', $(this).val());
                                        $(this).remove();
                                        canvas.add(obj);
                                        lane.Name = $(this).val();
                                        updateRoadName(lane.idName, lane.Name);
                                        canvas.renderAll();


                                    }
                                });
                    }
                    else {
                        // submit text by focusout
                        $itext.on('focusout', function (e) {
                            obj.exitEditing();
                            obj.set('text', $(this).val());
                            $(this).remove();
                            canvas.add(obj);
                            lane.Name = $(this).val();
                            updateRoadName(lane.idName, lane.Name);
                            canvas.renderAll();
                        });
                    }

                    // focus on text
                    setTimeout(function () {
                        $itext.select();
                    }, 1);
                });
        itext.idName = 0;
        return itext;
    }

    function dist(x, y) {
        var dx = x - (xcenter);
        var dy = y - (ycenter);
        var dis = Math.sqrt(dx * dx + dy * dy);
        if (dis >= long)
        {
            return long;
        }
        else
        {
            return dis;
        }
    }

    function onSelected(sobj)
    {

        isObjSelect = true;
        var obj = sobj.target;
        if (obj.idName === 0)
        {
            if (createLink)
            {
                start_createLink = true;
            }
        }
        else if (obj.idName > 0)
        {
            console.log('selected a object');
            var id = obj.idName;
            var degree = obj.degree;

            if (currentLine !== null)
            {
                currentLine.setStroke("gray");

            }
            currentLine = obj;
            obj.setStroke("red");
            $("#intersection").attr("currentLaneID", id);
            $("#intersection").attr("currentLaneDegree", degree);
            clearLanneSettings();
            loadRoadInfo(id);
            preID = id;
            loadLinkImage(id, degree);

        }


        if (deleteLink)
        {
            canvas.renderAll();
            deleteLane();
            currentLine = null;
            //preCLine = null;
        }

        console.log("testObjectSelected");


    }

    function deleteLinkDelay()
    {
        canvas.renderAll();
        if (deleteLink)
        {
            deleteLane();
            currentLine = null;
            preCLine = null;
        }
        console.log('mouse up a object');
    }

    function updateAngle(angle)
    {
        if (currentLine !== null)
        {
            var id = currentLine.idName;
            var degree = currentLine.degree;
            var name = currentLine.Name;
            var thet = 360 - parseInt(angle);
            var points = [xcenter, ycenter, xcenter + long * Math.cos(Math.PI * thet / 180.0), ycenter + long * Math.sin(Math.PI * thet / 180.0)];
            var lane = new fabric.Line(points, {
                strokeWidth: laneWidth,
                fill: 'gray',
                stroke: 'gray',
                originX: 'center',
                originY: 'center'
            });

            lane.setControlsVisibility({
                mt: false,
                mb: false,
                ml: false,
                mr: false,
                tr: false,
                tl: false,
                br: false,
                bl: false
            });

            lane.hasRotatingPoint = false;
            lane.centeredRotation = false;
            lane.lockMovementX = true;
            lane.lockMovementY = true;
            lane.setStroke("red");
            lane.idName = id;

            lane.Name = name;
            //positionBtn(lane);
            angle = parseInt(angle);
            $("#intersection").attr("currentLaneDegree", angle);
//            console.log(degree);
//              console.log("angle "+angle);
            updateRoadDegree(id, angle);
            //updateLaneInfo_Intersection(id, name, angle);
            lane.degree = angle;
            var xxcenter = xcenter + long * Math.cos(Math.PI * thet / 180.0);
            var yycenter = ycenter + long * Math.sin(Math.PI * thet / 180.0);
            lane.xxcenter = xxcenter;
            lane.yycenter = yycenter;
            canvas.remove(currentLine.text_name);
            lane.text_name = addTextRegion(xxcenter, yycenter, angle, laneWidth, lane.Name, lane.idName);
            canvas.add(lane.text_name);
            canvas.remove(currentLine);
            currentLine = lane;
            canvas.add(lane);
            circle.bringToFront();
            $("#intersection").attr("hasLinkImage", "0");
        }
    }

    function deleteLane()
    {
        if (totalLinks > 3)
        {
            if (cf("你确定删除此道路吗？"))
            {
                var id = currentLine.idName;
                canvas.remove(currentLine.text_name);
                canvas.remove(currentLine);
                totalLinks--;
                deleteRoadLink(id);
                $("#intersection").attr("hasLinkImage", "0");
            }
        }
        else
        {
            alert("交叉口最少要拥有3个车道");
        }

    }

    function addLane(degree, dis, flag)
    {
        //var name = "name" + id;
        var thet = 360 - parseInt(degree);
        var points = [xcenter, ycenter, xcenter + dis * Math.cos(Math.PI * thet / 180.0), ycenter + dis * Math.sin(Math.PI * thet / 180.0)];
        var lane = new fabric.Line(points, {
            strokeWidth: laneWidth,
            fill: 'gray',
            stroke: 'gray',
            originX: 'center',
            originY: 'center'
        });

        lane.setControlsVisibility({
            mt: false,
            mb: false,
            ml: false,
            mr: false,
            tr: false,
            tl: false,
            br: false,
            bl: false
        });

        lane.hasRotatingPoint = false;
        lane.centeredRotation = false;
        lane.lockMovementX = true;
        lane.lockMovementY = true;
        lane.setStroke("red");
        lane.idName = ++idIndex;
        lane.degree = degree;
        var xxcenter = xcenter + long * Math.cos(Math.PI * thet / 180.0);
        var yycenter = ycenter + long * Math.sin(Math.PI * thet / 180.0);
        lane.xxcenter = xxcenter;
        lane.yycenter = yycenter;
        //positionBtn(lane);
        if (preCLine === null)
        {
            preCLine = lane;
        }
        else
        {
            canvas.remove(preCLine);
        }

        if (flag === 1)
        {
            currentLine = lane;
            preCLine = lane;
            canvas.add(lane);
            circle.bringToFront();
            $("#intersection").attr("currentLaneID", lane.idName);
            $("#intersection").attr("currentLaneDegree", degree);
            lane.Name = "新道路";
            var text_name = addTextRegion(lane.xxcenter, lane.yycenter, lane.degree, laneWidth, lane.Name, lane);
            canvas.add(text_name);
            lane.text_name = text_name;
            addNewRoad(lane.idName, lane.Name, degree);
            totalLinks++;
        }
        else
        {
            currentLine = lane;
            preCLine = lane;
            canvas.add(lane);
            circle.bringToFront();
        }

    }

}

function loadDraggable_Intersection()
{
    $(function () {
        $(".sourcejQ_inter li").draggable({
            addClasses: false,
            helper: "clone"
        });
        $(".targetjQ_inter").droppable({
            addClasses: false,
            activeClass: "listActive",
            //hoverClass : "listHover",
            accept: ":not(.ui-sortable-helper)",
            drop: function (event, ui) {
                var checked = $("#intersection").attr("currentLaneID");
                if (checked !== "0")
                {
                    var index = 0;
                    var parent;
                    var type = ui.draggable.attr("type");
                    type = parseInt(type);
                    if (type === 0 || type === 27 || type === 26)
                    {
                        index = $("#outresultIn").attr("index");
                        index = parseInt(index);
                        parent = $("#outresultIn");
                    }
                    else
                    {
                        index = $("#outresultOut").attr("index");
                        index = parseInt(index);
                        parent = $("#outresultOut");
                    }

                    $(this).find(".placeholder").remove();
                    var link = $('<i class="fa fa-times-circle roadDelete" aria-hidden="true" onclick="deleteRoadItem(\'' + checked + '_' + index + '\')"></i>');
                    var list = $("<li></li>");


                    $(list).attr("id", "rt_" + checked + "_" + index);
                    $(list).attr("type", type);
                    $(list).attr("class", "mclass m_" + type);
                    $(list).append(link);
                    index = index + 1;
                    parent.attr("index", index);

                    if (type === 0 || type === 27 || type === 26)
                    {
                        if ($(this).attr("id") === "outresultOut")
                        {
                            alert("进口车道不能放置在出口车道图中!");
                            return 0;
                        }
                        else
                        {
                            $(list).appendTo(this);
                            updateRoadDriectionInfo();
                        }
                    }
                    else
                    {
                        if ($(this).attr("id") === "outresultIn")
                        {
                            alert("出口车道不能放置在进口车道图中!");
                            return 0;
                        }
                        else
                        {
                            $(list).appendTo(this);
                            updateRoadDriectionInfo();
                        }
                    }

                }
                else
                {
                    if (checked === "0")
                    {
                        alert("请先选择要编辑的路口");
                    }
                }


//							updateMainExample();
            }
        }).sortable({
            items: "li:not(.placeholder)",
            sort: function () {
                $(this).removeClass("listActive");
                updateRoadDriectionInfo();
            },
            update: function () {
                updateRoadDriectionInfo();
//							updateMainExample();
            }
        });
    });
}

function loadDraggable_Model_Cars()
{
    $(".modelCarICON").draggable({
        addClasses: false,
        helper: "clone"
    });


    $(".task_car_drop").droppable({
        addClasses: false,
        activeClass: "listActive",
        //hoverClass : "listHover",
        accept: ":not(.ui-sortable-helper)",
        drop: function (event, ui) {

            var data = ui.draggable.attr("data");
            var index = $("#task_cars_info").attr("number");
            index = parseInt(index) + 1;
            $("#task_cars_info").attr("number", index);
            var car = JSON.parse(data);
            var caricon = getCarICON(car.type, 1);

            var content = '<div class="dropdown iconCarDiv" id="car_type_icon_temp_div_' + car.id + '" data=\'' + JSON.stringify(car) + '\'><i class="' + caricon + ' carIconTask" aria-hidden="true" data-toggle="dropdown"  data-placement="bottom" title="' + car.name + '" id="car_type_icon_temp_' + car.id + '" ></i>'
                    + '<div class="dropdown-menu" style="width:240px;height:120px;background:gainsboro;" aria-labelledby="car_type_icon_temp_' + car.id + '">'
                    + '<table class="table table-condensed" style="border:none;width:100%;">'
                    + '<tbody>'
                    + '<tr>'
                    + '<td style="border:none">车型:</td><td style="border:none">' + car.name + '</td>'
                    + '</tr>';
//                    + '<tr>'
//                    + '<td style="border:none">车长:</td>'
//                    + '<td style="border:none"><input type="text" id="c_min_length_temp_' + car.id + '"style="width:60px;" value="' + car.min_length + '">--<input type="text" style="width:60px;" id="c_max_length_temp_' + car.id + '" name="pei_name" value="' + car.max_length + '">米</td>'
//                    + '</tr>'
//                    + '<tr>'
//                    + '<td style="border:none">载重:</td>'
//                    + '<td style="border:none">'
//                    + '<input type="text" name="pei_name" style="width:60px;" id="c_min_weight_temp_' + car.id + '" value="' + car.min_weight + '">--<input type="text" name="pei_name" style="width:60px;" id="c_max_weight_temp_' + car.id + '" value="' + car.max_weight + '">吨</td>'
//                    + '</tr>';

            if (car.car_factor !== 0)
            {
                content += '<tr>'
                        + '<td style="border:none" colspan="2">小汽车换算系数:&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" name="pei_name" style="width:60px;" id="car_factor_temp_' + car.id + '" value="' + car.car_factor + '"></td>'

                        + '</tr>';
            }

            content += '<tr>'
                    + '<td style="border:none; text-align: left" colspan="2">'
                    + '<button type="button" class="btn btn-success" onclick="carTypeConfrim_Temp(\'' + car.id + '\')">修改</button>'
                    + '</td>'
                    + '</tr>'
                    + '</tbody>'
                    + '</table>'
                    + '</div>'
                    + '<br/><div style="width:inherit;text-align:center;"><i class="fa fa-times-circle carTempICOND"  aria-hidden="true" onclick="removeTaskCarTemp(\'' + car.id + '\')"></i></div></div>';
            var item = $(content);
            item.appendTo(this);

        }
    });
}

function getCarTypesHTML(cars)
{
    var content = '<div><span style="margin-right: 10px;" >车型:</span>';

    for (var i = 0; i < cars.length; i++)
    {
        var caricon = getCarICON(cars[i].type, 0);

        content += '<div class="dropdown iconCarDiv1"><i class="' + caricon + ' carIcon modelCarICON1" aria-hidden="true" data-toggle="dropdown"  data-placement="bottom" title="' + cars[i].name + '" id="car_type_icon_task_' + (i + 1) + '"></i>'
                + '<div class="dropdown-menu" style="width:240px;height:120px;background:gainsboro;" aria-labelledby="car_type_icon_task_' + cars[i].id + '">'
                + '<table class="table table-condensed" style="border:none;width:100%;">'
                + '<tbody>'
                + '<tr>'
                + '<td style="border:none">车型:</td><td style="border:none">' + cars[i].name + '</td>'
                + '</tr>';
//                + '<tr>'
//                + '<td style="border:none">车长:</td>'
//                + '<td style="border:none"><input type="text" disabled id="c_min_length_task_' + cars[i].id + '"style="width:60px;" value="' + cars[i].min_length + '">--<input type="text" disabled style="width:60px;" id="c_max_length_task_' + cars[i].id + '" name="pei_name" value="' + cars[i].max_length + '">米</td>'
//                + '</tr>'
//                + '<tr>'
//                + '<td style="border:none">载重:</td>'
//                + '<td style="border:none">'
//                + '<input type="text" name="pei_name" style="width:60px;" id="c_min_weight_task_' + cars[i].id + '" value="' + cars[i].min_weight + '" disabled>--<input type="text" name="pei_name" disabled style="width:60px;" id="c_max_weight_task_' + cars[i].id + '" value="' + cars[i].max_weight + '">吨</td>'
//                + '</tr>';

        if (cars[i].car_factor !== 0)
        {
            content += '<tr>'
                    + '<td style="border:none" colspan="2">小汽车换算系数:&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" name="pei_name" style="width:60px;" id="car_factor_temp_' + cars[i].id + '" value="' + cars[i].car_factor + '"></td>'

                    + '</tr>';
        }

        content += '</tbody>'
                + '</table>'
                + '</div></div>';
    }
    content += "</div>";
    return content;
}

function getCurrentCarTypes()
{
    var items = $("#task_cars_info").find(".iconCarDiv");
    if (items === undefined || items === null)
    {
        return "";
    }
    var out = [];
    for (var i = 0; i < items.length; i++)
    {
        var item = items[i];
        item = JSON.parse($(item).attr("data"));
        out.push(item);
    }
    return JSON.stringify(out);
}

function removeTaskCarTemp(index)
{
    $("#car_type_icon_temp_div_" + index).remove();
}

function setLanesObject(info)
{
    var lanes = [];
    var items = info.split("L");
    for (var i = 0; i < items.length; i++)
    {
        var item = items[i];
        var sitem = item.split("#");
        var st = sitem[0].split("_");
        var linfo = "";
        if (sitem.length > 0)
        {
            linfo = sitem[1];
        }
        var lane = {id: st[0], name: st[1], degree: st[2], yellowline: st[3], walkline: st[4], bikeline: st[5], walksafearea: st[6], leftmergeline: st[7], rightmergeline: st[8], inleftmergeline: st[9], inrightmergeline: st[10], waitleftarea: st[11],
            laneinfo: linfo, allleftnumber: 0, leftnumber: 0, allrightnumber: 0, rightnumber: 0, allupnumber: 0, freenumber: 0, allbikenumber: 0, allnumber: 0};
        lanes.push(lane);
    }

    if (lanes.length > 0)
    {
        $("#intersection").attr("lanes", JSON.stringify(lanes));
    }
    else
    {
        $("#intersection").attr("lanes", "");
    }

    loadCanvasIntersection();
}

function getLanesObject(info)
{
    var lanes = [];
    var items = info.split("L");
    for (var i = 0; i < items.length; i++)
    {
        var item = items[i];
        var sitem = item.split("#");
        var st = sitem[0].split("_");
        var linfo = "";
        if (sitem.length > 0)
        {
            linfo = sitem[1];
        }
        var lane = {id: st[0], name: st[1], degree: st[2], yellowline: st[3], walkline: st[4], bikeline: st[5], walksafearea: st[6], leftmergeline: st[7], rightmergeline: st[8], inleftmergeline: st[9], inrightmergeline: st[10], waitleftarea: st[11],
            laneinfo: linfo};
        lanes.push(lane);
    }

    if (lanes.length > 0)
    {
        return JSON.stringify(lanes);
    }
    else
    {
        return "";
    }
}

function getLanesInfo()
{
    var lanes = $("#intersection").attr("lanes");

    if (lanes === "")
    {
        return "";
    }
    lanes = JSON.parse(lanes);
    lanes.sort(function (a, b) {
        return parseInt(a.degree) - parseInt(b.degree);
    });
    var info = "";
    for (var i = 0; i < lanes.length; i++)
    {
        var item = lanes[i];
        if (item.laneinfo === "")
        {
            return "";
        }
        if (info === "")
        {
            info += item.id + "_" + item.name + "_" + item.degree + "_" + item.yellowline + "_" + item.walkline + "_" + item.bikeline + "_" + item.walksafearea +
                    "_" + item.leftmergeline + "_" + item.rightmergeline + "_" + item.inleftmergeline + "_" + item.inrightmergeline + "_" + item.waitleftarea + "#" + item.laneinfo;
        }
        else
        {
            info += "L" + item.id + "_" + item.name + "_" + item.degree + "_" + item.yellowline + "_" + item.walkline + "_" + item.bikeline + "_" + item.walksafearea +
                    "_" + item.leftmergeline + "_" + item.rightmergeline + "_" + item.inleftmergeline + "_" + item.inrightmergeline + "_" + item.waitleftarea + "#" + item.laneinfo;
        }
    }

    return info;
}

function deleteRoadItem(id)
{
    var tid = "rt_" + id;
    $("#" + tid).remove();
    updateRoadDriectionInfo();
}



function addNewRoad(id, name, degree)
{
    id = parseInt(id);
    degree = parseInt(degree);
    var lanes = $("#intersection").attr("lanes");
    if (lanes === "")
    {
        lanes = [];
        var lane = {id: id, name: name, degree: degree, yellowline: "0", walkline: "1", bikeline: "0", walksafearea: "0", leftmergeline: "0", rightmergeline: "0", inleftmergeline: "0", inrightmergeline: "0", waitleftarea: "0", laneinfo: "",
            allleftnumber: 0, leftnumber: 0, allrightnumber: 0, rightnumber: 0, allupnumber: 0, freenumber: 0, allbikenumber: 0, allnumber: 0};
        lanes.push(lane);
    }
    else
    {
        lanes = JSON.parse(lanes);// id, name. degree, dashline, laneinfo
        var lane = {id: id, name: name, degree: degree, yellowline: "0", walkline: "1", bikeline: "0", walksafearea: "0", leftmergeline: "0", rightmergeline: "0", inleftmergeline: "0", inrightmergeline: "0", waitleftarea: "0", laneinfo: "",
            allleftnumber: 0, leftnumber: 0, allrightnumber: 0, rightnumber: 0, allupnumber: 0, freenumber: 0, allbikenumber: 0, allnumber: 0};
        lanes.push(lane);
    }
    $("#intersection").attr("lanes", JSON.stringify(lanes));

}

function deleteRoadLink(id)
{
    id = parseInt(id);
    var newLanes = [];
    var lanes = $("#intersection").attr("lanes");
    if (lanes === "")
    {

    }
    else
    {
        lanes = JSON.parse(lanes);// id, name. degree, dashline, laneinfo
        for (var i = 0; i < lanes.length; i++)
        {
            if (parseInt(lanes[i].id) !== id)
            {
                var lane = {id: lanes[i].id, name: lanes[i].name, degree: lanes[i].degree, yellowline: lanes[i].yellowline, walkline: lanes[i].yellowline, bikeline: lanes[i].bikeline,
                    walksafearea: lanes[i].walksafearea, leftmergeline: lanes[i].leftmergeline, rightmergeline: lanes[i].rightmergeline, inleftmergeline: lanes[i].inleftmergeline,
                    inrightmergeline: lanes[i].inrightmergeline, waitleftarea: lanes[i].waitleftarea, laneinfo: lanes[i].laneinfo};
                newLanes.push(lane);
            }
        }

    }
    $("#intersection").attr("lanes", JSON.stringify(newLanes));

}

function updateRoadDegree(id, degree)
{
    id = parseInt(id);
    degree = parseInt(degree);
    var lanes = $("#intersection").attr("lanes");
    if (lanes === "")
    {
        alert("你还没有创建道路");
        return false;
    }
    lanes = JSON.parse(lanes);// id, name. degree, dashline, laneinfo
    for (var i = 0; i < lanes.length; i++)
    {
        var lid = parseInt(lanes[i].id);
        if (lid === id)
        {
            lanes[i].degree = degree;
            break;
        }
    }
    $("#intersection").attr("lanes", JSON.stringify(lanes));
}

function clearLanneSettings()
{
    $("#leftmergenumber").html('<option value="0">0</div>');
    $("#rightmergenumber").html('<option value="0">0</div>');
    $("#leftturnshow").val("0");
    $("#leftturnshow").prop('disabled', false);

    $("#leftturnshow").val("0");
    $("#leftturnshow").prop('disabled', false);

    $("#isbikeline").val("0");
    $("#isbikeline").prop('disabled', false);

    //$("#leftturnshow").val("0");
    $("#isyellowline").prop('disabled', false);

    $("#iswalkline").val("1");
    $("#iswalkline").prop('disabled', false);

    $("#iswalksafearea").val("0");
    $("#iswalksafearea").prop('disabled', false);

}

function onChangeLaneSetting(type)
{
    var id = $("#intersection").attr("currentLaneID");
    id = parseInt(id);
    var allnumber = 0;
    var lanes = $("#intersection").attr("lanes");
    if (lanes === "")
    {
        alert("你还没有创建道路");
        return false;
    }
    lanes = JSON.parse(lanes);// id, name. degree, dashline, laneinfo
    for (var i = 0; i < lanes.length; i++)
    {
        var lid = parseInt(lanes[i].id);
        if (lid === id)
        {
            lanes[i].id = id;
            allnumber = lanes[i].allnumber;
            break;
        }
    }
    var i = parseInt(type);
    var value;
    if (i === 3) {
        value = $("#isyellowline").val();
        updateRoadYellowline(id, value);

        value = parseInt(value);
        if (value === 3)
        {
            $("#iswalksafearea").prop('disabled', false);
        }
        else
        {
            $("#iswalksafearea").val("0");
            $("#iswalksafearea").prop('disabled', true);
        }
    }
    else if (i === 4) {
        value = $("#iswalkline").val();
        updateRoadWalkline(id, value);
        value = parseInt(value);
        if (value === 1)
        {
            $("#iswalksafearea").prop('disabled', false);
        }
        else
        {
            $("#iswalksafearea").val("0");
            $("#iswalksafearea").prop('disabled', true);
        }
    }
    else if (i === 5) {
        //bikeline = Integer.parseInt(info[i]);
        value = $("#isbikeline").val();
        updateRoadBikeline(id, value);
    }
    else if (i === 6) {
        //walksafearea = Integer.parseInt(info[i]);
        value = $("#iswalksafearea").val();
        updateRoadWalksafearea(id, value);
    }
    else if (i === 7) {
        //leftmergeline = Integer.parseInt(info[i]);
        value = $("#leftmergenumber").val();
        var lvalue = parseInt($("#leftmergenumber").val());
        var rvalue = parseInt($("#rightmergenumber").val());
        if (lvalue + rvalue + 1 >= allnumber)
        {
            alert("拓展车宽的数量有错误");
            return false;
        }
        else
        {
            updateRoadLeftmergeline(id, value);
        }

    }
    else if (i === 8) {
        //rightmergeline = Integer.parseInt(info[i]);
        value = $("#rightmergenumber").val();
        var lvalue = parseInt($("#leftmergenumber").val());
        var rvalue = parseInt($("#rightmergenumber").val());
        if (lvalue + rvalue + 1 >= allnumber)
        {
            alert("拓展车宽的数量有错误");
            return false;
        }
        else
        {
            updateRoadRightmergeline(id, value);
        }

    }
    else if (i === 9) {
        //inleftmergeline = Integer.parseInt(info[i]);
        value = $("#inleftmergenumber").val();
        updateRoadInleftmergeline(id, value);
    }
    else if (i === 10) {
        value = $("#inrightmergenumber").val();
        updateRoadInrightmergeline(id, value);
    }
    else if (i === 11) {
        value = $("#leftturnshow").val();
        updateRoadWaitleftarea(id, value);
    }
}

function updateRoadYellowline(id, value)
{
    id = parseInt(id);
    value = parseInt(value);
    var lanes = $("#intersection").attr("lanes");
    if (lanes === "")
    {
        alert("你还没有创建道路");
        return false;
    }
    lanes = JSON.parse(lanes);// id, name. degree, dashline, laneinfo
    for (var i = 0; i < lanes.length; i++)
    {
        var lid = parseInt(lanes[i].id);
        if (lid === id)
        {
            lanes[i].yellowline = value;
            break;
        }
    }
    $("#intersection").attr("lanes", JSON.stringify(lanes));
}

function updateRoadWalkline(id, value)
{
    id = parseInt(id);
    value = parseInt(value);
    var lanes = $("#intersection").attr("lanes");
    if (lanes === "")
    {
        alert("你还没有创建道路");
        return false;
    }
    lanes = JSON.parse(lanes);// id, name. degree, dashline, laneinfo
    for (var i = 0; i < lanes.length; i++)
    {
        var lid = parseInt(lanes[i].id);
        if (lid === id)
        {
            lanes[i].walkline = value;
            break;
        }
    }
    $("#intersection").attr("lanes", JSON.stringify(lanes));
}

function updateRoadBikeline(id, value)
{
    id = parseInt(id);
    value = parseInt(value);
    var lanes = $("#intersection").attr("lanes");
    if (lanes === "")
    {
        alert("你还没有创建道路");
        return false;
    }
    lanes = JSON.parse(lanes);// id, name. degree, dashline, laneinfo
    for (var i = 0; i < lanes.length; i++)
    {
        var lid = parseInt(lanes[i].id);
        if (lid === id)
        {
            lanes[i].bikeline = value;
            break;
        }
    }
    $("#intersection").attr("lanes", JSON.stringify(lanes));
}

function updateRoadWalksafearea(id, value)
{
    id = parseInt(id);
    value = parseInt(value);
    var lanes = $("#intersection").attr("lanes");
    if (lanes === "")
    {
        alert("你还没有创建道路");
        return false;
    }
    lanes = JSON.parse(lanes);// id, name. degree, dashline, laneinfo
    for (var i = 0; i < lanes.length; i++)
    {
        var lid = parseInt(lanes[i].id);
        if (lid === id)
        {
            lanes[i].walksafearea = value;
            break;
        }
    }
    $("#intersection").attr("lanes", JSON.stringify(lanes));
}

function updateRoadLeftmergeline(id, value)
{
    id = parseInt(id);
    value = parseInt(value);
    var lanes = $("#intersection").attr("lanes");
    if (lanes === "")
    {
        alert("你还没有创建道路");
        return false;
    }
    lanes = JSON.parse(lanes);// id, name. degree, dashline, laneinfo
    for (var i = 0; i < lanes.length; i++)
    {
        var lid = parseInt(lanes[i].id);
        if (lid === id)
        {
            lanes[i].leftmergeline = value;
            break;
        }
    }
    $("#intersection").attr("lanes", JSON.stringify(lanes));
}

function updateRoadRightmergeline(id, value)
{
    id = parseInt(id);
    value = parseInt(value);
    var lanes = $("#intersection").attr("lanes");
    if (lanes === "")
    {
        alert("你还没有创建道路");
        return false;
    }
    lanes = JSON.parse(lanes);// id, name. degree, dashline, laneinfo
    for (var i = 0; i < lanes.length; i++)
    {
        var lid = parseInt(lanes[i].id);
        if (lid === id)
        {
            lanes[i].rightmergeline = value;
            break;
        }
    }
    $("#intersection").attr("lanes", JSON.stringify(lanes));
}

function updateRoadInleftmergeline(id, value)
{
    id = parseInt(id);
    value = parseInt(value);
    var lanes = $("#intersection").attr("lanes");
    if (lanes === "")
    {
        alert("你还没有创建道路");
        return false;
    }
    lanes = JSON.parse(lanes);// id, name. degree, dashline, laneinfo
    for (var i = 0; i < lanes.length; i++)
    {
        var lid = parseInt(lanes[i].id);
        if (lid === id)
        {
            lanes[i].inleftmergeline = value;
            break;
        }
    }
    $("#intersection").attr("lanes", JSON.stringify(lanes));
}

function updateRoadInrightmergeline(id, value)
{
    id = parseInt(id);
    value = parseInt(value);
    var lanes = $("#intersection").attr("lanes");
    if (lanes === "")
    {
        alert("你还没有创建道路");
        return false;
    }
    lanes = JSON.parse(lanes);// id, name. degree, dashline, laneinfo
    for (var i = 0; i < lanes.length; i++)
    {
        var lid = parseInt(lanes[i].id);
        if (lid === id)
        {
            lanes[i].inrightmergeline = value;
            break;
        }
    }
    $("#intersection").attr("lanes", JSON.stringify(lanes));
}

function updateRoadWaitleftarea(id, value)
{
    id = parseInt(id);
    value = parseInt(value);
    var lanes = $("#intersection").attr("lanes");
    if (lanes === "")
    {
        alert("你还没有创建道路");
        return false;
    }
    lanes = JSON.parse(lanes);// id, name. degree, dashline, laneinfo
    for (var i = 0; i < lanes.length; i++)
    {
        var lid = parseInt(lanes[i].id);
        if (lid === id)
        {
            lanes[i].waitleftarea = value;
            break;
        }
    }
    $("#intersection").attr("lanes", JSON.stringify(lanes));
}

function updateRoadName(id, name)
{
    id = parseInt(id);
    var lanes = $("#intersection").attr("lanes");
    if (lanes === "")
    {
        alert("你还没有创建道路");
        return false;
    }
    lanes = JSON.parse(lanes);// id, name. degree, dashline, laneinfo
    for (var i = 0; i < lanes.length; i++)
    {
        var lid = parseInt(lanes[i].id);
        if (lid === id)
        {
            lanes[i].name = name;
            break;
        }
    }
    $("#intersection").attr("lanes", JSON.stringify(lanes));

}

function updateRoadDriectionInfo()
{
    var laneinfo = "";
    var allleftnumber = 0, leftnumber = 0, allrightnumber = 0, rightnumber = 0, allupnumber = 0, freenumber = 0, allbikenumber = 0, allnumber = 0;
    var parent = document.getElementById("outresultIn");
    var lis = parent.getElementsByTagName("li");
    if (lis !== undefined && lis !== null)
    {
        freenumber = lis.length;
        for (var i = 0; i < lis.length; i++)
        {
            if (laneinfo === "")
            {
                laneinfo += lis[i].getAttribute("type");
            }
            else
            {
                laneinfo += "_" + lis[i].getAttribute("type");
            }
        }
    }

    parent = document.getElementById("outresultOut");
    lis = parent.getElementsByTagName("li");

    if (lis !== undefined && lis !== null)
    {
        allnumber = lis.length;
        for (var i = 0; i < lis.length; i++)
        {
            if (laneinfo === "")
            {
                laneinfo += lis[i].getAttribute("type");
            }
            else
            {
                laneinfo += "_" + lis[i].getAttribute("type");
            }

            var type = lis[i].getAttribute("type");
            type = parseInt(type);
            if (type === 4 || type === 13)
            {
                leftnumber++;
                allleftnumber++;
            }

            if (type === 1 || type === 2 || type === 5 || type === 6 || type === 10 || type === 11 || type === 14 || type === 15)
            {
                //leftnumber++;
                allleftnumber++;
            }

            if (type === 9 || type === 18)
            {
                rightnumber++;
                allrightnumber++;
            }

            if (type === 8 || type === 6 || type === 17 || type === 15)
            {
                //leftnumber++;
                allrightnumber++;
            }

            if (type === 7 || type === 5 || type === 6 || type === 8 || type === 16 || type === 15 || type === 14 || type === 17)
            {
                allupnumber++;
            }

            if (type === 21 || type === 19 || type === 22 || type === 23 || type === 24 || type === 25)
            {
                allbikenumber++;
            }
        }
    }

    var id = $("#intersection").attr("currentLaneID");
    id = parseInt(id);
    var lanes = $("#intersection").attr("lanes");
    if (lanes === "")
    {
        alert("你还没有创建道路");
        return false;
    }
    lanes = JSON.parse(lanes);// id, name. degree, dashline, laneinfo
    for (var i = 0; i < lanes.length; i++)
    {
        var lid = parseInt(lanes[i].id);
        if (lid === id)
        {
            lanes[i].allleftnumber = allleftnumber - allbikenumber;
            lanes[i].leftnumber = leftnumber;
            lanes[i].allrightnumber = allrightnumber;
            lanes[i].rightnumber = rightnumber;
            lanes[i].allupnumber = allupnumber;
            lanes[i].freenumber = freenumber;
            lanes[i].allbikenumber = allbikenumber;
            lanes[i].laneinfo = laneinfo;
            lanes[i].allnumber = allnumber;
            break;
        }
    }
    $("#leftmergenumber").val("0");
    $("#rightmergenumber").val("0");
    $("#intersection").attr("lanes", JSON.stringify(lanes));

    if (allupnumber > 0 || allleftnumber > 0)
    {
        var content = "";
        for (var i = 0; i < allnumber - allrightnumber; i++)
        {
            content += '<option value="' + i + '">' + i + '</div>';

        }
        $("#leftmergenumber").html(content);

    }
    else
    {
        var content = '<option value="0">0</div>';
        $("#leftmergenumber").html(content);
    }

    if (allupnumber > 0 || allrightnumber > 0)
    {
        var content = "";
        for (var i = 0; i < allnumber - allleftnumber; i++)
        {
            content += '<option value="' + i + '">' + i + '</div>';

        }
        $("#rightmergenumber").html(content);

    }
    else
    {
        var content = '<option value="0">0</div>';
        $("#rightmergenumber").html(content);
    }

    if (leftnumber === 0)
    {
        $("#leftturnshow").val("0");
        $("#leftturnshow").prop('disabled', true);
    }
    else
    {
        $("#leftturnshow").prop('disabled', false);
    }

    if (allbikenumber === 0)
    {
        $("#isbikeline").val("0");
        $("#isbikeline").prop('disabled', true);
    }
    else
    {
        $("#isbikeline").prop('disabled', false);
    }

    if (freenumber === 0)
    {
        $("#isyellowline").val("1");
        $("#isyellowline").prop('disabled', true);
    }
    else
    {
        $("#isyellowline").prop('disabled', false);
    }

}

function loadLaneSettings()
{
    var allleftnumber = 0, leftnumber = 0, allrightnumber = 0, rightnumber = 0, allupnumber = 0, freenumber = 0, allbikenumber = 0, allnumber = 0;
    var id = $("#intersection").attr("currentLaneID");
    id = parseInt(id);
    var lanes = $("#intersection").attr("lanes");
    if (lanes === "")
    {
        alert("你还没有创建道路");
        return false;
    }
    lanes = JSON.parse(lanes);// id, name. degree, dashline, laneinfo
    for (var i = 0; i < lanes.length; i++)
    {
        var lid = parseInt(lanes[i].id);
        if (lid === id)
        {
            allleftnumber = lanes[i].allleftnumber;
            leftnumber = lanes[i].leftnumber;
            allrightnumber = lanes[i].allrightnumber;
            rightnumber = lanes[i].rightnumber;
            allupnumber = lanes[i].allupnumber;
            freenumber = lanes[i].freenumber;
            allbikenumber = lanes[i].allbikenumber;
            //lanes[i].laneinfo = laneinfo;
            allnumber = lanes[i].allnumber;
            break;
        }
    }
    $("#intersection").attr("lanes", JSON.stringify(lanes));

    if (allupnumber > 0 || allleftnumber > 0)
    {
        var content = "";
        for (var i = 0; i < allnumber - allrightnumber; i++)
        {
            content += '<option value="' + i + '">' + i + '</div>';

        }
        $("#leftmergenumber").html(content);

    }
    else
    {
        var content = '<option value="0">0</div>';
        $("#leftmergenumber").html(content);
    }

    if (allupnumber > 0 || allrightnumber > 0)
    {
        var content = "";
        for (var i = 0; i < allnumber - allleftnumber; i++)
        {
            content += '<option value="' + i + '">' + i + '</div>';

        }
        $("#rightmergenumber").html(content);

    }
    else
    {
        var content = '<option value="0">0</div>';
        $("#rightmergenumber").html(content);
    }

    if (leftnumber === 0)
    {
        $("#leftturnshow").val("0");
        $("#leftturnshow").prop('disabled', true);
    }
    else
    {
        $("#leftturnshow").prop('disabled', false);
    }

    if (allbikenumber === 0)
    {
        $("#isbikeline").val("0");
        $("#isbikeline").prop('disabled', true);
    }
    else
    {
        $("#isbikeline").prop('disabled', false);
    }

    if (freenumber === 0)
    {
        $("#isyellowline").val("1");
        $("#isyellowline").prop('disabled', true);
    }
    else
    {
        $("#isyellowline").prop('disabled', false);
    }
}

function generateIntersection_S()
{
    var timeFlag = $("#t_model_date").val();
    if (timeFlag === "" || timeFlag === null)
    {
        alert("请先确定调查的时间");
    }
    else
    {
//        var name = currentLine.Name;
//        var id = currentLine.idName;
//        var degree = currentLine.degree;
//        updateLaneInfo_Intersection(id, name, degree);
        generateIntersection();
    }

}

function generateIntersection()
{
    var pid = $("#mainSurveyPage").attr("pid");
    var data = getLanesInfo();
    var xcenter = $("#task_info").attr("xcenter");
    var ycenter = $("#task_info").attr("ycenter");
    var data1 = xcenter + "_" + ycenter + "D" + data;
    if (data !== "")
    {
        $.post("../../HandleCreateIntersection", {data: data1, pid: pid}, function (result)
        {

            if (!result.startsWith("1?"))
            {
                alert(result);

            }
            else
            {
                $("#intersection").attr("laneInfo", data);
                var img = result.split("?");
                $("#intersection").attr("showDone", "1");
                $("#img_result").attr('src', img[1] + '?' + new Date().getTime());
                //$("#task_info").attr("imgPath", img[1]);
            }
        });
    }
    else
    {
        alert("请确保你已经初始化了所有车道！");
    }
}


function showCurrentIntersectionImage()
{
    var data = $("#task_info").attr("laneinfo");
    var pid = $("#mainSurveyPage").attr("pid");
    var slanes = "";
    var preslanes = $("#task_item_show").attr("preslanes");
    var spoints = "0_0";
    $.post("../../HandleCreateTask", {data: data, spoints: spoints, slanes: slanes, pid: pid, preslanes: preslanes, option: 0}, function (result)
    {

        if (result.startsWith("1_"))
        {
            alert(result);

        }
        else
        {
            var out = result.split("M");
            $("#imag1").attr('src', out[1] + '?t=' + new Date().getTime());
            //showDirections(out[0], out[2]);

        }
    });
}


function showCoords(event) {
    var flag = $("#task_info").attr("imageClick");
    if (flag === "1")
    {
        var x = event.clientX;
        var y = event.clientY;
        var position = $("#imag1").offset();
        var data = $("#task_info").attr("laneinfo");
        var pid = $("#mainSurveyPage").attr("pid");
        var slanes = $("#task_item_show").attr("current_slanes");
        var preslanes = $("#task_item_show").attr("preslanes");
        var spoints = $("#task_item_show").attr("current_spoints");
        var xi = parseInt(x - position.left);
        var yi = parseInt(y - position.top);
        if (spoints === "")
        {
            spoints += xi + "_" + yi;
        }
        else
        {
            spoints += "#" + xi + "_" + yi;
        }
        $("#task_info").attr("imageClick", "2");
        var xcenter = parseInt($("#task_info").attr("xcenter"));
        var ycenter = parseInt($("#task_info").attr("ycenter"));
        var data1 = (xcenter) + "_" + (ycenter) + "D" + data;
        $.post("../../HandleCreateTask", {data: data1, spoints: spoints, slanes: slanes, pid: pid, preslanes: preslanes, option: 1}, function (result)
        {

            if (result.startsWith("1_"))
            {
                alert(result);
                $("#task_info").attr("imageClick", "1");

            }
            else
            {

                var out = result.split("M");
                if (!checkLaneExistSelection(slanes, preslanes, out[2]))
                {
                    $("#imag1").attr('src', out[1] + '?t=' + new Date().getTime());
                    $("#imag1").attr('image', out[3]);
                    showDirections(out[0], out[2], preslanes);
                }
                else
                {
                    alert("此车流已经被选择，不能被重复选择");
                }
                $("#task_info").attr("imageClick", "1");

            }

            $("#task_info").attr("imageClick", "1");
        });
    }
    else if (flag === "2")
    {
        alert("车流配置中，请勿重复点击");
    }

    //alert(coords + " X: " + position.left + " Y: " + position.top);
}


function startIntersectionMoving()
{
    var src = $("#img_result").attr("src");
    if (src !== undefined && src !== "")
    {
        $("#img_result").attr("move", "1");
        $("#img_result").css("cursor", "pointer");
    }
    else
    {
        alert("请先生成交叉口示意图");
    }
}


function getStartIntersectionImage(event)
{
    var flag = $("#img_result").attr("move");
    if (flag === "1")
    {
        var x = event.clientX;
        var y = event.clientY;
        var position = $("#img_result").offset();
        var xi = parseInt(x - position.left);
        var yi = parseInt(y - position.top);
        $("#task_info").attr("xStart", xi);
        $("#task_info").attr("yStart", yi);
    }
}

function movingIntersectionImage(event) {
    var flag = $("#img_result").attr("move");
    if (flag === "1")
    {

        var xstart = parseInt($("#task_info").attr("xstart"));
        var ystart = parseInt($("#task_info").attr("ystart"));
        var xcenter = parseInt($("#task_info").attr("xcenter"));
        var ycenter = parseInt($("#task_info").attr("ycenter"));
        var x = event.clientX;
        var y = event.clientY;
        var position = $("#img_result").offset();
        var data = $("#intersection").attr("laneinfo");
        var pid = $("#mainSurveyPage").attr("pid");
        var spoints = $("#task_item_show").attr("current_spoints");
        var xi = parseInt(x - position.left);
        var yi = parseInt(y - position.top);
        if (spoints === "")
        {
            spoints += xi + "_" + yi;
        }
        else
        {
            spoints += "#" + xi + "_" + yi;
        }
        var data1 = (xi - xstart + xcenter) + "_" + (yi - ystart + ycenter) + "D" + data;
        $.post("../../HandleCreateIntersection", {data: data1, pid: pid}, function (result)
        {

            if (!result.startsWith("1?"))
            {
                alert(result);
            }
            else
            {
                $("#intersection").attr("laneInfo", data);
                $("#task_info").attr("xcenter", (xi - xstart + xcenter));
                $("#task_info").attr("ycenter", (yi - ystart + ycenter));
                var img = result.split("?");
                $("#intersection").attr("showDone", "1");
                $("#img_result").attr('src', img[1] + '?' + new Date().getTime());
                //$("#task_info").attr("imgPath", img[1]);
            }
        });
    }

    //alert(coords + " X: " + position.left + " Y: " + position.top);
}

function movingShowIntersectionImage(event)
{
    var flag = $("#img_result").attr("move");
    if (flag === "1")
    {
        var xstart = parseInt($("#task_info").attr("xstart"));
        var ystart = parseInt($("#task_info").attr("ystart"));
        var xcenter = parseInt($("#task_info").attr("xcenter"));
        var ycenter = parseInt($("#task_info").attr("ycenter"));
        var x = event.clientX;
        var y = event.clientY;
        var position = $("#img_result").offset();
        var data = $("#intersection").attr("laneinfo");
        var pid = $("#mainSurveyPage").attr("pid");
        var spoints = $("#task_item_show").attr("current_spoints");
        var xi = parseInt(x - position.left);
        var yi = parseInt(y - position.top);
        if (spoints === "")
        {
            spoints += xi + "_" + yi;
        }
        else
        {
            spoints += "#" + xi + "_" + yi;
        }
        var data1 = (xi - xstart + xcenter) + "_" + (yi - ystart + ycenter) + "D" + data;
        $.post("../../HandleCreateIntersection", {data: data1, pid: pid}, function (result)
        {

            if (!result.startsWith("1?"))
            {
                alert(result);

            }
            else
            {
                $("#intersection").attr("laneInfo", data);
                $("#task_info").attr("xcenter", (xi - xstart + xcenter));
                $("#task_info").attr("ycenter", (yi - ystart + ycenter));
                var img = result.split("?");
                $("#intersection").attr("showDone", "1");
                $("#img_result").attr('src', img[1] + '?' + new Date().getTime());
                //$("#task_info").attr("imgPath", img[1]);
            }
        });
    }
}





function getSlanesOBJ(preslanes)
{
    var data = [];
    if (preslanes === "")
    {
        return null;
    }
    else
    {
        // idStype_index_direction#L
        var slanes = preslanes.split("L");
        for (var i = 0; i < slanes.length; i++)
        {
            var info = slanes[i].split("S");
            var ss = info[1].split("#");
            var sds = [];
            for (var j = 0; j < ss.length; j++)
            {
                sds.push(ss[j]);
            }
            var item = {id: info[0], lane: sds};
            data.push(item);
        }
        return data;
    }

}

function isInSlanes(info, lanes)
{
    var count = 0;

    if (lanes === null || lanes === "")
    {
        return 0;
    }
    else
    {
        var infos = info.split("_");
        var nid = infos[0];
        var lane = infos[1] + "_" + infos[2];
        for (var i = 0; i < lanes.length; i++)
        {
            var id = parseInt(lanes[i].id);
            nid = parseInt(nid);
            if (id === nid)
            {
                var ss = lanes[i].lane;
                for (var j = 0; j < ss.length; j++)
                {
                    if (ss[j].startsWith(lane))
                    {
                        count++;
                    }
                }

            }
        }
        return count;
    }
}

function isInSlanes_Count(info, lanes)
{
    var count = 0;

    if (lanes === null || lanes === "")
    {
        return 0;
    }
    else
    {
        var infos = info.split("_");
        var nid = infos[0];
        var lane = infos[1] + "_" + infos[2] + "_" + infos[3];
        for (var i = 0; i < lanes.length; i++)
        {
            var id = parseInt(lanes[i].id);
            nid = parseInt(nid);
            if (id === nid)
            {
                var ss = lanes[i].lane;
                for (var j = 0; j < ss.length; j++)
                {
                    if (ss[j].startsWith(lane))
                    {
                        count++;
                    }
                }

            }
        }
        return count;
    }
}
function checkLaneExistSelection(slanes, preslanes, info)// info: id_type_index
{
    var type = info.split("_");
    var preOBJ = getSlanesOBJ(preslanes);
    var currentOBJ = getSlanesOBJ(slanes);
    type = parseInt(type[1]);
    if (type === 1 || type === 10)
    {
        if (isInSlanes(info, currentOBJ) > 0)
        {
            return false;
        }

        if (isInSlanes(info, preOBJ) > 0)
        {
            return true;
        }
        else
        {
            return false;
        }

    }
    else if (type === 2 || type === 11)
    {

        if (isInSlanes(info, currentOBJ) > 0)
        {
            return false;
        }

        if (isInSlanes(info, preOBJ) >= 2)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    else if (type === 3 || type === 12)
    {
        if (isInSlanes(info, currentOBJ) > 0)
        {
            return false;
        }

        if (isInSlanes(info, preOBJ) >= 3)
        {
            return true;
        }
        else
        {
            return false;
        }

    }
    else if (type === 4 || type === 13)
    {
        if (isInSlanes(info, currentOBJ) > 0)
        {
            return false;
        }

        if (isInSlanes(info, preOBJ) > 0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    else if (type === 5 || type === 14)
    {

        if (isInSlanes(info, currentOBJ) > 0)
        {
            return false;
        }

        if (isInSlanes(info, preOBJ) >= 2)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    else if (type === 6 || type === 15)
    {
        if (isInSlanes(info, currentOBJ) > 0)
        {
            return false;
        }

        if (isInSlanes(info, preOBJ) >= 3)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    else if (type === 7 || type === 16)
    {
        if (isInSlanes(info, currentOBJ) > 0)
        {
            return false;
        }

        if (isInSlanes(info, preOBJ) > 0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    else if (type === 8 || type === 17)
    {
        if (isInSlanes(info, currentOBJ) > 0)
        {
            return false;
        }

        if (isInSlanes(info, preOBJ) >= 2)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    else if (type === 9 || type === 18)
    {
        if (isInSlanes(info, currentOBJ) > 0)
        {
            return false;
        }

        if (isInSlanes(info, preOBJ) > 0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    else if (type === 19)
    {
        if (isInSlanes(info, currentOBJ) > 0)
        {
            return false;
        }

        if (isInSlanes(info, preOBJ) > 0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    else if (type === 20)
    {
        if (isInSlanes(info, currentOBJ) > 0)
        {
            return false;
        }

        if (isInSlanes(info, preOBJ) > 0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}

function showDirections(slanes, info, preslanes)
{
    var type = info.split("_");
    var direction = 0;
    var out = "";
    var lane = "";
    type = parseInt(type[1]);
    var preOBJ = getSlanesOBJ(preslanes);
    if (type === 1 || type === 10)
    {
        direction = 1;
    }
    else if (type === 2 || type === 11)
    {
        out = '<div class="lane_directions" id="lane_directions">';
        lane = info + "_" + "1";
        if (isInSlanes_Count(lane, preOBJ) > 0)
        {
            out += '<label class="checkbox-inline"><input class="lane_direcs" type="checkbox" value="1" disabled>掉头流向</label>';
        }
        else
        {
            out += '<label class="checkbox-inline"><input class="lane_direcs" type="checkbox" value="1">掉头流向</label>';
        }

        lane = info + "_" + "2";
        if (isInSlanes_Count(lane, preOBJ) > 0)
        {
            out += '<label class="checkbox-inline"><input class="lane_direcs" type="checkbox" value="2" disabled>左转流向</label>';
        }
        else
        {
            out += '<label class="checkbox-inline"><input class="lane_direcs" type="checkbox" value="2">左转流向</label>';
        }
        out += '</div>';
    }
    else if (type === 3 || type === 12)
    {
        out = '<div class="lane_directions" id="lane_directions">';
        lane = info + "_" + "1";
        if (isInSlanes_Count(lane, preOBJ) > 0)
        {
            out += '<label class="checkbox-inline"><input class="lane_direcs" type="checkbox" value="1" disabled>掉头流向</label>';
        }
        else
        {
            out += '<label class="checkbox-inline"><input class="lane_direcs" type="checkbox" value="1">掉头流向</label>';
        }

        lane = info + "_" + "2";
        if (isInSlanes_Count(lane, preOBJ) > 0)
        {
            out += '<label class="checkbox-inline"><input class="lane_direcs" type="checkbox" value="2" disabled>左转流向</label>';
        }
        else
        {
            out += '<label class="checkbox-inline"><input class="lane_direcs" type="checkbox" value="2">左转流向</label>';
        }

        lane = info + "_" + "3";
        if (isInSlanes_Count(lane, preOBJ) > 0)
        {
            out += '<label class="checkbox-inline"><input class="lane_direcs" type="checkbox" value="3" disabled>直行流向</label>';
        }
        else
        {
            out += '<label class="checkbox-inline"><input class="lane_direcs" type="checkbox" value="3">直行流向</label>';
        }
        out += '</div>';

    }
    else if (type === 4 || type === 13)
    {
        direction = 2;
    }
    else if (type === 5 || type === 14)
    {
//        out = '<div class="lane_directions" id="lane_directions">'
//                + '<label class="checkbox-inline"><input class="lane_direcs" type="checkbox" value="2">左转流向</label>'
//                + '<label class="checkbox-inline"><input class="lane_direcs" type="checkbox" value="3">直行流向</label>'
//                + '</div>';

        out = '<div class="lane_directions" id="lane_directions">';
        lane = info + "_" + "2";
        if (isInSlanes_Count(lane, preOBJ) > 0)
        {
            out += '<label class="checkbox-inline"><input class="lane_direcs" type="checkbox" value="2" disabled>左转流向</label>';
        }
        else
        {
            out += '<label class="checkbox-inline"><input class="lane_direcs" type="checkbox" value="2">左转流向</label>';
        }

        lane = info + "_" + "3";
        if (isInSlanes_Count(lane, preOBJ) > 0)
        {
            out += '<label class="checkbox-inline"><input class="lane_direcs" type="checkbox" value="3" disabled>直行流向</label>';
        }
        else
        {
            out += '<label class="checkbox-inline"><input class="lane_direcs" type="checkbox" value="3">直行流向</label>';
        }
        out += '</div>';
    }
    else if (type === 6 || type === 15)
    {
//        out = '<div class="lane_directions" id="lane_directions">'
//                + '<label class="checkbox-inline"><input class="lane_direcs" type="checkbox" value="2">左转流向</label>'
//                + '<label class="checkbox-inline"><input class="lane_direcs" type="checkbox" value="3">直行流向</label>'
//                + '<label class="checkbox-inline"><input class="lane_direcs" type="checkbox" value="4">右转流向</label>'
//                + '</div>';

        out = '<div class="lane_directions" id="lane_directions">';
        lane = info + "_" + "2";
        if (isInSlanes_Count(lane, preOBJ) > 0)
        {
            out += '<label class="checkbox-inline"><input class="lane_direcs" type="checkbox" value="2" disabled>左转流向</label>';
        }
        else
        {
            out += '<label class="checkbox-inline"><input class="lane_direcs" type="checkbox" value="2">左转流向</label>';
        }

        lane = info + "_" + "3";
        if (isInSlanes_Count(lane, preOBJ) > 0)
        {
            out += '<label class="checkbox-inline"><input class="lane_direcs" type="checkbox" value="3" disabled>直行流向</label>';
        }
        else
        {
            out += '<label class="checkbox-inline"><input class="lane_direcs" type="checkbox" value="3">直行流向</label>';
        }

        lane = info + "_" + "4";
        if (isInSlanes_Count(lane, preOBJ) > 0)
        {
            out += '<label class="checkbox-inline"><input class="lane_direcs" type="checkbox" value="4" disabled>右转流向</label>';
        }
        else
        {
            out += '<label class="checkbox-inline"><input class="lane_direcs" type="checkbox" value="4">右转流向</label>';
        }
        out += '</div>';
    }
    else if (type === 7 || type === 16)
    {
        direction = 3;
    }
    else if (type === 8 || type === 17)
    {
//        out = '<div class="lane_directions" id="lane_directions">'
//                + '<label class="checkbox-inline"><input class="lane_direcs" type="checkbox" value="3">直行流向</label>'
//                + '<label class="checkbox-inline"><input class="lane_direcs" type="checkbox" value="4">右转流向</label>'
//                + '</div>';

        out = '<div class="lane_directions" id="lane_directions">';
        lane = info + "_" + "3";
        if (isInSlanes_Count(lane, preOBJ) > 0)
        {
            out += '<label class="checkbox-inline"><input class="lane_direcs" type="checkbox" value="3" disabled>直行流向</label>';
        }
        else
        {
            out += '<label class="checkbox-inline"><input class="lane_direcs" type="checkbox" value="3">直行流向</label>';
        }

        lane = info + "_" + "4";
        if (isInSlanes_Count(lane, preOBJ) > 0)
        {
            out += '<label class="checkbox-inline"><input class="lane_direcs" type="checkbox" value="4" disabled>右转流向</label>';
        }
        else
        {
            out += '<label class="checkbox-inline"><input class="lane_direcs" type="checkbox" value="4">右转流向</label>';
        }
        out += '</div>';
    }
    else if (type === 9 || type === 18)
    {
        direction = 4;
    }
    else if (type === 19)
    {
        direction = 5;
    }
    else if (type === 20)
    {
        direction = 6;
    }

    if (out === "")
    {
        var newSlanes = updateSLanes(slanes, info, direction);
        $("#task_item_show").attr("current_slanes", newSlanes);
    }
    else
    {
        var content = '<div class="modal-dialog">'

                + '<div class="modal-content" style="width:700px;">'
                + '<div class="modal-header">'
                + '<button type="button" class="close" data-dismiss="modal">&times;</button>'
                + '<h4 class="modal-title">任务的详细信息</h4>'
                + '</div>'
                + '<div class="modal-body">';
        content += out;
        content += '</div>';
        content += '<div class="modal-footer" id="footsize">'
                + '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>'

                + '<button type="button" class="btn btn-default" onclick="saveLaneDirection(\'' + slanes + '\',\'' + info + '\')">确定</button>'
                + '</div>'
                + '</div>'
                + '</div>';

        var dig = document.getElementById("myModalSurvey");
        dig.innerHTML = "";
        dig.innerHTML = content;
        $("#myModalSurvey").modal();

    }

}

function saveLaneDirection(slanes, info)
{
    var direction = "";
    $(".lane_direcs").each(function () {
        // $(this) will fetch the current element
        if ($(this).is(':checked'))
        {
            direction += $(this).val();
        }

    });
    var newSlanes = updateSLanes(slanes, info, direction);
    $("#task_item_show").attr("current_slanes", newSlanes);
    $("#myModalSurvey").modal("hide");

}

function updateSLanes(slanes, info, direction)
{
    // idStype_index_direction#L
    var ins = info.split("_");
    if (slanes !== "")
    {
        var ls = slanes.split("L");
        var newLanes = "";
        for (var i = 0; i < ls.length; i++)
        {
            var item = ls[i].split("S");
            var ssinfo = item[1].split("#");
            if (newLanes !== "")
            {
                newLanes += "L";
            }
            for (var j = 0; j < ssinfo.length; j++)
            {

                var sinfo = ssinfo[j].split("_");
                if (item[0] === ins[0] && ins[1] === sinfo[0])
                {
                    if (j === 0)
                    {
                        newLanes += item[0] + "S" + sinfo[0] + "_" + sinfo[1] + "_" + direction;
                    }
                    else
                    {
                        newLanes += "#" + sinfo[0] + "_" + sinfo[1] + "_" + direction;
                    }
                }
                else
                {
                    if (j === 0)
                    {
                        newLanes += item[0] + "S" + sinfo[0] + "_" + sinfo[1] + "_" + sinfo[2];
                    }
                    else
                    {
                        newLanes += "#" + sinfo[0] + "_" + sinfo[1] + "_" + sinfo[2];
                    }
                }

            }
        }
        return newLanes;
    }
    else
    {
        return "";
    }
}

function createTaskModelFirst()
{
    var tdate = $("#t_model_date").val();
    if (tdate === "")
    {
        alert("请先确定调查的时间");
        return false;
    }

    var name = "", tname = "";
    var laneInfo = $("#intersection").attr("laneInfo");
    var lanes = $("#intersection").attr("lanes");
    var lat = $("#intersection_section").attr("lat");
    var lng = $("#intersection_section").attr("lng");
    var id = $("#intersection_section").attr("stmid");
    var img_path = $("#img_result").attr("src");
    var xcenter = $("#task_info").attr("xcenter");
    var ycenter = $("#task_info").attr("ycenter");
    if (laneInfo === "" || lanes === "")
    {
        alert("请先确保渠化已经完成");
        return 0;
    }
    if (img_path === "")
    {
        alert("请先生成渠化图");
        return 0;
    }
    var working_status = 0;
    var type = 1;
    var sid = $("#mainSurveyPage").attr("spid");

    var cars = [];
//    $(".navBarCarICON").each(function () {
//        var item = $(this).attr("data");
//        item = JSON.parse(item);
//        cars.push(item);
//    });
    var model = {xcenter: xcenter, ycenter: ycenter, sid: sid, id: id, mdate: tdate, name: name, tname: tname, lat: lat, lng: lng, working_status: working_status, img_path: img_path, type: type, laneinfo: laneInfo, lanes: JSON.parse(lanes), cars: cars, task_items: []};
    model = JSON.stringify(model);
    $.ajax({
        url: "../../HandleAddSurvey_Task_Model",
        data: {"data": model},
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
        },
        success: function (result) {
            if (result === "0")
            {
                alert("调查没有创建成功，请重新尝试");
            }
            else
            {
                var model = JSON.parse(result);
                if (model.type === 1)
                {
                    createIntersectionModel(model.id, model.lat, model.lng);
                    $("#task_info").attr("laneinfo", model.laneinfo);
                    $("#task_info").attr("xcenter", model.xcenter);
                    $("#task_info").attr("ycenter", model.ycenter);

                    $("#task_info").attr("lanes", JSON.stringify(model.lanes));
                    $("#task_info").attr("task_img", model.img_path);
                    $("#imag1").attr("src", model.img_path);
                    $("#t_model_date").val(model.mdate);
                    $("#img_result").attr("src", model.img_path);
                    $("#intersection").attr("laneinfo", model.laneinfo);
                    setLanesObject(model.laneinfo);
                    loadTaskItems(model.group_tasks, model.type);
                    //alert("项目保存成功");
                    //cancelTaskToTimedRange();
                }
            }
        }
    });

}

function updateTaskModelFirst()
{
    var tdate = $("#t_model_date").val();
    if (tdate === "")
    {
        alert("请先确定调查的时间");
        return false;
    }

    var name = "", tname = "";
    var laneInfo = $("#intersection").attr("laneInfo");
    var lanes = $("#intersection").attr("lanes");
    var lat = $("#intersection_section").attr("lat");
    var lng = $("#intersection_section").attr("lng");
    var id = $("#intersection_section").attr("stmid");
    var xcenter = $("#task_info").attr("xcenter");
    var ycenter = $("#task_info").attr("ycenter");
    var img_path = $("#img_result").attr("src");
    if (laneInfo === "" || lanes === "")
    {
        alert("请先确保渠化已经完成");
        return 0;
    }
    if (img_path === "")
    {
        alert("请先生成渠化图");
        return 0;
    }

    var cars = [];
//    $(".navBarCarICON").each(function () {
//        var item = $(this).attr("data");
//        item = JSON.parse(item);
//        cars.push(item);
//    });
    var working_status = 0;
    var type = 1;
    var sid = $("#mainSurveyPage").attr("spid");
    var model = {xcenter: xcenter, ycenter: ycenter, sid: sid, id: id, mdate: tdate, name: name, tname: tname, lat: lat, lng: lng, working_status: working_status, img_path: img_path, type: type, laneinfo: laneInfo, lanes: JSON.parse(lanes), cars: cars, task_items: []};
    model = JSON.stringify(model);
    $.ajax({
        url: "../../HandleUpdateSurvey_Task_Model",
        data: {"data": model},
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
        },
        success: function (result) {
            if (result === "0")
            {
                alert("调查没有创建成功，请重新尝试");
            }
            else
            {
                var model = JSON.parse(result);
                if (model.type === 1)
                {
                    createIntersectionModel(model.id, model.lat, model.lng);
                    $("#task_info").attr("laneinfo", model.laneinfo);
                    $("#task_info").attr("lanes", JSON.stringify(model.lanes));
                    $("#task_info").attr("task_img", model.img_path);
                    $("#task_info").attr("xcenter", model.xcenter);
                    $("#task_info").attr("ycenter", model.ycenter);
                    $("#imag1").attr("src", model.img_path);
                    $("#t_model_date").val(model.mdate);
                    $("#img_result").attr("src", model.img_path);
                    $("#intersection").attr("laneinfo", model.laneinfo);
                    setLanesObject(model.laneinfo);
                    loadTaskItems(model.group_tasks, model.type);
                    //alert("项目保存成功");
                    //cancelTaskToTimedRange();
                }
            }
        }
    });

}

function taskinfoSaveConfirm()
{
    var option = $("#task_item_show").attr("option");
    if (option === "1")// add task/model
    {
        var stmid = $("#intersection_section").attr("stmid");
        var group = $("#task_item_show").attr("timeGroup");
        var carinfo = getCurrentCarTypes();
        if (carinfo === "")
        {
            alert("请先配置车型");
            return 0;
        }
        var tdate = $("#t_model_date").val();
        if (tdate === "")
        {
            alert("请先配置调查的时间");
            return 0;
        }
        var alllanes = $("#task_info").attr("laneinfo");
        var slanes = $("#task_item_show").attr("current_slanes");
        if (slanes === "")
        {
            alert("请先配置车流");
            return 0;
        }

        var type = 1;
        var method = 0;
        if ($("#shipin").prop('checked'))
        {
            method = '1';
        }
        if ($("#rengong").prop('checked'))
        {
            method = '2';
        }

        var stime = $("#t_interval_" + group).attr("stime");
        var etime = $("#t_interval_" + group).attr("etime");
        var duration = $("#t_interval_" + group).attr("duration");
        var img_path = $("#imag1").attr("image");
        var task = {stime: stime, tdate: tdate, alllanes: alllanes, stmid: stmid, id: 0, type: type, duration: duration, img_path: img_path, etime: etime, slanes: slanes, c_status: 0, method: method, light_type: 0, peizhi: JSON.parse(carinfo)};
        if (stmid === "0") // adding new task item into the interval time slots.
        {
            var name = "", tname = "";
            var laneInfo = $("#task_info").attr("laneinfo");
            var lanes = $("#task_info").attr("lanes");
            var lat = $("#intersection_section").attr("lat");
            var lng = $("#intersection_section").attr("lng");
            var id = $("#intersection_section").attr("stmid");
            var img_path = $("#task_info").attr("task_img");
            if (laneInfo === "" || lanes === "")
            {
                alert("请先确保渠化已经完成");
                return 0;
            }
            if (img_path === "")
            {
                alert("请先生成渠化图");
                return 0;
            }


            var working_status = 0;
            var type = 1;
            var sid = $("#mainSurveyPage").attr("spid");
            var mdate = $("#t_model_date").val();
            if (mdate === "")
            {
                alert("请先确定调查时间");
                return 0;
            }
            var cars = [];
            $(".navBarCarICON").each(function () {
                var item = $(this).attr("data");
                item = JSON.parse(item);
                cars.push(item);
            });
            var tasks = [];
            tasks.push(task);
            var model = {sid: sid, id: id, mdate: mdate, name: name, tname: tname, lat: lat, lng: lng, working_status: working_status, img_path: img_path, type: type, laneinfo: laneInfo, lanes: JSON.parse(lanes), cars: cars, task_items: tasks};
            model = JSON.stringify(model);
            $.ajax({
                url: "../../HandleAddSurvey_Task_Model",
                data: {"data": model},
                type: "GET",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
                },
                success: function (result) {
                    if (result === "0")
                    {
                        alert("项目任务没有保存成功，请重新尝试");
                    }
                    else
                    {
                        var model = JSON.parse(result);
                        if (model.type === 1)
                        {
                            createIntersectionModel(model.id, model.lat, model.lng);
                            $("#task_info").attr("laneinfo", model.laneinfo);
                            $("#task_info").attr("lanes", JSON.stringify(model.lanes));
                            $("#task_info").attr("task_img", model.img_path);
                            $("#task_info").attr("xcenter", model.xcenter);
                            $("#task_info").attr("ycenter", model.ycenter);
                            $("#imag1").attr("src", model.img_path);
                            $("#t_model_date").val(model.mdate);
                            $("#img_result").attr("src", model.img_path);
                            $("#intersection").attr("laneinfo", model.laneinfo);
                            setLanesObject(model.laneinfo);
                            loadTaskItems(model.group_tasks, model.type);
                            alert("项目保存成功");
                            cancelTaskToTimedRange();
                        }
                    }
                }
            });
        }
        else
        {
            task = JSON.stringify(task);
            $.ajax({
                url: "../../HandleAddTaskItem",
                data: {"data": task},
                type: "GET",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
                },
                success: function (result) {
                    if (result === "0")
                    {
                        alert("项目任务没有保存成功，请重新尝试");
                    }
                    else
                    {
                        var model = JSON.parse(result);
                        if (model.type === 1)
                        {
                            createIntersectionModel(model.id, model.lat, model.lng);
                            $("#task_info").attr("laneinfo", model.laneinfo);
                            $("#task_info").attr("lanes", JSON.stringify(model.lanes));
                            $("#task_info").attr("xcenter", model.xcenter);
                            $("#task_info").attr("ycenter", model.ycenter);
                            $("#task_info").attr("task_img", model.img_path);
                            $("#imag1").attr("src", model.img_path);
                            $("#t_model_date").val(model.mdate);
                            $("#img_result").attr("src", model.img_path);
                            $("#intersection").attr("laneinfo", model.laneinfo);
                            setLanesObject(model.laneinfo);
                            loadTaskItems(model.group_tasks, model.type);
                            alert("项目保存成功");
                            cancelTaskToTimedRange();
                        }
                    }
                }
            });
        }
    }
    else // modify taskitem
    {
        var taskIndex = $("#task_item_show").attr("taskindex");
        var data = $("#t_task_" + taskIndex).attr("data");
        data = JSON.parse(data);
        if (data.c_status === "0")
        {
            var group = $("#task_item_show").attr("timeGroup");
            var carinfo = getCurrentCarTypes();
            if (carinfo === "")
            {
                alert("请先配置车型");
                return 0;
            }
            var slanes = $("#task_item_show").attr("current_slanes");
            if (slanes === "")
            {
                alert("请先配置车流");
                return 0;
            }
            var method = 0;
            if ($("#shipin").prop('checked'))
            {
                method = '1';
            }
            if ($("#rengong").prop('checked'))
            {
                method = '2';
            }
            var img_path = $("#imag1").attr("src");
            //var datac = '{"stime":"' + data.stime + '","tdate":"' + data.tdate + '","alllanes":"' + data.alllanes + '","stmid":"' + data.stmid + '","id":"' + data.id + '","type":"' + data.type + '","duration":"' + data.duration + '","img_path":"' + img_path + '","etime":"' + data.etime + '","slanes":"' + slanes + '","c_status":"' + data.c_status + '","method":"' + method + '","light_type":"' + data.light_type + '","peizhi":' + carinfo + '}';
            var task = {stime: data.stime, tdate: data.tdate, alllanes: data.alllanes, stmid: data.stmid, id: data.id, type: data.type, duration: data.duration, img_path: img_path, etime: data.etime, slanes: slanes, c_status: data.c_status, method: method, light_type: data.light_type, peizhi: JSON.parse(carinfo)};
            task = JSON.stringify(task);
            $.ajax({
                url: "../../HandleModifyTaskItem",
                data: {"data": task},
                type: "GET",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
                },
                success: function (result) {
                    if (result === "0")
                    {
                        alert("项目任务没有修改成功，请重新尝试");
                    }
                    else
                    {
                        var model = JSON.parse(result);
                        if (model.type === 1)
                        {
                            createIntersectionModel(model.id, model.lat, model.lng);
                            $("#task_info").attr("laneinfo", model.laneinfo);
                            $("#task_info").attr("lanes", JSON.stringify(model.lanes));
                            $("#task_info").attr("task_img", model.img_path);
                            $("#task_info").attr("xcenter", model.xcenter);
                            $("#task_info").attr("ycenter", model.ycenter);
                            $("#imag1").attr("src", model.img_path);
                            $("#t_model_date").val(model.mdate);
                            $("#img_result").attr("src", model.img_path);
                            $("#intersection").attr("laneinfo", model.laneinfo);
                            setLanesObject(model.laneinfo);
                            loadTaskItems(model.group_tasks, model.type);
                            alert("项目修改成功");
                            cancelTaskToTimedRange();
                        }
                    }
                }
            });

        }
        else if (data.c_status === "4")
        {
            alert("任务已经完成，你不能修改任务");
        }
        else
        {
            alert("任务正在进行中，你不能修改任务");
        }
    }
}

function showTaskImageInfo(index)
{
    var item = $("#t_task_" + index);
    var parentIndex = $("#t_task_" + index).attr("pindex");
    var task = item.attr("data");
    task = JSON.parse(task);
    var data = $("#task_info").attr("laneinfo");
    var pid = $("#mainSurveyPage").attr("pid");
    var slanes = task.slanes;
    var xcenter = parseInt($("#task_info").attr("xcenter"));
    var ycenter = parseInt($("#task_info").attr("ycenter"));
    var data1 = (xcenter) + "_" + (ycenter) + "D" + data;
    var t_interval = $("#t_interval_" + parentIndex);
    var preslanes = t_interval.attr("preslanes");
    var spoints = "0_0";

    $.post("../../HandleCreateTask", {data: data1, spoints: spoints, slanes: slanes, pid: pid, preslanes: preslanes, option: 0}, function (result)
    {

        if (result.startsWith("1_"))
        {
            alert("刷新页面出现错误");

        }
        else
        {
            var out = result.split("M");
            $("#imag1").attr('src', out[1] + '?t=' + new Date().getTime());


        }
    });
}

function deleteTask(index)
{
    if (confirm("你确定要删除此任务吗?"))
    {
        var data = $("#t_task_" + index).attr("data");
        data = JSON.parse(data);
        if (data.c_status === "0")
        {
            $.ajax({
                url: "../../HandleDeleteTaskItem",
                data: {"tid": data.id},
                type: "GET",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
                },
                success: function (result) {
                    if (result === "0")
                    {
                        alert("项目任务没有删除成功，请重新尝试");
                    }
                    else
                    {
                        var model = JSON.parse(result);
                        if (model.type === 1)
                        {
                            createIntersectionModel(model.id, model.lat, model.lng);
                            $("#task_info").attr("laneinfo", model.laneinfo);
                            $("#task_info").attr("lanes", JSON.stringify(model.lanes));
                            $("#task_info").attr("task_img", model.img_path);
                            $("#task_info").attr("xcenter", model.xcenter);
                            $("#task_info").attr("ycenter", model.ycenter);
                            $("#imag1").attr("src", model.img_path);
                            $("#t_model_date").val(model.mdate);
                            $("#img_result").attr("src", model.img_path);
                            $("#intersection").attr("laneinfo", model.laneinfo);
                            setLanesObject(model.laneinfo);
                            loadTaskItems(model.group_tasks, model.type);
                            alert("项目任务删除成功");
                        }
                    }
                }
            });
        }
        else if (data.c_status === "4")
        {
            alert("此任务已经被完成，你不能删除");
        }
        else
        {
            alert("此任务正在进行中，你不能删除");
        }
    }
}

function showEditedTask(index)
{
    var parentIndex = $("#t_task_" + index).attr("pindex");
    var task = $("#t_task_" + index).attr("data");
    task = JSON.parse(task);
    var data0 = $("#task_info").attr("laneinfo");
    var pid = $("#mainSurveyPage").attr("pid");
    var slanes = task.slanes;
    var xcenter = parseInt($("#task_info").attr("xcenter"));
    var ycenter = parseInt($("#task_info").attr("ycenter"));
    var data1 = (xcenter) + "_" + (ycenter) + "D" + data0;
    var t_interval = $("#t_interval_" + parentIndex);
    var preslanes = t_interval.attr("preslanes");
    var spoints = "0_0";

    $.post("../../HandleCreateTask", {data: data1, spoints: spoints, slanes: slanes, pid: pid, preslanes: preslanes, option: 0}, function (result)
    {

        if (result.startsWith("1_"))
        {
            alert("刷新页面出现错误");

        }
        else
        {
            var out = result.split("M");
            //$("#imag1").attr('src', "");
            $("#imag1").attr('src', out[1] + '?t=' + new Date().getTime());
            $("#task_item_show").show();
            var pindex = $("#t_task_" + index).attr("pindex");
            $("#task_item_show").attr("taskindex", index);
            $("#task_item_show").attr("timeGroup", pindex);
            $("#task_item_show").attr("option", "2");
            var data = $("#t_task_" + index).attr("data");
            data = JSON.parse(data);
            $("#task_item_show").attr("current_slanes", data.slanes);
            $("#task_item_show").attr("preslanes", "");
            $("#task_item_show").attr("current_spoints", "");
            if (data.method === "1")
            {
                $("#shipin").prop("checked", true);
            }
            else
            {
                $("#rengong").prop("checked", true);
            }
            $("#task_cars_info").html("");
            var cars = data.peizhi;
            for (var i = 0; i < cars.length; i++)
            {

                var car = cars[i];
                var caricon = getCarICON(cars[i].type, 0);
                var content = '<div class="dropdown iconCarDiv" id="car_type_icon_temp_div_' + car.id + '" data=\'' + JSON.stringify(car) + '\'><i class="' + caricon + ' carIconTask" aria-hidden="true" data-toggle="dropdown"  data-placement="bottom" title="' + car.name + '" id="car_type_icon_temp_' + car.id + '" ></i>'
                        + '<div class="dropdown-menu" style="width:240px;height:120px;background:gainsboro;" aria-labelledby="car_type_icon_temp_' + i + '">'
                        + '<table class="table table-condensed" style="border:none;width:100%;">'
                        + '<tbody>'
                        + '<tr>'
                        + '<td style="border:none">车型:</td><td style="border:none">' + car.name + '</td>'
                        + '</tr>';
//                        + '<tr>'
//                        + '<td style="border:none">车长:</td>'
//                        + '<td style="border:none"><input type="text" id="c_min_length_temp_' + car.id + '"style="width:60px;" value="' + car.min_length + '">--<input type="text" style="width:60px;" id="c_max_length_temp_' + car.id + '" name="pei_name" value="' + car.max_length + '">米</td>'
//                        + '</tr>'
//                        + '<tr>'
//                        + '<td style="border:none">载重:</td>'
//                        + '<td style="border:none">'
//                        + '<input type="text" name="pei_name" style="width:60px;" id="c_min_weight_temp_' + car.id + '" value="' + car.min_weight + '">--<input type="text" name="pei_name" style="width:60px;" id="c_max_weight_temp_' + car.id + '" value="' + car.max_weight + '">吨</td>'
//                        + '</tr>';

                if (car.car_factor !== 0)
                {
                    content += '<tr>'
                            + '<td style="border:none" colspan="2">小汽车换算系数:&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" name="pei_name" style="width:60px;" id="car_factor_temp_' + car.id + '" value="' + car.car_factor + '"></td>'

                            + '</tr>';
                }

                content += '<tr>'
                        + '<td style="border:none; text-align: left" colspan="2">'
                        + '<button type="button" class="btn btn-success" onclick="carTypeConfirm_Temp(\'' + car.id + '\')">修改</button>'
                        + '</td>'
                        + '</tr>'
                        + '</tbody>'
                        + '</table>'
                        + '</div>'
                        + '<br/><div style="width:inherit;text-align:center;"><i class="fa fa-times-circle carTempICOND"  aria-hidden="true" onclick="removeTaskCarTemp(\'' + car.id + '\')"></i></div></div>';
                var item = $(content);
                $("#task_cars_info").append(item);
            }

        }
    });


}

function carTypeConfirm_Temp(id)
{
    var car = $("#car_type_icon_temp_div_" + id).attr("data");
    car = JSON.parse(car);
//    car.min_length = $("#c_min_length_temp_" + id).val();
//    car.max_length = $("#c_max_length_temp_" + id).val();
//    car.min_weight = $("#c_min_weight_temp_" + id).val();
//    car.max_weight = $("#c_max_weight_temp_" + id).val();
    car.car_factor = $("#car_factor_temp_" + id).val();
    car = JSON.stringify(car);
    $("#car_type_icon_temp_div_" + id).attr("data", car);
    alert("修改成功");
}

function copyTask(index)
{
    var pindex = $("#t_task_" + index).attr("pindex");
    var data = $("#t_task_" + index).attr("data");
    data = JSON.parse(data);
    var time_tasks = $("#task_info").find(".list_time_group");
    if (time_tasks === undefined || time_tasks === null || time_tasks.length === 0)
    {
        alert("没有当前存在的时段");
    }
    else
    {
        if (time_tasks.length > 1)
        {
            var content = '<div id="div_copy_task_temp" stid="' + data.id + '" stime="" etime="" duration="" preIndex="0">';
            for (var i = 0; i < time_tasks.length; i++)
            {
                var ttid = "t_interval_" + pindex;
                if (time_tasks[i].id !== ttid)
                {
                    var stime = $(time_tasks[i]).attr("stime");
                    var etime = $(time_tasks[i]).attr("etime");
                    var duration = $(time_tasks[i]).attr("duration");
                    var name = "时间段: " + stime + "--" + etime + ", 时长: " + duration + "分钟";
                    content += '<li class="list-group-item list_time_group_temp" id="copy_task_temp_' + (i + 1) + '" stime="' + stime + '" etime="' + etime + '" duration="' + duration + '" onclick="pickCopyTargetTime(\'' + (i + 1) + '\');">' + name + '</li>';
                }
            }
            content += '</div>';

            var model;
            model = '<div class="modal-dialog">'

                    + '<div class="modal-content">'
                    + '<div class="modal-header">'
                    + '<button type="button" class="close" onclick="closeModal()">&times;</button>'
                    + '<h4 class="modal-title">请选择复制到的时段</h4>'
                    + '</div>'
                    + '<div class="modal-body">'

                    + content;
            model += '</div>'
                    + '<div class="modal-footer">'
                    + '<button type="button" class="btn btn-default" onclick="cofirmCopyTaskAction()">确定</button>'
                    + '</div>'
                    + '</div>'
                    + '</div>';
            var dig = document.getElementById("myModalSurvey");
            dig.innerHTML = model;
            $('#myModalSurvey').modal({backdrop: 'static', keyboard: false});
        }
        else
        {
            alert("没有其他的调查时段。");
        }

    }
}

function pickCopyTargetTime(index)
{
    var item = $("#copy_task_temp_" + index);
    var preIndex = $("#div_copy_task_temp").attr("preIndex");
    if (preIndex !== "0")
    {
        var eitem = $("#copy_task_temp_" + (preIndex));
        eitem.attr("class", "list-group-item list_time_group_temp");
        item.attr("class", "list-group-item list_time_group_temp_active");
        $("#div_copy_task_temp").attr("preIndex", index);
    }
    else
    {
        item.attr("class", "list-group-item list_time_group_temp_active");
        $("#div_copy_task_temp").attr("preIndex", index);
    }
    var stime = item.attr("stime");
    var etime = item.attr("etime");
    var duration = item.attr("duration");
    $("#div_copy_task_temp").attr("stime", stime);
    $("#div_copy_task_temp").attr("etime", etime);
    $("#div_copy_task_temp").attr("duration", duration);
}

function cofirmCopyTaskAction()
{
    var stime = $("#div_copy_task_temp").attr("stime");
    var etime = $("#div_copy_task_temp").attr("etime");
    var duration = $("#div_copy_task_temp").attr("duration");
    var stid = $("#div_copy_task_temp").attr("stid");
    $.ajax({
        url: "../../HandleCopyTaskItem",
        data: {"stid": stid, stime: stime, etime: etime, duration: duration},
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
        },
        success: function (result) {
            if (result === "0")
            {
                alert("项目任务没有复制成功，请重新尝试");
            }
            else
            {
                var model = JSON.parse(result);
                if (model.type === 1)
                {
                    createIntersectionModel(model.id, model.lat, model.lng);
                    $("#task_info").attr("laneinfo", model.laneinfo);
                    $("#task_info").attr("lanes", JSON.stringify(model.lanes));
                    $("#task_info").attr("task_img", model.img_path);
                    $("#task_info").attr("xcenter", model.xcenter);
                    $("#task_info").attr("ycenter", model.ycenter);
                    $("#imag1").attr("src", model.img_path);
                    $("#t_model_date").val(model.mdate);
                    $("#img_result").attr("src", model.img_path);
                    $("#intersection").attr("laneinfo", model.laneinfo);
                    setLanesObject(model.laneinfo);
                    loadTaskItems(model.group_tasks, model.type);
                    alert("项目复制成功");
                    $('#myModalSurvey').modal("hide");
                    //cancelTaskToTimedRange();
                }
            }
        }
    });
}

function getDName(slane, all)
{

    var lanes = [];
    var ls = all.split("L");
    for (var i = 0; i < ls.length; i++)
    {
        var ls1 = ls[i].split("#");
        var ls2 = ls1[0].split("_");
        var degree_name;
        var degree = parseInt(ls2[2]);
        if (degree <= 20 || degree >= 340) {
            degree_name = "西进口";
        } else if (degree < 70 && degree > 20) {
            degree_name = "西南进口";
        } else if (degree <= 110 && degree >= 70) {
            degree_name = "南进口";
        } else if (degree < 160 && degree > 110) {
            degree_name = "东南进口";
        } else if (degree <= 200 && degree >= 160) {
            degree_name = "东进口";
        } else if (degree < 250 && degree > 200) {
            degree_name = "东北进口";
        } else if (degree <= 290 && degree >= 250) {
            degree_name = "北进口";
        } else if (degree < 340 && degree > 290) {
            degree_name = "西北进口";
        }
        var lane = {"id": ls2[0], "name": ls2[1], "degreeName": degree_name};
        lanes.push(lane);
    }

    var dName = "";
    var sl = slane.split("L");
    for (var i = 0; i < sl.length; i++)
    {
        var sl1 = sl[i].split("S");
        var id = sl1[0];
        var name = "";
        for (var m = 0; m < lanes.length; m++)
        {
            if (lanes[m].id === id)
            {
                name = lanes[m].name + lanes[m].degreeName + "的";
                break;
            }
        }
        var ls1 = sl1[1].split("#");
        var left = false, turn = false, up = false, right = false, walk = false, bike = false;
        for (var j = 0; j < ls1.length; j++)
        {
            var ls2 = ls1[j].split("_");
            if (ls2[2] === "1" && !turn)
            {
                name += "掉头流向" + ",";
                turn = true;
            }
            if (ls2[2] === "2" & !left)
            {
                name += "左转流向" + ",";
                left = true;
            }
            if (ls2[2] === "3" & !up)
            {
                name += "直行流向" + ",";
                up = true;
            }
            if (ls2[2] === "4" & !right)
            {
                name += "右转流向" + ",";
                right = true;
            }
            if (ls2[2] === "5" & !bike)
            {
                name += "自行车流向" + ",";
                bike = true;
            }
            if (ls2[2] === "6" & !walk)
            {
                name += "行人流向" + ",";
                walk = true;
            }
        }

        dName += name;

    }
    return dName;



}

function makeCopyTasks(tmid, stime, etime)
{
    var content;
    content = '<div class="modal-dialog">'

            + '<div class="modal-content">'
            + '<div class="modal-header">'
            + '<button type="button" class="close" data-dismiss="modal">&times;</button>'
            + '<h4 class="modal-title">请选新复制的调查时段</h4>'
            + '</div>'
            + '<div class="modal-body">'

            + '<span style="font-size:18px;color:black;margin-left: 40px;">调查开始的时间:</span><select style="font-size:18px;color:black;"  name="t_model_copy_date" id="t_task_copy_stime"></select><br/>'
            + '<span style="font-size:18px;color:black;margin-left: 40px;">调查结束的时间:</span><select style="font-size:18px;color:black;" name="t_model_copy_date" id="t_task_copy_etime"></select>';
    content += '</div>'
            + '<div class="modal-footer">'
            + '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>'

            + '<button type="button" class="btn btn-default" onclick="makeCopyTasks_Real(\'' + tmid + '\',\'' + stime + '\',\'' + etime + '\')">确定</button>'
            + '</div>'
            + '</div>'
            + '</div>';

    var dig = document.getElementById("myModalSurvey");
    dig.innerHTML = "";
    dig.innerHTML = content;
    getTimeSlots("t_task_copy_stime");
    getTimeSlots("t_task_copy_etime");
    $("#myModalSurvey").modal();
}

function makeCopyTasks_Real(tmid, stime, etime)
{
    var nstime, netime;
    nstime = $("#t_task_copy_stime").val();
    netime = $("#t_task_copy_etime").val();
    if (nstime === "" || netime === "")
    {
        alert("error");
    }
    else if (nstime === stime && netime === netime)
    {
        alert("此时段已经存在，不能复制");
    }
    else
    {
        $.post("../../HandleMakeCopyTasks", {tmid: tmid, stime: stime, etime: etime, nstime: nstime, netime: netime}, function (result)
        {
            if (result.startsWith("0"))
            {
                alert("复制失败");
            }
            else
            {
                alert("复制完成");
                //location.reload();
            }
        });
    }
}

function updateLaneView(id)
{
    var slanes = $("#task_id_" + id).attr("slanes");
    var spoints = $("#task_id_" + id).attr("spoints");
    var img_s = $("#task_id_" + id).attr("img_s");
    $("#task_info").attr("current_slanes", slanes);
    $("#task_info").attr("current_img_s", img_s);
    $("#task_info").attr("current_spoints", spoints);
    var img_path = $("#task_id_" + id).attr("img_path");
    $("#imag1").attr('src', img_path);
}


// seg

function createSegModel(stmid, lat1, lng1, degree)
{

    var content = "";
    content += '<div  id="seg_section" stmid="' + stmid + '" style="display:block;" lat="' + lat1 + '" lng="' + lng1 + '" degree="' + degree + '">'
            + '<div style="width:inherit;height: 40px;margin-left: 30px;">'
            + '<div id="model_date" class="model_date">'
            + '<span style="color:black;font-size:16px; margin-right: 5px;" >调查日期:</span><input style="font-size:18px;color:black; width:170px;" type="date" id="t_seg_date" placeholder="调查日期" >'
            + '</div>'
            + '<div id="seg_model" class="con_buttons intersection_bottom_button1" style="display:inline-block;">'

            + '</div>'

            + '<div id="seg_cars" class="con_buttons carIcons">'

            + '</div>'

            + '<div class="model_date" style="position:relative;top:-5px;">'
            + '<button type="button" class="btn btn-success" style="margin-left:20px; display:none;" id="seg_image_save"" onclick="confirmSegModel()">使用此路段渠化模型</button>'
            + '</div>'
            + '</div>'
            + '<div class="in_section_1" style="display:none; margin-top:10px;" id="seg_quhua" flag="false">'
            + '<div class="demo lock nav_body nav_layout">'
            + '<div class="left_nav" style="width:500px;height:260px;">'

            + '<div id="tb_map_seg" style="width:450px;height:260px;">'

            + '</div>'

            + '</div>'

            + '<div class="sideBySide nav_side" style="margin-left:20px;margin-top:20px;">'
            + ' <div class="intersection" name="" id="seg_Lane" upnumber="" downnumber="" name="">'
            + ' <table>'
            + ' <tr><td>路段名称:</td><td style="padding-left:10px;"><input type="text" id="seg_name" style="width:180px;"></td></tr>'
            + '  <tr><td style="padding-top:10px;">车道数:</td>'
            + ' <td  style="padding-left:10px;padding-top:10px;"><span>上行:</span>'
            + ' <select class="form-control" style="width:60px; color:black; display:inline; margin-right:20px;" id="upNumber_seg"><option value="1">1</div><option value="2">2</div><option value="3">3</div><option value="4">4</div><option value="5">5</div><option value="6">6</div><option value="7">7</div><option value="8">8</div><option value="9">9</div><option value="10">10</div></select>'
            + '<span>下行:</span><select class="form-control" style="width:60px; color:black; display:inline;" id="downNumber_seg"><option value="1">1</div><option value="2">2</div><option value="3">3</div><option value="4">4</div><option value="5">5</div><option value="6">6</div><option value="7">7</div><option value="8">8</div><option value="9">9</div><option value="10">10</div></select></td></tr>'
            + ' </table>'
            + ' </div></div>'
            + '<div class="img_show_seg nav_layout">'
            + '<img src="" alt="请创建你的路段渠化模型" id="img_result_seg" class="img_out zoom">'
            + '</div>'
            + '<img src="./mapIcon/seg_tb.png" class="inter_img_button seg_icon_G" onclick="generateSegLane()"/>'
            + '</div></div>'
            + '<div class="all_task" style="display:block;" id="seg_task" flag="false">'
            + '<div class="nav_task task_align">'
            + '<div  id="task_info_seg" class="list-group task_info" timeIndex="0" index="0" task_img="" upnumber="" downnumber="" name="" imageClick="0">'
            + '<li class="list-group-item" style="text-align:center;background:#3c8dbc; color:white;">调查的全部任务</li>'
            + '</div>'
            + '<div class="task_create" style="text-align: center">'
            + '<button type="button" class="btn btn-success" id="task_create" onclick="createTimedTask_Seg()">新建调查时段</button>'
            + '</div>'
            + '</div>'
            + '<div class="img_area1 task_align" id="image_show_area_seg"> '
            + '<img id="imag1_seg" onclick="showCoords_Seg(event)" src="" class="img_out" alt="请创建你的路段渠化模型">'
            + '</div>'

            // create TaskTimedInterval
            + '<div class="task_time" id="task_time_box" style="background-color: gray; display:none;width:380px;height: 80px;border:2px solid gray;position: absolute;top: 111px;left: 267px;" data="">'
            + '<table class="table table-condensed" style="border:none; text-align: center;width:100%;">'
            + '<tbody>'
            + '<tr>'
            + '<td style="border:none;color:white;">起始时间:</td>'
            + '<td style="border:none; width:100px;" ><select style="width:100px; color:black;" name="bdaytime" id="stime"></select></td>'

            + '<td style="border:none;color:white;">结束时间:</td>'
            + '<td style="border:none;width:100px;"><select style="width:100px;color:black;" name="bdaytime" id="etime"></select></td>'
            + '</tr>'
            + '<tr>'
            + '<td style="border:none; text-align: left" colspan="4">'
            + '<button type="button" class="btn btn-success" id="task_create_time_interval" onclick="task_time_Save_Seg()">保存调查时段</button>'
            + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
            + '<button type="button" class="btn btn-success" onclick="task_time_Cancel_Seg()">取消</button>'
            + '</td>'
            + '</tr>'
            + '</tbody>'
            + '</table>'
            + '</div>'

            // create Task into Time Interval
            + '<div class="task_time" id="task_item_show" taskindex="0" current_spoints="" current_slanes="" preslanes="" option="" timeGroup="" style="background-color: gray; display:none;width:380px;height: 180px;border:2px solid gray;position: absolute;top: 111px;left: 267px;" data="">'
            + '<table class="table table-condensed" style="border:none;width:100%;">'
            + '<tbody>'
            + '<tr><td style="border:none; width:80px;color:white;">任务时间:</td>'
            + '<td style="border:none;color:white;" id="t_task_show_time">'
            + '</td>'
            + '</tr>'
            + '<tr><td style="border:none; width:80px;color:white;">采集方式</td>'
            + '<td style="border:none; color:white;" colspan="2">'
            + '<input type="radio" name="vehicle" value="1" name="视频" id="shipin">&nbsp;&nbsp;&nbsp;视频&nbsp;&nbsp;&nbsp;'
            + '<input type="radio" name="vehicle" value="2" name="人工" id="rengong">&nbsp;&nbsp;&nbsp;人工<br>'
            + '</td>'
            + '</tr>'
            + '<tr>'
            + '<td style="border:none;color:white;width:80px;">采集车型</td>'
            + '<td style="border:1px solid white;height:50px;"><div id="task_cars_info" class="task_car_drop" style="width:inherit;height:inherit;" number="0" data=""></div></td>'
            + '</tr>'
            + '<tr>'
            + '<td style="border:none; text-align: left" colspan="4">'
            + '<button type="button" class="btn btn-success" style="margin-top:5px;" id="task_enable_click" onclick="task_enableClick_Seg()">配置流向</button>'
            + '<button type="button" class="btn btn-success" style="margin-top:5px;" id="task_create_intersection" onclick="taskinfoSaveConfirm_Seg();">保存任务</button>'
            + '<button type="button" class="btn btn-success" style="margin-top:5px;" onclick="cancelTaskToTimedRange_Seg()">取消</button>'
            + '</td>'
            + '</tr>'
            + '</tbody>'
            + '</table>'
            + '</div>'

            + '<div class="task_time" style=" z-index: 3000; background-color: graytext; display:none;width:300px;height: 290px;border:2px solid gray;position: absolute;top: 380px;left: 30px;" id="task_direction_pane" data="" buttonFlag="0">'
            + '</div>'
            + '</div>'
            + '</div>';


    $("#mainSurveyPage").html(content);
    var sid = $("#mainSurveyPage").attr("spid");
    getNavSelectionModel_Seg(sid, stmid, lat1, lng1);
    getTimeSlots("stime");
    getTimeSlots("etime");
    getModelCarsTypes_Seg();
    $("#mapShowSection").hide();
    $("#mainSurveyPage").show();
    $("#task_item_show_seg").draggable();
    //setLanesObject("1_未命名道路_0_0#L2_未命名道路_90_0#L3_未命名道路_180_0#L4_未命名道路_270_0#");
    initTBMap_Seg(lng1, lat1);
}

function confirmSegModel()
{
    var degree = $("#seg_Lane").attr("degree");
    degree = parseInt(degree);
    var seg_name = $("#seg_Lane").attr("name");
    var upnumber = $("#seg_Lane").attr("upnumber");
    var downNumber = $("#seg_Lane").attr("downnumber");
    var imgpath = $("#img_result_seg").attr('src');
    if (upnumber === "" || downNumber === "" || seg_name === "" || imgpath === "")
    {
        alert("请先创建路段渠化模型");
    }
    else
    {
        var stmid = $("#seg_section").attr("stmid");
        if (stmid === "0")
        {
            createTaskModelFirst_Seg();
        }
        else
        {
            updateTaskModelFirst_Seg();
        }
    }
}

function createTaskModelFirst_Seg()
{
    var tdate = $("#t_seg_date").val();
    if (tdate === "")
    {
        alert("请先确定调查的时间");
        return false;
    }

    var degree = $("#seg_Lane").attr("degree");
    degree = parseInt(degree);
    var seg_name = $("#seg_Lane").attr("name");
    var upnumber = $("#seg_Lane").attr("upnumber");
    var downnumber = $("#seg_Lane").attr("downnumber");
    var img_path = $("#img_result_seg").attr('src');
    var name = seg_name, tname = "";
    var lat = $("#seg_section").attr("lat");
    var lng = $("#seg_section").attr("lng");
    var id = $("#seg_section").attr("stmid");
    var type = 2;
    var sid = $("#mainSurveyPage").attr("spid");

    var cars = [];
    $(".navBarCarICON").each(function () {
        var item = $(this).attr("data");
        item = JSON.parse(item);
        cars.push(item);
    });
    var model = {sid: sid, id: id, mdate: tdate, name: name, tname: tname, lat: lat, lng: lng, upnumber: upnumber, downnumber: downnumber, img_path: img_path, type: type, degree: degree, lanes: [], cars: cars, task_items: []};
    model = JSON.stringify(model);
    $.ajax({
        url: "../../HandleAddSurvey_Task_Model",
        data: {"data": model},
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
        },
        success: function (result) {
            if (result === "0")
            {
                alert("调查没有创建成功，请重新尝试");
            }
            else
            {
                var model = JSON.parse(result);
                if (model.type === 2)
                {
                    createSegModel(model.id, model.lat, model.lng, model.degree);
                    $("#task_info_seg").attr("downnumber", model.downnumber);
                    $("#task_info_seg").attr("upnumber", model.upnumber);
                    $("#task_info_seg").attr("degree", model.degree);
                    $("#task_info_seg").attr("task_img", model.img_path);
                    $("#task_info_seg").attr("name", model.name);
                    $("#imag1_seg").attr("src", model.img_path);
                    $("#t_seg_date").val(model.mdate);
                    //setLanesObject(model.laneinfo);
                    loadTaskItems(model.group_tasks, model.type);
                }
            }
        }
    });

}

function updateTaskModelFirst_Seg()
{
    var tdate = $("#t_seg_date").val();
    if (tdate === "")
    {
        alert("请先确定调查的时间");
        return false;
    }
    var degree = $("#seg_Lane").attr("degree");
    degree = parseInt(degree);
    var seg_name = $("#seg_Lane").attr("name");
    var upnumber = $("#seg_Lane").attr("upnumber");
    var downnumber = $("#seg_Lane").attr("downnumber");
    var img_path = $("#img_result_seg").attr('src');
    var name = seg_name, tname = "";
    var lat = $("#seg_section").attr("lat");
    var lng = $("#seg_section").attr("lng");
    var id = $("#seg_section").attr("stmid");
    var type = 2;
    var sid = $("#mainSurveyPage").attr("spid");

    var cars = [];
    $(".navBarCarICON").each(function () {
        var item = $(this).attr("data");
        item = JSON.parse(item);
        cars.push(item);
    });
    var model = {sid: sid, id: id, mdate: tdate, name: name, tname: tname, lat: lat, lng: lng, upnumber: upnumber, downnumber: downnumber, img_path: img_path, type: type, degree: degree, lanes: [], cars: cars, task_items: []};
    model = JSON.stringify(model);
    $.ajax({
        url: "../../HandleUpdateSurvey_Task_Model",
        data: {"data": model},
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
        },
        success: function (result) {
            if (result === "0")
            {
                alert("调查没有创建成功，请重新尝试");
            }
            else
            {
                var model = JSON.parse(result);
                if (model.type === 2)
                {
                    createSegModel(model.id, model.lat, model.lng, model.degree);
                    $("#task_info_seg").attr("downnumber", model.downnumber);
                    $("#task_info_seg").attr("upnumber", model.upnumber);
                    $("#task_info_seg").attr("degree", model.degree);
                    $("#task_info_seg").attr("task_img", model.img_path);
                    $("#task_info_seg").attr("name", model.name);
                    $("#imag1_seg").attr("src", model.img_path);
                    $("#t_seg_date").val(model.mdate);
                    $("#img_result_seg").attr("src", model.img_path);
                    $("#seg_Lane").attr("downnumber", model.downnumber);
                    $("#seg_Lane").attr("upnumber", model.upnumber);
                    $("#seg_Lane").attr("degree", model.degree);
                    $("#seg_Lane").attr("name", model.name);
                    //setLanesObject(model.laneinfo);
                    loadTaskItems(model.group_tasks, model.type);
                }
            }
        }
    });

}

function createSegModelImage()
{
    var option = $("#seg_model_option").val();
    if (option === "0" || option === "-1")
    {

        var time_tasks = $("#task_info_seg").find(".list_time_group");
        if (time_tasks === undefined || time_tasks === null || time_tasks.length === 0)
        {

            if (option === "0")
            {
                $("#task_info_seg").attr("laneinfo", "");
                $("#task_info_seg").attr("task_img", "");
                $("#task_info_seg").attr("lanes", "");
                $("#imag1_seg").attr("src", "");
            }
            $("#seg_quhua").show();
            $("#seg_task").hide();
            $("#seg_cars").hide();
            $("#seg_image_save").show();
        }
        else
        {
            alert("你的调查存在任务，你不能进行渠化修改");
        }
    }
    else
    {
        var name = $("#model_image_nav_" + option).attr("name");
        var degree = $("#model_image_nav_" + option).attr("degree");
        var upnumber = $("#model_image_nav_" + option).attr("upnumber");
        var downnumber = $("#model_image_nav_" + option).attr("downnumber");
        var img_path = $("#model_image_nav_" + option).attr("img_path");
        $("#task_info_seg").attr("degree", degree);
        $("#task_info_seg").attr("name", name);
        $("#task_info_seg").attr("upnumber", upnumber);
        $("#task_info_seg").attr("downnumber", downnumber);
        $("#task_info_seg").attr("task_img", img_path);

        $("#seg_name").val(name);
        $("#upNumber_seg").val(upnumber);
        $("#downNumber_seg").val(downnumber);
        $("#imag1_seg").attr("src", img_path);
        $("#seg_quhua").hide();
        $("#seg_task").show();
        $("#seg_cars").show();
        $("#seg_image_save").hide();
    }
}

function task_time_Save_Seg()
{
    var timage = $("#task_info_seg").attr("task_img");
    if (timage === "")
    {
        alert("你还没有创建路段渠化模型");
    }
    else
    {
        var stime = $('#stime').val();
        var etime = $('#etime').val();
        var duration = getTimeDiff(stime, etime);
        if (duration <= 0)
        {
            alert("时间选择不正确");
        }
        else
        {
            var copyItem = null;
            var tgs = $("#task_info_seg").find(".list_time_group");
            if (tgs !== undefined && tgs !== null && tgs.length > 0)
            {
                for (var i = 0; i < tgs.length; i++)
                {
                    var temp = tgs[i];
                    if (stime === $(temp).attr("stime") && etime === $(temp).attr("etime"))
                    {
                        copyItem = temp;
                        break;
                    }
                }
            }
            if (copyItem !== null)
            {
                alert("已经存在相同的调查时间段");
            }
            else
            {
                var index = $("#task_info_seg").attr("timeIndex");
                index = parseInt(index) + 1;
                $("#task_info_seg").attr("timeIndex", index);
                var name = "时间段:" + stime + "--" + etime + ", " + duration + "分钟";
                var item = '<li class="list-group-item list_time_group" id="t_interval_' + index + '" stime="' + stime + '" etime="' + etime + '" duration="' + duration + '" total="0" show="0" index="0"><a href="javascript:void(0)" onclick="showSubTasks_Seg(\'' + index + '\');" ><span id="t_interval_name_' + index + '" >' + name + '</span>, 共<span id="t_interval_total_' + index + '" >0</span>个任务</a>';
                item += '<i class="fa  fa-plus-circle taskTimeIcon" aria-hidden="true" onclick="showAddTimedTask_Seg(\'' + index + '\');"></i><i class="fa fa-trash taskTimeIcon" aria-hidden="true" onclick="deleteTaskTimedRange_Seg(\'' + index + '\');"></i><i class="fa fa-clone taskTimeIcon" aria-hidden="true" onclick="copyTaskTimedRange_Seg(\'' + index + '\');"></i><i class="fa fa-pencil-square-o taskTimeIcon" aria-hidden="true" onclick="showEditTimedTask_Seg(\'' + index + '\');"></i></li>';
                var ltime = $(item);
                $("#task_info_seg").append(ltime);
                var item1 = '<li class="list-group-item" id="t_interval_tasks_' + index + '" style="display:none;"><ul class="list-group" id="t_interval_tasks_group_' + index + '"></ul></li>';
                var ltime1 = $(item1);
                $("#task_info_seg").append(ltime1);
                $("#task_time_box").hide();
            }
        }
    }
}

function showSubTasks_Seg(index)
{

    var image = $("#task_info_seg").attr("task_img");
    $("#imag1_seg").attr('src', image);
    var parent = $("#t_interval_" + index);
    var show = parent.attr("show");
    if (show === "0" && parent.attr("total") !== "0")
    {
        $("#t_interval_tasks_" + index).slideDown();
        parent.attr("show", "1");
    }
    else
    {
        parent.attr("show", "0");
        $("#t_interval_tasks_" + index).slideUp();
    }
}

function createTimedTask_Seg()
{
    $("#task_create_time_interval").attr("onclick", "task_time_Save_Seg();");
    $("#task_time_box").show();
}

function showEditTimedTask_Seg(index)
{

    var parent = $("#t_interval_" + index);
    var ids = parent.attr("ids");
    if (ids !== undefined && ids !== "")
    {


        ids = ids.split("_");
        for (var i = 0; i < ids.length; i++)
        {
            var status = $("#t_task_" + ids[i]).attr("status");
            if (status !== "0")
            {
                alert("此调查时段包含已经进行或者完成的任务，你不能修改此调查时段");
                return false;
            }
        }
    }
    $("#task_create_time_interval").attr("onclick", "editTaskTimedRange_Seg('" + index + "');");
    $("#task_time_box").show();
}

function showAddTimedTask_Seg(index)
{
    $("#task_item_show").show();
    var t_interval = $("#t_interval_" + index);
    $("#task_item_show").attr("timeGroup", index);
    $("#task_item_show").attr("option", "1");
    var stime = t_interval.attr("stime");
    var etime = t_interval.attr("etime");
    $("#t_task_show_time").html(stime + "--" + etime);

}

function task_disableClick_Seg()
{
    $("#task_info_seg").attr("imageClick", "0");
    $("#task_enable_click").prop("disabled", false);
}

function task_enableClick_Seg()
{
    if ($("#task_info_seg").attr("imageClick") === "0")
    {
        $("#task_info_seg").attr("imageClick", "1");
        $("#task_enable_click").prop("disabled", true);
    }
    else
    {
        alert("你已经开启配置车流功能");
    }
}


function cancelTaskToTimedRange_Seg()
{
    task_disableClick_Seg();
    $("#task_cars_info").html("");
    $("#task_item_show").hide();
    $("#task_info_seg").attr("imagePick", "0");
    $("#task_item_show").attr("current_slanes", "");
    $("#task_item_show").attr("current_spoints", "");
    var imgPath = $("#task_info_seg").attr("task_img");
    $("#imag1_seg").attr('src', imgPath);

}

function deleteTaskTimedRange_Seg(index)
{
    var parent = $("#t_interval_" + index);
    var ids = parent.attr("ids");
    if (ids === undefined)
    {
        parent.remove();
    }
    else
    {
        if (ids !== "")
        {
            ids = ids.split("_");

            for (var i = 0; i < ids.length; i++)
            {
                var status = $("#t_task_" + ids[i]).attr("status");
                if (status !== "0")
                {
                    alert("此调查时段包含已经进行或者完成的任务，你不能删除此调查时段");
                    return false;
                }
            }
        }
        if (confirm("你确定要删除此调查时段和它包含的所有任务吗？"))
        {
            var ids = parent.attr("ids");
            $.ajax({
                url: "../../HandleDeleteGroupTaskItem",
                data: {"ids": ids},
                type: "GET",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
                },
                success: function (result) {
                    if (result === "0")
                    {
                        alert("调查时段没有删除成功，请重新尝试");
                    }
                    else
                    {
                        var model = JSON.parse(result);
                        if (model.type === 2)
                        {

                            createSegModel(model.id, model.lat, model.lng, model.degree);
                            $("#task_info_seg").attr("downnumber", model.downnumber);
                            $("#task_info_seg").attr("upnumber", model.upnumber);
                            $("#task_info_seg").attr("degree", model.degree);
                            $("#task_info_seg").attr("task_img", model.img_path);
                            $("#task_info_seg").attr("name", model.name);
                            $("#imag1_seg").attr("src", model.img_path);
                            $("#t_seg_date").val(model.mdate);
                            //setLanesObject(model.laneinfo);
                            loadTaskItems(model.group_tasks, model.type);
                            alert("调查时段删除成功");
                            $("#task_time_box").hide();
                            //cancelTaskToTimedRange();
                        }
                    }
                }
            });
        }
    }
}

function copyTaskTimedRange_Seg(index)
{
    selectTimedTaskRangeSeg(index);
}

function doCopyTaskTimedRange_Seg(index)
{
    var stime = $("#t_task_copy_stime").val();
    var etime = $("#t_task_copy_etime").val();
    var duration = getTimeDiff(stime, etime);
    if (duration <= 0)
    {
        alert("时间选择不正确");
        return false;
    }
    var parent = $("#t_interval_" + index);
    var copyItem = null;
    var tgs = $("#task_info_seg").find(".list_time_group");
    if (tgs !== undefined && tgs !== null && tgs.length > 0)
    {
        for (var i = 0; i < tgs.length; i++)
        {
            var temp = tgs[i];
            if (stime === $(temp).attr("stime") && etime === $(temp).attr("etime"))
            {
                copyItem = temp;
                break;
            }
        }
    }
    if (copyItem !== null)
    {
        alert("已经存在相同的时间的调查时段，你不能重复复制创建");
        return false;
    }
    var ids = parent.attr("ids");
    if (ids === undefined)
    {
        alert("你当前的调查时段没有任务，不能进行复制操作");
        return false;
    }
    else
    {
        $.ajax({
            url: "../../HandleCopyGroupTaskItem",
            data: {"ids": ids, stime: stime, etime: etime, duration: duration},
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
            },
            success: function (result) {
                if (result === "0")
                {
                    alert("复制调查时段没有成功，请重新尝试");
                }
                else
                {
                    var model = JSON.parse(result);
                    if (model.type === 2)
                    {

                        createSegModel(model.id, model.lat, model.lng, model.degree);
                        $("#task_info_seg").attr("downnumber", model.downnumber);
                        $("#task_info_seg").attr("upnumber", model.upnumber);
                        $("#task_info_seg").attr("degree", model.degree);
                        $("#task_info_seg").attr("task_img", model.img_path);
                        $("#task_info_seg").attr("name", model.name);
                        $("#imag1_seg").attr("src", model.img_path);
                        $("#t_seg_date").val(model.mdate);
                        //setLanesObject(model.laneinfo);
                        loadTaskItems(model.group_tasks, model.type);
                        alert("复制调查时段成功");
                        $("#myModalSurvey").modal("hide");
                        //cancelTaskToTimedRange();
                    }
                }
            }
        });
    }


}

function selectTimedTaskRange_Seg(index)
{
    var content;
    content = '<div class="modal-dialog">'

            + '<div class="modal-content">'
            + '<div class="modal-header">'
            + '<button type="button" class="close" data-dismiss="modal">&times;</button>'
            + '<h4 class="modal-title">请选新复制的调查时段的时间:</h4>'
            + '</div>'
            + '<div class="modal-body">'
            + '<span style="font-size:18px;color:black;margin-left: 40px;">调查开始的时间:</span><select style="font-size:18px;color:black;"  name="t_task_copy_date" id="t_task_copy_stime"></select><br/>'
            + '<span style="font-size:18px;color:black;margin-left: 40px;">调查结束的时间:</span><select style="font-size:18px;color:black;" name="t_task_copy_date" id="t_task_copy_etime"></select>';
    content += '</div>'
            + '<div class="modal-footer">'
            + '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>'

            + '<button type="button" class="btn btn-default" onclick="doCopyTaskTimedRange(\'' + index + '\')">确定</button>'
            + '</div>'
            + '</div>'
            + '</div>';

    var dig = document.getElementById("myModalSurvey");
    dig.innerHTML = "";
    dig.innerHTML = content;
    getTimeSlots("t_task_copy_stime");
    getTimeSlots("t_task_copy_etime");
    $("#myModalSurvey").modal();
}

function editTaskTimedRange_Seg(index)
{
    index = parseInt(index);
    var stime = $('#stime').val();
    var etime = $('#etime').val();
    var duration = getTimeDiff(stime, etime);
    if (duration <= 0)
    {
        alert("时间选择不正确");
    }
    else
    {
        var parent = $("#t_interval_" + index);

        //change childern
        var copyItem = null;
        var tgs = $("#task_info_seg").find(".list_time_group");
        if (tgs !== undefined && tgs !== null && tgs.length > 0)
        {
            for (var i = 0; i < tgs.length; i++)
            {
                var temp = tgs[i];
                if (stime === $(temp).attr("stime") && etime === $(temp).attr("etime"))
                {
                    copyItem = temp;
                    break;
                }
            }
        }
        if (copyItem !== null)
        {
            if (confirm("已经存在相同的调查时段，你想合并到此调查时段吗？"))
            {
                var ids = parent.attr("ids");
                if (ids === undefined)
                {
                    parent.remove();
                }
                else
                {
                    $.ajax({
                        url: "../../HandleModifyGroupTaskItem",
                        data: {"ids": ids, stime: stime, etime: etime, duration: duration},
                        type: "GET",
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
                        },
                        success: function (result) {
                            if (result === "0")
                            {
                                alert("调查时段没有修改成功，请重新尝试");
                            }
                            else
                            {
                                var model = JSON.parse(result);
                                if (model.type === 2)
                                {

                                    createSegModel(model.id, model.lat, model.lng, model.degree);
                                    $("#task_info_seg").attr("downnumber", model.downnumber);
                                    $("#task_info_seg").attr("upnumber", model.upnumber);
                                    $("#task_info_seg").attr("degree", model.degree);
                                    $("#task_info_seg").attr("task_img", model.img_path);
                                    $("#task_info_seg").attr("name", model.name);
                                    $("#imag1_seg").attr("src", model.img_path);
                                    $("#t_seg_date").val(model.mdate);
                                    //setLanesObject(model.laneinfo);
                                    loadTaskItems(model.group_tasks, model.type);
                                    alert("调查时段修改成功");
                                    $("#task_time_box").hide();
                                    //cancelTaskToTimedRange();
                                }
                            }
                        }
                    });
                }
            }
        }
        else
        {
            var ids = parent.attr("ids");
            if (ids === undefined)
            {
                var name = "时间段:" + stime + "--" + etime + ", " + duration + "分钟";
                $("#t_interval_name_" + index).text(name);
                parent.attr("stime", stime);
                parent.attr("etime", etime);
                parent.attr("duration", duration);
            }
            else
            {
                $.ajax({
                    url: "../../HandleModifyGroupTaskItem",
                    data: {"ids": ids, stime: stime, etime: etime, duration: duration},
                    type: "GET",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
                    },
                    success: function (result) {
                        if (result === "0")
                        {
                            alert("调查时段没有修改成功，请重新尝试");
                        }
                        else
                        {
                            var model = JSON.parse(result);
                            if (model.type === 2)
                            {
                                createSegModel(model.id, model.lat, model.lng, model.degree);
                                $("#task_info_seg").attr("downnumber", model.downnumber);
                                $("#task_info_seg").attr("upnumber", model.upnumber);
                                $("#task_info_seg").attr("degree", model.degree);
                                $("#task_info_seg").attr("task_img", model.img_path);
                                $("#task_info_seg").attr("name", model.name);
                                $("#imag1_seg").attr("src", model.img_path);
                                $("#t_seg_date").val(model.mdate);
                                //setLanesObject(model.laneinfo);
                                loadTaskItems(model.group_tasks, model.type);
                                alert("调查时段修改成功");
                                $("#task_time_box").hide();
                                //cancelTaskToTimedRange();
                            }
                        }
                    }
                });
            }
        }




    }
}

function task_time_Cancel_Seg()
{
    $("#task_time_box").hide();
}


function taskinfoSaveConfirm_Seg()
{
    var option = $("#task_item_show").attr("option");
    if (option === "1")// add task/model
    {
        var stmid = $("#seg_section").attr("stmid");
        var group = $("#task_item_show").attr("timeGroup");
        var carinfo = getCurrentCarTypes();
        if (carinfo === "")
        {
            alert("请先配置车型");
            return 0;
        }
        var tdate = $("#t_seg_date").val();
        if (tdate === "")
        {
            alert("请先配置调查的时间");
            return 0;
        }
        var downnumber = $("#task_info_seg").attr("downnumber");
        var upnumber = $("#task_info_seg").attr("upnumber");
        var degree = $("#task_info_seg").attr("degree");
        var name = $("#task_info_seg").attr("name");
        var slanes = $("#task_item_show").attr("current_slanes");
        if (slanes === "")
        {
            alert("请先配置车流");
            return 0;
        }

        var type = 2;
        var method = 0;
        if ($("#shipin").prop('checked'))
        {
            method = '1';
        }
        if ($("#rengong").prop('checked'))
        {
            method = '2';
        }

        var stime = $("#t_interval_" + group).attr("stime");
        var etime = $("#t_interval_" + group).attr("etime");
        var duration = $("#t_interval_" + group).attr("duration");
        var img_path = $("#imag1_seg").attr("src");
        var task = {stime: stime, tdate: tdate, alllanes: "", stmid: stmid, id: 0, type: type, duration: duration, img_path: img_path, etime: etime, slanes: slanes, c_status: 0, method: method, light_type: 0, peizhi: JSON.parse(carinfo)};
        if (stmid === "0") // adding new task item into the interval time slots.
        {
            vartname = "";

            var lat = $("#seg_section").attr("lat");
            var lng = $("#seg_section").attr("lng");
            var id = $("#seg_section").attr("stmid");
            var img_path = $("#task_info_seg").attr("task_img");
            if (img_path === "")
            {
                alert("请先生成渠化图");
                return 0;
            }


            var working_status = 0;
            var sid = $("#mainSurveyPage").attr("spid");
            var mdate = $("#t_seg_date").val();
            if (mdate === "")
            {
                alert("请先确定调查时间");
                return 0;
            }
            var cars = [];
            $(".navBarCarICON").each(function () {
                var item = $(this).attr("data");
                item = JSON.parse(item);
                cars.push(item);
            });
            var tasks = [];
            tasks.push(task);
            var model = {sid: sid, id: id, mdate: mdate, name: name, tname: "", lat: lat, lng: lng, working_status: working_status, img_path: img_path, type: type, degree: degree, downnumber: downnumber, upnumber: upnumber, lanes: JSON.parse(lanes), cars: cars, task_items: tasks};
            model = JSON.stringify(model);
            $.ajax({
                url: "../../HandleAddSurvey_Task_Model",
                data: {"data": model},
                type: "GET",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
                },
                success: function (result) {
                    if (result === "0")
                    {
                        alert("项目任务没有保存成功，请重新尝试");
                    }
                    else
                    {
                        var model = JSON.parse(result);
                        if (model.type === 2)
                        {
                            createSegModel(model.id, model.lat, model.lng, model.degree);
                            $("#task_info_seg").attr("downnumber", model.downnumber);
                            $("#task_info_seg").attr("upnumber", model.upnumber);
                            $("#task_info_seg").attr("degree", model.degree);
                            $("#task_info_seg").attr("task_img", model.img_path);
                            $("#task_info_seg").attr("name", model.name);
                            $("#imag1_seg").attr("src", model.img_path);
                            $("#t_seg_date").val(model.mdate);
                            //setLanesObject(model.laneinfo);
                            loadTaskItems(model.group_tasks, model.type);
                            alert("项目保存成功");
                            cancelTaskToTimedRange_Seg();
                        }
                    }
                }
            });
        }
        else
        {
            task = JSON.stringify(task);
            $.ajax({
                url: "../../HandleAddTaskItem",
                data: {"data": task},
                type: "GET",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
                },
                success: function (result) {
                    if (result === "0")
                    {
                        alert("项目任务没有保存成功，请重新尝试");
                    }
                    else
                    {
                        var model = JSON.parse(result);
                        if (model.type === 2)
                        {
                            createSegModel(model.id, model.lat, model.lng, model.degree);
                            $("#task_info_seg").attr("downnumber", model.downnumber);
                            $("#task_info_seg").attr("upnumber", model.upnumber);
                            $("#task_info_seg").attr("degree", model.degree);
                            $("#task_info_seg").attr("task_img", model.img_path);
                            $("#task_info_seg").attr("name", model.name);
                            $("#imag1_seg").attr("src", model.img_path);
                            $("#t_seg_date").val(model.mdate);
                            //setLanesObject(model.laneinfo);
                            loadTaskItems(model.group_tasks, model.type);
                            alert("项目保存成功");
                            cancelTaskToTimedRange_Seg();
                        }
                    }
                }
            });
        }
    }
    else // modify taskitem
    {
        var taskIndex = $("#task_item_show").attr("taskindex");
        var data = $("#t_task_" + taskIndex).attr("data");
        data = JSON.parse(data);
        if (data.c_status === "0")
        {
            var group = $("#task_item_show").attr("timeGroup");
            var carinfo = getCurrentCarTypes();
            if (carinfo === "")
            {
                alert("请先配置车型");
                return 0;
            }
            var slanes = $("#task_item_show").attr("current_slanes");
            if (slanes === "")
            {
                alert("请先配置车流");
                return 0;
            }
            var method = 0;
            if ($("#shipin").prop('checked'))
            {
                method = '1';
            }
            if ($("#rengong").prop('checked'))
            {
                method = '2';
            }
            var img_path = $("#imag1_seg").attr("src");
            //var datac = '{"stime":"' + data.stime + '","tdate":"' + data.tdate + '","alllanes":"' + data.alllanes + '","stmid":"' + data.stmid + '","id":"' + data.id + '","type":"' + data.type + '","duration":"' + data.duration + '","img_path":"' + img_path + '","etime":"' + data.etime + '","slanes":"' + slanes + '","c_status":"' + data.c_status + '","method":"' + method + '","light_type":"' + data.light_type + '","peizhi":' + carinfo + '}';
            var task = {stime: data.stime, tdate: data.tdate, alllanes: data.alllanes, stmid: data.stmid, id: data.id, type: data.type, duration: data.duration, img_path: img_path, etime: data.etime, slanes: slanes, c_status: data.c_status, method: method, light_type: data.light_type, peizhi: JSON.parse(carinfo)};
            task = JSON.stringify(task);
            $.ajax({
                url: "../../HandleModifyTaskItem",
                data: {"data": task},
                type: "GET",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
                },
                success: function (result) {
                    if (result === "0")
                    {
                        alert("项目任务没有修改成功，请重新尝试");
                    }
                    else
                    {
                        var model = JSON.parse(result);
                        if (model.type === 2)
                        {
                            createSegModel(model.id, model.lat, model.lng, model.degree);
                            $("#task_info_seg").attr("downnumber", model.downnumber);
                            $("#task_info_seg").attr("upnumber", model.upnumber);
                            $("#task_info_seg").attr("degree", model.degree);
                            $("#task_info_seg").attr("task_img", model.img_path);
                            $("#task_info_seg").attr("name", model.name);
                            $("#imag1_seg").attr("src", model.img_path);
                            $("#t_seg_date").val(model.mdate);
                            //setLanesObject(model.laneinfo);
                            loadTaskItems(model.group_tasks, model.type);
                            alert("项目修改成功");
                            cancelTaskToTimedRange();
                        }
                    }
                }
            });

        }
        else if (data.c_status === "4")
        {
            alert("任务已经完成，你不能修改任务");
        }
        else
        {
            alert("任务正在进行中，你不能修改任务");
        }
    }
}

function showTaskImageInfo_Seg(index)
{
    var item = $("#t_task_" + index);
    var data = item.attr("data");
    data = JSON.parse(data);
    $("#imag1_seg").attr('src', data.img_path);
}

function deleteTask_Seg(index)
{
    if (confirm("你确定要删除此任务吗?"))
    {
        var data = $("#t_task_" + index).attr("data");
        data = JSON.parse(data);
        if (data.c_status === "0")
        {
            $.ajax({
                url: "../../HandleDeleteTaskItem",
                data: {"tid": data.id},
                type: "GET",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
                },
                success: function (result) {
                    if (result === "0")
                    {
                        alert("项目任务没有删除成功，请重新尝试");
                    }
                    else
                    {
                        var model = JSON.parse(result);
                        if (model.type === 2)
                        {
                            createSegModel(model.id, model.lat, model.lng, model.degree);
                            $("#task_info_seg").attr("downnumber", model.downnumber);
                            $("#task_info_seg").attr("upnumber", model.upnumber);
                            $("#task_info_seg").attr("degree", model.degree);
                            $("#task_info_seg").attr("task_img", model.img_path);
                            $("#task_info_seg").attr("name", model.name);
                            $("#imag1_seg").attr("src", model.img_path);
                            $("#t_seg_date").val(model.mdate);
                            //setLanesObject(model.laneinfo);
                            loadTaskItems(model.group_tasks, model.type);
                            alert("项目任务删除成功");
                        }
                    }
                }
            });
        }
        else if (data.c_status === "4")
        {
            alert("此任务已经被完成，你不能删除");
        }
        else
        {
            alert("此任务正在进行中，你不能删除");
        }
    }
}

function showEditedTask_Seg(index)
{
    $("#task_item_show").show();
    var pindex = $("#t_task_" + index).attr("pindex");
    $("#task_item_show").attr("taskindex", index);
    $("#task_item_show").attr("timeGroup", pindex);
    $("#task_item_show").attr("option", "2");
    var data = $("#t_task_" + index).attr("data");
    data = JSON.parse(data);
    $("#imag1_seg").attr('src', data.img_path);

    $("#task_item_show").attr("current_slanes", data.slanes);
    $("#task_item_show").attr("preslanes", "");
    $("#task_item_show").attr("current_spoints", "");
    if (data.method === "1")
    {
        $("#shipin").prop("checked", true);
    }
    else
    {
        $("#rengong").prop("checked", true);
    }
    $("#task_cars_info").html("");
    var cars = data.peizhi;
    for (var i = 0; i < cars.length; i++)
    {

        var car = cars[i];
        var caricon = "";
        if (car.type === 1)
        {
            caricon = "fa-car";
        }
        if (car.type === 2)
        {
            caricon = "fa-truck";
        }
        if (car.type === 3)
        {
            caricon = "fa-bus";
        }
        if (car.type === 4)
        {
            caricon = "fa-motorcycle";
        }
        if (car.type === 5)
        {
            caricon = "fa-bicycle";
        }
        if (car.type === 6)
        {
            caricon = "fa-male";
        }

        var content = '<div class="dropdown iconCarDiv" id="car_type_icon_temp_div_' + car.id + '" data=\'' + JSON.stringify(car) + '\'><i class="fa ' + caricon + ' fa-2x carIconTask" aria-hidden="true" data-toggle="dropdown"  data-placement="bottom" title="' + car.name + '" id="car_type_icon_temp_' + car.id + '" ></i>'
                + '<div class="dropdown-menu" style="width:240px;height:120px;background:gainsboro;" aria-labelledby="car_type_icon_temp_' + i + '">'
                + '<table class="table table-condensed" style="border:none;width:100%;">'
                + '<tbody>'
                + '<tr>'
                + '<td style="border:none">车型:</td><td style="border:none">' + car.name + '</td>'
                + '</tr>'
//                + '<tr>'
//                + '<td style="border:none">车长:</td>'
//                + '<td style="border:none"><input type="text" id="c_min_length_temp_' + car.id + '"style="width:60px;" value="' + car.min_length + '">--<input type="text" style="width:60px;" id="c_max_length_temp_' + car.id + '" name="pei_name" value="' + car.max_length + '">米</td>'
//                + '</tr>'
//                + '<tr>'
//                + '<td style="border:none">载重:</td>'
//                + '<td style="border:none">'
//                + '<input type="text" name="pei_name" style="width:60px;" id="c_min_weight_temp_' + car.id + '" value="' + car.min_weight + '">--<input type="text" name="pei_name" style="width:60px;" id="c_max_weight_temp_' + car.id + '" value="' + car.max_weight + '">吨</td>'
//                + '</tr>'
                + '<tr>'
                + '<td style="border:none" colspan="2">小汽车换算系数:&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" name="pei_name" style="width:60px;" id="car_factor_temp_' + car.id + '" value="' + car.car_factor + '"></td>'

                + '</tr>'
                + '<tr>'
                + '<td style="border:none; text-align: left" colspan="2">'
                + '<button type="button" class="btn btn-success" onclick="carTypeConfirm_Temp_Seg(\'' + car.id + '\')">修改</button>'
                + '</td>'
                + '</tr>'
                + '</tbody>'
                + '</table>'
                + '</div>'
                + '<br/><div style="width:inherit;text-align:center;"><i class="fa fa-times-circle carTempICOND"  aria-hidden="true" onclick="removeTaskCarTemp_Seg(\'' + car.id + '\')"></i></div></div>';
        var item = $(content);
        $("#task_cars_info").append(item);
    }

}

function carTypeConfirm_Temp_Seg(id)
{
    var car = $("#car_type_icon_temp_div_" + id).attr("data");
    car = JSON.parse(car);
    car.min_length = $("#c_min_length_temp_" + id).val();
    car.max_length = $("#c_max_length_temp_" + id).val();
    car.min_weight = $("#c_min_weight_temp_" + id).val();
    car.max_weight = $("#c_max_weight_temp_" + id).val();
    car.car_factor = $("#car_factor_temp_" + id).val();
    car = JSON.stringify(car);
    $("#car_type_icon_temp_div_" + id).attr("data", car);
    alert("修改成功");
}

function copyTask_Seg(index)
{
    var pindex = $("#t_task_" + index).attr("pindex");
    var data = $("#t_task_" + index).attr("data");
    data = JSON.parse(data);
    var time_tasks = $("#task_info_seg").find(".list_time_group");
    if (time_tasks === undefined || time_tasks === null || time_tasks.length === 0)
    {
        alert("没有当前存在的时段");
    }
    else
    {
        if (time_tasks.length > 1)
        {
            var content = '<div id="div_copy_task_temp" stid="' + data.id + '" stime="" etime="" duration="" preIndex="0">';
            for (var i = 0; i < time_tasks.length; i++)
            {
                var ttid = "t_interval_" + pindex;
                if (time_tasks[i].id !== ttid)
                {
                    var stime = $(time_tasks[i]).attr("stime");
                    var etime = $(time_tasks[i]).attr("etime");
                    var duration = $(time_tasks[i]).attr("duration");
                    var name = "时间段: " + stime + "--" + etime + ", 时长: " + duration + "分钟";
                    content += '<li class="list-group-item list_time_group_temp" id="copy_task_temp_' + (i + 1) + '" stime="' + stime + '" etime="' + etime + '" duration="' + duration + '" onclick="pickCopyTargetTime(\'' + (i + 1) + '\');">' + name + '</li>';
                }
            }
            content += '</div>';

            var model;
            model = '<div class="modal-dialog">'

                    + '<div class="modal-content">'
                    + '<div class="modal-header">'
                    + '<button type="button" class="close" onclick="closeModal()">&times;</button>'
                    + '<h4 class="modal-title">请选择复制到的时段</h4>'
                    + '</div>'
                    + '<div class="modal-body">'

                    + content;
            model += '</div>'
                    + '<div class="modal-footer">'
                    + '<button type="button" class="btn btn-default" onclick="cofirmCopyTaskAction_Seg()">确定</button>'
                    + '</div>'
                    + '</div>'
                    + '</div>';
            var dig = document.getElementById("myModalSurvey");
            dig.innerHTML = model;
            $('#myModalSurvey').modal({backdrop: 'static', keyboard: false});
        }
        else
        {
            alert("没有其他的调查时段。");
        }

    }
}

function pickCopyTargetTime_Seg(index)
{
    var item = $("#copy_task_temp_" + index);
    var preIndex = $("#div_copy_task_temp").attr("preIndex");
    if (preIndex !== "0")
    {
        var eitem = $("#copy_task_temp_" + (preIndex));
        eitem.attr("class", "list-group-item list_time_group_temp");
        item.attr("class", "list-group-item list_time_group_temp_active");
        $("#div_copy_task_temp").attr("preIndex", index);
    }
    else
    {
        item.attr("class", "list-group-item list_time_group_temp_active");
        $("#div_copy_task_temp").attr("preIndex", index);
    }
    var stime = item.attr("stime");
    var etime = item.attr("etime");
    var duration = item.attr("duration");
    $("#div_copy_task_temp").attr("stime", stime);
    $("#div_copy_task_temp").attr("etime", etime);
    $("#div_copy_task_temp").attr("duration", duration);
}

function cofirmCopyTaskAction_Seg()
{
    var stime = $("#div_copy_task_temp").attr("stime");
    var etime = $("#div_copy_task_temp").attr("etime");
    var duration = $("#div_copy_task_temp").attr("duration");
    var stid = $("#div_copy_task_temp").attr("stid");
    $.ajax({
        url: "../../HandleCopyTaskItem",
        data: {"stid": stid, stime: stime, etime: etime, duration: duration},
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
        },
        success: function (result) {
            if (result === "0")
            {
                alert("项目任务没有复制成功，请重新尝试");
            }
            else
            {
                var model = JSON.parse(result);
                if (model.type === 2)
                {
                    createSegModel(model.id, model.lat, model.lng, model.degree);
                    $("#task_info_seg").attr("downnumber", model.downnumber);
                    $("#task_info_seg").attr("upnumber", model.upnumber);
                    $("#task_info_seg").attr("degree", model.degree);
                    $("#task_info_seg").attr("task_img", model.img_path);
                    $("#task_info_seg").attr("name", model.name);
                    $("#imag1_seg").attr("src", model.img_path);
                    $("#t_seg_date").val(model.mdate);
                    //setLanesObject(model.laneinfo);
                    loadTaskItems(model.group_tasks, model.type);
                    alert("项目复制成功");
                    $('#myModalSurvey').modal("hide");
                    //cancelTaskToTimedRange();
                }
            }
        }
    });
}


function getNavSelectionModel_Seg(spid, stmid, lat, lng)
{
    stmid = parseInt(stmid);
    var content = "";
    content += '<select id="seg_model_option" class="form-control" style="width:200px; color:black;" onchange="createSegModelImage()">';

    $.post("../../HandleGetModelImageHistory", {spid: spid, lat: lat, lng: lng}, function (out)
    {
        if (out === "" || out === "0")
        {

            content += '<option disabled selected>选择路段渠化模型</div>'
                    + '<option value="0" id="model_image_nav_0">新建路段渠化模型</div>'
                    + '</select>';
            $("#seg_model").html(content);
        }
        else
        {
            var models = JSON.parse(out);
            if (stmid === 0)
            {
                content += '<option disabled selected>选择路段渠化模型</div>'
                        + '<option value="0" id="model_image_nav_0">新建路段渠化模型</div>';
                for (var i = 0; i < models.length; i++)
                {
                    var model = models[i];
                    var tss = model.mdate.split("-");
                    var name = tss[0] + "年" + tss[1] + "月" + tss[2] + "日的调查模型";
                    content += '<option value="' + model.id + '" id="model_image_nav_' + model.id + '" downnumber=\'' + model.downnumber + '" name=\'' + model.name + '" degree=\'' + model.degree + '" upnumber=\'' + model.upnumber + '\' img_path=\'' + model.img_path + '\'>' + name + '</div>';
                }
                content += '</select>';

            }
            else
            {
                for (var i = 0; i < models.length; i++)
                {
                    var model = models[i];

                    if (stmid === model.id)
                    {
                        var tss = model.mdate.split("-");
                        var name = "当前的路段模型";

                        content += '<option selected value="' + model.id + '" id="model_image_nav_' + model.id + '" downnumber=\'' + model.downnumber + '" name=\'' + model.name + '" degree=\'' + model.degree + '" upnumber=\'' + model.upnumber + '\' img_path=\'' + model.img_path + '\'>' + name + '</div>';
                        content += '<option value="-1" id="model_image_nav_01">修改路段渠化模型</div>';
                    }
                    else
                    {
                        //content += '<option value="' + models.id + '" id="model_image_nav_' + models.id + '" intersection=\'' + model.laneinfo + '\' img_path=\'' + model.img_path + '\'>' + name + '</div>';
                    }
                }
                content += '</select>';
            }

            $("#seg_model").html(content);

        }
    });
}

function initTBMap_Seg(lng, lat)
{
    var map = new BMap.Map("tb_map_seg");
    lat = parseFloat(lat);
    lng = parseFloat(lng);
    map.centerAndZoom(new BMap.Point(lng, lat), 16);  // 初始化地图,设置中心点坐标和地图级别
    //map.addControl(new BMap.MapTypeControl());   //添加地图类型控件     // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(false);
    var point = new BMap.Point(lng, lat);
    var myIcon = new BMap.Icon("./mapIcon/seg_tb.png", new BMap.Size(40, 40));
    var marker = new BMap.Marker(point, {icon: myIcon});
    map.addOverlay(marker);
}


function getModelCarsTypes_Seg()
{
    var stmid = $("#seg_section").attr("stmid");
    $.post("../../HandleGetModelCarTypes", {stmid: stmid}, function (result)
    {
        if (result === "0")
        {
            alert("系统出现错误，请刷新页面");
        }
        else if (result === "")
        {
            alert("数据库发生异常，刷新页面");
        }
        else
        {
            var cars = JSON.parse(result);
            loadAllNavCarsType_Seg(cars);

        }

    });
}


function carTypeConfirma_Seg(id)
{
    var stmid = $("#intersection_section").attr("stmid");
    if (stmid === "0")
    {
        var car = $("#car_type_icon_" + id).attr("data");
        car = JSON.parse(car);
        car.min_length = $("#c_min_length_" + id).val();
        car.max_length = $("#c_max_length_" + id).val();
        car.min_weight = $("#c_min_weight_" + id).val();
        car.max_weight = $("#c_max_weight_" + id).val();
        car.car_factor = $("#car_factor_" + id).val();
        car = JSON.stringify(car);
        $("#car_type_icon_" + id).attr("data", car);
        alert("修改成功");
    }
    else
    {

        var car = $("#car_type_icon_" + id).attr("data");
        car = JSON.parse(car);
        car.min_length = $("#c_min_length_" + id).val();
        car.max_length = $("#c_max_length_" + id).val();
        car.min_weight = $("#c_min_weight_" + id).val();
        car.max_weight = $("#c_max_weight_" + id).val();
        car.car_factor = $("#car_factor_" + id).val();
        $.ajax({
            url: "../../HandleModifyModelCar",
            data: {"car": car, "stmid": stmid},
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
            },
            success: function (result) {
                if (result === "0")
                {
                    alert("车型信息没有修改成功，请重新尝试");
                }
                else
                {
                    var cars = JSON.parse(result);
                    loadAllNavCarsTypeOwn(cars);
                }
            }
        });
    }
}


function getCarICON(type, option)
{
    var caricon = "";
    if (type === 1)
    {
        caricon = "icon-icon-sedan";
    }
    if (type === 2)
    {
        caricon = "icon-icon-suv";
    }
    if (type === 3)
    {
        caricon = "icon-icon-van";
    }
    if (type === 4)
    {
        caricon = "icon-icon-bus";
    }
    if (type === 5)
    {
        caricon = "icon-icon-truck";
    }
    if (type === 6)
    {
        caricon = "icon-icon-heavy-truck";
    }
    if (type === 7)
    {
        caricon = "icon-icon-motorcycle";
    }
    if (type === 8)
    {
        caricon = "icon-icon-bicycle";
    }
    if (type === 9)
    {
        caricon = "icon-icon-ped";
    }

    if (type === 10)
    {
        caricon = "icon-icon-scooter";
    }
    if (type === 11)
    {
        caricon = "icon-icon-taxi";
    }
    if (type === 12)
    {
        caricon = "icon-icon-ambulance";
    }
    if (type === 13)
    {
        caricon = "icon-icon-fire";
    }
    if (type === 14)
    {
        caricon = "icon-icon-trailer";
    }
    if (type === 15)
    {
        caricon = "icon-icon-construction";
    }
    if (type === 16)
    {
        caricon = "icon-icon-mixer";
    }
    if (type === 17)
    {
        caricon = "icon-icon-hazard";
    }
    if (type === 18)
    {
        caricon = "icon-icon-motor";
    }
    if (type === 19)
    {
        caricon = "icon-icon-tractor";
    }
    if (type === 20)
    {
        caricon = "icon-icon-animal";
    }
    if (type === 21)
    {
        caricon = "icon-icon-man-tricycle";
    }
    if (type === 22)
    {
        caricon = "icon-icon-motor-tricycle";
    }

    return caricon;
}


function loadAllNavCarsType_Seg(cars)
{
    $("#seg_cars").html("");
    var title = $('<span style="color:black;font-size:16px; margin-right: 10px;" >调查车型库:</span>');
    $("#seg_cars").append(title);

    for (var i = 0; i < cars.length && i < 9; i++)
    {
        var caricon = getCarICON(cars[i].type, 1);

        var content = "";
        var title = '<div class="dropdown iconCarDiv" id="car_nav_block_' + cars[i].id + '"><i class="' + caricon + ' carIcon_nav modelCarICON navBarCarICON" aria-hidden="true" data-toggle="dropdown"  data-placement="bottom" title="' + cars[i].name + '" id="car_type_icon_' + (cars[i].id) + '" data=\'' + JSON.stringify(cars[i]) + '\'></i>';
        content += title + '<div class="dropdown-menu" style="width:240px;height:120px;background:gainsboro;" aria-labelledby="car_type_icon_' + (cars[i].id) + '">'
                + '<table class="table table-condensed" style="border:none;width:100%;">'
                + '<tbody>'
                + '<tr>'
                + '<td style="border:none">车型:</td><td style="border:none">' + cars[i].name + '</td>'
                + '</tr>'
//                + '<tr>'
//                + '<td style="border:none">车长:</td>'
//                + '<td style="border:none"><input type="text" id="c_min_length_' + (cars[i].id) + '"style="width:60px;" value="' + cars[i].min_length + '">--<input type="text" style="width:60px;" id="c_max_length_' + (cars[i].id) + '" name="pei_name" value="' + cars[i].max_length + '">米</td>'
//                + '</tr>'
//                + '<tr>'
//                + '<td style="border:none">载重:</td>'
//                + '<td style="border:none">'
//                + '<input type="text" name="pei_name" style="width:60px;" id="c_min_weight_' + (cars[i].id) + '" value="' + cars[i].min_weight + '">--<input type="text" name="pei_name" style="width:60px;" id="c_max_weight_' + (cars[i].id) + '" value="' + cars[i].max_weight + '">吨</td>'
//                + '</tr>';

        if (cars[i].car_factor !== 0)
        {
            content += '<tr>'
                    + '<td style="border:none" colspan="2">小汽车换算系数:&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" name="pei_name" style="width:60px;" id="car_factor_temp_' + cars[i].id + '" value="' + cars[i].car_factor + '"></td>'

                    + '</tr>';
        }

        content += '<tr>'
                + '<td style="border:none; text-align: left" colspan="2">'
                + '<button type="button" class="btn btn-success" onclick="carTypeConfirm_Seg(\'' + (cars[i].id) + '\')">修改</button>'
                + '</td>'
                + '</tr>'
                + '</tbody>'
                + '</table>'
                + '</div></div>';
        var item = $(content);
        $("#seg_cars").append(item);
//        $('#car_nav_block_' + cars[i].id).on("show.bs.dropdown", function (event) {
//            var car = $("#car_type_icon_" + cars[i].id).attr("data");
//            car = JSON.parse(car);
//            $("c_min_length_" + car.id).val(car.min_length);
//            $("c_max_length_" + car.id).val(car.max_length);
//            $("c_min_weight_" + car.id).val(car.min_weight);
//            $("c_max_weight_" + car.id).val(car.max_weight);
//            $("car_factor_" + car.id).val(car.car_factor);
//        });
    }

    var addOP = '<div class="dropdown iconCarDiv" id="default_car_add"><i class="carIcon fa fa-caret-square-o-down fa-2x" id="show_more_cars_icon" onclick="showAllCarTypes();"></i></div>' + showOtherCarICONS(cars);
    $("#seg_cars").append(addOP);
    loadDraggable_Model_Cars();
}

function showAddNewCarType_Seg()
{
    var content;
    content = '<div class="modal-dialog">'

            + '<div class="modal-content">'
            + '<div class="modal-header">'
            + '<button type="button" class="close" data-dismiss="modal">&times;</button>'
            + '<h4 class="modal-title">请填写你要创建的新的车型信息:</h4>'
            + '</div>'
            + '<div class="modal-body">'
            + '<table class="table table-condensed" style="border:none;width:100%;">'
            + '<tbody>'
            + '<tr>'
            + '<td style="border:none">车型:</td><td style="border:none"><input id="add_nav_car_name" type="text"></td>'
            + '</tr>'
            + '<tr>'
            + '<td style="border:none">车长:</td>'
            + '<td style="border:none"><input type="text" id="add_nav_car_min_length">--<input type="text" id="add_nav_car_max_length">米</td>'
            + '</tr>'
            + '<tr>'
            + '<td style="border:none">载重:</td>'
            + '<td style="border:none">'
            + '<input type="text" id="add_nav_car_min_weight">--<input type="text" id="add_nav_car_max_weight">吨</td>'
            + '</tr>'
            + '<tr>'
            + '<td style="border:none" colspan="2">小汽车换算系数:&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" id="add_nav_car_car_factor"></td>'

            + '</tr>'
            + '</tbody>'
            + '</table>';
    content += '</div>'
            + '<div class="modal-footer">'
            + '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>'

            + '<button type="button" class="btn btn-default" onclick="confirmAddNewCarType_Seg()">确定</button>'
            + '</div>'
            + '</div>'
            + '</div>';

    var dig = document.getElementById("myModalSurvey");
    dig.innerHTML = "";
    dig.innerHTML = content;
    $("#myModalSurvey").modal();
}

function confirmAddNewCarType_Seg()
{
    var stmid = $("#seg_section").attr("stmid");
    if (stmid === "0")
    {

    }
    else
    {
        var name = $("add_nav_car_name").val();
        var min_length = $("add_nav_car_min_length").val();
        var max_length = $("add_nav_car_max_length").val();
        var min_weight = $("add_nav_car_min_weight").val();
        var max_weight = $("add_nav_car_max_weight").val();
        var car_factor = $("add_nav_car_car_factor").val();
    }
}


function showCoords_Seg(event) {
    var flag = $("#task_info_seg").attr("imageClick");
    if (flag === "1")
    {
        var x = event.clientX;
        var y = event.clientY;
        var position = $("#imag1_seg").offset();
        var coords = "X coords: " + x + ", Y coords: " + y;
        var upnumber = $("#task_info_seg").attr("upnumber");
        var downnumber = $("#task_info_seg").attr("downnumber");
        var degree = $("#task_info_seg").attr("degree");
        var pid = $("#mainSurveyPage").attr("pid");
        var slanes = $("#task_item_show").attr("current_slanes");
        var preslanes = $("#task_item_show").attr("preslanes");
        var spoints = $("#task_item_show").attr("current_spoints");
        var xi = parseInt(x - position.left);
        var yi = parseInt(y - position.top);
        if (spoints === "")
        {
            spoints += xi + "_" + yi;
        }
        else
        {
            spoints += "#" + xi + "_" + yi;
        }
        $("#task_info_seg").attr("imageClick", "2");
        $.post("../../HandleCreateSegTask", {degree: degree, upnumber: upnumber, downnumber: downnumber, spoints: spoints, slanes: slanes, pid: pid, preslanes: preslanes}, function (result)
        {

            if (result.startsWith("1_"))
            {
                alert(result);

            }
            else
            {
                var out = result.split("M");
                $("#task_item_show").attr("current_slanes", out[0]);
                $("#imag1_seg").attr('src', out[1] + '?t=' + new Date().getTime());

            }

            $("#task_info_seg").attr("imageClick", "1");
        });
    }
    else if (flag === "2")
    {
        alert("车流配置中，请勿重复点击");
    }

    //alert(coords + " X: " + position.left + " Y: " + position.top);
}


function generateSegLane()
{
    var degree = $("#seg_section").attr("degree");
    var pid = $("#mainSurveyPage").attr("pid");
    degree = parseInt(degree);
    var flag = true;
    var seg_name = $("#seg_name").val();
    var upnumber = $("#upNumber_seg").val();
    var downNumber = $("#downNumber_seg").val();
    if (seg_name === "" || upnumber === "" || downNumber === "")
    {
        flag = false;
    }
    if (flag)
    {
        $("#seg_Lane").attr("degree", degree);
        $("#seg_Lane").attr("upnumber", upnumber);
        $("#seg_Lane").attr("downnumber", downNumber);
        $("#seg_Lane").attr("name", seg_name);
        $.post("../../HandleCreateSeg", {name: seg_name, upnumber: upnumber, downnumber: downNumber, degree: degree, pid: pid}, function (result)
        {

            if (!result.startsWith("1?"))
            {
                alert(result);

            }
            else
            {
                var img = result.split("?");
                $("#img_result_seg").attr('src', img[1] + '?' + new Date().getTime());
                //$("#task_info_seg").attr("task_img", img[1]);
            }
        });
    }
    else
    {
        alert("请确保你已经输入了争取的车道信息");
    }
}





//tools

function getTimeDiff(time1, time2)
{
    var out;
    var t1 = time1.split(":");
    var t2 = time2.split(":");
    var hh = parseInt(t2[0]) - parseInt(t1[0]);
    var min = parseInt(t2[1]) - parseInt(t1[1]);

    var out = min + hh * 60;
    return out;

}

function getTimeSlots(id)
{
    var parent = document.getElementById(id);
    var min = 60;
    var hour = 24;
    parent.innerHTML = "";
    for (var i = 0; i < hour; i++)
    {
        for (var j = 0; j < min; j += 5)
        {
            var po = "";
            var temp1 = "";
            var temp2 = "";
            if (i < 10)
            {
                temp1 = "0" + i;

            }
            else
            {
                temp1 = "" + i;
            }
            if (j < 10)
            {
                temp2 = "0" + j;

            }
            else
            {
                temp2 = "" + j;
            }
            var item = document.createElement("option");
            item.setAttribute("value", temp1 + ":" + temp2);
            item.innerHTML = temp1 + ":" + temp2;
            parent.appendChild(item);

        }
    }
}

function cf(name) {
    var r = confirm(name);
    return r;
}





function createIntersectionModel_PIC()
{

    var content = "";
    content += '<div  id="intersection_section" min-width:1800px; style="display:block;">'
            + '<div  id="intersection_images"style="display:none;"><table id="intersection_image_table" style="width: 800px;margin-left: 20px;"><tr><td>交叉口渠化名称</td><td>交叉口渠化时间</td><td>交叉口渠化操作</td></td></tr></table></div>'
            + '<div class="in_section_1" style="display:block;" id="intersection_quhua" flag="false" xcenter="0", ycenter="0"  xstart="0", ystart="0">'
            + '<div class="demo lock nav_body nav_layout">'
            + '<div class="left_nav" style="width:450px;height:300px;">'

            + '<div id="intersection_canvas" operation="0" style="position:relative;top:-40px;">'
            + '<canvas id="inter_template" style="width:450px;height:360px;"></canvas>'
            + '</div>'

            + '</div>'
            + '<div class="canvas_buttons"> <button type="button" id="cavans_button_add" class="btn btn-success canvas_button" onclick="enableAddLink()"><i class="icon-icon-add" data-toggle="tooltip" data-placement="bottom" title="添加车道"></i></button>'
            + '<button type="button" class="btn btn-success canvas_button" id="cavans_button_rotate" onclick="enableRotateLink()"><i class="icon-icon-rotate" data-toggle="tooltip" data-placement="bottom" title="旋转车道"></i></button>'
            + '<button type="button" class="btn btn-success canvas_button" id="cavans_button_delete" onclick="enableDeleteLink()"><i class="icon-icon-delete" data-toggle="tooltip" data-placement="bottom" title="删除车道"></i></button></div>'
            + '<div class="sideBySide nav_side">'
            + '<div class="tool_bar">'
            + '<div>'
            + '<span>进口道车道功能</span>'
            + ' <ul class="nav nav-pills sourcejQ_inter" style="width:450px;margin-bottom: 5px;">'


            + '<li type="1" class="r_li"><img src="./roadSym/1.jpg" class="r_tb" alt="调头行车道"></li>'
            + '<li type="2" class="r_li"><img src="./roadSym/2.jpg" class="r_tb" alt="左转掉头行车道"></li>'
            + '<li type="4" class="r_li"><img src="./roadSym/4.jpg" class="r_tb" alt="左转行车道"></li>'
            + '<li type="7" class="r_li"><img src="./roadSym/7.jpg" class="r_tb" alt="出直行车道"></li>'
            + '<li type="9" class="r_li"><img src="./roadSym/9.jpg" class="r_tb" alt="右转行车道"></li>'
            + '<li type="5" class="r_li"><img src="./roadSym/5.jpg" class="r_tb" alt="左转直行车道"></li>'
            + '<li type="8" class="r_li"><img src="./roadSym/8.jpg" class="r_tb" alt="右转直行车道"></li>'
            + '<li type="6" class="r_li"><img src="./roadSym/6.jpg" class="r_tb" alt="左右直行车道"></li>'


            + '</ul>'
            + '</div>'
            + '<div>'
            + '<ul class="nav nav-pills sourcejQ_inter" style="width:450px;margin-bottom: 5px;">'
            + '<li type="10" class="r_li"><img src="./roadSym/10.jpg" class="r_tb" alt="调头行车道"></li>'
            + '<li type="11" class="r_li"><img src="./roadSym/11.jpg" class="r_tb" alt="左转掉头行车道"></li>'
            + '<li type="13" class="r_li"><img src="./roadSym/13.jpg" class="r_tb" alt="左转行车道"></li>'
            + '<li type="16" class="r_li"><img src="./roadSym/16.jpg" class="r_tb" alt="出直行车道"></li>'
            + '<li type="18" class="r_li"><img src="./roadSym/18.jpg" class="r_tb" alt="右转行车道"></li>'
            + '<li type="14" class="r_li"><img src="./roadSym/14.jpg" class="r_tb" alt="左转直行车道"></li>'
            + '<li type="17" class="r_li"><img src="./roadSym/17.jpg" class="r_tb" alt="右转直行车道"></li>'
            + '<li type="15" class="r_li"><img src="./roadSym/15.jpg" class="r_tb" alt="左右直行车道"></li>'
            + '</ul>'
            + '</div>'

            + '<div>'
            + '<ul class="nav nav-pills sourcejQ_inter" style="width:450px;margin-bottom: 5px;">'
            + '<li type="21" class="r_li"><img src="./roadSym/21.jpg" class="r_tb" alt="左转行车道"></li>'
            + '<li type="19" class="r_li"><img src="./roadSym/19.jpg" class="r_tb" alt="出直行车道"></li>'
            + '<li type="24" class="r_li"><img src="./roadSym/24.jpg" class="r_tb" alt="右转行车道"></li>'
            + '<li type="22" class="r_li"><img src="./roadSym/22.jpg" class="r_tb" alt="左转直行车道"></li>'
            + '<li type="23" class="r_li"><img src="./roadSym/23.jpg" class="r_tb" alt="右转直行车道"></li>'
            + '<li type="25" class="r_li"><img src="./roadSym/25.jpg" class="r_tb" alt="左右直行车道"></li>'
            + '</ul>'
            + '</div>'

            + '<div>'
            + '<span>出口道车道功能</span>'
            + '<ul class="nav nav-pills sourcejQ_inter" style="width:450px;margin-bottom: 5px;">'
            + '<li type="0" class="r_li"><img src="./roadSym/0.jpg" class="r_tb" alt="进直行车道"></li>'
            + '<li type="27" class="r_li"><img src="./roadSym/27.jpg" class="r_tb" alt="公交车车道"></li>'
            + '<li type="26" class="r_li"><img src="./roadSym/26.jpg" class="r_tb" alt="自行车"></li>'
            + '</ul>'
            + '</div>'
            + '</div>'
            + '<div class="intersection" showDone="0" thets="0_90_180_270" name="" id="intersection" currentLaneID="0" lanes="" currentLaneDegree="" laneInfo="">'
            + '<p style="color:black;">进口渠化方案:</p>'
            + '<ol id="outresultOut" class="nav nav-pills targetjQ_inter ui-sortable outview" data="0" style="border:1px solid white;" index="0">'
            + '</ol>'
            + '<div style="margin-bottom:10px;">'
            + '<span>左侧展宽:</span><select id="leftmergenumber" onchange="onChangeLaneSetting(\'7\')"><option value="0">0</div></select>'
            + '<span>右侧展宽:</span><select id="rightmergenumber" onchange="onChangeLaneSetting(\'8\')"><option value="0">0</div></select>'
            + '<span>左转待行区?</span><select id="leftturnshow" onchange="onChangeLaneSetting(\'11\')"><option value="0">否</div><option value="1">是</div></select>'
            + '</div>'
            + '<p style="color:black;">出口车道布置:</p>'
            + '<ol id="outresultIn" class="nav nav-pills targetjQ_inter ui-sortable outview" data="0" style="border:1px solid white;" index="0">'
            + '</ol>'
            + '<div>'
            + '<span>机非分割带?</span><select id="isbikeline" onchange="onChangeLaneSetting(\'5\')"><option value="0">否</div><option value="1">是</div></select>'
            + '<span>中央分割带?</span><select id="isyellowline" onchange="onChangeLaneSetting(\'3\')"><option value="1">单黄线</div><option value="2">双黄线</div><option value="3">分割带</div></select>'
            + '<span>过节横道?</span><select id="iswalkline" onchange="onChangeLaneSetting(\'4\')"><option value="0">否</div><option value="1">是</div></select>'
            + '<span>安全岛?</span><select id="iswalksafearea" onchange="onChangeLaneSetting(\'6\')"><option value="0">否</div><option value="1">是</div></select>'
            + '</div>'
            + '</div>'

            + '</div>'
            + '</div>'
            + '<div class="img_show nav_layout">'
            + '<img src="" alt="请创建你的交叉口渠化模型" id="img_result" class="img_out zoom" onmousedown="getStartIntersectionImage1(event)" onmouseup="movingIntersectionImage1(event)"  move="0" draggable="false" >'
            + '</div>'
            + '<i class="icon-icon-refresh inter_img_button intersection_icon_G" onclick="generateIntersection1()" data-toggle="tooltip" data-placement="bottom" title="生成交叉口图" style="font-size: 18px;margin-left: 10px;"/></i><i style="font-size: 18px;margin-left:5px;" data-toggle="tooltip" data-placement="bottom" title="移动交叉口图" class="icon-icon-movepicture inter_img_button intersection_icon_G" style="font-size: 18px;" onclick="startIntersectionMoving()"/></i>'
            + '<br/><img src="./roadSym/compass.jpg" alt="坐标方向图" id="img_compass_1" class="image_compass_1" draggable="false" >'
            + '</div>'


            + '</div>';


    $("#mainSurveyPage").html(content);
    $("#mainSurveyPage").show();
    loadAllIntersectionImages();
    loadDraggable_Intersection();
    setLanesObject("1_未命名道路_0_1_1_0_0_0_0_0_0_0#L2_未命名道路_90_1_1_0_0_0_0_0_0_0#L3_未命名道路_180_1_1_0_0_0_0_0_0_0#L4_未命名道路_270_1_1_0_0_0_0_0_0_0#");
}




function createIntersectionModel_PIC_V1(lat1, lng1)
{

    var content = "";
    content += '<div  id="intersection_section" min-width:1800px; style="display:block;">'
            + '<div  id="intersection_images"style="display:none;"><table id="intersection_image_table" style="width: 800px;margin-left: 20px;"><tr><td>交叉口渠化名称</td><td>交叉口渠化时间</td><td>交叉口渠化操作</td></td></tr></table></div>'
            + '<div class="in_section_1" style="display:block;" id="intersection_quhua" flag="false" xcenter="0", ycenter="0"  xstart="0", ystart="0">'
            + '<div class="demo lock nav_body nav_layout">'
            + '<div class="left_nav" style="width:450px;height:300px;">'
            + '<div id="tb-map" style="width:450px;height:300px;">'

            + '</div>'
            + '<div id="intersection_canvas" operation="0" style="position:relative;top:-340px;">'
            + '<canvas id="inter_template" style="width:450px;height:360px;"></canvas>'
            + '</div>'

            + '</div>'
            + '<div class="canvas_buttons"> <button type="button" id="cavans_button_add" class="btn btn-success canvas_button" onclick="enableAddLink()"><i class="icon-icon-add" data-toggle="tooltip" data-placement="bottom" title="添加车道"></i></button>'
            + '<button type="button" class="btn btn-success canvas_button" id="cavans_button_rotate" onclick="enableRotateLink()"><i class="icon-icon-rotate" data-toggle="tooltip" data-placement="bottom" title="旋转车道"></i></button>'
            + '<button type="button" class="btn btn-success canvas_button" id="cavans_button_delete" onclick="enableDeleteLink()"><i class="icon-icon-delete" data-toggle="tooltip" data-placement="bottom" title="删除车道"></i></button>'
            + '<button type="button" class="btn btn-success canvas_button" id="cavans_button_delete" onclick="generateRoadLinkImage()"><i class="fa fa-check-square-o fa-2x" data-toggle="tooltip" data-placement="bottom" title="生成车道缩图"></i></button></div>'
            + '<div class="sideBySide nav_side">'
            + '<div class="tool_bar">'
            + '<div>'
            + '<span>进口道车道功能</span>'
            + ' <ul  id="inRoadList_Normal" class="nav nav-pills sourcejQ_inter" style="width:450px;margin-bottom: 5px;height:33px;">'
            + '</ul>'
            + '</div>'
            + '<div>'
            + '<ul class="nav nav-pills sourcejQ_inter" id="inRoadList_Bus" style="width:450px;margin-bottom: 5px;height:33px;">'
            + '</ul>'
            + '</div>'
            + '<div>'
            + '<ul id="inRoadList_Bike" class="nav nav-pills sourcejQ_inter" style="width:450px;margin-bottom: 5px;height:33px;">'
            + '</ul>'
            + '</div>'
            + '<div>'
            + '<span>出口道车道功能</span>'
            + '<ul class="nav nav-pills sourcejQ_inter" id="outRoadList" style="width:450px;margin-bottom: 5px;height:33px;">'
            + '</ul>'
            + '</div>'
            + '</div>'
            + '<div class="intersection" showDone="0" thets="0_90_180_270" name="" id="intersection" currentLaneID="0" lanes="" currentLaneDegree="" laneInfo="" hasLinkImage="0" imageURL="">'
            + '<p style="color:black;">进口渠化方案:</p>'
            + '<span>配置流向</span><br/><span style="position:relative;top:10px;">车道设置</span></br>\n\
              <span style="position:relative;top:10px;">车道展宽</span></br><span style="position:relative;top:10px;">左转待行</span></br><span style="position:relative;top:10px;">右转渠化</span></br>\n\
            <ol id="outresultIn" class="nav nav-pills targetjQ_inter ui-sortable outview" data="0" style="border:1px solid white;" index="0">'
            + '</ol>'
            + '<div style="position:relative;top:-110px;"><p style="color:black;">出口车道布置:</p>'
            + '<span>配置流向</span><br/><span style="position:relative;top:10px;">车道设置</span></br><ol id="outresultOut" class="nav nav-pills targetjQ_inter ui-sortable outview" data="0" style="border:1px solid white; height:60px;top:-50px;" index="0">'
            + '</ol>'
            + '</div><div style="position:relative;top:-155px;">'
            + '<span>机非分割带?</span><select id="isbikeline" onchange="onChangeLaneSetting(\'5\')"><option value="0">否</div><option value="1">是</div></select>'
            + '<span>中央分割带?</span><select id="isyellowline" onchange="onChangeLaneSetting(\'3\')"><option value="1">单黄线</div><option value="2">双黄线</div><option value="3">分割带</div></select>'
            + '<span>过节横道?</span><select id="iswalkline" onchange="onChangeLaneSetting(\'4\')"><option value="0">否</div><option value="1">是</div></select>'
            + '<span>安全岛?</span><select id="iswalksafearea" onchange="onChangeLaneSetting(\'6\')"><option value="0">否</div><option value="1">是</div></select>'
            + '</div>'
            + '</div>'

            + '</div>'
            + '</div>'
            + '<div class="img_show nav_layout">'
            + '<img src="" alt="请创建你的交叉口渠化模型" id="img_result" class="img_out zoom" onmousedown="getStartIntersectionImage1(event)" onmouseup="movingIntersectionImage1(event)"  move="0" draggable="false" >'
            + '</div>'
            + '<i class="icon-icon-refresh inter_img_button intersection_icon_G" onclick="generateIntersection1()" data-toggle="tooltip" data-placement="bottom" title="生成交叉口图" style="font-size: 18px;margin-left: 10px;"/></i><i style="font-size: 18px;margin-left:5px;" data-toggle="tooltip" data-placement="bottom" title="移动交叉口图" class="icon-icon-movepicture inter_img_button intersection_icon_G" style="font-size: 18px;" onclick="startIntersectionMoving()"/></i>'
            + '<br/><img src="./roadSym/compass.jpg" alt="坐标方向图" id="img_compass_1" class="image_compass_1" draggable="false" >'
            + '</div>'


            + '</div>';


    $("#mainSurveyPage").html(content);
    $("#mainSurveyPage").show();
    initTBMap_Intersection(lng1, lat1);
    loadAllIntersectionImages();
    // loadDraggable_Intersection();
    setLanesObject("1_未命名道路_0_1_1_0_0_0_0_0_0_0#L2_未命名道路_90_1_1_0_0_0_0_0_0_0#L3_未命名道路_180_1_1_0_0_0_0_0_0_0#L4_未命名道路_270_1_1_0_0_0_0_0_0_0#");
}

function loadDraggable_Intersection_Link()
{
    $(function () {
        $(".sourcejQ_inter li").draggable({
            addClasses: false,
            helper: "clone"
        });
        $(".targetjQ_inter").droppable({
            addClasses: false,
            activeClass: "listActive",
            //hoverClass : "listHover",
            accept: ":not(.ui-sortable-helper)",
            drop: function (event, ui) {
                var checked = $("#intersection").attr("currentLaneID");
                if (checked !== "0")
                {
                    var index = 0;
                    var parent;
                    var type = ui.draggable.attr("type");
                    //type = parseInt(type);
                    if (type === "in")
                    {
                        index = $("#outresultIn").attr("index");
                        index = parseInt(index);
                        parent = $("#outresultIn");
                    }
                    else
                    {
                        index = $("#outresultOut").attr("index");
                        index = parseInt(index);
                        parent = $("#outresultOut");
                    }
                    $(this).find(".placeholder").remove();
                    var link = $('<i class="fa fa-times-circle roadDelete" aria-hidden="true" onclick="deleteRoadItemLink(\''+type+'\',\'' + checked + '_' + index + '\')"></i>');

                    var instance = '<li pid="' + ui.draggable.attr("pid") + '" imageurl="' + ui.draggable.attr("imageurl") + '" rdegree="'
                            + ui.draggable.attr("rdegree") + '" mid="' + ui.draggable.attr("mid") + '" rid="' + ui.draggable.attr("rid") + '" sdegree="' + ui.draggable.attr("sdegree") + '" class="r_li_link"><img src="' + ui.draggable.attr("imageurl") + '" class="r_tb_link" alt="车道"></li>';

                    var list = $(instance);
                    $(list).attr("id", type + "_rt_link_" + checked + "_" + index);
                    $(list).attr("checkid", checked + "_" + index);
                    $(list).attr("type", type);
                    $(list).attr("value", "0");
                    $(list).attr("cindex", "0");
                    
                    $(list).attr("left", "0");
                    $(list).attr("right", "0");
                    $(list).attr("leftwait", "0");
                     $(list).attr("kind", ui.draggable.attr("kind"));
                    $(list).attr("class", "rt_link_class");
                    $(list).append(link);
                    var selection = $('<div id="' + type + '_image_s_' + checked + '_' + index + '" value="0" cindex="0"></div>');
                    var leftmergenumber = $('<div class="leftmergeNum" id="' + type + '_merge_' + checked + '_' + index + '" type="'+type+'" ids="'+checked + '_' + index +'"></div>');
                    var rightmergenumber = $('<div class="rightmergeNum" id="' + type + '_right_wait_' + checked + '_' + index + '" type="'+type+'" ids="'+checked + '_' + index +'"></div>');
                    var leftwaitarea = $('<div class="leftwaitNum" id="' + type + '_left_wait_' + checked + '_' + index + '" type="'+type+'" ids="'+checked + '_' + index +'"></div>');
                    $(list).append(selection);
                    
                    $(list).append(leftmergenumber);
                    
                    
                    
                    $(list).append(leftwaitarea);
                    
                    $(list).append(rightmergenumber);
                    
                    index = index + 1;
                    parent.attr("index", index);

                    if (type === "in")
                    {
                        if ($(this).attr("id") === "outresultOut")
                        {
                            alert("出口车道不能放置在进口车道图中!");
                            return 0;
                        }
                        else
                        {
                            $(list).appendTo(this);
                            updateRoadDriectionInfoLink();
                        }
                    }
                    else
                    {
                        if ($(this).attr("id") === "outresultIn")
                        {

                            alert("进口车道不能放置在出口车道图中!");
                            return 0;
                        }
                        else
                        {
                            $(list).appendTo(this);
                            updateRoadDriectionInfoLink();
                        }
                    }

                }
                else
                {
                    if (checked === "0")
                    {
                        alert("请先选择要编辑的路口");
                    }
                }


//							updateMainExample();
            }
        }).sortable({
            items: "li:not(.placeholder)",
            sort: function () {
                $(this).removeClass("listActive");
                updateRoadDriectionInfoLink();
            },
            update: function () {
                updateRoadDriectionInfoLink();
//							updateMainExample();
            }
        });
    });
}

function deleteRoadItemLink(type,id)
{
    var item = $("#"+type+"_rt_link_" + id);
    item.remove();
}

function loadRoadInfo(tid)
{
    tid = parseInt(tid);
    var lanes = $("#intersection").attr("lanes");
    lanes = JSON.parse(lanes);// id, name. degree, dashline, laneinfo,
    var laneinfo = "";
    for (var i = 0; i < lanes.length; i++)
    {
        var lid = parseInt(lanes[i].id);
        if (lid === tid)
        {
            laneinfo = lanes[i].laneinfo;
            break;
        }
    }
    var parentIn = document.getElementById("outresultIn");
    parentIn.innerHTML = "";

    var parentOut = document.getElementById("outresultOut");
    parentOut.innerHTML = "";


    if (laneinfo !== undefined && laneinfo !== null) //{id: type: rid: mid: rdegree,imageurl, value, cindex, sdegree, option,
    {
        var index, parent;
        $("#outresultIn").attr("index", "0");
        $("#outresultOut").attr("index", "0");
        for (var i = 0; i < laneinfo.length; i++)
        {
            var item = laneinfo[i];
            var type = item.type;
            //type = parseInt(type);
            if (type === "in")
            {
                index = $("#outresultIn").attr("index");
                index = parseInt(index);
                parent = $("#outresultIn");
            }
            else
            {
                index = $("#outresultOut").attr("index");
                index = parseInt(index);
                parent = $("#outresultOut");
            }
            $(this).find(".placeholder").remove();
            var link = $('<i class="fa fa-times-circle roadDelete" aria-hidden="true" onclick="deleteRoadItemLink(\'' + type + '\',\'' + tid + '_' + index + '\')"></i>');

            var instance = '<li pid="' + item.pid + '" imageurl="' + item.imageurl + '" rdegree="'
                    + item.rdegree + '" mid="' + item.mid + '" rid="' + item.rid + '" sdegree="' + item.sdegree + '" class="r_li_link"><img src="' + item.imageurl + '" class="r_tb_link" alt="车道"></li>';

            var list = $(instance);
            $(list).attr("id", type + "_rt_link_" + tid + "_" + index);
            $(list).attr("checkid", tid + "_" + index);
            $(list).attr("type", type);
            $(list).attr("value", item.value);
            $(list).attr("cindex", item.cindex);
            
            $(list).attr("left",item.left);
            $(list).attr("right",item.right);
            $(list).attr("leftwait", item.leftwait);
            
            $(list).attr("class", "rt_link_class");
            $(list).append(link);
            var selection = $('<div id="' + type + '_image_s_' + tid + '_' + index + '"></div>');
            var leftmergenumber = $('<div class="leftmergeNum" id="' + type + '_merge_' + tid + '_' + index + '" type="'+type+'" ids="'+tid + '_' + index +'"></div>');
                    var rightmergenumber = $('<div class="rightmergeNum" id="' + type + '_right_wait_' + tid + '_' + index + '" type="'+type+'" ids="'+tid + '_' + index +'"></div>');
                    var leftwaitarea = $('<div class="leftwaitNum" id="' + type + '_left_wait_' + tid + '_' + index + '" type="'+type+'" ids="'+tid + '_' + index +'"></div>');
                    $(list).append(selection);
                    
                    $(list).append(leftmergenumber);
                    
                    
                    
                    $(list).append(leftwaitarea);
                    
                    $(list).append(rightmergenumber);
            parent.append($(list));
            getLinkArrowHTML_V1(item.option, tid + "_" + index, type, item.cindex);
            index = index + 1;
            parent.attr("index", index);

        }
    }
    else
    {
        $("#outresultIn").attr("index", "0");
        $("#outresultOut").attr("index", "0");
    }

}

function updateSingleRoadDriectionInfoLink(id,value,cindex)
{
    var tid = $("#intersection").attr("currentLaneID");

    tid = parseInt(tid);
    var lanes = $("#intersection").attr("lanes");
    lanes = JSON.parse(lanes);// id, name. degree, dashline, laneinfo,

    var lanesinfo;
    for (var i = 0; i < lanes.length; i++)
    {
        var lid = parseInt(lanes[i].id);
        if (lid === tid)
        {
            //lanes[i].laneinfo;
            lanesinfo=lanes[i].laneinfo;
            //ccindex = i;
            break;
        }
    }
    
    for (var i = 0; i < lanesinfo.length; i++)
    {
        var lid = lanesinfo[i].id;
        if (lid === id)
        {
            //lanes[i].laneinfo;
            //lanes[i].laneinfo = [];
            var item=lanesinfo[i];
            item.value=value;
            item.cindex=cindex;
            generateMergeSelection(id,value);
            break;
        }
    }
    lanes = JSON.stringify(lanes);
    $("#intersection").attr("lanes", lanes);
}

function mergeNumChange(id,option)
{
    option=parseInt(option);
    var parent=$("#"+id);
    var type=parent.attr("type");
    var cid=parent.attr("checkid");
    var item=$("#"+type+"_merge_s_"+cid);
    var value=item.val();
    if(option===1)
    {
        parent.attr("left",value);
    }
    else
    {
        parent.attr("right",value);
    }
    
    var tid = $("#intersection").attr("currentLaneID");

    tid = parseInt(tid);
    var lanes = $("#intersection").attr("lanes");
    lanes = JSON.parse(lanes);// id, name. degree, dashline, laneinfo,

    var lanesinfo;
    for (var i = 0; i < lanes.length; i++)
    {
        var lid = parseInt(lanes[i].id);
        if (lid === tid)
        {
            //lanes[i].laneinfo;
            lanesinfo=lanes[i].laneinfo;
            //ccindex = i;
            break;
        }
    }
    
    for (var i = 0; i < lanesinfo.length; i++)
    {
        var lid = lanesinfo[i].id;
        if (lid === id)
        {
            //lanes[i].laneinfo;
            //lanes[i].laneinfo = [];
            var item=lanesinfo[i];
            if(option===1)
            {
                item.left=value;
            }
            else
            {
                item.right=value;
            }
            break;
        }
    }
    lanes = JSON.stringify(lanes);
    $("#intersection").attr("lanes", lanes);
    
}

function generateMergeSelection(id, value)
{
    var parent=$("#"+id);
    var type=parent.attr("type");
    var cid=parent.attr("checkid");
    var item=$("#"+type+"_merge_"+cid);
    item.empty();
    var content="";
    var infos=value.split("#");
    var left=0,right=0;
    for(var i=0;i<infos.length;i++)
    {
        var info=infos[i];
        if(info!=="-1")
        {
         
        if((info.indexOf("0")>-1||info.indexOf("1")>-1)&&(info.indexOf("2")===-1))
        {
            left++;
        }
        else if(info.indexOf("3")>-1&&info.indexOf("2")===-1)
        {
            right++;
        }
    }
    }
    if (left > 0)
    {
        var value1=parseInt(parent.attr("left"));
        content='<select id="'+type+"_merge_s_"+cid+'" type="left" onchange="mergeNumChange(\''+id+'\',\''+1+'\');" style="font-size:12px;">';
        for (var i = 0; i <= left && left > 0; i++)
        {
            if(i===value1)
            {
                
                content += '<option selected = "selected" value="' + (i) + '">' + (i) + '</option>';
            }
            else
            {
                content += '<option value="' + (i) + '">' + (i) + '</option>';
            }
            
        }
        content += "</select>";
        item.append($(content));
    }
    if(right>0)
    {
        var value1=parseInt(parent.attr("right"));
        content='<select id="'+type+"_merge_s_"+cid+'" type="right" onchange="mergeNumChange(\''+id+'\',\''+2+'\');;" style="font-size:12px;" >';
        for (var i = 0; i <= right; i++)
        {
           if(i===value1)
            {
                
                content += '<option selected = "selected" value="' + (i) + '">' + (i) + '</option>';
            }
            else
            {
                content += '<option value="' + (i) + '">' + (i) + '</option>';
            }
        }
        content += "</select>";
        item.append($(content));
    }
    
}

function updateRoadDriectionInfoLink()
{

    var tid = $("#intersection").attr("currentLaneID");

    tid = parseInt(tid);
    var lanes = $("#intersection").attr("lanes");
    lanes = JSON.parse(lanes);// id, name. degree, dashline, laneinfo,
    var ccindex = 0;
    for (var i = 0; i < lanes.length; i++)
    {
        var lid = parseInt(lanes[i].id);
        if (lid === tid)
        {
            //lanes[i].laneinfo;
            lanes[i].laneinfo = [];
            ccindex = i;
            break;
        }
    }
    var lis = $("#outresultIn").find("li");
    var flag = 15;
    if (lis !== undefined && lis !== null)
    {
        var type = "in";
        for (var i = 0; i < lis.length; i++)
        {
            var sdegree = $(lis[i]).attr("sdegree");
            sdegree = parseInt(sdegree);

            var item = $("#als_" + $(lis[i]).attr("id"));
            if (item !== undefined && item !== null)
            {
                item.remove();
            }
            var temp = {id: $(lis[i]).attr("id"), mid: $(lis[i]).attr("mid"), rid: $(lis[i]).attr("rid"), sdegree: $(lis[i]).attr("sdegree"),
                rdegree: $(lis[i]).attr("rdegree"), imageurl: $(lis[i]).attr("imageurl"), pid: $(lis[i]).attr("pid"), type: $(lis[i]).attr("type"),
                option: 0, cindex: $(lis[i]).attr("cindex"), value: $(lis[i]).attr("value"), left:$(lis[i]).attr("left"),
                right:$(lis[i]).attr("right"),leftwait:$(lis[i]).attr("leftwait")};


            if (sdegree === 0)
            {
                getLinkArrowHTML_V1(0, $(lis[i]).attr("checkid"), type, $(lis[i]).attr("cindex"));
                //$(lis[i]).append($(content));
                temp.option = 0;
                if ($(lis[i]).attr("kind") === "0")
                {
                    temp.direction = "0";
                }
                else if ($(lis[i]).attr("kind") === "1")
                {
                    temp.direction = "10";
                }
                else
                {
                    temp.direction = "20";
                }
                lanes[ccindex].laneinfo.push(temp);

            }
            else if (sdegree < 180 - flag)
            {
                var next = $(lis[i]).next();
                if (next !== undefined && next !== null)
                {
                    var sdegree1 = next.attr("sdegree");
                    sdegree1 = parseInt(sdegree1);
                    if (sdegree1 > 180 + flag)
                    {
                        getLinkArrowHTML_V1(2, $(lis[i]).attr("checkid"), type, $(lis[i]).attr("cindex"));
                        //var content = getLinkArrowHTML(0, lis[i].attr("id"));
//                        $(lis[i]).append($(content));
                        temp.option = 2;

                        if ($(lis[i]).attr("kind") === "0")
                        {
                            temp.direction = "1";
                        }
                        else if ($(lis[i]).attr("kind") === "1")
                        {
                            temp.direction = "11";
                        }
                        else
                        {
                            temp.direction = "21";
                        }
                        lanes[ccindex].laneinfo.push(temp);
                    }
                    else
                    {
                        getLinkArrowHTML_V1(1, $(lis[i]).attr("checkid"), type, $(lis[i]).attr("cindex"));
                        //$(lis[i]).append($(content));
                        temp.option = 1;

                        if ($(lis[i]).attr("kind") === "0")
                        {
                            temp.direction = "1";
                        }
                        else if ($(lis[i]).attr("kind") === "1")
                        {
                            temp.direction = "11";
                        }
                        else
                        {
                            temp.direction = "21";
                        }
                        lanes[ccindex].laneinfo.push(temp);
                    }
                }
                else
                {
                    getLinkArrowHTML_V1(1, $(lis[i]).attr("checkid"), type, $(lis[i]).attr("cindex"));
                    //$(lis[i]).append($(content));
                    temp.option = 1;

                    if ($(lis[i]).attr("kind") === "0")
                    {
                        temp.direction = "1";
                    }
                    else if ($(lis[i]).attr("kind") === "1")
                    {
                        temp.direction = "11";
                    }
                    else
                    {
                        temp.direction = "21";
                    }
                    lanes[ccindex].laneinfo.push(temp);
                }
            }

            else if (sdegree > 180 + flag)
            {
                var next = $(lis[i]).next();
                if (next !== undefined && next !== null)
                {
                    getLinkArrowHTML_V1(5, $(lis[i]).attr("checkid"), type, $(lis[i]).attr("cindex"));
                    //$(lis[i]).append($(content));
                    temp.option = 5;
                    if ($(lis[i]).attr("kind") === "0")
                    {
                        temp.direction = "3";
                    }
                    else if ($(lis[i]).attr("kind") === "1")
                    {
                        temp.direction = "13";
                    }
                    else
                    {
                        temp.direction = "23";
                    }
                    lanes[ccindex].laneinfo.push(temp);
                }
                else
                {
                    getLinkArrowHTML_V1(6, $(lis[i]).attr("checkid"), type, $(lis[i]).attr("cindex"));
                    //$(lis[i]).append($(content));
                    temp.option = 6;

                    if ($(lis[i]).attr("kind") === "0")
                    {
                        temp.direction = "3";
                    }
                    else if ($(lis[i]).attr("kind") === "1")
                    {
                        temp.direction = "13";
                    }
                    else
                    {
                        temp.direction = "23";
                    }
                    lanes[ccindex].laneinfo.push(temp);
                }
            }
            else
            {
                var next = $(lis[i]).next();
                if (next !== undefined && next !== null)
                {
                    getLinkArrowHTML_V1(3, $(lis[i]).attr("checkid"), type, $(lis[i]).attr("cindex"));
                    //$(lis[i]).append($(content));
                    temp.option = 3;
                    if ($(lis[i]).attr("kind") === "0")
                    {
                        temp.direction = "2";
                    }
                    else if ($(lis[i]).attr("kind") === "1")
                    {
                        temp.direction = "12";
                    }
                    else
                    {
                        temp.direction = "22";
                    }
                    lanes[ccindex].laneinfo.push(temp);
                }
                else
                {
                    getLinkArrowHTML_V1(4, $(lis[i]).attr("checkid"), type, $(lis[i]).attr("cindex"));
                    //$(lis[i]).append($(content));
                    temp.option = 4;

                    if ($(lis[i]).attr("kind") === "0")
                    {
                        temp.direction = "2";
                    }
                    else if ($(lis[i]).attr("kind") === "1")
                    {
                        temp.direction = "12";
                    }
                    else
                    {
                        temp.direction = "22";
                    }
                    lanes[ccindex].laneinfo.push(temp);
                }
            }
        }
    }

    lis = $("#outresultOut").find("li");
    if (lis !== undefined && lis !== null)
    {
        var type = "out";
        for (var i = 0; i < lis.length; i++)
        {
            var temp = {id: $(lis[i]).attr("id"), mid: $(lis[i]).attr("mid"), rid: $(lis[i]).attr("rid"), sdegree: $(lis[i]).attr("sdegree"),
                rdegree: $(lis[i]).attr("rdegree"), imageurl: $(lis[i]).attr("imageurl"), pid: $(lis[i]).attr("pid"), type: $(lis[i]).attr("type"),
                option: 3, cindex: $(lis[i]).attr("cindex"), value: $(lis[i]).attr("value"),left:"0",right:"0",leftwait:"0"};
            if ($(lis[i]).attr("kind") === "0")
            {
                temp.direction = "00";
            }
            else if ($(lis[i]).attr("kind") === "1")
            {
                temp.direction = "01";
            }
            else
            {
                temp.direction = "02";
            }

            lanes[ccindex].laneinfo.push(temp);


            getLinkArrowHTML_V1(3, $(lis[i]).attr("checkid"), type, $(lis[i]).attr("cindex"));
        }
    }


    lanes = JSON.stringify(lanes);
    $("#intersection").attr("lanes", lanes);

}

function loadLinkImage(id, degree)
{
    var flag = $("#intersection").attr("hasLinkImage");
    if (flag === "1")
    {
        var imageURL = $("#intersection").attr("imageURL");
        var pid = "2";
        var lanes = $("#intersection").attr("lanes");
        lanes = JSON.parse(lanes);
        var parent = $("#inRoadList_Normal");
        parent.empty();

        var parentBus = $("#inRoadList_Bus");
        parentBus.empty();

        var parentBike = $("#inRoadList_Bike");
        parentBike.empty();

        var parentIn = $("#outRoadList");
        parentIn.empty();

        id = parseInt(id);
        degree = getCorrectedDegree(degree);
        var info = imageURL + id + "_" + degree + "_" + id + "_" + 0 + "_" + pid + ".png";
        var con = '<li type="in" kind="0" pid="' + pid + '" imageurl="' + info + '" rdegree="' + degree + '" mid="' + id + '" rid="' + id + '" sdegree="' + 0 + '" class="r_li_link"><img src="' + info + '" class="r_tb_link" alt="车道"></li>';
        parent.append(con);

        var info1 = imageURL + id + "_" + degree + "_" + id + "_" + 0 + "_" + pid + "_bus.png";
        var con1 = '<li type="in" kind="1" pid="' + pid + '" imageurl="' + info1 + '" rdegree="' + degree + '" mid="' + id + '" rid="' + id + '" sdegree="' + 0 + '" class="r_li_link"><img src="' + info1 + '" class="r_tb_link" alt="车道"></li>';
        parentBus.append(con1);

        var info2 = imageURL + id + "_" + degree + "_" + id + "_" + 0 + "_" + pid + "_bike.png";
        var con2 = '<li type="in" kind="2" pid="' + pid + '" imageurl="' + info2 + '" rdegree="' + degree + '" mid="' + id + '" rid="' + id + '" sdegree="' + 0 + '" class="r_li_link"><img src="' + info2 + '" class="r_tb_link" alt="车道"></li>';
        parentBike.append(con2);


        var info0 = imageURL + id + "_" + degree + "_" + id + "_" + 0 + "_" + pid + "_in.png";
        var con0 = '<li type="out" kind="0" pid="' + pid + '" imageurl="' + info0 + '" rdegree="' + degree + '" mid="' + id + '" rid="' + id + '" sdegree="' + 0 + '" class="r_li_link"><img src="' + info0 + '" class="r_tb_link" alt="车道"></li>';
        parentIn.append(con0);

        info0 = imageURL + id + "_" + degree + "_" + id + "_" + 0 + "_" + pid + "_in_bus.png";
        con0 = '<li type="out" kind="1" pid="' + pid + '" imageurl="' + info0 + '" rdegree="' + degree + '" mid="' + id + '" rid="' + id + '" sdegree="' + 0 + '" class="r_li_link"><img src="' + info0 + '" class="r_tb_link" alt="车道"></li>';
        parentIn.append(con0);

        info0 = imageURL + id + "_" + degree + "_" + id + "_" + 0 + "_" + pid + "_in_bike.png";
        con0 = '<li type="out" kind="2" pid="' + pid + '" imageurl="' + info0 + '" rdegree="' + degree + '" mid="' + id + '" rid="' + id + '" sdegree="' + 0 + '" class="r_li_link"><img src="' + info0 + '" class="r_tb_link" alt="车道"></li>';
        parentIn.append(con0);


        var dgs=[];
        var cin=0;
        for (var i = 0; i < lanes.length; i++)
        {
            var degree1 = getCorrectedDegree(lanes[i].degree);
            var tid = parseInt(lanes[i].id);
            if (tid === id)
            {
                //info=id+"_"+degree+"D"+info;
                dgs.push(parseInt(0));
                cin=i;
            }
            else
            {
                if (degree - degree1 > 0)
                {
                    info = imageURL + id + "_" + degree + "_" + lanes[i].id + "_" + (360 - (degree - degree1)) + "_" + pid + ".png";
                    con = '<li type="in"  kind="0" pid="' + pid + '" imageurl="' + info + '" rdegree="' + degree + '" mid="' + id + '" rid="' + lanes[i].id + '" sdegree="' + (360 - (degree - degree1)) + '" class="r_li_link"><img src="' + info + '" class="r_tb_link" alt="车道"></li>';


                    info1 = imageURL + id + "_" + degree + "_" + lanes[i].id + "_" + (360 - (degree - degree1)) + "_" + pid + "_bus.png";
                    con1 = '<li type="in"  kind="1" pid="' + pid + '" imageurl="' + info1 + '" rdegree="' + degree + '" mid="' + id + '" rid="' + lanes[i].id + '" sdegree="' + (360 - (degree - degree1)) + '" class="r_li_link"><img src="' + info1 + '" class="r_tb_link" alt="车道"></li>';


                    info2 = imageURL + id + "_" + degree + "_" + lanes[i].id + "_" + (360 - (degree - degree1)) + "_" + pid + "_bike.png";
                    con2 = '<li type="in" kind="2"  pid="' + pid + '" imageurl="' + info2 + '" rdegree="' + degree + '" mid="' + id + '" rid="' + lanes[i].id + '" sdegree="' + (360 - (degree - degree1)) + '" class="r_li_link"><img src="' + info2 + '" class="r_tb_link" alt="车道"></li>';

                    dgs.push(parseInt((360 - (degree - degree1))));


                }
                else
                {
                    info = imageURL + id + "_" + degree + "_" + lanes[i].id + "_" + (degree1 - degree) + "_" + pid + ".png";
                    con = '<li type="in" kind="0" pid="' + pid + '" imageurl="' + info + '" rdegree="' + degree + '" mid="' + id + '" rid="' + lanes[i].id + '" sdegree="' + (degree1 - degree) + '" class="r_li_link"><img src="' + info + '" class="r_tb_link" alt="车道"></li>';


                    info1 = imageURL + id + "_" + degree + "_" + lanes[i].id + "_" + (degree1 - degree) + "_" + pid + "_bus.png";
                    con1 = '<li type="in" kind="1"  pid="' + pid + '" imageurl="' + info1 + '" rdegree="' + degree + '" mid="' + id + '" rid="' + lanes[i].id + '" sdegree="' + (degree1 - degree) + '" class="r_li_link"><img src="' + info1 + '" class="r_tb_link" alt="车道"></li>';


                    info2 = imageURL + id + "_" + degree + "_" + lanes[i].id + "_" + (degree1 - degree) + "_" + pid + "_bike.png";
                    con2 = '<li type="in" kind="2" pid="' + pid + '" imageurl="' + info2 + '" rdegree="' + degree + '" mid="' + id + '" rid="' + lanes[i].id + '" sdegree="' + (degree1 - degree) + '" class="r_li_link"><img src="' + info2 + '" class="r_tb_link" alt="车道"></li>';
                    dgs.push(parseInt((degree1 - degree)));

                }
                parent.append(con);
                parentBus.append(con1);
                parentBike.append(con2);

            }
        }

        $("#inRoadList_Normal li").sort(sort_li_degree).appendTo('#inRoadList_Normal');
        loadDraggable_Intersection_Link();
        lanes[cin].degrees=dgs;
        lanes = JSON.stringify(lanes);
        $("#intersection").attr("lanes",lanes);
        
    }

}

function sort_li_degree(a, b) {
    return ($(b).attr('sdegree')) < ($(a).attr('sdegree')) ? 1 : -1;
}

function getCorrectedDegree(degree)
{
    if (degree >= 0 && degree <= 90) {

        degree = 360 - degree;
        if (degree === 360) {
            degree = 0;
        }
    } else if (degree > 90 && degree <= 180) {

        degree = 360 - degree;
    } else if (degree > 180 && degree <= 270) {

        degree = 360 - degree;
    } else {

        degree = 360 - degree;
    }
    return degree;
}

function generateRoadLinkImage()
{
    var lanes = $("#intersection").attr("lanes");
    lanes = JSON.parse(lanes);
    var id, degree;
    var content = "";
    for (var j = 0; j < lanes.length; j++)
    {
        id = lanes[j].id;
        degree = getCorrectedDegree(lanes[j].degree);
        var info = "";
        var flag = 0;
        for (var i = 0; i < lanes.length; i++)
        {
            var degree1 = getCorrectedDegree(lanes[i].degree);
            if (lanes[i].id === id)
            {
                info = id + "_" + degree + "D" + info;
            }
            else
            {
                if (flag === 0)
                {
                    if (degree - degree1 > 0)
                    {
                        info += lanes[i].id + "_" + (360 - (degree - degree1));
                    }
                    else
                    {
                        info += lanes[i].id + "_" + (degree1 - degree);
                    }
                    flag++;

                }
                else
                {
                    if (degree - degree1 > 0)
                    {
                        info += "#" + lanes[i].id + "_" + (360 - (degree - degree1));
                    }
                    else
                    {
                        info += "#" + lanes[i].id + "_" + (degree1 - degree);
                    }
                    flag++;
                }
            }
        }

        if (content === "")
        {
            content += info;
        }
        else
        {
            content += "L" + info;
        }
    }

    $.post("../../HandleCreateLinkImage", {info: content, pid: "2"}, function (result)
    {

        if (result === "0")
        {
            alert(result);

        }
        else
        {
            $("#intersection").attr("imageURL", result);
            $("#intersection").attr("hasLinkImage", "1");
            alert("道路流向图生成成功");
        }
    });

}


function enCodePonKey(url)
{
    return url.replace(/#/gi, "%23");
}

function getLinkArrowHTML_V1(option, id, type, cindex)
{
    var iconSelect;
    var iconWidth = 30;
    var iconHeight = 15;
    var icons = [];
    if (type === "in")
    {
        var item = document.getElementById("in_image_s_" + id);
        var pitem = document.getElementById("in_rt_link_" + id);
        item.addEventListener('changed', function (e) {
            var ccindex=iconSelect.getSelectedIndex();
            var value=iconSelect.getSelectedValue();
            pitem.setAttribute("value", value);
            pitem.setAttribute("cindex",ccindex );
            updateSingleRoadDriectionInfoLink("in_rt_link_" + id,value,ccindex);
        });
        if (option === 0)
        {
            iconSelect = new IconSelect("in_image_s_" + id,
                    {'selectedIconWidth': iconWidth,
                        'selectedIconHeight': iconHeight,
                        'selectedBoxPadding': 1,
                        'iconsWidth': iconWidth,
                        'iconsHeight': iconHeight,
                        'boxIconSpace': 1,
                        'VECTORAL_ICON_NUMBER': 3,
                        'HORIZONTAL_ICON_NUMBER': 1});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/null.jpg"), 'iconValue': "-1"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/0#0.jpg"), 'iconValue': "0#0"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/0#0#0.jpg"), 'iconValue': "0#0#0"});
            ;
        }
        else if (option === 1)
        {
            iconSelect = new IconSelect("in_image_s_" + id,
                    {'selectedIconWidth': iconWidth,
                        'selectedIconHeight': iconHeight,
                        'selectedBoxPadding': 1,
                        'iconsWidth': iconWidth,
                        'iconsHeight': iconHeight,
                        'boxIconSpace': 1,
                        'VECTORAL_ICON_NUMBER': 17,
                        'HORIZONTAL_ICON_NUMBER': 1});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/null.jpg"), 'iconValue': "-1"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1.jpg"), 'iconValue': "1"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_1.jpg"), 'iconValue': "1_1"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1#1.jpg"), 'iconValue': "1#1"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_1#1.jpg"), 'iconValue': "1_1#1"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1#1#1.jpg"), 'iconValue': "1#1#1"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_1#1#1.jpg"), 'iconValue': "1_1#1#1"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1#1#1#1.jpg"), 'iconValue': "1#1#1#1"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_1#1#1#1.jpg"), 'iconValue': "1_1#1#1#1"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1#1#1#1#1.jpg"), 'iconValue': "1#1#1#1#1"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_1#1#1#1#1.jpg"), 'iconValue': "1_1#1#1#1#1"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1#1#1#1#1#1.jpg"), 'iconValue': "1#1#1#1#1#1"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_1#1#1#1#1#1.jpg"), 'iconValue': "1_1#1#1#1#1#1"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1#1#1#1#1#1#1.jpg"), 'iconValue': "1#1#1#1#1#1#1"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_1#1#1#1#1#1#1.jpg"), 'iconValue': "1_1#1#1#1#1#1#1"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1#1#1#1#1#1#1#1.jpg"), 'iconValue': "1#1#1#1#1#1#1#1"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_1#1#1#1#1#1#1#1.jpg"), 'iconValue': "1_1#1#1#1#1#1#1#1"});

        }
        else if (option === 2)
        {
            iconSelect = new IconSelect("in_image_s_" + id,
                    {'selectedIconWidth': iconWidth,
                        'selectedIconHeight': iconHeight,
                        'selectedBoxPadding': 1,
                        'iconsWidth': iconWidth,
                        'iconsHeight': iconHeight,
                        'boxIconSpace': 1,
                        'VECTORAL_ICON_NUMBER': 32,
                        'HORIZONTAL_ICON_NUMBER': 1});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/null.jpg"), 'iconValue': "-1"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1.jpg"), 'iconValue': "1"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_3.jpg"), 'iconValue': "1_3"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_1.jpg"), 'iconValue': "1_1"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_1_3.jpg"), 'iconValue': "1_1_3"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1#1.jpg"), 'iconValue': "1#1"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1#1_3.jpg"), 'iconValue': "1#1_3"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_1#1.jpg"), 'iconValue': "1_1#1"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_1#1_3.jpg"), 'iconValue': "1_1#1_3"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1#1#1.jpg"), 'iconValue': "1#1#1"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1#1#1_3.jpg"), 'iconValue': "1#1#1_3"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_1#1#1_3.jpg"), 'iconValue': "1_1#1#1_3"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1#1#1#1.jpg"), 'iconValue': "1#1#1#1"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1#1#1#1_3.jpg"), 'iconValue': "1#1#1#1_3"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_1#1#1#1.jpg"), 'iconValue': "1_1#1#1#1"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_1#1#1#1_3.jpg"), 'iconValue': "1_1#1#1#1_3"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1#1#1#1#1.jpg"), 'iconValue': "1#1#1#1#1"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1#1#1#1#1_3.jpg"), 'iconValue': "1#1#1#1#1_3"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_1#1#1#1#1.jpg"), 'iconValue': "1_1#1#1#1#1"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_1#1#1#1#1_3.jpg"), 'iconValue': "1_1#1#1#1#1_3"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1#1#1#1#1#1.jpg"), 'iconValue': "1#1#1#1#1#1"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1#1#1#1#1#1_3.jpg"), 'iconValue': "1#1#1#1#1#1_3"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_1#1#1#1#1#1.jpg"), 'iconValue': "1_1#1#1#1#1#1"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_1#1#1#1#1#1_3.jpg"), 'iconValue': "1_1#1#1#1#1#1_3"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1#1#1#1#1#1#1.jpg"), 'iconValue': "1#1#1#1#1#1#1"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1#1#1#1#1#1#1_3.jpg"), 'iconValue': "1#1#1#1#1#1#1_3"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_1#1#1#1#1#1#1.jpg"), 'iconValue': "1_1#1#1#1#1#1#1"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_1#1#1#1#1#1#1_3.jpg"), 'iconValue': "1_1#1#1#1#1#1#1_3"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1#1#1#1#1#1#1#1.jpg"), 'iconValue': "1#1#1#1#1#1#1#1"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1#1#1#1#1#1#1#1_3.jpg"), 'iconValue': "1#1#1#1#1#1#1#1_3"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_1#1#1#1#1#1#1#1.jpg"), 'iconValue': "1_1#1#1#1#1#1#1#1"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_1#1#1#1#1#1#1#1_3.jpg"), 'iconValue': "1_1#1#1#1#1#1#1#1_3"});

        }
        else if (option === 3)
        {
            iconSelect = new IconSelect("in_image_s_" + id,
                    {'selectedIconWidth': iconWidth,
                        'selectedIconHeight': iconHeight,
                        'selectedBoxPadding': 1,
                        'iconsWidth': iconWidth,
                        'iconsHeight': iconHeight,
                        'boxIconSpace': 1,
                        'VECTORAL_ICON_NUMBER': 32,
                        'HORIZONTAL_ICON_NUMBER': 1});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/null.jpg"), 'iconValue': "-1"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/2.jpg"), 'iconValue': "2"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/2_3.jpg"), 'iconValue': "2_3"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_2.jpg"), 'iconValue': "1_2"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_2_3.jpg"), 'iconValue': "1_2_3"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/2#2.jpg"), 'iconValue': "2#2"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/2#2_3.jpg"), 'iconValue': "2#2_3"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_2#2.jpg"), 'iconValue': "1_2#2"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/2#2#2.jpg"), 'iconValue': "2#2#2"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/2#2#2_3.jpg"), 'iconValue': "2#2#2_3"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_2#2#2.jpg"), 'iconValue': "1_2#2#2"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_2#2#2_3.jpg"), 'iconValue': "1_2#2#2_3"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/2#2#2#2.jpg"), 'iconValue': "2#2#2#2"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/2#2#2#2_3.jpg"), 'iconValue': "2#2#2#2_3"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_2#2#2#2.jpg"), 'iconValue': "1_2#2#2#2"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_2#2#2#2_3.jpg"), 'iconValue': "1_2#2#2#2_3"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/2#2#2#2#2.jpg"), 'iconValue': "2#2#2#2#2"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/2#2#2#2#2_3.jpg"), 'iconValue': "2#2#2#2#2_3"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_2#2#2#2#2.jpg"), 'iconValue': "1_2#2#2#2#2"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_2#2#2#2#2_3.jpg"), 'iconValue': "1_2#2#2#2#2_3"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/2#2#2#2#2#2.jpg"), 'iconValue': "2#2#2#2#2#2"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/2#2#2#2#2#2_3.jpg"), 'iconValue': "2#2#2#2#2#2_3"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_2#2#2#2#2#2.jpg"), 'iconValue': "1_2#2#2#2#2#2"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_2#2#2#2#2#2_3.jpg"), 'iconValue': "1_1#1#1#1#1_3"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/2#2#2#2#2#2#2.jpg"), 'iconValue': "1#1#1#1#1#1"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/2#2#2#2#2#2#2_3.jpg"), 'iconValue': "1#1#1#1#1#1_3"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_2#2#2#2#2#2#2.jpg"), 'iconValue': "1_1#1#1#1#1#1"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_2#2#2#2#2#2#2_3.jpg"), 'iconValue': "1_1#1#1#1#1#1_3"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/2#2#2#2#2#2#2#2.jpg"), 'iconValue': "1#1#1#1#1#1#1"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/2#2#2#2#2#2#2#2_3.jpg"), 'iconValue': "1#1#1#1#1#1#1_3"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_2#2#2#2#2#2#2#2.jpg"), 'iconValue': "1_1#1#1#1#1#1#1"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_2#2#2#2#2#2#2#2_3.jpg"), 'iconValue': "1_1#1#1#1#1#1#1_3"});
        }
        else if (option === 4)
        {

            iconSelect = new IconSelect("in_image_s_" + id,
                    {'selectedIconWidth': iconWidth,
                        'selectedIconHeight': iconHeight,
                        'selectedBoxPadding': 1,
                        'iconsWidth': iconWidth,
                        'iconsHeight': iconHeight,
                        'boxIconSpace': 1,
                        'VECTORAL_ICON_NUMBER': 17,
                        'HORIZONTAL_ICON_NUMBER': 1});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/null.jpg"), 'iconValue': "-1"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/2.jpg"), 'iconValue': "2"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_2.jpg"), 'iconValue': "1_2"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/2#2.jpg"), 'iconValue': "2#2"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_2#2.jpg"), 'iconValue': "1_2#2"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/2#2#2.jpg"), 'iconValue': "2#2#2"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_2#2#2.jpg"), 'iconValue': "1_2#2#2"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/2#2#2#2.jpg"), 'iconValue': "2#2#2#2"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_2#2#2#2.jpg"), 'iconValue': "1_2#2#2#2"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/2#2#2#2#2.jpg"), 'iconValue': "2#2#2#2#2"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_2#2#2#2#2.jpg"), 'iconValue': "1_2#2#2#2#2"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/2#2#2#2#2#2.jpg"), 'iconValue': "2#2#2#2#2#2"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_2#2#2#2#2#2.jpg"), 'iconValue': "1_2#2#2#2#2#2"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/2#2#2#2#2#2#2.jpg"), 'iconValue': "2#2#2#2#2#2#2"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_2#2#2#2#2#2#2.jpg"), 'iconValue': "1_2#2#2#2#2#2#2"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/2#2#2#2#2#2#2#2.jpg"), 'iconValue': "2#2#2#2#2#2#2#2"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_2#2#2#2#2#2#2#2.jpg"), 'iconValue': "1_2#2#2#2#2#2#2#2"});

        }
        else if (option === 5)
        {
            iconSelect = new IconSelect("in_image_s_" + id,
                    {'selectedIconWidth': iconWidth,
                        'selectedIconHeight': iconHeight,
                        'selectedBoxPadding': 1,
                        'iconsWidth': iconWidth,
                        'iconsHeight': iconHeight,
                        'boxIconSpace': 1,
                        'VECTORAL_ICON_NUMBER': 17,
                        'HORIZONTAL_ICON_NUMBER': 1});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/null.jpg"), 'iconValue': "-1"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/3.jpg"), 'iconValue': "3"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/3_3.jpg"), 'iconValue': "3_3"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/3#3.jpg"), 'iconValue': "3#3"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/3#3_3.jpg"), 'iconValue': "3#3_3"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/3#3#3.jpg"), 'iconValue': "3#3#3"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/3#3#3_3.jpg"), 'iconValue': "3#3#3_3"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/3#3#3#3.jpg"), 'iconValue': "3#3#3#3"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/3#3#3#3_3.jpg"), 'iconValue': "3#3#3#3_3"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/3#3#3#3#3.jpg"), 'iconValue': "3#3#3#3#3"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/3#3#3#3#3_3.jpg"), 'iconValue': "3#3#3#3#3_3"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/3#3#3#3#3#3.jpg"), 'iconValue': "3#3#3#3#3#3"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/3#3#3#3#3#3_3.jpg"), 'iconValue': "3#3#3#3#3#3_3"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/3#3#3#3#3#3#3.jpg"), 'iconValue': "3#3#3#3#3#3#3"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/3#3#3#3#3#3#3_3.jpg"), 'iconValue': "3#3#3#3#3#3#3_3"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/3#3#3#3#3#3#3#3.jpg"), 'iconValue': "3#3#3#3#3#3#3#3"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/3#3#3#3#3#3#3#3_3.jpg"), 'iconValue': "3#3#3#3#3#3#3#3_3"});

        }
        else if (option === 6)
        {
            iconSelect = new IconSelect("in_image_s_" + id,
                    {'selectedIconWidth': iconWidth,
                        'selectedIconHeight': iconHeight,
                        'selectedBoxPadding': 1,
                        'iconsWidth': iconWidth,
                        'iconsHeight': iconHeight,
                        'boxIconSpace': 1,
                        'VECTORAL_ICON_NUMBER': 9,
                        'HORIZONTAL_ICON_NUMBER': 1});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/null.jpg"), 'iconValue': "-1"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/3.jpg"), 'iconValue': "3"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/3#3.jpg"), 'iconValue': "3#3"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/3#3#3.jpg"), 'iconValue': "3#3#3"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/3#3#3#3.jpg"), 'iconValue': "3#3#3#3"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/3#3#3#3#3.jpg"), 'iconValue': "3#3#3#3#3"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/3#3#3#3#3#3.jpg"), 'iconValue': "3#3#3#3#3#3"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/3#3#3#3#3#3#3.jpg"), 'iconValue': "3#3#3#3#3#3#3"});
            icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/3#3#3#3#3#3#3#3.jpg"), 'iconValue': "3#3#3#3#3#3#3#3"});

        }
        iconSelect.refresh(icons);
        iconSelect.setSelectedIndex(parseInt(cindex));
    }
    else
    {
        var item = document.getElementById("out_image_s_" + id);
        var pitem = document.getElementById("out_rt_link_" + id);
        item.addEventListener('changed', function (e) {
            var ccindex=iconSelect.getSelectedIndex();
            var value=iconSelect.getSelectedValue();
            pitem.setAttribute("value", value);
            pitem.setAttribute("cindex",ccindex );
            updateSingleRoadDriectionInfoLink("out_rt_link_" + id,value,ccindex);
        });
        iconSelect = new IconSelect("out_image_s_" + id,
                {'selectedIconWidth': iconWidth,
                    'selectedIconHeight': iconHeight,
                    'selectedBoxPadding': 1,
                    'iconsWidth': iconWidth,
                    'iconsHeight': iconHeight,
                    'boxIconSpace': 1,
                    'VECTORAL_ICON_NUMBER': 32,
                    'HORIZONTAL_ICON_NUMBER': 1});
        icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/null.jpg"), 'iconValue': "-1"});
        icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/2.jpg"), 'iconValue': "2"});
        icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/2_3.jpg"), 'iconValue': "2_3"});
        icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_2.jpg"), 'iconValue': "1_2"});
        icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_2_3.jpg"), 'iconValue': "1_2_3"});
        icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/2#2.jpg"), 'iconValue': "2#2"});
        icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/2#2_3.jpg"), 'iconValue': "2#2_3"});
        icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_2#2.jpg"), 'iconValue': "1_2#2"});
        icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/2#2#2.jpg"), 'iconValue': "2#2#2"});
        icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/2#2#2_3.jpg"), 'iconValue': "2#2#2_3"});
        icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_2#2#2.jpg"), 'iconValue': "1_2#2#2"});
        icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_2#2#2_3.jpg"), 'iconValue': "1_2#2#2_3"});
        icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/2#2#2#2.jpg"), 'iconValue': "2#2#2#2"});
        icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/2#2#2#2_3.jpg"), 'iconValue': "2#2#2#2_3"});
        icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_2#2#2#2.jpg"), 'iconValue': "1_2#2#2#2"});
        icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_2#2#2#2_3.jpg"), 'iconValue': "1_2#2#2#2_3"});
        icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/2#2#2#2#2.jpg"), 'iconValue': "2#2#2#2#2"});
        icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/2#2#2#2#2_3.jpg"), 'iconValue': "2#2#2#2#2_3"});
        icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_2#2#2#2#2.jpg"), 'iconValue': "1_2#2#2#2#2"});
        icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_2#2#2#2#2_3.jpg"), 'iconValue': "1_2#2#2#2#2_3"});
        icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/2#2#2#2#2#2.jpg"), 'iconValue': "2#2#2#2#2#2"});
        icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/2#2#2#2#2#2_3.jpg"), 'iconValue': "2#2#2#2#2#2_3"});
        icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_2#2#2#2#2#2.jpg"), 'iconValue': "1_2#2#2#2#2#2"});
        icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_2#2#2#2#2#2_3.jpg"), 'iconValue': "1_1#1#1#1#1_3"});
        icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/2#2#2#2#2#2#2.jpg"), 'iconValue': "1#1#1#1#1#1"});
        icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/2#2#2#2#2#2#2_3.jpg"), 'iconValue': "1#1#1#1#1#1_3"});
        icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_2#2#2#2#2#2#2.jpg"), 'iconValue': "1_1#1#1#1#1#1"});
        icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_2#2#2#2#2#2#2_3.jpg"), 'iconValue': "1_1#1#1#1#1#1_3"});
        icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/2#2#2#2#2#2#2#2.jpg"), 'iconValue': "1#1#1#1#1#1#1"});
        icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/2#2#2#2#2#2#2#2_3.jpg"), 'iconValue': "1#1#1#1#1#1#1_3"});
        icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_2#2#2#2#2#2#2#2.jpg"), 'iconValue': "1_1#1#1#1#1#1#1"});
        icons.push({'iconFilePath': enCodePonKey("./roadSym/arrow/1_2#2#2#2#2#2#2#2_3.jpg"), 'iconValue': "1_1#1#1#1#1#1#1_3"});
        iconSelect.refresh(icons);
        iconSelect.setSelectedIndex(parseInt(cindex));
    }

}

function getDegreeByIndex(degrees, degree,index)
{
    degree=parseInt(degree);
    for(var i=0;i<degrees.length;i++)
    {
        if(degrees[i]===degree)
        {
            if(i+index>=0&&i+index<degrees.length)
            {
                return parseInt(degrees[i-1]);
            }
            else
            {
                return false;
            }
        }
        
    }
    return false;
}

function sortNumber(a,b) {
    return a - b;
}

function getSingleLaneInfo(laneinfo, degrees)
{
    degrees.sort(sortNumber);
    var in_length, out_length, all_length;
    all_length = laneinfo.length;
    var in_info = "", out_infos =[], infos = [];
    if (all_length <= 0)
    {
        alert("你的车道还没进行车道设置");
        return false;
    }
    else
    {
        var preDegrees = [];
        for (var i = 0; i < laneinfo.length; i++)
        {
            var item = laneinfo[i];
            if (item.type === "in")
            {
                if (parseInt(item.cindex) === 0)
                {
                    preDegrees.push(parseInt(item.sdegree));
                }
                else
                {
                    var value = item.value;
                    var vas = value.split("#");
                    for (var j = 0; j < vas.length; j++)
                    {
                        var las = vas[j].split("_");
                        var cont = [];
                        var oindex = 0;
                        for (var z = 0; z < las.length; z++)
                        {
                            if (item.direction.startsWith(las[z]))
                            {
                                oindex = z;
                            }
                        }
                        if (oindex > 1)
                        {
                            for (var z = oindex - 1; z >= 0; z--)
                            {
                                var temD = getDegreeByIndex(degrees, item.sdegree, (z - oindex));
                                if (temD === false)
                                {
                                    alert("车道配置不正确");
                                    return false;
                                }
                                else
                                {
                                    cont.push(getDegreeByIndex(degrees, item.sdegree, (z - oindex)));
                                }
                            }
                        }
                        cont.push(parseInt(item.sdegree));
                        if (oindex + 1 < las.length)
                        {
                            for (var z = oindex + 1; z < las.length; z++)
                            {
                                var temD = getDegreeByIndex(degrees, item.sdegree, (z - oindex));
                                if (temD === false)
                                {
                                    alert("车道配置不正确");
                                    return false;
                                }
                                else
                                {
                                    cont.push(getDegreeByIndex(degrees, item.sdegree, (z - oindex)));
                                }
                            }
                        }

                        if (j === 0)
                        {
                            cont = preDegrees.concat(cont);
                            preDegrees = [];
                        }

                        var elem = {direction: item.direction, degrees: cont, type: "in"};
                        infos.push(elem);
                    }
                }
            }
            else
            {
                var value = item.value;
                var vas = value.split("#");
                for (var j = 0; j < vas.length; j++)
                {
                    var las = vas[j].split("_");
                    for (var z = 0; z < las.length; z++)
                    {
                        var elem = {direction: item.direction, degrees: [], type: "out"};
                        out_infos.push(elem);
                    }


                }

            }
        }
    }
    
    
    var outs="";
    for(var i=0;i<out_infos.length;i++)
    {
        if(outs==="")
        {
            outs+=out_infos[i].direction;
        }
        else
        {
            outs+="_"+out_infos[i].direction;
        }
    }
    
    for(var i=0;i<infos.length;i++)
    {
        if(outs==="")
        {
            outs+=infos[i].direction+"A";
            var degreess=infos[i].degrees;
            for(var j=0;j<degreess.length;j++)
            {
                if(j===0)
                {
                    outs+=degreess[j];
                }
                else
                {
                    outs+="K"+degreess[j];
                }
            }
        }
        else
        {
            outs+="_"+infos[i].direction+"A";
            var degreess=infos[i].degrees;
            for(var j=0;j<degreess.length;j++)
            {
                if(j===0)
                {
                    outs+=degreess[j];
                }
                else
                {
                    outs+="K"+degreess[j];
                }
            }
        }
    }
    return outs;
}

function updateMergeLine()
{
    var lanes = $("#intersection").attr("lanes");

    if (lanes === "")
    {
        return "";
    }
    lanes = JSON.parse(lanes);
    lanes.sort(function (a, b) {
        return parseInt(a.degree) - parseInt(b.degree);
    });
    for (var i = 0; i < lanes.length; i++)
    {
        var items = lanes[i].laneinfo;
        
        var left=0, right=0;
        for(var j=0;j<items.length;j++)
        {
            left+=parseInt(items[j].left);
            right+=parseInt(items[j].right);
        }
        
        lanes[i].leftmergeline=left;
        lanes[i].rightmergeline=right;
    }
    
    lanes=JSON.stringify(lanes);
    $("#intersection").attr("lanes",lanes);
}

function getModifiedLanesInfos()
{
    updateMergeLine();
    var lanes = $("#intersection").attr("lanes");

    if (lanes === "")
    {
        return "";
    }
    lanes = JSON.parse(lanes);
    lanes.sort(function (a, b) {
        return parseInt(a.degree) - parseInt(b.degree);
    });
    var info = "";
    for (var i = 0; i < lanes.length; i++)
    {
        var item = lanes[i];
        if (item.laneinfo === "")
        {
            return "";
        }
        if (info === "")
        {
            info += item.id + "_" + item.name + "_" + item.degree + "_" + item.yellowline + "_" + item.walkline + "_" + item.bikeline + "_" + item.walksafearea +
                    "_" + item.leftmergeline + "_" + item.rightmergeline + "_" + item.inleftmergeline + "_" + item.inrightmergeline + "_" + item.waitleftarea + "#";
            var out=getSingleLaneInfo(item.laneinfo,item.degrees);
            if(out===false)
            {
                return "";
            }
            else
            {
                info+=out;
            }
        }
        else
        {
            info += "L" + item.id + "_" + item.name + "_" + item.degree + "_" + item.yellowline + "_" + item.walkline + "_" + item.bikeline + "_" + item.walksafearea +
                    "_" + item.leftmergeline + "_" + item.rightmergeline + "_" + item.inleftmergeline + "_" + item.inrightmergeline + "_" + item.waitleftarea + "#";
            var out=getSingleLaneInfo(item.laneinfo,item.degrees);
            if(out===false)
            {
                return "";
            }
            else
            {
                info+=out;
            }
        }
    }

    return info;
}

function createNewIntersectionImage()
{
    var content;
    content = '<div class="modal-dialog">'

            + '<div class="modal-content">'
            + '<div class="modal-header">'
            + '<button type="button" class="close" data-dismiss="modal">&times;</button>'
            + '<h4 class="modal-title">请填写你要创建的交叉口的信息:</h4>'
            + '</div>'
            + '<div class="modal-body">'
            + '<table class="table table-condensed" style="border:none;width:100%;">'
            + '<tbody>'
            + '<tr>'
            + '<td style="border:none">交叉口名称:</td><td style="border:none"><input id="intersection_image_name" type="text"></td>'
            + '</tr>'
            + '<tr>'
            + '<td style="border:none">交叉口位置:</td>'
            + '<td style="border:none"><input type="text" id="add_nav_car_min_length">--<input type="text" id="add_nav_car_max_length">米</td>'
            + '</tr>'
            + '</tbody>'
            + '</table>';
    content += '</div>'
            + '<div class="modal-footer">'
            + '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>'

            + '<button type="button" class="btn btn-default" onclick="confirmNewIntersectionImage()">确定</button>'
            + '</div>'
            + '</div>'
            + '</div>';

    var dig = document.getElementById("myModalSurvey");
    dig.innerHTML = "";
    dig.innerHTML = content;
    $("#myModalSurvey").modal();
}


function confirmNewIntersectionImage()
{

}
function loadAllIntersectionImages()
{
    $.post("../../HandleGetAllIntersectionImage", {pid: 0}, function (result)
    {

        if (result === "0")
        {
            //alert(result);
        }
        else
        {
            var images = JSON.parse(result);
            $("#intersection_image_table").empty();
            var content = "<tr><td>交叉口渠化名称</td><td>交叉口渠化时间</td><td>交叉口渠化操作</td></td></tr>";
            for (var i = 0; i < images.length; i++)
            {
                content += '<tr id="intersection_image_' + images[i].id + '" laneinfo="' + images[i].laneinfo + '" xcenter="' + images[i].xcenter + '" ycenter="' + images[i].ycenter + '">';
                content += '<td><a href="javascript:void(0);" onclick="showIntersectionImage(\'' + images[i].id + '\')">' + images[i].name + '</a></td>';
                content += '<td><span>' + images[i].dtime + '</span></td>';
                content += '<td><i class="fa fa-trash fa-2x" aria-hidden="true" onclick="deleteIntersectionImage(\'' + images[i].id + '\')"></i></td></tr>';
            }
            //$("#task_info").attr("imgPath", img[1]);
            $("#intersection_image_table").html(content);
        }
    });
}

function showIntersectionImage(id)
{
    var item = $("#intersection_image_" + id);
    $("#intersection_quhua").show();
    $("#intersection_quhua").attr("xcenter", item.attr("xcenter"));
    $("#intersection_quhua").attr("ycenter", item.attr("ycenter"));
    setLanesObject(item.attr("laneinfo"));
}

function deleteIntersectionImage(id)
{
    if (cf("你确定要删除这个交叉口渠化草绘吗？"))
    {
        $.post("../../HandleModifyIntersectionImage", {id: id}, function (result)
        {

            if (result === "0")
            {
                //alert(result);
            }
            else
            {
                loadAllIntersectionImages();
                //$("#task_info").attr("imgPath", img[1]);
            }
        });
    }
}

function getStartIntersectionImage1(event)
{
    var flag = $("#img_result").attr("move");
    if (flag === "1")
    {
        var x = event.clientX;
        var y = event.clientY;
        var position = $("#img_result").offset();
        var xi = parseInt(x - position.left);
        var yi = parseInt(y - position.top);
        $("#intersection_quhua").attr("xstart", xi);
        $("#intersection_quhua").attr("ystart", yi);
    }
}

function movingIntersectionImage1(event)
{
    var flag = $("#img_result").attr("move");
    if (flag === "1")
    {

        var xstart = parseInt($("#intersection_quhua").attr("xstart"));
        var ystart = parseInt($("#intersection_quhua").attr("ystart"));
        var xcenter = parseInt($("#intersection_quhua").attr("xcenter"));
        var ycenter = parseInt($("#intersection_quhua").attr("ycenter"));
        var x = event.clientX;
        var y = event.clientY;
        var position = $("#img_result").offset();
        var data = $("#intersection").attr("laneinfo");

        var xi = parseInt(x - position.left);
        var yi = parseInt(y - position.top);
        var data1 = (xi - xstart + xcenter) + "_" + (yi - ystart + ycenter) + "D" + data;
        $.post("../../HandleCreateIntersection", {data: data1, pid: 0}, function (result)
        {

            if (!result.startsWith("1?"))
            {
                alert(result);
            }
            else
            {
                $("#intersection").attr("laneInfo", data);
                $("#intersection_quhua").attr("xcenter", (xi - xstart + xcenter));
                $("#intersection_quhua").attr("ycenter", (yi - ystart + ycenter));
                var img = result.split("?");
                $("#img_result").attr('src', img[1] + '?t=' + new Date().getTime());
                //$("#task_info").attr("imgPath", img[1]);
            }
        });
    }

    //alert(coords + " X: " + position.left + " Y: " + position.top);
}

function generateIntersection1()
{
    var data = getModifiedLanesInfos();
    var xcenter = $("#intersection_quhua").attr("xcenter");
    var ycenter = $("#intersection_quhua").attr("ycenter");
    var data1 = xcenter + "_" + ycenter + "D" + data;
    if (data !== "")
    {
        $.post("../../HandleCreateIntersection", {data: data1, pid: 0}, function (result)
        {

            if (!result.startsWith("1?"))
            {
                alert(result);

            }
            else
            {
                $("#intersection").attr("laneInfo", data);
                var img = result.split("?");
                $("#img_result").attr('src', img[1] + '?t=' + new Date().getTime());
                //$("#task_info").attr("imgPath", img[1]);
            }
        });
    }
    else
    {
        alert("请确保你已经初始化了所有车道！");
    }
}


function showIntersection(address, city)
{
    initMap_Intersection(address,city);
    
    if(address==="")
    {
        showIntersection_Nav();
    }
}
function initMap_Intersection(caddress, city)
{
    map = new BMap.Map("l-map");
    map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
    map.enableContinuousZoom();
    var size = new BMap.Size(10, 20);
    map.addControl(new BMap.CityListControl({
        anchor: BMAP_ANCHOR_TOP_LEFT,
        offset: size,
        // 切换城市之间事件
        // onChangeBefore: function(){
        //    alert('before');
        // },
        // 切换城市之后事件
        // onChangeAfter:function(){
        //   alert('after');
        // }
    }));

//    var navigationControl = new BMap.NavigationControl({
//        // 靠左上角位置
//        anchor: BMAP_ANCHOR_TOP_RIGHT,
//        // LARGE类型
//        type: BMAP_NAVIGATION_CONTROL_LARGE,
//        // 启用显示定位
//        enableGeolocation: true
//    });
//    map.addControl(navigationControl);
    // 添加定位控件
    var geolocationControl = new BMap.GeolocationControl();
    geolocationControl.addEventListener("locationSuccess", function (e) {
        // 定位成功事件
        var address = '';
        address += e.addressComponent.province;
        address += e.addressComponent.city;
        address += e.addressComponent.district;
        address += e.addressComponent.street;
        address += e.addressComponent.streetNumber;
        alert("当前定位地址为：" + address);
    });
    geolocationControl.addEventListener("locationError", function (e) {
        // 定位失败事件
        alert(e.message);
    });
    map.addControl(geolocationControl);
    MyControl.prototype = new BMap.Control();
    MyControl.prototype.initialize = function (map) {
        var div = document.createElement("div");
        div.innerHTML = "<div class='nav_map_bar' style='display:block' flag='false' id='nav_tb_map'>\n\
         <img id='road_intersection_id' flag='0' onclick='selectIntersection_Intersection()' class='mapICON' src='./mapIcon/intersection_tb.png'>\n\
        </div>";

        div.style.cursor = "pointer";
        map.getContainer().appendChild(div);
        // 将DOM元素返回  
        return div;
    };

    map.addControl(new BMap.MapTypeControl());
    var myCtrl = new MyControl();
    map.addControl(myCtrl);
    if (caddress === "")
    {
        var point = new BMap.Point(116.400244, 39.92556);
        map.centerAndZoom(point, 14);
        map.setCurrentCity("北京");
    }
    else
    {
        map.centerAndZoom(caddress, 14);
        map.setCurrentCity(city);
    }



//    var marker = new BMap.Marker(point);// 创建标注
//    map.addOverlay(marker);             // 将标注添加到地图中
    //marker.disableDragging();
    var styleOptions = {
        strokeColor: "red", //边线颜色。
        fillColor: "red", //填充颜色。当参数为空时，圆形将没有填充效果。
        strokeWeight: 3, //边线的宽度，以像素为单位。
        strokeOpacity: 0.8, //边线透明度，取值范围0 - 1。
        fillOpacity: 0.6, //填充的透明度，取值范围0 - 1。
        strokeStyle: 'solid' //边线的样式，solid或dashed。
    };

    function clearAll() {
        for (var i = 0; i < overlays.length; i++) {
            map.removeOverlay(overlays[i]);
        }
        overlays.length = 0;
    }
    var overlays = [];
    var overlay = null;
    var drawPoint = null;
    var points = [];

    function drawSeg()
    {

        overlays.push(overlay);
        var myIcon = new BMap.Icon("./mapIcon/seg_tb.png", new BMap.Size(iconW, iconH));
        var path = overlay.getPath();//Array<Point> 返回多边型的点数组
        var spoint_seg, epoint_seg;
        var marker = null;
        for (var i = 0; i < path.length; i++) {
            if (i === 0)
            {
                spoint_seg = new BMap.Point(path[i].lng, path[i].lat);
            }
            if (i + 1 === path.length)
            {
                epoint_seg = new BMap.Point(path[i].lng, path[i].lat);
            }
        }
        clearAll();

        var degree = getAngle(spoint_seg.lat, spoint_seg.lng, epoint_seg.lat, epoint_seg.lng);
        var point_seg = new BMap.Point((spoint_seg.lng + epoint_seg.lng) / 2, (spoint_seg.lat + epoint_seg.lat) / 2);
        $("#mainSurveyPage").attr("lat", (spoint_seg.lng + epoint_seg.lng) / 2);
        $("#mainSurveyPage").attr("lng", (spoint_seg.lat + epoint_seg.lat) / 2);
        currentPoint = point_seg;
        var sContent = '<div class="model_info_tb">\n\
                <a class="model_info_tb_add" href="javascript:void(0);" onclick="createSegModel(\'0\',\'' + point_seg.lat + '\',\'' + point_seg.lng + '\',\'' + degree + '\')"><i class="icon-icon-add" data-toggle="tooltip" data-placement="bottom" title="新建调查"></i></a>\n\
                <a class="model_info_tb_add" href="javascript:void(0);" onclick="pasteCurrentModel(\'' + point_seg.lat + '\',\'' + point_seg.lng + '\')"><i class="icon-icon-paste" data-toggle="tooltip" data-placement="bottom" title="粘贴调查"></i></a>\n\
                <a class="model_info_tb_add" href="javascript:void(0);" onclick="deleteCurrentModel()"><i class="icon-icon-delete" data-toggle="tooltip" data-placement="bottom" title="删除调查"></i></a></br>';
        marker = new BMap.Marker(point_seg, {icon: myIcon});
        currentMarker = marker;
        marker.enableDragging();
        map.addOverlay(marker);
        marker.addEventListener("mouseover", function (e) {
            onIcon = true;

        });
        marker.addEventListener("mouseout", function (e) {

            onIcon = false;

        });

        var infoWindow = new BMap.InfoWindow(sContent);
        marker.addEventListener("click", function () {
            currentMarker = this;
            this.openInfoWindow(infoWindow);
        });

        marker.addEventListener("dragend", function () {
            var pos = marker.getPosition();
            var newContent = '<div class="model_info_tb">\n\
                <a class="model_info_tb_add" href="javascript:void(0);" onclick="createSegModel(\'0\',\'' + pos.lat + '\',\'' + pos.lng + '\')"><i class="icon-icon-add" data-toggle="tooltip" data-placement="bottom" title="新建调查"></i></a>\n\
                <a class="model_info_tb_add" href="javascript:void(0);" onclick="pasteCurrentModel(\'' + pos.lat + '\',\'' + pos.lng + '\')"><i class="icon-icon-paste" data-toggle="tooltip" data-placement="bottom" title="粘贴调查"></i></a>\n\
                <a class="model_info_tb_add" href="javascript:void(0);" onclick="deleteCurrentModel()"><i class="icon-icon-delete" data-toggle="tooltip" data-placement="bottom" title="删除调查"></i></a></br>';
            infoWindow = new BMap.InfoWindow(newContent);
            currentMarker = this;
        });
        points.length = 0;
        drawPoint.length = 0;
        overlay = null;


    }

    //添加鼠标绘制工具监听事件，用于获取绘制结果
    var mousemoveAction = function (e) {
        if (isSegClick && !onIcon)
        {
            overlay.setPositionAt(drawPoint.length - 1, e.point);
        }
    };

    var isSegClick = false;
    map.addEventListener("click", function (e) {
        var inter_check = $("#road_intersection_id").attr("flag");
        //var seg_check = $("#road_seg_id").attr("flag");
        if (inter_check === "1" && !onIcon)
        {
            var sContent = '<div class="model_info_tb">\n\
                <a class="model_info_tb_add" href="javascript:void(0);" onclick="createIntersectionModel_Intersection(\'0\',\'' + e.point.lat + '\',\'' + e.point.lng + '\')"><i class="icon-icon-add" data-toggle="tooltip" data-placement="bottom" title="新建交叉口草绘"></i></a>\n\
                <a class="model_info_tb_add" href="javascript:void(0);" onclick="pasteCurrentModel(\'' + e.point.lat + '\',\'' + e.point.lng + '\')"><i class="icon-icon-paste" data-toggle="tooltip" data-placement="bottom" title="粘贴交叉口草绘"></i></a>\n\
                <a class="model_info_tb_add" href="javascript:void(0);" onclick="deleteCurrentModel()"><i class="icon-icon-delete" data-toggle="tooltip" data-placement="bottom" title="删除交叉口草绘"></i></a></br>';

            var point = new BMap.Point(e.point.lng, e.point.lat);
//            $("#mainSurveyPage").attr("lat",e.point.lat);
//            $("#mainSurveyPage").attr("lng",e.point.lng);
            currentPoint = point;
            var myIcon = new BMap.Icon("./mapIcon/intersection_tb.png", new BMap.Size(iconW, iconH));
            var marker = new BMap.Marker(point, {icon: myIcon});
            currentMarker = marker;
            marker.enableDragging();
            map.addOverlay(marker);
            var infoWindow = new BMap.InfoWindow(sContent);
            marker.addEventListener("click", function () {
                this.openInfoWindow(infoWindow);
                currentMarker = this;
            });

            marker.addEventListener("dragend", function () {
                var pos = marker.getPosition();
                var newContent = '<div class="model_info_tb">\n\
                <a class="model_info_tb_add" href="javascript:void(0);" onclick="createIntersectionModel(\'0\',\'' + pos.lat + '\',\'' + pos.lng + '\')"><i class="icon-icon-add" data-toggle="tooltip" data-placement="bottom" title="新建调查"></i></a>\n\
                <a class="model_info_tb_add" href="javascript:void(0);" onclick="pasteCurrentModel(\'' + pos.lat + '\',\'' + pos.lng + '\')"><i class="icon-icon-paste" data-toggle="tooltip" data-placement="bottom" title="粘贴调查"></i></a>\n\
                <a class="model_info_tb_add" href="javascript:void(0);" onclick="deleteCurrentModel()"><i class="icon-icon-delete" data-toggle="tooltip" data-placement="bottom" title="删除调查"></i></a></br>';
                infoWindow = new BMap.InfoWindow(newContent);
                currentMarker = this;
            });

            marker.addEventListener("mouseover", function (e) {
                onIcon = true;
            });
            marker.addEventListener("mouseout", function (e) {
                onIcon = false;
            });
        }

        if (seg_check === "1" && !onIcon)
        {
            if (!isSegClick)
            {
                points.push(e.point);
                drawPoint = points.concat(points[points.length - 1]);
                if (points.length === 1) {
                    overlay = new BMap.Polyline(drawPoint, styleOptions);
                    map.addOverlay(overlay);
                } else {
                    overlay.setPath(drawPoint);
                }
                isSegClick = true;
            }
            else
            {
                points.push(e.point);
                drawPoint = points.concat(points[points.length - 1]);
                isSegClick = false;
                overlay.setPath(points);
                drawSeg();

            }
        }
    });

    map.addEventListener('mousemove', mousemoveAction);


//    var ac = new BMap.Autocomplete(//建立一个自动完成的对象
//            {"input": "suggestId"
//                , "location": map
//            });
//
//    ac.addEventListener("onhighlight", function (e) {  //鼠标放在下拉列表上的事件
//        var str = "";
//        var _value = e.fromitem.value;
//        var value = "";
//        if (e.fromitem.index > -1) {
//            value = _value.province + _value.city + _value.district + _value.street + _value.business;
//        }
//        str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
//
//        value = "";
//        if (e.toitem.index > -1) {
//            _value = e.toitem.value;
//            value = _value.province + _value.city + _value.district + _value.street + _value.business;
//        }
//        str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
//        G("searchResultPanel").innerHTML = str;
//    });
//
//
//    ac.addEventListener("onconfirm", function (e) {    //鼠标点击下拉列表后的事件
//        var _value = e.item.value;
//        myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
//        G("searchResultPanel").innerHTML = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
//
//        setPlace();
//    });


}

function createIntersectionModel_Intersection(option, lat, lng)
{
    $("#mapShowSection").hide();
    createIntersectionModel_PIC_V1(lat, lng);
    $("#bodyOne").keydown(function (event) {
        var isIntersection = $("#intersection_quhua").is(':visible');
        if (isIntersection)
        {
            if (event.which === 27)
            {
                enableResetLink();
                var isMoving = $("#img_result").attr("move");
                if (isMoving === "1")
                {
                    $("#img_result").attr("move", "0");
                    $("#img_result").css("cursor", "default");
                }
            }


        }
    });
}

function selectIntersection_Intersection()
{
    //drawSeg.close();
    var flag = $("#road_intersection_id").attr("flag");
    if (flag === "0")
    {
        $("#road_intersection_id").attr("flag", "1");
        //$("#road_seg_id").attr("flag", "0");
        map.setDefaultCursor("crosshair");

        var objP = document.getElementById("road_intersection_id");
        objP.setAttribute("class", "mapICONBorder");

        


    }
    else
    {
        var objP = document.getElementById("road_intersection_id");
        objP.setAttribute("class", "mapICON");
        $("#road_intersection_id").attr("flag", "0");
        //$("#road_seg_id").attr("flag", "0");

    }
}

function createIntersectionProject()
{
    showIntersection_Nav();
}


function showProjectListDiag_Intersection()
{
    var id = $("#mainSurveyPage").attr("pid");
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
            var dig = document.getElementById("myModalSurvey");
            dig.innerHTML = getProjectListModal_Intersection(result);
            $('#myModalSurvey').modal({backdrop: 'static', keyboard: false});
        }
        //$("span").html(result);
    });
}

function getProjectListModal_Intersection(result)
{
    var content;
    content = '<div class="modal-dialog">'

            + '<div class="modal-content">'
            + '<div class="modal-header">'
            + '<h4 class="modal-title">请选择存储项目的位置</h4>'
            + '</div>'
            + '<div class="modal-body">'

            + result;
    content += '</div>'
            + '<div class="modal-footer">'
            + '<button type="button" class="btn btn-default" onclick="closeModal_Intersection()">关闭</button>'

            + '<button type="button" class="btn btn-default" id="smp5" onclick="doMoveFile_Intersection()">确定</button>'
            + '</div>'
            + '</div>'
            + '</div>';
    return content;

}

function closeModal_Intersection()
{
    updateIntersection_Nav();
}


function doMoveFile_Intersection()
{
    var parent = document.getElementById("projectList");
    var target = parent.getAttribute("currentActive");
    $("#mainSurveyPage").attr("parentID", target);
    var id = $("#mainSurveyPage").attr("pid");
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
            if (cf("目标文件夹存在相同项目名称，系统将会重名要移动的项目为--" + names[1] + ", 请确定你的选择？"))
            {
                flag = true;
                //$("#p_Name").val(names[1]);
                $("#mainSurveyPage").attr("p_Name", names[1]);
                updateIntersection_Nav();
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
            $.post("../../HandleProjectPath", {pid: target}, function (re1)
            {
                if (re1 === "0")
                {
                    alert("系统出现错误，请重新尝试");
                }
                else
                {
                    $("#p_path").val(re1);
                    $("#mainSurveyPage").attr("parentPath", re1);
                   // $('#myModalSurvey').modal("hide");
                    updateIntersection_Nav();
                }
            });
        }
        else
        {
            alert("系统出现错误，请重新尝试");
        }
    });

}

function updateIntersection_Nav()
{
    var content = "";
    var name=$("#mainSurveyPage").attr("p_Name");
    var path=$("#mainSurveyPage").attr("parentPath");
    var content1 = '<div  style="text-align: left" id="basic_project_info" stid="0">'
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
            + '<td style="border:none">项目存储位置:</td>'
            + '<td style="border:none"><input type="text" name="pName" id="p_path" value="">&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" class="btn btn-success" onclick="showProjectListDiag_Intersection();">浏览</button></td>'
            + '</tr>'
            + '<tr>'
            + '<td colspan="2" style="border:none"><button type="button" class="btn btn-success" onclick="createNewIntersectionProject()">确定</button></td>'
            + '</tr>'
            + '</tbody>'
            + '</table>'
            + '</div>';
    
    content = '<div class="modal-dialog">'

            + '<div class="modal-content">'
            + '<div class="modal-header">'
            + '<button type="button" class="close" data-dismiss="modal">&times;</button>'
            + '<h4 class="modal-title">请填写你要创建的交叉口的信息:</h4>'
            + '</div>'
            + '<div class="modal-body">'
            +content1;
    content += '</div>'
            + '<div class="modal-footer">'
            + '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>'

            + '</div>'
            + '</div>'
            + '</div>';

    var dig = document.getElementById("myModalSurvey");
    dig.innerHTML = "";
    dig.innerHTML = content;
     $("#city2").citySelect({prov: "北京", nodata: "none"});
     $("#p_path").val(path);
     $("#p_Name").val(name);
}
function createNewIntersectionProject()
{
    var pp_id=$("#mainSurveyPage").attr("parentID");
    var type =4;
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
    var stime = "";
    var etime = "";
    var budget =0;
    var data = '{"stime":"' + stime + '","etime":"' + etime + '","name":"' + name + '","id":"' + 0 + '","budget":"' + budget + '","province":"' + province + '","city":"' + city + '","town":"' + town + '","pid":"' + 0 + '","parentID":"' + pp_id + '","description":"' + description + '"}';
    
    if (type === 0 || name === "")
    {
        alert("请先选择你要创建的项目类型/填写项目的名称");
    }
    else
    {
        if (checkFileNameFormat(name) && !name.includes('.'))
        {
            $.post("../../HandleCreateNewFolder", {name: name, ppid: pp_id, type: type,data:data}, function (result)
            {

                if (result === "-1")
                {
                    alert(name + " 此项目创建失败，请重新创建");

                }
                else if (result === "2")
                {
                    alert(name + " 已经存在，请修改名字！");
                }
                else if (result === "4")
                {
                    alert(name + "写入数据发生错误！");
                }
                else if (result.startsWith("0"))
                {
                    $("#myModal").modal("hide");
                    var outs = result.split("?");
                   var win = window.open("intersection.jsp?id="+outs[2], '_blank');
    win.focus();
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
function showIntersection_Nav()
{
    updateIntersection_Nav();
    $('#myModalSurvey').modal({backdrop: 'static', keyboard: false});
    $("#myModalSurvey").modal();
}