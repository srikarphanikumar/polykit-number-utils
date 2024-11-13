import { NgModule } from '@angular/core';
import { PolyNumberUtilService } from './number-utils.service';
import { POLY_NUMBER_PIPES } from './pipes';

@NgModule({
    declarations: [...POLY_NUMBER_PIPES],
    exports: [...POLY_NUMBER_PIPES],
    providers: [PolyNumberUtilService]
})
export class PolyNumberModule { }