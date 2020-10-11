import { Component, OnInit } from "@angular/core";

import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { UtilityService } from "../utility.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})
export class RegisterPage implements OnInit {
  email: string = "";
  password: string = "";
  name: string = "";
  show: boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private loadingCtrl: LoadingController,
    private utility: UtilityService
  ) {}

  ngOnInit() {}

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: "Please Wait ...",
      spinner: "crescent",
      translucent: true,
    });

    await loading.present();
  }

  togglePassword() {
    this.show = !this.show;
  }

  register() {
    if (
      this.utility.verifyName(this.name) &&
      this.utility.verifyEmail(this.email) &&
      this.utility.verifyPassword(this.password)
    ) {
      this.showLoading();

      this.afAuth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          (data) => {
            this.db.doc(`users/${data.user.uid}`).set({
              uid: data.user.uid,
              email: data.user.email,
              name: this.name,
            });

            localStorage.setItem("uid", data.user.uid);
            this.router.navigate(["/home"]);

            this.loadingCtrl.dismiss();
          },
          (err) => this.loadingCtrl.dismiss()
        );
    }
  }
}
