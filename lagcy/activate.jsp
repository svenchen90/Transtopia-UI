<%-- 
    Document   : activate
    Created on : Apr 4, 2016, 5:14:03 PM
    Author     : zhichengfu
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <title>激活确定界面</title>
        <script src="./Home/JS/jquery-2.0.3.min.js"></script>
<!--        <script type="text/javascript" async="" src="./Home/JS/linkid.js"></script>
        <script type="text/javascript" async="" src="./Home/JS/ec.js"></script>      -->
        <script src="./Home/JS/bootstrap.min.js"></script>
        <script src="./Home/JS/mine.js"></script>
            <link href="./Home/CSS/index1.css" media="all" rel="stylesheet" type="text/css">
        <link href="./Home/CSS/index2.css" media="all" rel="stylesheet" type="text/css">   
        <link href="./Home/CSS/mine.css" media="all" rel="stylesheet" type="text/css"> 
        <link rel="stylesheet" href="./Home/CSS/font-awesome.min.css" type="text/css">
        <link href="./Home/CSS/bootstrap.min.css" media="all" rel="stylesheet" type="text/css">
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <%
            int value=Integer.parseInt(request.getParameter("status"));
        %>
    </head>
    <body class="full-screen-preview">
        <div id="activatePage">
            
        </div>
    </body>
    <script>
        showRegistrationStatus('<%=value%>');
    </script>
</html>

