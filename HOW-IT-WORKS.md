# How LawyeredOS works

This guide explains the LawyeredOS **Claude 0.2.1 beta.1** and **Codex 0.2.1 beta.1** downloads for macOS, what each part does, and which parts are tested versus experimental. It describes those releases only. Later builds may differ.

LawyeredOS is software, not legal advice. Claude and Codex can make material errors. Verify facts, law, deadlines, calculations, document changes and final work before you rely on them or send, sign, file or serve anything.

## The short version

LawyeredOS has four parts that work together:

1. **Skills guide Claude or Codex through the work.** A skill is a written set of instructions for one kind of task, such as getting up to speed on a matter or preparing a letter. Skills say what to check, what order to work in, and where the AI assistant must stop and ask you.
2. **Python scripts do the repeatable operations.** Anything that should happen the same way every time, such as reading the matter register, saving a file without overwriting another one, or applying tracked changes to a Word document, is done by a bundled script rather than left to the AI assistant's judgment.
3. **The matter database keeps the record between sessions.** Each matter has a row in a local SQLite database with its file number, client, folder, status, next action, key dates and an append-only timeline. In a new session, Claude or Codex reads that record instead of relying on chat memory.
4. **You direct and approve.** You choose the matter and the task. The AI assistant shows a preview of any change to the register or any saved file before it is made, and nothing is written until you approve it. LawyeredOS never sends, signs, files or serves anything, and it never treats reading a document as permission to act on it.

## What LawyeredOS does not do

- **It does not remember everything.** The AI assistant knows what is in the matter register, the matter brief and the files it reads in that session. If something was never recorded or saved, it is not remembered.
- **It does not work in the background.** Nothing runs on a schedule while Claude or Codex is closed. Every action starts with a request from you in an active session.
- **It does not run on Windows or Linux.** Both beta packages are tested only on macOS: Claude in Desktop Code Local and Codex in a local project.
- **It is not offline.** Your files stay in folders you choose, but selected content may be processed by Anthropic or OpenAI under your account, plan, settings and terms. Check those controls and your professional obligations before using client data.
- **It is not a full practice-management system.** There is no billing, trust accounting, conflict clearance, legal research or deadline calculator.

## Requirements

| Item | Status |
|---|---|
| macOS | Required |
| Supported host | Choose Claude Desktop, Code tab, Local session; or OpenAI Codex with a local project. |
| Python | 3.11 or newer required. 3.12 is the fully tested version. |
| Claude or Codex access | Required for the matching package and paid separately to Anthropic or OpenAI. LawyeredOS itself is free. |
| Terminal `claude` command | Optional fallback for the Claude package only. |

## Setup

Download the package for your host. For Claude, open the extracted `lawyeredos` folder in the desktop app's Code tab and choose Local. For Codex, open the extracted folder as a local Codex project. Then ask your AI assistant to set up LawyeredOS in a new private workspace using fictional data. A setup skill gathers your choices (workspace folder, branding label, optional modules, jurisdiction profile) and hands every write to a setup wizard script.

The wizard shows the complete plan first and only applies it after you approve. It creates a versioned copy of the package, the project skills and review workflow, a private configuration file, an empty matter register and launchers. It does not overwrite global Claude or Codex settings and does not ask for passwords or tokens. Email is always a visible choice. Claude can use its user-authorized Gmail connector, skip email safely, or use the experimental local read-only adapter. Codex can use an already-authorized supported session read tool when one is actually available, skip email safely, or use the experimental local read-only adapter. Setup never assumes Gmail is connected and never enables sending. Updates install alongside the previous version, and a rollback undoes only the most recent setup change while keeping anything you edited afterwards.

For a first try, use a new empty folder and the fictional example matter included in the download.

## The skills

Each package includes seven skills and a host-specific review workflow. Each entry lists what the skill does, the scripts it uses and anything extra it needs.

### 1. Setup (`lawyeredos-setup`)

- **What it does:** Walks you through installation, update and rollback in plain conversation. It cannot edit files itself; the wizard does all the writing after you approve the plan.
- **Scripts:** `setup_wizard.py` (plans and applies setup), `validate_setup.py` (checks the finished install), `setup_demo.py` (builds the fictional demo).
- **Needs:** Python only for the first preview. If a module you pick needs extra Python packages, Claude or Codex shows the exact install commands and asks before running them.
- **Status:** Tested on macOS.

### 2. Work on a matter (`lawyeredos-work-on-matter`)

