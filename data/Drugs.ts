import { TextBuilder } from '../lib/utils';

export interface DrugData {
  name: string;
  analyse: string;
  variables: {
    name: string;
    placeholder: string;
  }[];
}

export const drugsData: Ref<
  {
    name: string;
    analyse: string;
    variables: {
      name: string;
      placeholder: string;
    }[];
  }[]
> = ref([
  {
    name: 'Cannabis Samen',
    analyse: new TextBuilder()
      .addLine('`Cannabis Samen:` <br>')
      .addLine(
        '- **Mikroskopische Analyse:** Die Samen zeigen die typische ovale Form und dunkle Musterung, die für Cannabissamen charakteristisch sind..'
      )
      .addLine('- **Chemische Analyse:** Ein Farbreaktionstest ergab keine Reaktion.')
      .addLine(
        '- **Quantitative Analyse:** Es wurde keine signifikante Menge an Tetrahydrocannabinol (THC) oder anderen Cannabinoiden in den Samen nachgewiesen.'
      )
      .addLine('')
      .addLine('`Schlussfolgerung:`')
      .addLine('- Die analysierten Cannabissamen enthalten keine psychoaktiven Substanzen wie THC.')
      .addLine(
        '- Die ausgewachsene Pflanze aus den Samen kann bei geeigneten Anbaubedingungen über einen relevanten THC-Gehalt verfügen.'
      )
      .getAsString(),
    variables: [],
  },
  {
    name: 'Cannabis Knospen',
    analyse: new TextBuilder()
      .addLine('`Cannabis Knospen:` <br>')
      .addLine(
        '- **Mikroskopische Analyse:** Die morphologischen Merkmale der Knospen stimmen mit denen von Cannabis sativa überein. Charakteristische Trichome sind auf der Oberfläche der Knospen sichtbar.'
      )
      .addLine(
        '- **Chemische Analyse:** Ein Farbreaktionstest zeigte eine positive Reaktion auf Tetrahydrocannabinol (THC), den Hauptwirkstoff von Cannabis.'
      )
      .addLine(
        '- **Quantitative Analyse:** Der THC-Gehalt wurde mittels Gaschromatographie (GC) bestimmt und beträgt &k-g&% des Gesamtgewichts der Cannabisknospen.'
      )
      .addLine('')
      .addLine('`Schlussfolgerung:`')
      .addLine(
        '- Es handelt sich um **weibliche Cannabisknospen**. Der THC-Gehalt variierte, was auf verschiedene Cannabis-Sorten hindeutet. In den meisten Fällen wurde ein Spitzenwert von über &k-g&% THC-Gehalt festgestellt.'
      )
      .getAsString(),
    variables: [
      {
        name: 'THC Gehalt (In %)',
        placeholder: '&k-g&',
      },
    ],
  },
  {
    name: 'Joints',
    analyse: new TextBuilder()
      .addLine('`Joints:` <br>')
      .addLine(
        '- **Chemische Analyse:** Ein Farbreaktionstest zeigte eine positive Reaktion auf Tetrahydrocannabinol (THC), den Hauptwirkstoff von Cannabis.'
      )
      .addLine(
        '- **Mikroskopische Analyse:** Die morphologischen Merkmale der Selbst gedrehten Zigaretten stimmen mit denen von Cannabis sativa überein.'
      )
      .addLine(
        '- **Quantitative Analyse:** Der THC-Gehalt wurde mittels Gaschromatographie (GC) bestimmt und beträgt &k-g&% des Gesamtgewichts.'
      )
      .addLine('')
      .addLine('`Schlussfolgerung:`')
      .addLine(
        '- Die analysierten selbst gedrehten Zigaretten variieren im THC-Gehalt. Die Probe weist einen THC-Gehalt von durchschnittlich &k-g&% auf. THC ist ein psychoaktives Cannabinoid und als Betäubungsmittel klassifiziert. Es handelt sich bei den analysierten selbst gedrehten Zigaretten um Joints.'
      )
      .getAsString(),
    variables: [
      {
        name: 'THC Gehalt (In %)',
        placeholder: '&k-g&',
      },
    ],
  },
  {
    name: 'Kokain',
    analyse: new TextBuilder()
      .addLine('`Kokain:` <br>')
      .addLine(
        '- **Chemische Analyse:** Ein Farbreaktionstest zeigte eine positive Reaktion auf Kokain.'
      )
      .addLine(
        '- **Mikroskopische Analyse:** Das Pulver zeigt feine kristalline Strukturen, die für Kokain charakteristisch sind.'
      )
      .addLine(
        '- **Quantitative Analyse:** Der Kokain-Gehalt wurde mittels Gaschromatographie bestimmt und beträgt &k-g&% des Gesamtgewichts der Probe.'
      )
      .addLine(
        '- **Analyse von Streckmitteln:** Die restlichen &s-g&% der Probe bestehen aus verschiedenen Streckmitteln, darunter &s&.'
      )
      .addLine('')
      .addLine('`Schlussfolgerung:`')
      .addLine(
        '- Die analysierte Probe enthält &k-g&% Kokain und &s-g&% verschiedene Streckmittel. Kokain ist ein starkes Stimulans, das als Betäubungsmittel eingestuft wird. Streckmittel werden häufig hinzugefügt, um das Volumen der Droge zu erhöhen und den Gewinn zu maximieren, können jedoch gesundheitliche Risiken bergen.'
      )
      .getAsString(),
    variables: [
      {
        name: 'Kokain Gehalt (In %)',
        placeholder: '&k-g&',
      },
      {
        name: 'Streckmittel Gehalt (In %)',
        placeholder: '&s-g&',
      },
      {
        name: 'Streckmittel',
        placeholder: '&s&',
      },
    ],
  },
  {
    name: 'Schlauchpilze',
    analyse: new TextBuilder()
      .addLine('`Schlauchpilze:` <br>')
      .addLine(
        '- **Mikroskopische Analyse:** Die morphologischen Merkmale der Pilze stimmen mit denen von Psilocybe semilanceata überein.'
      )
      .addLine(
        '- **Chemische Analyse:** Ein Oxydationstest zeigt eine positive Reaktion auf Psilocybin, den Hauptwirkstoff von Psilocybe semilanceata.'
      )
      .addLine('')
      .addLine('`Schlussfolgerung:`')
      .addLine(
        '- Die analysierten Proben enthalten Pilze der Art Psilocybe semilanceata, welche Psilocybin und Psilocin enthalten, beides psychoaktive Substanzen, die als Betäubungsmittel gelten. Bei den Pilzen handelt es sich um einen Schlauchpilze.'
      )
      .getAsString(),
    variables: [],
  },
  {
    name: 'Glatzköpfe',
    analyse: new TextBuilder()
      .addLine('`Glatzköpfe:` <br>')
      .addLine(
        '- **Mikroskopische Analyse:** Die morphologischen Merkmale der Pilze stimmen mit denen von Psilocybe semilanceata überein.'
      )
      .addLine(
        '- **Chemische Analyse:** Ein Oxydationstest zeigt eine positive Reaktion auf Psilocybin, den Hauptwirkstoff von Psilocybe semilanceata.'
      )
      .addLine('')
      .addLine('`Schlussfolgerung:`')
      .addLine(
        '- Die analysierten Proben enthalten Pilze der Art Psilocybe semilanceata, welche Psilocybin und Psilocin enthalten, beides psychoaktive Substanzen, die als Betäubungsmittel gelten. Bei den Pilzen handelt es sich um einen Glatzköpfe.'
      )
      .getAsString(),
    variables: [],
  },
  {
    name: 'Heroin',
    analyse: new TextBuilder()
      .addLine('`Heroin:` <br>')
      .addLine(
        '- **Mikroskopische Analyse:** Das Pulver zeigt keine spezifischen morphologischen Merkmale.'
      )
      .addLine(
        '- **Chemische Analyse:** Ein Farbreaktionstest zeigte eine positive Reaktion auf Diacetylmorphin, besser bekannt als Heroin.'
      )
      .addLine(
        '- **Quantitative Analyse:** Der Heroin-Gehalt wurde mittels Gaschromatographie-Massenspektrometrie (GC-MS) bestimmt und beträgt &k-g&% des Gesamtgewichts der Probe.'
      )
      .addLine(
        '- **Analyse von Streckmitteln:** Die restlichen &s-g&% der Probe bestehen aus verschiedenen Streckmitteln, darunter Paracetamol, Koffein und Milchzucker (Laktose).'
      )
      .addLine('')
      .addLine('`Schlussfolgerung:`')
      .addLine(
        '- Die analysierte Probe enthält &k-g&% Heroin und &s-g&% verschiedene Streckmittel. Heroin ist ein starkes Opioid, das als Betäubungsmittel gilt. Streckmittel werden häufig hinzugefügt, um das Volumen der Droge zu erhöhen und den Gewinn zu maximieren, können jedoch gesundheitliche Risiken bergen.'
      )
      .getAsString(),
    variables: [
      {
        name: 'Heroin Gehalt (In %)',
        placeholder: '&k-g&',
      },
      {
        name: 'Streckmittel Gehalt (In %)',
        placeholder: '&s-g&',
      },
    ],
  },
  {
    name: 'LSD',
    analyse: new TextBuilder()
      .addLine('`LSD:` <br>')
      .addLine(
        '- **Mikroskopische Analyse:** Die Papierstücke zeigen keine spezifischen morphologischen Merkmale, sind jedoch typisch für LSD-Blotter.'
      )
      .addLine(
        '- **Chemische Analyse:** Ein Farbreaktionstest zeigte eine positive Reaktion auf Lysergsäurediethylamid, besser bekannt als LSD.'
      )
      .addLine(
        '- **Quantitative Analyse:** Der LSD-Gehalt wurde mittels Gaschromatographie-Massenspektrometrie (GC-MS) bestimmt und beträgt &k-g& µg pro Blotter.'
      )
      .addLine('')
      .addLine('`Schlussfolgerung:`')
      .addLine(
        '- Die analysierten Papierstücke enthalten jeweils &k-g& µg LSD. LSD ist ein starkes Halluzinogen, das als Betäubungsmittel klassifiziert wird und für seine intensiven psychischen Wirkungen bekannt ist.'
      )
      .getAsString(),
    variables: [
      {
        name: 'LSD Gehalt (In µg)',
        placeholder: '&k-g&',
      },
    ],
  },
  {
    name: 'MDMA',
    analyse: new TextBuilder()
      .addLine('`MDMA:` <br>')
      .addLine(
        '- **Mikroskopische Analyse:** Die Tabletten zeigen charakteristische Prägungen und Farbgebungen, die für MDMA-Tabletten typisch sind.'
      )
      .addLine(
        "- **Chemische Analyse:** Ein Farbreaktionstest zeigte eine positive Reaktion auf 3,4-Methylendioxy-N-methylamphetamin, besser bekannt als MDMA oder 'Ecstasy'."
      )
      .addLine(
        '- **Quantitative Analyse:** Der MDMA-Gehalt wurde mittels Gaschromatographie-Massenspektrometrie (GC-MS) bestimmt und beträgt &k-g&% des Gesamtgewichts der Tabletten.'
      )
      .addLine(
        '- **Analyse von Streckmitteln:** Die restlichen &s-g&% der Tabletten bestehen aus verschiedenen Streckmitteln, darunter Koffein und Mannitol.'
      )
      .addLine('')
      .addLine('`Schlussfolgerung:`')
      .addLine(
        "- Die analysierten Tabletten enthalten &k-g&% MDMA und &s-g&% verschiedene Streckmittel. MDMA, häufig als 'Ecstasy' bezeichnet, ist ein psychoaktives Stimulans und Empathogen, das als Betäubungsmittel gilt. Streckmittel werden häufig hinzugefügt, um das Volumen der Droge zu erhöhen und den Gewinn zu maximieren, können jedoch gesundheitliche Risiken bergen."
      )
      .getAsString(),
    variables: [
      {
        name: 'MDMA Gehalt (In %)',
        placeholder: '&k-g&',
      },
      {
        name: 'Streckmittel Gehalt (In %)',
        placeholder: '&s-g&',
      },
    ],
  },
  {
    name: 'Methamphetamin',
    analyse: new TextBuilder()
      .addLine('`Methamphetamin:` <br>')
      .addLine(
        '- **Mikroskopische Analyse:** Das Pulver zeigt charakteristische große Kristalle, die für Methamphetamin typisch sind.'
      )
      .addLine(
        '- **Chemische Analyse:** Ein Farbreaktionstest zeigte eine positive Reaktion auf Methamphetamin.'
      )
      .addLine(
        '- **Quantitative Analyse:** Der Methamphetamin-Gehalt wurde mittels Gaschromatographie-Massenspektrometrie (GC-MS) bestimmt und beträgt &k-g&% des Gesamtgewichts der Probe.'
      )
      .addLine(
        '- **Analyse von Streckmitteln:** Die restlichen &s-g&% der Probe bestehen aus verschiedenen Streckmitteln, darunter Koffein.'
      )
      .addLine('')
      .addLine('`Schlussfolgerung:`')
      .addLine(
        '- Die analysierte Probe enthält &k-g&% Methamphetamin und &s-g&% verschiedenen Streckmitteln, darunter Koffein.'
      )
      .getAsString(),
    variables: [
      {
        name: 'Methamphetamin Gehalt (In %)',
        placeholder: '&k-g&',
      },
      {
        name: 'Streckmittel Gehalt (In %)',
        placeholder: '&s-g&',
      },
    ],
  },
  {
    name: 'Ibuprofen',
    analyse: new TextBuilder()
      .addLine('`Ibuprofen:` <br>')
      .addLine(
        '- **Mikroskopische Analyse:** Unter dem Mikroskop betrachtet zeigt Ibuprofen Kristalle welche eine charakteristische Struktur mit kleinen prismenartigen und nadelähnlichen Kristallen, die eine regelmäßige geometrische Form aufweisen. Diese Kristalle erscheinen teilweise farblos oder blass, und sie variieren in Größe und Form.'
      )
      .addLine(
        '- **Chemische Analyse:** Bei einem Farbtest zeigte sich keine Reaktion, was darauf hinweist, dass es sich nicht um Drogen, sondern um normales Ibuprofen handelt.'
      )
      .addLine(
        '- **Quantitative Analyse:** Die untersuchte Probe besteht aus reinem Ibuprofen als Arzneimittel, das zur Schmerzlinderung eingesetzt werden kann.'
      )
      .addLine('')
      .addLine('`Schlussfolgerung:`')
      .addLine(
        '- Die untersuchte Probe ist frei verkäufliches Ibuprofen als Schmerzmittel, das zur Linderung von Kopfschmerzen, Zahnschmerzen, Regelschmerzen und Muskelschmerzen eingesetzt wird. Es handelt sich hierbei um ein legales Produkt.'
      )
      .getAsString(),
    variables: [],
  },
  {
    name: 'Sudafed',
    analyse: new TextBuilder()
      .addLine('`Sudafed:` <br>')
      .addLine('')
      .addLine('**Einführung:**')
      .addLine('')
      .addLine(
        '- Sudafed ist ein Medikament, das zur Linderung von Nasenverstopfung verwendet wird. Der Hauptwirkstoff von Sudafed ist Pseudoephedrin. Diese Analyse untersucht die chemischen Eigenschaften, das Missbrauchspotenzial, die rechtlichen Aspekte sowie die forensischen Erkennungsmethoden von Sudafed und seinem Hauptbestandteil Pseudoephedrin.'
      )
      .addLine('')
      .addLine('---')
      .addLine('')
      .addLine('**Zusammensetzung von Sudafed:**')
      .addLine('')
      .addLine('**Hauptwirkstoff:**')
      .addLine(
        '- **Pseudoephedrin:** Ein Sympathomimetikum, das die Freisetzung von Noradrenalin fördert, was zu einer Vasokonstriktion führt und die Schwellung der Nasenschleimhäute reduziert.'
      )
      .addLine('')
      .addLine('**Weitere Bestandteile (Hilfsstoffe):**')
      .addLine('')
      .addLine(
        '- **Bindemittel:** Hilfsstoffe, die die Form und Konsistenz der Tablette sicherstellen.'
      )
      .addLine(
        '- **Füllstoffe:** Substanzen wie Lactose oder mikrokristalline Cellulose, die die Tablette auffüllen.'
      )
      .addLine(
        '- **Farbstoffe:** Für die visuelle Unterscheidung und zur Erhöhung der Patientenakzeptanz.'
      )
      .addLine('- **Konservierungsmittel:** Zur Verlängerung der Haltbarkeit.')
      .addLine('- **Überzugsmittel:** Um die Tablette leichter schluckbar zu machen.')
      .addLine('')
      .addLine('**Chemische Eigenschaften und Pharmakokinetik von Pseudoephedrin:**')
      .addLine('')
      .addLine('**Struktur:**')
      .addLine('')
      .addLine('- Chemisch verwandt mit Amphetaminen.')
      .addLine(
        '- **Wirkung:** Fördert die Freisetzung von Noradrenalin, führt zu Vasokonstriktion und reduziert Schwellung der Nasenschleimhäute.'
      )
      .addLine(
        '- **Pharmakokinetik:** Halbwertszeit 5-8 Stunden, Ausscheidung hauptsächlich über die Nieren.'
      )
      .addLine(
        '- Pseudoephedrin ist ein bekannter Vorläuferstoff für die Herstellung von Methamphetamin, was Sudafed zu einem Ziel illegaler Aktivitäten macht.'
      )
      .addLine('')
      .addLine('**Methamphetamin-Produktion:**')
      .addLine(
        '- Pseudoephedrin ist ein bekannter Vorläuferstoff für die Herstellung von Methamphetamin, was Sudafed zu einem Ziel illegaler Aktivitäten macht.'
      )
      .addLine('')
      .addLine('**Selbstmedikation:**')
      .addLine(
        '- Überdosierungen können toxische Wirkungen hervorrufen und sind forensisch relevant.'
      )
      .addLine('')
      .addLine('**Fazit:**')
      .addLine(
        '- Sudafed bietet bedeutenden therapeutischen Nutzen, birgt jedoch auch erhebliches Missbrauchspotenzial. Forensische Analysen und strenge rechtliche Regulierungen sind entscheidend, um den Missbrauch, insbesondere die illegale Methamphetamin-Produktion, zu verhindern und strafrechtlich zu verfolgen.'
      )
      .addLine('')
      .getAsString(),
    variables: [],
  },
]);
