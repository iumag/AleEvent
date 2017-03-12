export class RelationService {
    city_id: Number;
    holiday_id: Number;

    getCityId(){
        return this.city_id;
    }

    getHolidayId(){
        return this.holiday_id;
    }

    setCityId(id){
        this.city_id = id;
    }

    setHolidayId(id){
        this.holiday_id = id;
    }
}