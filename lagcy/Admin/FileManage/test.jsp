<%-- 
   Document   : test
   Created on : Sep 6, 2016, 5:36:10 PM
   Author     : zhichengfu
--%>
<%@page import="FileM.PathD"%>
<%@page import="FileM.Path"%>
<%-- 
   Document   : index
   Created on : Mar 16, 2016, 5:41:27 PM
   Author     : zhichengfu
--%>
<%@page import="java.util.LinkedList"%>
<%@page import="FileM.User"%>
<%@page import="Tools.Others"%>
<%@page import="FileM.Project"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!DOCTYPE html>

<html>
    <!--<![endif]-->
    <!-- BEGIN HEAD -->
    <head>
        <meta charset="UTF-8" />
        <title>文件管理系统</title>
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <meta content="" name="description" />
        <meta content="" name="author" />
        <link rel="stylesheet" href="./css/bootstrap.css" />
        <link rel="stylesheet" href="./css/bootstrap-tokenfield.css" />
        <link rel="stylesheet" href="./css/theme.css" />
        <link rel="stylesheet" href="./css/MoneAdmin.css" />
        <link href="./css/font-awesome.min.css" type="text/css" rel="stylesheet">
        <link href="./css/pygments-manni.css" type="text/css" rel="stylesheet">
        <link href="./css/docs.css" type="text/css" rel="stylesheet">
        <link href="./css/jquery-ui.css" type="text/css" rel="stylesheet">
        <link rel="stylesheet" href="./css/token-input.css" type="text/css" />
        <link rel="stylesheet" href="./css/token-input-facebook.css" type="text/css" />
        <script type="text/javascript" src="./js/jquery-2.0.3.min.js"></script>
        <link href="./css/layout2.css" rel="stylesheet" />
        <link rel="stylesheet" href="./css/main.css" />

        <style>
            .token-input-dropdown-facebook
            {
                z-index:100000;
            }
        </style>
    </head>
    <%
        User user = (User) session.getAttribute("user");
        LinkedList<Project> pjs = null;
        LinkedList<Project> pjsa = null;
        LinkedList<Project> dps = null;
        LinkedList<Project> sps = null;
        LinkedList<Project> aps = null;
        LinkedList<Project> allps = null;
        String keyw = "";
        int sp_size = 0, total_size = 0, d_size = 0;
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
        allps = Project.getALLProjectByUserID(user.id);
        pjsa = Project.getALLProjectTypesByUserID(user.id);

        dps = Project.getDeleteALLCanProjectByUserID(user.id);
        sps = Project.getProjectByUserID_Type(3, user.id);
        if (pjsa != null) {
            total_size = pjsa.size();
        }
        if (dps != null) {
            d_size = dps.size();
        }
        if (sps != null) {
            sp_size = sps.size();
        }

        if (showOP == 0) {
            if (parentID == 0) {
                aps = allps;
            } else {
                aps = pjs;
            }

        } else if (showOP == 1) {
            aps = sps;
        } else if (showOP == 2) {
            aps = dps;
        } else if (showOP == 3) { // all types of file
            aps = pjsa;
        } else if (showOP == 4) //searching file by keyword
        {
            keyw = request.getParameter("keyword");
            aps = Project.getProjectByUserID_Name(keyw, user.id);
        }
        String tcotent = "";

    %>
    <!-- END HEAD -->
    <!-- BEGIN BODY -->
    <body class="padTop53 " id="bodyOne" oncontextmenu="return false;" style="padding-top:14px;">
        <!-- MAIN WRAPPER -->
        <!--        <div id="overlay-background" class="overlay-background"></div>-->
        <div id="wrap" >
            <div id="left" >
                <ul id="menu" class="collapse">
                    <li class="panel active">
                        <a href="index.html" >
                            <i class="icon-table"></i> 项目概览
                        </a>                   
                    </li>
                    <li class="panel ">
                        <a href="javascript:void(0);" onclick="showAllProjectList();" class="accordion-toggle" data-target="#component-nav">
                            <i class="icon-tasks"> </i> 项目文件     
                            <span class="pull-right">
                                <i class="icon-angle-left"></i>
                            </span>
                            &nbsp; <span class="label label-default" id="total_size"><%=total_size%></span>&nbsp;
                        </a>
                    </li>
                    <!--                    <li class="panel ">
                       <a href="index.jsp" data-parent="#menu" data-toggle="collapse" class="accordion-toggle collapsed" data-target="#form-nav">
                           <i class="icon-file"></i> 项目文件
                       
                           <span class="pull-right">
                               <i class="icon-angle-left"></i>
                           </span>
                           &nbsp; <span class="label label-success"></span>&nbsp;
                       </a>
                       </li>-->
                    <li class="panel ">
                        <a href="javascript:void(0);" onclick="showSurveyProjectList()" class="accordion-toggle collapsed" data-target="#form-nav">
                            <i class="icon-file"></i> 调查分析项目
                            <span class="pull-right">
                                <i class="icon-angle-left"></i>
                            </span>
                            &nbsp; <span class="label label-success" id="sp_size"><%=sp_size%></span>&nbsp;
                        </a>
                    </li>
                    <li class="panel">
                        <a href="javascript:void(0);" onclick="showDeleteProjectList()" "data-parent="#menu" data-toggle="collapse" class="accordion-toggle" data-target="#pagesr-nav">
                            <i class="icon-trash"></i> 回收站
                            <span class="pull-right">
                                <i class="icon-angle-left"></i>
                            </span>
                            &nbsp; <span class="label label-info" id="d_size"><%=d_size%></span>&nbsp;
                        </a>
                    </li>
                </ul>
            </div>
            <!--END MENU SECTION -->
            <!--PAGE CONTENT -->
            <div id="content">
                <div class="inner" style="min-height: 600px;">
                    <!--BLOCK SECTION -->
                    <div class="row" style="position:relative;left:-250px;width: 1280px;">
                        <div class="col-lg-12">
                            <div style="display: inline-block;float:left;margin-left: 15px; width:225px;">
                                <h3><span style="color:black">欢迎您:&nbsp;<%=user.name%></span></h3>
                            </div>
                            <div style="display: inline-block;float:left;margin-left: 50px;position:relative;top:20px;font-size:18px;">
                                <%
                                    if (showOP != 2 && showOP != 4) {
                                        LinkedList<PathD> pd = Project.getProjectPPath(parentID, user.id);
                                        if (pd != null && pd.size() > 0) {
                                            for (PathD d : pd) {
                                                if (tcotent.equals("")) {
                                                    if (d.id == 0) {
                                                        tcotent = "<a href='index.jsp'>" + d.name + "</a>" + tcotent;
                                                    } else {
                                                        tcotent = "<a href='index.jsp?ppid=" + d.id + "'>" + d.name + "</a>" + tcotent;
                                                    }
                                                    //tcotent="<a href='index.jsp?ppid='"+d.id+"'>"+d.name+"</a>"+tcotent;
                                                } else {
                                                    if (d.id == 0) {
                                                        tcotent = "<a href='index.jsp'>" + d.name + "</a>" + "&nbsp;>>" + "&nbsp;" + tcotent;
                                                    } else {
                                                        tcotent = "<a href='index.jsp?ppid=" + d.id + "'>" + d.name + "</a>" + "&nbsp;>>" + "&nbsp;" + tcotent;
                                                    }

                                                }

                                            }
                                        } else {
                                            tcotent = "<a href='index.jsp'>Transtopia</a>";
                                        }
                                    } else if (showOP == 4) {
                                        tcotent = "<a href='index.jsp'>Transtopia</a>&nbsp;>>&nbsp;" + "查询&nbsp;\"" + keyw + "\"";
                                    } else if (showOP == 2) {
                                        tcotent = "<a href='index.jsp'>Transtopia</a>&nbsp;>>&nbsp;" + "<a href='javascript:void(0);'>回收站</a>";
                                    }

                                %>
                                <%=tcotent%>
                            </div>
                            <div style="text-align: right;width: 500px;display: inline-block;float: right;">
