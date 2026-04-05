---
title: Git Workflows
description: Popular Git workflows for teams and projects
---

# Git Workflows

Popular Git workflows for teams and projects.

---

## Choosing a Workflow

| Workflow | Best For | Complexity | Release Cycle |
|----------|----------|------------|---------------|
| **[GitHub Flow](#github-flow)** | Continuous deployment | Simple | Continuous |
| **[Git Flow](#git-flow)** | Scheduled releases | Complex | Planned |
| **[GitLab Flow](#gitlab-flow)** | Balanced approach | Medium | Flexible |
| **[Trunk-Based](#trunk-based-development)** | Fast integration | Simple | Continuous |

---

## GitHub Flow

**Best for:** Web apps, continuous deployment, small teams

### Principles
- `main` branch is always deployable
- Create descriptive feature branches
- Open PR early for discussion
- Merge only after review
- Deploy immediately after merge

### Workflow

```bash
# 1. Create feature branch from main
git checkout main
git pull origin main
git checkout -b feature/user-authentication

# 2. Make changes and commit
git add .
git commit -m "Add login form"
git commit -m "Add authentication logic"

# 3. Push to remote
git push -u origin feature/user-authentication

# 4. Open Pull Request on GitHub
# - Request review
# - Discuss and make changes
# - CI/CD runs tests

# 5. Merge to main (after approval)
# Done via GitHub interface

# 6. Delete branch
git checkout main
git pull origin main
git branch -d feature/user-authentication

# 7. Deploy to production
# Automated via CI/CD
```

### Branch Structure

```
main (deployable)
  ↓
  feature/login ──→ PR ──→ merge back
  feature/api   ──→ PR ──→ merge back
  hotfix/bug    ──→ PR ──→ merge back
```

### Pros & Cons

**Pros:**
- Simple and easy to understand
- Fast feature delivery
- Continuous deployment ready
- Short-lived branches

**Cons:**
- No staging environment support
- Hard to maintain multiple versions
- Requires mature CI/CD

---

## Git Flow

**Best for:** Scheduled releases, multiple versions, large teams

### Branch Types

- **main** - Production code
- **develop** - Integration branch
- **feature/** - New features
- **release/** - Release preparation
- **hotfix/** - Emergency fixes

### Workflow

```bash
# Initialize Git Flow (optional tool)
git flow init

# 1. Start feature from develop
git checkout develop
git checkout -b feature/shopping-cart

# 2. Work on feature
git add .
git commit -m "Add cart functionality"

# 3. Finish feature (merge to develop)
git checkout develop
git merge --no-ff feature/shopping-cart
git branch -d feature/shopping-cart
git push origin develop

# 4. Start release branch
git checkout -b release/v1.2.0 develop

# 5. Prepare release (bump version, changelog)
git commit -m "Bump version to 1.2.0"

# 6. Finish release
git checkout main
git merge --no-ff release/v1.2.0
git tag -a v1.2.0 -m "Version 1.2.0"

git checkout develop
git merge --no-ff release/v1.2.0
git branch -d release/v1.2.0

git push origin main develop --tags

# 7. Hotfix (if needed)
git checkout -b hotfix/critical-bug main
git commit -m "Fix critical bug"

git checkout main
git merge --no-ff hotfix/critical-bug
git tag -a v1.2.1 -m "Hotfix 1.2.1"

git checkout develop
git merge --no-ff hotfix/critical-bug

git push origin main develop --tags
```

### Branch Structure

```
main ────────────────●─────●──
                    ↗ v1.0 ↗ v1.1
                   ↙      ↙
develop ──●───●───●──●───●────
         ↗    ↑    ↘ ↗    ↘
feature/a    feature/b    feature/c
```

### Pros & Cons

**Pros:**
- Clear structure for releases
- Multiple versions support
- Parallel development tracks
- Mature and well-documented

**Cons:**
- Complex for beginners
- Long-lived branches
- Merge conflicts more likely
- Overkill for simple projects

---

## GitLab Flow

**Best for:** Balanced complexity, environment-based deployment

### Key Concepts

- **Feature branches** → main
- **Environment branches** (staging, production)
- **Issue tracking** integration

### Workflow

```bash
# 1. Create feature branch
git checkout -b feature/api-integration main

# 2. Work and commit
git commit -m "Add API endpoints"

# 3. Push and create Merge Request
git push -u origin feature/api-integration
# Create MR on GitLab

# 4. After approval, merge to main
# Auto-deploy to development

# 5. When ready, merge main → staging
git checkout staging
git merge main
git push origin staging
# Auto-deploy to staging

# 6. After testing, merge staging → production
git checkout production
git merge staging
git push origin production
# Auto-deploy to production
```

### Branch Structure

```
production ────────────●───────●
                      ↗       ↗
staging ──────────●───────●───
                 ↗       ↗
main ───●───●───●───●───
       ↗    ↗
feature/a  feature/b
```

### Pros & Cons

**Pros:**
- Environment-specific branches
- Clear deployment path
- Issue tracking integration
- Flexible release cycle

**Cons:**
- Requires CI/CD setup
- More branches to maintain
- Can be confusing initially

---

## Trunk-Based Development

**Best for:** Continuous integration, mature teams, fast delivery

### Principles

- Everyone commits to `main` (trunk)
- Very short-lived feature branches (< 1 day)
- Feature flags for incomplete work
- High test coverage required

### Workflow

```bash
# 1. Pull latest main
git checkout main
git pull origin main

# 2. Create short-lived branch
git checkout -b quick-fix

# 3. Make small changes
git add .
git commit -m "Fix button alignment"

# 4. Push and merge quickly (same day)
git push -u origin quick-fix
# Create PR, quick review, merge

# OR commit directly to main (for small changes)
git checkout main
git add .
git commit -m "Update README"
git push origin main
```

### Feature Flags Example

```javascript
// Use feature flags for WIP features
if (featureFlags.newCheckout) {
  // New checkout flow (WIP)
  renderNewCheckout()
} else {
  // Old checkout flow (stable)
  renderOldCheckout()
}
```

### Branch Structure

```
main ──●──●──●──●──●──●──
      ↗ ↗ ↗ ↗ ↗ ↗
     Many short-lived branches
```

### Pros & Cons

**Pros:**
- Simplest possible workflow
- Forces continuous integration
- Fast feedback loops
- No merge hell

**Cons:**
- Requires discipline
- Needs feature flags
- High test coverage essential
- Not for inexperienced teams

---

## Comparison Table

| Feature | GitHub Flow | Git Flow | GitLab Flow | Trunk-Based |
|---------|-------------|----------|-------------|-------------|
| **Complexity** | Low | High | Medium | Low |
| **Branch Lifetime** | Days | Weeks | Days-Weeks | Hours-Days |
| **Release Model** | Continuous | Scheduled | Flexible | Continuous |
| **Environment Support** | No | Yes | Yes | Via flags |
| **Team Size** | Small-Med | Large | Any | Any |
| **Learning Curve** | Easy | Hard | Medium | Easy |

---

## Best Practices (All Workflows)

### Commit Messages

```bash
# Good
git commit -m "Add user authentication with JWT"
git commit -m "Fix: Resolve memory leak in API"
git commit -m "Refactor: Extract payment logic"

# Bad
git commit -m "changes"
git commit -m "fix bug"
git commit -m "wip"
```

### Branch Naming

```bash
# Features
feature/user-authentication
feature/shopping-cart
feat/api-integration

# Bugfixes
bugfix/login-error
fix/memory-leak
hotfix/critical-security

# Others
chore/update-dependencies
docs/api-documentation
refactor/payment-module
```

### Pull Request Guidelines

1. **Small PRs** - Easier to review (< 400 lines)
2. **Descriptive title** - Explain what and why
3. **Add description** - Context for reviewers
4. **Link issues** - Reference related tickets
5. **Request reviewers** - Tag specific people
6. **Respond quickly** - Address feedback promptly

---

## Project CI/CD Flow (This Repository)

For this repository, the practical flow is:

1. Contributor opens PR to `main`
2. `CI - Validate Docs` runs (`npm ci` + `npm run docs:build`)
3. PDF workflow runs validation and artifact upload for quick-reference changes
4. Reviewer/PO approves and merges PR
5. On merge to `main`:
  - CI runs again
  - Pages deploy workflow publishes docs
  - PDF workflow may commit updated PDF to `downloads/`

### What to require before merge

- CI build success is required
- At least one reviewer approval
- No unresolved review comments

### Why this setup works

- PRs are validated before merge
- Merge to `main` remains automated
- PDF publishing is limited to main branch push events

---

## See Also

- [FAQ](/guides/faq)
- [Gitignore Guide](/guides/gitignore)
- [Quick Reference](/quick-reference)