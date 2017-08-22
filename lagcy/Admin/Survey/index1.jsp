<%-- 
    Document   : index1
    Created on : Oct 3, 2016, 9:33:21 AM
    Author     : zhichengfu
--%>
<%@page import="FileM.Project"%>
<%@page import="Survey.Survey_Project"%>
<%@page import="FileM.User"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <link href="./css/jquery-ui.css" type="text/css" rel="stylesheet">
        <link rel="stylesheet" href="./css/bootstrap.min.css" />
        <link rel="stylesheet" href="./css/bootstrap-tokenfield.css" />
        <link href="./css/font-awesome.min.css" type="text/css" rel="stylesheet">
        <link href="./css/my_fonts/style.css" type="text/css" rel="stylesheet">
        <link rel="stylesheet" href="./css/token-input.css" type="text/css" />
        <link rel="stylesheet" href="./css/token-input-facebook.css" type="text/css" />
        <link rel="stylesheet" href="./css/calendar.css">
        <link rel="stylesheet" href="./css/calendar_full.css">
        <link rel="stylesheet" href="./css/calendar_compact.css">
        <link rel="stylesheet" href="./js/laydate/need/laydate.css">
        <link rel="stylesheet" href="./js/laydate/skins/molv/laydate.css">
        <link rel="stylesheet" href="http://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.css" />
        <!-- Theme style -->
        <link rel="stylesheet" href="./css/AdminLTE.min.css">
        <link rel="stylesheet" href="./css/_all-skins.min.css">
        <link rel="stylesheet" href="./css/blue.css">
        <link rel="stylesheet" href="./css/morris.css">
        <link rel="stylesheet" href="./css/jquery-jvectormap-1.2.2.css">
        <link rel="stylesheet" href="./css/mine.css" />
        <script type="text/javascript" src="./js/jquery-2.0.3.min.js"></script>
        <script type="text/javascript" src="./js/jquery-ui.min.js"></script>
        <script type="text/javascript" src="./js/jquery.cityselect.js"></script>
        <script type="text/javascript" src="./js/bootstrap.min.js"></script>
        <script type="text/javascript" src="./js/jquery.tokeninput.js"></script>
        <script src="./js/morris.min.js"></script>
        <!-- Sparkline -->
        <script src="./js/jquery.sparkline.min.js"></script>
        <!-- jvectormap -->
        <script src="./js/jquery-jvectormap-1.2.2.min.js"></script>
        <script src="./js/jquery-jvectormap-world-mill-en.js"></script>
        <!-- jQuery Knob Chart -->
        <script src="./js/jquery.knob.js"></script>
        <script src="./js/bootstrap3-wysihtml5.all.min.js"></script>
        <!-- Slimscroll -->
        <script src="./js/jquery.slimscroll.min.js"></script>
        <!-- FastClick -->
        <script src="./js/fastclick.min.js"></script>
        <script src="./js/app.min.js"></script>
        <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
        <script type="text/javascript" src="./js/jquery.sortable5.min.js"></script>
        <script type="text/javascript" src="./js/fabric.js"></script>
        <script type="text/javascript" src="./js/randomColor.js"></script>
        <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=21MEGr0gZhVgqGF8VDlX2kjQ"></script>
        <script type="text/javascript" src="./js/BMapLib_DrawingManager.js"></script>

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
        <script type="text/javascript" src="./js/newMine.js"></script>
        <style>
            .token-input-dropdown-facebook
            {
                z-index:100000;
            }

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
            User user = (User) session.getAttribute("user");
            int spid = 0;
            int pid = 0;
            String name = "";
            String address="";
            String stime="";
            String etime="";
            String money="";
            Survey_Project sp = null;
            String city="";
            try {
                pid = Integer.parseInt(request.getParameter("id"));
                if (pid > 0) {
                    String pname = Project.getProjectName(pid);
                    sp = Survey_Project.getProjectByPID(pid);
                    if (sp != null) {
                        name = sp.name;
                        spid = sp.id;
                        stime=sp.stime;
                        etime=sp.etime;
                        money=String.valueOf(sp.budget);
                        address=sp.province+sp.city+sp.town;
                        city=sp.city;
                    } else {
                        name = pname + " (请你先完成此项目的基本信息)";
                    }

                } else {
                    name = "请你创建新的项目";
                }
            } catch (Exception e) {
                name = "请你创建新的项目";
            }
        %>
    </head>
    <body class="hold-transition skin-blue sidebar-mini" id="bodyOne" style="overflow-y:auto" pid="<%=pid%>" spid="<%=spid%>">
        <div class="wrapper">
            <header class="main-header">
                <!-- Logo -->
                <a href="javascript:void(0);" onclick="showSurveyOption(0);" class="logo">
                    <!-- mini logo for sidebar mini 50x50 pixels -->
                    <span class="logo-mini"><b>T</b></span>
                    <!-- logo for regular state and mobile devices -->
                    <span class="logo-lg"><b>Transtopia</span>
                </a>
                <!-- Header Navbar: style can be found in header.less -->
                <nav class="navbar navbar-static-top">
                    <!-- Sidebar toggle button-->
                    <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
                        <span class="sr-only">Toggle navigation</span>
                    </a>
                    <div style="display: inline-block;float:left;margin-left: 10px;position:relative;top:15px;font-size:18px;" id="projectHeadBar">
                        <a href="javascript:void(0);" style="color:white;">项目名称:&nbsp;<span id="sp_title"><%=name%></span>&nbsp;&nbsp;项目时间:&nbsp;<span id="sp_time"><%=stime%>到<%=etime%></span>&nbsp;&nbsp;项目预算:&nbsp;<span id="sp_money"><%=money%>元</span></a>
                    </div>

                    <div class="navbar-custom-menu" style="position:relative;top:8px;">
                        <ul class="nav navbar-nav">
                            <!--                        <div style="text-align: right;width: 500px;display: inline-block;float: right;">-->

                            <!--                            <li style="margin-right: 10px;"><i class="fa fa-folder-o fa-2x my_nav_icon" aria-hidden="true" onclick="getBasciInfoPage(1);" data-toggle="tooltip" data-placement="bottom" title="新建项目"></i></li>-->
                            <li style="margin-right: 10px;width:50px;" id="showMessageDropDown">
                                <i class="fa fa-2x fa-commenting-o my_nav_icon"  aria-hidden="true" data-toggle="dropdown"  data-placement="bottom" title="显示动态消息" id="show_dynamic_message"></i>
                                <span class="label label-danger" id="message_number" style="position:relative;top:-30px;padding-bottom: 2px;padding-top: 2px;padding-left: 8px;padding-right: 8px;left:25px;display:none">0</span>
                                <ul class="dropdown-menu" style="margin-top: 8px; overflow:scroll; width:500px;height:350px;" id="dynamic_message" number="0" numberT="0">
                                </ul>
                            </li>
                            <li style="margin-right: 10px;">
                                <input type="text" placeholder="输入你要搜索的内容" class="inputtext,dropdown-toggle" id="search_text" data-toggle="dropdown" style="height:31px; width: 180px;" onkeypress="doSearchKey(event);">
                                <ul class="dropdown-menu" role="menu" aria-labelledby="search_text" id="ul_searchList" style="left:2px;">
                                </ul>
                                <i class="fa fa-search fa-2x" aria-hidden="true" onclick="doSearch();" style="color: black;background: white;position: relative;top: 4px;left: -30px;"></i>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
            <!-- Left side column. contains the logo and sidebar -->
            <aside class="main-sidebar" style="width:160px;">
                <!-- sidebar: style can be found in sidebar.less -->
                <section class="sidebar">
                    <!-- Sidebar user panel -->
                    <div class="user-panel" style="height:40px;">
                        <!--                        <div class="pull-left image">
                                                    <img src="dist/img/user2-160x160.jpg" class="img-circle" alt="User Image">
                                                </div>-->
                        <div class="pull-left info" style="font-size:18px;left:0px;">
                            <p>欢迎您&nbsp;&nbsp;<%=user.name%></p>
                        </div>
                    </div>
                    <!-- search form -->
                    <!--                    <form action="#" method="get" class="sidebar-form">
                                            <div class="input-group">
                                                <input type="text" name="q" class="form-control" placeholder="Search...">
                                                <span class="input-group-btn">
                                                    <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
                                                    </button>
                                                </span>
                                            </div>
                                        </form>-->
                    <!-- /.search form -->
                    <!-- sidebar menu: : style can be found in sidebar.less -->
                    <ul class="sidebar-menu">
                        <li class="header">导航栏</li>
                        <!--                        <li class="active treeview">
                                                    <a href="#">
                                                        <i class="fa fa-dashboard"></i> <span>Dashboard</span>
                                                        <span class="pull-right-container">
                                                            <i class="fa fa-angle-left pull-right"></i>
                                                        </span>
                                                    </a>
                                                    <ul class="treeview-menu">
                                                        <li class="active"><a href="index.html"><i class="fa fa-circle-o"></i> Dashboard v1</a></li>
                                                        <li><a href="index2.html"><i class="fa fa-circle-o"></i> Dashboard v2</a></li>
                                                    </ul>
                                                </li>-->
                        <!--                        <li class="treeview">
                                                    <a href="#">
                                                        <i class="fa fa-file-o"></i>
                                                        <span>交通项目</span>
                                                        <span class="pull-right-container">
                                                            <small class="label pull-right bg-red-active" id="ptotalsize">0</small>
                                                        </span>
                                                    </a>
                                                    <ul class="treeview-menu">
                                                        <li>
                                                            <a href="javascript:void(0);" onclick="showIntersectionPS();"><i class="fa fa-map-o"></i>
                                                                <span>流量调查项目</span>
                                                                <span class="pull-right-container">
                                                                    <small class="label pull-right bg-blue-active" id="p3size">0</small>
                                                                </span>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="javascript:void(0);" onclick="showSegPS();"><i class="fa  fa-road"></i>
                                                                <span>信号灯配时</span>
                                                                <span class="pull-right-container">
                                                                    <small class="label pull-right bg-yellow-active" id="p4size">0</small>
                                                                </span>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="javascript:void(0);" onclick="showLightPS();"><i class="fa fa-lightbulb-o"></i>
                                                                <span>其他</span>
                                                                <span class="pull-right-container">
                                                                    <small class="label pull-right bg-purple-active" id="p5size">0</small>
                                                                </span>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </li>-->
                        <!--                        <li>
                                                    <a href="pages/widgets.html">
                                                        <i class="fa fa-th"></i> <span>Widgets</span>
                                                        <span class="pull-right-container">
                                                            <small class="label pull-right bg-green">new</small>
                                                        </span>
                                                    </a>
                                                </li>-->
                        <!--                        <li class="treeview">
                                                    <a href="#">
                                                        <i class="fa fa-pie-chart"></i>
                                                        <span>Charts</span>
                                                        <span class="pull-right-container">
                                                            <i class="fa fa-angle-left pull-right"></i>
                                                        </span>
                                                    </a>
                                                    <ul class="treeview-menu">
                                                        <li><a href="pages/charts/chartjs.html"><i class="fa fa-circle-o"></i> ChartJS</a></li>
                                                        <li><a href="pages/charts/morris.html"><i class="fa fa-circle-o"></i> Morris</a></li>
                                                        <li><a href="pages/charts/flot.html"><i class="fa fa-circle-o"></i> Flot</a></li>
                                                        <li><a href="pages/charts/inline.html"><i class="fa fa-circle-o"></i> Inline charts</a></li>
                                                    </ul>
                                                </li>
                                                <li class="treeview">
                                                    <a href="#">
                                                        <i class="fa fa-laptop"></i>
                                                        <span>UI Elements</span>
                                                        <span class="pull-right-container">
                                                            <i class="fa fa-angle-left pull-right"></i>
                                                        </span>
                                                    </a>
                                                    <ul class="treeview-menu">
                                                        <li><a href="pages/UI/general.html"><i class="fa fa-circle-o"></i> General</a></li>
                                                        <li><a href="pages/UI/icons.html"><i class="fa fa-circle-o"></i> Icons</a></li>
                                                        <li><a href="pages/UI/buttons.html"><i class="fa fa-circle-o"></i> Buttons</a></li>
                                                        <li><a href="pages/UI/sliders.html"><i class="fa fa-circle-o"></i> Sliders</a></li>
                                                        <li><a href="pages/UI/timeline.html"><i class="fa fa-circle-o"></i> Timeline</a></li>
                                                        <li><a href="pages/UI/modals.html"><i class="fa fa-circle-o"></i> Modals</a></li>
                                                    </ul>
                                                </li>
                                                <li class="treeview">
                                                    <a href="#">
                                                        <i class="fa fa-edit"></i> <span>Forms</span>
                                                        <span class="pull-right-container">
                                                            <i class="fa fa-angle-left pull-right"></i>
                                                        </span>
                                                    </a>
                                                    <ul class="treeview-menu">
                                                        <li><a href="pages/forms/general.html"><i class="fa fa-circle-o"></i> General Elements</a></li>
                                                        <li><a href="pages/forms/advanced.html"><i class="fa fa-circle-o"></i> Advanced Elements</a></li>
                                                        <li><a href="pages/forms/editors.html"><i class="fa fa-circle-o"></i> Editors</a></li>
                                                    </ul>
                                                </li>
                                                <li class="treeview">
                                                    <a href="#">
                                                        <i class="fa fa-table"></i> <span>Tables</span>
                                                        <span class="pull-right-container">
                                                            <i class="fa fa-angle-left pull-right"></i>
                                                        </span>
                                                    </a>
                                                    <ul class="treeview-menu">
                                                        <li><a href="pages/tables/simple.html"><i class="fa fa-circle-o"></i> Simple tables</a></li>
                                                        <li><a href="pages/tables/data.html"><i class="fa fa-circle-o"></i> Data tables</a></li>
                                                    </ul>
                                                </li>-->
