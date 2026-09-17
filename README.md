# Resume Builder — Project 3

A premium step-by-step build system for creating an AI-powered resume builder application. This project implements a guided workflow with gating mechanics to prevent skipping steps.

## 🎯 Project Overview

**Project Name:** AI Resume Builder — Build Track  
**Framework:** Next.js 16 (App Router) with TypeScript  
**Styling:** Tailwind CSS  
**Version:** 0.1.0

This is Project 3 in the Jackson's Build System, implementing a complete 8-step development pipeline with:
- Artifact management and storage
- Sequential step gating (no skipping)
- Premium layout system with split view (70% main / 30% build panel)
- Final proof of completion

## 📋 Routes

All routes are under `/rb/` prefix:

| Route | Step | Description |
|-------|------|-------------|
| `/rb/01-problem` | 1 | Define the Problem - User pain points & problem statement |
| `/rb/02-market` | 2 | Market Analysis - Competitive landscape & opportunities |
| `/rb/03-architecture` | 3 | System Architecture - Component design & data flow |
| `/rb/04-hld` | 4 | High Level Design - UI/UX workflows & wireframes |
| `/rb/05-lld` | 5 | Low Level Design - Detailed specifications & algorithms |
| `/rb/06-build` | 6 | Build Phase - Implementation & feature development |
| `/rb/07-test` | 7 | Testing Phase - QA & test suite execution |
| `/rb/08-ship` | 8 | Ship & Deploy - Production deployment |
| `/rb/proof` | - | Proof of Completion - Final submission dashboard |

## 🏗️ Premium Layout System

### Components

#### **TopBar**
- Left: Project Title ("AI Resume Builder")
- Center: Step Title & Progress ("Step X of 8")
- Right: Status Badge (In Progress / Complete)

#### **Main Workspace (70%)**
- Context Header with step instructions
- Main content area with scrollable workspace
- Instructions and guidance

#### **Build Panel (30%)**
- "Copy This Into Lovable" textarea
- Copy button (copies to clipboard)
- "Build in Lovable" button (opens Lovable in new tab)
- Status buttons: It Worked / Error / Screenshot
- Real-time artifact status feedback

#### **Footer**
- Previous/Next navigation buttons
- Step counter (Step X of 8)
- Navigation gating (disabled until artifact uploaded)

## 🔐 Gating System

### Rules
- **Step 1** is always accessible
- **All other steps** require the previous step to have an uploaded artifact
- **Next button** is disabled until current step artifact is uploaded
- **Previous button** allows going back at any time

### Artifact Storage
Artifacts are stored in browser localStorage with the key pattern: `rb_step_X_artifact`

Each artifact contains:
```typescript
{
  stepNumber: number;
  content: string;
  timestamp: number;
  type?: string; // 'lovable' | 'github' | 'deploy' | 'screenshot'
}
```

## 📊 Proof Page (`/rb/proof`)

The proof page displays:
- **8-Step Status** - Visual progress grid showing completed/blocked/in-progress steps
- **Project Links** - Input fields for:
  - Lovable Demo Link
  - GitHub Repository
  - Deployed Application URL
- **Final Submission** - Copy submission button (enabled only when all 8 steps complete)

## 🧩 File Structure

```
app/
├── page.tsx                          # Root redirect to /rb/01-problem
├── layout.tsx                        # Root layout with metadata
├── rb/
│   ├── 01-problem/page.tsx          # Step 1: Problem Definition
│   ├── 02-market/page.tsx           # Step 2: Market Analysis
│   ├── 03-architecture/page.tsx     # Step 3: System Architecture
│   ├── 04-hld/page.tsx              # Step 4: High Level Design
│   ├── 05-lld/page.tsx              # Step 5: Low Level Design
│   ├── 06-build/page.tsx            # Step 6: Build Phase
│   ├── 07-test/page.tsx             # Step 7: Testing Phase
│   ├── 08-ship/page.tsx             # Step 8: Ship & Deploy
│   └── proof/page.tsx               # Final submission proof

components/
├── TopBar.tsx                        # Top navigation with step info
├── BuildPanel.tsx                    # Right panel with build tools
├── PremiumLayout.tsx                 # Main layout wrapper
└── StepLayout.tsx                    # Client wrapper with gating logic

lib/
├── artifacts.ts                      # Artifact storage utilities
└── gating.ts                         # Step progression gating logic
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## 📱 Usage Flow

1. **Start** - App redirects to `/rb/01-problem`
2. **Complete Step** - Add content in Build Panel
3. **Upload Artifact** - Click "It Worked" to save artifact
4. **Proceed** - Next button enabled, proceed to next step
5. **Repeat** - Continue through all 8 steps
6. **Proof** - Add project links and submit final proof

## 🛠️ Development

### Key Technologies
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **React Hooks** - State management

### Component Props

#### StepLayout
```typescript
<StepLayout stepNumber={1}>
  {/* Page content */}
</StepLayout>
```

#### PremiumLayout
```typescript
<PremiumLayout
  projectTitle="AI Resume Builder"
  stepNumber={1}
  stepName="Problem"
  statusBadge="In Progress"
  statusColor="blue"
  buildPanelProps={{
    defaultContent: "",
    onArtifactUpload: async (type, value) => {}
  }}
>
  {/* Content */}
</PremiumLayout>
```

## 📝 Features

✅ **Sequential Step Gating** - No stepping allowed  
✅ **Artifact Management** - Auto-save to localStorage  
✅ **Premium Layout** - Professional 70/30 split view  
✅ **Copy to Lovable** - Direct clipboard integration  
✅ **Progress Tracking** - Visual step status display  
✅ **Final Submission** - Proof of completion links  
✅ **Responsive Design** - Works on all modern browsers

## 🎨 Styling

The project uses **Tailwind CSS** for all styling. Global styles are configured in `globals.css`.

Color Scheme:
- **Primary** - Blue (#3b82f6)
- **Success** - Green (#22c55e)
- **Warning** - Yellow (#eab308)
- **Error** - Red (#ef4444)

## 📖 Notes

- **No Resume Features Yet** - This is the route rail and gating system only
- **Features to Implement Later** - Actual resume builder functionality
- **Lovable Integration** - Links open Lovable.dev for building the demo
- **GitHub Required** - Users should push code to GitHub
- **Deployment Required** - Final step requires production deployment

## 🔄 Navigation Flow

```
Start (/rb/01-problem)
  ↓
[Complete Step 1 & Upload] → Unlock Step 2
  ↓
[Complete Step 2 & Upload] → Unlock Step 3
  ↓
[Complete Step 3 & Upload] → Unlock Step 4
  ↓
[Complete Step 4 & Upload] → Unlock Step 5
  ↓
[Complete Step 5 & Upload] → Unlock Step 6
  ↓
[Complete Step 6 & Upload] → Unlock Step 7
  ↓
[Complete Step 7 & Upload] → Unlock Step 8
  ↓
[Complete Step 8 & Upload] → Unlock Proof
  ↓
Proof Page (/rb/proof)
  ↓
Final Submission
```

## 📄 License

This project is part of the Jackson's Build System.

---

**Created:** February 18, 2026  
**Framework Version:** Next.js 16.1.6  
**Node Version:** 18.x or higher recommended
