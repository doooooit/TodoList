function dialog() {
    var dialog = document.createElement('div');
    dialog.id = "dialog";

    var nodes = '<div id="beautifier"></div>' +
        '<form id="registry">' +
        '<input id="topic" type="text" value="事项主题" name="topic" required="required" max="60" />' +
        '<div id="expiration-date">' +
        '<label id="date-description">有效日期截止：</label>' +
        '<select id="select-date-year">' +
        '<option value=""></option>' +
        '</select>' +
        '<label id="year">年</label>' +
        '<select id="select-date-month">' +
        '<option value="1" selected="selected">1</option>' +
        '<option value="2">2</option>' +
        '<option value="3">3</option>' +
        '<option value="4">4</option>' +
        '<option value="5">5</option>' +
        '<option value="6">6</option>' +
        '<option value="7">7</option>' +
        '<option value="8">8</option>' +
        '<option value="9">9</option>' +
        '<option value="10">10</option>' +
        '<option value="11">11</option>' +
        '<option value="12">12</option>' +
        '</select>' +
        '<label id="month">月</label>' +
        '<select id="select-date-day">' +
        '<option value="1" selected="selected">1</option>' +
        '<option value="2">2</option>' +
        '<option value="3">3</option>' +
        '<option value="4">4</option>' +
        '<option value="5">5</option>' +
        '<option value="6">6</option>' +
        '<option value="7">7</option>' +
        '<option value="8">8</option>' +
        '<option value="9">9</option>' +
        '<option value="10">10</option>' +
        '<option value="11">11</option>' +
        '<option value="12">12</option>' +
        '<option value="13">13</option>' +
        '<option value="14">14</option>' +
        '<option value="15">15</option>' +
        '<option value="16">16</option>' +
        '<option value="17">17</option>' +
        '<option value="18">18</option>' +
        '<option value="19">19</option>' +
        '<option value="20">20</option>' +
        '<option value="21">21</option>' +
        '<option value="22">22</option>' +
        '<option value="23">23</option>' +
        '<option value="24">24</option>' +
        '<option value="25">25</option>' +
        '<option value="26">26</option>' +
        '<option value="27">27</option>' +
        '<option value="28">28</option>' +
        '</select>' +
        '<label id="day">日</label>' +
        '</div>' +
        '<textarea id="content">事项内容</textarea>' +
        '<div id="registry-buttons">' +
        '<button class="button" id="cancel">取消</button>' +
        '<input class="button" id="submit" type="submit" value="提交" name="submitBtn" />' +
        '</div>' +
        '</form>';

    dialog.innerHTML = nodes;
    document.body.appendChild(dialog);
    // innerX 为浏览器实际显示页面的尺寸
    var innerH = window.innerHeight;
    var innerW = window.innerWidth;
    // screenX 为整个显示器的尺寸
    var screenH = screen.height;
    // 元素位于整个显示器的中央，比页面中央偏上一些，更符合视觉习惯
    dialog.style.top = (screenH - dialog.offsetHeight) / 2 - (screenH - innerH) + "px";
    dialog.style.left = (innerW - dialog.offsetWidth) / 2 + "px";

    var topic = document.querySelector('#topic');
    topic.onclick = function() {
        topic.value = '';
    }

    var content = document.querySelector('#content');
    content.onclick = function() {
        content.innerText = '';
    }

    var cancel = document.querySelector('#cancel');
    cancel.onclick = function() {
        document.body.removeChild(document.querySelector('#dialog'));
        document.body.removeChild(document.querySelector('#mask'));
        document.body.removeChild(deEmphasized);
    }
}

function createNew() {
    // 动态创建对主页面的虚化动画 css 代码
    var deEmphasized = document.createElement('style');
    deEmphasized.innerHTML = '#main-container{transition:.3s filter;filter: blur(3px);}';
    document.body.appendChild(deEmphasized);

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
    dialog();

    mask.onclick = function() {
        document.body.removeChild(document.querySelector('#dialog'));
        document.body.removeChild(mask);
        document.body.removeChild(deEmphasized);
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
