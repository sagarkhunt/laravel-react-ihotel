$(document).ready(function () {
    get_floors();

    $("form#floordata").submit(function (e) {
        e.preventDefault();
        id = $("#floor_id").val();
        if (id == 0) {
            var postUrl = api_base_path + "/create_floor";
        } else {
            var postUrl = api_base_path + "/update_floor";
        }
        var formData = new FormData(this);
        formData.append("status", $("#status").prop("checked"));
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
                    $("#add_floor").modal("hide");
                     if (data.data == "fail") {
                         Toast.fire({
                             icon: "error",
                             title: data.message,
                         });
                     } else {
                         Toast.fire({
                             icon: "success",
                             title: data.message,
                         });
                     }
                    reset_field();
                    get_floors();
                }
                if (data.success == false) {
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
    $("#name").val("");
    $("#description").val("");
}

function get_floors() {
    var url = api_base_path + "/get_floors";
    $.ajax({
        url: url,
        type: "POST",
        data: {},
        beforeSend: function () {},
        success: function (resp) {
            
            var html_data = "";
            var floor = resp.data;
            var $floorTable = $("#floor_table");
            for (var i = 0; i < floor.length; i++) {
                html_data += `
               <tr>
                    <td class="td-custom table-left">${floor[i].id}</td>
                    <td class="td-custom action-check">
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="customCheck1">
                            <label class="custom-control-label" for="customCheck1"></label>
                        </div>
                    </td>
                    <td class="td-custom">${floor[i].name}</td>
                    <td class="td-custom"><a class="a-btn-link">10 Rooms / Add Rooms</a></td>
                    <td class="td-custom">
                        <div class="${
                            floor[i].status == 1
                                ? "status-active"
                                : "status-deactive"
                        }"> ${
                    floor[i].status == 1 ? "Active" : "Deactive"
                }</div>
                    </td>
                    <td><span class="material-icons-outlined delete-table">
                            cancel_presentation
                        </span>
                        <span class="material-icons-outlined edit-table" onclick="edit_floor('${
                            floor[i].name
                        }','${floor[i].description}',${floor[i].id},${
                    floor[i].status
                },${i})">
                            edit
                        </span>
                    </td>

                </tr>`;
            }

            // Destroy the existing DataTable instance, if it exists
            if ($.fn.DataTable.isDataTable("#floor_table")) {
                $("#floor_table").DataTable().destroy();
            }

            // Clear the HTML content of the table body
            $("#floor_table_body").empty();

            // Update the HTML content of the table body with the new data
            $("#floor_table_body").html(html_data);

            $floorTable.DataTable({
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
            });

            var title = '<h5 class="card_headline neutral_700">User List</h5>';
            $("#user_table_length").html(title);
        },
        error: function () {},
    });
}

function open_floor() {
    reset_field();
    $("#ftable_header").text("Add Floor");
    $("#floorSwitch").addClass('d-none');
    $("#add_floor").modal("show");
}

function edit_floor(name, description, id, status) {
    $("#ftable_header").text("Edit Floor");
    $("#floor_id").val(id);
    $("#name").val(name);
    $("#description").val(description);
    $("#add_floor").modal("show");
    $("#floorSwitch").removeClass("d-none");
    if (status == 1) {
        $("#status").prop("checked", true);
    }else{
        $("#status").prop("checked", false);
    }
}
