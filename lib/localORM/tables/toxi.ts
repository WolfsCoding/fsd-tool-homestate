import { TextBuilder } from "@/lib/utils";
import { BaseEntry } from "../BaseEntry";
import { useToast } from "@/components/ui/toast";

const { toast } = useToast();

export class Toxi extends BaseEntry {
    akz: string = "";
    gutachter: string = "";
    forName: string = "";
    drugs: IDrug[] = [];

    constructor(data: Partial<Toxi>) {
        super(data);
        this.akz = data.akz || "";
        this.gutachter = data.gutachter || "";
        this.forName = data.forName || "";
        this.drugs = data.drugs || [];
    }

    public copyToClipboard(): void {
        if (!this) return;

        const builder = new TextBuilder();

        builder.addLine("<!-- Titel: [FSD-TXA] Akz. " + this.akz + " Toxikologische Analyse - " + this.drugs.map((x) => x.name).join(", ") + " -->");
        builder.addLine("<!-- Titel: Toxikologische Analyse - " + this.drugs.map((x) => x.name).join(", ") + " -->");
        builder.addLine("");
        builder.addLine("`Datum:` " + formatDate(new Date()));
        builder.addLine("");
        builder.addLine("`Im Auftrag von:` " + this.forName);
        builder.addLine("");
        builder.addLine("---");
        builder.addLine("");
        builder.addLine("    Produkt                Menge                Einheit");
        builder.addLine("```");

        for (const drug of this.drugs) {
            builder.addLine(`- ${drug.name + " ".repeat(21 - drug.name.length)}${drug.amount.toString() + " ".repeat(21 - drug.amount.toString().length)}${drug.unit}`);
        }

        builder.addLine("```");
        builder.addLine("```");
        builder.addLine("davon getestest (10%):");
        builder.addLine("```");
        builder.addLine("```");

        for (const drug of this.drugs) {
            builder.addLine(`- ${drug.name + " ".repeat(21 - drug.name.length)}${drug.tested.toString() + " ".repeat(21 - drug.tested.toString().length)}${drug.unit}`);
        }

        builder.addLine("```");
        builder.addLine("```");
        builder.addLine("weitere Informationen:");
        builder.addLine("```");
        builder.addLine("");
        builder.addLine("---");

        for (const drug of this.drugs) {
            builder.addLine(drug.analyse);
            builder.addLine("---");
            builder.addLine("");
        }

        builder.addLine("`Forensiker:` " + this.gutachter);

        builder.copyClipboard();

        toast({
            title: "Analyse kopiert",
            description: "Die Analyse wurde erfolgreich in deine Zwischenablage kopiert.",
        });
    }
}

export interface IDrug {
    id: string;
    name: string;
    amount: number;
    tested: number;
    unit: string;
    analyse: string;
}

function formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
}
