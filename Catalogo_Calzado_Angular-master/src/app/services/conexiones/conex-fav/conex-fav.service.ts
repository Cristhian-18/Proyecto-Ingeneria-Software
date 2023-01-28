import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';

interface TokenPayload {
  user: {
    id: number;
    email: string;
    nombres: string;
    rol: string;
  },
  iat: number;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class ConexFavService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }
  addFavorito(idProducto: number, email: string) {
    const body = { id_producto: idProducto, email: email };
    return this.http.post('http://34.27.188.160/favoritos', body);
  }
  getEmailFromToken() {
    const token = this.cookieService.get('token');
    if (!token) {
      return null;
    }
    const decoded = jwt_decode(token) as TokenPayload;
    return decoded.user.email;
  }
  geIdFromToken() {
    const token = this.cookieService.get('token');
    if (!token) {
      return null;
    }
    const decoded = jwt_decode(token) as TokenPayload;
    return decoded.user.id;
  }
  listarFavoritos() {
    const id = this.geIdFromToken();
    console.log(id);
    console.log('Ruta es: '+'http://34.27.188.160/favoritos'+'/'+id)
    return this.http.get('http://34.27.188.160/favoritos'+'/'+id);
  }
  deletFavorito(id:number){
    return this.http.delete('http://34.27.188.160/favoritos'+'/'+id);

  };

}
