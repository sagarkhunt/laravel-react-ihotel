async function get_sync_data(syncVar) {    
    var sync_data = new Array();

    if (syncVar.split(",").length > 0) {
        var splitData = syncVar.split(",");
        
        for (i = 0; i < splitData.length; i++) {
            
            if (localStorage.getItem(splitData[i]) == null) {
                sync_data.push(splitData[i]);
            }
        }
    }
    if (sync_data.length != 0) {
        var url = api_base_path + "/get_login_sync";
        $.ajax({
            url: url,
            type: "POST",
            data: {
                sync_req: sync_data.toString(),
            },
            beforeSend: function () {
                $("#pleaseWaitDialog").modal();
                
            },
            success: function (resp) {
                $("#pleaseWaitDialog").modal("hide");
                if (resp.success == true) {
                    if (resp.data.room_cate != undefined) {
                        localStorage.setItem(
                            "room_cate",
                            JSON.stringify(resp.data.room_cate)
                        );
                    }
                    if (resp.data.hotel_floor != undefined) {
                        localStorage.setItem(
                            "hotel_floor",
                            JSON.stringify(resp.data.hotel_floor)
                        );
                    }
                    if (resp.data.hotel_section != undefined) {
                        localStorage.setItem(
                            "hotel_section",
                            JSON.stringify(resp.data.hotel_section)
                        );
                    }
                    if (resp.data.rooms != undefined) {
                        localStorage.setItem(
                            "rooms",
                            JSON.stringify(resp.data.rooms)
                        );
                    }
                   
                    
                    return true;
                }
            },
            error: function () {
                console.log("api fail");
                return false;
            },
        });
    } else {
        console.log("local found");
        return true;
    }
}

function resolveAfter2Seconds() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("true");
        }, 2500);
    });
}
