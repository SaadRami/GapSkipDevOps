import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import Entretien from './model/entretien';

@Injectable({
  providedIn: 'root'
})
export class EntretienService {

  private dbPath = 'entretiens';

  entretiensRef: AngularFirestoreCollection<Entretien> = null;

  constructor(private db: AngularFirestore) {
    this.entretiensRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Entretien> {
    return this.entretiensRef;
  }

  update(id: string, data: any): Promise<void> {
    return this.entretiensRef.doc(id).update(data);
  }

}
