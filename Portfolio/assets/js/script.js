'use strict'; // mode strict : JavaScript signale plus d'erreurs de programmation

/* ==========================================================
   SCRIPT.JS : le comportement de la page
   1. Barre latérale (mobile)  2. Navigation entre les pages
   3. Fenêtre des témoignages  4. Projets (injectés depuis projects.js)

   Repère : les attributs data-xxx du HTML sont des "poignées" :
   on les retrouve ici avec document.querySelector("[data-xxx]").
   ========================================================== */


/* ---------- 1. BARRE LATÉRALE ---------- */
const sidebar = document.querySelector('[data-sidebar]');

// classList.toggle ajoute la classe "is-open" si absente, la retire sinon.
// Le CSS fait le reste (déplier/replier avec animation).
document.querySelector('[data-sidebar-btn]')
  .addEventListener('click', () => sidebar.classList.toggle('is-open'));


/* ---------- 2. NAVIGATION ENTRE LES PAGES ---------- */
const navButtons = document.querySelectorAll('[data-nav]');
const pages = document.querySelectorAll('[data-page]');

// Affiche la page demandée ("a-propos", "cv", "portfolio") et cache les autres
function showPage(name) {
  pages.forEach(page => page.classList.toggle('is-active', page.dataset.page === name));
  navButtons.forEach(btn => btn.classList.toggle('is-active', btn.dataset.nav === name));
  window.scrollTo(0, 0); // remonte en haut de la page
}

// Chaque bouton du menu sait quelle page il ouvre grâce à son data-nav.
// (Plus fragile de comparer des textes : ici, renommer un bouton ne casse rien.)
navButtons.forEach(btn => btn.addEventListener('click', () => showPage(btn.dataset.nav)));


/* ---------- 3. FENÊTRE (MODALE) DES TÉMOIGNAGES ---------- */
const modal = document.querySelector('[data-modal]');

function openModal(card) {
  // On recopie dans la fenêtre l'avatar, le nom et le texte de la carte cliquée.
  // textContent (et non innerHTML) : le texte est inséré tel quel, sans risque.
  const avatar = card.querySelector('img');
  modal.querySelector('[data-modal-img]').src = avatar.src;
  modal.querySelector('[data-modal-img]').alt = avatar.alt;
  modal.querySelector('[data-modal-title]').textContent = card.querySelector('h4').textContent;
  modal.querySelector('[data-modal-text]').textContent = card.querySelector('p').textContent;
  modal.classList.add('is-open');
}

const closeModal = () => modal.classList.remove('is-open');

document.querySelectorAll('[data-testimonial]')
  .forEach(card => card.addEventListener('click', () => openModal(card)));

// Fermeture : bouton ✕, clic sur le fond sombre (tous deux ont data-modal-close), touche Échap
modal.querySelectorAll('[data-modal-close]')
  .forEach(el => el.addEventListener('click', closeModal));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeModal(); });


/* ---------- 4. PROJETS ---------- */
const projectList = document.querySelector('[data-project-list]');
const filterBar = document.querySelector('[data-filters]');

// Transforme UN projet (un objet de PROJECTS) en morceau de HTML.
// Les classes "group-hover:" de Tailwind déclenchent l'effet quand on survole le lien.
function projectCard(project) {
  return `
    <li>
      <a href="${project.link}" class="group block">
        <figure class="relative mb-4 h-52 overflow-hidden rounded-2xl sm:h-auto">
          <img src="${project.image}" alt="${project.description}" loading="lazy"
               class="h-full w-full object-cover transition duration-300 group-hover:scale-110">
          <div class="absolute inset-0 grid place-items-center bg-black/0 transition group-hover:bg-black/50">
            <ion-icon name="eye-outline" aria-hidden="true"
                      class="rounded-xl bg-jet p-4 text-xl text-accent opacity-0 transition group-hover:opacity-100"></ion-icon>
          </div>
        </figure>
        <h3 class="ml-2.5 text-[15px] capitalize text-white/95">${project.title}</h3>
        <p class="ml-2.5 text-sm font-light text-soft/70">${project.category}</p>
      </a>
    </li>`;
}

// Affiche les projets d'une catégorie ("Tous" = tout afficher)
function renderProjects(category) {
  const shown = category === 'Tous'
    ? PROJECTS
    : PROJECTS.filter(project => project.category === category);
  // .map() : un projet → un morceau de HTML ; .join('') les assemble en un seul texte
  projectList.innerHTML = shown.map(projectCard).join('');
}

// Crée les boutons de filtre à partir des catégories présentes dans PROJECTS.
// new Set(...) supprime les doublons : ajouter une catégorie crée donc son bouton tout seul.
function renderFilters() {
  const categories = ['Tous', ...new Set(PROJECTS.map(project => project.category))];
  filterBar.innerHTML = categories
    .map(cat => `<button class="filter-btn" data-filter="${cat}">${cat}</button>`).join('');
}

// Un seul écouteur sur la barre (au lieu d'un par bouton) : on repère le bouton cliqué.
filterBar.addEventListener('click', event => {
  const button = event.target.closest('[data-filter]');
  if (!button) return; // clic à côté d'un bouton : on ignore
  filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('is-active', b === button));
  renderProjects(button.dataset.filter);
});

// Démarrage : boutons, puis tous les projets, avec "Tous" sélectionné
renderFilters();
renderProjects('Tous');
filterBar.querySelector('.filter-btn').classList.add('is-active');
