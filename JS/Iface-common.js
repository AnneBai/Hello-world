var Iface = {};
//接口构造函数
Iface.Interface = function (name, methods) {
  'use strict';
  if (arguments.length !== 2) {
    throw new Error("arguments type error");
  }
  this.name = name;
  this.methods = [];
  var i, len;
  for (i = 0, len = methods.length; i < len; i += 1) {
    if (typeof methods[i] !== 'string') {
      throw new Error("methods should be array");
    }
    this.methods.push(methods[i]);
  }
};
//接口检测
Iface.Interface.ensureImp = function (object) {
  'use strict';
  if (arguments.length < 2) {
    throw new Error("arguments type error");
  }
  var i, len, instanceInterface, j, methodName;
  for (i = 1, len = arguments.length; i < len; i += 1) {
    instanceInterface = arguments[i];
    if (instanceInterface.constructor !== Iface.Interface) {
      throw new Error(instanceInterface + " is not interface");
    }
    for (j = 0; j < instanceInterface.methods.length; j += 1) {
      methodName = instanceInterface.methods[j];
      if (!object[methodName] || typeof object[methodName] !== "function") {
        throw new Error("the method name '" + methodName + "' is not found");
      }
    }
  }
};
//实现继承sub--sup
Iface.extantProto = function (sub, sup) {
  "use strict";
  var Midea = function () {};
  var supProto = sup.prototype;
  Midea.prototype = supProto;
  sub.prototype = new Midea();
  sub.prototype.constructor = sub;
};

//跨浏览器事件对象
var EventUtil = {
  addHandler: function (element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent("on" + type, handler);
    } else {
      element["on" + type] = handler;
    }
  },
  getEvent: function (event) {
    return event ? event : window.event;
  },
  getTarget: function (event) {
    return event.target || event.srcElement;
  },
  preventDefault: function (event) {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  },
  removeHandler: function (element, type, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent("on" + type, handler);
    } else {
      element["on" + type] = null;
    }
  },
  stopPropagation: function (event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
  }
};