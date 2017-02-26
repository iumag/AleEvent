import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class HttpService {

    constructor(private http: Http) { }

    getData() {
        return this.http.get('http://10.100.3.68/api/holiday?column=sort&direction=asc&page=1&search_column=id&search_operator=equal_to&search_query_1=&search_query_2=')
    }
}