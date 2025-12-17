import type { ContactSubmission } from "@prisma/client"
import { formatDistanceToNow } from "date-fns"

interface RecentSubmissionsProps {
  submissions: ContactSubmission[]
}

export function RecentSubmissions({ submissions }: RecentSubmissionsProps) {
  return (
    <div className="bg-background rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-bold font-heading mb-4">Recent Contact Submissions</h2>

      {submissions.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">No submissions yet</p>
      ) : (
        <div className="space-y-3">
          {submissions.map((submission) => (
            <div key={submission.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-medium">{submission.email[0].toUpperCase()}</span>
                </div>
                <div>
                  <p className="font-medium">{submission.email}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(submission.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
