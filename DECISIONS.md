# Décisions du projet

Journal des choix techniques et des vérifications de sécurité (règle « Sécurité des dépendances, outils et services externes »).

## Cadre du projet (2026-11-13)

- Application personnelle pour apprendre le libanais parlé (expressions, vocabulaire, prononciation).
- Support : application web (navigateur PC et téléphone).
- Écriture : alphabet arabe + translittération latine + traduction française.
- Niveau de départ : débutant complet.
- Voix : importante dès la première version, pour éviter les erreurs de prononciation.

## Voix — vérification des options (2026-11-13)

Statut : **option A (Azure AI Speech) acceptée par l'utilisateur le 2026-11-13**, complétée par l'option C (réécoute locale). Intégration par requêtes HTTPS directes, sans SDK ni package. La clé est saisie par l'utilisateur dans les Réglages et reste dans son navigateur. Une politique CSP dans `index.html` limite les connexions de l'appli à elle-même et aux domaines `*.tts.speech.microsoft.com` et `*.stt.speech.microsoft.com`.

## Dépendances (2026-11-13)

Aucun package installé. L'appli est en HTML, CSS et JavaScript natifs ; le serveur local `server.js` n'utilise que les modules intégrés de Node.js et n'écoute que sur 127.0.0.1.

## Contenu de la première version (2026-11-13)

Choisi par l'utilisateur : leçons d'expressions, révision espacée, exercice de prononciation, mini-dialogues.

### Option A — Azure AI Speech (Microsoft)

- Éditeur : Microsoft. Documentation : https://learn.microsoft.com/azure/ai-services/speech-service/
- Synthèse vocale : locale `ar-LB` (Arabe, Liban) listée, voix `ar-LB-LaylaNeural` (femme) et `ar-LB-RamiNeural` (homme). Noms de voix à reconfirmer sur la page officielle au moment de l'intégration.
- Reconnaissance vocale : `ar-LB` pris en charge en temps réel.
- Évaluation de prononciation (score par son) : **non disponible pour `ar-LB`** ; seuls `ar-EG` et `ar-SA` sont listés côté arabe.
- Données transmises : le texte à prononcer (synthèse) et l'audio du micro (reconnaissance) partent vers les serveurs Azure, chiffrés en transit.
- Conservation, d'après la documentation Microsoft : synthèse en temps réel, ni le texte ni l'audio ne sont stockés ; reconnaissance en temps réel, audio traité en mémoire, aucune donnée stockée au repos. L'usage pour l'entraînement des voix préconstruites n'est pas mentionné explicitement sur les pages lues.
- Accès : une clé API Azure, à créer par l'utilisateur. Peut s'utiliser par simples requêtes HTTPS, sans installer de SDK ni de package.
- Risques : la clé est stockée dans le navigateur de l'utilisateur ; compte Azure requis ; quota gratuit non vérifié.

### Option B — Web Speech API du navigateur

- Synthèse : utilise les voix installées sur l'appareil. Sur ce PC, seules des voix françaises et anglaises sont installées ; aucune voix arabe, et Windows ne propose pas de voix libanaise locale.
- Reconnaissance : dans Chrome, l'audio est envoyé par défaut à un service Google, avec peu de documentation sur la conservation. Prise en charge locale de `ar-LB` non confirmée.
- Conclusion : ne répond pas au besoin de prononciation libanaise correcte.

### Option C — Écoute et comparaison locales

- L'utilisateur s'enregistre et se réécoute à côté du modèle. L'enregistrement reste sur l'appareil.
- Complément possible aux options A ou B, aucun service externe.

### Limites connues

- Aucun service vérifié ne note la prononciation libanaise son par son. Le contrôle possible est : transcription `ar-LB` comparée au texte attendu, plus réécoute de sa propre voix.
- Le contenu libanais (expressions, translittérations) sera rédigé par une IA : à faire relire par un locuteur natif.
