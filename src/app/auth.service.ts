import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { CanActivate, Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService implements CanActivate {
  constructor(private router: Router, private afAuth: AngularFireAuth) {}

  canActivate(): boolean {
    if (localStorage.getItem("uid")) {
      this.router.navigate(["/home"]);
      return false;
    }

    return true;
  }
}
