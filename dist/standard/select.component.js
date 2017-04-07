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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
// Local
var select_control_1 = require("../base/select-control");
var SF_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return SelectComponent; }),
    multi: true
};
var SelectComponent = (function (_super) {
    __extends(SelectComponent, _super);
    function SelectComponent(ngZone, renderer) {
        var _this = 
        // Hack until component inheritance is less buggy
        _super.call(this, ngZone, renderer) || this;
        _this.options = {};
        return _this;
    }
    Object.defineProperty(SelectComponent.prototype, "items", {
        set: function (items) {
            this._setItems(items);
        },
        enumerable: true,
        configurable: true
    });
    SelectComponent.prototype.ngOnChanges = function (changes) {
        Object.assign(this._options, this.options, {
            multiple: this.multiple,
            readonly: this.readonly
        });
        // Hack until component inheritance is less buggy
        if (!this._sfInput)
            this._sfInput = this.sfInput;
        _super.prototype.ngOnChanges.call(this, changes);
        if (this._options.readonly)
            this._destroySelectpicker();
        else
            this._createSelectpicker();
    };
    SelectComponent.prototype._refreshDisplayValue = function () {
        if (this._options.readonly) {
            this._displayValue = '';
            return;
        }
        _super.prototype._refreshDisplayValue.call(this);
    };
    return SelectComponent;
}(select_control_1.SelectControl));
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], SelectComponent.prototype, "multiple", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], SelectComponent.prototype, "options", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], SelectComponent.prototype, "readonly", void 0);
__decorate([
    core_1.ViewChild('sfInput'),
    __metadata("design:type", core_1.ElementRef)
], SelectComponent.prototype, "sfInput", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", rxjs_1.Observable),
    __metadata("design:paramtypes", [rxjs_1.Observable])
], SelectComponent.prototype, "items", null);
SelectComponent = __decorate([
    core_1.Component({
        selector: 'angular-control[type=select]',
        host: {
            'class': 'angular-control'
        },
        providers: [SF_CONTROL_VALUE_ACCESSOR],
        templateUrl: './select.component.html'
    }),
    __metadata("design:paramtypes", [core_1.NgZone,
        core_1.Renderer])
], SelectComponent);
exports.SelectComponent = SelectComponent;
//# sourceMappingURL=select.component.js.map