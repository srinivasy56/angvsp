import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  fb = inject(FormBuilder);
  weatherService = inject(WeatherService)

  weatherForm!: FormGroup;
  weatherResponse: any;
  loader = false;

  ngOnInit(): void {
    this.weatherForm = this.fb.group({
      city: ['', Validators.required]
    })
  }

  getWeather() {
    this.loader = true;
    const uniqueData = new Map();
    this.weatherService.getWeather(this.weatherForm.get(['city'])!.value).subscribe(res => {
      this.weatherResponse = this.getUniqueRecordsByDate(res.list);
      this.loader = false;
    })
  }

  getUniqueRecordsByDate(data: any[]): any[] {
    const uniqueData = new Map();

    data.forEach(record => {
      const date = record.dt_txt.split(' ')[0];
      if (!uniqueData.has(date)) {
        uniqueData.set(date, record);
      }
    });
    return Array.from(uniqueData.values());
  }

}
