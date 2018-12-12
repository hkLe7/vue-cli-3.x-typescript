import axios from 'axios';
import qs from 'qs';

let axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    withCredentials: false,
    transformRequest: [function (data) {
        var data = qs.parse(data) || {};
        return JSON.stringify(data);
    }],
    transformResponse: [function (data) {
        var data = typeof data == 'string' ? JSON.parse(data) : data;
        const {
            code,
            msg,
            result
        } = data;
        if (code == 10002) {
            location.href = window.location.origin + window.location.pathname + '/login';
            delCookie('token');
        }
        return data;
    }],
});
export const ajaxPost = (url, params, config) => {
    // const token = checkTokenValidation();
    // axiosInstance.defaults.headers.common['Authorization'] = token;
    return axiosInstance.post(url, params);
}

export const ajaxPost_qs = (url, params) => {
    // const token = checkTokenValidation();
    // axiosInstance.defaults.headers.common['Authorization'] = token;
    return axiosInstance.post(url, params);
}

export const ajaxGet = (url, query) => {
    // const token = checkTokenValidation();
    // axiosInstance.defaults.headers.common['Authorization'] = token;
    return axiosInstance.get(url, {
        params: query
    })
}

/**
 * 设置sessionstorage,
 * @param {*} name  存储名称
 * @param {*} content  存储的值，不需要json 化
 */
export const setStore = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.sessionStorage.setItem(name, content);
}

/**
 * 获取sessionStorage
 */
export const getStore = name => {
    if (!name) return;
    return window.sessionStorage.getItem(name);
}
/**
 * 删除sessionStorage
 */
export const removeStore = name => {
    if (!name) return;
    return window.sessionStorage.removeItem(name);
}
/**
 * 设置localstorage,
 * @param {*} name  存储名称
 * @param {*} content  存储的值，不需要json 化
 */
export const setLocal = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getLocal = name => {
    if (!name) return;
    return window.localStorage.getItem(name);
}
/**
 * 删除localStorage
 */
export const removeLocal = name => {
    if (!name) return;
    return window.localStorage.removeItem(name);
}

/**
 * 节流函数，自动搜索
 * @param {*} fn 
 * @param {*} delay 
 * @param {*} mustRunDelay 
 */
export const throttle = (fn, delay, mustRunDelay) => {
    let timer = null
    let t_start
    return function () {
        const context = this
        const args = arguments
        let t_curr = +new Date()

        clearTimeout(timer)
        if (!t_start) {
            t_start = t_curr
        }
        if (t_curr - t_start >= mustRunDelay) {
            fn.apply(context, args)
            t_start = t_curr
        } else {
            timer = setTimeout(function () {
                fn.apply(context, args)
            }, delay)
        }
    }
};

/**
 * 节点包含
 * @param {*} index 当前左侧导航索引 0-0
 * @param {*} navigations 左侧导航数据
 */
export const containEle = function (parentEl, el, container) {
    // 第一个节点是否包含第二个节点
    //contains 方法支持情况：chrome+ firefox9+ ie5+, opera9.64+(估计从9.0+),safari5.1.7+
    if (parentEl == el) {
        return true;
    }
    if (!el || !el.nodeType || el.nodeType != 1) {
        return false;
    }
    if (parentEl.contains) {
        return parentEl.contains(el);
    }
    // 兼容火狐
    if (parentEl.compareDocumentPosition) {
        return !!(parentEl.compareDocumentPosition(el) & 16);
    }
    var prEl = el.parentNode;
    while (prEl && prEl != container) {
        if (prEl == parentEl)
            return true;
        prEl = prEl.parentNode;
    }
    return false;
}

/**
 * 
 * @param {*} c_name 
 * @param {*} value 
 * @param {*} expiremMinutes 
 */
export const setCookie = function (c_name, value, expiremMinutes) {
    var exdate = new Date();
    exdate.setTime(exdate.getTime() + expiremMinutes * 60 * 1000);
    document.cookie = c_name + "=" + escape(value) + ((expiremMinutes == null) ? "" : ";expires=" + exdate.toGMTString());
};

/**
 * 
 * @param {*} c_name 
 */
export const getCookie = function (c_name) {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            var c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1)
                c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return null
};

/**
 * 
 * @param {*} c_name 
 */
