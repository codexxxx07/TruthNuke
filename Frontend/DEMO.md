# Truth Nuke Demo Guide

This guide covers the key workflows and demonstrations for Truth Nuke.

## Quick Start

1. **Install**: `npm install`
2. **Development**: `npm run dev`
3. **Open**: Visit `http://localhost:5173`

## Role-Based Workflows

### 1. Creator Workflow

**Step 1: Login**
- Select role: Creator
- Enter name or use default: "Alex Chen"
- Click "Login"

**Step 2: Create Content**
- Navigate to "New Content"
- Fill in title, select channel, paste content
- Click "Submit for Review"
- Content goes to pending status

**Step 3: Run Review**
- Go to "Content Reviews"
- Select your content item
- Click "Run Review"
- Wait 1-2 seconds for analysis
- View findings in the right panel

**Step 4: Accept/Reject Fixes**
- Review each finding
- Click "Accept" to apply suggested correction
- Click "Reject" to preserve original text
- Use "Accept All" or "Reject All" for batch actions
- Submit for approval when ready

### 2. Reviewer Workflow

**Step 1: Login**
- Select role: Reviewer
- Enter name or use default: "Michael Zhang"
- Click "Login"

**Step 2: View Pending Content**
- Navigate to "Content Reviews"
- Select content items to review
- Run review engine on each

**Step 3: Add Comments & Request Changes**
- Add mandatory comments when requesting changes
- Select "Changes Requested" status
- Add detailed comments explaining required fixes
- Content returns to creator with feedback

**Step 4: Approve/Reject**
- Review completed content
- Click "Approve" to finalize
- Add optional reviewer comment
- Track in revision history

### 3. Manager Workflow

**Step 1: Login**
- Select role: Manager
- Enter name or use default: "Sarah Johnson"
- Click "Login"

**Step 2: Monitor Dashboard**
- View organization-wide statistics
- See total content, under review, approved counts
- Track team activity and recurring mistakes

**Step 3: View All Content**
- Navigate content through approval workflow
- Access any content item for review
- Monitor review statistics

**Step 4: Manage Guidelines**
- Update brand guidelines as needed
- Add new banned terms or preferred terminology
- Ensure team compliance

## Key Demonstrations

### Content Review Demo

1. Submit the "Product Launch Email" content (c-003):
   ```
   "Introducing our revolutionary new AI platform! It's 100% risk-free and guaranteed to transform your business. Click here for more info!"
   ```

2. Expected findings:
   - **Banned term**: "AI-powered" / "risk-free" / "guaranteed" / "100%" 
   - **Preferred terminology**: "utilize" → "use"
   - **Tone**: Excessive exclamation marks (3+), ALL CAPS phrases
   - **Accessibility**: "click here" vague link text

3. Each finding includes:
   - Issue type and severity badge
   - AI-assisted finding indicator
   - Highlighted snippet in content
   - Explanation of the issue
   - Source guideline reference (clickable)
   - Suggested correction
   - Accept/Reject buttons

### Approval Workflow Demo

1. Select content in "Approvals" page
2. Observe status stepper: Draft → In Review → Changes Requested → Approved
3. Reviewer adds comment: "Please remove 'guaranteed' claim and replace 'AI-powered' with substantiated benefits"
4. Creator accepts fixes and resubmits
5. Manager approves content for publication
6. All actions tracked in revision history

## Design Features

### Frutiger Aero Visual Identity

- **Color palette**: Sky Blue, Aqua, Ocean Blue, Soft Teal, Cloud White, Natural Green
- **Severity colors**: Error (accessible red), Warning (accessible amber), Suggestion (accessible green), Information (accessible blue)
- **Glassmorphism**: Semi-transparent surfaces with backdrop-filter blur
- **Background**: Sky-blue to aqua gradient with floating CSS bubbles
- **Buttons**: Glossy with top-highlight gradients, inner shadows, pressed states
- **Focus indicators**: Visible focus states on all interactive elements

### Accessibility

- Color contrast meets WCAG AA standards
- Focus indicators on all interactive elements
- Screen-readable structure
- Descriptive link text (no "click here")
- Images require alt text (flagged in review)
- Keyboard-navigable entire application

## Build & Deployment

```bash
# Development
npm run dev          # Vite + Tailwind watch
npm run dev:css      # Tailwind watch only

# Production  
npm run build        # Full production build
npm run build:css    # Generate production CSS
npm run preview      # Preview production build
```

## Troubleshooting

- **Tailwind not building**: Ensure `src/styles/input.css` exists and imports `@tailwind base; @tailwind components; @tailwind utilities;`
- **Vite dev server issues**: Delete `node_modules/.vite` and restart
- **Role guards not working**: Ensure user is logged in via Login page first
- **Findings not appearing**: Ensure content has triggering terms (banned words, absolute claims, etc.)

## Known Limitations

- No real backend or authentication
- Mock data only (seed data in `src/data/seedData.js`)
- Review engine is client-side rule-based (no LLM)
- localStorage persistence across refreshes only
- No actual content storage or user accounts