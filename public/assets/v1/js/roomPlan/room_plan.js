$(document).ready(function () {
    get_room_plan();

    $("form#roomPlanData").submit(function (e) {
        e.preventDefault();
        id = $("#room_plan_id").val();
        room_plan_name = $("#plan_name").val();
        room_code = $("#plan_code").val();
        if (room_plan_name == "" || room_plan_name == null) {
            Toast.fire({
                icon: "error",
                title: "Plan name is required",
            });
            return;
        }
        if (room_code == "" || room_code == null) {
            Toast.fire({
                icon: "error",
                title: "Room code is required",
            });
            return;
        }
        if (id == 0) {
            var postUrl = api_base_path + "/create_room_plan";
        } else {
            var postUrl = api_base_path + "/update_room_plan";
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
                    $("#add_roomPlan").modal("hide");
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
                    get_room_plan();
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
    $("#plan_name").val("");
    $("#plan_code").val("");
    $("#plan_desc").val("");
}

function get_room_plan() {
    var url = api_base_path + "/get_room_plan";
    $.ajax({
        url: url,
        type: "POST",
        data: {},
        beforeSend: function () {},
        success: function (resp) {
            var html_data = "";
            var roomPlan = resp.data;
            console.log("🚀 ~ get_room_plan ~ roomPlan:", roomPlan);
            var $roomPlanTable = $("#room_plan_table_body");
            for (var i = 0; i < roomPlan.length; i++) {
                html_data += `
                <tr>
                <td class="td-custom">${roomPlan[i].id}</td>
                <td class="td-custom action-check">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="customCheck1"
                    />
                    <label
                      class="custom-control-label"
                      for="customCheck1"
                    ></label>
                  </div>
                </td>
                <td class="td-custom">${roomPlan[i].plan_name}</td>
                <td class="td-custom">${roomPlan[i].plan_code}</td>
                <td class="td-custom" width="32%">${roomPlan[i].plan_desc}</td>
                <td class="td-custom">
                <div class="${
                    roomPlan[i].status == 1
                        ? "status-active"
                        : "status-deactive"
                }"> ${roomPlan[i].status == 1 ? "Active" : "Deactive"}</div>
                </td>
                <td>
                  <span class="material-icons-outlined delete-table">
                    cancel_presentation
                  </span>
                  <span class="material-icons-outlined edit-table" onclick="edit_room_plan('${
                      roomPlan[i].plan_name
                  }','${roomPlan[i].plan_code}','${roomPlan[i].plan_desc}',${
                    roomPlan[i].id
                },${roomPlan[i].status},${i})">
                    create
                  </span>
                </td>
            </tr>`;
            }

            // Destroy the existing DataTable instance, if it exists
            if ($.fn.DataTable.isDataTable("#room_plan_table_body")) {
                $("#room_plan_table_body").DataTable().destroy();
            }

            // Clear the HTML content of the table body
            $("#room_plan_table").empty();

            // Update the HTML content of the table body with the new data
            $("#room_plan_table").html(html_data);

            $roomPlanTable.DataTable({
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

            var title =
                '<h5 class="card_headline neutral_700">Room Plan List</h5>';
            $("#user_table_length").html(title);
        },
        error: function () {},
    });
}

function open_room_plan() {
    reset_field();
    $("#exampleModalLabel").text("Add Room Plan");
    $("#roomPlanSwitch").addClass("d-none");
    $("#add_roomPlan").modal("show");
    $("#room_plan_id").val(0);
}

function edit_room_plan(plan_name, plan_code, plan_desc, id, status) {
    $("#exampleModalLabel").text("Edit Room Plan");
    $("#room_plan_id").val(id);
    $("#plan_name").val(plan_name);
    $("#plan_code").val(plan_code);
    $("#plan_desc").val(plan_desc);
    $("#add_roomPlan").modal("show");
    $("#roomPlanSwitch").removeClass("d-none");
    if (status == 1) {
        $("#status").prop("checked", true);
    } else {
        $("#status").prop("checked", false);
    }
}
