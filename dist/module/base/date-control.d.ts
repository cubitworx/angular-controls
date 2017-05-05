import { ElementRef, NgZone, OnChanges, OnDestroy, OnInit, Renderer, SimpleChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { I18nService } from 'angular-i18n';
export interface DateControlOptions {
    format?: string;
    readonly?: boolean;
}
export declare class DateControl implements ControlValueAccessor, OnChanges, OnDestroy, OnInit {
    protected _i18nService: I18nService;
    protected _ngZone: NgZone;
    protected _renderer: Renderer;
    format: string;
    options: DateControlOptions;
    readonly: boolean;
    sfInput: ElementRef;
    onChange: Function;
    onTouched: Function;
    protected _datetimepicker: any;
    protected _displayValue: string;
    protected _options: DateControlOptions;
    protected _value: Date;
    constructor(_i18nService: I18nService, _ngZone: NgZone, _renderer: Renderer);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    ngOnInit(): void;
    onBlur(): void;
    registerOnChange(fn: (value: Date) => void): void;
    registerOnTouched(fn: () => void): void;
    save(touched?: boolean): void;
    setDisabledState(isDisabled: boolean): void;
    writeValue(value: any): void;
    protected _createDatepicker(): boolean;
    protected _destroyDatepicker(): void;
    protected _refresh(): void;
}
