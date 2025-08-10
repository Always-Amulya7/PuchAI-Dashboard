# **App Name**: Puch Dashboard

## Core Features:

- Dashboard UI: Dashboard interface with chat input and action buttons.
- Natural Language Query: Use natural language to query across connected tools like Jira, GitHub, Datadog, and Slack via Puch AI.
- AI-Powered Insight: AI tool to process data from external tools via MCP server to summarize and identify actionable insights.
- Code Generation: Generate code snippets, such as test suites, based on PR diffs using Puch AI.
- Connect with Bearer Token: Connect to external services using Bearer Token authentication.
- Connect with OAuth: Connect to external services using OAuth authentication.
- Diagnostic control: Set Diagnostic Level.
- Connect with Bearer Token Command: Connect your MCP server with Puch AI. Your MCP server must have a validate tool that accepts the bearer token and returns the user's phone number in the format {country_code}{number} (e.g., 919876543210 for +91-9876543210). This validation is required for authentication. Example: /mcp connect https://mcp.example.com/mcp abc123token
- Connect with OAuth Command: For servers supporting OAuth authentication. A browser window may open for consent and authentication.
- Use a hosted MCP server Command: Connect to a hosted MCP server using its unique identifier. You can connect upto 5 MCP servers at a time.
- Remove a server Command: Remove a hosted MCP server from your list of connected servers.
- List connected servers Command: List all your MCP server configurations
- Disconnect Server Command: Safely disconnect from all currently active MCP servers. This will remove access to all server-provided tools.
- Set Diagnostic Level Command: Control the amount of diagnostic information you receive from MCP operations. Available levels: error, warn, info, debug
- Disable a server Command: Disable a specific MCP server. You will still be connected to the server but you won't be able to use its tools. This is mostly for debugging. You can re-enable the server later using the /mcp enable command.
- Enable a server Command: Enable a specific MCP server. By default, the server you connected to will be enabled.
- MCP Server Requirements: Validate Tool: Your MCP server must have a validate tool that returns the server owner's phone number in the format: {country_code}{number} Example: 919876543210 for +91-9876543210
- MCP Server Requirements: HTTPS: All endpoints must be served over HTTPS for security. HTTP connections will be rejected.
- MCP Server Requirements: Production: Before sharing your server, deploy it on a hosting platform such as Vercel, Cloudflare, or any other service. Ensure that the server is publicly accessible so others can connect to it.

## Style Guidelines:

- Primary color: A muted teal (#73A9AD) to evoke a sense of calmness and reliability, suitable for a developer-focused dashboard. The color looks modern without being distracting.
- Background color: A very light, desaturated teal (#F0F4F5), offering a subtle backdrop that doesn't compete with the primary elements.
- Accent color: A desaturated blue (#5F89A3), analogous to the primary color, for interactive elements and highlights to provide contrast and guide user attention.
- Body and headline font: 'Inter', a grotesque-style sans-serif known for its modern, neutral, and highly readable design. This is for both headlines and body.
- Use clean, minimalist icons to represent different tools (Jira, GitHub, etc.) and actions.
- Divide the dashboard into clear, distinct sections for chat input, AI output, and action buttons for clear structure.
- Use subtle transitions and animations for loading states and feedback on actions to make interactions smoother.