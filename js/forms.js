// 定义全局变量
var FORMS = {};
// 使用 localStorage 存储数据
FORMS.storage = window.localStorage;

FORMS.store = function () {
    var assignment = {
        topic: document.querySelector('#topic').value,
        content: document.querySelector('#content').value
    };
    var submit = window.MODELS.createAssignment(assignment);
    FORMS.storage[submit.id] = JSON.stringify(submit);
}

FORMS.load = function () {
    var arrAssignments = []; // 将取出的数据保存在一个数组中
    for (let id in FORMS.storage) {
        var assignment = JSON.parse(FORMS.storage[id]);
        arrAssignments.push(assignment);
    }
    // 将事项按 id 逆序排序，即越早创建的(时间戳越小的)越排在后面
    arrAssignments.sort((x, y) => -(x.id - y.id));
    return arrAssignments;
}
