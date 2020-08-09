import {MedicModel} from './medic.model';
import {PatientModel} from './patient.model';
import {RecipeModel} from './recipe.model';
export class AppointModel {
    public _id: string;
   public medic: MedicModel | string;
    public patient: PatientModel | string;
    public recipe: RecipeModel | string;
    public status: boolean;
    public date: string;
    public hour: string;
}
