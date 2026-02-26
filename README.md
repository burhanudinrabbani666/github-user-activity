# GitHub User Activity CLI

A simple CLI tool to fetch and display GitHub user activity directly in your terminal.

> Beginner Challenge from [roadmap.sh](https://roadmap.sh/projects/github-user-activity)

## Features

- Display recent push commits per repository
- Track repository creation and deletion
- Monitor forks, stars, issues, and pull requests
- Graceful error handling for invalid users or rate limits

## Requirements

- Node.js v18+

## Getting Started

```bash
# Clone the repository
git clone https://github.com/burhanudinrabbani666/github-user-activity.git

# Move into the project directory
cd github-user-activity

# Install dependencies
npm install

# Run the CLI
npm start <username>
```

## Example

```bash
npm start torvalds

# Output:
# Pushed 3 commits to torvalds/linux
# torvalds starred some-user/some-repo
```

## Error Handling

| Scenario                | Message                     |
| ----------------------- | --------------------------- |
| No username provided    | `Please provide a username` |
| User not found          | `User Not Found`            |
| API rate limit exceeded | `API Rate Limit Exceeded`   |

## Thanks ✨
