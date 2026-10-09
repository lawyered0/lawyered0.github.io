# LawyeredOS public beta

**Claude or Codex with the right legal-work skills—not another legal SaaS dashboard.**

LawyeredOS works with the matter files you choose, keeps recorded history and
state in your workspace, and helps identify and execute the next step under
lawyer oversight.

Choose the host you use:

- **Claude Desktop:** [macOS 0.2.0 beta.2 source ZIP](https://raw.githubusercontent.com/lawyered0/lawyered0.github.io/main/downloads/lawyeredos-0.2.0-macos-beta.2.zip)
- **Codex:** [macOS 0.2.0 Codex beta.1 source ZIP](https://raw.githubusercontent.com/lawyered0/lawyered0.github.io/main/downloads/lawyeredos-0.2.0-macos-codex-beta.1.zip)

```text
Claude beta.2 SHA-256: 0f3eccf6e62e0bcb7ffbb88a6c14dd2f96c8a05acba73b93bb4bff3173af7cd5
Codex beta.1 SHA-256: b468300f81bfdcc88398964a2808f6484c5cd2fb56b44d48e6721ab2d7d6e366
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

LawyeredOS is software, not legal advice. Verify the work before relying,
sending, signing, filing, or serving. Local files are not the same as offline
processing: selected content may be sent to Anthropic or OpenAI under your
account, settings, and terms.

The complete website and beta download are published from this repository. The
development repository remains private.
