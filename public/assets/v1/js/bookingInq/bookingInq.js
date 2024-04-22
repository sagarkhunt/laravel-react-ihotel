$(document).ready(function () {
    get_bookingInq();

    $("#total_day").val(0);
    $("form#bookingdata").submit(function (e) {
        e.preventDefault();
        id = $("#booking_inq_id").val();
        var chk_in_dt = $("#chk_in_dt").val();
        var chk_out_dt = $("#chk_out_dt").val();
        if (id == 0) {
            if (chk_in_dt == "" || chk_in_dt == null) {
                Toast.fire({
                    icon: "error",
                    title: "Please Select Check In Date",
                });
                return;
            }
            if (chk_out_dt == "" || chk_out_dt == null) {
                Toast.fire({
                    icon: "error",
                    title: "Please Select Check Out Date",
                });
                return;
            }
            var postUrl = api_base_path + "/create_booking_inq";
        } else {
            var postUrl = api_base_path + "/update_booking_inq";
        }
        // Calculate the difference in milliseconds
        var timeDifference =
            new Date(chk_out_dt).getTime() - new Date(chk_in_dt).getTime();
        // Convert the difference to days
        var daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
        var status = $("#status").prop("checked") == "false" ? 0 : 1;
        // Convert the array to JSON
        addRowInArray();
        var jsonData = JSON.stringify(dataArray);
        
        if (jsonData.length == 0) {
            Toast.fire({
                icon: "error",
                title: "Please Select category",
            });
            return;
        }

        // Output the JSON data

        var formData = new FormData(this);
        
        formData.append("status", status);
        formData.append("total_day", daysDifference);
        formData.append("room_req", jsonData);
        formData.append(
            "total",
            document.querySelector(".td-custom:last-child p").textContent
        );
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
                $("#add_inquiry").modal("hide");
                if (data.success == true) {
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
                    get_bookingInq();
                }
                if (data.success == false) {
                    reset_field();
                    Toast.fire({
                        icon: "error",
                        title: data.message,
                    });
                }
            },
        });
    });
});
// Get the input element
var dateInput = document.getElementById("chk_out_dt");

