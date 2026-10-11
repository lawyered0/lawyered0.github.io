# LawyeredOS public beta

**Claude or Codex with the right legal-work skills—not another legal SaaS dashboard.**

LawyeredOS works with the matter files you choose, keeps recorded history and
state in your workspace, and helps identify and execute the next step under
lawyer oversight.

Choose the host you use:

- **Claude Desktop:** [macOS 0.2.2 beta.1 source ZIP](https://raw.githubusercontent.com/lawyered0/lawyered0.github.io/main/downloads/lawyeredos-0.2.2-macos-beta.1.zip)
- **Codex:** [macOS 0.2.2 Codex beta.1 source ZIP](https://raw.githubusercontent.com/lawyered0/lawyered0.github.io/main/downloads/lawyeredos-0.2.2-macos-codex-beta.1.zip)

```text
Claude 0.2.2 beta.1 SHA-256: b9bb69afde0b62d4a4a4211cad8ff08e98d1d376f688c149d10a5805b2e640ee
Codex 0.2.2 beta.1 SHA-256: b9bb69afde0b62d4a4a4211cad8ff08e98d1d376f688c149d10a5805b2e640ee
```

For Claude, extract the ZIP, open its `lawyeredos` folder in the Claude desktop
app's **Code** tab, and choose **Local**. For Codex, extract the ZIP, open the
`lawyeredos` folder as a local Codex project, and ask Codex to set up the
candidate in a new private workspace using fictional data. Both downloads are
macOS-only; Python 3.12 is the fully tested runtime.

Claude setup asks explicitly whether to connect Gmail through Claude, skip
email, or use the experimental local read-only adapter. Codex setup asks
whether to use an already-authorized session read tool, skip email, or use the
experimental local read-only adapter. Setup does not authorize an account,
store credentials, or enable automatic sending.

The two filenames contain the same reviewed shared-core archive; setup selects
the host-specific Claude or Codex discovery layer. This release adds
private-by-construction workspace files, guarded durable matter writes,
audience-aware draft review, proportional review modes, template-integrity
checks, section-aware long-brief orientation, and safer Codex upgrade rollback.
The new behavior passed deterministic fictional and installed-archive tests on
both supported hosts. No new authenticated Claude or live-account acceptance
was run; broader mailbox use, OAuth/REST, sending, and mailbox mutation remain
untested or excluded.

LawyeredOS is software, not legal advice. Verify the work before relying,
sending, signing, filing, or serving. Local files are not the same as offline
processing: selected content may be sent to Anthropic or OpenAI under your
account, settings, and terms.

The complete website and beta download are published from this repository. The
development repository remains private.
