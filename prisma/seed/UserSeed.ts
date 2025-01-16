import { faker } from "@faker-js/faker";
import Seeder from "../seeder";

export default class UserSeed extends Seeder{
    constructor(count: number = 10){
        super(count);
        this.count = count;
        this.createData();
    }

    protected createData(): void {
        for(let i = 0; i < this.count; i++){
            this._data.push({
                email: faker.internet.email({allowSpecialCharacters:false,provider:'gmail'}),
                name: faker.person.fullName(),
                address: faker.location.street(),
                phone: faker.phone.number({style: 'international'}),
                gender: faker.person.sexType(),
            })
        }
    }
}