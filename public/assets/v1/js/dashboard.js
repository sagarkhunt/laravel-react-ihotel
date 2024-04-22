$(document).ready(function(){
    get_sync_data(
        "room_cate,hotel_floor,hotel_section,rooms"
    ).then(
        async function (value) {
            $("#pleaseWaitDialog").modal();
            const result = await resolveAfter2Seconds();
            $("#pleaseWaitDialog").modal("hide");
            if (result) {
                console.log("🚀 ~ result:", result)
                // // check_invoice_setting
                // if (localStorage.getItem("invoice_settings")) {
                //     get_invoice_settings();
                // } else {
                //     open_require_info_modal();
                // }
                // // check_resto_profile
                // if (localStorage.getItem("resto_profile")) {
                //     get_resto_profile();
                // } else {
                //     open_require_info_modal();
                // }
                // if (localStorage.getItem("rcpt_channels")) {
                //     get_all_rcpt_channels();
                // } else {
                //     open_require_info_modal();
                // }
                // if (localStorage.getItem("resto_sessions")) {
                //     get_all_resto_session();
                // } else {
                //     open_require_info_modal();
                // }
                // if (localStorage.getItem("browser_print_settings")) {
                //     get_browser_print_settings();
                // } else {
                //     open_require_info_modal();
                // }
                // if (localStorage.getItem("price_templates")) {
                //     get_price_template();
                // } else {
                //     open_require_info_modal();
                // }
            }
        },
        function (error) {
            console.log("error");
        }
    );
})

