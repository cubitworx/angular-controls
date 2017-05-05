import { ControlValueAccessor } from '@angular/forms';
import { SelectControl } from '../base/select-control';
export declare class SelectComponent extends SelectControl implements ControlValueAccessor {
    protected _refresh(): void;
}
