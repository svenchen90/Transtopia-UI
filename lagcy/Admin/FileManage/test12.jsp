<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<%-- 
    Document   : showContent
    Created on : Sep 7, 2016, 12:59:46 AM
    Author     : zhichengfu
--%>
<%@page import="FileM.Pinfo"%>
<%@page import="FileM.PathD"%>
<%@page import="FileM.Path"%>
<%@page import="FileM.Project"%>
<%@page import="java.util.LinkedList"%>
<%@page import="FileM.User"%>
<%@page import="Tools.Others"%>
<%@page import="FileM.Project"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>AdminLTE 2 | Dashboard</title>
        <!-- Tell the browser to be responsive to screen width -->
        <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
        <!-- Bootstrap 3.3.6 -->
        <link rel="stylesheet" href="./css/bootstrap.css" />
        <link rel="stylesheet" href="./css/bootstrap-tokenfield.css" />
        <link href="./css/font-awesome.min.css" type="text/css" rel="stylesheet">
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
            LinkedList<Project> pjs = null;
            LinkedList<Project> pjsa = null;
            LinkedList<Project> dps = null;
            LinkedList<Project> sps = null;
            LinkedList<Project> aps = null;
            LinkedList<Project> allps = null;
             LinkedList<Project> allts = null;
            String keyw = "";
            //int sp_size = 0, total_size = 0, d_size = 0;
            int parentID = 0;
            int showOP = 0;
            try {
                parentID = Integer.parseInt(request.getParameter("ppid"));
                pjs = Project.getProjectByUserID_PrantID(parentID, user.id);
            } catch (Exception e) {
            }
            try {
                showOP = Integer.parseInt(request.getParameter("showop"));
            } catch (Exception e) {

            }
            Pinfo pinfo=Pinfo.getInstanceOfPINFO(user.id);
            if (showOP == 0) {
                if (parentID == 0) {
                    allps = Project.getALLProjectByUserID(user.id);
                    aps = allps;
                } else {
                    aps = pjs;
                }

            }
            else if (showOP == 4) {
                sps = Project.getProjectByUserID_Type(4, user.id);
                aps = sps;
            }
            else if (showOP == 5) {
                sps = Project.getProjectByUserID_Type(5, user.id);
                aps = sps;
            }else if (showOP == 3) {
                sps = Project.getProjectByUserID_Type(3, user.id);
                aps = sps;
            } else if (showOP == -1) {
                dps = Project.getDeleteALLCanProjectByUserID(user.id);
                aps = dps;
            }else if (showOP == 100) //searching file by keyword
            {
                keyw = request.getParameter("keyword");
                aps = Project.getProjectByUserID_Name(keyw, user.id);
            }
             else if (showOP == 21||showOP == 22||showOP == 23||showOP == 24||showOP == 25||showOP == 26) {
                allts = Project.getALLProjectByUserIDAndNameType(user.id, showOP);
                aps = allts;
            }
            String tcotent = "";

        %>
    </head>
    <body class="hold-transition skin-blue sidebar-mini" id="bodyOne" style="overflow-y:hidden">
        <div class="wrapper">

            <header class="main-header">
                <!-- Logo -->
                <a href="index.jsp" class="logo">
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
                        <%                                    if (showOP != 2 && showOP != 4) {
                                LinkedList<PathD> pd = Project.getProjectPPath(parentID, user.id);
                                if (pd != null && pd.size() > 0) {
                                    for (PathD d : pd) {
                                        if (tcotent.equals("")) {
                                            if (d.id == 0) {
                                                tcotent = "<a href='index.jsp' style='color:white;'>" + d.name + "</a>" + tcotent;
                                            } else {
                                                tcotent = "<a href='index.jsp?ppid=" + d.id + "' style='color:white;'>" + d.name + "</a>" + tcotent;
                                            }
                                            //tcotent="<a href='index.jsp?ppid='"+d.id+"'>"+d.name+"</a>"+tcotent;
                                        } else {
                                            if (d.id == 0) {
                                                tcotent = "<a href='index.jsp' style='color:white;'>" + d.name + "</a>" + "&nbsp;>>" + "&nbsp;" + tcotent;
                                            } else {
                                                tcotent = "<a href='index.jsp?ppid=" + d.id + "' style='color:white;'>" + d.name + "</a>" + "&nbsp;>>" + "&nbsp;" + tcotent;
                                            }

                                        }

                                    }
                                } else {
                                    tcotent = "<a href='index.jsp' style='color:white;'>Transtopia</a>";
                                }
                            } else if (showOP == 4) {
                                tcotent = "<a href='index.jsp' style='color:white;'>Transtopia</a>&nbsp;>>&nbsp;" + "查询&nbsp;\"" + keyw + "\"";
                            } else if (showOP == 2) {
                                tcotent = "<a href='index.jsp' style='color:white;'>Transtopia</a>&nbsp;>>&nbsp;" + "<a href='javascript:void(0);' style='color:white;'>回收站</a>";
                            }

                        %>
                        <%=tcotent%>
                    </div>
                    <div class="navbar-custom-menu">
                        
                    <div style="text-align: right;width: 500px;display: inline-block;float: right;">
                        <i class="fa fa-cloud-upload fa-2x my_nav_icon" style="color:white;" aria-hidden="true" onclick="showLoadFile('<%=parentID%>');" data-toggle="tooltip" data-placement="bottom" title="上传文件"></i>&nbsp;&nbsp
                        <i class="fa fa-folder-o fa-2x my_nav_icon" style="color:white;" aria-hidden="true" onclick="createProjectFolder('<%=parentID%>');" data-toggle="tooltip" data-placement="bottom" title="新建文件夹"></i>&nbsp;&nbsp
                        <i class="fa fa-file fa-2x my_nav_icon" style="color:white;" aria-hidden="true" onclick="createProject('<%=parentID%>');" data-toggle="tooltip" data-placement="bottom" title="新建项目"></i>&nbsp;&nbsp
                        <i class="fa fa-2x fa-recycle my_nav_icon" style="color:white;" aria-hidden="true" onclick="clearTrashOut();" data-toggle="tooltip" data-placement="bottom" title="清空回收站"></i>
                        <form class="quick-form dropdown" id="searchResults">
                            <input type="text" placeholder="输入你要搜索的内容" class="inputtext,dropdown-toggle" id="search_text" data-toggle="dropdown" style="height:31px; width: 180px;">
                            <ul class="dropdown-menu" role="menu" aria-labelledby="search_text" id="ul_searchList" style="left:40px;">
                            </ul>
                            <i class="fa fa-search fa-2x" aria-hidden="true" onclick="doSearch();" style="color: black;background: white;position: relative;top: 4px;left: -30px;"></i>
                        </form>
                    </div>
                    </div>
                </nav>
            </header>
            <!-- Left side column. contains the logo and sidebar -->
            <aside class="main-sidebar">
                <!-- sidebar: style can be found in sidebar.less -->
                <section class="sidebar">
                    <!-- Sidebar user panel -->
                    <div class="user-panel" style="height:40px;">
