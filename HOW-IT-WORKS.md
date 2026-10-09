# How LawyeredOS works

This guide explains what is inside the LawyeredOS **0.2.0 beta.1** download for macOS, what each part does, and which parts are tested versus experimental. It describes that release only. Later builds may differ.

LawyeredOS is software, not legal advice. Claude can make material errors. Verify facts, law, deadlines, calculations, document changes and final work before you rely on them or send, sign, file or serve anything.

## The short version

LawyeredOS has four parts that work together:

1. **Skills guide Claude through the work.** A skill is a written set of instructions that Claude follows for one kind of task, such as getting up to speed on a matter or preparing a letter. Skills tell Claude what to check, what order to work in, and where it must stop and ask you.
2. **Python scripts do the repeatable operations.** Anything that should happen the same way every time, such as reading the matter register, saving a file without overwriting another one, or applying tracked changes to a Word document, is done by a bundled script rather than left to Claude's judgment.
3. **The matter database keeps the record between sessions.** Each matter has a row in a local SQLite database with its file number, client, folder, status, next action, key dates and an append-only timeline. When you come back to a matter in a new session, Claude reads that record instead of relying on chat memory.
4. **You direct and approve.** You choose the matter and the task. Claude shows a preview of any change to the register or any saved file before it is made, and nothing is written until you approve it. LawyeredOS never sends, signs, files or serves anything, and it never treats reading a document as permission to act on it.

## What LawyeredOS does not do

- **It does not remember everything.** Claude knows what is in the matter register, the matter brief and the files it reads in that session. If something was never recorded or saved, it is not remembered.
- **It does not work in the background.** Nothing runs on a schedule or while Claude is closed. Every action starts with a request from you in a Claude session.
- **It does not run on Windows or Linux.** This beta is tested only on macOS, in the Claude desktop app's Code tab with a Local session.
- **It is not offline.** Your files stay in folders you choose, but Claude may send selected file content to Anthropic under your Claude account, plan, settings and terms. Check those controls and your professional obligations before using client data.
- **It is not a full practice-management system.** There is no billing, trust accounting, conflict clearance, legal research or deadline calculator.

## Requirements

| Item | Status |
|---|---|
| macOS | Required |
| Claude desktop app, Code tab, Local session | Required. This is the tested setup. |
| Python | 3.11 or newer required. 3.12 is the fully tested version. |
| Claude subscription or plan | Required and paid separately to Anthropic. LawyeredOS itself is free. |
| Terminal `claude` command | Optional fallback only. |

## Setup

You open the extracted `lawyeredos` folder in the Code tab, choose Local, and ask Claude to set it up. A setup skill gathers your choices (workspace folder, branding label, optional modules, jurisdiction profile) and then hands every write to a setup wizard script.

The wizard shows the complete plan first and only applies it after you approve. It creates a versioned copy of the package, the project skills and review agent, a private configuration file, an empty matter register and launchers. It does not change your global Claude settings and does not ask for passwords or tokens. Updates install alongside the previous version, and a rollback undoes only the most recent setup change while keeping anything you edited afterwards.

For a first try, use a new empty folder and the fictional example matter included in the download.

## The skills

Seven skills come with this release, plus one review agent. Each entry lists what the skill does, the scripts it uses and anything extra it needs.

### 1. Setup (`lawyeredos-setup`)

- **What it does:** Walks you through installation, update and rollback in plain conversation. It cannot edit files itself; the wizard does all the writing after you approve the plan.
- **Scripts:** `setup_wizard.py` (plans and applies setup), `validate_setup.py` (checks the finished install), `setup_demo.py` (builds the fictional demo).
- **Needs:** Python only for the first preview. If a module you pick needs extra Python packages, Claude shows the exact install commands and asks before running them.
- **Status:** Tested on macOS.

### 2. Work on a matter (`lawyeredos-work-on-matter`)

