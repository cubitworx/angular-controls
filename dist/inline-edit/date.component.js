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
var angular_i18n_1 = require("angular-i18n");
// Local
var date_control_1 = require("../base/date-control");
var SF_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return IeDateComponent; }),
    multi: true
};
var IeDateComponent = (function (_super) {
    __extends(IeDateComponent, _super);
    function IeDateComponent(_renderer, i18nService, ngZone) {
        var _this = _super.call(this, i18nService, ngZone) || this;
        _this._renderer = _renderer;
        _this.options = {};
        _this._isEditing = false;
        return _this;
    }
    IeDateComponent.prototype.cancel = function () {
        this._isEditing = false;
        this._destroyDatepicker();
    };
    IeDateComponent.prototype.edit = function () {
        var _this = this;
        this._isEditing = true;
        if (!this._options.readonly)
            this._createDatepicker();
        setTimeout(function () {
            // Automatically focus input
            _this._renderer.invokeElementMethod(_this.sfInput.nativeElement, 'focus', []);
        });
    };
    IeDateComponent.prototype.ngOnChanges = function (changes) {
        Object.assign(this._options, this.options, {
            format: this.format,
            readonly: this.readonly
        });
        // Hack until component inheritance is less buggy
        if (!this._sfInput)
            this._sfInput = this.sfInput;
        _super.prototype.ngOnChanges.call(this, changes);
    };
    IeDateComponent.prototype.save = function () {
        _super.prototype.save.call(this);
        this._isEditing = false;
        this._destroyDatepicker();
    };
    return IeDateComponent;
}(date_control_1.DateControl));
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], IeDateComponent.prototype, "format", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], IeDateComponent.prototype, "options", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], IeDateComponent.prototype, "readonly", void 0);
__decorate([
    core_1.ViewChild('sfInput'),
    __metadata("design:type", core_1.ElementRef)
], IeDateComponent.prototype, "sfInput", void 0);
IeDateComponent = __decorate([
    core_1.Component({
        selector: 'angular-control[type=ie-date]',
        host: {
            'class': 'angular-control'
        },
        providers: [SF_CONTROL_VALUE_ACCESSOR],
        templateUrl: './date.component.html'
    }),
    __metadata("design:paramtypes", [core_1.Renderer,
        angular_i18n_1.I18nService,
        core_1.NgZone])
], IeDateComponent);
exports.IeDateComponent = IeDateComponent;
//# sourceMappingURL=date.component.js.map