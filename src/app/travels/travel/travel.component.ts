import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { CountryService } from "../../services/country.service";
import { Country } from "../../interface/country";

@Component({
  selector: "app-travel",
  templateUrl: "./travel.component.html",
  styleUrls: ["./travel.component.scss"]
})
export class TravelComponent implements OnInit {
  selectedCountry = this.fb.control(['']);
  travelForm = this.fb.group({
    country: [""],
    travelDateFrom: [""],
    travelDateTo: [""]
  });

  private options: Country[] = [];
  private filteredOptions: Observable<Country[]>;

  constructor(private fb: FormBuilder, private countryService: CountryService) {
    this.countryService.countryList().subscribe((res: Country[]) => {
      this.options = res;

      this.filteredOptions = this.selectedCountry.valueChanges.pipe(
        startWith(""),
        map(value => this._filter(value))
      );
    });
  }

  ngOnInit() {
    this.filteredOptions = this.selectedCountry.valueChanges.pipe(
      startWith(""),
      map(value => this._filter(value))
    );
  }

  clickCountry = () => {};

  private _filter(value: string): Country[] {
    const filterValue = value.toLowerCase();

    let filter = this.options.filter(option =>
      option.name.toLowerCase().includes(filterValue)
    );

    return filter;
  }
}
