import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { I18nModule } from 'angular-i18n';

// Local components
import { DateComponent } from './module/standard/date.component';
import { SelectComponent } from './module/standard/select.component';
// Local inline-edit components
import { IeDateComponent } from './module/inline-edit/date.component';
import { IeSelectComponent } from './module/inline-edit/select.component';
import { IeTextComponent } from './module/inline-edit/text.component';

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
