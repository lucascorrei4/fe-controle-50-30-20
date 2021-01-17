import { Lancamento } from "./lancamento";

export class User {
  _id: string;
  status: string;
  obs: string;
  string: string;
  email: string;
  telefone: string;
  ref: string;

  codigo;
  lancamentos: Lancamento[];
}
