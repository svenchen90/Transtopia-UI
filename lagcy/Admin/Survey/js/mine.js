/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var isTaskInfo = false;

function loadPageInfo()
{
    //var dig = document.getElementById("my_Modal");
    $("#my_Modal").css("background-color", "transparent");
    $("#my_Modal").modal();
}
function generateIntersection()
{
    var number = $("#intersection").attr("laneNumber");
    number = parseInt(number);
    var currentLaneID = $("#intersection").attr("currentLaneID");
    currentLaneID = parseInt(currentLaneID);
    var data = "";
    var flag = true;
    var ids = $("#project_body").attr("userid") + "_" + $("#project_body").attr("pid");
    for (var i = 1; i <= number; i++)
    {
        var value = $("#intersection").attr("lane" + (i));
        var info = $("#intersection").attr("info" + (i));
        if ((value === undefined || value === "") && i === currentLaneID)
        {
            //flag = false;
            updateRoadInfo(i);

            value = $("#intersection").attr("lane" + (i));
            if (value !== "" && info !== "")
            {
                info += "_0";
                if (i === 1)
                {
                    data += info + "#" + value;
                }
                else
                {
                    data += "L" + info + "#" + value;
                }
            }

        }
        else if (value === "")
        {
            flag = false;

            break;
        }
        else
        {
            if (value !== "" && info !== "")
            {
                info += "_0";
                if (i === 1)
                {
                    data += info + "#" + value;
                }
                else
                {
                    data += "L" + info + "#" + value;
                }
            }
        }

    }
    var hasTask = $("#task_info").attr("number");
    if (flag && hasTask === "0")
    {
        $.post("../../HandleCreateIntersection", {data: data, ids: ids}, function (result)
        {

            if (!result.startsWith("1?"))
            {
                alert(result);

            }
            else
            {
                $("#intersection").attr("laneInfo", data);
                var img = result.split("?");
                $("#img_result").attr('src', img[1] + '?' + new Date().getTime());
                $("#task_info").attr("imgPath", img[1]);
            }
        });
    }
    else
    {
        alert("请确保你已经初始化了所有车道！");
    }
}

function generateLight()
{
    var number = $("#light").attr("laneNumber");
    number = parseInt(number);
    var currentLaneID = $("#light").attr("currentLaneID");
    var ids = $("#project_body").attr("userid") + "_" + $("#project_body").attr("pid");
    currentLaneID = parseInt(currentLaneID);
    var data = "";
    var flag = true;
    for (var i = 1; i <= number; i++)
    {
        var value = $("#light").attr("lane" + (i));
        var info = $("#light").attr("info" + (i));
        if ((value === undefined || value === "") && i === currentLaneID)
        {
            //flag = false;
            updateRoadInfo(i);

            value = $("#light").attr("lane" + (i));
            if (value !== "" && info !== "")
            {
                info += "_0";
                if (i === 1)
                {
                    data += info + "#" + value;
                }
                else
                {
                    data += "L" + info + "#" + value;
                }
            }

        }
        else if (value === "")
        {
            flag = false;

            break;
        }
        else
        {
            if (value !== "" && info !== "")
            {
                info += "_0";
                if (i === 1)
                {
                    data += info + "#" + value;
                }
                else
                {
                    data += "L" + info + "#" + value;
                }
            }
        }

    }
    var hasTask = $("#task_info_light").attr("number");
    if (flag && hasTask === "0")
    {
        $.post("../../HandleCreateLight", {data: data, ids: ids}, function (result)
        {

            if (!result.startsWith("1?"))
            {
                alert(result);

            }
            else
            {
                $("#light").attr("laneInfo", data);
                var img = result.split("?");
                $("#img_result_light").attr('src', img[1] + '?' + new Date().getTime());
                $("#task_info_light").attr("imgPath", img[1]);
            }
        });
    }
    else
    {
        alert("请确保你已经初始化了所有车道！");
    }
}

function generateSegLane()
{
    var degree = $("#seg_Lane").attr("degree");
    degree = parseInt(degree);
    var flag = true;
    var seg_name = $("#seg_name").val();
    var upnumber = $("#upNumber_seg").val();
    var downNumber = $("#downNumber_seg").val();
    var ids = $("#project_body").attr("userid") + "_" + $("#project_body").attr("pid");
    if (seg_name === "" || upnumber === "" || downNumber === "")
    {
        flag = false;
    }
    var hasTask = $("#task_info_seg").attr("number");
    if (flag && hasTask === "0")
    {
        $("#task_info_seg").attr("degree", degree);
        $("#task_info_seg").attr("upnumber", upnumber);
        $("#task_info_seg").attr("downnumber", downNumber);
        $("#seg_Lane").attr("degree", degree);
        $("#seg_Lane").attr("upnumber", upnumber);
        $("#seg_Lane").attr("name", seg_name);
        $("#seg_Lane").attr("downnumber", downNumber);
        $.post("../../HandleCreateSeg", {name: seg_name, upnumber: upnumber, downnumber: downNumber, degree: degree, spoints: "", slanes: "", ids: ids}, function (result)
        {

            if (!result.startsWith("1?"))
            {
                alert(result);

            }
            else
            {
                var img = result.split("?");
                $("#img_result_seg").attr('src', img[1] + '?' + new Date().getTime());
                $("#task_info_seg").attr("imgPath", img[1]);
            }
        });
    }
    else
    {
        alert("请确保你已经输入了争取的车道信息");
    }
}

function goToTask()
{
    var laneInfo = $("#intersection").attr("laneInfo");
    if (laneInfo === "")
    {
        alert("请首先创建交叉口示意图");
    }
    else
    {
        laneInfo = laneInfo.replace(/#/g, "__");
        window.location = "taskAssign.jsp?laneInfo=" + laneInfo;
    }
}

function loadRoadInfo(index)
{
    var info = $("#intersection").attr("lane" + index);
    var parent = document.getElementById("outresult");
    parent.innerHTML = "";
    if (info !== undefined && info !== "")
    {
        var types = info.split("_");
        parent.setAttribute("data", types.length);
        var va;
        for (var i = 0; i < types.length; i++)
        {
            va = types[i];
            var tag = document.createElement("li");
            //tag.setAttribute("style", "left:" + (-13 * i) + "px");
            tag.setAttribute("type", va);
            tag.setAttribute("class", "mclass m_" + va);
            tag.innerHTML = '<a href="#" class="dismiss aclose"><span class="fa fa-remove xclose"></span></a>';
            parent.appendChild(tag);
        }
    }
    else
    {
        parent.setAttribute("data", "0");
    }

}

function loadRoadInfo_Light(index)
{
    var info = $("#light").attr("lane" + index);
    var parent = document.getElementById("outresult_light");
    parent.innerHTML = "";
    if (info !== undefined && info !== "")
    {
        var types = info.split("_");
        parent.setAttribute("data", types.length);
        var va;
        for (var i = 0; i < types.length; i++)
        {
            va = types[i];
            var tag = document.createElement("li");
            tag.setAttribute("style", "left:" + (-13 * i) + "px");
            tag.setAttribute("type", va);
            tag.setAttribute("class", "mclass m_" + va);
            tag.innerHTML = '<a href="#" class="dismiss aclose"><span class="fa fa-remove xclose"></span></a>';
            parent.appendChild(tag);
        }
    }
    else
    {
        parent.setAttribute("data", "0");
    }

}

function updateMainExample() {
    var items = [];
    $("ol.targetjQ").children().each(function () {
        var mnfctr = $(this).contents().filter(function () {
            return this.nodeType === 3;
        }).text();
        var item = {manufacturer: mnfctr};
        items.push(item);
    });
    var data = JSON.stringify(items);
    $.ajax({
        url: window.location.origin + window.location.pathname + "/mainExample" + window.location.search,
        type: "PUT",
        data: data,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function () {
            XSP.partialRefreshGet("view:_id1:favouriteCars1", "");
            $.pnotify({
                title: "Update successful",
                text: "SessionScope variable successfully updated.",
                type: "success",
                styling: "bootstrap"
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $.pnotify({
                title: "Update failed",
                text: errorThrown,
                type: "error",
                styling: "bootstrap"
            });
        }
    });
}

function loadDraggable()
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
                var hasTask = $("#task_info").attr("number");
                if (checked !== "0" && hasTask === "0")
                {
                    $(this).find(".placeholder").remove();
                    var link = $("<a href='#' class='dismiss aclose'><span class='fa fa-remove xclose'></span></a>");
                    var list = $("<li></li>");
                    var type = ui.draggable.attr("type");
                    var index = $("#outresult").attr("data");
                    index = parseInt(index);
                    $(list).attr("type", type);
                    $(list).attr("class", "mclass m_" + type);
                    $(list).append(link);
                    $(list).appendTo(this);
                    //updateRoad(checked,type,"1");
                    index = index + 1;
                    $("#outresult").attr("data", index);
                }
                else
                {
                    if (checked === "0")
                    {
                        alert("请先选择要编辑的路口");
                    }

                    if (hasTask !== "0")
                    {
                        alert("已经存在任务，请先删除任务");
                    }

                }


//							updateMainExample();
            }
        }).sortable({
            items: "li:not(.placeholder)",
            sort: function () {
                $(this).removeClass("listActive");
            },
            update: function () {
                var id = $("#intersection").attr("currentLaneID");
                checkRoadInfo(id);
//							updateMainExample();
            }
        }).on("click", ".dismiss", function (event) {

            event.preventDefault();
            $(this).parent().remove();
            var index = $("#outresult").attr("data");
            index = parseInt(index) - 1;
            $("#outresult").attr("data", index);
            var id = $("#intersection").attr("currentLaneID");
            checkRoadInfo(id);
//						updateMainExample();
        });
    });
}

function loadDraggable_Light()
{
    $(function () {

        $(".sourcejQ_light li").draggable({
            addClasses: false,
            helper: "clone"
        });


        $(".targetjQ_light").droppable({
            addClasses: false,
            activeClass: "listActive",
            //hoverClass : "listHover",
            accept: ":not(.ui-sortable-helper)",
            drop: function (event, ui) {
                var checked = $("#light").attr("currentLaneID");
                var hasTask = $("#task_info_light").attr("number");
                if (checked !== "0" && hasTask === "0")
                {
                    $(this).find(".placeholder").remove();
                    var link = $("<a href='#' class='dismiss aclose'><span class='fa fa-remove xclose'></span></a>");
                    var list = $("<li></li>");
                    var type = ui.draggable.attr("type");
                    var index = $("#outresult_light").attr("data");
                    index = parseInt(index);
                    var left = (-13) * index;
                    $(list).attr("style", "left:" + left + "px;");
                    $(list).attr("type", type);
                    $(list).attr("class", "mclass m_" + type);
                    $(list).append(link);
                    $(list).appendTo(this);
                    //updateRoad(checked,type,"1");
                    index = index + 1;
                    $("#outresult_light").attr("data", index);
                }
                else
                {
                    alert("请先选择要编辑的路口");
                }

//							updateMainExample();
            }
        }).sortable({
            items: "li:not(.placeholder)",
            sort: function () {
                $(this).removeClass("listActive");
            },
            update: function () {
                var id = $("#light").attr("currentLaneID");
                checkRoadInfo_Light(id);
//							updateMainExample();
            }
        }).on("click", ".dismiss", function (event) {

            event.preventDefault();
            $(this).parent().remove();
            var index = $("#outresult_light").attr("data");
            index = parseInt(index) - 1;
            $("#outresult_light").attr("data", index);
            var id = $("#light").attr("currentLaneID");
            checkRoadInfo_Light(id);
//						updateMainExample();
        });
    });
}

function deleteAssignedTask_1(id)
{
    var items = $("#c_ass_id_" + id).attr("data");
    var item = JSON.parse(items);
    var uid = $("#c_ass_id_" + id).attr("uid");
    removeAssignUserTime(uid, id);
    if (item.c_status === 0)
    {
        var pnumber = $("#p_task_result").attr("number");
        pnumber = parseInt(pnumber) - 1;
        $("#show_p_number").text(pnumber);
        $("#p_task_result").attr("number", pnumber);
        var index = id;
        var item = $("#ass_id_" + index);
        item.attr("style", "display:block");
        item.attr("uid", "0");
        item.attr("btimes", "");
        item.attr("times", "");
        pnumber = $("#un_task_assign").attr("number");
        pnumber = parseInt(pnumber) + 1;
        $("#un_task_assign").attr("number", pnumber);
        $("#c_ass_id_" + index).remove();
        pnumber = $("#un_task_number").text();
        pnumber = parseInt(pnumber) + 1;
        $("#un_task_number").text(pnumber);


    }
    else if (item.c_status === 1)
    {
        var ts = $("#li_p_" + uid).attr("times");
        var bts = $("#li_p_" + uid).attr("btimes");
        $.post("../../HandleAssignTask", {uid: uid, tid: id, ts: ts, bts: bts, option: '2'}, function (result)
        {
            if (result === "2")
            {
                alert("用户的工作时间已改变，请重试");
                location.reload(true);
            }
            else if (result === "0" || result === "3")
            {
                alert("任务分配保存失败，请重试");
            }

            else
            {
                var pnumber = $("#p_task_result").attr("number");
                pnumber = parseInt(pnumber) - 1;
                $("#p_task_result").attr("number", pnumber);
                var index = id;
                // var item = $("#ass_id_" + index);

                $(".un_tmodel_class").each(function () {
                    var tmid = $(this).attr("ids");
                    tmid = parseInt(tmid);
                    if (tmid === item.stm_id)
                    {
                        var flag = false;
                        var tempid = item.stm_id + "_" + item.id;
                        $(".un_tmodel_time_class").each(function () {
                            var tids = $(this).attr("ids");

                            if (tids === tempid)
                            {
                                var list = document.createElement("li");
                                list.setAttribute("id", "ass_id_" + item.id);
                                list.setAttribute("index", item.id);
                                list.setAttribute("class", "list-group-item un_task_list un_task_assgin_item");
                                list.setAttribute("ppid", item.stm_id);
                                list.setAttribute("pid", tempid);
                                list.setAttribute("name", item.name);
                                list.setAttribute("tid", item.id);
                                list.setAttribute("stm_id", item.stm_id);
                                list.setAttribute("method", item.method);
                                list.setAttribute("type", item.type);
                                list.setAttribute("stime", item.stime);
                                list.setAttribute("etime", item.etime);
                                list.setAttribute("duration", item.duration);
                                list.setAttribute("uid", "0");
                                list.setAttribute("onclick", "fliterUserTime('" + item.id + "','" + item.method + "','" + item.stime + "','" + item.etime + "')");
                                list.setAttribute("unsave", "0");
                                var info = JSON.stringify(item);
                                list.setAttribute("data", info);
                                var sign;
                                if (item.type === 1)
                                {
                                    sign = '<i class="fa fa-crosshairs fa-2x task_left_sign" aria-hidden="true"></i>';
                                }
                                else if (item.type === 2)
                                {
                                    sign = '<i class="fa fa-road fa-2x task_left_sign" aria-hidden="true"></i>';
                                }
                                else
                                {
                                    sign = '<i class="fa fa-lightbulb-o fa-2x task_left_sign" aria-hidden="true"></i>';
                                }
                                var con = sign + item.name + '<i class="fa fa-times-circle fa-2x close_class" onclick="deleteAssignedTask(' + item.id + ')"></i><i class="fa fa-info-circle fa-2x info_class" aria-hidden="true" onclick="showTask_Detail(' + item.id + ')"></i>';

                                list.innerHTML = con;
                                var parent = document.getElementById("un_tmodel_task_items_" + tids);
                                parent.appendChild(list);
                                flag = true;
                            }
                        });
                        if (!flag)
                        {
                            var l2 = document.createElement("li");
                            l2.setAttribute("class", "list-group-item un_tmodel_time_class");
                            l2.setAttribute("style", "margin-left:0px;padding: 0px;background: none;border: none;");
                            var ddivp = document.createElement("div");
                            ddivp.setAttribute("class", "panel-group tmodel_group");
                            ddivp.setAttribute("id", "un_tmodel_task_group_" + tempid);
                            ddivp.setAttribute("ids", tempid);
                            ddivp.setAttribute("style", "margin-bottom:5px;");
                            var ddivp1 = document.createElement("div");
                            ddivp1.setAttribute("class", "panel panel-default");
                            var ddivp_head = document.createElement("div");
                            ddivp_head.setAttribute("class", "panel-heading");

                            var content = '<h4 class="panel-title">'
                                    + ' <a data-toggle="collapse" href="#un_tmodel_tasks_' + tempid + '">' + item.showName + '&nbsp;&nbsp;' + '<span id="un_tmodel_task_title_' + tempid + '">' + 1 + '</span>个任务</a>'
                                    + '</h4>';
                            ddivp_head.innerHTML = content;
                            ddivp1.appendChild(ddivp_head);
                            var ddivp_2 = document.createElement("div");
                            ddivp_2.setAttribute("class", "panel-collapse collapse");
                            ddivp_2.setAttribute("id", "un_tmodel_tasks_" + tempid);
                            var dul_t = document.createElement("ul");
                            dul_t.setAttribute("class", "list-group sourcejQ_assign");
                            dul_t.setAttribute("style", "margin-left:0px;");
                            dul_t.setAttribute("id", "un_tmodel_task_items_" + tempid);

                            var list = document.createElement("li");
                            list.setAttribute("id", "ass_id_" + item.id);
                            list.setAttribute("index", item.id);
                            list.setAttribute("class", "list-group-item un_task_list un_task_assgin_item");
                            list.setAttribute("ppid", item.stm_id);
                            list.setAttribute("pid", tempid);
                            list.setAttribute("name", item.name);
                            list.setAttribute("tid", item.id);
                            list.setAttribute("stm_id", item.stm_id);
                            list.setAttribute("method", item.method);
                            list.setAttribute("type", item.type);
                            list.setAttribute("stime", item.stime);
                            list.setAttribute("etime", item.etime);
                            list.setAttribute("duration", item.duration);
                            list.setAttribute("uid", "0");
                            list.setAttribute("onclick", "fliterUserTime('" + item.id + "','" + item.method + "','" + item.stime + "','" + item.etime + "')");
                            list.setAttribute("unsave", "0");
                            var info = JSON.stringify(item);
                            list.setAttribute("data", info);
                            var sign;
                            if (item.type === 1)
                            {
                                sign = '<i class="fa fa-crosshairs fa-2x task_left_sign" aria-hidden="true"></i>';
                            }
                            else if (item.type === 2)
                            {
                                sign = '<i class="fa fa-road fa-2x task_left_sign" aria-hidden="true"></i>';
                            }
                            else
                            {
                                sign = '<i class="fa fa-lightbulb-o fa-2x task_left_sign" aria-hidden="true"></i>';
                            }
                            var con = sign + item.name + '<i class="fa fa-times-circle fa-2x close_class" onclick="deleteAssignedTask(' + item.id + ')"></i><i class="fa fa-info-circle fa-2x info_class" aria-hidden="true" onclick="showTask_Detail(' + item.id + ')"></i>';

                            list.innerHTML = con;

                            dul_t.appendChild(list);


                            ddivp_2.appendChild(dul_t);

                            ddivp1.appendChild(ddivp_2);
                            ddivp.appendChild(ddivp1);
                            l2.appendChild(ddivp);
                            var parent = document.getElementById("un_tmodel_items_" + item.stm_id);
                            parent.appendChild(l2);
                        }
                    }
                });
                pnumber = $("#un_task_assign").attr("number");
                pnumber = parseInt(pnumber) + 1;
                $("#un_task_assign").attr("number", pnumber);
                pnumber = $("#un_task_number").text();
                pnumber = parseInt(pnumber) + 1;
                $("#un_task_number").text(pnumber);
                var uid = $("#c_ass_id_" + index).attr("uid");
                removeTaskItemFromPerson(uid, index);
                $("#c_ass_id_" + index).remove();
                var pnumber = $("#p_task_result").attr("number");
                pnumber = parseInt(pnumber) - 1;
                $("#show_p_number").text(pnumber);
                $("#p_task_result").attr("number", pnumber);
                loadDraggable_Assign();
            }
        });
    }
    else if (item.c_status === 2)
    {
        alert("任务已经开始执行，不能删除");
    }
    else
    {
        alert("任务已经完成，不能删除");
    }
}

function deleteAssignedTask(id)
{
    var items = $("#c_ass_id_" + id).attr("data");
    var item = JSON.parse(items);
    var uid = $("#c_ass_id_" + id).attr("uid");
    //var uid = $("#c_ass_id_" + index).attr("uid");
    removeAssignUserTime(uid, id);
    if (item.c_status === 0)
    {
        var pnumber = $("#p_task_result").attr("number");
        pnumber = parseInt(pnumber) - 1;
        $("#show_p_number").text(pnumber);
        $("#p_task_result").attr("number", pnumber);
        var index = id;
        var item = $("#ass_id_" + index);
        item.attr("style", "display:block");
        item.attr("uid", "0");

        $("#c_ass_id_" + index).remove();
        var pindex = item.attr("pid");
        var ppindex = item.attr("ppid");
        var ptnumber = parseInt($("#un_tmodel_task_title_" + pindex).text());
        var pptnumber = parseInt($("#un_tmodel_title_" + ppindex).text());
        if (ptnumber === 0)
        {
            ptnumber = ptnumber + 1;
            $("#un_tmodel_task_title_" + pindex).text(ptnumber);
            $("#un_tmodel_task_group_" + pindex).show();
            if (pptnumber === 0)
            {
                pptnumber = pptnumber + 1;
                $("#un_tmodel_title_" + ppindex).text(pptnumber);
                $("#un_tmodel_group_" + ppindex).show();
            }
            else
            {
                pptnumber = pptnumber + 1;
                $("#un_tmodel_title_" + ppindex).text(pptnumber);
            }

        }
        else
        {
            ptnumber = ptnumber + 1;
            $("#un_tmodel_task_title_" + pindex).text(ptnumber);
        }

        removeTaskItemFromPerson(uid, index);
        $("#c_ass_id_" + index).remove();
        var pnumber = $("#p_task_result").attr("number");
        pnumber = parseInt(pnumber) - 1;
        $("#show_p_number").text(pnumber);
        $("#p_task_result").attr("number", pnumber);
        loadDraggable_Assign();


    }
    else if (item.c_status === 1)
    {
        var ts = $("#li_p_" + uid).attr("times");
        var bts = $("#li_p_" + uid).attr("btimes");
        var pnumber = $("#p_task_result").attr("number");
        pnumber = parseInt(pnumber) - 1;
        $("#p_task_result").attr("number", pnumber);
        var index = id;
        // var item = $("#ass_id_" + index);
        // var tflag = false;
        var flag = true;
        var ss = item.stime;
        var ee = item.etime;
        ss = ss.split(":");
        ee = ee.split(":");
        var tempid = item.stm_id + "_" + ss[0] + ss[1] + ee[0] + ee[1];
        $(".un_tmodel_class").each(function () {
            var tmid = $(this).attr("ids");
            tmid = parseInt(tmid);
            if (tmid === item.stm_id)
            {

                var pptnumber = parseInt($("#un_tmodel_title_" + tmid).text());
                var temps = $(this).find(".un_tmodel_time_class");
                for (var i = 0; temps !== null && i < temps.length; i++)
                {

                    var tids = $(temps[i]).attr("ids");
                    if (tids === tempid)
                    {
                        var ptnumber = parseInt($("#un_tmodel_task_title_" + tids).text());
                        var list = document.createElement("li");
                        list.setAttribute("id", "ass_id_" + item.id);
                        list.setAttribute("index", item.id);
                        list.setAttribute("class", "list-group-item un_task_list un_task_assgin_item");
                        list.setAttribute("ppid", item.stm_id);
                        list.setAttribute("pid", tempid);
                        list.setAttribute("name", item.name);
                        list.setAttribute("tid", item.id);
                        list.setAttribute("stm_id", item.stm_id);
                        list.setAttribute("method", item.method);
                        list.setAttribute("type", item.type);
                        list.setAttribute("stime", item.stime);
                        list.setAttribute("etime", item.etime);
                        list.setAttribute("duration", item.duration);
                        list.setAttribute("uid", "0");
                        list.setAttribute("onclick", "fliterUserTime('" + item.id + "','" + item.stime + "','" + item.etime + "')");
                        list.setAttribute("unsave", "0");
                        var info = JSON.stringify(item);
                        list.setAttribute("data", info);
                        var sign;
                        if (item.type === 1)
                        {
                            sign = '<i class="fa fa-crosshairs fa-2x task_left_sign" aria-hidden="true"></i>';
                        }
                        else if (item.type === 2)
                        {
                            sign = '<i class="fa fa-road fa-2x task_left_sign" aria-hidden="true"></i>';
                        }
                        else
                        {
                            sign = '<i class="fa fa-lightbulb-o fa-2x task_left_sign" aria-hidden="true"></i>';
                        }
                        var con = sign + item.name + '<i class="fa fa-info-circle fa-2x info_class" aria-hidden="true" onclick="showTask_Detail(' + item.id + ')"></i>';

                        list.innerHTML = con;
                        var parent = document.getElementById("un_tmodel_task_items_" + tids);
                        parent.appendChild(list);
                        $("#un_tmodel_task_title_" + tids).text((ptnumber + 1));
                        flag = false;
                    }
                }
                if (flag)
                {
                    flag = false;
                    var l2 = document.createElement("li");
                    l2.setAttribute("class", "list-group-item un_tmodel_time_class");
                    l2.setAttribute("style", "margin-left:0px;padding: 0px;background: none;border: none;");
                    var ddivp = document.createElement("div");
                    ddivp.setAttribute("class", "panel-group tmodel_group");
                    ddivp.setAttribute("id", "un_tmodel_task_group_" + tempid);
                    ddivp.setAttribute("ids", tempid);
                    ddivp.setAttribute("style", "margin-bottom:5px;");
                    var ddivp1 = document.createElement("div");
                    ddivp1.setAttribute("class", "panel panel-default");
                    var ddivp_head = document.createElement("div");
                    ddivp_head.setAttribute("class", "panel-heading");

                    var content = '<h4 class="panel-title">'
                            + ' <a data-toggle="collapse" href="#un_tmodel_tasks_' + tempid + '">' + item.showName + '&nbsp;&nbsp;' + '<span id="un_tmodel_task_title_' + tempid + '">' + 1 + '</span>个任务</a>'
                            + '</h4>';
                    ddivp_head.innerHTML = content;
                    ddivp1.appendChild(ddivp_head);
                    var ddivp_2 = document.createElement("div");
                    ddivp_2.setAttribute("class", "panel-collapse collapse");
                    ddivp_2.setAttribute("id", "un_tmodel_tasks_" + tempid);
                    var dul_t = document.createElement("ul");
                    dul_t.setAttribute("class", "list-group sourcejQ_assign");
                    dul_t.setAttribute("style", "margin-left:0px;");
                    dul_t.setAttribute("id", "un_tmodel_task_items_" + tempid);

                    var list = document.createElement("li");
                    list.setAttribute("id", "ass_id_" + item.id);
                    list.setAttribute("index", item.id);
                    list.setAttribute("class", "list-group-item un_task_list un_task_assgin_item");
                    list.setAttribute("ppid", item.stm_id);
                    list.setAttribute("pid", tempid);
                    list.setAttribute("name", item.name);
                    list.setAttribute("tid", item.id);
                    list.setAttribute("stm_id", item.stm_id);
                    list.setAttribute("method", item.method);
                    list.setAttribute("type", item.type);
                    list.setAttribute("stime", item.stime);
                    list.setAttribute("etime", item.etime);
                    list.setAttribute("duration", item.duration);
                    list.setAttribute("uid", "0");
                    list.setAttribute("onclick", "fliterUserTime('" + item.id + "','" + item.stime + "','" + item.etime + "')");
                    list.setAttribute("unsave", "0");
                    var info = JSON.stringify(item);
                    list.setAttribute("data", info);
                    var sign;
                    if (item.type === 1)
                    {
                        sign = '<i class="fa fa-crosshairs fa-2x task_left_sign" aria-hidden="true"></i>';
                    }
                    else if (item.type === 2)
                    {
                        sign = '<i class="fa fa-road fa-2x task_left_sign" aria-hidden="true"></i>';
                    }
                    else
                    {
                        sign = '<i class="fa fa-lightbulb-o fa-2x task_left_sign" aria-hidden="true"></i>';
                    }
                    var con = sign + item.name + '<i class="fa fa-info-circle fa-2x info_class" aria-hidden="true" onclick="showTask_Detail(' + item.id + ')"></i>';

                    list.innerHTML = con;

                    dul_t.appendChild(list);
                    ddivp_2.appendChild(dul_t);

                    ddivp1.appendChild(ddivp_2);
                    ddivp.appendChild(ddivp1);
                    l2.appendChild(ddivp);
                    $("#un_tmodel_title_" + tmid).text((pptnumber + 1));
                    var parent = document.getElementById("un_tmodel_items_" + item.stm_id);
                    parent.appendChild(l2);
                }
            }
        });
        if (flag)
        {
            flag = false;
            var l2 = document.createElement("li");
            l2.setAttribute("class", "list-group-item un_tmodel_time_class");
            l2.setAttribute("style", "margin-left:0px;padding: 0px;background: none;border: none;");
            var ddivp = document.createElement("div");
            ddivp.setAttribute("class", "panel-group tmodel_group");
            ddivp.setAttribute("id", "un_tmodel_task_group_" + tempid);
            ddivp.setAttribute("ids", tempid);
            ddivp.setAttribute("style", "margin-bottom:5px;");
            var ddivp1 = document.createElement("div");
            ddivp1.setAttribute("class", "panel panel-default");
            var ddivp_head = document.createElement("div");
            ddivp_head.setAttribute("class", "panel-heading");

            var content = '<h4 class="panel-title">'
                    + ' <a data-toggle="collapse" href="#un_tmodel_tasks_' + tempid + '">' + item.showName + '&nbsp;&nbsp;' + '<span id="un_tmodel_task_title_' + tempid + '">' + 1 + '</span>个任务</a>'
                    + '</h4>';
            ddivp_head.innerHTML = content;
            ddivp1.appendChild(ddivp_head);
            var ddivp_2 = document.createElement("div");
            ddivp_2.setAttribute("class", "panel-collapse collapse");
            ddivp_2.setAttribute("id", "un_tmodel_tasks_" + tempid);
            var dul_t = document.createElement("ul");
            dul_t.setAttribute("class", "list-group sourcejQ_assign");
            dul_t.setAttribute("style", "margin-left:0px;");
            dul_t.setAttribute("id", "un_tmodel_task_items_" + tempid);

            var list = document.createElement("li");
            list.setAttribute("id", "ass_id_" + item.id);
            list.setAttribute("index", item.id);
            list.setAttribute("class", "list-group-item un_task_list un_task_assgin_item");
            list.setAttribute("ppid", item.stm_id);
            list.setAttribute("pid", tempid);
            list.setAttribute("name", item.name);
            list.setAttribute("tid", item.id);
            list.setAttribute("stm_id", item.stm_id);
            list.setAttribute("method", item.method);
            list.setAttribute("type", item.type);
            list.setAttribute("stime", item.stime);
            list.setAttribute("etime", item.etime);
            list.setAttribute("duration", item.duration);
            list.setAttribute("uid", "0");
            list.setAttribute("onclick", "fliterUserTime('" + item.id + "','" + item.stime + "','" + item.etime + "')");
            list.setAttribute("unsave", "0");
            var info = JSON.stringify(item);
            list.setAttribute("data", info);
            var sign;
            if (item.type === 1)
            {
                sign = '<i class="fa fa-crosshairs fa-2x task_left_sign" aria-hidden="true"></i>';
            }
            else if (item.type === 2)
            {
                sign = '<i class="fa fa-road fa-2x task_left_sign" aria-hidden="true"></i>';
            }
            else
            {
                sign = '<i class="fa fa-lightbulb-o fa-2x task_left_sign" aria-hidden="true"></i>';
            }
            var con = sign + item.name + '<i class="fa fa-info-circle fa-2x info_class" aria-hidden="true" onclick="showTask_Detail(' + item.id + ')"></i>';

            list.innerHTML = con;

            dul_t.appendChild(list);


            ddivp_2.appendChild(dul_t);

            ddivp1.appendChild(ddivp_2);
            ddivp.appendChild(ddivp1);
            l2.appendChild(ddivp);

            var l1 = document.createElement("li");
            l1.setAttribute("class", "list-group-item un_tmodel_class");
            l1.setAttribute("style", "padding:0px;background: none;border: none;");
            var divp = document.createElement("div");
            divp.setAttribute("class", "panel-group tmodel_group");
            divp.setAttribute("id", "un_tmodel_group_" + item.stm_id);
            divp.setAttribute("ids", item.stm_id);
            divp.setAttribute("style", "margin-bottom:5px;");
            var divp1 = document.createElement("div");
            divp1.setAttribute("class", "panel panel-default");
            var divp_head = document.createElement("div");
            divp_head.setAttribute("class", "panel-heading");
            var content = '<h4 class="panel-title">'
                    + ' <a data-toggle="collapse" href="#un_tomdel_tasks_' + item.stm_id + '">' + item.tm_showName + '&nbsp;&nbsp;' + item.tm_date + '&nbsp;&nbsp;<span id="un_tmodel_title_' + item.stm_id + '">' + 1 + '</span>个时段</a>'
                    + '</h4>';
            divp_head.innerHTML = content;
            divp1.appendChild(divp_head);
            var divp_2 = document.createElement("div");
            divp_2.setAttribute("class", "panel-collapse collapse");
            divp_2.setAttribute("id", "un_tomdel_tasks_" + item.stm_id);
            var ul_t = document.createElement("ul");
            ul_t.setAttribute("class", "list-group");
            ul_t.setAttribute("style", "margin-left: 5px;padding: 0px;");
            ul_t.setAttribute("id", "un_tmodel_items_" + item.stm_id);
            ul_t.appendChild(l2);
            divp_2.appendChild(ul_t);
            divp1.appendChild(divp_2);
            divp.appendChild(divp1);
            l1.appendChild(divp);
            var parent = document.getElementById("un_task_assign");
            parent.appendChild(l1);

        }
//        pnumber = $("#un_task_assign").attr("number");
//        pnumber = parseInt(pnumber) + 1;
//        $("#un_task_assign").attr("number", pnumber);
//        pnumber = $("#un_task_number").text();
//        pnumber = parseInt(pnumber) + 1;
//        $("#un_task_number").text(pnumber);
        var uid = $("#c_ass_id_" + index).attr("uid");
        removeTaskItemFromPerson(uid, index);
        $("#c_ass_id_" + index).remove();
        var pnumber = $("#p_task_result").attr("number");
        pnumber = parseInt(pnumber) - 1;
        $("#show_p_number").text(pnumber);
        $("#p_task_result").attr("number", pnumber);
        loadDraggable_Assign();

    }
    else if (item.c_status === 2)
    {
        alert("任务已经开始执行，不能删除");
    }
    else
    {
        alert("任务已经完成，不能删除");
    }
}


