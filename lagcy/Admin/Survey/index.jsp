<%-- 
    Document   : index
    Created on : May 24, 2016, 10:36:02 PM
    Author     : zhichengfu
--%>

<%@page import="FileM.Project"%>
<%@page import="FileM.User"%>
<%@page import="Survey.Survey_User"%>
<%@page import="Survey.Task_Item"%>
<%@page import="com.google.gson.Gson"%>
<%@page import="java.util.LinkedList"%>
<%@page import="Survey.Task_Model"%>
<%@page import="Survey.Survey_Project"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link href="./css/jquery-ui.css" type="text/css" rel="stylesheet">
        <link href="./css/bootstrap.min.css" type="text/css" rel="stylesheet">

        <link href="./css/font-awesome.min.css" type="text/css" rel="stylesheet">
        
        <link href="./css/test.css" type="text/css" rel="stylesheet">

        <link rel="stylesheet" href="./css/calendar.css">
        <link rel="stylesheet" href="./css/calendar_full.css">
        <link rel="stylesheet" href="./css/calendar_compact.css">
        <link href="./css/dash.min.css" type="text/css" rel="stylesheet">
        <link rel="stylesheet" href="./js/laydate/need/laydate.css">
        <link rel="stylesheet" href="./js/laydate/skins/molv/laydate.css">
        <link href="./css/mine.css" type="text/css" rel="stylesheet">
       
        <script type="text/javascript" src="./js/jquery-2.0.3.min.js"></script>
        <script type="text/javascript" src="./js/jquery-ui.min.js"></script>
        <script type="text/javascript" src="./js/jquery.cityselect.js"></script>
        <script type="text/javascript" src="./js/bootstrap.min.js"></script>
        <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
        <script type="text/javascript" src="./js/jquery.sortable5.min.js"></script>
        <script type="text/javascript" src="./js/fabric.js"></script>
        <script type="text/javascript" src="./js/randomColor.js"></script>
        <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=21MEGr0gZhVgqGF8VDlX2kjQ"></script>
        <script type="text/javascript" src="./js/laydate/laydate.js"></script>
        <script type="text/javascript" src="./js/cn.js"></script>
        <script type="text/javascript" src="./js/calendar.js"></script>
         <script type="text/javascript" src="./js/rgbcolor.js"></script>
        <script type="text/javascript" src="./js/StackBlur.js"></script>
        <script type="text/javascript" src="./js/canvg.js"></script>
        <script type="text/javascript" src="./js/html2canvas.js"></script> 
        <script type="text/javascript" src="./js/jspdf.js"></script>
        <script type="text/javascript" src="./js/FileSaver.js"></script>
        <script type="text/javascript" src="./js/zlib.js"></script>
        <script type="text/javascript" src="./js/png.js"></script>
        <script type="text/javascript" src="./js/addimage.js"></script>
        <script type="text/javascript" src="./js/png_support.js"></script>
        <script type="text/javascript" src="./js/mine.js"></script>
        <script type="text/javascript" src="./js/mineMap.js"></script>
        <style>
            .navbar-default .navbar-nav>.open>a, .navbar-default .navbar-nav>.open>a:focus, .navbar-default .navbar-nav>.open>a:hover {
                color: #555;
                background-color:skyblue;
            }
            .ui-draggable-dragging
            {
                z-index: 2000;
            }

            .popover
            {
                z-index: 2000;
            }

            .itext {
                width: 300px;
                background:white;
                position: absolute;
                z-index: 2000;
            }
        </style>
        <%
            int pid = 0;
            int st_id = 0;
            int parentID = 0;
            int userid = 0;
            String name = "";
            String basicInfo = "";
            String task_models_info = "";
            Survey_Project sp = null;
            String path = "";
            Gson gson = new Gson();
            LinkedList<Task_Model> task_models = null;
            String thets = "0_90_180_270";
            String allTasks = "";
            LinkedList<Survey_User> susers = Survey_User.getAllSurveyUsers();
            int usize = 0;
            int utsize = 0;
            User user = null;
            String ppPath = "";
            String userInfo = "";
            if (susers != null && susers.size() > 0) {
                usize = susers.size();
                userInfo = gson.toJson(susers);
            }
            try {
                user = (User) session.getAttribute("user");
                pid = Integer.parseInt(request.getParameter("ppid"));
                name = request.getParameter("pname");
                ppPath = Project.getAbsPath(pid);
                parentID = Project.getParentIDByID(pid);
                sp = Survey_Project.getProjectByPIDAndName(pid, name);
                if (sp != null) {
                    st_id = sp.id;
                    parentID = sp.parentID;
                    path = sp.path;

                    basicInfo = gson.toJson(sp);
                    task_models = Task_Model.getSample_Task_ModelBySID(sp.id);
                    if (task_models != null && task_models.size() > 0) {
                        task_models_info = gson.toJson(task_models);
                    }

                }

            } catch (Exception e) {

            }
            if (user != null) {
                userid = user.id;
            }

        %>
    </head>
    <body id="project_body" userid='<%=userid%>' name="<%=name%>" pid="<%=pid%>" basicInfo='<%=basicInfo%>' task_models_info='<%=task_models_info%>' st_id='<%=st_id%>' ppath="<%=ppPath%>" parentID="<%=parentID%>" path="<%=path%>"  userInfo='<%=userInfo%>'>
        <nav class="navbar navbar-default nav_bar_mine">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>                        
                    </button>
                </div>
                <div class="collapse navbar-collapse" id="myNavbar" number="8">
                    <ul class="nav navbar-nav">
                        <li id="0_nav">
                            <%
                                if (name.equals("")) {%>
                            <a id="stask_name" class="dropdown-toggle" data-toggle="dropdown" href="javascript:void(0);" style="color:black" onclick="showNav_Option(0)">项目名称<span class="caret"></span></a>
                                <%} else {%>
                            <a id="stask_name" class="dropdown-toggle" data-toggle="dropdown" href="javascript:void(0);" style="color:black" onclick="showNav_Option(0)"><%=name%><span class="caret"></span></a>
                                <%}
                                %>
                            <ul class="dropdown-menu">
                                <li><a href="javascript:void(0);" onclick="createNewSTask();">新建任务</a></li>
                            </ul>
                        </li>       
                        <li id="1_nav"><a href="javascript:void(0)" class="nav_a_show" style="color:black;" onclick="showNav_Option(1)">基本信息</a></li>
                        <li id="2_nav"><a href="javascript:void(0)" class="nav_a_show" style="color:black;" onclick="showNav_Option(2)">调查内容</a></li>
                        <li id="3_nav"><a href="javascript:void(0)" class="nav_a_show" style="color:black;" onclick="showNav_Option(3)">人员分配</a></li>
                        <li id="4_nav"><a href="javascript:void(0)" class="nav_a_show" style="color:black;" onclick="showNav_Option(4)">汇总校核</a></li>
                        <li id="8_nav"><a href="javascript:void(0)" class="nav_a_show" style="color:black;" onclick="showNav_Option(8)">项目动态</a></li>
                        <li id="5_nav"><a href="javascript:void(0)" class="nav_a_show" style="color:black;" onclick="showNav_Option(5)">项目成果</a></li>
                        <li id="6_nav"><a href="javascript:void(0)" class="nav_a_show" style="color:black;" onclick="showNav_Option(6)">帮助与支持</a></li>
                        <li id="7_nav" style="margin-left:10px;">
                            <div id="r-result"><input type="text" id="suggestId" size="20" placeholder="搜索地图" style="width:250px;"/><i class="fa fa-search fa-2x map_search_button" aria-hidden="true" onclick="startSearch()"></i></div>
                            <div id="searchResultPanel" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"></div>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </nav>
        <div class="map_Section" id="l-map" sid="0"></div>
        <script type="text/javascript">
            initMap();
        </script>
        <div class="basicInfo_Section" style="display:none;" id="basic_info" flag="false">
            <div class="container" style='text-align: center'>          
                <table class="table table-condensed" style="border:none; text-align: center;">
                    <tbody>
                        <tr >
                            <td style="border:none">项目名称:</td>
                            <td style="border:none"><input type="text" name="pName" id="p_Name" value="<%=name%>"></td>
                        </tr>
                        <tr style="border:none"> 
                            <td style="border:none">项目描述:</td>
                            <td style="border:none"><textarea name="pName" id="p_Description"></textarea></td>
                        </tr>
                        <tr>
                            <td style="border:none">项目地点:</td>
                            <td style="border:none">
                                <div id="city2">
                                    <select name="province" id="province" class="prov" style="width:100px;">
                                    </select>
                                    <select name="city" id="city" class="city"  disabled="disabled" style="width:100px;">
                                    </select>
                                    <select name="area" id="town" class="dist"  disabled="disabled" style="width:100px;">
                                    </select>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td style="border:none">项目预算:</td>
                            <td style="border:none"><input type="text" name="pPrice" id="p_budget"></td>
                        </tr>
                        <tr>
                            <td style="border:none">项目节点:</td>
                            <td style="border:none"><input  name="ptime_s" id="pstime" class="laydate-icon"> 到 
                                <input class="laydate-icon" name="ptime_e" id="petime"></td>
                        </tr>
                        <tr>
                            <td style="border:none">项目存储位置:</td>
                            <td style="border:none"><input type="text" name="pName" id="p_path" value="<%=ppPath%>">&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" class="btn btn-success" onclick="showProjectListDiag('<%=pid%>');">浏览</button></td>
                        </tr>
                        <tr>
                            <td colspan="2" style="border:none"><button type="button" class="btn btn-success" onclick="save_basic_info()">确定</button>
                                <button type="button" class="btn btn-success" onclick="cancel_basic_info()">取消</button></td>
                        </tr>
                    </tbody>
                </table>
                <script>
                    $("#city2").citySelect({prov: "北京", nodata: "none"});
                </script>
            </div>
        </div>
        <div class="intersection_Section" id="intersection_section" flag="false" style="display:none;height:700px;">
            <div style="width:inherit;height: 40px;margin-top: 10px;">
                <div class="intersection_title intersection_title_active" style="margin-left: 25px;" id="inter_option_1" onclick="show_intersection_option(1)">
                    <span class="survey_a" >交叉口渠化</span>
                </div>
                <div class="intersection_title" id="inter_option_2" onclick="show_intersection_option(2);"> <span class="survey_a">流量调查任务</span></div>
                <div id="model_date" class="model_date">
                        <span style="font-size:18px;color:white;position: relative;top:3px;margin-left: 40px;">调查开始的日期:</span><input style="font-size:18px;color:black;" class="laydate-icon" name="t_model_date" id="t_model_date" >
                </div>
            </div>
            <div class="in_section_1" style="display:block;" id="intersection_quhua" flag="false">                
                <div class="demo lock nav_body nav_layout">
                    <div class="left_nav" style="width:500px;height:260px;">

                        <div id="tb-map" style="width:450px;height:260px;top:-35px;">

                        </div>

                        <div id="intersection_canvas" style="position: relative;">
                            <canvas id="inter_template" style="width:450px;height:260px;"></canvas>
                        </div>

                    </div>
                    
                    <div class="sideBySide nav_side">
                        <div class="tool_bar">
                            <div>
                                <span>社会车辆</span>
                            <ul class="nav nav-pills sourcejQ_inter" style="width:450px;margin-bottom: 5px;">
                                
                                
                                <li type="1" class="r_li"><img src="./roadSym/1.jpg" class="r_tb" alt="调头行车道"></li>
                                <li type="2" class="r_li"><img src="./roadSym/2.jpg" class="r_tb" alt="左转掉头行车道"></li>
                                <li type="4" class="r_li"><img src="./roadSym/4.jpg" class="r_tb" alt="左转行车道"></li>
                                <li type="7" class="r_li"><img src="./roadSym/7.jpg" class="r_tb" alt="出直行车道"></li>
                                <li type="9" class="r_li"><img src="./roadSym/9.jpg" class="r_tb" alt="右转行车道"></li>
                                <li type="5" class="r_li"><img src="./roadSym/5.jpg" class="r_tb" alt="左转直行车道"></li>
                                <li type="8" class="r_li"><img src="./roadSym/8.jpg" class="r_tb" alt="右转直行车道"></li>
                                <li type="6" class="r_li"><img src="./roadSym/5.jpg" class="r_tb" alt="左右直行车道"></li>                       
                                
                                
                            </ul>
                            </div>
                            <div>
                                <span>特殊车辆</span>
                                 <ul class="nav nav-pills sourcejQ_inter" style="width:450px;margin-bottom: 5px;">
                                     <li type="10" class="r_li"><img src="./roadSym/10.jpg" class="r_tb" alt="调头行车道"></li>
                                     <li type="11" class="r_li"><img src="./roadSym/11.jpg" class="r_tb" alt="左转掉头行车道"></li>
                                    <li type="13" class="r_li"><img src="./roadSym/13.jpg" class="r_tb" alt="左转行车道"></li>
                                    <li type="16" class="r_li"><img src="./roadSym/16.jpg" class="r_tb" alt="出直行车道"></li>
                                    <li type="18" class="r_li"><img src="./roadSym/18.jpg" class="r_tb" alt="右转行车道"></li>
                                    <li type="14" class="r_li"><img src="./roadSym/14.jpg" class="r_tb" alt="左转直行车道"></li>
                                    <li type="17" class="r_li"><img src="./roadSym/17.jpg" class="r_tb" alt="右转直行车道"></li>
                                    <li type="15" class="r_li"><img src="./roadSym/15.jpg" class="r_tb" alt="左右直行车道"></li> 
                                 </ul>
                            </div>
                            
                            <div>
                                <span>自行车</span>
                                 <ul class="nav nav-pills sourcejQ_inter" style="width:450px;margin-bottom: 5px;">
                                    <li type="21" class="r_li"><img src="./roadSym/21.jpg" class="r_tb" alt="左转行车道"></li>
                                    <li type="19" class="r_li"><img src="./roadSym/19.jpg" class="r_tb" alt="出直行车道"></li>
                                    <li type="24" class="r_li"><img src="./roadSym/24.jpg" class="r_tb" alt="右转行车道"></li>
                                    <li type="22" class="r_li"><img src="./roadSym/22.jpg" class="r_tb" alt="左转直行车道"></li>
                                    <li type="23" class="r_li"><img src="./roadSym/23.jpg" class="r_tb" alt="右转直行车道"></li>
                                    <li type="25" class="r_li"><img src="./roadSym/25.jpg" class="r_tb" alt="左右直行车道"></li> 
                                 </ul>
                            </div>
                            <div>
                                <span>进向车道及分道</span>
                                 <ul class="nav nav-pills sourcejQ_inter" style="width:450px;margin-bottom: 5px;">
                                      <li type="0" class="r_li"><img src="./roadSym/0.jpg" class="r_tb" alt="进直行车道"></li>
                                      <li type="27" class="r_li"><img src="./roadSym/27.jpg" class="r_tb" alt="公交车车道"></li>
                                      <li type="26" class="r_li"><img src="./roadSym/26.jpg" class="r_tb" alt="自行车"></li>
                                 </ul>
                            </div>
                        </div>
                        <div class="intersection" lat="" lng="" ids="0" thets="0_90_180_270" name="" laneNumber="4" id="intersection" currentLaneID="0" currentLaneDegree="" laneInfo="">
                            <p style="color:white;">路口道路平面图:</p>
                            <ol id="outresult" class="nav nav-pills targetjQ_inter ui-sortable outview" data="0" style="border:1px solid white;">
                            </ol>
                        </div>
                    </div>
                </div>
                <div class="img_show nav_layout">
                    <img src="" alt="交叉口示意图" id="img_result" class="img_out zoom">  
                </div>
                <img src="./mapIcon/intersection_tb.png" class="inter_img_button" onclick="generateIntersection_S()" style="width:40px;height:40px; position:absolute;top:52px;left:485px;"/>
                <script type="text/javascript">
                    loadDraggable();
                </script>
            </div>

            <div class="all_task" style="display: none;" id="intersection_task" flag="false">
                <div class="nav_task task_align">                       
                    <div class="list-group task_info" id="task_info" task_img="" imgPath="" intersection="" number="0" cindex="0"
                         current_img_s="0" current_slanes="" current_spoints="" slanes="">

                    </div>

                    <div class="task_create" style="text-align: center">
                        <button type="button" class="btn btn-success" id="task_create" onclick="createTask()">新建任务</button>
                    </div>
                </div>
                <div class="img_area1 task_align" id="image_show_area" style="width:600px;height:600px;border:1px solid gray">           
                    <img id="imag1" onclick="showCoords(event)" src="">
                </div>
                <div class="task_time" style="background-color: graytext; display:none;width:380px;height: 180px;border:2px solid gray;position: absolute;
                     top: 146px;left: 50px;" id="task_time"
                     data="" buttonFlag="0">
                    <table class="table table-condensed" style="border:none; text-align: center;width:100%;">
                        <tbody>
                            <tr>
                                <td style="border:none">起始时间:</td>
                                <td style="border:none; width:100px;" ><input style='width:100px; color:black;' name="bdaytime" id="stime" placeholder='小时:分钟'></td>

                                <td style="border:none;">结束时间:</td>
                                <td style="border:none;width:100px;"><input style='width:100px;color:black;' name="bdaytime" id="etime" placeholder='小时:分钟'></td>
                            </tr>
                            <tr>
                                <td style="border:none">采集方式</td>
                                <td style="border:none" colspan="2">
                                    <input type="radio" name="vehicle" value="1" name="视频" id="shipin">&nbsp;&nbsp;&nbsp;视频&nbsp;&nbsp;&nbsp;
                                    <input type="radio" name="vehicle" value="2" name="人工" id="rengong">&nbsp;&nbsp;&nbsp;人工<br>
                                </td>
                            </tr>
                            <tr>
                                <td style="border:none">采集车型</td>
                                <td style="border:none">
                                    <button type="button" class="btn btn-success" id="time_create" onclick="showCarType()">配置</button>
                                </td>
                            </tr>
                            <tr>
                                <td style="border:none; text-align: left" colspan="4">
                                    <button type="button" class="btn btn-success" id="task_create_intersection" onclick="taskinfoSave_V1()">保存任务</button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <button type="button" class="btn btn-success" id="time_create" onclick="cancelTask()">取消任务</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="task_time" style="background-color: graytext; display:none;width:300px;height: 290px;border:2px solid gray;position: absolute;
                     top: 380px;left: 30px;" id="task_peizhi" data="" buttonFlag="0">
                    <div style="text-align:center;">
                        <label style="font-size:20px; margin: 5px;">车型配置</label>
                    </div>
                    <div class="list-group" style="margin:10px;overflow-y: scroll; height:200px;" id="carTypes" number="0" cindex="0">
                    </div>
                    <div style="text-align:left; margin:5px;">
                        <button type="button" class="btn btn-success" id="carTypeAdd" onclick="carTypeAdd()">添加车型</button>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button type="button" class="btn btn-warning" id="time_create" onclick="carTypeDigCancel()">取消</button>

                    </div>
                </div>

                <div class="task_time" style=" z-index: 3000; background-color: graytext; display:none;width:300px;height: 290px;border:2px solid gray;position: absolute;
                     top: 380px;left: 30px;" id="task_direction_pane" data="" buttonFlag="0">

                </div>
                <div class="task_time" style="z-index: 3000; background-color: graytext; display:none;width:300px;height: 250px;border:2px solid gray;position: absolute;
                     top: 380px;left: 400px;" data="" id="task_cars" buttonFlag="0">
                    <table class="table table-condensed" style="border:none; text-align: center;width:100%;">
                        <tbody>
                            <tr>
                                <td style="border:none">车型:</td>
                                <td style="border:none">
                                    <select  id="carType">
                                        <option value="0_选择车型">选择车型</option>
                                        <option value="1_小汽车">小汽车</option>
                                        <option value="2_公交车">公交车</option>
                                        <option value="3_行人">行人</option>
                                        <option value="4_自定义">自定义</option>
                                    </select>
                                </td>
                            </tr>
                            <tr style="border:none"> 
                                <td style="border:none;">名称:</td>
                                <td style="border:none">
                                    <input type="text" name="pei_name" id="carName">
                                </td>
                            </tr>
                            <tr>
                                <td style="border:none">车长:</td>
                                <td style="border:none"><input type="text" name="pei_name" id="c_min_length" style="width:60px;">--<input type="text" style="width:60px;" id="c_max_length" name="pei_name">米
                                </td>
                            </tr>
                            <tr>
                                <td style="border:none">载重:</td>
                                <td style="border:none">
                                    <input type="text" name="pei_name" style="width:60px;" id="c_min_weight">--<input type="text" name="pei_name" style="width:60px;" id="c_max_weight">吨
                                </td></tr>
                            <tr>
                                <td style="border:none" colspan="2">小汽车换算系数:&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" name="pei_name" style="width:60px;" id="car_factor"></td>

                            </tr>
                            <tr>
                                <td style="border:none; text-align: left" colspan="2">
                                    <button type="button" class="btn btn-success" id="carTypeConfrim" onclick="carTypeConfrim()">确定</button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <button type="button" class="btn btn-warning" id="time_create" onclick="carTypeCancel()">取消</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>


                <script>
                    $(function () {
                        $("#task_time").draggable();
                        $("#task_peizhi").draggable();
                        $("#task_cars").draggable();
                    });
                </script>
            </div>
            <div style="text-align:left; margin:5px; position:absolute;top: 655px;left: 850px;" class="con_buttons">
                <button type="button" class="btn btn-success" id="time_create" onclick="intersection_confirm()">确定</button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button type="button" class="btn btn-warning" id="time_create" onclick="cancel_intersection()">取消</button>

            </div>
        </div>
        <div class="intersection_Section" id="seg_section" flag="false" style="display:none;">
            <div style="width:400px;height: 40px;margin-top: 10px;">
                <div class="intersection_title intersection_title_active" style="float:left;margin-left: 25px;" id="seg_option_1" onclick="show_seg_option(1)">
                    <label class="survey_a" >路段信息</label></div>
                <div class="intersection_title" id="seg_option_2" onclick="show_seg_option(2);"> <label  class="survey_a">流量调查任务</label></div>
            </div>
            <div class="in_section_1" style="display:block;" id="seg_quhua" flag="false">                
                <div class="demo lock nav_body nav_layout">
                    <div class="left_nav" style="width:500px;height:320px;">

                        <div id="tb-map_seg" style="width:450px;height:350px;">

                        </div>
                    </div>                  
                    <div class="sideBySide nav_side">

                        <div class="intersection" name="" id="seg_Lane" ids="0" lat="" lng="" degree="0" upnumber="" downnumber="">
                            <table>
                                <tr><td>路段名称:</td><td style="padding-left:10px;"><input type="text" id="seg_name" style="width:180px;"></td></tr>
                                <tr><td style="padding-top:10px;">车道数:</td>
                                    <td  style="padding-left:10px;padding-top:10px;">上行:
                                        <input type="text" class="seg_input" id="upNumber_seg" style="width:50px;">
                                        下行:<input type="text" class="seg_input" id="downNumber_seg" style="width:50px;"></td></tr>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="img_show_seg nav_layout">
                    <img src="" alt="路段示意图" id="img_result_seg" class="img_out zoom">  
                </div>
                <img src="./mapIcon/seg_tb.png" class="inter_img_button" onclick="generateSegLane()"style="width:40px;height:40px; position:absolute;top:52px;left:485px;"/>
            </div>

            <div class="all_task" style="display: none;" id="seg_task" flag="false">
                <div class="nav_task task_align">                       
                    <div class="list-group task_info" id="task_info_seg" imgPath="" upnumber="0" degree="0" cindex="0" downnumber="0"
                         current_img_s="0" current_slanes="" current_spoints="" flag="false" number="0" slanes="">

                    </div>

                    <div class="task_create" style="text-align: center">
                        <button type="button" class="btn btn-success" id="task_create" onclick="createTask_Seg()">新建任务</button>
                    </div>
                </div>
                <div class="img_area1 task_align" id="image_show_area_seg" style="width:600px;height:600px;border:1px solid gray">           
                    <img id="imag1_seg" onclick="showCoords_Seg(event)" src="">
                </div>
                <div class="task_time" style=" z-index: 3000; background-color: graytext; display:none;width:320px;height: 220px;border:2px solid gray;position: absolute;
                     top: 146px;left: 50px;" id="task_time_seg"
                     data="">
                    <table class="table table-condensed" style="border:none; text-align: center;width:100%;">
                        <tbody>
                            <tr>
                                <td style="border:none">起始时间:</td>
                                <td style="border:none"><input class="laydate-icon" style="width:220px"  name="bdaytime" id="stime_seg"></td>
                            </tr>
                            <tr style="border:none"> 
                                <td style="border:none;">结束时间:</td>
                                <td style="border:none"><input class="laydate-icon" style="width:220px"  name="bdaytime" id="etime_seg"></td>
                            </tr>
                            <tr>
                                <td style="border:none">采集方式</td>
                                <td style="border:none">
                                    <input type="radio" name="vehicle" value="1" name="视频" id="shipin_seg">&nbsp;&nbsp;&nbsp;视频<br>
                                    <input type="radio" name="vehicle" value="2" name="人工" id="rengong_seg">&nbsp;&nbsp;&nbsp;人工<br>
                                </td>
                            </tr>
                            <tr>
                                <td style="border:none">采集车型</td>
                                <td style="border:none">
                                    <button type="button" class="btn btn-success"  onclick="showCarType_Seg()">配置</button>
                                </td>
                            </tr>
                            <tr>
                                <td style="border:none; text-align: left" colspan="2">
                                    <button type="button" class="btn btn-success"  onclick="taskinfoSave_Seg()" id="task_create_seg">保存任务</button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <button type="button" class="btn btn-success"  onclick="cancelTask_Seg()">取消任务</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="task_time" style=" z-index: 3000; background-color: graytext; display:none;width:300px;height: 290px;border:2px solid gray;position: absolute;
                     top: 380px;left: 30px;" id="task_peizhi_seg" data="">
                    <div style="text-align:center;">
                        <label style="font-size:20px; margin: 5px;">车型配置</label>
                    </div>
                    <div class="list-group" style="margin:10px;overflow-y: scroll; height:200px;" id="carTypes_seg" number="0" cindex="0">
                    </div>
                    <div style="text-align:left; margin:5px;">
                        <button type="button" class="btn btn-success" id='carTypeAdd_Seg' onclick="carTypeAdd_Seg()">添加车型</button>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button type="button" class="btn btn-warning"  onclick="carTypeDigCancel_Seg()">取消</button>

                    </div>
                </div>
                <div class="task_time" style="z-index: 3000; background-color: graytext; display:none;width:300px;height: 250px;border:2px solid gray;position: absolute;
                     top: 380px;left: 400px;" data="" id="task_cars_seg">
                    <table class="table table-condensed" style="border:none; text-align: center;width:100%;">
                        <tbody>
                            <tr>
                                <td style="border:none">车型:</td>
                                <td style="border:none">
                                    <select  id="carType_seg">
                                        <option value="0_选择车型">选择车型</option>
                                        <option value="1_小汽车">小汽车</option>
                                        <option value="2_公交车">公交车</option>
                                        <option value="3_行人">行人</option>
                                        <option value="4_自定义">自定义</option>
                                    </select>
                                </td>
                            </tr>
                            <tr style="border:none"> 
                                <td style="border:none;">名称:</td>
                                <td style="border:none">
                                    <input type="text" name="pei_name" id="carName_seg">
                                </td>
                            </tr>
                            <tr>
                                <td style="border:none">车长:</td>
                                <td style="border:none"><input type="text" name="pei_name" id="c_min_length_seg" style="width:60px;">--<input type="text" style="width:60px;" id="c_max_length_seg" name="pei_name">米
                                </td>
                            </tr>
                            <tr>
                                <td style="border:none">载重:</td>
                                <td style="border:none">
                                    <input type="text" name="pei_name" style="width:60px;" id="c_min_weight_seg">--<input type="text" name="pei_name" style="width:60px;" id="c_max_weight_seg">吨
                                </td></tr>
                            <tr>
                                <td style="border:none" colspan="2">小汽车换算系数:&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" name="pei_name" style="width:60px;" id="car_factor_seg"></td>

                            </tr>
                            <tr>
                                <td style="border:none; text-align: left" colspan="2">
                                    <button type="button" class="btn btn-success"  id="carTypeConfrim_Seg" onclick="carTypeConfrim_Seg()">确定</button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <button type="button" class="btn btn-warning"  onclick="carTypeCancel_Seg()">取消</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>


                <script>
                    $(function () {
                        $("#task_time_seg").draggable();
                        $("#task_peizhi_seg").draggable();
                        $("#task_cars_seg").draggable();
                    });
                </script>
            </div>
            <div style="text-align:left; margin:5px; position:absolute;top: 600px;left: 850px;" class="con_buttons">
                <button type="button" class="btn btn-success" onclick="seg_confirm()">确定</button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button type="button" class="btn btn-warning" onclick="cancel_seg()">取消</button>

            </div>
        </div>
        <div class="intersection_Section" id="light_section" flag="false" style="display:none;">
            <div style="width:400px;height: 40px;margin-top: 10px;">
                <div class="intersection_title intersection_title_active" style="float:left;margin-left: 25px;" id="light_option_1" onclick="show_light_option(1)">
                    <label class="survey_a" >交叉口渠化</label></div>
                <div class="intersection_title" id="light_option_2" onclick="show_light_option(2);"> <label  class="survey_a">信号调查任务</label></div>
            </div>
            <div class="in_section_1" style="display:block;" id="light_quhua" flag="false">                
                <div class="demo lock_light nav_body nav_layout">
                    <div class="left_nav" style="width:500px;height:320px;">

                        <div id="tb-map_light" style="width:450px;height:350px;">
                        </div>
                        <div id="light_canvas">
                            <canvas id="inter_template_light" style="width:450px;height:350px;"></canvas>
                        </div>
                    </div>                  
                    <div class="sideBySide nav_side">
                        <div class="tool_bar">
                            <ul class="nav nav-pills sourcejQ_light" style="width:450px;">
                                <li type="0" class="r_li"><img src="./roadSym/d_z_tb.jpg" class="r_tb" alt="进直行车道"></li>
                                <li type="7" class="r_li"><img src="./roadSym/z_tb.jpg" class="r_tb" alt="出直行车道"></li>
                                <li type="1" class="r_li"><img src="./roadSym/t_tb.jpg" class="r_tb" alt="调头行车道"></li>
                                <li type="2" class="r_li"><img src="./roadSym/l_t_tb.jpg" class="r_tb" alt="左转掉头行车道"></li>
                                <li type="4" class="r_li"><img src="./roadSym/l_tb.jpg" class="r_tb" alt="左转行车道"></li>
                                <li type="5" class="r_li"><img src="./roadSym/z_l_tb.jpg" class="r_tb" alt="左转直行车道"></li>
                                <li type="6" class="r_li"><img src="./roadSym/z_l_r_tb.jpg" class="r_tb" alt="左右直行车道"></li>                       
                                <li type="8" class="r_li"><img src="./roadSym/z_r_tb.jpg" class="r_tb" alt="右转直行车道"></li>
                                <li type="9" class="r_li"><img src="./roadSym/r_tb.jpg" class="r_tb" alt="右转行车道"></li>
                                <li type="13" class="r_li"><img src="./roadSym/bus_left_tb.jpg" class="r_tb" alt="公交行左转车道"></li><br/>
                                <li type="16" class="r_li"><img src="./roadSym/bus_up_tb.jpg" class="r_tb" alt="公交行直行车道"></li>
                                <li type="19" class="r_li"><img src="./roadSym/bike_tb.jpg" class="r_tb" alt="自行车车道"></li>
                                <li type="20" class="r_li"><img src="./roadSym/yellowLine_tb.png" class="r_tb" alt="双黄线"></li>
                            </ul>
                        </div>
                        <div class="intersection" lat="" lng=""  ids="0" thets="0_90_180_270" name="" laneNumber="4" id="light" currentLaneID="0" currentLaneDegree="" laneInfo="">
                            <p style="color:white;">路口道路平面图:</p>
                            <ol id="outresult_light" class="nav nav-pills targetjQ_light ui-sortable outview" data="0" style="border:1px solid white;">
                            </ol>
                        </div>
                    </div>
                </div>
                <div class="img_show nav_layout">
                    <img src="" alt="交叉口示意图" id="img_result_light" class="img_out zoom">  
                </div>
                <img src="./mapIcon/light_tb.png" class="inter_img_button" onclick="generateLight_S()"style="width:40px;height:40px; position:absolute;top:52px;left:485px;"/>
                <script type="text/javascript">
                    loadDraggable_Light();
                </script>
            </div>

            <div class="all_task" style="display: none;" id="light_task" flag="false">
                <div class="nav_task task_align">                       
                    <div class="list-group task_info" id="task_info_light" light="" number="0" cindex="0"
                         current_img_s="0" current_slanes="" current_spoints="" imgPath="" slanes="">
                    </div>

                    <div class="task_create" style="text-align: center">
                        <button type="button" class="btn btn-success"  onclick="createTask_Light()">新建任务</button>
                    </div>
                </div>
                <div class="img_area1 task_align" id="image_show_area" style="width:600px;height:600px;border:1px solid gray">           
                    <img id="imag1_light" onclick="showCoords_Light(event)" src="">
                </div>
                <div class="task_time" style=" z-index: 3000; background-color: graytext; display:none;width:320px;height: 250px;border:2px solid gray;position: absolute;
                     top: 146px;left: 50px;" id="task_time_light"
                     data="">
                    <table class="table table-condensed" style="border:none; text-align: center;width:100%;">
                        <tbody>
                            <tr>
                                <td style="border:none">起始时间:</td>
                                <td style="border:none"><input class="laydate-icon" style="width:220px"  name="bdaytime" id="stime_light"></td>
                            </tr>
                            <tr style="border:none"> 
                                <td style="border:none;">结束时间:</td>
                                <td style="border:none"><input class="laydate-icon" style="width:220px"  name="bdaytime" id="etime_light"></td>
                            </tr>
                            <tr>
                                <td style="border:none">采集方式:</td>
                                <td style="border:none">
                                    <input type="radio" name="method" value="1" id="shipin_light">&nbsp;&nbsp;&nbsp;视频
                                    <input type="radio" name="method" value="2"  id="rengong_light">&nbsp;&nbsp;&nbsp;人工<br>
                                </td>
                            </tr>
                            <tr>
                                <td style="border:none">信号类型:</td>
                                <td style="border:none">
                                    <input type="radio" name="lightType" value="1" id="dingshi_light">&nbsp;&nbsp;&nbsp;定时<br>
                                    <input type="radio" name="lightType" value="2" id="ganying_light">&nbsp;&nbsp;&nbsp;感应式<br>
                                    <input type="radio" name="lightType" value="3" id="kongzhi_light">&nbsp;&nbsp;&nbsp;控制系统<br>
                                </td>
                            </tr>
                            <tr>
                                <td style="border:none; text-align: left" colspan="2">
                                    <button type="button" class="btn btn-success" id="taskinfoSave_Light" onclick="taskinfoSave_Light()">保存任务</button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <button type="button" class="btn btn-success"  onclick="cancelTask_Light()">取消任务</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <script>
                    $(function () {
                        $("#task_time_light").draggable();
//                        $("#task_peizhi_light").draggable();
//                        $("#task_cars_light").draggable();
                    });
                </script>
            </div>
            <div style="text-align:left; margin:5px; position:absolute;top: 600px;left: 850px;" class="con_buttons">
                <button type="button" class="btn btn-success"  onclick="light_confirm()">确定</button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button type="button" class="btn btn-warning"  onclick="cancel_light()">取消</button>
            </div>
        </div>

        <div class="intersection_Section" id="task_ass_section" flag="false" style="display:none;">
            <div class="all_task" style="display: block;" id="seg_task" flag="false">                
                <div class="nav_task task_align" style="margin-top: 5px;border:1px solid white;height: 650px;width:460px;"> 
                    <div class="ass_task_nav" style="margin-left: 5px;">
                        <a href="javascript:void(0);" onclick="showRemainTasks();" style="display:none;"><label id="unTasks" style="font-size: 18px;margin-top:5px;margin-bottom: 5px;">未分配任务:<span id="un_task_number">0/span>个</label></a>
                        <div style="margin-left:10px;margin-top:10px;">日期:&nbsp;&nbsp;<input class="laydate-icon" id="task_date" name="from" style="width:150px;">

                        </div>
                    </div>
                    <ul class="list-group" id="un_task_assign" number="0" style="width:450px;margin-top: 10px;height:550px;overflow-y: scroll;margin-left: 5px;" currentID="0">
                    </ul>

                </div>
                <div class="p_task_ass"  style="width: 550px;height: 650px;position: absolute;display: inline-block;margin-top: 5px;margin-left: -10px;"> 
                    <div style="border:1px solid white;">
                        <label id="p_unTasks" onclick="showAllPersons();" style="font-size: 18px;margin-top:5px;margin-bottom: 5px;margin-left: 10px;">可用人员: 共<span id="p_number"><%=usize%></span>人</label>
                        <div style="margin-left:10px;height:30px;">

                            <img src="./img/p_add.png" class="p_status" style="position: relative; top: -30px;right: -488px; width:50px;height:50px;" onclick="addNewPerson()">
                        </div>
                        <div style="height: 290px;overflow-y: scroll" id="persons_task" currentID="0" number="<%=usize%>">
                            <ul id="task_table_person" class="nav nav-pills" style="width:500px;margin-left: 25px;">

                            </ul>
                        </div>
                    </div>
                    <div style="border:1px solid white; margin-top: 2px;">
                        <label id="p_unTasks" style="font-size: 18px;margin-top:5px;margin-bottom: 5px;margin-left: 10px;"><span id="show_p_name">XXXXX</span>&nbsp;&nbsp;&nbsp;任务数:<span id="show_p_number">0</span></label>
                        <div style="margin-left:10px;margin-top:10px;">日期:&nbsp;&nbsp;<input class="laydate-icon" id="p_task_date_p" name="from" style="width:150px;">

                        </div>
                        <div>
                            <ul id="p_task_result" class="list-group targetjQ_assign ui-sortable" currentPID="0" number="0" style="margin-left:10px;height:200px;margin-top: 10px;overflow-y: scroll;z-index: -1000;">
                            </ul>
                        </div>
                    </div>
                    <div class="task_time" style=" z-index: 3000; background-color: graytext; display:none;width:250px;height: 200px;border:2px solid gray;position: absolute;
                         top: 146px;left: 50px;" id="task_time_assign"
                         data="">
                        <table class="table table-condensed" style="border:none; text-align: center;width:100%;">
                            <tbody>
                                <tr>                                   
                                    <td style="border:none;text-align: center;font-size: 18px;" colspan="2">添加新的调查人员</td>
                                </tr>
                                <tr>                                   
                                    <td style="border:none" colspan="2"><input class="time_bar" style="width:220px" type="text" name="p_info" id="p_new_info"></td>
                                </tr>
                                <tr>
                                    <td style="border:none">微信号码</td>
                                    <td style="border:none">
                                        <input type="radio"  value="1"  id="weixin_task">&nbsp;&nbsp;&nbsp;微信<br>
