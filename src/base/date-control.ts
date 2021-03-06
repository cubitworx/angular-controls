import { Component, ElementRef, Input, NgZone, OnChanges, OnDestroy, OnInit, Renderer, SimpleChanges, ViewChild } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { I18nService } from '@cubitworx/angular-i18n';
import * as $ from 'jquery';
import * as _ from 'lodash';
import * as moment from 'moment';

export interface DateControlOptions {
	format?: string;
	readonly?: boolean;
};

const OPTION_DEFAULTS: DateControlOptions = {
	format: 'shortDate',
	readonly: false
};

@Component({
	selector: 'abstract-date-control'
})
export class DateControl implements ControlValueAccessor, OnChanges, OnDestroy, OnInit {

	@Input() public format: string;
	@Input() public options: DateControlOptions = {};
	@Input() public readonly: boolean;

	@ViewChild('sfInput') public sfInput: ElementRef;

	public onChange: Function;
	public onTouched: Function;

	protected _datetimepicker: any;
	protected _options: DateControlOptions = Object.assign({}, OPTION_DEFAULTS);
	protected _strValue: string = '';
	protected _value: Date;

	constructor(
		protected _i18nService: I18nService,
		protected _ngZone: NgZone,
		protected _renderer: Renderer
	) { }

	public ngOnChanges(changes: SimpleChanges): void {
		for (let change in changes) {
			switch (change) {
				case 'readonly':
					this._options[change] = !!changes[change].currentValue;
					break;
				default:
					this._options[change] = changes[change].currentValue;
					break;
			}
		}

		this._renderer.setElementProperty(this.sfInput.nativeElement, 'readonly', this._options.readonly);

		this._refresh();
	}

	public ngOnDestroy() {
		this._destroyDatepicker();
	}

	public ngOnInit(): void {
		this._i18nService.changes.subscribe((changes: SimpleChanges) => {
			this._refresh();
		});
		this._refresh();
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
		this._strValue = this._i18nService.toDateString(this._value, this._options.format);
		if (this.onChange)
			this.onChange();
		if (touched && this.onTouched)
			this.onTouched();
	}

	// TODO implement disabled state for both value & input whilst in edit mode & not
	public setDisabledState(isDisabled: boolean): void {
		throw 'TODO Test this';
		// if( isDisabled == true )
		// 	this.save();
		// this.renderer.setElementProperty(this.elementRef.nativeElement, 'disabled', isDisabled);
	}

	public writeValue(value: any): void {
		this._value = this._i18nService.toDate(value, this._options.format);
		this._strValue = this._i18nService.toDateString(this._value, this._options.format);
	}

	protected _createDatepicker(): boolean {
		if (this._options.readonly)
			return false;

		if (!this._datetimepicker) {
			this._datetimepicker = $(this.sfInput.nativeElement);
			this._datetimepicker.datetimepicker({
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

		return true;
	}

	protected _destroyDatepicker(): void {
		if (this._datetimepicker) {
			this._datetimepicker.data('DateTimePicker').destroy();
			this._datetimepicker = undefined;
		}
	}

	protected _refresh(): void {
		if (this._datetimepicker) {
			this._datetimepicker.data('DateTimePicker').options({
				format: this._i18nService.format(this._options.format),
				locale: this._i18nService.locale
			});
		}
	}

}
