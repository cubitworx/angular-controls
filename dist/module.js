"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var angular_i18n_1 = require("angular-i18n");
// Local components
var date_component_1 = require("./module/standard/date.component");
var select_component_1 = require("./module/standard/select.component");
// Local inline-edit components
var date_component_2 = require("./module/inline-edit/date.component");
var select_component_2 = require("./module/inline-edit/select.component");
var text_component_1 = require("./module/inline-edit/text.component");
var AngularControlsModule = AngularControlsModule_1 = (function () {
    function AngularControlsModule() {
    }
    AngularControlsModule.forRoot = function () {
        return {
            ngModule: AngularControlsModule_1
        };
    };
    return AngularControlsModule;
}());
AngularControlsModule = AngularControlsModule_1 = __decorate([
    core_1.NgModule({
        declarations: [
            date_component_1.DateComponent,
            date_component_2.IeDateComponent,
            select_component_2.IeSelectComponent,
            text_component_1.IeTextComponent,
            select_component_1.SelectComponent
        ],
        exports: [
            date_component_1.DateComponent,
            date_component_2.IeDateComponent,
            select_component_2.IeSelectComponent,
            text_component_1.IeTextComponent,
            select_component_1.SelectComponent
        ],
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            angular_i18n_1.I18nModule
        ]
    })
], AngularControlsModule);
exports.AngularControlsModule = AngularControlsModule;
var AngularControlsModule_1;
//# sourceMappingURL=module.js.map