- **What it does:** Gets Claude or Codex up to speed on one exact matter. It looks up the matter in the register, confirms the folder is the right one inside your workspace, reads the matter brief (`_matter-brief.md`) and lists the most recent files. The AI assistant then reads the relevant documents and tells you where things stand, what is uncertain and one recommended next step. A general orientation is read-only. If the matter is ambiguous or the folder is missing, it stops rather than guessing.
- **Scripts:**
  - `matter_context.py` looks up the matter and returns the brief (up to 30,000 characters) and a list of recent files (20 by default).
  - `safe_output.py` saves a requested draft only after a preview, and never overwrites an existing file.
  - `memory_search.py` builds a temporary search index over long Markdown briefs or decision logs, and updates matter notes only after a preview that checks nothing changed in the meantime.
  - `extract_pdf.py` and `document_helpers.py` pull text out of PDFs, flag scanned PDFs that need OCR, and can create a separate OCR copy without changing the original.
  - `voice_lint.py` checks outgoing letter or email text against configurable style rules.
- **Needs:** Nothing extra for the core workflow. PDF text extraction needs Poppler. OCR needs OCRmyPDF.
- **Status:** Core orientation is tested. OCR is experimental and was not verified on the test machine.
- **Email:** Setup never silently turns Gmail off or assumes a connection. Claude offers its Gmail connector, a safe skip, or the experimental local `gmail.readonly` adapter. Codex offers an already-authorized supported session read tool when available, the same safe skip, or the experimental adapter. Only a successful bounded read in the active session proves email is available for that request. LawyeredOS does not auto-send or change mailbox state.

### 3. Matter tracker (`lawyeredos-matter-tracker`)

- **What it does:** Manages the matter register. It can find, list, show and check matters, create a new matter by linking an existing folder, update fields such as next action and dates, add timeline entries, and close or reopen a matter. Every change is shown as a preview first and only committed when you approve that exact preview. If the register changed in the meantime, the change is refused.
- **Scripts:** `tracker_cli.py` (the register itself, with an audit history of every committed change), `tracker_migration.py` (previewed import from an older register), `tracker_xlsx.py` (an optional read-only spreadsheet copy).
- **Needs:** Nothing extra. `openpyxl` is optional, only for the spreadsheet copy.
- **Status:** Tested. A name search can help find possible conflicts, but it is not a conflict check. Dates stored in the register are recorded facts, not verified legal deadlines.

### 4. Letters (`lawyeredos-letterhead`)

- **What it does:** Creates a formal Word letter from your configured template, then renders it so Claude or Codex can check every page for layout problems, leftover placeholders, comments and hidden metadata. It saves an internal draft only. It does not send, sign or serve.
- **Scripts:** `create_letter.py` (builds the letter), `render_docx.py` (converts it to PDF and page images for checking), `build_neutral_template.py` (rebuilds the plain template included in the download).
- **Needs:** `python-docx`. LibreOffice and Poppler are recommended for the visual check.
- **Status:** Optional module. Tested with the neutral template.

### 5. Contract redline (`lawyeredos-contract-redline`)

- **What it does:** Applies changes you have already decided as real Word tracked changes, produces a clean copy, and checks both. It does not decide negotiating or legal positions, and it will not rebuild a contract from a PDF. If any change fails to apply, it reports the failure instead of patching the document by hand.
- **Scripts:** the bundled `legal-redline-tools` engine (MIT licensed), `accept_tracked_changes.py` (makes the clean copy), `render_docx.py` (visual check).
- **Needs:** `python-docx`, `lxml` and `fpdf2`. LibreOffice and Poppler recommended.
- **Status:** Optional module. Simple insertions and deletions are tested. Complex contracts and every Word revision type are not yet verified.

### 6. Calendar sync (`lawyeredos-calendar-sync`)

- **What it does:** Compares the dates in the matter register with a calendar and shows exactly which events would be created, updated or removed. The register is always the source of truth.
- **Scripts:** `calendar_plan.py` (works offline on exported event files), `integrations.py` (the Google Calendar connection).
- **Needs:** Nothing for the offline comparison. The live connection needs a Google Calendar access token you supply yourself and a dedicated calendar. It never uses your main calendar.
- **Status:** The offline comparison works. The live Google Calendar connection is **experimental**, off by default and only tested against simulated responses.

### 7. Multi-perspective review (`lawyeredos-adversarial-panel`)

