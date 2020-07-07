//recipe

export class recipeModel {
    public medic_id: String;
    public pacient_id: String;
    public date: Date;
    public dignostic: String;
    public TA: String;
    public FC: String;
    public FR: String;
    public T: String;
    public dateExp: Date;
}


export interface recipeInterface{
    medic_id: String,
    pacient_id: String,
    date: Date,
    dignostic: String,
    TA: String,
    FC: String,
    FR: String,
    T: String,
    dateExp: Date
}



