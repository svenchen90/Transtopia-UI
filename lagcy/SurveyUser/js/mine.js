/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function accpetTask(id)
{
    var data = $("#task_id_" + id).attr("data");
    data = JSON.parse(data);
    var times = {"stime": data.stime, "etime": data.etime, "method": data.method, "tid": data.id};
    times = JSON.stringify(times);
    $.post("../HandleUserTask", {id: data.id, option: '2', times: times}, function (result)
    {
        if (result === "2")
        {
            alert("接受成功");
            location.reload();
        }
        else if (result === "2?")
        {
            alert("接受失败,请重新尝试");
        }
        else if (result === "2??")
        {
            alert("在次任务时段,你已经有了任务，不能重新接受");
        }
        else
        {
            alert(result);
        }
    });
}

function denyTask(id)
{
    var data = $("#task_id_" + id).attr("data");
    data = JSON.parse(data);
    $.post("../HandleUserTask", {id: data.id, option: '0', times: ""}, function (result)
    {
        if (result === "0")
        {
            alert("拒绝成功");
            location.reload();
        }
        else if (result === "0?")
        {
            alert("拒绝失败,请重新尝试");
        }
        else
        {
            alert(result);
        }
    });
}

function taskDataInput(id)
{
    var data = $("#task_id_" + id).attr("data");
    data = JSON.parse(data);
    var content = getTaskTBModal(data, data.img_path);
    var dig = document.getElementById("myModal");
    dig.innerHTML = "";
    dig.innerHTML = content;
    $("#myModal").modal();
    laydate({
        elem: '#pstime_d', //目标元素。由于laydate.js封装了一个轻量级的选择器引擎，因此elem还允许你传入class、tag但必须按照这种方式 '#id .class'
        event: 'focus', //响应事件。如果没有传入event，则按照默认的click
        format: 'YYYY-MM-DD hh:mm',
        istime: true
    });
}

function showTaskInfo(id)
{
    var data = $("#task_id_" + id).attr("data");
    data = JSON.parse(data);
    var content = getTaskTBModal_1(data, data.img_path);
    var dig = document.getElementById("myModal");
    dig.innerHTML = "";
    dig.innerHTML = content;
    $("#myModal").modal();
    initTBMap_Detail(data.id, data.lat, data.lng, data.type);

}

function getTaskTBModal_1(info, img)
{
    var content;
    img = img.substr(3);
    var size;
    content = '<div class="modal-dialog">'

            + '<div class="modal-content" style="width:700px;">'
            + '<div class="modal-header">'
            + '<button type="button" class="close" data-dismiss="modal">&times;</button>'
            + '<h4 class="modal-title">任务的详细信息</h4>'
            + '</div>'
            + '<div class="modal-body">';
    content += '<div class="task_tb_img" id="task_tb_img">'
            + '<img id="task_tb_img_result" class="task_tb_img_result" src="' + img + '">'
            + '</div>';

    content += '<div class="task_tb_map_main" id="task_tb_map_detail">'
            + '<div class="task_tb_map_detail" id="tb_map_detail_' + info.id + '">'
            + '</div>';

    content += '<div class="task_tb_info" id="task_tb_info">'
            + ' <span id="task_tb_date"><span class="info_tb_title">日期:</span>&nbsp;' + info.tdate + '</span><br/>'
            + '<span id="task_tb_time"><span class="info_tb_title">时间:</span>&nbsp;' + getOnlyTime(info.stime, info.etime) + '</span><br/>'
            + '<span id="task_tb_location"><span class="info_tb_title">地点:</span>&nbsp;' + info.location + '</span><br/>'
            + ' <span id="task_tb_method"><span class="info_tb_title">采集方式:</span>&nbsp;' + getNameByMetod(info.method) + '</span><br/>';
    if (info.type === 3)
    {
        content += '<span id="task_tb_light_type"><span class="info_tb_title">信号类型:</span>&nbsp;' + getNameByLight(info.light_type) + '</span><br/>';
    }
    content += '</div>';


    content + '<div class="task_tb_cars" id="task_tb_cars">';
    if (info.type !== 3)
    {
        var rdata = info.resultData;
        if (rdata === undefined || rdata === null || rdata === "") {
            //this.selectedLanes=null;
        } else
        {
            content += '<table class="car_tb_view_table">';
            for (var j = 0; j < rdata.length; j++)
            {
                var peizhi = info.peizhi;
                var ds = rdata[j].direction_types;
                for (var k = 0; k < ds.length; k++)
                {
                    content += '<tr>';
                    for (var i = -1; i < peizhi.length; i++)
                    {
                        if (i >= 0)
                        {
                            var id = (j * (peizhi.length) + i);
                            content += '<td class="car_tb_item">'
                                    + '<a class="car_tb_name" data-toggle="popover_' + id + '">' + peizhi[i].type_name
                                    + '<div id="tb_div_id_' + id + '" style="display:none;">'
                                    + '<div class="tb_car_content"><span>车辆类型:' + peizhi[i].type_name + '</span><br/>\n\
                  <span>名称:' + peizhi[i].name + '</span><br/>\n\
                  <span>车长:' + peizhi[i].car_min_length + '-' + peizhi[i].car_max_length + '</span><br/>\n\
                  <span>载重:' + peizhi[i].car_min_weight + '-' + peizhi[i].car_max_weight + '</span><br/>\n\
                  <span>换算系数:' + peizhi[i].car_factor + '</span><br/></div>' + '</div></a></td>';
                        }
                        else
                        {
                            content += '<td class="car_tb_name_view">' + rdata[j].laneName + rdata[j].degree_name + ':&nbsp;' + ds[k] + '--</td>';
                        }
                    }
                    content += '</tr>';
                }


            }
            content += '</table>';
            content += '</div>';
        }
    }
    content += '<div class="modal-footer" id="footsize" size="' + size + '">'
            + '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>'

            + '<button type="button" class="btn btn-default" onclick="doMoveFile()">确定</button>'
            + '</div>'
            + '</div>'
            + '</div>';

    //showCarInfoTB(totalSize);
    return content;
}

