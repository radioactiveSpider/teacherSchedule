(function () {

    var renderCapacity = 5;
    var workPointer = 0;

    var group = {};
    var students = [];
    var works = [];
    var globalIndex;

    function onAjaxSuccess(data) {
        students = data.students;
        group = data;
        works = data.works;
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
        var request = ajaxToFindGroup(groupId);
        request.done(function () {
            render();
        });
    });

    function render() {
        clear();
        createMainDiv();
        createHeader();
        createTable();
        createRowWithNextPrevRefs();
        createNextPrevHandlers();
        createRowWithNamesOfWorks();
        createRowWithInfo();
        createRowsForStudents();
        renderElementsForStudentsRows();
        createRowForButtons();
        createModalWindow();
        createEditModalWindow();
        createDeleteModalWindow();
        createHandlersForEditWork();
        createHandlersForDeleteWorks();
        createHandlersForModalElements();
    }

    function moveToNext() {
        if(workPointer + renderCapacity >= works.length){
            return;
        }
        workPointer += renderCapacity;
    }
    function moveToPrev() {
        if(workPointer - renderCapacity < 0){
            return;
        }
        workPointer -= renderCapacity;
    }

    function createNextPrevHandlers() {
        $('#nextWorks').click(function () {
            moveToNext();
            render();
        });

        $('#prevWorks').click(function () {
            moveToPrev();
            render();
        });
    }

    function clear() {
        $("#mainDiv").remove();
    }

    function createMainDiv() {
        addDiv($("body"), "mainDiv", "");
    }

    function createHeader() {
        var $h2 = addHeader($("#mainDiv"), "", "", "Группа " + group.groupNumber + " " + group.course);
        $h2.attr("align", "left");
    }

    function createTable() {
        addTable($("#mainDiv"), "table", "table");
    }

    function createRowWithNextPrevRefs() {
        var $row = addRow($("#table"), "nextPrevRow", "");
        $row.attr("align", "left");
        var $col1 = addColToRow($("#nextPrevRow"), ".", "", "");
        for(i = 0; i < renderCapacity; i++){
            addColToRow($("#nextPrevRow"), "", "", "");
        }

        addRefToCol($col1, "Назад", "prevWorks");
        addRefToCol($col1, " Вперед", "nextWorks");
    }

    function createRowWithNamesOfWorks() {
        var $row = addRow($("#table"), "namesOfWorksRow", "");
        $row.attr("align", "center");
        var $col = addColToRow($("#namesOfWorksRow"), "", "", "");

        var $button = createInvisibleButton("modalBtn", "Добавить работу", "submit", "btn btn-success", "");
        $button.css("display", "inline");
        $col.append($button);

        for (i = 0; i < renderCapacity; i++) {
            var className = "cls" + i;
            var $col = addColToRow($("#namesOfWorksRow"), className, "", "");
            if (i + workPointer < works.length) {
                addDivToCol($col, works[i + workPointer], i + workPointer);
            }
        }
    }

    function createModalWindow() {
        addModalWindow($("#mainDiv"));
    }

    function createHandlersForModalElements() {
        $('#modalBtn').click(function () {
            $('#openModal').css("display", "block");
        });

        $('#closeModal').click(function () {
            $('#openModal').css("display", "none");
        });

        $('#newWork').bind("click", onNewWork);
    }

    function onNewWork() {

        $('#openModal').css("display", "none");

        var work = {};

        work['workName'] = $('#workName').val();

        var work_info = works.find(function (value) {
            return value.workName === work.workName
        });

        if (work_info != null) {
            alert("Работа с таким именем уже существует!");
            return;
        }

        work['workType'] = $('#workType').val();
        work['workDate'] = $('#workDate').val();
        work['isChecked'] = false;
        works.push(work);

        for (i = 0; i < students.length; i++) {
            var work_ = {};
            work_['workName'] = $('#workName').val();
            work_['workType'] = $('#workType').val();
            work_['workDate'] = $('#workDate').val();
            work_['mark'] = "";
            students[i].works.push(work_)
        }

        if(works.length > renderCapacity) {
            moveToNext();
        }
        render();
    }

    function createRowWithInfo() {
        var $row = addRow($("#table"), "infoRow", "");
        $row.attr("align", "center");
        var $col = addColToRow($("#infoRow"), "", "");

        for (i = 0; i < renderCapacity; i++) {
            var className = "cls" + i;
            var $col = addColToRow($("#infoRow"), className, "", "");

            if (i + workPointer < works.length) {
                if (works[i + workPointer].isChecked == true) {
                    $col.text("Отмечено");
                    $col.css("color", "green");
                }
                else {
                    $col.text("Не отмечено");
                    $col.css("color", "black");
                }
            }
        }
    }

    function createRowsForStudents() {
        for (i = 0; i < students.length; i++) {
            var $row = addRow($("#table"), "", "");
            $row.attr("align", "center");
            var $col = addColToRow($row, "", "", students[i].fullName);

            for (j = 0; j < renderCapacity; j++) {
                var className = "cls" + j;
                var $col = addColToRow($row, className, "", "");
                var $select = createInvisibleWorkSelect("", className);
                var $div = createInvisibleDiv("", className);

                $div.data("workIndex", j + workPointer);
                $div.data("classIndex", j);

                $select.data("workIndex", j + workPointer);
                $select.data("classIndex", j);

                $col.append($select);
                $col.append($div);
            }
        }
    }

    function renderElementsForStudentsRows() {
        for (j = 0; j < renderCapacity; j++) {
            var className = "cls" + j;

            if (j + workPointer < works.length) {
                if (works[j + workPointer].isChecked == true) {
                    makeDivsVisible(className);
                }
                else {
                    makeSelectsVisible(className);
                }
            }
        }
    }

    function createRowForButtons() {
        var $row = addRow($("#table"), "buttonsRow", "");
        $row.attr("align", "center");
        addColToRow($row, "", "");
        for (i = 0; i < renderCapacity; i++) {
            var $col = addColToRow($("#buttonsRow"), "", "");
            var $save_button = createInvisibleButton("", "Сохранить", "submit", "btn btn-success", onSaveClick);
            var $change_button = createInvisibleButton("", "Изменить", "submit", "btn btn-success", onChangeClick);

            $change_button.data("workIndex", i + workPointer);
            $change_button.data("classIndex", i);

            $save_button.data("workIndex", i + workPointer);
            $save_button.data("classIndex", i);

            $col.append($save_button);
            $col.append($change_button);

            if (i + workPointer < works.length) {
                if (works[i + workPointer].isChecked == true) {
                    $change_button.css("display", "inline");
                }
                else {
                    $save_button.css("display", "inline");
                }
            }
        }
    }

    function onSaveClick() {
        var $btn = $(this);
        var workIndex = $btn.data("workIndex");
        var classIndex = $btn.data("classIndex");
        var className = "cls" + classIndex;

        works[workIndex].isChecked = true;

        $('select.' + className).each(function (i, elem) {
            students[i].works[workIndex].mark = $(elem).val();
        });

        group.works = works;
        group.students = students;

        var save_request = $.ajax({
            type: "POST",
            url: "/group/updateGroupInfo",
            data: JSON.stringify(group),
            contentType: 'application/json'
        });

        render();
    }

    function onChangeClick() {
        var $btn = $(this);
        var workIndex = $btn.data("workIndex");
        var workEntry = works[workIndex];
        workEntry.isChecked = false;
        render();
    }

    function makeDivsVisible(className) {
        $("div." + className).each(function (i, elem) {

            var workIndex = $(this).data("workIndex");

            var students_info = students[i].works[workIndex];
            chooseColor($(this).parent(), students_info.mark);
            $(this).text(students_info.mark);
            $(this).css("display", "inline");
        });
    }

    function makeSelectsVisible(className) {

        $('select.' + className).each(function (i, elem) {
            var workIndex = $(this).data("workIndex");

            if (works.length > 0) {

                var students_info = students[i].works[workIndex];
                $(elem).val(students_info.mark);
            }
            $(elem).css("display", "inline");
        });
    }

    function createEditModalWindow() {
        addEditModalWindow($("#mainDiv"));
    }

    function createDeleteModalWindow(){
        addDeleteModalWindow($("#mainDiv"));
    }

    function createHandlersForEditWork() {
        $('.edit').click(function () {

                $('#changeOpenModal').css("display", "block");
                var workIndex = $(this).data("workIndex");
                var work = works[workIndex];

                $('#changeWorkName').val(work.workName);
                $('#changeWorkType').val(work.workType);
                $('#changeWorkDate').val(work.workDate);

                $('#changeWork').data("workIndex", workIndex);
            }
        );

        $('#changeCloseModal').click(function () {
            $('#changeOpenModal').css("display", "none");
        });

        $('#changeWork').click(function () {
            $('#changeOpenModal').css("display", "none");

            var workIndex = $(this).data("workIndex");
            var newWork = {};

            newWork['workType'] = $('#changeWorkType').val();
            newWork['workDate'] = $('#changeWorkDate').val();
            newWork['workName'] = $('#changeWorkName').val();
            newWork['isChecked'] = works[workIndex].isChecked;

            works[workIndex] = newWork;
            render();
        });
    }

    function createHandlersForDeleteWorks(){
        $('.delete').click(function () {
                $('#deleteOpenModal').css("display", "block");
                var workIndex = $(this).data("workIndex");
                $('#deleteWork').data("workIndex", workIndex);
            }
        );

        $('#deleteCloseModal').click(function () {
            $('#deleteOpenModal').css("display", "none");
        });

        $('#deleteWork').click(function () {
            $('#deleteOpenModal').css("display", "none");
            var workIndex = $(this).data("workIndex");
            works.splice(workIndex, 1);
            for(i = 0; i < students.length; i++){
                students[i].works.splice(workIndex, 1);
            }

            group.works = works;
            group.students = students;

            var save_request = $.ajax({
                type: "POST",
                url: "/group/updateGroupInfo",
                data: JSON.stringify(group),
                contentType: 'application/json'
            });
            if(workPointer >= works.length){
                moveToPrev();
            }
            render();
        });

        $('#notDeleteWork').click(function () {
            $('#deleteOpenModal').css("display", "none");
        });
    }
})();