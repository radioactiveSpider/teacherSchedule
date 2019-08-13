$(document).ready(function(){
    $('.dropdown').click(function(){
        var id = $(this).next().text();
        $('#' + id).toggleClass('show');
    });
});