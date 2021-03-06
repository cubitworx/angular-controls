import { Component, ElementRef, forwardRef, Input, Renderer, ViewChild } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import * as _ from 'lodash';

/*const CONTROL_VALIDATORS = {
	provide: NG_VALIDATORS,
	useExisting: forwardRef(() => IeTextComponent),
	multi: true
};*/

const CONTROL_VALUE_ACCESSOR = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => IeTextComponent),
	multi: true
};

@Component({
	selector: 'angular-control[type=ie-text]',
	host: {
		'class': 'angular-control'
	},
	providers: [
		// CONTROL_VALIDATORS,
		CONTROL_VALUE_ACCESSOR
	],
	styleUrls: [
		'../common.scss',
		'./text.component.scss'
	],
	templateUrl: './text.component.html'
})
export class IeTextComponent implements ControlValueAccessor {

	@Input() public options: any = {};

	@ViewChild('sfInput') public sfInput: ElementRef;

	public onChange: Function;
	public onTouched: Function;

	private _isEditing: boolean = false;
	private _value: any = '';

	constructor(
		private renderer: Renderer
	) { }

	get value(): any {
		return this._value;
	};

	set value(value: any) {
		if (this.onChange && (value !== this._value))
			this.onChange( this._value = value );
	}

	public edit(editing: boolean = true): void {
		if (this._isEditing = editing) {
			// Automatically focus input
			setTimeout(() => this.renderer.invokeElementMethod( this.sfInput.nativeElement, 'focus', [] ) );
		}
	}

	public onBlur() {
		this._isEditing = false;
		this.onTouched();
	}

	public registerOnChange(fn: (value: any) => void): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	// TODO implement disabled state for both value & input whilst in edit mode & not
	public setDisabledState(isDisabled: boolean): void {
		if (isDisabled === true)
			this._isEditing = false;
		// this.renderer.setElementProperty(this.elementRef.nativeElement, 'disabled', isDisabled);
	}

	public writeValue(value: any): void {
		this._value = _.isEmpty(value) ? '' : value;
	}

	private cancel(): void {
		this._isEditing = false;
	}

}
