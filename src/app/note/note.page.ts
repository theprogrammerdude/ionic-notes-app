import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { ActivatedRoute } from "@angular/router";
import { NavController } from "@ionic/angular";
import { firestore } from "firebase";

@Component({
  selector: "app-note",
  templateUrl: "./note.page.html",
  styleUrls: ["./note.page.scss"],
})
export class NotePage implements OnInit {
  @ViewChild("title", { static: false }) titleInput;
  @ViewChild("desc", { static: false }) descInput;

  note: any;
  uid: string = localStorage.getItem("uid");
  isEditing: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private db: AngularFirestore,
    private navCtrl: NavController
  ) {
    this.route.queryParams.subscribe((val) => {
      this.note = val;
    });
  }

  ngOnInit() {}

  toggleEdit() {
    this.isEditing = true;
  }

  saveEdit() {
    this.db.doc(`users/${this.uid}`).update({
      notes: firestore.FieldValue.arrayRemove({
        id: this.note.id,
        title: this.note.title,
        desc: this.note.desc,
      }),
    });

    this.db.doc(`users/${this.uid}`).update({
      notes: firestore.FieldValue.arrayUnion({
        id: this.note.id,
        title: this.titleInput.value,
        desc: this.descInput.value,
      }),
    });

    this.navCtrl.pop();
  }

  delete() {
    this.db.doc(`users/${this.uid}`).update({
      notes: firestore.FieldValue.arrayRemove({
        id: this.note.id,
        title: this.note.title,
        desc: this.note.desc,
      }),
    });

    this.navCtrl.pop();
  }
}
