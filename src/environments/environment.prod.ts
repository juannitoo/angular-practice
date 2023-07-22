export const environment = {
  production: true,
  apiUrl: 'http://35.180.68.95:3001',  // adresse AWS conteneur serveur node à renseigner
}
// A chaque upload de l'image docker associée au backend, je dois changer cette IP car la tache AWS associée à l'image
// ne redémarre pas et reste associée à la précédente image. La seule possibilité que j'ai pour l'instant, c'est d'arrêter la tâche et d'en démarrer
// une autre. Je dois donc suivre une leçon AWS pour créer un service qui gérera mes tâches et qui sera capable d'arrêter
// une tâche et d'en démarrer une autre et qui devrait me garder la même Ip, il me semble ...
// On verra comment je gère ça parce que pour l'instant l'important, c'est qu'il faut que vous puissiez essayer sans difficulté.