# Codex2: Critical Development Guidelines

This document contains essential coding rules, safety protocols, and monorepo guidelines that all engineers **must follow** without exception.

---

## 🛡️ 1. TypeScript & Type Safety Rules

To ensure stability, compile-time validation, and ease of refactoring:
*   **Zero `any` Policy:** The use of `any` is strictly prohibited. If a type is unknown, use `unknown` and perform runtime validation (using type guards or libraries like Zod).
*   **Enable Strict Mode:** Ensure `"strict": true` is configured and maintained in all `tsconfig.json` files.
*   **Shared Contracts:** All API request payloads, response payloads, WebSocket events, and DTOs (Data Transfer Objects) must be defined as TypeScript interfaces or classes in the [shared library](file:///d:/codex/shared/) and imported by both frontend and backend services.
*   **Type Assertions Guardrails:** Avoid type casting (`as Type`). Use runtime schema validators (Zod/Class-Validator) to confirm payloads match the expected type before handling them in controllers.

---

## 🗄️ 2. Database Schema Policies

*   **No Unapproved Schema Alterations:** **Do not alter or change the database schemas** unless explicitly requested and approved. Ensure existing tables, relationships, and datatypes remain intact.
*   **Safe Migration Strategy:** If a migration is approved, it must be additive. Never run migrations that drop tables, rename columns, or break backwards compatibility with existing deployment instances.
*   **ORM Usage:** Access the database strictly through the Prisma Client. Raw SQL queries must be avoided to prevent SQL injection vulnerabilities and maintain type safety.

---

## 🔒 3. Runner Sandbox Security Constraints

When modifying the code execution subsystem (`runner-service` and `execut-service`):
*   **Non-Privileged Execution:** Code containers must never be run with root capabilities. Set user ID and group ID boundaries mapping containers to a restricted user (e.g. `USER nobody`).
*   **Hard Resource Caps:** Never commit changes that disable, bypass, or increase resource limitations. Memory must remain capped at 256MB, CPU at 0.5 cores, and execution timeout at 15 seconds.
*   **Isolated Network Bridges:** Network interface cards on code-execution runners must remain detached. Containers must have no public Internet access to prevent outgoing cyber-attacks.
*   **Container Runtime Audits:** Only use vetted runtime engines (like gVisor or Firecracker). Standard Docker runtimes (`runc`) must not be used on production servers.

---

## 📦 4. Monorepo & Nx Architecture Rules

To maintain a clean boundary separation and prevent dependency bloat:
*   **No Cross-App Imports:** A microservice in `backend/apps/` must **never** import modules directly from another microservice. If code is shared, move it into the [shared library](file:///d:/codex/shared/).
*   **Circular Dependency Prevention:** Circular imports are disallowed. Periodically run the Nx dependency graph to ensure clean hierarchies:
    ```bash
    npx nx graph
    ```
*   **Boundary Checking:** Run typechecks and lint checks inside the Nx pipeline before pushing any commits:
    ```bash
    npx nx run-many -t lint typecheck
    ```

---

## ✅ 5. Pre-Commit Verification Checklist

Before opening a pull request, run the following validation pipeline:

1.  **Code Quality Check:**
    ```bash
    npm run lint
    ```
2.  **Verify Types:** Make sure TypeScript compiler reports zero warnings:
    ```bash
    npx nx run-many -t typecheck
    ```
3.  **Run Test Suite:** Confirm all unit tests pass:
    ```bash
    npm run test
    ```
