# LawyeredOS public beta

**Claude or Codex with the right legal-work skills—not another legal SaaS dashboard.**

LawyeredOS works with the matter files you choose, keeps recorded history and
state in your workspace, and helps identify and execute the next step under
lawyer oversight.

Choose the host you use:

- **Claude Desktop:** [macOS 0.2.3 beta.1 source ZIP](https://raw.githubusercontent.com/lawyered0/lawyered0.github.io/main/downloads/lawyeredos-0.2.3-macos-beta.1.zip)
- **Codex:** [macOS 0.2.3 Codex beta.1 source ZIP](https://raw.githubusercontent.com/lawyered0/lawyered0.github.io/main/downloads/lawyeredos-0.2.3-macos-codex-beta.1.zip)

```text
Claude 0.2.3 beta.1 SHA-256: c5b28fb086f18dc09c2ec89062a578e06469036538d71953cb8134f59312ce35
Codex 0.2.3 beta.1 SHA-256: c5b28fb086f18dc09c2ec89062a578e06469036538d71953cb8134f59312ce35
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

The two filenames contain the same reviewed 172-member, 1,554,842-byte archive;
setup selects the host-specific Claude or Codex discovery layer. This release
adds shared source, advice, record and intake contracts plus nine manual workflow
modules: contract review, demands, inbound demand triage, sourced advocacy,
chronology, daily attention, inbox workup, overdue triage and orientation checks.
The existing matter skill reads the catalog and selected module. Six native
installer options remain; the new modules are not separate native skills.

Required reviewed-head and protected-merge CI, 254 project tests, 103 vendored
tests, ordinary acceptance, strict plugin/archive checks and fresh both-host
installed-reference checks passed. Python behavior and existing optional
jurisdiction profiles are unchanged. These checks do not establish new
substantive model behavior, legal correctness, live connectors or broader host
compatibility. Practice-wide mail needs bounded supplied sources or an actually
authorized active tool. Mail/calendar were disabled in fresh installs and OCR
was unavailable. Historical downloads remain unchanged.

See the [release record](https://github.com/lawyered0/lawyeredos/releases/tag/v0.2.3-beta.1)
and [workflow catalog](https://github.com/lawyered0/lawyeredos/blob/main/docs/WORKFLOW-CATALOG.md).

LawyeredOS is software, not legal advice. Verify the work before relying,
sending, signing, filing, or serving. Local files are not the same as offline
processing: selected content may be sent to Anthropic or OpenAI under your
account, settings, and terms.

The distribution page source and versioned downloads are maintained here.
The [development repository](https://github.com/lawyered0/lawyeredos) is public;
source changes do not replace immutable release archives.
