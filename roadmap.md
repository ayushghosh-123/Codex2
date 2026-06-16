# Codex2: Development Roadmap

This document outlines the strategic implementation phases of **Codex2**, taking the project from its current generated boilerplate stage to a production-ready, secure, and collaborative enterprise platform.

---

## 🗺️ Roadmap at a Glance

| Phase | Milestone | Primary Target | Timeline |
| :--- | :--- | :--- | :--- |
| **Phase 1** | Foundation & Single-User Core | Complete Auth, Project, File services, and Basic Runner | Weeks 1 - 6 |
| **Phase 2** | Real-Time Collaboration | Real-time Yjs synchronization, cursors, comments & notifications | Weeks 7 - 12 |
| **Phase 3** | Robust Sandboxing & Scale | Integration of gVisor runtime sandboxing, task queues (Redis), & memory constraints | Weeks 13 - 18 |
| **Phase 4** | Productivity & AI Integration | Custom Monaco panels, debugger tools, and AI coding assistant integration | Weeks 19 - 24 |

---

## 🛠️ Detailed Phase Breakdown

### Phase 1: Foundation & Single-User Core (MVP)
*Goal: Create a working developer environment for a single user, from logging in to creating projects, creating files, and running scripts.*

*   **Authentication & Authorization:**
    *   Initialize database schemas in PostgreSQL using Prisma.
    *   Build login, signup, and token validation (JWT) endpoints in the `auth-service`.
    *   Create access controls in the `permission-service`.
*   **Workspace Management:**
    *   Build a workspace file tree structure backend in `file-service`.
    *   Implement file creation, deletion, renaming, and reading.
    *   Connect the Next.js frontend to display the directory sidebar and open files inside Monaco Editor.
*   **Basic Execution Environment:**
    *   Develop a basic `execut-service` and `runner-service`.
    *   Implement basic Docker container runner spawning to execute Node.js, Python, and C++ scripts, returning output synchronously.

---

### Phase 2: Multi-User Collaboration & Social Tools
*Goal: Transform the workspace into a shared canvas where teams can code together in real-time, comment on lines, and collaborate.*

*   **Real-Time Collaborative Editing:**
    *   Deploy the `collab-service` as a WebSocket server.
    *   Set up **Yjs** CRDT bindings on Next.js Monaco Editor and NestJS collab-service.
    *   Implement live cursors and visual selection highlight overlays representing collaborators.
    *   Develop an active user presence indicator list.
*   **Discussion & Review Tools:**
    *   Enable the `comment-service` to allow inline commenting targeting file, line, and column indices.
    *   Implement notification triggers inside `notification-service` for comment mentions (`@username`).
*   **Workspace Permissions:**
    *   Implement workspace invitation links.
    *   Define project-level roles: `Viewer` (Read-only editor, cannot execute), `Editor` (Full write access, can run), and `Owner` (Full settings control).

---

### Phase 3: Secure Scale & Enterprise Features
*Goal: Secure the execution runner service against malicious scripts, handle usage spikes via queuing, and provide enterprise instrumentation.*

*   **Runner Sandboxing & Hardening:**
    *   Transition the container runtime in `runner-service` from basic Docker sockets to **gVisor** (`runsc`) or **Firecracker** microVMs.
    *   Apply strict cgroups policies: restrict memory to 256MB, CPU core allocation to 0.5, and execution timeouts to 15 seconds.
    *   Disable external networking in containers to prevent web misuse.
*   **Job Queuing & Load Distribution:**
    *   Integrate **Redis (BullMQ)** within `execut-service` and `runner-service` to buffer burst execution requests.
    *   Scale the runner service horizontally to pull jobs concurrently.
*   **Usage Instrumentation:**
    *   Introduce rate limits on the API Gateway.
    *   Add disk size quotas per project workspace (e.g., maximum 50MB per project) in the `file-service`.

---

### Phase 4: Productivity & AI Integration
*Goal: Provide premium features to elevate the coding experience, adding debugger tools and intelligent assistants.*

*   **AI Developer Assistant:**
    *   Integrate Gemini API endpoints to support autocomplete, line refactoring, and debug explanations directly inside Monaco Editor.
    *   Create a side-drawer AI assistant panel.
*   **Visual Debugging & Tooling:**
    *   Expose terminal input commands, enabling interactive shells (bash/python REPL) inside the browser terminal panel.
    *   Build a visual execution debugger representing step-by-step variables mapping.
*   **User Experience Polish:**
    *   Add multi-tab document layouts.
    *   Integrate custom themes (dracula, github-dark, solarized) for code editing.

---

## 📈 Release Schedule

*   **Alpha (Internal Release):** End of Week 6. Covers all Phase 1 functionalities.
*   **Beta (Public Testing):** End of Week 12. Covers Phase 2 collaboration and basic security.
*   **Production Launch (GA):** End of Week 18. Includes hardened sandboxing, rate limits, and team accounts.
