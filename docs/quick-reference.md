---
title: Quick Reference
description: Fast lookup for common Git commands
---

# Quick Reference

Fast lookup for common Git commands. For detailed explanations, click on any command.

<div style="background: var(--vp-c-bg-soft); padding: 16px 24px; border-radius: 8px; margin: 20px 0; text-align: center;">
  <strong>Offline Access:</strong>
  <a href="./downloads/git-commands-quick-reference.pdf" style="color: var(--vp-c-brand-1); text-decoration: underline; margin-left: 8px;">
    Download this page as PDF
  </a>
  <span style="margin: 0 8px; color: var(--vp-c-text-2);">•</span>
  <a href="./downloads/git-cheatsheet-codesnap.png" download style="color: var(--vp-c-brand-1); text-decoration: underline;">
    Download CodeSnap PNG
  </a>
</div>

---

## Command Categories

Jump to: [Setup](#setup-and-config) • [Create](#getting-and-creating-projects) • [Snapshot](#basic-snapshotting) • [Branch](#branching-and-merging) • [Share](#sharing-and-updating) • [Inspect](#inspection-and-comparison) • [Patch](#patching) • [Debug](#debugging) • [Admin](#administration)

---

## Setup and Config

| Command | Description |
|---------|-------------|
| [`git config --global user.name "name"`](/01_basics/) | Set the name attached to commits |
| [`git config --global user.email "email"`](/01_basics/) | Set the email attached to commits |
| [`git config --global color.ui auto`](/01_basics/) | Enable colorization of command output |
| [`git config --list`](/01_basics/) | List all configured settings |
| [`git help <command>`](/01_basics/) | Get help for a Git command |

---

## Getting and Creating Projects

| Command | Description |
|---------|-------------|
| [`git init`](/01_basics/init) | Initialize a new Git repository |
| [`git init <directory>`](/01_basics/init) | Create a new local repository in specified directory |
| [`git clone <url>`](/01_basics/clone) | Clone a repository from a remote source |
| [`git clone <url> <directory>`](/01_basics/clone) | Clone a repository into a specific directory |

---

## Basic Snapshotting

| Command | Description |
|---------|-------------|
| [`git status`](/01_basics/status) | Show the status of the working directory |
| [`git add <file>`](/01_basics/add) | Add a file to the staging area |
| [`git add .`](/01_basics/add) | Add all new and changed files to staging |
| [`git add -p`](/01_basics/add) | Interactive staging - choose hunks to add |
| [`git diff`](/01_basics/diff) | Show unstaged changes |
| [`git diff --staged`](/01_basics/diff) | Show staged changes |
| [`git commit -m "message"`](/01_basics/commit) | Commit staged changes with a message |
| [`git commit -am "message"`](/01_basics/commit) | Stage all tracked files and commit |
| [`git commit --amend`](/01_basics/commit) | Amend the last commit |
| [`git restore <file>`](/01_basics/) | Discard changes in working directory |
| [`git restore --staged <file>`](/01_basics/) | Unstage a file |
| [`git reset <file>`](/01_basics/) | Unstage a file (keep changes) |
| [`git reset --hard HEAD`](/01_basics/) | Discard all local changes |
| [`git rm <file>`](/01_basics/) | Remove file from working directory and staging |
| [`git mv <old> <new>`](/01_basics/) | Rename or move a file |

---

## Branching and Merging

| Command | Description |
|---------|-------------|
| [`git branch`](/02_branching/) | List all local branches |
| [`git branch -a`](/02_branching/) | List all branches (local and remote) |
| [`git branch <branch>`](/02_branching/) | Create a new branch |
| [`git branch -d <branch>`](/02_branching/) | Delete a branch |
| [`git branch -m <new-name>`](/02_branching/) | Rename current branch |
| [`git checkout <branch>`](/02_branching/checkout) | Switch to a branch |
| [`git checkout -b <branch>`](/02_branching/checkout) | Create and switch to new branch |
| [`git switch <branch>`](/02_branching/switch) | Switch to a branch (modern) |
| [`git switch -c <branch>`](/02_branching/switch) | Create and switch to new branch (modern) |
| [`git merge <branch>`](/02_branching/merge) | Merge a branch into current branch |
| [`git merge --no-ff <branch>`](/02_branching/merge) | Merge with a merge commit |
| [`git merge --abort`](/02_branching/merge) | Abort a merge in progress |
| [`git log`](/01_basics/log) | Show commit history |
| [`git log --oneline`](/01_basics/log) | Show compact commit history |
| [`git log --graph --all`](/01_basics/log) | Show branch graph |
| [`git stash`](/05_advanced/stash) | Temporarily save uncommitted changes |
| [`git stash pop`](/05_advanced/stash) | Apply and remove most recent stash |
| [`git stash list`](/05_advanced/stash) | List all stashes |
| [`git tag <name>`](#branching-and-merging) | Create a lightweight tag |
| [`git tag -a <name> -m "msg"`](#branching-and-merging) | Create an annotated tag |

---

## Sharing and Updating Projects

| Command | Description |
|---------|-------------|
| [`git remote -v`](/04_remote/remote) | List all configured remotes |
| [`git remote add <name> <url>`](/04_remote/remote) | Add a new remote |
| [`git remote remove <name>`](/04_remote/remote) | Remove a remote |
| [`git fetch`](/04_remote/fetch) | Download objects and refs from remote |
| [`git fetch <remote>`](/04_remote/fetch) | Fetch from specific remote |
| [`git pull`](/04_remote/pull) | Fetch and merge from remote |
| [`git pull --rebase`](/04_remote/pull) | Fetch and rebase from remote |
| [`git push`](/04_remote/push) | Push changes to remote |
| [`git push <remote> <branch>`](/04_remote/push) | Push branch to remote |
| [`git push -u <remote> <branch>`](/04_remote/push) | Push and set upstream |
| [`git push --force-with-lease`](/04_remote/push) | Safely force push |
| [`git push --tags`](/04_remote/push) | Push all tags to remote |

---

## Inspection and Comparison

| Command | Description |
|---------|-------------|
| [`git show <commit>`](/01_basics/log) | Show changes of a commit |
| [`git show HEAD`](/01_basics/log) | Show last commit |
| [`git log`](/01_basics/log) | Show commit history |
| [`git log --follow <file>`](/01_basics/log) | Show commit history for file |
| [`git log --author="name"`](/01_basics/log) | Filter commits by author |
| [`git log --grep="pattern"`](/01_basics/log) | Search commit messages |
| [`git log --since="2 weeks ago"`](/01_basics/log) | Filter by date |
| [`git diff <branch1>..<branch2>`](/01_basics/diff) | Compare two branches |
| [`git diff <commit1> <commit2>`](/01_basics/diff) | Compare two commits |
| [`git shortlog`](#inspection-and-comparison) | Summarized commit history |

---

## Patching

| Command | Description |
|---------|-------------|
| [`git cherry-pick <commit>`](/03_merging/cherry-pick) | Apply a commit to current branch |
| [`git cherry-pick --abort`](/03_merging/cherry-pick) | Abort cherry-pick |
| [`git rebase <branch>`](/03_merging/rebase) | Rebase current branch onto another |
| [`git rebase -i HEAD~<n>`](/03_merging/rebase) | Interactive rebase last n commits |
| [`git rebase --continue`](/03_merging/rebase) | Continue after resolving conflicts |
| [`git rebase --abort`](/03_merging/rebase) | Abort rebase |
| [`git revert <commit>`](/03_merging/revert) | Create new commit that undoes a commit |
| [`git revert --no-commit <commit>`](/03_merging/revert) | Revert without auto-committing |

---

## Debugging

| Command | Description |
|---------|-------------|
| [`git bisect start`](/05_advanced/bisect) | Start binary search for bad commit |
| [`git bisect bad`](/05_advanced/bisect) | Mark current commit as bad |
| [`git bisect good <commit>`](/05_advanced/bisect) | Mark commit as good |
| [`git bisect reset`](/05_advanced/bisect) | End bisect session |
| [`git blame <file>`](#debugging) | Show who changed each line |
| [`git blame -L 10,20 <file>`](#debugging) | Blame specific line range |
| [`git grep <pattern>`](#debugging) | Search for pattern in tracked files |

---

## Administration

| Command | Description |
|---------|-------------|
| [`git clean -n`](#administration) | Show what would be deleted |
| [`git clean -f`](#administration) | Delete untracked files |
| [`git clean -fd`](#administration) | Delete untracked files and directories |
| [`git gc`](#administration) | Cleanup and optimize local repository |
| [`git fsck`](#administration) | Verify database integrity |
| [`git reflog`](/05_advanced/reflog) | Show reference log (recovery tool) |
| [`git reflog show <branch>`](/05_advanced/reflog) | Show reflog for specific branch |

---

## Common Workflows

### Start a new project
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <url>
git push -u origin main
```

### Clone and work on existing project
```bash
git clone <url>
cd <project>
git checkout -b feature/my-feature
# Make changes
git add .
git commit -m "Add feature"
git push -u origin feature/my-feature
```

### Update local repository
```bash
git fetch origin
git pull origin main
# or
git pull --rebase origin main
```

### Fix last commit
```bash
# Forgot to add file
git add forgotten-file.txt
git commit --amend --no-edit

# Fix commit message
git commit --amend -m "New message"
```

### Undo changes
```bash
# Undo unstaged changes
git restore <file>

# Undo staged changes
git restore --staged <file>

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1
```

### Resolve merge conflicts
```bash
git merge feature-branch
# Conflicts occur
# Edit files to resolve conflicts
git add <resolved-files>
git commit
```

---

## Git Cheat Sheet (One Page)

### Setup
```bash
git config --global user.name "Name"
git config --global user.email "email@example.com"
```

### Create
```bash
git init
git clone <url>
```

### Local Changes
```bash
git status
git diff
git add .
git commit -m "Message"
```

### Branch
```bash
git branch
git checkout -b <branch>
git merge <branch>
```

### Remote
```bash
git remote -v
git fetch
git pull
git push
```

### History
```bash
git log
git log --oneline --graph
git show <commit>
```

### Undo
```bash
git restore <file>
git reset --soft HEAD~1
git revert <commit>
```

---

## See Also

- [Complete Command List](/quick-reference) - All Git commands alphabetically
- [Glossary](/glossary) - Git terminology explained
- [Guides](/guides/) - Workflow guides and best practices
- [FAQ](/guides/faq) - Frequently asked questions

---

**Tip:** Bookmark this page for quick reference. Use `Ctrl+F` / `Cmd+F` to search for specific commands.