import { useMemo, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { registerAttendee } from '../api'

type FormState = {
  fullName: string
  email: string
  club: string
  role: string
  comments: string
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Registration() {
  const [form, setForm] = useState<FormState>({
    fullName: '',
    email: '',
    club: '',
    role: '',
    comments: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const errors = useMemo(() => {
    const e: Partial<Record<keyof FormState, string>> = {}
    if (!form.fullName.trim()) e.fullName = 'Full name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!emailPattern.test(form.email)) e.email = 'Enter a valid email'
    if (!form.club.trim()) e.club = 'Club is required'
    if (!form.role.trim()) e.role = 'Role is required'
    return e
  }, [form])

  const isValid = Object.keys(errors).length === 0

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!isValid) {
      setError('Please fix the errors before submitting.')
      return
    }

    try {
      setSubmitting(true)
      await registerAttendee({
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        club: form.club.trim(),
        role: form.role.trim(),
        comments: form.comments.trim(),
      })
      setSuccess('Registration successful!')
      setForm({
        fullName: '',
        email: '',
        club: '',
        role: '',
        comments: '',
      })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Registration failed.'
      setError(message)
    } finally {
      setSubmitting(false)
    }
  }

  function bindField<K extends keyof FormState>(key: K) {
    return {
      value: form[key],
      onChange: (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
      ) => setForm((prev) => ({ ...prev, [key]: event.target.value })),
    }
  }

  const inputBase =
    'mt-1 block w-full rounded-lg border border-slate-200 bg-white/90 px-3 py-2 text-sm shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-offset-1 focus:ring-offset-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-400 dark:focus:border-blue-400 dark:focus:ring-blue-900/40 dark:focus:ring-offset-slate-900'
  const label = 'block text-sm font-semibold text-slate-700 dark:text-slate-200'

  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/70 shadow-xl ring-1 ring-slate-100 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-slate-800 dark:bg-slate-900/50 dark:ring-slate-800 dark:supports-[backdrop-filter]:bg-slate-900/40">
      <div className="pointer-events-none absolute -top-20 -right-16 h-56 w-56 rounded-full bg-blue-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-indigo-100/50 blur-3xl" />

      <div className="relative grid gap-10 p-8 lg:grid-cols-[1.05fr_0.95fr] lg:p-12">
        <aside className="space-y-6">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700 ring-1 ring-blue-100 dark:bg-blue-500/10 dark:text-blue-300 dark:ring-blue-900/40">
              Reserve your spot
            </span>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              Event Registration
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Secure your attendance at the Clubs Annual Conference. Share your role, club affiliation,
              and any notes so we can tailor the experience to you.
            </p>
          </div>

          <dl className="grid gap-3 rounded-2xl bg-white/70 p-4 text-sm text-slate-600 shadow-inner ring-1 ring-slate-100 dark:bg-slate-800/60 dark:text-slate-300 dark:ring-slate-700">
            <div className="flex items-center justify-between">
              <dt className="font-medium text-slate-700 dark:text-slate-200">Date</dt>
              <dd>Dec 10, 2025 · 9:00 AM – 5:00 PM</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="font-medium text-slate-700 dark:text-slate-200">Venue</dt>
              <dd>Student Activity Center, Main Hall</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="font-medium text-slate-700 dark:text-slate-200">Tracks</dt>
              <dd>Leadership · Finance · Tech · Outreach</dd>
            </div>
          </dl>

          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/10 text-xs font-semibold text-blue-600">
                1
              </span>
              Fill out your contact details and select the role you’ll hold during the event.
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/10 text-xs font-semibold text-blue-600">
                2
              </span>
              Add optional comments to let organizers know about accessibility or session interests.
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/10 text-xs font-semibold text-blue-600">
                3
              </span>
              Submit the form to receive a confirmation email with next steps.
            </li>
          </ul>
        </aside>

        <div className="rounded-2xl bg-white/85 p-6 shadow-lg ring-1 ring-slate-200 dark:bg-slate-800/70 dark:ring-slate-700">
          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50/90 px-4 py-3 text-sm font-medium text-red-700 shadow-sm dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-300">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50/90 px-4 py-3 text-sm font-medium text-emerald-700 shadow-sm dark:border-emerald-900/40 dark:bg-emerald-900/20 dark:text-emerald-300">
              {success}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-5" noValidate>
            <div>
              <label className={label} htmlFor="fullName">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                className={inputBase}
                {...bindField('fullName')}
                aria-invalid={!!errors.fullName}
              />
              {errors.fullName && <p className="mt-2 text-xs font-medium text-red-600 dark:text-red-400">{errors.fullName}</p>}
            </div>

            <div>
              <label className={label} htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className={inputBase}
                {...bindField('email')}
                aria-invalid={!!errors.email}
              />
              {errors.email && <p className="mt-2 text-xs font-medium text-red-600 dark:text-red-400">{errors.email}</p>}
            </div>

            <div>
              <label className={label} htmlFor="club">
                Club
              </label>
              <input
                id="club"
                type="text"
                className={inputBase}
                {...bindField('club')}
                aria-invalid={!!errors.club}
              />
              {errors.club && <p className="mt-2 text-xs font-medium text-red-600 dark:text-red-400">{errors.club}</p>}
            </div>

            <div>
              <label className={label} htmlFor="role">
                Role
              </label>
              <select id="role" className={inputBase} {...bindField('role')} aria-invalid={!!errors.role}>
                <option value="">Select a role</option>
                <option value="Member">Member</option>
                <option value="Officer">Officer</option>
                <option value="Advisor">Advisor</option>
                <option value="Guest">Guest</option>
              </select>
              {errors.role && <p className="mt-2 text-xs font-medium text-red-600 dark:text-red-400">{errors.role}</p>}
            </div>

            <div>
              <label className={label} htmlFor="comments">
                Comments (optional)
              </label>
              <textarea id="comments" rows={4} className={inputBase} {...bindField('comments')} />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-60 dark:shadow-none"
              >
                {submitting ? 'Submitting…' : 'Submit Registration'}
              </button>
              <p className="mt-3 text-center text-xs text-slate-500 dark:text-slate-400">
                All fields except comments are required.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

