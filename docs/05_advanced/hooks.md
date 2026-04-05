---
title: git hooks
description: Advanced Git Techniques - git hooks command
---

<div class="breadcrumb">
  <a href="/">Home</a> › 
  <a href="/05_advanced/">Advanced</a> › 
  <span>git hooks</span>
</div>

# git hooks


**Description:**  
Scripts that run automatically on Git events. Customize and automate your workflow with pre-commit, post-commit, pre-push, and other hooks.

**Hook Types:**
```bash
# Client-side hooks
pre-commit          # Before commit is created
prepare-commit-msg  # Before commit message editor
commit-msg          # After commit message entered
post-commit         # After commit is created
pre-rebase          # Before rebase starts
post-checkout       # After checkout
post-merge          # After merge
pre-push            # Before push to remote

# Server-side hooks
pre-receive         # Before refs updated
update              # Once per ref being updated
post-receive        # After all refs updated
```

**Location:**
```bash
.git/hooks/
├── pre-commit.sample
├── pre-push.sample
├── commit-msg.sample
└── ...
```

**Creating a Hook:**

```bash
# 1. Navigate to hooks directory
cd .git/hooks

# 2. Create hook file (without .sample)
touch pre-commit

# 3. Make executable
chmod +x pre-commit

# 4. Add script content
```

**Example Hooks:**

**Pre-Commit Hook (Run Tests):**
```bash
#!/bin/bash
# .git/hooks/pre-commit

echo "Running tests before commit..."

# Run tests
npm test

# Check exit code
if [ $? -ne 0 ]; then
    echo "Tests failed. Commit aborted."
    exit 1
fi

echo "Tests passed. Proceeding with commit."
exit 0
```

**Pre-Commit Hook (Code Linting):**
```bash
#!/bin/bash
# .git/hooks/pre-commit

echo "Running linter..."

# Run linter on staged files
npm run lint-staged

if [ $? -ne 0 ]; then
    echo "Linting failed. Please fix errors."
    exit 1
fi

echo "Linting passed."
exit 0
```

**Commit-Msg Hook (Enforce Format):**
```bash
#!/bin/bash
# .git/hooks/commit-msg

commit_msg=$(cat "$1")

# Check for conventional commit format
if ! echo "$commit_msg" | grep -qE "^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: .+"; then
    echo "Commit message must follow format: type(scope): message"
    echo "Types: feat, fix, docs, style, refactor, test, chore"
    exit 1
fi

echo "Commit message format valid."
exit 0
```

**Pre-Push Hook (Prevent Force Push):**
```bash
#!/bin/bash
# .git/hooks/pre-push

protected_branches=("main" "master" "production")

while read local_ref local_sha remote_ref remote_sha
do
    for branch in "${protected_branches[@]}"
    do
        if [[ "$remote_ref" == *"$branch" ]]; then
            if [ "$remote_sha" != "0000000000000000000000000000000000000000" ]; then
                echo "Direct push to $branch is not allowed!"
                exit 1
            fi
        fi
    done
done

echo "Push allowed."
exit 0
```

**Popular Hook Use Cases:**

1. **Code Quality:**
   - Run linters (ESLint, Pylint, etc.)
   - Format code (Prettier, Black, etc.)
   - Check code style

2. **Testing:**
   - Run unit tests
   - Run integration tests
   - Check test coverage

3. **Security:**
   - Scan for secrets/credentials
   - Check for vulnerable dependencies
   - Verify commit signatures

4. **Documentation:**
   - Generate documentation
   - Update changelog
   - Check documentation coverage

5. **Workflow Enforcement:**
   - Enforce commit message format
   - Prevent force pushes to protected branches
   - Require issue references

**Using Hook Managers:**

**Husky (Node.js):**
```bash
# Install Husky
npm install --save-dev husky

# Initialize
npx husky install

# Add pre-commit hook
npx husky add .husky/pre-commit "npm test"
```

**Pre-commit Framework (Python):**
```bash
# Install pre-commit
pip install pre-commit

# Create .pre-commit-config.yaml
pre-commit install
```

**Bypassing Hooks:**
```bash
# Skip hooks for one commit
git commit --no-verify -m "Emergency fix"

# Skip pre-push hook
git push --no-verify
```

**Common Errors:**
- `hint: The '.git/hooks/pre-commit' hook was ignored` → **Solution:** Make hook executable: `chmod +x .git/hooks/pre-commit`
- Hook doesn't run → **Solution:** Verify filename (no `.sample` extension) and executable permission

**Pro Tips:**
- Keep hooks fast - slow hooks frustrate developers
- Share hooks via `.githooks/` directory, symlink to `.git/hooks/`
- Use hook managers (Husky, pre-commit) for team consistency
- Exit with code 0 (success) or 1 (failure) to control Git operation
- Use `--no-verify` only for emergencies
- Hooks are local - not pushed to remote (except via hook managers)

**Related Commands:**
- [`git commit`](/01_basics/commit) – Triggers commit hooks
- [`git push`](/04_remote/push) – Triggers push hooks
- `git config` – Configure hook paths

---

## Advanced Workflows

### Interactive Rebase
```bash
# Rewrite last 3 commits
git rebase -i HEAD~3

# In editor, choose action:
# pick = use commit
# reword = change commit message
# edit = modify commit
# squash = combine with previous
# fixup = combine, discard message
# drop = remove commit
```

### Cherry-pick Multiple Commits
```bash
# Pick range of commits
git cherry-pick abc123^..def456

# Pick multiple non-consecutive commits
git cherry-pick abc123 def456 ghi789
```

### Archive Repository
```bash
# Create tarball of repository
git archive --format=tar --output=project.tar HEAD

# Create zip file
git archive --format=zip --output=project.zip HEAD

# Archive specific branch
git archive --format=tar --output=release.tar v1.0
```

---

## See Also

- [Git Basics →](/01_basics/)
- [Git Branching →](/02_branching/)
- [Git Workflows →](/guides/workflows)
- [Git FAQ →](/guides/faq)
- [Quick Reference →](/quick-reference)

---
