if (!AGB){
    var AGB = {};
}
AGB.Time = {
    timestamp: function() {
        return Math.floor(Date.now() / 1000);
    },
    timestampMinute: function() {
        return Math.floor((Date.now() - 1381000000000) / 60000);
    },
    timestampMinuteConvert: function(minuteToConvert) {
        return 1000 < minuteToConvert ? 60 * (+minuteToConvert || 0) + 1381000000 : 0;
    }
};
var VAL = {
        choose: function(value) {
            return 0 < value ? arguments[value] : "";
        },
        check: function(val) {
            for (var b = 1; b < arguments.length; b++)
                if (val === arguments[b]) return true;
            return false;
        },
        status: function(val, infVal, equVal, supVal) {
            return 0 > val ? infVal : 0 < val ? supVal : equVal;
        }
    },
    OBJ = {
        is: function(maybeObject) {
            return maybeObject && "object" === typeof maybeObject;
        },
        get: function(obj, key) {
            return obj && "object" === typeof obj && key in obj ? obj[key] : "";
        },
        set: function(obj, key, val) {
            obj && "object" === typeof obj && (obj[key] = val);
        },
        iterate: function(obj, callback) {
            if (obj && "object" === typeof obj)
                for (var c in obj) obj.hasOwnProperty(c) && callback(c);
        },
        iterateArray: function(array, callback) {
            Array.isArray(array) && array.forEach(callback);
        },
        create: function(sourceObject) {
            var copiedObject = {},
                key;
            if (sourceObject && "object" === typeof sourceObject)
                for (key in sourceObject)
                    "object" !== typeof sourceObject[key] &&
                    "function" !== typeof sourceObject[key] &&
                    (copiedObject[key] = sourceObject[key]);
            return copiedObject;
        },
        createKey: function(key, val) {
            var c = {};
            key && (c[key] = val);
            return c;
        },
        createFilter: function(sourceObj, filterObject) {
            var copiedObj = {},
                key;
            if (sourceObj && "object" === typeof sourceObj)
                for (key in sourceObj)
                    sourceObj.hasOwnProperty(key) &&
                    "object" !== typeof sourceObj[key] &&
                    (!filterObject || key in filterObject) &&
                    (copiedObj[key] = sourceObj[key]);
            return copiedObj;
        },
        copy: function(objectToCopy, objectTarget) {
            var key;
            if (objectToCopy && "object" === typeof objectToCopy && objectTarget && "object" === typeof objectTarget)
                for (key in objectToCopy) "object" !== typeof objectToCopy[key] && (objectTarget[key] = objectToCopy[key]);
        },
        parse: function(obj) {
            if (obj && "object" === typeof obj) return obj;
            try {
                return JSON.parse(obj || "{}");
            } catch (b) {
                return {};
            }
        },
        parseCopy: function(objToParseCopy, objectTarget) {
            var parsedObject, key;
            if (objToParseCopy && objectTarget) {
                try {
                    parsedObject = objToParseCopy && "object" === typeof objToParseCopy ? objToParseCopy : JSON.parse(objToParseCopy || "{}");
                } catch (e) {
                    parsedObject = null;
                }
                if (parsedObject) for (key in parsedObject) "object" !== typeof parsedObject[key] && (objectTarget[key] = parsedObject[key]);
            }
        },
        split: function(str) {
            var objTarget = {}, keyValPair, i;
            splitedStr = STR.check(str).split(";");
            for (i = 0; i < splitedStr.length; i++){
                keyValPair = (splitedStr[i] || "").split("=")
                keyValPair[0] && (objTarget[keyValPair[0]] = keyValPair[1] || "");
            }
            return objTarget;
        }
    },
    STR = {
        is: function(maybeString) {
            return maybeString && "string" === typeof maybeString;
        },
        check: function(maybeStr) {
            return "string" === typeof maybeStr
                ? maybeStr
                : "number" === typeof maybeStr && maybeStr
                    ? maybeStr + ""
                    : "";
        },
        trim: function(maybeStr) {
            return "string" === typeof maybeStr ? maybeStr.trim() : this.check(maybeStr);
        },
        zero: function(maybeStr) {
            return maybeStr
                ? "string" === typeof maybeStr
                    ? maybeStr
                    : "number" === typeof maybeStr
                        ? maybeStr + ""
                        : "0"
                : "0";
        },
        trimZero: function(str, indexToSub) {
            str = "0000" + str;
            return str.substr(str.length - indexToSub);
        },
        compare: function(str, strToCompare) {
            return "string" === typeof str
                ? str.length === strToCompare.length && str === strToCompare
                : false;
        },
        getAttribute: function(str, attributeName) {
            return "string" === typeof str
                ? ((str.split(" " + attributeName + '="')[1] || "").split('"')[0] || "").trim()
                : "";
        },
        getParameter: function(parameterKey, strLink) {
            var explodeParameters = decodeURIComponent(strLink || "")
                .replace(/\?/g, "&")
                .split("&" + parameterKey + "=")[1];
            return explodeParameters ? explodeParameters.split("&")[0].split("#")[0] || "" : "";
        },
        addUrlPara: function(a, b) {
            var c = encodeURI(STR.check(b).trim());
            return a && c ? "&" + a + "=" + c : "";
        },
        hash: function(str) {
            var b,
                c = 0;
            if ("string" === typeof str && 0 < str.length)
                for (b = 0; b < str.length; b++){
                    (c = (c << 5) - c + str.charCodeAt(b));
                    c &= c;
                }
            return c;
        }
    },
    NMR = {
        minMax: function(val, maxVal, minVal) {
            return Math.max(Math.min(+val || 0, minVal), maxVal);
        },
        isMinMax: function(val, minVal, maxVal) {
            return +val >= minVal && +val <= maxVal;
        },
        parseInt: function(maybeNumber) {
            return "string" === typeof maybeNumber
                ? parseInt(maybeNumber, 10)
                : "number" === typeof maybeNumber
                    ? Math.floor(maybeNumber)
                    : 0;
        },
        parseIntFormat: function(maybeNumber) {
            return "string" === typeof maybeNumber
                ? +maybeNumber.replace(/[^\d\-]/g, "") || 0
                : "number" === typeof maybeNumber
                    ? Math.floor(maybeNumber)
                    : 0;
        },
        parseIntAbs: function(maybeNumber) {
            return "string" === typeof maybeNumber
                ? +maybeNumber.replace(/[^\d]/g, "") || 0
                : "number" === typeof maybeNumber
                    ? Math.floor(Math.abs(maybeNumber))
                    : 0;
        }
    };
