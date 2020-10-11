import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { auth } from "firebase/app";
import { UtilityService } from "../utility.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  email: string = "";
  password: string = "";
  show: boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore,
    private loadingCtrl: LoadingController,
    private utility: UtilityService
  ) {}

  ngOnInit() {}

  togglePassword() {
    this.show = !this.show;
  }

  login() {
    if (
      this.utility.verifyEmail(this.email) &&
      this.utility.verifyPassword(this.password)
    ) {
      this.showLoading();

      this.afAuth.signInWithEmailAndPassword(this.email, this.password).then(
        (data) => {
          localStorage.setItem("uid", data.user.uid);
          this.router.navigate(["/home"]);

          this.loadingCtrl.dismiss;
        },
        (err) => this.loadingCtrl.dismiss()
      );
    }
  }

  google() {
    this.showLoading();

    this.afAuth.signInWithPopup(new auth.GoogleAuthProvider()).then(
      (data) => {
        this.db.doc(`users/${data.user.uid}`).set(
          {
            uid: data.user.uid,
            name: data.user.displayName,
            email: data.user.email,
          },
          { merge: true }
        );

        localStorage.setItem("uid", data.user.uid);
        this.router.navigate(["/home"]);

        this.loadingCtrl.dismiss();
      },
      (err) => this.loadingCtrl.dismiss()
    );
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: "Please Wait ...",
      spinner: "crescent",
      translucent: true,
    });

    await loading.present();
  }
}
