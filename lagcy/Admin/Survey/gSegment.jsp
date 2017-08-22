<%-- 
    Document   : gSegment
    Created on : May 31, 2016, 8:11:30 PM
    Author     : zhichengfu
--%>

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
                    <p>路段平面图:</p>
                    <ol id="outresult" class="nav nav-pills targetjQ ui-sortable outview" data="0">
                    </ol>
                    <button type="button" class="btn btn-success" id="line_create" onclick="generateIntersection_S()">查看路段示意图</button>
                    <button type="button" class="btn btn-success" id="line_create" onclick="generateIntersection()">保存路段示意图</button>
                    <button type="button" class="btn btn-success" id="line_create" onclick="goToTask()">开始分配任务</button>
                </div>
            </div>
        </div>
        <div class="img_show nav_layout">
            <img src="" alt="交叉口示意图" id="img_result" class="img_out zoom">  
        </div>
    </body>
</html>

