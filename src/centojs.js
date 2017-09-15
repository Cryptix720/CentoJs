/*! Centronium v1.0.0 | (c) JS Foundation and other contributors | centronium/license */

if (typeof Array.prototype.indexOf !== 'function') {
    Array.prototype.indexOf = function (item) {
        for(var i = 0; i < this.length; i++) {
            if (this[i] === item) {
                return i;
            }
        }
        return -1;
    }; 
}



//Centronium boilerplate
window.cent = (function () {
    function Cent(els) {
        for(var i = 0; i < els.length; i++ ) {
            this[i] = els[i];
        }
        this.length = els.length;
    }
	
	
	
    // ========= UTILS =========
    Cent.prototype.forEach = function (callback) {
        this.map(callback);
        return this; 
    };
    Cent.prototype.map = function (callback) {
        var results = [];
        for (var i = 0; i < this.length; i++) {
            results.push(callback.call(this, this[i], i));
        }
        return results; //.length > 1 ? results : results[0];
    };
    Cent.prototype.mapOne = function (callback) {
        var m = this.map(callback);
        return m.length > 1 ? m : m[0];
    };
	
	

    // ========== DOM MANIPULATION ==========
    Cent.prototype.text = function (text) {
        if (typeof text !== "undefined") {
            return this.forEach(function (el) {
                el.innerText = text;
            });
        } else {
            return this.mapOne(function (el) {
                return el.innerText;
            });
        }
    };

    Cent.prototype.html = function (html) {
        if (typeof html !== "undefined") {
            return this.forEach(function (el) {
                el.innerHTML = html;
            });
        } else {
            return this.mapOne(function (el) {
                return el.innerHTML;
            });
        }
    };

    Cent.prototype.addClass = function (classes) {
        var className = "";
        if (typeof classes !== 'string') {
            for (var i = 0; i < classes.length; i++) {
               className += " " + classes[i];
            }
        } else {
            className = " " + classes;
        }
        return this.forEach(function (el) {
            el.className += className;
        });
    };
 // ========== FETCH ELEMENTS ==========()


 var cent = {
        lot: function (selector) {
            var els;
            if (typeof selector === 'string') {
                els = document.querySelectorAll(selector);
            } else if (selector.length) { 
                els = selector;
            } else {
                els = [selector];
            }
            return new Cent(els);
        }, 
        create: function (tagName, attrs) {
            var el = new Cent([document.createElement(tagName)]);
            if (attrs) {
                if (attrs.className) { 
                    el.addClass(attrs.className);
                    delete attrs.className;
                }
                if (attrs.text) { 
                    el.text(attrs.text);
                    delete attrs.text;
                }
                for (var key in attrs) {
                    if (attrs.hasOwnProperty(key)) {
                        el.attr(key, attrs[key]);
                    }
                }
            }
            return el;
        }
    };
    return cent;
}());


//Cent instances

function Cent (els) {
    for(var i = 0; i < els.length; i++ ) {
        this[i] = els[i];
    }
    this.length = els.length;
}



   //  ========== LOCATE MAX, APPERING ELEMENT ARRAY =========
function getMaxCent(arr) {
var i;
var j;
var max = arr[0];
var size = arr.length;
var count = 1;
var maxCount = 1;


for (i = 0; i < size; i++) {
count = 1;
for (j = i + 1; j < size; j++) {
if (arr[i] === arr[j]) {
count++;
}
}
if (count > maxCount) {
max = arr[i];
maxCount = count;
}
}
return max;
};

    // ========== DOM MANIPULATION V1==========
    Cent.prototype.text = function (text) {
        if (typeof text !== "undefined") {
            return this.forEach(function (el) {
                el.innerText = text;
            });
        } else {
            return this.mapOne(function (el) {
                return el.innerText;
            });
        }
    };
    // ========== DOM MANIPULATION (beta)==========
Cent.prototype.JSON = function (json) {
    if (typeof json !== "undefined") {
        this.forEach(function (el) {
            el.innerHTML = json;
        });
        return this;
    } else {
        return this.mapOne(function (el) {
            return el.innerHTML;
        });
    }
};

//Add and remove classes;
Cent.prototype.addClass = function (classes) {
    var className = "";
    if (typeof classes !== "string") {
        for (var i = 0; i < classes.length; i++) {
            className += " " + classes[i];
        }
    } else {
        className = " " + classes;
    }
    return this.forEach(function (el) {
        el.className += className;
    });
};
Cent.prototype.removeClass = function (math) {
    return this.forEach(function (el) {
        var cs = el.className.split(" "), i;
 
        while ( (i = cs.indexOf(math)) > -1) { 
            cs = cs.slice(0, i).concat(cs.slice(++i));
        }
        el.className = cs.join(" ");
    }); 
};

//IE BUGSS
if (typeof Array.prototype.indexOf !== "function") {
    Array.prototype.indexOf = function (item) {
        for(var i = 0; i < this.length; i++) {
            if (this[i] === item) {
                return i;
            }
        }
        return -1;
    };
}
//Adjusting Attributes
Cent.prototype.attr = function (attr, val) {
    if (typeof val !== "undefined") {
        return this.forEach(function(el) {
            el.setAttribute(attr, val);
        });
    } else {
        return this.mapOne(function (el) {
            return el.getAttribute(attr);
        });
    }
};
//Elements not method.
var cent = {
    // get method here
    create: function (tagName, attrs) {
 
    }
};

//Appending and Prepending Elements
Cent.prototype.append = function (els) {
    return this.forEach(function (parEl, i) {
        els.forEach(function (childEl) {
            if (i > 0) {
                childEl = childEl.cloneNode(true); 
            }
            parEl.appendChild(childEl);
        }); 
    }); 
};
Cent.prototype.prepend = function (els) {
    return this.forEach(function (parEl, i) {
        for (var j = els.length -1; j > -1; j--) {
            childEl = (i > 0) ? els[j].cloneNode(true) : els[j];
            parEl.insertBefore(childEl, parEl.firstChild);
        }
    }); 
};

//Remove nodes
Cent.prototype.remove = function () {
    return this.forEach(function (el) {
        return el.parentNode.removeChild(el);
    });
};


//EventEarsON
Cent.prototype.on = (function () {
    if (document.addEventListener) {
        return function (evt, fn) {
            return this.forEach(function (el) {
                el.addEventListener(evt, fn, false);
            });
        };
    } else if (document.attachEvent)  {
        return function (evt, fn) {
            return this.forEach(function (el) {
                el.attachEvent("on" + evt, fn);
            });
        };
    } else {
        return function (evt, fn) {
            return this.forEach(function (el) {
                el["on" + evt] = fn;
            });
        };
    }
}());
//EventEarsOFF
Cent.prototype.off = (function () {
    if (document.removeEventListener) {
        return function (evt, fn) {
            return this.forEach(function (el) {
                el.removeEventListener(evt, fn, false);
            });
        };
    } else if (document.detachEvent)  {
        return function (evt, fn) {
            return this.forEach(function (el) {
                el.detachEvent("on" + evt, fn);
            });
        };
    } else {
        return function (evt, fn) {
            return this.forEach(function (el) {
                el["on" + evt] = null;
            });
        };
    }
}());

//HashTable finds the duplication

Cent.prototype.attr = function printRepeating(arr) {
var hs = new HashTable();
var i;
var size = arr.length;
document.writeln(" Repeating elements are ");
for (i = 0; i < size; i++) {
if (hs.find(arr[i])) {
document.writeln(arr[i]);
}
else {
hs.insert(arr[i]);
}
}
};




