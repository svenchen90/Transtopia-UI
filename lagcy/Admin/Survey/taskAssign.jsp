<%-- 
    Document   : taskAssign
    Created on : May 20, 2016, 9:26:42 PM
    Author     : zhichengfu
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <%
        String intersection=null;
        try
        {
            intersection=request.getParameter("laneInfo");
        }catch(Exception e)
        {
            intersection=e.getMessage();
        }
    %>
    <head>
        <title>任务分配</title>
        <meta charset="UTF-8">
        <link href="./css/jquery-ui.css" type="text/css" rel="stylesheet">
        <link href="./css/bootstrap.min.css" type="text/css" rel="stylesheet">
        <link href="./css/font-awesome.min.css" type="text/css" rel="stylesheet">
        <link href="./css/test.css" type="text/css" rel="stylesheet">
        <link href="./css/mine.css" type="text/css" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script type="text/javascript" src="./js/jquery-2.0.3.min.js"></script>
        <script type="text/javascript" src="./js/jquery-ui.min.js"></script>
        <script type="text/javascript" src="./js/bootstrap.min.js"></script>
        <script type="text/javascript" src="./js/jquery.sortable5.min.js"></script>
        <script type="text/javascript" src="./js/mine.js"></script>
    </head>
    <body>
        <div class="all_task">
            <div class="nav_task task_align">
                <div style="text-align:center; margin: 5px;"><label class="inline_display" style="color:background;font-size: 20px;">交叉口渠化</label>&nbsp;&nbsp;&nbsp;
                    <select class="inline_display" name="province" style="position:relative;top:-3px;">
                        <option value="1">流量调查任务</option>
                        <option value="2">路段调查任务</option>
                        <option value="3">流量调查任务</option>
                        <option value="4">流量调查任务</option>
                    </select>
                </div>
                <div class="list-group task_info" id="task_info" intersection="<%=intersection%>" number="0" cindex="0">
                    <a href="#" class="list-group-item list-group-item-info">任务列表</a>
                </div>

                <div class="task_create" style="text-align: center">
                    <button type="button" class="btn btn-success" id="task_create" onclick="createTask()">新建任务</button>
                </div>
            </div>
            <div class="img_area1 task_align" id="image_show_area" style="width:800px;height:800px;border:1px solid gray">           
                <img id="imag1" onclick="showCoords(event)" src="../../TempImage/result.jpg">
            </div>
            <div class="task_time" style=" z-index: 3000; background-color: graytext; display:none;width:320px;height: 220px;border:2px solid gray;position: absolute;top: 70px;left: 500px;" id="task_time"
                 data="">
                <table class="table table-condensed" style="border:none; text-align: center;width:100%;">
                    <tbody>
                        <tr>
                            <td style="border:none">起始时间:</td>
                            <td style="border:none"><input class="time_bar" style="width:220px" type="datetime-local" name="bdaytime" id="stime"></td>
                        </tr>
                        <tr style="border:none"> 
                            <td style="border:none;">结束时间:</td>
                            <td style="border:none"><input class="time_bar" style="width:220px" type="datetime-local" name="bdaytime" id="etime"></td>
                        </tr>
                        <tr>
                            <td style="border:none">采集方式</td>
                            <td style="border:none">
                                <input type="checkbox" name="vehicle" value="1" name="视频" id="shipin">&nbsp;&nbsp;&nbsp;视频<br>
                                <input type="checkbox" name="vehicle" value="2" name="人工" id="rengong">&nbsp;&nbsp;&nbsp;人工<br>
                            </td>
                        </tr>
                        <tr>
                            <td style="border:none">采集车型</td>
                            <td style="border:none">
                                <button type="button" class="btn btn-success" id="time_create" onclick="showCarType()">配置</button>
                            </td>
                        </tr>
                        <tr>
                            <td style="border:none; text-align: left" colspan="2">
                                <button type="button" class="btn btn-success" id="time_create" onclick="taskinfoSave()">保存任务</button>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <button type="button" class="btn btn-success" id="time_create" onclick="cancelTask()">取消任务</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="task_time" style=" z-index: 3000; background-color: graytext; display:none;width:300px;height: 290px;border:2px solid gray;position: absolute;top: 370px;left: 500px;" id="task_peizhi" data="">
                <div style="text-align:center;">
                    <label style="font-size:20px; margin: 5px;">车型配置</label>
                </div>
                <div class="list-group" style="margin:10px;overflow-y: scroll; height:200px;" id="carTypes" number="0" cindex="0">
                </div>
                <div style="text-align:left; margin:5px;">
                    <button type="button" class="btn btn-success" id="time_create" onclick="carTypeAdd()">添加</button>
                    
                </div>
            </div>
            <div class="task_time" style="z-index: 3000; background-color: graytext; display:none;width:300px;height: 250px;border:2px solid gray;position: absolute;top: 370px;left: 900px;" data="" id="task_cars">
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
                                <button type="button" class="btn btn-success" id="time_create" onclick="carTypeConfrim()">确定</button>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <button type="button" class="btn btn-warning" id="time_create" onclick="carTypeCancel()">取消</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div style=" z-index: 3000; display:block; width:200px;height: 50px;position: absolute;top: 700px;left: 1050px;">
                <button type="button" class="btn btn-success" id="task_cancel" onclick="confirmTask()">确定任务</button>
                <button type="button" class="btn btn-info" id="task_cancel" onclick="cancelTask()">取消任务</button>
            </div>     
        <script>
            $(function () {
                $("#task_time").draggable();
                $("#task_peizhi").draggable();
                $("#task_cars").draggable();
            });
        </script>
        </div>
    </body>
</html>