function removeTaskItemFromPerson(uid, tid)
{
    var items = $("#li_p_" + uid).attr("items");
    var newItems = '[';
    if (items !== "")
    {
        items = JSON.parse(items);
        for (var i = 0; i < items.length; i++)
        {
            if (parseInt(items[i].id) !== parseInt(tid))
            {
                if (newItems === '[')
                {
                    newItems += JSON.stringify(items[i]);
                }
                else
                {
                    newItems += ',' + JSON.stringify(items[i]);
                }
            }
        }
        newItems += ']';
        if (newItems === "[]")
        {
            newItems = "";
            $("#p_id_" + uid).attr("src", "./img/free.png");
        }
        else
        {
            $("#p_id_" + uid).attr("src", "./img/ass.png");
        }
        $("#li_p_" + uid).attr("items", newItems);
    }
}

function changeToDoingTask(index)
{
    $("#p_id_" + index).attr("class", "p_status_active");
    $("#p_id_" + index).attr("src", ".img/ass,png");
}

function savePersonTask(item)
{
    var pid = $("#p_task_result").attr("currentPID");
    if (pid !== "0")
    {
        item = JSON.parse(item);
        var items = $("#li_p_" + pid).attr("items");
        if (items !== undefined && items !== "")
        {
            items = JSON.parse(items);
            items.push(item);
        }
        else
        {
            items = [];
            items.push(item);
        }
        items = JSON.stringify(items);
        $("#li_p_" + pid).attr("items", items);
    }
}

function taksPersonConfrim()
{
    var info = $("#p_new_info").val();
    var tr_index = $("#persons_task").attr("tr_index");
    var id = $("#persons_task").attr("number");
    id = parseInt(id) + 1;
    tr_index = parseInt(tr_index);

    for (var i = 1; i <= tr_index; i++)
    {
        var number = $("#tr_" + i).attr("number");
        if (number !== "6")
        {
            var list = document.createElement("td");
            list.setAttribute("class", "p_status_td");
            var con = '<img src="./img/free.png" id="p_id_' + id + '" status="1" class="p_status" index="' + id + '" data="" name="" onclick="showPersonTasks(\'' + id + '\')" number="0">'
                    + '<br/><label id="p_id_name_' + id + '" name="' + info + '">' + info + '</label>';
            list.innerHTML = con;
            var parent = document.getElementById("tr_" + tr_index);
            parent.appendChild(list);
            var pnumber = $("#tr_" + tr_index).attr("number");
            pnumber = parseInt(pnumber) + 1;
            $("#tr_" + tr_index).attr("number", pnumber);

            pnumber = $("#persons_task").attr("number");
            pnumber = parseInt(pnumber) + 1;
            $("#persons_task").attr("number", pnumber);
            return true;
        }
    }
    tr_index += 1;
    var list = document.createElement("td");
    list.setAttribute("class", "p_status_td");
    var con = '<img src="./img/free.png" id="p_id_' + id + '" status="1" class="p_status" index="' + id + '" data="" name="" onclick="showPersonTasks(\'' + id + '\')" number="0">'
            + '<br/><label id="p_id_name_' + id + '" name="' + info + '">' + info + '</label>';
    list.innerHTML = con;
    var parent = document.getElementById("task_table_person");
    parent.appendChild(list);

    var tr = document.createElement("tr");
    tr.setAttribute("id", "tr_" + tr_index);
    tr.setAttribute("number", "1");
    tr.appendChild(list);
    parent.appendChild(tr);
    pnumber = $("#persons_task").attr("number");
    pnumber = parseInt(pnumber) + 1;
    $("#persons_task").attr("number", pnumber);
    $("#task_time_assign").hide();

}

function taksPersonCancel()
{
    $("#task_time_assign").hide();
}

function addNewPerson()
{
    $("#task_time_assign").show();
}

function save_basic_info()
{
    var name = $("#p_Name").val();
    var description = $("#p_Description").val();
    var province = $("#province").val();
    var city = $("#city").val();
    var town = $("#town").val();
    var stime = $("#pstime").val();
    var etime = $("#petime").val();
    var budget = $("#p_budget").val();
    var parentID = $("#project_body").attr("parentID");
    var pid = $("#project_body").attr("pid");
    var map = province + city + town;
    var st_id = $("#project_body").attr("st_id");
    var data = '{"stime":"' + stime + '","etime":"' + etime + '","name":"' + name + '","id":"' + st_id + '","budget":"' + budget + '","province":"' + province + '","city":"' + city + '","town":"' + town + '","parentID":"' + parentID + '","pid":"' + pid + '","description":' + description + '}';
    $.post("../../HandleAddSurvey_Task", {data: data, option: "1"}, function (result)
    {
        if (result === "0")
        {
            alert(result);
        }
        else
        {
            alert("已经保存信息成功");
            $("#stask_name").text(name);
            $("#project_body").attr("st_id", result);
            theLocation(map);
            cancel_basic_info();
        }
    });
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
            var dig = document.getElementById("my_Modal");
            dig.innerHTML = "";
            dig.innerHTML = getProjectListModal(result);
            $("#my_Modal").modal();
        }
        //$("span").html(result);
    });
}


function getProjectListModal(result)
{
    var content;
    content = '<div class="modal-dialog">'

            + '<div class="modal-content">'
            + '<div class="modal-header">'
            + '<button type="button" class="close" data-dismiss="modal">&times;</button>'
            + '<h4 class="modal-title">请选择存放的文件位置</h4>'
            + '</div>'
            + '<div class="modal-body">'

            + result;
    content += '</div>'
            + '<div class="modal-footer">'
            + '<button type="button" class="btn btn-default" style="float:left" onclick="createNewFolder1()">新建文件夹</button>'
            + '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>'

            + '<button type="button" class="btn btn-default" onclick="doMoveFile()">确定</button>'
            + '</div>'
            + '</div>'
            + '</div>';
    return content;
}

function createNewFolder1()
{
    var check = document.getElementById("fList00");
    if (check !== undefined && check !== null)
    {

    }
    else
    {
        var newFolder = '<a href="javascript:void(0)" class="noc_tb" onclick="moveFileSelect(\'00\')">'
                + '<span class="glyphicon glyphicon-plus tb_space"></span><img class="tb_img tb_tit" src="./img/sm/sf.jpg" alt="file">&nbsp;'
                + '<input class="tb_Name" type="text" id="newfName"></a>';
        var parent = document.getElementById("projectList");
        var li = document.createElement("li");
        li.setAttribute("class", "moveFileListLI");
        li.setAttribute("ids", "00");
        li.setAttribute("id", "fList00");
        li.innerHTML = newFolder;
        parent.appendChild(li);
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
    var id = $("#project_body").attr("st_id");
    var pid = $("#project_body").attr("pid");
    var target = parent.getAttribute("currentActive");
    var name = "";
    if (target === "00")
    {
        name = $("#newfName").val();

    }
    $.post("../../HandleMoveProject", {pid: pid, targetid: target, name: name}, function (result)
    {

        if (result === "0")
        {
            alert("移动项目失败，请重试！");

        }
        else if (result === "1")
        {
            alert("你不能从父项目移动到子项目，请重新确定目标文件！");
        }
        else if (result === "4")
        {
            alert("此文件的名称已经存在，请重新输入文件名");
        }
        else if (result === "5")
        {
            alert("创建文件夹失败，请重新尝试");
        }
        else if (result === "2")
        {
            alert("数据库异常，请重试！");
        }
        else if (result === "-1")
        {
            alert("你没有权限移动目标项目！");
        }
        else if (result === "-2")
        {
            alert("你已经在目标项目中，不用重复移动！");
        }
        else if (result.startsWith("3"))
        {
            if (target === "00")
            {
                var ids = result.split("?");
                $("#p_path").val("/" + name);
                $("#project_body").attr("pid", ids[1]);
                $("#project_body").attr("parentID", "0");
                $("#my_Modal").modal("hide");
            }
            else
            {
                $.post("../../HandleAddSurvey_Task", {pid: pid, parentID: target, id: id, option: "2"}, function (result)
                {
                    if (result === "2")
                    {
                        alert(result);
                    }
                    else
                    {
                        alert("已经保存信息成功");
                        $("#project_body").attr("parentID", target);
                        if (result === "/")
                        {
                            result = "默认根目录";
                        }
                        $("#p_path").val(result);
                        $("#my_Modal").modal("hide");
                        cancel_basic_info();
                    }
                });
            }

        }
        //$("span").html(result);
    });
}

function cancel_basic_info()
{
    $("#basic_info").hide();
}

function showPersonTasks(index)// name: id_name#
{
    //savePersonTask();
    //fliterTaskTime(index);
    var cid = $("#p_task_result").attr("currentPID");
    $("#p_id_" + cid).attr("class", "p_status");
    $("#p_task_result").empty();
    $("#p_task_result").attr("currentPID", index);
    $("#p_id_" + index).attr("class", "p_status_active");
    var items = $("#li_p_" + index).attr("items");
    //var number = $("#p_id_" + index).attr("number");
    var uid = $("#li_p_" + index).attr("uid");
    var p_name = $("#p_id_name_" + index).attr("name");
    $("#show_p_name").text(p_name);
    if (items === undefined || items === "")
    {
        $("#show_p_number").text("0");
    }
    else
    {
        var items = JSON.parse(items);
        $("#show_p_number").text(items.length);
        for (var i = 0; i < items.length; i++)
        {
            var item = items[i];
            var name = "";
            if (item.c_status === 1)
            {
                name = item.dcName + "   (等待接受中)";
            }
            else if (item.c_status === 2)
            {
                name = item.dcName + "   (任务进行中)";
            }
            else if (item.c_status === 3)
            {
                name = item.dcName + "   (任务审核中)";
            }
            else if (item.c_status === 4)
            {
                name = item.dcName + "   (任务已经完成)";
            }
            else if (item.c_status === 5)
            {
                name = item.dcName + "   (任务重新进行中)";
            }
            else
            {
                name = item.dcName + "   (未分配)";
            }

            var sign;
            if (item.type === 1)
            {
                sign = '<i class="fa fa-crosshairs fa-2x task_left_sign" aria-hidden="true"></i>';
            }
            else if (item.type === 2)
            {
                sign = '<i class="fa fa-road fa-2x task_left_sign" aria-hidden="true"></i>';
            }
            else
            {
                sign = '<i class="fa fa-lightbulb-o fa-2x task_left_sign" aria-hidden="true"></i>';
            }


            var list = document.createElement("li");
            list.setAttribute("id", "c_ass_id_" + item.id);
            list.setAttribute("index", item.id);
            list.setAttribute("class", "list-group-item un_task_list");
            list.setAttribute("name", item.name);
            list.setAttribute("method", item.method);
            list.setAttribute("stime", item.stime);
            list.setAttribute("etime", item.etime);
            list.setAttribute("stmid", item.stm_id);
            list.setAttribute("duration", item.duration);
            list.setAttribute("uid", uid);
            list.setAttribute("tid", item.id);
            list.setAttribute("data", JSON.stringify(item));

            list.innerHTML = sign +
                    name + '<i class="fa fa-times-circle fa-2x close_class" onclick="deleteAssignedTask(' + item.id + ')"></i><i class="fa fa-info-circle fa-2x info_class" aria-hidden="true" onclick="showTask_Detail_2(' + uid + ',' + item.id + ')"></i>';
            var parent = document.getElementById("p_task_result");
            parent.appendChild(list);
            var pnumber = $("#p_task_result").attr("number");
            pnumber = parseInt(pnumber) + 1;
            $("#p_task_result").attr("number", pnumber);
        }

    }
}

function loadDraggable_Assign()
{
    $(function () {
        $(".sourcejQ_assign li").draggable({
            addClasses: false,
            helper: "clone"
        });

        $(".targetjQ_assign").droppable({
            addClasses: false,
            activeClass: "listActive",
            //hoverClass : "listHover",
            accept: ":not(.ui-sortable-helper)",
            drop: function (event, ui) {
                var stm_id = ui.draggable.attr("stm_id");
                $.post("../../HandleWorkingStatus", {id: stm_id, option: "3"}, function (result)
                {
                    if (result === "0")
                    {
                        var pid = $("#p_task_result").attr("currentPID");
                        if (pid !== "0")
                        {
                            $(this).find(".placeholder").remove();
                            var list = document.createElement("li");
                            var index = ui.draggable.attr("index");
                            var data = ui.draggable.attr("data");
                            var name = ui.draggable.attr("name");
                            var tid = ui.draggable.attr("tid");
                            var stime = ui.draggable.attr("stime");
                            var etime = ui.draggable.attr("etime");
                            var method = ui.draggable.attr("method");
                            var type = ui.draggable.attr("type");
                            var ppid = ui.draggable.attr("ppid");
                            var pids = ui.draggable.attr("pid");
                            type = parseInt(type);
                            //item.name
                            var sign;
                            if (type === 1)
                            {
                                sign = '<i class="fa fa-crosshairs fa-2x task_left_sign" aria-hidden="true"></i>';
                            }
                            else if (type === 2)
                            {
                                sign = '<i class="fa fa-road fa-2x task_left_sign" aria-hidden="true"></i>';
                            }
                            else
                            {
                                sign = '<i class="fa fa-lightbulb-o fa-2x task_left_sign" aria-hidden="true"></i>';
                            }
                            var con = sign +
                                    name + '(等待接受中)' + '<i class="fa fa-times-circle fa-2x close_class" onclick="deleteAssignedTask(' + tid + ')"></i><i class="fa fa-info-circle fa-2x info_class" aria-hidden="true" onclick="showTask_Detail_2(' + pid + ',' + tid + ')"></i>';

                            $(list).attr("id", "c_ass_id_" + index);
                            $(list).attr("index", index);
                            $(list).attr("class", "list-group-item un_task_list");
                            $(list).attr("name", name);
                            $(list).attr("data", data);
                            $(list).attr("tid", tid);
                            $(list).attr("uid", pid);
                            $(list).attr("stime", stime);
                            $(list).attr("etime", etime);
                            $(list).attr("method", method);
                            $(list).attr("pid", pids);
                            $(list).attr("ppid", ppid);
                            $(list).attr("unsave", "0");
                            list.innerHTML = con;
                            //$(list).appendTo(this);
                            var parent = document.getElementById("p_task_result");
                            parent.appendChild(list);
                            var cnumber = $("#un_task_assign").attr("number");
                            cnumber = parseInt(cnumber) - 1;
                            $("#un_task_assign").attr("number", cnumber);
                            var pnumber = $("#p_task_result").attr("number");
                            pnumber = parseInt(pnumber) + 1;
                            $("#p_task_result").attr("number", pnumber);
                            $("#show_p_number").text(pnumber);
                            var item = $("#ass_id_" + index);
                            item.attr("uid", pid);
                            item.attr("style", "display:none");
                            var pindex = item.attr("pid");
                            var ppindex = item.attr("ppid");
                            var ptnumber = parseInt($("#un_tmodel_task_title_" + pindex).text());
                            var pptnumber = parseInt($("#un_tmodel_title_" + ppindex).text());
                            if (ptnumber - 1 === 0)
                            {
                                ptnumber = ptnumber - 1;
                                $("#un_tmodel_task_title_" + pindex).text(ptnumber);
                                $("#un_tmodel_task_group_" + pindex).hide();
                                if (pptnumber - 1 === 0)
                                {
                                    pptnumber = pptnumber - 1;
                                    $("#un_tmodel_title_" + ppindex).text(pptnumber);
                                    $("#un_tmodel_group_" + ppindex).hide();
                                }
                                else
                                {
                                    pptnumber = pptnumber - 1;
                                    $("#un_tmodel_title_" + ppindex).text(pptnumber);
                                }

                            }
                            else
                            {
                                ptnumber = ptnumber - 1;
                                $("#un_tmodel_task_title_" + pindex).text(ptnumber);
                            }
                            $("#un_task_assign").attr("number", cnumber);
                            pnumber = $("#un_task_number").text();
                            pnumber = parseInt(pnumber) - 1;
                            $("#un_task_number").text(pnumber);
                            savePersonTask(data);
                            assignUserTime(stime, etime, pid, tid, method);
                            var ts = $("#li_p_" + pid).attr("times");
                            var bts = $("#li_p_" + pid).attr("btimes");
                            item.attr("times", ts);
                            item.attr("btimes", bts);
                        }
                        else
                        {
                            alert("请先选择所需的调查员!");
                        }
                    }
                    else
                    {
                        alert("此任务正在编辑中,你暂时无法分配!");
                    }

                });
            }
        });
    });
}

function checkRoadInfo(id)
{

    updateRoadInfo(id);
}

function checkRoadInfo_Light(id)
{
    var index = $("#outresult_light").attr("data");
    index = parseInt(index);
    var nodes = document.getElementById("outresult_light").childNodes;
    for (var i = 1; i < nodes.length; i++)
    {
        var left = "left:" + (-13) * i + "px;";
        nodes[i].setAttribute("style", left);
    }
    updateRoadInfo(id);
}

function updateRoadInfo(id)
{
    var parent = document.getElementById("outresult");
    var lis = parent.getElementsByTagName("li");
    var lanes = "";
    for (var i = 0; i < lis.length; i++)
    {
        if (i === 0)
        {
            lanes += lis[i].getAttribute("type");
        }
        else
        {
            lanes += "_" + lis[i].getAttribute("type");
        }
    }
    var laneid = "lane" + id;
    $("#intersection").attr(laneid, lanes);
    if (lanes !== "")
    {
        return true;
    }
    else
    {
        return false;
    }
}

function updateRoadInfo_Light(id)
{
    var parent = document.getElementById("outresult_light");
    var lis = parent.getElementsByTagName("li");
    var lanes = "";
    for (var i = 0; i < lis.length; i++)
    {
        if (i === 0)
        {
            lanes += lis[i].getAttribute("type");
        }
        else
        {
            lanes += "_" + lis[i].getAttribute("type");
        }
    }
    var laneid = "lane" + id;
    $("#light").attr(laneid, lanes);
    if (lanes !== "")
    {
        return true;
    }
    else
    {
        return false;
    }
}

var isCreateTask = false;
var currentID = 0;
var currentSegID = 0;
var currentLightID = 0;
function showCoords(event) {

    if (currentID !== 0)
    {
        var x = event.clientX;
        var y = event.clientY;
        var position = $("#imag1").offset();
        var coords = "X coords: " + x + ", Y coords: " + y;
        var data = $("#task_info").attr("intersection");
        var stime = $("#stime").val();
        var etime = $("#etime").val();
        var id_index = 0;
        $(".tmodel_group").each(function () {
            var st = $(this).attr("stime");
            var et = $(this).attr("etime");
            if (st === stime && et === etime)
            {
                id_index = parseInt($(this).attr("ids"));
            }
        });

        var ids = $("#project_body").attr("userid") + "_" + $("#project_body").attr("pid");

        var slanes = $("#task_info").attr("current_slanes");
        var preslanes;
        if (id_index === 0)
        {
            preslanes = "";
        }
        else
        {
            preslanes = $("#task_times_" + id_index).attr("slanes");
        }
        var spoints = $("#task_info").attr("current_spoints");
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

        $.post("../../HandleCreateTask", {data: data, spoints: spoints, slanes: slanes, ids: ids, preslanes: preslanes}, function (result)
        {

            if (result.startsWith("1_"))
            {
                alert(result);

            }
            else
            {
                var out = result.split("M");

                //$("#task_info").attr("current_img_s", out[1]);
                $("#task_info").attr("task_img", "");
                //task_img
                $("#imag1").attr('src', out[1] + '?t=' + new Date().getTime());
                showDirections(out[0], out[2]);
            }
        });
    }

    //alert(coords + " X: " + position.left + " Y: " + position.top);
}

function showDirections(slanes, info)
{
    var type = info.split("_");
    var direction = 0;
    var out = "";
    type = parseInt(type[1]);
    if (type === 1 || type === 10)
    {
        direction = 1;
    }
    else if (type === 2 || type === 11)
    {
        out = '<div class="lane_directions" id="lane_directions">'
                + '<label class="checkbox-inline"><input class="lane_direcs" type="checkbox" value="1">掉头流向</label>'
                + '<label class="checkbox-inline"><input class="lane_direcs" type="checkbox" value="2">左转流向</label>'
                + '</div>';
    }
    else if (type === 3 || type === 12)
    {
        out = '<div class="lane_directions" id="lane_directions">'
                + '<label class="checkbox-inline"><input class="lane_direcs" type="checkbox" value="1">掉头流向</label>'
                + '<label class="checkbox-inline"><input class="lane_direcs" type="checkbox" value="2">左转流向</label>'
                + '<label class="checkbox-inline"><input class="lane_direcs" type="checkbox" value="3">直行流向</label>'
                + '</div>';

    }
    else if (type === 4 || type === 13)
    {
        direction = 2;
    }
    else if (type === 5 || type === 14)
    {
        out = '<div class="lane_directions" id="lane_directions">'
                + '<label class="checkbox-inline"><input class="lane_direcs" type="checkbox" value="2">左转流向</label>'
                + '<label class="checkbox-inline"><input class="lane_direcs" type="checkbox" value="3">直行流向</label>'
                + '</div>';
    }
    else if (type === 6 || type === 15)
    {
        out = '<div class="lane_directions" id="lane_directions">'
                + '<label class="checkbox-inline"><input class="lane_direcs" type="checkbox" value="2">左转流向</label>'
                + '<label class="checkbox-inline"><input class="lane_direcs" type="checkbox" value="3">直行流向</label>'
                + '<label class="checkbox-inline"><input class="lane_direcs" type="checkbox" value="4">右转流向</label>'
                + '</div>';
    }
    else if (type === 7 || type === 16)
    {
        direction = 3;
    }
    else if (type === 8 || type === 17)
    {
        out = '<div class="lane_directions" id="lane_directions">'
                + '<label class="checkbox-inline"><input class="lane_direcs" type="checkbox" value="3">直行流向</label>'
                + '<label class="checkbox-inline"><input class="lane_direcs" type="checkbox" value="4">右转流向</label>'
                + '</div>';
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
        $("#task_info").attr("current_slanes", newSlanes);
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

        var dig = document.getElementById("my_Modal");
        dig.innerHTML = "";
        dig.innerHTML = content;
        $("#my_Modal").modal();

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
    $("#task_info").attr("current_slanes", newSlanes);
    $("#my_Modal").modal("hide");

}

function updateSLanes(slanes, info, direction)
{
    // idStype_index_direction#L
    var ins = info.split("_");
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

function showCoords_Light(event) {

    if (currentLightID !== 0)
    {
        var x = event.clientX;
        var y = event.clientY;
        var position = $("#imag1_light").offset();
        var coords = "X coords: " + x + ", Y coords: " + y;
        var data = $("#task_info_light").attr("light");
        var ids = $("#project_body").attr("userid") + "_" + $("#project_body").attr("pid");
        var slanes = $("#task_info_light").attr("current_slanes");
        var spoints = $("#task_info_light").attr("current_spoints");
        var img_s = $("#task_info_light").attr("current_img_s");
        var preslanes = $("#task_info_light").attr("slanes");
        img_s = parseInt(img_s) + 1;
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

        $.post("../../HandleCreateLightTask", {data: data, spoints: spoints, slanes: slanes, ids: ids, preslanes: preslanes}, function (result)
        {

            if (result.startsWith("1_"))
            {
                alert(result);

            }
            else
            {
                var out = result.split("M");
                $("#task_info_light").attr("current_slanes", out[0]);
                //$("#task_info_light").attr("current_img_s", out[1]);
                $("#imag1_light").attr('src', out[1] + '?t=' + new Date().getTime());

            }
        });
    }

    //alert(coords + " X: " + position.left + " Y: " + position.top);
}

function showCoords_Seg(event) {

    if (currentSegID !== 0)
    {
        var x = event.clientX;
        var y = event.clientY;
        var position = $("#imag1_seg").offset();
        var coords = "X coords: " + x + ", Y coords: " + y;
        var degree = $("#seg_Lane").attr("degree");
        var upnumber = $("#seg_Lane").attr("upnumber");
        var downnumber = $("#seg_Lane").attr("downnumber");
        var ids = $("#project_body").attr("userid") + "_" + $("#project_body").attr("pid");
        var slanes = $("#task_info_seg").attr("current_slanes");
        var spoints = $("#task_info_seg").attr("current_spoints");
        var preslanes = $("#task_info_seg").attr("slanes");
        var img_s = $("#task_info_seg").attr("current_img_s");
        img_s = parseInt(img_s) + 1;
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

        $.post("../../HandleCreateSegTask", {degree: degree, upnumber: upnumber, downnumber: downnumber, spoints: spoints, slanes: slanes, img_s: img_s, ids: ids, preslanes: preslanes}, function (result)
        {

            if (result.startsWith("1_"))
            {
                alert(result);

            }
            else
            {
                var out = result.split("M");
                $("#task_info_seg").attr("current_slanes", out[0]);
                //$("#task_info_seg").attr("current_img_s", out[1]);
                $("#imag1_seg").attr('src', out[1] + '?t=' + new Date().getTime());

            }
        });
    }

    //alert(coords + " X: " + position.left + " Y: " + position.top);
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

function updateLaneView_Light(id)
{

    var slanes = $("#light_task_id_" + id).attr("slanes");
    var spoints = $("#light_task_id_" + id).attr("spoints");
    var img_s = $("#light_task_id_" + id).attr("img_s");
    $("#task_info_light").attr("current_slanes", slanes);
    $("#task_info_light").attr("current_img_s", img_s);
    $("#task_info_light").attr("current_spoints", spoints);
    var img_path = $("#light_task_id_" + id).attr("img_path");
    $("#imag1_light").attr('src', img_path);
}

function updateLaneView_Seg(id)
{
    var slanes = $("#seg_task_id_" + id).attr("slanes");
    var spoints = $("#seg_task_id_" + id).attr("spoints");
    var img_s = $("#seg_task_id_" + id).attr("img_s");
    $("#task_info_seg").attr("current_slanes", slanes);
    $("#task_info-seg").attr("current_img_s", img_s);
    $("#task_info_seg").attr("current_spoints", spoints);
    var img_path = $("#seg_task_id_" + id).attr("img_path");
    $("#imag1_seg").attr('src', img_path);
}

function startLaneSelect(index)
{
    currentID = parseInt(index);
    updateLaneView(index);
}

function startLaneSelect_Light(index)
{
    currentLightID = parseInt(index);
    updateLaneView_Light(index);
}

function startLaneSelect_Seg(index)
{
    currentSegID = parseInt(index);
    updateLaneView_Seg(index);
}

function intersection_confirm()
{
    var copyFlag = $("#intersection_section").attr("copy");
    if (copyFlag === "1")
    {
        var tid = $("#intersection_section").attr("tmodelid");
        var date = $("#t_model_date").val();
        if (date === "")
        {
            alert("请输出新的调查的调查开始日期");
        }
        else
        {
            $.ajax({
                url: "../../HandleCreateCopyedModel",
                data: {"id": tid, "date": date},
                type: "GET",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
                },
                success: function (result) {
                    if (result === "0")
                    {
                        alert("调查复制失败");
                    }
                    else
                    {
                        alert("复制调查成功");
                        // cancel_basic_info();
                        $("#intersection_task").attr("flag", "false");
                        $("#intersection_task").hide();
                        $("#intersection_quhua").attr("flag", "false");
                        $("#intersection_quhua").show();
                        $("#intersection_section").attr("flag", "false");
                        $("#intersection_section").attr("copy", "0");
                        $("#intersection_section").hide();
                        setWorkingStatus(result, 0, 1);
                        //location.reload(true);
                    }
                }
            });
        }
    }
    else
    {
        var number = $("#intersection").attr("laneNumber");
        number = parseInt(number);
        var laneInfo = $("#intersection").attr("laneInfo");
        var name = $("#intersection").attr("name");
        var lat = $("#intersection").attr("lat");
        var lng = $("#intersection").attr("lng");
        var id = $("#intersection").attr("ids");
        var sslanes = $("#task_info").attr("slanes");
        var img_path = $("#img_result").attr("src");
        var working_status = 0;
        var type = 1;
        var sid = $("#project_body").attr("st_id");
        var mdate = $("#t_model_date").val();
        var data1 = '{"sid":"' + sid + '","id":"' + id + '","mdate":"' + mdate + '","slanes":"' + sslanes + '","name":"' + name + '","lat":"' + lat + '","lng":"' + lng + '","working_status":"' + working_status + '","img_path":"' + img_path + '","type":"' + type;
        data1 += '","laneinfo":"' + laneInfo;
        var lanes = '[';
        for (var i = 1; i <= number; i++)
        {
            var info = $("#intersection").attr("info" + i);
            var lane = $("#intersection").attr("lane" + i);
            if (info !== undefined && info !== "")
            {
                info = info.split("_");
                lanes += '{"id":"' + info[0] + '","name":"' + info[1] + '","degree":"' + info[2];
            }
            if (lane !== undefined && lane !== "")
            {
                //lane = lane.split("_");
                lanes += '","laneinfo":"' + lane + '"}';
            }
            if (i !== number)
            {
                lanes += ",";
            }
        }
        lanes += ']';

        data1 += '","lanes":' + lanes;

        var tasks = '[';
        var parent = document.getElementById("task_info");
        var lis = parent.getElementsByTagName("li");
        for (var i = 0; i < lis.length; i++)
        {
            if (i !== 0)
            {
                tasks += ",";
            }
            tasks += lis[i].getAttribute("basicinfo");
        }
        tasks += ']';
        data1 += ',"task_items":' + tasks + '}';
        if (laneInfo === "")
        {
            alert("请先确保渠化已经完成");
        }
        else if (img_path === "")
        {
            alert("请先生成渠化图");
        }
        else
        {
            //data=data.replace(/\"/gi, '\\\"');
            //var model_info = $("#intersection").attr("model_info");
            if (lis.length === 0)
            {
                var r = confirm("你还没有创建任务，你确定要保存吗?");
                if (r === true)
                {
                    $.ajax({
                        url: "../../HandleAddSurvey_Task_Model",
                        data: {"data": data1},
                        type: "GET",
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
                        },
                        success: function (result) {
                            if (result === "0")
                            {
                                alert(result);
                            }
                            else
                            {
                                //alert("已经保存信息成功");
                                // cancel_basic_info();
                                $("#intersection_task").attr("flag", "false");
                                $("#intersection_task").hide();
                                $("#intersection_quhua").attr("flag", "false");
                                $("#intersection_quhua").show();
                                $("#intersection_section").attr("flag", "false");
                                $("#intersection_section").hide();
                                setWorkingStatus(result, 0, 1);
                                //location.reload(true);
                            }
                        }
                    });
                }
            }
            else {
                $.ajax({
                    url: "../../HandleAddSurvey_Task_Model",
                    data: {"data": data1},
                    type: "GET",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
                    },
                    success: function (result) {
                        if (result === "0")
                        {
                            alert(result);
                        }
                        else
                        {

                            // cancel_basic_info();
                            $("#intersection_task").attr("flag", "false");
                            $("#intersection_task").hide();
                            $("#intersection_quhua").attr("flag", "false");
                            $("#intersection_quhua").show();
                            $("#intersection_section").attr("flag", "false");
                            $("#intersection_section").hide();
                            setWorkingStatus(result, 0, 1);
                            //location.reload(true);
                        }
                    }
                });

            }



        }
    }
}

function cancel_intersection()
{
    //setWorkingStatus(0);
    $("#intersection_task").attr("flag", "false");
    $("#intersection_task").hide();
    $("#intersection_quhua").attr("flag", "false");
    $("#intersection_quhua").show();
    $("#intersection_section").attr("flag", "false");
    $("#intersection_section").hide();
    var id = $("#intersection").attr("ids");
    if (id !== "" && id !== "0")
    {
        setWorkingStatus(id, 0, 0);
    }


}

function light_confirm()
{
    var number = $("#light").attr("laneNumber");
    number = parseInt(number);
    var laneInfo = $("#light").attr("laneInfo");
    var name = $("#light").attr("name");
    var lat = $("#light").attr("lat");
    var lng = $("#light").attr("lng");
    var id = $("#light").attr("ids");
    var img_path = $("#img_result_light").attr("src");
    var working_status = 0;
    var type = 3;
    var sid = $("#project_body").attr("st_id");
    var sslanes = $("#task_info_light").attr("slanes");
    var data1 = '{"sid":"' + sid + '","id":"' + id + '","slanes":"' + sslanes + '","name":"' + name + '","lat":"' + lat + '","lng":"' + lng + '","working_status":"' + working_status + '","img_path":"' + img_path + '","type":"' + type;
    data1 += '","laneinfo":"' + laneInfo;
    var lanes = '[';
    for (var i = 1; i <= number; i++)
    {
        var info = $("#light").attr("info" + i);
        var lane = $("#light").attr("lane" + i);
        if (info !== undefined && info !== "")
        {
            info = info.split("_");
            lanes += '{"id":"' + info[0] + '","name":"' + info[1] + '","degree":"' + info[2];
        }
        if (lane !== undefined && lane !== "")
        {
            //lane = lane.split("_");
            lanes += '","laneinfo":"' + lane + '"}';
        }
        if (i !== number)
        {
            lanes += ",";
        }
    }
    lanes += ']';

    data1 += '","lanes":' + lanes;

    var tasks = '[';
    var parent = document.getElementById("task_info_light");
    var lis = parent.getElementsByTagName("a");
    for (var i = 0; i < lis.length; i++)
    {
        if (i !== 0)
        {
            tasks += ",";
        }
        tasks += lis[i].getAttribute("basicinfo");
    }
    tasks += ']';
    data1 += ',"task_items":' + tasks + '}';
    if (laneInfo === "")
    {
        alert("请先确保渠化已经完成");
    }
    else if (img_path === "")
    {
        alert("请先生成渠化图");
    }
    else
    {
        //data=data.replace(/\"/gi, '\\\"');
        if (lis.length === 0)
        {
            var r = confirm("你还没有创建任务，你确定要保存吗?");
            if (r === true)
            {
                $.ajax({
                    url: "../../HandleAddSurvey_Task_Model",
                    data: {"data": data1},
                    type: "GET",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
                    },
                    success: function (result) {
                        if (result === "0")
                        {
                            alert(result);
                        }
                        else
                        {
                            //alert("已经保存信息成功");
                            // cancel_basic_info();
                            $("#light_task").attr("flag", "false");
                            $("#light_task").hide();
                            $("#light_quhua").attr("flag", "false");
                            $("#light_quhua").show();
                            $("#light_section").attr("flag", "false");
                            $("#light_section").hide();
                            setWorkingStatus(result, 0, 1);
                            //location.reload(true);
                        }
                    }
                });
            }
        }
        else {
            $.ajax({
                url: "../../HandleAddSurvey_Task_Model",
                data: {"data": data1},
                type: "GET",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
                },
                success: function (result) {
                    if (result === "0")
                    {
                        alert(result);
                    }
                    else
                    {
                        //alert("已经保存信息成功");
                        // cancel_basic_info();
                        $("#light_task").attr("flag", "false");
                        $("#light_task").hide();
                        $("#light_quhua").attr("flag", "false");
                        $("#light_quhua").show();
                        $("#light_section").attr("flag", "false");
                        $("#light_section").hide();
                        setWorkingStatus(result, 0, 1);
                        //location.reload(true);
                    }
                }
            });
        }



    }
}

