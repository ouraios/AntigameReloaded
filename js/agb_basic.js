if(!AGB)var AGB={};AGB.Time={timestamp:function(){return Math.floor(Date.now()/1e3)},timestampMinute:function(){return Math.floor((Date.now()-1381e9)/6e4)},timestampMinuteConvert:function(t){return 1e3<t?60*(+t||0)+1381e6:0}};var VAL={choose:function(t){return 0<t?arguments[t]:""},check:function(t){for(var e=1;e<arguments.length;e++)if(t===arguments[e])return!0;return!1},status:function(t,e,r,n){return t<0?e:0<t?n:r}},OBJ={is:function(t){return t&&"object"==typeof t},get:function(t,e){return t&&"object"==typeof t&&e in t?t[e]:""},set:function(t,e,r){t&&"object"==typeof t&&(t[e]=r)},iterate:function(t,e){if(t&&"object"==typeof t)for(var r in t)t.hasOwnProperty(r)&&e(r)},iterateArray:function(t,e){Array.isArray(t)&&t.forEach(e)},create:function(t){var e,r={};if(t&&"object"==typeof t)for(e in t)"object"!=typeof t[e]&&"function"!=typeof t[e]&&(r[e]=t[e]);return r},createKey:function(t,e){var r={};return t&&(r[t]=e),r},createFilter:function(t,e){var r,n={};if(t&&"object"==typeof t)for(r in t)t.hasOwnProperty(r)&&"object"!=typeof t[r]&&(!e||r in e)&&(n[r]=t[r]);return n},copy:function(t,e){var r;if(t&&"object"==typeof t&&e&&"object"==typeof e)for(r in t)"object"!=typeof t[r]&&(e[r]=t[r])},parse:function(t){if(t&&"object"==typeof t)return t;try{return JSON.parse(t||"{}")}catch(t){return{}}},parseCopy:function(t,e){var r,n;if(t&&e){try{r=t&&"object"==typeof t?t:JSON.parse(t||"{}")}catch(t){r=null}if(r)for(n in r)"object"!=typeof r[n]&&(e[n]=r[n])}},split:function(t){var e,r,n={};for(t=STR.check(t).split(";"),r=0;r<t.length;r++)(e=(t[r]||"").split("="))[0]&&(n[e[0]]=e[1]||"");return n}},STR={is:function(t){return Boolean(t&&"string"==typeof t)},check:function(t){return"string"==typeof t?t:"number"==typeof t&&t?t+"":""},trim:function(t){return"string"==typeof t?t.trim():"number"==typeof t&&t?t+"":""},zero:function(t){return t?"string"==typeof t?t:"number"==typeof t?t+"":"0":"0"},trimZero:function(t,e){return(t="0000"+t).substr(t.length-e)},compare:function(t,e){return"string"==typeof t&&"string"==typeof t&&(t.length===e.length&&t===e)},getAttribute:function(t,e){return"string"==typeof t?((t.split(" "+e+'="')[1]||"").split('"')[0]||"").trim():""},getParameter:function(t,e){var r=decodeURIComponent(e||"").replace(/\?/g,"&").split("&"+t+"=")[1];return r&&r.split("&")[0].split("#")[0]||""},addUrlPara:function(t,e){var r=encodeURI(STR.check(e).trim());return t&&r?"&"+t+"="+r:""},hash:function(t){var e,r=0;if("string"==typeof t&&0<t.length)for(e=0;e<t.length;e++)r=(r<<5)-r+t.charCodeAt(e),r&=r;return r}},NMR={minMax:function(t,e,r){return Math.max(Math.min(+t||0,r),e)},isMinMax:function(t,e,r){return e<=+t&&+t<=r},parseInt:function(t){return"string"==typeof t?parseInt(t,10):"number"==typeof t?Math.floor(t):0},parseIntFormat:function(t){return"string"==typeof t?+t.replace(/[^\d\-]/g,"")||0:"number"==typeof t?Math.floor(t):0},parseIntAbs:function(t){return"string"==typeof t?+t.replace(/[^\d]/g,"")||0:"number"==typeof t?Math.floor(Math.abs(t)):0}};