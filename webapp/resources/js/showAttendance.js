(function() {
    var group = {};
    var students = [];
    var dates = [];

    function onAjaxSuccess(data) {
        students = data.students;
        dates = data.isCheckedDates;
        group = data;
    }

    function ajaxToFindGroup() {
        return $.ajax({
            type: "GET",
            url: "/group/findByPolyId",
            data: {groupId: groupId},
            contentType: 'application/json',
            success: onAjaxSuccess
        });
    }

    $(document).ready(function () {
        var request = ajaxToFindGroup();
        request.done(function () {
            renderMap();
            addListeners();
            mainRender();
        });
    });

    function renderMap() {

        var $row_head = $('#table_head');
        var $row_checked = $('#is_checked');
        var $row_buttons = $('#buttons');

        for (i = 0; i < RENDER_CAPACITY; i++) {

            addColToRow($row_head, "", id = i + "_head", text = "");
            addColToRow($row_checked, "", id = i + "_checked", text = "");
            renderColsForStudents(identifier = i);

            addColToRow($row_buttons, "", id = i + "_buttonCol", text = "");
            var $col_for_button = $('#' + i + '_buttonCol');

            var $change_button = createInvisibleButton(id = i + '_change', value = "Изменить", type = "submit", class_ = "btn btn-success");
            var $save_button = createInvisibleButton(id = i + '_save', value = "Сохранить", type = "submit", class_ = "btn btn-success");

            $change_button.appendTo($col_for_button);
            $save_button.appendTo($col_for_button);
        }
    }

    function renderColsForStudents(identifier) {

        for (j = 0; j < students.length; j++) {
            var $row_marks = $('#std_' + j);

            addColToRow($row_marks, "", id = 'std_' + j + '_' + identifier, text = "");

            var $select = createInvisibleSelect(id = 'std_' + j + '_' + identifier + '_select');
            var $text_field = createInvisibleDiv(id = 'std_' + j + '_' + identifier + '_text');
            var $col_for_marks = $('#std_' + j + '_' + identifier);

            $select.appendTo($col_for_marks);
            $text_field.appendTo($col_for_marks);
        }
    }

    function makeSelectsVisible(date, identifier) {
        for (j = 0; j < students.length; j++) {
            var $select = $('#std_' + j + '_' + identifier + '_select');
            var $col_for_marks = $('#std_' + j + '_' + identifier);
            $col_for_marks.css("background-color", "white");
            $select.css("display", "inline");
            var students_info = students[j].attendance.find(function (value) {
                return value.date === date
            });
            $select.val(students_info.status);
        }
    }

    function makeSelectsInvisible(identifier) {
        for (j = 0; j < students.length; j++) {
            var $select = $('#std_' + j + '_' + identifier + '_select');
            var $col_for_marks = $('#std_' + j + '_' + identifier);
            $col_for_marks.css("background-color", "white");
            $select.css("display", "none");
        }
    }

    function makeMarksVisible(date, identifier) {
        for (j = 0; j < students.length; j++) {
            var students_info = students[j].attendance.find(function (value) {
                return value.date === date
            });
            var $mark = $('#std_' + j + '_' + identifier + '_text');
            $mark.css( "display", "inline");
            var $col_for_marks = $('#std_' + j + '_' + identifier);
            chooseColor($col_for_marks, students_info.status);
            $mark.text(students_info.status);
        }
    }

    function makeMarksInvisible(identifier) {
        for (j = 0; j < students.length; j++) {
            var $mark = $('#std_' + j + '_' + identifier + '_text');
            var $col_for_marks = $('#std_' + j + '_' + identifier);
            $col_for_marks.css("background-color", "white");
            $mark.css("display", "none");

        }
    }

    function clearAll() {
        var $row_head = $('#table_head');
        var $row_checked = $('#is_checked');
        var $row_buttons = $('#buttons');

        for (q = 0; q < RENDER_CAPACITY; q++) {
            var $col_head = $('#' + q + "_head");
            var $button_change = $('#' + q + '_change');
            var $button_save = $('#' + q + '_save');
            var $date_col = $('#' + q + '_checked');

            var $change_button = $('#' + q + '_change');
            var $save_button = $('#' + q + '_save');

            $col_head.text("");
            $date_col.text("");

            $button_change.css("display", "none");
            $button_save.css("display", "none");
            makeSelectsInvisible(q);
            makeMarksInvisible(q);
        }
    }

    var RENDER_CAPACITY = 5;
    var dates_pointer = 0;

    function mainRender() {
        var $row_checked = $('#is_checked');
        var $row_buttons = $('#buttons');
        var identifierIndex = 0;

        if(dates.length - dates_pointer - 1 < RENDER_CAPACITY){
            clearAll();
        }

        for (w = dates_pointer; w < dates_pointer + RENDER_CAPACITY; w++) {
            var $col_head = $('#' + identifierIndex + "_head");
            var $button_change = $('#' + identifierIndex + '_change');
            var $button_save = $('#' + identifierIndex + '_save');
            var $date_col = $('#' + identifierIndex + '_checked');

            var $change_button = $('#' + identifierIndex + '_change');
            var $save_button = $('#' + identifierIndex + '_save');

            if(w < dates.length) {
                $col_head.text(dates[w].date);

                $change_button.off();
                $save_button.off();

                $change_button.click({date: dates[w].date, identifier: identifierIndex}, onChangeClick);
                $save_button.click({date: dates[w].date, identifier: identifierIndex}, onSaveClick);

                if (dates[w].status == "true") {

                    $date_col.text("Отмечено");
                    $date_col.css("color", "green");

                    $button_change.css("display", "inline");
                    $button_save.css("display", "none");
                    makeSelectsInvisible(identifierIndex);
                    makeMarksVisible(dates[w].date, identifierIndex);
                }

                if (dates[w].status == "false") {

                    $date_col.text("Не отмечено");
                    $date_col.css("color", "black");

                    $button_change.css("display", "none");
                    $button_save.css("display", "inline");
                    makeMarksInvisible(identifierIndex);
                    makeSelectsVisible(dates[w].date, identifierIndex);
                }
            }
            identifierIndex++;
        }
    }

    function onChangeClick(args) {
        var date_ = dates.find(function (value) {
            return value.date === args.data.date
        });
        date_.status = "false";
        mainRender();
    }

    function onSaveClick(args) {
        var date_ = dates.find(function (value) {
            return value.date === args.data.date
        });
        date_.status = "true";

        for (g = 0; g < students.length; g++) {
            var $select = $('#std_' + g + '_' + args.data.identifier + '_select');
            var students_info = students[g].attendance.find(function (value) {
                return value.date === args.data.date
            });
            students_info.status = $select.val();
        }

        group.isCheckedDates = dates;
        group.students = students;

        var save_request = $.ajax({
            type: "POST",
            url: "/group/updateGroupInfo",
            data: JSON.stringify(group),
            contentType: 'application/json'
            //success: onSaveInBaseSuccess
        });

        mainRender();
    }

    function onNextDates() {

        /*if (dates_pointer + RENDER_CAPACITY >= dates.length) {
            alert("Даты закончились");
            return
        }*/
        dates_pointer += RENDER_CAPACITY;
        mainRender();
    }

    function onPrevDates() {
        /*if (dates_pointer - RENDER_CAPACITY < 0) {
            alert("Даты закончились");
            return;
        }*/
        dates_pointer -= RENDER_CAPACITY;
        mainRender();
    }

    function returnToMenu() {
        $(location).attr('href', '/menu/showGroups?teacherId=' + teacherId);
    }

    function addListeners() {
        $('#next_dates').click(onNextDates);
        $('#prev_dates').click(onPrevDates);
        $('#return').click(returnToMenu);
    }

    function onSaveInBaseSuccess() {
        alert("Данные сохранены");
    }

})();