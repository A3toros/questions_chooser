import { Link } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { Button } from '../components/Button'

export function NotFoundPage() {
  return (
    <Layout>
      <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">
        <p className="text-lg font-bold text-gray-900">Page not found</p>
        <p className="mt-2 text-sm text-gray-500">This link doesn&apos;t match any page in VocabForm.</p>
        <Link to="/" className="mt-6 inline-block">
          <Button type="button">Back to Choosing</Button>
        </Link>
      </div>
    </Layout>
  )
}
