export default function Home() {
  return (
    <section className="space-y-6">
      <div className="bg-white shadow-sm rounded p-6 dark:bg-slate-800/80 dark:shadow-none dark:ring-1 dark:ring-slate-700">
        <h1 className="text-2xl font-bold mb-2">Clubs Annual Conference 2025</h1>
        <p className="text-gray-600 dark:text-slate-300">
          Join club leaders and members across campus for workshops, panels, and networking.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white rounded shadow-sm p-4 dark:bg-slate-800/80 dark:shadow-none dark:ring-1 dark:ring-slate-700">
          <h2 className="font-semibold mb-1">Date</h2>
          <p>Dec 10, 2025 • 9:00 AM – 5:00 PM</p>
        </div>
        <div className="bg-white rounded shadow-sm p-4 dark:bg-slate-800/80 dark:shadow-none dark:ring-1 dark:ring-slate-700">
          <h2 className="font-semibold mb-1">Venue</h2>
          <p>Student Activity Center, Main Hall</p>
        </div>
        <div className="bg-white rounded shadow-sm p-4 dark:bg-slate-800/80 dark:shadow-none dark:ring-1 dark:ring-slate-700">
          <h2 className="font-semibold mb-1">Tracks</h2>
          <p>Leadership, Finance, Tech, Outreach</p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded p-4 dark:bg-blue-500/10 dark:border-blue-900/40">
        <p className="dark:text-slate-200">Ready to join? Head to the Registration page to secure your spot.</p>
      </div>
    </section>
  )
}

