import { TextBuilder } from "./utils";

export const drugs: {
    name: string;
    analyse: TextBuilder;
    variables: {
        name: string;
        placeholder: string;
    }[];
}[] = [
    {
        name: "Cannabis Samen",
        analyse: new TextBuilder().addLine("`Cannabis Samen:` <br>").addLine("- **Mikroskopische Analyse:** Die äußeren Merkmale der Samen gleichen denen von Cannabis sativa. Auf der Oberfläche der Samen sind typische Trichome erkennbar.").addLine("- **Chemische Analyse:** Ein Farbreaktionstest ergab eine positive Reaktion auf Tetrahydrocannabinol (THC), den hauptsächlichen Wirkstoff von Cannabis.").addLine("- **Quantitative Analyse:** Der THC-Gehalt wurde mittels Gaschromatographie (GC) festgestellt und beträgt &k-g&% des Gesamtgewichts der Cannabis Samen.").addLine("").addLine("`Schlussfolgerung:`").addLine("- Es handelt sich um **Cannabis Samen**. Der THC-Gehalt variierte, was auf verschiedene Cannabis-Sorten hindeutet. In den meisten Fällen wurde ein Spitzenwert von über &k-g&% THC-Gehalt festgestellt."),
        variables: [
            {
                name: "THC Gehalt (In %)",
                placeholder: "&k-g&",
            },
        ],
    },
    {
        name: "Cannabis Knospen",
        analyse: new TextBuilder().addLine("`Cannabis Knospen:` <br>").addLine("- **Mikroskopische Analyse:** Die morphologischen Merkmale der Knospen stimmen mit denen von Cannabis sativa überein. Charakteristische Trichome sind auf der Oberfläche der Knospen sichtbar.").addLine("- **Chemische Analyse:** Ein Farbreaktionstest zeigte eine positive Reaktion auf Tetrahydrocannabinol (THC), den Hauptwirkstoff von Cannabis.").addLine("- **Quantitative Analyse:** Der THC-Gehalt wurde mittels Gaschromatographie (GC) bestimmt und beträgt &k-g&% des Gesamtgewichts der Cannabisknospen.").addLine("").addLine("`Schlussfolgerung:`").addLine("- Es handelt sich um **weibliche Cannabisknospen**. Der THC-Gehalt variierte, was auf verschiedene Cannabis-Sorten hindeutet. In den meisten Fällen wurde ein Spitzenwert von über &k-g&% THC-Gehalt festgestellt."),
        variables: [
            {
                name: "THC Gehalt (In %)",
                placeholder: "&k-g&",
            },
        ],
    },
    {
        name: "Joints",
        analyse: new TextBuilder().addLine("`Joints:` <br>").addLine("- **Chemische Analyse:** Ein Farbreaktionstest zeigte eine positive Reaktion auf Tetrahydrocannabinol (THC), den Hauptwirkstoff von Cannabis.").addLine("- **Mikroskopische Analyse:** Die morphologischen Merkmale der Selbst gedrehten Zigaretten stimmen mit denen von Cannabis sativa überein.").addLine("- **Quantitative Analyse:** Der THC-Gehalt wurde mittels Gaschromatographie (GC) bestimmt und beträgt &k-g&% des Gesamtgewichts.").addLine("").addLine("`Schlussfolgerung:`").addLine("- Die analysierten selbst gedrehten Zigaretten variieren im THC-Gehalt. Die Probe weist einen THC-Gehalt von durchschnittlich &k-g&% auf. THC ist ein psychoaktives Cannabinoid und als Betäubungsmittel klassifiziert. Es handelt sich bei den analysierten selbst gedrehten Zigaretten um Joints."),
        variables: [
            {
                name: "THC Gehalt (In %)",
                placeholder: "&k-g&",
            },
        ],
    },
    {
        name: "Kokain",
        analyse: new TextBuilder().addLine("`Kokain:` <br>").addLine("- **Chemische Analyse:** Ein Farbreaktionstest zeigte eine positive Reaktion auf Kokain.").addLine("- **Mikroskopische Analyse:** Das Pulver zeigt feine kristalline Strukturen, die für Kokain charakteristisch sind.").addLine("- **Quantitative Analyse:** Der Kokain-Gehalt wurde mittels Gaschromatographie bestimmt und beträgt &k-g&% des Gesamtgewichts der Probe.").addLine("- **Analyse von Streckmitteln:** Die restlichen &s-g&% der Probe bestehen aus verschiedenen Streckmitteln, darunter &s&.").addLine("").addLine("`Schlussfolgerung:`").addLine("- Die analysierte Probe enthält &k-g&% Kokain und &s-g&% verschiedene Streckmittel. Kokain ist ein starkes Stimulans, das als Betäubungsmittel eingestuft wird. Streckmittel werden häufig hinzugefügt, um das Volumen der Droge zu erhöhen und den Gewinn zu maximieren, können jedoch gesundheitliche Risiken bergen."),
        variables: [
            {
                name: "Kokain Gehalt (In %)",
                placeholder: "&k-g&",
            },
            {
                name: "Streckmittel Gehalt (In %)",
                placeholder: "&s-g&",
            },
            {
                name: "Streckmittel",
                placeholder: "&s&",
            },
        ],
    },
    {
        name: "Schlauchpilze",
        analyse: new TextBuilder().addLine("`Schlauchpilze:` <br>").addLine("- **Mikroskopische Analyse:** Die morphologischen Merkmale der Pilze stimmen mit denen von Psilocybe semilanceata überein.").addLine("- **Chemische Analyse:** Ein Oxydationstest zeigt eine positive Reaktion auf Psilocybin, den Hauptwirkstoff von Psilocybe semilanceata.").addLine("").addLine("`Schlussfolgerung:`").addLine("- Die analysierten Proben enthalten Pilze der Art Psilocybe semilanceata, welche Psilocybin und Psilocin enthalten, beides psychoaktive Substanzen, die als Betäubungsmittel gelten. Bei den Pilzen handelt es sich um einen Schlauchpilze."),
        variables: [],
    },
    {
        name: "Glatzköpfe",
        analyse: new TextBuilder().addLine("`Glatzköpfe:` <br>").addLine("- **Mikroskopische Analyse:** Die morphologischen Merkmale der Pilze stimmen mit denen von Psilocybe semilanceata überein.").addLine("- **Chemische Analyse:** Ein Oxydationstest zeigt eine positive Reaktion auf Psilocybin, den Hauptwirkstoff von Psilocybe semilanceata.").addLine("").addLine("`Schlussfolgerung:`").addLine("- Die analysierten Proben enthalten Pilze der Art Psilocybe semilanceata, welche Psilocybin und Psilocin enthalten, beides psychoaktive Substanzen, die als Betäubungsmittel gelten. Bei den Pilzen handelt es sich um einen Glatzköpfe."),
        variables: [],
    },
    {
        name: "Heroin",
        analyse: new TextBuilder().addLine("`Heroin:` <br>").addLine("- **Mikroskopische Analyse:** Das Pulver zeigt keine spezifischen morphologischen Merkmale.").addLine("- **Chemische Analyse:** Ein Farbreaktionstest zeigte eine positive Reaktion auf Diacetylmorphin, besser bekannt als Heroin.").addLine("- **Quantitative Analyse:** Der Heroin-Gehalt wurde mittels Gaschromatographie-Massenspektrometrie (GC-MS) bestimmt und beträgt &k-g&% des Gesamtgewichts der Probe.").addLine("- **Analyse von Streckmitteln:** Die restlichen &s-g&% der Probe bestehen aus verschiedenen Streckmitteln, darunter Paracetamol, Koffein und Milchzucker (Laktose).").addLine("").addLine("`Schlussfolgerung:`").addLine("- Die analysierte Probe enthält &k-g&% Heroin und &s-g&% verschiedene Streckmittel. Heroin ist ein starkes Opioid, das als Betäubungsmittel gilt. Streckmittel werden häufig hinzugefügt, um das Volumen der Droge zu erhöhen und den Gewinn zu maximieren, können jedoch gesundheitliche Risiken bergen."),
        variables: [
            {
                name: "Heroin Gehalt (In %)",
                placeholder: "&k-g&",
            },
            {
                name: "Streckmittel Gehalt (In %)",
                placeholder: "&s-g&",
            },
        ],
    },
    {
        name: "LSD",
        analyse: new TextBuilder().addLine("`LSD:` <br>").addLine("- **Mikroskopische Analyse:** Die Papierstücke zeigen keine spezifischen morphologischen Merkmale, sind jedoch typisch für LSD-Blotter.").addLine("- **Chemische Analyse:** Ein Farbreaktionstest zeigte eine positive Reaktion auf Lysergsäurediethylamid, besser bekannt als LSD.").addLine("- **Quantitative Analyse:** Der LSD-Gehalt wurde mittels Gaschromatographie-Massenspektrometrie (GC-MS) bestimmt und beträgt &k-g& µg pro Blotter.").addLine("").addLine("`Schlussfolgerung:`").addLine("- Die analysierten Papierstücke enthalten jeweils &k-g& µg LSD. LSD ist ein starkes Halluzinogen, das als Betäubungsmittel klassifiziert wird und für seine intensiven psychischen Wirkungen bekannt ist."),
        variables: [
            {
                name: "LSD Gehalt (In µg)",
                placeholder: "&k-g&",
            },
        ],
    },
    {
        name: "MDMA",
        analyse: new TextBuilder().addLine("`MDMA:` <br>").addLine("- **Mikroskopische Analyse:** Die Tabletten zeigen charakteristische Prägungen und Farbgebungen, die für MDMA-Tabletten typisch sind.").addLine("- **Chemische Analyse:** Ein Farbreaktionstest zeigte eine positive Reaktion auf 3,4-Methylendioxy-N-methylamphetamin, besser bekannt als MDMA oder 'Ecstasy'.").addLine("- **Quantitative Analyse:** Der MDMA-Gehalt wurde mittels Gaschromatographie-Massenspektrometrie (GC-MS) bestimmt und beträgt &k-g&% des Gesamtgewichts der Tabletten.").addLine("- **Analyse von Streckmitteln:** Die restlichen &s-g&% der Tabletten bestehen aus verschiedenen Streckmitteln, darunter Koffein und Mannitol.").addLine("").addLine("`Schlussfolgerung:`").addLine("- Die analysierten Tabletten enthalten &k-g&% MDMA und &s-g&% verschiedene Streckmittel. MDMA, häufig als 'Ecstasy' bezeichnet, ist ein psychoaktives Stimulans und Empathogen, das als Betäubungsmittel gilt. Streckmittel werden häufig hinzugefügt, um das Volumen der Droge zu erhöhen und den Gewinn zu maximieren, können jedoch gesundheitliche Risiken bergen."),
        variables: [
            {
                name: "MDMA Gehalt (In %)",
                placeholder: "&k-g&",
            },
            {
                name: "Streckmittel Gehalt (In %)",
                placeholder: "&s-g&",
            },
        ],
    },
    {
        name: "Methamphetamin",
        analyse: new TextBuilder().addLine("`Methamphetamin:` <br>").addLine("- **Mikroskopische Analyse:** Das Pulver zeigt charakteristische große Kristalle, die für Methamphetamin typisch sind.").addLine("- **Chemische Analyse:** Ein Farbreaktionstest zeigte eine positive Reaktion auf Methamphetamin.").addLine("- **Quantitative Analyse:** Der Methamphetamin-Gehalt wurde mittels Gaschromatographie-Massenspektrometrie (GC-MS) bestimmt und beträgt &k-g&% des Gesamtgewichts der Probe.").addLine("- **Analyse von Streckmitteln:** Die restlichen &s-g&% der Probe bestehen aus verschiedenen Streckmitteln, darunter Koffein.").addLine("").addLine("`Schlussfolgerung:`").addLine("- Die analysierte Probe enthält &k-g&% Methamphetamin und &s-g&% verschiedenen Streckmitteln, darunter Koffein."),
        variables: [
            {
                name: "Methamphetamin Gehalt (In %)",
                placeholder: "&k-g&",
            },
            {
                name: "Streckmittel Gehalt (In %)",
                placeholder: "&s-g&",
            },
        ],
    },
];
