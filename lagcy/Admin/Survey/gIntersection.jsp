<%-- 
    Document   : gIntersection
    Created on : Apr 13, 2016, 7:38:31 PM
    Author     : zhichengfu
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link href="./css/jquery-ui.css" type="text/css" rel="stylesheet">
        <link href="./css/bootstrap.min.css" type="text/css" rel="stylesheet">
        <link href="./css/font-awesome.min.css" type="text/css" rel="stylesheet">
        <link href="./css/test.css" type="text/css" rel="stylesheet">
        <link href="./css/mine.css" type="text/css" rel="stylesheet">
        <script type="text/javascript" src="./js/jquery-2.0.3.min.js"></script>
        <script type="text/javascript" src="./js/jquery-ui.min.js"></script>
        <script type="text/javascript" src="./js/bootstrap.min.js"></script>
        <script type="text/javascript" src="./js/jquery.sortable5.min.js"></script>
        <script type="text/javascript" src="./js/fabric.js"></script>
        <script src="./js/wheelzoom.js"></script>      
        <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=21MEGr0gZhVgqGF8VDlX2kjQ"></script>
        <script type="text/javascript" src="./js/mine.js"></script>
        <title></title>

        <style>
            #blue {            
                width: 200px;
                border:1px solid gray;
            }          
            #blue .ui-slider-range { background:red; }
            #blue .ui-slider-handle { border-color: #729fcf; }
        </style>
        <%
            String lat=request.getParameter("lat");
            String lng=request.getParameter("lng");
            String type=request.getParameter("type");
            
        %>
        
    </head>
    <body style="padding: 0px;">
        <div class="demo lock nav_body nav_layout">
            <div class="left_nav nav_nav" style="width:500px;height:320px;">
                <!--                <input type="text" id="line_1" style="position:absolute;width:150px;">-->
                <div style="margin-top:3px;margin-bottom:5px;z-index:3000;position: relative;">
                    交叉口名称: <input type="text" id="in_name" style="position: relative;height:20px;"></div>
                <div style="position: relative;top:-25px;">
                    <div style="position: relative;z-index: 1000;left:3px;top:35px;">路口名称: <input type="text" id="line_name" style="position: relative;width:200px; height:20px;">
                        &nbsp;&nbsp;&nbsp;&nbsp;<button type="button" class="btn btn-warning" style="height:20px;"id="line_cancel" onclick="deleteLane()" ><label style="position:relative;top:-6px;">删除路口</label></button></div>
                        
                    <div id="l-map" style="width:450px;height:280px;">
                        
                    </div>
                    <script>
                        initTBMap('<%=lng%>','<%=lat%>');
                    </script>
                    <canvas id="inter_template" style="width:450px;height:300px;"></canvas>
                </div>
            </div>
            <div class="sideBySide nav_nav nav_side">
                <div class="tool_bar">
                    <ul class="nav nav-pills sourcejQ" style="width:450px;">
                        <li type="0" class="r_li" style="margin-left: 20px;"><img src="./roadSym/d_z_tb.jpg" class="r_tb" alt="进直行车道"></li>
                        <li type="7" class="r_li"><img src="./roadSym/z_tb.jpg" class="r_tb" alt="出直行车道"></li>
                        <li type="1" class="r_li"><img src="./roadSym/t_tb.jpg" class="r_tb" alt="调头行车道"></li>
                        <li type="2" class="r_li"><img src="./roadSym/l_t_tb.jpg" class="r_tb" alt="左转掉头行车道"></li>
                        <li type="4" class="r_li"><img src="./roadSym/l_tb.jpg" class="r_tb" alt="左转行车道"></li>
                        <li type="5" class="r_li"><img src="./roadSym/z_l_tb.jpg" class="r_tb" alt="左转直行车道"></li>
                        <li type="6" class="r_li"><img src="./roadSym/z_l_r_tb.jpg" class="r_tb" alt="左右直行车道"></li>                       
                        <li type="8" class="r_li" style="margin-left: 20px;"><img src="./roadSym/z_r_tb.jpg" class="r_tb" alt="右转直行车道"></li>
                        <li type="9" class="r_li"><img src="./roadSym/r_tb.jpg" class="r_tb" alt="右转行车道"></li>
                        <li type="13" class="r_li"><img src="./roadSym/bus_left_tb.jpg" class="r_tb" alt="公交行左转车道"></li>
                        <li type="16" class="r_li"><img src="./roadSym/bus_up_tb.jpg" class="r_tb" alt="公交行直行车道"></li>
                        <li type="19" class="r_li"><img src="./roadSym/bike_tb.jpg" class="r_tb" alt="自行车车道"></li>
                        <li type="20" class="r_li"><img src="./roadSym/yellowLine_tb.png" class="r_tb" alt="双黄线"></li>
                    </ul>
                </div>
                <div class="intersection" thets="0_90_180_270" name="" laneNumber="4" id="intersection" currentLaneID="0" currentLaneDegree="" laneInfo="">
                    <p>路口道路平面图:</p>
                    <ol id="outresult" class="nav nav-pills targetjQ ui-sortable outview" data="0">
                    </ol>
                    <button type="button" class="btn btn-success" id="line_create" onclick="generateIntersection_S()">查看交叉口示意图</button>
                    <button type="button" class="btn btn-success" id="line_create" onclick="generateIntersection()">保存交叉口示意图</button>
                    <button type="button" class="btn btn-success" id="line_create" onclick="goToTask()">开始分配任务</button>
                </div>
            </div>
        </div>
        <div class="img_show nav_layout">
            <img src="" alt="交叉口示意图" id="img_result" class="img_out zoom">  
        </div>
    </body>


    <script type="text/javascript">
        loadDraggable();
    </script>

    <script>
        var canvas = this.__canvas = new fabric.Canvas('inter_template');
        canvas.setHeight(280);
        canvas.setWidth(450);
        fabric.Object.prototype.transparentCorners = false;
        var createLine = false;
        var rotateLine = false;
        var preLines = null;
        var preCLine = null;
        var xcenter = 225;
        var ycenter = 142;
        var long = 100;
        var angle = 10;
        var disR = 20;
        var preX, preY;
        var degreeChange = false;
        var changeDegree = -10;
        var preName = null;
        var preID = null;
        var isMouseMove = false;
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
        var currentLine = null;
        canvas.hoverCursor = 'pointer';
        var intersection = document.getElementById("intersection");
        var number = parseInt(intersection.getAttribute("laneNumber"));
        var thets = (intersection.getAttribute("thets")).split("_");
        for (var i = 1; i <= number; i++)
        {
            var thet = 360 - parseInt(thets[i - 1]);
            var points = [xcenter, ycenter, xcenter + long * Math.cos(Math.PI * thet / 180.0), ycenter + long * Math.sin(Math.PI * thet / 180.0)];

            var lane = new fabric.Line(points, {
                strokeWidth: 15,
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
            lane.Name = "";
            lane.isInited = false;
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
            //console.log(options.e.clientX, options.e.clientY);
            if (rotateLine)
            {
                rotateLine = false;
            }
            if (createLine)
            {
                createLine = false;
                if (isMouseMove)
                {
                    var angle = 360 - diff(options.e.layerX, options.e.layerY);
                    addLane(angle, long);
                    isMouseMove = false;
                }
            }
            //canvas.discardActiveGroup();

        });
        canvas.on('mouse:move', function (options) {
            if (rotateLine)
            {
                var angle = 360 - diff(options.e.layerX, options.e.layerY);
                console.log(angle);
                updateAngle(angle);
            }
            if (createLine)
            {
                isMouseMove = true;
                var angle = 360 - diff(options.e.layerX, options.e.layerY);
                var dis = dist(options.e.layerX, options.e.layerY);
                addLane(angle, dis);
            }
        });

        canvas.on({'object:selected': onChange});

        function updateLaneInfo_0(id, name, degree)
        {
            var ids = "info" + id;
            var value = id + "_" + name + "_" + degree;
            $("#intersection").attr(ids, value);
        }

        function diff(x, y) {
            var dx = x - (xcenter);
            var dy = y - (ycenter);
            return Math.atan2(dy, dx) * (180 / Math.PI);
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
                if (obj === options.target)
                {
                    // $('#blue').slider({disabled: false});
                    if (obj.idName === 0)
                    {
                        createLine = true;
                        preCLine = null;
                    }
                    else if (obj.idName > 0)
                    {
                        if (preName !== null)
                        {
                            preName = document.getElementById("line_name").value;
                        }
                        if (preName === null || preName !== "")
                        {
                            if (currentLine !== null)
                            {
                                currentLine.Name = document.getElementById("line_name").value;
                                var name = currentLine.Name;
                                var id = currentLine.idName;
                                var degree = currentLine.degree;
                                updateLaneInfo_0(id, name, degree);
                                currentLine.setStroke("gray");
                            }
                            rotateLine = true;
                            isDeleteLine = true;
                            //console.log("test2");
                            var id = obj.idName;
                            var degree = obj.degree;
                            var name = obj.Name;
                            preName = name;
                            document.getElementById("line_name").value = preName;
                            currentLine = obj;
                            obj.setStroke("red");
//                    var angle_show = document.getElementById("out_angle");
//                    angle_show.value = "" + degree;
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
                        else
                        {
                            alert("请先输入所选路口名称！");
                        }

                    }

                }
                else
                {
                    if (obj === currentLine && preName === "")
                    {

                    }
                    else
                    {
                        obj.setStroke("gray");
                    }
                }


            });
        }


