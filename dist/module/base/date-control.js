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
var angular_i18n_1 = require("angular-i18n");
var $ = require("jquery");
var _ = require("lodash");
var moment = require("moment");
;
var OPTION_DEFAULTS = {
    format: 'shortDate',
    readonly: false
};
var DateControl = (function () {
    function DateControl(_i18nService, _ngZone, _renderer) {
        this._i18nService = _i18nService;
        this._ngZone = _ngZone;
        this._renderer = _renderer;
        this.options = {};
        this._displayValue = '';
        this._options = Object.assign({}, OPTION_DEFAULTS);
    }
    DateControl.prototype.ngOnChanges = function (changes) {
        _.defaults(this._options, this.options, {
            format: this.format,
            readonly: this.readonly
        });
        for (var change in changes) {
            switch (change) {
                case 'readonly':
                    this._options[change] = changes[change].currentValue;
                    break;
            }
        }
        if (this._options.readonly)
            this._renderer.setElementProperty(this.sfInput.nativeElement, 'readonly', true);
        else
            this._renderer.setElementProperty(this.sfInput.nativeElement, 'readonly', false);
        this._refresh();
    };
    DateControl.prototype.ngOnDestroy = function () {
        this._destroyDatepicker();
    };
    DateControl.prototype.ngOnInit = function () {
        this._refresh();
    };
    DateControl.prototype.onBlur = function () {
        this.save();
    };
    DateControl.prototype.registerOnChange = function (fn) {
        var _this = this;
        this.onChange = function () { return fn(_this._value); };
    };
    DateControl.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    DateControl.prototype.save = function (touched) {
        if (touched === void 0) { touched = true; }
        this._value = this._datetimepicker.data('DateTimePicker').date().toDate();
        this._displayValue = this._i18nService.valueToDateString(this._value, this._options.format);
        this.onChange && this.onChange();
        if (touched)
            this.onTouched && this.onTouched();
    };
    // TODO implement disabled state for both value & input whilst in edit mode & not
    DateControl.prototype.setDisabledState = function (isDisabled) {
        throw 'TODO Test this';
        // if( isDisabled == true )
        // 	this.save();
        // this.renderer.setElementProperty(this.elementRef.nativeElement, 'disabled', isDisabled);
    };
    DateControl.prototype.writeValue = function (value) {
        this._value = this._i18nService.valueToDate(value, this._options.format);
        this._displayValue = this._i18nService.valueToDateString(this._value, this._options.format);
    };
    DateControl.prototype._createDatepicker = function () {
        var _this = this;
        if (this._options.readonly)
            return false;
        if (!this._datetimepicker) {
            this._datetimepicker = $(this.sfInput.nativeElement);
            this._datetimepicker.datetimepicker({
                defaultDate: this._value ? moment(this._value) : '',
                format: this._i18nService.format(this._options.format),
                locale: this._i18nService.locale,
                sideBySide: true
            });
            this._datetimepicker.on('dp.update', function () {
                if (1)
                    console.log('dp.update');
                _this._ngZone.run(function () {
                    _this.save();
                });
            });
        }
        return true;
    };
    DateControl.prototype._destroyDatepicker = function () {
        if (this._datetimepicker) {
            this._datetimepicker.data('DateTimePicker').destroy();
            this._datetimepicker = undefined;
        }
    };
    DateControl.prototype._refresh = function () { };
    return DateControl;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DateControl.prototype, "format", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DateControl.prototype, "options", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DateControl.prototype, "readonly", void 0);
__decorate([
    core_1.ViewChild('sfInput'),
    __metadata("design:type", core_1.ElementRef)
], DateControl.prototype, "sfInput", void 0);
DateControl = __decorate([
    core_1.Component({
        selector: 'abstract-date-control'
    }),
    __metadata("design:paramtypes", [angular_i18n_1.I18nService,
        core_1.NgZone,
        core_1.Renderer])
], DateControl);
exports.DateControl = DateControl;
//# sourceMappingURL=date-control.js.map