import { Component, forwardRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Observable } from 'rxjs';

// Local
import { ValuelistInterface } from '../common';

// Local
import { SelectControl, SelectControlOptions } from '../base/select-control';

const CONTROL_VALIDATORS = {
	provide: NG_VALIDATORS,
	useExisting: forwardRef(() => IeSelectComponent),
	multi: true
};

const CONTROL_VALUE_ACCESSOR = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => IeSelectComponent),
	multi: true
};

@Component({
	selector: 'angular-control[type=ie-select]',
	host: {
		'class': 'angular-control'
	},
	providers: [
		CONTROL_VALIDATORS,
		CONTROL_VALUE_ACCESSOR
	],
	templateUrl: './select.component.html'
})
export class IeSelectComponent extends SelectControl implements ControlValueAccessor, OnChanges {

	private _isEditing: boolean = false;

	public cancel(): void {
		this._isEditing = false;
		this._destroySelectpicker();
	}

	public edit(): void {
		if( this._options.readonly )
			return;

		this._createSelectpicker();
		this._isEditing = true;

		if( !this._selectpicker.hasClass('open') )
			this._selectpicker.selectpicker('toggle');
	}

	public ngOnChanges(changes: SimpleChanges): void {
		super.ngOnChanges( changes );

		if( this._options.readonly )
			this._destroySelectpicker();
	}

	public save(): void {
		super.save();
		this._isEditing = false;
		this._destroySelectpicker();
	}

}
