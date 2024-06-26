import { TextBuilder } from '@/lib/utils';
import { BaseEntry } from '../BaseEntry';
import { useDate } from '@/lib/hooks/Date';
import { toast } from 'vue-sonner';

const { getFormattedDate } = useDate();

export class DNA extends BaseEntry {
  akz: string = '';
  gutachter: string = '';
  forName: string = '';
  dnas: IDNA[] = [];

  constructor(data: Partial<DNA>) {
    super(data);
    this.akz = data.akz || '';
    this.gutachter = data.gutachter || '';
    this.forName = data.forName || '';
    this.dnas = data.dnas || [];
  }

  public copyToClipboard(): void {
    if (!this) return;

    const builder = new TextBuilder();

    builder.addLine(
      '<!-- Titel: [FSD-FA] Az. ' +
        this.akz +
        ' DNA Probe - ' +
        this.dnas.map((x) => x.name).join(', ') +
        ' -->'
    );
    builder.addLine('<!-- Titel: DNA Probe - ' + this.dnas.map((x) => x.name).join(', ') + ' -->');
    builder.addLine('');
    builder.addLine(
      '`Datum:` ' + getFormattedDate(this.createdAt, 'DD.MM.YYYY - HH:mm Uhr') + '<br>'
    );
    builder.addLine('`Forensiker:` ' + this.gutachter + '<br>');
    builder.addLine('`Im Auftrag von:` ' + this.forName + '<br>');
    builder.addLine('');
    builder.addLine('---');
    builder.addLine('');
    builder.addLine('```');
    builder.addLine('  Probe               Namentliche Treffer in der Datenbank');
    builder.addLine('```');
    builder.addLine('');
    builder.addLine('```');

    for (const dna of this.dnas) {
      builder.addLine(
        `- ${dna.dnaType + ' '.repeat(20 - dna.dnaType.length)}${dna.name.toString()}`
      );
    }

    builder.addLine('```');

    builder.copyClipboard();

    toast('Analyse kopiert', {
      description: 'Die Analyse wurde erfolgreich in deine Zwischenablage kopiert.',
    });
  }
}

export interface IDNA {
  id: string;
  dnaType: 'Fingerabdruck' | 'Blut' | 'Speichel';
  name: string;
}
