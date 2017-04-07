import { Component, ElementRef, forwardRef, Input, NgZone, OnChanges, Renderer, SimpleChanges, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';

// Local
import { ValuelistInterface } from '../common';

// Local
import { SelectControl, SelectControlOptions } from '../base/select-control';

const SF_CONTROL_VALUE_ACCESSOR = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => SelectComponent),
	multi: true
};

@Component({
	selector: 'angular-control[type=select]',
	host: {
		'class': 'angular-control'
	},
	providers: [SF_CONTROL_VALUE_ACCESSOR],
	templateUrl: './select.component.html'
})
export class SelectComponent extends SelectControl implements ControlValueAccessor, OnChanges {

	@Input() public multiple: boolean;
	@Input() public options: SelectControlOptions = {};
	@Input() public readonly: boolean;

	@ViewChild('sfInput') public sfInput: ElementRef;

	constructor(
		ngZone: NgZone,
		renderer: Renderer
	) {
		// Hack until component inheritance is less buggy
		super(ngZone, renderer);
	}

	@Input()
	public set items(items: Observable<ValuelistInterface[]>) {
		this._setItems(items);
	}

	public ngOnChanges(changes: SimpleChanges): void {
		Object.assign(this._options, this.options, {
			multiple: this.multiple,
			readonly: this.readonly
		});

		// Hack until component inheritance is less buggy
		if( !this._sfInput )
			this._sfInput = this.sfInput;

		super.ngOnChanges( changes );

		if( this._options.readonly )
			this._destroySelectpicker();
		else
			this._createSelectpicker();
	}

	protected _refreshDisplayValue(): void {
		if( this._options.readonly ) {
			this._displayValue = '';
			return;
		}

		super._refreshDisplayValue();
	}

}
