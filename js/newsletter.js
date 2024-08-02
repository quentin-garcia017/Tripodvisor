// On défini un objet qui va contenir les propriétés (un peu comme des variables), et les fonctions utiles à notre fonctionnalité
const newsletter = {
    // Je déclare mes propriétés utiles
    closeNewsletterButton: document.querySelector('#newsletter-close'),
    newsletterElement: document.querySelector('#newsletter'),
    openNewsletterButton: document.querySelector('#open-newsletter'),
    form: document.querySelector('#newsletter-form'),
    emailInput: document.querySelector('#subscriber-email'),
    hiddenClass: 'newsletter--hidden',
    shouldOpenOnScroll: true,
    forbiddenDomains: [
        '@yopmail.com',
        '@yopmail.fr',
        '@yopmail.net',
        '@cool.fr.nf',
        '@jetable.fr.nf',
        '@courriel.fr.nf',
        '@moncourrier.fr.nf',
        '@monemail.fr.nf',
        '@monmail.fr.nf',
        '@hide.biz.st',
        '@mymail.infos.st',
    ],

    // Je déclare mes fonctions (qui dans un objet s'appellent des méthodes) utiles
    // Init sera la fonction qui permet de lancer toutes les autres fonctions et eventListener etc.
    init: function () {

        newsletter.openNewsletterButton.addEventListener('click', newsletter.handleOpenNewsletter);

        newsletter.closeNewsletterButton.addEventListener('click', newsletter.handleCloseNewsletter);

        window.addEventListener('scroll', newsletter.handleScroll);

        newsletter.form.addEventListener('submit', newsletter.handleSubmitForm)
    },

    // À part d'ici, ce seront des fonctions utiles soit pour le init() soir par d'autres fonctions
    handleOpenNewsletter: function (event) {
        event.preventDefault();
        // vu qu'on a volontairement ouvert la newsletter, on n'a pas envie qu'elle rouvre au scroll, on indique donc false sur newsletter.shouldOpenOnScroll
        newsletter.shouldOpenOnScroll = false;
        newsletter.show();
    },
    handleCloseNewsletter: function () {
        newsletter.hide();
    },
    handleScroll: function () {
        // Si on est a 300px du haut et que variable newsletter.shouldOpenOnScroll est === true
        // on ouvre la popup
        // au passage on modifie  newsletter.shouldOpenOnScroll pour la passer à false, histoire que quand on ferme la newsletter elle ne réapparaisse pas au scroll
        if (window.scrollY > 300 && newsletter.shouldOpenOnScroll) {
            newsletter.show();
            newsletter.shouldOpenOnScroll = false;
        }
    },
    handleSubmitForm: function(event) {

        event.preventDefault();

        const emailValue = newsletter.emailInput.value;

        const isValid = newsletter.checkIsGoodEmail(emailValue); // true ou false

        if(isValid) {
            message.addMessage("C'est tout bon !", newsletter.form);
            // On vide l'input
            newsletter.emailInput.value = '';
        } else {
            message.addMessage("Votre email n'est pas un email autorisé.", newsletter.form);
        }
    },
    show: function () {
        newsletter.newsletterElement.classList.remove(newsletter.hiddenClass);
    },
    hide: function () {
        newsletter.newsletterElement.classList.add(newsletter.hiddenClass);
    },
    checkIsGoodEmail: function(email) {
        // Je parcours chacun des mes domains interdis
        for(forbiddenDomain of newsletter.forbiddenDomains) {
            // Pour chaque, je vérifie si l'email contient ce domaine
            if(email.includes(forbiddenDomain)) {
                // si oui, on arrète tout là et on retourne false pour dire qu'il est pas bon
                return false;
            } 
        }

        // si le if précédent n'a pas été déclenché et donc n'a pas fais le return false c'est que c'est ok, on return true pour indiquer que l'email est valide
        return true;
    },
}

newsletter.init();