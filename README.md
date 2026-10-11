# LawyeredOS public beta

**Claude or Codex with the right legal-work skills—not another legal SaaS dashboard.**

LawyeredOS works with the matter files you choose, keeps recorded history and
state in your workspace, and helps identify and execute the next step under
lawyer oversight.

Choose the host you use:

- **Claude Desktop:** [macOS 0.2.0 beta.3 source ZIP](https://raw.githubusercontent.com/lawyered0/lawyered0.github.io/main/downloads/lawyeredos-0.2.0-macos-beta.3.zip)
- **Codex:** [macOS 0.2.0 Codex beta.2 source ZIP](https://raw.githubusercontent.com/lawyered0/lawyered0.github.io/main/downloads/lawyeredos-0.2.0-macos-codex-beta.2.zip)

```text
Claude beta.3 SHA-256: 65f8d412e6ee656fc525f64f13ff84b35f631ae9878d71a6aef88e0d2e359e67
Codex beta.2 SHA-256: 65f8d412e6ee656fc525f64f13ff84b35f631ae9878d71a6aef88e0d2e359e67
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
the host-specific Claude or Codex discovery layer. Matter-mail intake now
supports complete bounded bodies, resumable review, safe supported attachments,
and repeat deduplication. One user-created Gmail thread passed the delegated
connector path. Ordinary-host Gmail and live IMAP/REST remain experimental and
unverified; the publication owner expressly waived those live tests as a beta
prerequisite, not as evidence that they work.

LawyeredOS is software, not legal advice. Verify the work before relying,
sending, signing, filing, or serving. Local files are not the same as offline
processing: selected content may be sent to Anthropic or OpenAI under your
account, settings, and terms.

The complete website and beta download are published from this repository. The
development repository remains private.
