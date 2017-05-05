import { OnChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { DateControl } from '../base/date-control';
export declare class IeDateComponent extends DateControl implements ControlValueAccessor, OnChanges {
    private _isEditing;
    cancel(): void;
    edit(): void;
    save(): void;
}