- **What it does:** Gets Claude up to speed on one exact matter. It looks up the matter in the register, confirms the folder is the right one inside your workspace, reads the matter brief (`_matter-brief.md`) and lists the most recent files. Claude then reads the relevant documents and tells you where things stand, what is uncertain and one recommended next step. A general orientation is read-only. If the matter is ambiguous or the folder is missing, it stops rather than guessing.
- **Scripts:**
  - `matter_context.py` looks up the matter and returns the brief (up to 30,000 characters) and a list of recent files (20 by default).
  - `safe_output.py` saves a requested draft only after a preview, and never overwrites an existing file.
  - `memory_search.py` builds a temporary search index over long Markdown briefs or decision logs, and updates matter notes only after a preview that checks nothing changed in the meantime.
  - `extract_pdf.py` and `document_helpers.py` pull text out of PDFs, flag scanned PDFs that need OCR, and can create a separate OCR copy without changing the original.
  - `voice_lint.py` checks outgoing letter or email text against configurable style rules.
- **Needs:** Nothing extra for the core workflow. PDF text extraction needs Poppler. OCR needs OCRmyPDF.
- **Status:** Core orientation is tested. OCR is experimental and was not verified on the test machine.
- **Email:** Live Gmail is experimental and off by default (see below). When it is off, Claude should tell you email was not checked rather than implying it was.

### 3. Matter tracker (`lawyeredos-matter-tracker`)

- **What it does:** Manages the matter register. It can find, list, show and check matters, create a new matter by linking an existing folder, update fields such as next action and dates, add timeline entries, and close or reopen a matter. Every change is shown as a preview first and only committed when you approve that exact preview. If the register changed in the meantime, the change is refused.
- **Scripts:** `tracker_cli.py` (the register itself, with an audit history of every committed change), `tracker_migration.py` (previewed import from an older register), `tracker_xlsx.py` (an optional read-only spreadsheet copy).
- **Needs:** Nothing extra. `openpyxl` is optional, only for the spreadsheet copy.
- **Status:** Tested. A name search can help find possible conflicts, but it is not a conflict check. Dates stored in the register are recorded facts, not verified legal deadlines.

### 4. Letters (`lawyeredos-letterhead`)

- **What it does:** Creates a formal Word letter from your configured template, then renders it so Claude can check every page for layout problems, leftover placeholders, comments and hidden metadata. It saves an internal draft only. It does not send, sign or serve.
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

- **What it does:** Challenges an important draft from four angles: an opposing reader, a fact and source check, privilege and admissions, and a pre-mortem of what could go wrong. Each angle runs as a separate read-only Claude reviewer that cannot edit, browse or run commands. Claude then checks the findings against the sources and confirms the draft was not changed during the review. It never rewrites or sends the draft.
- **Scripts:** `review_bundle.py` (fingerprints the draft and sources before and after), `review_orchestrator.py` (prepares the four review tasks and checks that every result came back complete).
- **Agent:** `lawyeredos-legal-review-lens`, the read-only reviewer.
- **Needs:** Nothing extra. It uses Claude only, with no other AI service.
- **Status:** **Experimental** as a complete four-angle review. One single-angle run has been accepted on the test machine.

## Tested, experimental and not included

| Area | Status in 0.2.0 beta.1 |
|---|---|
| macOS, Claude desktop Code tab, Local session, Python 3.12 | Tested |
| Matter register and matter orientation | Tested |
| Previewed, no-overwrite saves | Tested |
| Word letters and simple tracked-change redlines | Tested (optional modules) |
| Setup, update and rollback | Tested |
| Full four-angle review | Experimental |
| Live Gmail | Experimental, off by default. Read-only search of sender, recipient, subject, date and a short preview of each message. Does not open attachments. Tested only with simulated responses. |
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
- **Passwords and tokens:** never stored by LawyeredOS. The optional live connections read a token from an environment variable you name.
- **What goes to Anthropic:** whatever Claude reads or writes in the session may be processed by Anthropic under your Claude account and terms.

## Licence and source

LawyeredOS is free and open source under GPL-3.0-or-later. The bundled redline engine keeps its MIT licence. The download includes the full source, the install, update, rollback, dependency and troubleshooting guides, and fictional examples.

Download: [LawyeredOS 0.2.0 beta.1 for macOS](https://raw.githubusercontent.com/lawyered0/lawyered0.github.io/main/downloads/lawyeredos-0.2.0-macos-beta.1.zip)

SHA-256: `f949d6d33d449b674c5fd1e290646b1b53b2cdf497e2c48d60ab88f09c8177cc`
