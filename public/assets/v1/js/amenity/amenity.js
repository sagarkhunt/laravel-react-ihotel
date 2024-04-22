$(document).ready(function () {
    get_amenity();

    $("form#amenitydata").submit(function (e) {
        e.preventDefault();
        id = $("#amnt_id").val();
        var icon = $("#selectedIconInput").val();
        if (icon == "" || icon == null) {
            Toast.fire({
                icon: "error",
                title: "Amenity Icon is required",
            });
        }

        if (id == 0) {
            var postUrl = api_base_path + "/create_amenity";
        } else {
            var postUrl = api_base_path + "/update_amenity";
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
                    $("#add_amenity").modal("hide");

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
                    get_amenity();
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
    $("#amnt").val("");
    $("#description").val("");
}

function selectIcon(iconName) {
    document.getElementById("selectedIcon").textContent = iconName;
    // Set the selected icon value in a hidden input field
    document.getElementById("selectedIconInput").value = iconName;
}

function get_amenity() {
    var url = api_base_path + "/get_amenity";
    $.ajax({
        url: url,
        type: "POST",
        data: {},
        beforeSend: function () {},
        success: function (resp) {
            var html_data = "";
            var amenity = resp.data;
            var $amenityTable = $("#amenity_table");
            for (var i = 0; i < amenity.length; i++) {
                html_data += `
               <tr>
                    <td class="td-custom table-left">${amenity[i].id}</td>
                    <td class="td-custom action-check">
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="customCheck1">
                            <label class="custom-control-label" for="customCheck1"></label>
                        </div>
                    </td>
                    <td class="td-custom">${amenity[i].amnt}</td>
                    <td class="td-custom">${amenity[i].description}</td>
                    <td class="td-custom">
                        <div class="${
                            amenity[i].status == 1
                                ? "status-active"
                                : "status-deactive"
                        }"> ${
                    amenity[i].status == 1 ? "Active" : "Deactive"
                }</div>
                    </td>
                    <td><span class="material-icons-outlined delete-table">
                            cancel_presentation
                        </span>
                        <span class="material-icons-outlined edit-table" onclick="edit_amenity('${
                            amenity[i].amnt
                        }','${amenity[i].description}','${
                    amenity[i].amnt_icon
                }',${amenity[i].id},${amenity[i].status},${i})">
                            edit
                        </span>
                    </td>

                </tr>`;
            }

            // Destroy the existing DataTable instance, if it exists
            if ($.fn.DataTable.isDataTable("#amenity_table")) {
                $("#amenity_table").DataTable().destroy();
            }

            // Clear the HTML content of the table body
            $("#amenity_table_body").empty();

            // Update the HTML content of the table body with the new data
            $("#amenity_table_body").html(html_data);

            $amenityTable.DataTable({
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

function open_amenity() {
    reset_field();
    $("#ftable_header").text("Add amenity");
    $("#amntSwitch").addClass("d-none");
    $("#add_amenity").modal("show");
}

function edit_amenity(amnt, description, amnt_icon, id, status) {
    $("#ftable_header").text("Edit amenity");
    $("#amnt_id").val(id);
    $("#amnt").val(amnt);
    $("#description").val(description);
    $("#selectedIconInput").val(amnt_icon);
    $("#add_amenity").modal("show");
    $("#amntSwitch").removeClass("d-none");
    selectIcon(amnt_icon);
    if (status == 1) {
        $("#status").prop("checked", true);
    } else {
        $("#status").prop("checked", false);
    }
}
