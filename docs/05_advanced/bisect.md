---
title: git bisect
description: Advanced Git Techniques - git bisect command
---

<div class="breadcrumb">
  <a href="/">Home</a> › 
  <a href="/05_advanced/">Advanced</a> › 
  <span>git bisect</span>
</div>

# git bisect


**Description:**  
Use binary search to find the commit that introduced a bug. Efficiently narrows down problematic commits in large histories.

**Syntax:**
```bash
git bisect start
git bisect bad [commit]
git bisect good [commit]
git bisect reset
git bisect run <script>
```

**Examples:**
```bash
# Start bisect session
git bisect start

# Mark current commit as bad
git bisect bad

# Mark last known good commit
git bisect good v1.0

# Git will checkout a middle commit
# Test it, then mark as good or bad
git bisect good
# or
git bisect bad

# After finding the culprit
git bisect reset

# Automated bisect with test script
git bisect start HEAD v1.0
git bisect run npm test
```

**Detailed Explanation:**
- **Binary search** - Divides commit history in half each step (log n complexity)
- **Manual testing** - You test each commit and mark as good/bad
- **Automated testing** - Use `bisect run` with test script for automation
- **Finds first bad commit** - Identifies exact commit that introduced the bug

**Bisect Workflow:**

```bash
# 1. Start bisect
git bisect start

# 2. Mark current broken state
git bisect bad

# 3. Mark last known working commit
git bisect good v2.0.1

# Output: Bisecting: 15 revisions left to test after this

# 4. Test current checkout
# Run your app, run tests, check functionality

# 5. Mark result
git bisect good  # if it works
# or
git bisect bad   # if broken

# 6. Repeat until Git finds the culprit
# Output: abc123 is the first bad commit

# 7. End bisect session
git bisect reset
```

**Automated Bisect Example:**

Create test script `test.sh`:
```bash
#!/bin/bash
npm test
exit $?
```

Run automated bisect:
```bash
git bisect start HEAD v1.0.0
git bisect run ./test.sh
```

**Advanced Usage:**
```bash
# Skip commits you can't test (e.g., won't compile)
git bisect skip

# Visualize bisect progress
git bisect visualize

# Terms other than good/bad
git bisect start --term-old=working --term-new=broken
git bisect working
git bisect broken
```

**Pro Tips:**
- Use tags or commit hashes for good/bad boundaries
- Automated bisect requires exit code 0 (good) or 1-127 except 125 (bad)
- Exit code 125 means "skip this commit"
- ~10 tests needed for 1000 commits (2^10 = 1024)
- Clean build between tests: `git bisect run sh -c "make clean && make test"`

**Related Commands:**
- [`git log`](/01_basics/log) – View commit history
- `git blame` – Find who changed each line
- [`git reflog`](/05_advanced/reflog) – View reference logs

---
