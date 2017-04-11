import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
		CommonModule,
		FormsModule,
		I18nModule
	]
})
export class AngularControlsModule {

	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: AngularControlsModule
		};
	}

}
