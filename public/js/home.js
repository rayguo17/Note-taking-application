$(function () {
    $('#putNoteModal').on('show.bs.modal', function (e) {
        var button = $(e.relatedTarget)
        console.log(button.attr('id').slice(7));
        let id = button.attr('id').slice(7);
        let title = $(`#note-${id} h3`).text();
        let content = $(`#note-${id} p`).text();
        console.log(title, content);
        var modal = $(this);
        modal.find('#put-note-title').val(title);
        modal.find('#put-note-content').val(content);
        modal.find('#put-note-id').val(id);
        modal.find('')
    })
    $('#Edit-note-form').on('submit', function (e) {
        e.preventDefault();
        console.log('submit form');
        let title = $('#put-note-title').val();
        let content = $('#put-note-content').val();
        let id = $('#put-note-id').val();
        console.log('submit', title, content, id);
        $.ajax({
            type: 'PUT',
            url: '/api/notes',
            data: { title: title, content: content, id: id },
        }).done((res) => {
            console.log(res);
            window.location.href = '/api/notes'
        })
        
    })
    $('.delete-button').on('click', function (e) {
        console.log($(this));
        let id = $(this).attr('id').slice(7);
        console.log(id);
        $.ajax({
            type: 'DELETE',
            data: { id: id },
            url: '/api/notes',
        }).done((res) => {
            window.location.href = '/api/notes'
        })
    })
})
