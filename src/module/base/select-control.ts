import { Component, ElementRef, Input, NgZone, OnChanges, OnDestroy, Renderer, SimpleChanges, ViewChild } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { IsBlank } from 'js-utility';
import * as $ from 'jquery';
import * as _ from 'lodash';

// Local
import { ValuelistInterface } from '../common';

export interface SelectControlOptions {
	multiple?: boolean;
	noSelection?: ValuelistInterface|boolean;
	readonly?: boolean;
	separator?: string;
};

const OPTION_DEFAULTS: SelectControlOptions = {
	multiple: false,
	noSelection: { _key: '', _value: '' },
	readonly: false,
	separator: ', '
};

@Component({
	selector: 'abstract-select-control'
})
export class SelectControl implements ControlValueAccessor, OnChanges, OnDestroy {

	@Input() public multiple: boolean;
	@Input() public options: SelectControlOptions = {};
	@Input() public readonly: boolean;

	@ViewChild('sfInput') public sfInput: ElementRef;

	public onChange: Function;
	public onTouched: Function;

	protected _displayValue: string = '';
	protected _itemCount: number = 0;
	protected _items: Observable<ValuelistInterface[]>;
	protected _options: SelectControlOptions = Object.assign({}, OPTION_DEFAULTS);
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
		this._setItems(items);
	}

	public ngOnChanges(changes: SimpleChanges): void {
		Object.assign(this._options, this.options, {
			multiple: this.multiple,
			readonly: this.readonly
		});

		for( let change in changes ) {
			switch(change) {
				case 'multiple':
				case 'readonly':
					this._options[change] = changes[change].currentValue;
					break;
				case 'noSelection':
					if( changes[change].currentValue === true )
						this._options.noSelection	= OPTION_DEFAULTS.noSelection;
					break;
			}
		}

		if( this._options.multiple )
			this._renderer.setElementProperty(this.sfInput.nativeElement, 'multiple', true);
		else
			this._renderer.setElementProperty(this.sfInput.nativeElement, 'multiple', false);
	}

	public ngOnDestroy(): void {
		for( let name in this._subscriptions ) {
			if( this._subscriptions[name] )
				this._subscriptions[name].unsubscribe();
			this._subscriptions[name] = null;
		}

		this._destroySelectpicker();
	}

	public registerOnChange(fn: (value: string|string[]) => void): void {
		this.onChange = () => fn( this._value );
	}

	public registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	public save(): void {
		let value = this._selectpicker.val();
		value = IsBlank(value) ? '' : value;
		if( value !== this._value ) {
			this._value = value;
			this._refreshDisplayValue();
			this.onChange && this.onChange();
		}
	}

	// TODO implement disabled state for both value & input whilst in edit mode & not
	public setDisabledState(isDisabled: boolean): void {
		if( isDisabled === true )
			this.save();
		// this._renderer.setElementProperty(this.elementRef.nativeElement, 'disabled', isDisabled);
	}

	public writeValue(value: any): void {
		value = IsBlank(value) ? '' : value;
		if( value !== this._value ) {
			this._value = value;
			this._refreshSelectpicker();
			this._refreshDisplayValue();
		}
	}

	protected _createSelectpicker(refresh: boolean = true): void {
		if( !this._selectpicker ) {
			this._selectpicker = $(this.sfInput.nativeElement);
			this._selectpicker.selectpicker({
				noneSelectedText: ''
			});
			this._selectpicker.selectpicker('val', this._value);
			this._selectpicker.on('hidden.bs.select', () => {
				this._ngZone.run( () => {
					this.save();
					this.onTouched && this.onTouched();
				});
			});
		} else if( refresh ) {
			this._refreshSelectpicker();
		}
	}

	protected _destroySelectpicker(): void {
		if( this._selectpicker ) {
			this._selectpicker.selectpicker('destroy');
			this._selectpicker = undefined;
		}
	}

	protected _refreshSelectpicker(): void {
		if( this._selectpicker ) {
			_.debounce(() => {
				this._selectpicker.selectpicker('refresh');
				this._selectpicker.selectpicker('val', this._value);
			}, 200)();
		}
	}

	protected _refreshDisplayValue(): void {
		if( ( this._value === undefined ) || ( this._value === null ) ) {
			this._displayValue = '';
			return;
		}

		_.debounce(() => {
			if( this._options.multiple ) {
				let displayValues: string[] = [];
				this._items.forEach((items: ValuelistInterface[]) => {
					for( let item of items ) {
						if( this._value.indexOf( item._key ) !== -1 )
							displayValues.push( item._value );
					}
				});
				this._displayValue = displayValues.join( this._options.separator );
			} else {
				this._items.forEach((items: ValuelistInterface[]) => {
					for( let item of items ) {
						if( this._value === item._key ) {
							this._displayValue = item._value;
							return;
						}
					}
				});
			}
		},200)();
	}

	protected _setItems(items: Observable<ValuelistInterface[]>): void {
		this._items = items;

		if( this._subscriptions.items )
			this._subscriptions.items.unsubscribe();

		this._subscriptions.items = this._items.subscribe( (items: ValuelistInterface[]) => {
			this._itemCount = items.length;
			this._createSelectpicker();
			this._refreshDisplayValue();
		});
	}

}
