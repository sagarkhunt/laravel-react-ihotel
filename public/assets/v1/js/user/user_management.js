

$(document).ready(function () {
    get_users();
    
    $("form#userdata").submit(function (e) {
        e.preventDefault();
        id = $("#user_id").val();

        if (id == 0) {
            pwd = $("#password").val();
            d_i = $("#designation_id").val();
            if (d_i == 0) {
                Toast.fire({
                    icon: "error",
                    title: "please select designation",
                });
                return;
            }
            if (pwd == "") {
                Toast.fire({
                    icon: "error",
                    title: "password is required",
                });
                return;
            }
            var postUrl = api_base_path + "/create_user";
        } else {
            var postUrl = api_base_path + "/update_user";
        }
        alert('okay');
        var status = 0;
        var user_status = $("#user_status").val();
        if (user_status != 0) {
            $("#status").val(user_status);
            if ($("#status").val() != 0) {
                if ($("#android_access").is(":checked")) {
                    status += 1;
                }
                if ($("#brows_access").is(":checked")) {
                    status += 2;
                }
            }

            if (status != 0) {
                $("#status").val(status);
            }
        } else {
            $("#status").val(user_status);
            $("#en_app_gf").prop("checked", false);
            $("#app_gf").val(0);
        }
        var formData = new FormData(this);
        formData.append("user_status", $("#user_status").prop("checked"));

        $.ajax({
            url: postUrl,
            type: "POST",
            data: formData,
            dataType: "json",
            processData: false,
            contentType: false,
            beforeSend: function () {
                $("#pleaseWaitDialog").modal();
            },
            success: function (data) {
                //$("#pleaseWaitDialog").modal("hide");
                if (data.success == true) {
                    $("#add_user").modal("hide");
                    Toast.fire({
                        icon: "success",
                        title: data.message,
                    });
                    reset_field();
                    get_users();
                }
                if (data.status == 0) {
                    Toast.fire({
                        icon: "error",
                        title: data.message,
                    });
                }
            },
        });
    });
});

// reset user filed
function reset_field() {
    $("#user_name").val("");
    $("#name").val("");
    $("#mobile_no").val("");
    $("#designation_id").val(0);
    $("#imei").val("");
    $("#email").val("");
    $("#address").val("");
    $("#user_id").val(0);
    $("#status").val(1);
    $("#user_status").val(false);
    $("#password").val("");
    $("#city").val("");
    $("#pincode").val("");
    $("#from_time").val("");
    $("#to_time").val("");
}

function get_users() {
    var url = api_base_path + "/get_users";
    $.ajax({
        url: url,
        type: "POST",
        data: {},
        beforeSend: function () {},
        success: function (resp) {
            
            var html_data = "";
            var user = resp.data;
            var $userTableBody = $("#user_table_body");
            var $userTable = $("#user_table");
            for (var i = 0; i < user.length; i++) {
                html_data += `
               <tr>
                    <td class="td-custom table-left">${user[i].id}</td>
                    <td class="td-custom action-check">
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="customCheck1">
                            <label class="custom-control-label" for="customCheck1"></label>
                        </div>
                    </td>
                    <td class="td-custom">${user[i].name}</td>
                    <td class="td-custom">${user[i].email}</td>
                    <td class="td-custom table-left">-</td>
                    <td class="td-custom">
                        <div class="${
                            user[i].status == 1
                                ? "status-active"
                                : "status-deactive"
                        }"> ${user[i].status == 1 ? "Active" : "Deactive"}</div>
                    </td>
                    <td><span class="material-icons-outlined delete-table">
                            cancel_presentation
                        </span>
                        <span class="material-icons-outlined edit-table" onclick="edit_user('${
                            user[i].user_name
                        }','${user[i].name}',${user[i].designation_id},'${
                    user[i].email
                }','${user[i].mobile}',${user[i].id},${user[i].status},${
                    user[i].pin
                },'${user[i].city}','${user[i].address}',${i})">
                            edit
                        </span>
                    </td>

                </tr>`;
            }

            // Destroy the existing DataTable instance, if it exists
            if ($.fn.DataTable.isDataTable('#user_table')) {
                $('#user_table').DataTable().destroy();
            }
            
            // Clear the HTML content of the table body
            $('#user_table_body').empty();
            
            // Update the HTML content of the table body with the new data
            $('#user_table_body').html(html_data);
            
            $userTable.DataTable({
                paging: true,
                lengthChange: true,
                searching: true,
                ordering: false,
                info: false,
                autoWidth: false,
                responsive: true,
                language: {
                    search: "search",
                },
                  "pagingType": "simple_numbers",
                dom: '<"float-left"B><"float-right"f>rt<"row custom-footer-row "<"col-sm-4"l><"col-sm-4"i><"col-sm-4"p>>',
                    order: [[0, "desc"]],
                    columnDefs: [
                        {
                            targets: [1, 2, 3, 4],
                            orderable: false,
                        },
                    ],
                
            });
          
         
            // #myInput is a <input type="text"> element
$('#dt-serach-cstm').on('keyup', function () {
    $userTable.search(this.value).draw();
});
   
              $('#dt-length-1').addClass('custom-input');
            var title = '<h5 class="card_headline neutral_700">User List</h5>';
            $("#user_table_length").html(title);
        },
        error: function () {},
    });
}

function open_users() {
    reset_field();
    $("#utable_header").text("Add User");
    $("#userSwitch").addClass("d-none");
    $("#add_user").modal("show");
}

function edit_user(
    user_name,
    name,
    designation_id,
    email,
    mobile,
    id,
    status,
    pin,
    city,
    address,
    index
) {
    $("#utable_header").text("Edit User");
    $("#user_name").val(user_name);
    $("#name").val(name);
    $("#designation_id").val(designation_id);
    $("#email").val(email);
    $("#mobile_no").val(mobile);
    $("#user_id").val(id);
    // $("#user_status").val(status);
    $("#password").val("");
    $("#pincode").val(pin);
    $("#city").val(city);
    $("#address").val(address);
    
    if (status == 1) {
        $("#userSwitch").removeClass("d-none");
        $("#user_status").prop("checked", true);
    }else{

        $("#user_status").prop("checked", false);
    }
    $("#add_user").modal("show");
}
