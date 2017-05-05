"use strict";
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
var js_utility_1 = require("js-utility");
/*const CONTROL_VALIDATORS = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => IeTextComponent),
    multi: true
};*/
var CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return IeTextComponent; }),
    multi: true
};
var IeTextComponent = (function () {
    function IeTextComponent(renderer) {
        this.renderer = renderer;
        this.options = {};
        this._isEditing = false;
        this._value = '';
    }
    Object.defineProperty(IeTextComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            if (value !== this._value)
                this.onChange && this.onChange(this._value = value);
        },
        enumerable: true,
        configurable: true
    });
    ;
    IeTextComponent.prototype.edit = function (editing) {
        var _this = this;
        if (editing === void 0) { editing = true; }
        if (this._isEditing = editing) {
            // Automatically focus input
            setTimeout(function () { return _this.renderer.invokeElementMethod(_this.sfInput.nativeElement, 'focus', []); });
        }
    };
    IeTextComponent.prototype.onBlur = function () {
        this._isEditing = false;
        this.onTouched();
    };
    IeTextComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    IeTextComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    // TODO implement disabled state for both value & input whilst in edit mode & not
    IeTextComponent.prototype.setDisabledState = function (isDisabled) {
        if (isDisabled === true)
            this._isEditing = false;
        // this.renderer.setElementProperty(this.elementRef.nativeElement, 'disabled', isDisabled);
    };
    IeTextComponent.prototype.writeValue = function (value) {
        this._value = js_utility_1.IsBlank(value) ? '' : value;
    };
    IeTextComponent.prototype.cancel = function () {
        this._isEditing = false;
    };
    return IeTextComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], IeTextComponent.prototype, "options", void 0);
__decorate([
    core_1.ViewChild('sfInput'),
    __metadata("design:type", core_1.ElementRef)
], IeTextComponent.prototype, "sfInput", void 0);
IeTextComponent = __decorate([
    core_1.Component({
        selector: 'angular-control[type=ie-text]',
        host: {
            'class': 'angular-control'
        },
        providers: [
            // CONTROL_VALIDATORS,
            CONTROL_VALUE_ACCESSOR
        ],
        templateUrl: './text.component.html',
        styleUrls: ['./text.component.scss']
    }),
    __metadata("design:paramtypes", [core_1.Renderer])
], IeTextComponent);
exports.IeTextComponent = IeTextComponent;
//# sourceMappingURL=text.component.js.map