<!--                                        <input type="radio"  value="2"  id="duanxin_task">&nbsp;&nbsp;&nbsp;短信<br>
                                        <input type="radio"  value="3"  id="email_task">&nbsp;&nbsp;&nbsp;电子信箱<br>-->
                                    </td>
                                </tr>
                                <tr>
                                    <td style="border:none; text-align: left" colspan="2">
                                        <button type="button" class="btn btn-success"  onclick="taksPersonConfrim()">确定添加</button>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <button type="button" class="btn btn-success"  onclick="taksPersonCancel()">取消添加</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <script>
                        $(function () {
                            $("#task_time_assign").draggable();
                        });</script>
                </div>
                <div style="text-align:left; margin:5px; position:absolute;top: 550px;left: 1041px;" class="con_buttons">
                    <button type="button" class="btn btn-success" onclick="task_assgin_confirm()">确定</button>
                    <br/>
                    <br/>
                    <button type="button" class="btn btn-warning" onclick="task_assgin_cancel()">取消</button>

                </div>
            </div>
        </div>


        <div class="intersection_Section" id="dash_section" flag="true" style="display:none;overflow-y: scroll;">
            <div class="content-wrapper" style="margin-left:5px;margin-right:5px;color:black;background: inherit;">

                <!-- Main content -->
                <section class="content">
                    <!-- Info boxes -->
                    <div class="row">
                        <div class="col-md-3 col-sm-6 col-xs-12">
                            <div class="info-box">
                                <span class="info-box-icon bg-aqua"><i class="fa fa-road" aria-hidden="true"></i></span>

                                <div class="info-box-content" onclick="loadWaitPassTasks();">
                                    <span class="info-box-text">等待审核的任务</span>
                                    <span class="info-box-number" id="un_pass_task_dash">90</span>
                                </div>
                                <!-- /.info-box-content -->
                            </div>
                            <!-- /.info-box -->
                        </div>
                        <!-- /.col -->
                        <div class="col-md-3 col-sm-6 col-xs-12">
                            <div class="info-box">
                                <span class="info-box-icon bg-red"><i class="fa fa-info"></i></span>

                                <div class="info-box-content">
                                    <span class="info-box-text">等待分配的任务</span>
                                    <span class="info-box-number" id="un_assign_task_dash">210</span>
                                </div>
                                <!-- /.info-box-content -->
                            </div>
                            <!-- /.info-box -->
                        </div>
                        <!-- /.col -->

                        <!-- fix for small devices only -->
                        <div class="clearfix visible-sm-block"></div>

                        <div class="col-md-3 col-sm-6 col-xs-12">
                            <div class="info-box">
                                <span class="info-box-icon bg-green"><i class="ion ion-ios-gear-outline"></i></span>

                                <div class="info-box-content">
                                    <span class="info-box-text">调查进度</span>
                                    <span class="info-box-number" id="tasks_process_dash">10/15</span>
                                </div>
                                <!-- /.info-box-content -->
                            </div>
                            <!-- /.info-box -->
                        </div>
                        <!-- /.col -->
                        <div class="col-md-3 col-sm-6 col-xs-12">
                            <div class="info-box">
                                <span class="info-box-icon bg-yellow"><i class="ion ion-ios-people-outline"></i></span>

                                <div class="info-box-content">
                                    <span class="info-box-text">项目成员</span>
                                    <span class="info-box-number" id="model_member">8</span>
                                </div>
                                <!-- /.info-box-content -->
                            </div>
                            <!-- /.info-box -->
                        </div>
                        <!-- /.col -->
                    </div>
                    <!-- /.row -->

                    <div class="row" style="height:410px">
                        <div class="col-md-12">
                            <div class="box">
                                <div class="box-header with-border">
                                    <h3 class="box-title">最新状态通知</h3>

                                   
                                </div>
                                <!-- /.box-header -->
                                <div class="box-body">
                                    <div class="row">
                                        <div class="col-md-8">
                                            <ul class="list-group" id="dash_note_list">
                                        
                                            </ul>

                                            <div class="chart">
                                                <!-- Sales Chart Canvas -->

                                            </div>
                                            <!-- /.chart-responsive -->
                                        </div>
                                        <!-- /.col -->
                                        <div class="col-md-4" style="border-left: 1px solid gray;height:310px;">
                                            <p class="text-center">
                                                <strong>调查进度列表</strong>
                                            </p>

                                            <div class="progress-group">
                                                <span class="progress-text">交叉口流量调查</span>
                                                <span class="progress-number" id="dash_intersection"><b>160</b>/200</span>

                                                <div class="progress sm">
                                                    <div class="progress-bar progress-bar-aqua" id="dash_intersection_bar" style="width: 80%"></div>
                                                </div>
                                            </div>
                                            <!-- /.progress-group -->
                                            <div class="progress-group">
                                                <span class="progress-text">路段流量调查</span>
                                                <span class="progress-number" id="dash_seg"><b>310</b>/400</span>

                                                <div class="progress sm">
                                                    <div class="progress-bar progress-bar-red" id="dash_seg_bar" style="width: 75%"></div>
                                                </div>
                                            </div>
                                            <!-- /.progress-group -->
                                            <div class="progress-group">
                                                <span class="progress-text">交叉口信号调查</span>
                                                <span class="progress-number" id="dash_light"><b>480</b>/800</span>

                                                <div class="progress sm">
                                                    <div class="progress-bar progress-bar-green" id="dash_light_bar" style="width: 50%"></div>
                                                </div>
                                            </div>

                                            <!-- /.progress-group -->
                                        </div>
                                        <!-- /.col -->
                                    </div>
                                    <!-- /.row -->
                                </div>
                                <!-- ./box-body -->
                                <!-- /.box-footer -->
                            </div>
                            <!-- /.box -->
                        </div>
                        <!-- /.col -->
                    </div>
                    <!-- /.row -->

                    <!-- Main row -->
                    <div class="row">

                        <div class="col-md-4" style="width:100%;">
                            <!-- USERS LIST -->
                            <div class="box box-danger">
                                <div class="box-header with-border">
                                    <h3 class="box-title">项目成员</h3>

                                    <div class="box-tools pull-right">
                                        <span class="label label-danger">2个新成员</span>
                                      
                                    </div>
                                </div>
                                <!-- /.box-header -->
                                <div class="box-body no-padding">
                                    <ul class="users-list clearfix">
                                        <li>
                                            <img src="./img/img/user1-128x128.jpg" alt="User Image" class="dash_user_img">
                                            <a class="users-list-name" href="#">Zhicheng Fu</a>
                                            <span class="users-list-date">Today</span>
                                        </li>
                                        <li>
                                            <img src="./img/img/user8-128x128.jpg" alt="User Image" class="dash_user_img">
                                            <a class="users-list-name" href="#">Zhicheng Fu</a>
                                            <span class="users-list-date">Yesterday</span>
                                        </li>
                                        <li>
                                            <img src="./img/img/user7-128x128.jpg" alt="User Image" class="dash_user_img">
                                            <a class="users-list-name" href="#">Zhicheng Fu</a>
                                            <span class="users-list-date">12 Jan</span>
                                        </li>
                                        <li>
                                            <img src="./img/img/user6-128x128.jpg" alt="User Image" class="dash_user_img">
                                            <a class="users-list-name" href="#">Zhicheng Fu</a>
                                            <span class="users-list-date">12 Jan</span>
                                        </li>
                                        <li>
                                            <img src="./img/img/user2-160x160.jpg" alt="User Image" class="dash_user_img">
                                            <a class="users-list-name" href="#">Zhicheng Fu</a>
                                            <span class="users-list-date">13 Jan</span>
                                        </li>
                                        <li>
                                            <img src="./img/img/user5-128x128.jpg" alt="User Image" class="dash_user_img">
                                            <a class="users-list-name" href="#">Zhicheng Fu</a>
                                            <span class="users-list-date">14 Jan</span>
                                        </li>
                                        <li>
                                            <img src="./img/img/user4-128x128.jpg" alt="User Image" class="dash_user_img">
                                            <a class="users-list-name" href="#">Zhicheng Fu</a>
                                            <span class="users-list-date">15 Jan</span>
                                        </li>
                                        <li>
                                            <img src="./img/img/user3-128x128.jpg" alt="User Image" class="dash_user_img">
                                            <a class="users-list-name" href="#">Zhicheng Fu</a>
                                            <span class="users-list-date">15 Jan</span>
                                        </li>
                                    </ul>
                                    <!-- /.users-list -->
                                </div>
                                <!-- /.box-footer -->
                            </div>
                            <!--/.box -->
                        </div>
                        <!-- /.col -->
                    </div>
                    <!-- /.row -->
                </section>
                <!-- /.content -->
            </div>
        </div>
        <div class="intersection_Section" id="show_result_section" flag="false" style="display:none;overflow-y: scroll;">
            <div style="margin: 10px;">
            <div class="result_view" id="data_view">
                
            </div>
            <div class="result_view" id="graphic_view" style="display:none;"></div>
        </div>
        </div>
        <div class="notice_Section" id="notice_Section">
            <div id="notice_nav" style="background:whitesmoke;" flag="1">&nbsp;&nbsp;<i class="fa fa-minus-circle fa-2x " aria-hidden="true" onclick="showNoticeSection(2)"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-plus-circle fa-2x" aria-hidden="true" onclick="showNoticeSection(1)"></i><span class="tongzhi_notice" onclick="showNav_Option(8)">项目动态通知</span></div>
                            <div id="r-news"  info=""><p class="s_update_news" onclick="showNav_Option(8)">项目动态通知</p></div>
                        </div>
        <div class="tiva-events-calendar full intersection_Section" data-source="ajax" id="task_view_section" style="display: none; width:1100px;overflow-y: scroll"></div>
        <div class="modal fade" id="my_Modal" role="dialog">
             <div class="modal-dialog" style="background-color : transparent;">

    <!-- Modal content-->
    <div class="modal-content" style="background-color : transparent;">
      <div class="modal-body" style="background-color : transparent;text-align: center;">
        <i class="fa fa-refresh fa-spin fa-5x fa-fw" style="color:skyblue"></i>
