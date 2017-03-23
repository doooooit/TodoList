function dialog() {
    var dialog = document.createElement('div');
    dialog.id = "dialog";
    dialog.innerHTML = window.dialogHTMLCodes;
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
        document.body.removeChild(document.querySelector('#mainpage-de-emphasized'));
    }
    var submit = document.querySelector('#submit');
    submit.onclick = window.FORMS.store;
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

function createAssignmentCard(obj) {
    // 格式化时间
    function formatDate(dateStr) {
        // 如果 Date.get() 得到的数字是一位数则在其前加0
        function doubleDigit(num) {
            var res = String(num);
            if (num < 10) {
                res = '0' + String(num);
            }
            return res;
        }
        var dateObj = new Date(Date.parse(dateStr));
        var res = '';
        res += dateObj.getFullYear() + '-';
        res += doubleDigit(dateObj.getMonth()) + '-';
        res += doubleDigit(dateObj.getDate()) + ' ';
        res += doubleDigit(dateObj.getHours()) + ':';
        res += doubleDigit(dateObj.getMinutes()) + ':';
        res += doubleDigit(dateObj.getSeconds());

        return res;
    }

    var now = new Date();
    var card = document.createElement('div');
    if (!obj.isComplete && Date.parse(obj.validDate) >= now.getTime()) {
        card.className = 'list-items items-active';
        var validDate = document.createElement('span');
        validDate.className = 'valid';
        validDate.innerText = '有效期至：';
        var validTime = document.createElement('time');
        validTime.datetime = obj.validDate;
        validTime.innerText = formatDate(obj.validDate);
        validDate.appendChild(validTime);
    } else if (obj.isComplete) {
        card.className = "list-items items-complete";
        var completeDate = document.createElement('span');
        completeDate.className = 'complete';
        completeDate.innerText = '完成时间：';
        var completeTime = document.createElement('time');
        completeTime.datetime = obj.completeDate;
        completeTime.innerText = formatDate(obj.completeDate);
        completeDate.appendChild(completeTime);
    } else if (Date.parse(obj.validDate) <= now.getTime()) {
        card.className = "list-items items-unvalid";
    }
    var container = document.createElement('div');
    container.className = "items-container";
    card.appendChild(container);

    // 事项主题
    var topic = document.createElement('h2');
    topic.className = 'item-topic';
    topic.innerText = obj.topic;
    container.appendChild(topic);

    // 时间信息
    var itemDate = document.createElement('div');
    itemDate.className = 'item-date';
    container.appendChild(itemDate);

    var createDate = document.createElement('span');
    createDate.className = 'create';
    createDate.innerText = '创建时间：'
    itemDate.appendChild(createDate);
    var createTime = document.createElement('time');
    createTime.datetime = obj.createDate;
    createTime.innerText = formatDate(obj.createDate);
    createDate.appendChild(createTime);

    itemDate.appendChild(createDate);
    if (obj.isComplete) {
        itemDate.appendChild(completeDate);
    }

    var content = document.createElement('p');
    content.className = 'item-content';
    content.innerText = obj.content;
    container.appendChild(content);

    // 将这个任务卡插入文档中
    document.querySelector('#main-box').appendChild(card);
}


function refresh() {
    var arrAssignments = []; // 将取出的数据保存在一个数组中
    for (let id in FORMS.storage) {
        var assignment = JSON.parse(FORMS.storage[id]);
        arrAssignments.push(assignment);
    }
    // 将事项按 id 逆序排序，即越早创建的(时间戳越小的)越排在后面
    arrAssignments.sort((x, y) => -(x.id - y.id));

    // 将数组中的数据全部加入到文档流中
    for (let e of arrAssignments) {
        createAssignmentCard(e);
    }
}

window.onload = function() {
    refresh();
    var btn = document.querySelector('#create-new');
    // 点击 ‘新建事项’ 按钮
    btn.onclick = function() {
        createNew();
        return;
    }
}

window.addEventListener("storage", refresh, false);
