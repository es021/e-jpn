
var scssToLoad = [
    "app", "left-bar", "header", "general"
];

scssToLoad.map((d, i) => {
    require(`../../css/scss/${d}.scss`);
})
