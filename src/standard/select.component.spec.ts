import { Component, DebugElement, OnInit } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// Local
import { AppComponent } from '../app/app.component';
import { ValuelistInterface } from '../common';
import { SelectComponent } from './select.component';

describe('SelectComponent', () => {

	let
		fixture: ComponentFixture<AppComponent>,
		testHost: AppComponent,
		debugElement: DebugElement;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ AppComponent, SelectComponent ]
		});
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent( AppComponent );
		testHost = fixture.componentInstance;
		debugElement = fixture.debugElement.query( By.css('.angular-control') );
		fixture.detectChanges();
	});

	it('should work', () => {
		expect(debugElement.nativeElement instanceof SelectComponent).toBe(true, 'should create SelectComponent');
	});

	it('should load select options', () => {
		console.log( debugElement.queryAll( By.css('option') ) );
		// expect(debugElement.nativeElement.options).toContain(expectedPipedName);
	});

});
