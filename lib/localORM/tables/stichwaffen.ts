import { TextBuilder } from '@/lib/utils';
import { BaseEntry } from '../BaseEntry';
import { toast } from 'vue-sonner';

export interface IStichwaffe {
  id: string;
  from: string;
  name: string;
  dnas: string[];
}

export class Stichwaffen extends BaseEntry {
  akz: string = '';
  gutachter: string = '';
  weapons: IStichwaffe[] = [];

  constructor(data: Partial<Stichwaffen>) {
    super(data);

    this.akz = data.akz || '';
    this.gutachter = data.gutachter || '';
    this.weapons = data.weapons || [];
  }

  public copyToClipboard(): void {
    if (!this) return;
    const textBuilder = new TextBuilder();

    textBuilder.copyClipboard();

    const maxDnaCount = Math.max(...this.weapons.map((x) => x.dnas.length));

    textBuilder.addLine(
      '<!-- Titel: [FSD - FA] Az. ' +
        this.akz +
        ' - ' +
        (this.weapons.length > 2
          ? 'Hieb und Stichwaffen'
          : this.weapons.map((x) => x.name).join(', ')) +
        ' -->'
    );
    textBuilder.addLine(
      '<!-- Titel: Forensiche Analyse - ' +
        (this.weapons.length > 2
          ? 'Hieb und Stichwaffen'
          : this.weapons.map((x) => x.name).join(', ')) +
        ' -->'
    );
    textBuilder.addLine('');
    textBuilder.addLine(
      '| Name des Täters | Tatwaffe | ' +
        Array.from({ length: maxDnaCount }, (_, i) => 'DNA ' + (i + 1)).join(' | ') +
        ' |'
    );
    textBuilder.addLine(
      '|---|---|' + Array.from({ length: maxDnaCount }, () => '---').join('|') + '|'
    );

    for (const weapon of this.weapons) {
      textBuilder.addLine(
        '| ' + weapon.from + ' | ' + weapon.name + ' | ' + weapon.dnas.join(' | ') + ' |'
      );
    }

    textBuilder.addLine('');
    textBuilder.addLine('---');
    textBuilder.addLine('');
    textBuilder.addLine('`Gutachter:`' + this.gutachter);

    textBuilder.copyClipboard();

    toast('Analyse kopiert', {
      description: 'Die Analyse wurde erfolgreich in deine Zwischenablage kopiert.',
    });
  }
}
