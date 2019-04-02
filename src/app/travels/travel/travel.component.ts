import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { CountryService } from "../../services/country.service";
import { Country } from "../../interface/country";
import { CompleterService, CompleterData } from "ng2-completer";

@Component({
  selector: "app-travel",
  templateUrl: "./travel.component.html",
  styleUrls: ["./travel.component.scss"]
})
export class TravelComponent implements OnInit {
  selectedCountry = this.fb.control([""]);
  travelForm = this.fb.group({
    country: [""],
    travelDateFrom: [""],
    travelDateTo: [""]
  });

  protected dataService: CompleterData;
  protected activeTab: String;

  constructor(
    private fb: FormBuilder,
    private countryService: CountryService,
    private completerService: CompleterService
  ) {}

  ngOnInit() {
    this.activeTab = "travel-tab";
    this.countryService.countryList().subscribe((res: Country[]) => {
      this.dataService = this.completerService.local(res, "name", "name");
    });
  }

  onClickTab(activeTab: String) {
    this.activeTab = activeTab;
  }

  onClickBack(currentTab: String) {
    switch (currentTab) {
      case "product-tab":
        this.activeTab = "travel-tab";
        break;
      case "review-tab":
        this.activeTab = "product-tab";
        break;
    }
  }

  onClickContinue(currentTab: String) {
    switch (currentTab) {
      case "travel-tab":
        this._continueWithTravel();
        break;
      case "product-tab":
        this._continueWithProduct();
        break;
      case "review-tab":
        this._continueWithReview();
        break;
    }
  }

  _continueWithTravel() {
    // Validation stuff...
    this.activeTab = "product-tab";
  }

  _continueWithProduct() {
    // Validation stuff...
    this.activeTab = "review-tab";
  }

  _continueWithReview() {
    // Validation stuff...
  }

  clickCountry = () => {};
}
