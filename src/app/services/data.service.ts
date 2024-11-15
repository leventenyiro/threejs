import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private apiUrl = 'https://api.le-systeme-solaire.net/rest.php/bodies/';

    constructor(private http: HttpClient) {}
  
    getMercureData(): Observable<any> {
      return this.http.get<any>(this.apiUrl + '/mercure');
    }

    getVenusData(): Observable<any> {
      return this.http.get<any>(this.apiUrl + '/venus');
    }

    getEarthData(): Observable<any> {
      return this.http.get<any>(this.apiUrl + '/terre');
    }
}