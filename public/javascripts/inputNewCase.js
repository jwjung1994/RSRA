
$(document).ready(function(){
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

    $('#selected-elements').empty();
    $('#selected-elements').append("<option>-</option>");
    for(var i = 1; i < result.lists_1.length; i++){
      var option = $("<option>"+result.lists_1[i]+"</option>");
      $('#selected-elements').append(option);
    }
  });

  /* 두번째 단계 선택 element */
  $('#selected-elements').change(function(){
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

  /* 추가 버튼 이벤트, 아래 테이블에 행이 추가된다. */
  $('#add_btn').click(function(){
    var stage_val = $('#selected-Stage').val();
    var ele_val = $('#selected-elements').val();
    var subele_val1 = $('#selected-sub-elements1').val();
    var subele_val2 = $('#selected-sub-elements2').val();
    var subele_val3 = $('#selected-sub-elements3').val();
    var instance_val = $('#instance').val();
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
    if(instance_val == null){
      instance_val = '-';
    }
    var row = [stage_val, ele_val, subele_val1, subele_val2, subele_val3, instance_val];
    $('#selected-elements-table > tbody:last').append("<tr><td>" + row[0] + "</td><td>" + row[1] + "</td><td>" + row[2] + "</td><td>" + row[3] +"</td><td>"+ row[4] + "</td><td>"+ row[5] +"</td><td><button class='btn-danger del'>Delete</button></td></tr>");
  });

  /* 특정 행 삭제 이벤트 */
  $("#selected-elements-table").on('click', '.del', function(){
      $(this).closest('tr').remove();
  });

  $('#submit_btn').click(function(){
    var myRows = [];
    var $headers = $("th");
    var $rows = $("tbody tr").each(function(index) {
        //console.log(index);

        myRows.push({
          phase :  $(this).find("td").eq(0).html(),
          element :  $(this).find("td").eq(1).html(),
          sub_element1 :  $(this).find("td").eq(2).html(),
          sub_element2 :  $(this).find("td").eq(3).html(),
          sub_element3 :  $(this).find("td").eq(4).html(),
          instance :  $(this).find("td").eq(5).html()
        });

    });

    if(myRows == ''){
      alert('apt요소를 추가하세요.');
      return;
    }
    //console.log(myRows);
    $.ajax({
        url: '/result/sendtable',
        dataType: 'json',
        type: 'POST',
        traditional : true,
        data: {data : JSON.stringify(myRows)},
        success: function(response){
          console.log( response );
        }/*,
        error:function(request,status,error){
             alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }*/
    });
    //alert("성공@!");
    location.href = "/result/apt";
  });

});
