/**
 * function - 延迟遍历
 * @param {array} task
 * @param {taskHandle}
 * @param {finishCallback}
 */
/**
  * @callback - itemHandle
  * @param {any} - value
  * @param {number} - index
  * @param {function} - next
  * @param {function} - finish
  */
 /**
  * @callback - finishCallback
  */
module.exports = function delayEach(task, itemHandle, finishCallback) {
    var taskCount = task.length
    var isFinish = false
    var callFinish = function () {
        if (!isFinish) {
            isFinish = true
            finishCallback()
        }
    }
    function handleTask(index) {
        itemHandle(
            task[index],
            index,
            function next () {
                if (isFinish) {
                    return
                }
                var nextIndex = index + 1
                if (nextIndex !== taskCount) {
                    handleTask(index + 1)
                }
                else {
                    callFinish()
                }
            },
            function finish() {
                callFinish()
            }
        )
    }
    handleTask(0)
}
