import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeather(city: any): Observable<any> {
    return this.http.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=a78dee62478e3cad5c54a2a951253fb1`);
  }
}
