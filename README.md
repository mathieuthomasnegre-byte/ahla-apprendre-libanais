# Ahla : apprendre le libanais

Application web personnelle pour apprendre le libanais parlé : leçons d'expressions, révision espacée, exercice de prononciation et mini-dialogues.

## Lancer l'application

Prérequis : Node.js 18 ou plus récent.

```bash
npm start
```

Puis ouvrir http://localhost:5173 dans le navigateur. Sous Windows, `lancer.cmd` fait les deux d'un double clic.

Aucune dépendance à installer : l'appli n'utilise que Node.js (pour le petit serveur local) et le navigateur.

L'appli est aussi intégrée au portfolio 3D (dépôt `portfolio-3d-unity`), qui la copie dans son export web.

## Voix

La voix libanaise passe par Azure AI Speech (voix `ar-LB`). Il faut une ressource « Speech » sur un compte Azure, puis saisir sa clé et sa région dans **Réglages**. La clé reste dans le navigateur (`localStorage`) : elle n'est jamais écrite dans le code ni envoyée sur GitHub. Ne la mets dans aucun fichier du dépôt ; si un jour un fichier `.env` est nécessaire, il est déjà exclu par `.gitignore`.

## Contenu

Les expressions sont dans `js/data.js`. Elles ont été rédigées par une IA et doivent être relues par un locuteur natif.

## Décisions et sécurité

Voir `DECISIONS.md`.
