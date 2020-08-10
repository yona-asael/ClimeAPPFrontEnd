import {AppointModel} from "./appoint.model";

export class PatientModel {
    public _id: string;
    public folio: string;
    public name: string;
    public lastname: string;
    public Date: Date;
    public address: string;
    public cellphone: number;
    public SEX: string;
    public history: AppointModel[];
}


