export const environment = {
  production: true,
  apiUrl: 'http://LB-angular-practice-vpc-perso-1278146278.eu-west-3.elb.amazonaws.com',
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
// => Fait !
