webpackHotUpdate("static\\development\\pages\\signup.js",{

/***/ "./pages/signupForm.js":
/*!*****************************!*\
  !*** ./pages/signupForm.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/extends */ "./node_modules/@babel/runtime-corejs2/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/taggedTemplateLiteral */ "./node_modules/@babel/runtime-corejs2/helpers/esm/taggedTemplateLiteral.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! next/head */ "./node_modules/next-server/dist/lib/head.js");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");









var _jsxFileName = "C:\\Users\\ddrrp\\Desktop\\local\\MangSNS\\ch1\\front\\pages\\signupForm.js";

function _templateObject2() {
  var data = Object(_babel_runtime_corejs2_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_1__["default"])(["\n      border-radius: 15px;\n      ", "\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = Object(_babel_runtime_corejs2_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_1__["default"])(["\n      background-color: white;\n      border-radius: 10px;\n      padding: 0 100px;\n      box-shadow: 0 4px 6px rgba(50, 50, 92, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}





var Option = antd__WEBPACK_IMPORTED_MODULE_12__["Select"].Option;
var AutoCompleteOption = antd__WEBPACK_IMPORTED_MODULE_12__["AutoComplete"].Option;
var residences = [{
  value: "마포구",
  label: "마포구",
  children: [{
    value: "성산동",
    label: "성산동"
  }, {
    value: "망원동",
    label: "망원동"
  }]
}, {
  value: "기타",
  label: "기타"
}];

var SignupForm =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_7__["default"])(SignupForm, _Component);

  function SignupForm() {
    var _getPrototypeOf2;

    var _this;

    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__["default"])(this, SignupForm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, (_getPrototypeOf2 = Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(SignupForm)).call.apply(_getPrototypeOf2, [this].concat(args)));

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__["default"])(_this), "state", {
      confirmDirty: false,
      autoCompleteResult: []
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__["default"])(_this), "handleSubmit", function (e) {
      e.preventDefault();

      _this.props.form.validateFieldsAndScroll(function (err, values) {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__["default"])(_this), "handleConfirmBlur", function (e) {
      var value = e.target.value;

      _this.setState({
        confirmDirty: _this.state.confirmDirty || !!value
      });
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__["default"])(_this), "compareToFirstPassword", function (rule, value, callback) {
      var form = _this.props.form;

      if (value && value !== form.getFieldValue("password")) {
        callback("Two passwords that you enter is inconsistent!");
      } else {
        callback();
      }
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__["default"])(_this), "validateToNextPassword", function (rule, value, callback) {
      var form = _this.props.form;

      if (value && _this.state.confirmDirty) {
        form.validateFields(["confirm"], {
          force: true
        });
      }

      callback();
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__["default"])(_this), "handleWebsiteChange", function (value) {
      var autoCompleteResult;

      if (!value) {
        autoCompleteResult = [];
      } else {
        autoCompleteResult = [".com", ".org", ".net"].map(function (domain) {
          return "".concat(value).concat(domain);
        });
      }

      _this.setState({
        autoCompleteResult: autoCompleteResult
      });
    });

    return _this;
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__["default"])(SignupForm, [{
    key: "render",
    value: function render() {
      var getFieldDecorator = this.props.form.getFieldDecorator;
      var autoCompleteResult = this.state.autoCompleteResult;
      var formItemLayout = {
        labelCol: {
          xs: {
            span: 24
          },
          sm: {
            span: 8
          }
        },
        wrapperCol: {
          xs: {
            span: 24
          },
          sm: {
            span: 16
          }
        }
      };
      var tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0
          },
          sm: {
            span: 16,
            offset: 8
          }
        }
      };
      var prefixSelector = getFieldDecorator("prefix", {
        initialValue: "82"
      })(react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_12__["Select"], {
        style: {
          width: 70
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 118
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(Option, {
        value: "82",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 119
        },
        __self: this
      }, "+82")));
      var websiteOptions = autoCompleteResult.map(function (website) {
        return react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(AutoCompleteOption, {
          key: website,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 124
          },
          __self: this
        }, website);
      });
      var myStyle = Object(styled_components__WEBPACK_IMPORTED_MODULE_11__["css"])(_templateObject());
      var StyledForm = styled_components__WEBPACK_IMPORTED_MODULE_11__["default"].div(_templateObject2(), myStyle);
      return react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(StyledForm, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 140
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(next_head__WEBPACK_IMPORTED_MODULE_10___default.a, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 141
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("title", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 142
        },
        __self: this
      }, "MangSNS"), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("link", {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 143
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_12__["Form"], Object(_babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, formItemLayout, {
        onSubmit: this.handleSubmit,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 148
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_12__["Form"].Item, {
        label: "E-mail",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 149
        },
        __self: this
      }, getFieldDecorator("email", {
        rules: [{
          type: "email",
          message: "The input is not valid E-mail!"
        }, {
          required: true,
          message: "Please input your E-mail!"
        }]
      })(react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_12__["Input"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 161
        },
        __self: this
      }))), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_12__["Form"].Item, {
        label: "\uBE44\uBC00\uBC88\uD638",
        hasFeedback: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 163
        },
        __self: this
      }, getFieldDecorator("password", {
        rules: [{
          required: true,
          message: "비밀번호를 입력해주세요!"
        }, {
          validator: this.validateToNextPassword
        }]
      })(react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_12__["Input"].Password, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 174
        },
        __self: this
      }))), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_12__["Form"].Item, {
        label: "\uBE44\uBC00\uBC88\uD638 \uD655\uC778",
        hasFeedback: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 176
        },
        __self: this
      }, getFieldDecorator("confirm", {
        rules: [{
          required: true,
          message: "비밀번호를 확인해주세요!"
        }, {
          validator: this.compareToFirstPassword
        }]
      })(react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_12__["Input"].Password, {
        onBlur: this.handleConfirmBlur,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 187
        },
        __self: this
      }))), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_12__["Form"].Item, {
        label: react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("span", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 191
          },
          __self: this
        }, "\uBCC4\uBA85\xA0", react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_12__["Tooltip"], {
          title: "\uBB34\uC5C7\uC73C\uB85C \uBD88\uB9AC\uACE0 \uC2F6\uC73C\uC2E0\uAC00\uC694?",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 193
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_12__["Icon"], {
          type: "question-circle-o",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 194
          },
          __self: this
        }))),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 189
        },
        __self: this
      }, getFieldDecorator("nickname", {
        rules: [{
          required: true,
          message: "별명을 입력해주세요!",
          whitespace: true
        }]
      })(react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_12__["Input"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 207
        },
        __self: this
      }))), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_12__["Form"].Item, {
        label: "\uAC70\uC8FC\uC9C0",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 209
        },
        __self: this
      }, getFieldDecorator("residence", {
        initialValue: ["망원동", "성산동"],
        rules: [{
          type: "array",
          required: true,
          message: "거주지를 입력해주세요!"
        }]
      })(react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_12__["Cascader"], {
        options: residences,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 219
        },
        __self: this
      }))), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_12__["Form"].Item, {
        label: "\uD734\uB300\uC804\uD654",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 221
        },
        __self: this
      }, getFieldDecorator("phone", {
        rules: [{
          required: true,
          message: "핸드폰 번호를 입력해주세요!"
        }]
      })(react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_12__["Input"], {
        addonBefore: prefixSelector,
        style: {
          width: "100%"
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 224
        },
        __self: this
      }))), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_12__["Form"].Item, Object(_babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, tailFormItemLayout, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 226
        },
        __self: this
      }), getFieldDecorator("agreement", {
        valuePropName: "checked"
      })(react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_12__["Checkbox"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 230
        },
        __self: this
      }, "\uC800\uB294 ", react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("a", {
        href: "",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 231
        },
        __self: this
      }, "\uC57D\uAD00"), "\uC744 \uC77D\uC5C8\uACE0 \uB3D9\uC758\uD569\uB2C8\uB2E4."))), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_12__["Form"].Item, Object(_babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, tailFormItemLayout, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 235
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_12__["Button"], {
        type: "primary",
        htmlType: "submit",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 236
        },
        __self: this
      }, "\uAC00\uC785\uD558\uAE30"))));
    }
  }]);

  return SignupForm;
}(react__WEBPACK_IMPORTED_MODULE_9__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(react__WEBPACK_IMPORTED_MODULE_9__["memo"])(SignupForm));

/***/ })

})
//# sourceMappingURL=signup.js.7c5c6ea2ee1c0bc18263.hot-update.js.map