==============================
# Git Commands Cheat Sheet 🚀
==============================

```text
# --- Setup & Config ---
git config --global user.name "Your Name"       
git config --global user.email "you@example.com" 
git config --list                   # List all configs
git help <command>                  # Get help on a Git command
git config alias.co checkout        # Create alias (e.g., git co)

# --- Starting a Repo ---
git init                            # Start new local repo
git clone <url>                     # Clone repo from remote
git clone --branch <branch> <url>   # Clone specific branch
git clone --depth=1 <url>           # Shallow clone (faster)

# --- Basic Workflow ---
git status                          # Check repo status
git add <file>                      # Stage a file
git add . / git add -A              # Stage all changes
git commit -m "message"             # Commit staged changes
git commit --amend                  # Edit last commit
git commit -am "message"            # Stage + commit tracked files
git log                             # Show commit history
git log --oneline --graph --decorate # Pretty log view
git diff                            # Show unstaged changes
git diff --staged                   # Show staged diff

# --- Branching ---
git branch                          # List branches
git branch <name>                   # Create new branch
git checkout/switch <name>          # Switch to branch
git checkout -b/switch -c <name>    # Create + switch branch
git merge <branch>                  # Merge branch into current
git rebase <branch>                 # Rebase onto another branch
git branch -d <name>                # Delete local branch
git branch -D <name>                # Force delete local branch
git branch -m <old> <new>           # Rename branch
git push --delete origin <name>     # Delete remote branch
git cherry-pick <commit>            # Apply specific commit

# --- Remote (GitHub) ---
git remote -v                       # Show remotes
git remote add origin <url>         # Add remote origin
git push -u origin <branch>         # Push branch and set upstream
git push                            # Push changes
git push --force-with-lease         # Force push safely
git push origin --tags              # Push all tags
git pull                            # Pull latest changes
git pull origin <branch>            # Pull specific branch
git pull --rebase                   # Pull with rebase
git fetch                           # Fetch branches/tags
git fetch --prune                   # Remove deleted remotes

# --- Undo & Fix ---
git checkout -- <file>              # Discard local changes
git restore <file>                  # Discard local changes
git restore --staged <file>         # Unstage file
git reset <file>                    # Unstage a file
git reset HEAD <file>               # Unstage a file
git reset --hard HEAD               # Reset to last commit
git reset --soft HEAD~1             # Undo last commit, keep changes
git revert <commit>                 # New commit undoing old one
git reflog                          # View all refs (safety net)
git clean -fd                       # Delete untracked files


# --- Stash ---
git stash                           # Save uncommitted changes
git stash pop                       # Apply last stash
git stash list                      # Show stash list
git stash apply stash@{n}           # Apply specific stash
git stash drop stash@{n}            # Remove specific stash

# --- Tags ---
git tag <tag>                       # Create tag
git tag                             # List tags
git tag -d <tag>                    # Delete tag
git push origin <tag>               # Push single tag
git push origin --tags              # Push all tags

# --- History & Diff ---
git diff <commit1> <commit2>        # Diff between commits
git diff --staged <commit>          # Diff staged vs commit
git diff -cached                    # Diff all staged changes
git show <commit>                   # Show specific commit
git blame <file>                    # Show who changed what
git shortlog -sn                    # Show commits by author
git log --since="1 week ago"        # Filter commits by date
git log -p <file>                   # Show patch history
git log --stat                      # Show stats for each commit
git log --oneline                   # One line per commit
git log --graph --decorate --all    # Graph view of all refs
git log -1 -p                       # Show last commit with patch

# --- Cleanup & Maintenance ---
git gc                              # Clean up unnecessary files
git prune                           # Remove unreachable objects
git fsck                            # Check integrity of repo
git rm <file>                       # Remove file and stage
git mv <old> <new>                  # Rename or move file
git bisect start                    # Start bisecting
git bisect good <commit>            # Mark commit as good
git bisect bad <commit>             # Mark commit as bad

# --- Advanced Branching & Collaboration ---
git pull --rebase                   # Rebase instead of merge
git rebase -i HEAD~n                # Interactive rebase
git merge --no-ff <branch>          # Keep merge history
git remote rename origin upstream   # Rename remote
git remote set-url origin <new-url> # Change remote URL

```
