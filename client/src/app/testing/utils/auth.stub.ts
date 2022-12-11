import { Component, Input } from '@angular/core';

@Component({
    selector:'app-card',
    template: '<form>'
})
export class CardStubComponent {
    @Input() header: string = ''
    @Input() buttonName: string = '';
    @Input() emailRequired: boolean = false;

}

