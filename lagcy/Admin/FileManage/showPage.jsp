<%-- 
    Document   : showPage
    Created on : Sep 22, 2016, 2:05:51 PM
    Author     : zhichengfu
--%>

<%@page import="FileM.User"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <%
        User user;
        String path="";
        try
        {
            user=(User)session.getAttribute("user");
            if(user!=null)
            {
                path =request.getParameter("path");
            }
            else
            {
                response.sendRedirect("../../index.jsp");
            }
        }
        catch(Exception e)
        {
            response.sendRedirect("../../index.jsp");
        }
    %>
    <script>
        function changeURL()
        {
            window.history.pushState("test", "文件", "/当前文件显示中");
        }
    </script>
    <body onload="changeURL()">
        <iframe src="<%=path%>" frameborder="0" style="width:100%;height:800px;"></iframe>
    </body>
    
</html>
