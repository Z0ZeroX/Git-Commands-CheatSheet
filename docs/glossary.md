---
title: Git Glossary
description: Essential Git terminology explained
---

# Git Glossary

Essential Git terminology explained in simple terms.

---

## A-C

### **Branch**
A lightweight movable pointer to a commit. Branches allow you to work on different features or versions simultaneously without affecting the main codebase.

**Example:** `main`, `develop`, `feature/login`

---

### **Checkout**
The process of switching between different branches or commits. Updates files in your working directory to match the target.

**Command:** `git checkout <branch>` or `git switch <branch>`

---

### **Cherry-pick**
Applying changes from a specific commit to your current branch without merging the entire branch.

**Use case:** Bringing a bug fix from development to production branch.

---

### **Clone**
Creating a local copy of a remote repository. Downloads all history, branches, and files.

**Command:** `git clone <url>`

---

### **Commit**
A snapshot of your repository at a specific point in time. Each commit has a unique hash (ID) and includes a message describing the changes.

**Command:** `git commit -m "message"`

---

### **Conflict**
Occurs when Git can't automatically merge changes because the same lines were modified in different branches.

**Resolution:** Manually edit the file to resolve conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`), then stage and commit.

---

## D-H

### **Detached HEAD**
A state where HEAD points directly to a commit instead of a branch. Occurs when checking out a specific commit.

**Example:** `git checkout abc1234`

**Fix:** Create a branch to keep your work: `git checkout -b new-branch`

---

### **Diff**
Shows the differences between commits, branches, files, or your working directory.

**Command:** `git diff`

---

### **Fetch**
Downloads commits, files, and refs from a remote repository without merging them into your local branch.

**Command:** `git fetch origin`

**Difference from pull:** Fetch only downloads; pull downloads and merges.

---

### **Fork**
A personal copy of someone else's repository on GitHub. Allows you to freely experiment without affecting the original project.

**Common workflow:** Fork → Clone → Make changes → Pull Request

---

### **HEAD**
A pointer that references the current branch or commit you're working on. Usually points to the latest commit of the current branch.

**Location:** `.git/HEAD` file

---

## I-M

### **Index**
Also called the "staging area." An intermediate area where commits are prepared before being permanently stored in the repository.

**Related command:** `git add` stages files to the index.

---

### **Merge**
Combining changes from one branch into another. Creates a merge commit if branches have diverged.

**Command:** `git merge <branch>`

**Types:** Fast-forward merge, three-way merge

---

### **Merge Conflict**
See [Conflict](#conflict)

---

## O-R

### **Origin**
The default name for a remote repository. Automatically created when you clone a repository.

**View remotes:** `git remote -v`

---

### **Pull**
Fetches changes from a remote repository and automatically merges them into your current branch.

**Command:** `git pull`

**Equivalent to:** `git fetch` + `git merge`

---

### **Pull Request (PR)**
A GitHub/GitLab feature (not a Git command) where you request that your changes be merged into another branch. Allows code review before merging.

**Process:** Fork/Branch → Commit → Push → Open PR → Review → Merge

---

### **Push**
Uploads your local commits to a remote repository.

**Command:** `git push origin main`

---

### **Rebase**
Moving or combining commits to a new base. Rewrites commit history to create a linear timeline.

**Command:** `git rebase main`

**Warning:** Don't rebase commits that have been pushed to shared branches.

---

### **Remote**
A version of your repository hosted on the internet or network (like GitHub, GitLab, Bitbucket).

**Commands:**
- `git remote -v` – List remotes
- `git remote add <name> <url>` – Add remote

---

### **Repository (Repo)**
A directory tracked by Git, containing all files, history, and branches. Stored in the `.git` folder.

**Types:** Local repository (on your computer), Remote repository (on server)

---

### **Reset**
Moves the current branch pointer to a different commit, optionally modifying the staging area and working directory.

**Command:** `git reset <commit>`

**Types:**
- `--soft` – Move HEAD only
- `--mixed` – Move HEAD and staging (default)
- `--hard` – Move HEAD, staging, and working directory

---

### **Revert**
Creates a new commit that undoes changes from a previous commit. Doesn't rewrite history.

**Command:** `git revert <commit>`

**Safe for shared branches:** Unlike reset, it doesn't delete commits.

---

## S-Z

### **SHA / Hash**
A unique 40-character identifier for each commit, generated from the commit content.

**Example:** `a3f5b2c1d8e9f7a6b5c4d3e2f1a0b9c8d7e6f5a4`

**Short form:** First 7 characters (e.g., `a3f5b2c`)

---

### **Staging Area**
See [Index](#index)

---

### **Stash**
Temporarily saves uncommitted changes so you can work on something else, then reapply them later.

**Commands:**
- `git stash` – Save changes
- `git stash pop` – Reapply and remove from stash
- `git stash list` – View all stashes

---

### **Tag**
A named reference to a specific commit, typically used for releases or important milestones.

**Command:** `git tag v1.0.0`

**Types:** Lightweight tags, Annotated tags (with message and metadata)

---

### **Tracking Branch**
A local branch that has a direct relationship with a remote branch. Git knows where to push/pull from.

**Create:** `git checkout -b local-branch origin/remote-branch`

**View:** `git branch -vv`

---

### **Upstream**
The main repository from which your fork was created (for forks), or the remote branch your local branch tracks.

**Set upstream:** `git push -u origin main`

---

### **Working Directory (Working Tree)**
The directory on your computer where you edit files. Contains the checked-out version of your repository.

**States:** Untracked, Modified, Staged

---

## Quick State Comparison

| State | Location | Description |
|-------|----------|-------------|
| **Working Directory** | Your filesystem | Files you're currently editing |
| **Staging Area (Index)** | `.git/index` | Files prepared for next commit |
| **Repository** | `.git/objects` | Committed history |
| **Remote** | Server (GitHub, etc.) | Shared repository |

---

## Common Git Workflows

### **Feature Branch Workflow**
```
main → feature branch → work → merge back to main
```

### **Gitflow Workflow**
```
main (production) ← hotfix branches
develop (integration) ← feature branches
```

### **Forking Workflow**
```
Original repo → Fork → Clone → Work → Pull Request
```

---

## Related Resources

- [Official Git Documentation](https://git-scm.com/doc)
- [Git Basics →](/01_basics/)
- [Branching →](/02_branching/)

