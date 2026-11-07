/**
 * Content Review Engine - Client-side rule-based content analysis
 * Deterministic, reusable, no real LLM connection
 * 
 * Supported Checks:
 * A. Banned Terms - detect prohibited terminology
 * B. Preferred Terminology - detect non-preferred terms and suggest replacements
 * C. Unsupported Claims - flag absolute claims (guaranteed, 100%, best in world, etc.)
 * D. Tone Detection - excessive exclamation marks, ALL CAPS, aggressive marketing, unprofessional expressions
 * E. Accessibility - images without alt text, vague links like "click here", non-descriptive link text
 */

const SUPPORTED_CHECKS = {
  bannedTerms: "A",
  preferredTerminology: "B",
  unsupportedClaims: "C",
  toneDetection: "D",
  accessibility: "E",
};

/**
 * Main review function - runs all checks on the given content
 * @param {string} content - The text content to analyze
 * @param {Object} guidelines - The guideline library
 * @returns {Promise<Array>} Array of finding objects
 */
export const runReviewEngine = async (content, guidelines = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const findings = [];
      const text = content || "";
      
      // Get guidelines data
      const bannedTerms = guidelines.bannedTerms || [];
      const preferredTerminology = guidelines.preferredTerminology || [];
      const approvedFacts = guidelines.approvedFacts || [];
      
      // Check A: Banned Terms
      const bannedFindings = checkBannedTerms(text, bannedTerms);
      findings.push(...bannedFindings);
      
      // Check B: Preferred Terminology
      const preferredFindings = checkPreferredTerminology(text, preferredTerminology);
      findings.push(...preferredFindings);
      
      // Check C: Unsupported Claims
      const claimFindings = checkUnsupportedClaims(text, approvedFacts);
      findings.push(...claimFindings);
      
      // Check D: Tone Detection
      const toneFindings = checkToneDetection(text);
      findings.push(...toneFindings);
      
      // Check E: Accessibility
      const accessibilityFindings = checkAccessibility(text);
      findings.push(...accessibilityFindings);
      
      // Sort findings by severity (error > warning > suggestion > information)
      const severityOrder = { error: 0, warning: 1, suggestion: 2, information: 3 };
      findings.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);
      
      resolve(findings);
    }, 1500); // Simulate 1-2 seconds latency
  });
};

/**
 * Check A: Banned Terms - detect prohibited terminology
 * @param {string} text - The content text
 * @param {Array} bannedTerms - Array of banned term objects
 * @returns {Array} Array of finding objects
 */
const checkBannedTerms = (text, bannedTerms) => {
  const findings = [];
  
  if (!text || !bannedTerms.length) return findings;
  
  bannedTerms.forEach((bannedTerm) => {
    const regex = new RegExp(bannedTerm.term, "gi");
    const matches = text.match(regex);
    
    if (matches) {
      matches.forEach((match, index) => {
        const start = text.indexOf(match);
        const end = start + match.length;
        const snippet = text.slice(Math.max(0, start - 20), end + 20);
        
        findings.push({
          id: `bt-${bannedTerm.id}-${index}`,
          type: "bannedTerm",
          severity: bannedTerm.severity || "error",
          start,
          end,
          snippet,
          explanation: bannedTerm.explanation || `The term "${bannedTerm.term}" is prohibited.`,
          ruleId: `check-banned-${bannedTerm.id}`,
          suggestedFix: replaceTerm(text, match, bannedTerm.suggestion || ""),
        });
      });
    }
  });
  
  return findings;
};

/**
 * Check B: Preferred Terminology - detect non-preferred terms and suggest replacements
 * @param {string} text - The content text
 * @param {Array} preferredTerminology - Array of preferred term objects
 * @returns {Array} Array of finding objects
 */
const checkPreferredTerminology = (text, preferredTerminology) => {
  const findings = [];
  
  if (!text || !preferredTerminology.length) return findings;
  
  preferredTerminology.forEach((prefTerm) => {
    const regex = new RegExp(prefTerm.nonPreferred, "gi");
    const matches = text.match(regex);
    
    if (matches) {
      matches.forEach((match, index) => {
        const start = text.indexOf(match);
        const end = start + match.length;
        
        findings.push({
          id: `pt-${prefTerm.id}-${index}`,
          type: "preferredTerminology",
          severity: prefTerm.severity || "suggestion",
          start,
          end,
          snippet: text.slice(Math.max(0, start - 20), end + 20),
          explanation: prefTerm.explanation || `Consider using "${prefTerm.preferred}" instead of "${prefTerm.nonPreferred}".`,
          ruleId: `check-preferred-${prefTerm.id}`,
          suggestedFix: `${prefTerm.preferred}`,
        });
      });
    }
  });
  
  return findings;
};

