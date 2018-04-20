// localhost/test-e/dataset/raw-data/navi.html

$ = jQuery;

$(document).ready(function () {
    var body = $("tbody");
    var GRP_NAME_COLOR = ["#70AD47", "#92D050"];

    var HAS_DUPLICATE = ["selenggara", "cetakan","senarai-kerja"];

    function createNormalCase(label) {
        var arr = label.split(" ");

        var r = "";
        for (var i in arr) {
            var firstLetter = arr[i][0].toUpperCase();
            var rest = arr[i].substr(1, arr[i].length).toLowerCase()

            if (i > 0) {
                r += " ";
            }
            r += firstLetter + rest;
        }

        return r;
    }

    function replaceAllWithoutRegex(text, search, replace) {
        while (text.indexOf(search) >= 0) {
            text = text.replace(search, replace);
        }

        return text;
    }

    function createIdFromLabel(label, parentID = "") {
        label = replaceAllWithoutRegex(label, ".", "");
        label = replaceAllWithoutRegex(label, "(", "");
        label = replaceAllWithoutRegex(label, ")", "");
        label = label.replace(new RegExp(' ', 'g'), "-").toLowerCase();
        label = label.replace(new RegExp('/', 'g'), "-");

        if (HAS_DUPLICATE.indexOf(label) >= 0) {
            label = parentID + "-" + label;
        }
        return label;
    }
    function getTextFromTd(el) {
        var raw = $(el).html();
        if (raw.indexOf("font") <= -1) {
            return raw;
        }

        var text = $(el).find("font").html();
        text = text.replace(new RegExp('<br>', 'g'), ' ');
        text = text.replace(new RegExp('\n', 'g'), ' ');
        text = text.replace(new RegExp('\t', 'g'), ' ');
        //text = text.replace(new RegExp('\s', 'g'), ' ');
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

    var grandMaster = [];
    $.each(body, function (tableIndex, b) {

        var topLabel = "";
        var topId = "";
        var grandMasterID = "";

        if (tableIndex == 0) {
            topLabel = "Pengangkatan";
            grandMasterID = createIdFromLabel("PENGANGKATAN");

        } else if (tableIndex == 1) {
            topLabel = "SPC";
            grandMasterID = createIdFromLabel("SPC");

        } else if (tableIndex == 2) {
            topLabel = "Kahwin Cerai";
            grandMasterID = createIdFromLabel("KAHWIN CERAI");

        }


        var master = [];

        let elB = $(b);
        let row = elB.find("tr");
        var curGroup = "";
        var curGroupIndex = -1;

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
                        curGroupIndex++;
                        var id = createIdFromLabel(grpName, grandMasterID);
                        var arr = {
                            id: id,
                            label: createNormalCase(grpName),
                            url: null,
                            children: []
                        };
                        master[curGroupIndex] = arr;
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
                        child["id"] = createIdFromLabel(child["label"], master[curGroupIndex]["id"]);
                        master[curGroupIndex].children.push(child);
                    }
                }
            });
        });

        var arr = {
            id: grandMasterID,
            label: topLabel,
            url: null,
            isParent: true,
            children: master
        };

        grandMaster.push(arr);
    });

    //console.log(grandMaster);

    console.log(JSON.stringify(grandMaster));

});