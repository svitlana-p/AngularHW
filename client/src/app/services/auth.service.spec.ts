import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { authMock } from '../mocks/auth-mock';

import { AuthService } from './auth.service';

describe('AuthService', () => {
    let service: AuthService;
    let hhtpClient: HttpClient;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                AuthService,
                HttpClient
            ]
        });

        hhtpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(AuthService);

    });


    describe('login', () => {
        const url = 'https://polar-thicket-64635.herokuapp.com/api/auth/login';
        const user = {
            username: 'user1',
            email: 'user1@mail.com',
            password: '123456'

        }
        it('should return token and username, called once', () => {
            service.login(user).subscribe({
                next: (authInfo) => {
                    expect(authInfo).toEqual(authMock)
                    expect(service.isAuthenticated()).toBeTrue()
                    expect(service.getToken()).toEqual(authMock.token)
                },
                error: fail
            });
            const req = httpTestingController.expectOne(url);
            expect(req.request.method).toEqual('POST');
            req.flush(authMock)
        })
    })
    describe('registration', () => {
        const url = 'https://polar-thicket-64635.herokuapp.com/api/auth/register';
        const user = {
            username: 'user1',
            email: 'user1@mail.com',
            password: '123456'
        }
        it('should register and return user, called once', () => {
            service.register(user).subscribe({
                next: (user) => {
                    expect(user).toEqual(user)
                },
                error: fail
            });
            const req = httpTestingController.expectOne(url);
            expect(req.request.method).toEqual('POST');

        })
    })

});