function cancel_light()
{
    $("#light_task").attr("flag", "false");
    $("#light_task").hide();
    $("#light_quhua").attr("flag", "false");
    $("#light_quhua").show();
    $("#light_section").attr("flag", "false");
    $("#light_section").hide();
    var id = $("#light").attr("ids");
    if (id !== "" && id !== "0")
    {
        setWorkingStatus(id, 0, 0);
    }

}

function seg_confirm()
{


    var name = $("#seg_Lane").attr("name");
    var lat = $("#seg_Lane").attr("lat");
    var lng = $("#seg_Lane").attr("lng");
    var id = $("#seg_Lane").attr("ids");
    var degree = $("#seg_Lane").attr("degree");
    var upnumber = $("#seg_Lane").attr("upnumber");
    var downnumber = $("#seg_Lane").attr("downnumber");
    var img_path = $("#img_result_seg").attr("src");
    var sslanes = $("#task_info_seg").attr("slanes");
    var working_status = 0;
    var type = 2;
    var sid = $("#project_body").attr("st_id");
    var data1 = '{"sid":"' + sid + '","id":"' + id + '","slanes":"' + sslanes + '","name":"' + name + '","lat":"' + lat + '","lng":"' + lng + '","working_status":"' + working_status + '","img_path":"' + img_path + '","type":"' + type;
    data1 += '","upnumber":"' + upnumber + '","downnumber":"' + downnumber + '","degree":"' + degree;

    var tasks = '[';
    var parent = document.getElementById("task_info_seg");
    var lis = parent.getElementsByTagName("a");
    for (var i = 0; i < lis.length; i++)
    {

        if (i !== 0)
        {
            tasks += ",";
        }
        tasks += lis[i].getAttribute("basicinfo");
    }
    tasks += ']';
    data1 += '","task_items":' + tasks + '}';
    if (img_path === "")
    {
        alert("请先生成渠化图");
    }
    else
    {
        //data=data.replace(/\"/gi, '\\\"');
        if (lis.length === 0)
        {
            var r = confirm("你还没有创建任务，你确定要保存吗?");
            if (r === true)
            {
                $.ajax({
                    url: "../../HandleAddSurvey_Task_Model",
                    data: {"data": data1},
                    type: "GET",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
                    },
                    success: function (result) {
                        if (result === "1")
                        {
                            alert(result);
                        }
                        else
                        {
                            //alert("已经保存信息成功");
                            // cancel_basic_info();
                            $("#seg_task").attr("flag", "false");
                            $("#seg_task").hide();
                            $("#seg_quhua").attr("flag", "false");
                            $("#seg_quhua").show();
                            $("#seg_section").attr("flag", "false");
                            $("#seg_section").hide();
                            setWorkingStatus(result, 0, 1);
                            //location.reload(true);

                        }
                    }
                });
            }
        }
        else {
            $.ajax({
                url: "../../HandleAddSurvey_Task_Model",
                data: {"data": data1},
                type: "GET",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
                },
                success: function (result) {
                    if (result === "0")
                    {
                        alert(result);
                    }
                    else
                    {
                        //alert("已经保存信息成功");
                        // cancel_basic_info();
                        $("#seg_task").attr("flag", "false");
                        $("#seg_task").hide();
                        $("#seg_quhua").attr("flag", "false");
                        $("#seg_quhua").show();
                        $("#seg_section").attr("flag", "false");
                        $("#seg_section").hide();
                        setWorkingStatus(result, 0, 1);
                        //location.reload(true);
                    }
                }
            });

        }



    }
}

function cancel_seg()
{
    $("#seg_task").attr("flag", "flag");
    $("#seg_task").hide();
    $("#seg_quhua").attr("flag", "flag");
    $("#seg_quhua").show();
    $("#seg_section").attr("flag", "flag");
    $("#seg_section").hide();
    var id = $("#seg_Lane").attr("ids");
    if (id !== "" && id !== "0")
    {
        setWorkingStatus(id, 0, 0);
    }
}

function createTask()
{
    clearIntersectionTask();
    $("#task_time").show();
    var cindex = $("#task_info").attr("cindex");
    currentID = parseInt(cindex) + 1;
    $("#task_info").attr("current_slanes", "");
    var preslanes = $("#task_info").attr("slanes");
    if (preslanes === undefined || preslanes === "" || preslanes === null)
    {
        var imgPath = $("#img_result").attr("src");
        $("#imag1").attr('src', imgPath);
    }
    else
    {
        var simgpath = $("#task_info").attr("task_img");
        if (simgpath === "")
        {
            var data = $("#task_info").attr("intersection");

            var ids = $("#project_body").attr("userid") + "_" + $("#project_body").attr("pid");

            var slanes = $("#task_info").attr("current_slanes");
            var spoints = $("#task_info").attr("current_spoints");

            $.post("../../HandleCreateTask", {data: data, spoints: spoints, slanes: slanes, ids: ids, preslanes: preslanes}, function (result)
            {

                if (result.startsWith("1_"))
                {
                    alert(result);

                }
                else
                {
                    var out = result.split("M");
                    $("#imag1").attr('src', out[1] + '?t=' + new Date().getTime());
                    $("#task_info").attr("task_img", out[1] + '?t=' + new Date().getTime());
                }
            });
        }
        else
        {
            $("#imag1").attr('src', simgpath);
        }
    }
}

function showAllTask()
{
    var imgPath = $("#task_info").attr("imgPath");
    $("#imag1").attr('src', imgPath + '?t=' + new Date().getTime());
    currentID = 0;
    $("#task_info").attr("current_slanes", "");
    $("#task_info").attr("current_img_s", "");
    $("#task_info").attr("current_spoints", "");

}

function cancelTask()
{
    $("#task_cars").hide();
    $("#task_peizhi").hide();
    $("#task_time").hide();
    var cindex = $("#task_info").attr("cindex");
    //cindex = parseInt(cindex) - 1;
    currentID = 0;
    $("#task_info").attr("cindex", cindex);
    $("#task_info").attr("current_slanes", "");
    $("#task_info").attr("current_img_s", "");
    $("#task_info").attr("current_spoints", "");

}

function createTask_Light()
{
    $("#task_time_light").show();
    var cindex = $("#task_info_light").attr("cindex");
    //cindex = parseInt(cindex) + 1;
    currentLightID = parseInt(cindex) + 1;
    $("#task_info_light").attr("cindex", cindex);
    var imgPath = $("#img_result_light").attr("src");
    $("#imag1_light").attr('src', imgPath);
}

function showAllTask_Light()
{
    var imgPath = $("#task_info_light").attr("imgPath");
    $("#imag1_light").attr('src', imgPath + '?t=' + new Date().getTime());
    currentLightID = 0;
    $("#task_info_light").attr("current_slanes", "");
    $("#task_info_light").attr("current_img_s", "");
    $("#task_info_light").attr("current_spoints", "");

}

function cancelTask_Light()
{
    $("#task_time_light").hide();
    var cindex = $("#task_info_light").attr("cindex");
    //cindex = parseInt(cindex) - 1;
    currentLightID = 0;
    $("#task_info_light").attr("cindex", cindex);
    $("#task_info_light").attr("current_slanes", "");
    $("#task_info_light").attr("current_img_s", "");
    $("#task_info_light").attr("current_spoints", "");

}


function createTask_Seg()
{
    $("#task_time_seg").show();
    var cindex = $("#task_info_seg").attr("cindex");
    currentSegID = parseInt(cindex) + 1;
    $("#task_info_seg").attr("cindex", cindex);
    var imgPath = $("#img_result_seg").attr("src");
    $("#imag1_seg").attr('src', imgPath);
}

function showAllTask_Seg()
{
    var imgPath = $("#task_info_seg").attr("imgPath");
    $("#imag1_seg").attr('src', imgPath + '?t=' + new Date().getTime());
    currentSegID = 0;
    $("#task_info_seg").attr("current_slanes", "");
    $("#task_info_seg").attr("current_img_s", "");
    $("#task_info_seg").attr("current_spoints", "");

}

function cancelTask_Seg()
{
    $("#task_cars_seg").hide();
    $("#task_peizhi_seg").hide();
    $("#task_time_seg").hide();
    var cindex = $("#task_info_seg").attr("cindex");
    cindex = parseInt(cindex) - 1;
    currentSegID = 0;
    $("#task_info_seg").attr("cindex", cindex);
    $("#task_info_seg").attr("current_slanes", "");
    $("#task_info_seg").attr("current_img_s", "");
    $("#task_info_seg").attr("current_spoints", "");

}

function goMap()
{
    window.location = "mapSelection.html";
}

function initTBMap(lng, lat)
{
    var map = new BMap.Map("tb-map");
    lat = parseFloat(lat);
    lng = parseFloat(lng);
    map.centerAndZoom(new BMap.Point(lng, lat), 16);  // 初始化地图,设置中心点坐标和地图级别
    //map.addControl(new BMap.MapTypeControl());   //添加地图类型控件     // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(false);
}

function initTBMap_Light(lng, lat)
{
    var map = new BMap.Map("tb-map_light");
    lat = parseFloat(lat);
    lng = parseFloat(lng);
    map.centerAndZoom(new BMap.Point(lng, lat), 16);  // 初始化地图,设置中心点坐标和地图级别
    //map.addControl(new BMap.MapTypeControl());   //添加地图类型控件     // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(false);
    var allMarkers = [];
    var circle = new BMap.Circle(point, 180);
    circle.setStrokeColor("red");
    circle.setFillColor("red");
    allMarkers.push(circle);
    map.addOverlay(circle);
}

function initTBMap_Seg(lng, lat)
{
    var map = new BMap.Map("tb-map_seg");
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

function carTypeCancel()
{
    $("#task_cars").attr("data", "");
    $("#task_cars").hide();
}

function carTypeDigCancel()
{
    $("#task_peizhi").hide();
}

function showCarType()
{
    $("#task_peizhi").show();
}

function carTypeCancel_Light()
{
    $("#task_cars_light").attr("data", "");
    $("#task_cars_light").hide();
}

function carTypeDigCancel_Light()
{
    $("#task_peizhi_light").hide();
}

function showCarType_Light()
{
    $("#task_peizhi_light").show();
}

function carTypeCancel_Seg()
{
    $("#task_cars_seg").attr("data", "");
    $("#task_cars_seg").hide();
}

function carTypeDigCancel_Seg()
{
    $("#task_peizhi_seg").hide();
}

function showCarType_Seg()
{
    $("#task_peizhi_seg").show();
}

function loadBasicInfo()
{
    var pid = $("#project_body").attr("pid");
    if (pid === "0")
    {
    }
    else
    {
        var basicInfo = $("#project_body").attr("basicInfo");
        if (basicInfo !== "")
        {
            var obj = JSON.parse(basicInfo);
            $("#p_Name").val(obj.name);
            $("#p_Description").val(obj.description);
            $("#province").val(obj.province);
            $("#city").val(obj.city);
            $("#town").val(obj.town);
            $("#pstime").val(obj.stime);
            $("#petime").val(obj.etime);
            $("#p_budget").val(obj.budget);
            if (obj.path === "/")
            {
                $("#p_path").val("默认根目录");
            }
            else
            {
                $("#p_path").val(obj.path);
            }

        }
    }
}

function loadTaskModelInfo()
{
    var sid = $("#project_body").attr("st_id");
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
                var info = result;
                loadTaskModels(info);
            }
        }
    });

}


function showNav_Option(index)
{
    var seg_flag = $("#seg_section").attr("flag");
    var int_flag = $("#intersection_section").attr("flag");
    var light_flag = $("#light_section").attr("flag");
    var task_flag = $("#task_ass_section").attr("flag");
    if (seg_flag === "true" || int_flag === "true" || light_flag === "true" || task_flag === "true")
    {
        alert("请先确定或者取消当前页面，以免信息丢失");
    }
    else
    {
        var number = $("#myNavbar").attr("number");
        number = parseInt(number);
        for (var i = 0; i <= number; i++)
        {
            var id = i + "_nav";
            if (i === 0)
            {

            }
            else
            {
                $("#" + id).attr("class", "");
            }
        }
        var id = index + "_nav";
        if (index === 0)
        {
            id = index + "_nav_a";

        }
        else
        {
            $("#" + id).attr("class", "li_active");
        }

        $("#basic_info").hide();
        $("#basic_info").attr("flag", "false");

        $("#nav_tb_map").hide();
        $("#nav_tb_map").attr("flag", "false");
        $("#intersection_section").hide();
        $("#intersection_section").attr("flag", "false");

        $("#seg_section").hide();
        $("#seg_section").attr("flag", "false");

        $("#light_section").hide();
        $("#light_section").attr("flag", "false");

        $("#task_ass_section").hide();
        $("#task_ass_section").attr("flag", "false");

        $("#task_view_section").hide();

        $("#dash_section").hide();
        $("#dash_section").attr("flag", "false");

        $("#show_result_section").hide();
        if (index === 1)
        {
            loadBasicInfo();
            $("#basic_info").show();
            $("#basic_info").attr("flag", "true");
        }
        else if (index === 2)
        {
            $("#nav_tb_map").show();
            loadTaskModelInfo();
            $("#nav_tb_map").attr("flag", "true");
            //$("#intersection_section").hide();
            //$("#intersection_section").attr("flag", "false");
        }
        else if (index === 3)
        {
            loadAllTasks();
            $("#task_ass_section").show();
            $("#task_ass_section").attr("flag", "true");
        }
        else if (index === 4)//
        {
            loadCalendarEvents();
            $("#task_view_section").show();
            //$("#task_ass_section").attr("flag", "true");
        }
        else if (index === 8)
        {
            $("#dash_section").show();
            $("#dash_section").attr("flag", "true");
        }
        else if (index === 5)
        {
            initResultView();
            $("#show_result_section").show();
        }
    }

}

function carTypeConfrim()
{
    var carType = $('#carType').val();
    var names = carType.split("_");
    var carName = $('#carName').val();
    var car_min_length = $('#c_min_length').val();
    var car_max_length = $('#c_max_length').val();
    var car_min_weight = $('#c_min_weight').val();
    var car_max_weight = $('#c_max_weight').val();
    var car_factor = $('#car_factor').val();
    var data = '{"carType":"' + names[0] + '","type_name":"' + names[1] + '","name":"' + carName + '","car_min_length":"' + car_min_length + '","car_max_length":"'
            + car_max_length + '","car_min_weight":"' + car_min_weight + '","car_max_weight":"' + car_max_weight + '","car_factor":"' + car_factor + '"}';
    $("#task_cars").attr("data", data);
    $("#task_cars").hide();
    var cindex = $("#carTypes").attr("cindex");
    cindex = parseInt(cindex) + 1;
    $("#carTypes").attr("cindex", cindex);
    var parent = document.getElementById("carTypes");
    var tag = document.createElement("a");
    tag.setAttribute("href", "javascript:void(0)");
    tag.setAttribute("class", "list-group-item");
    tag.setAttribute("value", names[1]);
    tag.setAttribute("data", data);
    tag.setAttribute("type", names[0]);
    tag.setAttribute("onclick", "showCarTypeInfo('" + data + "')");
    tag.setAttribute("id", "t_id_" + cindex);
    tag.innerHTML = names[1] + '<span class="badge" onclick="carTypeDelete(' + cindex + ')">X</span>';
    parent.appendChild(tag);
    var number = $("#carTypes").attr("number");
    number = parseInt(number) + 1;
    $("#carTypes").attr("number", number);

}

function carTypeConfrim_Light()
{
    var carType = $('#carType_light').val();
    var names = carType.split("_");
    var carName = $('#carName_light').val();
    var car_min_length = $('#c_min_length_light').val();
    var car_max_length = $('#c_max_length_light').val();
    var car_min_weight = $('#c_min_weight_light').val();
    var car_max_weight = $('#c_max_weight_light').val();
    var car_factor = $('#car_factor_light').val();
    var data = '{"carType":"' + names[0] + '","type_name":"' + names[1] + '","name":"' + carName + '","car_min_length":"' + car_min_length + '","car_max_length":"'
            + car_max_length + '","car_min_weight":"' + car_min_weight + '","car_max_weight":"' + car_max_weight + '","car_factor":"' + car_factor + '"}';
    $("#task_cars_light").attr("data", data);
    $("#task_cars_light").hide();
    var cindex = $("#carTypes_light").attr("cindex");
    cindex = parseInt(cindex) + 1;
    $("#carTypes_light").attr("cindex", cindex);
    var parent = document.getElementById("carTypes_light");
    var tag = document.createElement("a");
    tag.setAttribute("href", "javascript:void(0)");
    tag.setAttribute("class", "list-group-item");
    tag.setAttribute("value", names[1]);
    tag.setAttribute("data", data);
    tag.setAttribute("type", names[0]);
    tag.setAttribute("onclick", "showCarTypeInfo_Light('" + data + "')");
    tag.setAttribute("id", "light_t_id_" + cindex);
    tag.innerHTML = names[1] + '<span class="badge" onclick="carTypeDelete_Light(' + cindex + ')">X</span>';
    parent.appendChild(tag);
    var number = $("#carTypes_light").attr("number");
    number = parseInt(number) + 1;
    $("#carTypes_light").attr("number", number);

}

function carTypeConfrim_Seg()
{
    var carType = $('#carType_seg').val();
    var names = carType.split("_");
    var carName = $('#carName_seg').val();
    var car_min_length = $('#c_min_length_seg').val();
    var car_max_length = $('#c_max_length_seg').val();
    var car_min_weight = $('#c_min_weight_seg').val();
    var car_max_weight = $('#c_max_weight_seg').val();
    var car_factor = $('#car_factor_seg').val();
    var data = '{"carType":"' + names[0] + '","type_name":"' + names[1] + '","name":"' + carName + '","car_min_length":"' + car_min_length + '","car_max_length":"'
            + car_max_length + '","car_min_weight":"' + car_min_weight + '","car_max_weight":"' + car_max_weight + '","car_factor":"' + car_factor + '"}';
    $("#task_cars_seg").attr("data", data);
    $("#task_cars_seg").hide();
    var cindex = $("#carTypes_seg").attr("cindex");
    cindex = parseInt(cindex) + 1;
    $("#carTypes_seg").attr("cindex", cindex);
    var parent = document.getElementById("carTypes_seg");
    var tag = document.createElement("a");
    tag.setAttribute("href", "javascript:void(0)");
    tag.setAttribute("class", "list-group-item");
    tag.setAttribute("value", names[1]);
    tag.setAttribute("data", data);
    tag.setAttribute("type", names[0]);
    tag.setAttribute("onclick", "showCarTypeInfo_Seg('" + data + "')");
    tag.setAttribute("id", "seg_t_id_" + cindex);
    tag.innerHTML = names[1] + '<span class="badge" onclick="carTypeDelete_Seg(' + cindex + ')">X</span>';
    parent.appendChild(tag);
    var number = $("#carTypes_seg").attr("number");
    number = parseInt(number) + 1;
    $("#carTypes_seg").attr("number", number);

}

function showCarTypeInfo(value)
{
    $("#task_cars").show();
    var obj = JSON.parse(value);
    $('#carType').val(obj.carType + "_" + obj.type_name);
    $('#carName').val(obj.name);
    $('#c_min_length').val(obj.car_min_length);
    $('#c_max_length').val(obj.car_max_length);
    $('#c_min_weight').val(obj.car_min_weight);
    $('#c_max_weight').val(obj.car_max_weight);
    $('#car_factor').val(obj.car_factor);

}

function showCarTypeInfo_Light(value)
{
    $("#task_cars_light").show();
    var obj = JSON.parse(value);
    $('#carType_light').val(obj.carType + "_" + obj.type_name);
    $('#carName_light').val(obj.name);
    $('#c_min_length_light').val(obj.car_min_length);
    $('#c_max_length_light').val(obj.car_max_length);
    $('#c_min_weight_light').val(obj.car_min_weight);
    $('#c_max_weight_light').val(obj.car_max_weight);
    $('#car_factor_light').val(obj.car_factor);

}

function showCarTypeInfo_Seg(value)
{
    $("#task_cars_seg").show();
    var obj = JSON.parse(value);
    $('#carType_seg').val(obj.carType + "_" + obj.type_name);
    $('#carName_seg').val(obj.name);
    $('#c_min_length_seg').val(obj.car_min_length);
    $('#c_max_length_seg').val(obj.car_max_length);
    $('#c_min_weight_seg').val(obj.car_min_weight);
    $('#c_max_weight_seg').val(obj.car_max_weight);
    $('#car_factor_seg').val(obj.car_factor);

}

function showTaskInfo(index)
{
    var value = $("#task_id_" + index).attr("basicInfo");
    var flag = $("#task_id_" + index).attr("c_status");
    if (flag !== "0")
    {
        $("#task_create_intersection").prop("disabled", true);
        $("#carTypeAdd").prop("disabled", true);
        $("#carTypeConfrim").prop("disabled", true);
    }
    else
    {
        $("#task_create_intersection").prop("disabled", false);
        $("#carTypeAdd").prop("disabled", false);
        $("#carTypeConfrim").prop("disabled", false);
    }
    $("#task_time").show();
    clearCarTyps();
    var cindex = $("#task_info").attr("cindex");
    currentID = parseInt(index);
    updateLaneView(index);
    var obj = JSON.parse(value);
    $('#stime').val(obj.stime);
    $('#etime').val(obj.etime);
    var check = obj.method;
    check = parseInt(check);
    if (check === 1)
    {
        document.getElementById("shipin").checked = true;
        document.getElementById("rengong").checked = false;
    }
    else
    {
        document.getElementById("rengong").checked = true;
        document.getElementById("shipin").checked = false;
    }

    var cts = obj.peizhi;
    for (var i = 0; i < cts.length; i++)
    {
        var cindex = $("#carTypes").attr("cindex");
        cindex = parseInt(cindex) + 1;
        $("#carTypes").attr("cindex", cindex);
        var parent = document.getElementById("carTypes");
        var tag = document.createElement("a");
        tag.setAttribute("href", "javascript:void(0)");
        tag.setAttribute("class", "list-group-item");
        tag.setAttribute("value", cts[i].type_name);
        tag.setAttribute("data", JSON.stringify(cts[i]));
        tag.setAttribute("type", cts[i].carType);
        tag.setAttribute("onclick", "showCarTypeInfo('" + JSON.stringify(cts[i]) + "')");
        tag.setAttribute("id", "t_id_" + cindex);
        tag.innerHTML = cts[i].type_name + '<span class="badge" onclick="carTypeDelete(' + cindex + ')">X</span>';
        parent.appendChild(tag);
        var number = $("#carTypes").attr("number");
        number = parseInt(number) + 1;
        $("#carTypes").attr("number", number);
    }
    showCarType();
}

function clearIntersectionTask()
{
    $('#stime').val("");
    $('#etime').val("");
    clearCarTyps();
}

function showTaskInfo_Light(index)
{
    var value = $("#light_task_id_" + index).attr("basicInfo");
    $("#task_time_light").show();
    var flag = $("#task_id_" + index).attr("c_status");
    if (flag !== "0")
    {
        $("#taskinfoSave_Light").prop("disabled", true);

    }
    else
    {
        $("#taskinfoSave_Light").prop("disabled", false);

    }
    //clearCarTyps_Light();
    var cindex = $("#task_info_light").attr("cindex");
    currentLightID = parseInt(index);
    updateLaneView_Light(index);
    var obj = JSON.parse(value);
    $('#stime_light').val(obj.stime);
    $('#etime_light').val(obj.etime);
    var check = obj.method;
    check = parseInt(check);
    if (check === 1)
    {
        document.getElementById("shipin_light").checked = true;
        document.getElementById("rengong_light").checked = false;
    }
    else
    {
        document.getElementById("rengong_light").checked = true;
        document.getElementById("shipin_light").checked = false;
    }


    var ltype = obj.light_type;
    ltype = parseInt(ltype);
    if (ltype === 1)
    {
        document.getElementById("dingshi_light").checked = true;
        document.getElementById("ganying_light").checked = false;
        document.getElementById("kongzhi_light").checked = false;
    }
    else if (ltype === 2)
    {
        document.getElementById("dingshi_light").checked = false;
        document.getElementById("ganying_light").checked = true;
        document.getElementById("kongzhi_light").checked = false;
    }
    else
    {
        document.getElementById("dingshi_light").checked = false;
        document.getElementById("ganying_light").checked = false;
        document.getElementById("kongzhi_light").checked = true;
    }

//    var cts = obj.peizhi;
//    for (var i = 0; i < cts.length; i++)
//    {
//        var cindex = $("#carTypes_light").attr("cindex");
//        cindex = parseInt(cindex) + 1;
//        $("#carTypes_light").attr("cindex", cindex);
//        var parent = document.getElementById("carTypes_light");
//        var tag = document.createElement("a");
//        tag.setAttribute("href", "javascript:void(0)");
//        tag.setAttribute("class", "list-group-item");
//        tag.setAttribute("value", cts[i].Name);
//        tag.setAttribute("data", cts[i]);
//        tag.setAttribute("type", cts[i].carType);
//        tag.setAttribute("onclick", "showCarTypeInfo_light('" + cts[i] + "')");
//        tag.setAttribute("id", "light_t_id_" + cindex);
//        tag.innerHTML = cts[i].Name + '<span class="badge" onclick="carTypeDelete_Light(' + cindex + ')">X</span>';
//        parent.appendChild(tag);
//        var number = $("#carTypes_light").attr("number");
//        number = parseInt(number) + 1;
//        $("#carTypes_light").attr("number", number);
//    }
}

