const DEFAULT_GRAPHQL_ENDPOINT =
  'https://yideng-aichat-serverless.wengjiaxin959.workers.dev/';

/**
 * 透過 Vite 注入的環境變量取得 GraphQL API 位址，若未配置則落到預設 Cloudflare Workers 域名。
 */
export const GRAPHQL_ENDPOINT =
  import.meta.env.VITE_GRAPHQL_ENDPOINT || DEFAULT_GRAPHQL_ENDPOINT;
