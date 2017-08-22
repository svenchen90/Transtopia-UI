<%-- 
    Document   : index News
    Created on : Jan 6, 2017, 2:15:20 PM
    Author     : zhichengfu
--%>
<%@page import="FileM.User"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<!DOCTYPE html>
<html style="min-height: 100%; height:100%">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <!-- Tell the browser to be responsive to screen width -->
        <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
        <!-- Bootstrap 3.3.6 -->
        <link rel="stylesheet" href="../../CSS/bootstrap.min.css" />
        <link rel="stylesheet" href="../../CSS/News/bootstrap-tokenfield.css" />
        <link href="../../CSS/font-awesome.css" type="text/css" rel="stylesheet">
        <link rel="stylesheet" href="../../CSS/News/token-input.css" type="text/css" />
        <link rel="stylesheet" href="../../CSS/News/token-input-facebook.css" type="text/css" />
        <!-- Theme style -->
        <link rel="stylesheet" href="../../CSS/News/AdminLTE.min.css">
        <!-- AdminLTE Skins. Choose a skin from the css/skins
             folder instead of downloading all of them to reduce the load. -->
        <link rel="stylesheet" href="../../CSS/News/_all-skins.min.css">
        <!-- iCheck -->
        <link rel="stylesheet" href="../../CSS/News/blue.css">
        <!-- Morris chart -->
        <link rel="stylesheet" href="../../CSS/News/morris.css">
        <!-- jvectormap -->
        <link rel="stylesheet" href="../../CSS/News/jquery-jvectormap-1.2.2.css">
        <link rel="stylesheet" href="../../CSS/News/mine.css" />
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
            <!-- Left side column. contains the logo and sidebar -->
            <aside class="main-sidebar" style="min-height:750px;padding-top:10px;">
                <!-- sidebar: style can be found in sidebar.less -->
                <section class="sidebar">
                    <ul class="sidebar-menu">
                        <li class="search_head" style="margin-left: 10px; margin-top: 10px;">
                            <div style="margin-left:10px;"><i class="fa fa-search" style="color:white;"></i> <input type="text" id="news_search" placeholder="搜索" style="color:white;background-color: rgb(26,26,26);border:none;"></div>
                        </li>
                        <li class="search_head" style="margin-left: 10px; margin-top: 10px;">
                            <div style="margin-left:13px">
                                <i class="fa fa-commenting-o news_chat" onclick="showOrderMessages('1')" id="news_index_1"></i><i id="news_index_2" class="fa fa-user news_chat" onclick="showOrderMessages('2')"></i>
                                <i class="fa fa-users news_chat" onclick="showOrderMessages('3')" id="news_index_3"></i>
                            </div>
                        </li>
                    </ul>
                    <ul id="message_showing">
                    </ul>
                </section>
                <!-- /.sidebar -->
            </aside>

            <!-- Content Wrapper. Contains page content -->
            <div class="content-wrapper" style="min-height:750px;overflow-y: scroll;">
                <!-- Main content -->
                <section class="content news_content" style="background:#ecf0f5; height:90%" id="allProjectSection" ppid="0">
                    <img style="width:100%;height:100%;" src="./Img/welcome.jpg" id="weclomeImage"></img>
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
    </body>
</html>