/**
 * Check C: Unsupported Claims - flag absolute claims
 * @param {string} text - The content text
 * @param {Array} approvedFacts - Array of approved fact objects
 * @returns {Array} Array of finding objects
 */
const checkUnsupportedClaims = (text, approvedFacts) => {
  const findings = [];
  
  if (!text) return findings;
  
  // Patterns of absolute/unsupported claims
  const claimPatterns = [
    { pattern: /\bguaranteed\b/gi, severity: "error", description: "Guaranteed claims require substantiation" },
    { pattern: /\b100%\b/, severity: "error", description: "Absolute percentage claims" },
    { pattern: /\bbest in the world\b/gi, severity: "warning", description: "Superlative claims without evidence" },
    { pattern: /\brisk-free\b/gi, severity: "warning", description: "Risk-free marketing language" },
    { pattern: /\bnumber one\b/gi, severity: "warning", description: "Ranking claims without evidence" },
    { pattern: /\bworld-class\b/gi, severity: "warning", description: "Unsubstantiated quality claims" },
  ];
  
  claimPatterns.forEach((patternInfo) => {
    const matches = text.match(patternInfo.pattern);
    if (matches) {
      matches.forEach((match, index) => {
        const start = text.indexOf(match);
        const end = start + match.length;
        const snippet = text.slice(Math.max(0, start - 30), end + 30);
        
        // Check if this claim matches an approved fact
        let verificationStatus = "cannot verify";
        const lowerText = text.toLowerCase();
        const lowerClaim = match.toLowerCase();
        
        approvedFacts.forEach((fact) => {
          if (lowerText.includes(lowerClaim) || lowerClaim.includes(fact.claim.toLowerCase())) {
            verificationStatus = `partially verified against: ${fact.claim}`;
          }
        });
        
        findings.push({
          id: `claim-${patternInfo.pattern}-${index}`,
          type: "unsupportedClaim",
          severity: patternInfo.severity,
          start,
          end,
          snippet,
          explanation: `${patternInfo.description}. ${verificationStatus}.`,
          ruleId: `check-claim-${patternInfo.pattern}`,
          suggestedFix: rephraseClaim(match, verificationStatus),
        });
      });
    }
  });
  
  return findings;
};

/**
 * Check D: Tone Detection - excessive exclamation, ALL CAPS, aggressive language
 * @param {string} text - The content text
 * @returns {Array} Array of finding objects
 */
const checkToneDetection = (text) => {
  const findings = [];
  
  if (!text) return findings;
  
  // Check for excessive exclamation marks (3 or more)
  const exclamationCount = (text.match(/!/g) || []).length;
  if (exclamationCount >= 3) {
    findings.push({
      id: "tone-001",
      type: "tone",
      severity: "warning",
      start: 0,
      end: text.length,
      snippet: text.slice(0, 100),
      explanation: `Excessive exclamation marks (${exclamationCount}) detected. Use sparingly for emphasis.`,
      ruleId: "check-tone-exclamations",
      suggestedFix: text.replace(/!/g, "").replace(/ +/g, " "),
    });
  }
  
  // Check for ALL CAPS phrases (3+ capital letters in a row)
  const allCapsMatches = text.match(/\b[A-Z]{4,}\b/g);
  if (allCapsMatches) {
    allCapsMatches.forEach((match) => {
      const start = text.indexOf(match);
      const end = start + match.length;
      findings.push({
        id: `tone-002-${start}`,
        type: "tone",
        severity: "warning",
        start,
        end,
        snippet: text.slice(Math.max(0, start - 15), end + 15),
        explanation: `ALL CAPS phrase detected: "${match}". Use title case or sentence case instead.`,
        ruleId: "check-tone-all-caps",
        suggestedFix: match.replace(match, match.replace(match, match.toLowerCase())),
      });
    });
  }
  
  // Check for aggressive marketing language
  const aggressivePatterns = [
    { pattern: /\b(revolutionary|game-changing|paradigm shift)\b/gi, severity: "information" },
    { pattern: /\b(leverage|synergy)\b/gi, severity: "information" },
  ];
  
  aggressivePatterns.forEach((patternInfo) => {
    const matches = text.match(patternInfo.pattern);
    if (matches) {
      matches.forEach((match, index) => {
        const start = text.indexOf(match);
        const end = start + match.length;
        findings.push({
          id: `tone-003-${start}-${index}`,
          type: "tone",
          severity: patternInfo.severity,
          start,
          end,
          snippet: text.slice(Math.max(0, start - 15), end + 15),
          explanation: `Aggressive marketing language detected: "${match}".`,
          ruleId: `check-tone-aggressive-${index}`,
          suggestedFix: neutralizePhrase(match),
        });
      });
    }
  });
  
  return findings;
};

