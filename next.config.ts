import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Don't generate AGENTS.md and CLAUDE.md on `next dev`
  agentRules: false,
};

export default nextConfig;