export const delCookie = function (c_name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(c_name);
    if (cval != null) {
        document.cookie = c_name + "=" + cval + ";expires=" + exp.toGMTString();
    }
};

/**
 * 获取完整年月日formatter： yyyy-MM-dd
 * 
 * @param {any} time  需要格式化的时间
 * @param {any} separator  分隔符，默认 ‘/’
 * @returns 
 */
export const fillDate = (time, separator) => {
    let {
        length: len
    } = arguments;
    var separator;
    if (len == 0) return;
    if (len == 1) {
        separator = "-";
    } else {
        separator = separator;
    }
    var timeArr = time.split(separator);
    var newTimeArr = timeArr.map((item, index) => {
        if (item.length == 1) {
            return '0' + item;
        } else {
            return item
        }
    })
    return newTimeArr.join(separator)
}

export const formatDateTime = function (inputTime) {
    var date = new Date(inputTime);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
};

export const formatSeconds = function (value) {
    var secondTime = parseInt(value); // 秒
    var minuteTime = 0; // 分
    var hourTime = 0; // 小时
    if (secondTime > 60) { //如果秒数大于60，将秒数转换成整数
        //获取分钟，除以60取整数，得到整数分钟
        minuteTime = parseInt(secondTime / 60);
        //获取秒数，秒数取佘，得到整数秒数
        secondTime = parseInt(secondTime % 60);
        //如果分钟大于60，将分钟转换成小时
        if (minuteTime > 60) {
            //获取小时，获取分钟除以60，得到整数小时
            hourTime = parseInt(minuteTime / 60);
            //获取小时后取佘的分，获取分钟除以60取佘的分
            minuteTime = parseInt(minuteTime % 60);
        }
    }
    var result = "" + parseInt(secondTime) + "秒";

    if (minuteTime > 0) {
        result = "" + parseInt(minuteTime) + "分" + result;
    }
    if (hourTime > 0) {
        result = "" + parseInt(hourTime) + "小时" + result;
    }
    return result;
}

/**
 * 获取指定日期 前 n 天 ，不穿参数默认当天
 */
export const getBeforeDay = (num, paramDate) => {
    //指定日期
    if (paramDate) {
        var timeArr = paramDate.split('-'),
            newTimeArr = [];
        //处理指定日期格式（2018-06-06 / 2018-6-6）
        timeArr.map((item, index) => {
            if (item.substring(0, 1) == 0) {
                item = item.substring(1)
            }
            newTimeArr.push(item);
        })
        var year = newTimeArr[0],
            month = newTimeArr[1],
            day = newTimeArr[2];
        var date = new Date(year, month - 1, day);
    } else {
        var date = new Date();
    }
    var year = date.getFullYear();
    var mon = date.getMonth() + 1;
    var day = date.getDate();
    if (day <= num) {
        if (mon > 1) {
            mon = mon - 1;
        } else {
            year = year - 1;
            mon = 12;
        }
    }
    date.setDate(date.getDate() - num);
    year = date.getFullYear();
    mon = date.getMonth() + 1;
    day = date.getDate();
    var result = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
    var obj = {
        timeStamp: date,
        timeStr: result
    };
    return obj
}

/**
 * 获取指定日期前 n 月 ，不穿参数默认当天
 */
export const getBeforeMonth = (num, paramDate) => {
    if (paramDate) {
        var timeArr = paramDate.split('-'),
            newTimeArr = [];
        timeArr.map((item, index) => {
            if (item.substring(0, 1) == 0) {
                item = item.substring(1)
            }
            newTimeArr.push(item);
        })
        var year = timeArr[0],
            month = timeArr[1],
            day = timeArr[2];
        var date = new Date(year, month - 1, day);
    } else {
        var date = new Date();
    }
    var year = date.getFullYear();
    var mon = date.getMonth() + 1;
    var day = date.getDate();
    //获取当前日期中月的天数
    var days = new Date(year, mon, 0);
    days = days.getDate();
    var newYear = year;
    var newMonth = parseInt(mon) - num;
    if (newMonth <= 0) {
        var absM = Math.abs(newMonth);
        newYear = parseInt(newYear) - Math.ceil(absM / 12 == 0 ? 1 : parseInt(absM) / 12);
        newMonth = 12 - (absM % 12);
    }
    var newDay = day;
    var days2 = new Date(newYear, newMonth, 0);
    days2 = days2.getDate();
    if (newDay > days2) {
        newDay = days2;
    }
    var result = newYear + "-" + (newMonth < 10 ? ('0' + newMonth) : newMonth) + "-" + (newDay < 10 ? ('0' + newDay) : newDay);
    var dateStr = new Date(result);
    var obj = {
        timeStamp: dateStr,
        timeStr: result
    };
    return obj
}

