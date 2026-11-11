# VH.IA — la correction des évaluations par IA

Un site vitrine doublé d'une démo de correction fonctionnelle pour un outil de correction assistée par IA.
VH.IA lit le travail d'un élève, attribue le crédit partiel, explique exactement où le raisonnement se
brise et transforme les erreurs en exercices ciblés.

Construit avec **Vite + React + TypeScript + Tailwind CSS v4**. Tous les textes, le code et les
illustrations sont originaux ; aucun code, texte ou visuel tiers n'est utilisé.

## Démarrage

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # vérification des types + bundle dans dist/
npm run preview  # sert le bundle de production
```

Nécessite Node 20+.

## Le moteur de correction

`src/lib/grader.ts` est un moteur de barème local et transparent, utilisé par la section de démo
(`src/components/Grader.tsx`) :

- normalise l'écriture mathématique (signes moins, exposants, fractions, restes de TeX)
- compare la dernière ligne de l'élève à la réponse attendue, avec tolérance numérique et réponses
  multiples (`x = 2 ou x = 3`)
- détecte les **erreurs de signe** et les réponses incomplètes au lieu de tout marquer faux
- vérifie les étapes que l'enseignant attend, avec demi-crédit quand les valeurs apparaissent mais que
  l'étape n'est pas rédigée
- renvoie les points par critère, les commentaires, les alertes, un résumé et un score de confiance

Tout s'exécute dans le navigateur : aucune copie n'est envoyée nulle part et rien n'est corrigé par un
modèle. Dans l'interface, l'enseignant doit valider la correction avant qu'elle ne soit envoyée.

### Brancher un vrai modèle

`gradeWork()` reçoit `{ prompt, expected, steps, student, totalPoints }` et renvoie un `GradeResult`.
Pour corriger de l'écriture libre ou des raisonnements ouverts, garder ce type de retour et remplacer le
corps de la fonction par un appel au modèle, **côté serveur** (jamais de clé API dans le navigateur).
L'étape de validation par l'enseignant fait partie du produit : la conserver.

## Structure

```
src/
  App.tsx                 composition de la page
  index.css               jetons de thème Tailwind v4, animations, classes utilitaires
  lib/grader.ts           moteur de correction et crédit partiel, devoirs d'exemple
  components/
    Nav.tsx               navigation collante avec menus déroulants + panneau mobile
    Hero.tsx              titre, boutons, carte de correction flottante
    Grader.tsx            démo de correction interactive (exemples ou devoir personnel)
    mocks.tsx             maquettes produit (correction, analyses, exercices, assistant)
    Sections.tsx          chiffres clés, piliers, produit, témoignages, intégrations, confidentialité, CTA
    Footer.tsx
    ui.tsx                icônes, logo, mascotte, apparition au défilement, titres partagés
```

## Notes

- Les intégrations et badges de conformité (FERPA, COPPA, RGPD, SOC 2) sont des exemples à remplacer
  par ce que le produit réel prend en charge.
- Les témoignages sont fictifs.
- Le chiffre « 3,4 h » du hero est un texte marketing d'exemple.
- Les polices viennent de Google Fonts (Inter, Caveat) ; le reste est en CSS et SVG inline.

## Déploiement

`npm run build` produit un site entièrement statique dans `dist/`, déployable sur n'importe quel hébergeur
statique (GitHub Pages, Cloudflare Pages, Netlify, Vercel).
