# Test d'Angular via l'API REST JsonplaceHolder et json-server
CRUD sur json-server, architecture modulaire, service, interfaces, routage et lazy loading pour l'instant.
C'est une démo pour me familiariser avec Angular.
Manque principalement pour l'instant la gestion des erreurs et des tests.

EDIT: Après avoir expérimenté les rouages d'Angular avec ces deux exercices, j'ai continué mon apprentissage et 
je vais donc mettre en place sur la partie jsonPlaceHolder le state management reactif perso via l'utilisation
des Behaviorsubject, vu que c'est ce que j'essayais de faire sans savoir que cela existait ! 
Je vais aussi intégrer Material UI pour avoir une finition professionelle, mais j'ai du taf, vu que je n'ai que
survolé la chose pour l'instant, et que ce n'est pas ce sur quoi je me suis focalisé.

Voilà synthétiquement où j'en suis :

- [x] CRUD basique
- [x] Architecture modulaire
- [x] Lazy loading

Ce que j'ai à faire :
- [ ] State management pour rendre JsonPlaceHolder agnostique de son back-end et avoir un comportment cohérent
- [ ] Material UI pour appréhender l'outil et avoir une finition professionnelle
- [ ] TESTS !!!!!

Et apreès selon votre bon vouloir :
- [ ] Revoir node, express, et mongoDB pour créer l'API qui ira à la place de jsonplaceholder ou json-server par exemple, où
- [ ] Me faire engager chez vous

[https://jsonplaceholder.typicode.com/](https://jsonplaceholder.typicode.com/)

[https://www.npmjs.com/package/json-server#getting-started](https://www.npmjs.com/package/json-server#getting-started)

[http://json2ts.com/](http://json2ts.com/)

Pour essayer, git clone, npm install et ng serve pour la partie angular.

Pour essayer le crud via json-server, il faut installer json-server et la db qui va bien avec. Pour ce faire, le plus simple et d'installer un autre repo que je vous mets à disposition [https://github.com/juannitoo/angular-json-server](https://github.com/juannitoo/angular-json-server)
Sinon, si vous avez déjà json-server, je vous ai mis les fichiers nécessaires dans ce repo angular sous "src/assets/db-json-server", à mettre à la racine du projet json-server.

