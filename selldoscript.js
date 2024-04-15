// above selldo submit handler

$('.download-brochure-btn').click(function() {
    brochureFlag = 1;
});



window.sell_do_form_rendered = function() {
    setTimeout(function() {
        $('.sell_do_virtual_numbers a').attr('data-event-category', 'Header');
        $('.sell_do_virtual_numbers a').attr('data-event-action', 'Click');
        $('.sell_do_virtual_numbers a').attr('data-event-name', 'Call Number');
        // $('.mobile-call-btn').text('')

        $('.selldof .btn').attr('data-event-category', 'Header');
        $('.selldof .btn').attr('data-event-action', 'Click');
        $('.selldof .btn').attr('data-event-name', 'SUBMIT');

    }, 2000);
}
window.sell_do_form_successfully_submitted = function(data, event) {
    try {
        dataLayer.push({
            'event': 'selldo_form_submitted'
        });
    } catch (err) {}

    sessionStorage.setItem("selldosubmit", "yes");
    $(".download-brochure-btn").attr({
        "href": "assets/images/Kingsley_Launch_Brochure.pdf",
        "target": "_blank"
    });


    if (brochureFlag == 1) {
        $(".brochure").show();
        $(".bp1").attr({
            href: "./assets/images/floor-plan.pdf",
            target: '_blank'
        });
    }



};