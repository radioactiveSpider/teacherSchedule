
/*  TODO: fix global variables:
     startDate, week, days */

var startDate = new Date();

var tchId = 4261;

/**
 * getting date from open API
 * @param date
 * @returns {*}
 */
function getAttr(date) {
    //console.log(date);
    var requestDate = "?date=" +
        date.getFullYear().toString() + "-"
        + getMonthNumber(date) + "-"
        + date.getDate().toString();
    //console.log(requestDate);
    //var id = 4261;
    return $.get(
        "https://ruz.spbstu.ru/api/v1/ruz/teachers/" + tchId + "/scheduler" + requestDate,
        onAjaxSuccess
    );
}

/**
 * getting correct number of month
 * @param date
 * @returns {string} month number
 */
function getMonthNumber(date) {
    var res = date.getMonth() + 1;
    var add = "";
    if(res < 10)
        add += "0";
    return (add + res.toString());
}

/**
 * global struct with week start, finish and odd parameters
 * @type {{}}
 */
var week = {};

/**
 * Global array with schedule data
 * @type {Array}
 */
var days = [];

/**
 *  parsing data which we getting
 */
function onAjaxSuccess(data)
{
        week = {
        "date_start": data.week.date_start,
        "date_end": data.week.date_end,
        "is_odd": data.week.is_odd
    }

    for(i = 0; i < data.days.length; i++)
    {
        var weekDay = data.days[i].weekday;
        var date =  data.days[i].date;
        var dayLessons = [];

        for(j = 0; j < data.days[i].lessons.length; j++)
        {
            var lesson = {
                "subject": data.days[i].lessons[j].subject,
                "subjectShort": data.days[i].lessons[j].subject_short,
                "type": data.days[i].lessons[j].type,
                "addInfo": data.days[i].lessons[j].additional_info,
                "timeStart": data.days[i].lessons[j].time_start,
                "timeEnd": data.days[i].lessons[j].time_end,
                "parity": data.days[i].lessons[j].parity,
                "typeObj": data.days[i].lessons[j].typeObj,
                "groups": data.days[i].lessons[j].groups,
                "aud": data.days[i].lessons[j].auditories
            }
            dayLessons.push(lesson);
        }
        var day = {
            "dayNumber" : weekDay,
            "dayDate" : date,
            "dayLessons" : dayLessons,
        }
        days.push(day);
        //console.log(days);
    }

}
