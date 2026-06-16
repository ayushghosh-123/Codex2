# Codex2: Collaborative IDE & Code Execution Platform

Welcome to **Codex2**, a state-of-the-art, web-based collaborative development environment (IDE) and code execution workspace. Codex2 is structured as a TypeScript-focused monorepo using [Nx Workspace](https://nx.dev) to manage its Next.js frontend, NestJS-based microservices backend, and shared packages.

---

## 🚀 Key Features

*   **Real-Time Collaborative Editing:** Real-time document synchronization utilizing Conflict-free Replicated Data Types (CRDTs) or Operational Transformations, including live user cursors and active presence indicator states.
*   **Sandboxed Code Execution:** Isolated run environments supporting multi-language compilation and execution (Python, JavaScript, C++, Go) with CPU/memory caps.
*   **Hierarchical Workspace Management:** Full-featured virtual file tree system enabling projects, directories, and files management.
*   **Contextual Comments & Discussions:** In-file threaded comments targeting specific lines of code, promoting team-wide discussions directly inside code files.
*   **Event-driven Notifications:** Instant updates via WebSockets for project invitations, code comments, and execution completion events.

---

## 📁 Monorepo Structure

The project is split into three main top-level directories under NPM/Nx workspaces:

```text
codex/
├── frontend/             # Next.js 15+ App Router web application
├── backend/              # NestJS microservices workspace
│   └── apps/             # Independent NestJS microservices
│       ├── backend       # Gateway/Reverse-proxy orchestrator (Port 4000)
│       ├── auth-service  # Authentication & Session management (Port 4001)
│       ├── project-service # Project metadata & workspace CRUD (Port 4002)
│       ├── file-service  # Directory tree structure & file storage (Port 4003)
│       ├── collab-service # WebSocket synchronization & CRDT signaling (Port 4004)
│       ├── comment-service # Threaded inline code comments (Port 4005)
│       ├── execut-service # Job manager for scheduling execution runs (Port 4006)
│       ├── runner-service # Sandbox environment orchestrator (Port 4007)
│       ├── permission-service # Granular ACL and RBAC controls (Port 4008)
│       └── notification-service # Real-time WebSockets & alert dispatcher (Port 4009)
└── shared/               # Shared TS libraries, schemas, interfaces, and modules
```

For a detailed look into how these services interact, please see the [Architecture Documentation](file:///d:/codex/architecture.md).

---

## 🛠️ Tech Stack

*   **Monorepo Tooling:** [Nx](https://nx.dev)
*   **Frontend Framework:** [Next.js](https://nextjs.org) (App Router, Tailwind CSS, TypeScript, Monaco Editor)
*   **Backend Framework:** [NestJS](https://nestjs.com) (TypeScript, Express)
*   **State Sync:** Yjs (CRDTs) & WebSockets
*   **Runtime Security:** Docker with gVisor/Firecracker (for runner service sandbox isolation)
*   **Database:** Prisma ORM / PostgreSQL / Redis (for session cache and job queuing)

---

## ⚙️ Quick Start

### 1. Prerequisites

Make sure you have the following tools installed locally:
*   [Node.js](https://nodejs.org) (v18.x or higher)
*   [NPM](https://www.npmjs.com) (v9.x or higher) or Yarn
*   [Docker](https://www.docker.com) (for sandboxed execution)

### 2. Installation

Clone this repository and run npm install in the root folder:

```bash
# Clone the repository
git clone https://github.com/ayushghosh-123/Codex2.git
cd Codex2

# Install dependencies for the entire workspace
npm install
```

### 3. Environment Configuration

Copy the sample environment files inside the `backend` and `frontend` folders and modify them as needed:

```bash
# In backend/
cp .env.example .env
```

### 4. Running the Project

You can run individual apps using Nx, or serve the entire stack.

**Serve individual applications:**

```bash
# Start the Next.js frontend
npx nx serve frontend

# Start the NestJS Gateway backend
npx nx serve backend

# Start the Collaboration service
npx nx serve collab-service
```

**Serve all services at once:**

```bash
# Serve all apps defined in the workspace
npx nx run-many -t serve
```

---

## 📚 Technical Documentation

To deep-dive into Codex2's design, please check out these documents:

*   📖 **[System Architecture](file:///d:/codex/architecture.md):** Deep breakdown of all 10 microservices, internal communication protocols (REST, gRPC, Pub/Sub), database design, and code-runner sandboxing.
*   🔄 **[Data Flow Patterns](file:///d:/codex/dataflow.md):** Sequential walkthroughs mapping user actions (such as editing code collaboratively or initiating a code execution task) to backend microservice logs.
*   🗺️ **[Product Roadmap](file:///d:/codex/roadmap.md):** Milestones mapping out the progression from the current boilerplate setup to a production-ready enterprise SaaS.
*   ⚠️ **[Important Dev Guidelines](file:///d:/codex/important.md):** Code style conventions, type safety standards, security guardrails, and environment variable requirements.
