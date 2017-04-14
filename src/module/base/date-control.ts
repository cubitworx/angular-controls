import { ElementRef, NgZone, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { I18nService } from 'angular-i18n';
import * as $ from 'jquery';
import * as moment from 'moment';

export interface DateControlOptions {
	format?: string;
	readonly?: boolean;
};

const OPTION_DEFAULTS: DateControlOptions = {
	format: 'shortDate',
	readonly: false
};

export class DateControl implements ControlValueAccessor, OnDestroy, OnChanges {

	public onChange: Function;
	public onTouched: Function;

	protected _datetimepicker: any;
	protected _displayValue: string = '';
	protected _options: DateControlOptions = Object.assign({}, OPTION_DEFAULTS);
	protected _sfInput: ElementRef;
	protected _value: Date;

	constructor(
		protected _i18nService: I18nService,
		protected _ngZone: NgZone
	) { }

	public ngOnChanges(changes: SimpleChanges): void {
		for( let change in changes ) {
			switch(change) {
				case 'readonly':
					this._options[change] = changes[change].currentValue;
					break;
			}
		}
	}

	public ngOnDestroy() {
		this._destroyDatepicker();
	}

	public onBlur() {
		this.save();
	}

	public registerOnChange(fn: (value: Date) => void): void {
		this.onChange = () => fn( this._value );
	}

	public registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	public save(touched: boolean = true): void {
		this._value = this._datetimepicker.data('DateTimePicker').date().toDate();
		this._displayValue = this._i18nService.valueToDateString(this._value, this._options.format);
		this.onChange && this.onChange();
		if( touched )
			this.onTouched && this.onTouched();
	}

	// TODO implement disabled state for both value & input whilst in edit mode & not
	public setDisabledState(isDisabled: boolean): void {
		throw 'TODO Test this';
		// if( isDisabled == true )
		// 	this.save();
		// this.renderer.setElementProperty(this.elementRef.nativeElement, 'disabled', isDisabled);
	}

	public writeValue(value: any): void {
		this._value = this._i18nService.valueToDate(value, this._options.format);
		this._displayValue = this._i18nService.valueToDateString(this._value, this._options.format);
	}

	protected _createDatepicker(): void {
		if( !this._datetimepicker ) {
			this._datetimepicker = $(this._sfInput.nativeElement).datetimepicker({
				defaultDate: this._value ? moment( this._value ) : '',
				format: this._i18nService.format(this._options.format),
				locale: this._i18nService.locale,
				sideBySide: true
			});
			this._datetimepicker.on('dp.update', () => {
				this._ngZone.run( () => {
					this.save();
				});
			});
		}
	}

	protected _destroyDatepicker(): void {
		if( this._datetimepicker ) {
			this._datetimepicker.data('DateTimePicker').destroy();
			this._datetimepicker = undefined;
		}
	}

}
