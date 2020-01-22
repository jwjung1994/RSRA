
var max_length = 0;
if("row_length" in localStorage){
  max_length = localStorage.getItem("row_length");
}
else{
  max_length = 0;
}

$(document).ready(function(){
  call_storage_table();
  /* 첫번째 단계 선택  */
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

  /* 두번째 단계 선택 */
  $('#selected-elements').change(function(){
    //console.log('ele 변환감지');
    var element_val = $('#selected-elements').val();

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
    location.reload();
  });

  /* case 추가 버튼 이벤트 */
  $('#add_btn').click(function(){
    var stage_val = $('#selected-Stage').val();
    var ele_val = $('#selected-elements').val();
    var subele_val = $('#selected-sub-elements').val();
    
    if(ele_val == null){
      ele_val = '-';
    }
    if(subele_val == null){
      subele_val = '-';
    }

    var row = [stage_val, ele_val, subele_val];
    localStorage.setItem("row" + max_length, JSON.stringify(row));
    localStorage.setItem("row_length", ++max_length);
    location.reload();
  });

  /* 추가되어 있는 테이블 특정 행 삭제 */
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
});

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
