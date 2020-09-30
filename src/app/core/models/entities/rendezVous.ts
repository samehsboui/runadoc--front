import { Etablissement } from './etablissement';

export class RendezVous {
    constructor(public id: number,
                public name: string,
                public price: number,
                public heureStart: string,
                public heureEnd: string,
                public dateStart: string,
                public etablissement: Etablissement) { }

}