<!--                                <a href="javascript:void(0)" class="quick-btn" id="uploadFile" data-toggle="tooltip" data-placement="bottom" title="上传文件" onclick="showLoadFile('<%=parentID%>');">
                                    <img class="nav_img" src="./img/sm/up.png" alt="Upload File">
                                                                        <span> Products</span>
                                       <span class="label label-danger">2</span>
                                </a>
                                <a class="quick-btn" href="javascript:void(0)" id="createProject" onclick="createProjectFolder('<%=parentID%>')" data-toggle="tooltip" data-placement="bottom" title="创建文件夹">
                                    <img class="nav_img" src="./img/sm/uff.jpg" alt="Create Folder">
                                                                        <span>Messages</span>
                                       <span class="label label-success">456</span>
                                </a>
                                <a class="quick-btn" href="javascript:void(0)" id="createProject" onclick="createProject('<%=parentID%>')" data-toggle="tooltip" data-placement="bottom" title="创建项目">
                                    <img class="nav_img" src="./img/sm/np.png" alt="Create Folder">
                                                                        <span>Messages</span>
                                       <span class="label label-success">456</span>
                                </a>-->
                                <i class="fa fa-cloud-upload fa-2x my_nav_icon" aria-hidden="true" onclick="showLoadFile('<%=parentID%>');" data-toggle="tooltip" data-placement="bottom" title="上传文件"></i>&nbsp;&nbsp
                                <i class="fa fa-folder-o fa-2x my_nav_icon" aria-hidden="true" onclick="createProjectFolder('<%=parentID%>');" data-toggle="tooltip" data-placement="bottom" title="新建文件夹"></i>&nbsp;&nbsp
                                <i class="fa fa-file fa-2x my_nav_icon" aria-hidden="true" onclick="createProject('<%=parentID%>');" data-toggle="tooltip" data-placement="bottom" title="新建项目"></i>&nbsp;&nbsp
                                <i class="fa fa-2x fa-recycle my_nav_icon" aria-hidden="true" onclick="clearTrashOut();" data-toggle="tooltip" data-placement="bottom" title="清空回收站"></i>
                                <!--                                <a class="quick-btn" href="javascript:void(0);" onclick="showDeleteProjectList()" data-toggle="tooltip" data-placement="bottom" title="查看回收站">
                                                                    <img class="nav_img" src="./img/sm/df.jpg" alt="delete file">
                                                                                                        <span>value</span>
                                                                       <span class="label btn-metis-2">3.14159265</span>
                                                                </a>-->
                                <form class="quick-form dropdown" id="searchResults">
                                    <input type="text" placeholder="输入你要搜索的内容" class="inputtext,dropdown-toggle" id="search_text" data-toggle="dropdown" style="height:31px;">
                                    <ul class="dropdown-menu" role="menu" aria-labelledby="search_text" id="ul_searchList" style="left:40px;">
                                    </ul>
                                    <button type="button" class="inputbutton" onclick="doSearch();">Search</button>
                                </form>
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
                                <div class="panel-body">
                                    <table class="table table-condensed" id="allProjectList">
                                        <tr>
                                            <th class="f_table_th_1 f_table_th f_table_thc"  style="vertical-align: middle;padding: 10px;">项目名称</th>
                                            <th class="f_table_th_2 f_table_th f_table_thc"  style="vertical-align: middle;padding: 10px;">修改时间</th>
                                            <th class="f_table_th_3 f_table_th f_table_thc"  style="vertical-align: middle;padding: 10px;">创建人</th>

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
                                                    <img class="fileImage" src="./img/sm/share.jpg" alt="file">
                                                    <%} else {%>
                                                    <img class="fileImage" src="./img/sm/folder.jpg" alt="file">
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
                                                            if (showOP != 2) {%>
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
                                                            <%                                                    }
                                                            %>
                                                        </td>
                                                        <%}%>
                                                        <td class="f_table_th_4 f_table_td" id="<%=p.id%>_opreation" style="vertical-align: middle;padding: 10px;">
                                                            <div id="project_item_operation_<%=p.id%>" style="display:none;">
                                                                <%  if (showOP != 2) {%>
                                                                <i class="fa fa-users fa-2x my_i_icon" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="分享" id="file<%=p.id%>_button" items="" onclick="showShareFolderAction('<%=p.id%>', '<%=user.id%>')" ></i>&nbsp;&nbsp; 
                                                                <%
                                                                    if (p.role == 3 || p.userid == user.id) {%>
                                                                <i class="fa fa-pencil-square-o fa-2x my_i_icon" aria-hidden="true"  data-toggle="tooltip" data-placement="bottom" title="重命名" onclick="renameProject('<%=p.id%>', '<%=p.name%>')" ></i>&nbsp;&nbsp;

                                                                <%}
                                                                    if (p.role == 3) {%>
                                                                <i class="fa fa-files-o fa-2x my_i_icon" aria-hidden="true" onclick="showProjectListDiagCopy('<%=p.id%>')"  data-toggle="tooltip" data-placement="bottom" title="复制"></i>&nbsp;&nbsp;
                                                                <i class="fa fa-arrows fa-2x my_i_icon" aria-hidden="true" onclick="showProjectListDiag('<%=p.id%>')"  data-toggle="tooltip" data-placement="bottom" title="移动"></i>&nbsp;&nbsp;
                                                                <i class="fa fa-trash fa-2x my_i_icon" aria-hidden="true" onclick="deleteFile('<%=p.id%>')" data-toggle="tooltip" data-placement="bottom" title="删除"></i>
                                                                <% }
                                                                } else {%>
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
                                                        </div>
                                                        </div>
                                                        </div>
                                                        </div>
                                                        </div>
                                                        </div>
                                                        </div>
                                                        <div class="modal fade" id="myModal" role="dialog">
                                                            <div class="modal-dialog">
                                                                <div class="modal-content"></div>
                                                                <div class="modal-footer"></div>
                                                            </div>
                                                        </div>
                                                        <div id="footer">
                                                            <p>&copy;  TraOS &nbsp;2015 &nbsp;</p>
                                                        </div>
                                                        <script src="./js/jquery-2.0.3.min.js"></script>
                                                        <script src="./js/jquery-ui.min.js"></script>
                                                        <script src="./js/bootstrap.min.js"></script>
                                                        <script type="text/javascript" src="./js/jquery.tokeninput.js"></script>
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
                                                        <!-- END PAGE LEVEL SCRIPTS -->
                                                        </body>

                                                        </html>