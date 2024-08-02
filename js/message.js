const message = {
    addMessage(messageText, parent) {
        // parcours tous les potentiels message dans mon élément, et les supprimer
        const existingMessages = parent.querySelectorAll('.message');
       
        for(let existingMessage of existingMessages) {
            // Avec setTimeout je reporte à plus tard (1000 millisecondes) l'execution de mon code à l'intérieur de la fonction de callback
            setTimeout(function() {
                existingMessage.remove();
            }, 1000)
        }

        const newMessageElement = document.createElement('p');
        newMessageElement.classList.add('message');
        newMessageElement.textContent = messageText;

        parent.prepend(newMessageElement);
    }
}
