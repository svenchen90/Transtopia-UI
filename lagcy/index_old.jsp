<%-- 
    Document   : index
    Created on : Sep 22, 2016, 3:10:53 PM
    Author     : zhichengfu
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en" class="no-js"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta charset="utf-8">
        <script src="./Home/JS/jquery-2.0.3.min.js"></script>
        <!--        <script type="text/javascript" async="" src="./Home/JS/linkid.js"></script>
                <script type="text/javascript" async="" src="./Home/JS/ec.js"></script>      -->
        <script src="./Home/JS/bootstrap.min.js"></script>
        <script src="./Home/JS/mine.js"></script>
        <!--        <script type="text/javascript" async="" src="./Home/JS/goal.min.js"></script>-->
        <link rel="shortcut icon" href="./Home/Img/logo.png"> 
        <link href="./Home/CSS/index1.css" media="all" rel="stylesheet" type="text/css">
        <link href="./Home/CSS/index2.css" media="all" rel="stylesheet" type="text/css">   
        <link href="./Home/CSS/mine.css" media="all" rel="stylesheet" type="text/css"> 
        <link rel="stylesheet" href="./Home/CSS/font-awesome.min.css" type="text/css">
        <link href="./Home/CSS/bootstrap.min.css" media="all" rel="stylesheet" type="text/css">
        <!--        <script src="./Home/JS/index-js.js" type="text/javascript"></script>-->
        <title>Transtopia</title>
        <%
            int option=0;
            String info;
            String email;
            try
            {
                info=request.getParameter("info");
                if(!info.equals(""))
                {
                    option=1;
                }
                email=request.getParameter("email");
                if(!email.equals(""))
                {
                    option=1;
                }
            }
            catch(Exception e)
            {
                option=0;
                info="";
                email="";
            }
        %>
        <script>
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
        </script>

        <style>
            .modal-header, h4, .close {
                background-color: #5cb85c;
                color:white !important;
                text-align: center;
                font-size: 30px;
            }
            .modal-footer {
                background-color: #f9f9f9;
            }
        </style>
    </head>
    <body class="full-screen-preview" onload="showRegister('<%=option%>','<%=info%>','<%=email%>')">
        <div class="preview__header">

<!--            <div  class="preview__actions" >
                <div class="preview__action--buy" >
                    <a href="javascript:void(0)" class="btn btn--primary" onclick="">应用</a>
                </div>

            </div>-->
            <div class="preview__actions">
                <div class="preview__action--buy">
                    <a href="javascript:void(0)" class="btn btn--primary" onclick="">桌面</a>
                </div>

            </div>

            <div class="preview__actions rightBar">
                <div class="preview__action--buy">
                    <a href="javascript:void(0)" class="btn btn--primary" id="myBtn" onclick="showLogIn()">登录</a>
                </div>

            </div>

            <div class="preview__actions rightBar">
                <div class="preview__action--buy">
                    <a href="javascript:void(0)" class="btn btn--primary" onclick="showCodeImage();">注册</a>
                </div>

            </div>

        </div>
        <iframe id="test2" class="full-screen-preview__frame" src="./Home/Welcome.html" name="preview-frame" frameborder="0" noresize="noresize" data-view="fullScreenPreview" style="display:block">
        </iframe>
    </div>
    <div class="modal fade" id="myModal" role="dialog" style="border:none;background-color: transparent">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header" style="padding:35px 50px;">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4><span class="fa fa-lock"></span> Login</h4>
                </div>
                <div class="modal-body" style="padding:40px 50px;">
                    <form role="form" action="./HandleLogin" method="post">
                        <div class="form-group">
                            <label for="username"><span class="fa fa-user"></span> 用户名</label>
                            <input type="text" class="form-control" id="email" placeholder="输入邮箱" name="email">
                        </div>
                        <div class="form-group">
                            <label for="password"><span class="fa fa-eye"></span>密码</label>
                            <input type="password" class="form-control" id="psw" placeholder="输入密码" name="password">
                        </div>
                        <div class="checkbox">
                            <label><input type="checkbox" value="" checked>记住我</label>
                        </div>
                        <button type="submit" class="btn btn-success btn-block"><span class="fa fa-off"></span> 登录</button>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-danger btn-default pull-left" data-dismiss="modal"><span class="fa fa-remove"></span> Cancel</button>
                    <p>新用户? <a href="#">注册</a></p>
                    <p>忘记了 <a href="#">密码?</a></p>
                </div>
            </div>

        </div>
    </div> 
    <!--    <script>
            $(document).ready(function () {
                $("#myBtn").click(function () {
                    $("#myModal").modal();
                });
            });
        </script>-->
</body>
</html>
