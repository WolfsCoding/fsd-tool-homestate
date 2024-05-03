import { TextBuilder } from "@/lib/utils";
import { BaseEntry } from "../BaseEntry";
import { useToast } from "@/components/ui/toast";

const { toast } = useToast();

export interface IStichwaffe {
    id: string;
    name: string;
    dnas: string[];
}

export class Stichwaffen extends BaseEntry {
    akz: string = "";
    gutachter: string = "";
    weapons: IStichwaffe[] = [];

    constructor(data: Partial<Stichwaffen>) {
        super(data);
        Object.assign(this, data);
    }

    public copyToClipboard(): void {
        if (!this) return;
        const textBuilder = new TextBuilder();

        textBuilder.copyClipboard();

        const maxDnaCount = Math.max(...this.weapons.map((x) => x.dnas.length));

        textBuilder.addLine("<!-- Titel: [FSD - FA] Akz. " + this.akz + " - " + (this.weapons.length > 2 ? "Hieb und Stichwaffen" : this.weapons.map((x) => x.name).join(", ")) + " -->");
        textBuilder.addLine("<!-- Titel: Forensiche Analyse - " + (this.weapons.length > 2 ? "Hieb und Stichwaffen" : this.weapons.map((x) => x.name).join(", ")) + " -->");
        textBuilder.addLine("");
        textBuilder.addLine("| Name des Täters | Tatwaffe | " + Array.from({ length: maxDnaCount }, (_, i) => "DNA " + (i + 1)).join(" | ") + " |");
        textBuilder.addLine("|---|---|" + Array.from({ length: maxDnaCount }, () => "---").join("|") + "|");
        textBuilder.addLine("| " + this.gutachter + " | " + this.weapons.map((x) => x.name).join(", ") + " | " + this.weapons.map((x) => x.dnas.join(" | ")).join(" | ") + " |");
        textBuilder.addLine("");
        textBuilder.addLine("---");
        textBuilder.addLine("");
        textBuilder.addLine("`Gutachter:`" + this.gutachter);

        textBuilder.copyClipboard();

        toast({
            title: "Analyse kopiert",
            description: "Das Analyse wurde erfolgreich in deine Zwischenablage kopiert.",
        });
    }
}