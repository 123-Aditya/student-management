import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private FireAuth: AngularFireAuth, private router: Router) { }

  //login method
  login(email: string, password: string) {

    this.FireAuth.signInWithEmailAndPassword(email,password).then( () => {
      localStorage.setItem('token','true');
      this.router.navigate(['dashboard']);
    }, err => {
      alert('Something went wrong !');
      console.log(err.message);
      this.router.navigate(['/login']);
    })
  }

  //register method
  register(email: string, password: string) {
    this.FireAuth.createUserWithEmailAndPassword(email,password).then( () => {
      alert('Registration successful !');
      this.router.navigate(['/login']);
    }, err => {
      alert('Something went wrong !');
      console.log(err.message);
      this.router.navigate(['/register']);
    })
  }

  //sign out method
  logout() {
    this.FireAuth.signOut().then( () => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    }) 
  }
}