- **What it does:** Challenges an important draft from four angles: an opposing reader, a fact and source check, privilege and admissions, and a pre-mortem of what could go wrong. Each angle runs through the host's bounded review workflow. The lead session checks the findings against the sources and confirms the draft was not changed during the review. It never rewrites or sends the draft.
- **Scripts:** `review_bundle.py` (fingerprints the draft and sources before and after), `review_orchestrator.py` (prepares the four review tasks and checks that every result came back complete).
- **Agent:** Claude uses `lawyeredos-legal-review-lens`; Codex uses four read-only reviewer tasks where host support is available.
- **Needs:** Nothing beyond the selected host.
- **Status:** **Experimental** as a complete four-angle review. The Codex candidate completed a fictional four-reviewer acceptance run. Claude's accepted test was a single-angle run.

## Tested, experimental and not included

| Area | Status in the current macOS betas |
|---|---|
| macOS, Python 3.12, Claude Desktop Code Local | Tested in Claude 0.2.1 beta.1, including the bounded read-only IMAP acceptance below |
| macOS, Python 3.12, Codex local project and project-local skills | Tested in Codex 0.2.1 beta.1, including the bounded read-only IMAP acceptance below |
| Matter register and matter orientation | Tested |
| Previewed, no-overwrite saves | Tested |
| Word letters and simple tracked-change redlines | Tested (optional modules) |
| Setup, update and rollback | Tested |
| Full four-angle review | Experimental |
| Claude Gmail connector | Configurable through Claude's user-facing consent flow, but not used for the 0.2.1 ordinary-host IMAP acceptance. A successful bounded read is required before reporting it connected. The connector may expose send and mailbox actions; LawyeredOS does not invoke them. |
| Codex email access | Not assumed. Setup uses an already-authorized supported session read tool only when it is actually available, otherwise it offers a safe skip or the experimental local adapter. Session-tool live-mail acceptance was not run. |
| Local Gmail REST adapter | Experimental explicit opt-in using a separately provisioned `gmail.readonly` token. It supports bounded full-message and supported-attachment retrieval with read-only requests. Tested only with simulated responses. |
| Portable Gmail IMAP adapter | Experimental explicit opt-in using a user-selected credential source, localized All Mail discovery, read-only selection, and `BODY.PEEK`. One exact self-addressed test thread passed ordinary-host acceptance in Claude Desktop Code Local and Codex Desktop: one complete body, three hash-bound DOCX chunks, checkpoint completion, repeat deduplication, and guarded bundle deletion. This does not establish broader mailbox, account, OAuth/REST, sending, or mailbox-mutation coverage. |
| Live Google Calendar | Experimental, off by default. Tested only with simulated responses. |
| OCR of scanned PDFs | Experimental, not verified on the test machine |
| Python 3.11 or 3.13+ | Within the declared range, not tested |
| Windows and Linux | Not supported |
| Practice-management system connection | Not included |
| Legal deadline calculation | Not included |

The optional Ontario profile adds workflow guardrails only, such as reminders to verify the governing rule and current official source. It is not a source of current law.

## Where your information lives

- **Matter files:** in the workspace folder you choose. LawyeredOS does not move or rename them.
- **Matter register:** a local SQLite database in your workspace.
- **Settings:** a private configuration file in your workspace.
- **Passwords and tokens:** never stored by LawyeredOS. Host-managed connectors authenticate through their own user-facing flows. Experimental REST connections read a token from an environment variable you name.
- **What goes to the AI provider:** whatever Claude or Codex reads or writes in the session may be processed by Anthropic or OpenAI under your account, settings and terms.

## Licence and source

LawyeredOS is free and open source under GPL-3.0-or-later. The bundled redline engine keeps its MIT licence. The download includes the full source, the install, update, rollback, dependency and troubleshooting guides, and fictional examples.

Downloads:

- [Claude 0.2.1 beta.1 for macOS](https://raw.githubusercontent.com/lawyered0/lawyered0.github.io/main/downloads/lawyeredos-0.2.1-macos-beta.1.zip)
- [Codex 0.2.1 beta.1 for macOS](https://raw.githubusercontent.com/lawyered0/lawyered0.github.io/main/downloads/lawyeredos-0.2.1-macos-codex-beta.1.zip)

Claude SHA-256: `1e7d886c76e2e6cbfeee33bf14833995db91fde2b4a7d1e1565dcb4769d14856`

Codex SHA-256: `1e7d886c76e2e6cbfeee33bf14833995db91fde2b4a7d1e1565dcb4769d14856`

The 0.2.1 acceptance was deliberately narrow. It used one exact user-created
thread through the portable read-only IMAP route on each supported desktop
host. OAuth/REST, broader searches and accounts, sending, and mailbox mutations
were not accepted by that test.
