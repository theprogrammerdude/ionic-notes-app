import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { MenuController } from "@ionic/angular";
import { firestore } from "firebase";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  title: string = "";
  desc: string = "";
  notes: any[] = [];
  uid: string = localStorage.getItem("uid");
  userRef: AngularFirestoreDocument;
  userSub;

  constructor(
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    private menuCtrl: MenuController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.userRef = this.db.doc(`users/${this.uid}`);

    this.userSub = this.userRef.valueChanges().subscribe((val) => {
      this.notes = val.notes;
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  addNote() {
    const id = Math.random().toString(36).substring(7);

    if (this.desc !== "" && this.title !== "") {
      this.db.doc(`users/${this.uid}`).set(
        {
          notes: firestore.FieldValue.arrayUnion({
            id,
            title: this.title,
            desc: this.desc,
          }),
        },
        { merge: true }
      );
    }

    this.title = this.desc = "";
  }

  deleteNote(note) {
    this.db.doc(`users/${this.uid}`).update({
      notes: firestore.FieldValue.arrayRemove({
        id: note.id,
        title: note.title,
        desc: note.desc,
      }),
    });
  }

  deleteAll() {
    this.db.doc(`users/${this.uid}`).set(
      {
        notes: [],
      },
      { merge: true }
    );
  }

  gotoNote(note) {
    this.router.navigate([`/note/${note.id}`], { queryParams: note });
  }

  openMenu() {
    this.menuCtrl.enable(true, "menu1");
    this.menuCtrl.open("menu1");
  }
}
