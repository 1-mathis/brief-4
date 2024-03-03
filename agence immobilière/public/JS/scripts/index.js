//code sans les classes (fonctionnel)

class Annonce {
  constructor(id, image, titre, description, prix, adresse, type) {
    this.id = id;
    this.image = image;
    this.titre = titre;
    this.description = description;
    this.prix = prix;
    this.adresse = adresse;
    this.type = type;
  }
}

class UI {
  ajouterAnnonceALaDiv(annonce) {
    const divAnnonces = document.getElementById("div-annonces");
    const idUnique = `annonce-${annonce.id}`;
    const div = document.createElement("div");
    div.id = idUnique;
    div.innerHTML = `
      <div>
      <img src="${annonce.image}" alt="Image de l'annonce">
        <h3>${annonce.titre}</h3>
        <p>${annonce.description}</p>
        <p>Prix: ${annonce.prix}</p>
        <p>Adresse: ${annonce.adresse}</p>
        <p>Type: ${annonce.type}</p>
      </div>
    `;
    const boutonSupprimer = document.createElement("button");
    boutonSupprimer.textContent = "Supprimer";
    boutonSupprimer.addEventListener("click", () =>
      this.supprimerAnnonce(idUnique, annonce.id)
    );
    div.appendChild(boutonSupprimer);
    divAnnonces.appendChild(div);
  }

  supprimerAnnonce(idUnique, idAnnonce) {
    const elementDiv = document.getElementById(idUnique);
    elementDiv.remove();
    let annonces = JSON.parse(localStorage.getItem("annonces")) || [];
    annonces = annonces.filter((annonce) => annonce.id !== idAnnonce);
    localStorage.setItem("annonces", JSON.stringify(annonces));
  }

  champsSontRemplis() {
    const image = document.getElementById("image-annonce").files[0];
    const titre = document.getElementById("titre-annonce").value;
    const description = document.getElementById("description-annonce").value;
    const prix = document.getElementById("prix-annonce").value;
    const adresse = document.getElementById("adresse-annonce").value;
    const type = document.getElementById("selecter-biens").value;

    if (
      titre === "" ||
      description === "" ||
      prix === "" ||
      adresse === "" ||
      type === "" ||
      !image
    ) {
      alert(
        "Veuillez remplir tous les champs du formulaire, y compris l'image."
      );
      return false;
    }

    return true;
  }

  creerAnnonce() {
    const id = Date.now();
    const image = document.getElementById("image-annonce").files[0];
    const imageUrl = URL.createObjectURL(image); // Correction: moved this line after getting the image
    const titre = document.getElementById("titre-annonce").value;
    const description = document.getElementById("description-annonce").value;
    const adresse = document.getElementById("adresse-annonce").value;
    const prix = document.getElementById("prix-annonce").value;
    const type = document.getElementById("selecter-biens").value;
    const annonce = new Annonce(
      id,
      imageUrl,
      titre,
      description,
      prix,
      adresse,
      type
    );
    return annonce;
  }

  effacerChamps() {
    document.getElementById("image-annonce").value = "";
    document.getElementById("titre-annonce").value = "";
    document.getElementById("description-annonce").value = "";
    document.getElementById("prix-annonce").value = "";
    document.getElementById("adresse-annonce").value = "";
    document.getElementById("selecter-biens").value = "";
  }

  afficherAnnonces() {
    let annonces = JSON.parse(localStorage.getItem("annonces")) || [];
    annonces.forEach((annonce) => this.ajouterAnnonceALaDiv(annonce));
  }

  sauvegarderAnnonce(annonce) {
    let annonces = JSON.parse(localStorage.getItem("annonces")) || [];
    annonces.push(annonce);
    localStorage.setItem("annonces", JSON.stringify(annonces));
  }
}

const ui = new UI();

document
  .getElementById("envoyerAnnonce")
  .addEventListener("click", function (event) {
    event.preventDefault();
    if (ui.champsSontRemplis()) {
      const annonce = ui.creerAnnonce();
      ui.ajouterAnnonceALaDiv(annonce);
      ui.effacerChamps();
      ui.sauvegarderAnnonce(annonce);
    }
  });

window.addEventListener("DOMContentLoaded", () => {
  ui.afficherAnnonces();
});

const formulaire = document.getElementById("formulaire");
formulaire.addEventListener("submit", function (event) {
  event.preventDefault(); // Empêche le rechargement de la page
});

// code avec les class (ne fonctionne pas ↓)

// import {Annonce} from "./annonces/Annonce.js";
// import Maison from "./annonces/Maison.js";
// import Appartement from "./annonces/Appartement.js";
// import Terrain from "./annonces/Terrain.js";

// class UI {
//   ajouterAnnonceALaDiv(annonce) {
//     const divAnnonces = document.getElementById("div-annonces");
//     const idUnique = `annonce-${annonce.id}`;
//     const div = document.createElement("div");
//     div.id = idUnique;
//     div.innerHTML = `
//       <div>
//         <img src="${annonce.image}" alt="Image de l'annonce">
//         <h3>${annonce.titre}</h3>
//         <p>${annonce.description}</p>
//         <p>Prix: ${annonce.prix}</p>
//         <p>Adresse: ${annonce.adresse}</p>
//         <p>Type: ${annonce.type}</p>
//       </div>
//     `;
//     const boutonSupprimer = document.createElement("button");
//     boutonSupprimer.textContent = "Supprimer";
//     boutonSupprimer.addEventListener("click", () =>
//       this.supprimerAnnonce(idUnique, annonce.id)
//     );
//     div.appendChild(boutonSupprimer);
//     divAnnonces.appendChild(div);
//   }

