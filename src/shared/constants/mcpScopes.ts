/**
 * MCP Authorization Scopes — Defines permission scopes for each MCP tool.
 *
 * Each tool requires specific scopes to execute. API keys can be configured
 * with a subset of scopes to limit tool access (least-privilege).
 */

// ============ Scope Definitions ============

/** All available MCP scopes */
export const MCP_SCOPE_LIST = [
  "read:health",
  "read:combos",
  "write:combos",
  "read:quota",
  "read:usage",
  "read:models",
  "read:radar",
  "execute:completions",
  "execute:search",
  "write:budget",
  "write:resilience",
  "pricing:write",
  "read:cache",
  "write:cache",
  "read:compression",
  "write:compression",
  "read:proxies",
] as const;

export type McpScope = (typeof MCP_SCOPE_LIST)[number];

// ============ Tool → Scope Mapping ============

/** Maps each MCP tool to its required scopes */
export const MCP_TOOL_SCOPES: Record<string, readonly McpScope[]> = {
  // Phase 1: Essential Tools
  goatapi_get_health: ["read:health"],
  goatapi_list_combos: ["read:combos"],
  goatapi_get_combo_metrics: ["read:combos"],
  goatapi_switch_combo: ["write:combos"],
  goatapi_check_quota: ["read:quota"],
  goatapi_route_request: ["execute:completions"],
  goatapi_web_search: ["execute:search"],
  goatapi_x_search: ["execute:search"],
  goatapi_web_fetch: ["execute:search"],
  goatapi_cost_report: ["read:usage"],
  goatapi_list_models_catalog: ["read:models"],
  goatapi_radar_catalog: ["read:radar"],

  // Phase 2: Advanced Tools
  goatapi_simulate_route: ["read:health", "read:combos"],
  goatapi_set_budget_guard: ["write:budget"],
  goatapi_set_resilience_profile: ["write:resilience"],
  goatapi_test_combo: ["execute:completions", "read:combos"],
  goatapi_get_provider_metrics: ["read:health"],
  goatapi_best_combo_for_task: ["read:combos", "read:health"],
  goatapi_explain_route: ["read:health", "read:usage"],
  goatapi_get_session_snapshot: ["read:usage"],
  goatapi_db_health_check: ["read:health", "write:resilience"],
  goatapi_sync_pricing: ["pricing:write"],
  goatapi_cache_stats: ["read:cache"],
  goatapi_cache_flush: ["write:cache"],
  goatapi_compression_status: ["read:compression"],
  goatapi_compression_configure: ["write:compression"],
  goatapi_set_compression_engine: ["write:compression"],
  goatapi_list_compression_combos: ["read:compression"],
  goatapi_compression_combo_stats: ["read:compression"],
  goatapi_ccr_store: ["write:compression"],
  goatapi_ccr_retrieve: ["read:compression"],
  goatapi_ccr_inspect: ["read:compression"],
  goatapi_ccr_list: ["read:compression"],
  goatapi_ccr_delete: ["write:compression"],
  goatapi_ccr_stats: ["read:compression"],
  goatapi_oneproxy_fetch: ["read:proxies"],
  goatapi_oneproxy_rotate: ["read:proxies"],
  goatapi_oneproxy_stats: ["read:proxies"],

  // Web-session pool observability (read) + lifecycle (write)
  goatapi_pool_status: ["read:health"],
  goatapi_pool_sessions: ["read:health"],
  goatapi_pool_health: ["read:health"],
  goatapi_pool_reset: ["write:resilience"],
  goatapi_pool_warm: ["write:resilience"],
  // Stealth browser pool observability (#3368 PR7)
  goatapi_browser_pool_status: ["read:health"],
} as const;