//        $("#blue").slider({
//            orientation: "horizontal",
//            range: "min",
//            max: 360,
//            value: 127,
//            slide: refreshSwatch,
//            disabled: true
//        });
//        $("#blue").slider("value", 60);
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
                    strokeWidth: 15,
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
                lane.Name = name;
                //positionBtn(lane);
                $("#intersection").attr("currentLaneDegree", degree);
                updateLaneInfo_0(id, name, degree);
                canvas.remove(currentLine);
                currentLine = lane;
                canvas.add(lane);
                circle.bringToFront();
            }
        }

        function generateIntersection_S()
        {
            var name = currentLine.Name;
            var id = currentLine.idName;
            var degree = currentLine.degree;
            var iname=document.getElementById("line_name").value;
            if(iname==="")
            {
                alert("请输入所选路口名称");
            }
            else
            {
                if(name===undefined||name==="")
                {
                    currentLine.Name=iname;
                    name=iname;                   
                }
                updateLaneInfo_0(id, name, degree);
                generateIntersection();
            }
            
            

        }

        function refreshSwatch() {
            var blue = $("#blue").slider("value");

            var angle_show = document.getElementById("out_angle");
            angle_show.value = "" + blue;
            updateAngle(blue);
        }

        function deleteLane()
        {
            var id = currentLine.idName;

            var ids = "info" + id;
            $("#intersection").attr(ids, "");
            ids = "lane" + id;
            $("#intersection").attr(ids, "");
            canvas.remove(currentLine);
            var number = $("#intersection").attr("laneNumber");
            number = parseInt(number) - 1;
            $("#intersection").attr("laneNumber", number);
        }
        function addLane(degree, dis, name)
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
                strokeWidth: 15,
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
            lane.Name = name;
            //positionBtn(lane);
            if (preCLine === null)
            {
                preCLine = lane;
            }
            else
            {
                canvas.remove(preCLine);
            }
            $("#intersection").attr("currentLaneID", id);
            $("#intersection").attr("currentLaneDegree", degree);
            updateLaneInfo_0(id, name, degree);
            var number = $("#intersection").attr("laneNumber");
            number = parseInt(number) + 1;
            $("#intersection").attr("laneNumber", number);
            currentLine = lane;
            preCLine = lane;
            canvas.add(lane);
            circle.bringToFront();
        }
    </script>
</html>

