import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Button } from '../components/Button'
import { Layout } from '../components/Layout'
import { Modal } from '../components/Modal'
import { PhotoUploadButton } from '../components/PhotoUploadButton'
import { SkeletonCard } from '../components/Skeleton'
import { Spinner } from '../components/Spinner'
import { Toast } from '../components/Toast'
import { deletePhoto, downloadPhoto, listPhotos } from '../lib/photos'
import { isSupabaseConfigured } from '../lib/supabase'
import type { Photo } from '../types'

export function PhotosPage() {
  const queryClient = useQueryClient()
  const [toast, setToast] = useState<{ msg: string; type: 'error' | 'success' } | null>(null)
  const [verticalWarning, setVerticalWarning] = useState<{ width: number; height: number } | null>(null)
  const [photoToDelete, setPhotoToDelete] = useState<Photo | null>(null)
  const [downloadingId, setDownloadingId] = useState<string | null>(null)

  const { data: photos = [], isLoading, error, refetch } = useQuery({
    queryKey: ['photos'],
    queryFn: listPhotos,
  })

  const deleteMutation = useMutation({
    mutationFn: deletePhoto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['photos'] })
      setPhotoToDelete(null)
      setToast({ msg: 'Photo deleted', type: 'success' })
    },
    onError: (e) => {
      setToast({ msg: e instanceof Error ? e.message : 'Delete failed', type: 'error' })
    },
  })

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 4000)
      return () => clearTimeout(t)
    }
  }, [toast])

  async function handleDownload(photo: Photo) {
    setDownloadingId(photo.id)
    try {
      await downloadPhoto(photo)
    } catch (e) {
      setToast({ msg: e instanceof Error ? e.message : 'Download failed', type: 'error' })
    } finally {
      setDownloadingId(null)
    }
  }

  return (
    <Layout>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Photos</h1>
            <p className="mt-1 text-sm text-gray-500">
              Upload any photo. Horizontal is preferred; vertical photos are accepted with a reminder.
            </p>
          </div>
          <PhotoUploadButton
            onUploaded={() => {
              queryClient.invalidateQueries({ queryKey: ['photos'] })
              refetch()
            }}
            onSuccess={(msg) => setToast({ msg, type: 'success' })}
            onError={(msg) => setToast({ msg, type: 'error' })}
            onVerticalWarning={(width, height) => setVerticalWarning({ width, height })}
          />
        </div>

        {!isSupabaseConfigured() && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-900">
            <p className="font-medium">Supabase not configured</p>
            <p className="mt-1 text-sm">
              Add <code className="rounded bg-amber-100 px-1">NEXT_PUBLIC_SUPABASE_URL</code> and{' '}
              <code className="rounded bg-amber-100 px-1">NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code> to your{' '}
              <code className="rounded bg-amber-100 px-1">.env</code> file.
            </p>
          </div>
        )}

        {error && (
          <p className="mb-4 text-red-600">{error instanceof Error ? error.message : 'Failed to load photos'}</p>
        )}

        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : photos.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-12 text-center">
            <p className="text-lg font-medium text-gray-700">No photos yet</p>
            <p className="mt-1 text-sm text-gray-500">Upload a photo to get started.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((photo, i) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
              >
                <a
                  href={photo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block aspect-video overflow-hidden bg-gray-100"
                >
                  <img
                    src={photo.url}
                    alt={photo.storage_path}
                    className="h-full w-full object-contain transition-transform hover:scale-[1.02]"
                    loading="lazy"
                  />
                </a>
                <div className="flex items-center justify-between gap-2 px-3 py-2">
                  <span className="text-xs text-gray-500">
                    {photo.width}×{photo.height}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleDownload(photo)}
                      disabled={downloadingId === photo.id}
                      className="inline-flex min-h-9 items-center rounded-lg px-2.5 text-xs font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                    >
                      {downloadingId === photo.id ? (
                        <Spinner size="sm" />
                      ) : (
                        'Download'
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setPhotoToDelete(photo)}
                      className="inline-flex min-h-9 items-center rounded-lg px-2.5 text-xs font-medium text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      <Modal
        open={photoToDelete !== null}
        onClose={() => !deleteMutation.isPending && setPhotoToDelete(null)}
        title="Delete photo?"
        description="Are you sure you want to delete this photo?"
      >
        <p className="mt-4 text-sm text-gray-600">This cannot be undone.</p>
        <div className="mt-6 flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={deleteMutation.isPending}
            onClick={() => setPhotoToDelete(null)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="dislike"
            disabled={deleteMutation.isPending}
            onClick={() => photoToDelete && deleteMutation.mutate(photoToDelete)}
          >
            {deleteMutation.isPending ? (
              <>
                <Spinner size="sm" className="mr-2" />
                Deleting…
              </>
            ) : (
              'Delete'
            )}
          </Button>
        </div>
      </Modal>

      <Modal
        open={verticalWarning !== null}
        onClose={() => setVerticalWarning(null)}
        title="Horizontal photos preferred"
        description={
          verticalWarning
            ? `This photo is ${verticalWarning.width}×${verticalWarning.height} (portrait or square).`
            : undefined
        }
      >
        <p className="mt-4 text-sm text-gray-600">
          Please use horizontal photos when you can — they display better in the gallery. Your photo was still uploaded.
        </p>
        <div className="mt-6 flex justify-end">
          <Button type="button" onClick={() => setVerticalWarning(null)}>
            Got it
          </Button>
        </div>
      </Modal>

      <Toast
        message={toast?.msg ?? ''}
        type={toast?.type}
        show={!!toast}
        onDismiss={() => setToast(null)}
      />
    </Layout>
  )
}
