/**
 * MCP Server - Corruption Sensor
 * Allows Kiro AI to "sense" the corruption level of the haunted codebase
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
// @ts-ignore - Node built-ins
import fs from 'fs';
// @ts-ignore - Node built-ins  
import path from 'path';
import process from 'process';

interface Vulnerability {
  type: string;
  file: string;
  description: string;
  severity: string;
}

interface CorruptionState {
  corruptionLevel: number;
  vulnerabilities: Vulnerability[];
  timestamp: number;
  lastScan: string;
}

// Create MCP server
const server = new McpServer({
  name: "CorruptionSensor",
  version: "1.0.0"
});

// Tool: Get OWASP Top 10 Vulnerabilities
server.tool(
  "get_owasp_top_10",
  "Fetches the current OWASP Top 10 web application security risks. Use this to educate users about common vulnerabilities.",
  {},
  async () => {
    try {
      // OWASP Top 10 2021 (latest stable version)
      const owaspTop10 = [
        {
          rank: "A01:2021",
          name: "Broken Access Control",
          description: "Restrictions on what authenticated users are allowed to do are often not properly enforced.",
          examples: ["Bypassing access control checks", "Elevation of privilege", "Metadata manipulation"]
        },
        {
          rank: "A02:2021",
          name: "Cryptographic Failures",
          description: "Failures related to cryptography which often lead to exposure of sensitive data.",
          examples: ["Transmitting data in clear text", "Using weak crypto algorithms", "Hardcoded secrets"]
        },
        {
          rank: "A03:2021",
          name: "Injection",
          description: "User-supplied data is not validated, filtered, or sanitized by the application.",
          examples: ["SQL injection", "XSS", "Command injection", "eval() usage"]
        },
        {
          rank: "A04:2021",
          name: "Insecure Design",
          description: "Missing or ineffective control design.",
          examples: ["Lack of security requirements", "Insecure design patterns"]
        },
        {
          rank: "A05:2021",
          name: "Security Misconfiguration",
          description: "Missing appropriate security hardening or improperly configured permissions.",
          examples: ["Default credentials", "Verbose error messages", "Unnecessary features enabled"]
        },
        {
          rank: "A06:2021",
          name: "Vulnerable and Outdated Components",
          description: "Using components with known vulnerabilities.",
          examples: ["Outdated libraries", "Unsupported software", "Unpatched systems"]
        },
        {
          rank: "A07:2021",
          name: "Identification and Authentication Failures",
          description: "Confirmation of user identity, authentication, and session management is critical.",
          examples: ["Credential stuffing", "Weak passwords", "Session fixation"]
        },
        {
          rank: "A08:2021",
          name: "Software and Data Integrity Failures",
          description: "Code and infrastructure that does not protect against integrity violations.",
          examples: ["Insecure CI/CD", "Auto-update without verification", "Insecure deserialization"]
        },
        {
          rank: "A09:2021",
          name: "Security Logging and Monitoring Failures",
          description: "Without logging and monitoring, breaches cannot be detected.",
          examples: ["Missing audit logs", "Inadequate monitoring", "No alerting"]
        },
        {
          rank: "A10:2021",
          name: "Server-Side Request Forgery (SSRF)",
          description: "SSRF flaws occur when a web application fetches a remote resource without validating the user-supplied URL.",
          examples: ["Accessing internal services", "Port scanning", "Data exfiltration"]
        }
      ];

      const response = `🛡️ OWASP TOP 10 - 2021

The OWASP Top 10 is a standard awareness document for developers and web application security. It represents a broad consensus about the most critical security risks to web applications.

${owaspTop10.map(vuln => `
${vuln.rank} - ${vuln.name}
${vuln.description}
Examples: ${vuln.examples.join(', ')}
`).join('\n')}

🔗 Source: https://owasp.org/Top10/
📚 This game focuses on A02 (Hardcoded Secrets) and A03 (Injection/XSS)`;

      return {
        content: [{
          type: "text" as const,
          text: response
        }]
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return {
        content: [{
          type: "text" as const,
          text: `⚠️ Unable to fetch OWASP Top 10.\nError: ${errorMessage}`
        }]
      };
    }
  }
);

// Tool: Get Vulnerability Details
server.tool(
  "get_vulnerability_details",
  "Get detailed information about a specific OWASP vulnerability type. Useful for learning about security issues.",
  {
    vulnerability_type: z.string().describe("The type of vulnerability (e.g., 'injection', 'xss', 'hardcoded-secret', 'broken-access-control')")
  },
  async (args: { vulnerability_type: string }) => {
    const vulnType = args.vulnerability_type.toLowerCase();
    
    const vulnerabilityDatabase: Record<string, any> = {
      'injection': {
        name: 'Injection Attacks',
        owasp: 'A03:2021',
        description: 'Injection flaws occur when untrusted data is sent to an interpreter as part of a command or query.',
        impact: 'Data loss, corruption, disclosure, denial of access, or complete host takeover.',
        examples: ['SQL Injection', 'XSS', 'Command Injection', 'LDAP Injection'],
        prevention: [
          'Use parameterized queries',
          'Validate and sanitize all input',
          'Use safe APIs that avoid interpreters',
          'Escape special characters'
        ],
        inThisGame: 'The InjectionComponent uses dangerouslySetInnerHTML which allows XSS attacks.'
      },
      'xss': {
        name: 'Cross-Site Scripting (XSS)',
        owasp: 'A03:2021 - Injection',
        description: 'XSS allows attackers to inject malicious scripts into web pages viewed by other users.',
        impact: 'Session hijacking, defacement, redirect to malicious sites, malware distribution.',
        types: ['Reflected XSS', 'Stored XSS', 'DOM-based XSS'],
        prevention: [
          'Never use dangerouslySetInnerHTML with user input',
          'Use React\'s built-in XSS protection',
          'Sanitize HTML with libraries like DOMPurify',
          'Use Content Security Policy (CSP)'
        ],
        inThisGame: 'UnsafeComponent uses eval() which can execute arbitrary code. InjectionComponent renders raw HTML.'
      },
      'hardcoded-secret': {
        name: 'Hardcoded Secrets',
        owasp: 'A02:2021 - Cryptographic Failures',
        description: 'Storing sensitive data like API keys, passwords, or tokens directly in source code.',
        impact: 'Credential theft, unauthorized access, data breaches, financial loss.',
        examples: ['API keys in code', 'Database passwords', 'Private keys', 'OAuth tokens'],
        prevention: [
          'Use environment variables',
          'Use secret management services (AWS Secrets Manager, HashiCorp Vault)',
          'Never commit secrets to version control',
          'Use .gitignore for sensitive files',
          'Rotate secrets regularly'
        ],
        inThisGame: 'LeakyComponent has a hardcoded API key that should be in environment variables.'
      },
      'broken-access-control': {
        name: 'Broken Access Control',
        owasp: 'A01:2021',
        description: 'Restrictions on what authenticated users can do are not properly enforced.',
        impact: 'Unauthorized access to data, privilege escalation, account takeover.',
        examples: ['Bypassing access checks', 'Viewing others\' data', 'Modifying access rights'],
        prevention: [
          'Deny by default',
          'Implement access control checks',
          'Enforce record ownership',
          'Disable directory listing',
          'Log access control failures'
        ]
      }
    };

    const vuln = vulnerabilityDatabase[vulnType];
    
    if (!vuln) {
      return {
        content: [{
          type: "text" as const,
          text: `❌ Vulnerability type '${vulnType}' not found in database.\n\nAvailable types: ${Object.keys(vulnerabilityDatabase).join(', ')}\n\nTry: get_owasp_top_10 for a complete list.`
        }]
      };
    }

    const response = `🔍 ${vuln.name}

OWASP Classification: ${vuln.owasp}

📖 Description:
${vuln.description}

${vuln.impact ? `⚠️ Impact:\n${vuln.impact}\n` : ''}

${vuln.examples ? `📋 Examples:\n${vuln.examples.map((ex: string) => `  • ${ex}`).join('\n')}\n` : ''}

${vuln.types ? `🎯 Types:\n${vuln.types.map((t: string) => `  • ${t}`).join('\n')}\n` : ''}

✅ Prevention:
${vuln.prevention.map((p: string) => `  • ${p}`).join('\n')}

${vuln.inThisGame ? `\n🎮 In This Game:\n${vuln.inThisGame}` : ''}`;

    return {
      content: [{
        type: "text" as const,
        text: response
      }]
    };
  }
);

// Tool: Get Current Corruption Level
server.tool(
  "get_corruption_level",
  "Reads the current corruption level and active vulnerabilities from the haunted codebase. Use this to sense the spiritual health of the code.",
  {},
  async () => {
    try {
      const statePath = path.join(process.cwd(), 'public', 'corruption-state.json');
      
      if (!fs.existsSync(statePath)) {
        return {
          content: [{
            type: "text" as const,
            text: "🔮 The Ritual has not yet been performed. The corruption state is unknown. Save a file in src/components/vulnerable/ to trigger The Ritual."
          }]
        };
      }

      const stateContent = fs.readFileSync(statePath, 'utf-8');
      const state: CorruptionState = JSON.parse(stateContent);

      // Generate atmospheric response based on corruption level
      let atmosphere: string;
      let emoji: string;
      
      if (state.corruptionLevel >= 71) {
        atmosphere = "CRITICAL - The codebase is DAMNED! Dark forces have taken hold.";
        emoji = "💀";
      } else if (state.corruptionLevel >= 21) {
        atmosphere = "WARNING - The codebase is POSSESSED. Malevolent patterns detected.";
        emoji = "👻";
      } else if (state.corruptionLevel > 0) {
        atmosphere = "HEALING - The codebase is being SANCTIFIED. Light is returning.";
        emoji = "✨";
      } else {
        atmosphere = "PURE - The codebase is SANCTIFIED! All demons have been exorcised.";
        emoji = "😇";
      }

      // Build vulnerability details
      const vulnDetails = state.vulnerabilities.length > 0
        ? state.vulnerabilities.map(v => 
            `  - ${v.type.toUpperCase()} in ${v.file}: ${v.description}`
          ).join('\n')
        : "  None detected - the code is pure!";

      const response = `${emoji} CORRUPTION SENSOR READING ${emoji}

Status: ${atmosphere}
Corruption Level: ${state.corruptionLevel}%
Active Vulnerabilities: ${state.vulnerabilities.length}

Detected Issues:
${vulnDetails}

Last Scan: ${state.lastScan}

${state.corruptionLevel > 0 
  ? "🔧 To perform the exorcism, fix the vulnerable components using secure coding practices."
  : "🎉 The Digital Exorcism is complete! The codebase has been purified."}`;

      return {
        content: [{
          type: "text" as const,
          text: response
        }]
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return {
        content: [{
          type: "text" as const,
          text: `⚠️ Unable to sense corruption. The spiritual connection is disrupted.\nError: ${errorMessage}`
        }]
      };
    }
  }
);

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('CorruptionSensor MCP Server running...');
}

main().catch(console.error);
