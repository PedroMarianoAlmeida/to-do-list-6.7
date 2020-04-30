const myID = '151'
const baseURL = 'https://altcademy-to-do-list-api.herokuapp.com';

let includeNewTaskRow = function(newTask) {
    $('#my-current-list').append(`<li class='text-left d-flex justify-content-between'>
    <div class='d-inline'>
        <input type='checkbox' class='mr-2'>
        <span>${newTask}</span>
    </div>
    <div>
        x
    </div>
    </li>`);    
}

let showAllTasks = function(){
    $.ajax({
        type: 'GET',
        url: `${baseURL}/tasks?api_key=${myID}`,
        dataType: 'json',
        success: function (response, textStatus) {
          for(let task of response.tasks){
            console.log(task.content);
            includeNewTaskRow(task.content);
          }
        },

        error: function (request, textStatus, errorMessage) {
          console.log(errorMessage);
        }
      });
}

var timeoutAdd;
let insertActivity = function() {
    clearTimeout(timeoutAdd);
    timeoutAdd = setTimeout( function(){     
        $.ajax({
            type: 'POST',
            url: `${baseURL}/tasks?api_key=${myID}`,
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
              task: {
                content: $('#new-item').val(),
              }
            }),
            success: function (response, textStatus) {
              includeNewTaskRow($('#new-item').val());
              $('#new-item').val('');
            },
            error: function (request, textStatus, errorMessage) {
              console.log(errorMessage);
            }
          });

    } , 1000);
}

$(document).ready( function(){
    showAllTasks();
    $(document).on('click' , '.btn-add-item' , insertActivity);
})


