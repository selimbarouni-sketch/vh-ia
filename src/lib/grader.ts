/**
 * Correction engine.
 *
 * A transparent, local rubric engine: it compares a student's submission against
 * an expected answer and the working steps the teacher expects to see, awards
 * partial credit, and explains every point it gives or withholds.
 *
 * It runs entirely in the browser — no student work leaves the page. Swap
 * `gradeWork` for a model call to grade free-form handwriting instead.
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

/** Lowercase, unify math symbols, drop spacing and TeX scaffolding. */
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

/** Every number in a string, with fractions resolved to decimals. */
export function numbers(input: string): number[] {
  const cleaned = normalize(input).replace(/(\d),(\d)/g, '$1.$2')
  const found = cleaned.match(/-?\d+(?:\.\d+)?(?:\/-?\d+(?:\.\d+)?)?/g) ?? []
  return found.map(fractionValue).filter((n) => Number.isFinite(n))
}

/** The student's final line — where the answer normally lives. */
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

type ValueMatch = { found: number; negated: number; total: number }

/** How many expected values appear in the student's numbers, and how many appear negated. */
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

/** Where a single working step shows up in the submission. */
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

  /* ---------------------------------------------------------- final answer */
  const answerText = finalLine(student)
  const expectedValues = numbers(expected)
  const studentValues = numbers(answerText)
  const normalizedAnswer = normalize(answerText)

  let answerEarned = 0
  let answerComment = ''
  let answerStatus: CriterionStatus = 'missing'

  if (!normalizedAnswer) {
    answerStatus = 'review'
    answerComment = 'No final answer found in the submission — nothing to compare against yet.'
    flags.push('No final answer detected')
  } else if (expectedValues.length) {
    const { found, negated, total: count } = compareValues(expectedValues, studentValues)
    const ratio = (found + negated * 0.5) / count
    answerEarned = roundHalf(answerMax * ratio)
    if (found === count) {
      answerStatus = 'correct'
      answerComment = `Final answer matches the expected ${expected}.`
    } else if (found + negated === count) {
      answerStatus = 'partial'
      answerComment = `Right values, wrong sign: the expected answer is ${expected}.`
      flags.push('Sign error in the final answer')
    } else if (found + negated > 0) {
      answerStatus = 'partial'
      answerComment = `Partially correct — expected ${expected}, submitted ${answerText}.`
      flags.push('Incomplete final answer')
    } else {
      answerStatus = 'missing'
      answerComment = `Expected ${expected}, submitted ${answerText}.`
      flags.push('Final answer does not match')
    }
  } else if (normalizedAnswer.includes(normalize(expected))) {
    answerEarned = answerMax
    answerStatus = 'correct'
    answerComment = `Final answer matches the expected form ${expected}.`
  } else {
    answerStatus = 'missing'
    answerComment = `Expected ${expected}, submitted ${answerText}.`
    flags.push('Final answer does not match')
  }

  criteria.push({
    id: 'answer',
    label: 'Final answer',
    earned: answerEarned,
    max: answerMax,
    status: answerStatus,
    comment: answerComment,
  })

  /* ---------------------------------------------------------------- working */
  let fullSteps = 0
  let valueSteps = 0

  steps.forEach((step, index) => {
    const coverage = stepCoverage(step, student)
    let earned = 0
    let status: CriterionStatus = 'missing'
    let comment = `No evidence of ${step} in the submitted work.`

    if (coverage === 'full') {
      earned = stepMax
      status = 'correct'
      fullSteps += 1
      comment = `Working shows ${step}.`
    } else if (coverage === 'values') {
      earned = roundHalf(stepMax * 0.5)
      status = 'partial'
      valueSteps += 1
      comment = `The values from ${step} appear, but the step itself is not written out.`
      flags.push(`Step ${index + 1} not written out`)
    } else {
      flags.push(`Step ${index + 1} missing`)
    }

    criteria.push({
      id: `step-${index + 1}`,
      label: `Step ${index + 1}`,
      earned,
      max: stepMax,
      status,
      comment,
    })
  })

  if (steps.length && fullSteps + valueSteps === 0) {
    flags.push('Only a final answer — no working shown')
  }

  /* ------------------------------------------------------------------ total */
  const score = roundHalf(criteria.reduce((sum, c) => sum + c.earned, 0))
  const percent = Math.round((score / total) * 100)
  const matched = criteria.filter((c) => c.status === 'correct').length
  let confidence = 0.5 + 0.5 * (matched / criteria.length)
  if (student.trim().length < 12) confidence *= 0.7
  confidence = Math.min(0.99, Math.max(0.35, Math.round(confidence * 100) / 100))

  const verdict =
    percent >= 90
      ? 'Full credit with clear working.'
      : percent >= 60
        ? 'Mostly there — one or two steps need a second look.'
        : percent >= 30
          ? 'Partial understanding: the method is visible but the reasoning breaks down.'
          : 'Not yet — the submission does not follow the expected method.'

  const summary = `${score} / ${total} · ${verdict}`

  return { score, total, percent, criteria, flags: [...new Set(flags)], summary, confidence }
}

export const SAMPLE_EXERCISES: Exercise[] = [
  {
    id: 'quadratic',
    title: 'Algebra II — solve a quadratic',
    prompt: 'Solve x² − 5x + 6 = 0',
    expected: 'x = 2 or x = 3',
    steps: ['(x − 2)(x − 3) = 0', 'x − 2 = 0', 'x − 3 = 0'],
    totalPoints: 20,
    student: 'x² − 5x + 6 = 0\n(x − 2)(x − 3) = 0\nx − 2 = 0  →  x = 2\nx = −2 or x = 3',
  },
  {
    id: 'integral',
    title: 'Calculus — definite integral',
    prompt: 'Evaluate ∫₀³ 2x dx',
    expected: '9',
    steps: ['x²', '9 − 0 = 9'],
    totalPoints: 10,
    student: '∫ 2x dx = x²\nfrom 0 to 3: 9 − 0 = 9\nanswer = 9',
  },
  {
    id: 'linear',
    title: 'Algebra I — linear equation',
    prompt: 'Solve 3(x − 4) = 2x + 5',
    expected: 'x = 17',
    steps: ['3x − 12 = 2x + 5', '3x − 2x = 5 + 12'],
    totalPoints: 10,
    student: '3(x − 4) = 2x + 5\n3x − 12 = 2x + 5\nx = 17',
  },
]
