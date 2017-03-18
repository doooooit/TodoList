function registry() {
    var reg = document.createElement('div');

}

function createNew() {
    // 获取窗口内部高度和宽度
    var h = window.innerHeight;
    var w = window.innerWidth;

    // 创建 mask 层元素
    var mask = document.createElement('div');
    mask.id = "mask";
    mask.style.height = h + "px";
    mask.style.width = w + "px";
    // 将 mask 元素插入文档中
    document.body.appendChild(mask);
    mask.onclick = function () {
        document.body.removeChild(mask);
    }
}

window.onload = function() {
    var btn = document.querySelector('#create-new');
    // 点击 ‘新建事项’ 按钮
    btn.onclick = function() {
        createNew();
        return
    }
}
