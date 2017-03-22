// 定义全局变量，
var MODELS = {};

// 定义数据模型的构造函数
MODELS.Assignment = function (props) {
    this.createDate = props.createDate || new Date();   // 事项创建日期
    // 以创建时间的时间戳作为任务事项的主码
    this.id = this.createDate.getTime();
    this.topic = props.topic || '空事项';             // 事项主题
    // 任务事项的有效日期，若为给出则指定为 2099 年最后一秒
    this.validDate = props.validDate || new Date(Date.parse('2099-12-31T23:59:59.999+08:00'));
    this.completeDate = null;       // 事项完成日期，创建时肯定没完成所以赋值 null
    this.content = props.content || '';         // 事项内容
    this.isComplete = false;        // 事项是否完成
}

MODELS.createAssignment = function (props) {
    return new MODELS.Assignment(props || {});
}
