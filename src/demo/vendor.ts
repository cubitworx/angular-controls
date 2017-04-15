// jQuery window / global needed for bootstrap libraries
import * as jQuery from 'jquery';
(<any>window).jQuery = (<any>window).$ = jQuery;

// Vendor library styles
import './vendor.scss';

// Vendor library scripts
import 'bootstrap';
import 'bootstrap-select';
import 'eonasdan-bootstrap-datetimepicker';
