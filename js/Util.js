class UtilClass {
    constructor() {
        this.PAGE_DEFAULT = "menu-utama";
    }
    _GET(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        var toRet = null;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                toRet = sParameterName[1] === undefined ? true : sParameterName[1];
                break;
            }
        }

        if (sParam == "page" && !toRet) {
            toRet = this.PAGE_DEFAULT;
        }

        return toRet;
    }


    getNaviChildren(navi, parentList, level = 0) {
        var curParent = parentList[level];
        if (level == parentList.length) {
            return navi;
        }

        for (var i in navi) {
            var parent = navi[i];
            if (parent.id == curParent) {
                return this.getNaviChildren(parent.children, parentList, level + 1);
            }
        }
    }
    
    getNaviFile(success, error = null) {
        $.ajax({
            dataType: "json",
            url: NAVI_PATH,
            data: {},
            success: function (data) {
                success(data);
            },
            error: function (err) {
                if (error !== null) {
                    error(err);
                } else {
                    alert(err);
                }
            }
        });
    }

}
var Util = new UtilClass();
