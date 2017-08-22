/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var isPoint = false;
var isLine = false;
var isStartPoint = false;
var isEndPoint = false;
var isLaneSelect = false;
var startPoint, endPoint;
var sC, eC;
var selectedCircle = null, selectPoint = null;
var allPoints = [];
var map;
var addressIntersection;
var isIntersection = false;
var isLaneSeg = false;
var isLight = false;

var iconW = 60;
var iconH = 77;

var dbcheck = false;
var infoModels = null;
var removeCircle = function (e, ee, marker) {
    var p = marker.getCenter();
    deletePoint(p.lng, p.lat);
    map.removeOverlay(marker);
};

var removeMarker = function (e, ee, marker) {

    map.removeOverlay(marker);
};

var removeLine = function (e, ee, marker) {
    var ps = marker.getPath();
    deletePointRelation(ps[0].lng, ps[0].lat, ps[1].lng, ps[1].lat);
    map.removeOverlay(marker);
};

function MyControl() {
    // 设置默认停靠位置和偏移量  
    this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;//设置控件默认位置
    this.defaultOffset = new BMap.Size(300, 23);//设置偏移
}

function MyPoint(lng, lat)
{
    this.lng = lng;
    this.lat = lat;
    this.list = [];
}

function getPoint(lng, lat)
{
    var lngg1 = String(lng);
    var latt1 = String(lat);
    for (var i = 0; i < allPoints.length; i++)
    {
        if (allPoints[i] !== undefined && allPoints[i].lng === lngg1 && allPoints[i].lat === latt1)
        {
            return allPoints[i];
        }

    }
}

function deletePoint(lng, lat)
{
    var lngg = String(lng);
    var latt = String(lat);
    for (var i = 0; i < allPoints.length; i++)
    {
        if (allPoints[i] !== undefined && allPoints[i].lng === lngg && allPoints[i].lat === latt)
        {
            delete allPoints[i];
        }
        else if (allPoints[i] !== undefined)
        {
            var lists = allPoints[i].list;
            for (var j = 0; j < lists.length; j++)
            {
                if (lists[j] !== undefined && lists[j].lng === lngg && lists[j].lat === latt)
                {
                    delete lists[j];
                    break;
                }
            }
        }

    }
}

function deletePointRelation(lng1, lat1, lng2, lat2)
{
    var lngg1 = String(lng1);
    var latt1 = String(lat1);
    var lngg2 = String(lng2);
    var latt2 = String(lat2);
    for (var i = 0; i < allPoints.length; i++)
    {
        if (allPoints[i] !== undefined && allPoints[i].lng === lngg1 && allPoints[i].lat === latt1)
        {
            var lists = allPoints[i].list;
            for (var j = 0; j < lists.length; j++)
            {
                if (lists[j] !== undefined && lists[j].lng === lngg2 && lists[j].lat === latt2)
                {
                    delete lists[j];
                    break;
                }
            }
        }



    }

    for (var i = 0; i < allPoints.length; i++)
    {
        if (allPoints[i] !== undefined && allPoints[i].lng === lngg2 && allPoints[i].lat === latt2)
        {
            var lists = allPoints[i].list;
            for (var j = 0; j < lists.length; j++)
            {
                if (lists[j] !== undefined && lists[j].lng === lngg1 && lists[j].lat === latt1)
                {
                    delete lists[j];
                    break;
                }
            }
        }
    }
}

function clearSelectColor()
{
    if (selectedCircle !== null)
    {
        selectedCircle.setFillColor("blue");
    }
}

function addPointRelation(lng1, lat1, lng2, lat2)
{
    var lngg1 = String(lng1);
    var latt1 = String(lat1);
    var lngg2 = String(lng2);
    var latt2 = String(lat2);
    for (var i = 0; i < allPoints.length; i++)
    {
        if (allPoints[i] !== undefined && allPoints[i].lng === lngg1 && allPoints[i].lat === latt1)
        {
            var lists = allPoints[i].list;
            var mp = new MyPoint(String(lngg2), String(latt2));
            lists.push(mp);
        }
    }

    for (var i = 0; i < allPoints.length; i++)
    {
        if (allPoints[i] !== undefined && allPoints[i].lng === lngg2 && allPoints[i].lat === latt2)
        {
            var lists = allPoints[i].list;
            var mp = new MyPoint(String(lngg1), String(latt1));

            lists.push(mp);
        }
    }
}



function selectPoints()
{
    isPoint = true;
    isLine = false;
    isStartPoint = false;
    isLaneSelect = false;
    var objP = document.getElementById("SP");
    objP.setAttribute("class", "btn btn-success nav_button");

    var objL = document.getElementById("SL");
    objL.setAttribute("class", "btn btn-primary nav_button");

    var objS = document.getElementById("sLane");
    objS.setAttribute("class", "btn btn-primary nav_button");
    map.setDefaultCursor("crosshair");
    clearSelectColor();

}

function selectPoints()
{
    isPoint = true;
    isLine = false;
    isStartPoint = false;
    isLaneSelect = false;
    var objP = document.getElementById("SP");
    objP.setAttribute("class", "btn btn-success nav_button");

    var objL = document.getElementById("SL");
    objL.setAttribute("class", "btn btn-primary nav_button");

    var objS = document.getElementById("sLane");
    objS.setAttribute("class", "btn btn-primary nav_button");
    map.setDefaultCursor("crosshair");
    clearSelectColor();

}

function selectIntersection()
{
    var flag = $("#nav_tb_map").attr("flag");
    if (flag === "true")
    {
        isIntersection = true;
        isLight = false;
        isLaneSeg = false;
        map.setDefaultCursor("crosshair");

        var objP = document.getElementById("intersection_id");
        objP.setAttribute("class", "mapICONBorder");

        var objL = document.getElementById("road_seg_id");
        objL.setAttribute("class", "mapICON");

        var objS = document.getElementById("road_light_id");
        objS.setAttribute("class", "mapICON");
        map.setDefaultCursor("crosshair");
    }
}

function selectLight()
{
    var flag = $("#nav_tb_map").attr("flag");
    if (flag === "true")
    {
        isIntersection = false;
        isLight = true;
        isLaneSeg = false;
        map.setDefaultCursor("crosshair");
        var objP = document.getElementById("intersection_id");
        objP.setAttribute("class", "mapICON");

        var objL = document.getElementById("road_seg_id");
        objL.setAttribute("class", "mapICON");

        var objS = document.getElementById("road_light_id");
        objS.setAttribute("class", "mapICONBorder");
        map.setDefaultCursor("crosshair");
    }

}

function selectLaneSeg()
{
    var flag = $("#nav_tb_map").attr("flag");
    if (flag === "true")
    {
        isIntersection = false;
        isLight = false;
        isLaneSeg = true;
        map.setDefaultCursor("crosshair");
        var objP = document.getElementById("intersection_id");
        objP.setAttribute("class", "mapICON");

        var objL = document.getElementById("road_seg_id");
        objL.setAttribute("class", "mapICONBorder");

        var objS = document.getElementById("road_light_id");
        objS.setAttribute("class", "mapICON");
        map.setDefaultCursor("crosshair");
    }
}

function selectLane()
{
    isPoint = false;
    isLine = false;
    isStartPoint = false;
    isLaneSelect = true;
    map.setDefaultCursor("point");
    var objP = document.getElementById("SP");
    objP.setAttribute("class", "btn btn-primary nav_button");

    var objL = document.getElementById("SL");
    objL.setAttribute("class", "btn btn-primary nav_button");

    var objS = document.getElementById("sLane");
    objS.setAttribute("class", "btn btn-success nav_button");
}

