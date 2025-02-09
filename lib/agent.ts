/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AgentKit,
  wethActionProvider,
  walletActionProvider,
  erc20ActionProvider,
  cdpApiActionProvider,
  cdpWalletActionProvider,
  pythActionProvider,
  ViemWalletProvider,
} from "@coinbase/agentkit";
import { getLangChainTools } from "@coinbase/agentkit-langchain";
import { HumanMessage } from "@langchain/core/messages";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";

function validateEnvironment() {
  const missingVars: string[] = [];
  const requiredVars = [
    "OPENAI_API_KEY",
    "CDP_API_KEY_NAME",
    "CDP_API_KEY_PRIVATE_KEY",
  ];
  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      missingVars.push(varName);
    }
  }
  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}`
    );
  }
}

validateEnvironment();

let agentPromise: Promise<{ agent: any; config: any }> | null = null;

async function initializeAgent(data: any) {
  const llm = new ChatOpenAI({
    model: "gpt-4o-mini",
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  const walletProvider = new ViemWalletProvider(data);

  // Initialize AgentKit
  const agentkit = await AgentKit.from({
    walletProvider,
    actionProviders: [
      wethActionProvider(),
      pythActionProvider(),
      walletActionProvider(),
      erc20ActionProvider(),
      cdpApiActionProvider({
        apiKeyName: process.env.CDP_API_KEY_NAME,
        apiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY?.replace(
          /\\n/g,
          "\n"
        ),
      }),
      cdpWalletActionProvider({
        apiKeyName: process.env.CDP_API_KEY_NAME,
        apiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY?.replace(
          /\\n/g,
          "\n"
        ),
      }),
    ],
  });

  const tools = await getLangChainTools(agentkit);
  const memory = new MemorySaver();
  const agentConfig = {
    configurable: { thread_id: "CDP AgentKit Chatbot NextJS" },
  };

  // Create the React agent
  const agent = createReactAgent({
    llm,
    tools,
    checkpointSaver: memory,
    messageModifier: `
      You are a helpful agent that can interact onchain using Coinbase AgentKit.
      If you need funds on network 'base-sepolia', request them or ask for wallet details.
      Refrain from restating your tools' descriptions unless explicitly requested.
    `,
  });

  return { agent, config: agentConfig };
}

export async function getAgent(data: any) {
  if (!agentPromise) {
    agentPromise = initializeAgent(data);
  }
  return agentPromise;
}

export async function processAgentMessage(
  message: string,
  data: any
): Promise<string> {
  const { agent, config } = await getAgent(data);
  const stream = await agent.stream(
    { messages: [new HumanMessage(message)] },
    config
  );
  let responseText = "";
  for await (const chunk of stream) {
    if ("agent" in chunk) {
      responseText += chunk.agent.messages[0].content;
    } else if ("tools" in chunk) {
      responseText += chunk.tools.messages[0].content;
    }
  }
  return responseText;
}
