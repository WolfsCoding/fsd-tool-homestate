import { BaseEntry } from "../BaseEntry";

export interface IWeapon {
    id: string;
    name: string;
    model: string;
    serial: string;
    schmauchspuren: boolean;
    zustand: string;
    munition: number;
}

export interface ISchnmauchspuren {
    id: string;
    name: string;
    schmauchspuren: boolean;
}

export interface IGutachten {
    akz: string;
    gutachter: string;
    weapons: IWeapon[];
    schmauchspuren: ISchnmauchspuren[];
}

export class Gutachten extends BaseEntry implements IGutachten {
    akz: string = "";
    gutachter: string = "";
    weapons: IWeapon[] = [];
    schmauchspuren: ISchnmauchspuren[] = [];

    constructor(data: Partial<IGutachten>) {
        super();
        this.akz = data.akz || "";
        this.gutachter = data.gutachter || "";
        this.weapons = data.weapons || [];
        this.schmauchspuren = data.schmauchspuren || [];
    }
}

export const WeaponNames: { title: string; models: string[] }[] = [
    { title: "Keckler&Loch", models: ["P1T3", "45 Compact"] },
    { title: "FN", models: ["FN FNX-45"] },
    { title: "Müller&Wesseon", models: ["MW2023"] },
    { title: "Maurus", models: ["PT92F"] },
    { title: "Schlock", models: ["69"] },
    { title: "Fuger", models: ["SR40"] },
    { title: "Bretta", models: ["M9"] },
    { title: "Lukarev", models: ["TT-33"] },
    { title: "Sonstige", models: ["Pistole", "Pistole 50", "Zusammengebastelte Pistole"] },
];
