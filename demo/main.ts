// jQuery window / global needed for bootstrap libraries
import * as jQuery from 'jquery';
(<any>window).jQuery = (<any>window).$ = jQuery;

// Vendor library scripts
import 'bootstrap-sass';
import 'bootstrap-select';
import 'eonasdan-bootstrap-datetimepicker';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

import { AppModule } from './app.module';

import './vendor.scss';
import './main.scss';

if (process.env.NODE_ENV === 'production') {
	enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
