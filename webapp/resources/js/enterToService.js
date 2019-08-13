var groups = [];
var numbersOfGroups = [];

var teacher = {
    "polytechId": fakeTeacherJson.polytechId,
    "firstName": fakeTeacherJson.first_name,
    "lastName": fakeTeacherJson.middle_name,
    "chair": fakeTeacherJson.chair,
    "groups": ""
};

function sortDatesInGroups() {
    groups.forEach(function (group) {
        group.datesOfLesson.sort();
    })
}

$(document).ready(function () {
    $('#startForm').click(function () {

        $('input[type="submit"]').prop('disabled', true);

        var requests;
        var ajax = $.ajax({
            type: "GET",
            url: "home/findByPolyId",
            data: {teacherId: teacher.polytechId},

            contentType: 'application/json'
        });

        ajax.done(function (result) {
            if (result == "") {
                requests = getAttributes();
                Promise.all(requests).then(function (value) {

                    teacher.groups = numbersOfGroups;
                    sortDatesInGroups();


                    var request1 = $.ajax({
                        type: "POST",
                        url: "home/addTeacher",
                        data: JSON.stringify(teacher),
                        contentType: 'application/json'
                    });

                    var request2 = $.ajax({
                        type: "POST",
                        url: "home/addGroups",
                        data: JSON.stringify(groups),
                        contentType: 'application/json'
                    });

                    $.when(request1, request2).then(function (value1) {
                        $(location).attr('href', "/menu?teacherId=" + teacher.polytechId);
                    });

                    var a = 1;

                });
            }
            else {
                $(location).attr('href', "/menu?teacherId=" + teacher.polytechId);
            }
        });
        return false;
    });
});

var fakeIndex = 0;

function fakeAjaxToDPA(group) {
    if (fakeIndex > fakeGroupJson.length - 1)
        fakeIndex = 0;
    return fakeGroupJson[fakeIndex++];
}

var CAPACITY = 20;
var MONTH = 30;
var STEP = 7;

function getAttributes() {

    var now = new Date();
    var date = now.getDate();
    var month = now.getMonth() + 1;
    var query = now.getFullYear() + "-" + month + "-" + date;
    var url = "https://ruz.spbstu.ru/api/v1/ruz/teachers/" + fakeTeacherJson.polytechId + "/scheduler";
    var requests = [];

    for (i_ = 0; i_ < CAPACITY; i_++) {

        var request1 = $.ajax({
            type: "GET",
            url: url,
            data: {date: query}
        });

        var request2 = request1.then(function (response) {
            onAjaxSuccess(response);
        });

        requests.push(request2);

        if ((parseInt(date) - STEP) <= 0) {
            date = (parseInt(date) - STEP) + MONTH;
            month = (parseInt(month) - 1);
            query = now.getFullYear() + "-" + JSON.stringify(month) + "-" + JSON.stringify(date);
            continue;
        }

        date = (parseInt(date) - STEP);
        query = now.getFullYear() + "-" + month + "-" + JSON.stringify(parseInt(date));
    }

    return requests;
}

function onAjaxSuccess(data) {
    for (i = 0; i < data.days.length; i++) {
        for (j = 0; j < data.days[i].lessons.length; j++) {
            if (data.days[i].lessons[j].typeObj.name == "Лекции") {
                continue;
            }

            var groupId = data.days[i].lessons[j].groups[0].id;
            var dateOfLesson = data.days[i].date;
            var course = data.days[i].lessons[j].subject;

            //if groupID&&course in groups but day is not..
            var group_local = groups.find(function (value) {
                return value.polytechId === groupId
            });

            if (group_local != null && group_local.course === course) {
                var isInDates = group_local.datesOfLesson.find(value => {
                    return value === dateOfLesson
                })
                if (isInDates == null) {
                    group_local.datesOfLesson.push(dateOfLesson);
                }
                continue;
            }

            var group = {
                "polytechId": data.days[i].lessons[j].groups[0].id,
                "groupNumber": data.days[i].lessons[j].groups[0].name,
                "students": fakeAjaxToDPA(groupId),
                "course": data.days[i].lessons[j].subject,
                "datesOfLesson": []
            }

            var groupNumber = {
                "polytechId": data.days[i].lessons[j].groups[0].id,
                "groupNumber": data.days[i].lessons[j].groups[0].name
            }

            group.datesOfLesson.push(dateOfLesson);
            groups.push(group);
            numbersOfGroups.push(groupNumber);
        }
    }
}