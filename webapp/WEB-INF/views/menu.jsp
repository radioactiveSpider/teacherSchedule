<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="/resources/css/style.css?v13ykukmjujr">
    <title>Меню</title>
</head>
<body>

<div align="center" class="container">
    <h2 align="center" style="margin-top: 5em;">${teacher.lastName} ${teacher.firstName}</h2>
    <div align="center">
        <a class="special" href="/menu/schedule">
            <input class="btn btn-success" type="submit" value="Расписание"/>
        </a>
        <br/>
        <br/>
        <a class="special" href="/menu/showGroups?teacherId=${teacher.id}">
            <input class="btn btn-success" type="submit" value="Группы">
        </a>
        <br/>
        <br/>
        <a class="special" href="/home">
            <input class="btn btn-success" type="submit" value="Выход"/>
        </a>
    </div>
</div>
</body>
</html>