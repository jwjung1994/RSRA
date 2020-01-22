$(document).ready(function(){
  $(".del_btn").on('click', function(){
    var checkBtn = $(this);
    var tr = checkBtn.parent().parent();
    var td = tr.children();
    var id_val = td.eq(0).text();
    console.log(id_val);

    $.ajax({
      url: '/elements/delete',
      dataType: 'json',
      type: 'POST',
      traditional : true,
      data: {data : id_val},
      success: function(response){
        console.log( response );
      }
    });
    location.reload();
  });
});



/*
function chooseStage(){
  var val = $('#selectedStage').val();
  console.log(val);
  $.ajax({
    url: '/elements/selectStage',
    dataType: 'json',
    type: 'POST',
    traditional : true,
    data: {data : val},
    success: function(response){
      console.log( response );
    }
  });
}
*/
