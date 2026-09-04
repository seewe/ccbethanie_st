# Déployer sur Netlify depuis GitHub

Ce projet est une SPA React (Vite) avec une API Express. Sur Netlify, l'API
tourne comme une fonction serverless (`netlify/functions/api.js`) plutôt que
comme un serveur Node persistant.

## 1. Pousser le code sur GitHub

```bash
git add -A
git commit -m "Prepare Netlify deployment"
git push
```

## 2. Créer le site sur Netlify

1. https://app.netlify.com → **Add new site → Import an existing project**.
2. Connectez votre compte GitHub et sélectionnez ce dépôt.
3. Netlify détecte automatiquement `netlify.toml` :
   - **Build command**: `npm run build:client`
   - **Publish directory**: `dist`
   - **Functions directory**: `netlify/functions`

## 3. Variables d'environnement (Site settings → Environment variables)

| Variable         | Requis                                   | Description                                                                                                                                                                                                                                                              |
| ---------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `MONGODB_URI`    | Fortement recommandé                     | Chaîne de connexion MongoDB (Atlas, par ex.). **Sans elle, les données écrites via l'API (prières, dons, visites, contacts, témoignages, etc.) ne persisteront pas** entre les invocations de la fonction, car le système de fichiers de Netlify Functions est éphémère. |
| `GEMINI_API_KEY` | Si des fonctionnalités IA sont utilisées | Clé API Gemini.                                                                                                                                                                                                                                                          |

Sans `MONGODB_URI`, le site fonctionne (contenu, formulaires renvoient une
réponse de succès), mais les données soumises seront perdues au prochain
cold start de la fonction.

## 4. Déployer

Cliquez sur **Deploy site**. Netlify build le client avec Vite et déploie
`netlify/functions/api.js` comme fonction serverless.

Les routes `/api/*` sont redirigées vers la fonction (voir `netlify.toml`);
toutes les autres routes retombent sur `index.html` pour le routage côté
client (React Router).

## 5. Vérifier après déploiement

- Ouvrez le site et confirmez que les pages chargent (culte, groupes, etc.).
- Testez un formulaire (ex. mur de prière) et vérifiez la réponse.
- Si `MONGODB_URI` est configuré, rafraîchissez la page pour confirmer que
  les nouvelles données persistent bien.

## Développement local (inchangé)

```bash
npm install
npm run dev       # serveur Node + Vite en mode dev, écrit dans data_store.json
```

## Build & exécution production locale (hors Netlify)

```bash
npm run build     # build client + bundle server.cjs
npm start         # sert dist/ + API via Node, écrit dans data_store.json
```
