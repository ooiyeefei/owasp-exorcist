/**
 * MCP Server - Corruption Sensor
 * Allows Kiro AI to "sense" the corruption level of the haunted codebase
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import * as fs from 'fs';
import * as path from 'path';

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