function getTaskTBModal(info, img)
{
    var content;
    img = img.substr(3);
    var taskid = info.id;
    var size;
    content = '<div class="modal-dialog" style="position: relative;left: -200px;">'

            + '<div class="modal-content" style="width:1000px;">'
            + '<div class="modal-header">'
            + '<button type="button" class="close" data-dismiss="modal">&times;</button>'
            + '<h4 class="modal-title">任务数据输入</h4>'
            + '</div>'
            + '<div class="modal-body" style="height:350px;">';
    content += '<div class="task_tb_img" id="task_tb_img">'
            + '<img id="task_tb_img_result" class="task_tb_img_result" src="' + img + '">'
            + '</div>';


    content += '<div class="task_tb_info" id="task_tb_info" style="border-bottom:1px solid gray;width: 600px;">'
            + ' <span id="task_tb_date"><span class="info_tb_title" style="color:red">日期:</span>&nbsp;' + info.tdate + '</span>&nbsp;&nbsp;'
            + '<span id="task_tb_time"><span class="info_tb_title" style="color:red">时间:</span>&nbsp;' + getOnlyTime(info.stime, info.etime) + '</span>&nbsp;&nbsp;'
            + '<span id="task_tb_location"><span class="info_tb_title" style="color:red">地点:</span>&nbsp;' + info.location + '</span>&nbsp;&nbsp;'
            + ' <span id="task_tb_method"><span class="info_tb_title" style="color:red">采集方式:</span>&nbsp;' + getNameByMetod(info.method) + '</span>&nbsp;&nbsp;';
    if (info.type === 3)
    {
        content += '<span id="task_tb_light_type"><span class="info_tb_title" style="color:red">信号类型:</span>&nbsp;' + getNameByLight(info.light_type) + '</span><br/>';
    }
    content += '</div>';


    content + '<div class="task_tb_cars" id="task_tb_cars">';
    if (info.type !== 3)
    {
        var directions = info.task_Directions;
        if (directions === undefined || directions === null || directions === "") {
            //this.selectedLanes=null;
        } else

        {
            content += '<table class="car_tb_view_table">';
            content += '<tr>';
            content += '<td class="" style="border-bottom:1px solid lightgray;">'
                    + '<div class="timer_area"><div class="timer_end"><span class="timer_title">计时器:</span><span id="task_timer" class="timer_title">00:00:00</span>&nbsp;&nbsp;<button id="start_time_bt" type="button" class="btn btn-info" onclick="startClock();">开始计时</button>&nbsp;<button type="button" class="btn btn-info" onclick="pauseClock();" id="stopBtn">暂停</button>&nbsp;<button type="button" class="btn btn-info" onclick="cancelClock();">重置</button></div></div>'
                    + '</td></tr>';
            content += '<tr>';
            for (var j = 0; j < directions.length; j++)
            {
                var peizhi = info.peizhi;
                var ds = directions[j].direction_type;
                for (var k = 0; k < ds.length; k++)
                {
                    var type = parseInt(ds[k]);
                    var did = parseInt(ds[k]);
                    if (type === 1)
                    {
                        type = "掉头流向";
                    }
                    if (type === 2)
                    {
                        type = "左转流向";
                    }
                    if (type === 3)
                    {
                        type = "直行流向";
                    }
                    if (type === 4)
                    {
                        type = "右转流向";
                    }
                    if (type === 5)
                    {
                        type = "自行车流向";
                    }
                    if (type === 6)
                    {
                        type = "行人流向";
                    }
                    content += '<tr>';
                    content += '<td class="car_tb_name_view" style="border-bottom:none;">' + directions[j].laneName + directions[j].degree_name + ':&nbsp;' + type + '</td></tr>';
                    content += '<tr>';
                    for (var i = 0; i < peizhi.length; i++)
                    {
                        var id = (j * (peizhi.length) * ds.length + k * (peizhi.length) + i);
                        content += '<td class="car_tb_item" style="height:45px;">'
                                + '<button type="button" class="btn btn-success" onclick="deleteCarNumber(' + directions[j].laneid + ',' + did + ',' + peizhi[i].id + ',' + id + ')">-</button>&nbsp;&nbsp;<div class="task_item_info"><a class="car_tb_name" data-toggle="popover_' + id + '" style="color:red;">' + peizhi[i].type_name
                                + '<div id="tb_div_id_' + id + '" style="display:none;">'
                                + '<div class="tb_car_content"><span>车辆类型:' + peizhi[i].type_name + '</span><br/>\n\
                  <span>名称:' + peizhi[i].name + '</span><br/>\n\
                  <span>车长:' + peizhi[i].car_min_length + '-' + peizhi[i].car_max_length + '</span><br/>\n\
                  <span>载重:' + peizhi[i].car_min_weight + '-' + peizhi[i].car_max_weight + '</span><br/>\n\
                  <span>换算系数:' + peizhi[i].car_factor + '</span><br/></div>' + '</div></a></br><span>数量:</span><span id="task_num_' + id + '" style="color:red">0</span></div>&nbsp;&nbsp;<button type="button" class="btn btn-success" onclick="addCarNumber(' + directions[j].laneid + ',' + did + ',' + peizhi[i].id + ',' + id + ')">+</button></td>';

                    }
                    content += '</tr>';
                }


            }
            content += '</table>';
            content += '</div>';
        }
    }
    content += '<div class="modal-footer" id="footsize" size="' + size + '">'
            + '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>'

            + '<button type="button" class="btn btn-default" onclick="postDataToResult(\'' + taskid + '\')">确定上传数据</button>'
            + '</div>'
            + '</div>'
            + '</div>';

    //showCarInfoTB(totalSize);
    return content;
}

