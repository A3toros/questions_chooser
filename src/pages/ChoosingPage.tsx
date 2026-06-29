import { motion } from 'framer-motion'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { AddQuestionsModal } from '../components/AddQuestionsModal'
import { CategoryTabs, RoundTabs } from '../components/CategoryTabs'
import { HowItWorks } from '../components/HowItWorks'
import { Layout } from '../components/Layout'
import { ProgressBar } from '../components/ProgressBar'
import { QuestionListItem } from '../components/QuestionListItem'
import { SkeletonCard } from '../components/Skeleton'
import { Toast } from '../components/Toast'
import { CATEGORIES, ROUNDS, fetchQuestions, submitVote } from '../lib/api'
import { getTeacherId } from '../lib/teacher'
import type { Category, Difficulty, Vote } from '../types'

export function ChoosingPage() {
  const teacherId = getTeacherId()
  const queryClient = useQueryClient()
  const [category, setCategory] = useState<Category>('grammar')
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [modalOpen, setModalOpen] = useState(false)
  const [savingId, setSavingId] = useState<string | null>(null)
  const [pendingVote, setPendingVote] = useState<Vote | null>(null)
  const [toast, setToast] = useState<{ msg: string; type: 'error' | 'success' } | null>(null)

  const { data, isLoading, error } = useQuery({
    queryKey: ['questions', category, difficulty, teacherId],
    queryFn: () => fetchQuestions({ category, difficulty, teacherId, all: true }),
  })

  const questions = data?.questions ?? []
  const rated = questions.filter((q) => q.my_vote).length
  const total = questions.length

  const voteMutation = useMutation({
    mutationFn: ({ id, vote }: { id: string; vote: Vote }) => submitVote(id, teacherId, vote),
    onSuccess: (result) => {
      queryClient.setQueryData(
        ['questions', category, difficulty, teacherId],
        (old: { questions: typeof questions } | undefined) => {
          if (!old) return old
          return {
            questions: old.questions.map((q) =>
              q.id === result.question.id
                ? { ...q, ...result.question, my_vote: result.vote }
                : q
            ),
          }
        }
      )
      queryClient.invalidateQueries({ queryKey: ['leaderboard'] })
    },
  })

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 4000)
      return () => clearTimeout(t)
    }
  }, [toast])

  async function handleVote(questionId: string, vote: Vote) {
    if (savingId) return
    setSavingId(questionId)
    setPendingVote(vote)
    try {
      await voteMutation.mutateAsync({ id: questionId, vote })
    } catch (e) {
      setToast({ msg: e instanceof Error ? e.message : 'Failed to save vote', type: 'error' })
    } finally {
      setSavingId(null)
      setPendingVote(null)
    }
  }

  const catLabel = CATEGORIES[category].label
  const roundLabel = ROUNDS.find((r) => r.id === difficulty)?.label ?? difficulty
  const isSaving = savingId !== null

  return (
    <Layout onAddQuestions={() => setModalOpen(true)}>
      <motion.div
        key={`${category}-${difficulty}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <HowItWorks variant="choosing" />

        <div className="mb-6">
          <ProgressBar rated={rated} total={total} label={`${catLabel} · ${roundLabel}`} />
          <p className="mt-2 text-sm text-gray-500">{total} question{total !== 1 ? 's' : ''}</p>
        </div>

        <div className="mb-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">Category</p>
          <CategoryTabs value={category} onChange={setCategory} disabled={isSaving} />
        </div>

        <div className="mb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">Round</p>
          <RoundTabs value={difficulty} onChange={setDifficulty} disabled={isSaving} />
        </div>

        {error && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4 text-red-600">
            {error.message}
          </motion.p>
        )}

        {isLoading ? (
          <div className="space-y-4">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : questions.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-12 text-center">
            <p className="text-lg font-medium text-gray-700">No questions in this slice</p>
            <p className="mt-1 text-sm text-gray-500">Try another category or round, or add questions.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {questions.map((q, i) => (
              <QuestionListItem
                key={q.id}
                question={q}
                index={i}
                saving={savingId === q.id}
                pendingVote={savingId === q.id ? pendingVote : null}
                onVote={(vote) => handleVote(q.id, vote)}
              />
            ))}
          </div>
        )}
      </motion.div>

      <AddQuestionsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={() => {
          queryClient.invalidateQueries({ queryKey: ['questions'] })
          setToast({ msg: 'Questions added successfully', type: 'success' })
        }}
      />

      <Toast
        message={toast?.msg ?? ''}
        type={toast?.type}
        show={!!toast}
        onDismiss={() => setToast(null)}
      />
    </Layout>
  )
}
