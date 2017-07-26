import { Component, forwardRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Observable } from 'rxjs';

// Local
import { ValuelistInterface } from '../common';

// Local
import { SelectControl, SelectControlOptions } from '../base/select-control';

/*const CONTROL_VALIDATORS = {
	provide: NG_VALIDATORS,
	useExisting: forwardRef(() => IeSelectComponent),
	multi: true
};*/

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
		// CONTROL_VALIDATORS,
		CONTROL_VALUE_ACCESSOR
	],
	styleUrls: [
		'../common.scss',
		'./select.component.scss'
	],
	templateUrl: './select.component.html'
})
export class IeSelectComponent extends SelectControl implements ControlValueAccessor {

	private _isEditing: boolean = false;

	public cancel(): void {
		this._isEditing = false;
		this._destroySelectpicker();
	}

	public edit(): void {
		if (this._createSelectpicker()) {
			this._isEditing = true;
			setTimeout(() => {
				// Automatically focus input
				if (!this._selectpicker.hasClass('open'))
					this._selectpicker.selectpicker('toggle');
			});
		}
	}

	public save(): void {
		super.save();
		this._isEditing = false;
		this._destroySelectpicker();
	}

}
