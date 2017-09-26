# Une procédure pour générer dynamiquement des cartes de hexcrawl (application à Oltréé !)

---

## Motivation

[Oltréé !](http://johndoe-rpg.com/catalogue/oltree) est un JDR encourageant le jeu *sandbox* et favorisant la création dynamique du contenu narratif (par le recours à l'improvisation et à des outils de narration partagée). Si le travail de préparation du MJ s'en trouve considérablement réduit, il est toutefois nécessaire de préparer la carte qui servira de support à l'aventure. Cette contribution propose une méthode pour supprimer cette étape de création de la carte *a priori* du jeu. Le MJ peut ainsi lancer une campagne avec uniquement quelques notes sur les factions qu'il veut convoquer (c'est-à-dire 15 minutes dans un bus avec un bloc-note et un stylo). Par ailleurs, en bon adepte du [pouvoir oraculaire des dés](http://grognardia.blogspot.fr/2008/04/on-oracular-power-of-dice.html), laisser au hasard la génération de la carte rend possible certaines surprises qu'une génération manuelle aurait peut-être censurées.

---

## Procédure de génération

La procédure de génération s'appuie sur les tables présentées dans le GLF à partir de la page 40.

<!--
*Déterminer le rayon de la carte* (c'est-à-dire le nombre d'hexagones qui séparent le centre du bord). Une carte de rayon 0 possède un unique hexagone (le centre). Une carte de rayon 1 possède 7 hexagones (le centre et ses 6 voisins). Plus généralement, une carte possède `1 + 6 * r * (r + 1) / 2` hexagones (avec r le rayon).
-->

### Déterminer les communautés

La nature et la position des communautés sont déterminées au hasard, mais en amont de la génération de la carte. Connaître ces informations permet au MJ d'improviser de manière cohérente à mesure que les PJ explorent la carte (gestion des rumeurs, voyager en direction d'une communauté, etc.). Il faut donc se doter d'un moyen de déterminer aléatoirement un hexagone au sein de la carte. Ceci n'est pas couvert par ce document, car cela dépend du système de coordonnées ou de numérotation des hexagones retenus.

1. Déterminer aléatoirement la position de la *cité* (GLF p. 40).
2. Déterminer le nombre d'*autres communautés* (entre 3 et 10) et de *communautés féériques* (entre 1 et 8), ainsi que leurs nature, thèmes, fonctions, peuples, etc. (GLF pp. 40--44).
3. Pour chaque communauté, j'ajoute pour ma part une étape de placement au sein d'un hexagone : 1D7 (1: centre, 2: nord, 3: nord-est, 4: sud-est, 5: sud, 6: sud-ouest, 7: nord-ouest). Ça m'aide à visualiser et à décrire la géographie. C'est également utile pour les six étapes de sécurisation (que j'envisage de passer à sept).

Vous avez donc une carte vierge avec des cités déterminées et placées. Quel que soit le terrain, cela donne déjà une bonne idée de la dynamique sociale de la carte.

### Explorer un hexagone

*Notes : La notion de zone (GLF p. 40) est supprimée en faveur d'un type de relief par hexagone contrôlé par un algorithme de tirage prenant en compte le relief des 6 voisins. C'est une préférence personnelle : j'aime les cartes variées, et les zones d'Oltréé ! ne permettent pas d'avoir des cartes marrantes suivant mes critères. Types de reliefs, végétations et obstacles naturels sont exposés en page 40 du GLF.*

1. Quand les PJ entrent sur un hexagone non exploré, on commence par déterminer son relief. Celui-ci est fonction du relief de ses voisins déjà explorés et du hasard. On jette deux dés (des d8, *of course*) : le premier est le *dé de voisinage*, le second est le *dé de relief*. Si le dé de voisinage fait de 1 à 6, l'hexagone prend le relief de son voisin indiqué par le dé (1: voisin nord, 2: voisin nord-est, 3: voisin sud-est, 4: voisin sud, 5: voisin sud-ouest, 6: voisin nord-ouest). Si le voisin tiré n'est pas exploré ou si le dé de voisinage fait 7 ou 8, l'hexagone courant prend le relief indiqué par le dé de relief (0: Eaux, 1: Rivages, 2: Plaines, 3: Vallée fluviale, 4: Collines, 5: Plateaux, 6: Montagnes basses, 7: Hautes montagnes). Cette pondération naturelle par les voisins peut générer des petites zones, et évite que la carte soit trop chaotique. Si une communauté se trouve sur l'hexagone et que le relief paraît délirant (ex : comptoir cavalier dans les eaux), voilà l'occasion d'inventer une justification intéressante (ex : une île s'est magiquement détachée du continent et les cavaliers sont forcés d'y vivre, cherchant ceux qui pourront, magiquement, rattacher leur lopin de terrer au reste du monde).
2. On tire alors la végétation (sans pondération). On peut obtenir des combinaisons étonnantes (ex : forêt épaisse dans les eaux) : j'adore ce genre de trucs, ça me donne l'occasion d'inventer des particularités botanico-géographiques qui marquent les esprits et contribuent à rendre le monde étonnant et fantastique. Mais rien n'interdit de relancer le dé si le résultat vous déplaît (je me l'interdis cependant, et préfère me forcer à improviser une explication intéressante).
3. On tire un obstacle naturel. J'aime qu'il y ait 25% de chance qu'un obstacle naturel soit présent sur un hexagone, mais vous pouvez ajuster. Comme pour les communautés, je tire sa position au D7. Parfois, un obstacle naturel sera proche voire même superposé à une communauté : voilà qui peut donc générer de la narration intéressante et typer davantage la communauté.

### TODO

Voir ma [*to do list*](https://github.com/Amleth/dynamic-random-hexcrawl/blob/master/TODO.md).

Vous pouvez me contacter à l'adresse : thomas.bottini@*le service de messagerie du GAFA commençant par un « g »*

---

## Exemples avec le simulateur

Pour avoir une idée des résultats fournis par la méthode de génération dynamique exposée *supra*, j'ai développé un [simulateur](http://155.133.131.96/) qui fait tout les tirages et représente graphiquement de manière symbolique la carte générée. En générant des centaines de cartes, je me suis aperçu que toutes me satisfaisaient d'un point de vue ludique.

![Capture d'écran](screenshot-01.png)

---

## Tester le code

Ce programme est une application JS tournant dans un navigateur (React+Redux+Webpack+Babel).

	npm i
	npm run dev
	-> http://localhost:8080