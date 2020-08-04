import { PersonModel } from './person.model';

export class MedicModel {
    public _id: Number
    public university: String;
    public grade: String;
    public cedP: String;
    public person: PersonModel | String;
}
