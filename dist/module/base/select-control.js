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
var rxjs_1 = require("rxjs");
var js_utility_1 = require("js-utility");
var _ = require("lodash");
var $ = require("jquery");
;
var OPTION_DEFAULTS = {
    multiple: false,
    noSelection: { _key: '', _value: '' },
    readonly: false,
    separator: ', '
};
var SelectControl = (function () {
    function SelectControl(_ngZone, _renderer) {
        this._ngZone = _ngZone;
        this._renderer = _renderer;
        this.options = {};
        this._displayValue = '';
        this._itemCount = 0;
        this._options = Object.assign({}, OPTION_DEFAULTS);
        this._subscriptions = {};
    }
    Object.defineProperty(SelectControl.prototype, "items", {
        set: function (items) {
            this._setItems(items);
        },
        enumerable: true,
        configurable: true
    });
    SelectControl.prototype.ngOnChanges = function (changes) {
        _.defaults(this._options, this.options, {
            multiple: this.multiple,
            readonly: this.readonly
        });
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
            this._renderer.setElementProperty(this.sfInput.nativeElement, 'multiple', true);
        else
            this._renderer.setElementProperty(this.sfInput.nativeElement, 'multiple', false);
        if (this._options.readonly)
            this._renderer.setElementProperty(this.sfInput.nativeElement, 'readonly', true);
        else
            this._renderer.setElementProperty(this.sfInput.nativeElement, 'readonly', false);
        this._refresh();
    };
    SelectControl.prototype.ngOnDestroy = function () {
        for (var name_1 in this._subscriptions) {
            if (this._subscriptions[name_1])
                this._subscriptions[name_1].unsubscribe();
            this._subscriptions[name_1] = null;
        }
        this._destroySelectpicker();
    };
    SelectControl.prototype.ngOnInit = function () {
        this._refresh();
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
            this._refresh();
        }
    };
    SelectControl.prototype._createSelectpicker = function (refresh) {
        var _this = this;
        if (refresh === void 0) { refresh = true; }
        if (1)
            console.log(this._selectpicker);
        if (!this._selectpicker) {
            this._selectpicker = $(this.sfInput.nativeElement);
            if (1)
                console.log(this._selectpicker);
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
        return true;
    };
    SelectControl.prototype._destroySelectpicker = function () {
        if (this._selectpicker) {
            this._selectpicker.selectpicker('destroy');
            this._selectpicker = undefined;
        }
    };
    SelectControl.prototype._refresh = function () {
        this._refreshSelectpicker();
        this._refreshDisplayValue();
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
            _this._itemCount = items.length;
            _this._refresh();
        });
    };
    return SelectControl;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], SelectControl.prototype, "multiple", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], SelectControl.prototype, "options", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], SelectControl.prototype, "readonly", void 0);
__decorate([
    core_1.ViewChild('sfInput'),
    __metadata("design:type", core_1.ElementRef)
], SelectControl.prototype, "sfInput", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", rxjs_1.Observable),
    __metadata("design:paramtypes", [rxjs_1.Observable])
], SelectControl.prototype, "items", null);
SelectControl = __decorate([
    core_1.Component({
        selector: 'abstract-select-control'
    }),
    __metadata("design:paramtypes", [core_1.NgZone,
        core_1.Renderer])
], SelectControl);
exports.SelectControl = SelectControl;
//# sourceMappingURL=select-control.js.map