//   supprimerAnnonce(idUnique, idAnnonce) {
//     const elementDiv = document.getElementById(idUnique);
//     elementDiv.remove();
//     let annonces = JSON.parse(localStorage.getItem("annonces")) || [];
//     annonces = annonces.filter((annonce) => annonce.id !== idAnnonce);
//     localStorage.setItem("annonces", JSON.stringify(annonces));
//   }

//   champsSontRemplis() {
//     const image = document.getElementById("image-annonce").files[0];
//     const titre = document.getElementById("titre-annonce").value;
//     const description = document.getElementById("description-annonce").value;
//     const prix = document.getElementById("prix-annonce").value;
//     const adresse = document.getElementById("adresse-annonce").value;
//     const type = document.getElementById("selecter-biens").value;

//     if (
//       titre === "" ||
//       description === "" ||
//       prix === "" ||
//       adresse === "" ||
//       type === "" ||
//       !image
//     ) {
//       alert(
//         "Veuillez remplir tous les champs du formulaire, y compris l'image."
//       );
//       return false;
//     }

//     return true;
//   }

//   creerAnnonce() {
//     const id = Date.now();
//     const image = document.getElementById("image-annonce").files[0];
//     const imageUrl = URL.createObjectURL(image);
//     const titre = document.getElementById("titre-annonce").value;
//     const description = document.getElementById("description-annonce").value;
//     const adresse = document.getElementById("adresse-annonce").value;
//     const prix = document.getElementById("prix-annonce").value;
//     const type = document.getElementById("selecter-biens").value;

//     let annonce;

//     switch (type) {
//       case "Maison":
//         const etages = document.getElementById("etages").value;
//         const nombrePiecesMaison = document.getElementById(
//           "nombre-pieces-maison"
//         ).value;
//         const piscine = document.getElementById("piscine").checked;
//         const garage = document.getElementById("garage").checked;
//         const jardin = document.getElementById("jardin").checked

//         cont annonce = new Maison(
//           type,
//           etages,
//           nombrePiecesMaison,
//           piscine,
//           garage,
//           jardin
//         );
//         break;
//       case "Appartement":
//         const etagesAppartement =
//           document.getElementById("etages-appartement").value;
//         const ascenseur = document.getElementById("ascenseur").checked;
//         const nombrePiecesAppartement = document.getElementById(
//           "nombre-pieces-appartement"
//         ).value;
//         const annonce = new Appartement(
//           type,
//           etagesAppartement,
//           ascenseur,
//           nombrePiecesAppartement
//         );
//         break;
//       case "Terrain":
//         const typeConstruction =
//           document.getElementById("type-construction").value;
//         const nombrePiecesTerrain = document.getElementById(
//           "nombre-pieces-terrain"
//         ).value;
//         const etagesTerrain = document.getElementById("etages-terrain").value;
//         const jardinTerrain = document.getElementById("jardin-terrain").checked;
//         const garageTerrain = document.getElementById("garage-terrain").checked;
//         const piscineTerrain =
//           document.getElementById("piscine-terrain").checked;
//         annonce = new Terrain(
//           type,
//           typeConstruction,
//           nombrePiecesTerrain,
//           etagesTerrain,
//           jardinTerrain,
//           garageTerrain,
//           piscineTerrain
//         );
//         break;
//       default:
//         throw new Error("Type de bien non pris en charge.");
//     }

//     return annonce;
//   }

//   effacerChamps() {
//     document.getElementById("image-annonce").value = "";
//     document.getElementById("titre-annonce").value = "";
//     document.getElementById("description-annonce").value = "";
//     document.getElementById("prix-annonce").value = "";
//     document.getElementById("adresse-annonce").value = "";
//     document.getElementById("selecter-biens").value = "";
//   }

//   afficherAnnonces() {
//     let annonces = JSON.parse(localStorage.getItem("annonces")) || [];
//     annonces.forEach((annonce) => this.ajouterAnnonceALaDiv(annonce));
//   }

//   sauvegarderAnnonce(annonce) {
//     let annonces = JSON.parse(localStorage.getItem("annonces")) || [];
//     annonces.push(annonce);
//     localStorage.setItem("annonces", JSON.stringify(annonces));
//   }
// }

// const ui = new UI();

// document
//   .getElementById("formulaire")
//   .addEventListener("submit", function (event) {
//     event.preventDefault();
//     if (ui.champsSontRemplis()) {
//       const annonce = ui.creerAnnonce();
//       ui.ajouterAnnonceALaDiv(annonce);
//       ui.effacerChamps();
//       ui.sauvegarderAnnonce(annonce);
//     }
//   });

// window.addEventListener("DOMContentLoaded", () => {
//   ui.afficherAnnonces();
// });
