$('#guest-co-btn').click(function () {
    $('#act-quick-login').closest('button.btn-transparent').trigger('click');
    $(this).closest('ul').find('li:nth-child(2) button.btn-transparent').trigger('click');
})