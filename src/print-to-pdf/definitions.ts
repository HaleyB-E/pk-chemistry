import { IPrintConfig } from "../helpers/entities";
import { Images } from "../helpers/makers-mark-list";

export function typeLookup(type: string) {
  switch (type) {
    case 'Magic':
      return 'Can be resisted with a spellshield';
    case 'Active Magic':
      return 'Can be resisted with a spellshield';
    case 'Powder':
      return 'Cast as a packet. Expires in 5 minutes or when packet is set down';
    case 'Weapon Augment':
      return 'Applied as an augment to a weapon';
    case 'Poison':
      return 'Can be cured with a purify';
    case 'Drug':
      return 'Can be cured with a purify';
    case 'Malady':
      return 'Cannot be cured or resisted by any rulebook skills';
    case 'Curse':
      return 'Cannot be cured or resisted by any rulebook skills. Can be destroyed';
    case 'Active Curse':
      return 'Cannot be cured or resisted by any rulebook skills. Can be destroyed';
    case 'Remedy':
      return 'Cannot be resisted with rulebook skills';
    case 'Irresistable':
      return 'Cannot be resisted';
    default:
      return '';
  };
};

export const fontConfig = {
  Milonga: {
    normal: 'Milonga-Regular.ttf',
    bold: 'Milonga-Regular.ttf',
    italics: 'Milonga-Regular.ttf',
    bolditalics: 'Milonga-Regular.ttf'
  },
  Alchemy: {
    normal: 'Alchemy-Regular.TTF',
    bold: 'Alchemy-Regular.TTF',
    italics: 'Alchemy-Regular.TTF',
    bolditalics: 'Alchemy-Regular.TTF'
  },
  Arial: {
    normal: 'arial.ttf',
    bold: 'arialb.ttf',
    italics: 'ariali.ttf',
    bolditalics: 'arialbi.ttf'
  }
};

// define styles and fonts for the elixir labels here
export const printToPdfConfig: IPrintConfig = {
  styles: {
    symbol: { fontSize: 18, font: 'Alchemy' },
    header: { fontSize: 12, font: 'Milonga' },
    remainingWidth: {width: '*'},

    sealText: {fontSize: 9, alignment: 'center'},
    name: { fontSize: 14, font: 'Milonga', alignment: 'center'},
    mechanics: { fontSize: 10, alignment: 'center'},
    alchemy: {fontSize: 15, alignment: 'center', font: 'Alchemy'},
    spacer: {fontSize: 12},
    typeText: {alignment: 'center', font: 'Milonga'},
    tableBody: {defaultBorder: false}
  },
  fonts: {
    Milonga: {
      normal: 'Milonga-Regular.ttf',
      bold: 'Milonga-Regular.ttf',
      italics: 'Milonga-Regular.ttf',
      bolditalics: 'Milonga-Regular.ttf'
    },
    Alchemy: {
      normal: 'Alchemy-Regular.TTF',
      bold: 'Alchemy-Regular.TTF',
      italics: 'Alchemy-Regular.TTF',
      bolditalics: 'Alchemy-Regular.TTF'
    },
    Arial: {
      normal: 'arial.ttf',
      bold: 'arialb.ttf',
      italics: 'ariali.ttf',
      bolditalics: 'arialbi.ttf'
    }
  },
  defaults: { font: 'Arial' },
  images: Images
};
