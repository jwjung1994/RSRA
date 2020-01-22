$(document).ready(function(){
  $('#selected-Stage').change(function() {
    var stage_val = $('#selected-Stage').val();
    //console.log(stage_val);
    $.ajax({
      url: '/case/select_element',
      dataType: 'json',
      type: 'POST',
      traditional : true,
      data: {data : stage_val},
      success: function(response){
        console.log( response );
      }
    });
    location.reload();
  });

  $('#selected-elements').change(function(){
    //console.log('ele 변환감지');
    var element_val = $('#selected-elements').val();
    //console.log(element_val);

    $.ajax({
      url: '/case/select_sub_element',
      dataType: 'json',
      type: 'POST',
      traditional : true,
      data: {data : element_val},
      success: function(response){
        console.log( response );
      }
    });
  });

  $('#selected-sub-elements').change(function(){
    console.log('sub-ele 변환감지');
  });
});