function generateLanes()
{
    var data = "";
    if (selectPoint === null)
    {
        alert("请选择要建模的路口！");
    }
    else
    {
        //getAddressLocation(selectPoint.lat, selectPoint.lng);
        var pt = getPoint(selectPoint.lng, selectPoint.lat);
        var sa = 1000000;
        var xc = pt.lng * sa;
        var yc = pt.lat * sa;
        var tx, ty, rx, ry;
        var thet;
        if (pt.list !== undefined)
        {
            for (var i = 0; i < pt.list.length; i++)
            {
                tx = pt.list[i].lng * sa;
                ty = pt.list[i].lat * sa;
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
                if (i === 0)
                {
                    thet = parseInt(180 * thet / Math.PI);
                    data += String(thet);
                }
                else
                {
                    thet = parseInt(180 * thet / Math.PI);
                    data += "_" + String(thet);
                }
            }

            window.location = "gIntersection.jsp?data=" + data;
        }

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

function goModel(index)
{
    index = parseInt(index);
    var id = index;
    var option = 2;
    $.post("../../HandleWorkingStatus", {id: id, option: option, state: "1"}, function (result)
    {
        if (result === "0")
        {

            $.post("../../HandleGetModelInfo", {id: id}, function (out)
            {
                if (out.startsWith("111_"))
                {
                    alert(out);
                }
                else
                {
                    info = JSON.parse(out);
                    if (info.type === 1)
                    {

                        loadTaskLanes(info.lanes, info.type);
                        loadTaskItems(info.task_items_times, info.type);
                        $("#intersection").attr("thets", info.thets);
                        $("#intersection").attr("laneNumber", info.lanes.length);
                        $("#intersection").attr("lat", info.lat);
                        $("#intersection").attr("lng", info.lng);
                        $("#intersection").attr("stm_id", info.id);
                        $("#intersection").attr("ids", info.id);
                        $("#t_model_date").val(info.mdate);
                        //$("#intersection").attr("model_info", JSON.stringify(info));
                        $("#img_result").attr("src", info.img_path);
                        $("#intersection").attr("laneinfo", info.laneinfo);
                        $("#intersection_section").show();
                        $("#intersection_section").attr("flag", "true");
                        $("#task_info").attr("slanes", info.slanes);
                        initTBMap(info.lng, info.lat);
                        loadCanvasIntersection();
                    }
                    else if (info.type === 2)
                    {
                        //initTBMap_Seg(lng, lat);
                        //loadTaskItems(info.task_items, info.type);
                        loadTaskLanes(info.lanes, info.type);
                        loadTaskItems(info.task_items_times, info.type);
                        $("#seg_Lane").attr("degree", info.degree);
                        $("#seg_Lane").attr("upnumber", info.upnumber);
                        $("#seg_Lane").attr("laneinfo", info.laneinfo);
                        $("#seg_Lane").attr("downnumber", info.downnumber);
                        $("#seg_Lane").attr("lat", info.lat);
                        $("#seg_Lane").attr("lng", info.lng);
                        $("#seg_Lane").attr("model_info", JSON.stringify(info));
                        $("#img_result_seg").attr("src", info.img_path);
                        $("#seg_Lane").attr("stm_id", info.id);
                        $("#seg_section").attr("flag", "true");
                        $("#seg_Lane").attr("ids", info.id);
                        $("#task_info_seg").attr("slanes", info.slanes);
                        $("#seg_section").show();
                        initTBMap_Seg(info.lng, info.lat);

                    }
                    else
                    {
                        //initTBMap_Light(lng, lat);
                        //loadTaskItems(info.task_items, info.type);
                        loadTaskLanes(info.lanes, info.type);
                        loadTaskItems(info.task_items_times, info.type);
                        $("#light").attr("thets", info.thets);
                        $("#light").attr("laneNumber", info.lanes.length);
                        $("#light").attr("lat", info.lat);
                        $("#light").attr("lng", info.lng);
                        $("#light").attr("stm_id", info.id);
                        $("#img_result_light").attr("src", info.img_path);
                        $("#light").attr("ids", info.id);
                        $("#light").attr("laneinfo", info.laneinfo);
                        $("#light_section").attr("flag", "true");
                        $("#light_section").show();
                        $("#light").attr("model_info", JSON.stringify(info));
                        $("#task_info_light").attr("slanes", info.slanes);
                        initTBMap_Light(info.lng, info.lat);
                        loadCanvasLight();

                    }
                }
            });
        }
        else if (result === "2")
        {
            alert("Error");
        }
        else
        {
            alert("其他用户正在编辑，请稍后！");
        }
    });
}


function copyModelStart()
{
    var value = $("#copyMenuID").attr("value");
    if (value === "")
    {
        alert("请选择你要复制的调查");
    }
    else
    {

        var index = value.split("_");
        index = index[0];
        var content;
        content = '<div class="modal-dialog">'

                + '<div class="modal-content">'
                + '<div class="modal-header">'
                + '<button type="button" class="close" data-dismiss="modal">&times;</button>'
                + '<h4 class="modal-title">请选新复制的调查开始的日期</h4>'
                + '</div>'
                + '<div class="modal-body">'

                + '<span style="font-size:18px;color:black;margin-left: 40px;">调查开始的日期:</span><input style="font-size:18px;color:black;"  type="text" name="t_model_copy_date" id="t_model_copy_date" ';
        content += '</div>'
                + '<div class="modal-footer">'
                + '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>'

                + '<button type="button" class="btn btn-default" onclick="copyModelCheck(' + index + ')">确定</button>'
                + '</div>'
                + '</div>'
                + '</div>';

        var dig = document.getElementById("my_Modal");
        dig.innerHTML = "";
        dig.innerHTML = content;
        $("#my_Modal").modal();
        $("#t_model_copy_date").datepicker();
    }
    //$.datepicker.formatDate( "yy-mm-dd", new Date( 2007, 1 - 1, 26 ) );
}

function copyModelCheck(index)
{
    var time = $("#t_model_copy_date").val();
    time = time.split("/");
    time = time[2] + "-" + time[0] + "-" + time[1];
    if (time === "")
    {
        alert("请输入新的调查的日期");
    }
    else
    {
        $("#my_Modal").modal("hide");
        copyModel(index, time);
    }
}

function copyModel(index, time)
{
    index = parseInt(index);
    var id = index;
    var option = 3;
    $.post("../../HandleWorkingStatus", {id: id, option: option, state: "1"}, function (result)
    {
        if (result === "0")
        {

            $.post("../../HandleCreateCopyedModel", {id: id, time: time}, function (out)
            {
                if (out.startsWith("0"))
                {
                    alert(out);
                }
                else
                {
                    alert("调查复制已经完成");
                    loadTaskModelInfo();
                }
            });
        }
        else if (result === "2")
        {
            alert("Error");
        }
        else
        {
            alert("其他用户正在编辑，请稍后！");
        }
    });
}


function loadTaskLanes(lanes, type)
{
    if (lanes !== null && lanes !== undefined && lanes !== "")
    {
        if (type === 1)
        {
            for (var i = 1; i <= lanes.length; i++)
            {
                $("#intersection").attr("info" + i, (i) + "_" + lanes[i - i].name + "_" + lanes[i - 1].degree);
                $("#intersection").attr("lane" + i, lanes[i - 1].laneinfo);
                $("#img_result").attr("src", lanes[i - 1].img_path);
            }
        }
        else if (type === 2)
        {
            for (var i = 1; i <= lanes.length; i++)
            {
                $("#seg_Lane").attr("info" + i, (i) + "_" + lanes[i - i].name + "_" + lanes[i - 1].degree);
                $("#seg_Lane").attr("lane" + i, lanes[i - 1].laneinfo);
                $("#img_result_seg").attr("src", lanes[i - 1].img_path);
            }
        }
        else
        {
            for (var i = 1; i <= lanes.length; i++)
            {
                $("#light").attr("info" + i, (i) + "_" + lanes[i - i].name + "_" + lanes[i - 1].degree);
                $("#light").attr("lane" + i, lanes[i - 1].laneinfo);
                $("#img_result_light").attr("src", lanes[i - 1].img_path);
            }
        }
    }
}

//function loadTaskItems(tasks, type)
//{
//    if (type === 1)
//    {
//        if (tasks !== null && tasks !== undefined && tasks !== "")
//        {
//            //tasks=JSON.parse(tasks);
//            var cindex = 1;
//            for (var i = 0; i < tasks.length; i++)
//            {
//                var parent = document.getElementById("task_info");
//                if (i === 0)
//                {
//                    parent.innerHTML = "";
//                }
//                //cindex=i+1;
//                var tag = document.createElement("a");
//                //var datac = '{"stime":"' + tasks[i].stime + '","etime":"' + tasks[i].etime + '","check_type":"' + tasks[i].method + '","peizhi":' + tasks[i].car_typs + '}';
//                tag.setAttribute("href", "javascript:void(0)");
//                tag.setAttribute("class", "list-group-item");
//                tag.setAttribute("c_status", tasks[i].c_status);
//                tag.setAttribute("name", tasks[i].name);
//                //tag.setAttribute("basicInfo", datac);
//                tag.setAttribute("spoints", "");
//                tag.setAttribute("slanes", tasks[i].slanes);
//                tag.setAttribute("alllanes", tasks[i].alllanes);
//                //tag.setAttribute("intersection", tasks[i].alllanes);
//                tag.setAttribute("img_s", tasks[i].img_index);
//                var datac = '{"stime":"' + tasks[i].stime + '","alllanes":"' + tasks[i].alllanes + '","stm_id":"' + tasks[i].stm_id + '","id":"' + tasks[i].id + '","type":"' + tasks[i].type + '","duration":"' + tasks[i].duration + '","img_path":"' + tasks[i].img_path + '","etime":"' + tasks[i].etime + '","img_index":"' + tasks[i].img_index + '","slanes":"' + tasks[i].slanes + '","c_status":"' + tasks[i].c_status + '","name":"' + tasks[i].name + '","method":"' + tasks[i].method + '","light_type":"' + tasks[i].light_type + '","peizhi":' + JSON.stringify(tasks[i].peizhi) + '}';
//                tag.setAttribute("basicInfo", datac);
//                //tag.setAttribute("onclick", "startLaneSelect('" + cindex + "')");
//                //tag.setAttribute("ondbclick", "showTaskInfo('" + datac + "')");
//                tag.setAttribute("id", "task_id_" + (i + 1));
//                tag.setAttribute("ids", tasks[i].id);
//                tag.setAttribute("stm_id", tasks[i].stm_id);
//                tag.setAttribute("ids", 0);
//                tag.setAttribute("stime", tasks[i].stime);
//                tag.setAttribute("etime", tasks[i].etime);
//                tag.setAttribute("duration", tasks[i].duration);
//                tag.setAttribute("img_path", tasks[i].img_path);
//                var name = "";
//                if (tasks[i].c_status === 1)
//                {
//                    name = tasks[i].name + "   (等待接受中)";
//                }
//                else if (tasks[i].c_status === 2)
//                {
//                    name = tasks[i].name + "   (任务进行中)";
//                }
//                else if (tasks[i].c_status === 3)
//                {
//                    name = tasks[i].name + "   (任务完成)";
//                }
//                else
//                {
//                    name = tasks[i].name + "   (未分配)";
//                }
//                tag.innerHTML = '<span id="name_task_id_' + cindex + '">' + name + '</span>' + '<i class="fa fa-times-circle fa-2x close_class" onclick="taskDelete(' + cindex + ')"></i><i class="fa fa-info-circle fa-2x info_class" aria-hidden="true" onclick="showTaskInfo(' + cindex + ')"></i>';
//                parent.appendChild(tag);
//                cindex++;
//                $("#task_info").attr("cindex", cindex);
//                var number = $("#task_info").attr("number");
//                number = parseInt(number) + 1;
//                $("#task_info").attr("number", number);
//                $("#task_info").attr("intersection", tasks[i].alllanes);
//            }
//        }
//    }
//    else if (type === 2)
//    {
//        if (tasks !== null && tasks !== undefined && tasks !== "")
//        {
//            //tasks=JSON.parse(tasks);
//            var cindex = 1;
//            for (var i = 0; i < tasks.length; i++)
//            {
//                var parent = document.getElementById("task_info_seg");
//                if (i === 0)
//                {
//                    parent.innerHTML = "";
//                }
//                var tag = document.createElement("a");
//                //var datac = '{"stime":"' + tasks[i].stime + '","etime":"' + tasks[i].etime + '","check_type":"' + tasks[i].method + '","peizhi":' + tasks[i].car_typs + '}';
//                tag.setAttribute("href", "javascript:void(0)");
//                tag.setAttribute("class", "list-group-item");
//                tag.setAttribute("c_status", tasks[i].c_status);
//                tag.setAttribute("name", tasks[i].name);
//                //tag.setAttribute("basicInfo", datac);
//                tag.setAttribute("spoints", "");
//                tag.setAttribute("alllanes", tasks[i].alllanes);
//                tag.setAttribute("slanes", tasks[i].slanes);
//                tag.setAttribute("img_s", tasks[i].img_index);
//                var datac = '{"stime":"' + tasks[i].stime + '","alllanes":"' + tasks[i].alllanes + '","stm_id":"' + tasks[i].stm_id + '","id":"' + tasks[i].id + '","type":"' + tasks[i].type + '","duration":"' + tasks[i].duration + '","img_path":"' + tasks[i].img_path + '","etime":"' + tasks[i].etime + '","img_index":"' + tasks[i].img_index + '","slanes":"' + tasks[i].slanes + '","c_status":"' + tasks[i].c_status + '","name":"' + tasks[i].name + '","method":"' + tasks[i].method + '","light_type":"' + tasks[i].light_type + '","peizhi":' + JSON.stringify(tasks[i].peizhi) + '}';
//                tag.setAttribute("basicInfo", datac);
//                //tag.setAttribute("onclick", "startLaneSelect_Seg('" + cindex + "')");
//                //tag.setAttribute("ondbclick", "showTaskInfo_Seg('" + datac + "')");
//                tag.setAttribute("id", "seg_task_id_" + cindex);
//                tag.setAttribute("ids", tasks[i].id);
//                tag.setAttribute("stm_id", tasks[i].stm_id);
//                tag.setAttribute("stime", tasks[i].stime);
//                tag.setAttribute("etime", tasks[i].etime);
//                tag.setAttribute("duration", tasks[i].duration);
//                tag.setAttribute("img_path", tasks[i].img_path);
//                var name = "";
//                if (tasks[i].c_status === 1)
//                {
//                    name = tasks[i].name + "   (等待接受中)";
//                }
//                else if (tasks[i].c_status === 2)
//                {
//                    name = tasks[i].name + "   (任务进行中)";
//                }
//                else if (tasks[i].c_status === 3)
//                {
//                    name = tasks[i].name + "   (任务完成)";
//                }
//                else
//                {
//                    name = tasks[i].name + "   (未分配)";
//                }
//                tag.innerHTML = '<span id="name_seg_task_id_' + cindex + '">' + name + '</span>' + '<i class="fa fa-times-circle fa-2x close_class" onclick="taskDelete_Seg(' + cindex + ')"></i><i class="fa fa-info-circle fa-2x info_class" aria-hidden="true" onclick="showTaskInfo_Seg(' + cindex + ')"></i>';
//                parent.appendChild(tag);
//                cindex++;
//                $("#task_info_seg").attr("cindex", cindex);
//                var number = $("#task_info_seg").attr("number");
//                number = parseInt(number) + 1;
//                $("#task_info_seg").attr("number", number);
//            }
//        }
//    }
//    else
//    {
//        if (tasks !== null && tasks !== undefined && tasks !== "")
//        {
//            //tasks=JSON.parse(tasks);
//            var cindex = 1;
//            for (var i = 0; i < tasks.length; i++)
//            {
//                var parent = document.getElementById("task_info_light");
//                if (i === 0)
//                {
//                    parent.innerHTML = "";
//                }
//                var tag = document.createElement("a");
//                //var datac = '{"stime":"' + tasks[i].stime + '","etime":"' + tasks[i].etime + '","check_type":"' + tasks[i].method + '","peizhi":' + tasks[i].car_typs + '}';
//                tag.setAttribute("href", "javascript:void(0)");
//                tag.setAttribute("class", "list-group-item");
//                tag.setAttribute("c_status", tasks[i].c_status);
//                tag.setAttribute("name", tasks[i].name);
//                tag.setAttribute("alllanes", tasks[i].alllanes);
//                tag.setAttribute("spoints", "");
//                tag.setAttribute("slanes", tasks[i].slanes);
//                tag.setAttribute("img_s", tasks[i].img_index);
//                var datac = '{"stime":"' + tasks[i].stime + '","alllanes":"' + tasks[i].alllanes + '","stm_id":"' + tasks[i].stm_id + '","id":"' + tasks[i].id + '","type":"' + tasks[i].type + '","duration":"' + tasks[i].duration + '","img_path":"' + tasks[i].img_path + '","etime":"' + tasks[i].etime + '","img_index":"' + tasks[i].img_index + '","slanes":"' + tasks[i].slanes + '","c_status":"' + tasks[i].c_status + '","name":"' + tasks[i].name + '","method":"' + tasks[i].method + '","light_type":"' + tasks[i].light_type + '","peizhi":' + JSON.stringify(tasks[i].peizhi) + '}';
//                tag.setAttribute("basicInfo", datac);
//                //tag.setAttribute("onclick", "startLaneSelect_Light('" + cindex + "')");
//                //tag.setAttribute("ondbclick", "showTaskInfo_Light('" + datac + "')");
//                tag.setAttribute("id", "light_task_id_" + cindex);
//                tag.setAttribute("ids", tasks[i].id);
//                tag.setAttribute("stm_id", tasks[i].stm_id);
//                tag.setAttribute("stime", tasks[i].stime);
//                tag.setAttribute("etime", tasks[i].etime);
//                tag.setAttribute("duration", tasks[i].duration);
//                tag.setAttribute("img_path", tasks[i].img_path);
//                var name = "";
//                if (tasks[i].c_status === 1)
//                {
//                    name = tasks[i].name + "   (等待接受中)";
//                }
//                else if (tasks[i].c_status === 2)
//                {
//                    name = tasks[i].name + "   (任务进行中)";
//                }
//                else if (tasks[i].c_status === 3)
//                {
//                    name = tasks[i].name + "   (任务完成)";
//                }
//                else
//                {
//                    name = tasks[i].name + "   (未分配)";
//                }
//                tag.innerHTML = '<span id="name_light_task_id_' + cindex + '">' + name + '</span>' + '<i class="fa fa-times-circle fa-2x close_class" onclick="taskDelete_Light(' + cindex + ')"></i><i class="fa fa-info-circle fa-2x info_class" aria-hidden="true" onclick="showTaskInfo_Light(' + cindex + ')"></i>';
//                parent.appendChild(tag);
//                cindex++;
//                $("#task_info_light").attr("cindex", cindex);
//                var number = $("#task_info_light").attr("number");
//                number = parseInt(number) + 1;
//                $("#task_info_light").attr("number", number);
//            }
//        }
//    }
//}
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

            + '<span style="font-size:18px;color:black;margin-left: 40px;">调查开始的时间:</span><input style="font-size:18px;color:black;"  name="t_model_copy_date" id="t_task_copy_stime"><br/> '
            + '<span style="font-size:18px;color:black;margin-left: 40px;">调查结束的时间:</span><input style="font-size:18px;color:black;" name="t_model_copy_date" id="t_task_copy_etime">';
    content += '</div>'
            + '<div class="modal-footer">'
            + '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>'

            + '<button type="button" class="btn btn-default" onclick="makeCopyTasks_Real(\'' + tmid + '\',\'' + stime + '\',\'' + etime + '\')">确定</button>'
            + '</div>'
            + '</div>'
            + '</div>';

    var dig = document.getElementById("my_Modal");
    dig.innerHTML = "";
    dig.innerHTML = content;
    $("#my_Modal").modal();
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

function loadTaskItems(task_times, type)
{
    if (type === 1)
    {
        if (task_times !== null && task_times !== undefined && task_times !== "")
        {
            //tasks=JSON.parse(tasks);
            var parent = document.getElementById("task_info");
            parent.setAttribute("number", task_times.length);
            for (var j = 0; j < task_times.length; j++)
            {

                if (j === 0)
                {
                    parent.innerHTML = "";
                }
                var divp = document.createElement("div");
                divp.setAttribute("class", "panel-group tmodel_group");
                divp.setAttribute("id", "tmodel_group_" + (j + 1));
                divp.setAttribute("ids", (j + 1));
                divp.setAttribute("stime", task_times[j].stime);
                divp.setAttribute("etime", task_times[j].etime);
                divp.setAttribute("style", "margin-bottom:5px;");
                var divp1 = document.createElement("div");
                divp1.setAttribute("class", "panel panel-default");
                var divp_head = document.createElement("div");
                divp_head.setAttribute("class", "panel-heading");
                var tasks = task_times[j].items;
                var content = '<h4 class="panel-title">'
                        + ' <a data-toggle="collapse" href="#time_tasks_' + (j + 1) + '">' + task_times[j].name + '&nbsp;&nbsp;' + '共<span id="tmodel_title_' + (j + 1) + '">' + tasks.length + '</span>个任务<span class="copyTasksTimes" onclick="makeCopyTasks(\'' + task_times[j].tmid + '\',\'' + task_times[j].stime + '\',\'' + task_times[j].etime + '\')">复制此时段</span></a>'
                        + '</h4>';
                divp_head.innerHTML = content;
                divp1.appendChild(divp_head);
                var divp_2 = document.createElement("div");
                divp_2.setAttribute("class", "panel-collapse collapse");
                divp_2.setAttribute("id", "time_tasks_" + (j + 1));
                var ul_t = document.createElement("ul");
                ul_t.setAttribute("class", "list-group");
                ul_t.setAttribute("id", "task_times_" + (j + 1));
                //cindex=i+1;
                ul_t.setAttribute("slanes", task_times[j].slanes);
                ul_t.setAttribute("number", tasks.length);
                for (var i = 0; i < tasks.length; i++)
                {
                    var tag = document.createElement("li");
                    //var datac = '{"stime":"' + tasks[i].stime + '","etime":"' + tasks[i].etime + '","check_type":"' + tasks[i].method + '","peizhi":' + tasks[i].car_typs + '}';
                    //tag.setAttribute("href", "javascript:void(0)");
                    tag.setAttribute("style", 'border-bottom: 1px solid gray;');
                    tag.setAttribute("class", "list-group-item");
                    tag.setAttribute("c_status", tasks[i].c_status);
                    tag.setAttribute("name", tasks[i].name);
                    tag.setAttribute("slanes", tasks[i].slanes);
                    tag.setAttribute("alllanes", tasks[i].alllanes);
                    var datac = '{"stime":"' + tasks[i].stime + '","alllanes":"' + tasks[i].alllanes + '","stm_id":"' + tasks[i].stm_id + '","id":"' + tasks[i].id + '","type":"' + tasks[i].type + '","duration":"' + tasks[i].duration + '","img_path":"' + tasks[i].img_path + '","etime":"' + tasks[i].etime + '","img_index":"' + tasks[i].img_index + '","slanes":"' + tasks[i].slanes + '","c_status":"' + tasks[i].c_status + '","name":"' + tasks[i].name + '","method":"' + tasks[i].method + '","light_type":"' + tasks[i].light_type + '","peizhi":' + JSON.stringify(tasks[i].peizhi) + '}';
                    tag.setAttribute("basicInfo", datac);
                    //tag.setAttribute("onclick", "startLaneSelect('" + cindex + "')");
                    //tag.setAttribute("ondbclick", "showTaskInfo('" + datac + "')");
                    tag.setAttribute("id", "task_id_" + (j + 1) + "_" + (i + 1));
                    tag.setAttribute("ids", tasks[i].id);
                    tag.setAttribute("stm_id", tasks[i].stm_id);
                    tag.setAttribute("stime", tasks[i].stime);
                    tag.setAttribute("etime", tasks[i].etime);
                    tag.setAttribute("duration", tasks[i].duration);
                    tag.setAttribute("img_path", tasks[i].img_path);
                    var name = "";
                    var nameFlag = "";
                    if (tasks[i].c_status === 1)
                    {
                        name = tasks[i].dcName;
                        nameFlag = "(等待接受中)";
                    }
                    else if (tasks[i].c_status === 2)
                    {
                        name = tasks[i].dcName;
                        nameFlag = "(任务进行中)";
                        //name = tasks[i].dcName + "   (任务进行中)";
                    }
                    else if (tasks[i].c_status === 3)
                    {
                        name = tasks[i].dcName;
                        nameFlag = "(任务等待审核中)";
                        //name = tasks[i].dcName + "   (任务等待审核中)";
                    }
                    else if (tasks[i].c_status === 4)
                    {
                        name = tasks[i].dcName;
                        nameFlag = "(任务完成)";
                        //name = tasks[i].dcName + "   (任务完成)";
                    }
                    else if (tasks[i].c_status === 5)
                    {
                        name = tasks[i].dcName;
                        nameFlag = "(任务重做中)";
                        //name = tasks[i].dcName + "   (任务重做中)";
                    }
                    else
                    {
                        name = tasks[i].dcName;
                        nameFlag = "(未分配)";
                        //name = tasks[i].dcName + "   (未分配)";
                    }
                    tag.innerHTML = '<div class="taskModel_span" id="name_task_id_' + (j + 1) + '_' + (i + 1) + '">' + (i + 1) + '.' + name + '</div>&nbsp;<span style="color:black;">' + nameFlag + '</span>' + '<i style="color:black" class="fa fa-times-circle fa-2x close_class" onclick="taskDelete(\'' + (j + 1) + '_' + (i + 1) + '\')"></i><i style="color:black" class="fa fa-info-circle fa-2x info_class" aria-hidden="true" onclick="showTaskInfo(\'' + (j + 1) + '_' + (i + 1) + '\')"></i>';
                    ul_t.appendChild(tag);
                }
                divp_2.appendChild(ul_t);
                divp1.appendChild(divp_2);
                divp.appendChild(divp1);
                parent.appendChild(divp);
            }
        }
    }
    else if (type === 2)
    {
        if (tasks !== null && tasks !== undefined && tasks !== "")
        {
            //tasks=JSON.parse(tasks);
            var cindex = 1;
            for (var i = 0; i < tasks.length; i++)
            {
                var parent = document.getElementById("task_info_seg");
                if (i === 0)
                {
                    parent.innerHTML = "";
                }
                var tag = document.createElement("a");
                //var datac = '{"stime":"' + tasks[i].stime + '","etime":"' + tasks[i].etime + '","check_type":"' + tasks[i].method + '","peizhi":' + tasks[i].car_typs + '}';
                tag.setAttribute("href", "javascript:void(0)");
                tag.setAttribute("class", "list-group-item");
                tag.setAttribute("c_status", tasks[i].c_status);
                tag.setAttribute("name", tasks[i].name);
                //tag.setAttribute("basicInfo", datac);
                tag.setAttribute("spoints", "");
                tag.setAttribute("alllanes", tasks[i].alllanes);
                tag.setAttribute("slanes", tasks[i].slanes);
                tag.setAttribute("img_s", tasks[i].img_index);
                var datac = '{"stime":"' + tasks[i].stime + '","alllanes":"' + tasks[i].alllanes + '","stm_id":"' + tasks[i].stm_id + '","id":"' + tasks[i].id + '","type":"' + tasks[i].type + '","duration":"' + tasks[i].duration + '","img_path":"' + tasks[i].img_path + '","etime":"' + tasks[i].etime + '","img_index":"' + tasks[i].img_index + '","slanes":"' + tasks[i].slanes + '","c_status":"' + tasks[i].c_status + '","name":"' + tasks[i].name + '","method":"' + tasks[i].method + '","light_type":"' + tasks[i].light_type + '","peizhi":' + JSON.stringify(tasks[i].peizhi) + '}';
                tag.setAttribute("basicInfo", datac);
                //tag.setAttribute("onclick", "startLaneSelect_Seg('" + cindex + "')");
                //tag.setAttribute("ondbclick", "showTaskInfo_Seg('" + datac + "')");
                tag.setAttribute("id", "seg_task_id_" + cindex);
                tag.setAttribute("ids", tasks[i].id);
                tag.setAttribute("stm_id", tasks[i].stm_id);
                tag.setAttribute("stime", tasks[i].stime);
                tag.setAttribute("etime", tasks[i].etime);
                tag.setAttribute("duration", tasks[i].duration);
                tag.setAttribute("img_path", tasks[i].img_path);
                var name = "";
                if (tasks[i].c_status === 1)
                {
                    name = tasks[i].name + "   (等待接受中)";
                }
                else if (tasks[i].c_status === 2)
                {
                    name = tasks[i].name + "   (任务进行中)";
                }
                else if (tasks[i].c_status === 4)
                {
                    name = tasks[i].name + "   (任务完成)";
                }
                else if (tasks[i].c_status === 3)
                {
                    name = tasks[i].name + "   (任务审核中)";
                }
                else if (tasks[i].c_status === 5)
                {
                    name = tasks[i].name + "   (任务重做中)";
                }
                else
                {
                    name = tasks[i].name + "   (未分配)";
                }
                tag.innerHTML = '<span id="name_seg_task_id_' + cindex + '">' + name + '</span>' + '<i class="fa fa-times-circle fa-2x close_class" onclick="taskDelete_Seg(' + cindex + ')"></i><i class="fa fa-info-circle fa-2x info_class" aria-hidden="true" onclick="showTaskInfo_Seg(' + cindex + ')"></i>';
                parent.appendChild(tag);
                cindex++;
                $("#task_info_seg").attr("cindex", cindex);
                var number = $("#task_info_seg").attr("number");
                number = parseInt(number) + 1;
                $("#task_info_seg").attr("number", number);
            }
        }
    }
    else
    {
        if (tasks !== null && tasks !== undefined && tasks !== "")
        {
            //tasks=JSON.parse(tasks);
            var cindex = 1;
            for (var i = 0; i < tasks.length; i++)
            {
                var parent = document.getElementById("task_info_light");
                if (i === 0)
                {
                    parent.innerHTML = "";
                }
                var tag = document.createElement("a");
                //var datac = '{"stime":"' + tasks[i].stime + '","etime":"' + tasks[i].etime + '","check_type":"' + tasks[i].method + '","peizhi":' + tasks[i].car_typs + '}';
                tag.setAttribute("href", "javascript:void(0)");
                tag.setAttribute("class", "list-group-item");
                tag.setAttribute("c_status", tasks[i].c_status);
                tag.setAttribute("name", tasks[i].name);
                tag.setAttribute("alllanes", tasks[i].alllanes);
                tag.setAttribute("spoints", "");
                tag.setAttribute("slanes", tasks[i].slanes);
                tag.setAttribute("img_s", tasks[i].img_index);
                var datac = '{"stime":"' + tasks[i].stime + '","alllanes":"' + tasks[i].alllanes + '","stm_id":"' + tasks[i].stm_id + '","id":"' + tasks[i].id + '","type":"' + tasks[i].type + '","duration":"' + tasks[i].duration + '","img_path":"' + tasks[i].img_path + '","etime":"' + tasks[i].etime + '","img_index":"' + tasks[i].img_index + '","slanes":"' + tasks[i].slanes + '","c_status":"' + tasks[i].c_status + '","name":"' + tasks[i].name + '","method":"' + tasks[i].method + '","light_type":"' + tasks[i].light_type + '","peizhi":' + JSON.stringify(tasks[i].peizhi) + '}';
                tag.setAttribute("basicInfo", datac);
                //tag.setAttribute("onclick", "startLaneSelect_Light('" + cindex + "')");
                //tag.setAttribute("ondbclick", "showTaskInfo_Light('" + datac + "')");
                tag.setAttribute("id", "light_task_id_" + cindex);
                tag.setAttribute("ids", tasks[i].id);
                tag.setAttribute("stm_id", tasks[i].stm_id);
                tag.setAttribute("stime", tasks[i].stime);
                tag.setAttribute("etime", tasks[i].etime);
                tag.setAttribute("duration", tasks[i].duration);
                tag.setAttribute("img_path", tasks[i].img_path);
                var name = "";
                if (tasks[i].c_status === 1)
                {
                    name = tasks[i].name + "   (等待接受中)";
                }
                else if (tasks[i].c_status === 2)
                {
                    name = tasks[i].name + "   (任务进行中)";
                }
                else if (tasks[i].c_status === 3)
                {
                    name = tasks[i].name + "   (任务审核中)";
                }
                else if (tasks[i].c_status === 4)
                {
                    name = tasks[i].name + "   (任务完成)";
                }
                else if (tasks[i].c_status === 5)
                {
                    name = tasks[i].name + "   (任务重做中)";
                }
                else
                {
                    name = tasks[i].name + "   (未分配)";
                }
                tag.innerHTML = '<span id="name_light_task_id_' + cindex + '">' + name + '</span>' + '<i class="fa fa-times-circle fa-2x close_class" onclick="taskDelete_Light(' + cindex + ')"></i><i class="fa fa-info-circle fa-2x info_class" aria-hidden="true" onclick="showTaskInfo_Light(' + cindex + ')"></i>';
                parent.appendChild(tag);
                cindex++;
                $("#task_info_light").attr("cindex", cindex);
                var number = $("#task_info_light").attr("number");
                number = parseInt(number) + 1;
                $("#task_info_light").attr("number", number);
            }
        }
    }
}


function clearPoints()
{
    isStartPoint = false;
    isPoint = false;
    isLine = false;
    isLaneSelect = false;
    map.setDefaultCursor("crosshair");
    var objP = document.getElementById("SP");
    objP.setAttribute("class", "btn btn-primary nav_button");

    var objL = document.getElementById("SL");
    objL.setAttribute("class", "btn btn-primary nav_button");

    var objS = document.getElementById("sLane");
    objS.setAttribute("class", "btn btn-primary nav_button");
    clearSelectColor();
}

function getAddressLocation(lat, lng)
{
    var address = "http://api.map.baidu.com/geocoder/v2/?ak=21MEGr0gZhVgqGF8VDlX2kjQ&callback=renderReverse&location=" + lat + "," + lng + "&output=json&pois=0";
    var xhr = new XMLHttpRequest();

    xhr.open("GET", address, true);
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            // WARNING! Might be evaluating an evil script!
            alert(xhr.responseText);
        }
    };
    xhr.send();
}