function showTaskInfo_Seg(index)
{
    var value = $("#seg_task_id_" + index).attr("basicInfo");
    var flag = $("#seg_task_id_" + index).attr("c_status");
    if (flag !== "0")
    {
        $("#task_create_seg").prop("disabled", true);
        $("#carTypeAdd_Seg").prop("disabled", true);
        $("#carTypeConfrim_Seg").prop("disabled", true);
    }
    else
    {
        $("#task_create_seg").prop("disabled", false);
        $("#carTypeAdd_Seg").prop("disabled", false);
        $("#carTypeConfrim_Seg").prop("disabled", false);
    }
    $("#task_time_seg").show();
    clearCarTyps_Seg();
    var cindex = $("#task_info_seg").attr("cindex");
    currentSegID = parseInt(index);
    updateLaneView_Seg(index);
    var obj = JSON.parse(value);
    $('#stime_seg').val(obj.stime);
    $('#etime_seg').val(obj.etime);
    var check = obj.method;
    check = parseInt(check);
    if (check === 1)
    {
        document.getElementById("shipin_seg").checked = true;
        document.getElementById("rengong_seg").checked = false;
    }
    else
    {
        document.getElementById("rengong_seg").checked = true;
        document.getElementById("shipin_seg").checked = false;
    }
    var cts = obj.peizhi;
    for (var i = 0; i < cts.length; i++)
    {
        var cindex = $("#carTypes_seg").attr("cindex");
        cindex = parseInt(cindex) + 1;
        $("#carTypes_seg").attr("cindex", cindex);
        var parent = document.getElementById("carTypes_seg");
        var tag = document.createElement("a");
        tag.setAttribute("href", "javascript:void(0)");
        tag.setAttribute("class", "list-group-item");
        tag.setAttribute("value", cts[i].type_name);
        tag.setAttribute("data", JSON.stringify(cts[i]));
        tag.setAttribute("type", cts[i].carType);
        tag.setAttribute("onclick", "showCarTypeInfo_Seg('" + JSON.stringify(cts[i]) + "')");
        tag.setAttribute("id", "seg_t_id_" + cindex);
        tag.innerHTML = cts[i].type_name + '<span class="badge" onclick="carTypeDelete_Seg(' + cindex + ')">X</span>';
        parent.appendChild(tag);
        var number = $("#carTypes_seg").attr("number");
        number = parseInt(number) + 1;
        $("#carTypes_seg").attr("number", number);
    }

    showCarType_Seg();
}

function carTypeAdd()
{
    $("#task_cars").show();
}

function carTypeAdd_Light()
{
    $("#task_cars_light").show();
}
function carTypeAdd_Seg()
{
    $("#task_cars_seg").show();
}

function carTypeDelete(id)
{
    var parent = document.getElementById("carTypes");
    var item = document.getElementById("t_id_" + id);
    parent.removeChild(item);
}

function carTypeDelete_Light(id)
{
    var parent = document.getElementById("carTypes_light");
    var item = document.getElementById("light_t_id_" + id);
    parent.removeChild(item);
}

function carTypeDelete_Seg(id)
{
    var parent = document.getElementById("carTypes_seg");
    var item = document.getElementById("seg_t_id_" + id);
    parent.removeChild(item);
}

function initMapLocation()
{

}

function loadAllTasks()
{
    loadUsersInfo();
    $("#un_task_assign").empty();
    var sid = $("#project_body").attr("st_id");
    var allmodels = "";
    $.ajax({
        url: "../../HandleGetAllUNTasks",
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
            else
            {
                //alert("已经保存信息成功");
                // cancel_basic_info();\
                allmodels = result;
                if (allmodels !== null && allmodels !== "")
                {
                    var parent = document.getElementById("un_task_assign");
                    parent.innerHTML = "";
                    allmodels = JSON.parse(allmodels);
                    for (var k = 0; k < allmodels.length; k++)
                    {
                        var l1 = document.createElement("li");
                        l1.setAttribute("class", "list-group-item un_tmodel_class");
                        l1.setAttribute("style", "padding:0px;background: none;border: none;");
                        l1.setAttribute("ids", allmodels[k].id);
                        var divp = document.createElement("div");
                        divp.setAttribute("class", "panel-group tmodel_group");
                        divp.setAttribute("id", "un_tmodel_group_" + allmodels[k].id);
                        divp.setAttribute("ids", allmodels[k].id);
                        divp.setAttribute("style", "margin-bottom:5px;");
                        var divp1 = document.createElement("div");
                        divp1.setAttribute("class", "panel panel-default");
                        var divp_head = document.createElement("div");
                        divp_head.setAttribute("class", "panel-heading");
                        var task_times = allmodels[k].task_items_times;
                        var content = '<h4 class="panel-title">'
                                + ' <a data-toggle="collapse" href="#un_tomdel_tasks_' + allmodels[k].id + '">' + allmodels[k].showName + '&nbsp;&nbsp;' + allmodels[k].mdate + '&nbsp;&nbsp;<span id="un_tmodel_title_' + allmodels[k].id + '">' + task_times.length + '</span>个时段</a>'
                                + '</h4>';
                        divp_head.innerHTML = content;
                        divp1.appendChild(divp_head);
                        var divp_2 = document.createElement("div");
                        divp_2.setAttribute("class", "panel-collapse collapse");
                        divp_2.setAttribute("id", "un_tomdel_tasks_" + allmodels[k].id);
                        var ul_t = document.createElement("ul");
                        ul_t.setAttribute("class", "list-group");
                        ul_t.setAttribute("style", "margin-left: 5px;padding: 0px;");
                        ul_t.setAttribute("id", "un_tmodel_items_" + allmodels[k].id);
                        if (task_times !== null && task_times.length > 0)
                        {
                            for (var j = 0; j < task_times.length; j++)
                            {
                                //cindex=i+1;
                                var dtasks_times = task_times[j].items;
                                if (dtasks_times !== null && dtasks_times.length > 0)
                                {
                                    var l2 = document.createElement("li");
                                    l2.setAttribute("class", "list-group-item un_tmodel_time_class");
                                    l2.setAttribute("ids", task_times[j].id);
                                    l2.setAttribute("style", "margin-left:0px;padding: 0px;background: none;border: none;");
                                    var ddivp = document.createElement("div");
                                    ddivp.setAttribute("class", "panel-group tmodel_group");
                                    ddivp.setAttribute("id", "un_tmodel_task_group_" + task_times[j].id);
                                    ddivp.setAttribute("ids", task_times[j].id);
                                    ddivp.setAttribute("style", "margin-bottom:5px;");
                                    var ddivp1 = document.createElement("div");
                                    ddivp1.setAttribute("class", "panel panel-default");
                                    var ddivp_head = document.createElement("div");
                                    ddivp_head.setAttribute("class", "panel-heading");

                                    var content = '<h4 class="panel-title">'
                                            + ' <a data-toggle="collapse" href="#un_tmodel_tasks_' + task_times[j].id + '">' + task_times[j].name + '&nbsp;&nbsp;' + '<span id="un_tmodel_task_title_' + task_times[j].id + '">' + dtasks_times.length + '</span>个任务</a>'
                                            + '</h4>';
                                    ddivp_head.innerHTML = content;
                                    ddivp1.appendChild(ddivp_head);
                                    var ddivp_2 = document.createElement("div");
                                    ddivp_2.setAttribute("class", "panel-collapse collapse");
                                    ddivp_2.setAttribute("id", "un_tmodel_tasks_" + task_times[j].id);
                                    var dul_t = document.createElement("ul");
                                    dul_t.setAttribute("class", "list-group sourcejQ_assign");
                                    dul_t.setAttribute("style", "margin-left:0px;");
                                    dul_t.setAttribute("id", "un_tmodel_task_items_" + task_times[j].id);
                                    for (var i = 0; i < dtasks_times.length; i++)
                                    {
                                        var list = document.createElement("li");
                                        list.setAttribute("id", "ass_id_" + dtasks_times[i].id);
                                        list.setAttribute("index", dtasks_times[i].id);
                                        list.setAttribute("class", "list-group-item un_task_list un_task_assgin_item");
                                        list.setAttribute("pid", task_times[j].id);
                                        list.setAttribute("ppid", allmodels[k].id);
                                        list.setAttribute("name", dtasks_times[i].dcName);
                                        list.setAttribute("tid", dtasks_times[i].id);
                                        list.setAttribute("stm_id", dtasks_times[i].stm_id);
                                        list.setAttribute("method", dtasks_times[i].method);
                                        list.setAttribute("type", dtasks_times[i].type);
                                        list.setAttribute("stime", dtasks_times[i].stime);
                                        list.setAttribute("etime", dtasks_times[i].etime);
                                        list.setAttribute("duration", dtasks_times[i].duration);
                                        list.setAttribute("uid", "0");
                                        list.setAttribute("onclick", "fliterUserTime('" + dtasks_times[i].id + "','" + dtasks_times[i].method + "','" + dtasks_times[i].stime + "','" + dtasks_times[i].etime + "')");
                                        list.setAttribute("unsave", "1");
                                        var info = JSON.stringify(dtasks_times[i]);
                                        list.setAttribute("data", info);
                                        var sign;
                                        if (dtasks_times[i].type === 1)
                                        {
                                            sign = '<i class="fa fa-crosshairs fa-2x task_left_sign" aria-hidden="true"></i>';
                                        }
                                        else if (dtasks_times[i].type === 2)
                                        {
                                            sign = '<i class="fa fa-road fa-2x task_left_sign" aria-hidden="true"></i>';
                                        }
                                        else
                                        {
                                            sign = '<i class="fa fa-lightbulb-o fa-2x task_left_sign" aria-hidden="true"></i>';
                                        }
                                        list.innerHTML = sign +
                                                dtasks_times[i].dcName + '<i class="fa fa-info-circle fa-2x info_class" aria-hidden="true" onclick="showTask_Detail(\'' + dtasks_times[i].id + '\')"></i>';
                                        dul_t.appendChild(list);

                                    }
                                    ddivp_2.appendChild(dul_t);

                                    ddivp1.appendChild(ddivp_2);
                                    ddivp.appendChild(ddivp1);
                                    l2.appendChild(ddivp);
                                    ul_t.appendChild(l2);
                                }
                                divp_2.appendChild(ul_t);
                                divp1.appendChild(divp_2);
                                divp.appendChild(divp1);
                                l1.appendChild(divp);
                            }
                            parent.appendChild(l1);
                        }

                    }
                }
                loadDraggable_Assign();
            }
        }
    });

}


function loadAllTasks_V1()
{
    loadUsersInfo();
    $("#un_task_assign").empty();
    var sid = $("#project_body").attr("st_id");
    var allmodels = "";
    $.ajax({
        url: "../../HandleGetAllUNTasks",
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
            else
            {
                //alert("已经保存信息成功");
                // cancel_basic_info();\
                allmodels = result;
                if (allmodels !== null && allmodels !== "")
                {
                    var parent = document.getElementById("un_task_assign");
                    parent.innerHTML = "";
                    allmodels = JSON.parse(allmodels);
                    for (var j = 0; j < allmodels.length; j++)
                    {
                        var alltasks = allmodels[j].task_items;
                        if (alltasks.length > 0)
                        {
                            for (var i = 0; i < alltasks.length; i++)
                            {
                                var list = document.createElement("li");
                                list.setAttribute("id", "ass_id_" + alltasks[i].id);
                                list.setAttribute("index", alltasks[i].id);
                                list.setAttribute("class", "list-group-item un_task_list");
                                list.setAttribute("name", alltasks[i].name);
                                list.setAttribute("tid", alltasks[i].id);
                                list.setAttribute("stm_id", alltasks[i].stm_id);
                                list.setAttribute("method", alltasks[i].method);
                                list.setAttribute("type", alltasks[i].type);
                                list.setAttribute("stime", alltasks[i].stime);
                                list.setAttribute("etime", alltasks[i].etime);
                                list.setAttribute("duration", alltasks[i].duration);
                                list.setAttribute("uid", "0");
                                list.setAttribute("onclick", "fliterUserTime('" + alltasks[i].id + "','" + alltasks[i].method + "','" + alltasks[i].stime + "','" + alltasks[i].etime + "')");
                                list.setAttribute("unsave", "1");
                                var info = JSON.stringify(alltasks[i]);
                                list.setAttribute("data", info);
                                var sign;
                                if (alltasks[i].type === 1)
                                {
                                    sign = '<i class="fa fa-crosshairs fa-2x task_left_sign" aria-hidden="true"></i>';
                                }
                                else if (alltasks[i].type === 2)
                                {
                                    sign = '<i class="fa fa-road fa-2x task_left_sign" aria-hidden="true"></i>';
                                }
                                else
                                {
                                    sign = '<i class="fa fa-lightbulb-o fa-2x task_left_sign" aria-hidden="true"></i>';
                                }
                                list.innerHTML = sign +
                                        alltasks[i].name + '<i class="fa fa-info-circle fa-2x info_class" aria-hidden="true" onclick="showTask_Detail(\'' + alltasks[i].id + '\')"></i>';
                                parent.appendChild(list);
                                var pnumber = $("#un_task_assign").attr("number");
                                pnumber = parseInt(pnumber) + 1;
                                $("#un_task_assign").attr("number", pnumber);
                            }
//                            plist.appendChild(ulist);
//                            parent.appendChild(plist);
                        }
                    }
                }
                loadDraggable_Assign();
            }
        }
    });

}

function taskinfoSave()
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
        var info = "";
        var number = parseInt($("#carTypes").attr("number"));
        for (var i = 1; i <= number; i++)
        {
            var item = document.getElementById("t_id_" + i);
            if (item !== null && item !== undefined)
            {
                var data = item.getAttribute("data");
                if (i === 1 && i !== number)
                {
                    info += "[" + data;
                }
                else if (i === number && i !== 1)
                {
                    info += "," + data + "]";
                }
                else if (i === 1 && i === number)
                {
                    info += "[" + data + "]";
                }
                else
                {
                    info += "," + data;
                }
            }
        }
        if (info === "")
        {
            alert("请先配置车型");
            return 0;
        }
        var method = "";
        if ($("#shipin").prop('checked'))
        {
            method = '1';
        }
        if ($("#rengong").prop('checked'))
        {
            method = '2';
        }
        number = $("#task_info").attr("number");
        var ts = $("#t_model_date").val();
        var tss = ts.split("-");
        var name = " 流量, " + tss[0] + "年" + tss[1] + "月" + tss[2] + "日, " + stime + "--" + etime + ", " + duration + "分钟";
        var cindex = $("#task_info").attr("cindex");
        cindex = parseInt(cindex);
        if (currentID > cindex)
        {
            cindex = cindex + 1;
            var parent = document.getElementById("task_info");
            var tag = document.createElement("a");
            tag.setAttribute("href", "javascript:void(0)");
            tag.setAttribute("class", "list-group-item");
            tag.setAttribute("c_status", "0");
            tag.setAttribute("name", name);
            var alllanes = $("#task_info").attr("intersection");
            var slanes = $("#task_info").attr("current_slanes");
            if (slanes === "")
            {
                alert("请选择车道车流");
                return 0;
            }
            var spoints = $("#task_info").attr("current_spoints");
            var img_s = $("#task_info").attr("current_img_s");
            tag.setAttribute("spoints", spoints);
            tag.setAttribute("slanes", slanes);
            tag.setAttribute("img_s", img_s);
            var img_path = $("#imag1").attr("src");
            var type = 1;
            var stm_id = $("#intersection").attr("stm_id");
            tag.setAttribute("img_path", img_path);
            var tdate = $("#t_model_date").val();
            var datac = '{"stime":"' + stime + '","tdate":"' + tdate + '","alllanes":"' + alllanes + '","stm_id":"' + stm_id + '","id":"' + 0 + '","type":"' + type + '","duration":"' + duration + '","img_path":"' + img_path + '","etime":"' + etime + '","img_index":"' + img_s + '","slanes":"' + slanes + '","c_status":"' + 0 + '","name":"' + name + '","method":"' + method + '","light_type":"' + 0 + '","peizhi":' + info + '}';
            tag.setAttribute("basicInfo", datac);
            tag.setAttribute("ids", 0);
            tag.setAttribute("stm_id", stm_id);
            tag.setAttribute("stime", stime);
            tag.setAttribute("etime", etime);
            tag.setAttribute("duration", duration);
            tag.setAttribute("stm_id", stm_id);
            //tag.setAttribute("onclick", "startLaneSelect('" + cindex + "')");
            //tag.setAttribute("ondbclick", "showTaskInfo('" + datac + "')");
            tag.setAttribute("id", "task_id_" + cindex);
            tag.innerHTML = '<span id="name_task_id_' + cindex + '">' + name + '(未分配)</span>' + '<i class="fa fa-times-circle fa-2x close_class" onclick="taskDelete(' + cindex + ')"></i><i class="fa fa-info-circle fa-2x info_class" aria-hidden="true" onclick="showTaskInfo(' + cindex + ')"></i>';
            parent.appendChild(tag);
            number = parseInt(number) + 1;
            $("#task_info").attr("number", number);
            $("#task_info").attr("cindex", (cindex));
            clearCarTyps();
            $("#task_cars").hide();
            $("#task_peizhi").hide();
            $("#task_time").hide();
        }
        else
        {
            var tag = document.getElementById("task_id_" + currentID);
            tag.setAttribute("href", "javascript:void(0)");
            tag.setAttribute("class", "list-group-item");
            //tag.setAttribute("c_status", "0");
            tag.setAttribute("name", name);
            var alllanes = $("#task_info").attr("alllanes");
            var slanes = $("#task_info").attr("current_slanes");
            if (slanes === "")
            {
                alert("请选择车道车流");
                return 0;
            }
            var spoints = $("#task_info").attr("current_spoints");
            var img_s = $("#task_info").attr("current_img_s");
            tag.setAttribute("spoints", spoints);
            tag.setAttribute("slanes", slanes);
            tag.setAttribute("img_s", img_s);
            var img_path = $("#imag1").attr("src");
            var type = 1;
            var stm_id = $("#intersection").attr("stm_id");
            tag.setAttribute("img_path", img_path);
            var tdate = $("#t_model_date").val();
            var datac = '{"stime":"' + stime + '","tdate":"' + tdate + '","alllanes":"' + alllanes + '","stm_id":"' + stm_id + '","id":"' + 0 + '","type":"' + type + '","duration":"' + duration + '","img_path":"' + img_path + '","etime":"' + etime + '","img_index":"' + img_s + '","slanes":"' + slanes + '","c_status":"' + 0 + '","name":"' + name + '","method":"' + method + '","light_type":"' + 0 + '","peizhi":' + info + '}';
            tag.setAttribute("basicInfo", datac);
            tag.setAttribute("stime", stime);
            tag.setAttribute("etime", etime);
            tag.setAttribute("duration", duration);
            var cstatus = tag.getAttribute("c_status");
            cstatus = parseInt(cstatus);
            if (cstatus === 1)
            {
                name = name + "   (等待接受中)";
            }
            else if (cstatus === 2)
            {
                name = name + "   (任务进行中)";
            }
            else if (cstatus === 3)
            {
                name = name + "   (任务审核中)";
            }
            else if (cstatus === 4)
            {
                name = name + "   (任务完成)";
            }
            else if (cstatus === 5)
            {
                name = name + "   (任务重做中)";
            }
            else
            {
                name = name + "   (未分配)";
            }
            $("#name_task_id_" + currentID).text(name);
            clearCarTyps();
            $("#task_cars").hide();
            $("#task_peizhi").hide();
            $("#task_time").hide();

        }
        //(1);
    }
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

function taskinfoSave_V1()
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
        var info = "";
        var number = parseInt($("#carTypes").attr("number"));
        var gName;
        var id_index = 0;
        var carNames = "车型:";
        var dNames = "";
        for (var i = 1; i <= number; i++)
        {
            var item = document.getElementById("t_id_" + i);
            if (item !== null && item !== undefined)
            {
                var data = item.getAttribute("data");
                if (i === 1 && i !== number)
                {
                    info += "[" + data;
                }
                else if (i === number && i !== 1)
                {
                    info += "," + data + "]";
                }
                else if (i === 1 && i === number)
                {
                    info += "[" + data + "]";
                }
                else
                {
                    info += "," + data;
                }
                data = JSON.parse(data);
                carNames += data.type_name;
            }
        }
        if (info === "")
        {
            alert("请先配置车型");
            return 0;
        }
        var method = "";
        if ($("#shipin").prop('checked'))
        {
            method = '1';
        }
        if ($("#rengong").prop('checked'))
        {
            method = '2';
        }
        var tnumber = $("#task_info").attr("number");
        var parent = document.getElementById("task_info");
        var name = "时间段:" + stime + "--" + etime + ", " + duration + "分钟";
        $(".tmodel_group").each(function () {
            var st = $(this).attr("stime");
            var et = $(this).attr("etime");
            if (st === stime && et === etime)
            {
                id_index = parseInt($(this).attr("ids"));
            }
        });

        if (id_index === 0)
        {
            tnumber = parseInt(tnumber) + 1;
            var tag = document.createElement("li");
            tag.setAttribute("href", "javascript:void(0)");
            tag.setAttribute("class", "list-group-item");
            tag.setAttribute("c_status", "0");

            var alllanes = $("#task_info").attr("intersection");
            var slanes = $("#task_info").attr("current_slanes");
            if (slanes === "")
            {
                alert("请选择车道车流");
                return 0;
            }
            else
            {
                dNames = getDName(slanes, alllanes);
                gName = dNames + "&nbsp;" + carNames;
            }
            tag.setAttribute("name", gName);
            var spoints = $("#task_info").attr("current_spoints");
            tag.setAttribute("spoints", spoints);
            tag.setAttribute("slanes", slanes);
            var img_path = $("#imag1").attr("src");
            var type = 1;
            var stm_id = $("#intersection").attr("stm_id");
            tag.setAttribute("img_path", img_path);
            var tdate = $("#t_model_date").val();
            var datac = '{"stime":"' + stime + '","tdate":"' + tdate + '","alllanes":"' + alllanes + '","stm_id":"' + stm_id + '","id":"' + 0 + '","type":"' + type + '","duration":"' + duration + '","img_path":"' + img_path + '","etime":"' + etime + '","slanes":"' + slanes + '","c_status":"' + 0 + '","showName":"' + name + '","method":"' + method + '","light_type":"' + 0 + '","peizhi":' + info + '}';
            tag.setAttribute("basicInfo", datac);
            tag.setAttribute("ids", 0);
            tag.setAttribute("stm_id", stm_id);
            tag.setAttribute("stime", stime);
            tag.setAttribute("etime", etime);
            tag.setAttribute("duration", duration);
            tag.setAttribute("stm_id", stm_id);
            tag.setAttribute("id", "task_id_" + tnumber + "_" + 1);
            tag.innerHTML = '<div class="taskModel_span" id="name_task_id_' + tnumber + '_' + 1 + '">' + 1 + '.' + gName + '</div>&nbsp;<span style="color:black;">' + '(未分配)' + '</span>' + '<i style="color:black" class="fa fa-times-circle fa-2x close_class" onclick="taskDelete(\'' + tnumber + '_' + 1 + '\')"></i><i style="color:black" class="fa fa-info-circle fa-2x info_class" aria-hidden="true" onclick="showTaskInfo(\'' + tnumber + '_' + 1 + '\')"></i>';

            var divp = document.createElement("div");
            divp.setAttribute("class", "panel-group tmodel_group");
            divp.setAttribute("id", "tmodel_group_" + tnumber);
            divp.setAttribute("style", "margin-bottom:5px;");
            divp.setAttribute("ids", '1');
            divp.setAttribute("stime", stime);
            divp.setAttribute("etime", etime);
            var divp1 = document.createElement("div");
            divp1.setAttribute("class", "panel panel-default");
            var divp_head = document.createElement("div");
            divp_head.setAttribute("class", "panel-heading");
            var content = '<h4 class="panel-title">'
                    + ' <a data-toggle="collapse" href="#time_tasks_' + tnumber + '">' + name + '&nbsp;&nbsp;' + '共<span id="tmodel_title_' + tnumber + '">' + 1 + '</span><span class="copyTasksTimes" onclick="makeCopyTasks(\'' + stm_id + '\',\'' + stime + '\',\'' + etime + '\')">复制此时段</span></a>'
                    + '</h4>';
            divp_head.innerHTML = content;
            divp1.appendChild(divp_head);
            var divp_2 = document.createElement("div");
            divp_2.setAttribute("class", "panel-collapse collapse");
            divp_2.setAttribute("id", "time_tasks_" + tnumber);
            var ul_t = document.createElement("ul");
            ul_t.setAttribute("class", "list-group");
            ul_t.setAttribute("id", "task_times_" + tnumber);
            ul_t.setAttribute("number", "1");
            ul_t.setAttribute("slanes", slanes);

            $("#task_info").attr("number", tnumber);
            ul_t.appendChild(tag);
            divp_2.appendChild(ul_t);
            divp1.appendChild(divp_2);
            divp.appendChild(divp1);
            parent.appendChild(divp);
        }
        else
        {
            var unumber = $("#task_times_" + id_index).attr("number");
            unumber = parseInt(unumber);
            var tag = document.createElement("li");
            tag.setAttribute("href", "javascript:void(0)");
            tag.setAttribute("class", "list-group-item");
            tag.setAttribute("c_status", "0");

            var alllanes = $("#task_info").attr("intersection");
            var slanes = $("#task_info").attr("current_slanes");
            if (slanes === "")
            {
                alert("请选择车道车流");
                return 0;
            }
            var spoints = $("#task_info").attr("current_spoints");
            tag.setAttribute("spoints", spoints);
            tag.setAttribute("slanes", slanes);
            var img_path = $("#imag1").attr("src");
            var type = 1;
            var stm_id = $("#intersection").attr("stm_id");
            tag.setAttribute("img_path", img_path);
            var tdate = $("#t_model_date").val();
            var datac = '{"stime":"' + stime + '","tdate":"' + tdate + '","alllanes":"' + alllanes + '","stm_id":"' + stm_id + '","id":"' + 0 + '","type":"' + type + '","duration":"' + duration + '","img_path":"' + img_path + '","etime":"' + etime + '","slanes":"' + slanes + '","c_status":"' + 0 + '","showName":"' + name + '","method":"' + method + '","light_type":"' + 0 + '","peizhi":' + info + '}';
            tag.setAttribute("basicInfo", datac);
            tag.setAttribute("ids", 0);
            tag.setAttribute("stm_id", stm_id);
            tag.setAttribute("stime", stime);
            tag.setAttribute("etime", etime);
            tag.setAttribute("duration", duration);
            tag.setAttribute("stm_id", stm_id);
            tag.setAttribute("id", "task_id_" + id_index + "_" + (unumber + 1));
            var ul_t = document.getElementById("task_times_" + id_index);
            var pSlanes = ul_t.getAttribute("slanes");
            pSlanes += "L" + slanes;
            dNames = getDName(slanes, alllanes);
            gName = dNames + "&nbsp;" + carNames;
            tag.setAttribute("name", gName);
            tag.innerHTML = '<div class="taskModel_span" id="name_task_id_' + id_index + "_" + (unumber + 1) + '">' + (unumber + 1) + '.' + gName + '</div>&nbsp;<span style="color:black;">' + '(未分配)' + '</span>' + '<i style="color:black" class="fa fa-times-circle fa-2x close_class" onclick="taskDelete(\'' + id_index + "_" + (unumber + 1) + '\')"></i><i style="color:black" class="fa fa-info-circle fa-2x info_class" aria-hidden="true" onclick="showTaskInfo(\'' + id_index + "_" + (unumber + 1) + '\')"></i>';

            ul_t.appendChild(tag);
            ul_t.setAttribute("number", "" + (unumber + 1));
            ul_t.setAttribute("slanes", pSlanes);
            $("#tmodel_title_" + id_index).text((unumber + 1));
        }

        clearCarTyps();
        $("#task_cars").hide();
        $("#task_peizhi").hide();
        $("#task_time").hide();
        //(1);
    }
}

