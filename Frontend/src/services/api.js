/**
 * API Abstraction Layer for Truth Nuke
 * Handles mock API calls and localStorage persistence
 */

const API_BASE = "https://api.truthnuke.com/v1";

// Mock content library - banned terms, preferred terminology, approved facts
const MOCK_GUIDELINES = {
  bannedTerms: [
    { id: "bt-001", term: "blockchain", explanation: "Prohibited terminology in financial communications", severity: "error" },
    { id: "bt-002", term: "AI-powered", explanation: "Overused marketing term, must be substantiated", severity: "warning" },
    { id: "bt-003", term: "industry-leading", explanation: "Unverified claim, requires evidence", severity: "warning" },
  ],
  preferredTerminology: [
    { id: "pt-001", nonPreferred: "utilize", preferred: "use", explanation: "Prefer concise language", severity: "suggestion" },
    { id: "pt-002", nonPreferred: "implement", preferred: "deploy", explanation: "Use deploy for software releases", severity: "suggestion" },
  ],
  approvedFacts: [
    { id: "af-001", claim: "99.9% uptime SLA", source: "Service Level Agreement v2.3" },
    { id: "af-002", claim: "Enterprise-grade security", source: "Security Whitepaper 2024" },
  ],
};

const MOCK_CONTENT = {
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
  ],
};

// Content review results cache
let reviewCache = new Map();

export const contentApi = {
  // Get all guidelines
  getGuidelines: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_GUIDELINES), 500);
    });
  },

  // Get content items
  getContent: async (filters = {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let items = [...MOCK_CONTENT.items];
        
        if (filters.status) {
          items = items.filter((item) => item.status === filters.status);
        }
        
        resolve(items);
      }, 300);
    });
  },

  // Get single content item
  getContentById: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const item = MOCK_CONTENT.items.find((i) => i.id === id);
        resolve(item || null);
      }, 300);
    });
  },

  // Submit new content
  submitContent: async (contentData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newItem = {
          id: `c-${Date.now()}`,
          title: contentData.title,
          channel: contentData.channel,
          content: contentData.content,
          status: "pending",
          createdBy: user?.name || "unknown",
          createdAt: new Date().toISOString(),
        };
        MOCK_CONTENT.items.push(newItem);
        resolve(newItem);
      }, 500);
    });
  },

  // Run review on content
  runReview: async (contentId, contentText) => {
    const cacheKey = `review-${contentId}`;
    if (reviewCache.has(cacheKey)) {
      return reviewCache.get(cacheKey);
    }

    const findings = runReviewEngine(contentText);
    reviewCache.set(cacheKey, findings);
    return findings;
  },

  // Get offers/perks
  getOffers: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({
        hosting: ["Vultr", "DigitalOcean"],
        database: ["MongoDB", "Supabase"],
        ai: ["ElevenLabs", "Google Gemini"],
        domains: ["GoDaddy"],
      }), 300);
    });
  },

  // Get user's projects
  getMyProjects: async () => {
    return new Promise((resolve) => resolve([]), 300);
  },

  // Submit project to MLH event
  submitProjectToEvent: async (projectData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Project submitted to MLH event:", projectData);
        resolve({ success: true, projectId: `mlh-${Date.now()}` });
      }, 500);
    });
  },
};

// Set user reference for the API module
let user = null;

export const setUserRef = (userRef) => {
  user = userRef;
};