import { Component, Input, Pipe, PipeTransform } from "@angular/core";
import { IBoard } from "../models/board";


@Component({
    selector: 'app-board',
    template: '<div><span></span><span></span></div>'
})
export class BoardStubComponent{
    @Input() board: IBoard[] = [];
}

@Component({
    selector: 'app-toolbar',
    template: '<div></div>'
})
export class ToolbarStubComponent{
    @Input() title: string = '';
    @Input() dellBtn: boolean = false;
}

@Pipe({name: 'filterBoard'})
export class DashbooardFilterStubPipe implements PipeTransform {
    transform() {
        return[]
    }
}
@Pipe({name: 'sort'})
export class SortStubPipe implements PipeTransform {
    transform() {
        return[]
    }
}