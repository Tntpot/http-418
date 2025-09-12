---
title: "Git Worktree"
description: 'Lorem ipsum dolor sit amet'
pubDate: 'Aug 03 2025'
heroImage: '../../assets/git_worktree.jpeg'
tags: ['git', 'development']
---
Worktrees are one of my favourite `git` features, and something I think is widely underused.

An absolute dream for multitaskers (or those like myself, who try & fail to do so) — worktrees can be used to quickly & easily have multiple branches of your repository on your machine at one time, side-by-side. 

Find yourself working on a feature, but a colleague needs help with an issue on their branch? No longer do you need to stash your changes, checkout their branch, stop, re-build, and re-run the project etc. 

You can simply navigate to the directory containing your `.git` directory and run:
```bash
git worktree add ../worktree-1 colleague-branch-name
```

The `add` command in this scenario takes two parameters.

The first is the `path` where you wish to create the new `worktree` — note I've gone up one directory, so as to not pollute my current branch.

The second is the `branch` name you wish to checkout - this will be the checked-out branch for the worktree.

After running this command, navigate up a directory and you will see something like:
```bash
    original-project
        |--> .git
    worktree-1 
```

Entering the `worktree-1` directory and running a `git status` will confirm that we are now on the branch `worktree-1`.

You are now free to make changes, test fixes, create and `push` commits to this remote branch all without interfering with your existing work.

After you've pushed the fix for your colleague's problem (like a helpful coworker), you can remove the worktree.

This must be done by returning to our `original-project` directory containing our `.git` directory, and running:
```bash
git worktree remove ../worktree-1
```
The `remove` command can be executed with one parameter, the `path` to our worktree that we want to remove.
