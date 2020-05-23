import {Prof} from "./Prof";

export class Cours {
  id: string;
  ProfId: string;
  dateCour: string;
  heureCour: string;
  matiere: string;
  description: string;
  status: number;
  prix_cours_heure: number;
  Prof: Prof;
  /* description: string;
  prixHeure
*/
}
