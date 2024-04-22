$(document).ready(function () {
    get_room_view();

    $("form#rooViewData").submit(function (e) {
        e.preventDefault();
        id = $("#room_view_id").val();
        room_plan_name = $("#room_view").val();
        if (room_plan_name == "" || room_plan_name == null) {
            Toast.fire({
                icon: "error",
                title: "Plan name is required",
            });
            return;
        }
        if (id == 0) {
            var postUrl = api_base_path + "/create_room_view";
        } else {
            var postUrl = api_base_path + "/update_room_view";
        }
        var formData = new FormData(this);
        formData.append("status", 1);
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
                    $("#add_room_view").modal("hide");
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
                    get_room_view();
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
    $("#room_view").val("");
    $("#desc").val("");
}

function get_room_view() {
    var url = api_base_path + "/get_room_view";
    $.ajax({
        url: url,
        type: "POST",
        data: {},
        beforeSend: function () {},
        success: function (resp) {
            var html_data = "";
            var roomView = resp.data;
            console.log("🚀 ~ get_room_view ~ roomView:", roomView);
            var $roomViewTable = $("#room_view_plan_body");
            for (var i = 0; i < roomView.length; i++) {
                html_data += `
                <tr>
                <td class="td-custom">${roomView[i].id}</td>
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
                <td class="td-custom">${
                    roomView[i].room_view
                }</td>                
                <td class="td-custom" width="32%">${roomView[i].desc}</td>
                <td class="td-custom">
                <div class="${
                    roomView[i].status == 1
                        ? "status-active"
                        : "status-deactive"
                }"> ${roomView[i].status == 1 ? "Active" : "Deactive"}</div>
                </td>
                <td>
                  <span class="material-icons-outlined delete-table" onclick="deleteRoomView(${
                      roomView[i].id
                  })">
                    cancel_presentation
                  </span>
                  <span class="material-icons-outlined edit-table" onclick="edit_room_plan('${
                      roomView[i].room_view
                  }','${roomView[i].desc}',${roomView[i].id},${
                    roomView[i].status
                },${i})">
                    create
                  </span>
                </td>
            </tr>`;
            }

            // Destroy the existing DataTable instance, if it exists
            if ($.fn.DataTable.isDataTable("#room_view_plan_body")) {
                $("#room_view_plan_body").DataTable().destroy();
            }

            // Clear the HTML content of the table body
            $("#room_view_list").empty();

            // Update the HTML content of the table body with the new data
            $("#room_view_list").html(html_data);

            $roomViewTable.DataTable({
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

function add_room_view() {
    reset_field();
    $("#room_view_header").text("Add Room View");
    $("#roomViewSwitch").addClass("d-none");
    $("#add_room_view").modal("show");
    $("#room_view_id").val(0);
}
// edit room view
function edit_room_plan(room_view, desc, id, status) {
    $("#room_view_header").text("Edit Room View");
    $("#room_view_id").val(id);
    $("#room_view").val(room_view);
    $("#desc").val(desc);
    $("#add_room_view").modal("show");
    $("#roomViewSwitch").removeClass("d-none");
    if (status == 1) {
        $("#status").prop("checked", true);
    } else {
        $("#status").prop("checked", false);
    }
}
function deleteRoomView(id) {
    console.log(id);
    // $("#del_room_view_id").val(id);
    // $("#delete_room_view").modal("show");
}

function delete_single_room_view() {
    var room_view_id = $("#del_room_view_id").val();
    var url = api_base_path + "/delete_room_view";
    $.ajax({
        url: url,
        type: "POST",
        data: {
            room_view_id: room_view_id,
        },
        beforeSend: function () {
            $("#pleaseWaitDialog").modal();
        },
        success: function (resp) {
            $("#delete_room_view").modal("hide");
            if (resp.success == true) {
                Toast.fire({
                    icon: "success",
                    title: resp.message,
                });
            }
            if (resp.success == false) {
                Toast.fire({
                    icon: "error",
                    title: resp.message,
                });
            }
            get_room_view();
            $("#pleaseWaitDialog").modal("hide");
        },
        error: function () {},
    });
}