function initTBMap_Detail(index, lat, lng, option)
{
    var map = new BMap.Map("tb_map_detail_" + index);
    var point = new BMap.Point(lng, lat);
    map.centerAndZoom(point, 16);  // 初始化地图,设置中心点坐标和地图级别
    //map.addControl(new BMap.MapTypeControl());   //添加地图类型控件     // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true);
    var myIcon;
    if (option === 1)
    {
        myIcon = new BMap.Icon("./mapIcon/intersection_tb.png", new BMap.Size(40, 40));
    }
    else if (option === 2)
    {
        myIcon = new BMap.Icon("./mapIcon/seg_tb.png", new BMap.Size(40, 40));
    }
    else
    {
        myIcon = new BMap.Icon("./mapIcon/light_tb.png", new BMap.Size(40, 40));
    }

    var marker = new BMap.Marker(point, {icon: myIcon});
    map.addOverlay(marker);
}


function getOnlyDate(time)
{
    var date = time.split(" ");
    return date[0];
}

function getOnlyTime(time1, time2)
{
    var date1 = time1.split(" ");
    var date2 = time2.split(" ");
    return time1 + "-" + time2;
}

function getNameByMetod(method)
{
    method = parseInt(method);
    if (method === 1)
    {
        return "视频";
    }
    else
    {
        return "人工";
    }
}
function getColor(id, type, index)
{
    id = parseInt(id);
    type = parseInt(type);
    index = parseInt(index);
    var red = 42, green = 12, blue = 30;
    if (type === 0)
    {
        type++;
    }
    return {"red": id * red, "green": type * green, "blue": blue * (index + 1)};
}
function getNameByLight(method)
{
    method = parseInt(method);
    if (method === 1)
    {
        return "定时";
    }
    else if (method === 2)
    {
        return "感应";
    }
    else
    {
        return "控制系统";
    }
}