var allMarker = [];
function deleteModel()
{
    var value = $("#copyMenuID").attr("value");
    if (value === "")
    {
        alert("请选择你要复制的调查");
    }
    else
    {

        var index = value.split("_");
        index = index[1];
        index = parseInt(index);
        var model = infoModels[index];
        if (confirm("你确定要删除此项目吗?!") === true) {
            $.post("../../HandleDeleteTask_Model", {id: model.id}, function (result)
            {
                if (result === "0")
                {
                    alert("删除操作没有完成，出现异常，请重试");
                }
                else
                {
                    alert("删除操作完成");
                    location.reload();
                }
            });
        } else {

        }
    }
}

function addNewModel(index)
{
    index = parseInt(index);
    var model = infoModels[index];
    if (model.type === 2)
    {
        clearSegPageData();
        $("#seg_Lane").attr("lat", model.lat);
        $("#seg_Lane").attr("lng", model.lng);
        $("#seg_Lane").attr("stm_id", "0");
        $("#seg_section").show();
        $("#seg_section").attr("flag", "true");
        var parent = document.getElementById("task_info_seg");
        parent.innerHTML = "";
        $("#task_info_seg").attr("cindex", 0);
        $("#seg_Lane").attr("degree", model.degree);
        $("#task_info_seg").attr("number", "0");
        $("#task_info_seg").attr("slanes", "");
        initTBMap_Seg(model.lng, model.lat);
    }
    else if (model.type === 1)
    {
        clearIntersectionPageData();
        $("#intersection").attr("thets", "0_90_180_270");
        $("#intersection").attr("laneNumber", "4");
        $("#intersection_section").show();
        $("#intersection_section").attr("flag", "true");
        $("#intersection").attr("lat", model.lat);
        $("#intersection").attr("lng", model.lng);
        $("#intersection").attr("stm_id", "0");
        var parent = document.getElementById("task_info");
        parent.innerHTML = "";
        $("#task_info").attr("cindex", 0);
        $("#task_info").attr("number", "0");
        $("#task_info").attr("intersection", "");
        $("#task_info").attr("slanes", "");
        initTBMap(model.lng, model.lat);
        loadCanvasIntersection();

    }
    else
    {
        clearLightPageData();
        $("#light").attr("thets", "0_90_180_270");
        $("#light").attr("laneNumber", "4");
        $("#light_section").attr("flag", "true");
        $("#light").attr("lat", model.lat);
        $("#light").attr("lng", model.lng);
        $("#light").attr("stm_id", "0");
        $("#light_section").show();

        var parent = document.getElementById("task_info_light");
        parent.innerHTML = "";
        $("#task_info_light").attr("cindex", 0);

        $("#task_info_light").attr("slanes", "");
        $("#task_info_light").attr("number", "0");
        initTBMap_Light(model.lng, model.lat);
        loadCanvasLight();
    }

}

