<%-- 
    Document   : intersection
    Created on : Nov 14, 2016, 6:07:48 PM
    Author     : zhichengfu
--%>

<%@page import="Survey.Intersection_Project"%>
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
        <!-- Theme style -->
        <link rel="stylesheet" href="./css/AdminLTE.min.css">
        <link rel="stylesheet" href="./css/_all-skins.min.css">
        <link rel="stylesheet" href="./css/blue.css">
        <link rel="stylesheet" href="./css/morris.css">
        <link rel="stylesheet" href="./css/jquery-jvectormap-1.2.2.css">
        <link rel="stylesheet" href="./css/mine.css" />
        <script type="text/javascript" src="./js/jquery-2.0.3.min.js"></script>
        <script type="text/javascript" src="./js/jquery-ui.min.js"></script>
        <script type="text/javascript" src="./js/iconselect.js"></script>
        <!--        <script type="text/javascript" src="./js/iscroll.js"></script>-->
        <script type="text/javascript" src="./js/jquery.cityselect.js"></script>
        <script type="text/javascript" src="./js/bootstrap.min.js"></script>
        <script type="text/javascript" src="./js/jquery.tokeninput.js"></script>
        <script src="./js/morris.min.js"></script>
        <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=21MEGr0gZhVgqGF8VDlX2kjQ"></script>
        <script type="text/javascript" src="./js/BMapLib_DrawingManager.js"></script>
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
        <script type="text/javascript" src="./js/jquery.sortable5.min.js"></script>
        <script type="text/javascript" src="./js/fabric.js"></script>
        <script type="text/javascript" src="./js/randomColor.js"></script>
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

            .canvas-container {
                border: 1px solid lightgray;
                position: relative;
                top: 40px;
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
            String address="";
            String city="";
            Intersection_Project ip=null;
            int id=0;
            String name="请创建新的项目";
            try
            {
                id=Integer.parseInt(request.getParameter("id"));
                if(id!=0)
                {
                    ip=Intersection_Project.getProjectByPID(id);
                    address=ip.province+ip.city+ip.town;
                    city=ip.city;
                    name=ip.name;
                }
            }catch(Exception e)
            {
                
            }
        %>
        <title>交叉口渠化:<%=name%></title>
    </head>
    <body class="hold-transition skin-blue sidebar-mini" id="bodyOne" style="overflow-y:auto" >
        <div class="wrapper">
            <header class="main-header">
                <!-- Logo -->
                <a href="javascript:void(0);" class="logo">
                    <!-- mini logo for sidebar mini 50x50 pixels -->
                    <span class="logo-mini"><b>设计</b></span>
                    <!-- logo for regular state and mobile devices -->
                    <span class="logo-lg" style="font-size:18px;"><b>交叉口设计草绘</span>
                </a>
                <!-- Header Navbar: style can be found in header.less -->
                <nav class="navbar navbar-static-top">
                    <!-- Sidebar toggle button-->
                    <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
                        <span class="sr-only">Toggle navigation</span>
                    </a>
                    <div style="display: inline-block;float:left;margin-left: 10px;position:relative;top:10px;font-size:18px;" id="projectHeadBar">
                    <a href="javascript:void(0);" style="color:white;">项目名称:&nbsp;<span id="sp_title"><%=name%></span></a>
                    
                    </div>

                    <div class="navbar-custom-menu" style="position:relative;top:8px;">
                        <ul class="nav navbar-nav">
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
                        <li>
                            <a href="javascript:void(0);">
                                <i class="icon-icon-survey-tasks"></i> <span>项目信息</span>
                                <!--                                <span class="pull-right-container">                                 
                                                                    <small class="label pull-right bg-olive-active" id="p22size">0</small>
                                                                </span>-->
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0);">
                                <i class="icon-icon-survey-tasks"></i> <span>项目地图</span>
                                <!--                                <span class="pull-right-container">                                 
                                                                    <small class="label pull-right bg-olive-active" id="p22size">0</small>
                                                                </span>-->
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0);">
                                <i class="icon-icon-task-assign"></i> <span>帮助和支持</span>
                                <!--                                <span class="pull-right-container">                                 
                                                                    <small class="label pull-right bg-green-gradient" id="p23size">0</small>
                                                                </span>-->
                            </a>
                        </li>
                    </ul>
                </section>
                <!-- /.sidebar -->
            </aside>

            <!-- Content Wrapper. Contains page content -->
            <div class="content-wrapper" style="overflow-y: scroll;margin-left: 160px;">
                <section class="content" style="display: block;background:white; padding-left: 2px;padding-right: 2px; overflow-y: scroll;" id="mapShowSection">
                    <div class="map_Section" id="l-map" sid="0" copyid="" style="display:block;"></div>
                    
                </section>
                <section class="content" style="display:none; min-width: 1800px;padding-left: 4px;overflow-y: scroll;" id="mainSurveyPage" pid="0" parentID="0">

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
                showIntersection("<%=address%>", "<%=city%>");                       
                
                $.widget.bridge('uibutton', $.ui.button);
            </script>
    </body>
</html>

