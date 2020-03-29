import { DespesaItem } from './despesa-item';

export class Despesa {
    id: number;
    tipo: any;
    name: string;
    itensDespesa: DespesaItem[];
}