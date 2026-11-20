# LawyeredOS public beta

**Claude or Codex with the right legal-work skills—not another legal SaaS dashboard.**

LawyeredOS works with the matter files you choose, keeps recorded history and
state in your workspace, and helps identify and execute the next step under
lawyer oversight.

Choose the host you use:

- **Claude Desktop:** [macOS 0.2.4 beta.1 source ZIP](https://raw.githubusercontent.com/lawyered0/lawyered0.github.io/main/downloads/lawyeredos-0.2.4-macos-beta.1.zip)
- **Codex:** [macOS 0.2.4 Codex beta.1 source ZIP](https://raw.githubusercontent.com/lawyered0/lawyered0.github.io/main/downloads/lawyeredos-0.2.4-macos-codex-beta.1.zip)

```text
Claude 0.2.4 beta.1 SHA-256: 3c76e74fa3903bdb4bbee3c1dbcb8efa5f5d1e5d1d08b6b7ec0422e886939795
Codex 0.2.4 beta.1 SHA-256: 3c76e74fa3903bdb4bbee3c1dbcb8efa5f5d1e5d1d08b6b7ec0422e886939795
```

For Claude, extract the ZIP, open its `lawyeredos` folder in the Claude desktop
app's **Code** tab, and choose **Local**. For Codex, extract the ZIP, open the
`lawyeredos` folder as a local Codex project, and ask Codex to set up the
beta in a new private workspace using fictional data. Both downloads are
macOS-only; Python 3.12 is the fully tested runtime.

Claude setup asks explicitly whether to connect Gmail through Claude, skip
email, or use the experimental local read-only adapter. Codex setup asks
whether to use an already-authorized session read tool, skip email, or use the
experimental local read-only adapter. Setup does not authorize an account,
store credentials, or enable automatic sending.

The two filenames contain the same 181-member,
1,575,131-byte published prerelease archive. [Generated checksum and member manifest](release-manifest.json)
and [SHA256SUMS](SHA256SUMS) come from the same inspected build. The archive retains its candidate-time documentation; this page and the GitHub release record publication.

The read-only tracker connection keeps temporary sorting in memory. An exact
file manifest and recursive content/metadata checks now gate release builds.
Selected reviewed DOCX metadata-scrubbing fixes preserve namespaces, remove
declared custom-property parts and refuse unsafe review metadata.
Existing stale-write rejection and interrupted-save recovery remain. Fresh
installer/reference checks and fictional transports do not establish live Gmail
support, legal correctness, private-practice parity or a new interactive desktop
acceptance. Earlier versioned downloads remain unchanged.

See the [release record](https://github.com/lawyered0/lawyeredos/releases/tag/v0.2.4-beta.1)
and [workflow catalog](https://github.com/lawyered0/lawyeredos/blob/main/docs/WORKFLOW-CATALOG.md).

LawyeredOS is software, not legal advice. Verify the work before relying,
sending, signing, filing, or serving. Local files are not the same as offline
processing: selected content may be sent to Anthropic or OpenAI under your
account, settings, and terms.

The distribution page source and versioned downloads are maintained here.
The [development repository](https://github.com/lawyered0/lawyeredos) is public;
source changes do not replace immutable release archives.
