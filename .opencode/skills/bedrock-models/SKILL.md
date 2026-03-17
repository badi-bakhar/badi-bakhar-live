---
name: bedrock-models
description: "Available Amazon Bedrock models for Badi Bakhar agents — IDs, costs, and when to use each"
---

# Amazon Bedrock Models — Badi Bakhar

## Provider Configuration

- **Provider:** `amazon-bedrock`
- **Region:** `ap-south-1`
- **Profile:** `badi-bakhar`

## Available Models

| Model | Bedrock ID | Use when |
|-------|-----------|----------|
| Claude Haiku 4.5 | `anthropic.claude-haiku-4-5-20251001-v1:0` | Classification, pattern matching, frontmatter generation, file ops, inbox triage |
| Claude Sonnet 4.5 | `anthropic.claude-sonnet-4-5-20250929-v1:0` | Complex reasoning, judgment, synthesis, reliability rating, evergreen evaluation |
| Claude Sonnet 4.6 | `anthropic.claude-sonnet-4-6` | Available but prefer Sonnet 4.5 for cost consistency |

## Model Selection Rule

**Default to Haiku** for anything mechanical:
- Reading and classifying inbox files
- Generating or validating frontmatter
- Renaming files to slug format
- Moving files to destinations
- Checking tag formatting

**Use Sonnet 4.5** only when judgment is required:
- Linking notes to other notes (requires synthesis)
- Rating source reliability
- Evaluating whether a note is ready for `evergreen`
- Summarizing or synthesizing across multiple notes
- Ambiguous classification decisions

## Agent Frontmatter Reference

```yaml
model: amazon-bedrock/anthropic.claude-haiku-4-5-20251001-v1:0
```

```yaml
model: amazon-bedrock/anthropic.claude-sonnet-4-5-20250929-v1:0
```

## Cost Guidance

Haiku is significantly cheaper than Sonnet. For a high-volume inbox (dozens of files), run Haiku for the full triage pass and invoke Sonnet only for the specific notes that require linking or evergreen evaluation. Never use Sonnet for bulk mechanical tasks.
