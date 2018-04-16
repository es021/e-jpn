$(document).ready(function () {
    function includeHTML() {
        var els = $(".include-html");
        $.each(els, function () {
            var e = $(this);
            var file = SITE_ROOT + "/" + e.attr("data-file");

            /*make an HTTP request using the attribute value as the file name:*/
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        e.append(this.responseText);
                    }
                    if (this.status == 404) {
                        e.append("Page not found.");
                    }
                }
            };
            xhttp.open("GET", file, true);
            xhttp.send();
        });
    }
    includeHTML();
}); 