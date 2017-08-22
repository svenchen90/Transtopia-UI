<%-- 
    Document   : index
    Created on : Apr 6, 2016, 3:04:34 PM
    Author     : zhichengfu
--%>

<%@page import="FileM.User"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en" class="no-js">
    <head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta charset="utf-8">

        <script type="text/javascript" async="" src="./JS/linkid.js"></script>
        <script type="text/javascript" async="" src="./JS/ec.js"></script>
        <script type="text/javascript" async="" defer="" src="./JS/goal.min.js"></script>
        <title>我的Transtopia</title>
        <link href="./CSS/index1.css" media="all" rel="stylesheet" type="text/css">
        <link href="./CSS/index2.css" media="all" rel="stylesheet" type="text/css">
        <link href="./CSS/mine.css" media="all" rel="stylesheet" type="text/css">
        <link href="./CSS/my_fonts/style.css" type="text/css" rel="stylesheet">
        <link href="./CSS/font-awesome.min.css" media="all" rel="stylesheet" type="text/css">
        <link href="./CSS/bootstrap.min.css" media="all" rel="stylesheet" type="text/css">
        <link rel="shortcut icon" href="./Img/logo.png">
        <script src="./JS/index-js.js" type="text/javascript"></script>
        <script src="./JS/jquery.min.js"></script>
        <script src="./JS/bootstrap.min.js"></script>
        <script src="./JS/jquery-ui.min.js"></script>
        <script>
            var timoutWarning = 1200000; // Display warning in 14 Mins.
            var timoutNow = 30000; // Warning has been shown, give the user 1 minute to interact

            var warningTimer;
            var timeoutTimer;
            var htype, hid, hshow;
            var types = [];//{type:id}
            function StartWarningTimer() {
                warningTimer = setTimeout("IdleWarning()", timoutWarning);
            }

            function reloadPage()
            {
                var cid = 0;
                var info = window.location.search;
                if (info.length > 1)
                {
                    info = info.substr(1);
                    window.history.pushState("test", "Transtopia", "/Transtopia/Admin/index.jsp");
                    var aitems = info.split("&");
                    for (var i = 0; i < aitems.length; i++)
                    {
                        var pitems = aitems[i].split("=");
                        var items = pitems[1].split(":");
                        if (items[2].endsWith("_1"))
                        {
                            cid = i + 1;
                        }
                        newTag(items[0], "0");
                    }
                    activeTag(cid);
                }
            }

            function addNewURL(type, id, show) // show id_1
            {
                var url = window.location.href;
                url = url.split("Transtopia");
                url = "Transtopia" + url[1];
                url = url.split("?");
                if (url.length > 1)
                {
                    var nurl = url[1] + "&item=" + type + ":" + id + ":" + id + '_1';
                    nurl = url[0] + "?" + nurl;
                    window.history.pushState("test", "Transtopia", "/" + nurl);
                }
                else
                {
                    var nurl = "item=" + type + ":" + id + ":" + id + '_1';
                    nurl = url[0] + "?" + nurl;
                    window.history.pushState("test", "Transtopia", "/" + nurl);
                }
            }

            function changeURLActive(nid, oid)
            {
                var url = window.location.href;
                url = url.split("Transtopia");
                url = "Transtopia" + url[1];
                url = url.replace(nid + "_0", nid + "_1");
                url = url.replace(oid + "_1", oid + "_0");
                window.history.pushState("test", "Transtopia", "/" + url);
            }

            function removeURL(option, id)
            {
                var url = window.location.href;
                url = url.split("Transtopia");
                url = "Transtopia" + url[1];
                var item = "&item=" + option + ":" + id + ":" + id + "_1";
                url = url.replace(item, '');
                item = "?item=" + option + ":" + id + ":" + id + "_1";
                url = url.replace(item, '');

                item = "&item=" + option + ":" + id + ":" + id + "_0";
                url = url.replace(item, '');
                item = "?item=" + option + ":" + id + ":" + id + "_0";
                url = url.replace(item, '');
                window.history.pushState("test", "Transtopia", "/" + url);

            }

// Reset timers.
            function ResetTimeOutTimer() {
                $("#myModal_main").modal("hide");
                clearTimeout(timeoutTimer);
                StartWarningTimer();

            }

// Show idle timeout warning dialog.
            function IdleWarning() {
                clearTimeout(warningTimer);
                timeoutTimer = setTimeout("IdleTimeout()", timoutNow);
                //$("#myModal_main").modal();
                $('#myModal_main').modal({backdrop: 'static', keyboard: false});
            }


