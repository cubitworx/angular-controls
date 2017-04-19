import { Component, ElementRef, forwardRef, Input, NgZone, Renderer, SimpleChanges, ViewChild } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Observable } from 'rxjs';

// Local
import { ValuelistInterface } from '../common';

// Local
import { SelectControl, SelectControlOptions } from '../base/select-control';
/*
const CONTROL_VALIDATORS = {
	provide: NG_VALIDATORS,
	useExisting: forwardRef(() => SelectComponent),
	multi: true
};*/

const CONTROL_VALUE_ACCESSOR = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => SelectComponent),
	multi: true
};

@Component({
	selector: 'angular-control[type=select]',
	host: {
		'class': 'angular-control'
	},
	providers: [
		// CONTROL_VALIDATORS,
		CONTROL_VALUE_ACCESSOR
	],
	templateUrl: './select.component.html'
})
export class SelectComponent extends SelectControl implements ControlValueAccessor {

	protected _refresh(): void {
		if( this._options.readonly )
			this._destroySelectpicker();
		else
			this._createSelectpicker();

		this._refreshDisplayValue();
	}

}
