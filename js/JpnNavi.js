
var JpnNavi = function (id, label, url, children = null, isParent = false, code = null, auth = null) {
    this.id = id;
    this.label = label;
    this.url = url;
    this.isParent = isParent;
    this.children = children;
    this.code = code;
    this.auth = auth;
};
JpnNavi.prototype.getImageMenuItem = function (img_folder) {
    return {
        label: this.label, url: this.getRealUrl()
        , desc: "Pergi ke halaman '" + this.label + "'"
        , img_url: "/test-e/asset/image/" + img_folder + "/" + this.id + ".jpg", imgSize: "", imgPos: ""
    }
}
JpnNavi.prototype.getRealUrl = function () {
    if (this.url !== null && typeof this.url !== "undefined" && this.url != "") {
        return this.url;
    }

    var toRet = SITE_ROOT + "/?page=" + this.id;
    if (this.code !== null && !Number.isNaN(Number.parseInt(this.code))) {
        toRet += "&code=" + this.code;
    }

    return toRet;
};

JpnNavi.prototype.renderList = function (template, currentPage) {
    var el = template.clone(true, true);
    el.removeAttr("hidden");
    var expand = el.find(".expand");

    // prepare link
    var link = el.find(".link");
    link.html(this.label);
    link.attr("href", this.getRealUrl());
    if (currentPage == this.id) {
        link.addClass("active");
    }

    if (this.isParent) {
        el.addClass("parent");
    }
    // has children
    if (this.children !== null) {
        var childs = $("<div class='children'></div>");
        for (var i in this.children) {
            var c = this.children[i];
            var c_el = c.renderList(template, currentPage);
            childs.append(c_el);
        }
        el.append(childs);
        childs.attr("hidden", "hidden");
        expand.html(this.getArrow("right"));
    }
    // no children
    else {
        expand.html("<i class='fa fa-dot-circle left sm text-muted'></i>");
        expand.removeClass("expand");
    }

    el.attr("id", this.id);
    return el;
};

JpnNavi.prototype.getArrow = function (type) {
    return "<i class='fa fa-chevron-circle-" + type + " left sm'></i>";
};