import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { I18nService }  from '@cubitworx/angular-i18n';
import { Observable } from 'rxjs';

// Local
import { ValuelistInterface } from '../src';

@Component({
	selector: 'app',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	protected _formGroup: FormGroup;
	protected _locale = 'de';
	protected _valuelistItems: Observable<ValuelistInterface[]>;

	constructor(
		protected _formBuilder: FormBuilder,
		protected _i18nService: I18nService
	) {
		this._i18nService.setOptions({ locale: this._locale });

		this._formGroup = this._formBuilder.group({
			date: [new Date()],
			selectMulti: [[ '4' ]],
			selectSingle: ['6'],
			text: ['This text']
		});

		this._formGroup.valueChanges.subscribe((value: any) => {
			this._formGroup.patchValue(value, {emitEvent: false});
		});
	}

	public changeLocale(locale: string) {
		this._locale = locale;
		this._i18nService.setOptions({ locale: this._locale });
		this._formGroup.controls.date.setValue( new Date() );
	}

	public ngOnInit(): void {
		let items = [];
		for (let i = 1; i < 10; i++) {
			items.push({
				_key: i.toString(),
				_value: 'Value ' + i
			});
		}

		this._valuelistItems = Observable.of( items );
	}

}
