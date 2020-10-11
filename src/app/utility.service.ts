import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class UtilityService {
  constructor(private alertCtrl: AlertController) {}

  verifyEmail(email: string) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (regex.test(email)) {
      return true;
    }

    this.emailAlert();
    return false;
  }

  verifyPassword(password: string) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (regex.test(password)) {
      return true;
    }

    this.passwordAlert();
    return false;
  }

  verifyName(name: string) {
    const regex = /^[A-Za-z]$/;

    if (regex.test(name)) {
      return true;
    }

    this.nameAlert();
    return false;
  }

  async emailAlert() {
    const alert = await this.alertCtrl.create({
      header: "Invalid Email",
      message: "Please re-enter your Email Address",
      buttons: ["OK"],
    });

    await alert.present();
  }

  async passwordAlert() {
    const alert = await this.alertCtrl.create({
      header: "Invalid Password",
      message:
        "Please make sure your password contains minimum eight characters, at least one letter, one number and one special character.",
      buttons: ["OK"],
    });

    await alert.present();
  }

  async nameAlert() {
    const alert = await this.alertCtrl.create({
      header: "Invalid Name",
      message:
        "Please use only character and make sure it is between 3 and 20 character",
      buttons: ["OK"],
    });

    await alert.present();
  }
}
