/**
 * Seed data for Truth Nuke application
 * Contains mock guidelines, sample content, and user roles
 */

// User roles
export const USER_ROLES = {
  CREATOR: "creator",
  MANAGER: "manager",
  REVIEWER: "reviewer",
};

// Mock user profiles
export const MOCK_USERS = {
  [USER_ROLES.CREATOR]: {
    id: "user-1",
    name: "Alex Chen",
    email: "alice@company.com",
    role: USER_ROLES.CREATOR,
    avatar: "user",
  },
  [USER_ROLES.MANAGER]: {
    id: "user-2",
    name: "Sarah Johnson",
    email: "sarah@company.com",
    role: USER_ROLES.MANAGER,
    avatar: "user",
  },
  [USER_ROLES.REVIEWER]: {
    id: "user-3",
    name: "Michael Zhang",
    email: "michael@company.com",
    role: USER_ROLES.REVIEWER,
    avatar: "user",
  },
};

// Sample brand guidelines
export const MOCK_GUIDELINES = {
  id: "guidelines-001",
  title: "Company Brand Guidelines",
  version: "2.3",
  created: "2024-01-01",
  sections: {
    bannedTerms: [
      { id: "bt-001", term: "blockchain", explanation: "Prohibited in financial communications", severity: "error" },
      { id: "bt-002", term: "AI-powered", explanation: "Overused marketing term, must be substantiated", severity: "warning" },
      { id: "bt-003", term: "industry-leading", explanation: "Unverified claim, requires evidence", severity: "warning" },
      { id: "bt-004", term: "risk-free", explanation: "Cannot guarantee zero risk", severity: "error" },
    ],
    preferredTerminology: [
      { id: "pt-001", nonPreferred: "utilize", preferred: "use", explanation: "Prefer concise language", severity: "suggestion" },
      { id: "pt-002", nonPreferred: "implement", preferred: "deploy", explanation: "Use deploy for software releases", severity: "suggestion" },
      { id: "pt-003", nonPreferred: " synergies ", preferred: "combinations", explanation: "Avoid corporate jargon", severity: "suggestion" },
    ],
    approvedFacts: [
      { id: "af-001", claim: "99.9% uptime SLA", source: "Service Level Agreement v2.3" },
      { id: "af-002", claim: "Enterprise-grade security", source: "Security Whitepaper 2024" },
      { id: "af-003", claim: "24/7 customer support", source: "Support Policy Document" },
    ],
  },
};

// Sample content items
export const MOCK_CONTENT = {
  items: [
    {
      id: "c-001",
      title: "Q4 Marketing Blog Post",
      channel: "Blog",
      content: "Our AI-powered blockchain platform delivers 100% uptime and is industry-leading. Utilize our solution for best results!",
      status: "pending",
      createdBy: "alice@company.com",
      createdAt: "2024-01-15T10:30:00Z",
    },
    {
      id: "c-002",
      title: "Team Announcement",
      channel: "Internal",
      content: "We're deploying the new CRM system next Monday. Please attend the training session.",
      status: "approved",
      createdBy: "bob@company.com",
      createdAt: "2024-01-10T14:00:00Z",
    },
    {
      id: "c-003",
      title: "Product Launch Email",
      channel: "Email",
      content: "Introducing our revolutionary new AI platform! It's 100% risk-free and guaranteed to transform your business. Click here for more info!",
      status: "pending",
      createdBy: "alice@company.com",
      createdAt: "2024-01-12T09:15:00Z",
    },
  ],
};

// Sample revision history
export const MOCK_REVISION_HISTORY = [
  {
    id: "rh-001",
    contentId: "c-001",
    user: "alice@company.com",
    role: "creator",
    action: "content created",
    timestamp: "2024-01-15T10:30:00Z",
    description: "Initial content submitted for review",
  },
  {
    id: "rh-002",
    contentId: "c-001",
    user: "michael@company.com",
    role: "reviewer",
    action: "review completed",
    timestamp: "2024-01-15T11:00:00Z",
    description: "Review completed with 4 findings",
  },
  {
    id: "rh-003",
    contentId: "c-001",
    user: "alice@company.com",
    role: "creator",
    action: "fix accepted",
    timestamp: "2024-01-15T11:30:00Z",
    description: "Accepted suggested fix for banned term 'blockchain'",
  },
];

// Sample source guidelines
export const MOCK_SOURCE_GUIDELINES = [
  {
    id: "sg-001",
    title: "Banned Terms Policy",
    content: "The following terms are prohibited in all company communications: blockchain, AI-powered (without substantiation), industry-leading (without evidence), risk-free.",
    category: "bannedTerms",
    lastUpdated: "2024-06-01",
  },
  {
    id: "sg-002",
    title: "Preferred Terminology Guide",
    content: "Replace 'utilize' with 'use', 'implement' with 'deploy', and avoid corporate jargon like 'synergies'.",
    category: "preferredTerminology",
    lastUpdated: "2024-06-01",
  },
  {
    id: "sg-003",
    title: "Claim Verification Guidelines",
    content: "Absolute claims (guaranteed, 100%, best in world) require substantiation. Claims are partially verified against approved facts in the knowledge base.",
    category: "unsupportedClaims",
    lastUpdated: "2024-06-01",
  },
  {
    id: "sg-004",
    title: "Tone of Voice Standards",
    content: "Avoid excessive exclamation marks (>3), ALL CAPS phrases, and aggressive marketing language. Use professional, concise language.",
    category: "toneDetection",
    lastUpdated: "2024-06-01",
  },
  {
    id: "sg-005",
    title: "Accessibility Standards",
    content: "All images must have descriptive alt text. Vague link text like 'click here' is not accessible. Use descriptive link text that indicates the destination.",
    category: "accessibility",
    lastUpdated: "2024-06-01",
  },
];

// Sample toast messages
export const MOCK_TOASTS = {
  success: "Changes applied successfully",
  error: "Something went wrong",
  info: "Information",
};

// Sample channel types
export const CHANNEL_TYPES = {
  BLOG: "Blog",
  INTERNAL: "Internal",
  EMAIL: "Email",
  SOCIAL: "Social",
  DOCS: "Documentation",
};

// Sample severity colors mapped to Tailwind classes
export const SEVERITY_COLORS = {
  error: "error",
  warning: "warning",
  suggestion: "suggestion",
  information: "information",
};