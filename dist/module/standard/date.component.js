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
// local
var date_control_1 = require("../base/date-control");
/*const CONTROL_VALIDATORS = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => DateComponent),
    multi: true
};*/
var CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return DateComponent; }),
    multi: true
};
var DateComponent = (function (_super) {
    __extends(DateComponent, _super);
    function DateComponent(i18nService, ngZone, renderer) {
        return _super.call(this, i18nService, ngZone, renderer) || this;
    }
    DateComponent.prototype._refresh = function () {
        if (this._options.readonly)
            this._destroyDatepicker();
        else
            this._createDatepicker();
    };
    return DateComponent;
}(date_control_1.DateControl));
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DateComponent.prototype, "format", void 0);
DateComponent = __decorate([
    core_1.Component({
        selector: 'angular-control[type=date]',
        host: {
            'class': 'angular-control'
        },
        providers: [
            // CONTROL_VALIDATORS,
            CONTROL_VALUE_ACCESSOR
        ],
        styleUrls: ['./date.component.scss'],
        templateUrl: './date.component.html'
    }),
    __metadata("design:paramtypes", [angular_i18n_1.I18nService,
        core_1.NgZone,
        core_1.Renderer])
], DateComponent);
exports.DateComponent = DateComponent;
//# sourceMappingURL=date.component.js.map