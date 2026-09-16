# 1. Features I Built

Authenticated habit management with create, read, update, delete, and daily completion toggles; a responsive React dashboard; seven-day completion indicators; progress summaries; MongoDB persistence; and API validation/error responses.

# 2. Features I Inferred

The challenge did not prescribe a visual direction or exact entities, so I used individual private rituals with a name, context, color, frequency, and completion dates. I included registration and login because per-user habits need ownership.

# 3. Key Decisions & Trade-offs

Completion dates are stored as ISO date strings on each habit. This keeps the common tracker read/update path very simple for a modest personal tracker. JWTs are kept in browser local storage to make the reference implementation self-contained; production authentication should use more robust cookie/session protections.

# 4. How I Handled the Twist

No additional twist was specified in the brief. I treated the requirement for fully connected, non-mock behavior as the priority: every UI action is backed by a REST endpoint and persistent model.

# 5. What I'd Do With More Time

Add calendar/history views, customizable schedules, analytics, password reset and email verification, tests/CI, rate limiting, refresh-token rotation, and accessible confirmation dialogs for destructive actions.
