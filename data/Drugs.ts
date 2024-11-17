import { TextBuilder } from '@/lib/utils';

export interface DrugData {
  name: string;
  analyse: string;
  schlussfolgerung: string;
  variables: {
    name: string;
    placeholder: string;
  }[];
}

export const drugsData: Ref<
  {
    name: string;
    analyse: string;
    schlussfolgerung: string;
    variables: {
      name: string;
      placeholder: string;
    }[];
  }[]
> = ref([
  {
    name: 'Cannabis Samen',
    analyse: new TextBuilder()
      .addLine('```')
      .addLine('Cannabis Samen:')
      .addLine('```')
      .addLine(
        '- **Mikroskopische Analyse:** Die Samen zeigen die typische ovale Form und dunkle Musterung, die für Cannabissamen charakteristisch sind.'
      )
      .addLine('- **Chemische Analyse:** Ein Farbreaktionstest ergab keine Reaktion.')
      .addLine(
        '- **Quantitative Analyse:** Es wurde keine signifikante Menge an Tetrahydrocannabinol (THC) oder anderen Cannabinoiden in den Samen nachgewiesen.'
      )
      .getAsString(),
    schlussfolgerung: '- Die analysierten Cannabissamen enthalten keine psychoaktiven Substanzen wie THC. Die ausgewachsene Pflanze aus den Samen kann bei geeigneten Anbaubedingungen über einen relevanten THC-Gehalt verfügen.',
    variables: []
  },
  {
    name: 'Cannabis Knospen',
    analyse: new TextBuilder()
      .addLine('```')
      .addLine('Cannabis Knospen:')
      .addLine('```')
      .addLine(
        '- **Chemische Analyse:** Ein Farbreaktionstest färbte sich grün, was eine positive Reaktion auf Tetrahydrocannabinol (THC), den Hauptwirkstoff von Cannabis, darstellt.'
      )
      .addLine(
        '- **Mikroskopische Analyse:** Die morphologischen Merkmale der Knospen stimmen mit denen von Cannabis sativa überein. Charakteristische Trichome sind auf der Oberfläche der Knospen sichtbar.'
      )
      .addLine(
        '- **Quantitative Analyse:** Der THC-Gehalt wurde mittels Gaschromatographie (GC) bestimmt und beträgt &k-g&% des Gesamtgewichts der Cannabisknospen.'
      )
      .getAsString(),
    schlussfolgerung: '- Es handelt sich um **weibliche Cannabisknospen**. Der THC-Gehalt variierte, was auf verschiedene Cannabis-Sorten hindeutet. In den meisten Fällen wurde ein Spitzenwert von über &k-g&% THC-Gehalt festgestellt.',
    variables: [
      {
        name: 'THC Gehalt (In %)',
        placeholder: '&k-g&'
      }
    ]
  },
  {
    name: 'Joints',
    analyse: new TextBuilder()
      .addLine('```')
      .addLine('Joints:')
      .addLine('```')
      .addLine(
        '- **Chemische Analyse:** Ein Farbreaktionstest färbte sich grün, was eine positive Reaktion auf Tetrahydrocannabinol (THC), den Hauptwirkstoff von Cannabis, darstellt.'
      )
      .addLine(
        '- **Mikroskopische Analyse:** Die morphologischen Merkmale der Selbst gedrehten Zigaretten stimmen mit denen von Cannabis sativa überein.'
      )
      .addLine(
        '- **Quantitative Analyse:** Der THC-Gehalt wurde mittels Gaschromatographie (GC) bestimmt und beträgt &k-g&% des Gesamtgewichts.'
      )
      .getAsString(),
    schlussfolgerung: '- Die analysierten selbst gedrehten Zigaretten variieren im THC-Gehalt. Die Probe weist einen THC-Gehalt von durchschnittlich &k-g&% auf. THC ist ein psychoaktives Cannabinoid und als Betäubungsmittel klassifiziert. Es handelt sich bei den analysierten selbst gedrehten Zigaretten um Joints.',
    variables: [
      {
        name: 'THC Gehalt (In %)',
        placeholder: '&k-g&'
      }
    ]
  },
  {
    name: 'Kokain',
    analyse: new TextBuilder()
      .addLine('```')
      .addLine('Kokain:')
      .addLine('```')
      .addLine(
        '- **Chemische Analyse:** Ein Farbreaktionstest färbte sich rote, was eine positive Reaktion auf Kokain darstellt.'
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
      .getAsString(),
    schlussfolgerung: '- Die analysierte Probe enthält &k-g&% Kokain und &s-g&% verschiedene Streckmittel. Kokain ist ein starkes Stimulans, das als Betäubungsmittel eingestuft wird. Streckmittel werden häufig hinzugefügt, um das Volumen der Droge zu erhöhen und den Gewinn zu maximieren, können jedoch gesundheitliche Risiken bergen.',
    variables: [
      {
        name: 'Kokain Gehalt (In %)',
        placeholder: '&k-g&'
      },
      {
        name: 'Streckmittel Gehalt (In %)',
        placeholder: '&s-g&'
      },
      {
        name: 'Streckmittel',
        placeholder: '&s&'
      }
    ]
  },
  {
    name: 'Schlauchpilze',
    analyse: new TextBuilder()
      .addLine('```')
      .addLine('Schlauchpilze:')
      .addLine('```')
      .addLine(
        '- **Chemische Analyse:** Ein Oxydationstest zeigt eine positive Reaktion auf Psilocybin.'
      )
      .addLine(
        '- **Mikroskopische Analyse:** Die morphologischen Merkmale der Pilze stimmen mit denen von Psilocybe semilanceata überein.'
      )
      .getAsString(),
    schlussfolgerung: '- Die analysierten Proben enthalten Pilze der Art Schlauchpilze, welche Psilocybin enthalten, dies ist eine psychoaktive Substanzen, die als Betäubungsmittel gilt.',
    variables: []
  },
  {
    name: 'Glatzköpfe',
    analyse: new TextBuilder()
      .addLine('```')
      .addLine('Glatzköpfe:')
      .addLine('```')
      .addLine(
        '- **Chemische Analyse:** Ein Oxydationstest zeigt eine positive Reaktion auf Psilocybin.'
      )
      .addLine(
        '- **Mikroskopische Analyse:** Die morphologischen Merkmale der Pilze stimmen mit denen von Psilocybe semilanceata überein.'
      )
      .getAsString(),
    schlussfolgerung: '- Die analysierten Proben enthalten Pilze der Art Schlauchpilze, welche Psilocybin enthalten, dies ist eine psychoaktive Substanzen, die als Betäubungsmittel gilt.',
    variables: []
  },
  {
    name: 'Heroin',
    analyse: new TextBuilder()
      .addLine('```')
      .addLine('Heroin:')
      .addLine('```')
      .addLine(
        '- **Chemische Analyse:** Ein Farbreaktionstest färbte sich bräunlich, was eine positive Reaktion auf Heroin darstellt.'
      )
      .addLine(
        '- **Mikroskopische Analyse:** Das Pulver zeigt keine spezifischen morphologischen Merkmale.'
      )
      .addLine(
        '- **Quantitative Analyse:** Der Heroin-Gehalt wurde mittels Gaschromatographie-Massenspektrometrie (GC-MS) bestimmt und beträgt &k-g&% des Gesamtgewichts der Probe.'
      )
      .addLine(
        '- **Analyse von Streckmitteln:** Die restlichen &s-g&% der Probe bestehen aus verschiedenen Streckmitteln, darunter Paracetamol, Koffein und Milchzucker (Laktose).'
      )
      .getAsString(),
    schlussfolgerung: '- Die analysierte Probe enthält &k-g&% Heroin und &s-g&% verschiedene Streckmittel. Heroin ist ein starkes Opioid, das als Betäubungsmittel gilt. Streckmittel werden häufig hinzugefügt, um das Volumen der Droge zu erhöhen und den Gewinn zu maximieren, können jedoch gesundheitliche Risiken bergen.',
    variables: [
      {
        name: 'Heroin Gehalt (In %)',
        placeholder: '&k-g&'
      },
      {
        name: 'Streckmittel Gehalt (In %)',
        placeholder: '&s-g&'
      }
    ]
  },
  {
    name: 'LSD',
    analyse: new TextBuilder()
      .addLine('```')
      .addLine('LSD:')
      .addLine('```')
      .addLine(
        '- **Chemische Analyse:** Ein Farbreaktionstest färbte sich blau, was eine positive Reaktion auf LSD darstellt.'
      )
      .addLine(
        '- **Mikroskopische Analyse:** Die Papierstücke zeigen keine spezifischen morphologischen Merkmale, sind jedoch typisch für LSD-Blotter.'
      )
      .addLine(
        '- **Quantitative Analyse:** Der LSD-Gehalt wurde mittels Gaschromatographie-Massenspektrometrie (GC-MS) bestimmt und beträgt &k-g& µg pro Blotter.'
      )
      .getAsString(),
    schlussfolgerung: '- Die analysierten Papierstücke enthalten jeweils &k-g& µg LSD. LSD ist ein starkes Halluzinogen, das als Betäubungsmittel klassifiziert wird und für seine intensiven psychischen Wirkungen bekannt ist.',
    variables: [
      {
        name: 'LSD Gehalt (In µg)',
        placeholder: '&k-g&'
      }
    ]
  },
  {
    name: 'MDMA',
    analyse: new TextBuilder()
      .addLine('```')
      .addLine('MDMA:')
      .addLine('```')
      .addLine(
        '- **Chemische Analyse:** Ein Farbreaktionstest färbte sich lila, was eine positive Reaktion auf MDMA auch bekannt unter Ectasy darstellt.'
      )
      .addLine(
        '- **Mikroskopische Analyse:** Die Tabletten zeigen charakteristische Prägungen und Farbgebungen, die für MDMA-Tabletten typisch sind.'
      )
      .addLine(
        '- **Quantitative Analyse:** Der MDMA-Gehalt wurde mittels Gaschromatographie-Massenspektrometrie (GC-MS) bestimmt und beträgt &k-g&% des Gesamtgewichts der Tabletten.'
      )
      .addLine(
        '- **Analyse von Streckmitteln:** Die restlichen &s-g&% der Tabletten bestehen aus verschiedenen Streckmitteln, darunter Koffein und Mannitol.'
      ).getAsString(),
    schlussfolgerung: '- Die analysierten Tabletten enthalten &k-g&% MDMA und &s-g&% verschiedene Streckmittel. MDMA, häufig als \'Ecstasy\' bezeichnet, ist ein psychoaktives Stimulans und Empathogen, das als Betäubungsmittel gilt. Streckmittel werden häufig hinzugefügt, um das Volumen der Droge zu erhöhen und den Gewinn zu maximieren, können jedoch gesundheitliche Risiken bergen.',
    variables: [
      {
        name: 'MDMA Gehalt (In %)',
        placeholder: '&k-g&'
      },
      {
        name: 'Streckmittel Gehalt (In %)',
        placeholder: '&s-g&'
      }
    ]
  },
  {
    name: 'Methamphetamin',
    analyse: new TextBuilder()
      .addLine('```')
      .addLine('Methamphetamin:')
      .addLine('```')
      .addLine(
        '- **Chemische Analyse:** Ein Farbreaktionstest färbte sich pfirsichfarbend, was eine positive Reaktion auf Methamphetamin darstellt.'
      )
      .addLine(
        '- **Mikroskopische Analyse:** Das Pulver zeigt charakteristische große Kristalle, die für Methamphetamin typisch sind.'
      )
      .addLine(
        '- **Quantitative Analyse:** Der Methamphetamin-Gehalt wurde mittels Gaschromatographie-Massenspektrometrie (GC-MS) bestimmt und beträgt &k-g&% des Gesamtgewichts der Probe.'
      )
      .addLine(
        '- **Analyse von Streckmitteln:** Die restlichen &s-g&% der Probe bestehen aus verschiedenen Streckmitteln, darunter Koffein.'
      )
      .getAsString(),
    schlussfolgerung: '- Die analysierte Probe enthält &k-g&% Methamphetamin und &s-g&% verschiedenen Streckmitteln, darunter Koffein.',
    variables: [
      {
        name: 'Methamphetamin Gehalt (In %)',
        placeholder: '&k-g&'
      },
      {
        name: 'Streckmittel Gehalt (In %)',
        placeholder: '&s-g&'
      }
    ]
  },
  {
    name: 'Maische',
    analyse: new TextBuilder()
      .addLine('```')
      .addLine('Maische:')
      .addLine('```')
      .addLine('`Bestandteile:`')
      .addLine(
        '- Mais'
      )
      .addLine(
        '- Zucker'
      )
      .addLine(
        '- Wasser'
      )
      .addLine('`Ergebnisse:`')
      .addLine(
        '- **Chemische Analyse:** Es wurde eine chemische Analyse durchgeführt, um die Zusammensetzung des Alkohols zu bestimmen. Ergebnisse deuten auf eine Mischung aus Mais, Wasser, Zucker und Hefe hin.'
      )
      .addLine(
        '- **Mikroskopische Analyse:** Es wurden mikroskopische Untersuchungen durchgeführt, um Verunreinigungen und ungewöhnliche Bestandteile zu identifizieren. Ergebnisse weisen Maiszellen und Hefebakterien auf.'
      )
      .addLine(
        '- **Quantitative Analyse:** Eine quantitative Analyse wurde durchgeführt, um den Alkoholgehalt und mögliche Giftstoffe zu bestimmen. Ergebnisse zeigen einen Gehalt von &e-g&% Ethanol (Alkohol) und &m-g&% Methanol (Methylalkohol).'
      )
      .getAsString(),
    schlussfolgerung: '- Die untersuchten Proben weisen einen für Moonshine Maische üblichen Ethanol und Methanol gehalt auf. Die zusammensetzung der Maische und der Methanolgehalt weisen daraufhin das diese für die Produktion von Moonshine hergestellt wurde.',
    variables: [
      {
        name: 'Ethanol Gehalt (In %)',
        placeholder: '&e-g&'
      },
      {
        name: 'Methanol Gehalt (In %)',
        placeholder: '&m-g&'
      }
    ]
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
      .getAsString(),
    schlussfolgerung: '- Die untersuchte Probe ist frei verkäufliches Ibuprofen als Schmerzmittel, das zur Linderung von Kopfschmerzen, Zahnschmerzen, Regelschmerzen und Muskelschmerzen eingesetzt wird. Es handelt sich hierbei um ein legales Produkt.',
    variables: []
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
      .getAsString(),
    schlussfolgerung: '- Sudafed bietet bedeutenden therapeutischen Nutzen, birgt jedoch auch erhebliches Missbrauchspotenzial. Forensische Analysen und strenge rechtliche Regulierungen sind entscheidend, um den Missbrauch, insbesondere die illegale Methamphetamin-Produktion, zu verhindern und strafrechtlich zu verfolgen.',
    variables: []
  }
]);
