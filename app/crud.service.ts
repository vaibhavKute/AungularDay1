import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  public URL = "http://localhost:3000/";
  constructor(public http:HttpClient) { }

  insertData(keyName , record){
    return this.http.post(this.URL+keyName , record);
  }

  selectData(keyName){
    return this.http.get(this.URL+keyName);
  }
}