function taskinfoSave_Light()
{
    var stime = $('#stime_light').val();
    var etime = $('#etime_light').val();
    var duration = getTimeDiff(stime, etime);
    if (duration <= 0)
    {
        alert("时间选择不正确");
    }

    else
    {
        var method = "1";
        if ($("#shipin_light").prop('checked'))
        {
            method = '1';
        }
        if ($("#rengong_light").prop('checked'))
        {
            method = '2';
        }
        var lightType = "1";
        if ($("#dingshi_light").prop('checked'))
        {
            lightType = '1';
        }
        if ($("#ganying_light").prop('checked'))
        {
            lightType = '2';
        }
        if ($("#kongzhi_light").prop('checked'))
        {
            lightType = '3';
        }

        var number = $("#task_info_light").attr("number");
        number = parseInt(number) + 1;
        var ts = $("#t_model_date").val();
        var tss = ts.split("-");
        var name = " 信号, " + tss[0] + "年" + tss[1] + "月" + tss[2] + "日, " + stime + ", " + duration + "分钟";
        var cindex = $("#task_info_light").attr("cindex");
        cindex = parseInt(cindex);
        if (currentLightID > cindex)
        {
            cindex = cindex + 1;
            var parent = document.getElementById("task_info_light");
            var tag = document.createElement("a");
            tag.setAttribute("href", "javascript:void(0)");
            tag.setAttribute("class", "list-group-item");
            tag.setAttribute("c_status", "0");
            tag.setAttribute("name", name);
            var alllanes = $("#task_info_light").attr("light");
            var slanes = $("#task_info_light").attr("current_slanes");
            var spoints = $("#task_info_light").attr("current_spoints");
            var img_s = $("#task_info_light").attr("current_img_s");
            tag.setAttribute("spoints", spoints);
            tag.setAttribute("slanes", slanes);
            tag.setAttribute("img_s", img_s);
            var img_path = $("#imag1_light").attr("src");
            var type = 3;
            var stm_id = $("#light").attr("stm_id");
            tag.setAttribute("img_path", img_path);
            var datac = '{"stime":"' + stime + '","alllanes":"' + alllanes + '","stm_id":"' + stm_id + '","id":"' + 0 + '","type":"' + type + '","duration":"' + duration + '","img_path":"' + img_path + '","etime":"' + etime + '","img_index":"' + img_s + '","slanes":"' + slanes + '","c_status":"' + 0 + '","name":"' + name + '","method":"' + method + '","light_type":"' + lightType + '"}';
            tag.setAttribute("basicInfo", datac);
            tag.setAttribute("ids", 0);
            tag.setAttribute("stm_id", stm_id);
            tag.setAttribute("stime", stime);
            tag.setAttribute("etime", etime);
            tag.setAttribute("duration", duration);
            //tag.setAttribute("onclick", "startLaneSelect_Light('" + cindex + "')");
            //tag.setAttribute("ondbclick", "showTaskInfo_Light('" + datac + "')");
            tag.setAttribute("id", "light_task_id_" + cindex);
            tag.innerHTML = '<span id="name_light_task_id_' + cindex + '">' + name + '(未分配)</span>' + '<i class="fa fa-times-circle fa-2x close_class" onclick="taskDelete_Light(' + cindex + ')"></i><i class="fa fa-info-circle fa-2x info_class" aria-hidden="true" onclick="showTaskInfo_Light(' + cindex + ')"></i>';
            parent.appendChild(tag);
            $("#task_info_light").attr("number", number);
            $("#task_info_light").attr("cindex", (cindex));
            $("#task_time_light").hide();
        }
        else
        {
            var tag = document.getElementById("light_task_id_" + currentLightID);
            tag.setAttribute("href", "javascript:void(0)");
            tag.setAttribute("class", "list-group-item");
            //tag.setAttribute("c_status", "0");
            tag.setAttribute("name", name);
            var alllanes = $("#task_info_light").attr("light");
            var slanes = $("#task_info_light").attr("current_slanes");
            var spoints = $("#task_info_light").attr("current_spoints");
            var img_s = $("#task_info_light").attr("current_img_s");
            tag.setAttribute("spoints", spoints);
            tag.setAttribute("slanes", slanes);
            tag.setAttribute("img_s", img_s);
            var img_path = $("#imag1_light").attr("src");
            var type = 3;
            tag.setAttribute("img_path", img_path);
            var stm_id = $("#light").attr("stm_id");
            var datac = '{"stime":"' + stime + '","alllanes":"' + alllanes + '","stm_id":"' + stm_id + '","id":"' + 0 + '","type":"' + type + '","duration":"' + duration + '","img_path":"' + img_path + '","etime":"' + etime + '","img_index":"' + img_s + '","slanes":"' + slanes + '","c_status":"' + 0 + '","name":"' + name + '","method":"' + method + '","light_type":"' + 0 + '","peizhi":' + info + '}';
            tag.setAttribute("basicInfo", datac);
            tag.setAttribute("stime", stime);
            tag.setAttribute("etime", etime);
            tag.setAttribute("duration", duration);
            var cstatus = tag.getAttribute("c_status");
            cstatus = parseInt(cstatus);
            if (cstatus === 1)
            {
                name = name + "   (等待接受中)";
            }
            else if (cstatus === 2)
            {
                name = name + "   (任务进行中)";
            }
            else if (cstatus === 3)
            {
                name = name + "   (任务完成)";
            }
            else
            {
                name = name + "   (未分配)";
            }
            $("#name_light_task_id_" + currentSegID).text(name);
            $("#task_time_light").hide();
        }
        //(3);
    }

}

function taskinfoSave_Seg()
{
    var stime = $('#stime_seg').val();
    var etime = $('#etime_seg').val();
    var duration = getTimeDiff(stime, etime);
    if (duration <= 0)
    {
        alert("时间选择不正确");
    }
    else
    {
        var info = "";
        var number = parseInt($("#carTypes_seg").attr("number"));
        for (var i = 1; i <= number; i++)
        {
            var item = document.getElementById("seg_t_id_" + i);
            if (item !== null && item !== undefined)
            {
                var data = item.getAttribute("data");
                if (i === 1 && i !== number)
                {
                    info += "[" + data;
                }
                else if (i === number && i !== 1)
                {
                    info += "," + data + "]";
                }
                else if (i === 1 && i === number)
                {
                    info += "[" + data + "]";
                }
                else
                {
                    info += "," + data;
                }
            }
        }

        var method = "";
        if ($("#shipin_seg").prop('checked'))
        {
            method = '1';
        }
        if ($("#rengong_seg").prop('checked'))
        {
            method = '2';
        }
        number = $("#task_info_seg").attr("number");
        number = parseInt(number) + 1;
        var ts = $("#t_model_date").val();
        var tss = ts.split("-");
        var name = " 流量, " + tss[0] + "年" + tss[1] + "月" + tss[2] + "日, " + stime + "--" + etime + ", " + duration + "分钟";
        var cindex = $("#task_info_seg").attr("cindex");
        cindex = parseInt(cindex);
        if (currentSegID > cindex)
        {
            cindex = cindex + 1;
            var parent = document.getElementById("task_info_seg");
            var tag = document.createElement("a");
            tag.setAttribute("href", "javascript:void(0)");
            tag.setAttribute("class", "list-group-item");
            tag.setAttribute("c_status", "0");
            tag.setAttribute("name", name);
            var slanes = $("#task_info_seg").attr("current_slanes");
            var spoints = $("#task_info_seg").attr("current_spoints");
            var img_s = $("#task_info_seg").attr("current_img_s");
            tag.setAttribute("spoints", spoints);
            tag.setAttribute("slanes", slanes);
            tag.setAttribute("img_s", img_s);
            var img_path = $("#imag1_seg").attr("src");
            var type = 2;
            var stm_id = $("#seg_Lane").attr("stm_id");
            tag.setAttribute("img_path", img_path);
            var datac = '{"stime":"' + stime + '","stm_id":"' + stm_id + '","id":"' + 0 + '","type":"' + type + '","duration":"' + duration + '","img_path":"' + img_path + '","etime":"' + etime + '","img_index":"' + img_s + '","slanes":"' + slanes + '","c_status":"' + 0 + '","name":"' + name + '","method":"' + method + '","light_type":"' + 0 + '","peizhi":' + info + '}';
            tag.setAttribute("basicInfo", datac);
            tag.setAttribute("ids", 0);
            tag.setAttribute("stm_id", stm_id);
            tag.setAttribute("stime", stime);
            tag.setAttribute("etime", etime);
            tag.setAttribute("duration", duration);
            tag.setAttribute("stm_id", stm_id);
            tag.setAttribute("id", "seg_task_id_" + cindex);
            tag.innerHTML = '<span id="name_seg_task_id_' + cindex + '">' + name + '(未分配)</span>' + '<i class="fa fa-times-circle fa-2x close_class" onclick="taskDelete_Seg(' + cindex + ')"></i><i class="fa fa-info-circle fa-2x info_class" aria-hidden="true" onclick="showTaskInfo_Seg(' + cindex + ')"></i>';
            parent.appendChild(tag);
            $("#task_info_seg").attr("number", number);
            $("#task_info_seg").attr("cindex", (cindex));
            clearCarTyps();
            $("#task_cars_seg").hide();
            $("#task_peizhi_seg").hide();
            $("#task_time_seg").hide();
        }
        else
        {
            var tag = document.getElementById("seg_task_id_" + currentSegID);
            tag.setAttribute("href", "javascript:void(0)");
            tag.setAttribute("class", "list-group-item");
            //tag.setAttribute("c_status", "0");
            tag.setAttribute("name", name);
            var alllanes = $("#task_info_seg").attr("alllanes");
            var slanes = $("#task_info_seg").attr("current_slanes");
            var spoints = $("#task_info_seg").attr("current_spoints");
            var img_s = $("#task_info_seg").attr("current_img_s");
            tag.setAttribute("spoints", spoints);
            tag.setAttribute("slanes", slanes);
            tag.setAttribute("img_s", img_s);
            var img_path = $("#imag1_seg").attr("src");
            var type = 2;
            tag.setAttribute("img_path", img_path);
            var stm_id = $("#seg_Lane").attr("stm_id");
            var datac = '{"stime":"' + stime + '","alllanes":"' + alllanes + '","stm_id":"' + stm_id + '","id":"' + 0 + '","type":"' + type + '","duration":"' + duration + '","img_path":"' + img_path + '","etime":"' + etime + '","img_index":"' + img_s + '","slanes":"' + slanes + '","c_status":"' + 0 + '","name":"' + name + '","method":"' + method + '","light_type":"' + 0 + '","peizhi":' + info + '}';
            tag.setAttribute("basicInfo", datac);
            tag.setAttribute("stime", stime);
            tag.setAttribute("etime", etime);
            tag.setAttribute("duration", duration);
            var cstatus = tag.getAttribute("c_status");
            cstatus = parseInt(cstatus);
            if (cstatus === 1)
            {
                name = name + "   (等待接受中)";
            }
            else if (cstatus === 2)
            {
                name = name + "   (任务进行中)";
            }
            else if (cstatus === 3)
            {
                name = name + "   (任务完成)";
            }
            else
            {
                name = name + "   (未分配)";
            }
            $("#name_seg_task_id_" + currentSegID).text(name);
            clearCarTyps();
            $("#task_cars_seg").hide();
            $("#task_peizhi_seg").hide();
            $("#task_time_seg").hide();
        }

        //updateSlanes(2);
    }
}

function clearCarTyps()
{
    var obj = document.getElementById("carTypes");
    $("#carTypes").attr("number", "0");
    $("#carTypes").attr("cindex", "0");
    obj.innerHTML = "";
}

function clearCarTyps_Light()
{
    var obj = document.getElementById("carTypes_light");
    $("#carTypes_light").attr("number", "0");
    $("#carTypes_light").attr("cindex", "0");
    obj.innerHTML = "";
}

function clearCarTyps_Seg()
{
    var obj = document.getElementById("carTypes_seg");
    $("#carTypes_seg").attr("number", "0");
    $("#carTypes_seg").attr("cindex", "0");
    obj.innerHTML = "";
}
function taskDelete_Seg(id)
{
    var parent = document.getElementById("task_info_seg");
    var item = document.getElementById("seg_task_id_" + id);
    var cstatus = item.getAttribute("c_status");
    cstatus = parseInt(cstatus);
    if (cstatus === 0)
    {
        parent.removeChild(item);
    }
    else
    {
        alert("此任务正在进行中，你没有权限删除");
    }

}


function taskDelete(id)
{
    var pid = id.split("_");
    pid = pid[0];
    //divp.setAttribute("id", "tmodel_group_"+(j+1));
    var ppparent = document.getElementById("task_info");
    var pparent = document.getElementById("tmodel_group_" + pid);
    var parent = document.getElementById("task_times_" + pid);
    var item = document.getElementById("task_id_" + id);
    var cstatus = item.getAttribute("c_status");
    cstatus = parseInt(cstatus);
    if (cstatus === 0)
    {
        parent.removeChild(item);
        var number = parent.getAttribute("number");
        number = parseInt(number) - 1;
        if (number > 0)
        {
            parent.setAttribute("number", number);
            $("#tmodel_title_" + pid).text(number);
        }
        else
        {
            ppparent.removeChild(pparent);
            number = ppparent.getAttribute("number");
            number = parseInt(number) - 1;
            ppparent.setAttribute("number", number);
        }
    }
    else
    {
        alert("此任务正在进行中，你没有权限删除");
    }
}

function taskDelete_Light(id)
{
    var parent = document.getElementById("task_info_light");
    var item = document.getElementById("light_task_id_" + id);
    var cstatus = item.getAttribute("c_status");
    cstatus = parseInt(cstatus);
    if (cstatus === 0)
    {
        parent.removeChild(item);
    }
    else
    {
        alert("此任务正在进行中，你没有权限删除");
    }
}

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


function save_intersection_info()
{
    var flag = $("#intersection_quhua").attr("flag");
    if (flag === "true")
    {
        $("#intersection_section").hide();
        $("#intersection_section").attr("flag", "false");
    }
    else
    {
        alert("请先完成交叉口渠化!");
    }
}

function save_light_info()
{
    var flag = $("#light_quhua").attr("flag");
    if (flag === "true")
    {
        $("#light_section").hide();
        $("#light_section").attr("flag", "false");
    }
    else
    {
        alert("请先完成交叉口渠化!");
    }
}

function save_seg_info()
{
    var flag = $("#seg_quhua").attr("flag");
    if (flag === "true")
    {
        $("#seg_section").hide();
        $("#seg_section").attr("flag", "false");
    }
    else
    {
        alert("请先完成交叉口渠化!");
    }
}

function show_seg_option(option)
{
    $("#seg_option_1").attr("class", "intersection_title");
    $("#seg_option_2").attr("class", "intersection_title");
    if (option === 1)
    {
        $("#seg_option_1").attr("class", "intersection_title intersection_title_active");
        $("#seg_task").attr("flag", "false");
        $("#seg_task").hide();
        $("#seg_quhua").attr("flag", "true");
        $("#seg_quhua").show();

    }
    else
    {
        var laneInfo = $("#seg_Lane").attr("upnumber");
        var dm = $("#seg_Lane").attr("downnumber");
        if (laneInfo === "" || laneInfo === "0" || dm === "0" || dm === "")
        {
            $("#seg_option_1").attr("class", "intersection_title intersection_title_active");
            alert("请首先创建交叉口示意图");
        }
        else
        {

            var info = $("#task_info_seg").attr("flag");
            $("#seg_quhua").attr("flag", "false");
            $("#seg_quhua").hide();
            $("#seg_task").attr("flag", "true");
            $("#seg_task").show();
            $("#seg_option_2").attr("class", "intersection_title intersection_title_active");
            $("#seg_option_1").attr("class", "intersection_title");
            var imgPath = $("#img_result_seg").attr("src");
            $("#imag1_seg").attr('src', imgPath);


        }

    }


}

function show_intersection_option(option)
{
    $("#inter_option_1").attr("class", "intersection_title");
    $("#inter_option_2").attr("class", "intersection_title");
    if (option === 1)
    {
        $("#inter_option_1").attr("class", "intersection_title intersection_title_active");
        $("#intersection_task").attr("flag", "false");
        $("#intersection_task").hide();
        $("#intersection_quhua").attr("flag", "true");
        $("#intersection_quhua").show();

    }
    else
    {
        var laneInfo = $("#intersection").attr("laneInfo");

        if (laneInfo === "")
        {
            $("#inter_option_1").attr("class", "intersection_title intersection_title_active");
            alert("请首先创建交叉口示意图");
        }
        else
        {
            $("#task_info").attr("intersection", laneInfo);
            $("#intersection_quhua").attr("flag", "false");
            $("#intersection_quhua").hide();
            $("#intersection_task").attr("flag", "true");
            $("#intersection_task").show();
            $("#inter_option_2").attr("class", "intersection_title intersection_title_active");
            $("#inter_option_1").attr("class", "intersection_title");
            var imgPath = $("#img_result").attr("src");
            $("#imag1").attr('src', imgPath);
        }

    }


}

function show_light_option(option)
{
    $("#light_option_1").attr("class", "intersection_title");
    $("#light_option_2").attr("class", "intersection_title");
    if (option === 1)
    {
        $("#light_option_1").attr("class", "intersection_title intersection_title_active");
        $("#light_task").attr("flag", "false");
        $("#light_task").hide();
        $("#light_quhua").attr("flag", "true");
        $("#light_quhua").show();

    }
    else
    {
        var laneInfo = $("#light").attr("laneInfo");

        if (laneInfo === "")
        {
            $("#light_option_1").attr("class", "intersection_title intersection_title_active");
            alert("请首先创建交叉口示意图");
        }
        else
        {
            $("#task_info_light").attr("light", laneInfo);
            $("#light_quhua").attr("flag", "false");
            $("#light_quhua").hide();
            $("#light_task").attr("flag", "true");
            $("#light_task").show();
            $("#light_option_2").attr("class", "intersection_title intersection_title_active");
            $("#light_option_1").attr("class", "intersection_title");
            var imgPath = $("#img_result_light").attr("src");
            $("#imag1_light").attr('src', imgPath);

        }

    }


}

function test_time()
{
    alert("this is atest");
}

function task_assgin_confirm()
{
    var parent = document.getElementById("un_task_assign");
    var lis = parent.getElementsByClassName("un_task_assgin_item");
    var sid = $("#project_body").attr("st_id");
    var uids = "", tids = "", ts = "", bts = "";
    var duids = "", dtids = "", dts = "", dbts = "";
    for (var i = 0; i < lis.length; i++)
    {
        var uid = lis[i].getAttribute("uid");
        var tid = lis[i].getAttribute("tid");
        var t1 = lis[i].getAttribute("times");
        var t2 = lis[i].getAttribute("btimes");
        var uuid = lis[i].getAttribute("uuid");
        if (uid !== "0")
        {
            if (uids === "")
            {
                uids += uid;
            }
            else
            {
                uids += "_" + uid;
            }

            if (tids === "")
            {
                tids += tid;
            }
            else
            {
                tids += "_" + tid;
            }

            if (ts === "")
            {
                ts += t1;
            }
            else
            {
                ts += "__" + t1;
            }

            if (bts === "")
            {
                bts += t2;
            }
            else
            {
                bts += "__" + t2;
            }

        }

        if (uuid !== undefined && uuid !== null && uuid !== "0")
        {
            if (duids === "")
            {
                duids += uuid;
            }
            else
            {
                duids += "_" + uuid;
            }

            if (dtids === "")
            {
                dtids += tid;
            }
            else
            {
                dtids += "_" + tid;
            }

            if (dts === "")
            {
                dts += t1;
            }
            else
            {
                dts += "__" + t1;
            }

            if (dbts === "")
            {
                dbts += t2;
            }
            else
            {
                dbts += "__" + t2;
            }

        }

    }
    if (uids !== "" || duids !== "")
    {
        $.post("../../HandleAssignTask", {uids: uids, tids: tids, ts: ts, bts: bts, sid: sid, duids: duids, dtids: dtids, dts: dts, dbts: dbts}, function (result)
        {
            if (result.startsWith("2"))
            {
                alert("用户的工作时间已改变，请刷新页面!");
                //location.reload(true);
            }
            else if (result.startsWith("0"))
            {
                alert("任务分配保存失败，请重试");
            }
            else
            {
                alert("任务分配保存成功");
                result = JSON.parse(result);
                updatePageInfo(result);
                $("#task_ass_section").hide();
                $("#task_ass_section").attr("flag", "false");
                //location.reload(true);
            }

        });
    }
    else
    {
        $("#task_ass_section").hide();
        $("#task_ass_section").attr("flag", "false");
    }
    //location.reload();
}

function task_assgin_cancel()
{
    var parent = document.getElementById("un_task_assign");
    var lis = parent.getElementsByTagName("li");
    for (var i = 0; i < lis.length; i++)
    {
        var uid = lis[i].getAttribute("uid");
        var t2 = $("#li_p_" + uid).attr("btimes");
        var items2 = $("#li_p_" + uid).attr("bitems");
        if (uid !== "0")
        {
            $("#li_p_" + uid).attr("times", t2);
            $("#li_p_" + uid).attr("items", items2);
        }

    }
    $("#task_ass_section").hide();
    $("#task_ass_section").attr("flag", "false");

}

function createNewSTask()
{
    $("#stask_name").text("新建任务");
    $("#p_Name").val("");
    $("#p_Description").val("");
    $("#p_budget").val("");
    $("#project_body").attr("parentID", "0");
    $("#project_body").attr("pid", "0");
    $("#project_body").attr("st_id", "0");
    $("#p_path").val("默认根目录");
    showNav_Option(1);

}


function setWorkingStatus(info, option, pick)
{
    var id = 0;

    if (pick === 1)
    {
        info = JSON.parse(info);
        id = info.stm_id;
    }
    else
    {
        id = info;
    }

    if (option === 0)
    {
        $.post("../../HandleWorkingStatus", {id: id, option: option}, function (result)
        {
            if (result === "0")
            {
                if (pick === 1)
                {
                    alert("已经保存信息成功");
                    updatePageInfo(info);
                    showNav_Option(2);
                }


            }

        });
    }
    else if (option === 1)
    {
        $.post("../../HandleWorkingStatus", {id: id, option: option}, function (result)
        {
            if (result === "1")
            {
                //location.reload(true);
            }

        });
    }
    else
    {
        $.post("../../HandleWorkingStatus", {id: id, option: option}, function (result)
        {
            return result;

        });
    }
}

function assignUserTime(stime, etime, uid, tid, method)
{
    var times = $("#li_p_" + uid).attr("times");
    var out = [];
    if (times === "" || times === "null")
    {
        var s1 = {"stime": stime, "etime": etime, "tid": tid, "method": method};
        method = parseInt(method);
        if (method === 2)
        {
            out.push(s1);
        }
    }
    else
    {
        times = JSON.parse(times);
        for (var i = 0; i < times.length; i++)
        {

            out.push(times[i]);

        }
        var s1 = {"stime": stime, "etime": etime, "tid": times[i].tid, "method": method};
        method = parseInt(method);
        if (method === 2)
        {
            out.push(s1);
        }

    }

    out = JSON.stringify(out);
    $("#li_p_" + uid).attr("times", out);
    $("#c_ass_id_" + tid).attr("times", out);
    $("#ass_id_" + tid).attr("times", out);


}
function showAllPersons()
{
    var parent = document.getElementById("task_table_person");
    var lis = parent.getElementsByTagName("li");
    var uid;
    for (var j = 0; j < lis.length; j++)
    {
        uid = lis[j].getAttribute("uid");
        //uid=img.getAttribute("uid");
        $("#li_p_" + uid).show();
    }
}

function showRemainTasks()
{
    var parent = document.getElementById("un_task_assign");
    var lis = parent.getElementsByTagName("li");
    var uid;
    var size = 0;
    for (var j = 0; j < lis.length; j++)
    {
        uid = lis[j].getAttribute("uid");
        //uid=img.getAttribute("uid");
        if (uid === "0")
        {
            $("#ass_id_" + uid).show();
            var tid = lis[j].getAttribute("tid");
            $("#ass_id_" + tid).show();
            size++;
        }
    }
    $("#un_task_number").text(size);

}
function fliterUserTime(id, method, stime, etime)
{
    var parent = document.getElementById("task_table_person");
    var item = document.getElementById("ass_id_" + id);
    item.setAttribute("class", "list-group-item un_task_list un_task_list_active");
    var cID = $("#un_task_assign").attr("currentID");
    cID = parseInt(cID);
    if (cID !== 0)
    {
        item = document.getElementById("ass_id_" + cID);
        item.setAttribute("class", "list-group-item un_task_list");
    }
    $("#un_task_assign").attr("currentID", id);
    var lis = parent.getElementsByTagName("li");
    var uid;
    for (var j = 0; j < lis.length; j++)
    {
        uid = lis[j].getAttribute("uid");
        //uid=img.getAttribute("uid");
        var times = $("#li_p_" + uid).attr("times");
        if (times === "" || times === "null")
        {
            $("#li_p_" + uid).show();
        }
        else
        {
            times = JSON.parse(times);
            for (var i = 0; i < times.length; i++)
            {
                if ((times[i].stime < stime && stime < times[i].etime || times[i].etime > etime && etime > times[i].stime) && method === times[i].method)
                {
                    $("#li_p_" + uid).hide();

                }
                else
                {
                    $("#li_p_" + uid).show();
                }
            }
        }
    }


}

function fliterTaskTime(uid)
{
    var parent = document.getElementById("un_task_assign");
    //var item = document.getElementById("p_id_" + uid);
    var times = $("#li_p_" + uid).attr("times");
    times = JSON.parse(times);
    var lis = parent.getElementsByTagName("li");
    var stime, etime;
    for (var j = 0; j < lis.length; j++)
    {
        var uids = lis[j].getAttribute("uid");
        var id = lis[j].getAttribute("tid");
        if (uids === "0")
        {
            $("#ass_id_" + id).hide();
            stime = lis[j].getAttribute("stime");
            etime = lis[j].getAttribute("etime");
            for (var i = 0; i < times.length; i++)
            {
                if (times[i].tid === "0" && getTimeDiff(times[i].stime, stime) >= 0 && getTimeDiff(etime, times[i].etime) >= 0)
                {
                    $("#ass_id_" + id).show();
                }
            }
        }
    }


}


function removeAssignUserTime(uid, tid)
{
    var method = $("#c_ass_id_" + tid).attr("method");
    method = parseInt(method);
    if (method === 2)
    {
        var times = $("#li_p_" + uid).attr("times");
        var out = [];
        var outs = [];
        if (times === "" || times === "null")
        {

        }
        else
        {
            times = JSON.parse(times);
            times.sort(function (a, b) {
                var keyA = new Date(a.stime);
                var keyB = new Date(b.stime);
                // Compare the 2 dates
                if (keyA < keyB)
                    return -1;
                if (keyA > keyB)
                    return 1;
                return 0;
            });
            for (var i = 0; i < times.length; i++)
            {
                if (times[i].tid === tid && times[i].method === method)
                {

                }
                else
                {
                    out.push(times[i]);
                }
            }
            outs = JSON.stringify(out);
            $("#li_p_" + uid).attr("times", outs);
        }
    }
}



var currentLine = null;
var currentLine_light = null;

function clearIntersectionPageData()
{
    $("#intersection").attr("ids", '0');
    $("#intersection").attr("lat", '');
    $("#intersection").attr("lng", '');
    $("#intersection").attr("lameNumber", '4');
    $("#intersection").attr("thets", '0_90_180_270');
    $("#intersection").attr("name", '');
    $("#intersection").attr("currentLaneID", '0');
    $("#intersection").attr("currentLaneDegree", '');
    $("#intersection").attr("laneInfo", '');
    $("#outresult").attr("data", '0');
    $("#outresult").empty();
    $("#img_result").attr("src", '');
    $("#t_model_date").val("");
    $("#img1").attr("src", '');
    $("#task_info").attr("imgPath", '');
    $("#task_info").attr("intersection", '');
    $("#task_info").attr("number", '0');
    $("#task_info").attr("cindex", '0');
    $("#task_info").attr("current_img_s", '0');
    $("#task_info").attr("current_slanes", '');
    $("#task_info").attr("current_spoints", '');
    var map = document.getElementById("tb-map");
    map.innerHTML = "";
}

function clearLightPageData()
{
    $("#light").attr("ids", '0');
    $("#light").attr("lat", '');
    $("#light").attr("lng", '');
    $("#light").attr("lameNumber", '4');
    $("#light").attr("thets", '0_90_180_270');
    $("#light").attr("name", '');
    $("#light").attr("currentLaneID", '0');
    $("#light").attr("currentLaneDegree", '');
    $("#light").attr("laneInfo", '');
    $("#img_result_light").attr("src", '');
    $("#img1_light").attr("src", '');
    $("#task_info_light").attr("imgPath", '');
    $("#task_info_light").attr("light", '');
    $("#task_info_light").attr("number", '0');
    $("#task_info_light").attr("cindex", '0');
    $("#task_info_light").attr("current_img_s", '0');
    $("#task_info_light").attr("current_slanes", '');
    $("#task_info_light").attr("current_spoints", '');
}

function clearSegPageData()
{
    $("#seg_Lane").attr("ids", '0');
    $("#seg_Lane").attr("lat", '');
    $("#seg_Lane").attr("lng", '');
    $("#seg_Lane").attr("degree", '0');
    $("#seg_Lane").attr("upnumber", '0');
    $("#seg_Lane").attr("downnumber", '0');
    $("#seg_Lane").attr("name", '');
    $("#img_result_seg").attr("src", '');
    $("#img1_seg").attr("src", '');
    $("#task_info_seg").attr("imgPath", '');
    $("#task_info_seg").attr("upnumber", '0');
    $("#task_info_seg").attr("downnumber", '0');
    $("#task_info_seg").attr("cindex", '0');
    $("#task_info_seg").attr("degree", '0');
    $("#task_info_seg").attr("number", '0');
    $("#task_info_seg").attr("current_spoints", '');
    $("#task_info_seg").attr("current_img_s", '0');
    $("#task_info_seg").attr("current_slanes", '');
}

function loadCanvasIntersection()
{
    var pp = document.getElementById("intersection_canvas");
    pp.innerHTML = '<canvas id="inter_template" style="width:450px;height:260px;"></canvas>';
    var canvas = new fabric.Canvas('inter_template');
    canvas.setHeight(260);
    canvas.setWidth(450);
    fabric.Object.prototype.transparentCorners = false;
    var createLine = false;
    var rotateLine = false;
    var preCLine = null;
    var xcenter = 225;
    var ycenter = 130;
    var long = 80;
    var angle = 10;
    var laneWidth = 10;
    var disR = 20;
    var preX, preY;
    currentLine = null;
    var preID = null;
    var isMouseMove = false;
    var fontSize = 15;

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
    var intersection = document.getElementById("intersection");
    var number = parseInt(intersection.getAttribute("laneNumber"));
    var thets = (intersection.getAttribute("thets")).split("_");

    for (var i = 1; i <= number; i++)
    {
        var thet = 360 - parseInt(thets[i - 1]);
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
        lane.idName = i;
        lane.degree = thets[i - 1];
        var xxcenter = xcenter + long * Math.cos(Math.PI * thet / 180.0);
        var yycenter = ycenter + long * Math.sin(Math.PI * thet / 180.0);
        lane.xxcenter = xxcenter;
        lane.yycenter = yycenter;
        lane.Name = "道路" + i;
        lane.isInited = false;
        lane.text_name = addTextRegion(xxcenter, yycenter, thets[i - 1], laneWidth, lane.Name, lane);
        canvas.add(lane.text_name);
        canvas.add(lane);
    }
    canvas.add(circle);

    canvas.on('mouse:down', function (options) {
        //console.log(options.e.clientX, options.e.clientY);
        preX = options.e.layerX;
        preY = options.e.layerY;
        //console.log("test1");
    });
    canvas.on('mouse:up', function (options) {
        var hasTask = $("#task_info").attr("number");
        //console.log(options.e.clientX, options.e.clientY);
        if (rotateLine)
        {
            rotateLine = false;
        }
        if (createLine)
        {
            createLine = false;
            if (isMouseMove && hasTask === "0")
            {
                var angle = 360 - diff(options.e.layerX, options.e.layerY);
                addLane(angle, long, 1);
                isMouseMove = false;
            }
        }
        //canvas.discardActiveGroup();

    });
    canvas.on('mouse:move', function (options) {
        var hasTask = $("#task_info").attr("number");
        if (rotateLine && hasTask === "0")
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
        if (createLine && hasTask === "0")
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
        }
    });

    canvas.on({'object:selected': onChange});



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
                    if (SINGLE_LINE) {
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

    function onChange(options) {
        canvas.forEachObject(function (obj) {
            if (obj.idName === options.target.idName)
            {
                // $('#blue').slider({disabled: false});
                if (obj.idName === 0)
                {
                    createLine = true;
                    preCLine = null;
                }
                else if (obj.idName > 0)
                {
                    if (currentLine !== null)
                    {

                        var name1 = currentLine.Name;
                        var id = currentLine.idName;
                        var degree = currentLine.degree;
                        updateLaneInfo_0(id, name1, degree);
                        //currentLine.setStroke("gray");
                    }
                    rotateLine = true;
                    isDeleteLine = true;
                    //console.log("test2");
                    var id = obj.idName;
                    var degree = obj.degree;
                    var name = obj.Name;
                    currentLine = obj;
                    obj.setStroke("red");
//                                    obj.setFill("red");
//                                    canvas.renderAll();
                    $("#intersection").attr("currentLaneID", id);
                    $("#intersection").attr("currentLaneDegree", degree);
                    //loadLaneInfo();

                    if (preID !== null && preID !== id)
                    {
                        updateRoadInfo(preID);
                    }
                    loadRoadInfo(id);
                    preID = id;
                    //updateLaneInfo_0(id, name, degree);

                }

            }
            else
            {
                if (obj.idName !== 0)
                {
                    obj.setStroke("gray");
                }
//                                obj.setFill("gray");
//                                 canvas.renderAll();
            }


        });
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
            updateLaneInfo_0(id, name, angle);
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
        }
    }




    function deleteLane()
    {
        var id = currentLine.idName;

        var ids = "info" + id;
        $("#intersection").attr(ids, "");
        ids = "lane" + id;
        $("#intersection").attr(ids, "");
        canvas.remove(currentLine.text_name);
        canvas.remove(currentLine);
        var number = $("#intersection").attr("laneNumber");
        number = parseInt(number) - 1;
        $("#intersection").attr("laneNumber", number);
    }

    function addLane(degree, dis, flag)
    {
        var d1 = null, d2 = null;
        var id = -10;
        canvas.forEachObject(function (obj) {
            if (d1 === null && obj.degree > 0)
            {
                d1 = obj.degree;
            }
            else
            {
                if (d2 === null && obj.degree > 0)
                {
                    d2 = obj.degree;
                }
            }
            if (obj.idName > id)
            {
                id = obj.idName;
            }
        });
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
        lane.idName = id;
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
            $("#intersection").attr("currentLaneID", id);
            $("#intersection").attr("currentLaneDegree", degree);
            updateLaneInfo_0(id, name, degree);
            var number = $("#intersection").attr("laneNumber");
            number = parseInt(number) + 1;
            $("#intersection").attr("laneNumber", number);
            lane.Name = "道路" + number;
            var text_name = addTextRegion(lane.xxcenter, lane.yycenter, lane.degree, laneWidth, lane.Name, lane);
            canvas.add(text_name);
            lane.text_name = text_name;
        }
        currentLine = lane;
        preCLine = lane;
        canvas.add(lane);
        circle.bringToFront();
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
        var name = currentLine.Name;
        var id = currentLine.idName;
        var degree = currentLine.degree;
        updateLaneInfo_0(id, name, degree);
        generateIntersection();
    }

}

