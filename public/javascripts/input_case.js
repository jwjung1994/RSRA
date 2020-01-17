window.onload = function () {
    $("#ele_table").on('click', '.del', function(){
        $(this).closest('tr').remove();
    });
}

function changeMenu() {
    var Reconnaissance_phase_class = ["Collecting_method","Information_the_attacker_collects"];
    var Delivery_phase_class = ["Delivery_file_format", "Delivery_method/Spear-phishing_email", "Delivery_method/Watering_hole_attack", "Delivery_social_engineering_factors", "Delivery_social_engineering_technique/With_delivery_format", "Delivery_social_engineering_technique/With_delivery_method"];
    var Initial_intrusion_phase_class = ["Format_of_delivered_file/Document_file", "Format_of_delivered_file/Executable_file", "Format_of_delivered_file/Script", "Malware_format"];
    var Connecting_to_server_phase_class = [];
    var Lateral_movement_phase_class = [];
    var Information_gathering_phase_class = [];
    var Completing_the_attack_phase_class = [];

    var selected = $("#select1").val();
    var classes = [];

    if(selected == "Reconnaissance_phase")
        classes = Reconnaissance_phase_class;
    else if(selected == "Delivery_phase")
        classes = Delivery_phase_class;
    else if(selected == "Initial_intrusion_phase")
        classes = Initial_intrusion_phase_class;
    else if(selected == "Connecting_to_server_phase_phase")
        classes = Connecting_to_server_phase_class;
    else if(selected == "Lateral_movement_phase")
        classes = Lateral_movement_phase_class;
    else if(selected == "Information_gathering_phase")
        classes = Information_gathering_phase_class;
    else if(selected == "Completing_the_attack_phase")
        classes = Completing_the_attack_phase_class;

    $('#select2').empty();
    $('#select3').empty();

    for(var i = 0; i < classes.length; i++){
        var option = $("<option value:" + classes[i] + "text:" + classes[i]+ ">" + classes[i] + "</option>");
        $('#select2').append(option);
    }
}

function addElement(){
    //버튼 클릭 시 선택한 요소 보여줌
    var phase = $('#select1').val();
    var ele = $('#select2').val();
    var sub = 'c';
    if(ele.indexOf('/') != -1){
        var arr = ele.split('/');
    }else
        var arr = [ele, '-'];
    var name = $('#ele_name').val();
    $('#ele_name').val('');
    $('#ele_table > tbody:last').append("<tr><td>" + phase + "</td><td>" + arr[0] + "</td><td>" + arr[1] + "</td><td>" + name +"</td><td><button class='btn-danger del'>Delete</button></td></tr>");
}

function inputCase(){
    var myRows = [];
    var $headers = $("th");
    var $rows = $("tbody tr").each(function(index) {
        if(index!=0){
            $cells = $(this).find("td");
            myRows[index-1] = {};
            $cells.each(function(cellIndex) {
                if($($headers[cellIndex]).html()!="Delete")
                    myRows[index-1][$($headers[cellIndex]).html()] = $(this).html();
            });
        }
    });
    var list = [];
    for(mr in myRows){
        var mm = myRows[mr];
        if(mm['Sub class'] == '-'){
            list.push([mm['APT element'], mm['Name']]);
        }else
            list.push([mm['Sub class'], mm['Name']]);
    }
    /*
    $.ajax({
        type: 'POST',
        traditional: true,
        url: 'case',
        contentType: 'application/json',
        data: JSON.stringify(list),
        dataType: 'application/json',
        success: function(response){
          console.log( response );
        }
    } );
    */
    $.ajax({
        url: '/case/apt',
        dataType: 'json',
        type: 'POST',
        traditional : true,
        data: {data : list},
        success: function(response){
          console.log( response );
        }
    } );
}
