# Agent artifact policy

Use this policy when creating, moving, editing, or reviewing files under
`.agents/`.

## Placement

- `context/`: durable, reviewed project context. Store domain terms and
  decisions under `context/domain/`.
- `work/`: scoped packages for active or planned work.
- `research/`: findings that are not ready for `context/`.
- `playbooks/`: reusable agent workflows.
- `handoff/`: short-lived continuation notes and untriaged material.
- `archive/`: closed or stale packages.
- `skills/`: local skill packages governed by their own formats.

Create `handoff/` and `archive/` only when needed. Move stable handoff
material to `context/`, `work/`, or `research/`. Archive or delete stale
handoffs.

## Markdown freshness

Every Markdown or MDX file under `context/`, `work/`, `research/`,
`playbooks/`, `handoff/`, and `archive/` must include YAML frontmatter with
`createdAt` and `lastReviewed` as `YYYY-MM-DD`, and `editedAt` as
`YYYY-MM-DDTHH:MM:SS`.

`AGENTS.md`, `ARTIFACTS.md`, and files under `skills/` follow their own
formats and are excluded from this requirement.

When modifying a covered file:

1.  Keep `createdAt` unchanged.
2.  Set `editedAt` to now after any content change.
3.  Set `lastReviewed` to the current date only after reviewing the complete
    document against its current source of truth.

Before completing the task, verify the frontmatter of every touched covered
file.
