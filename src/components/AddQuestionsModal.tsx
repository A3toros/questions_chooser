import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ADD_QUESTIONS_BANK, CATEGORIES, ROUNDS, bulkAddQuestions, parseQuestions } from '../lib/api'
import type { Category, Difficulty, QuestionPool } from '../types'
import { Button } from './Button'
import { Modal } from './Modal'
import { PageTabs } from './PageTabs'
import { Spinner } from './Spinner'

interface Props {
  open: boolean
  onClose: () => void
  onSuccess: () => void
}

export function AddQuestionsModal({ open, onClose, onSuccess }: Props) {
  const [pool, setPool] = useState<QuestionPool>('competition')
  const [category, setCategory] = useState<Category>('grammar')
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [text, setText] = useState('')
  const [answerKeys, setAnswerKeys] = useState('')
  const [tieQuestion, setTieQuestion] = useState('')
  const [tieAnswer, setTieAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const parsed = parseQuestions(text)
  const keys = answerKeys.split('\n').map((k) => k.trim())

  useEffect(() => {
    if (!open) {
      setPool('competition')
      setError('')
    }
  }, [open])

  async function handleSubmitCompetition() {
    if (!parsed.length) return
    setLoading(true)
    setError('')
    try {
      const questions = parsed.map((t, i) => ({
        bank: ADD_QUESTIONS_BANK,
        category,
        content: {
          text: t,
          difficulty,
          ...(keys[i] && { answerKey: keys[i] }),
        },
      }))
      await bulkAddQuestions(questions)
      setText('')
      setAnswerKeys('')
      onSuccess()
      onClose()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to add questions')
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmitTiebreaker() {
    const questionText = tieQuestion.trim()
    const answer = tieAnswer.trim()
    if (!questionText) return
    if (!answer) {
      setError('Answer is required for tie breaking questions')
      return
    }
    setLoading(true)
    setError('')
    try {
      await bulkAddQuestions([
        {
          bank: ADD_QUESTIONS_BANK,
          category: 'general_knowledge',
          content: {
            text: questionText,
            difficulty: 'easy',
            answerKey: answer,
            isTiebreaker: true,
          },
        },
      ])
      setTieQuestion('')
      setTieAnswer('')
      onSuccess()
      onClose()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to add question')
    } finally {
      setLoading(false)
    }
  }

  const isCompetition = pool === 'competition'

  return (
    <Modal
      open={open}
      onClose={loading ? () => {} : onClose}
      title="Add questions"
      description={
        isCompetition
          ? 'One question per line, or separate blocks with a blank line.'
          : 'Free-answer tie breaking question with a single correct answer.'
      }
    >
      <PageTabs
        tabs={[
          { id: 'competition', label: 'Leaderboard' },
          { id: 'tiebreaker', label: 'Tie breaking' },
        ]}
        value={pool}
        onChange={setPool}
        layoutId="add-questions-pool-tab"
        className="mt-4"
      />

      {isCompetition ? (
        <>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <label className="text-sm">
              <span className="font-medium text-gray-700">Category</span>
              <select
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 disabled:opacity-50"
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                disabled={loading}
              >
                {Object.entries(CATEGORIES).map(([id, { label }]) => (
                  <option key={id} value={id}>{label}</option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              <span className="font-medium text-gray-700">Round</span>
              <select
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 disabled:opacity-50"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                disabled={loading}
              >
                {ROUNDS.map((r) => (
                  <option key={r.id} value={r.id}>{r.label}</option>
                ))}
              </select>
            </label>
          </div>

          <label className="mt-4 block text-sm">
            <span className="font-medium text-gray-700">Questions</span>
            <textarea
              className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 font-mono text-sm disabled:opacity-50"
              rows={6}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste questions here…"
              disabled={loading}
            />
          </label>

          <label className="mt-3 block text-sm">
            <span className="font-medium text-gray-700">Answer keys (optional, one per line)</span>
            <textarea
              className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 font-mono text-sm disabled:opacity-50"
              rows={3}
              value={answerKeys}
              onChange={(e) => setAnswerKeys(e.target.value)}
              disabled={loading}
            />
          </label>

          <AnimatePresence>
            {parsed.length > 0 && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 text-sm font-medium text-primary"
              >
                {parsed.length} question{parsed.length !== 1 ? 's' : ''} ready to add
              </motion.p>
            )}
          </AnimatePresence>
        </>
      ) : (
        <>
          <label className="mt-4 block text-sm">
            <span className="font-medium text-gray-700">Question</span>
            <textarea
              className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm disabled:opacity-50"
              rows={4}
              value={tieQuestion}
              onChange={(e) => setTieQuestion(e.target.value)}
              placeholder="Enter the tie breaking question…"
              disabled={loading}
            />
          </label>

          <label className="mt-3 block text-sm">
            <span className="font-medium text-gray-700">Answer</span>
            <input
              type="text"
              className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm disabled:opacity-50"
              value={tieAnswer}
              onChange={(e) => setTieAnswer(e.target.value)}
              placeholder="Correct free-text answer"
              disabled={loading}
            />
          </label>
        </>
      )}

      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 flex items-center gap-3 rounded-xl bg-teal-50 px-4 py-3 text-sm text-teal-800"
        >
          <Spinner size="sm" />
          Writing to database…
        </motion.div>
      )}

      {error && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-sm text-red-600">
          {error}
        </motion.p>
      )}

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button variant="outline" onClick={onClose} disabled={loading} className="w-full sm:w-auto">
          Cancel
        </Button>
        <Button
          onClick={isCompetition ? handleSubmitCompetition : handleSubmitTiebreaker}
          disabled={
            loading ||
            (isCompetition ? !parsed.length : !tieQuestion.trim() || !tieAnswer.trim())
          }
          className="w-full sm:w-auto"
        >
          {loading ? 'Adding…' : isCompetition ? 'Add questions' : 'Add tie breaker'}
        </Button>
      </div>
    </Modal>
  )
}
