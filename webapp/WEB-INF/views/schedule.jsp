<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Расписание занятий</title>
		<link rel="stylesheet"
			  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
		<link rel="stylesheet" href="/resources/css/style.css">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
		<script src="http://code.jquery.com/jquery-1.8.3.js"></script>
		<script src="/resources/js/teacherScheduleRequest.js?v123"></script>
		<script src="/resources/js/showTeacherSchedule.js?160"></script>
	</head>
	<body>

	<div class ="container" id = "main" style="margin-top: 2em">

		<small class = "group_page_buttons" id="return"
			   style="color: cornflowerblue;
			   margin-left: 0.7%;">Вернуться</small>

		<div class="container" id="current_week" style="margin-left: 0.3em">

		</div>
		<div id = "buttons_week">
			<div class="weeks_buttons" id="prev_week" style="margin-left: 0.3em">
				<small>Предыдущая неделя</small>
			</div>

			<div class="weeks_buttons" id="next_week" style="margin-left: 0.3em">
				<small>Следующая неделя</small>
			</div>

		</div>

		<div class="container" align="left" id="schedule">

		</div>
	</div>

	</body>
</html>