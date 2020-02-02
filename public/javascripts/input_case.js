/*
var max_length = 0;
if("row_length" in localStorage){
  max_length = localStorage.getItem("row_length");
}
else{
  max_length = 0;
}
*/
$(document).ready(function(){
  //call_storage_table();

  function sendAjax (sendUrl, sendData){
    var result;
    $.ajax({
      url: sendUrl,
      dataType: 'json',
      async : false,
      type: 'POST',
      traditional : true,
      data: {data : sendData},
      success: function(response){
        result = response;
      }
    });
    return result;
  }

  /* 첫번째 단계 선택 Stage */
  $('#selected-Stage').change(function() {
    var stage_val = $('#selected-Stage').val();
    var url = '/case/select_element';
    var result = sendAjax(url, stage_val);

    //console.log(result.lists_1.length);
    $('#selected-elements').empty();
    $('#selected-elements').append("<option>-</option>");
    for(var i = 1; i < result.lists_1.length; i++){
      var option = $("<option>"+result.lists_1[i]+"</option>");
      $('#selected-elements').append(option);
    }
  });

  /* 두번째 단계 선택 element */
  $('#selected-elements').change(function(){
    //console.log('ele 변환감지');
    var element_val = $('#selected-elements').val();
    var url = '/case/select_sub_element1';
    var result = sendAjax(url, element_val);

    $('#selected-sub-elements1').empty();
    $('#selected-sub-elements1').append("<option>-</option>");
    for(var i = 1; i < result.lists_2.length; i++){
      var option = $("<option>"+result.lists_2[i]+"</option>");
      $('#selected-sub-elements1').append(option);
    }
  });

  /* 세번째 단계 선택 sub1 */
  $('#selected-sub-elements1').change(function(){
    var element_val = $('#selected-sub-elements1').val();
    //console.log(element_val);
    var url = '/case/select_sub_element2';
    var result = sendAjax(url, element_val);

    $('#selected-sub-elements2').empty();
    $('#selected-sub-elements2').append("<option>-</option>");
    for(var i = 1; i < result.lists_3.length; i++){
      var option = $("<option>"+result.lists_3[i]+"</option>");
      $('#selected-sub-elements2').append(option);
    }
  });
  /* 네번째 단계 선택 sub2 */
  $('#selected-sub-elements2').change(function(){
    var element_val = $('#selected-sub-elements2').val();
    var url = '/case/select_sub_element3';
    var result = sendAjax(url, element_val);

    $('#selected-sub-elements3').empty();
    $('#selected-sub-elements3').append("<option>-</option>");
    for(var i = 1; i < result.lists_4.length; i++){
      var option = $("<option>"+result.lists_4[i]+"</option>");
      $('#selected-sub-elements3').append(option);
    }
  });
  /* case 추가 버튼 이벤트 */
  $('#add_btn').click(function(){
    var stage_val = $('#selected-Stage').val();
    var ele_val = $('#selected-elements').val();
    var subele_val1 = $('#selected-sub-elements1').val();
    var subele_val2 = $('#selected-sub-elements2').val();
    var subele_val3 = $('#selected-sub-elements3').val();

    if(ele_val == null){
      ele_val = '-';
    }
    if(subele_val1 == null){
      subele_val1 = '-';
    }
    if(subele_val2 == null){
      subele_val2 = '-';
    }
    if(subele_val3 == null){
      subele_val3 = '-';
    }
    var row = [stage_val, ele_val, subele_val1, subele_val2, subele_val3];
    $('#selected-elements-table > tbody:last').append("<tr><td>" + row[0] + "</td><td>" + row[1] + "</td><td>" + row[2] + "</td><td>" + row[3] +"</td><td>"+ row[4] + "</td><td><button class='btn-danger del'>Delete</button></td></tr>");
    /*
    localStorage.setItem("row" + max_length, JSON.stringify(row));
    localStorage.setItem("row_length", ++max_length);
    location.reload();
    */
  });

  $("#selected-elements-table").on('click', '.del', function(){
      $(this).closest('tr').remove();
  });
  /*
  // 추가되어 있는 테이블 특정 행 삭제
  $('#selected-elements-table').on('click', '.del_btn', function(){
    console.log(localStorage.getItem("row_length"));
    var del_idx = $(this).closest("tr").index();
    localStorage.removeItem("row" + del_idx);
    if(!("row" + del_idx in localStorage)){
      for(var i = del_idx + 1; i < max_length; i++){
        var shift_val_output = localStorage.getItem("row" + i);
        localStorage.setItem("row" + del_idx, shift_val_output);
        del_idx++;
      }
    }
    localStorage.setItem("row_length", --max_length);  // 1차감
    console.log(localStorage.getItem("row_length"));
    location.reload();
  });
  */
});
/*
function call_storage_table(){
  var length = localStorage.getItem("row_length");
  //console.log(length);
  for(var i = 0; i < length; i++){
    var output = localStorage.getItem("row" + i);
    var arr = JSON.parse(output);
    if(arr != null){
      console.log(length + '번 추가');
      var insert_str = "<tr><td>" + arr[0] + "</td><td>" + arr[1] + "</td><td>" + arr[2] + "</td><td><input type ='button' class = 'del_btn', value = '삭제'></td></tr>";
      $('#selected-elements-table > tbody:last').append(insert_str);
    }
  }
}

function inputCase(){
  localStorage.clear();
}
*/
