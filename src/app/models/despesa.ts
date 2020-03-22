import { DespesaItem } from './despesa-item';

export class Despesa {
    id: number;
    tipo: string;
    nane: string;
    itensDespesa: DespesaItem[];
}