import { RendezVous } from './rendezVous';

export class Etablissement {
    constructor(public id: number,
                public name: string,
                public address: string,
                public type: string,
                public nbrePersonneReserve: number,
                public createdAt: string,
                public image: string,
                public disponible: boolean,
                public rendezVous: RendezVous[]) { }

}
