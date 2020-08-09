import { PersonModel } from './person.model';

export class MedicModel {
    public _id: string;
    public university: string;
    public grade: string;
    public cedP: string;
    public person: PersonModel | string;
}
