$(document).ready(function () {
    get_section();

    $("form#sectiondata").submit(function (e) {
        e.preventDefault();
        id = $("#section_id").val();
        
        if (id == 0) {
            var postUrl = api_base_path + "/create_section";
        } else {
            var postUrl = api_base_path + "/update_section";
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
                    $("#add_section").modal("hide");
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
                    get_section();
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

function get_section() {
    var url = api_base_path + "/get_section";
    $.ajax({
        url: url,
        type: "POST",
        data: {},
        beforeSend: function () {},
        success: function (resp) {
            var html_data = "";
            var section = resp.data;
            var $sectionTable = $("#section_table");
            for (var i = 0; i < section.length; i++) {
                
                html_data += `
               <tr>
                    <td class="td-custom table-left">${section[i].id}</td>
                    <td class="td-custom action-check">
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="customCheck1">
                            <label class="custom-control-label" for="customCheck1"></label>
                        </div>
                    </td>
                    <td class="td-custom">${section[i].name}</td>
                    <td class="td-custom"><a class="a-btn-link">10 Rooms / Add Rooms</a></td>
                    <td class="td-custom">
                        <div class="${
                            section[i].status == 1
                                ? "status-active"
                                : "status-deactive"
                        }"> ${
                    section[i].status == 1 ? "Active" : "Deactive"
                }</div>
                    </td>
                    <td><span class="material-icons-outlined delete-table">
                            cancel_presentation
                        </span>
                        <span class="material-icons-outlined edit-table" onclick="edit_section('${
                            section[i].name
                        }','${section[i].description}',${section[i].id},${
                    section[i].status
                },${i})">
                            edit
                        </span>
                    </td>

                </tr>`;
            }

            // Destroy the existing DataTable instance, if it exists
            if ($.fn.DataTable.isDataTable("#section_table")) {
                $("#section_table").DataTable().destroy();
            }

            // Clear the HTML content of the table body
            $("#section_table_body").empty();

            // Update the HTML content of the table body with the new data
            $("#section_table_body").html(html_data);

            $sectionTable.DataTable({
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

            var title = '<h5 class="card_headline neutral_700">Section List</h5>';
            $("#user_table_length").html(title);
        },
        error: function () {},
    });
}

function open_section() {
    reset_field();
    $("#stable_header").text("Add Section");
    $("#sectionSwitch").addClass('d-none');
    $("#add_section").modal("show");
}

function edit_section(name, description, id, status) {
   
    $("#stable_header").text("Edit Section");
    $("#section_id").val(id);
    $("#name").val(name);
    $("#description").val(description);
    $("#sectionSwitch").removeClass("d-none");
    if (status == 1) {
        $("#status").prop("checked", true);
    }else{
        $("#status").prop("checked", false);
    }
    $("#add_section").modal("show");
}
