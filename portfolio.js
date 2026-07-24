// Sélection des éléments HTML du DOM via leur classe avec la méthode querySelector()
const portText = document.querySelector('.titre-port');
const folioText = document.querySelector('.titre-folio');

// Ajout d'un écouteur d'événement de type 'scroll' (défilement) sur la fenêtre entière
window.addEventListener('scroll', () => {
  // Stockage de la position verticale du défilement dans une constante
  const scrollPosition = window.scrollY;
  
  // Condition : on vérifie que les deux éléments existent bien dans le DOM avant d'agir
  if (portText && folioText) {
    // Manipulation du style CSS pour créer un effet de déplacement (effet parallaxe)
    portText.style.transform = `translateX(${scrollPosition * 0.8}px)`;
    folioText.style.transform = `translateX(-${scrollPosition * 0.8}px)`;
  }
});

// Création d'un observateur (IntersectionObserver) pour détecter l'apparition d'éléments à l'écran
const revealObserver = new IntersectionObserver(
    (entries) => {
      // Parcours de la collection d'éléments observés avec la méthode forEach()
      entries.forEach((entry) => {
        // Condition : si l'élément n'est pas encore visible, on arrête l'exécution pour cet élément
        if (!entry.isIntersecting) return;
        
        // Si visible, on manipule les classes CSS du DOM en lui ajoutant la classe 'visible'
        entry.target.classList.add('visible');
        
        // On arrête d'observer cet élément une fois l'animation déclenchée
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

// Sélection de tous les éléments ayant la classe 'reveal' via querySelectorAll()
// Cette méthode retourne une NodeList que l'on parcourt avec une boucle forEach()
document.querySelectorAll('.reveal').forEach((el) => {
  // Application de l'observateur sur chaque élément de la NodeList
  revealObserver.observe(el);
});

// Sélection des divers éléments du carrousel dans le DOM
const track = document.querySelector('.carousel-track');
// querySelectorAll renvoie une NodeList contenant toutes les images du carrousel
const slides = document.querySelectorAll('.carousel-slide');
// Sélection des boutons via leur identifiant avec getElementById()
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const container = document.querySelector('.carousel-container');

// Déclaration d'une variable qui sert de compteur d'index (initialisée à 0)
let currentIndex = 0;

// Déclaration de la fonction qui permet de mettre à jour l'affichage du carrousel
function updateCarousel() {
  // Calcul du défilement maximum possible en fonction de la largeur
  const maxScroll = track.scrollWidth - container.clientWidth;
  
  // Récupération de la position en pixels de l'image ciblée
  let targetX = slides[currentIndex].offsetLeft;

  // Condition : si la position ciblée dépasse le défilement maximum, on la bloque au maximum
  if (targetX > maxScroll) {
    targetX = maxScroll;
  }

  // Manipulation du style CSS pour déplacer visuellement la piste d'images
  track.style.transform = `translateX(-${targetX}px)`;
}

// Ajout d'un écouteur d'événement au clic sur le bouton "Suivant"
nextBtn.addEventListener('click', () => {
  const maxScroll = track.scrollWidth - container.clientWidth;
  
  // Condition : on n'avance l'index que si la fin de la piste n'est pas atteinte
  if (slides[currentIndex].offsetLeft < maxScroll && currentIndex < slides.length - 1) {
    currentIndex++; // Incrémentation du compteur
    updateCarousel(); // Appel de la fonction pour appliquer le changement
  }
});

// Ajout d'un écouteur d'événement au clic sur le bouton "Précédent"
prevBtn.addEventListener('click', () => {
  // Condition : on ne recule que si l'index est strictement supérieur à 0
  if (currentIndex > 0) {
    currentIndex--; // Décrémentation du compteur
    updateCarousel(); // Appel de la fonction
  }
});

// Écouteur d'événement 'resize' sur la fenêtre pour réajuster le carrousel si la taille de l'écran change
window.addEventListener('resize', updateCarousel);

// Ajout d'un second écouteur d'événement au clic sur le bouton "Suivant" (pour la boucle du carrousel)
nextBtn.addEventListener('click', () => {
  const maxScroll = track.scrollWidth - container.clientWidth;
  
  // Condition : si la fin est atteinte, on remet l'index à 0 (boucle), sinon on incrémente normalement
  if (slides[currentIndex].offsetLeft >= maxScroll || currentIndex === slides.length - 1) {
    currentIndex = 0; 
  } else {
    currentIndex++; 
  }
  
  updateCarousel();
});

// Ajout d'un second écouteur d'événement au clic sur le bouton "Précédent" (pour la boucle du carrousel)
prevBtn.addEventListener('click', () => {
  // Condition : si on est sur la première image, on passe directement à la dernière (boucle)
  if (currentIndex === 0) {
    currentIndex = slides.length - 1; 
  } else {
    currentIndex--; // Sinon on décrémente normalement
  }
  
  updateCarousel();
});

// Sélection de toutes les cartes de projets, ce qui crée une NodeList
const projectCards = document.querySelectorAll('.project-card');

// Parcours de la NodeList (collection) avec la méthode forEach()
projectCards.forEach(card => {
  // Ajout d'un écouteur d'événement 'click' sur chaque carte du portfolio
  card.addEventListener('click', () => {
    // Condition : on vérifie si la carte cliquée possède déjà la classe CSS 'active'
    if (card.classList.contains('active')) {
      // Si oui, on parcourt à nouveau la NodeList pour retirer les classes d'état de toutes les cartes
      projectCards.forEach(c => {
        c.classList.remove('active', 'inactive');
      });
      // Le mot-clé return interrompt l'exécution de la fonction ici
      return;
    }
    
    // Si la carte n'était pas active, on met à jour les états
    projectCards.forEach(c => {
      // Condition : si l'élément parcouru correspond à la carte cliquée
      if (c === card) {
        c.classList.add('active'); // Manipulation du DOM : ajout de classe
        c.classList.remove('inactive'); // Manipulation du DOM : suppression de classe
      } else {
        // Pour toutes les autres cartes de la collection, on les rend inactives
        c.classList.add('inactive');
        c.classList.remove('active');
      }
    });
  });
});

// Sélection des éléments HTML constituant le menu de navigation via leur identifiant
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
const overlay = document.getElementById('menu-overlay');

// Déclaration de la fonction permettant d'ouvrir le menu
function openMenu() {
  // Manipulation des classes pour rendre le menu visible
  menu.classList.add('open');
  overlay.classList.add('visible');
  burger.classList.add('open');
  // Modification de l'attribut HTML d'accessibilité avec setAttribute()
  burger.setAttribute('aria-expanded', 'true');
}

// Déclaration de la fonction permettant de fermer le menu
function closeMenu() {
  // Manipulation des classes pour masquer le menu
  menu.classList.remove('open');
  overlay.classList.remove('visible');
  burger.classList.remove('open');
  // Mise à jour de l'attribut HTML d'accessibilité
  burger.setAttribute('aria-expanded', 'false');
}

// Écouteur d'événement au clic sur l'icône du menu burger
burger.addEventListener('click', () => {
  // Condition ternaire : si le menu contient la classe 'open', on appelle closeMenu(), sinon openMenu()
  menu.classList.contains('open') ? closeMenu() : openMenu();
});

// Écouteur d'événement pour fermer le menu en cliquant à l'extérieur (sur le fond gris)
overlay.addEventListener('click', closeMenu);

// Sélection de tous les liens (balises <a>) enfants du menu
// Parcours de la collection avec forEach() pour ajouter un écouteur sur chaque lien individuellement
menu.querySelectorAll('a').forEach(link => {
  // Au clic sur un lien, la fonction closeMenu() est appelée
  link.addEventListener('click', closeMenu);
});

// Écouteur d'événement de clavier sur l'ensemble de la page (l'objet document)
document.addEventListener('keydown', (e) => {
  // Utilisation de l'objet event (ici appelé 'e') pour identifier la touche pressée
  // Condition : si la touche pressée est 'Escape' (Échap), on ferme le menu
  if (e.key === 'Escape') closeMenu();
});

// Sélection du bouton "Voir plus" et de la grille de projets via getElementById()
const btnVoirPlus = document.getElementById('btn-voir-plus');
const graphiqueCollage = document.getElementById('graphique-collage');

// Condition : on s'assure que les deux éléments ont bien été trouvés dans le DOM
if (btnVoirPlus && graphiqueCollage) {
  // Ajout d'un écouteur d'événement au clic sur le bouton
  btnVoirPlus.addEventListener('click', () => {
    // La méthode toggle() alterne la présence de la classe : elle l'ajoute si absente, la retire si présente
    graphiqueCollage.classList.toggle('show-all');
    
    // Condition : on vérifie l'état actuel de la grille après le toggle
    if (graphiqueCollage.classList.contains('show-all')) {
      // Manipulation du contenu texte de l'élément si la grille est entièrement affichée
      btnVoirPlus.textContent = 'Voir moins';
    } else {
      // Manipulation du contenu texte si la grille est repliée
      btnVoirPlus.textContent = 'Voir plus';
      
      // Utilisation d'une méthode pour faire défiler la page automatiquement vers la section de manière fluide
      document.getElementById('projets-graphiques').scrollIntoView({ behavior: 'smooth' });
    }
  });
}