import { BienImmobilier } from "./BienImmobilier.js";

class Appartement extends BienImmobilier {
  constructor(type, etages, ascenseur, nombrePieces) {
    super();
    this.type = type;
    this.etages = etages;
    this.ascenseur = ascenseur;
    this.nombrePieces = nombrePieces;
  }
}
