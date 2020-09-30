import {Directive, HostListener} from '@angular/core';

@Directive({
    selector: 'input[onlyNumber]'
})
export class OnlyNumberDirective {

    constructor() {
    }

    @HostListener('keypress', ['$event']) onInputChange(e) {
        if (e.which == 8) {
            return true;
        }

        var verified = String.fromCharCode(e.which).match(/[^0-9]/g);
        if (verified) {
            e.preventDefault();
            return false;
        }

        // var regex = new RegExp("[^0-9]");
        // var key = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        // if (regex.test(key)) {
        //     event.preventDefault();
        //     return false;
        // }

    }
}