/**
 * Check E: Accessibility - detect accessibility issues
 * @param {string} text - The content text
 * @returns {Array} Array of finding objects
 */
const checkAccessibility = (text) => {
  const findings = [];
  
  if (!text) return findings;
  
  // Check for "click here" or similar vague links
  const vagueLinkMatches = text.match(/\bclick here\b/i);
  if (vagueLinkMatches) {
    vagueLinkMatches.forEach((match) => {
      const start = text.indexOf(match);
      const end = start + match.length;
      findings.push({
        id: "access-001",
        type: "accessibility",
        severity: "information",
        start,
        end,
        snippet: text.slice(Math.max(0, start - 10), end + 10),
        explanation: 'Vague link text "click here" is not accessible. Use descriptive link text.',
        ruleId: "check-access-vague-links",
        suggestedFix: "Learn more" /*, "view documentation"*/,
      });
    });
  }
  
  // Check for markdown images without alt text
  // Pattern: ![alt text](url) - if alt text is empty or missing
  const imgWithoutAlt = text.match(/!\[([^\]]*)\]\([^)]+\)/g) || [];
  // Filter for images with empty alt text
  imgWithoutAlt.forEach((imgMatch) => {
    const altMatch = imgMatch.match(/^!\[(.*?)\]\([^)]+\)$/);
    if (altMatch && (!altMatch[1] || altMatch[1].trim().length === 0)) {
      const start = text.indexOf(imgMatch);
      const end = start + imgMatch.length;
      findings.push({
        id: "access-002",
        type: "accessibility",
        severity: "information",
        start,
        end,
        snippet: text.slice(Math.max(0, start - 10), end + 10),
        explanation: "Image missing alt text. Add descriptive alt text for screen readers.",
        ruleId: "check-access-img-alt",
        suggestedFix: 'Add alt text: "Descriptive alt text here"',
      });
    }
  });
  
  return findings;
};

/**
 * Helper: Replace a term in text with a suggestion
 * @param {string} text - Original text
 * @param {string} match - The matched term
 * @param {string} suggestion - The replacement suggestion
 * @returns {string} Modified text with suggestion applied at the match position
 */
const replaceTerm = (text, match, suggestion) => {
  if (!suggestion) return "";
  const regex = new RegExp(escapeRegex(match), "gi");
  return text.replace(regex, suggestion);
};

/**
 * Helper: Escape regex special characters
 */
const escapeRegex = (str) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

/**
 * Helper: Rephrase an unsupported claim
 * @param {string} claim - The original claim
 * @param {string} verificationStatus - The verification status
 * @returns {string} Rephrased claim
 */
const rephraseClaim = (claim, verificationStatus) => {
  if (verificationStatus.includes("verified")) {
    return `Up to ${claim.replace(/[^\w]/g, " ")} with proper documentation`;
  }
  return claim.replace(/\b(guaranteed|100%|best in the world|risk-free|number one)\b/gi, "highly");
};

/**
 * Helper: Neutralize aggressive phrases
 */
const neutralizePhrase = (phrase) => {
  const neutralMap = {
    revolutionary: "significant",
    "game-changing": "notable",
    paradigm_shift: "meaningful change",
    leverage: "use",
    synergy: "combination",
  };
  return neutralMap[phrase.toLowerCase()] || phrase;
};
export default { runReviewEngine, SUPPORTED_CHECKS };