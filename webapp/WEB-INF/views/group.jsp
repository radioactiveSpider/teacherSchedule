<%@ page import="com.teacherschedule.Models.Student" %>
<%@ page import="com.teacherschedule.Models.Group" %><%--
  Created by IntelliJ IDEA.
  User: Лера
  Date: 12.04.2019
  Time: 20:30
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Группа</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">

    <script>
        var teacherId = "${teacherId}";
        var groupId = "${groupId}";
    </script>

    <link rel="stylesheet" href="/resources/css/style.css">
    <script src="http://code.jquery.com/jquery-1.8.3.js"></script>
    <script src="/resources/js/renderLib.js?v13dgb4"></script>
    <script src="/resources/js/showAttendance.js?v1355tgbddh"></script>
</head>
<body>

<div class="container">
    <small class = "group_page_buttons" id="return" style="color: cornflowerblue;">Вернуться</small>

    <h2 id="article_header" align="left">Группа ${group.groupNumber} ${group.course}</h2>

    <small class = "group_page_buttons" id="prev_dates" style="color: cornflowerblue;">Прошлые даты</small>
    <small class = "group_page_buttons" id="next_dates" style="color: cornflowerblue;">Будущие даты</small>

    <table id="users_table" class="table">
        <thead>
        <tr id="table_head" align="center">
            <td>Дата</td>
        </tr>
        </thead>
        <tbody>
        <tr align="center" id="is_checked">
            <td></td>
        </tr>
        <%
            Group students = (Group) request.getAttribute("group");
            int i = 0;
            for (Student student : students.getStudents()) {
                String name = student.getFullName();
                String id = "std_" + i;
                i++;
        %>
        <tr id='<%=id%>' align="center">
            <td><%=name%>
            </td>
        </tr>
        <%}%>
        <tr align="center" id="buttons">
            <td></td>
        </tr>
        </tbody>
    </table>
</div>
</body>
