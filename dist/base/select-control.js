"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var js_utility_1 = require("js-utility");
var $ = require("jquery");
var _ = require("lodash");
;
var OPTION_DEFAULTS = {
    multiple: false,
    noSelection: { _key: '', _value: '' },
    readonly: false,
    separator: ', '
};
/**
 * Hack implementation until component inheritance is less buggy
 *
**/
var SelectControl = (function () {
    function SelectControl(_ngZone, _renderer) {
        this._ngZone = _ngZone;
        this._renderer = _renderer;
        this._displayValue = '';
        this._itemCount = 0;
        this._options = Object.assign({}, OPTION_DEFAULTS);
        this._subscriptions = {};
    }
    SelectControl.prototype.ngOnChanges = function (changes) {
        for (var change in changes) {
            switch (change) {
                case 'multiple':
                case 'readonly':
                    this._options[change] = changes[change].currentValue;
                    break;
                case 'noSelection':
                    if (changes[change].currentValue === true)
                        this._options.noSelection = OPTION_DEFAULTS.noSelection;
                    break;
            }
        }
        if (this._options.multiple)
            this._renderer.setElementProperty(this._sfInput.nativeElement, 'multiple', true);
        else
            this._renderer.setElementProperty(this._sfInput.nativeElement, 'multiple', false);
    };
    SelectControl.prototype.ngOnDestroy = function () {
        for (var name_1 in this._subscriptions) {
            if (this._subscriptions[name_1])
                this._subscriptions[name_1].unsubscribe();
            this._subscriptions[name_1] = null;
        }
        this._destroySelectpicker();
    };
    SelectControl.prototype.registerOnChange = function (fn) {
        var _this = this;
        this.onChange = function () { return fn(_this._value); };
    };
    SelectControl.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    SelectControl.prototype.save = function () {
        var value = this._selectpicker.val();
        value = js_utility_1.IsBlank(value) ? '' : value;
        if (value !== this._value) {
            this._value = value;
            this._refreshDisplayValue();
            this.onChange && this.onChange();
        }
    };
    // TODO implement disabled state for both value & input whilst in edit mode & not
    SelectControl.prototype.setDisabledState = function (isDisabled) {
        if (isDisabled === true)
            this.save();
        // this._renderer.setElementProperty(this.elementRef.nativeElement, 'disabled', isDisabled);
    };
    SelectControl.prototype.writeValue = function (value) {
        value = js_utility_1.IsBlank(value) ? '' : value;
        if (value !== this._value) {
            this._value = value;
            this._refreshSelectpicker();
            this._refreshDisplayValue();
        }
    };
    SelectControl.prototype._createSelectpicker = function (refresh) {
        var _this = this;
        if (refresh === void 0) { refresh = true; }
        if (!this._selectpicker) {
            this._selectpicker = $(this._sfInput.nativeElement);
            this._selectpicker.selectpicker({
                noneSelectedText: ''
            });
            this._selectpicker.selectpicker('val', this._value);
            this._selectpicker.on('hidden.bs.select', function () {
                _this._ngZone.run(function () {
                    _this.save();
                    _this.onTouched && _this.onTouched();
                });
            });
        }
        else if (refresh) {
            this._refreshSelectpicker();
        }
    };
    SelectControl.prototype._destroySelectpicker = function () {
        if (this._selectpicker) {
            this._selectpicker.selectpicker('destroy');
            this._selectpicker = undefined;
        }
    };
    SelectControl.prototype._refreshSelectpicker = function () {
        var _this = this;
        if (this._selectpicker) {
            _.debounce(function () {
                _this._selectpicker.selectpicker('refresh');
                _this._selectpicker.selectpicker('val', _this._value);
            }, 200)();
        }
    };
    SelectControl.prototype._refreshDisplayValue = function () {
        var _this = this;
        if ((this._value === undefined) || (this._value === null)) {
            this._displayValue = '';
            return;
        }
        _.debounce(function () {
            if (_this._options.multiple) {
                var displayValues_1 = [];
                _this._items.forEach(function (items) {
                    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                        var item = items_1[_i];
                        if (_this._value.indexOf(item._key) !== -1)
                            displayValues_1.push(item._value);
                    }
                });
                _this._displayValue = displayValues_1.join(_this._options.separator);
            }
            else {
                _this._items.forEach(function (items) {
                    for (var _i = 0, items_2 = items; _i < items_2.length; _i++) {
                        var item = items_2[_i];
                        if (_this._value === item._key) {
                            _this._displayValue = item._value;
                            return;
                        }
                    }
                });
            }
        }, 200)();
    };
    SelectControl.prototype._setItems = function (items) {
        var _this = this;
        this._items = items;
        if (this._subscriptions.items)
            this._subscriptions.items.unsubscribe();
        this._subscriptions.items = this._items.subscribe(function (items) {
            if (0)
                console.log(items);
            _this._itemCount = items.length;
            // this._createSelectpicker();
            _this._refreshDisplayValue();
        });
    };
    return SelectControl;
}());
exports.SelectControl = SelectControl;
//# sourceMappingURL=select-control.js.map