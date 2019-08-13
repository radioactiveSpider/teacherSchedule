<%--
  Created by IntelliJ IDEA.
  User: Лера
  Date: 23.03.2019
  Time: 15:04
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<html>
<head>
    <title>Группы</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.5/css/bootstrap.min.css"
          integrity="sha384-AysaV+vQoT3kOAXZkl02PThvDr8HYKPZhNT5h/CXfBThSRXQ6jW5DO2ekP5ViFdi" crossorigin="anonymous">
    <link rel="stylesheet" href="/resources/css/style.css">
    <link rel="stylesheet" href="/resources/css/dropDown.css">
    <script src="http://code.jquery.com/jquery-1.8.3.js"></script>
    <script src="/resources/js/showDropDown.js?v123"></script>
</head>
<body>

<div align="center" class="container">
    <h2 align="center" style="margin-top: 5em;">Группы</h2>
    <c:forEach items="${groups}" var="group">
        <div class="dropdown">
            <input value="${group.groupNumber}" type="submit" class="btn btn-success dropdown-toggle"
                   data-toggle="dropdown" aria-haspopup="true"
                   aria-expanded="false">
            <div id="${group.polytechId}" class="dropdown-menu mdr-menu">
                <a class="dropdown-item" href="/menu/showGroup?groupId=${group.polytechId}&teacherId=${teacherId}">Посещаемость</a>
                <a class="dropdown-item" href="/group/groupWorks?groupId=${group.polytechId}">Успеваемость</a>
            </div>
        </div>
        <div id="infoDiv" style="display: none">${group.polytechId}</div>
        </br>
    </c:forEach>
</div>

</body>
</html>