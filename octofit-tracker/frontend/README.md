# OctoFit Tracker presentation tier

The React 19 and Vite frontend uses React Router for the activity, leaderboard,
team, user, and workout screens. It requests data from the API tier on port 8000.

## API configuration

When running in GitHub Codespaces, define `VITE_CODESPACE_NAME` in
`octofit-tracker/frontend/.env.local` using the Codespace name. Vite loads this
variable at build/dev-server startup, so restart the frontend after changing it.
The frontend uses it to build the API URL
`https://<codespace-name>-8000.app.github.dev`.

For example, `octofit-tracker/frontend/.env.local` can contain:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

The variable is required to connect to the API from a Codespace. If it is unset,
the frontend safely falls back to `http://localhost:8000` for local development.
