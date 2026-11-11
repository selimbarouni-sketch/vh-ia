/**
 * Moteur de correction.
 *
 * Un barème transparent, exécuté localement : il compare la copie d'un élève
 * à la réponse attendue et aux étapes que l'enseignant veut voir, attribue un
 * crédit partiel et explique chaque point donné ou retiré.
 *
 * Tout se passe dans le navigateur — aucune copie ne quitte la page. Pour une
 * correction d'écriture libre, remplacer `gradeWork` par un appel au modèle,
 * côté serveur.
 */

export type Exercise = {
  id: string
  title: string
  prompt: string
  expected: string
  steps: string[]
  totalPoints: number
  student: string
}

export type CriterionStatus = 'correct' | 'partial' | 'missing' | 'review'

export type Criterion = {
  id: string
  label: string
  earned: number
  max: number
  status: CriterionStatus
  comment: string
}

export type GradeResult = {
  score: number
  total: number
  percent: number
  criteria: Criterion[]
  flags: string[]
  summary: string
  confidence: number
}

const SYMBOLS: Array<[RegExp, string]> = [
  [/[\u2212\u2013\u2014]/g, '-'],
  [/[\u00d7\u00b7]/g, '*'],
  [/\u00f7/g, '/'],
  [/\u00b2/g, '^2'],
  [/\u00b3/g, '^3'],
  [/[\u2018\u2019]/g, "'"],
  [/[\u201c\u201d]/g, '"'],
]

/** Minuscules, symboles unifiés, espaces et restes de TeX supprimés. */
export function normalize(input: string): string {
  let s = input.toLowerCase()
  for (const [re, to] of SYMBOLS) s = s.replace(re, to)
  return s
    .replace(/\\left|\\right|\\,/g, '')
    .replace(/[{}$]/g, '')
    .replace(/\s+/g, '')
}

function fractionValue(token: string): number {
  if (token.includes('/')) {
    const [a, b] = token.split('/').map(Number)
    return b ? a / b : NaN
  }
  return Number(token)
}

/** Tous les nombres d'une chaîne, fractions converties en décimales. */
export function numbers(input: string): number[] {
  const cleaned = normalize(input).replace(/(\d),(\d)/g, '$1.$2')
  const found = cleaned.match(/-?\d+(?:\.\d+)?(?:\/-?\d+(?:\.\d+)?)?/g) ?? []
  return found.map(fractionValue).filter((n) => Number.isFinite(n))
}

/** La dernière ligne de l'élève — là où se trouve normalement la réponse. */
function finalLine(raw: string): string {
  const lines = raw
    .split(/\n+/)
    .map((l) => l.trim())
    .filter(Boolean)
  return lines[lines.length - 1] ?? ''
}

function roundHalf(n: number): number {
  return Math.round(n * 2) / 2
}

function fr(n: number): string {
  return String(n).replace('.', ',')
}

type ValueMatch = { found: number; negated: number; total: number }

/** Combien de valeurs attendues apparaissent, et combien apparaissent avec le signe inverse. */
function compareValues(expected: number[], actual: number[]): ValueMatch {
  const pool = [...actual]
  let found = 0
  let negated = 0
  for (const value of expected) {
    const i = pool.findIndex((v) => Math.abs(v - value) < 1e-6)
    if (i !== -1) {
      found += 1
      pool.splice(i, 1)
      continue
    }
    const j = pool.findIndex((v) => Math.abs(v + value) < 1e-6)
    if (j !== -1) {
      negated += 1
      pool.splice(j, 1)
    }
  }
  return { found, negated, total: expected.length }
}

/** Où une étape apparaît dans la copie. */
function stepCoverage(step: string, work: string): 'full' | 'values' | 'none' {
  const norm = normalize(work)
  if (norm.includes(normalize(step))) return 'full'
  const stepNumbers = numbers(step)
  if (stepNumbers.length && stepNumbers.every((n) => numbers(work).some((u) => Math.abs(u - n) < 1e-6))) {
    return 'values'
  }
  return 'none'
}

