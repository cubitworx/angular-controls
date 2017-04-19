import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

// Local
import { ValuelistInterface } from '../../module/common';

@Component({
	selector: 'app',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	private _valuelistItems: Observable<ValuelistInterface[]>;
	private _formGroup: FormGroup;
	private _values: any;

	constructor(
		formBuilder: FormBuilder
	) {
		this._values = {
			date: new Date(),
			selectMulti: [ '4' ],
			selectSingle: '6',
			text: 'This text'
		};

		let controls: any = {};
		for( let field in this._values )
			controls[field] = [ this._values[field] ];

		this._formGroup = formBuilder.group( controls );

		this._formGroup.valueChanges.subscribe((value: any) => {
			this._values.date = value.date;
			this._values.selectMulti = value.selectMulti;
			this._values.selectSingle = value.selectSingle;
		});
	}

	public ngOnInit(): void {
		let items = [];
		for( let i = 1; i < 10; i++ ) {
			items.push({
				_key: i.toString(),
				_value: 'Value ' + i
			});
		}

		this._valuelistItems = Observable.of( items );
	}

}
