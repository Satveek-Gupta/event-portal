import type { Attendee } from './types'

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const message = await res
      .json()
      .catch(() => ({})) as { message?: string }
    throw new Error(message?.message || `Request failed (${res.status})`)
  }
  return res.json() as Promise<T>
}

export async function fetchAttendees(): Promise<Attendee[]> {
  const res = await fetch('/api/attendees')
  return handle<Attendee[]>(res)
}

export type RegistrationPayload = {
  fullName: string
  email: string
  club: string
  role: string
  comments?: string
}

export async function registerAttendee(payload: RegistrationPayload): Promise<Attendee> {
  const res = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return handle<Attendee>(res)
}

