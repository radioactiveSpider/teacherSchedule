function addRow($elem, id, class_) {
    var $tr = $("<tr>", {
        id: id,
        class: class_,
    });

    $tr.appendTo($elem);
    return $tr;
}

function addDiv($elem, id, class_) {
    var $div = $("<div>", {
        id: id,
        class: class_,
    });

    $div.appendTo($elem);
    return $div;
}

function addTable($elem, id, class_) {
    var $table = $("<table>", {
        id: id,
        class: class_,
    });
    $table.appendTo($elem);
    return $table;
}

function addHeader($elem, id, class_, text_) {
    var $h2 = $("<h2>", {
        id: id,
        class: class_,
        text: text_
    });

    $h2.appendTo($elem);
    return $h2;
}

function addColToRow($row_label, class_, id, text) {

    var $td = $("<td>", {
        id: id,
        class: class_,
        text: text
    });

    $td.appendTo($row_label);
    return $td;
}

function addJoinedEmptyCols($row_label, amountOfCols) {
    $row_label.append('<td colspan=amountOfCols></td>');
}

function createInvisibleButton(id_, value, type, class_, callback) {
    return $('<input>', {
        id: id_,
        value: value,
        type: type,
        class: class_,
        style: "display: none",
        click: callback
    });
}

function createInvisibleSelect(id_, class_) {
    var $select = $('<select>', {
        id: id_,
        class: class_,
        style: "display: none"
    });

    $("<option>+</option>" +
        "<option>н</option>" +
        "<option>2</option>" +
        "<option>3</option>" +
        "<option>4</option>" +
        "<option>5</option>", {}).appendTo($select);

    return $select;
}

function createInvisibleWorkSelect(id_, class_) {
    var $select = $('<select>', {
        id: id_,
        class: class_,
        style: "display: none"
    });

    $("<option>-</option>" +
        "<option>2</option>" +
        "<option>3</option>" +
        "<option>4</option>" +
        "<option>5</option>", {}).appendTo($select);

    return $select;
}

function createInvisibleDiv(id_, class_) {
    return $('<div>', {
        id: id_,
        class: class_,
        style: "display: none"
    });

}
function addRefToCol($col, text, id){
    var $a =  $('<a>',{
        style: "color: blue",
        id: id,
        text: text,
        class: "works_buttons"
    });
    $col.append($a);
}

function addDivToCol($col, work, index) {
    var $div = $('<div><span style="color: #4dac71">' +
        work.workName + '</span><br><span>' + work.workType +
        '</span><br><span>' + work.workDate + '<span><br></div>');

    var $a_edit = $('<a>',{
        style: "color: blue",
        class: "edit",
        text: "Редактировать"
    });
    $a_edit.data("workIndex", index);

    var $a_delete = $('<a>',{
        style: "color: red",
        class: "delete",
        text: "Удалить"
    });
    $a_delete.data("workIndex", index);

    $div.append($a_edit);
    $div.append('<br>');
    $div.append($a_delete);
    ($col).append($div);
}

function addModalWindow($elem) {
    var $div1 = $("<div>", {
        id: "openModal",
        class: "modalDialog"
    });

    var $div2 = $("<div>", {
        class: "container"
    });
    $div2.attr("align", "center");

    var $a = $("<a>", {
        id:"closeModal",
        class: "close",
        text: "X"
        }
    );

    var $div3 = $("<div>", {
        class: "container"
    });
    $div3.attr("align", "center");

    var $h2 = $("<h2>", {
        text: "Новая работа"
    })

    var $input1 = $("<input>", {
        id: "workType",
        placeholder: "Тип работы"
    });

    var $input2 = $("<input>", {
        id: "workName",
        placeholder: "Название работы"
    });

    var $input3 = $("<input>", {
        id: "workDate",
        placeholder: "Дата"
    });

    var $input4 = $("<input>", {
        id: "newWork",
        type: "submit",
        class: "btn btn-success",
        value: "Отправить"
    });

    $div1.append($div2);
    $div2.append($a);
    $div2.append($h2);
    $div2.append($div3);
    $div3.append($input2);
    $div3.append($input1);
    $div3.append($input3);
    $div2.append('</br>');
    $div2.append($input4);

    $elem.append($div1);

}

function addEditModalWindow($elem) {
    var $div1 = $("<div>", {
        id: "changeOpenModal",
        class: "modalDialog"
    });

    var $div2 = $("<div>", {
        class: "container"
    });
    $div2.attr("align", "center");

    var $a = $("<a>", {
            id:"changeCloseModal",
            class: "close",
            text: "X"
        }
    );

    var $div3 = $("<div>", {
        class: "container"
    });
    $div3.attr("align", "center");

    var $h2 = $("<h2>", {
        text: "Редактировать"
    })

    var $input1 = $("<input>", {
        id: "changeWorkType",
        placeholder: "Тип работы"
    });

    var $input2 = $("<input>", {
        id: "changeWorkName",
        placeholder: "Название работы"
    });

    var $input3 = $("<input>", {
        id: "changeWorkDate",
        placeholder: "Дата"
    });

    var $input4 = $("<input>", {
        id: "changeWork",
        type: "submit",
        class: "btn btn-success",
        value: "Изменить"
    });

    $div1.append($div2);
    $div2.append($a);
    $div2.append($h2);
    $div2.append($div3);
    $div3.append($input2);
    $div3.append($input1);
    $div3.append($input3);
    $div2.append('</br>');
    $div2.append($input4);

    $elem.append($div1);

}

function addDeleteModalWindow($elem) {
    var $div1 = $("<div>", {
        id: "deleteOpenModal",
        class: "modalDialog"
    });

    var $div2 = $("<div>", {
        class: "container"
    });
    $div2.attr("align", "center");

    var $a = $("<a>", {
            id:"deleteCloseModal",
            class: "close",
            text: "X"
        }
    );

    var $div3 = $("<div>", {
        class: "container"
    });
    $div3.attr("align", "center");

    var $h2 = $("<h2>", {
        text: "Удалить?"
    })

    var $input1 = $("<input>", {
        id: "deleteWork",
        type: "submit",
        class: "btn btn-success",
        value: "Да "
    });

    var $input2 = $("<input>", {
        id: "notDeleteWork",
        type: "submit",
        class: "btn btn-success",
        value: "Нет"
    });

    $div1.append($div2);
    $div2.append($a);
    $div2.append($h2);
    $div2.append($div3);
    $div3.append('<br><br>');
    $div3.append($input1);
    $div3.append('<br><br>');
    $div3.append($input2);
    $elem.append($div1);

}

function chooseColor($elem, mark){
    switch (mark) {
        case "н":
            $elem.css({backgroundColor:'#ffaca5'});
            break;
        case "-":
            $elem.css({backgroundColor:'#ffaca5'});
            break;
        case "+":
            $elem.css({backgroundColor: '#ffecbc'});
            break;
        case "2":
            $elem.css({backgroundColor:'#fff9a8'});
            break;
        case "3":
            $elem.css({backgroundColor:'#e5ffbe'});
            break;
        case "4":
            $elem.css({backgroundColor:'#d5fffd'});
            break;
        case "5":
            $elem.css({backgroundColor:'#c9ceff'});
            break;
        default:
            break;
    }
}