function loadTaskModels_S(info)
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
        infoModels = info;
        for (var i = 0; i < info.length; i++)
        {
            content = '<div class="model_info_tb"><a class="model_info_tb_add" href="javascript:void(0);" onclick="addNewModel(' + i + ')">新建调查</a></br>';
            if (info[i].check === 0)
            {
                content += '<a class="model_info_tb" href="javascript:void(0);" onclick="goModel(' + info[i].id + ')">' + getNameByTime(info[i].mdate) + '</a><a class="model_info_tb_delete" href="javascript:void(0);" onclick="copyModelStart(' + info[i].id + ')">复制调查</a><a class="model_info_tb_delete" href="javascript:void(0);" onclick="deleteModel(' + i + ')">删除</a></br>';

                for (var j = i + 1; j < info.length; j++)
                {
                    if (info[j].lat === info[i].lat && info[j].lng === info[i].lng && info[j].type === info[i].type)
                    {
                        content += '<a class="model_info_tb" href="javascript:void(0);" onclick="goModel(' + info[j].id + ')">' + getNameByTime(info[j].mdate) + '</a><a class="model_info_tb_delete" href="javascript:void(0);" onclick="copyModelStart(' + info[j].id + ')">复制调查</a><a class="model_info_tb_delete" href="javascript:void(0);" onclick="deleteModel(' + j + ')">删除</a></br>';
                        info[j].check = 1;
                    }
                }
                content += '</div>';
                addTaskModel(info[i], content);
            }

        }
    }
}

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
        infoModels = info;
        for (var i = 0; i < info.length; i++)
        {
            content = '<div class="model_info_tb" id="copyMenuID" value=""><div style=""><a class="model_info_tb_add" href="javascript:void(0);" onclick="addNewModel(' + i + ')">新建调查</a>&nbsp;&nbsp;';
            content += '<a class="model_info_tb_delete" href="javascript:void(0);" onclick="copyModelStart()">复制调查</a>&nbsp;&nbsp;<a class="model_info_tb_delete" href="javascript:void(0);" onclick="deleteModel()">删除</a></div><div style="overflow-y:scroll;">';
            if (info[i].check === 0)
            {
                content += '<input type="checkbox" onchange="modelMenuSelcted(this,\'' + info[j].id + '_' + j + '\')">&nbsp;<a class="model_info_tb" href="javascript:void(0);" onclick="goModel(' + info[j].id + ')">' + getNameByTime(info[j].mdate) + '</a></br>';
                for (var j = i + 1; j < info.length; j++)
                {
                    if (info[j].lat === info[i].lat && info[j].lng === info[i].lng && info[j].type === info[i].type)
                    {
                        content += '<input type="checkbox" onchange="modelMenuSelcted(this,\'' + info[j].id + '_' + j + '\')">&nbsp;<a class="model_info_tb" href="javascript:void(0);" onclick="goModel(' + info[j].id + ')">' + getNameByTime(info[j].mdate) + '</a></br>';
                        info[j].check = 1;
                    }
                }
                content += '</div></div>';
                addTaskModel(info[i], content);
            }

        }
    }
}

