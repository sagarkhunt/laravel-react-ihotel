$(document).ready(function () {
    get_inq_type();

    $("form#inqTypeData").submit(function (e) {
        e.preventDefault();
        id = $("#inq_type_id").val();
        inq_type = $("#inq_type").val();
        if (inq_type == "" || inq_type == null) {
            Toast.fire({
                icon: "error",
                title: "Inq type is required",
            });
            return;
        }
        if (id == 0) {
            var postUrl = api_base_path + "/create_inq";
        } else {
            var postUrl = api_base_path + "/update_inq";
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
                    $("#add_inquiryType").modal("hide");
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
                    get_inq_type();
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
    $("#inq_type").val("");
    $("#inq_desc").val("");
}

function get_inq_type() {
    var url = api_base_path + "/get_inq_type";
    $.ajax({
        url: url,
        type: "POST",
        data: {},
        beforeSend: function () {},
        success: function (resp) {
            var html_data = "";
            var inqType = resp.data;
            console.log("🚀 ~ get_inq_type ~ inqType:", inqType);
            var $inqTypeTable = $("#inq_type_list_body");
            for (var i = 0; i < inqType.length; i++) {
                html_data += `
                <tr>
                <td class="td-custom">${inqType[i].id}</td>
                <td class="td-custom action-check">
                    <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="customCheck1">
                        <label class="custom-control-label" for="customCheck1"></label>
                    </div>
                </td>
                <td class="td-custom">${inqType[i].inq_type}</td>

                <td class="td-custom" width="32%">${inqType[i].inq_desc}</td>
                <td class="td-custom">
                <div class="${
                    inqType[i].status == 1 ? "status-active" : "status-deactive"
                }"> ${inqType[i].status == 1 ? "Active" : "Deactive"}</div>
                </td>
                <td><span class="material-icons-outlined delete-table">
                        cancel_presentation
                    </span>
                    <span class="material-icons-outlined edit-table" onclick="edit_inq_type('${
                        inqType[i].inq_type
                    }','${inqType[i].inq_desc}',${inqType[i].id},${
                    inqType[i].status
                },${i})">
                        create
                    </span>
                </td>
            </tr>`;
            }

            // Destroy the existing DataTable instance, if it exists
            if ($.fn.DataTable.isDataTable("#inq_type_list_body")) {
                $("#inq_type_list_body").DataTable().destroy();
            }

            // Clear the HTML content of the table body
            $("#inq_type_list").empty();

            // Update the HTML content of the table body with the new data
            $("#inq_type_list").html(html_data);

            $inqTypeTable.DataTable({
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

            var title = '<h5 class="card_headline neutral_700">Inq List</h5>';
            $("#user_table_length").html(title);
        },
        error: function () {},
    });
}

function open_inq() {
    reset_field();
    $("#exampleModalLabel").text("Add Inquiry Type");
    $("#inqSwitch").addClass("d-none");
    $("#add_inquiryType").modal("show");
    $("#inq_type_id").val(0);
}

function edit_inq_type(inq_type, inq_desc, id, status) {
    $("#exampleModalLabel").text("Edit Inquiry Type");
    $("#inq_type_id").val(id);
    $("#inq_type").val(inq_type);
    $("#inq_desc").val(inq_desc);
    $("#add_inquiryType").modal("show");
    $("#inqSwitch").removeClass("d-none");
    if (status == 1) {
        $("#status").prop("checked", true);
    } else {
        $("#status").prop("checked", false);
    }
}
