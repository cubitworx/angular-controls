"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
// Local
var select_control_1 = require("../base/select-control");
/*const CONTROL_VALIDATORS = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => IeSelectComponent),
    multi: true
};*/
var CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return IeSelectComponent; }),
    multi: true
};
var IeSelectComponent = (function (_super) {
    __extends(IeSelectComponent, _super);
    function IeSelectComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._isEditing = false;
        return _this;
    }
    IeSelectComponent.prototype.cancel = function () {
        this._isEditing = false;
        this._destroySelectpicker();
    };
    IeSelectComponent.prototype.edit = function () {
        var _this = this;
        if (this._createSelectpicker()) {
            this._isEditing = true;
            setTimeout(function () {
                // Automatically focus input
                if (!_this._selectpicker.hasClass('open'))
                    _this._selectpicker.selectpicker('toggle');
            });
        }
    };
    IeSelectComponent.prototype.save = function () {
        _super.prototype.save.call(this);
        this._isEditing = false;
        this._destroySelectpicker();
    };
    return IeSelectComponent;
}(select_control_1.SelectControl));
IeSelectComponent = __decorate([
    core_1.Component({
        selector: 'angular-control[type=ie-select]',
        host: {
            'class': 'angular-control'
        },
        providers: [
            // CONTROL_VALIDATORS,
            CONTROL_VALUE_ACCESSOR
        ],
        styleUrls: ['./select.component.scss'],
        templateUrl: './select.component.html'
    })
], IeSelectComponent);
exports.IeSelectComponent = IeSelectComponent;
//# sourceMappingURL=select.component.js.map