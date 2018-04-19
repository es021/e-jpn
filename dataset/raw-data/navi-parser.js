// localhost/test-e/dataset/raw-data/navi.html

$ = jQuery;

$(document).ready(function () {
    var body = $("tbody");
    var GRP_NAME_COLOR = ["#70AD47", "#92D050"];

    function getTextFromTd(el) {
        var raw = $(el).html();
        if (raw.indexOf("font") <= -1) {
            return raw;
        }

        var text = $(el).find("font").html();
        text = text.replace(new RegExp('<br>', 'g'), ' ');
        text = text.replace(new RegExp('\n', 'g'), ' ');
        text = text.replace(new RegExp('\t', 'g'), ' ');
        text = text.replace(new RegExp('\s', 'g'), ' ');
        let arr = text.split(' ')

        let label = "";
        let isFirst = true;
        arr.map((d, i) => {
            if (d == "") {
                return;
            }

            if (!isFirst) {
                label += " ";
            }
            label += d;
            isFirst = false;
        })
        return label;
    }

    var grandMaster = {};

    $.each(body, function (tableIndex, b) {
        if (tableIndex == 0) {
            grandMaster["PENGANGKATAN"] = []
        } else if (tableIndex == 1) {
            grandMaster["SPC"] = []
        } else if (tableIndex == 2) {
            grandMaster["KAHWIN CERAI"] = []
        }

        var master = {};

        let elB = $(b);
        let row = elB.find("tr");
        var curGroup = "";

        $.each(row, function (i, r) {
            if (i < 3) {
                return;
            }
            let elR = $(r);
            let col = elR.find("td");

            var child = {};
            var startLabel = 1;

            $.each(col, function (k, c) {
                let elC = $(c);
                let bgcolor = elC.attr("bgcolor");
                //grouping green bg
                if (GRP_NAME_COLOR.indexOf(bgcolor) >= 0) {
                    startLabel = 2;
                    let grpName = getTextFromTd(elC);
                    if (curGroup != grpName) {
                        master[grpName] = [];
                        curGroup = grpName;
                    }
                } else {

                    //name
                    if (k == startLabel) {
                        child["label"] = getTextFromTd(elC);
                    }

                    //kod transaksi - branch
                    if (k == startLabel + 1) {
                        child["code"] = getTextFromTd(elC);
                    }

                    // aras pengguna
                    if (k == startLabel + 2) {
                        child["auth"] = getTextFromTd(elC);

                        master[curGroup].push(child);
                    }
                }
            });
        });

        if (tableIndex == 0) {
            grandMaster["PENGANGKATAN"].push(master);
        } else if (tableIndex == 1) {
            grandMaster["SPC"].push(master);
        } else if (tableIndex == 2) {
            grandMaster["KAHWIN CERAI"].push(master);
        }
    });

    console.log(grandMaster);

    console.log(JSON.stringify(grandMaster));

});