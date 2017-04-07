import { Component, ElementRef, forwardRef, Input, NgZone, OnChanges, Renderer, SimpleChanges, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';

// Local
import { ValuelistInterface } from '../common';

// Local
import { SelectControl, SelectControlOptions } from '../base/select-control';

const SF_CONTROL_VALUE_ACCESSOR = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => IeSelectComponent),
	multi: true
};

@Component({
	selector: 'angular-control[type=ie-select]',
	host: {
		'class': 'angular-control'
	},
	providers: [SF_CONTROL_VALUE_ACCESSOR],
	templateUrl: './select.component.html'
})
export class IeSelectComponent extends SelectControl implements ControlValueAccessor, OnChanges {

	@Input() public multiple: boolean;
	@Input() public options: SelectControlOptions = {};
	@Input() public readonly: boolean;

	@ViewChild('sfInput') public sfInput: ElementRef;

	private _isEditing: boolean = false;

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

	public cancel(): void {
		this._isEditing = false;
		this._destroySelectpicker();
	}

	public edit(): void {
		if( this._options.readonly )
			return;

		this._createSelectpicker();
		this._isEditing = true;

		if( !this._selectpicker.hasClass('open') )
			this._selectpicker.selectpicker('toggle');
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
	}

	public save(): void {
		super.save();
		this._isEditing = false;
		this._destroySelectpicker();
	}

}
