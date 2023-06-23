# Test d'Angular via l'API REST JsonplaceHolder et json-server
### STEP 1
CRUD sur json-server, architecture modulaire, service, interfaces, routage et lazy loading pour l'instant.
C'est une démo pour me familiariser avec Angular.
Manque principalement pour l'instant la gestion des erreurs et des tests.

### STEP 2
Après avoir expérimenté les rouages d'Angular avec ces deux exercices, j'ai continué mon apprentissage et je vais donc mettre en place sur la partie jsonPlaceHolder le state management reactif perso via l'utilisation des Behaviorsubject, vu que c'est ce que j'essayais de faire sans connaitre le nom ! 
Je vais aussi intégrer Material UI pour avoir une finition professionelle, mais j'ai du taf, vu que je n'ai que survolé la chose pour l'instant, et que ce n'est pas ce sur quoi je me suis focalisé.

### STEP 3
J'ai corrigé les types any qui trainaient en créant des interfaces pour les forms, j'ai refait un tour sur node, je potasse les tests unitaires et fonctionnels, je regarde comment gérer les erreurs

### Vous pouvez cloner ce dépot sans installer json-server et vous pourrez quand même essayer la partie json-Place-Holder
C'est cette partie où j'ai le plus travaillé. Pour l'instant, json-server reste un CRUD fonctionnel "simple".

Voilà synthétiquement où j'en suis :

- [x] CRUD basique
- [x] Architecture modulaire
- [x] Lazy loading
- [x] State management pour rendre JsonPlaceHolder indépendant de son back-end et avoir un comportment cohérent
- [x] Material UI pour appréhender l'outil et avoir une finition plus professionnelle (sur jsonplaceholder)
- [x] Directive et animations persos
- [x] Interceptor
- [x] Mieux gérer les types en général et supprimer les any qui trainent
- [x] Revoir node, express, et mongoDB pour créer l'API qui ira à la place de jsonplaceholder ou json-server par exemple
- [x] bug ? sur le unsubscribe de json-server/user-create qui neutralise le lien de "retour".
- [x] CSS pour avoir une home présentable
- [x] CI/CD vers AWS via Github Actions
- [x] Migration Angular 14 -> 15 -> 16

en cours :
- [ ] gestionnaire d'erreur
- [ ] TESTS !!!!! Unitaires et fonctionnels (ca va un peu mieux mais ca a été laborieux)

Ce qu'il me reste principalement à faire :
- [ ] Authentification JWT(j'ai vu ce dont on parle, je reviendrai dessus plus tard avec node, ou je mettrais en place un json web token, avec un interceptor)


Et selon votre bon vouloir :
- [ ] Me faire engager chez vous


### Pour essayer, 
git clone, npm ci et ng serve pour la partie angular. Ou alors :  
[http://angular-practice-s3bucket.s3-website.eu-west-3.amazonaws.com](http://angular-practice-s3bucket.s3-website.eu-west-3.amazonaws.com)


### Pour essayer le crud via json-server, 
il faut télécharger ce repo en local et installer json-server et la db qui va bien avec. Pour ce faire, le plus simple et d'installer un autre repo que je vous mets à disposition [https://github.com/juannitoo/angular-json-server](https://github.com/juannitoo/angular-json-server). Sinon, si vous avez déjà json-server, je vous ai mis les fichiers nécessaires dans ce repo angular sous "src/assets/db-json-server", à mettre à la racine du projet json-server.


[https://jsonplaceholder.typicode.com/](https://jsonplaceholder.typicode.com/)  
[https://www.npmjs.com/package/json-server#getting-started](https://www.npmjs.com/package/json-server#getting-started)  
[http://json2ts.com/](http://json2ts.com/)  
[https://jsoncrack.com/](https://jsoncrack.com/)  



