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
    var  a = null;
}
