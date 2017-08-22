<%-- 
    Document   : showContent
    Created on : Sep 7, 2016, 12:59:46 AM
    Author     : zhichengfu
--%>
<%@page import="FileM.User"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <!-- Tell the browser to be responsive to screen width -->
        <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
        <!-- Bootstrap 3.3.6 -->
        <link rel="stylesheet" href="./css/bootstrap.css" />
        <link rel="stylesheet" href="./css/bootstrap-tokenfield.css" />
        <link href="./css/font-awesome.min.css" type="text/css" rel="stylesheet">
        <link href="./css/my_fonts/style.css" type="text/css" rel="stylesheet">
        <link rel="stylesheet" href="./css/token-input.css" type="text/css" />
        <link rel="stylesheet" href="./css/token-input-facebook.css" type="text/css" />
        <!-- Theme style -->
        <link rel="stylesheet" href="./css/AdminLTE.min.css">
        <!-- AdminLTE Skins. Choose a skin from the css/skins
             folder instead of downloading all of them to reduce the load. -->
        <link rel="stylesheet" href="./css/_all-skins.min.css">
        <!-- iCheck -->
        <link rel="stylesheet" href="./css/blue.css">
        <!-- Morris chart -->
        <link rel="stylesheet" href="./css/morris.css">
        <!-- jvectormap -->
        <link rel="stylesheet" href="./css/jquery-jvectormap-1.2.2.css">
        <link rel="stylesheet" href="./css/mine.css" />
        <style>
            .token-input-dropdown-facebook
            {
                z-index:100000;
            }
        </style>
        <%
            User user = (User) session.getAttribute("user");
        %>
    </head>
    <body class="hold-transition skin-blue sidebar-mini" id="bodyOne" style="overflow-y:hidden">
        <div class="wrapper">
            <header class="main-header">
                <!-- Logo -->
                <a href="javascript:void(0);" onclick="updatePage('0', '0', '');" class="logo" style="border-bottom: 1px solid gray;">
                    <!-- mini logo for sidebar mini 50x50 pixels -->
                    <span class="logo-mini"><b>G</b></span>
                    <!-- logo for regular state and mobile devices -->
                    <span class="logo-lg"><b>已使用 0 MB/300MB (0.00%)</span>
                </a>
                <!-- Header Navbar: style can be found in header.less -->
                <nav class="navbar navbar-static-top">
                    <!-- Sidebar toggle button-->
                    <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
                        <span class="sr-only">Toggle navigation</span>
                    </a>
                    <div style="display: inline-block;float:left;margin-left: 10px;position:relative;top:15px;font-size:18px;" id="projectHeadBar">
                    </div>

                    <div class="navbar-custom-menu" style="position:relative;top:8px;">
                        <ul class="nav navbar-nav">
                            <!--                        <div style="text-align: right;width: 500px;display: inline-block;float: right;">-->
                            <li style="margin-right: 10px;"><i class="icon-icon-upload my_nav_icon"  style="font-size:20px;" id="uploadIcon" aria-hidden="true" onclick="showLoadFile();" data-toggle="tooltip" data-placement="bottom" title="上传文件"></i></li>
                            <li style="margin-right: 10px;"><i class="icon-icon-newfolder my_nav_icon" style="font-size:20px;" aria-hidden="true" onclick="createProjectFolder();" data-toggle="tooltip" data-placement="bottom" title="新建文件夹"></i></li>
                            <li style="margin-right: 10px;"><i class="icon-icon-newfile my_nav_icon" style="font-size:20px;"  aria-hidden="true" onclick="createProject();" data-toggle="tooltip" data-placement="bottom" title="新建项目"></i></li>
                            <li style="margin-right: 10px;"><i class="fa fa-2x fa-recycle my_nav_icon" style="font-size:20px;" aria-hidden="true" onclick="clearTrashOut();" data-toggle="tooltip" data-placement="bottom" title="清空回收站"></i></li>

                            <li style="margin-right: 10px;width:50px;" id="showMessageDropDown">
                                <i class="fa fa-2x fa-commenting-o my_nav_icon"  style="font-size:20px;" aria-hidden="true" data-toggle="dropdown"  data-placement="bottom" title="显示动态消息" id="show_dynamic_message"></i>
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
            <aside class="main-sidebar">
                <!-- sidebar: style can be found in sidebar.less -->
                <section class="sidebar">
                    <ul class="sidebar-menu">
                        <li class="treeview">
                            <a href="#">
                                <i class="icon-icon-project-files" style="margin-right:6px;"></i>
                                <span>项目文件</span>
                                <span class="pull-right-container">
                                    <small class="label pull-right bg-red-active" id="ptotalsize">0</small>
                                </span>
                            </a>
                            <ul class="treeview-menu">
                                <li>
                                    <a href="javascript:void(0);" onclick="showIntersectionPS();"><i class="icon-icon-traffic-counts"></i>
                                        <span>流量调查</span>
                                        <span class="pull-right-container">
                                            <small class="label pull-right bg-blue-active" id="p3size">0</small>
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:void(0);" onclick="showLightPS();"><i class="icon-icon-traffic-counts"></i>
                                        <span>交通问卷调查</span>
                                        <span class="pull-right-container">
                                            <small class="label pull-right bg-purple-active" id="p5size">0</small>
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:void(0);" onclick="showSegPS();"><i class="icon-icon-traffic-counts"></i>
                                        <span>交叉口设计与配时</span>
                                        <span class="pull-right-container">
                                            <small class="label pull-right bg-yellow-active" id="p4size">0</small>
                                        </span>
                                    </a>
                                </li>
                                
                                <li>
                                    <a href="javascript:void(0);" onclick="showLightPS();"><i class="icon-icon-traffic-sim"></i>
                                        <span>交通仿真</span>
                                        <span class="pull-right-container">
                                            <small class="label pull-right bg-purple-active" id="p5size">0</small>
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:void(0);" onclick="showSegPS();"><i class="icon-icon-crosssection"></i>
                                        <span>道路横断面设计</span>
                                        <span class="pull-right-container">
                                            <small class="label pull-right bg-yellow-active" id="p4size">0</small>
                                        </span>
                                    </a>
                                </li>
                                
                            </ul>
                        </li>
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
                        <li>
                            <a href="javascript:void(0);" onclick="showTextPS();">
                                <i class="fa fa-file-text-o"></i> <span>文本文件</span>
                                <span class="pull-right-container">                                 
                                    <small class="label pull-right bg-fuchsia-active" id="p21size">0</small>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" onclick="showImagePS();">
                                <i class="fa fa-file-image-o"></i> <span>图片文件</span>
                                <span class="pull-right-container">                                 
                                    <small class="label pull-right bg-olive-active" id="p22size">0</small>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" onclick="showPDFPS();">
                                <i class="fa fa-file-pdf-o"></i> <span>PDF文件</span>
                                <span class="pull-right-container">                                 
                                    <small class="label pull-right bg-green-gradient" id="p23size">0</small>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" onclick="showWordPS();">
                                <i class="fa fa-file-word-o"></i> <span>Word文件</span>
                                <span class="pull-right-container">                                 
                                    <small class="label pull-right bg-maroon-active" id="p24size">0</small>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" onclick="showExcelPS();">
                                <i class="fa fa-file-excel-o"></i> <span>Excel文件</span>
                                <span class="pull-right-container">                                 
                                    <small class="label pull-right bg-orange-active" id="p25size">0</small>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" onclick="showPPTPS();">
                                <i class="fa fa-file-powerpoint-o"></i> <span>PPT文件</span>
                                <span class="pull-right-container">                                 
                                    <small class="label pull-right bg-blue-gradient" id="p26size">0</small>
                                </span>
                            </a>
                        </li>

                        <li>
                            <a href="javascript:void(0);" onclick="showDeleteProjectList();">
                                <i class="fa fa-trash-o"></i> <span>回收站</span>
                                <span class="pull-right-container">                                 
                                    <small class="label pull-right bg-blue-gradient" id="p100size">0</small>
                                </span>
                            </a>
                        </li>
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
            <div class="content-wrapper" style="height:640px;overflow-y: scroll;">
                <!-- Main content -->
                <section class="content" style="background:white;" id="allProjectSection" ppid="0">

                </section>
                <!-- /.content -->
            </div>
            <div class="modal fade" id="myModal" role="dialog">
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
            <footer class="main-footer">
                <div class="pull-right hidden-xs">
                </div>
                <strong>Copyright &copy; 2014-2016 <a href="">Transtopia</a>.</strong> All rights
                reserved.
            </footer>
            <iframe id="download_iframe" style="display:none;"></iframe>


            <script src="./js/jquery-2.0.3.min.js"></script>
            <script src="./js/jquery-ui.min.js"></script>
            <script src="./js/bootstrap.min.js"></script>
            <script type="text/javascript" src="./js/jquery.tokeninput.js"></script>

            <script>
                                $.widget.bridge('uibutton', $.ui.button);
            </script>
            <script type="text/javascript" src="./js/jquery.cityselect.js"></script>
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
            <!-- AdminLTE App -->
            <script src="./js/app.min.js"></script>
            <script src="./js/mine.js"></script>
            <script type="text/javascript">
                                updatePage(0, 0, "");
                                monitorMessageUpdate();
                                $('#showMessageDropDown').on('shown.bs.dropdown', function () {
                                    $("#message_number").text(0);
                                    $("#message_number").hide();
                                    var size = $("#dynamic_message").attr("numberT");
                                    $("#dynamic_message").attr("number", size);
                                });
            </script>
    </body>
</html>

