import { Component, OnInit } from "@angular/core";

import { MenuController, Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Router } from "@angular/router";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  userRef: AngularFirestoreDocument;
  userSub;
  user;
  uid: string = localStorage.getItem("uid");

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private afAuth: AngularFireAuth,
    private menuCtrl: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
    });

    if (localStorage.getItem("uid")) {
      this.router.navigate(["/home"]);
    }
  }

  logout() {
    this.afAuth.signOut();
    localStorage.removeItem("uid");
    this.router.navigate(["/"]);
    this.menuCtrl.close();
  }
}
