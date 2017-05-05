import { ElementRef, Renderer } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare class IeTextComponent implements ControlValueAccessor {
    private renderer;
    options: any;
    sfInput: ElementRef;
    onChange: Function;
    onTouched: Function;
    private _isEditing;
    private _value;
    constructor(renderer: Renderer);
    value: any;
    edit(editing?: boolean): void;
    onBlur(): void;
    registerOnChange(fn: (value: any) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
    writeValue(value: any): void;
    private cancel();
}
