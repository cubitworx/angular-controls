import { Component, ElementRef, forwardRef, Input, NgZone, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { I18nService } from 'angular-i18n';

// local
import { DateControl, DateControlOptions } from '../base/date-control';

const SF_CONTROL_VALUE_ACCESSOR = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => DateComponent),
	multi: true
};

@Component({
	selector: 'angular-control[type=date]',
	host: {
		'class': 'angular-control'
	},
	providers: [SF_CONTROL_VALUE_ACCESSOR],
	templateUrl: './date.component.html'
})
export class DateComponent extends DateControl implements ControlValueAccessor, OnChanges {

	@Input() public format: string;
	@Input() public options: DateControlOptions = {};
	@Input() public readonly: boolean;

	@ViewChild('sfInput') public sfInput: ElementRef;

	constructor(
		i18nService: I18nService,
		ngZone: NgZone
	) {
		super(i18nService, ngZone);
	}

	public ngOnChanges(changes: SimpleChanges): void {
		Object.assign(this._options, this.options, {
			format: this.format,
			readonly: this.readonly
		});

		// Hack until component inheritance is less buggy
		if( !this._sfInput )
			this._sfInput = this.sfInput;

		super.ngOnChanges( changes );

		if( !this._options.readonly )
			this._createDatepicker();
	}

}
