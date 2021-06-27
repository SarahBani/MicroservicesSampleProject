"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var Pagination_module_scss_1 = require("./Pagination.module.scss");
;
var Pagination = react_1.memo(function (_a) {
    //const Pagination = memo((props: any) => {
    var pageNo = _a.pageNo, pagesCount = _a.pagesCount, onChange = _a.onChange;
    var prevPages = react_1.useMemo(function () {
        if (pageNo > 1) {
            return (React.createElement(react_1.Fragment, null,
                React.createElement("li", { onClick: function () { return onChange(pageNo - 1); } }, "\u00AB"),
                (pageNo === pagesCount && pageNo > 2) &&
                    React.createElement("li", { onClick: function () { return onChange(pageNo - 2); } }, pageNo - 2),
                React.createElement("li", { onClick: function () { return onChange(pageNo - 1); } }, pageNo - 1)));
        }
    }, [pageNo]);
    var currentPage = react_1.useMemo(function () { return (React.createElement("li", { className: Pagination_module_scss_1.default.ActiveLink }, pageNo)); }, [pageNo]);
    var nextPages = react_1.useMemo(function () {
        if (pageNo < pagesCount) {
            return (React.createElement(react_1.Fragment, null,
                React.createElement("li", { onClick: function () { return onChange(pageNo + 1); } }, pageNo + 1),
                (pageNo === 1 && pageNo + 1 < pagesCount) &&
                    React.createElement("li", { onClick: function () { return onChange(pageNo + 2); } }, pageNo + 2),
                React.createElement("li", { onClick: function () { return onChange(pageNo + 1); } }, "\u00BB")));
        }
    }, [pageNo, pagesCount]);
    return (React.createElement("ul", { className: [Pagination_module_scss_1.default.Pagination, "pagination"].join(' ') },
        prevPages,
        currentPage,
        nextPages));
});
exports.default = Pagination;
//# sourceMappingURL=Pagination.js.map