import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';


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

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})



export class NavbarComponent {
  isLoggedIn: boolean;
  decodedToken: any;
  nombreUsuario: string | undefined;
  public userRole: boolean | undefined;
  public admin: boolean | undefined;
  constructor(private cookieService: CookieService, private router: Router) { 
    const token = cookieService.get('token');
    //this.userRole = this.verifyRole();
    if (token) {
      const decoded = jwt_decode(token) as TokenPayload;
      this.nombreUsuario = 'Bienvenido '+decoded.user.nombres;
      this.isLoggedIn = true;
      if (decoded.user.rol === 'user') {
        this.userRole = true;
      }
      if (decoded.user.rol === 'admin') {
        this.admin = true;
      }
    }else{
      this.isLoggedIn = false;
      this.nombreUsuario = '';
    }
  }

  logout() {
    this.cookieService.delete('token');
    this.isLoggedIn = false;
    this.nombreUsuario = '';
    swal.fire({
      title: '¡Cierre de sesión exitoso!',
      text: 'Esperamos verte pronto.',
      icon: 'success'
      });
    this.router.navigate(['/home']);
}


}
