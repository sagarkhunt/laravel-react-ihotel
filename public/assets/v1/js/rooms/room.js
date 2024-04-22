$(document).ready(function () {
    get_room();
    enableInput();
    var form = document.getElementById("formrooms");

    // Add event listener to the form
    form.addEventListener("submit", function (event) {
        // Prevent default form submission
        event.preventDefault();
        
        // return
        // Get the clicked button
        var clickedButton = event.submitter;

        // Determine the action based on the clicked button
        var action = "";
        if (clickedButton.id === "saveButton") {
            action = "save";
        } else if (clickedButton.id === "saveDuplicateButton") {
            action = "save_and_duplicate";
        }

        // $("form#formrooms").submit(function (e) {
        // e.preventDefault();
        id = $("#room_id").val();

        if (id == 0) {
            room_cat_id = $("#room_cat_id").val();
            section_id = $("#section_id").val();
            floor_id = $("#floor_id").val();
            room_size = $("#room_size").val();
            if (room_cat_id == 0) {
                Toast.fire({
                    icon: "error",
                    title: "Please Select Category",
                });
                return;
            }
            if (section_id == 0) {
                Toast.fire({
                    icon: "error",
                    title: "Please Select Section",
                });
                return;
            }
            if (floor_id == 0) {
                Toast.fire({
                    icon: "error",
                    title: "Please Select Sloor",
                });
                return;
            }
            if (room_size == "") {
                Toast.fire({
                    icon: "error",
                    title: "The room size field is required.",
                });
                return;
            }
            var postUrl = api_base_path + "/create_room";
        } else {
            var postUrl = api_base_path + "/update_room";
        }
        var formData = new FormData(this);
        formData.append("action", action);
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
                    $("#add_room").modal("hide");

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
                    get_room();
                }
                if (data.success == false) {
                    Toast.fire({
                        icon: "error",
                        title: data.message,
                    });
                }
            },
        });
        // });
    });

    // Add multiple rooms submit Event
    $("form#formultirooms").submit(function (e) {
        e.preventDefault();
        // id = $("#room_id").val();

        room_cat_id = $("#m_room_cat_id").val();
        section_id = $("#m_section_id").val();
        floor_id = $("#m_floor_id").val();

        if (room_cat_id == null || room_cat_id == "" || room_cat_id == 0) {
            Toast.fire({
                icon: "error",
                title: "Please Select Room Category",
            });
            return;
        }
        if (section_id == null || section_id == "" || section_id == 0) {
            Toast.fire({
                icon: "error",
                title: "Please Select Section",
            });
            return;
        }
        if (floor_id == null || floor_id == "" || floor_id == 0) {
            Toast.fire({
                icon: "error",
                title: "Please Select Floor",
            });
            return;
        }
        
        var checkbox = document.querySelector('input[name="m_rooms_name"]:checked').value;
        if (checkbox === "room_name") {
            var m_room_no = document.getElementById("m_room_no").value.trim();
            if (m_room_no === "" || m_room_no === null) {
                Toast.fire({
                    icon: "error",
                    title: "Room name field is required!",
                });
                return;
            }
        } else if (checkbox === "room_nos") {
            m_room_prefix = $("#m_room_prefix").val();
            m_room_suffix = $("#m_room_suffix").val();
            m_start_no = $("#m_start_no").val();
            m_to_no = $("#m_to_no").val();
            if (m_room_prefix == "") {
                Toast.fire({
                    icon: "error",
                    title: "Room prefix field is required!",
                });
                return;
            }
            if (m_room_suffix == 0) {
                Toast.fire({
                    icon: "error",
                    title: "Room suffix field is required!",
                });
                return;
            }
            if (m_start_no == "") {
                Toast.fire({
                    icon: "error",
                    title: "Start no field is required.",
                });
                return;
            }
            if (m_to_no == "") {
                Toast.fire({
                    icon: "error",
                    title: "To no field is required.",
                });
                return;
            }
        }

        var postUrl = api_base_path + "/create_multi_room";
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
                    $("#add_rooms").modal("hide");

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
                    reset_field_mroom();
                    get_room();
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

function reset_field_mroom(){
    $('#m_room_cat_id').val("");
    $('#m_section_id').val("");
    $('#m_floor_id').val("");
    $('#m_room_no').val("");
    $('#m_room_prefix').val("");
    $('#m_room_suffix').val("");
    $('#m_start_no').val("");
    $('#m_to_no').val("");
    $("#m_room_desc").val("");
}

var amenitiesIds = [];
var selectedAmenities = [];
function get_room() {
    var url = api_base_path + "/get_room";
    $.ajax({
        url: url,
        type: "POST",
        data: {},
        beforeSend: function () {},
        success: function (resp) {
            var html_data = "";
            var room = resp.data;
            var $categoryTable = $("#room_table");
            for (var i = 0; i < room.length; i++) {
                html_data += `
               <tr>
                    <td class="td-custom table-left">${room[i].id}</td>
                    <td class="td-custom action-check">
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="customCheck1">
                            <label class="custom-control-label" for="customCheck1"></label>
                        </div>
                    </td>
                    <td class="td-custom">${room[i].room_no}</td>
                    <td class="td-custom">${room[i].room_cate.cat_name}</td>
                    <td class="td-custom">${room[i].room_section.name}</td>
                    <td class="td-custom">${
                        room[i].room_floor.name
                    }</td>                    
                    <td class="td-custom">
                        <div class="${
                            room[i].status == 1
                                ? "status-active"
                                : "status-deactive"
                        }"> ${room[i].status == 1 ? "Active" : "Deactive"}</div>
                    </td>
                    <td><span class="material-icons-outlined delete-table" onclick="delete_cat(${
                        room[i].id
                    })">
                            cancel_presentation
                        </span>
                        <span class="material-icons-outlined edit-table" onclick="edit_room(
                        '${room[i].room_no}',
                        '${room[i].room_amnts_ids}',
                        ${room[i].room_cat_id},
                        ${room[i].floor_id},
                        ${room[i].section_id},
                        '${room[i].room_desc}',
                        '${room[i].room_size}',
                        ${room[i].room_view_id},
                        ${room[i].base_occu},
                        ${room[i].extra_occu},
                        ${room[i].max_adult},
                        ${room[i].max_child},
                        ${room[i].max_extra_bed},
                        ${room[i].base_rate},
                        ${room[i].extra_person_charge},
                        ${room[i].extra_bed_charge},
                        ${room[i].id},
                        ${room[i].status},${i})">
                            edit
                        </span>
                    </td>

                </tr>`;
            }
            // Destroy the existing DataTable instance, if it exists
            if ($.fn.DataTable.isDataTable("#room_table")) {
                $("#room_table").DataTable().destroy();
            }

            // Clear the HTML content of the table body
            $("#room_table_body").empty();

            // Update the HTML content of the table body with the new data
            $("#room_table_body").html(html_data);

            $categoryTable.DataTable({
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

function getFloorList(val) {
    var floor = localStorage.getItem("hotel_floor");
    if (floor) {
        floor = JSON.parse(localStorage.getItem("hotel_floor"));
        var html_data = "";
        html_data += '<option value="0">Select floor</option>';
        for (i = 0; i < floor.length; i++) {
            html_data +=
                '<option value="' +
                floor[i].id +
                '">' +
                floor[i].name +
                "</option>";
        }
        if (val == "room") {
            $("#floor_id").html(html_data);
        } else {
            $("#m_floor_id").html(html_data);
        }
    }
}
function getSectionList(val) {
    var section = localStorage.getItem("hotel_section");
    if (section) {
        section = JSON.parse(localStorage.getItem("hotel_section"));
        var html_data = "";
        html_data += '<option value="0">Select Section</option>';
        for (i = 0; i < section.length; i++) {
            html_data +=
                '<option value="' +
                section[i].id +
                '">' +
                section[i].name +
                "</option>";
        }
        if (val == "room") {
            $("#section_id").html(html_data);
        } else {
            $("#m_section_id").html(html_data);
        }
    }
}
function getCatList(val) {
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
        if (val == "room") {
            $("#room_cat_id").html(html_data);
        } else {
            $("#m_room_cat_id").html(html_data);
        }
    }
}

function catDetails() {
    var id = $("#room_cat_id").val();
    var url = api_base_path + "/get_cate_details";
    $.ajax({
        url: url,
        type: "POST",
        data: {
            id: id,
        },
        beforeSend: function () {},
        success: function (resp) {
            var catdel = resp.data;

            if (resp.success == true) {
                $("#room_desc").val(catdel.description);
                $("#room_size").val(catdel.room_size);
                $("#base_occu").val(catdel.base_occu);
                $("#extra_occu").val(catdel.max_occu);
                $("#max_adult").val(catdel.max_adult);
                $("#max_child").val(catdel.max_child);
                $("#base_rate").val(catdel.base_rate);
                $("#extra_person_charge").val(catdel.extra_person_charge);
                $("#extra_bed_charge").val(catdel.extra_bed_charge);

                var amenitiesIdsString = catdel.room_amnts_ids;
                amenitiesIds =
                    catdel.room_amnts_ids !== null
                        ? amenitiesIdsString.split(",")
                        : [];
                selectAmenity("edit");
                if (catdel.max_extra_bed != 0) {
                    var checkbox = document.getElementById(
                        "extra_bed_customCheck1"
                    );

                    // Check the checkbox
                    checkbox.checked = true;
                    document.getElementById("max_extra_bed").style.display =
                        "block";
                    $("#max_extra_bed").val(catdel.max_extra_bed);
                }
            }
            if (resp.success == false) {
                Toast.fire({
                    icon: "error",
                    title: data.message.errors.room_no,
                });
            }
        },
        error: function () {},
    });
}

function open_room(val) {
    reset_field();
    getCatList(val);
    getFloorList(val);
    getSectionList(val);
    var checkbox = document.getElementById("extra_bed_customCheck1");
    // Check the checkbox
    checkbox.checked = false;
    
    document.getElementById("max_extra_bed").style.display = "none";
    if (val == "room") {
        $("#rtable_header").text("Add Room");
        $(".saveUpdate").text("Save");
        $("#add_room").modal("show");
        $("#saveDuplicateButton").removeClass("d-none");
        amenitiesIds = [];
        // if (status == 1) {
        $(".form-switch").addClass("d-none");
        // }
        selectAmenity();
    } else {
        $("#multiRooms").text("Add Multiple Rooms");
        $("#add_rooms").modal("show");
    }
}

// edit cate
function edit_room(
    room_no,
    roomAmntsIds,
    room_cat_id,
    floor_id,
    section_id,
    description,
    room_size,
    room_view_id,
    base_occu,
    extra_occu,
    max_adult,
    max_child,
    max_extra_bed,
    base_rate,
    extra_person_charge,
    extra_bed_charge,
    id,
    status,
    index
) {
    
    $("#rtable_header").text("Edit Room");
    $(".saveUpdate").text("Update");
    getCatList();
    getFloorList();
    getSectionList();
    $("#room_id").val(id);
    $("#room_no").val(room_no);
    $("#room_cat_id").val(room_cat_id);
    $("#floor_id").val(floor_id);
    $("#section_id").val(section_id);
    $("#room_desc").val(description == "null" ? "" : description);
    $("#room_size").val(room_size == 'null' ? "" : room_size);
    $("#room_view_id").val(room_view_id);
    $("#base_occu").val(base_occu);
    $("#extra_occu").val(extra_occu);
    $("#max_adult").val(max_adult);
    $("#max_child").val(max_child);
    $("#base_rate").val(base_rate);
    $("#extra_person_charge").val(extra_person_charge);
    $("#extra_bed_charge").val(extra_bed_charge);
    $("#add_room").modal("show");
    $("#saveDuplicateButton").addClass("d-none");
    document.getElementById("room_amnts_ids").value = roomAmntsIds;
    $(".form-switch").removeClass("d-none");

    if (status == 1) {
        $("#status").prop("checked", true);
    }
    if (max_extra_bed != 0) {
        var checkbox = document.getElementById("extra_bed_customCheck1");
        // Check the checkbox
        checkbox.checked = true;
        document.getElementById("max_extra_bed").style.display = "block";
        $("#max_extra_bed").val(max_extra_bed);
    }

    var amenitiesIdsString = roomAmntsIds;

    amenitiesIds =
        amenitiesIdsString !== null ? amenitiesIdsString.split(",") : [];
    // amenitiesIds = roomAmntsIds.split(",");
    selectAmenity("edit");
}

function selectAmenity(val) {
    var url = api_base_path + "/get_amenity";
    $("#selectdAmenity").html("");
    $.ajax({
        url: url,
        type: "get",
        data: {},
        beforeSend: function () {},
        success: function (resp) {
            var html_data = "";
            var amenity = resp.data;
            amenity.forEach(function (amenityItem) {
                // Construct the HTML for each amenity item
                html_data += `
                    <div class="row listing_box  ${
                        amenitiesIds.some((item) => item == amenityItem.id)
                            ? `disable editDisable${amenityItem.id}`
                            : `selecteItem_${amenityItem.id}`
                    }">
                        <div class="col d-flex align-items-center">
                            <span class="material-icons-outlined aminites_icon">
                                ${amenityItem.amnt_icon}
                            </span>
                            <p class="subtitle-2m mb-0 ms-2">${
                                amenityItem.amnt
                            }</p>
                        </div>
                        <div class="col-auto">
                            
                            <button type="button" class="btn btn-secondary-add"${
                                amenitiesIds.some(
                                    (item) => item == amenityItem.id
                                )
                                    ? "disabled"
                                    : ""
                            } id="selecteItemBtn_${
                    amenityItem.id
                }"  onclick="selectSingleAmenities(
                                    ${amenityItem.id}, '${
                    amenityItem.amnt
                }', '${amenityItem.amnt_icon}')"> 
                                <span class="material-icons-outlined">
                                    add
                                </span>
                            </button>

                        </div>
                    </div>
                `;
                if (val == "edit") {
                    selectedItem(amenityItem);
                }
            });
            $("#amenityList").html(html_data);
        },
        error: function () {},
    });
}
function selectedItem(data) {
    var amenityObjects = {
        id: data.id,
        name: data.amnt,
        icon: data.amnt_icon,
    };
    // $(".selecteItem_" + id).addClass("disable");
    // $("#selecteItemBtn_" + id).prop("disabled", true);
    // Set amenity id by comma sepret

    amenitiesIds.some((item) => item == data.id)
        ? selectedAmenities.push(amenityObjects)
        : "";
    var selectedData = "";
    amenitiesIds.forEach(function (ids) {
        selectedData += `
            ${
                ids == data.id
                    ? `<div class="d-inline-flex flex-wrap">
            <div class="chip me-2 mb-2">
                <span class="material-icons-outlined icon-chip">
                    ${data.amnt_icon}
                </span>
                ${data.amnt}<button type="button" class="btn-close" aria-label="Close" onclick=removeAmntItem(${data.id})></button>
            </div>
            </div>`
                    : ""
            }
        `;
    });

    $("#selectdAmenity").append(selectedData);
    $("#countAmenity").text(amenitiesIds.length);
}

function selectSingleAmenities(id, amnt, icon) {
    // selectedAmenities = [];
    var amenityObject = {
        id: id,
        name: amnt,
        icon: icon,
    };
    $(".selecteItem_" + id).addClass("disable");
    $(".editDisable" + id).addClass("disable");
    $("#selecteItemBtn_" + id).prop("disabled", true);
    // Set amenity id by comma sepret
    selectedAmenities.push(amenityObject);

    updateRoomAmntsIds();
    var html_data = "";
    selectedAmenities.forEach(function (amenitySelectItem) {
        html_data += `
        <div class="d-inline-flex flex-wrap">
        <div class="chip me-2 mb-2">
        <span class="material-icons-outlined icon-chip">
        ${amenitySelectItem.icon}
        </span>
        ${amenitySelectItem.name}<button type="button" class="btn-close" aria-label="Close" onclick=removeAmntItem(${amenitySelectItem.id})></button>
        </div>
        </div>
        `;
    });
    $("#selectdAmenity").html(html_data);
    $("#countAmenity").text(selectedAmenities.length);
}

function removeAmntItem(id) {
    $(".selecteItem_" + id).removeClass("disable");
    $(".editDisable" + id).removeClass("disable");
    $("#selecteItemBtn_" + id).removeAttr("disabled");
    // $("#Button1Id").removeAttr("disabled");
    var indexToRemove = selectedAmenities.findIndex(function (amenityItem) {
        return amenityItem.id === id;
    });
    if (indexToRemove !== -1) {
        selectedAmenities.splice(indexToRemove, 1);
    }
    updateRoomAmntsIds();
    var html_data = "";
    selectedAmenities.forEach(function (amenitySelectItem) {
        html_data += `
        <div class="d-inline-flex flex-wrap">
        <div class="chip me-2 mb-2">
            <span class="material-icons-outlined icon-chip">
                ${amenitySelectItem.icon}
            </span>
            ${amenitySelectItem.name}<button type="button" class="btn-close" aria-label="Close" onclick=removeAmntItem(${amenitySelectItem.id})></button>
        </div>
        </div>
                `;
    });
    $("#selectdAmenity").html(html_data);
    $("#countAmenity").text(selectedAmenities.length);
}
// set amenity id by add and remove
function updateRoomAmntsIds() {
    // Get an array of IDs from selectedAmenities
    var ids = selectedAmenities.map(function (amenity) {
        return amenity.id; // Assuming 'id' is the property that holds the ID of each amenity
    });
    // Join the IDs with commas
    var idsString = ids.join(",");
    // Set the value of the room_amnts_ids field
    document.getElementById("room_amnts_ids").value = idsString;
}

// reset user filed
function reset_field() {
    $("#room_no").val("");
    $("#section_id").val("");
    $("#room_cat_id").val("");
    $("#floor_id").val("");
    $("#room_desc").val("");
    $("#base_occu").val("");
    $("#max_occu").val("");
    $("#max_adult").val("");
    $("#max_child").val("");
    $("#base_rate").val("");
    $("#extra_person_charge").val("");
    $("#extra_bed_charge").val("");
    $("#max_extra_bed").val("");
    $("#room_amnts_ids").val("");
    $("#room_size").val("");
    $("#selectdAmenity").val("");
    $("#countAmenity").text("");
    selectedAmenities = [];
}

function enableInput() {
    var isChecked = document.getElementById("radioCheck").checked;
    document.getElementById("roomNo").style.display = "block";
    $(".roomNos").addClass("d-none");
}

function disableInput() {
    var isChecked = document.getElementById("radioCheck").checked;
    $(".roomNos").removeClass("d-none");
    document.getElementById("roomNo").style.display = "none";
}
