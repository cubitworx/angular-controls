import { NgZone, Renderer } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { I18nService } from 'angular-i18n';
import { DateControl } from '../base/date-control';
export declare class DateComponent extends DateControl implements ControlValueAccessor {
    format: string;
    constructor(i18nService: I18nService, ngZone: NgZone, renderer: Renderer);
    protected _refresh(): void;
}
