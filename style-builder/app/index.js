
var scssToLoad = [
    "app", "left-bar", "header", "general", "content", "img-menu"
];

scssToLoad.map((d, i) => {
    require(`../../css/scss/${d}.scss`);
})

