import { ElementRef, NgZone, OnChanges, OnDestroy, OnInit, Renderer, SimpleChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ValuelistInterface } from '../common';
export interface SelectControlOptions {
    multiple?: boolean;
    noSelection?: ValuelistInterface | boolean;
    readonly?: boolean;
    separator?: string;
}
export declare class SelectControl implements ControlValueAccessor, OnChanges, OnDestroy, OnInit {
    protected _ngZone: NgZone;
    protected _renderer: Renderer;
    multiple: boolean;
    options: SelectControlOptions;
    readonly: boolean;
    sfInput: ElementRef;
    onChange: Function;
    onTouched: Function;
    protected _displayValue: string;
    protected _itemCount: number;
    protected _items: Observable<ValuelistInterface[]>;
    protected _options: SelectControlOptions;
    protected _selectpicker: any;
    protected _subscriptions: {
        items?: Subscription;
    };
    protected _value: string | string[];
    constructor(_ngZone: NgZone, _renderer: Renderer);
    items: Observable<ValuelistInterface[]>;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    ngOnInit(): void;
    registerOnChange(fn: (value: string | string[]) => void): void;
    registerOnTouched(fn: () => void): void;
    save(): void;
    setDisabledState(isDisabled: boolean): void;
    writeValue(value: any): void;
    protected _createSelectpicker(refresh?: boolean): boolean;
    protected _destroySelectpicker(): void;
    protected _refresh(): void;
    protected _refreshSelectpicker(): void;
    protected _refreshDisplayValue(): void;
    protected _setItems(items: Observable<ValuelistInterface[]>): void;
}