var preSE = null;

function modelMenuSelcted(obj, value)
{
    if (preSE === null)
    {

    }
    else
    {
        preSE.checked = false;
    }
    if (obj.checked)
    {
        $("#copyMenuID").attr("value", value);
    }
    else
    {
        $("#copyMenuID").attr("value", "");
    }
    preSE = obj;
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


function addTaskModel(info, sContent)
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
    var markerMenu = new BMap.ContextMenu();
    markerMenu.addItem(new BMap.MenuItem('删除', removeMarker.bind(marker)));

    marker.addContextMenu(markerMenu);

    var infoWindow = new BMap.InfoWindow(sContent);
    marker.addEventListener("click", function () {
        this.openInfoWindow(infoWindow);
    });
    marker.addEventListener("mouseover", function (e) {
        //isPoint=true;
//                 var obj = document.getElementById("road_light_id");
//                obj.setAttribute("class", "mapICONBorder");
        dbcheck = true;

    });
    marker.addEventListener("mouseout", function (e) {
        //isPoint=true;
//                 var obj = document.getElementById("road_light_id");
//                obj.setAttribute("class", "mapICON");

        dbcheck = false;

    });
    map.addOverlay(marker);
    allMarker.push(marker);

}
function theLocation(value) {
    map.centerAndZoom(value, 11);
}