function updateLaneInfo_0(id, name, degree)
{
    var ids = "info" + id;
    var value = id + "_" + name + "_" + degree;
    $("#intersection").attr(ids, value);
}

function loadCanvasLight()
{
    var canvas_light = new fabric.Canvas('inter_template_light');
    canvas_light.setHeight(350);
    canvas_light.setWidth(450);
    fabric.Object.prototype.transparentCorners = false;
    var createLine_light = false;
    var rotateLine_light = false;
    var preCLine_light = null;
    var xcenter_light = 225;
    var ycenter_light = 175;
    var long_light = 100;
    var laneWidth_light = 10;
    var disR_light = 20;
    var preX_light, preY_light;
    currentLine_light = null;
    var preID_light = null;
    var isMouseMove_light = false;
    var fontSize_light = 15;
    var circle_light = new fabric.Circle({
        left: xcenter_light - disR_light,
        top: ycenter_light - disR_light,
        originX: 'left',
        originY: 'top',
        radius: disR_light,
        fill: 'rgba(255,0,0,1)',
        transparentCorners: false
    });
    circle_light.degree = -10;
    circle_light.idName = 0;
    circle_light.hasControls = false;
    circle_light.hasRotatingPoint = false;
    circle_light.centeredRotation = false;
    circle_light.lockMovementX = true;
    circle_light.lockMovementY = true;

    canvas_light.hoverCursor = 'pointer';
    var intersection = document.getElementById("light");
    var number = parseInt(intersection.getAttribute("laneNumber"));
    var thets = (intersection.getAttribute("thets")).split("_");
    for (var i = 1; i <= number; i++)
    {
        var thet = 360 - parseInt(thets[i - 1]);
        var points = [xcenter_light, ycenter_light, xcenter_light + long_light * Math.cos(Math.PI * thet / 180.0),
            ycenter_light + long_light * Math.sin(Math.PI * thet / 180.0)];

        var lane = new fabric.Line(points, {
            strokeWidth: laneWidth_light,
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
        lane.idName = i;
        lane.degree = thets[i - 1];
        var xxcenter = xcenter_light + long_light * Math.cos(Math.PI * thet / 180.0);
        var yycenter = ycenter_light + long_light * Math.sin(Math.PI * thet / 180.0);
        lane.xxcenter = xxcenter;
        lane.yycenter = yycenter;
        lane.Name = "道路" + i;
        lane.isInited = false;
        lane.text_name = addTextRegion_Light(xxcenter, yycenter, thets[i - 1], laneWidth_light, lane.Name, lane.idName, lane.idName);
        canvas_light.add(lane.text_name);
        canvas_light.add(lane);
    }
    canvas_light.add(circle_light);

    canvas_light.on('mouse:down', function (options) {
        //console.log(options.e.clientX, options.e.clientY);
        preX_light = options.e.layerX;
        preY_light = options.e.layerY;
        //console.log("test1");
    });
    canvas_light.on('mouse:up', function (options) {
        var hasTask = $("#task_info_light").attr("number");
        //console.log(options.e.clientX, options.e.clientY);
        if (rotateLine_light)
        {
            rotateLine_light = false;
        }
        if (createLine_light)
        {
            createLine_light = false;
            if (isMouseMove_light && hasTask === "0")
            {
                var angle = 360 - diff_Light(options.e.layerX, options.e.layerY);
                addLane_Light(angle, long_light, 1);

                isMouseMove_light = false;
            }
        }
        //canvas.discardActiveGroup();

    });
    canvas_light.on('mouse:move', function (options) {
        var hasTask = $("#task_info_light").attr("number");
        if (rotateLine_light && hasTask === "0")
        {
            var angle = 0;
            var result = diff_Light(options.e.layerX, options.e.layerY);
            if (result <= 0)
            {
                angle = 0 - result;
            }
            else
            {
                angle = 360 - result;
            }
            console.log(angle);
            updateAngle_Light(angle);
        }
        if (createLine_light && hasTask === "0")
        {
            isMouseMove_light = true;
            var angle = 0;
            var result = diff_Light(options.e.layerX, options.e.layerY);
            if (result <= 0)
            {
                angle = 0 - result;
            }
            else
            {
                angle = 360 - result;
            }
            var dis = dist_Light(options.e.layerX, options.e.layerY);
            addLane_Light(angle, dis, 0);
        }
    });

    canvas_light.on({'object:selected': onChange_Light});



    function diff_Light(x, y) {
        var dx = x - (xcenter_light);
        var dy = y - (ycenter_light);
        return Math.atan2(dy, dx) * (180 / Math.PI);
    }

    function addTextRegion_Light(x, y, degree, lw, name, laneid)
    {
        var left, top, lw_2 = lw / 2;
        var dis = 10, length = 150;
        degree = parseInt(degree);
        if (degree === 360 || degree >= 0 && degree <= 90)
        {
            left = x - length * Math.sin(Math.PI * degree / 180.0) / 2;
            top = y - lw - (fontSize_light) * Math.sin(Math.PI * degree / 180.0);
            var lane_name = new fabric.Textbox(name, {
                fontFamily: 'arial black',
                fontSize: fontSize_light,
                width: length,
                height: fontSize_light,
                textAlign: 'center',
                fontWeight: 'normal',
                left: left,
                top: top
            });
            return lane_name;
            //canvas.add(lane_name);
        }
        else if (degree > 90 && degree <= 180)
        {
            left = x + length * Math.sin(Math.PI * degree / 180.0) / 2 - length;
            top = y - lw - (fontSize_light) * Math.sin(Math.PI * degree / 180.0);
            var lane_name = new fabric.Textbox(name, {
                fontFamily: 'arial black',
                fontSize: fontSize_light,
                width: length,
                height: fontSize_light,
                textAlign: 'center',
                fontWeight: 'normal',
                left: left,
                top: top
            });
            return lane_name;
            //canvas.add(lane_name);
        }
        else if (degree > 180 && degree <= 270)
        {
            left = x - length * Math.sin(Math.PI * degree / 180.0) / 2 - length;
            top = y + lw_2 - (fontSize) * Math.sin(Math.PI * degree / 180.0);
            var lane_name = new fabric.Textbox(name, {
                fontFamily: 'arial black',
                fontSize: fontSize_light,
                width: length,
                height: fontSize_light,
                textAlign: 'center',
                fontWeight: 'normal',
                left: left,
                top: top
            });
            return lane_name;
            //canvas.add(lane_name);
        }
        else if (degree > 270 && degree < 360)
        {
            left = x + length * Math.sin(Math.PI * degree / 180.0) / 2;
            top = y + lw_2 - (fontSize_light) * Math.sin(Math.PI * degree / 180.0);
            var lane_name = new fabric.Textbox(name, {
                fontFamily: 'arial black',
                fontSize: fontSize_light,
                height: fontSize_light,
                textAlign: 'center',
                fontWeight: 'normal',
                width: length,
                left: left,
                top: top
            });
            return lane_name;
            //canvas.add(lane_name);
        }
    }

    function dist_Light(x, y) {
        var dx = x - (xcenter_light);
        var dy = y - (ycenter_light);
        var dis = Math.sqrt(dx * dx + dy * dy);
        if (dis >= long_light)
        {
            return long_light;
        }
        else
        {
            return dis;
        }
    }

    function onChange_Light(options) {
        canvas_light.forEachObject(function (obj) {
            if (obj === options.target)
            {
                // $('#blue').slider({disabled: false});
                if (obj.idName === 0)
                {
                    createLine_light = true;
                    preCLine_light = null;
                }
                else if (obj.idName > 0)
                {
                    if (currentLine_light !== null)
                    {

                        var name1 = currentLine_light.Name;
                        var id = currentLine_light.idName;
                        var degree = currentLine_light.degree;
                        updateLaneInfo_0_Light(id, name1, degree);
                        //currentLine.setStroke("gray");
                    }
                    rotateLine_light = true;
                    isDeleteLine_light = true;
                    //console.log("test2");
                    var id = obj.idName;
                    var degree = obj.degree;
                    var name = obj.Name;
                    currentLine_light = obj;
                    obj.setStroke("red");
                    $("#light").attr("currentLaneID", id);
                    $("#light").attr("currentLaneDegree", degree);
                    //loadLaneInfo();

                    if (preID_light !== null && preID_light !== id)
                    {
                        updateRoadInfo_Light(preID_light);
                    }
                    loadRoadInfo_Light(id);
                    preID_light = id;
                    //updateLaneInfo_0(id, name, degree);

                }

            }
            else
            {
                obj.setStroke("gray");
            }


        });
    }


    function updateAngle_Light(angle)
    {
        if (currentLine_light !== null)
        {
            var id = currentLine_light.idName;
            //var degree = currentLine_light.degree;
            var name = currentLine_light.Name;
            var thet = 360 - parseInt(angle);
            var points = [xcenter_light, ycenter_light, xcenter_light + long_light * Math.cos(Math.PI * thet / 180.0),
                ycenter_light + long_light * Math.sin(Math.PI * thet / 180.0)];
            var lane = new fabric.Line(points, {
                strokeWidth: laneWidth_light,
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
            $("#light").attr("currentLaneDegree", angle);
            updateLaneInfo_0_Light(id, name, angle);
            lane.degree = angle;
            var xxcenter = xcenter_light + long_light * Math.cos(Math.PI * thet / 180.0);
            var yycenter = ycenter_light + long_light * Math.sin(Math.PI * thet / 180.0);
            lane.xxcenter = xxcenter;
            lane.yycenter = yycenter;
            canvas_light.remove(currentLine_light.text_name);
            lane.text_name = addTextRegion_Light(xxcenter, yycenter, angle, laneWidth_light, lane.Name);
            canvas_light.add(lane.text_name);
            canvas_light.remove(currentLine_light);
            currentLine_light = lane;
            canvas_light.add(lane);
            circle_light.bringToFront();
        }
    }

    function deleteLane_Light()
    {
        var id = currentLine_light.idName;

        var ids = "info" + id;
        $("#light").attr(ids, "");
        ids = "lane" + id;
        $("#light").attr(ids, "");
        canvas_light.remove(currentLine_light.text_name);
        canvas_light.remove(currentLine_light);
        var number = $("#light").attr("laneNumber");
        number = parseInt(number) - 1;
        $("#light").attr("laneNumber", number);
    }
    function addLane_Light(degree, dis, flag)
    {
        var d1 = null, d2 = null;
        var id = -10;
        canvas_light.forEachObject(function (obj) {
            if (d1 === null && obj.degree > 0)
            {
                d1 = obj.degree;
            }
            else
            {
                if (d2 === null && obj.degree > 0)
                {
                    d2 = obj.degree;
                }
            }
            if (obj.idName > id)
            {
                id = obj.idName;
            }
        });
        //var name = "name" + id;
        var thet = 360 - parseInt(degree);
        var points = [xcenter_light, ycenter_light, xcenter_light + dis * Math.cos(Math.PI * thet / 180.0), ycenter_light + dis * Math.sin(Math.PI * thet / 180.0)];
        var lane = new fabric.Line(points, {
            strokeWidth: laneWidth_light,
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
        lane.degree = degree;
        var xxcenter = xcenter_light + long_light * Math.cos(Math.PI * thet / 180.0);
        var yycenter = ycenter_light + long_light * Math.sin(Math.PI * thet / 180.0);
        lane.xxcenter = xxcenter;
        lane.yycenter = yycenter;
        //positionBtn(lane);
        if (preCLine_light === null)
        {
            preCLine_light = lane;
        }
        else
        {
            canvas_light.remove(preCLine_light);
        }

        if (flag === 1)
        {
            $("#light").attr("currentLaneID", id);
            $("#light").attr("currentLaneDegree", degree);
            updateLaneInfo_0_Light(id, name, degree);
            var number = $("#light").attr("laneNumber");
            number = parseInt(number) + 1;
            $("#light").attr("laneNumber", number);
            lane.Name = "道路" + number;
            var text_name = addTextRegion_Light(lane.xxcenter, lane.yycenter, lane.degree, laneWidth_light, lane.Name);
            canvas_light.add(text_name);
            lane.text_name = text_name;
        }
        currentLine_light = lane;
        preCLine_light = lane;
        canvas_light.add(lane);
        circle_light.bringToFront();
    }
}

function updateLaneInfo_0_Light(id, name, degree)
{
    var ids = "info" + id;
    var value = id + "_" + name + "_" + degree;
    $("#light").attr(ids, value);
}

function generateLight_S()
{
    var name = currentLine_light.Name;
    var id = currentLine_light.idName;
    var degree = currentLine_light.degree;

    updateLaneInfo_0_Light(id, name, degree);
    generateLight();

}

function updatePageInfo(info)
{
    //info = JSON.parse(info);
    $("#project_body").attr("basicInfo", info.basicInfo);
    $("#project_body").attr("task_models_info", info.task_models_info);
    $("#project_body").attr("st_id", info.st_id);
    $("#project_body").attr("ppath", info.ppPath);
    $("#project_body").attr("parentID", info.parentID);
    $("#project_body").attr("path", info.path);
    $("#project_body").attr("allTasks", info.allTasks);
    $("#project_body").attr("userInfo", info.userInfo);

}

function updateSlanes_None(type)
{
    if (type === 1)
    {
        var parent = document.getElementById("task_info");
        var lis = parent.getElementsByTagName("a");
        var ss = "";
        for (var j = 0; j < lis.length; j++)
        {
            if (j === 0)
            {
                ss += lis[j].getAttribute("slanes");
            }
            else
            {
                ss += "L" + lis[j].getAttribute("slanes");
            }
        }
        parent.setAttribute("slanes", ss);
    }

    else if (type === 2)
    {
        var parent = document.getElementById("task_info_seg");
        var lis = parent.getElementsByTagName("a");
        var ss = "";
        for (var j = 0; j < lis.length; j++)
        {
            if (j === 0)
            {
                ss += lis[j].getAttribute("slanes");
            }
            else
            {
                ss += "L" + lis[j].getAttribute("slanes");
            }
        }
        parent.setAttribute("slanes", ss);
    }
    else
    {
        var parent = document.getElementById("task_info_light");
        var lis = parent.getElementsByTagName("a");
        var ss = "";
        for (var j = 0; j < lis.length; j++)
        {
            if (j === 0)
            {
                ss += lis[j].getAttribute("slanes");
            }
            else
            {
                ss += "L" + lis[j].getAttribute("slanes");
            }
        }
        parent.setAttribute("slanes", ss);
    }
}

function showTask_Detail(id)
{
    var info = $("#ass_id_" + id).attr("data");
    info = JSON.parse(info);
    var content = getTaskTBModal_1(info, info.img_path);
    var dig = document.getElementById("my_Modal");
    dig.innerHTML = "";
    dig.innerHTML = content;
    $("#my_Modal").modal();
    var size = $("#footsize").attr("size");
    showCarInfoTB(size);
    initTBMap_Detail(id, info.lat, info.lng, info.type);
}

function showTask_Detail_2(uid, id)
{
    var items = $("#li_p_" + uid).attr("items");

    var info;
    items = JSON.parse(items);
    if (items !== undefined && items !== null && items.length > 0)
    {
        for (var i = 0; i < items.length; i++)
        {
            if (items[i].id === parseInt(id))
            {
                info = items[i];
                var content = getTaskTBModal_1(info, info.img_path);
                var dig = document.getElementById("my_Modal");
                dig.innerHTML = "";
                dig.innerHTML = content;
                $("#my_Modal").modal();
                var size = $("#footsize").attr("size");
                showCarInfoTB(size);
                initTBMap_Detail(id, info.lat, info.lng, info.type);
            }
        }
    }

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

function getTaskTBModal(info, img)
{
    var content;
    var size;
    var slanes = "";
    content = '<div class="modal-dialog">'

            + '<div class="modal-content" style="width:700px;">'
            + '<div class="modal-header">'
            + '<button type="button" class="close" data-dismiss="modal">&times;</button>'
            + '<h4 class="modal-title">任务的详细信息</h4>'
            + '</div>'
            + '<div class="modal-body">';

    content += '<div class="task_tb_info" id="task_tb_info">'
            + ' <span id="task_tb_date"><span class="info_tb_title">日期:</span>&nbsp;' + getOnlyDate(info.stime) + '&nbsp;到&nbsp;' + getOnlyDate(info.etime) + '</span><br/>'
            + '<span id="task_tb_time"><span class="info_tb_title">时间:</span>&nbsp;' + getOnlyTime(info.stime, info.etime) + '</span><br/>'
            + ' <span id="task_tb_method"><span class="info_tb_title">采集方式:</span>&nbsp;' + getNameByMetod(info.method) + '</span><br/>';
    if (info.type === 3)
    {
        content += '<span id="task_tb_light_type"><span class="info_tb_title">信号类型:</span>&nbsp;' + getNameByLight(info.light_type) + '</span><br/>';
    }

    if (info.s_user_id !== 0)
    {
        var name = $("#li_p_" + info.s_user_id).attr("name");
        var method = $("#li_p_" + info.s_user_id).attr("method");
        var contact;
        if (method === "1")
        {
            method = "电子邮箱";
            contact = $("#li_p_" + info.s_user_id).attr("email");
        }
        else if (method === "2")
        {
            method = "微信";
            contact = $("#li_p_" + info.s_user_id).attr("weixin");
        }
        else
        {
            method = "短信";
            contact = $("#li_p_" + info.s_user_id).attr("duanxin");
        }
        content += '<span id="task_tb_user"><span class="info_tb_title">调查人员:</span>&nbsp;姓名--' + name + ',&nbsp;联系方式:&nbsp;' + method + '-' + contact + '</span><br/>';
    }
    content += '</div>'
            + '<div class="task_tb_img" id="task_tb_img">'
            + '<img id="task_tb_img_result" class="task_tb_img_result" src="' + img + '">'
            + '</div>'

            + '<div class="task_tb_cars" id="task_tb_cars">';
    if (info.type !== 3)
    {
        var lanes = info.slanes;
        if (lanes === undefined || lanes === null || lanes === "") {
            //this.selectedLanes=null;
        } else
        {
            var ss = lanes.split("L");
            for (var k = 0; k < ss.length; k++) {
                var ts = ss[k].split("S");
                var id = parseInt(ts[0]);
                var vs = ts[1].split("#");
                for (var m = 0; m < vs.length; m++)
                {
                    var temp = vs[m].split("_");
                    var item = '{"id": "' + id + '", "type": "' + temp[0] + '", "index": "' + temp[1] + '"}';
                    if (slanes === "")
                    {
                        slanes += '[' + item;
                    }
                    else
                    {
                        slanes += ',' + item;
                    }
                    //slanes.push(item);
                }
            }
            slanes += ']';
        }
        slanes = JSON.parse(slanes);
        size = slanes.length * (info.peizhi).length;
        for (var j = 0; j < slanes.length; j++)
        {
            var peizhi = info.peizhi;
            content += '<ul class="nav nav-pills car_tb_items">';
            var os = slanes[j];
            var color = getColor(os.id, os.type, os.index);

            for (var i = -1; i < peizhi.length; i++)
            {
                if (i >= 0)
                {
                    var id = (j * (peizhi.length) + i);
                    content += '<li class="car_tb_item">'
                            + '<a class="car_tb_name" data-toggle="popover_' + id + '">' + peizhi[i].type_name
                            + '<div id="tb_div_id_' + id + '" style="display:none;">'
                            + '<div class="tb_car_content"><span>车辆类型:' + peizhi[i].type_name + '</span><br/>\n\
                  <span>名称:' + peizhi[i].name + '</span><br/>\n\
                  <span>车长:' + peizhi[i].car_min_length + '-' + peizhi[i].car_max_length + '</span><br/>\n\
                  <span>载重:' + peizhi[i].car_min_weight + '-' + peizhi[i].car_max_weight + '</span><br/>\n\
                  <span>换算系数:' + peizhi[i].car_factor + '</span><br/></div>' + '</div></a></li>';
                }
                else
                {
                    content += '<li class="car_tb_item"><div class="tb_sign_img" id="tb_sign_img_id_' + j + '" style="background:rgb(' + color.red + ',' + color.green + ',' + color.blue + ')"><img src="" id="tb_sign_img_' + j + '"></div></li>';
                }
            }
            content += '</ul>';
        }
        content += '</div>';
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


function getTaskTBModal_1(info, img)
{
    var content;
    var size;
    var slanes = "";
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

    if (info.s_user_id !== 0)
    {
        var name = $("#li_p_" + info.s_user_id).attr("name");
        var method = $("#li_p_" + info.s_user_id).attr("method");
        var contact;
        if (method === "1")
        {
            method = "电子邮箱";
            contact = $("#li_p_" + info.s_user_id).attr("email");
        }
        else if (method === "2")
        {
            method = "微信";
            contact = $("#li_p_" + info.s_user_id).attr("weixin");
        }
        else
        {
            method = "短信";
            contact = $("#li_p_" + info.s_user_id).attr("duanxin");
        }
        content += '<span id="task_tb_user"><span class="info_tb_title">调查人员:</span>&nbsp;姓名--' + name + ',&nbsp;联系方式:&nbsp;' + method + '-' + contact + '</span><br/>';
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
            for (var j = 0; j < directions.length; j++)
            {
                var peizhi = info.peizhi;
                var ds = directions[j].direction_type;
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
                            var type = parseInt(ds[k]);
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
                            content += '<td class="car_tb_name_view">' + directions[j].laneName + directions[j].degree_name + ':&nbsp;' + type + '--</td>';
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


function showCarInfoTB(size)
{
    size = parseInt(size);
    if (size !== undefined && size !== null && size !== "undefined" && size !== "null")
    {
        for (var i = 0; i < size; i++)
        {
            $('[data-toggle=popover_' + i + ']').popover({
                content: $('#tb_div_id_' + i).html(),
                html: true
            }).click(function () {
                $(this).popover('show');
            });
        }
    }

}

function loadUsersInfo()
{
    var info = $("#project_body").attr("userInfo");
    var parent = document.getElementById("task_table_person");
    parent.innerHTML = "";
    if (info !== undefined && info !== "")
    {
        info = JSON.parse(info);
        for (var i = 0; i < info.length; i++)
        {
            var list = document.createElement("li");
            list.setAttribute("id", "li_p_" + info[i].id);
            list.setAttribute("class", "p_status_td");
            list.setAttribute("uid", info[i].id);
            list.setAttribute("ids", info[i].id);
            list.setAttribute("unsave", "1");
            list.setAttribute("name", info[i].name);
            list.setAttribute("method", info[i].method);
            list.setAttribute("weixin", info[i].weixin);
            list.setAttribute("email", info[i].email);
            list.setAttribute("duanxin", info[i].duanxin);
            list.setAttribute("index", info[i].id);
            list.setAttribute("items", info[i].items_string);
            list.setAttribute("bitems", info[i].items_string);
            list.setAttribute("times", info[i].times);
            list.setAttribute("btimes", info[i].times);
            list.setAttribute("onclick", "showPersonTasks(" + info[i].id + ")");
            var content = "";
            if (info[i].items_string === null || info[i].items_string === "")
            {
                content += '<img src="./img/free.png" class="p_status" id="p_id_' + info[i].id + '">';
            }
            else
            {
                content += '<img src="./img/ass.png" class="p_status" id="p_id_' + info[i].id + '">';
            }
            content += '<br/><label id="p_id_name_' + info[i].id + '" name="' + info[i].name + '">' + info[i].name + '</label>';
            var rating = '<section class="main" style="padding:0px;"><div class="user">';
            var f1 = info[i].total_acc_tasks * 1.0 / info[i].total_tasks;
            var f2 = info[i].pass_tasks * 1.0 / info[i].total_acc_tasks;
            var f3 = info[i].undone_tasks * 1.0 / info[i].total_acc_tasks;
            var rateStart = Math.round(((f1 + f2 + 1 - f3) / 3.0) * 100);
            rating += '<span class="starRating">';
            var rflag = 5;
            for (var v = 0; v < 100; v += 20)
            {
                if (rateStart >= v)
                {
                    rating += ' <label for="rating' + rflag + '" class="starRatingON"></label>';
                }
                else
                {
                    rating += ' <label for="rating' + rflag + '" class="starRatingOFF"></label>';
                }
                rflag--;
            }
            rating += '</span>';
            rating += '<ul>'
                    + '<li><a>' + '任务接受率:' + Math.round(100 * f1) + '%</a></li>'
                    + '<li><a>' + '任务审核通过率:' + Math.round(100 * f2) + '%</a></li>'
                    + '<li><a>' + '任务完成率:' + Math.round(100 * (1 - f3)) + '%</a></li>'
                    + '</ul></div></section>';
            content += rating;
            list.innerHTML = content;
            parent.appendChild(list);
        }
    }
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


function initTaskViewShortInfo(alllanes, slanes)
{
    var info = [];
    slanes = slanes.split("L");
    for (var i = 0; i < slanes.length; i++)
    {
        var items = slanes[i];
        var item = items.split("S");

    }
    alllanes = alllanes.split("L");

}

function loadDashWithInterval()
{
    $("#my_Modal").modal("hide");
    $("#dash_section").show();
    loadDashInfo();
    var interval = 10000;
    setInterval(function () {
        var flag = $("#dash_section").attr("flag");
        if (flag === "true")
        {
            loadDashInfo();
        }

    }, interval);
}

function loadNoticeWithInterval()
{
    loadNoticeInfo();
    //showNoticeInfo();
    var interval = 6000;
    setInterval(function () {
        var flag = $('#notice_nav').attr("flag");
        if (flag === "1")
        {
            loadNoticeInfo();
        }
    }, interval);

}

function loadNoticeInfo()
{
    var sid = $("#project_body").attr("st_id");
    $.ajax({
        url: "../../HandleGetDashInfo",
        data: {"sid": sid, "option": 5},
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
        },
        success: function (result) {
            if (result === "0")
            {
                alert(result);
            }
            else
            {
                var dt = JSON.parse(result);
                if (dt !== null && dt !== undefined)
                {
                    var notes = dt.notes;
                    if (notes !== undefined && notes !== null && notes !== "" && notes !== [])
                    {
                        //$("#r-news").empty();
                        var parent = document.getElementById("r-news");
                        parent.innerHTML = "";
                        //notes = JSON.stringify(notes);
                        for (var i = 0; i < notes.length; i++)
                        {
                            var p = document.createElement("p");
                            p.setAttribute("class", "s_update_news");
                            p.innerHTML = "" + notes[i].notice;
                            parent.appendChild(p);
                        }

                    }
                }
            }
        }
    });
}


function showNoticeInfo()
{
    var info = $("#r-news").attr("info");
    var notes = null;
    if (info !== "" && info !== null)
    {
        notes = JSON.parse(info);
    }
    //var 
    //notes = JSON.parse(info);
    var index = 0;
    var interval = 2500;
    setInterval(function ()
    {
        if (notes !== undefined && notes !== null)
        {
            if (index < notes.length)
            {
                if (index === 3)
                {
                    index = 0;
                    var info1 = $("#r-news").attr("info");
                    if (info === info1)
                    {

                    }
                    else if (info1 !== "")
                    {
                        notes = JSON.parse(info1);
                    }
                }
                else
                {
                    var des = notes[index++].notice;
                    $('#s_update_news').fadeOut(500, function () {
                        $(this).text(des).fadeIn(500);
                    });
                    //$("#s_update_news").text(des);
                }
            }
            else
            {
                index = 0;
            }
        }
        else
        {
            var info1 = $("#r-news").attr("info");
            if (info === info1)
            {

            }
            else if (info1 !== "")
            {
                notes = JSON.parse(info1);
            }
        }

    }, interval);




}




function loadDashInfo()
{
    var sid = $("#project_body").attr("st_id");
    $.ajax({
        url: "../../HandleGetDashInfo",
        data: {"sid": sid, "option": 1},
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
        },
        success: function (result) {
            if (result === "0")
            {
                alert(result);
            }
            else
            {

                var dt = JSON.parse(result);
                var pers = 0;
                $("#un_pass_task_dash").text(dt.waitfor_pass_task);
                $("#un_assign_task_dash").text(dt.unassign_task);
                $("#tasks_process_dash").text(dt.completeModels + "/" + dt.totalModels);
                $("#dash_intersection").text(dt.com_intersection_models + "/" + dt.intersection_models);
                pers = 0;
                if (dt.intersection_models !== 0)
                {
                    pers = dt.com_intersection_models * 1.0 / dt.intersection_models;
                    pers = parseInt(pers * 100);
                    pers = pers + "%";
                }
                else
                {
                    pers = "0%";
                }
                $("#dash_intersection_bar").attr("style", "width:" + pers);


                $("#dash_seg").text(dt.com_seg_models + "/" + dt.seg_models);
                pers = 0;
                if (dt.seg_models !== 0)
                {
                    pers = dt.com_seg_models * 1.0 / dt.seg_models;
                    pers = parseInt(pers * 100);
                    pers = pers + "%";
                }
                else
                {
                    pers = "0%";
                }
                $("#dash_seg_bar").attr("style", "width:" + pers);

                $("#dash_light").text(dt.com_light_models + "/" + dt.light_models);
                pers = 0;
                if (dt.light_models !== 0)
                {
                    pers = dt.com_light_models * 1.0 / dt.light_models;
                    pers = parseInt(pers * 100);
                    pers = pers + "%";
                }
                else
                {
                    pers = "0%";
                }
                $("#dash_light_bar").attr("style", "width:" + pers);

                var notes = dt.notes;
                var content = "";
                $("#dash_note_list").empty();
                if (notes !== undefined)
                {
                    for (var i = 0; i < notes.length; i++)
                    {
                        content += '<li class="list-group-item list-group-item-success">' + notes[i].notice + '</li>';
                    }
                }
                $("#dash_note_list").html(content);
            }
        }
    });
}


var allDashUNTask = null;
function loadWaitPassTasks()
{
    allDashUNTask = null;
    var sid = $("#project_body").attr("st_id");
    $.ajax({
        url: "../../HandleGetDashInfo",
        data: {"sid": sid, "option": 2},
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
        },
        success: function (result) {
            if (result === "0")
            {
                alert(result);
            }
            else
            {

                var tasks = JSON.parse(result);
                allDashUNTask = tasks;
                var content = getWaitPassModal(tasks);
                var dig = document.getElementById("my_Modal");
                dig.innerHTML = "";
                dig.innerHTML = content;
                $("#my_Modal").modal();
                //location.reload(true);
            }
        }
    });
}

function getWaitPassModal(tasks)
{
    var content = '<div class="modal-dialog">'
            + '<div class="modal-content" style="width:700px;">'
            + '<div class="modal-header">'
            + '<button type="button" class="close" data-dismiss="modal">&times;</button>'
            + '<h4 class="modal-title">等待审批的任务</h4>'
            + '</div>'
            + '<div class="modal-body" id="dash_body_unpass">';
    content += '<ul class="list-group" style="margin-left:0px;">';
    for (var i = 0; i < tasks.length; i++)
    {
        //var task=JSON.stringify(tasks[i]);
        content += '<li class="list-group-item list-group-item-success" style="margin-bottom:0px;" onclick=showPassDataView(\'' + tasks[i].id + '\',\'' + i + '\');>' + '任务' + (i + 1) + ': ' + tasks[i].name +
                '<i class="fa fa-2x fa-eye" aria-hidden="true" style="float:right;" class="dataViewPass"></i></li>';
    }
    content += '</ul></div>';
    content += '<div class="modal-footer" id="footsize">'
            + '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>'
            + '</div>'
            + '</div>'
            + '</div>';
    return content;
}

function showPassDataView(tid, index)
{
    var cc = $("#dash_body_unpass").html();
    $.ajax({
        url: "../../HandleGetDashInfo",
        data: {"taskid": tid, "option": 3},
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
        },
        success: function (result) {
            if (result === "0")
            {
                alert(result);
            }
            else
            {
                var datas = JSON.parse(result);
                var content = getWaitPassDataModal(datas, allDashUNTask[parseInt(index)]);
                var dig = document.getElementById("my_Modal");
                dig.innerHTML = "";
                dig.innerHTML = content;
                $("#my_Modal").modal();
            }
        }
    });
}

function getWaitPassDataModal(ds, task)
{
    var dirs = [];
    var content = '<div class="modal-dialog">'
            + '<div class="modal-content" style="width:1100px;left:-250px;height:700px;">'
            + '<div class="modal-header">'
            + '<button type="button" class="close" data-dismiss="modal">&times;</button>'
            + '<h4 class="modal-title">等待审批的任务的数据信息</h4>'
            + '</div>'
            + '<div class="modal-body" id="dash_body_unpass">';
    content += '<div style="margin-left:0px;">';
    content += '<div class="task_tb_img" id="task_tb_img">'
            + '<img id="task_tb_img_result" class="task_tb_img_result" src="' + task.img_path + '">'
            + '</div>';
    content += '<div class="task_tb_info" id="task_tb_info" style="border-bottom:1px solid gray;width: 750px;">'
            + ' <span id="task_tb_date"><span class="info_tb_title" style="color:red">日期:</span>&nbsp;' + task.tdate + '</span>&nbsp;&nbsp;'
            + '<span id="task_tb_time"><span class="info_tb_title" style="color:red">时间:</span>&nbsp;' + getOnlyTime(task.stime, task.etime) + '</span>&nbsp;&nbsp;'
            + '<span id="task_tb_location"><span class="info_tb_title" style="color:red">地点:</span>&nbsp;' + task.location + '</span>&nbsp;&nbsp;'
            + '<span id="task_tb_method"><span class="info_tb_title" style="color:red">采集方式:</span>&nbsp;' + getNameByMetod(task.method) + '</span><br/>'
            + '<span class="task_tb_method"><span class="info_tb_title" style="color:red">调查员:</span>&nbsp;' + ds[0].us_name + '</span>&nbsp;&nbsp;'
            + '<span class="task_tb_method"><span class="info_tb_title" style="color:red">联系信息:</span>&nbsp;' + ds[0].uscontact + '</span><br/>';
    if (task.type === 3)
    {
        content += '<span id="task_tb_light_type"><span class="info_tb_title" style="color:red">信号类型:</span>&nbsp;' + getNameByLight(task.light_type) + '</span><br/>';
    }
    else
    {
        var directions = task.task_Directions;
        if (directions === undefined || directions === null || directions === "") {
            //this.selectedLanes=null;
        } else
        {
            content += '<span class="task_tb_method"><span class="info_tb_title" style="color:red">调查流向:</span>&nbsp;';
            for (var j = 0; j < directions.length; j++)
            {
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

                    var item = {"direction_type": did, "direction_name": type, "laneName": (directions[j].laneName + directions[j].degree_name), "laneid": directions[j].laneid};
                    dirs.push(item);
                    content += directions[j].laneName + directions[j].degree_name + ':&nbsp;' + type + ',&nbsp;&nbsp;';
                }


            }
            content += '</span>';

        }
        content += '<br/><span class="task_tb_method"><span class="info_tb_title" style="color:red">车辆类型:</span>&nbsp;';
        var peizhi = task.peizhi;
        for (var i = 0; i < peizhi.length; i++)
        {
            content += peizhi[i].type_name + '&nbsp;&nbsp;';
        }
        content += '</span>';
    }

    content += '</div>';
    content += '<div class="unpass_view_option">';
    content += '<select class="unpass_view_lane" id="task_lane_info">';
    content += '<option value="0">选择车道车流</option>';
    for (var i = 0; i < dirs.length; i++)
    {
        content += '<option value="' + task.id + '_' + dirs[i].laneid + '_' + dirs[i].direction_type + '">' + dirs[i].laneName + '--' + dirs[i].direction_name + '</option>';
    }
    content += '</select>&nbsp;&nbsp;';
    content += '<select class="unpass_view_lane" id="task_lane_out">'
            + '<option value="0">选择数据格式</option>'
            + '<option value="1">数据列表</option>'
            + '<option value="2">数据图表</option></select>&nbsp;&nbsp;';
    content += '<button type="button" class="btn btn-default" onclick="showUNpassData()">查看数据</button></div>';
    content += '<div class="unpass_view_info" id="unpass_data_info_form" style="display:block;"></div>';
    content += '<div class="unpass_view_info" id="unpass_data_info_img" style="display:none;"><div id="show_data_img" style="margin-left: 20px;margin-top:10px;"></div></div>';
    content += '<div class="unpass_view_note"><span>请输入数据未通过的原因</span><textarea style="margin: 0px; height: 177px; width: 298px;" id="fail_task_note"></textarea></div>';
    content += '</div></div>';
    content += '<div class="modal-footer" id="footsize" style="position:relative;top:-320px;">'
            + '<button type="button" class="btn btn-default" onclick="passTaskByID(\'' + task.id + '\')">通过</button>'
            + '<button type="button" class="btn btn-default" onclick="failPassTaskByID(\'' + task.id + '\')">打回</button>'
            + '<button type="button" class="btn btn-default" onclick="backToTaskList()">返回</button>'
            + '</div>'
            + '</div>'
            + '</div>';
    return content;
}

function passTaskByID(taskid)
{
    $.ajax({
        url: "../../HandleUserTask",
        data: {"id": taskid, "option": 4},
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
        },
        success: function (result) {
            if (result === "4?")
            {
                alert("数据没有通过验证审核!!!");
                //loadWaitPassTasks();
            }
            else
            {
                alert("数据已经通过验证审核");
                //loadWaitPassTasks();
            }
        }
    });
}

function failPassTaskByID(taskid)
{
    //document.getElementID("fail_task_note").disabled="false";
    var notes = $("#fail_task_note").val();
    if (notes === "")
    {
        alert("请输入审核未通过的原因");
    } else
    {
        $.ajax({
            url: "../../HandleUserTask",
            data: {"id": taskid, "option": 5, "notes": notes},
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
            },
            success: function (result) {
                if (result === "5?")
                {
                    alert("操作没有成功");
                    //loadWaitPassTasks();
                }
                else
                {
                    alert("数据已经被打回到相关的调查员");
                    //loadWaitPassTasks();
                }
            }
        });
    }
}

function backToTaskList()
{
    $("#my_Modal").modal("hide");
    //loadWaitPassTasks();
}

function showUNpassData()
{

    var interval = 60;
    var sinfo = $("#task_lane_info").val();
    var rway = $("#task_lane_out").val();

    if (sinfo === "0" || rway === "0")
    {
        alert("请选择车道车流和数据的查看方式");
    }
    else
    {
        var sinfo = sinfo.split("_");
        var taskid = sinfo[0];
        var laneid = sinfo[1];
        var direction_type = sinfo[2];
        $.ajax({
            url: "../../HandleGetDashInfo",
            data: {"taskid": taskid, "option": 4, "laneid": laneid, "did": direction_type, "interval": interval},
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
            },
            success: function (result) {
                if (result === "0")
                {
                    alert(result);
                }
                else
                {
                    var datas = JSON.parse(result);
                    if (rway === "1")//table view
                    {
                        var content = '<div style="height:400px;overflow-y:scroll;text-align:center;"><span style="color:red;font-size:18px;">' + datas.time + '&nbsp;' + datas.title + '的交通方式的累计流量' + '</span><br/>';
                        content += '<table class="dash_show_table"><tr><td class="dash_show_td">时间</td>';
                        var data = datas.data;
                        for (var m = 0; m < data.length; m++)
                        {
                            content += '<td class="dash_show_td">' + data[m].cname + '</td>';
                        }
                        content += '</tr>';
                        var number = data[0].number;
                        for (var k = 0; k < number; k++)
                        {
                            content += '<tr>';
                            var ts = data[0].times;
                            content += '<td class="dash_show_td">' + ts[k].time + '</td>';
                            for (var m = 0; m < data.length; m++)
                            {
                                var times = data[m].times;
                                content += '<td class="dash_show_td">' + times[k].number + '</td>';
                            }
                            content += '</tr>';
                        }
                        content += '</table></div>';
                        $("#unpass_data_info_img").hide();
                        $("#unpass_data_info_form").empty();
                        $("#unpass_data_info_form").html(content);
                        $("#unpass_data_info_form").show();
                    }
                    else// img view
                    {
                        $("#unpass_data_info_form").hide();
                        var data = datas.data;
                        $("#show_data_img").empty();
                        google.charts.setOnLoadCallback(drawChart);
                        function drawChart()
                        {
                            var datag = new google.visualization.DataTable();
                            datag.addColumn('string', '时间');
                            for (var m = 0; m < data.length; m++)
                            {
                                datag.addColumn('number', data[m].cname);
                            }
                            var rowInfo = [];

                            var number = data[0].number;
                            for (var k = 0; k < number; k++)
                            {
                                var item = [];
                                var ts = data[0].times;
                                var ctime = ts[k].time;
                                item.push(ctime);
                                for (var m = 0; m < data.length; m++)
                                {
                                    var times = data[m].times;
                                    item.push(times[k].number);
                                }
                                rowInfo.push(item);
                            }
                            datag.addRows(rowInfo);

                            var options = {
                                chart: {
                                    title: datas.time + datas.title + '的交通方式的累计流量'
                                },
                                width: 700,
                                height: 380,
                                axes: {
                                    x: {
                                        0: {side: 'bottom'}
                                    }
                                }
                            };

                            var chart = new google.charts.Line(document.getElementById('show_data_img'));
                            chart.draw(datag, options);
                            $("#unpass_data_info_img").show();
                        }

                    }
                }
            }

        });

    }
}


function initResultView()
{
    var sid = $("#project_body").attr("st_id");
    $.ajax({
        url: "../../HandleGetResultViewInfo",
        data: {"sid": sid, "option": 1},
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
        },
        success: function (result) {
            if (result === "0")
            {
                alert(result);
            }
            else
            {

                var tmodels = JSON.parse(result);
                var content = getResult_ViewModal(tmodels);
                $("#data_view").empty();
                $("#data_view").html(content);
                //location.reload(true);
            }
        }
    });
}

var allTmodels = [];
var tmodel_name_title = "";
function getResult_ViewModal(tds)
{
    var content = "";
    allTmodels = [];
    allTmodels = tds;
    for (var i = 0; i < tds.length; i++)
    {

        content += '<div class="panel-group">'
                + '<div class="panel panel-default">'
                + '<div class="panel-heading">'
                + '<h4 class="panel-title">'
                + '<a data-toggle="collapse" href="#rv_t' + i + '">'
                + '<span class="tmodel_name">' + tds[i].showName + '&nbsp;日期:' + tds[i].mdate + '</span>'
                + '<span style="margin-left: 250px;">已完成任务:</span>&nbsp;<span class="tmodel_processing">' + tds[i].c_T_number + '/' + tds[i].all_T_number + '</span>'
                + '<span class="tmodel_result_show showTmodelCursor" style="margin-left:15px;" onclick="showTmodel_View(\'' + i + '\')">查看调查数据</span>&nbsp;&nbsp;<span class="tmodel_result_show showTmodelCursor"  onclick="showSavedShowData(\'' + tds[i].id + '\')">数据服务</span>'
                + '</a>'
                + '</h4>'
                + '</div>';
        var tasks = tds[i].task_items;
        content += '<div id="rv_t' + i + '" class="panel-collapse collapse">'
                + '<ul class="list-group">';
        for (var j = 0; j < tasks.length; j++)
        {
            var status = "";
            if (tasks[j].c_status === 1)
            {
                status = "等待接受中";
            }
            if (tasks[j].c_status === 0)
            {
                status = "等待分配中";
            }
            if (tasks[j].c_status === 2)
            {
                status = "正在进行中";
            }
            if (tasks[j].c_status === 3)
            {
                status = "等待审核中";
            }
            if (tasks[j].c_status === 4)
            {
                status = "已经完成";
            }
            if (tasks[j].c_status === 5)
            {
                status = "重新进行中";
            }
            content += '<li class="list-group-item" style="color:black;margin-bottom:5px;">'
                    + '<span class="view_task_name">' + tasks[j].showName + '&nbsp;' + tasks[j].dcName + '</span>'
                    + '<span style="margin-left: 200px;">任务状态:</span>&nbsp;<span class="view_task_processing showCursor" onclick="goToTaskAssign(\'' + tasks[j].c_status + '\')">' + status + '</span>'
                    + '<span class="view_task_show showCursor" onclick="showTaskResult_View(\'' + tasks[j].id + '\',\'' + tasks[j].c_status + '\')">查看任务数据</span>'
                    + '</li>';
        }
        content += '</ul></div></div></div>';
        return content;
    }
}

function goToTaskAssign(status)
{
    status = parseInt(status);
    if (status === 0)
    {
        showNav_Option(3);
    }
    else if (status === 3)
    {
        loadWaitPassTasks();
    }
}

var r_datas = [];
function showTmodel_View(index)
{
    var tmodel = allTmodels[index];
    if (tmodel !== null && tmodel !== undefined)
    {
        $.ajax({
            url: "../../HandleGetResultViewInfo",
            data: {"tid": tmodel.id, "option": 3},
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
            },
            success: function (result) {
                if (result !== "" && result !== "null")
                {
                    r_datas = JSON.parse(result);
                    var ts = tmodel.task_items_times;
                    if (ts !== null && ts !== undefined)
                    {
                        var timeLines = "";
                        for (var i = 0; i < ts.length; i++)
                        {
                            if (ts[i].completed === 1)
                            {

                                timeLines += '<option value="' + ts[i].stime + '_' + ts[i].etime + '">' + ts[i].stime + '--' + ts[i].etime + '</option>';
                            }

                        }
                        if (timeLines === "")
                        {
                            alert("当前没有完成的调查时段数据供你查看，请稍后再试");
                        }
                        else
                        {
                            var content = '<div class="modal-dialog">'
                                    + '<div class="modal-content" style="width:1100px;left:-250px;height:700px;">'
                                    + '<div class="modal-header">'
                                    + '<button type="button" class="close" data-dismiss="modal">&times;</button>'
                                    + '<h4 class="modal-title">' + tmodel.showName + '的数据信息</h4>'
                                    + '</div>'
                                    + '<div class="modal-body" id="dash_body_pass_tmodel" tid="' + tmodel.id + '">';
                            content += '<div style="margin-left:0px;">';
                            content += '<div class="task_tb_img" id="task_tb_img">'
                                    + '<img id="task_tb_img_result" class="task_tb_img_result" src="' + tmodel.img_path + '">'
                                    + '</div>';
                            content += '<div class="task_tb_info" id="task_tb_info" style="border-bottom:1px solid gray;width: 750px;">'
                                    + ' <span id="task_tb_date"><span class="info_tb_title" style="color:red">日期:</span>&nbsp;' + tmodel.mdate + '</span>&nbsp;&nbsp;</div>';

                            content += '<div class="unpass_view_option">';
                            content += '<select class="pass_select" id="t_result_times">'
                                    + '<option value="0">选择任务时间段</option>';
                            //var ts = tmodel.task_items_times;
                            content += timeLines;
//            for (var i = 0; i < ts.length; i++)
//            {
//                var temp = ts[i].split("_");
//                content += '<option value="' + ts[i] + '">' + temp[1] + '--' + temp[2] + '</option>';
//            }
                            content += '</select>&nbsp;&nbsp;';
                            content += '<select class="pass_select" id="t_result_interval">'
                                    + '<option value="0">选择时间间隔</option>'
                                    + '<option value="60">1分钟</option>'
                                    + '<option value="300">5分钟</option>'
                                    + '<option value="600">10分钟</option>'
                                    + '<option value="900">15分钟</option>'
                                    + '<option value="1800">30分钟</option><option value="3600">60分钟</option></select>&nbsp;&nbsp;';
                            content += '<select class="pass_select" id="t_lane_info">';
                            content += '<option value="0">全部车道</option>';
                            var lanes = tmodel.lanes;
                            for (var i = 0; i < lanes.length; i++)
                            {
                                content += '<option value="' + lanes[i].id + '">' + lanes[i].name + '--' + lanes[i].degree_name + '</option>';
                            }
                            content += '</select>&nbsp;&nbsp;';
                            content += '<select class="pass_select" id="t_result_direction">'
                                    + '<option value="0">全部流向</option>'
                                    + '<option value="1">掉头流向</option>'
                                    + '<option value="2">左转流向</option>'
                                    + '<option value="3">直行流向</option>'
                                    + '<option value="4">右转流向</option>'
                                    + '<option value="5">自行车流向</option><option value="6">行人流向</option></select>&nbsp;&nbsp;';
                            content += '<select class="unpass_view_lane" id="t_cars_info">';
                            content += '<option value="0">全部车型</option>';
                            var cars = tmodel.car_types;
                            for (var i = 0; i < cars.length; i++)
                            {
                                var temp = cars[i].split("_");
                                content += '<option value="' + temp[0] + '">' + temp[1] + '</option>';
                            }
                            content += '<option value="-1">折算车型</option>';
                            content += '</select>&nbsp;&nbsp;';
                            content += '<select class="pass_select" id="t_lane_way">'
                                    + '<option value="1">累计流量曲线</option>'
                                    + '<option value="2">分时流量曲线</option>'
                                    + '</select>&nbsp;&nbsp;';
                            content += '<select class="pass_select" id="t_model_format">'
                                    + '<option value="1">折线图</option>'
                                    + '<option value="2">柱状图</option>'
                                    + '<option value="3">表格图</option>'
                                    + '</select>&nbsp;&nbsp;';
                            content += '<button type="button" class="btn btn-default" onclick="showPassData()">查看数据</button></div>';
                            content += '<div class="unpass_view_info" id="pass_data_info_form" style="display:none;overflow:scroll;"></div>';
                            content += '<div class="unpass_view_info" id="pass_data_info_img" style="display:block;"><div id="show_pass_data_img" style="margin-left: 20px;margin-top:10px;"></div></div>';
                            content += '</div></div>';
                            content += '<div class="modal-footer" id="footsize" style="position:relative;top:-30px;">'
                                    + '<button type="button" class="btn btn-default" onclick="saveShowData()">保存</button>'
                                    + '</div>'
                                    + '</div>'
                                    + '</div>';
                            var dig = document.getElementById("my_Modal");
                            dig.innerHTML = "";
                            dig.innerHTML = content;
                            $("#my_Modal").modal();
                        }
                    }
                    else
                    {
                        alert("当前没有完成的整体数据供你查看");
                    }
                }
                else
                {
                    alert("获取数据失败，请重新尝试");
                }

            }
        });
    }

}

function showTaskResult_View(id, status)
{
    status = parseInt(status);
    if (status !== 4)
    {
        alert("此任务还没有被完成，当前不能查看数据！");
    }
    else
    {
        var data;
        $.ajax({
            url: "../../HandleGetResultViewInfo",
            data: {"tid": id, "option": 4},
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
            },
            success: function (result) {
                data = JSON.parse(result);
                var task = data.task;
                var ds = data.ds;
                var content = getTaskPassDataModal(ds, task);
                var dig = document.getElementById("my_Modal");
                dig.innerHTML = "";
                dig.innerHTML = content;
                $("#my_Modal").modal();

            }
        });
    }
}

var tempTask = null;
var tempTaskData = null;
function getTaskPassDataModal(ds, task)
{
    var dirs = [];
    tempTask = task;
    tempTaskData = ds;
    var content = '<div class="modal-dialog">'
            + '<div class="modal-content" style="width:1100px;left:-250px;height:700px;">'
            + '<div class="modal-header">'
            + '<button type="button" class="close" data-dismiss="modal">&times;</button>'
            + '<h4 class="modal-title">任务的数据信息</h4>'
            + '</div>'
            + '<div class="modal-body" id="dash_body_pass" tid="' + task.id + '">';
    content += '<div style="margin-left:0px;">';
    content += '<div class="task_tb_img" id="task_tb_img">'
            + '<img id="task_tb_img_result" class="task_tb_img_result" src="' + task.img_path + '">'
            + '</div>';
    content += '<div class="task_tb_info" id="task_tb_info" style="border-bottom:1px solid gray;width: 750px;">'
            + ' <span id="task_tb_date"><span class="info_tb_title" style="color:red">日期:</span>&nbsp;' + task.tdate + '</span>&nbsp;&nbsp;'
            + '<span id="task_tb_time"><span class="info_tb_title" style="color:red">时间:</span>&nbsp;' + getOnlyTime(task.stime, task.etime) + '</span>&nbsp;&nbsp;'
            + '<span id="task_tb_location"><span class="info_tb_title" style="color:red">地点:</span>&nbsp;' + task.location + '</span>&nbsp;&nbsp;'
            + '<span id="task_tb_method"><span class="info_tb_title" style="color:red">采集方式:</span>&nbsp;' + getNameByMetod(task.method) + '</span><br/>'
            + '<span class="task_tb_method"><span class="info_tb_title" style="color:red">调查员:</span>&nbsp;' + ds[0].us_name + '</span>&nbsp;&nbsp;'
            + '<span class="task_tb_method"><span class="info_tb_title" style="color:red">联系信息:</span>&nbsp;' + ds[0].uscontact + '</span><br/>';
    if (task.type === 3)
    {
        content += '<span id="task_tb_light_type"><span class="info_tb_title" style="color:red">信号类型:</span>&nbsp;' + getNameByLight(task.light_type) + '</span><br/>';
    }
    else
    {
        var directions = task.task_Directions;
        if (directions === undefined || directions === null || directions === "") {
            //this.selectedLanes=null;
        } else
        {
            content += '<span class="task_tb_method"><span class="info_tb_title" style="color:red">调查流向:</span>&nbsp;';
            for (var j = 0; j < directions.length; j++)
            {
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

                    var item = {"direction_type": did, "direction_name": type, "laneName": (directions[j].laneName + directions[j].degree_name), "laneid": directions[j].laneid};
                    dirs.push(item);
                    content += directions[j].laneName + directions[j].degree_name + ':&nbsp;' + type + ',&nbsp;&nbsp;';
                }


            }
            content += '</span>';

        }
        content += '<br/><span class="task_tb_method"><span class="info_tb_title" style="color:red">车辆类型:</span>&nbsp;';
        var peizhi = task.peizhi;
        for (var i = 0; i < peizhi.length; i++)
        {
            content += peizhi[i].type_name + '&nbsp;&nbsp;';
        }
        content += '</span>';
    }

    content += '</div>';
    content += '<div class="unpass_view_option">';
    content += '<select class="pass_select" id="task_result_interval">'
            + '<option value="0">选择时间间隔</option>'
            + '<option value="60">1分钟</option>'
            + '<option value="300">5分钟</option>'
            + '<option value="600">10分钟</option>'
            + '<option value="900">15分钟</option>'
            + '<option value="1800">30分钟</option><option value="3600">60分钟</option></select>&nbsp;&nbsp;';
    content += '<select class="unpass_view_lane" id="task_result_direction">';
    content += '<option value="0">全部流向</option>';
    for (var i = 0; i < dirs.length; i++)
    {
        content += '<option value="' + dirs[i].direction_type + '">' + dirs[i].laneName + '--' + dirs[i].direction_name + '</option>';
    }
    content += '</select>&nbsp;&nbsp;';
    content += '<select class="unpass_view_lane" id="task_result_cars">';
    content += '<option value="0">全部车型</option>';
    var cars = task.peizhi;
    for (var i = 0; i < cars.length; i++)
    {
        content += '<option value="' + cars[i].id + '">' + cars[i].type_name + '</option>';
    }
    content += '</select>&nbsp;&nbsp;';
    content += '<select class="pass_select" id="task_lane_way">'
            + '<option value="1">累计流量曲线</option>'
            + '<option value="2">分时流量曲线</option>'
            + '</select>&nbsp;&nbsp;';
    content += '<select class="pass_select" id="task_lane_format">'
            + '<option value="1">折线图</option>'
            + '<option value="2">柱状图</option>'
            + '<option value="3">表格图</option>'
            + '</select>&nbsp;&nbsp;';
    content += '<button type="button" class="btn btn-default" onclick="showPassData_Task()">查看数据</button></div>';
    content += '<div class="unpass_view_info" id="pass_data_info_form_task" style="display:none;"></div>';
    content += '<div class="unpass_view_info" id="pass_data_info_img_task" style="display:block;"><div id="show_task_data_img" style="margin-left: 20px;margin-top:10px;"></div></div>';
    content += '</div></div>';
    content += '<div class="modal-footer" id="footsize" style="position:relative;top:-20px;">'
            + '</div>'
            + '</div>'
            + '</div>';
    return content;
}

function showPassData_Task()
{
    var task = tempTask;
    var ds = tempTaskData;
    var tid = task.id;
    var interval = $("#task_result_interval").val();
    interval = parseInt(interval);
    var did = $("#task_result_direction").val();
    did = parseInt(did);
    var cid = $("#task_result_cars").val();
    cid = parseInt(cid);
    var way = $("#task_lane_way").val();
    way = parseInt(way);
    var format = $("#task_lane_format").val();
    format = parseInt(format);
    var title = "test";
    var mdate = task.tdate;
    var stime = task.stime;
    var etime = task.etime;
    drawResult_Data_Graphic_Task(ds, interval, way, tid, did, cid, mdate, stime, etime, format, title);
}


var tmodel_title = "";
function showPassData()
{
    var sds = r_datas;
    var interval = $("#t_result_interval").val();
    interval = parseInt(interval);
    var times = $("#t_result_times").val();
    times = times.split("_");
    var mdate = times[0];
    var stime = times[1];
    var etime = times[2];
    var laneid = $("#t_lane_info").val();
    laneid = parseInt(laneid);
    var did = $("#t_result_direction").val();
    did = parseInt(did);
    var cid = $("#t_cars_info").val();
    cid = parseInt(cid);
    var way = $("#t_lane_way").val();
    way = parseInt(way);
    var format = $("#t_model_format").val();
    format = parseInt(format);
    tmodel_title = "";
    drawResult_Data_Graphic(sds, interval, way, laneid, did, cid, mdate, stime, etime, format);

}

function saveShowData()
{
    var interval = $("#t_result_interval").val();
    interval = parseInt(interval);
    var times = $("#t_result_times").val();
    times = times.split("_");
    var mdate = times[0];
    var stime = times[1];
    var etime = times[2];
    var laneid = $("#t_lane_info").val();
    laneid = parseInt(laneid);
    var did = $("#t_result_direction").val();
    did = parseInt(did);
    var cid = $("#t_cars_info").val();
    cid = parseInt(cid);
    var way = $("#t_lane_way").val();
    way = parseInt(way);
    var tid = $("#dash_body_pass_tmodel").attr("tid");
    tid = parseInt(tid);
    var format = $("#t_model_format").val();
    format = parseInt(format);
    $.ajax({
        url: "../../HandleShowData",
        data: {"tid": tid, "option": 1, "laneid": laneid, "taskid": 0, "did": did, "cid": cid, "interval": interval, "way": way, "mdate": mdate, "stime": stime, "etime": etime, "title": tmodel_title, "format": format},
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
        },
        success: function (result) {
            if (result === "0")
            {
                alert("保存数据失败，请重试");
            }
            else
            {
                alert("保存数据成功到数据服务，请到数据服务就是查看和下载");
            }

        }
    });
}

