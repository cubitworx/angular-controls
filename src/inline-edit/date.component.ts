import { Component, ElementRef, forwardRef, Input, NgZone, OnChanges, Renderer, SimpleChanges, ViewChild } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { I18nService } from 'angular-i18n';

// Local
import { DateControl, DateControlOptions } from '../base/date-control';

const CONTROL_VALIDATORS = {
	provide: NG_VALIDATORS,
	useExisting: forwardRef(() => IeDateComponent),
	multi: true
};

const CONTROL_VALUE_ACCESSOR = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => IeDateComponent),
	multi: true
};

@Component({
	selector: 'angular-control[type=ie-date]',
	host: {
		'class': 'angular-control'
	},
	providers: [
		CONTROL_VALIDATORS,
		CONTROL_VALUE_ACCESSOR
	],
	templateUrl: './date.component.html'
})
export class IeDateComponent extends DateControl implements ControlValueAccessor, OnChanges {

	@Input() public format: string;
	@Input() public options: DateControlOptions = {};
	@Input() public readonly: boolean;

	@ViewChild('sfInput') public sfInput: ElementRef;

	private _isEditing: boolean = false;

	constructor(
		private _renderer: Renderer,
		i18nService: I18nService,
		ngZone: NgZone
	) {
		super(i18nService, ngZone);
	}

	public cancel(): void {
		this._isEditing = false;
		this._destroyDatepicker();
	}

	public edit(): void {
		this._isEditing = true;

		if( !this._options.readonly )
			this._createDatepicker();

		setTimeout(() => {
			// Automatically focus input
			this._renderer.invokeElementMethod( this.sfInput.nativeElement, 'focus', [] );
		});
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
	}

	public save(): void {
		super.save();
		this._isEditing = false;
		this._destroyDatepicker();
	}

}
