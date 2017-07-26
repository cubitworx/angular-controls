import { Component, ElementRef, forwardRef, Input, NgZone, Renderer, SimpleChanges, ViewChild } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { I18nService } from '@cubitworx/angular-i18n';

// Local
import { DateControl, DateControlOptions } from '../base/date-control';

/*const CONTROL_VALIDATORS = {
	provide: NG_VALIDATORS,
	useExisting: forwardRef(() => DateComponent),
	multi: true
};*/

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
		// CONTROL_VALIDATORS,
		CONTROL_VALUE_ACCESSOR
	],
	styleUrls: [
		'../common.scss',
		'./date.component.scss'
	],
	templateUrl: './date.component.html'
})
export class DateComponent extends DateControl implements ControlValueAccessor {

	constructor(
		i18nService: I18nService,
		ngZone: NgZone,
		renderer: Renderer
	) {
		super( i18nService, ngZone, renderer );
	}

	protected _refresh(): void {
		if (this._options.readonly)
			this._destroyDatepicker();
		else
			this._createDatepicker();

		super._refresh();
	}

}
