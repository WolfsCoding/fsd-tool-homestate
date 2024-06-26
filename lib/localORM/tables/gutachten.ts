import { TextBuilder } from '@/lib/utils';
import { BaseEntry } from '../BaseEntry';
import { toast } from 'vue-sonner';

export interface IWeapon {
  id: string;
  name: string;
  model: string;
  serial: string;
  schmauchspuren: boolean;
  zustand: string;
  munition: number;
}

export interface ISchnmauchspuren {
  id: string;
  name: string;
  schmauchspuren: boolean;
}

export interface IGutachten {
  akz: string;
  gutachter: string;
  weapons: IWeapon[];
  schmauchspuren: ISchnmauchspuren[];
}

export class Gutachten extends BaseEntry {
  akz: string = '';
  gutachter: string = '';
  weapons: IWeapon[] = [];
  schmauchspuren: ISchnmauchspuren[] = [];

  constructor(data: Partial<Gutachten>) {
    super(data);
    this.akz = data.akz || '';
    this.gutachter = data.gutachter || '';
    this.weapons = data.weapons || [];
    this.schmauchspuren = data.schmauchspuren || [];
  }

  public copyToClipboard(): void {
    if (!this) return;
    const textBuilder = new TextBuilder();

    textBuilder.addLine(
      '<!-- Titel: [FSD - BA] Az. ' +
        this.akz +
        ' - ' +
        (this.weapons.length <= 2
          ? this.weapons.map((weapon) => weapon.model).join(', ')
          : 'Schusswaffen') +
        ' -->'
    );
    textBuilder.addLine(
      '<!-- Titel: Ballistisches Gutachten - ' +
        (this.weapons.length <= 2
          ? this.weapons.map((weapon) => weapon.model).join(', ')
          : 'Schusswaffen') +
        ' -->'
    );
    textBuilder.addLine('');
    textBuilder.addLine(
      '| Name | Schusswaffe | Modell | Seriennummer | Schmauchspuren |  Zustand | Munition'
    );
    textBuilder.addLine('|--------|--------|--------|--------|--------|--------|--------|');

    for (const weapon of this.weapons) {
      textBuilder.addLine(
        `| ${weapon.name} | Ja | ${weapon.model} | ${weapon.serial} | ${
          weapon.schmauchspuren ? 'Ja' : 'Nein'
        } | ${weapon.zustand === 'warm' ? 'Warm' : 'Kalt'} | ${weapon.munition} Schuss Geladen |`
      );
    }

    if (this.schmauchspuren.length > 0) {
      textBuilder.addLine('');
      textBuilder.addLine('---');
      textBuilder.addLine('');
      textBuilder.addLine('`Schmauchspuren Tests:`');
      textBuilder.addLine('');

      for (const schmauchspuren of this.schmauchspuren) {
        textBuilder.addLine(
          '- Schmauchspuren Test von **' +
            schmauchspuren.name +
            '** » **Ergebnis:** ' +
            (schmauchspuren.schmauchspuren
              ? '<font color=#004225><b>POSITIV</b></font>'
              : '<font color=#8d1d2c><b>NEGATIV</b></font>')
        );
      }
    }

    textBuilder.addLine('');
    textBuilder.addLine('---');
    textBuilder.addLine('');
    textBuilder.addLine(`Gutachter: ${this.gutachter}`);

    textBuilder.copyClipboard();

    toast('Gutachten kopiert', {
      description: 'Das Gutachten wurde erfolgreich in deine Zwischenablage kopiert.',
    });
  }
}

export const WeaponNames: { title: string; models: string[] }[] = [
  { title: 'Keckler&Loch', models: ['P1T3', '45 Compact'] },
  { title: 'FN', models: ['FNX-45'] },
  { title: 'Müller&Wesseon', models: ['MW2023'] },
  { title: 'Maurus', models: ['PT92F'] },
  { title: 'Schlock', models: ['69'] },
  { title: 'Schalter', models: ['P88 Compact'] },
  { title: 'Fuger', models: ['SR40'] },
  { title: 'Bretta', models: ['M9'] },
  { title: 'Lukarev', models: ['TT-33'] },
  { title: 'Sonstige', models: ['Pistole', 'Pistole 50', 'Zusammengebastelte Pistole'] },
];
