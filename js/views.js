function dialog() {
    var dialog = document.createElement('div');
    dialog.id = "dialog";
    dialog.innerHTML = '<div id="beautifier"></div>' +
        '<form id="registry">' +
        '<input id="topic" type="text" value="事项主题" name="topic" required="required" max="60" />' +
        '</div>' +
        '<textarea id="content">事项内容</textarea>' +
        '<div id="registry-buttons">' +
        '<button class="button" id="cancel">取消</button>' +
        '<input class="button" id="submit" type="submit" value="提交" name="submitBtn" />' +
        '</div>' +
        '</form>';

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
    deEmphasized.id = 'mainpage-de-emphasized';
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
        res += doubleDigit(dateObj.getMonth() + 1) + '-';
        res += doubleDigit(dateObj.getDate()) + ' ';
        res += doubleDigit(dateObj.getHours()) + ':';
        res += doubleDigit(dateObj.getMinutes()) + ':';
        res += doubleDigit(dateObj.getSeconds());

        return res;
    }

    var now = new Date();
    var card = document.createElement('div');
    card.id = String(obj.id);
    var container = document.createElement('div');
    container.className = "items-container";
    card.appendChild(container);


    // 添加任务事项完成的按钮
    var assignmentBtn = document.createElement('button');
    assignmentBtn.className = 'button';
    assignmentBtn.id = 'button-' + String(obj.id);
    container.appendChild(assignmentBtn);

    // 绑定按钮事件响应
    assignmentBtn.onclick = function () {
        var now = new Date();
        var assignmentID = Number(this.id.substring(7));
        var assignmentObj = JSON.parse(FORMS.storage[assignmentID]);
        assignmentObj.completeDate = now;
        assignmentObj.isComplete = true;
        FORMS.storage[assignmentID] = JSON.stringify(assignmentObj);
        var assignmentCard = document.getElementById(assignmentID);
        refresh();
    }

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
    createTime.datetime = obj.createDate.toLocaleString();
    createTime.innerText = formatDate(obj.createDate);
    createDate.appendChild(createTime);
    itemDate.appendChild(createDate);

    if (!obj.isComplete) {
        card.className = 'list-items items-active';
        assignmentBtn.classList.add('check-btn');
        assignmentBtn.innerText = '点击完成';
    } else {
        card.className = "list-items items-complete";
        assignmentBtn.classList.add('completed-btn');
        assignmentBtn.innerText = '已经完成';
        assignmentBtn.disabled = 'disabled';
        var completeDate = document.createElement('span');
        completeDate.className = 'complete';
        completeDate.innerText = '完成时间：';
        var completeTime = document.createElement('time');
        completeTime.datetime = obj.completeDate.toLocaleString();
        completeTime.innerText = formatDate(obj.completeDate);
        completeDate.appendChild(completeTime);
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
    document.querySelector('#main-box').innerHTML = '';
    for (let e of FORMS.load()) {
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
