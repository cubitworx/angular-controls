import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { I18nModule } from 'angular-i18n';

// Local components
import { DateComponent } from './standard/date.component';
import { SelectComponent } from './standard/select.component';
// Local inline-edit components
import { IeDateComponent } from './inline-edit/date.component';
import { IeSelectComponent } from './inline-edit/select.component';
import { IeTextComponent } from './inline-edit/text.component';

@NgModule({
	declarations: [
		DateComponent,
		IeDateComponent,
		IeSelectComponent,
		IeTextComponent,
		SelectComponent
	],
	exports: [
		DateComponent,
		IeDateComponent,
		IeSelectComponent,
		IeTextComponent,
		SelectComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		I18nModule
	]
})
export class AngularControlsModule { }
