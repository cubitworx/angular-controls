import { Component, ElementRef, forwardRef, Input, NgZone, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { I18nService } from 'angular-i18n';

// local
import { DateControl, DateControlOptions } from '../base/date-control';

const CONTROL_VALIDATORS = {
	provide: NG_VALIDATORS,
	useExisting: forwardRef(() => DateComponent),
	multi: true
};

const CONTROL_VALUE_ACCESSOR = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => DateComponent),
	multi: true
};

@Component({
	selector: 'angular-control[type=date]',
	host: {
		'class': 'angular-control'
	},
	providers: [
		CONTROL_VALIDATORS,
		CONTROL_VALUE_ACCESSOR
	],
	templateUrl: './date.component.html'
})
export class DateComponent extends DateControl implements ControlValueAccessor, OnChanges {

	public ngOnChanges(changes: SimpleChanges): void {
		super.ngOnChanges( changes );

		if( !this._options.readonly )
			this._createDatepicker();
	}

}
