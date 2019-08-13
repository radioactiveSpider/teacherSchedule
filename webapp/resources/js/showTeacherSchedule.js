/**
 * Created by Andrey on 21.04.2019.
 */

/**
 * date which we have at enter in application
 * */
var date = startDate;
/*
* week - global struct
* days - global array
* */

$(document).ready(function () {
    var request = getAttr(startDate);
    request.done(function () {
        generateSchedule();
        addListenersCl();
    });
});

/**
 * generate content for page with schedule
 */
function generateSchedule()
{
    var $scheduleDiv = $("#schedule");
    $scheduleDiv.empty();
    //console.log("clear schedule");

    addCurWeekField();

    for(var i = 0; i < days.length; i++)
       generateDayDiv(i, $scheduleDiv);
    if(days.length <= 0)
        $("<div>",{
            class: "NoLessonWarning",
            text: "Нет занятий на этой неделе"
            }).appendTo($scheduleDiv);

    //console.log(days);
}

/**
 * waiting of button press (next or prev week)
 * @constructor
 */
function addListenersCl() {
    $('#next_week').click(onNextWeek);
    $('#prev_week').click(onPrevWeek);
    $('#return').click(returnToMenu);
}

function returnToMenu() {
    $(location).attr('href', '/menu/?teacherId=' + tchId);
}

/**
 * change week to previous and start handler of week changing
 */
function onNextWeek() {
    date.setDate(date.getDate() + 7);
    onWeekHandler();
}

/**
 * change week to next and start handler of week changing
 */
function onPrevWeek() {
    date.setDate(date.getDate() - 7);
    onWeekHandler();
}

/**
 * handler of week changing
 * update data on page
 */
function onWeekHandler() {
    days.splice(0, days.length);
    var request = getAttr(date);
    request.done(function () {
        generateSchedule();
    })
}

/**
 *
 * @param numDay number of day in day list from request
 * @param $scheduleDiv container to add
 */
function generateDayDiv(numDay, $scheduleDiv) {
    var dayLessons = getLessonDivs(numDay); // list of lessons in this day
    var dayName = getDayName(days[numDay].dayNumber).toString()

    $("<div>", {
        class: "day",
        id: "day" + numDay.toString(),
        text: dayName,
        append: (dayLessons),
    }).appendTo($scheduleDiv);

    var str = '#day' + numDay;
    var $day  = $(str);

    var dayMonth = getMonthNameFromAr(numDay).toString();
    var dayDate =  getDateOfDay(numDay).toString();
    var visibleDate = dayDate + " " + dayMonth;

    $("<div>", {
        class: "dayDate",
        text: visibleDate,
    }).prependTo($day);

}

/**
 *
 * @param dayNumber number of day in week
 * @returns {string} string with day name
 */
function getDayName(dayNumber) {
    switch (dayNumber)
    {
        case 1:
            return "Понедельник";
        case 2:
            return "Вторник";
        case 3:
            return "Среда";
        case 4:
            return "Четверг";
        case 5:
            return "Пятница";
        case 6:
            return "Суббота";
        case 7:
            return "Воскресенье"
        default:
            return "Day is undefined"
    }
}

/**
 *  generate array of containers with lessons
 * @param i number of day in list from request
 * @returns {Array} of containers
 */
function getLessonDivs(i) {
    var dayLessons = [];

    for(var j = 0; j < days[i].dayLessons.length; j++)
    {
        var nameLesson = days[i].dayLessons[j].subject.toString() + " " ;
        var typeLesson = (getLessonType(i, j));

        var timeLesson = days[i].dayLessons[j].timeStart.toString() + "-" +
            days[i].dayLessons[j].timeEnd.toString();

        var audNumber = getLessonAudInfo(i, j);

        var lesson = $("<div>", {
            class: "lesson",
            id: "lesson" + j
        });

        $("<div>", {
            class: "nameLesson",
            text: nameLesson }).prependTo(lesson);


        $("<div>", {
            class: "typeLesson",
            text: typeLesson }).appendTo(lesson);

        $("<div>", {
            class: "aud",
            text: audNumber }).appendTo(lesson);

        $("<div>", {
            class: "timeLesson",
            text: timeLesson }).appendTo(lesson);

        $("<br>").appendTo(lesson);

        dayLessons.push(lesson);
    }
    return dayLessons;
}

/**
 *
 * @param numDay number of day in list from request
 * @param numLesson number of lesson in list of lessons for this day
 * @returns {string} with type if lesson
 */
function getLessonType(numDay, numLesson){
    switch (days[numDay].dayLessons[numLesson].type)
    {
        case 0:
            return "Практика ";
        case 2:
            return "Лекция "
        case 4:
            return "Консультация ";
        case 7:
            return "Экзамен ";
    }
}

/**
 *
 * @param numDay number of day in list from request
 * @param numLesson number of lesson in list of lessons for this day
 * @returns {string} full name of place where lesson is
 */
function getLessonAudInfo(numDay, numLesson) {
    var obj = days[numDay].dayLessons[numLesson].aud[0];
    var buildingName = obj.building.name + ", ";
    var audName = obj.name + " аудитория";
    return buildingName + audName;
}

/**
 * get month name for displaying
 * @param num number of day in list days
 * @returns {string}
 */
function getMonthNameFromAr(num) {
    var month = new Date(days[num].dayDate.toString());
    var n = month.getMonth() + 1;
    return getMonthName(n);
}

/**
 * get month name by number of month in year
 * @param num
 */
function getMonthName(num) {
    switch (num) {
        case 1:
            return "Января";
        case 2:
            return "Февраля";
        case 3:
            return "Марта";
        case 4:
            return "Апреля";
        case 5:
            return "Мая";
        case 6:
            return "Июня";
        case 7:
            return "Июля";
        case 8:
            return "Августа";
        case 9:
            return "Сентября";
        case 10:
            return "Октября";
        case 11:
            return "Ноября";
        case 12:
            return "Декабря";
    }
}

/**
 * get date of day
 * @param num number of day in list days
 * @returns {number} date (number in month)
 */
function getDateOfDay(num) {
    var lessonDate = new Date(days[num].dayDate.toString());
    return lessonDate.getDate();
}

/**
 * change current week
 */
function addCurWeekField() {
    var $curWeek = $('#current_week');
    //var weekDates = "Расписание с " + week.date_start.toString()
    //    + " " + "по" + " " + week.date_end.toString();
    var filter = new RegExp(/\./gi, 'g');
    var ds = (week.date_start.toString().replace(filter, '-'))
    var de = (week.date_end.toString().replace(filter, '-'))
    var tmpStart = new Date(ds);
    var tmpEnd = new Date(de);

    var weekDates = "Расписание с " +
        tmpStart.getDate().toString() + " " +
        getMonthName(tmpStart.getMonth() + 1) +
        " по " + tmpEnd.getDate().toString() + " " +
        getMonthName((tmpEnd.getMonth() + 1));

    $curWeek.empty();

    $("<div>",{
        class: "curWeekCont",
        text: weekDates
    }).appendTo($curWeek);

}