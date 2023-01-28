import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private registerUrl = 'http://34.27.188.160/register';

  constructor(private http: HttpClient) { }

  register(data: {nombres: string, apellidos: string, email: string, password: string}){
    return this.http.post(this.registerUrl, data);
  }
}
