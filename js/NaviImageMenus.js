class NaviImageMenus {
    constructor(parent, id, parentList = [], size = "") {
        this.parent = parent;
        this.id = id;
        this.parentList = parentList;
        this.size = size;
        this.init();
    }

    init() {
        var OBJ = this;
        Util.getNaviFile(function (rawNavigation) {
            var data = []
            var navi = Util.getNaviChildren(rawNavigation, OBJ.parentList);
            for (var i in navi) {
                var n = navi[i];
                var jpnNavi = new JpnNavi(n.id, n.label, n.url, null, n.isParent, n.code, n.auth);
                data.push(jpnNavi.getImageMenuItem(OBJ.id));
            }
            var imageMenu = new ImageMenu(OBJ.parent, data, OBJ.size);
        });
    }
}