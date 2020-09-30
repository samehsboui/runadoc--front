import { Etablissement } from '../entities/etablissement';
import { UserResponse } from '../responses/user-response';

export class CreateRendezVousRequest {
    heureStart: string;
    heureEnd: string;
    dateStart: string;
    etablissement: Etablissement;

    constructor(heureStart: string, heureEnd: string, dateStart: string,
                etablissement: Etablissement) {
        this.heureStart = heureStart;
        this.heureEnd = heureEnd;
        this.dateStart = dateStart;
        this.etablissement = etablissement;
    }
}
