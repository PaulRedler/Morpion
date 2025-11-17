L'activité est à faire à 2. Le but étant d'ajouter une fonctionalité de chat en ligne en observant les fichiers fournies.
Étapes pour lancer l’activité

Etape 1 : Récupération du projet et mise en place du serveur

Choisissez un ordinateur qui servira de serveur. Le serveur devra :

 1-Créer une vm avec une interface en acces par pont pour être dans le reseau de la salle 

 2-sudo apt update et installer apache2 (sudo apt install apache2) et npm (sudo apt install npm) une fois installé, déplacez vous dans /var/www/html et clonez le dépot.

 3-Dans le code HTML, modifier l’adresse du serveur WebSocket du fichier  morpionenligne a la ligne 67. (Mettez celle de l'interface en accès par pont)

 4-faites la commande sudo nano /etc/apache2/sites-available/000-default.conf et changez DocumentRoot /var/www/html en DocumentRoot /var/www/html/Morpion

 5-Déplacez vous dans le dossier Morpion et faites les commandes suivantes : npm init -y puis npm i ws 

 6-Toujours dans le dossier Morpion, Lancez le serveur en faisant la commande node server.js 

Vous pouvez maintenant tapez l'adresse ip du serveur apache2 dans votre navigateur et observer le fonctionnement 

Etape 2 : Mise en place du chat en ligne 

1-Determinez l'endroit ou vous placerez l'historique des messages et l'endroit ou le message est ecrit 

2-Ajouter un conteneur pour afficher les messages reçus

3-Créez un endroit pour permettre au joueur d’écrire un message. Deux éléments sont nécessaires, un champ input et un bouton envoyer

4-Récupérer les éléments HTML (conteneur, input et bouton)

5-Créer une fonction d’affichage d’un message dans la zone de chat

6-Déclencher l’envoi d’un message, Lorsqu'on clique sur “Envoyer”, vous devrez :

-lire le texte dans l’input

-vérifier qu’il n’est pas vide

-envoyer le message au serveur via WebSocket

-vider l’input

7-Ajouter la gestion coté serveur (reception du message client,  et le renvoyer aux clients)

8-Diffuser le message, préparer les données à renvoyer à tout le monde,
utilisez la fonction de broadcast déjà existante

9-Intercepter le message du chat.
Dans la grande fonction qui écoute les messages WebSocket côté client, identifiez où sont traités les messages init, players, move, etc.
Vous devrez ajouter un nouveau cas pour votre type de message “chat”.

10-Affcher le message reçu : Utilisez votre fonction d’affichage (créée dans l’étape 5) pour afficher le message
 


