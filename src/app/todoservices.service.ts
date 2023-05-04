import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TodoservicesService {
  notes:any
  subscribe() {
    throw new Error('Method not implemented.');
  }
 baseUrl = '';
  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.baseUrl;
   }

   getData():Observable<any>{
    const url = this.baseUrl + 'notes';
    return this.httpClient.get<any>(url);
  }
  
  addNotes(data:any){
    return this.httpClient.post(this.baseUrl + 'notes/', data);
  }

  updateNotes(id:number,note:object):Observable<any>{ 
    return this.httpClient.put<any>(this.baseUrl+'notes/' + id,note);
  }

  removeTasks(id:number){
    return this.httpClient.delete(this.baseUrl + 'notes/' + id);
  }

}





