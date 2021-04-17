import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdService {
  private id: number;

  constructor() { }

  getID(): number{
    return this.id;
  }

  setID(id: number) {
    this.id = id;
  }
}
