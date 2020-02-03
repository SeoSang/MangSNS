webpackHotUpdate("static\\development\\pages\\signup.js",{

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _defineProperty; });
/* harmony import */ var _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-js/object/define-property */ "./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js");
/* harmony import */ var _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);

function _defineProperty(obj, key, value) {
  if (key in obj) {
    _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default()(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/extends.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/extends.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _extends; });
/* harmony import */ var _core_js_object_assign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-js/object/assign */ "./node_modules/@babel/runtime-corejs2/core-js/object/assign.js");
/* harmony import */ var _core_js_object_assign__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0__);

function _extends() {
  _extends = _core_js_object_assign__WEBPACK_IMPORTED_MODULE_0___default.a || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

/***/ }),

/***/ "./pages/signup.js":
/*!*************************!*\
  !*** ./pages/signup.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_AppLayout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/AppLayout */ "./components/AppLayout.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/head */ "./node_modules/next-server/dist/lib/head.js");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
/* harmony import */ var _signupForm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./signupForm */ "./pages/signupForm.js");
var _jsxFileName = "C:\\Users\\ddrrp\\Desktop\\local\\MangSNS\\ch1\\front\\pages\\signup.js";







var Signup = function Signup() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_head__WEBPACK_IMPORTED_MODULE_3___default.a, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("title", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: this
  }, "MangSNS"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("link", {
    rel: "stylesheet",
    href: "https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: this
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_AppLayout__WEBPACK_IMPORTED_MODULE_1__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: this
  }, "\uD68C\uC6D0\uAC00\uC785")));
};

/* harmony default export */ __webpack_exports__["default"] = (Signup);

/***/ }),

/***/ "./pages/signupForm.js":
/*!*****************************!*\
  !*** ./pages/signupForm.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/extends */ "./node_modules/@babel/runtime-corejs2/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! next/head */ "./node_modules/next-server/dist/lib/head.js");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");








var _jsxFileName = "C:\\Users\\ddrrp\\Desktop\\local\\MangSNS\\ch1\\front\\pages\\signupForm.js";



var Option = antd__WEBPACK_IMPORTED_MODULE_10__["Select"].Option;
var AutoCompleteOption = antd__WEBPACK_IMPORTED_MODULE_10__["AutoComplete"].Option;
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
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_6__["default"])(SignupForm, _Component);

  function SignupForm() {
    var _getPrototypeOf2;

    var _this;

    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, SignupForm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, (_getPrototypeOf2 = Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(SignupForm)).call.apply(_getPrototypeOf2, [this].concat(args)));

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__["default"])(_this), "state", {
      confirmDirty: false,
      autoCompleteResult: []
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__["default"])(_this), "handleSubmit", function (e) {
      e.preventDefault();

      _this.props.form.validateFieldsAndScroll(function (err, values) {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__["default"])(_this), "handleConfirmBlur", function (e) {
      var value = e.target.value;

      _this.setState({
        confirmDirty: _this.state.confirmDirty || !!value
      });
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__["default"])(_this), "compareToFirstPassword", function (rule, value, callback) {
      var form = _this.props.form;

      if (value && value !== form.getFieldValue("password")) {
        callback("Two passwords that you enter is inconsistent!");
      } else {
        callback();
      }
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__["default"])(_this), "validateToNextPassword", function (rule, value, callback) {
      var form = _this.props.form;

      if (value && _this.state.confirmDirty) {
        form.validateFields(["confirm"], {
          force: true
        });
      }

      callback();
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__["default"])(_this), "handleWebsiteChange", function (value) {
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

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(SignupForm, [{
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
        initialValue: "86"
      })(react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_10__["Select"], {
        style: {
          width: 70
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 117
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(Option, {
        value: "86",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 118
        },
        __self: this
      }, "+86"), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(Option, {
        value: "87",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 119
        },
        __self: this
      }, "+87")));
      return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_8___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(next_head__WEBPACK_IMPORTED_MODULE_9___default.a, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 124
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("title", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 125
        },
        __self: this
      }, "MangSNS"), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("link", {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 126
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_10__["Form"], Object(_babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, formItemLayout, {
        onSubmit: this.handleSubmit,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 131
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_10__["Form"].Item, {
        label: "E-mail",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 132
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
      })(react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_10__["Input"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 144
        },
        __self: this
      }))), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_10__["Form"].Item, {
        label: "Password",
        hasFeedback: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 146
        },
        __self: this
      }, getFieldDecorator("password", {
        rules: [{
          required: true,
          message: "Please input your password!"
        }, {
          validator: this.validateToNextPassword
        }]
      })(react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_10__["Input"].Password, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 157
        },
        __self: this
      }))), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_10__["Form"].Item, {
        label: "Confirm Password",
        hasFeedback: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 159
        },
        __self: this
      }, getFieldDecorator("confirm", {
        rules: [{
          required: true,
          message: "Please confirm your password!"
        }, {
          validator: this.compareToFirstPassword
        }]
      })(react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_10__["Input"].Password, {
        onBlur: this.handleConfirmBlur,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 170
        },
        __self: this
      }))), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_10__["Form"].Item, {
        label: react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("span", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 174
          },
          __self: this
        }, "Nickname\xA0", react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_10__["Tooltip"], {
          title: "What do you want others to call you?",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 176
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_10__["Icon"], {
          type: "question-circle-o",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 177
          },
          __self: this
        }))),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 172
        },
        __self: this
      }, getFieldDecorator("nickname", {
        rules: [{
          required: true,
          message: "Please input your nickname!",
          whitespace: true
        }]
      })(react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_10__["Input"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 190
        },
        __self: this
      }))), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_10__["Form"].Item, {
        label: "Habitual Residence",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 192
        },
        __self: this
      }, getFieldDecorator("residence", {
        initialValue: ["zhejiang", "hangzhou", "xihu"],
        rules: [{
          type: "array",
          required: true,
          message: "Please select your habitual residence!"
        }]
      })(react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_10__["Cascader"], {
        options: residences,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 202
        },
        __self: this
      }))), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_10__["Form"].Item, {
        label: "Phone Number",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 204
        },
        __self: this
      }, getFieldDecorator("phone", {
        rules: [{
          required: true,
          message: "Please input your phone number!"
        }]
      })(react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_10__["Input"], {
        addonBefore: prefixSelector,
        style: {
          width: "100%"
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 207
        },
        __self: this
      }))), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_10__["Form"].Item, Object(_babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, tailFormItemLayout, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 209
        },
        __self: this
      }), getFieldDecorator("agreement", {
        valuePropName: "checked"
      })(react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_10__["Checkbox"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 213
        },
        __self: this
      }, "I have read the ", react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("a", {
        href: "",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 214
        },
        __self: this
      }, "agreement")))), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_10__["Form"].Item, Object(_babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, tailFormItemLayout, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 218
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_10__["Button"], {
        type: "primary",
        htmlType: "submit",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 219
        },
        __self: this
      }, "Register"))));
    }
  }]);

  return SignupForm;
}(react__WEBPACK_IMPORTED_MODULE_8__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (SignupForm);

/***/ })

})
//# sourceMappingURL=signup.js.0a0aec3f3a2d916d4bbe.hot-update.js.map