function deleteShowData(id)
{
    $.ajax({
        url: "../../HandleShowData",
        data: {"id": id, "option": 2},
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
        },
        success: function (result) {
            if (result === "0")
            {
                alert("删除数据失败，请重试");
            }
            else
            {
                alert("删除数据成功");
            }

        }
    });
}


function loadDraggleShowData()
{
    $("#show_data_item").sortable();
    $("#show_data_item").disableSelection();
}

var tempShowData = null;

function showSavedShowData(tid)
{
    tid = parseInt(tid);
    for (var k = 0; k < allTmodels.length; k++)
    {
        if (tid === allTmodels[k].id)
        {
            tmodel_name_title = allTmodels[k].showName;
            break;
        }
    }
    $.ajax({
        url: "../../HandleShowData",
        data: {"tid": tid, "option": 3},
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
        },
        success: function (result) {
            if (result === "0")
            {
                alert("保存数据失败，请重试");
            }
            else
            {
                if (result === "")
                {
                    alert("此调查还没有任何保存的配置数据供你查看");
                }
                else
                {
                    var datas = JSON.parse(result);
                    tempShowData = datas;
                    var content = '<div class="modal-dialog">'
                            + '<div class="modal-content" style="width:1100px;left:-250px;height:700px;">'
                            + '<div class="modal-header">'
                            + '<button type="button" class="close" data-dismiss="modal">&times;</button>'
                            + '<h4 class="modal-title">保存的调查配置信息</h4>'
                            + '</div>'
                            + '<div class="modal-body">';
                    content += '<ul class="list-group" id="show_data_item">';
                    for (var i = 0; i < datas.length; i++)
                    {
                        var type = "";
                        if (datas[i].format === 1)
                        {
                            type = "折线图";
                        }
                        if (datas[i].format === 2)
                        {
                            type = "柱状图";
                        }
                        if (datas[i].format === 3)
                        {
                            type = "表格";
                        }
                        content += '<li class="list-group-item list-group-item-info" style="margin-bottom:5px;" id="show_data_item_' + datas[i].id + '">' + datas[i].title + '&nbsp;&nbsp;' + '时间间隔:&nbsp;' + (datas[i].interval / 60) + '分钟,&nbsp;&nbsp;图表类型:&nbsp;' + type + '&nbsp;&nbsp;<span style="color:red;" onclick="showSaveDataTemp(\'' + i + '\')">&nbsp;&nbsp;查看</span>\n\
                                <span class="showCursor" style="float:right;margin-left:10px;" onclick="deleteSaveDataView(\'' + datas[i].id + '\')">删除此配置</span><span style="float:right;">下载此配置道文件</span><input class="show_item_select" style="float:right;" type="checkbox" index="' + i + '" ></li>';
                    }
                    content += '</ul>\n\
                            <div id="show_data_item_view" style="display:none;"><div id="show_data_item_view_div"></div><div><button type="button" class="btn btn-default" onclick="backToShowData()">返回</button></div></div></div>';
                    content += '<div class="modal-footer" id="footsize" style="position:relative;top:-30px;">'
                            + '<button type="button" class="btn btn-default" onclick="savePassDataPDF()">下载数据PDF</button>'
                            + '<button type="button" class="btn btn-default" onclick="savePassDataEXE()">下载数据EXCEL</button><div id="process_data_item_tables" style="display:none;"></div><div id="process_data_item_view" style="display:none;"></div><div id="process_data_item_imgs" style="display:none;"></div>'
                            + '</div>'
                            + '</div>'
                            + '</div>';
                    var dig = document.getElementById("my_Modal");
                    dig.innerHTML = "";
                    dig.innerHTML = content;
                    $("#my_Modal").modal();
                    loadDraggleShowData();
                }
            }

        }
    });
}