// Logout the user.
            function IdleTimeout() {
                logOut();
            }
            //function to fix height of iframe!
            var calcHeight = function () {
                var headerDimensions = $('.preview__header').height();
                $('.full-screen-preview__frame').height($(window).height() - headerDimensions);
            };

            $(document).ready(function () {
                calcHeight();
            });

            $(window).resize(function () {
                calcHeight();
            }).load(function () {
                calcHeight();
            });
            var totalTags = 0;
            var currentTag = 0;

            function cnewTag(option, ppid)
            {
                window.parent.newTag(option, ppid);
            }

            function checkExisted(type)
            {
                for (var i = 0; i < types.length; i++)
                {
                    if (types[i] === type)
                    {
                        return true;
                    }
                }
                return false;
            }

            function removeType(type)
            {
                var ts = [];
                for (var i = 0; i < types.length; i++)
                {
                    if (types[i] !== type)
                    {
                        ts.push(types[i]);
                    }
                }
                types = ts;
            }

            function newTag(option, ppid)
            {

                option = parseInt(option);
                htype = option;
                if (option === 0)
                {
                    createTag(option, "项目资讯", "./News/index.html", option);
                }
                else if (option === 1)
                {
                    if (!checkExisted(option))
                    {
                        types.push(option);
                        createTag(option, "我的交托邦", "./FileManage/index.jsp");
                    }
                    else
                    {
                        alert("你的交托邦已经打开了，请勿重复点击");
                    }

                }
                else if (option === 2)
                {
                    if (ppid === undefined || ppid === 0)
                    {
                        createTag(option, "新的调查分析", "./Survey/index1.jsp?id=0", option);
                    }
                    else
                    {
                        $.post("../HandleGetProjectInfo", {pid: ppid}, function (result)
                        {
                            if (result === "0")
                            {
                                alert("系统出现错误，请重试！");


                            }
                            else
                            {
                                var p = JSON.parse(result);

                                createTag(option, p.name, "./Survey/index1.jsp?id=" + ppid, ppid);

                            }
                        });

                    }

                }
                 else if (option === 3)
                {
                    if (!checkExisted(option))
                    {
                        types.push(option);
                        createTag(option, "交叉口渠化草绘应用", "./Survey/intersection.jsp?id="+ppid,ppid);
                    }
                    else
                    {
                        alert("你的交托邦已经打开了，请勿重复点击");
                    }

                }

            }

            function createTag(option, name, url, ids)
            {
                totalTags++;
                var para = document.getElementById("nav_bar");
                var tag = document.createElement("div");
                tag.setAttribute("id", "t" + totalTags);
                tag.setAttribute("option", option);
                hid = totalTags;
                tag.setAttribute("data_value", totalTags);
                tag.setAttribute("class", "preview__actions");
                if(option===2)
                {
                    name="<span class='icon-icon-traffic-counts' style='margin-right:5px;font-size: 18px;color: white;font-weight: bold;'></span>"+name;
                }
                tag.innerHTML = "<div class='preview__action--buy  nav_action' ><button id='a" +
                        totalTags + "' class='btn btn--primary'" +
                        "style='height:30px; padding-right: 5px;padding-left: 5px;border-top-left-radius: 4px;border-top-right-radius: 0px;border-bottom-right-radius: 0px;border-bottom-left-radius: 4px' " +
                        "onclick='activeTag(" + totalTags + ")'>" + name + "</button><button id='aa" + totalTags + "' class='btn btn--primary'" +
                        "style='height:30px; padding-right: 5px;padding-left: 2px;border-top-left-radius: 0px;border-top-right-radius: 4px;border-bottom-right-radius: 4px;border-bottom-left-radius: 0px;' " +
                        "onclick=\"removeTag('" + totalTags + "','" + option + "','" + ids + "')\"><span class='fa fa-times-circle'></span></button></div>";
                para.appendChild(tag);
                createFrame(url);
                addNewURL(option, totalTags, 1);

            }

            function removeTag(value, type, ids)
            {
                var para = document.getElementById("nav_bar");
                var nav_ele = document.getElementById("t" + value);
                var option = nav_ele.getAttribute("option");
                option = parseInt(option);
                removeType(option);
                removeURL(option, value);
                para.removeChild(nav_ele);
                var parab = document.getElementById("mainBody");
                var nav_ff = document.getElementById("f" + value);
                parab.removeChild(nav_ff);

                type = parseInt(type);
                ids = parseInt(ids);
                if (type === 2 && ids !== 0)
                {
                    $.post("../HandleRemoveCurrentState", {id: ids, option: 1}, function (result)
                    {
                        if (result === "0")
                        {
                            alert("系统出现错误，请重试！");


                        }
                        else if (result === "1")
                        {

                        }
                    });
                }

            }

            function backHome()
            {

                var pp = document.getElementById("f" + currentTag);
                if (pp !== null)
                {
                    pp.style.display = "none";
                }
                var aa = document.getElementById("a" + currentTag);
                if (aa !== null)
                {
                    aa.style.background = "gray";
                }
                var aab = document.getElementById("aa" + currentTag);
                if (aab !== null)
                {
                    aab.style.background = "gray";
                }
                var main = document.getElementById("f0");
                main.style.display = "block";
                currentTag = 0;
                var aa = document.getElementById("a" + currentTag);
                aa.style.background = "#82b440";

                changeURLActive(-1, currentTag);
            }

            function activeTag(value)
            {
                var pp = document.getElementById("f" + currentTag);
                if (pp !== null)
                {
                    pp.style.display = "none";
                }
                var aa = document.getElementById("a" + currentTag);
                if (aa !== null)
                {
                    aa.style.background = "gray";
                }
                var aab = document.getElementById("aa" + currentTag);
                if (aab !== null)
                {
                    aab.style.background = "gray";
                }
                var main = document.getElementById("f" + value);
                main.style.display = "block";
                changeURLActive(value, currentTag);
                currentTag = value;
                var aa = document.getElementById("a" + currentTag);
                aa.style.background = "#82b440";
                var aab = document.getElementById("aa" + currentTag);
                aab.style.background = "#82b440";
            }

            function createFrame(url)
            {

                var pp = document.getElementById("f" + currentTag);
                var aa = document.getElementById("a" + currentTag);
                aa.style.background = "gray";
                pp.style.display = "none";
                currentTag = totalTags;
                var ff = document.createElement("iframe");
                ff.setAttribute("id", "f" + totalTags);
                ff.setAttribute("data_value", totalTags);
                ff.setAttribute("class", "full-screen-preview__frame");
                ff.setAttribute("src", url);
                ff.setAttribute("name", "preview-frame");
                ff.setAttribute("frameborder", "0");
                ff.setAttribute("data-view", "fullScreenPreview");
                ff.setAttribute("style", "display:block; height:1000px;");
                var para = document.getElementById("mainBody");
                var temp = document.getElementById("tempff");
                para.insertBefore(ff, temp);
            }

            function logOut()
            {
                window.location.href = "../HandleLogOut";
            }

        </script>
        <%
            User user;
            try
            {
                user = (User) session.getAttribute("user");
                if (user == null) 
                {
                    response.sendRedirect("../index.jsp");
                }
                String items = request.getParameter("items");
            } catch (Exception e) 
            {
                response.sendRedirect("../index.jsp");
            }
        %>
    </head>
    <body id="mainBody" class="full-screen-preview" copyid="">
        <div id="nav_bar" class="preview__header">

            <div class="preview__actions">
                <div class="preview__action--buy" style="padding-right: 10px;">
                    <img src="./Img/logoMain.jpg" style="height:32px; width:55px;" class="header-logo" alt="TraOS">
                </div>
            </div>
            <div id="zhuomian" class="preview__actions">
                <div class="preview__action--buy">
                    <a href="javascript:void(0)" id="a0" class="btn btn--primary" onclick="backHome()">桌面</a>                   
                </div>
            </div>

            <div class="dropdown preview__actions" style="float:right">
                <div class="preview__action--buy">
                    <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">账户
                        <span class="caret"></span></button>
                    <ul class="dropdown-menu">
                        <li><a href="#">用户设置</a></li>
                        <li><a href="javascript:void(0)" onclick="logOut()">安全退出</a></li>

                    </ul>
                </div>
            </div>
        </div>

        <div id="myModal_main" class="modal fade" role="dialog" style="border: none;background: transparent; overflow:hidden;">
            <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">当前信息提醒</h4>
                    </div>
                    <div class="modal-body">
                        <p>你当前的页面信息即将过期，你可以点击继续按钮继续当前的操作</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" onclick=" ResetTimeOutTimer();">继续</button>
                    </div>
                </div>

            </div>
        </div>

        <iframe id="f0" class="full-screen-preview__frame" src="welcome.html" name="preview-frame" frameborder="0" noresize="noresize" data-view="fullScreenPreview" style="display: block">
        </iframe>
        <div id="tempff"></div>
        <script>
            StartWarningTimer();
            reloadPage();
        </script>
    </body>
</html>