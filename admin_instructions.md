# How to enable **Claude Haiku 4.5** for clients

This document explains the steps and the typical admin/provider actions required to enable `claude-haiku-4.5` for your applications and clients. It is written to be copy/pasted to your Anthropic account admin or platform support team.

---

## 1) Verify account permissions & billing
- Ensure you have an admin or billing role in your Anthropic (or model-provider) account.
- Confirm your organization is approved for access to newer models (some releases are gated by account approval).
- Confirm billing is in place and limits are sufficient for expected usage.

## 2) Request model enablement (if model is not already available)
If `claude-haiku-4.5` is not visible in your account or API console, contact Anthropic support with the following message (edit as needed):

```
Subject: Request access to claude-haiku-4.5 for organization <ORG_NAME>

Hello Anthropic Support,

We would like to request access to the ``claude-haiku-4.5`` model for our organization (<ORG_NAME>, account ID: <ACCOUNT_ID>). We plan to use this model for an internal/production language-learning application that will call the model server-side. Please advise on any required agreements, quotas, or billing steps to enable access.

Thank you,
<YOUR NAME>
<YOUR ORG>
```

Include expected monthly usage, business use-case, and whether the app will expose the model to end-users (recommended: call the model server-side only).

## 3) Confirm the expected API name and headers
- Anthropic historically supports `x-api-key` or `Authorization: Bearer <key>`; confirm the current required header.
- Confirm the exact model identifier string to use (e.g., `claude-haiku-4.5`).

## 4) Configure environment variables (server-side only)
On your server or deployment platform, set these env vars (example names used in this repo):

```
ANTHROPIC_API_KEY=sk-...         # server-side secret
CLAUDE_MODEL=claude-haiku-4.5   # model id used by the app
```

Do not expose `ANTHROPIC_API_KEY` to client-side code. Always route requests through your server API.

## 5) Security and safety
- Use server-side request validation and rate-limiting.
- Monitor cost and throttle long-running or high-token calls.
- Consider content filters or guardrails depending on your app's audience.

## 6) Testing
- After support confirms enablement and env vars are set, run a test POST to your server endpoint to confirm responses.

## 7) Reach out
If Anthropic requires additional onboarding, provide the requested business details, and follow their onboarding steps. If you want, paste the reply from Anthropic here and I can help adapt the server code to match their response.

---

If you want, I can draft the exact support email including expected monthly tokens and example request shapes — tell me your expected usage (approx tokens/month) and I will produce a tailored message.