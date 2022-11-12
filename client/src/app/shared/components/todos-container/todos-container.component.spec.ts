// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { Route } from '@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';
// import { todoMock } from 'src/app/mocks/todo-mock';
// import { DashboardService } from 'src/app/services/dashboard.service';
// import { DashboardServiceMock } from 'src/app/services/dashboard.service-mock';
// import { PopupService } from 'src/app/services/popup.service';
// import { SpinnerService } from 'src/app/services/spinner.service';
// import { TodoService } from 'src/app/services/todo.service';
// import { TodoserviceMock } from 'src/app/services/todo.service-mock';

// import { TodosContainerComponent } from './todos-container.component';

// describe('TodosContainerComponent', () => {
//   let component: TodosContainerComponent;
//   let fixture: ComponentFixture<TodosContainerComponent>;
//   let todoServise: TodoService;
//   let popupService: PopupService;
//   let route: Route;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ TodosContainerComponent ],
//       imports: [
//         RouterTestingModule,
//     ],
//     providers: [{
//         provide: TodoService, useClass: TodoserviceMock
//     },
//         PopupService,
//         DashboardService
//     ]

//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(TodosContainerComponent);
//     todoServise = TestBed.inject(TodoService)
//     popupService = TestBed.inject(PopupService);
//     component = fixture.componentInstance;
//     component.todo = todoMock[0]; 
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
