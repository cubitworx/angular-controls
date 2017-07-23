import * as jQuery from 'jquery';
(<any>window).jQuery = (<any>window).$ = jQuery;

import 'eonasdan-bootstrap-datetimepicker';

import { Component, DebugElement, OnInit } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

// Local
import { DateComponent } from './date.component';
import { ControlsModule } from '../module';

@Component({
	template: `
		<form [formGroup]="_formGroup">
			<angular-control type="date" format="shortDate" formControlName="date"></angular-control>
		</form>
	`
})
class TestHostComponent {

	protected _formGroup: FormGroup;

	constructor(
		protected _formBuilder: FormBuilder
	) {
		this._formGroup = this._formBuilder.group({
			date: [new Date()]
		});
	}

}

describe('DateComponent', () => {

	let
		fixture: ComponentFixture<TestHostComponent>,
		testHost: TestHostComponent,
		debugElement: DebugElement;

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
		debugElement = fixture.debugElement.query( By.css('angular-control') );
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(debugElement.nativeElement instanceof DateComponent).toBe(true, 'DateComponent');
		expect(debugElement.nativeElement.data('DateTimePicker')).toBeDefined('datetimepicker');
	});

});
