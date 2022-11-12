import { Component, Input, Pipe, PipeTransform } from "@angular/core";
import { IBoard } from "../models/board";


@Component({
    selector: 'app-todo-container',
    template: '<div><span></span><span></span></div>'
})
export class TodoStubComponent{
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

@Component({
    selector: 'app-spinner',
    template: '<div></div>'
})
export class SpinnerStubComponent{

}
@Component({
    selector: 'app-color-piker',
    template: '<form></form>'
})
export class ColorPikerStubComponent{
    @Input() id:string = 'test'
}

@Pipe({name: 'filterTodo'})
export class TodoFilterStubPipe implements PipeTransform {
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