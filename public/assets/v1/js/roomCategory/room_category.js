$(document).ready(function () {
    get_category();

    $("form#formroomcat").submit(function (e) {
        e.preventDefault();
        id = $("#cat_id").val();

        if (id == 0) {
            var postUrl = api_base_path + "/create_room_cat";
        } else {
            var postUrl = api_base_path + "/update_room_cat";
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
                    $("#add_category").modal("hide");

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
                    get_category();
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
var amenitiesIds = [];
var selectedAmenities = [];
function get_category() {
    var url = api_base_path + "/get_room_cat";
    $.ajax({
        url: url,
        type: "POST",
        data: {},
        beforeSend: function () {},
        success: function (resp) {
            var html_data = "";
            var cat = resp.data;
            var $categoryTable = $("#room_cate_table");
            var allcateList = [];
            for (var i = 0; i < cat.length; i++) {
                var catObj = {
                    id: cat[i].id,
                    cat_name: cat[i].cat_name
                };
                allcateList.push(catObj);
                html_data += `
               <tr>
                    <td class="td-custom table-left">${cat[i].id}</td>
                    <td class="td-custom action-check">
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="customCheck1">
                            <label class="custom-control-label" for="customCheck1"></label>
                        </div>
                    </td>
                    <td class="td-custom">${cat[i].cat_name}</td>
                    <td class="td-custom">${cat[i].base_occu}</td>
                    <td class="td-custom">${cat[i].max_occu}</td>
                    <td class="td-custom">${cat[i].max_adult}</td>
                    <td class="td-custom">${cat[i].max_child}</td>
                    <td class="td-custom">${cat[i].max_extra_bed}</td>
                    <td class="td-custom"><a class="a-btn-link">10 Rooms / Add Rooms</a></td>
                    <td class="td-custom">
                        <div class="${
                            cat[i].status == 1
                                ? "status-active"
                                : "status-deactive"
                        }"> ${cat[i].status == 1 ? "Active" : "Deactive"}</div>
                    </td>
                    <td><span class="material-icons-outlined delete-table" onclick="delete_cat(${
                        cat[i].id
                    })">
                            cancel_presentation
                        </span>
                        <span class="material-icons-outlined edit-table" onclick="edit_cat('${
                            cat[i].cat_name
                        }','${cat[i].short_name}','${cat[i].description}',${
                    cat[i].base_occu
                },${cat[i].max_occu},${cat[i].max_adult},${cat[i].max_child},${
                    cat[i].base_rate
                },${cat[i].max_extra_bed},${cat[i].extra_person_charge},${
                    cat[i].extra_bed_charge
                },'${cat[i].room_size}','${cat[i].room_amnts_ids}',${
                    cat[i].id
                },${cat[i].status},${i})">
                            edit
                        </span>
                    </td>

                </tr>`;
            }

            // Destroy the existing DataTable instance, if it exists
            if ($.fn.DataTable.isDataTable("#room_cate_table")) {
                $("#room_cate_table").DataTable().destroy();
            }

            // Clear the HTML content of the table body
            $("#room_cate_table_body").empty();

            // Update the HTML content of the table body with the new data
            $("#room_cate_table_body").html(html_data);

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
            localStorage.setItem("room_cate", JSON.stringify(allcateList));
            var title = '<h5 class="card_headline neutral_700">User List</h5>';
            $("#user_table_length").html(title);
        },
        error: function () {},
    });
    document.getElementById("unSelectAll").style.display = "none";
}

function open_room_cate() {
    reset_field();
    $("#rctable_header").text("Add Room Category");
    $("#cateSwitch").addClass("d-none");
    $("#add_category").modal("show");
    $("#cat_id").val(0);
     $("#roomCateList").html('');
     $("#roomCateCount").html('');
    var checkbox = document.getElementById("extra_bed_customCheck1");
    // Check the checkbox
    checkbox.checked = false;
    document.getElementById("max_extra_bed").style.display = "none";
    amenitiesIds = [];
    selectAmenity();
}

// edit cate
function edit_cat(
    cat_name,
    short_name,
    description,
    base_occu,
    max_occu,
    max_adult,
    max_child,
    base_rate,
    max_extra_bed,
    extra_person,
    extra_bed,
    room_size,
    room_amnts_ids,
    id,
    status
) {
    $("#rctable_header").text("Edit Room Category");
    $("#cat_id").val(id);
    $("#cat_name").val(cat_name);
    $("#short_name").val(short_name);
    $("#description").val(description);
    $("#base_occu").val(base_occu);
    $("#max_occu").val(max_occu);
    $("#max_adult").val(max_adult);
    $("#max_child").val(max_child);
    $("#room_size").val(room_size);
    $("#base_rate").val(base_rate);
    $("#extra_person_charge").val(extra_person);
    $("#extra_bed_charge").val(extra_bed);
    $("#add_category").modal("show");
    document.getElementById("room_amnts_ids").value = room_amnts_ids;
    $("#cateSwitch").removeClass("d-none");
    if (status == 1) {
        $("#status").prop("checked", true);
    } else {
        $("#status").prop("checked", false);
    }
    if (max_extra_bed != 0) {
        var checkbox = document.getElementById("extra_bed_customCheck1");
        // Check the checkbox
        checkbox.checked = true;
        document.getElementById("max_extra_bed").style.display = "block";
        $("#max_extra_bed").val(max_extra_bed);
    }
    amenitiesIds = room_amnts_ids.split(",");

    selectAmenity("edit");
    getRoomsOnRoomCatId();    
}

// delete cate
function delete_cat(id, tab_type) {
    $("#del_cate_id").val(id);
    $("#del_type").val(tab_type);

    $("#delete_rooms_modal").modal({
        backdrop: "static",
        keyboard: false,
    });
}

function delete_single_room_cate() {
    var tab_type = $("#del_type").val();
    var table_id = $("#del_room_id").val();
    var url = api_base_path + "/delete_room_cate";
    $.ajax({
        url: url,
        type: "POST",
        data: {
            table_id: table_id,
        },
        beforeSend: function () {
            $("#pleaseWaitDialog").modal();
        },
        success: function (resp) {
            if (resp.success == true) {
                ToastG.fire({
                    icon: "success",
                    title: resp.message,
                });
                //store_session_table();
            }
            if (resp.success == false) {
                ToastG.fire({
                    icon: "error",
                    title: resp.message,
                });
            }
            get_category(3);
            $("#pleaseWaitDialog").modal("hide");
        },
        error: function () {},
    });
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

            var $categoryTable = $("#room_cate_table");

            amenity.forEach(function (amenityItem) {
                // Construct the HTML for each amenity item
                html_data += `
                    <div class="row listing_box  ${
                        amenitiesIds.some((item) => item == amenityItem.id)
                            ? `disable editDisable${amenityItem.id}`
                            : `selecteItem_${amenityItem.id}`
                    }" data-id = ${amenityItem.id} data-icon="${
                    amenityItem.amnt_icon
                }" data-amnt="${amenityItem.amnt}">
                        <div class="col d-flex align-items-center">
                            <span class="material-icons-outlined aminites_icon" >
                                ${amenityItem.amnt_icon}
                            </span>
                            <p class="subtitle-2m mb-0 ms-2" >${
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
    if (selectedAmenities.length === 0) {
        document.getElementById("selectAll").style.display = "block";
        document.getElementById("unSelectAll").style.display = "none";
    }
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
    $("#cat_name").val("");
    $("#short_name").val("");
    $("#description").val("");
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

function selectAllAmnts() {
    document.getElementById("selectAll").style.display = "none";
    document.getElementById("unSelectAll").style.display = "block";

    var listingBoxes = document.querySelectorAll(".listing_box");
    var selectedIds = [];
    listingBoxes.forEach(function (box) {
        if (!box.classList.contains("disable")) {
            box.classList.add("disable");
            selectedIds.push(box.getAttribute("data-id"));
            $("#selecteItemBtn_" + box.getAttribute("data-id")).prop(
                "disabled",
                true
            );
            selectSingleAmenities(
                parseInt(box.getAttribute("data-id")),
                box.getAttribute("data-amnt"),
                box.getAttribute("data-icon")
            );
        }
    });
    // Join the selectedIds array into a comma-separated string
    var commaSeparatedIds = selectedIds.join(",");
    document.getElementById("room_amnts_ids").value = commaSeparatedIds;
    // Log or use the comma-separated string as needed
}
function unSelectAllAmnts() {
    document.getElementById("selectAll").style.display = "block";
    document.getElementById("unSelectAll").style.display = "none";

    var listingBoxes = document.querySelectorAll(".listing_box");
    var selectedIds = [];
    listingBoxes.forEach(function (box) {
        if (box.classList.contains("disable")) {
            box.classList.remove("disable");
            var id = box.getAttribute("data-id");
            var button = $("#selecteItemBtn_" + id);
            button.prop("disabled", false);
            // Optionally, you can call another function to handle further actions
            // For example:
            removeAmntItem(parseInt(id));
        }
    });
    // Join the selectedIds array into a comma-separated string
    var commaSeparatedIds = selectedIds.join(",");
    document.getElementById("room_amnts_ids").value = "";
    // Log or use the comma-separated string as needed
}

// Get room on room cate if
function getRoomsOnRoomCatId() {
    var catId = $("#cat_id").val();
    
    if (parseInt(catId) != 0) {
        var url = api_base_path + "/get_rooms_on_room_cat_id";
        $.ajax({
            url: url,
            type: "POST",
            data: {
                id: catId,
            },
            beforeSend: function () {},
            success: function (resp) {
                var catRoomList = resp.data;
                var html_data = '';
                if (resp.success == true) {
                    catRoomList.forEach(function (item) {                    
                        html_data += `
                            <div class="d-inline-flex flex-wrap">
                            <div class="chip me-2 mb-2">
                                ${item.room_no}
                            </div>
                            </div>
                        `;
                    });
                    $("#roomCateList").html(html_data);
                    $("#roomCateCount").html(catRoomList.length);
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
}
