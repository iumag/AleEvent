import { Holiday } from './holiday'
import { City } from './city'
import { Event } from './event'
import { Hotel } from './hotel'
import { Photographer } from './photographer'
import { Transport } from './transport'
import { HttpService } from './http.service';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RelationService {
    city_id: Number;
    holiday_id: Number;
    holidays: Holiday[] = []
    cities: City[] = []
    events: Event[] = []
    hotels: Hotel[] = [];
    photographers: Photographer[] = [];
    transports: Transport[] = [];

    constructor(private httpService: HttpService) {

    }

    setHoliday() {
        if (this.holidays.length <= 0) {
            this.httpService.getData('http://10.100.3.68/api/holiday?column=sort&direction=asc&page=1&search_column=id&search_operator=equal_to&search_query_1=&search_query_2=')
                .subscribe((data: Response) => {
                    let holidaysList = data.json().model.data;
                    for (let index in holidaysList) {

                        let holiday = holidaysList[index];
                        this.holidays.push({ id: holiday.id, picture: holiday.picture, name: holiday.name, description: holiday.description, video: holiday.video, pictures: holiday.pictures, picture_app: holiday.picture_app, show: false });
                    }
                });
        }
        return this.holidays;
    }

    setCity() {
        if (this.cities.length <= 0) {
            this.httpService.getData('http://10.100.3.68/api/city?column=sort&direction=asc&page=1&search_column=id&search_operator=equal_to&search_query_1=&search_query_2=')
                .subscribe((data: Response) => {
                    let citiesList = data.json().model.data;
                    for (let index in citiesList) {
                        let city = citiesList[index];
                        this.cities.push({ id: city.id, picture: city.picture, name: city.name, description: city.description, video: city.video, pictures: city.pictures, status: city.status, show: false });
                    }
                });
        }

        return this.cities;
    }

    setEvent() {
        if (this.events.length <= 0) {
            this.httpService.getData('http://10.100.3.68/api/related_event?per_page=10000&column=sort&direction=asc&page=1&search_column=city_id&search_operator=equal_to&search_query_1=' + this.city_id + '&search_query_2=&search_query_3=' + this.holiday_id + '&search_column2=holiday_id')
                .subscribe((data: Response) => {
                    let eventsList = data.json().model.data;
                    for (let index in eventsList) {
                        let event = eventsList[index];
                        this.events.push({ id: event.id, city: event.city, city_id: event.city_id, cost: event.cost, event: event.event, event_id: event.event_id, holiday: event.holiday, holiday_id: event.holiday_id, show: false });
                    }
                });
        }
        return this.events;
    }

    setHotel() {
        if (this.hotels.length <= 0) {
            this.httpService.getData('http://10.100.3.68/api/hotel?column=sort&direction=asc&page=1&search_column=city_id&search_operator=equal_to&search_query_1=' + this.city_id + '&search_query_2=')
                .subscribe((data: Response) => {
                    let hotelsList = data.json().model.data;
                    for (let index in hotelsList) {
                        let hotel = hotelsList[index];
                        this.hotels.push({ id: hotel.id, cost: hotel.cost, name: hotel.name, picture: hotel.picture, description: hotel.description, video: hotel.video, pictures: hotel.pictures, show: false });
                    }
                });
        }

        return this.hotels;
    }

    setPhotographer() {
        if (this.photographers.length <= 0) {
            this.httpService.getData('http://10.100.3.68/api/photographer?column=sort&direction=asc&page=1&search_column=city_id&search_operator=equal_to&search_query_1=' + this.city_id + '&search_query_2=')
                .subscribe((data: Response) => {
                    let photographersList = data.json().model.data;
                    for (let index in photographersList) {
                        let hotel = photographersList[index];
                        this.photographers.push({ id: hotel.id, cost: hotel.cost, name: hotel.name, picture: hotel.picture, description: hotel.description, video: hotel.video, pictures: hotel.pictures, show: false });
                    }
                });
        }
        return this.photographers;
    }

    setTransport() {
        if (this.transports.length <= 0) {
            this.httpService.getData('http://10.100.3.68/api/transport?column=sort&direction=asc&page=1&search_column=city_id&search_operator=equal_to&search_query_1=' + this.city_id + '&search_query_2=')
                .subscribe((data: Response) => {
                    let transportsList = data.json().model.data;
                    for (let index in transportsList) {
                        let hotel = transportsList[index];
                        this.transports.push({ id: hotel.id, cost: hotel.cost, name: hotel.name, picture: hotel.picture, description: hotel.description, video: hotel.video, pictures: hotel.pictures, show: false });
                    }
                });
        }
        return this.transports;
    }

    getHolidays() {
        return this.holidays
    }

    getCities() {
        return this.cities
    }

    getEvents() {
        return this.events
    }

    getHotels() {
        return this.hotels
    }

    getPhotographer() {
        return this.photographers
    }

    getTransport() {
        return this.transports
    }

    getCityId() {
        return this.city_id;
    }

    getHolidayId() {
        return this.holiday_id;
    }

    setCityId(id) {
        this.city_id = id;
    }

    setHolidayId(id) {
        this.holiday_id = id;
    }

    setShowEvent(item) {
        var obj = this.events.filter(function (obj) {
            return obj.id === item.entity_id
        });
        obj[0].show = false;
    }

    setShowHotel(item) {
        var obj = this.hotels.filter(function (obj) {
            return obj.id === item.entity_id
        });
        obj[0].show = false;
    }

    setShowTransport(item) {
        var obj = this.transports.filter(function (obj) {
            return obj.id === item.entity_id
        });
        obj[0].show = false;
    }



}