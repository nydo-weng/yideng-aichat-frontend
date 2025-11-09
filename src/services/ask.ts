import { GRAPHQL_ENDPOINT } from '../config';
import type { GraphQLHistoryMessage } from '../types/chat';

const ASK_QUERY = /* GraphQL */ `
  query Ask($question: String!, $messages: [MessageInput!]) {
    ask(question: $question, messages: $messages) {
      reply
    }
  }
`;

interface AskVariables {
  question: string;
  messages: GraphQLHistoryMessage[];
}

interface AskResponse {
  data?: {
    ask?: {
      reply?: string;
    };
  };
  errors?: Array<{ message?: string }>;
}

/**
 * 呼叫 Cloudflare Workers GraphQL 端點並取得 AI 回覆。
 */
export async function askQuestion(
  question: string,
  messages: GraphQLHistoryMessage[],
): Promise<string> {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: ASK_QUERY,
      variables: {
        question,
        messages,
      } satisfies AskVariables,
    }),
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed with status ${response.status}`);
  }

  const payload = (await response.json()) as AskResponse;

  if (payload.errors?.length) {
    throw new Error(payload.errors[0]?.message || 'Unknown GraphQL error');
  }

  const reply = payload.data?.ask?.reply;

  if (!reply) {
    throw new Error('Empty reply from AI service');
  }

  return reply;
}
