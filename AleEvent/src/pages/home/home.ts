import { Component, OnInit} from '@angular/core';
import { HttpService} from '../../app/http.service';
import { NavController } from 'ionic-angular';
import { Response} from '@angular/http';
import { Holiday } from '../../app/holiday';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    holidays: Holiday[]=[]

    constructor(public navCtrl: NavController, private httpService: HttpService) {
    
    }
    
    ngOnInit() {

        this.httpService.getData()
            .subscribe((data: Response) => {
                let holidaysList = data.json().model.data;
                for (let index in holidaysList) {
                    console.log(holidaysList[index]);
                    let holiday = holidaysList[index];
                    this.holidays.push({ picture: holiday.picture, name: holiday.name, description: holiday.description, video: holiday.video, pictures: holiday.pictures, picture_app: holiday.picture_app});
                }
            });

       console.log(this.holidays);
    }
  
  onLink(url: string) {
      window.open(url);
  }
}