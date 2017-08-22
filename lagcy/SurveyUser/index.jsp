<%-- 
    Document   : index
    Created on : Mar 16, 2016, 5:41:27 PM
    Author     : zhichengfu
--%>

<%@page import="com.google.gson.Gson"%>
<%@page import="Survey.Survey_User"%>
<%@page import="Survey.Task_Item"%>
<%@page import="java.util.LinkedList"%>
<%@page import="Data.User"%>
<%@page import="Tools.Others"%>
<%@page import="Data.Project"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9"> <![endif]-->
<!--[if !IE]><!--> <html lang="en"> <!--<![endif]-->
    <!-- BEGIN HEAD -->
    <head>
        <meta charset="UTF-8" />
        <title>任务接受页面</title>
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <link rel="stylesheet" href="./css/bootstrap.css" />
        <link rel="stylesheet" href="./css/bootstrap-tokenfield.css" />
        <link rel="stylesheet" href="./css/main.css" />
        <link rel="stylesheet" href="./css/theme.css" />
        <link rel="stylesheet" href="./css/MoneAdmin.css" />
        <link rel="stylesheet" href="./plugins/Font-Awesome/css/font-awesome.css" />
        <link href="./css/pygments-manni.css" type="text/css" rel="stylesheet">
        <link href="./css/docs.css" type="text/css" rel="stylesheet">
        <link href="./css/jquery-ui.css" type="text/css" rel="stylesheet">
        <link rel="stylesheet" href="./laydate/need/laydate.css">
        <link rel="stylesheet" href="./laydate/skins/molv/laydate.css">
        <!--END GLOBAL STYLES -->

        <!-- PAGE LEVEL STYLES -->
        <link href="./css/layout2.css" rel="stylesheet" />
        <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=21MEGr0gZhVgqGF8VDlX2kjQ"></script>
        
    </head>

    <%

        Survey_User user = (Survey_User) session.getAttribute("suser");
        LinkedList<Task_Item> items = null;
        int size = 0;
        int un_task_size = 0;
        int in_task_size = 0;
        int co_task_size = 0;
        int de_task_size = 0;
        try {
            items = Task_Item.getAllTaskItemsBySUserID(user.id);
            if (items != null) {
                size = items.size();
                for (Task_Item it : items) {
                    if (it.c_status == 1) {
                        un_task_size++;
                    } else if (it.c_status == 2) {
                        in_task_size++;
                    } else if (it.c_status == 4) {
                        co_task_size++;
                    } else if (it.c_status == 3) {
                        de_task_size++;
                    }
                }
            }
        } catch (Exception e) {

        }

    %>

    <!-- END HEAD -->

    <!-- BEGIN BODY -->
    <body class="padTop53 " id="bodyOne" oncontextmenu="return false;">

        <!-- MAIN WRAPPER -->
        <!--        <div id="overlay-background" class="overlay-background"></div>-->
        <div id="wrap" >
            <div id="top">
                <nav class="navbar navbar-inverse navbar-fixed-top " style="padding-top: 10px;">
                    <a data-original-title="Show/Hide Menu" data-placement="bottom" data-tooltip="tooltip"  data-toggle="collapse" href="#menu" id="menu-toggle">
                        <i class="icon-align-justify"></i>
                    </a>
                    <!-- LOGO SECTION -->
                    <header class="navbar-header">

                        <a href="index.jsp" class="navbar-brand">
                            <img src="../img/logo.png" alt="" />
                        </a>
                    </header>
                    <!-- END LOGO SECTION -->
                    <!--top alerts-->
                    <ul class="nav navbar-top-links navbar-right">
                        <li class="chat-panel dropdown">
                            <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                                <span class="label label-info">8</span>   <i class="icon-comments"></i>&nbsp; <i class="icon-chevron-down"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-alerts">
                                <li>
                                    <a href="#">
                                        <div>
                                            <i class="icon-comment" ></i> 最新评论
                                            <span class="pull-right text-muted small"> 4 minutes ago</span>
                                        </div>
                                    </a>
                                </li>
                                <li class="divider"></li>
                                <li>
                                    <a href="#">
                                        <div>
                                            <i class="icon-twitter info"></i> 3 个最新邀请
                                            <span class="pull-right text-muted small"> 9 minutes ago</span>
                                        </div>
                                    </a>
                                </li>
                                <li class="divider"></li>
                                <li>
                                    <a href="#">
                                        <div>
                                            <i class="icon-tasks"></i> 最新项目
                                            <span class="pull-right text-muted small"> 1 Hour ago</span>
                                        </div>
                                    </a>
                                </li>
                                <li class="divider"></li>
                                <li>
                                    <a class="text-center" href="#">
                                        <strong>查看所有提醒</strong>
                                        <i class="icon-angle-right"></i>
                                    </a>
                                </li>
                            </ul>

                        </li>
                        <!-- END ALERTS SECTION -->

                        <!--ADMIN SETTINGS SECTIONS -->


                        <!--END ADMIN SETTINGS -->
                    </ul>

                </nav>

            </div>
            <!-- END HEADER SECTION -->

            <!-- MENU SECTION -->
            <div id="left" >
                <ul id="menu" class="collapse">                    
                    <li class="panel active">
                        <a href="javascript:void(0);" onclick="showSurveyProjectList()" class="accordion-toggle collapsed" data-target="#form-nav">
                            <i class="icon-file"></i> 等待接受的任务

                            <span class="pull-right">
                                <i class="icon-angle-left"></i>
                            </span>
                            &nbsp; <span class="label label-success"><%=un_task_size%></span>&nbsp;
                        </a>
                    </li>
                    <li class="panel ">
                        <a href="javascript:void(0);" onclick="showSurveyProjectList()" class="accordion-toggle collapsed" data-target="#form-nav">
                            <i class="icon-file"></i> 正在进行的任务

                            <span class="pull-right">
                                <i class="icon-angle-left"></i>
                            </span>
                            &nbsp; <span class="label label-success"><%=in_task_size%></span>&nbsp;
                        </a>
                    </li>

                    <li class="panel ">
                        <a href="javascript:void(0);" onclick="showSurveyProjectList()" class="accordion-toggle collapsed" data-target="#form-nav">
                            <i class="icon-file"></i> 等待审核的任务

                            <span class="pull-right">
                                <i class="icon-angle-left"></i>
                            </span>
                            &nbsp; <span class="label label-success"><%=de_task_size%></span>&nbsp;
                        </a>
                    </li>

                    <li class="panel">
                        <a href="dproject.jsp" data-parent="#menu" data-toggle="collapse" class="accordion-toggle" data-target="#pagesr-nav">
                            <i class="icon-trash"></i> 已经完成的任务

                            <span class="pull-right">
                                <i class="icon-angle-left"></i>
                            </span>
                            &nbsp; <span class="label label-info"><%=co_task_size%></span>&nbsp;
                        </a>

                    </li>
                </ul>

            </div>
            <!--END MENU SECTION -->

            <!--PAGE CONTENT -->
            <div id="content">

                <div class="inner" style="min-height: 600px;">
                    <!--BLOCK SECTION -->
                    <div class="row">
                        <div class="col-lg-12">
                            <div style="display: inline-block;float:left;margin-left: 35px;"><h3>任务列表信息

                            </div>

                        </div>

                    </div>
                    <!--END BLOCK SECTION -->
                    <hr />

                    <!--END CHAT & CHAT SECTION -->
                    <!-- COMMENT AND NOTIFICATION  SECTION -->
                    <div class="row" style="margin-top: -8px;">

                        <div class="col-lg-12">

                            <div class="panel panel-danger">
                                <!--                            <div class="panel-heading">
                                                                <i class="icon-bell"></i> Notifications Alerts Panel
                                                            </div>-->
                                <div class="panel-body">

                                    <div id="allProjects" class="list-group" sortName="1" sortTime="1" uid="<%=user.id%>" style="margin-top: 20px;">
                                        <table class="user_task_table">
                                            <tr><td class="nameFile"><a href="javascript:void(0)" onclick="">任务信息</a></td>
                                                <td class="taskTime"><a href="javascript:void(0)" onclick="">开始时间</a></td>
                                                <td class="task_duration"><a href="javascript:void(0)" onclick="">持续时长</a></td>
                                                <td class="task_charge"><a href="javascript:void(0)" onclick="">任务负责人</a></td>
                                                <td class="task_status"><a href="javascript:void(0)" onclick="">任务状态</a></td>
                                            </tr>

                                            <%
                                                if (items != null && items.size() > 0) 
                                                {
                                                    for (Task_Item p : items) {
                                                        User auser = User.getUserById(p.user_id);
                                                        Gson gson = new Gson();
                                                        String data = gson.toJson(p);
                                            %>
                                            <tr id="task_id_<%=p.id%>" data='<%=data%>'>                                        

                                                <td class="nameFile">
                                                    <%
                                                    if (p.type == 1) {%>
                                                    <a id="a_temp_id_<%=p.id%>" href="javascript:void(0);" style="overflow: hidden" onclick="showTaskInfo('<%=p.id%>')"><span class="nameTitle" id="P_Name_<%=p.id%>" value="<%=p.name%>">序号:<%=p.id%>&nbsp;交叉口-流量</span></a>
                                                    <%} else if (p.type == 2) {%>
                                                    <a id="a_temp_id_<%=p.id%>" href="javascript:void(0);" style="overflow: hidden" onclick="showTaskInfo('<%=p.id%>')"><span class="nameTitle" id="P_Name_<%=p.id%>" value="<%=p.name%>">序号:<%=p.id%>&nbsp;路段-流量</span></a>
                                                    <%} else if (p.type == 3) {%>
                                                    <a id="a_temp_id_<%=p.id%>" href="javascript:void(0);" style="overflow: hidden" onclick="showTaskInfo('<%=p.id%>')"><span class="nameTitle" id="P_Name_<%=p.id%>" value="<%=p.name%>">序号:<%=p.id%>&nbsp;信号灯-信号</span></a>
                                                    <%
                                                        }
                                                    %>
                                                </td>
                                                <td class="taskTime">
                                                    <span class="text-muted small timeTitle"><%=p.stime%></span>
                                                </td>
                                                <td class="task_duration">
                                                    <span class="text-muted small timeTitle"><%=p.duration%>分钟</span>
                                                </td>
                                                <td class="task_charge">
                                                    <span class="text-muted small timeTitle"><%=auser.email%></span>
                                                </td>
                                                <td class="task_status">
                                                    <%
                                                    if (p.c_status == 1) {%>
                                                    <button class="button-secondary" onclick="accpetTask('<%=p.id%>')">接受任务</button>&nbsp;<button class="button-secondary" onclick="denyTask('<%=p.id%>')">拒绝任务</button>
                                                    <%}
                                                    if (p.c_status == 2) {%>
                                                    <button class="button-secondary" style="color:lightseagreen">任务进行中</button>&nbsp;<button class="button-secondary" onclick="taskDataInput('<%=p.id%>')">输入数据</button>
                                                    <%}
                                                    if (p.c_status == 4) {%>
                                                    <button class="button-secondary" style="color:red">任务已经完成</button>
                                                    <%}
                                                    if (p.c_status == 3) {%>
                                                    <button class="button-secondary" style="color:darkgoldenrod">任务审核中</button>
                                                    <%}
                                                    if (p.c_status == 6) {%>
                                                    <button class="button-secondary" style="color:darkgoldenrod">任务未按时完成</button>
                                                    <%}
                                                    if (p.c_status == 5) {%>
                                                    <button class="button-secondary" style="color:darkgoldenrod" onclick="showUnPassReason('<%=p.notes%>');">任务审核未通过</button>&nbsp;<button class="button-secondary" onclick="taskDataInput('<%=p.id%>')">输入数据</button>
                                                    <%}%>
                                                    
                                                </td>

                                                <%}
                                                }%>

                                            </tr>
                                        </table>

                                    </div>

                                </div>
                            </div>


                        </div>

                    </div>
                </div>


                <div class="modal fade" id="myModal" role="dialog">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">分享项目--</h4>
                            </div>
                            <div class="modal-body" style="background: #f6f9fc">
                                <span style="font-size:14px;font-weight: bold;margin-left: 5px;">5个用户:</span>
                                <ul class="list-group sharePeopleList" style="margin-left:5px;height:200px;overflow-y: scroll">

                                </ul>
                                <form>
                                    <div class="row" style="background-color:white;border:1px solid gainsboro;margin:5px;">

                                        <div style="" id="shareFormArea">
                                            <div class="form-group" id="shareFormID" style="width: 407px;;">
                                                <input type="text" class="form-control shareInput" id="tokenfield-1" value="" placeholder="输入分享人邮箱" />                             
                                            </div>
                                            <div class="dropdown roleShare">

                                                <select class="form-control shareOption" >
                                                    <option value="0">权限设置</option>
                                                    <option value="1">读写</option>
                                                    <option value="2">只读</option>
                                                    <option value="3">管理员</option>
                                                    <option value="4">项目负责人</option>
                                                    <option value="5">项目甲方</option>
                                                </select>
                                            </div>

                                        </div>
                                        <div style="" class="shareComment1">
                                            <div class="form-group"> 
                                                <textarea class="form-control  shareComment" rows="5" style="height:76px;" placeholder="备注" id="comment"></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row" style="background-color:#f6f9fc;margin:5px;margin-bottom: 0px; margin-top: 10px;">
                                        <div style="text-align: right">
                                            <button type="button" class="btn btn-default shareButtonStyle" onclick="cancelShareDiag();">取消</button>
                                            <button type="button" class="btn btn-default shareButtonStyle" style="background: #428bca;color:white">确定</button>

                                        </div>
                                    </div>
                                </form>


                            </div>
                            <div class="modal-footer">
                                <!--                        <form id="formData" action="" method="post" name="files[]" enctype="multipart/form-data">
                                                            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                                
                                                            <span class="btn btn-primary upbutton">
                                                                <span class="btn btn-primary upname">确定</span>
                                                                <input type="file" class="upinput" multiple name="files[]" onchange="showFileProcess()">            
                                                            </span>
                                                        </form>-->
                            </div>
                        </div>
                    </div>
                </div>


                <!--END MAIN WRAPPER -->

                <!-- FOOTER -->
            </div>
            <!--END FOOTER -->
            <!-- GLOBAL SCRIPTS -->
            <script src="./js/jquery-2.0.3.min.js"></script>
            <script src="./js/jquery-ui.min.js"></script>
            <script src="./js/bootstrap.min.js"></script>
            <script src="./js/bootstrap-tokenfield.js"></script>
            <script type="text/javascript" src="./laydate/laydate.js"></script>
            <script src="./js/mine.js"></script>

            <!-- END PAGE LEVEL SCRIPTS -->

    </body>

    <!-- END BODY -->
</html>


