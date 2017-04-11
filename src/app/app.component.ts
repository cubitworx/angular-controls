import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

// Local
import { ValuelistInterface } from '../common';

@Component({
	selector: 'app',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	protected _valuelistItems: Observable<ValuelistInterface[]>;
	private _formGroup: FormGroup;

	constructor(
		private _formBuilder: FormBuilder
	) {
		this._formGroup = this._formBuilder.group({
			select: [ '4' ]
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