// Add event listener for the change event
dateInput.addEventListener("change", function (event) {
    // Retrieve the selected date value
    var chk_in_dt = $("#chk_in_dt").val();
    if (chk_in_dt == "" || chk_in_dt == null) {
        Toast.fire({
            icon: "error",
            title: "Please Select Check In Date",
        });
        return;
    }
    var chk_out_dt = event.target.value;

    // Calculate the difference in milliseconds
    var timeDifference =
        new Date(chk_out_dt).getTime() - new Date(chk_in_dt).getTime();

    // Convert the difference to days
    var daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    $("#total_day").text(daysDifference);
});
// reset user filed
function reset_field() {
    $("#total_day").val(0);
    $("#chk_in_dt").val("");
    $("#chk_out_dt").val("");
    $("#cust_name").val("");
    $("#mobile_no").val("");
    $("#email").val("");
    $("#cust_cat_id").val("");
    $("#adult").val("");
    $("#child").val("");
    $("#sp_req").val("");
    $("#roomTableBody").html("");
    $("#sp_remark").val("");
    dataArray = [];
}
var bookingInq = [];
function get_bookingInq() {
    var url = api_base_path + "/get_booking_inq";
    $.ajax({
        url: url,
        type: "POST",
        data: {},
        beforeSend: function () {},
        success: function (resp) {
            var html_data = "";
            bookingInq = resp.data;
            var $floorTable = $("#booking_table");
            for (var i = 0; i < bookingInq.length; i++) {
                html_data += `
               <tr>
                    <td class="td-custom table-left">#${bookingInq[i].id}</td>
                    <td class="td-custom action-check">
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="customCheck1">
                            <label class="custom-control-label" for="customCheck1"></label>
                        </div>
                    </td>
                    <td class="td-custom">${bookingInq[i].chk_in_dt} - ${
                    bookingInq[i].chk_out_dt
                }</td>
                    <td class="td-custom"><p class="body-2 mb-0">${
                        bookingInq[i].cust_name
                    }</p><p class="caption-1 pt-1 mb-0">${
                    bookingInq[i].mobile
                }</p></td>
                    <td class="td-custom"><p class="body-2 mb-0">Deluxe Room <span>x1</span></p><p class="body-2 mb-0">Deluxe Room <span>x1</span></p></td>
                    
                    <td class="td-custom">
                        <div class="${
                            bookingInq[i].status == 1
                                ? "status-active"
                                : "status-deactive"
                        }"> ${
                    bookingInq[i].status == 1 ? "Open" : "Close"
                }</div>
                    </td>
                    <td><span class="material-icons-outlined delete-table">
                            cancel_presentation
                        </span>
                        <span class="material-icons-outlined edit-table" 
                        onclick="edit_bookingInq(
                             ${i})">
                            edit
                        </span>
                    </td>

                </tr>`;
            }

            // Destroy the existing DataTable instance, if it exists
            if ($.fn.DataTable.isDataTable("#booking_table")) {
                $("#booking_table").DataTable().destroy();
            }

            // Clear the HTML content of the table body
            $("#booking_table_body").empty();

            // Update the HTML content of the table body with the new data
            $("#booking_table_body").html(html_data);

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

function open_booking_inq() {
    reset_field();
    $("#booikng_header").text("Add Inquiry");
    $("#bookingSwitch").addClass("d-none");
    $("#totalRate").text('00');
    $("#add_inquiry").modal("show");
}
// Edit booking inquiry
function edit_bookingInq(index) {
    var bookingData = bookingInq[index];
    dataBooking = [];
    if (bookingData.room_req == null) {
        dataBooking = [];
    } else {
        dataBooking = JSON.parse(bookingData.room_req);
    }
    $("#totalRate").text("00");
    $("#booikng_header").text("Edit Inquiry");
    $("#booking_inq_id").val(bookingData.id);
    $("#chk_in_dt").val(bookingData.chk_in_dt);
    $("#chk_out_dt").val(bookingData.chk_out_dt);
    // Calculate the difference in milliseconds
    var timeDifference =
        new Date(bookingData.chk_out_dt).getTime() -
        new Date(bookingData.chk_in_dt).getTime();
    // Convert the difference to days
    var daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    $("#total_day").text(daysDifference);
    document.querySelector(".td-custom:last-child p").textContent =
        bookingData.total;
    $("#cust_name").val(bookingData.cust_name ?? "");
    $("#email").val(bookingData.email ?? "");
    $("#mobile_no").val(bookingData.mobile ?? "");
    $("#cust_cat_id").val(bookingData.cust_cat_id ?? 0);
    $("#adult").val(bookingData.adult ?? 0);
    $("#child").val(bookingData.child ?? 0);
    $("#sp_req").val(bookingData.sp_req ?? "");
    $("#sp_remark").val(bookingData.sp_remark ?? "");
    $("#add_inquiry").modal("show");
    $("#bookingSwitch").removeClass("d-none");
    if (bookingData.status == 1) {
        $("#status").prop("checked", true);
    } else {
        $("#status").prop("checked", false);
    }
    var tableBody = document.getElementById("roomTableBody");
    for (var i = 0; i < dataBooking.length; i++) {
        // Create a new row
        var newRow = document.createElement("tr");

        // Set HTML content for the new row
        newRow.innerHTML = `
        <td class="td-custom">
            <div class="input-group">
                <select class="form-select custom-input" aria-label=".form-select-sm example" id="room_cat_id_${i}">
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </div>
        </td>
        <td class="td-custom">
            <div class="input-group">
                <input type="number" class="form-control custom-input text-end" id="no_of_rooms_${i}" placeholder="00">
            </div>
        </td>
        <td class="td-custom">
            <div class="input-group">
                <select class="form-select custom-input" aria-label=".form-select-sm example" id="room_plan_id_${i}">
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </div>
        </td>
        <td class="td-custom">
            <div class="input-group">
                <input type="number" class="form-control custom-input text-end offered_rate" onkeyup="calculateTotalRate()" id="offered_rate_${i}" placeholder="00">
            </div>
        </td>
    `;
        newRow.querySelector(`#room_cat_id_${i}`).value =
            dataBooking[i].room_cat_id;
        newRow.querySelector(`#no_of_rooms_${i}`).value =
            dataBooking[i].no_of_rooms;
        newRow.querySelector(`#room_plan_id_${i}`).value =
            dataBooking[i].room_plan_id;
        newRow.querySelector(`#offered_rate_${i}`).value =
            dataBooking[i].offered_rate;
        // Append the new row to the table body
        tableBody.appendChild(newRow);
    }
    calculateTotalRate();

    // Calculate total rate
}
// Add to table row by cate
function addNewRoomCategory() {
    // Get reference to the table body
    var tableBody = document.getElementById("roomTableBody");

    // Create a new row
    var newRow = document.createElement("tr");

    // Set HTML content for the new row
    newRow.innerHTML = `
        <td class="td-custom">
            <div class="input-group">
                <select class="form-select custom-input" aria-label=".form-select-sm example room_cat_ids" id="room_cat_id">
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </div>
        </td>
        <td class="td-custom">
            <div class="input-group">
                <input type="number" class="form-control custom-input text-end" id="no_of_rooms" placeholder="00">
            </div>
        </td>
        <td class="td-custom">
            <div class="input-group">
                <select class="form-select custom-input" aria-label=".form-select-sm example" id="room_plan_id">
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </div>
        </td>
        <td class="td-custom">
            <div class="input-group">
                <input type="number" class="form-control custom-input text-end offered_rate" onkeyup="calculateTotalRate()" id="offered_rate" placeholder="00">
            </div>
        </td>
    `;
    // Append the new row to the table body
    tableBody.appendChild(newRow);
    // Calculate total rate
    calculateTotalRate();
    
}
// calculate total
function calculateTotalRate() {
    var totalRate = 0;
    // var roomRates = document.querySelectorAll(
    //     '#roomTableBody input[type="number"]'
    // );
    // roomRates.forEach(function (roomRateInput) {
    //     console.log("🚀 ~ roomRateInput:", roomRateInput)
    //     totalRate += parseFloat(roomRateInput.value || 0);
    // });
    var offeredRates = document.querySelectorAll(
        "#roomTableBody input.offered_rate"
    );

    // Initialize sum to 0
    var sum = 0;

    // Iterate over each input element
    offeredRates.forEach(function (input) {
        // Parse the value as a float and add it to the sum
        sum += parseFloat(input.value) || 0; // If the input value is not a number, treat it as 0
    });
    
    // Update the total rate in the last row
    document.querySelector("#totalRate").textContent = sum.toFixed(2);
}
// Create json
var dataArray = [];
function addRowInArray() {
    var rows = document.querySelectorAll("tr"); // Assuming these <td> elements are inside a <tr>
    rows.forEach(function (row) {
        var cells = row.querySelectorAll(".td-custom"); // Assuming these <td> elements have the class 'td-custom'
        if (cells.length === 4) {
            var room_cat_id = cells[0].querySelector("select").value;
            var no_of_rooms = cells[1].querySelector("input").value;
            var room_plan_id = cells[2].querySelector("select").value;
            var offered_rate = cells[3].querySelector("input").value;

            addRowToDataArray(
                room_cat_id,
                no_of_rooms,
                room_plan_id,
                offered_rate
            );
        }
    });
}
// set json
function addRowToDataArray(
    room_cat_id,
    no_of_rooms,
    room_plan_id,
    offered_rate
) {
    dataArray.push({
        room_cat_id: room_cat_id,
        no_of_rooms: no_of_rooms,
        room_plan_id: room_plan_id,
        offered_rate: offered_rate,
    });
}
// Set room cat optin
function getCatList() {
    var cat = localStorage.getItem("room_cate");
    if (cat) {
        cat = JSON.parse(localStorage.getItem("room_cate"));
        cat_name = cat;
        var html_data = "";
        html_data += '<option value="0">Select Room Catgory</option>';
        for (i = 0; i < cat.length; i++) {
            html_data +=
                '<option value="' +
                cat[i].id +
                '">' +
                cat[i].cat_name +
                "</option>";
        }
        $(".room_cat_ids").html(html_data);
        // if (val == "room") {
        // } else {
        //     $("#m_room_cat_id").html(html_data);
        // }
    }
}
