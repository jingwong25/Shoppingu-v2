import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2
} from "@angular/core";
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { CountryService } from "../../services/country.service";
import { Country } from "../../interface/country";
import { CompleterService, CompleterData } from "ng2-completer";
import { NgModel } from "@angular/forms";
import { Subscription } from "rxjs";
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import {
  NgbDate,
  NgbDatepicker,
  NgbInputDatepicker,
  NgbDateStruct,
  NgbCalendar,
  NgbDateAdapter,
  NgbDateParserFormatter
} from "@ng-bootstrap/ng-bootstrap";

const now = new Date();
const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one &&
  two &&
  two.year === one.year &&
  two.month === one.month &&
  two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two
    ? false
    : one.year === two.year
    ? one.month === two.month
      ? one.day === two.day
        ? false
        : one.day < two.day
      : one.month < two.month
    : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two
    ? false
    : one.year === two.year
    ? one.month === two.month
      ? one.day === two.day
        ? false
        : one.day > two.day
      : one.month > two.month
    : one.year > two.year;

@Component({
  selector: "app-travel",
  templateUrl: "./travel.component.html",
  styleUrls: ["./travel.component.scss"]
})

export class TravelComponent implements OnInit {
  faCalendarAlt = faCalendarAlt;
  startDate: NgbDateStruct;
  maxDate: NgbDateStruct;
  minDate: NgbDateStruct;
  hoveredDate: NgbDateStruct;
  fromDate: any;
  toDate: any;
  model: any;
  private _subscription: Subscription;
  private _selectSubscription: Subscription;
  @ViewChild("d") input: NgbInputDatepicker;
  @ViewChild(NgModel) datePick: NgModel;
  @ViewChild("myRangeInput") myRangeInput: ElementRef;

  isHovered = (date: NgbDateStruct) =>
    this.fromDate &&
    !this.toDate &&
    this.hoveredDate &&
    after(date, this.fromDate) &&
    before(date, this.hoveredDate);
  isInside = (date: NgbDateStruct) => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = (date: NgbDateStruct) => equals(date, this.fromDate);
  isTo = (date: NgbDateStruct) => equals(date, this.toDate);

  selectedCountry = this.fb.control([""]);
  form = this.fb.group({
    country: [""],
    travelDateFrom: NgbDate,
    travelDateTo: NgbDate,
    hoveredDate: NgbDate,
    model: [""]
  });

  protected dataService: CompleterData;
  protected activeTab: String;

  constructor(
    private fb: FormBuilder,
    private calendar: NgbCalendar,
    private countryService: CountryService,
    private completerService: CompleterService,
    private element: ElementRef,
    private renderer: Renderer2,
    private _parserFormatter: NgbDateParserFormatter
  ) {}

  ngOnInit() {
    this.activeTab = "travel-tab";
    this.countryService.countryList().subscribe((res: Country[]) => {
      this.dataService = this.completerService.local(res, "name", "name");
    });
    this.form.get("travelDateFrom").patchValue(this.calendar.getToday());
    this.form
      .get("travelDateTo")
      .patchValue(this.calendar.getNext(this.calendar.getToday(), "d", 10));
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

  clickCountry = () => {};

  onDateSelection(date: NgbDateStruct) {
    let parsed = '';
    if (!this.fromDate && !this.toDate) {
        this.fromDate = date;
    } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
        this.toDate = date;
        // this.model = `${this.fromDate.year} - ${this.toDate.year}`;
        this.input.close();
    } else {
        this.toDate = null;
        this.fromDate = date;
    }
    if(this.fromDate) {
      console.log("fromDate ---", this.fromDate, this._parserFormatter.format(this.fromDate))
      parsed += this._parserFormatter.format(this.fromDate);
    }
    if(this.toDate) {
      parsed += ' - ' + this._parserFormatter.format(this.toDate);
    }

    this.renderer.setProperty(this.myRangeInput.nativeElement, 'value', parsed);
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
}
