import { useToast } from "@/components/ui/toast";
import { LocalStorage } from "..";
import { BaseEntry } from "../BaseEntry";

export class SparbuchEntry extends BaseEntry {
    datum: string;
    betrag: number;
    beschreibung: string;
    type: (typeof ENTRY_TYPES)[keyof typeof ENTRY_TYPES];

    constructor(data: Partial<SparbuchEntry>) {
        super(data);

        this.datum = data.datum || "";
        this.betrag = data.betrag || 0;
        this.beschreibung = data.beschreibung || "";
        this.type = data.type || ENTRY_TYPES.Einzahlung;
    }
}

export const ENTRY_TYPES = {
    Einzahlung: "Einzahlung",
    Auszahlung: "Auszahlung",
    Zinsen: "Zinsen",
} as const;
