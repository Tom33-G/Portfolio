/* ==========================================================
   PROJECTS.JS : la liste de tes projets (uniquement des DONNÉES)

   Pour ajouter un projet : copie un bloc { ... }, colle-le à la
   suite dans le tableau (sans oublier la virgule entre deux blocs)
   et change les valeurs. Tu ne touches ni au HTML ni à script.js.

   Ce fichier doit être chargé AVANT script.js dans index.html,
   car script.js utilise la constante PROJECTS définie ici.
   ========================================================== */

const PROJECTS = [
  {
    title: "Finance",                      // nom affiché sous l'image
    category: "Web development",           // sert à créer les boutons de filtre
    image: "./assets/images/project-1.jpg",// chemin de l'image (format paysage conseillé)
    description: "Aperçu du projet Finance", // texte alternatif (lecteurs d'écran)
    link: "#"                              // lien vers le projet (GitHub, démo...) ; "#" = aucun pour l'instant
  },
  {
    // Projet factice : à remplacer par un vrai projet
    title: "Dashboard Power BI (exemple)",
    category: "Data",
    image: "./assets/images/project-1.jpg", // réutilise l'image existante en attendant la tienne
    description: "Exemple de projet data fictif",
    link: "#"
  }
];
