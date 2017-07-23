import * as jQuery from 'jquery';
(<any>window).jQuery = (<any>window).$ = jQuery;

import 'bootstrap-select';

import { Component, DebugElement, OnInit } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';

// Local
import { ValuelistInterface } from '../common';
import { SelectComponent } from './select.component';
import { ControlsModule } from '../module';

@Component({
	template: `
		<form [formGroup]="_formGroup">
			<angular-control type="select" multiple="true" formControlName="selectMulti" [items]="_valuelistItems"></angular-control>
			<angular-control type="select" formControlName="selectSingle" [items]="_valuelistItems"></angular-control>
		</form>
	`
})
class TestHostComponent {

	protected _formGroup: FormGroup;
	protected _valuelistItems: Observable<ValuelistInterface[]>;

	constructor(
		protected _formBuilder: FormBuilder
	) {
		this._formGroup = this._formBuilder.group({
			selectMulti: [[ '4' ]],
			selectSingle: ['6'],
		});
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

describe('SelectComponent', () => {

	let
		fixture: ComponentFixture<TestHostComponent>,
		testHost: TestHostComponent,
		debugElementMulti: DebugElement,
		debugElementSingle: DebugElement;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				TestHostComponent
			],
			imports: [
				ControlsModule,
				FormsModule,
				ReactiveFormsModule
			]
		});
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent( TestHostComponent );
		testHost = fixture.componentInstance;
		debugElementMulti = fixture.debugElement.query( By.css('angular-control [multiple]') );
		debugElementSingle = fixture.debugElement.query( By.css('angular-control [not:multiple]') );
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(debugElementMulti.nativeElement instanceof SelectComponent).toBe(true, 'SelectComponent (Multi)');
		expect(debugElementSingle.nativeElement instanceof SelectComponent).toBe(true, 'SelectComponent (Single)');
	});

	it('should load select options', () => {
		console.log( debugElementMulti.queryAll( By.css('option') ) );
		expect(debugElementMulti.queryAll( By.css('option') )).toBeDefined('SelectComponent (Multi)');
		expect(debugElementSingle.queryAll( By.css('option') )).toBeDefined('SelectComponent (Single)');
	});

});
