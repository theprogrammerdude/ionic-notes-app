import { Component } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  note: string = "";
  notes: any[] = [];

  constructor() {}

  ionViewWillEnter() {
    if (localStorage.getItem("notes")) {
      this.notes = JSON.parse(localStorage.getItem("notes"));
    }
  }

  addNote() {
    if (this.note != "") {
      let data = { note: this.note };
      this.notes.push(data);
      localStorage.setItem("notes", JSON.stringify(this.notes));
    }

    this.note = "";
  }

  deleteNote(i: number) {
    this.notes.splice(i, 1);
    localStorage.setItem("notes", JSON.stringify(this.notes));
  }

  deleteAll() {
    this.notes = [];
    localStorage.setItem("notes", JSON.stringify(this.notes));
  }
}
