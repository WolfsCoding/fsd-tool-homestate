import { TextBuilder } from "@/lib/utils";
import { BaseEntry } from "../BaseEntry";
import { useToast } from "@/components/ui/toast";

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

        if (this.akz != "") {
            text += " - ";
            text += this.akz;
        }

        switch (this.type) {
            case TYPES.Schussgefecht:
                text += " - ";
                text += "SG";
                break;
            case TYPES.Messerstecherei:
                text += " - ";
                text += "MS";
                break;
            default:
                break;
        }

        new TextBuilder().addLine(text).copyClipboard();

        useToast().toast({
            title: "Beschriftung kopiert",
            description: "Die Beschriftung wurde in deine Zwischenablage kopiert.",
        });
    }
}

export const TYPES = {
    Unbekannt: "Unbekannt",
    Schussgefecht: "Schussgefecht",
    Messerstecherei: "Messerstecherei",
    Eigentumsdelikt: "Eigentumsdelikt",
} as const;

export type T_TYPES = (typeof TYPES)[keyof typeof TYPES];
