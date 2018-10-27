var DOM = {
    query: function(selector, type) {
      if("string" === typeof selector){
          if(type){
              if("object" === typeof type){
                  return type.querySelector(selector)
              }else if(type === 'id'){
                  return document.getElementById(selector)
              }else if(document.getElementById(type)){
                      return document.getElementById(type).querySelector(selector)
              }else{
                  return null
              }
          }else{
              return document.querySelector(selector)
          }
      }else{
          return selector
      }
    },
    queryAll: function(selector, parentSelector) {
      return "string" === typeof selector
        ? (parentSelector || document).querySelectorAll(selector)
        : selector && "object" === typeof selector && "length" in selector
          ? selector
          : [];
    },
    findParent: function(selector, selectorType, idName, nbParentNode) {
      if ((selector = DOM.query(selector, selectorType)) && idName)
        for (nbParentNode = nbParentNode || 0; selector && 0 <= nbParentNode; ) {
          if (selector.id === idName) return selector;
          nbParentNode--;
          selector = selector.parentNode;
        }
      return null;
    },
    iterate: function(objectToIterate, callback) {
      var c;
      if (objectToIterate && "object" === typeof objectToIterate && "length" in objectToIterate)
        for (c = 0; c < objectToIterate.length; c++) objectToIterate[c] && callback(objectToIterate[c]);
    },
    iterateChildren: function(parentElement, callback) {
      if (parentElement)
        for (var c = parentElement.firstChild; c; c = c.nextSibling)
          1 === c.nodeType && callback(c);
    },
    hasChildren: function(element) {
      return element && element.children ? element.children.length : 0;
    },
    getChildren: function(element, callback) {
      return element && element.children ? element.children[callback] : null;
    },
    getSelectedNode: function(element) {
      return element && element.options && "selectedIndex" in element
        ? element.options[element.selectedIndex]
        : null;
    },
    getChildnodeByName: function(element, callback) {
      if (element && element.children)
        for (var c = 0; c < element.children.length; c++)
          if (element.children[c].tagName === callback) return element.children[c];
      return null;
    },
    prependChild: function(element, child) {
      element &&
        child &&
        (element.childNodes.length
          ? element.insertBefore(child, element.childNodes[0])
          : element.appendChild(child));
    },
    appendChild: function(element, child) {
      element && child && element.appendChild(child);
    },
    before: function(element, child) {
      element && child && element.parentNode.insertBefore(child, element);
    },
    after: function(element, child) {
      element &&
        child &&
        (element.nextElementSibling
          ? element.parentNode.insertBefore(child, element.nextElementSibling)
          : element.parentNode.appendChild(child));
    },
    replaceChildren: function(element, children) {
      if (element) {
        for (; element.firstChild; ) element.removeChild(element.firstChild);
        children && element.appendChild(children);
      }
    },
    removeChildren: function(element, child) {
      var tmp;
      if (element)
        for (tmp = 0; tmp < element.childNodes.length; tmp++)
          (child && element.childNodes[tmp].nodeType !== child) ||
            element.removeChild(element.childNodes[tmp]);
    },
    create: function(tagName, attributes, styles, eventListener, otherProperty) {
      var tmpProperty, element;
      element = document.createElement(tagName);
      if (attributes)
        if ("string" === typeof attributes) element.className = attributes;
        else for (tmpProperty in attributes) attributes.hasOwnProperty(tmpProperty) && element.setAttribute(tmpProperty, attributes[tmpProperty]);
      if (styles) for (tmpProperty in styles) styles.hasOwnProperty(tmpProperty) && (element.style[tmpProperty] = styles[tmpProperty]);
      if (eventListener)
        for (tmpProperty in eventListener) eventListener.hasOwnProperty(tmpProperty) && element.addEventListener(tmpProperty, eventListener[tmpProperty], false);
      if (otherProperty) for (tmpProperty in otherProperty) otherProperty.hasOwnProperty(tmpProperty) && (element[tmpProperty] = otherProperty[tmpProperty]);
      return element;
    },
        parse: function (html) {
            // based on jQuery.buildFragment()
            //
            // jQuery JavaScript Library v1.11.3
            // http://jquery.com/
            //
            // Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
            // Released under the MIT license
            // http://jquery.org/license
            var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
                rtagName = /<([\w:]+)/,
                rhtml = /<|&#?\w+;/,
                wrapMap = {
                    option: [ 1, "<select multiple='multiple'>", "</select>" ],
                    legend: [ 1, "<fieldset>", "</fieldset>" ],
                    area: [ 1, "<map>", "</map>" ],
                    param: [ 1, "<object>", "</object>" ],
                    thead: [ 1, "<table>", "</table>" ],
                    tr: [ 2, "<table><tbody>", "</tbody></table>" ],
                    col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
                    td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
                    _default: [ 0, "", "" ]
                },
                nodes = [];
            wrapMap.optgroup = wrapMap.option, wrapMap.th = wrapMap.td,
                wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;

            if (!rhtml.test(html)) {
                // Convert non-html into a text node
                return document.createTextNode(html);
            } else {
                // Convert html into DOM nodes
                var tmp = document.createElement('div');

                // Deserialize a standard representation
                var tag = (rtagName.exec(html) || ["", ""])[1].toLowerCase();
                var wrap = wrapMap[tag] || wrapMap._default;

                tmp.innerHTML = wrap[1] + html.replace(rxhtmlTag, "<$1></$2>" ) + wrap[2];

                // Descend through wrappers to the right content
                var j = wrap[0] + 1;
                while (j--) {
                    tmp = tmp.lastChild;
                }

                return tmp;
            }
        },
    append: function(element, tagName, attributes, styles, eventListener, otherProperty, agrData) {
      var tmp;
      element = element
        ? element.appendChild(document.createElement(tagName))
        : document.createElement(tagName);
      if (attributes)
        if ("string" === typeof attributes) element.className = attributes;
        else for (tmp in attributes) attributes.hasOwnProperty(tmp) && element.setAttribute(tmp, attributes[tmp]);
      if (styles) for (tmp in styles) styles.hasOwnProperty(tmp) && (element.style[tmp] = styles[tmp]);
      if (eventListener)
        for (tmp in eventListener) eventListener.hasOwnProperty(tmp) && element.addEventListener(tmp, eventListener[tmp], false);
      if (otherProperty) for (tmp in otherProperty) otherProperty.hasOwnProperty(tmp) && (element[tmp] = otherProperty[tmp]);
      agrData && element.setAttribute("ago-data", JSON.stringify(agrData));
      return element;
    },
    appendDIV: function(element, attributes, styles) {
      var tmp;
      element = element
        ? element.appendChild(document.createElement("div"))
        : document.createElement("div");
      if (attributes)
        if ("string" === typeof attributes) element.className = attributes;
        else for (tmp in attributes) attributes.hasOwnProperty(tmp) && element.setAttribute(tmp, attributes[tmp]);
      if (styles) for (tmp in styles) styles.hasOwnProperty(tmp) && (element.style[tmp] = styles[tmp]);
      return element;
    },
    appendTABLE: function(element, attributes, styles, pixelsPerColumn) {
      var tmp;
      element = element
        ? element.appendChild(document.createElement("table"))
        : document.createElement("table");
      element.style.tableLayout = "fixed";
      if (attributes)
        if ("string" === typeof attributes) element.className = attributes;
        else for (tmp in attributes) attributes.hasOwnProperty(tmp) && element.setAttribute(tmp, attributes[tmp]);
      if (styles) for (tmp in styles) styles.hasOwnProperty(tmp) && (element.style[tmp] = styles[tmp]);
      if (pixelsPerColumn)
        for (
          attributes = element.appendChild(document.createElement("colgroup")), tmp = 0;
          tmp < pixelsPerColumn.length;
          tmp++
        )
          attributes.appendChild(document.createElement("col")).style.width =
            pixelsPerColumn[tmp] + "px";
      return element;
    },
    appendTR: function(element, attributes, agrData) {
      var tmp;
      element = element
        ? element.appendChild(document.createElement("tr"))
        : document.createElement("tr");
      if (attributes)
        if ("string" === typeof attributes) element.className = attributes;
        else for (tmp in attributes) attributes.hasOwnProperty(tmp) && element.setAttribute(tmp, attributes[tmp]);
      agrData &&
        element.setAttribute(
          "ago-data",
          "string" === typeof agrData ? agrData : JSON.stringify(agrData)
        );
      return element;
    },
    appendTD: function(element, attributes, textContent, textType, date) {
      var tmp;
      element = element
        ? element.appendChild(document.createElement("td"))
        : document.createElement("td");
      if (attributes)
        if ("string" === typeof attributes) element.className = attributes;
        else for (tmp in attributes) attributes.hasOwnProperty(tmp) && element.setAttribute(tmp, attributes[tmp]);
      if ((textContent = HTML.setText(textContent, textType, date))) element.textContent = textContent;
      return element;
    },
    appendLI: function(element, attributes, textContent, textType, date) {
      var tmp;
      element = element
        ? element.appendChild(document.createElement("li"))
        : document.createElement("li");
      if (attributes)
        if ("string" === typeof attributes) element.className = attributes;
        else for (tmp in attributes) attributes.hasOwnProperty(tmp) && element.setAttribute(tmp, attributes[tmp]);
      if ((textContent = HTML.setText(textContent, textType, date))) element.textContent = textContent;
      return element;
    },
    appendSPAN: function(element, attributes, textContent, textType, date) {
      var tmp;
      element = element
        ? element.appendChild(document.createElement("span"))
        : document.createElement("span");
      if (attributes)
        if ("string" === typeof attributes) element.className = attributes;
        else for (tmp in attributes) attributes.hasOwnProperty(tmp) && element.setAttribute(tmp, attributes[tmp]);
      if ((textContent = HTML.setText(textContent, textType, date))) element.textContent = textContent;
      return element;
    },
    appendTEXT: function(element, textContent, textType, date) {
      (textContent = HTML.setText(textContent, textType, date)) && element.appendChild(document.createTextNode(textContent));
    },
    appendIMG: function(element, attribute, styles) {
      var tmp;
      element = element
        ? element.appendChild(document.createElement("img"))
        : document.createElement("img");
      if (attribute)
        if ("string" === typeof attribute) element.src = attribute;
        else for (tmp in attribute) attribute.hasOwnProperty(tmp) && element.setAttribute(tmp, attribute[tmp]);
      if (styles)
        if ("string" === typeof attribute) element.style.width = element.style.height = styles;
        else for (tmp in styles) styles.hasOwnProperty(tmp) && (element.style[tmp] = styles[tmp]);
      return element;
    },
    appendA: function(element, attributes, eventListeners, agrData, disabled) {
      var tmp;
      element = element
        ? element.appendChild(document.createElement("a"))
        : document.createElement("a");
      if (attributes)
        if ("string" === typeof attributes)
          (element.className = attributes), (element.href = "javascript:void(0)");
        else
          for (tmp in (attributes.href || (attributes.href = "javascript:void(0)"), attributes))
            attributes.hasOwnProperty(tmp) && element.setAttribute(tmp, attributes[tmp]);
      else element.href = "javascript:void(0)";
      agrData &&
        element.setAttribute(
          "ago-data",
          "string" === typeof agrData ? agrData : JSON.stringify(agrData)
        );
      if (eventListeners)
        for (tmp in eventListeners) eventListeners.hasOwnProperty(tmp) && element.addEventListener(tmp, eventListeners[tmp], false);
      disabled && element.setAttribute("disabled", "disabled");
      return element;
    },
    appendSELECT: function(element, attributes, options, selectedValue, eventListeners) {
      var tmp;
      element = element
        ? element.appendChild(document.createElement("select"))
        : document.createElement("select");
      if (attributes)
        if ("string" === typeof attributes) element.className = attributes;
        else for (tmp in attributes) attributes.hasOwnProperty(tmp) && element.setAttribute(tmp, attributes[tmp]);
      if (eventListeners)
        for (tmp in eventListeners) eventListeners.hasOwnProperty(tmp) && element.addEventListener(tmp, eventListeners[tmp], false);
      for (tmp in options)
        options.hasOwnProperty(tmp) &&
          ((attributes = element.appendChild(document.createElement("option"))),
          (attributes.value = tmp),
          (attributes.textContent = AGO.Label.get(options[tmp]).replace(/&lt;/g, "<")),
          selectedValue === tmp && (element.selectedIndex = element.options.length - 1));
      return element;
    },
    set: function(selector, selectorType, attributes, styles, eventListeners, otherProperty) {
      var g;
      if ((selector = DOM.query(selector, selectorType))) {
        if (attributes) for (g in attributes) attributes.hasOwnProperty(g) && selector.setAttribute(g, attributes[g]);
        if (styles) for (g in styles) styles.hasOwnProperty(g) && (selector.style[g] = styles[g]);
        if (eventListeners)
          for (g in eventListeners) eventListeners.hasOwnProperty(g) && selector.addEventListener(g, eventListeners[g], false);
        if (otherProperty) for (g in otherProperty) otherProperty.hasOwnProperty(g) && (selector[g] = otherProperty[g]);
      }
    },
    setAll: function(selector, selectorType, attributes, styles, eventListeners, otherProperty) {
      selectorType = DOM.queryAll(selector, selectorType);
      for (selector = 0; selector < selectorType.length; selector++) DOM.set(selectorType[selector], null, attributes, styles, eventListeners, otherProperty);
    },
    getText: function(selector, selectorType, textType) {
      selector = DOM.query(selector, selectorType);
      return HTML.getText(selector ? selector.textContent : "", textType);
    },
    getTextChild: function(selector, selectorType, textType) {
      var d;
      if ((selectorType = DOM.query(selector, selectorType)) && selectorType.childNodes)
        for (
          selector = 0;
          selector < selectorType.childNodes.length &&
          (3 !== +selectorType.childNodes[selector].nodeType ||
            !(d = (selectorType.childNodes[selector].nodeValue || "").trim()));
          selector++
        );
      return HTML.getText(d, textType);
    },
    setText: function(selector, selectorType, textContent, textType, date) {
      if ((selector = DOM.query(selector, selectorType)))
        9 === textType
          ? (selector.innerHTML = textContent || "")
          : (selector.textContent = HTML.setText(textContent, textType, date));
    },
    updateText: function(selector, selectorType, textContent, textType, date) {
      if ((selector = DOM.query(selector, selectorType)))
        if (((textContent = HTML.setText(textContent, textType, date)), textContent !== selector.textContent))
          return (selector.textContent = textContent), selector;
      return null;
    },
    updateTextChild: function(selector, selectorType, textContent, textType, date) {
      if ((selector = DOM.query(selector, selectorType)))
        if (((textContent = HTML.setText(textContent, textType, date)), 3 === +selector.firstChild.nodeType)) {
          if (textContent !== selector.firstChild.textContent)
            return (selector.firstChild.textContent = textContent), selector;
        } else return DOM.prependChild(selector, document.createTextNode(textContent)), selector;
      return null;
    },
    getAttribute: function(selector, selectorType, attribute, textType) {
      selector = DOM.query(selector, selectorType);
      return HTML.getText(selector ? selector.getAttribute(attribute) : "", textType);
    },
    setAttribute: function(selector, selectorType, attribute, value, valueType) {
      (selector = DOM.query(selector, selectorType)) && selector.setAttribute(attribute, HTML.setValue(value, valueType));
    },
    removeAttribute: function(selector, selectorType, attribute) {
      (selector = DOM.query(selector, selectorType)) && selector.removeAttribute(attribute);
    },
    updateAttribute: function(selector, selectorType, attribute, attributeValue, valueType) {
      if ((selector = DOM.query(selector, selectorType)))
        if (((attributeValue = HTML.setValue(attributeValue, valueType)), selector.getAttribute(attribute) !== attributeValue))
          return selector.setAttribute(attribute, attributeValue), selector;
      return null;
    },
    setData: function(selector, selectorType, agrData) {
      (selector = DOM.query(selector, selectorType)) &&
        agrData &&
        selector.setAttribute(
          "ago-data",
          "string" === typeof agrData ? agrData : JSON.stringify(agrData)
        );
    },
    getData: function(selector, selectorType, parentIndex) {
      return DOM.getAttributeParent(selector, selectorType, "ago-data", -2, parentIndex);
    },
    getAttributeParent: function(selector, selectorType, attributeName, textType, parentIndex) {
      if ((selector = DOM.query(selector, selectorType)))
        for (parentIndex = parentIndex || 0; selector && 0 <= parentIndex; ) {
          if (selector.hasAttribute(attributeName)) return DOM.getAttribute(selector, null, attributeName, textType);
          parentIndex--;
          selector = selector.parentNode;
        }
      return HTML.getText("", textType);
    },
    getProperty: function(selector, selectorType, property, propertyType) {
      selector = DOM.query(selector, selectorType);
      return HTML.getText(selector ? selector[property] : "", propertyType);
    },
    setProperty: function(selector, selectorType, property, value, valueType) {
      (selector = DOM.query(selector, selectorType)) && (selector[property] = HTML.setValue(value, valueType));
    },
    updateProperty: function(selector, selectorType, property, value, valueType) {
      if ((selector = DOM.query(selector, selectorType)))
        if (((value = HTML.setValue(value, valueType)), selector[property] !== value)) return (selector[property] = value), selector;
    },
    updatePropertyAll: function(selector, selectorType, property, value, valuetype) {
      selectorType = DOM.queryAll(selector, selectorType);
      for (selector = 0; selector < selectorType.length; selector++) DOM.updateProperty(selectorType[selector], null, property, value, valuetype);
    },
    getValue: function(selector, selectorType, valueType) {
      selector = DOM.query(selector, selectorType);
      return HTML.getText(selector ? selector.value : "", valueType);
    },
    setValue: function(selector, selectorType, value, valueType, eventName) {
      if ((selector = DOM.query(selector, selectorType)))
        (selector.value = HTML.setValue(value, valueType)), eventName && DOM.trigger(selector, null, eventName);
    },
    updateValue: function(selector, selectorType, value, valueType, eventName) {
      if ((selector = DOM.query(selector, selectorType)))
        if (((value = HTML.setValue(value, valueType)), value !== selector.value))
          return (selector.value = value), eventName && DOM.trigger(selector, null, eventName), selector;
      return null;
    },
    hasClass: function(selector, selectorType, className) {
      return (selector = DOM.query(selector, selectorType)) ? HTML.hasClass(selector.className, className) : false;
    },
    updateClass: function(selector, selectorType, className) {
      return (selector = DOM.query(selector, selectorType)) && selector.className !== (className || "")
        ? ((selector.className = className || ""), selector)
        : null;
    },
    addClass: function(selector, selectorType, className) {
      (selectorType = DOM.query(selector, selectorType)) &&
        className &&
        ((selector = (" " + (selectorType.className || "").toLowerCase() + " ").indexOf(
          " " + className.toLowerCase().trim() + " "
        )),
        -1 === selector && (selectorType.className = (selectorType.className ? selectorType.className + " " : "") + className));
    },
    extendClass: function(selector, selectorType, className) {
      (selector = DOM.query(selector, selectorType)) &&
        className &&
        (selector.className = ((selector.className || "") + " " + className).trim());
    },
    removeClass: function(selector, selectorType, className) {
      var d;
      (selectorType = DOM.query(selector, selectorType)) &&
        className &&
        ((d = (" " + (selectorType.className || "").toLowerCase() + " ").indexOf(
          " " + className.toLowerCase().trim() + " "
        )),
        -1 < d &&
          ((selector = 0 < d ? selectorType.className.slice(0, d).trim() : ""),
          (className = selectorType.className.slice(d + className.length).trim()),
          (selectorType.className = selector + (selector && className ? " " : "") + className)));
    },
    removeClassGroup: function(selector, selectorType, className) {
      (selector = DOM.query(selector, selectorType)) &&
        className &&
        ((className = (selector.className || "")
          .replace(new RegExp("(^|\\s)" + className + "(\\w|_)*", "g"), " ")
          .trim()),
        className !== selector.className && (selector.className = className));
    },
    setClassGroup: function(selector, selectorType, searchClassName, replaceClassName) {
      (selector = DOM.query(selector, selectorType)) &&
        searchClassName &&
        ((searchClassName =
          (selector.className || "")
            .replace(new RegExp("(^|\\s)" + searchClassName + "(\\w|_)*", "g"), " ")
            .trim() + (replaceClassName ? " " + replaceClassName : "")),
        searchClassName !== selector.className && (selector.className = searchClassName));
    },
    setStyleColor: function(selector, selectorType, colorValue) {
      if ((selector = DOM.query(selector, selectorType))) selector.style.color = colorValue || "";
    },
    setStyleDisplay: function(selector, selectorType, displayValue) {
      if ((selector = DOM.query(selector, selectorType))) selector.style.display = displayValue || "none";
    },
    updateStyle: function(selector, selectorType, styleKey, styleValue) {
      return (selector = DOM.query(selector, selectorType)) && selector.style[styleKey] !== (styleValue || "")
        ? ((selector.style[styleKey] = styleValue || ""), selector)
        : null;
    },
    addObserver: function(nodeElement, config, mutationCallback) {
      var observer;
      nodeElement &&
        mutationCallback &&
        (observer = new window.MutationObserver(mutationCallback)) &&
        observer.observe(
          nodeElement,
          config || {
            childList: true
          }
        );
      return observer;
    },
    removeObserver: function(observer) {
      try {
        observer && observer.disconnect && observer.disconnect();
      } catch (b) {}
    },
    click: function(selector, selectorType) {
      DOM.trigger(selector, selectorType, "click");
    },
    trigger: function(selector, selectorType, eventName) {
      (selectorType = DOM.query(selector, selectorType)) &&
        eventName &&
        ("click" === eventName ||
        "mouseup" === eventName ||
        "mousedown" === eventName ||
        "mouseover" === eventName ||
        "mouseout" === eventName
          ? ((selector = document.createEvent("MouseEvents")),
            selector.initMouseEvent(eventName, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null),
            selectorType.dispatchEvent(selector))
          : "change" === eventName || "focus" === eventName || "blur" === eventName
            ? ((selector = document.createEvent("HTMLEvents")),
              selector.initEvent(eventName, true, false),
              selectorType.dispatchEvent(selector))
            : "keyup" === eventName &&
              ((selector = document.createEvent("KeyboardEvent")),
              "initKeyboardEvent" in selector
                ? selector.initKeyboardEvent("keyup", true, true, window, false, false, false, false, 0, 0)
                : selector.initKeyEvent("keyup", true, true, window, false, false, false, false, 0, 0),
              selectorType.dispatchEvent(selector)));
    },
    addEvents: function(selector, selectorType, eventListeners) {
      var event;
      if ((selector = DOM.query(selector, selectorType)))
        for (event in eventListeners) eventListeners.hasOwnProperty(event) && selector.addEventListener(event, eventListeners[event], false);
    },
    addEventsAll: function(selector, selectorType, eventListeners) {
      var event;
      selectorType = DOM.queryAll(selector, selectorType);
      for (selector = 0; selector < selectorType.length; selector++)
        for (event in eventListeners) eventListeners.hasOwnProperty(event) && selectorType[selector].addEventListener(event, eventListeners[event], false);
    },
    setFocus: function(selector, selectorType) {
      var c = DOM.query(selector, selectorType);
      c && c.focus();
    },
    disableAutocomplete: function() {
      AGO.Option.is("disable_auto_complete") &&
        window.setTimeout(function() {
          DOM.setAll("form", null, {
            autocomplete: "off"
          });
        }, 0);
    },
    disableActiveElement: function(enableTimeout) {
      if (AGO.Init.mobile && document.activeElement)
        if (
          "TEXTAREA" === document.activeElement.tagName ||
          ("INPUT" === document.activeElement.tagName &&
            "text" === document.activeElement.type)
        )
          if (VAL.check(AGO.App.page, "fleet1", "fleet2"))
            DOM.setFocus("continue", "id");
          else if ("fleet3" === AGO.App.page) DOM.setFocus("start", "id");
          else
            try {
              document.activeElement.blur();
            } catch (b) {}
        else enableTimeout || window.setTimeout(DOM.disableActiveElement, 30, true);
    },
    changeInput: function(event, target) {
      var tmpValue, value;
      return event && target && (!AGO.isFirefox || AGO.Option.is("disable_auto_complete"))
        ? ((tmpValue =
            event.shiftKey && event.ctrlKey
              ? 1000
              : event.ctrlKey
                ? 100
                : event.shiftKey
                  ? 10
                  : 1),
          (value = DOM.getValue(target, null, 2)),
          (value = 38 === event.keyCode ? value + tmpValue : value - tmpValue),
          DOM.setValue(target, null, Math.max(value, 0)),
          DOM.trigger(target, null, "keyup"),
          false)
        : true;
    }
  },
  HTML = {
    getText: function(text, textType) {
      if (1 === textType) return Boolean(text);
      if (2 === textType) return NMR.parseIntFormat(text);
      if (3 === textType) return NMR.parseIntAbs(text);
      if (7 === textType) return (text || "").trim();
      if (-2 === textType)
        try {
          return JSON.parse(text || "{}");
        } catch (c) {
          return {};
        }
      else return text || "";
    },
    setText: function(text, type, date) {
      if(type) {
          if (2 === type) {
              text = STR.formatNumber(text);
          } else if (4 === type) {
              text = STR.formatNumber(text, true)
          } else if (5 === type) {
              text = STR.shortNumber(text)
          } else if (3 === type) {
              if (text) {
                  text = STR.formatNumber(text)
              } else {
                  text = "0";
              }
          } else if (7 === type) {
              text = STR.trim(text)
          } else if (8 === type) {
              text = STR.zero(text)
          } else if (10 === type) {
              text = AGO.Label.get(text)
          } else if (11 === type) {
              text = AGO.Label.get(text, 1)
          } else if (12 === type) {
              text = AGO.Label.get(text, 2)
          } else if (15 === type) {
              text = AGO.Time.format(text, date)
          } else if (16 === type) {
              text = AGO.Time.format(text, date, true)
          } else if (17 === type) {
              text = AGO.Time.formatTimestamp(text, date)
          } else if (18 === type) {
              text = AGO.Time.formatTime(text)
          } else if (19 === type) {
              text = AGO.Time.formatTime(text, true)
          }
      }
      return text ? text + "" : "";
    },
    setValue: function(value, valueType) {
      valueType &&
        (value =
          1 === valueType
            ? Boolean(value)
            : 7 === valueType
              ? STR.trim(value)
              : 8 === valueType
                ? STR.zero(value)
                : -2 === valueType
                  ? JSON.stringify(value || {})
                  : value);
      return value ? value + "" : "";
    },
    urlImage: function(image) {
      return AGO.App.pathSkin + "ago/images/" + image;
    },
    urlMissionIcon: function(mission) {
      return AGO.App.pathSkin + "ago/images/task/mission-" + (mission || 0) + ".gif";
    },
    urlTypeIcon: function(type, activeState) {
      return (
        AGO.App.pathSkin +
        "ago/images/task/type-" +
        (type || 0) +
        (activeState || "a") +
        ".gif"
      );
    },
    hasClass: function(className, occurenceToFind) {
        return className.indexOf(occurenceToFind) > -1
    },
    classMission: function(missionId) {
      return "ago_color_M" + STR.trimZero(missionId, 2);
    },
    classType: function(classType) {
      return AGO.Styles.classType[classType] || "";
    },
    classStatus: function(status) {
      return 0 < status
        ? "ago_color_lightgreen"
        : 0 > status
          ? "ago_color_palered"
          : "ago_color_orange";
    },
    classStatusData: function(classStatus) {
      return AGO.Styles.classStatusData[(classStatus || 0) + 2] || "";
    },
    colorStatusData: function(colorStatus) {
      return AGO.Styles.colorStatusData[(colorStatus || 0) + 2] || "";
    },
    color: function(rgb, opacity) {
      return !rgb || (4 !== rgb.length && 7 !== rgb.length)
        ? ""
        : 0 < opacity && 100 > opacity
          ? ((rgb =
              7 === rgb.length
                ? parseInt(rgb.substring(1, 3), 16) +
                  "," +
                  parseInt(rgb.substring(3, 5), 16) +
                  "," +
                  parseInt(rgb.substring(5, 7), 16)
                : parseInt(rgb.substring(1, 2), 16) +
                  "," +
                  parseInt(rgb.substring(2, 3), 16) +
                  "," +
                  parseInt(rgb.substring(3, 4), 16)),
            "rgba(" + rgb + (10 > opacity ? ",0.0" : ",0.") + opacity + ")")
          : rgb;
    },
    getPlayer: function(playerName, playerStatus, playerHonor) {
      return (
        (playerHonor
          ? '<span class="honorRank ' +
            AGO.Ogame.getHonorClass(playerHonor) +
            '">&nbsp;</span>'
          : "") +
        '<span class="' +
        AGO.Token.getClass(playerStatus) +
        '">' +
        (playerName || "") +
        "</span>"
      );
    }
  },
  OBJ = {
    parse: function(json) {
      if (json && "object" === typeof json) return json;
      try {
        return JSON.parse(json || "{}");
      } catch (b) {
        return {};
      }
    },
    split: function(str, delimiter) {
      var c = {},
        d,
        e,
        f;
      d = STR.check(str).split(delimiter || ";");
      for (f = 0; f < d.length; f++)
        (e = (d[f] || "").split("=")), e[0] && (c[e[0]] = e[1] || "");
      return c;
    },
    create: function(obj) {
      var b = {},
        c;
      if (obj && "object" === typeof obj)
        for (c in obj) "object" !== typeof obj[c] && (b[c] = obj[c]);
      return b;
    },
    createKey: function(key, value) {
      var c = {};
      key && (c[key] = value);
      return c;
    },
    copy: function(toCopy, receiveCopy) {
      var key;
      if (toCopy && "object" === typeof toCopy && receiveCopy && "object" === typeof receiveCopy)
        for (key in toCopy) "object" !== typeof toCopy[key] && (receiveCopy[key] = toCopy[key]);
    },
    is: function(maybeObject) {
      return maybeObject && "object" === typeof maybeObject;
    },
    hasProperties: function(obj) {
      return obj && "object" === typeof obj && Object.keys(obj).length;
    },
    get: function(obj, key) {
      return obj && "object" === typeof obj && key in obj ? obj[key] : "";
    },
    set: function(obj, key, value) {
      obj && "object" === typeof obj && (obj[key] = value);
    },
    iterate: function(obj, callback) {
      if (obj && "object" === typeof obj)
        for (var c in obj) obj.hasOwnProperty(c) && callback(c);
    },
    iterateFilter: function(obj, callback, filterArray) {
      if (obj && "object" === typeof obj)
        for (var d in obj) obj.hasOwnProperty(d) && -1 !== filterArray.indexOf(d) && callback(d);
    },
    iterateArray: function(array, callback) {
      Array.isArray(array) && array.forEach(callback);
    },
      isEmpty: function (object) {
          for(var key in object) {
              if(object.hasOwnProperty(key)){
                  return false;
              }
          }
          return true;
      }
  },
  VAL = {
    choose: function(val) {
      return 0 < val ? arguments[val] : "";
    },
    select: function(val) {
      for (var b = 1; b < arguments.length; b++)
        if (val === arguments[b]) return arguments[b];
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
  NMR = {
    minMax: function(val1, val2, val3) {
      return Math.max(Math.min(+val1 || 0, val3), val2);
    },
    isMinMax: function(val, minVal, maxVal) {
      return +val >= minVal && +val <= maxVal;
    },
    isGreater: function(val, greaterThan) {
      return 0 < +greaterThan && +val >= +greaterThan;
    },
    isLesser: function(val, lessThan) {
      return 0 < +val && +lessThan >= +val;
    },
    parseInt: function(val) {
      return "string" === typeof val
        ? parseInt(val, 10)
        : "number" === typeof val
          ? Math.floor(val)
          : 0;
    },
    parseIntFormat: function(val) {
      return "string" === typeof val
        ? +val.replace(/[^\d\-]/g, "") || 0
        : "number" === typeof val
          ? Math.floor(val)
          : 0;
    },
    parseIntAbs: function(val) {
      return "string" === typeof val
        ? +val.replace(/[^\d]/g, "") || 0
        : "number" === typeof val
          ? Math.floor(Math.abs(val))
          : 0;
    },
    parseVersion: function(possibleVersion) {
      return (possibleVersion = /(\d+)\D*(\d*)\D*(\d*)\D*(\d*)/.exec(possibleVersion ? possibleVersion.toString() : ""))
        ? parseInt(
            ("00" + possibleVersion[1]).slice(-2) +
              ("00" + possibleVersion[2]).slice(-2) +
              ("00" + possibleVersion[3]).slice(-2) +
              ("00" + possibleVersion[4]).slice(-2),
            10
          )
        : 0;
    },
    parseIntShortcut: function(val) {
      val = STR.check(val).toLowerCase();
      return (
        (-1 < val.indexOf("k") ? 1e3 : 1) * parseInt(val.replace(/[^\d]/g, ""), 10)
      );
    }, parseIntRess: function (val) {
          var r;
          val = STR.trim((val.match(/: ([^<]+)*/) ? val.match(/: ([^<]+)*/)[1] : val));
          if (val.match(/^[0-9]{1,3}\.[0-9]{3}$/))
              val = val.replace('.', '');
          else if((r = new RegExp('^([0-9]{1,3}(\.|,))?[0-9]{1,3}(' + AGO.Label.is("KU0B") + ')')) && val.match(r))
              val = val.replace(/,/g,'.').replace(AGO.Label.is("KU0B"),'')*1000000000;
          else if((r = new RegExp('^([0-9]{1,3}(\.|,))?[0-9]{1,3}(' + AGO.Label.is("KU0M") + ')')) && val.match(r))
              val = val.replace(/,/g,'.').replace(AGO.Label.is("KU0M"),'')*1000000;
          return parseInt(val);
      }
  },
  STR = {
    check: function(val) {
      return "string" === typeof val
        ? val
        : "number" === typeof val && val
          ? val + ""
          : "";
    },
    trim: function(val) {
      return "string" === typeof val
        ? val.trim()
        : "number" === typeof val && val
          ? val + ""
          : "";
    },
    zero: function(val) {
      return val
        ? "string" === typeof val
          ? val
          : "number" === typeof val
            ? val + ""
            : "0"
        : "0";
    },
    trimZero: function(val, nb) {
      val = "0000" + val;
      return val.substr(val.length - nb);
    },
    formatNumber: function(val, doFormat) {
      var c = "";
      if (val) {
        doFormat &&
          (1000000000 <= Math.abs(val)
            ? ((val = Math.floor(val / 1e6)), (c = "\u2009" + AGO.Label.is("KU0M")))
            : 1e6 <= Math.abs(val) &&
              ((val = Math.floor(val / 1e3)),
              (c = "\u2009" + AGO.Label.is("KU0K"))));
        for (var d = [], e = Math.abs(+val || 0) + ""; ; ) {
          var f = e.slice(-3);
          if (f) d.unshift(f), (e = e.substr(0, e.length - f.length));
          else break;
        }
        return (0 > val ? "-" : "") + d.join(AGO.Label.is("KU0S")) + c;
      }
      return "";
    },
    shortNumber: function(val, nb) {
      var c, d;
      c = 2 === nb ? 1 : 1 === nb ? 10 : 100;
      if (1e9 <= val)
        (c = Math.ceil(val / 1e7 / c) + ""), (d = AGO.Label.is("KU0B"));
      else if (1e6 <= val)
        (c = Math.ceil(val / 1e4 / c) + ""), (d = AGO.Label.is("KU0M"));
      else if (1e3 <= val)
        (c = Math.ceil(val / 10 / c) + ""), (d = AGO.Label.is("KU0K"));
      else return val ? val + "\u2009 " : "0\u2009 ";
      return nb
        ? c.substr(0, c.length - nb) +
            AGO.Label.is("KU0S") +
            c.substr(c.length - nb) +
            "\u2009" +
            d
        : c + "\u2009" + d;
    },
    getParameter: function(val, href) {
      var c = decodeURIComponent(href || "")
        .replace(/\?/g, "&")
        .split("&" + val + "=")[1];
      return c ? c.split("&")[0].split("#")[0] || "" : "";
    },
    addParameter: function(key, value) {
      value = STR.trim(value);
      return key && value ? "&" + key + "=" + encodeURI(value) : "";
    },
    splitParameter: function(href) {
      var params, param, i;
      if (
        (href = decodeURIComponent(href || "")
          .replace(/\?/g, "&")
          .split("#")[0])
      )
        for (params = {}, href = href.split("&"), i = 0; i < href.length; i++)
          (param = (href[i] || "").split("=")), param[0] && (params[param[0]] = param[1] || "");
      return params;
    }, getMatches: function (string, regex, index) {
          index || (index = 1); // default to the first capturing group
          var matches = [];
          var match;
          while (match = regex.exec(string))
              matches.push(match[index]);
          return matches;
      }
  };