function deleteSaveDataView(id)
{
    $.ajax({
        url: "../../HandleShowData",
        data: {"id": id, "option": 2},
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
        },
        success: function (result) {
            if (result === "0")
            {
                alert("删除数据失败，请重试");
            }
            else
            {
                $("#show_data_item_" + id).remove();
            }
        }
    });
}


function backToShowData()
{
    $("#show_data_item_view").hide();
    $("#show_data_item").show();
}

var total_Images = 0;
var imageIndexs = [];
var imageIndex = 0;
var image_obs = [];
function savePassDataPDF()
{
    total_Images = 0;
    imageIndexs = [];
    imageIndex = 0;
    image_obs = [];
    $("#process_data_item_imgs").empty();
    $(".show_item_select").each(function () {
        if ($(this).is(':checked'))
        {
            total_Images++;
            var index = $(this).attr("index");
            index = parseInt(index);
            imageIndexs.push(index);
        }
    });
    if (total_Images > 0)
    {
        savePDFData(imageIndexs[0]);
    }

}

function savePDFData(index)
{
    var ds = tempShowData[index];
    var sds = ds.data;
    var interval = ds.interval;
    interval = parseInt(interval);
    var mdate = ds.mdate;
    var stime = ds.stime;
    var etime = ds.etime;
    var laneid = ds.laneid;
    laneid = parseInt(laneid);
    var did = ds.did;
    did = parseInt(did);
    var cid = ds.cid;
    cid = parseInt(cid);
    var way = ds.way;
    way = parseInt(way);
    var format = ds.format;
    format = parseInt(format);
    tmodel_title = ds.title;
    saveResult_Data_Graphic(sds, interval, way, laneid, did, cid, mdate, stime, etime, format);
}
function showSaveDataTemp(index)
{
    index = parseInt(index);
    var ds = tempShowData[index];
    var sds = ds.data;
    var interval = ds.interval;
    interval = parseInt(interval);
    var mdate = ds.mdate;
    var stime = ds.stime;
    var etime = ds.etime;
    var laneid = ds.laneid;
    laneid = parseInt(laneid);
    var did = ds.did;
    did = parseInt(did);
    var cid = ds.cid;
    cid = parseInt(cid);
    var way = ds.way;
    way = parseInt(way);
    var format = ds.format;
    format = parseInt(format);
    tmodel_title = ds.title;
    viewResult_Data_Graphic(sds, interval, way, laneid, did, cid, mdate, stime, etime, format);

}

function drawResult_Data_Graphic_Task(sds, interval, way, tid, did, cid, mdate, stime, etime, format, title)
{
    var result = getResultFormatDataByTask(sds, tid, did, cid, stime, etime, interval, way);
    google.charts.setOnLoadCallback(drawChart_Task);
    function drawChart_Task()
    {
        $("#show_task_data_img").empty();
        var datag = new google.visualization.DataTable();
        datag.addColumn('string', '时间');
        var d1 = result.data;
        for (var m = 0; m < d1.length; m++)
        {
            datag.addColumn('number', d1[m].name);
        }
        var rowInfo = [];
        var time_names = result.time_line;
        if (time_names !== null)
        {
            var number = time_names.length;
            for (var k = 0; k < number; k++)
            {
                var item = [];
                var ts = time_names[k];
                item.push(ts);
                for (var m = 0; m < d1.length; m++)
                {
                    var times = d1[m].times;
                    item.push(times[k]);
                }
                rowInfo.push(item);
            }
            datag.addRows(rowInfo);

            var options = {
                chart: {
                    title: title
                },
                width: 700,
                height: 380,
                axes: {
                    x: {
                        0: {side: 'bottom'}
                    }
                }
            };

            var chart = new google.charts.Line(document.getElementById('show_task_data_img'));
            chart.draw(datag, options);
        }
        // $("#unpass_data_info_img").show();
    }
}

function drawResult_Data_Graphic(sds, interval, way, laneid, did, cid, mdate, stime, etime, format)
{
    var result = getResultFormatData(sds, laneid, did, cid, mdate, stime, etime, interval, way);
    google.charts.setOnLoadCallback(drawChartTmodel);
    function drawChartTmodel()
    {
        $("#pass_data_info_form").hide();

        $("#show_pass_data_img").empty();
        var datag = new google.visualization.DataTable();
        datag.addColumn('string', '时间');
        var d1 = result.data;
        for (var m = 0; m < d1.length; m++)
        {
            datag.addColumn('number', d1[m].name);
        }
        var rowInfo = [];
        var time_names = result.time_line;
        if (time_names !== null)
        {
            var number = time_names.length;
            for (var k = 0; k < number; k++)
            {
                var item = [];
                var ts = time_names[k];
                item.push(ts);
                for (var m = 0; m < d1.length; m++)
                {
                    var times = d1[m].times;
                    item.push(times[k]);
                }
                rowInfo.push(item);
            }
            datag.addRows(rowInfo);

            var options = {
                chart: {
                    title: tmodel_title
                },
                width: 700,
                height: 380,
                axes: {
                    x: {
                        0: {side: 'bottom'}
                    }
                }
            };
            var chart;
            if (format === 1)
            {
                chart = new google.charts.Line(document.getElementById('show_pass_data_img'));
                chart.draw(datag, options);
            }
            else if (format === 2)
            {
                chart = new google.charts.Bar(document.getElementById('show_pass_data_img'));
                chart.draw(datag, options);
            }
            else if (format === 3)
            {
                chart = new google.visualization.Table(document.getElementById('show_pass_data_img'));
                chart.draw(datag, {width: '100%', height: '100%'});
            }

            $("#pass_data_info_img").show();

        }
        else
        {
            alert("该信息在任务不存在");
        }
        // $("#unpass_data_info_img").show();
    }
}

function viewResult_Data_Graphic(sds, interval, way, laneid, did, cid, mdate, stime, etime, format)
{
    var result = getResultFormatData(sds, laneid, did, cid, mdate, stime, etime, interval, way);
    google.charts.setOnLoadCallback(drawChartTmodel_view);
    function drawChartTmodel_view()
    {
        $("#show_data_item").hide();

        $("#show_data_item_view_div").empty();
        var datag = new google.visualization.DataTable();
        datag.addColumn('string', '时间');
        var d1 = result.data;
        for (var m = 0; m < d1.length; m++)
        {
            datag.addColumn('number', d1[m].name);
        }
        var rowInfo = [];
        var time_names = result.time_line;
        if (time_names !== null)
        {
            var number = time_names.length;
            for (var k = 0; k < number; k++)
            {
                var item = [];
                var ts = time_names[k];
                item.push(ts);
                for (var m = 0; m < d1.length; m++)
                {
                    var times = d1[m].times;
                    item.push(times[k]);
                }
                rowInfo.push(item);
            }
            datag.addRows(rowInfo);

            var options = {
                chart: {
                    title: tmodel_title
                },
                width: 700,
                height: 380,
                axes: {
                    x: {
                        0: {side: 'bottom'}
                    }
                }
            };
            var chart;
            if (format === 1)
            {
                chart = new google.charts.Line(document.getElementById('show_data_item_view_div'));
                chart.draw(datag, options);
            }
            else if (format === 2)
            {
                chart = new google.charts.Bar(document.getElementById('show_data_item_view_div'));
                chart.draw(datag, options);
            }
            else if (format === 3)
            {
                chart = new google.visualization.Table(document.getElementById('show_data_item_view_div'));
                chart.draw(datag, {width: '100%', height: '100%'});
            }

            $("#show_data_item_view").show();

        }
        else
        {
            alert("该信息在任务不存在");
        }
        // $("#unpass_data_info_img").show();
    }

}

function saveResult_Data_Graphic(sds, interval, way, laneid, did, cid, mdate, stime, etime, format)
{
    var result = getResultFormatData(sds, laneid, did, cid, mdate, stime, etime, interval, way);
    google.charts.setOnLoadCallback(drawChartTmodel_Save);
    function drawChartTmodel_Save()
    {
        saveFlag = false;
        $("#process_data_item_view").empty();
        var datag = new google.visualization.DataTable();
        datag.addColumn('string', '时间');
        var d1 = result.data;
        for (var m = 0; m < d1.length; m++)
        {
            datag.addColumn('number', d1[m].name);
        }
        var rowInfo = [];
        var time_names = result.time_line;
        if (time_names !== null)
        {
            var number = time_names.length;
            for (var k = 0; k < number; k++)
            {
                var item = [];
                var ts = time_names[k];
                item.push(ts);
                for (var m = 0; m < d1.length; m++)
                {
                    var times = d1[m].times;
                    item.push(times[k]);
                }
                rowInfo.push(item);
            }
            datag.addRows(rowInfo);

            var options = {
                title: tmodel_title,
                width: 1200,
                height: 420,
                hAxis: {
                    title: '时间'
                },
                chartArea: {left: 100, width: '70%'}
            };


            var mychart;
            if (format === 1)
            {
                mychart = new google.visualization.LineChart(document.getElementById('process_data_item_view'));
                google.visualization.events.addListener(mychart, 'ready', function () {
                    var img = mychart.getImageURI();
                    //$("#process_data_item_view").hide();
                    image_obs.push(img);
                    imageIndex = imageIndex + 1;
                    if (imageIndex < total_Images)
                    {
                        savePDFData(imageIndexs[imageIndex]);
                    }
                    else
                    {
                        getDataPDF();
                    }
                });
                mychart.draw(datag, options);
                //$("#process_data_item_view").show();
            }
            else if (format === 2)
            {
                mychart = new google.visualization.ColumnChart(document.getElementById('process_data_item_view'));
                google.visualization.events.addListener(mychart, 'ready', function () {
                    var img = mychart.getImageURI();
                    image_obs.push(img);
                    imageIndex = imageIndex + 1;
                    if (imageIndex < total_Images)
                    {
                        savePDFData(imageIndexs[imageIndex]);
                    }
                    else
                    {
                        getDataPDF();
                    }
                    //$("#process_data_item_view").hide();
                });
                mychart.draw(datag, options);
            }

            else if (format === 3)
            {
                mychart = new google.visualization.Table(document.getElementById('process_data_item_view'));
                google.visualization.events.addListener(mychart, 'ready', function () {
                    var img = null;
                    try
                    {
                        $("#process_data_item_view").show();
                        $("#process_data_item_view").css('opacity', '0');
                        html2canvas($(".google-visualization-table"), {
                            onrendered: function (canvas) {
                                // canvas is the final rendered <canvas> element
                                img = canvas.toDataURL("image/png");
                                //window.open(myImage);
                                $("#process_data_item_view").hide();
                                image_obs.push(img);
                                imageIndex = imageIndex + 1;
                                if (imageIndex < total_Images)
                                {
                                    savePDFData(imageIndexs[imageIndex]);
                                }
                                else
                                {
                                    getDataPDF();
                                }
                            }
                        });
                    } catch (err) {
                    }

                    //
                });
                mychart.draw(datag, {width: '100%', height: '100%'});


            }

            //

        }
        else
        {
            alert("该信息在任务不存在");
        }
        // $("#unpass_data_info_img").show();
    }

}


function getDataPDF() {
    //var doc = new jsPDF('p', 'pt', 'a4', false); /* Creates a new Document*/
    var doc = new jsPDF("l", "mm", "a4");
    //var imageTags = $('#process_data_item_imgs img');
    for (var i = 0; i < image_obs.length; i++) {

        /* Adds a new page*/
        //doc.addImage(image_obs[i], 'png', 40, yAxis, 500, 280);
        if (i !== 0)
        {
            doc.addPage();
        }
        doc.addImage(image_obs[i], 'JPEG', 10, 10, 270, 180);

    }
    doc.save(tmodel_name_title + '.pdf');
}

function getImgData(chartContainer) {
    var chartArea = chartContainer.getElementsByTagName('svg')[0].parentNode;
    var svg = chartArea.innerHTML;
    var doc = chartContainer.ownerDocument;
    var canvas = doc.createElement('canvas');
    canvas.setAttribute('width', chartArea.offsetWidth);
    canvas.setAttribute('height', chartArea.offsetHeight);


    canvas.setAttribute(
            'style',
            'position: absolute; ' +
            'top: ' + (-chartArea.offsetHeight * 2) + 'px;' +
            'left: ' + (-chartArea.offsetWidth * 2) + 'px;');
    doc.body.appendChild(canvas);
    canvg(canvas, svg);
    var imgData = canvas.toDataURL("image/png");
    canvas.parentNode.removeChild(canvas);
    return imgData;
}

function convertCanvasToImage(canvas) {
    var image = new Image();
    image.src = canvas.toDataURL("image/png");
    return image;
}

function getResultFormatData(data, laneid, did, cid, mdate, stime, etime, interval, way)
{
    var result = [];//{name:name,times:times}
    if (laneid === 0)
    {
        if (did === 0)
        {
            if (cid === 0)
            {
                if (way === 1)
                {
                    tmodel_title = "所有车道的所有流向的所有车型的累计流量" + "每" + interval / 60 + "分钟";
                }
                else
                {
                    tmodel_title = "所有车道的所有流向的所有车型的分时流量" + "每" + interval / 60 + "分钟";
                }

                for (var i = 0; i < data.length; i++)
                {
                    if (mdate === data[i].sdate && stime === data[i].stime && etime === data[i].etime)
                    {
                        var item = {"name": (data[i].lane_name + data[i].degree_name + data[i].direction_name + data[i].c_name), "times": data[i].times};
                        result.push(item);
                    }

                }
            }
            else
            {
                if (way === 1)
                {
                    tmodel_title = "所有车道的所有流向的" + data[0].c_name + "的累计流量" + "每" + interval / 60 + "分钟";
                }
                else
                {
                    tmodel_title = "所有车道的所有流向的" + data[0].c_name + "的分时流量" + "每" + interval / 60 + "分钟";
                }
                for (var i = 0; i < data.length; i++)
                {
                    if (mdate === data[i].sdate && stime === data[i].stime && etime === data[i].etime && cid === data[i].cid)
                    {
                        var item = {"name": (data[i].lane_name + data[i].degree_name + data[i].direction_name), "times": data[i].times};
                        result.push(item);
                    }

                }
            }
        }
        else
        {
            if (cid === 0)
            {
                if (way === 1)
                {
                    tmodel_title = "所有车道的" + data[0].direction_name + "的所有车型的累计流量" + "每" + interval / 60 + "分钟";
                }
                else
                {
                    tmodel_title = "所有车道的" + data[0].direction_name + "的所有车型的分时流量" + "每" + interval / 60 + "分钟";
                }
                for (var i = 0; i < data.length; i++)
                {
                    if (mdate === data[i].sdate && stime === data[i].stime && etime === data[i].etime && did === data[i].direction_type)
                    {
                        var item = {"name": (data[i].lane_name + data[i].degree_name + data[i].c_name), "times": data[i].times};
                        result.push(item);
                    }
                }
            }
            else
            {
                if (way === 1)
                {
                    tmodel_title = "所有车道的" + data[0].direction_name + "的" + data[0].c_name + "的累计流量" + "每" + interval / 60 + "分钟";
                }
                else
                {
                    tmodel_title = "所有车道的" + data[0].direction_name + "的" + data[0].c_name + "的分时流量" + "每" + interval / 60 + "分钟";
                }
                for (var i = 0; i < data.length; i++)
                {
                    if (mdate === data[i].sdate && stime === data[i].stime && etime === data[i].etime && did === data[i].direction_type && cid === data[i].cid)
                    {
                        var item = {"name": (data[i].lane_name + data[i].degree_name), "times": data[i].times};
                        result.push(item);
                    }
                }
            }
        }
    }
    else
    {
        if (did === 0)
        {
            if (cid === 0)
            {
                if (way === 1)
                {
                    tmodel_title = data[i].lane_name + data[i].degree_name + "的所有流向的所有车型的累计流量" + "每" + interval / 60 + "分钟";
                }
                else
                {
                    tmodel_title = data[i].lane_name + data[i].degree_name + "的所有流向的所有车型的分时流量" + "每" + interval / 60 + "分钟";
                }
                for (var i = 0; i < data.length; i++)
                {
                    if (mdate === data[i].sdate && stime === data[i].stime && etime === data[i].etime && laneid === data[i].laneid)
                    {
                        var item = {"name": (data[i].direction_name + data[i].c_name), "times": data[i].times};
                        result.push(item);
                    }
                }
            }
            else
            {
                if (way === 1)
                {
                    tmodel_title = data[i].lane_name + data[i].degree_name + "的所有流向的" + data[0].c_name + "的累计流量" + "每" + interval / 60 + "分钟";
                }
                else
                {
                    tmodel_title = data[i].lane_name + data[i].degree_name + "的所有流向的" + data[0].c_name + "的分时流量" + "每" + interval / 60 + "分钟";
                }
                for (var i = 0; i < data.length; i++)
                {
                    if (mdate === data[i].sdate && stime === data[i].stime && etime === data[i].etime && laneid === data[i].laneid && cid === data[i].cid)
                    {
                        var item = {"name": (data[i].direction_name), "times": data[i].times};
                        result.push(item);
                    }
                }
            }
        }
        else
        {
            if (cid === 0)
            {
                if (way === 1)
                {
                    tmodel_title = data[i].lane_name + data[i].degree_name + "的" + data[0].direction_name + "的所有车型的累计流量" + "每" + interval / 60 + "分钟";
                }
                else
                {
                    tmodel_title = data[i].lane_name + data[i].degree_name + "的" + data[0].direction_name + "的所有车型的分时流量" + "每" + interval / 60 + "分钟";
                }
                for (var i = 0; i < data.length; i++)
                {
                    if (mdate === data[i].sdate && stime === data[i].stime && etime === data[i].etime && laneid === data[i].laneid && did === data[i].direction_type)
                    {
                        var item = {"name": (data[i].c_name), "times": data[i].times};
                        result.push(item);
                    }
                }
            }
            else
            {
                if (way === 1)
                {
                    tmodel_title = data[i].lane_name + data[i].degree_name + "的" + data[0].direction_name + "的" + data[0].c_name + "的累计流量" + "每" + interval / 60 + "分钟";
                }
                else
                {
                    tmodel_title = data[i].lane_name + data[i].degree_name + "的" + data[0].direction_name + "的" + data[0].c_name + "的分时流量" + "每" + interval / 60 + "分钟";
                }
                for (var i = 0; i < data.length; i++)
                {
                    if (mdate === data[i].sdate && stime === data[i].stime && etime === data[i].etime && laneid === data[i].laneid && did === data[i].direction_type && cid === data[i].cid)
                    {
                        var item = {"name": (data[i].c_name), "times": data[i].times};
                        result.push(item);
                    }
                }
            }
        }
    }
    return getResultTimesByInterval(interval, way, stime, etime, result);
}

function getResultFormatDataByTask(data, tid, did, cid, stime, etime, interval, way)
{
    var result = [];//{name:name,times:times}
    if (did === 0)
    {
        if (cid === 0)
        {
            for (var i = 0; i < data.length; i++)
            {
                if (tid === data[i].taskid)
                {
                    var item = {"name": (data[i].lane_name + data[i].degree_name + data[i].direction_name + data[i].c_name), "times": data[i].times};
                    result.push(item);
                }

            }
        }
        else
        {
            for (var i = 0; i < data.length; i++)
            {
                if (tid === data[i].taskid && cid === data[i].cid)
                {
                    var item = {"name": (data[i].lane_name + data[i].degree_name + data[i].direction_name), "times": data[i].times};
                    result.push(item);
                }

            }
        }
    }
    else
    {
        if (cid === 0)
        {
            for (var i = 0; i < data.length; i++)
            {
                if (tid === data[i].taskid && did === data[i].direction_type)
                {
                    var item = {"name": (data[i].lane_name + data[i].degree_name + data[i].c_name), "times": data[i].times};
                    result.push(item);
                }
            }
        }
        else
        {
            for (var i = 0; i < data.length; i++)
            {
                if (tid === data[i].taskid && did === data[i].direction_type && cid === data[i].cid)
                {
                    var item = {"name": (data[i].lane_name + data[i].degree_name), "times": data[i].times};
                    result.push(item);
                }
            }
        }
    }
    return getResultTimesByInterval(interval, way, stime, etime, result);
}

function getResultTimesByInterval(interval, way, stime, etime, result)
{
    var out = {"time_line": null, "data": []};
    for (var i = 0; i < result.length; i++)
    {
        var timer = [];
        var nums = [];
        if (way === 1)//leiji
        {
            var times = result[i].times;
            times = times.split("_");
            var number = 0;
            timer.push(stime);
            nums.push(number);
            var ptime;
            var t1 = getNewTimeResult(stime, interval);
            var index = 0;
            while (t1 <= etime)
            {
                timer.push(t1);
                for (var j = index; j < times.length; j++)
                {
                    var inter = parseInt(times[j]);
                    var t3 = getNewTimeResult(stime, inter);
                    if (t3 <= t1)
                    {
                        number++;
                        index++;
                    }
                    else
                    {
                        index = i + 1;
                        break;
                    }
                }
                nums.push(number);
                ptime = t1;
                t1 = getNewTimeResult(t1, interval);
            }
            if (t1 > etime && ptime < etime)
            {
                timer.push(etime);
                for (var j = index; j < times.length; j++)
                {
                    var inter = parseInt(times[j]);
                    var t3 = getNewTimeResult(stime, inter);
                    if (t3 <= etime)
                    {
                        number++;
                    }
                }
                nums.push(number);
            }
        }
        else
        {
            var times = result[i].times;
            times = times.split("_");
            var number = 0;
            timer.push(stime);
            nums.push(number);
            var t1 = getNewTimeResult(stime, interval);
            var t0 = stime;
            while (t1 <= etime)
            {
                timer.push(t1);
                number = 0;
                for (var j = 0; j < times.length; j++)
                {
                    var inter = parseInt(times[j]);
                    var t3 = getNewTimeResult(stime, inter);
                    if (t3 <= t1 && t3 >= t0)
                    {
                        number++;
                    }
                }
                nums.push(number);
                t0 = t1;
                t1 = getNewTimeResult(t1, interval);
            }
            if (t1 > etime)
            {
                timer.push(etime);
                number = 0;
                for (var j = 0; j < times.length; j++)
                {
                    var inter = parseInt(times[j]);
                    var t3 = getNewTimeResult(stime, inter);
                    if (t3 <= etime && t3 >= t0)
                    {
                        number++;
                    }
                }
                nums.push(number);
            }
        }

        if (out.time_line === null)
        {
            out.time_line = timer;
        }
        var item = {"name": result[i].name, "times": nums};
        out.data.push(item);
    }
    return out;
}

function getTimeLineDiff(stime, etime)
{
    stime = stime.split(":");
    etime = etime.split(":");
    var h1 = parseInt(stime[0]);
    var m1 = parseInt(stime[1]);
    var h2 = parseInt(etime[0]);
    var m2 = parseInt(etime[1]);
    var out = 0;
    out += (h2 - h1) * 3600;
    out += (m2 - m1) * 60;
    return out;
}

function getNewTimeResult(stime, interval)
{
    stime = stime.split(":");
    var dtime = interval / 60;
    var h1 = parseInt(stime[0]);
    var m1 = parseInt(stime[1]);
    var out = "";
    m1 += dtime;
    if (m1 < 60)
    {
        if (m1 < 10)
        {
            out += stime[0] + ":" + "0" + m1;
        }
        else
        {
            out += stime[0] + ":" + m1;
        }
    }
    else
    {
        h1 += m1 / 60;
        m1 = m1 % 60;
        if (h1 < 10)
        {
            out += "0" + h1 + ":";
        }
        else
        {
            out += h1 + ":";
        }
        if (m1 < 10)
        {
            out += "0" + m1;
        }
        else
        {
            out += m1;
        }
    }

    return out;
}



var tablesToExcel = (function () {
    var uri = 'data:application/vnd.ms-excel;base64,'
            , tmplWorkbookXML = '<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">'
            + '<DocumentProperties xmlns="urn:schemas-microsoft-com:office:office"><Author>Axel Richter</Author><Created>{created}</Created></DocumentProperties>'
            + '<Styles>'
            + '<Style ss:ID="Currency"><NumberFormat ss:Format="Currency"></NumberFormat></Style>'
            + '<Style ss:ID="Date"><NumberFormat ss:Format="Medium Date"></NumberFormat></Style>'
            + '</Styles>'
            + '{worksheets}</Workbook>'
            , tmplWorksheetXML = '<Worksheet ss:Name="{nameWS}"><Table>{rows}</Table></Worksheet>'
            , tmplCellXML = '<Cell{attributeStyleID}{attributeFormula}><Data ss:Type="{nameType}">{data}</Data></Cell>'
            , base64 = function (s) {
                return window.btoa(unescape(encodeURIComponent(s)))
            }
    , format = function (s, c) {
        return s.replace(/{(\w+)}/g, function (m, p) {
            return c[p];
        })
    }
    return function (tables, wsnames, wbname, appname) {
        var ctx = "";
        var workbookXML = "";
        var worksheetsXML = "";
        var rowsXML = "";

        for (var i = 0; i < tables.length; i++) {
            if (!tables[i].nodeType)
                tables[i] = document.getElementById(tables[i]);
            for (var j = 0; j < tables[i].rows.length; j++) {
                rowsXML += '<Row>'
                for (var k = 0; k < tables[i].rows[j].cells.length; k++) {
                    var dataType = tables[i].rows[j].cells[k].getAttribute("data-type");
                    var dataStyle = tables[i].rows[j].cells[k].getAttribute("data-style");
                    var dataValue = tables[i].rows[j].cells[k].getAttribute("data-value");
                    dataValue = (dataValue) ? dataValue : tables[i].rows[j].cells[k].innerHTML;
                    var dataFormula = tables[i].rows[j].cells[k].getAttribute("data-formula");
                    dataFormula = (dataFormula) ? dataFormula : (appname == 'Calc' && dataType == 'DateTime') ? dataValue : null;
                    ctx = {attributeStyleID: (dataStyle == 'Currency' || dataStyle == 'Date') ? ' ss:StyleID="' + dataStyle + '"' : ''
                        , nameType: (dataType == 'Number' || dataType == 'DateTime' || dataType == 'Boolean' || dataType == 'Error') ? dataType : 'String'
                        , data: (dataFormula) ? '' : dataValue
                        , attributeFormula: (dataFormula) ? ' ss:Formula="' + dataFormula + '"' : ''
                    };
                    rowsXML += format(tmplCellXML, ctx);
                }
                rowsXML += '</Row>'
            }
            ctx = {rows: rowsXML, nameWS: wsnames[i] || 'Sheet' + i};
            worksheetsXML += format(tmplWorksheetXML, ctx);
            rowsXML = "";
        }

        ctx = {created: (new Date()).getTime(), worksheets: worksheetsXML};
        workbookXML = format(tmplWorkbookXML, ctx);

        console.log(workbookXML);

        var link = document.createElement("A");
        link.href = uri + base64(workbookXML);
        link.download = wbname || 'Workbook.xls';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
})();

var title_item_Names = [];
function savePassDataEXE()
{
    var ids = [];
    var number = 0;
    title_item_Names = [];
    $("#process_data_item_tables").empty();
    $("#process_data_item_tables").css("opacity", "0");
    $("#process_data_item_tables").show();
    $(".show_item_select").each(function () {
        if ($(this).is(':checked'))
        {
            number++;
            var index = $(this).attr("index");
            index = parseInt(index);
            var id = "save_table_id_" + index;
            ids.push(id);
            savePDFDataTable(index);
        }
    });

    tablesToExcel(ids, title_item_Names, tmodel_name_title + '.xls', 'Excel');
    //$("#process_data_item_tables").empty();
    $("#process_data_item_tables").hide();
}

function savePDFDataTable(index)
{
    var ds = tempShowData[index];
    var sds = ds.data;
    var interval = ds.interval;
    interval = parseInt(interval);
    var mdate = ds.mdate;
    var stime = ds.stime;
    var etime = ds.etime;
    var laneid = ds.laneid;
    laneid = parseInt(laneid);
    var did = ds.did;
    did = parseInt(did);
    var cid = ds.cid;
    cid = parseInt(cid);
    var way = ds.way;
    way = parseInt(way);
    var format = ds.format;
    format = parseInt(format);
    tmodel_title = ds.title;
    title_item_Names.push(ds.title);
    saveResult_Data_Graphic_Table(sds, interval, way, laneid, did, cid, mdate, stime, etime, index);
}

function saveResult_Data_Graphic_Table(sds, interval, way, laneid, did, cid, mdate, stime, etime, index)
{
    var result = getResultFormatData(sds, laneid, did, cid, mdate, stime, etime, interval, way);
    var content;
    var d1 = result.data;
    var time_names = result.time_line;
    if (time_names !== null)
    {
        var table = document.createElement("table");
        table.setAttribute("id", "save_table_id_" + index);
        var content = '<tr><td>时间</td>';
        var d1 = result.data;
        for (var m = 0; m < d1.length; m++)
        {
            content += '<td>' + d1[m].name + '</td>';
        }
        content += '</tr>';
        var number = time_names.length;
        for (var k = 0; k < number; k++)
        {

            var ts = time_names[k];
            content += '<tr><td>' + ts + '</td>';
            for (var m = 0; m < d1.length; m++)
            {
                var times = d1[m].times;
                content += '<td>' + times[k] + '</td>';
            }
            content += '</tr>';
        }
        table.innerHTML = content;
        var parent = document.getElementById("process_data_item_tables");
        parent.appendChild(table);
    }

}

function showNoticeSection(option)
{
    option = parseInt(option);
    if (option === 1)
    {
        $("#notice_Section").css("height", "300px");
        $('#r-news').fadeIn(100);
        $('#notice_nav').attr("flag", "1");
        loadNoticeInfo();
    }
    else
    {
        $('#r-news').fadeOut(100);
        $('#notice_nav').attr("flag", "2");
        $("#notice_Section").css("height", "35px");
    }
}