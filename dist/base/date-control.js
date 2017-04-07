"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var $ = require("jquery");
var moment = require("moment");
;
var OPTION_DEFAULTS = {
    format: 'shortDate',
    readonly: false
};
var DateControl = (function () {
    function DateControl(_i18nService, _ngZone) {
        this._i18nService = _i18nService;
        this._ngZone = _ngZone;
        this._displayValue = '';
        this._options = Object.assign({}, OPTION_DEFAULTS);
    }
    DateControl.prototype.ngOnChanges = function (changes) {
        for (var change in changes) {
            switch (change) {
                case 'readonly':
                    this._options[change] = changes[change].currentValue;
                    break;
            }
        }
    };
    DateControl.prototype.ngOnDestroy = function () {
        this._destroyDatepicker();
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
        if (!this._datetimepicker) {
            this._datetimepicker = $(this._sfInput.nativeElement).datetimepicker({
                defaultDate: this._value ? moment(this._value) : '',
                format: this._i18nService.format(this._options.format),
                locale: this._i18nService.locale,
                sideBySide: true
            });
            this._datetimepicker.on('dp.update', function () {
                _this._ngZone.run(function () {
                    _this.save();
                });
            });
        }
    };
    DateControl.prototype._destroyDatepicker = function () {
        if (this._datetimepicker) {
            this._datetimepicker.data('DateTimePicker').destroy();
            this._datetimepicker = undefined;
        }
    };
    return DateControl;
}());
exports.DateControl = DateControl;
//# sourceMappingURL=date-control.js.map