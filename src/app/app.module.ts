import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule }  from '@angular/platform-browser';

// Local
import { AppComponent } from './app.component';
import { AngularControlsModule } from '../module';

@NgModule({
	bootstrap: [ AppComponent ],
	declarations: [
		AppComponent
	],
	imports: [
		AngularControlsModule,
		BrowserModule,
		// FormsModule
	]
})
export class AppModule { }
