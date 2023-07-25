export const environment = {
  production: true,
  apiUrl: 'http://LB-angular-practice-110681708.eu-west-3.elb.amazonaws.com',
  // apiUrl: 'http://35.180.68.95:3001',  // adresse AWS conteneur serveur node à renseigner
}
// A chaque upload de l'image docker associée au backend, je dois changer cette IP car la tache AWS associée à l'image
// ne redémarre pas et reste associée à la précédente image. La seule possibilité que j'ai pour l'instant, c'est d'arrêter la tâche et d'en démarrer
// une autre. Je dois donc suivre une leçon AWS pour créer un service qui gérera mes tâches et qui sera capable d'arrêter
// une tâche et d'en démarrer une autre et qui devrait me garder la même Ip.

// => Donc, pas besoin d'ip statique mais créer un app load balancer qui générera un dns qu'aws mantient seul
// et dorénavant je peux conserver la même adresse de back end. C'est cela dit fastidieux à utiliser car il faut créer l'image docker, 
// l'uploader, et mettre à jour le service manuellement en relancant le paramétrage de nombre de taches en autres.
// Aws se charge de supprimer les anciennes tâches dorénavant inutilisées qd ok. De plus, je soupconne qu'il faille créer
// un autre vpc (virtual private cloud) que celui par défaut pour pouvoir séparer les projets/clients.
// Je vais donc essayer, vu quand insistant de tout côtés, j'ai déjà défini réseaux et sous réseaux.
