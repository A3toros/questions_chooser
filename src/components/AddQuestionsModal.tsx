import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { ADD_QUESTIONS_BANK, CATEGORIES, ROUNDS, bulkAddQuestions, parseQuestions } from '../lib/api'
import type { Category, Difficulty } from '../types'
import { Button } from './Button'
import { Modal } from './Modal'
import { Spinner } from './Spinner'

interface Props {
  open: boolean
  onClose: () => void
  onSuccess: () => void
}

export function AddQuestionsModal({ open, onClose, onSuccess }: Props) {
  const [category, setCategory] = useState<Category>('grammar')
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [text, setText] = useState('')
  const [answerKeys, setAnswerKeys] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const parsed = parseQuestions(text)
  const keys = answerKeys.split('\n').map((k) => k.trim())

  async function handleSubmit() {
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

  return (
    <Modal
      open={open}
      onClose={loading ? () => {} : onClose}
      title="Add questions"
      description="One question per line, or separate blocks with a blank line."
    >
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

      <div className="mt-6 flex justify-end gap-3">
        <Button variant="outline" onClick={onClose} disabled={loading}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={loading || !parsed.length}>
          {loading ? 'Adding…' : 'Add questions'}
        </Button>
      </div>
    </Modal>
  )
}
