import { MetricUnit } from './models/recipe';

export const titleForUnits = (unit: MetricUnit): string => {
    switch (unit) {
    case 'g':
        return 'грамм';
    case 'kg':
        return 'килограмм';
    case 'ml':
        return 'миллилитр';
    case 'l':
        return 'литр';
    case 'tsp':
        return 'чайная ложка';
    case 'tbsp':
        return 'столовая ложка';
    case 'cup':
        return 'чашка';
    case 'pcs':
        return 'штука';
    default:
        return '';
    }
};
