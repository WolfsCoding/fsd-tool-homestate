import { TextBuilder } from '@/lib/utils';
import { BaseEntry } from '../BaseEntry';
import { toast } from 'vue-sonner';

export class Toxi extends BaseEntry {
  akz: string = '';
  gutachter: string = '';
  forName: string = '';
  fromName: string = '';
  drugs: IDrug[] = [];

  constructor(data: Partial<Toxi>) {
    super(data);
    this.akz = data.akz || '';
    this.gutachter = data.gutachter || '';
    this.forName = data.forName || '';
    this.fromName = data.fromName || '';
    this.drugs = data.drugs || [];
  }

  public copyToClipboard(): void {
    if (!this) return;

    const builder = new TextBuilder();

    builder.addLine(
      '<!-- Titel: [FSD-TXA] Az. ' +
        this.akz +
        ' - ' +
        this.drugs.map((x) => x.name).join(', ') +
        ' -->'
    );
    builder.addLine(
      '<!-- Titel: Toxikologische Analyse - ' + this.drugs.map((x) => x.name).join(', ') + ' -->'
    );
    builder.addLine('');
    builder.addLine('`Datum:`' + formatDate(this.updatedAt || new Date()) + '<br>');
    builder.addLine('`Forensiker:`' + this.gutachter + '<br>');
    builder.addLine('`Im Auftrag von:`' + this.forName + '<br>');
    builder.addLine('`Abgenommen von:`' + this.fromName + '<br>');
    builder.addLine('');
    builder.addLine('---');
    builder.addLine('');
    builder.addLine('    Produkt                Menge                Einheit');
    builder.addLine('```');

    for (const drug of this.drugs) {
      builder.addLine(
        `- ${drug.name + ' '.repeat(21 - drug.name.length)}${
          drug.amount.toString() + ' '.repeat(21 - drug.amount.toString().length)
        }${drug.unit}`
      );
    }

    builder.addLine('```');
    builder.addLine('---');
    builder.addLine('`davon getestet (10%):`');
    builder.addLine('```');
    builder.addLine('    Produkt                Menge                Einheit');
    builder.addLine('```');
    builder.addLine('```');

    for (const drug of this.drugs) {
      builder.addLine(
        `- ${drug.name + ' '.repeat(21 - drug.name.length)}${
          drug.tested.toString() + ' '.repeat(21 - drug.tested.toString().length)
        }${drug.unit}`
      );
    }

    builder.addLine('```');
    builder.addLine('');
    builder.addLine('---');

    for (const drug of this.drugs) {
      builder.addLine(drug.analyse);
      builder.addLine('');
    }

    builder.addLine('---');
    builder.addLine('```');
    builder.addLine('Schlussfolgerung:');
    builder.addLine('```');
    for (const drug of this.drugs) {
      builder.addLine(
        '`' + drug.name + '` '
      );
      builder.addLine(drug.schlussfolgerung);
    }

    builder.addLine('---');
    builder.addLine('```');
    builder.addLine('Bemerkung:');
    builder.addLine('```');

    builder.copyClipboard();

    toast('Analyse kopiert', {
      description: 'Die Analyse wurde erfolgreich in deine Zwischenablage kopiert.',
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
  schlussfolgerung: string;
}

function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}
