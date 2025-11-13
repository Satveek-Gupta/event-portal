import { useEffect, useState } from 'react'
import { fetchAttendees } from '../api'
import type { Attendee } from '../types'

export default function Attendees() {
  const [attendees, setAttendees] = useState<Attendee[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    fetchAttendees()
      .then((data) => {
        if (active) setAttendees(data)
      })
      .catch((err: unknown) => {
        if (!active) return
        const message = err instanceof Error ? err.message : 'Failed to load attendees'
        setError(message)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  if (loading) {
    return <div>Loading attendees…</div>
  }

  if (error) {
    return (
      <div className="rounded border border-red-200 bg-red-50 p-3 text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-300">
        {error}
      </div>
    )
  }

  if (!attendees || attendees.length === 0) {
    return (
      <section>
        <h1 className="text-xl font-semibold mb-4">Registered Attendees</h1>
        <div className="text-gray-600">No attendees yet.</div>
      </section>
    )
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">Registered Attendees</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Everyone who has confirmed a spot for the Clubs Annual Conference.
        </p>
      </div>

      <ul className="overflow-hidden rounded-3xl border border-slate-100 bg-white/85 shadow-xl ring-1 ring-slate-100 dark:border-slate-800 dark:bg-slate-800/70 dark:ring-slate-800">
        {attendees.map((attendee) => (
          <li
            key={attendee.id}
            className="grid items-start gap-6 p-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:gap-10"
          >
            <div className="space-y-1">
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{attendee.fullName}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{attendee.email}</p>
            </div>
            <div className="text-right space-y-1">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {attendee.club} • {attendee.role}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {new Date(attendee.registeredAt).toLocaleString()}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