function createIntersectionModel()
{
    clearIntersectionPageData();
    $("#intersection").attr("thets", "0_90_180_270");
    $("#intersection").attr("laneNumber", "4");
    $("#intersection_section").show();
    $("#intersection_section").attr("flag", "true");
    $("#intersection").attr("lat", currentPoint.lat);
    $("#intersection").attr("lng", currentPoint.lng);
    $("#intersection").attr("stm_id", "0");
    initTBMap(currentPoint.lng, currentPoint.lat);
    loadCanvasIntersection();
    var parent = document.getElementById("task_info");
    parent.innerHTML = "";
    $("#task_info").attr("cindex", 0);
    $("#task_info").attr("number", "0");
    $("#task_info").attr("intersection", "");
}

function createLightModel()
{
    clearLightPageData();
    $("#light").attr("thets", "0_90_180_270");
    $("#light").attr("laneNumber", "4");
    $("#light_section").attr("flag", "true");
    $("#light").attr("lat", currentPoint.lat);
    $("#light").attr("lng", currentPoint.lng);
    $("#light").attr("stm_id", "0");
    $("#light_section").show();

    var parent = document.getElementById("task_info_light");
    parent.innerHTML = "";
    $("#task_info_light").attr("cindex", 0);

    $("#task_info_light").attr("number", "0");
    initTBMap_Light(currentPoint.lng, currentPoint.lat);
    loadCanvasLight();
}

