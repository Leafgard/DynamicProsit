<p align="center"><img src="https://raw.githubusercontent.com/Leafgard/DynamicProsit/master/build/icon.png" height="128" alt="DynamicProsit"></p>
<h3 align="center">DynamicProsit</h3>
<p align="center"><i>Interface d'édition de Prosits</i><p>

<p align="center">
  <a href="https://github.com/Leafgard/DynamicProsit/issues">
      <img src="https://img.shields.io/github/issues/Leafgard/DynamicProsit.svg?style=for-the-badge">
  </a>
  <a href="https://github.com/Leafgard/DynamicProsit/stargazers">
      <img src="https://img.shields.io/github/stars/Leafgard/DynamicProsit.svg?style=for-the-badge">
  </a>
  <a href="https://paypal.me/Leafgard">
    <img src="https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&amp;style=for-the-badge">
  </a>
</p>

<p align="center">
  <a href="#fonctionnalites">Fonctionnalités</a> •
  <a href="#installation">Installation</a> •
  <a href="#utilisation">Utilisation</a> •
  <a href="#concu-avec">Conçu avec</a> •
  <a href="#license">License</a>
</p>

<p align="center"><img src="https://raw.githubusercontent.com/Leafgard/DynamicProsit/master/assets/img/example.png" alt="DynamicProsit"></p>

## Fonctionnalités

* Interface simple
* Génération d'un document Word (.docx) contenant les données du prosit
* Importation d'un modèle personnalisé
* Autocomplétion des mots-clés via Wikipédia (facultatif)
* Sauvegarde automatique au fur et à mesure de la complétion du prosit
* Thème clair / foncé
* Compatibilité MacOS, Windows et Linux

## Installation

Téléchargez la dernière version [ici !](https://github.com/Leafgard/DynamicProsit/releases)

L'application n'est pas signée numériquement (c'est cher), et donc pas reconnue vis-à-vis de Windows; il faudra donc passer outre l'avertissement de sécurité.

## Utilisation

### Créer son propre modèle

Dès la version **3.0.0**, vous avez la possibilité de créer et d'ajouter votre propre modèle !

Il vous suffit de créer un nouveau document Word, et d'y inscrire les tags suivant pour remplacer les données remplies dans DynamicProsit.

#### Liste des tags

- `{title}` - Titre
- `{link}` - Lien du Prosit sur Moodle
- `{date}` - Date & heure à la génération du Prosit
- `{generalization}` - Généralisation
- `{context}` - Contexte
- `{animator}` - Animateur
- `{scribe}` - Scribe
- `{secretary}` - Secrétaire
- `{administrator}` - Gestionnaire
- `{-w:p keywords}{keyword} : {definition}{/keywords}` - Liste des mots-clés : définition (Si existant !)
- `{-w:p contraints}{.} {/contraints}` - Liste des contraintes
- `{-w:p problematics}{.} {/problematics}` - Liste des problématiques
- `{-w:p solutions}{.} {/solutions}` - Liste des pistes de solutions
- `{-w:p deliverables}{.} {/deliverables}` - Liste des livrables
- `{-w:p actions}{.} {/actions}` - Liste du plan d'action

Les tags sont sensibles aux styles que vous leur donnez, par exemple, si vous écrivez `{animator}` en *italique*, il remplacera le tag par le nom de l'animateur en *italique* !

Voici un exemple:

<p align="center">
  <img src="https://raw.githubusercontent.com/Leafgard/DynamicProsit/master/assets/img/example2.png" alt="DynamicProsit" width="800">
  <br>
  <img src="https://raw.githubusercontent.com/Leafgard/DynamicProsit/master/assets/img/down_arrow.png" alt="down_arrow" height="80">
  <br>
  <img src="https://raw.githubusercontent.com/Leafgard/DynamicProsit/master/assets/img/example3.png" alt="DynamicProsit" width="800">
</p>

## License

Ce projet est sous licence MIT - voir le fichier [LICENSE.md](LICENSE.md) pour plus de détails.
