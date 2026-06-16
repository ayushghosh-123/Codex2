# Codex2: Application Data Flows

This document explains the step-by-step transaction sequences for critical user actions in the **Codex2** platform. These flows trace data across the frontend, gateway, downstream microservices, databases, and runner environments.

---

## 🏃 Flow 1: Safe Code Execution Workflow

When a user clicks the **"Run"** button in their browser, the system orchestrates authorization, queuing, sandboxed execution, and output streaming:

```mermaid
sequenceDiagram
    autonumber
    actor User as Client Browser
    participant Gateway as API Gateway (Port 4000)
    participant Perms as Permission Service (Port 4008)
    participant Exec as Execution Service (Port 4006)
    participant Redis as Redis Queue (BullMQ)
    participant Runner as Runner Service (Port 4007)
    participant Sandbox as gVisor Sandbox (Port --)

    User->>Gateway: POST /project/:id/run { filePaths, language }
    Note over User,Gateway: Request carries JWT inside Authorization Header
    Gateway->>Perms: RPC Check Permission (userId, projectId, Action.EXECUTE)
    Perms-->>Gateway: Response: Grant Access

    Gateway->>Exec: Forward Execution Job
    Note over Exec: Read actual file content<br/>from local memory cache
    Exec->>Redis: Push Job: { projectId, language, files } to BullMQ
    Exec-->>Gateway: HTTP 202 Accepted (Job ID: job_9982)
    Gateway-->>User: Return HTTP 202 (Job Scheduled)

    loop Runner Event Loop
        Runner->>Redis: Poll for new job
        Redis-->>Runner: Pop Job (job_9982)
    end

    Note over Runner: Prepares temporary volume directory
    Runner->>Sandbox: Spawns Docker Container (gVisor runsc)
    Runner->>Sandbox: Mount files & execute interpreter/compiler command
    
    activate Sandbox
    loop Execution Streaming
        Sandbox->>Runner: Stream stdout / stderr chunks
        Runner->>Gateway: WS Stream chunk (Job ID: job_9982)
        Gateway->>User: WS Broadcast terminal update (stdout/stderr)
    end
    Sandbox-->>Runner: Exit Process Code (e.g. 0)
    deactivate Sandbox

    Runner->>Redis: Mark Job as Completed in Redis Cache
    Runner->>Gateway: Finalize connection (Send completed event)
    Gateway->>User: Terminal closed / Success state UI
```

---

## 👥 Flow 2: Real-Time Collaborative Sync Flow

When multiple users are editing the same file, changes are synchronized conflict-free using CRDTs (**Yjs** protocol) over WebSockets:

```mermaid
sequenceDiagram
    autonumber
    actor UserA as Collaborator A
    actor UserB as Collaborator B
    participant Collab as Collab Service (Port 4004)
    participant Perms as Permission Service (Port 4008)
    participant Cache as Redis (Active Cache)
    participant Files as File Service (Port 4003)

    %% Session Join
    UserA->>Collab: WebSocket Connect (projectId, fileId)
    Collab->>Perms: RPC Check Permission (User A, projectId, WRITE)
    Perms-->>Collab: Granted

    Collab->>Cache: Fetch doc state from Redis
    alt Cache Miss
        Collab->>Files: Fetch file from S3/Disk
        Files-->>Collab: Returns raw file content
        Collab->>Cache: Save base document Y.Doc state
    end
    Collab-->>UserA: Send initial Document State (Binary Update)
    Note over UserA: Yjs merges state and updates Monaco Editor

    %% Edit Event
    UserA->>UserA: Inserts character "X" at cursor
    Note over UserA: Yjs computes binary diff delta (updateA)
    UserA->>Collab: WS Send: { type: 'sync', update: updateA }
    Collab->>Collab: Apply updateA to local memory Y.Doc
    
    Collab->>Cache: Update cache document state (de-serialized state)
    Collab->>UserB: WS Broadcast: { type: 'sync', update: updateA }
    
    Note over UserB: Yjs receives updateA, resolves conflict, updates Monaco
    UserB->>UserB: Visualizes User A's cursor movement & character "X"

    %% File Save
    Note over Collab: Debounced save timer triggers (5 seconds idle)
    Collab->>Files: Save updated file contents (flushing to disk)
    Files-->>Collab: Saved Confirmation
```

---

## 💬 Flow 3: Inline Code Comment & Mention Dispatch

When a collaborator leaves an inline comment highlighting a line of code, the system processes database records and triggers notification dispatches:
 
```mermaid
sequenceDiagram
    autonumber
    actor Author as Comment Author
    participant Gateway as API Gateway (Port 4000)
    participant Comment as Comment Service (Port 4005)
    participant DB as PostgreSQL DB
    participant Notify as Notification Service (Port 4009)
    actor MentionedUser as Mentioned Developer (@alex)

    Author->>Gateway: POST /comments { fileId, lineIndex, text: "Hey @alex look here" }
    Gateway->>Comment: Forward Comment Object
    
    Comment->>DB: Save Comment details (authorId, fileId, lineIndex, content)
    DB-->>Comment: Return Saved comment object (id: comment_12)
    
    Comment->>Comment: Regex Parse Mentions: [@alex]
    
    Comment->>Notify: RPC Queue Notification (Target: "alex", Type: MENTION, payload: comment_12)
    Comment-->>Gateway: HTTP 201 Created
    Gateway-->>Author: HTTP 201 (Update Comments UI)

    Notify->>Notify: Check Active WebSockets for User "alex"
    alt User Online
        Notify->>MentionedUser: WS Push Notification: "You were mentioned in a comment"
        Note over MentionedUser: UI displays red notification badge
    else User Offline
        Notify->>Notify: Queue Outgoing Email Dispatcher
    end
```
