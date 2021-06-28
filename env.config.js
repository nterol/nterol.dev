const devMode = process.env.NODE_ENV === "development";

export const NOTION_WORKER_ROOT_URL = devMode ? "http://127.0.0.1:8787" : "https://lambda-notion.grimmoire.workers.dev"