<!--                        <li>
                            <a href="javascript:void(0);" onclick="showSurveyOption(1);">
                                <i class="fa fa-file-text-o"></i> <span>基本信息</span>
                                                                <span class="pull-right-container">                                 
                                                                    <small class="label pull-right bg-fuchsia-active" id="p21size">0</small>
                                                                </span>
                            </a>
                        </li>-->
                        <li>
                            <a href="javascript:void(0);" onclick="showSurveyOption(2);">
                                <i class="icon-icon-survey-tasks"></i> <span>调查内容</span>
                                <!--                                <span class="pull-right-container">                                 
                                                                    <small class="label pull-right bg-olive-active" id="p22size">0</small>
                                                                </span>-->
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" onclick="showSurveyOption(3);">
                                <i class="icon-icon-task-assign"></i> <span>人员分配</span>
                                <!--                                <span class="pull-right-container">                                 
                                                                    <small class="label pull-right bg-green-gradient" id="p23size">0</small>
                                                                </span>-->
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" onclick="showSurveyOption(4);">
                                <i class="icon-icon-summary-schedule"></i> <span>汇总校核</span>
                                <!--                                <span class="pull-right-container">                                 
                                                                    <small class="label pull-right bg-maroon-active" id="p24size">0</small>
                                                                </span>-->
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" onclick="showSurveyOption(5);">
                                <i class="icon-icon-view-results"></i> <span>项目成果</span>
                                <!--                                <span class="pull-right-container">                                 
                                                                    <small class="label pull-right bg-orange-active" id="p25size">0</small>
                                                                </span>-->
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" onclick="showSurveyOption(6)">
                                <i class="icon-icon-help"></i> <span>帮助支持</span>
                                <!--                                <span class="pull-right-container">                                 
                                                                    <small class="label pull-right bg-blue-gradient" id="p26size">0</small>
                                                                </span>-->
                            </a>
                        </li>

                        <!--                        <li>
                                                    <a href="javascript:void(0);" onclick="showDeleteProjectList();">
                                                        <i class="fa fa-trash-o"></i> <span>回收站</span>
                                                        <span class="pull-right-container">                                 
                                                            <small class="label pull-right bg-blue-gradient" id="p100size">0</small>
                                                        </span>
                                                    </a>
                                                </li>-->
                        <!--                        <li>
                                                    <a href="pages/mailbox/mailbox.html">
                                                        <i class="fa fa-envelope"></i> <span>Mailbox</span>
                                                        <span class="pull-right-container">
                                                            <small class="label pull-right bg-yellow">12</small>
                                                            <small class="label pull-right bg-green">16</small>
                                                            <small class="label pull-right bg-red">5</small>
                                                        </span>
                                                    </a>
                                                </li>
                                                <li class="treeview">
                                                    <a href="#">
                                                        <i class="fa fa-folder"></i> <span>Examples</span>
                                                        <span class="pull-right-container">
                                                            <i class="fa fa-angle-left pull-right"></i>
                                                        </span>
                                                    </a>
                                                    <ul class="treeview-menu">
                                                        <li><a href="pages/examples/invoice.html"><i class="fa fa-circle-o"></i> Invoice</a></li>
                                                        <li><a href="pages/examples/profile.html"><i class="fa fa-circle-o"></i> Profile</a></li>
                                                        <li><a href="pages/examples/login.html"><i class="fa fa-circle-o"></i> Login</a></li>
                                                        <li><a href="pages/examples/register.html"><i class="fa fa-circle-o"></i> Register</a></li>
                                                        <li><a href="pages/examples/lockscreen.html"><i class="fa fa-circle-o"></i> Lockscreen</a></li>
                                                        <li><a href="pages/examples/404.html"><i class="fa fa-circle-o"></i> 404 Error</a></li>
                                                        <li><a href="pages/examples/500.html"><i class="fa fa-circle-o"></i> 500 Error</a></li>
                                                        <li><a href="pages/examples/blank.html"><i class="fa fa-circle-o"></i> Blank Page</a></li>
                                                        <li><a href="pages/examples/pace.html"><i class="fa fa-circle-o"></i> Pace Page</a></li>
                                                    </ul>
                                                </li>
                                                <li class="treeview">
                                                    <a href="#">
                                                        <i class="fa fa-share"></i> <span>Multilevel</span>
                                                        <span class="pull-right-container">
                                                            <i class="fa fa-angle-left pull-right"></i>
                                                        </span>
                                                    </a>
                                                    <ul class="treeview-menu">
                                                        <li><a href="#"><i class="fa fa-circle-o"></i> Level One</a></li>
                                                        <li>
                                                            <a href="#"><i class="fa fa-circle-o"></i> Level One
                                                                <span class="pull-right-container">
                                                                    <i class="fa fa-angle-left pull-right"></i>
                                                                </span>
                                                            </a>
                                                            <ul class="treeview-menu">
                                                                <li><a href="#"><i class="fa fa-circle-o"></i> Level Two</a></li>
                                                                <li>
                                                                    <a href="#"><i class="fa fa-circle-o"></i> Level Two
                                                                        <span class="pull-right-container">
                                                                            <i class="fa fa-angle-left pull-right"></i>
                                                                        </span>
                                                                    </a>
                                                                    <ul class="treeview-menu">
                                                                        <li><a href="#"><i class="fa fa-circle-o"></i> Level Three</a></li>
                                                                        <li><a href="#"><i class="fa fa-circle-o"></i> Level Three</a></li>
                                                                    </ul>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                        <li><a href="#"><i class="fa fa-circle-o"></i> Level One</a></li>
                                                    </ul>
                                                </li>-->
                        <!--                        <li><a href="documentation/index.html"><i class="fa fa-book"></i> <span>Documentation</span></a></li>
                                                <li class="header">LABELS</li>
                                                <li><a href="#"><i class="fa fa-circle-o text-red"></i> <span>Important</span></a></li>
                                                <li><a href="#"><i class="fa fa-circle-o text-yellow"></i> <span>Warning</span></a></li>
                                                <li><a href="#"><i class="fa fa-circle-o text-aqua"></i> <span>Information</span></a></li>-->
                    </ul>
                </section>
                <!-- /.sidebar -->
            </aside>

            <!-- Content Wrapper. Contains page content -->
            <div class="content-wrapper" style="overflow-y: scroll;margin-left: 160px;">
                <!-- Main content -->
                <section class="content" style="background:white; padding-left: 2px;padding-right: 2px; overflow-y: scroll;" id="mapShowSection">
                    <div class="map_Section" id="l-map" sid="0" copyid="" style="display:block;"></div>
                    <script type="text/javascript">
                        initMap("<%=address%>","<%=city%>");
                    </script>
                </section>
                <section class="content" style="display:none;min-width: 1800px;padding-left: 4px;overflow-y: scroll;" id="mainSurveyPage" spid="<%=spid%>" pid="<%=pid%>" parentID="0" lat="" lng="">

                </section>
                <!-- /.content -->
            </div>
            <div class="modal fade" id="myModalSurvey" role="dialog">
                <div class="modal-dialog">
                    <div class="modal-content"></div>
                    <div class="modal-footer"></div>
                </div>
            </div>
            <div class="modal fade" id="myFileModal" role="dialog" show="0">
                <div class="modal-dialog">
                    <div class="modal-content"></div>
                    <div class="modal-footer"></div>
                </div>
            </div>
            <!-- /.content-wrapper -->
            <footer class="main-footer" style="margin-left:160px;">
                <div class="pull-right hidden-xs">
                </div>
                <strong>Copyright &copy; 2014-2016 <a href="">Transtopia</a>.</strong> All rights
                reserved.
            </footer>
            <iframe id="download_iframe" style="display:none;"></iframe>

            <script>
                monitorProject();
                loadTaskModelsInfo();
                $("#bodyOne").keydown(function (event) {
                    console.log(event.which);
                    if (event.which === 13) {
                        event.preventDefault();
                    }
                    var flag = $("#nav_tb_map").is(':visible');
                    
                    if (flag)
                    {
                        if (event.which === 27)
                        {
                            escModelMapEdit();
                        }
                    }
                    
                    var isIntersection=$("#intersection_quhua").is(':visible');
                    if(isIntersection)
                    {
                        if (event.which === 27)
                        {
                             enableResetLink();
                             var isMoving=$("#img_result").attr("move");
                        if(isMoving==="1")
                        {
                            $("#img_result").attr("move","0");
                           $("#img_result").css("cursor", "default");
                        }
                        }
                        
                        
                    }
                    
                   

                });
                $.widget.bridge('uibutton', $.ui.button);
            </script>
    </body>
</html>

