import { TextBuilder } from "@/lib/utils";
import { BaseEntry } from "../BaseEntry";
import { toast } from "vue-sonner";
export class Beschriftung extends BaseEntry {
    datum: string = "";
    uhrzeit: string = "";
    ort: string = "";
    akz: string = "";
    type: T_TYPES = TYPES.Unbekannt;

    constructor(data: Partial<Beschriftung>) {
        super(data);
        this.datum = data.datum || "";
        this.uhrzeit = data.uhrzeit || "";
        this.ort = data.ort || "";
        this.akz = data.akz || "";
        this.type = data.type || TYPES.Unbekannt;
    }

    copyToClipboard() {
        let text = "";

        text += this.datum;
        text += " - ";
        text += this.uhrzeit;
        text += " - ";
        text += this.ort;

        if (this.akz != "" && this.type == TYPES.Einbruch_Auto) {
            text += " - ";
            text += this.akz;
        }

        switch (this.type) {
            case TYPES.Schussgefecht:
                text += " (SG)";
                break;
            case TYPES.Messerstecherei:
                text += " (MS)";
                break;
            case TYPES.Einbruch_Haus:
            case TYPES.Einbruch_Auto:
                text += " (EINBRUCH)"
                break;
            default:
                break;
        }

        if (this.akz != "" && this.type != TYPES.Einbruch_Auto) {
            text += " - ";
            text += this.akz;
        }

        new TextBuilder().addLine(text).copyClipboard();

        toast("Beschriftung kopiert", {
            description: "Die Beschriftung wurde in deine Zwischenablage kopiert.",
        });
    }
}

export const TYPES = {
    Unbekannt: "Unbekannt",
    Schussgefecht: "Schussgefecht",
    Messerstecherei: "Messerstecherei",
    Eigentumsdelikt: "Eigentumsdelikt",
    Einbruch_Auto: "Einbruch Auto",
    Einbruch_Haus: "Einbruch Haus",
} as const;

export type T_TYPES = (typeof TYPES)[keyof typeof TYPES];
