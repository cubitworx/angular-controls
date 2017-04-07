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
    useExisting: core_1.forwardRef(function () { return IeSelectComponent; }),
    multi: true
};
var IeSelectComponent = (function (_super) {
    __extends(IeSelectComponent, _super);
    function IeSelectComponent(ngZone, renderer) {
        var _this = 
        // Hack until component inheritance is less buggy
        _super.call(this, ngZone, renderer) || this;
        _this.options = {};
        _this._isEditing = false;
        return _this;
    }
    Object.defineProperty(IeSelectComponent.prototype, "items", {
        set: function (items) {
            this._setItems(items);
        },
        enumerable: true,
        configurable: true
    });
    IeSelectComponent.prototype.cancel = function () {
        this._isEditing = false;
        this._destroySelectpicker();
    };
    IeSelectComponent.prototype.edit = function () {
        if (this._options.readonly)
            return;
        this._createSelectpicker();
        this._isEditing = true;
        if (!this._selectpicker.hasClass('open'))
            this._selectpicker.selectpicker('toggle');
    };
    IeSelectComponent.prototype.ngOnChanges = function (changes) {
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
    };
    IeSelectComponent.prototype.save = function () {
        _super.prototype.save.call(this);
        this._isEditing = false;
        this._destroySelectpicker();
    };
    return IeSelectComponent;
}(select_control_1.SelectControl));
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], IeSelectComponent.prototype, "multiple", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], IeSelectComponent.prototype, "options", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], IeSelectComponent.prototype, "readonly", void 0);
__decorate([
    core_1.ViewChild('sfInput'),
    __metadata("design:type", core_1.ElementRef)
], IeSelectComponent.prototype, "sfInput", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", rxjs_1.Observable),
    __metadata("design:paramtypes", [rxjs_1.Observable])
], IeSelectComponent.prototype, "items", null);
IeSelectComponent = __decorate([
    core_1.Component({
        selector: 'angular-control[type=ie-select]',
        host: {
            'class': 'angular-control'
        },
        providers: [SF_CONTROL_VALUE_ACCESSOR],
        templateUrl: './select.component.html'
    }),
    __metadata("design:paramtypes", [core_1.NgZone,
        core_1.Renderer])
], IeSelectComponent);
exports.IeSelectComponent = IeSelectComponent;
//# sourceMappingURL=select.component.js.map