import { OnChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { SelectControl } from '../base/select-control';
export declare class IeSelectComponent extends SelectControl implements ControlValueAccessor, OnChanges {
    private _isEditing;
    cancel(): void;
    edit(): void;
    save(): void;
}