export const getAfterMonth = (num, paramDate) => {
    if (paramDate) {
        var timeArr = paramDate.split('-'),
            newTimeArr = [];
        timeArr.map((item, index) => {
            if (item.substring(0, 1) == 0) {
                item = item.substring(1)
            }
            newTimeArr.push(item);
        })
        var year = timeArr[0],
            month = timeArr[1],
            day = timeArr[2];
        var date = new Date(year, month - 1, day);
    } else {
        var date = new Date();
    }
    var year = date.getFullYear();
    var mon = date.getMonth() + 1;
    var day = date.getDate();
    //获取当前日期中月的天数
    var days = new Date(year, mon, 0);
    days = days.getDate();
    var newYear = year;
    var newMonth = parseInt(mon) + num;
    if (newMonth > 12) {
        var absM = Math.abs(newMonth);
        newYear = parseInt(newYear) + parseInt((parseInt(absM) / 12 == 0 ? 1 : parseInt(absM) / 12))
        newMonth = absM % 12;
    }
    var newDay = day;
    var days2 = new Date(newYear, newMonth, 0);
    days2 = days2.getDate();
    if (newDay > days2) {
        newDay = days2;
    }
    var result = newYear + "-" + (newMonth < 10 ? ('0' + newMonth) : newMonth) + "-" + (newDay < 10 ? ('0' + newDay) : newDay);
    var dateStr = new Date(result);
    var obj = {
        timeStamp: dateStr,
        timeStr: result
    };
    return obj
}

export const convertImgToBase64 = (url, callback, check, outputFormat) => {
    var canvas = document.createElement('CANVAS'),
        ctx = canvas.getContext('2d'),
        img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = url;
    img.onload = () => {
        var width = img.width;
        var height = img.height;
        if (check && typeof check === 'function' && !check(width, height)) {
            return;
        }
        canvas.height = height;
        canvas.width = width;
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL(outputFormat || 'image/png');
        callback.call(this, dataURL);
        canvas = null;
    };
}

// 事件绑定

export const addEvent = (event_type, dom, cb, isCapture) => {
    if (document.addEventListener) {
        dom.addEventListener(event_type, cb, isCapture)
    } else if (document.attatchEvent) {
        dom.addEventListener('on' + event_type, cb, isCapture)
    } else {
        window['on' + event_type] = cb();
    }
}

/**
 ** 加法函数，用来得到精确的加法结果
 ** 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
 ** 调用：accAdd(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/
export const accAdd = (arg1, arg2) => {
    if (isNaN(arg1)) {
        arg1 = 0;
    }
    if (isNaN(arg2)) {
        arg2 = 0;
    }
    arg1 = Number(arg1);
    arg2 = Number(arg2);
    let r1, r2, m, c;
    try {
        r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
        r2 = 0;
    }
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
        let cm = Math.pow(10, c);
        if (r1 > r2) {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", "")) * cm;
        } else {
            arg1 = Number(arg1.toString().replace(".", "")) * cm;
            arg2 = Number(arg2.toString().replace(".", ""));
        }
    } else {
        arg1 = Number(arg1.toString().replace(".", ""));
        arg2 = Number(arg2.toString().replace(".", ""));
    }
    return (arg1 + arg2) / m;
}

/**
 ** 减法函数，用来得到精确的减法结果
 ** 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
 ** 调用：accSub(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/
export const accSub = (arg1, arg2) => {
    if (isNaN(arg1)) {
        arg1 = 0;
    }
    if (isNaN(arg2)) {
        arg2 = 0;
    }
    arg1 = Number(arg1);
    arg2 = Number(arg2);

    let r1, r2, m, n, res;
    try {
        r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    res = ((arg1 * m - arg2 * m) / m).toFixed(n);
    return Number(res);
}