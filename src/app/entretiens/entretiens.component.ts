import { Component, OnInit } from '@angular/core';
import { EntretienService } from '../entretien.service';
import  Entretien  from '../model/entretien';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-entretiens',
  templateUrl: './entretiens.component.html',
  styleUrls: ['./entretiens.component.css']
})
export class EntretiensComponent implements OnInit {

  entretiens: any;
  curentEntretien = null;
  currentIndex = -1;
  title = '';
  constructor(private entretienService: EntretienService) { }

  ngOnInit(): void {
    this.retrieveEntretiens();
  }

  refreshList(): void {
    this.curentEntretien = null;
    this.currentIndex = -1;
    this.retrieveEntretiens();
  }

  retrieveEntretiens(): void {
    this.entretienService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.entretiens = data;
    });
  }

  dislike(entretien: Entretien): void {
    entretien.isFavorite = false;
    this.entretienService.update(entretien.id, entretien);
    //this.currentIndex = index;

  }

  like(entretien: Entretien): void {
    entretien.isFavorite = true;
    this.entretienService.update(entretien.id, entretien);
    //this.currentIndex = index;
  }


}
