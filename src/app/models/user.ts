import { Lancamento } from './lancamento';

export class User {
    id: number;
    codigo: string;
    email: string;
    lancamentos: Lancamento[];
}