export function gradeWork(input: {
  prompt: string
  expected: string
  steps: string[]
  student: string
  totalPoints: number
}): GradeResult {
  const { expected, steps, student, totalPoints } = input
  const total = Math.max(1, totalPoints)
  const answerMax = steps.length ? roundHalf(total * 0.5) : total
  const stepMax = steps.length ? roundHalf((total - answerMax) / steps.length) : 0

  const criteria: Criterion[] = []
  const flags: string[] = []

  /* ------------------------------------------------------ réponse finale */
  const answerText = finalLine(student)
  const expectedValues = numbers(expected)
  const studentValues = numbers(answerText)
  const normalizedAnswer = normalize(answerText)

  let answerEarned = 0
  let answerComment = ''
  let answerStatus: CriterionStatus = 'missing'

  if (!normalizedAnswer) {
    answerStatus = 'review'
    answerComment = "Aucune réponse finale trouvée dans la copie — rien à comparer pour l'instant."
    flags.push('Aucune réponse finale détectée')
  } else if (expectedValues.length) {
    const { found, negated, total: count } = compareValues(expectedValues, studentValues)
    const ratio = (found + negated * 0.5) / count
    answerEarned = roundHalf(answerMax * ratio)
    if (found === count) {
      answerStatus = 'correct'
      answerComment = `La réponse finale correspond à ${expected}.`
    } else if (found + negated === count) {
      answerStatus = 'partial'
      answerComment = `Les valeurs sont bonnes mais le signe est faux : la réponse attendue est ${expected}.`
      flags.push('Erreur de signe dans la réponse finale')
    } else if (found + negated > 0) {
      answerStatus = 'partial'
      answerComment = `Partiellement juste — attendu ${expected}, rendu ${answerText}.`
      flags.push('Réponse finale incomplète')
    } else {
      answerStatus = 'missing'
      answerComment = `Attendu ${expected}, rendu ${answerText}.`
      flags.push('La réponse finale ne correspond pas')
    }
  } else if (normalizedAnswer.includes(normalize(expected))) {
    answerEarned = answerMax
    answerStatus = 'correct'
    answerComment = `La réponse finale correspond à la forme attendue ${expected}.`
  } else {
    answerStatus = 'missing'
    answerComment = `Attendu ${expected}, rendu ${answerText}.`
    flags.push('La réponse finale ne correspond pas')
  }

  criteria.push({
    id: 'answer',
    label: 'Réponse finale',
    earned: answerEarned,
    max: answerMax,
    status: answerStatus,
    comment: answerComment,
  })

  /* --------------------------------------------------------- raisonnement */
  let fullSteps = 0
  let valueSteps = 0

  steps.forEach((step, index) => {
    const coverage = stepCoverage(step, student)
    let earned = 0
    let status: CriterionStatus = 'missing'
    let comment = `Aucune trace de ${step} dans la copie.`

    if (coverage === 'full') {
      earned = stepMax
      status = 'correct'
      fullSteps += 1
      comment = `Le raisonnement montre ${step}.`
    } else if (coverage === 'values') {
      earned = roundHalf(stepMax * 0.5)
      status = 'partial'
      valueSteps += 1
      comment = `Les valeurs de ${step} apparaissent, mais l'étape n'est pas rédigée.`
      flags.push(`Étape ${index + 1} non rédigée`)
    } else {
      flags.push(`Étape ${index + 1} manquante`)
    }

    criteria.push({
      id: `step-${index + 1}`,
      label: `Étape ${index + 1}`,
      earned,
      max: stepMax,
      status,
      comment,
    })
  })

  if (steps.length && fullSteps + valueSteps === 0) {
    flags.push('Seule la réponse finale — aucune trace de raisonnement')
  }

  /* -------------------------------------------------------------- total */
  const score = roundHalf(criteria.reduce((sum, c) => sum + c.earned, 0))
  const percent = Math.round((score / total) * 100)
  const matched = criteria.filter((c) => c.status === 'correct').length
  let confidence = 0.5 + 0.5 * (matched / criteria.length)
  if (student.trim().length < 12) confidence *= 0.7
  confidence = Math.min(0.99, Math.max(0.35, Math.round(confidence * 100) / 100))

  const verdict =
    percent >= 90
      ? 'Crédit complet, raisonnement clair.'
      : percent >= 60
        ? 'Presque : une ou deux étapes à revoir.'
        : percent >= 30
          ? 'Compréhension partielle : la méthode est là, mais le raisonnement se brise.'
          : "Pas encore — la copie ne suit pas la méthode attendue."

  const summary = `${fr(score)} / ${total} · ${verdict}`

  return { score, total, percent, criteria, flags: [...new Set(flags)], summary, confidence }
}

export const SAMPLE_EXERCISES: Exercise[] = [
  {
    id: 'quadratic',
    title: 'Algèbre II — équation du second degré',
    prompt: 'Résolvez x² − 5x + 6 = 0',
    expected: 'x = 2 ou x = 3',
    steps: ['(x − 2)(x − 3) = 0', 'x − 2 = 0', 'x − 3 = 0'],
    totalPoints: 20,
    student: 'x² − 5x + 6 = 0\n(x − 2)(x − 3) = 0\nx − 2 = 0  →  x = 2\nx = −2 or x = 3',
  },
  {
    id: 'integral',
    title: 'Analyse — intégrale définie',
    prompt: 'Calculez ∫₀³ 2x dx',
    expected: '9',
    steps: ['x²', '9 − 0 = 9'],
    totalPoints: 10,
    student: '∫ 2x dx = x²\nde 0 à 3 : 9 − 0 = 9\nréponse = 9',
  },
  {
    id: 'linear',
    title: 'Algèbre I — équation linéaire',
    prompt: 'Résolvez 3(x − 4) = 2x + 5',
    expected: 'x = 17',
    steps: ['3x − 12 = 2x + 5', '3x − 2x = 5 + 12'],
    totalPoints: 10,
    student: '3(x − 4) = 2x + 5\n3x − 12 = 2x + 5\nx = 17',
  },
]