function createSegModel(degree)
{
    clearSegPageData();
    $("#seg_Lane").attr("lat", currentPoint.lat);
    $("#seg_Lane").attr("lng", currentPoint.lng);
    $("#seg_Lane").attr("stm_id", "0");
    $("#seg_section").show();
    $("#seg_section").attr("flag", "true");
    var parent = document.getElementById("task_info_seg");
    parent.innerHTML = "";
    $("#task_info_seg").attr("cindex", 0);
    $("#seg_Lane").attr("degree", degree);
    $("#task_info_seg").attr("number", "0");
    initTBMap_Seg(currentPoint.lng, currentPoint.lat);
    epoint_seg = null;
    spoint_seg = null;
    c1_seg = null;
    c2_seg = null;
}

function deleteCurrentModel()
{
    map.removeOverlay(currentMarker);
}

var point_seg = null;
var spoint_seg = null;
var epoint_seg = null;
var c1_seg = null, c2_seg = null;
var currentMarker = null;
var currentPoint = null;
var myValue;
function initMap()
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

    var navigationControl = new BMap.NavigationControl({
        // 靠左上角位置
        anchor: BMAP_ANCHOR_TOP_RIGHT,
        // LARGE类型
        type: BMAP_NAVIGATION_CONTROL_LARGE,
        // 启用显示定位
        enableGeolocation: true
    });
    map.addControl(navigationControl);
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
//        div.innerHTML = "<div class='nav_map_bar'>\n\
//        <button id='SP' onclick='selectPoints()' type='button' class='btn btn-primary nav_button'>选取路口点</button>\n\
//        <button id='SL' onclick='selectLine()' type='button' class='btn btn-primary nav_button'>连接路口点</button>\n\
//        <button id='sLane' onclick='selectLane()' type='button' class='btn btn-primary nav_button'>选择建模的路口</button>\n\
//        <button id='gLane' onclick='generateLanes()' type='button' class='btn btn-primary nav_button'>路口建模</button>\n\
//        <button id='CL' onclick='clearPoints()' type='button' class='btn btn-primary nav_button'>重置功能</button></div>";

        div.innerHTML = "<div class='nav_map_bar' style='display:none' flag='false' id='nav_tb_map'>\n\
        <img id='road_intersection_id' flag='0' onclick='selectIntersection()' class='mapICON' src='./mapIcon/intersection_tb.png'>\n\
        <img id='road_seg_id' flag='0' onclick='selectLaneSeg()' class='mapICON' src='./mapIcon/seg_tb.png'>\n\
        <img id='road_light_id' flag='0' onclick='selectLight()' class='mapICON' src='./mapIcon/light_tb.png'></div>";

        div.style.cursor = "pointer";
        map.getContainer().appendChild(div);
        // 将DOM元素返回  
        return div;
    };
    var myCtrl = new MyControl();
    map.addControl(myCtrl);
    var point = new BMap.Point(116.400244, 39.92556);
    map.centerAndZoom(point, 14);