var myClock = null;
var clockFlag = false;
var isPaused = false;
function cancelClock()
{
    $("#task_timer").text("00:00:00");
    clearInterval(myClock);
    clockFlag = false;
    sdata = [];
}

function pauseClock()
{
    if (!isPaused)
    {
        isPaused = !isPaused;
        $("#stopBtn").html('继续');
        //$("#stopBtn").prop('value', '继续');
    }
    else
    {
        isPaused = !isPaused;
        $("#stopBtn").html('暂停');
    }
}

var timerS=0;
function startClock()
{
    var value = "";
    var timer = 0;
    if (clockFlag === true)
    {
        clearInterval(myClock);
    }
    else
    {
        clockFlag = true;
        $("#start_time_bt").html("计时停止");
        myClock = setInterval(function () {
            if (!isPaused)
            {
                timer++;
                timerS++;
                value = getTimerValue(timer);
                $("#task_timer").text(value);
            }

        }, 1000);
    }

}

function getTimerValue(timer)
{
    var ss = parseInt(timer % 60);
    var hh = parseInt(timer / 3600);
    var mm = parseInt((parseInt(timer % 3600)) / 60);
    if (0 <= ss && ss <= 9)
    {
        ss = "0" + ss;
    }
    if (0 <= mm && mm <= 9)
    {
        mm = "0" + mm;
    }
    if (0 <= hh && hh <= 9)
    {
        hh = "0" + hh;
    }
    return hh + ":" + mm + ":" + ss;
}
var sdata = [];
function deleteCarNumber(tid, did, cid, id)
{
    if (clockFlag) {
        var obj = $("#task_num_" + id);
        var number = obj.text();
        number = parseInt(number) - 1;
        obj.text(number);
        tid = parseInt(tid);
        did = parseInt(did);
        cid = parseInt(cid);
        for (var i = 0; i < sdata.length; i++)
        {
            var item = sdata[i];
            if (item.tid === tid && item.did === did && item.cid === cid)
            {
                item.number = item.number - 1;
                item.times.pop();
                return 0;
            }
        }
    }
    else {
        alert("请先开始计时器");
    }
}

function addCarNumber(laneid, did, cid, id)
{
    if (clockFlag)
    {
        laneid = parseInt(laneid);
        did = parseInt(did);
        cid = parseInt(cid);
        var obj = $("#task_num_" + id);
        var number = obj.text();
        number = parseInt(number) + 1;
        obj.text(number);
        
        for (var i = 0; i < sdata.length; i++)
        {
            var item = sdata[i];
            if (item.laneid === laneid && item.did === did && item.cid === cid)
            {
                //item.number = item.number + 1;
                item.times.push(timerS);

                return 0;
            }
        }
        var item = {"laneid": laneid, "did": did, "cid": cid, "times": []};
        item.times.push(timerS);
        sdata.push(item);

    }
    else
    {
        alert("请先开始计时器");
    }

}


function getAddedTime(time)
{
    var tt = $("#task_timer").text();
    var time1 = time.split("T");
    time = time1[1];
    time = time.split(":");
    tt = tt.split(":");
    var hh = parseInt(time[0]);
    var mm = parseInt(time[1]);
    var ss = 0;

    var thh = parseInt(tt[0]);
    var tmm = parseInt(tt[1]);
    var tss = parseInt(tt[2]);

    var timer = hh * 3600 + thh * 3600 + mm * 60 + tmm * 60 + ss + tss;
    timer = getTimerValue(timer);
    return time1[0] + " " + timer;
}

function postDataToResult(taskid)
{
    var info = JSON.stringify(sdata);
    $.post("../HandleUploadData", {taskid: taskid, data: info}, function (result)
    {
        if (result === "1")
        {
            alert("数据上传成功");
            location.reload();
        }
        else if (result === "0")
        {
            alert("数据上传失败,请重新尝试");
        }
        else if (result === "2")
        {
            alert("error");
        }
        else
        {
            alert(result);
        }
    });
}



