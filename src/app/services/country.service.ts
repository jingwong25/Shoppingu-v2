import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError, of } from "rxjs";
import { Country } from "../interface/country";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CountryService {
  constructor(private http: HttpClient) {}

  countryList(): Observable<any> {
    return this.http.get<Country>("https://restcountries.eu/rest/v2/all");
  }
}