//    var marker = new BMap.Marker(point);// 创建标注
//    map.addOverlay(marker);             // 将标注添加到地图中
    //marker.disableDragging();


    map.addEventListener("click", function (e) {
        var flag = $("#nav_tb_map").attr("flag");
        var inter_check = $("#intersection_section").attr("flag");
        var seg_check = $("#seg_section").attr("flag");
        var light_check = $("#light_section").attr("flag");
        if (inter_check === "true")
        {
            //$("#intersection_section").attr("flag", "false");
            //$("#intersection_section").hide();
        }
        else if (seg_check === "true")
        {
            //$("#seg_section").attr("flag", "false");
            //$("#seg_section").hide();
        }
        else if (light_check === "true")
        {
            //$("#light_section").attr("flag", "false");
            //$("#light_section").hide();
        }
        else
        {
            if (isIntersection && !dbcheck && flag === "true")
            {
                var sContent = '<div class="model_info_tb">\n\
                <a class="model_info_tb_add" href="javascript:void(0);" onclick="createIntersectionModel()">新建项目</a>\n\
                <a class="model_info_tb_add" href="javascript:void(0);" onclick="deleteCurrentModel()">删除项目</a></br>';

                var point = new BMap.Point(e.point.lng, e.point.lat);
                currentPoint = point;
                var myIcon = new BMap.Icon("./mapIcon/intersection_tb.png", new BMap.Size(iconW, iconH));
                var marker = new BMap.Marker(point, {icon: myIcon});
                currentMarker = marker;
                map.addOverlay(marker);

                var infoWindow = new BMap.InfoWindow(sContent);
                marker.addEventListener("click", function () {
                    this.openInfoWindow(infoWindow);
                    currentMarker = this;
                });

                marker.addEventListener("mouseover", function (e) {
                    dbcheck = true;
                });
                marker.addEventListener("mouseout", function (e) {
                    dbcheck = false;
                });
            }
            if (isLight && !dbcheck && flag === "true")
            {
                var sContent = '<div class="model_info_tb">\n\
                <a class="model_info_tb_add" href="javascript:void(0);" onclick="createLightModel()">新建项目</a>\n\
                <a class="model_info_tb_add" href="javascript:void(0);" onclick="deleteCurrentModel()">删除项目</a></br>';

                var point = new BMap.Point(e.point.lng, e.point.lat);
                currentPoint = point;
                var myIcon = new BMap.Icon("./mapIcon/light_tb.png", new BMap.Size(iconW, iconH));
                var marker = new BMap.Marker(point, {icon: myIcon});
                currentMarker = marker;
                map.addOverlay(marker);
                var infoWindow = new BMap.InfoWindow(sContent);
                marker.addEventListener("click", function () {
                    currentMarker = this;
                    this.openInfoWindow(infoWindow);
                });

                marker.addEventListener("mouseover", function (e) {
                    //isPoint=true;
//                 var obj = document.getElementById("road_light_id");
//                obj.setAttribute("class", "mapICONBorder");
                    dbcheck = true;

                });
                marker.addEventListener("mouseout", function (e) {
                    //isPoint=true;
//                 var obj = document.getElementById("road_light_id");
//                obj.setAttribute("class", "mapICON");

                    dbcheck = false;

                });
            }

            if (isLaneSeg && !dbcheck && flag === "true")
            {



                var myIcon = new BMap.Icon("./mapIcon/seg_tb.png", new BMap.Size(iconW, iconH));
                var marker = null;

                var point = new BMap.Point(e.point.lng, e.point.lat);

                //isPoint=true;
                if (c1_seg === null)
                {
                    c1_seg = new BMap.Circle(point, 180);
                    c1_seg.setStrokeColor("red");
                    c1_seg.setFillColor("blue");
                    map.addOverlay(c1_seg);
                }
                else if (c2_seg === null)
                {
                    c2_seg = new BMap.Circle(point, 180);
                    c2_seg.setStrokeColor("red");
                    c2_seg.setFillColor("blue");
                    map.addOverlay(c2_seg);
                }


                if (spoint_seg === null)
                {
                    spoint_seg = new BMap.Point(e.point.lng, e.point.lat);
                }
                else if (epoint_seg === null)
                {
                    map.removeOverlay(c1_seg);
                    map.removeOverlay(c2_seg);

                    epoint_seg = new BMap.Point(e.point.lng, e.point.lat);
                    var degree = getAngle(spoint_seg.lat, spoint_seg.lng, epoint_seg.lat, epoint_seg.lng);
                    point_seg = new BMap.Point((spoint_seg.lng + epoint_seg.lng) / 2, (spoint_seg.lat + epoint_seg.lat) / 2);
                    currentPoint = point_seg;
                    var sContent = '<div class="model_info_tb">\n\
                <a class="model_info_tb_add" href="javascript:void(0);" onclick="createSegModel(\'' + degree + '\')">新建项目</a>\n\
                <a class="model_info_tb_add" href="javascript:void(0);" onclick="deleteCurrentModel()">删除项目</a></br>';
                    marker = new BMap.Marker(point_seg, {icon: myIcon});
                    currentMarker = marker;
                    map.addOverlay(marker);
                    marker.addEventListener("mouseover", function (e) {
                        dbcheck = true;

                    });
                    marker.addEventListener("mouseout", function (e) {
                        //isPoint=true;
//                 var obj = document.getElementById("road_light_id");
//                obj.setAttribute("class", "mapICON");

                        dbcheck = false;

                    });

                    var infoWindow = new BMap.InfoWindow(sContent);
                    marker.addEventListener("click", function () {
                        currentMarker = this;
                        this.openInfoWindow(infoWindow);
                    });
                }




            }
        }


    });

    var ac = new BMap.Autocomplete(//建立一个自动完成的对象
            {"input": "suggestId"
                , "location": map
            });

    ac.addEventListener("onhighlight", function (e) {  //鼠标放在下拉列表上的事件
        var str = "";
        var _value = e.fromitem.value;
        var value = "";
        if (e.fromitem.index > -1) {
            value = _value.province + _value.city + _value.district + _value.street + _value.business;
        }
        str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

        value = "";
        if (e.toitem.index > -1) {
            _value = e.toitem.value;
            value = _value.province + _value.city + _value.district + _value.street + _value.business;
        }
        str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
        G("searchResultPanel").innerHTML = str;
    });


    ac.addEventListener("onconfirm", function (e) {    //鼠标点击下拉列表后的事件
        var _value = e.item.value;
        myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
        G("searchResultPanel").innerHTML = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;

        setPlace();
    });


}

function G(id) {
    return document.getElementById(id);
}

function setPlace() {
    //清除地图上所有覆盖物
    function myFun() {
        var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
        map.centerAndZoom(pp, 18);
        //map.addOverlay(new BMap.Marker(pp));    //添加标注
    }
    var local = new BMap.LocalSearch(map, {//智能搜索
        onSearchComplete: myFun
    });
    local.search(myValue);
}

function startSearch()
{
    myValue = G("suggestId").value;
    setPlace();
}







   