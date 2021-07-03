"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var classes = require("./DropDown.module.scss");
;
var DropDown = function (props) {
    var _a;
    var initialItem = {
        id: '',
        text: props.placeholder ? '--- Select ' + props.placeholder + ' ---' : '------'
    };
    var _b = react_1.useState(null), selectedItem = _b[0], setSelectedItem = _b[1];
    var _c = react_1.useState(null), label = _c[0], setLabel = _c[1];
    var _d = react_1.useState(null), idAttribute = _d[0], setIdAttribute = _d[1];
    var itemListControl = react_1.useRef();
    var listItems = react_1.useMemo(function () {
        var _a;
        var list = (_a = props.data) === null || _a === void 0 ? void 0 : _a.map(function (item) {
            return React.createElement("li", { className: ['dropdown-item', ((selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.id) === item.id ? classes.SelecedItem : '')].join(' '), key: item.id, id: item.id, onClick: function () { return selectHandler(item); } },
                item.imageUrl && React.createElement("img", { src: item.imageUrl }),
                item.text);
        });
        list === null || list === void 0 ? void 0 : list.unshift(React.createElement("li", { className: ['dropdown-item', (!selectedItem ? classes.SelecedItem : '')].join(' '), key: initialItem.id, id: initialItem.id, onClick: function () { return selectHandler(initialItem); } }, initialItem.text));
        return list;
    }, [props.data, selectedItem]);
    react_1.useEffect(function () {
        var _a, _b;
        if (((_a = props.data) === null || _a === void 0 ? void 0 : _a.length) === 0) {
            setSelectedItem(null);
        }
        else {
            if (props.value != '') {
                var item = (_b = props.data) === null || _b === void 0 ? void 0 : _b.filter(function (q) { return q.id === props.value; })[0];
                setSelectedItem(item);
            }
            else {
                setSelectedItem(null);
            }
        }
    }, [props.data]);
    react_1.useEffect(function () {
        if (props.title) {
            setLabel(React.createElement("label", { htmlFor: props.title },
                props.title,
                ": "));
            setIdAttribute(" id='" + props.title + "' ");
        }
    }, [props.title]);
    var selectHandler = react_1.useCallback(function (item) {
        setSelectedItem(item);
        props.onSelect(item === null || item === void 0 ? void 0 : item.id);
    }, [props.onSelect, setSelectedItem]);
    var filterHandler = react_1.useCallback(function (event) {
        var _a;
        var key = event.key.toLowerCase();
        var filteredData = (_a = props.data) === null || _a === void 0 ? void 0 : _a.filter(function (q) { return q.text.toLowerCase().startsWith(key); });
        if (filteredData.length > 0) {
            var ul = itemListControl.current;
            var li = ul.querySelector("li[id=\"" + filteredData[0].id + "\"]");
            ul.scrollTop = li.offsetTop;
        }
    }, [props.data]);
    return (React.createElement(react_1.Fragment, null,
        label,
        React.createElement("div", { id: props.id, className: ["dropdown", classes.DropDown, props.className].join(' '), onKeyDown: function (event) { return filterHandler(event); }, onBlur: props.onBlur },
            React.createElement("button", { type: "button", className: "btn dropdown-toggle", "data-toggle": "dropdown", disabled: props.disabled },
                React.createElement("div", null, (_a = selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.text) !== null && _a !== void 0 ? _a : initialItem.text)),
            React.createElement("ul", { ref: itemListControl, className: "dropdown-menu" }, listItems))));
};
exports.default = DropDown;
//# sourceMappingURL=DropDown.js.map