<span class="sr-only">加载中...</span>

      </div>
    </div>
        </div>
    </body>
    <script>
        $(function () {
            loadPageInfo();
            google.charts.load('current', {'packages': ['corechart','bar','line','table']});
            google.charts.setOnLoadCallback(loadDashWithInterval);
            loadNoticeWithInterval();
            //loadNoticeWithInterval
            laydate({
                elem: '#pstime', //目标元素。由于laydate.js封装了一个轻量级的选择器引擎，因此elem还允许你传入class、tag但必须按照这种方式 '#id .class'
                event: 'focus', //响应事件。如果没有传入event，则按照默认的click
                format: 'YYYY-MM-DD hh:mm',
                istime: true
            });
            laydate({
                elem: '#petime', //目标元素。由于laydate.js封装了一个轻量级的选择器引擎，因此elem还允许你传入class、tag但必须按照这种方式 '#id .class'
                event: 'focus', //响应事件。如果没有传入event，则按照默认的click
                format: 'YYYY-MM-DD hh:mm',
                istime: true
            });
//            laydate({
//                elem: '#stime', //目标元素。由于laydate.js封装了一个轻量级的选择器引擎，因此elem还允许你传入class、tag但必须按照这种方式 '#id .class'
//                event: 'focus', //响应事件。如果没有传入event，则按照默认的click
//                format: 'YYYY-MM-DD hh:mm',
//                istime: true
//            });
//            laydate({
//                elem: '#etime', //目标元素。由于laydate.js封装了一个轻量级的选择器引擎，因此elem还允许你传入class、tag但必须按照这种方式 '#id .class'
//                event: 'focus', //响应事件。如果没有传入event，则按照默认的click
//                format: 'YYYY-MM-DD hh:mm',
//                istime: true
//            });

            laydate({
                elem: '#stime_seg', //目标元素。由于laydate.js封装了一个轻量级的选择器引擎，因此elem还允许你传入class、tag但必须按照这种方式 '#id .class'
                event: 'focus', //响应事件。如果没有传入event，则按照默认的click
                format: 'YYYY-MM-DD hh:mm',
                istime: true
            });
            laydate({
                elem: '#etime_seg', //目标元素。由于laydate.js封装了一个轻量级的选择器引擎，因此elem还允许你传入class、tag但必须按照这种方式 '#id .class'
                event: 'focus', //响应事件。如果没有传入event，则按照默认的click
                format: 'YYYY-MM-DD hh:mm',
                istime: true
            });

            laydate({
                elem: '#stime_light', //目标元素。由于laydate.js封装了一个轻量级的选择器引擎，因此elem还允许你传入class、tag但必须按照这种方式 '#id .class'
                event: 'focus', //响应事件。如果没有传入event，则按照默认的click
                format: 'YYYY-MM-DD hh:mm',
                istime: true
            });
            laydate({
                elem: '#etime_light', //目标元素。由于laydate.js封装了一个轻量级的选择器引擎，因此elem还允许你传入class、tag但必须按照这种方式 '#id .class'
                event: 'focus', //响应事件。如果没有传入event，则按照默认的click
                format: 'YYYY-MM-DD hh:mm',
                istime: true
            });

            laydate({
                elem: '#p_task_date_p', //目标元素。由于laydate.js封装了一个轻量级的选择器引擎，因此elem还允许你传入class、tag但必须按照这种方式 '#id .class'
                event: 'focus', //响应事件。如果没有传入event，则按照默认的click
                format: 'YYYY-MM-DD',
                istime: false
            });

            laydate({
                elem: '#task_date', //目标元素。由于laydate.js封装了一个轻量级的选择器引擎，因此elem还允许你传入class、tag但必须按照这种方式 '#id .class'
                event: 'focus', //响应事件。如果没有传入event，则按照默认的click
                format: 'YYYY-MM-DD',
                istime: false
            });

            laydate({
                elem: '#t_model_date', //目标元素。由于laydate.js封装了一个轻量级的选择器引擎，因此elem还允许你传入class、tag但必须按照这种方式 '#id .class'
                event: 'focus', //响应事件。如果没有传入event，则按照默认的click
                format: 'YYYY-MM-DD',
                istime: false
            });



            laydate.skin('molv');

        });
    </script>
</html>