<!--                        <div class="pull-left image">
                            <img src="dist/img/user2-160x160.jpg" class="img-circle" alt="User Image">
                        </div>-->
                        <div class="pull-left info" style="font-size:18px;left:0px;">
                            <p>欢迎您&nbsp;&nbsp;<%=user.name%></p>
<!--                            <a href="#"><%=user.name%></a>-->
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
                        <li class="treeview">
                            <a href="#">
                                <i class="fa fa-file-o"></i>
                                <span>全部项目</span>
                                <span class="pull-right-container">
                                     <small class="label pull-right bg-red-active" id="ptotalsize"><%=pinfo.total_p_size%></small>
                                </span>
                            </a>
                            <ul class="treeview-menu">
                                <li>
                                    <a href="javascript:void(0);" onclick="showIntersectionPS();"><i class="fa fa-map-o"></i>
                                        <span>流量调查项目</span>
                                        <span class="pull-right-container">
                                            <small class="label pull-right bg-blue-active" id="p3size"><%=pinfo.intersection_size%></small>
                                        </span>
                                    </a>
                                </li>
                                 <li>
                                    <a href="javascript:void(0);" onclick="showSegPS();"><i class="fa  fa-road"></i>
                                        <span>信号灯配时</span>
                                        <span class="pull-right-container">
                                            <small class="label pull-right bg-yellow-active" id="p4size"><%=pinfo.seg_size%></small>
                                        </span>
                                    </a>
                                </li>
                                 <li>
                                    <a href="javascript:void(0);" onclick="showLightPS();"><i class="fa fa-lightbulb-o"></i>
                                        <span>其他</span>
                                        <span class="pull-right-container">
                                            <small class="label pull-right bg-purple-active" id="p5size"><%=pinfo.light_size%></small>
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
                                    <small class="label pull-right bg-fuchsia-active" id="p21size"><%=pinfo.text_size%></small>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" onclick="showImagePS();">
                                <i class="fa fa-file-image-o"></i> <span>图片文件</span>
                                <span class="pull-right-container">                                 
                                    <small class="label pull-right bg-olive-active" id="p22size"><%=pinfo.image_size%></small>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" onclick="showPDFPS();">
                                <i class="fa fa-file-pdf-o"></i> <span>PDF文件</span>
                                <span class="pull-right-container">                                 
                                    <small class="label pull-right bg-green-gradient" id="p23size"><%=pinfo.pdf_size%></small>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" onclick="showWordPS();">
                                <i class="fa fa-file-word-o"></i> <span>Word文件</span>
                                <span class="pull-right-container">                                 
                                    <small class="label pull-right bg-maroon-active" id="p24size"><%=pinfo.word_size%></small>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" onclick="showExcelPS();">
                                <i class="fa fa-file-excel-o"></i> <span>Excel文件</span>
                                <span class="pull-right-container">                                 
                                    <small class="label pull-right bg-orange-active" id="p25size"><%=pinfo.excel_size%></small>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" onclick="showPPTPS();">
                                <i class="fa fa-file-powerpoint-o"></i> <span>PPT文件</span>
                                <span class="pull-right-container">                                 
                                    <small class="label pull-right bg-blue-gradient" id="p26size"><%=pinfo.ppt_size%></small>
                                </span>
                            </a>
                        </li>
                        
                        <li>
                            <a href="javascript:void(0);" onclick="showDeleteProjectList();">
                                <i class="fa fa-trash-o"></i> <span>回收站</span>
                                <span class="pull-right-container">                                 
                                    <small class="label pull-right bg-blue-gradient" id="p100size"><%=pinfo.d_size%></small>
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
                <section class="content" style="background:white;">


                    <table class="table table-condensed" id="allProjectList">
                        <tr>
                            <th class="f_table_th_1 f_table_th f_table_thc"  style="vertical-align: middle;padding: 10px;">项目名称</th>
                            <th class="f_table_th_2 f_table_th f_table_thc"  style="vertical-align: middle;padding: 10px;">修改时间</th>
                            <th class="f_table_th_3 f_table_th f_table_thc"  style="vertical-align: middle;padding: 10px;">创建人</th>
                             <%
                                                    if (showOP != -1) {%>
                                            <th class="f_table_th_3 f_table_th"  style="vertical-align: middle;padding: 10px;">分享人员</th>
                                                <%}%>
                            <th class="f_table_th_4 f_table_th" style="vertical-align: middle;padding: 10px;" id="f_opreation">项目操作</th>
                        </tr>
                        <%
                            if (aps != null && aps.size() > 0) {
                                for (Project p : aps) {
                        %>
                        <tr id="project_item_<%=p.id%>" onmouseover="showFileOperation('<%=p.id%>')" onmouseleave="fadeFileOperation('<%=p.id%>');" >
                            <td class="f_table_th_1 f_table_td" style="vertical-align: middle;padding: 10px;">
                                <%if (p.type == 1) {%>
                                <a id="a_temp_id_<%=p.id%>" href="index.jsp?ppid=<%=p.id%>" style="overflow: hidden" >
                                    <%if (p.users != null && p.users.size() > 1) {%>
<!--                                    <img class="fileImage" src="./img/sm/share.jpg" alt="file">-->
                                    <i class="fa fa-share-square-o fa-2x  my_nav1_icon" aria-hidden="true"></i>
                                    <%} else {%>
<!--                                    <img class="fileImage" src="./img/sm/folder.jpg" alt="file">-->
                                    <i class="fa fa-folder-o fa-2x  my_nav1_icon" aria-hidden="true"></i>
                                    <%}
                                    } else if (p.type == 2) {%>
                                    <a id="a_temp_id_<%=p.id%>" target="_blank" href="showPage.jsp?path=../../../<%=Path.fPath%>/<%=p.path%>/<%=p.parentID%><%=p.name%>" style="overflow: hidden" >
                                        <%
                                            if (p.fileType() == 0) {%>
                                        <!--                                                        <img class="fileImage" src="./img/sm/none.jpg" alt="file">-->
                                        <i class="fa fa-file-o fa-2x  my_nav1_icon" aria-hidden="true"></i>
                                        <%} else if (p.fileType() == 1) {%>
                                        <!--                                                        <img class="fileImage" src="./img/sm/txt.jpg" alt="file">-->
                                        <i class="fa fa-file-text-o fa-2x  my_nav1_icon" aria-hidden="true"></i>
                                        <%} else if (p.fileType() == 2) {%>
                                        <!--                                                        <img class="fileImage" src="./img/sm/image.jpg" alt="file">-->
                                        <i class="fa fa-file-image-o fa-2x  my_nav1_icon" aria-hidden="true"></i>
                                        <%} else if (p.fileType() == 3) {%>
                                        <!--                                                        <img class="fileImage" src="./img/sm/pdf.jpg" alt="file">-->
                                        <i class="fa fa-file-pdf-o fa-2x  my_nav1_icon" aria-hidden="true"></i>
                                        <%} else if (p.fileType() == 4) {%>
                                        <!--                                                        <img class="fileImage" src="./img/sm/word.jpg" alt="file">-->
                                        <i class="fa fa-file-word-o fa-2x  my_nav1_icon" aria-hidden="true"></i>
                                        <%} else if (p.fileType() == 5) {%>
                                        <!--                                                        <img class="fileImage" src="./img/sm/ppt.jpg" alt="file">-->
                                        <i class="fa fa-file-powerpoint-o fa-2x  my_nav1_icon" aria-hidden="true"></i>
                                        <%} else if (p.fileType() == 6) {%>
                                        <!--                                                        <img class="fileImage" src="./img/sm/excel.jpg" alt="file">-->
                                        <i class="fa fa-file-excel-o fa-2x  my_nav_icon" aria-hidden="true"></i>
                                        <%}
                                        } else if (p.type == 3) {%>
                                        <a id="a_temp_id_<%=p.id%>" onclick="window.parent.cnewTag(2, '<%=p.id%>', '<%=p.name%>')"  href="javascript:void(0);" style="overflow: hidden">
                                            <!--                                                            <img class="fileImage" src="./img/sm/survey.jpg" alt="file">-->
                                            <i class="fa fa-map-o fa-2x  my_nav1_icon" aria-hidden="true"></i>
                                            <%}%>

                                            <span class="nameTitle" id="P_Name_<%=p.id%>" value="<%=p.name%>"><%=p.name%></span>
                                        </a>
                                        </td>
                                        <td class="f_table_th_2 f_table_td" style="vertical-align: middle;padding: 10px;">
                                            <span class="text-muted small timeTitle"><%=p.time%></span>
                                        </td>
                                        <td class="f_table_th_3 f_table_td" style="vertical-align: middle;padding: 10px;">
                                            <span class="text-muted small timeTitle"><%=User.getUserName(p.userid)%></span>
                                        </td>
                                        <%
                                            if (showOP != -1) 
                                        {%>
                                        <td class="f_table_th_3 f_table_td" id="<%=p.id%>_shareArea" style="vertical-align: middle;padding: 10px;">
                                            <%int abbSize = 0;
                                                if (p.users != null && p.users.size() > 1) {
                                                    int size = p.users.size();
                                                    for (User u : p.users) {
                                                        if (u.id != user.id && abbSize < 3) {
                                                            abbSize++;
                                            %>
                                            <div class="c-avatar--no-img c-avatar--circle c-avatar c-avatar--s" id="pp_<%=u.id%>_share" style="color:hsl(<%=Others.getRandomNumber()%>, 60%, 53%);"><%=Others.getAbbName(u.name)%></div>
                                            <%}
                                                }
                                                size = size - abbSize;
                                                if (size > 0) {%>
                                            <div class="overflow-pill c-avatar--meta c-avatar c-avatar--s" id="share_size_<%=p.id%>" size="<%=size%>"> +<%=size%> </div>
                                            <% }
                                            %>
                                        </td>
                                        <%}
                                        }%>
                                        <td class="f_table_th_4 f_table_td" id="<%=p.id%>_opreation" style="vertical-align: middle;padding: 10px;">
                                            <div id="project_item_operation_<%=p.id%>" style="display:none;">
                                                <%  if (showOP != -1) {%>
                                                <i class="fa fa-users fa-2x my_i_icon" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="分享" id="file<%=p.id%>_button" items="" onclick="showShareFolderAction('<%=p.id%>', '<%=user.id%>')" ></i>&nbsp;&nbsp; 
                                                <%
                                                    if (p.role == 3 || p.userid == user.id) {%>
                                                <i class="fa fa-pencil-square-o fa-2x my_i_icon" aria-hidden="true"  data-toggle="tooltip" data-placement="bottom" title="重命名" onclick="renameProject('<%=p.id%>', '<%=p.name%>')" ></i>&nbsp;&nbsp;

                                                <%}
                                                    if (p.role == 3) 
                                                 {%>
                                                <i class="fa fa-files-o fa-2x my_i_icon" aria-hidden="true" onclick="showProjectListDiagCopy('<%=p.id%>')"  data-toggle="tooltip" data-placement="bottom" title="复制"></i>&nbsp;&nbsp;
                                                <i class="fa fa-arrows fa-2x my_i_icon" aria-hidden="true" onclick="showProjectListDiag('<%=p.id%>')"  data-toggle="tooltip" data-placement="bottom" title="移动"></i>&nbsp;&nbsp;
                                                <i class="fa fa-trash fa-2x my_i_icon" aria-hidden="true" onclick="deleteFile('<%=p.id%>')" data-toggle="tooltip" data-placement="bottom" title="删除"></i>
                                                <% }
                                                } 
                                             else {%>
                                                <i class="fa fa-undo fa-2x my_i_icon" aria-hidden="true" onclick="restoreAction('<%=p.id%>')" data-toggle="tooltip" data-placement="bottom" title="还原"></i>&nbsp;&nbsp;<i class="fa fa-trash-o fa-2x my_i_icon"  aria-hidden="true" onclick="clearProejctItem('<%=p.id%>')" data-toggle="tooltip" data-placement="bottom" title="清空"></i>
                                                <%}
                                                %>
                                            </div>
                                        </td>
                                        </tr>
                                        <%
                                                }
                            }
                                            
                                        %>
                                        </table>


                                        </section>
                                        <!-- /.content -->
                                        </div>
                                        <div class="modal fade" id="myModal" role="dialog">
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


                                        <script src="./js/jquery-2.0.3.min.js"></script>
                                        <script src="./js/jquery-ui.min.js"></script>
                                        <script src="./js/bootstrap.min.js"></script>
                                        <script type="text/javascript" src="./js/jquery.tokeninput.js"></script>

                                        <script>
                                                    $.widget.bridge('uibutton', $.ui.button);
                                        </script>

                                        <script src="./js/morris.min.js"></script>
                                        <!-- Sparkline -->
                                        <script src="./js/jquery.sparkline.min.js"></script>
                                        <!-- jvectormap -->
                                        <script src="./js/jquery-jvectormap-1.2.2.min.js"></script>
                                        <script src="./js/jquery-jvectormap-world-mill-en.js"></script>
                                        <!-- jQuery Knob Chart -->
                                        <script src="./js/jquery.knob.js"></script>
                                        <!-- Slimscroll -->
                                        <script src="./js/jquery.slimscroll.min.js"></script>
                                        <!-- FastClick -->
                                        <script src="./js/fastclick.js"></script>
                                        <!-- AdminLTE App -->
                                        <script src="./js/app.min.js"></script>
                                        <!-- AdminLTE dashboard demo (This is only for demo purposes) -->
                                        <script src="./js/dashboard.js"></script>
                                        <!-- AdminLTE for demo purposes -->
                                        <script src="./js/demo.js"></script>
                                        <script src="./js/mine.js"></script>
                                        <script type="text/javascript">
                                                    //               $('#search_text').bind('input', function (e) {
                                                    //                   doSearch1(e.keyCode);
                                                    //               });

                                                    $("#search_text").keyup(function (event) {
                                                        if (event.which === 13) {
                                                            doSearch();
                                                        }
                                                        else
                                                        {
                                                            doSearch1();
                                                        }
                                                    });
                                                    $('.f_table_thc').click(function () {
                                                        var table = $(this).parents('table').eq(0)
                                                        var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()))
                                                        this.asc = !this.asc
                                                        if (!this.asc) {
                                                            rows = rows.reverse()
                                                        }
                                                        for (var i = 0; i < rows.length; i++) {
                                                            table.append(rows[i])
                                                        }
                                                    });
                                        </script>
                                        </body>
                                        </html>

