//Author: Hank Hsiao
var Han = (function(window) {

    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
    /**
     * 判斷是否為行動裝置
     * @type {Boolean}
     */
    var isMobile = userAgent.match(/iPhone/i) || userAgent.match(/iPod/i) || userAgent.match(/Android/i) ? true : false;

    /**
     * 判斷是否有觸控事件
     * @type {Boolean}
     */
    var hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints;

    
    /**
     * 行動裝置的 touch 事件字串，若不是行動裝置，取得 mouse 事件字串
     */
    var Event = (function () {
        if (hasTouch) {
            return {
                down : 'touchstart',
                move : 'touchmove',
                up : 'touchend'
            }
        } else {
            return {
                down: 'mousedown',
                move: 'mousemove',
                up: 'mouseup'
            };
        }
    })();

    return {
        isMobile: isMobile,
        hasTouch: hasTouch,
        Event: Event
    }
})(window);