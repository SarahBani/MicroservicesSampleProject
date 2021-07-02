"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var classes = require("./DropDown.module.scss");
;
var DropDown = function (_a) {
    var _b;
    var data = _a.data, title = _a.title, value = _a.value, placeholder = _a.placeholder, disabled = _a.disabled, onSelect = _a.onSelect;
    var initialItem = {
        id: '',
        text: placeholder ? '--- Select ' + placeholder + ' ---' : '------'
    };
    var _c = react_1.useState(null), selectedItem = _c[0], setSelectedItem = _c[1];
    var _d = react_1.useState(null), label = _d[0], setLabel = _d[1];
    var _e = react_1.useState(null), idAttribute = _e[0], setIdAttribute = _e[1];
    var itemListControl = react_1.useRef();
    var listItems = react_1.useMemo(function () {
        var list = data === null || data === void 0 ? void 0 : data.map(function (item) {
            return React.createElement("li", { className: ['dropdown-item', ((selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.id) === item.id ? classes.SelecedItem : '')].join(' '), key: item.id, id: item.id, onClick: function () { return selectHandler(item); } },
                item.imageUrl && React.createElement("img", { src: item.imageUrl }),
                item.text);
        });
        list === null || list === void 0 ? void 0 : list.unshift(React.createElement("li", { className: ['dropdown-item', (!selectedItem ? classes.SelecedItem : '')].join(' '), key: initialItem.id, id: initialItem.id, onClick: function () { return selectHandler(initialItem); } }, initialItem.text));
        return list;
    }, [data, selectedItem]);
    react_1.useEffect(function () {
        if ((data === null || data === void 0 ? void 0 : data.length) === 0) {
            setSelectedItem(null);
        }
        else {
            if (value != '') {
                var item = data === null || data === void 0 ? void 0 : data.filter(function (q) { return q.id === value; })[0];
                setSelectedItem(item);
            }
            else {
                setSelectedItem(null);
            }
        }
    }, [data]);
    react_1.useEffect(function () {
        if (title) {
            setLabel(React.createElement("label", { htmlFor: title },
                title,
                ": "));
            setIdAttribute(" id='" + title + "' ");
        }
    }, [title]);
    var selectHandler = react_1.useCallback(function (item) {
        setSelectedItem(item);
        onSelect(item === null || item === void 0 ? void 0 : item.id);
    }, [onSelect, setSelectedItem]);
    var filterHandler = react_1.useCallback(function (event) {
        var key = event.key.toLowerCase();
        var filteredData = data === null || data === void 0 ? void 0 : data.filter(function (q) { return q.text.toLowerCase().startsWith(key); });
        if (filteredData.length > 0) {
            var ul = itemListControl.current;
            var li = ul.querySelector("li[id=\"" + filteredData[0].id + "\"]");
            ul.scrollTop = li.offsetTop;
        }
    }, [data]);
    return (React.createElement(react_1.Fragment, null,
        label,
        React.createElement("div", { id: title, className: ["dropdown", classes.DropDown].join(' '), onKeyDown: function (event) { return filterHandler(event); } },
            React.createElement("button", { type: "button", className: "btn dropdown-toggle", "data-toggle": "dropdown", disabled: disabled },
                React.createElement("div", null, (_b = selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.text) !== null && _b !== void 0 ? _b : initialItem.text)),
            React.createElement("ul", { ref: itemListControl, className: "dropdown-menu" }, listItems))));
};
exports.default = DropDown;
//# sourceMappingURL=DropDown.js.map