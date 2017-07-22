import { Component, ElementRef, Input, NgZone, OnChanges, OnDestroy, OnInit, Renderer, SimpleChanges, ViewChild } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import * as _ from 'lodash';
import * as $ from 'jquery';

// Local
import { ValuelistInterface } from '../common';

export interface SelectControlOptions {
	multiple?: boolean;
	readonly?: boolean;
	separator?: string;
};

const OPTION_DEFAULTS: SelectControlOptions = {
	multiple: false,
	readonly: false,
	separator: ', '
};

@Component({
	selector: 'abstract-select-control'
})
export class SelectControl implements ControlValueAccessor, OnChanges, OnDestroy, OnInit {

	@Input() public multiple: boolean;
	@Input() public options: SelectControlOptions = {};
	@Input() public readonly: boolean;

	@ViewChild('sfInput') public sfInput: ElementRef;

	public onChange: Function;
	public onTouched: Function;

	protected _debounce: number = 200;
	protected _displayValue: string = '';
	protected _itemCount: number = 0;
	protected _items: Observable<ValuelistInterface[]>;
	protected _options: SelectControlOptions = Object.assign({}, OPTION_DEFAULTS);
	protected _refreshSelectpickerDebounced: (Function & _.Cancelable) = _.debounce(() => this._refreshSelectpicker(), this._debounce);
	protected _selectpicker: any;
	protected _subscriptions: {
		items?: Subscription
	} = {};
	protected _value: string|string[];

	constructor(
		protected _ngZone: NgZone,
		protected _renderer: Renderer
	) { }

	@Input()
	public set items(items: Observable<ValuelistInterface[]>) {
		this._items = items;

		if (this._subscriptions.items)
			this._subscriptions.items.unsubscribe();

		this._subscriptions.items = this._items.subscribe( (subItems: ValuelistInterface[]) => {
			this._itemCount = subItems.length;
			this._refreshSelectpickerDebounced();
			this._refreshDisplayValue();
		});
	}

	public ngOnChanges(changes: SimpleChanges): void {
		for (let change in changes) {
			switch (change) {
				case 'multiple':
				case 'readonly':
					this._options[change] = !!changes[change].currentValue;
					break;
				default:
					this._options[change] = changes[change].currentValue;
					break;
			}
		}

		this._renderer.setElementProperty(this.sfInput.nativeElement, 'multiple', this._options.multiple);
		this._renderer.setElementProperty(this.sfInput.nativeElement, 'readonly', this._options.readonly);

		this._refresh();
	}

	public ngOnDestroy(): void {
		for (let name in this._subscriptions) {
			if (this._subscriptions[name])
				this._subscriptions[name].unsubscribe();
			this._subscriptions[name] = null;
		}

		this._destroySelectpicker();
	}

	public ngOnInit(): void {
		this._refresh();
	}

	public registerOnChange(fn: (value: string|string[]) => void): void {
		this.onChange = () => fn( this._value );
	}

	public registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	public save(): void {
		let value = this._selectpicker.val();
		value = _.isEmpty(value) ? '' : value;
		if (value !== this._value) {
			this._value = value;
			this._refreshDisplayValue();
			if (this.onChange)
				this.onChange();
		}
	}

	// TODO implement disabled state for both value & input whilst in edit mode & not
	public setDisabledState(isDisabled: boolean): void {
		if (isDisabled === true)
			this.save();
		// this._renderer.setElementProperty(this.elementRef.nativeElement, 'disabled', isDisabled);
	}

	public writeValue(value: any): void {
		value = _.isEmpty(value) ? '' : value;
		if (value !== this._value) {
			this._value = value;
			this._refresh();
		}
	}

	protected _createSelectpicker(refresh: boolean = true): boolean {
		if (!this._selectpicker) {
			this._selectpicker = $(this.sfInput.nativeElement);
			this._selectpicker.selectpicker({
				noneSelectedText: ''
			});
			this._selectpicker.selectpicker('val', this._value);
			this._selectpicker.on('hidden.bs.select', () => {
				this._ngZone.run( () => {
					this.save();
					if (this.onTouched)
						this.onTouched();
				});
			});
		} else if (refresh) {
			this._refreshSelectpicker();
		}

		return true;
	}

	protected _destroySelectpicker(): void {
		if (this._selectpicker) {
			this._selectpicker.selectpicker('destroy');
			this._selectpicker = undefined;
		}
	}

	protected _refresh(): void {
		this._refreshSelectpicker();
		this._refreshDisplayValue();
	}

	protected _refreshDisplayValue(): void {
		if (_.isEmpty(this._value)) {
			this._displayValue = '';
			return;
		}

		if (this._options.multiple) {
			let displayValues: string[] = [];
			this._items.forEach((items: ValuelistInterface[]) => {
				for (let item of items) {
					if (this._value.indexOf( item._key ) !== -1)
						displayValues.push( item._value );
				}
			});
			this._displayValue = displayValues.join( this._options.separator );
		} else {
			this._items.forEach((items: ValuelistInterface[]) => {
				for (let item of items) {
					if (this._value === item._key) {
						this._displayValue = item._value;
						return;
					}
				}
			});
		}
	}

	protected _refreshSelectpicker(): void {
		if (this._selectpicker) {
			this._selectpicker.selectpicker('refresh');
			this._selectpicker.selectpicker('val', this._value);
		}
	}

}
