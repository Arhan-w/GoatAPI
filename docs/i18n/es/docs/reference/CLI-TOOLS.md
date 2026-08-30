# CLI-TOOLS (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/CLI-TOOLS.md) · 🇸🇦 [ar](../../../ar/docs/reference/CLI-TOOLS.md) · 🇦🇿 [az](../../../az/docs/reference/CLI-TOOLS.md) · 🇧🇬 [bg](../../../bg/docs/reference/CLI-TOOLS.md) · 🇧🇩 [bn](../../../bn/docs/reference/CLI-TOOLS.md) · 🇨🇿 [cs](../../../cs/docs/reference/CLI-TOOLS.md) · 🇩🇰 [da](../../../da/docs/reference/CLI-TOOLS.md) · 🇩🇪 [de](../../../de/docs/reference/CLI-TOOLS.md) · 🇮🇷 [fa](../../../fa/docs/reference/CLI-TOOLS.md) · 🇫🇮 [fi](../../../fi/docs/reference/CLI-TOOLS.md) · 🇫🇷 [fr](../../../fr/docs/reference/CLI-TOOLS.md) · 🇮🇳 [gu](../../../gu/docs/reference/CLI-TOOLS.md) · 🇮🇱 [he](../../../he/docs/reference/CLI-TOOLS.md) · 🇮🇳 [hi](../../../hi/docs/reference/CLI-TOOLS.md) · 🇭🇺 [hu](../../../hu/docs/reference/CLI-TOOLS.md) · 🇮🇩 [id](../../../id/docs/reference/CLI-TOOLS.md) · 🇮🇩 [in](../../../in/docs/reference/CLI-TOOLS.md) · 🇮🇹 [it](../../../it/docs/reference/CLI-TOOLS.md) · 🇯🇵 [ja](../../../ja/docs/reference/CLI-TOOLS.md) · 🇰🇷 [ko](../../../ko/docs/reference/CLI-TOOLS.md) · 🇮🇳 [mr](../../../mr/docs/reference/CLI-TOOLS.md) · 🇲🇾 [ms](../../../ms/docs/reference/CLI-TOOLS.md) · 🇳🇱 [nl](../../../nl/docs/reference/CLI-TOOLS.md) · 🇳🇴 [no](../../../no/docs/reference/CLI-TOOLS.md) · 🇵🇭 [phi](../../../phi/docs/reference/CLI-TOOLS.md) · 🇵🇱 [pl](../../../pl/docs/reference/CLI-TOOLS.md) · 🇵🇹 [pt](../../../pt/docs/reference/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/CLI-TOOLS.md) · 🇷🇴 [ro](../../../ro/docs/reference/CLI-TOOLS.md) · 🇷🇺 [ru](../../../ru/docs/reference/CLI-TOOLS.md) · 🇸🇰 [sk](../../../sk/docs/reference/CLI-TOOLS.md) · 🇸🇪 [sv](../../../sv/docs/reference/CLI-TOOLS.md) · 🇰🇪 [sw](../../../sw/docs/reference/CLI-TOOLS.md) · 🇮🇳 [ta](../../../ta/docs/reference/CLI-TOOLS.md) · 🇮🇳 [te](../../../te/docs/reference/CLI-TOOLS.md) · 🇹🇭 [th](../../../th/docs/reference/CLI-TOOLS.md) · 🇹🇷 [tr](../../../tr/docs/reference/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/CLI-TOOLS.md) · 🇵🇰 [ur](../../../ur/docs/reference/CLI-TOOLS.md) · 🇻🇳 [vi](../../../vi/docs/reference/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/CLI-TOOLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/CLI-TOOLS.md)

---

---

title: "Herramientas CLI — GoatAPI"
version: 3.8.50
lastUpdated: 2026-08-18
---

# Herramientas CLI — GoatAPI

Última actualización: 2026-08-18

GoatAPI se integra con tres categorías de herramientas CLI distribuidas en tres páginas de panel dedicadas:

| Página          | Ruta                    | Concepto                                                                                     | Conteo       |
| --------------- | ----------------------- | -------------------------------------------------------------------------------------------- | ------------ |
| **Código CLI**  | `/dashboard/cli-code`   | Herramientas de codificación que apuntas a GoatAPI (Cliente → CLI → GoatAPI → Proveedor) | 26           |
| **Agentes CLI** | `/dashboard/cli-agents` | Agentes autónomos que apuntas a GoatAPI (mismo flujo, mayor alcance)                       | 8            |
| **Agentes ACP** | `/dashboard/acp-agents` | CLIs que GoatAPI genera como backend a través de stdio/ACP (flujo inverso)                 | ver registro |

Las rutas heredadas redirigen a través de 308: `/dashboard/cli-tools` → `/dashboard/cli-code`, `/dashboard/agents` → `/dashboard/acp-agents`.

---

## Cómo Funciona

```
Código CLI / Agentes CLI (flujo de consumo):
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Hermes Agent / Goose / ...
           │
           ▼  (todos apuntan a GoatAPI)
    http://YOUR_SERVER:20128/v1
           │
           ▼  (GoatAPI enruta al proveedor correcto)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...

Agentes ACP (flujo de generación inverso):
    Solicitud del cliente → GoatAPI → genera CLI a través de stdio/ACP → respuesta
```

**Beneficios:**

- Una clave API para gestionar todas las herramientas
- Seguimiento de costos a través de todas las CLIs en el panel
- Cambio de modelo sin reconfigurar cada herramienta
- Funciona localmente y en servidores remotos (VPS, Docker, Akamai, Cloudflare Tunnel)

---

## Configuración automática con `setup-*`

No tienes que escribir la configuración de cada herramienta a mano. GoatAPI envía un `setup-*`
comando por cada CLI soportada que lee el catálogo de modelos **en vivo** de un GoatAPI en ejecución
(local o remoto) y escribe la configuración propia de la herramienta en tu máquina:

```bash
goatapi setup-codex        goatapi setup-claude       goatapi setup-opencode
goatapi setup-cline        goatapi setup-kilo         goatapi setup-continue
goatapi setup-cursor       goatapi setup-roo          goatapi setup-crush
goatapi setup-goose        goatapi setup-qwen         goatapi setup-aider
```

Cada uno acepta `--remote <url> --api-key <key>` (configura una herramienta local contra un
GoatAPI remoto), `--dry-run` (vista previa sin escribir), y `--port`. Las herramientas
sin descubrimiento automático de modelos (Cline, Kilo, Roo, Goose, Aider, Qwen) toman
`--model <id>` (y `--yes` para ejecuciones no interactivas). Para lanzar un CLI con el
entorno correcto inyectado y sin configuración escrita en absoluto, usa el lanzador genérico
`goatapi run <target>` (claude, codex, aider, goose, opencode, qwen,
gemini — los objetivos y alias provienen de `bin/cli/cli-manifest.mjs`); los lanzadores
heredados por herramienta `goatapi launch` (Claude Code) y `goatapi launch-codex`
(Codex) siguen disponibles. El CLI de Gemini es solo de lanzamiento: es un objetivo de
`goatapi run` pero no tiene receta `setup-*`/`configure`.

> **Referencia completa:** la tabla maestra — lo que cada comando escribe, cada bandera,
> local vs remoto, y qué herramientas quieren un sufijo `/v1` — vive en
> **[Integraciones CLI](../guides/CLI-INTEGRATIONS.md)**.

### Ejecutando esto dentro de un contenedor

Un comando `setup-*` ejecutado dentro del contenedor de GoatAPI escribe en
el propio hogar del contenedor, que ninguna CLI del host lee y que desaparece con el
contenedor. GoatAPI detecta eso y sale con `2` con instrucciones en lugar de
escribir. Dos formas soportadas para avanzar: instalar la CLI en el host y
`goatapi connect` al contenedor, o montar los directorios de configuración y establecer
`CLI_CONFIG_HOME` (el perfil `host` de compose). Cada comando `setup-*`, además de
`goatapi configure` y `goatapi config set`, acepta
`--allow-container-write` cuando configurar las propias CLIs del contenedor es lo que
realmente querías decir; `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` hace lo mismo para
el servidor. Ver
[Guía de Docker → Configurando herramientas CLI del host](../guides/DOCKER_GUIDE.md#configuring-host-cli-tools-when-goatapi-runs-in-docker).

El **endpoint de aplicación** del panel (`POST /api/cli-tools/apply`) aplica la
misma protección: en un contenedor, una escritura cuyo objetivo no está montado desde el
host responde **`422`** con `containerEphemeralTarget: true`, el texto de error seguro
y — para las herramientas con una receta de host (claude, codex, opencode, cline,
kilo, continue) — un `hostSetupCommand` (por ejemplo, `goatapi setup-opencode`) para ejecutar
en el host en su lugar; nada se escribe. `dryRun: true` sigue funcionando en modo contenedor
y devuelve el contenido generado + la ruta objetivo sin tocar el disco, por lo que puedes
previsualizar desde el panel y aplicar en el host. Este comportamiento es
intencional y está protegido contra regresiones por
`tests/unit/api/cli-tools/apply-container-guard.test.ts` — nunca "arregles" un 422
eliminando la protección.

---

## Fuente de Verdad

El catálogo unificado se encuentra en `src/shared/constants/cliTools.ts` como `CLI_TOOLS: Record<string, CliCatalogEntry>`.

Cada entrada tiene estos campos (definidos en `src/shared/schemas/cliCatalog.ts`):

| Campo                                           | Tipo                                                         | Descripción                                                         |
| ----------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------- |
| `category`                                      | `"code" \| "agent"`                                          | En qué página aparece la herramienta                                |
| `vendor`                                        | `string`                                                     | Origen de la herramienta ("Anthropic", "OSS (P. Gauthier)")         |
| `acpSpawnable`                                  | `boolean`                                                    | También utilizable como un Agente ACP (insignia mostrada)           |
| `baseUrlSupport`                                | `"full" \| "partial" \| "none"`                              | Nivel de soporte de endpoint personalizado. `"none"` = backlog MITM |
| `configType`                                    | `"env" \| "custom" \| "guide" \| "custom-builder" \| "mitm"` | Mecanismo de configuración                                          |
| `id`, `name`, `color`, `description`, `docsUrl` | estándar                                                     | Campos de visualización principales                                 |

Las entradas con `baseUrlSupport: "none"` **no se muestran** en las páginas del panel — están registradas en el backlog MITM para el plan 11 (ver `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`).

### Niveles de capacidad (catalogado × detectable × configurable × lanzable)

No todas las herramientas catalogadas son detectables, configurables o lanzables. Cada nivel tiene una fuente declarativa, y una prueba de deriva las mantiene alineadas:

| Nivel            | Significado                                                                          | Declarado en                                                                      |
| ---------------- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| **Catalogado**   | Aparece en el catálogo del panel (nombre, proveedor, docs, tipo de configuración)    | `src/shared/constants/cliTools.ts` (`CLI_TOOLS`)                                  |
| **Detectable**   | Detección de binarios/configuración, comprobaciones de salud, rutas de configuración | `src/shared/services/cliRuntime.ts` (`CLI_TOOLS` catálogo en tiempo de ejecución) |
| **Configurable** | Soportado por `goatapi configure <cli>` (existe receta de configuración)           | `bin/cli/cli-manifest.mjs` (`configure: true`)                                    |
| **Lanzable**     | Soportado por `goatapi run <target>` (inyección de env/args definida)              | `bin/cli/cli-manifest.mjs` (`run: true`)                                          |

`bin/cli/cli-manifest.mjs` es el manifiesto ejecutable canónico para los comandos de CLI: `run`, `configure` y los generadores de autocompletado de shell derivan sus listas de objetivos, resolución de alias (por ejemplo `kilocode`/`kilo-code`/`kilo_cli` → `kilo`) y cableado de la bandera `--model` de él. El guardia de deriva `tests/unit/cli/cli-manifest-drift.test.ts` afirma que el manifiesto, el catálogo en tiempo de ejecución, el catálogo de UI y cada superficie consumidora se mantengan sincronizados — un objetivo agregado a una superficie sin los otros falla la suite en lugar de derivar silenciosamente.

## 1. Catálogo de Código CLI (26 herramientas)

Todas las herramientas que aparecen en `/dashboard/cli-code`. Aquellas con `baseUrlSupport: none` están conectadas a través de MITM o una guía manual en lugar de una URL base personalizada:

| id           | nombre                           | proveedor           | soporteBaseUrl | tipoConfiguración         | acpSpawnable |
| ------------ | -------------------------------- | ------------------- | -------------- | ------------------------- | ------------ |
| claude       | Claude Code                      | Anthropic           | completo       | env                       | true         |
| codex        | OpenAI Codex CLI                 | OpenAI              | completo       | personalizado             | true         |
| zcode        | ZCode (Plan de Codificación GLM) | Z.ai                | ninguno        | personalizado             | false        |
| cline        | Cline                            | OSS (ex-Claude Dev) | completo       | personalizado             | true         |
| kilo         | Kilo Code                        | Kilo-Org            | completo       | personalizado             | false        |
| roo          | Roo Code                         | Roo (OSS)           | completo       | guía                      | false        |
| continue     | Continue                         | continue.dev        | completo       | guía                      | false        |
| aider        | Aider                            | OSS (P. Gauthier)   | completo       | guía                      | true         |
| forge        | ForgeCode                        | Antinomy HQ         | completo       | personalizado             | true         |
| jcode        | jcode                            | 1jehuang (OSS)      | completo       | personalizado             | false        |
| deepseek-tui | DeepSeek TUI                     | Hunter Bown (OSS)   | completo       | personalizado             | false        |
| codewhale    | CodeWhale                        | Hmbown (OSS)        | completo       | personalizado             | false        |
| opencode     | OpenCode                         | Anomaly (ex-SST)    | completo       | guía                      | true         |
| droid        | Factory Droid                    | Factory AI          | parcial        | guía                      | false        |
| copilot      | GitHub Copilot CLI               | GitHub/MS           | completo       | personalizado             | false        |
| cursor-cli   | Cursor CLI                       | Anysphere           | parcial        | guía                      | true         |
| smelt        | Smelt                            | leonardcser (OSS)   | completo       | personalizado             | false        |
| pi           | Pi (agente de codificación pi)   | M. Zechner (OSS)    | completo       | personalizado             | false        |
| grok-build   | Grok Build                       | xAI                 | completo       | personalizado             | false        |
| crush        | Crush                            | OSS (Charm)         | completo       | personalizado             | false        |
| qwen         | Qwen Code                        | Alibaba             | completo       | guía                      | true         |
| cursor       | Cursor                           | Anysphere           | ninguno        | guía                      | false        |
| antigravity  | Antigravity                      | Google              | ninguno        | mitm                      | false        |
| hermes       | Hermes                           | Nous Research       | ninguno        | guía                      | false        |
| kiro         | Kiro AI                          | Amazon              | ninguno        | mitm                      | false        |
| custom       | CLI Personalizado                | —                   | completo       | constructor-personalizado | false        |

Las herramientas con `baseUrlSupport: "parcial"` muestran una insignia "⚠ Base URL parcial" en la tarjeta del panel.

## 2. Catálogo de Agentes CLI (8 herramientas)

Agentes autónomos que aparecen en `/dashboard/cli-agents`:

| id           | nombre           | proveedor                | soporteBaseUrl | acpSpawnable |
| ------------ | ---------------- | ------------------------ | -------------- | ------------ |
| hermes-agent | Agente Hermes    | Nous Research            | completo       | falso        |
| openclaw     | OpenClaw         | OSS (P. Steinberger)     | completo       | verdadero    |
| goose        | Goose            | Block / Linux Foundation | completo       | verdadero    |
| interpreter  | Open Interpreter | OSS                      | completo       | verdadero    |
| warp         | Warp AI          | Warp Inc.                | parcial        | verdadero    |
| agent-deck   | Agent Deck       | asheshgoplani (OSS)      | completo       | falso        |
| omp          | Oh My Pi         | OSS                      | completo       | verdadero    |
| letta        | Letta CLI        | Letta                    | completo       | falso        |

---

## 3. Agentes ACP (/dashboard/acp-agents)

Esta página (renombrada de `/dashboard/agents`) muestra CLIs que GoatAPI puede **generar** como motores de ejecución backend a través del protocolo stdio/ACP. El catálogo se mantiene por separado en `src/lib/acp/registry.ts` y **no** es el mismo que `CLI_TOOLS`.

---

## 4. Pendiente de MITM (no mostrado en el dashboard)

Los siguientes CLIs no soportan URL base personalizadas de forma nativa y **no están listados** en las páginas de Código CLI o Agentes CLI. Son candidatos para la interceptación MITM en el plan 11:

| CLI                 | Razón                                                                 |
| ------------------- | --------------------------------------------------------------------- |
| windsurf            | BYOK limitado a seleccionar modelos de Claude + URL/token corporativo |
| amp                 | Ecosistema cerrado (Sourcegraph)                                      |
| amazon-q / kiro-cli | Autenticación AWS SSO, sin URL personalizada                          |
| cowork              | Anthropic Desktop, sin punto final configurable                       |

Consulta `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md` para la referencia cruzada completa.

---

## 5. API de Detección por Lotes

Toda la detección de herramientas se agrega a través de un único punto final:

**`GET /api/cli-tools/all-statuses`**

- Autenticación: `requireCliToolsAuth(request)` (igual que otras rutas de `/api/cli-tools/`)
- Retorna: `Record<toolId, ToolBatchStatus>` (tipo: `src/shared/types/cliBatchStatus.ts`)
- Estrategia: `Promise.all` sobre todas las herramientas, tiempo de espera de 5s por herramienta
- Caché: en memoria LRU indexada por el archivo de configuración `mtime`. Caché invalidada cuando cambia el mtime. Reiniciada al reiniciar el servidor.

Forma de respuesta por herramienta:

```ts
interface ToolBatchStatus {
  detection: {
    installed: boolean;
    runnable: boolean;
    version?: string;
    command?: string;
    commandPath?: string;
    reason?: string;
  };
  config: {
    status: "configured" | "not_configured" | "not_installed" | "unknown" | "other";
    endpoint?: string | null;
    lastConfiguredAt?: string | null;
  };
  error?: string; // sanitizado, sin trazas de pila
}
```

## 6. Controladores de Configuración para Nuevas Herramientas

Las nuevas herramientas con `configType: "custom"` tienen rutas API de configuración dedicadas:

| Ruta                                        | Herramienta                                                                 |
| ------------------------------------------- | --------------------------------------------------------------------------- |
| `POST /api/cli-tools/forge-settings`        | ForgeCode (.forge.toml)                                                     |
| `POST /api/cli-tools/jcode-settings`        | jcode (--base-url flag)                                                     |
| `POST /api/cli-tools/deepseek-tui-settings` | DeepSeek TUI (OPENAI_BASE_URL, legado)                                      |
| `POST /api/cli-tools/codewhale-settings`    | CodeWhale (OPENAI_BASE_URL, sincronización primaria + legado `~/.deepseek`) |
| `POST /api/cli-tools/smelt-settings`        | Smelt                                                                       |
| `POST /api/cli-tools/pi-settings`           | Agente de codificación Pi                                                   |
| `POST /api/cli-tools/grok-build-settings`   | Grok Build (~/.grok/config.toml, `[model.goatapi]`)                       |
| `POST /api/cli-tools/qwen-settings`         | Qwen Code (`~/.qwen/settings.json` + clave dedicada `.env`)                 |

Todas las rutas utilizan `sanitizeErrorMessage()` para respuestas de error (Regla Dura #12).

---

## 7. Arquitectura de Páginas del Dashboard

### Código CLI (`/dashboard/cli-code`)

- `src/app/(dashboard)/dashboard/cli-code/page.tsx` — componente del servidor
- `src/app/(dashboard)/dashboard/cli-code/CliCodePageClient.tsx` — cuadrícula del cliente
- `src/app/(dashboard)/dashboard/cli-code/[id]/page.tsx` — página de detalles de la herramienta
- `src/app/(dashboard)/dashboard/cli-code/components/` — 12 tarjetas de herramientas especializadas + `ToolDetailClient.tsx`

### Agentes CLI (`/dashboard/cli-agents`)

- `src/app/(dashboard)/dashboard/cli-agents/page.tsx` — componente del servidor
- `src/app/(dashboard)/dashboard/cli-agents/CliAgentsPageClient.tsx` — cuadrícula del cliente
- `src/app/(dashboard)/dashboard/cli-agents/[id]/page.tsx` — reutiliza `ToolDetailClient`

### Agentes ACP (`/dashboard/acp-agents`)

- `src/app/(dashboard)/dashboard/acp-agents/page.tsx` — componente del servidor (movido de `agents/`)

### Componentes de UI Compartidos (`src/shared/components/cli/`)

| Archivo                 | Propósito                                                               |
| ----------------------- | ----------------------------------------------------------------------- |
| `CliToolCard.tsx`       | Tarjeta de estado inteligente (detección + configuración + punto final) |
| `CliConceptCard.tsx`    | Tarjeta de explicación de concepto por página                           |
| `CliComparisonCard.tsx` | Comparación en tres columnas entre tipos de CLI                         |
| `BaseUrlSelect.tsx`     | Desplegable de punto final (Local/Nube/Personalizado)                   |
| `ApiKeySelect.tsx`      | Selector de clave API                                                   |
| `ManualConfigModal.tsx` | Modal de fragmento de configuración copiable                            |

### Hook Compartido (`src/shared/hooks/cli/`)

| Archivo                   | Propósito                                                                        |
| ------------------------- | -------------------------------------------------------------------------------- |
| `useToolBatchStatuses.ts` | Obtiene `/api/cli-tools/all-statuses`, gestiona el estado de carga/actualización |

## 8. i18n

Nuevos espacios de nombres añadidos en el plan 14 F9:

| Namespace   | Propósito                                                                                                    |
| ----------- | ------------------------------------------------------------------------------------------------------------ |
| `cliCommon` | Cadenas compartidas (etiquetas de tarjetas, textos de concepto/comparación, etiquetas de página de detalles) |
| `cliCode`   | Cadenas de la página del código CLI                                                                          |
| `cliAgents` | Cadenas de la página de agentes CLI                                                                          |
| `acpAgents` | Cadenas de la página de agentes ACP                                                                          |

Se proporcionan traducciones completas en PT-BR y EN. 39 otros locales recurren automáticamente a EN a través de la fusión a nivel de espacio de nombres en `src/i18n/request.ts`.

---

## 9. Inicio Rápido

### Paso 1 — Obtén una clave de API de GoatAPI

1. Abre `/dashboard/api-manager` → **Crear clave de API**
2. Dale un nombre (por ejemplo, `cli-tools`) y selecciona todos los permisos
3. Copia la clave — la necesitarás para cada CLI a continuación

> Tu clave se ve así: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`

---

### Paso 2 — Instala las herramientas CLI

Todas las herramientas basadas en npm requieren Node.js 22.22.2+ o 24.x:

```bash
# Claude Code (Anthropic)
npm install -g @anthropic-ai/claude-code

# OpenAI Codex
npm install -g @openai/codex

# OpenCode
npm install -g opencode-ai

# Cline
npm install -g cline

# KiloCode
npm install -g kilocode

# Qwen Code
npm install -g @qwen-code/qwen-code

# Google Gemini CLI (lanzable a través de `goatapi run gemini` → /v1beta surface)
npm install -g @google/gemini-cli

# Aider
pip install aider-chat

# Smelt
cargo install smelt  # Basado en Rust

# Agente de codificación Pi
# ver https://github.com/zechnerj/pi-coding-agent para la instalación

# jcode
# ver https://github.com/1jehuang/jcode para la instalación
```

---

### Paso 3 — Configura a través del Dashboard

1. Ve a `http://localhost:20128/dashboard/cli-code`
2. Encuentra tu herramienta en la cuadrícula
3. Haz clic en la tarjeta para abrir la página de detalles de la herramienta
4. Selecciona tu clave de API y URL base
5. Haz clic en **Aplicar Configuración** o copia el fragmento de configuración manual

---

### Paso 4 — Establecer Variables de Entorno Globales

```bash
# Punto de acceso universal de GoatAPI
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-goatapi-key"
export ANTHROPIC_BASE_URL="http://localhost:20128"
export ANTHROPIC_AUTH_TOKEN="sk-your-goatapi-key"
# Gemini CLI lee GOOGLE_GEMINI_BASE_URL en la RAÍZ (su SDK agrega /v1beta/... por sí mismo)
export GOOGLE_GEMINI_BASE_URL="http://localhost:20128"
export GEMINI_API_KEY="sk-your-goatapi-key"
```

> Para un **servidor remoto**, reemplaza `localhost:20128` con la IP o dominio del servidor,
> por ejemplo, `http://<tu-ip-del-servidor>:20128`.

---

### Paso 4 — Configura Cada Herramienta

#### Claude Code

```bash
# Crea ~/.claude/settings.json:
mkdir -p ~/.claude && cat > ~/.claude/settings.json << EOF
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:20128",
    "ANTHROPIC_AUTH_TOKEN": "sk-your-goatapi-key"
  }
}
EOF
```

Usa la raíz de la puerta de enlace unificada de Anthropic para Claude Code. No agregues `/v1` aquí.

**Prueba:** `claude "say hello"`

---

#### OpenAI Codex

El Codex moderno (v0.137+) lee `~/.codex/config.toml` solamente — el antiguo
`config.yaml` pertenece al CLI npm legado y se ignora silenciosamente. La clave de API
se mantiene en la variable de entorno `OMNIROUTE_API_KEY` (`env_key`), nunca
dentro del archivo:

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.toml << EOF
model_provider = "goatapi"

[model_providers.goatapi]
name                 = "GoatAPI"
base_url             = "http://localhost:20128/v1"
env_key              = "OMNIROUTE_API_KEY"
requires_openai_auth = false
EOF
export OMNIROUTE_API_KEY="sk-your-goatapi-key"
```

Referencia completa (perfiles, `wire_api`, ventanas de contexto): [CODEX-CLI-CONFIGURATION.md](../guides/CODEX-CLI-CONFIGURATION.md).

**Prueba:** `codex "what is 2+2?"`

---

#### OpenCode

```bash
mkdir -p ~/.config/opencode && cat > ~/.config/opencode/opencode.json << EOF
{
  "\$schema": "https://opencode.ai/config.json",
  "provider": {
    "goatapi": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "GoatAPI",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "sk-your-goatapi-key"
      },
      "models": {
        "claude-sonnet-4-5": { "name": "claude-sonnet-4-5" },
        "claude-sonnet-4-5-thinking": { "name": "claude-sonnet-4-5-thinking" },
        "gemini-3-flash": { "name": "gemini-3-flash" }
      }
    }
  }
}
EOF
```

**Prueba:** `opencode`

> Usa `opencode run "tu prompt" --model goatapi/claude-sonnet-4-5-thinking --variant high`
> para enviar variantes de pensamiento.

---

#### Cline (CLI o VS Code)

**Modo CLI:**

```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
  "apiProvider": "openai",
  "openAiBaseUrl": "http://localhost:20128/v1",
  "openAiApiKey": "sk-your-goatapi-key"
}
EOF
```

**Modo VS Code:**
Configuraciones de la extensión Cline → Proveedor de API: `OpenAI Compatible` → URL base: `http://localhost:20128/v1`

O usa el dashboard de GoatAPI → **CLI Tools → Cline → Aplicar Configuración**.

---

#### KiloCode (CLI o VS Code)

**Modo CLI:**

```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-goatapi-key
```

**Configuraciones de VS Code:**

```json
{
  "kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
  "kilo-code.apiKey": "sk-your-goatapi-key"
}
```

O usa el dashboard de GoatAPI → **CLI Tools → KiloCode → Aplicar Configuración**.

---

#### Continue (Extensión de VS Code)

Edita `~/.continue/config.yaml`:

```yaml
models:
  - name: GoatAPI
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-goatapi-key
    default: true
```

Reinicia VS Code después de editar.

---

#### VS Code Insiders (`chatLanguageModels.json`)

Usa esto cuando VS Code Insiders esté configurado para modelos de punto final personalizados y quieras que GoatAPI funcione sin un campo de encabezado personalizado.

**Ubicación recomendada:**

- Linux: `~/.config/Code - Insiders/User/chatLanguageModels.json`
- Windows: `%APPDATA%/Code - Insiders/User/chatLanguageModels.json`

**Ejemplo usando el alias tokenizado de GoatAPI:**

```json
[
  {
    "vendor": "customendpoint",
    "id": "auto",
    "name": "GoatAPI Auto",
    "family": "gpt-4",
    "version": "1.0.0",
    "url": "http://localhost:20128/api/v1/vscode/sk-your-goatapi-key/chat/completions",
    "modelsUrl": "http://localhost:20128/api/v1/vscode/sk-your-goatapi-key/models",
    "requestFormat": "openai-chat-completions",
    "contextWindow": 256000,
    "maxOutputTokens": 32768,
    "auth": {
      "type": "none"
    }
  }
]
```

**Notas:**

- Reemplaza `sk-your-goatapi-key` con una clave de API creada en GoatAPI.
- El campo `url` debe apuntar a `/api/v1/vscode/{token}/chat/completions`.
- El campo `modelsUrl` debe apuntar a `/api/v1/vscode/{token}/models`.
- Prefiere el flujo normal `/v1` + encabezado Bearer cuando el cliente soporte encabezados personalizados.
- Los tokens incrustados en la URL son una solución de compatibilidad y pueden aparecer en los registros del editor o en el historial del proxy.

---

#### Kiro CLI (Amazon)

```bash
# Inicia sesión en tu cuenta de AWS/Kiro:
kiro-cli login

# El CLI utiliza su propia autenticación — GoatAPI no es necesario como backend para Kiro CLI en sí.
# Usa kiro-cli junto con GoatAPI para otras herramientas.
kiro-cli status
```

Para la aplicación de escritorio **Kiro IDE**, usa el punto final MITM expuesto por GoatAPI
bajo `/dashboard/cli-tools → Kiro`.

---

## 10. CLI Interno de GoatAPI

El binario `goatapi` proporciona comandos para el ciclo de vida del servidor, configuración, diagnóstico y gestión de proveedores. Punto de entrada: `bin/goatapi.mjs`.

```bash
goatapi                              # Iniciar servidor (puerto por defecto 20128)
goatapi setup                        # Asistente de configuración interactivo
goatapi doctor                       # Verificar configuración, DB, puertos, tiempo de ejecución
goatapi providers list               # Conexiones de proveedor configuradas
goatapi providers test-all           # Probar cada conexión activa
goatapi reset-password               # Restablecer la contraseña del administrador
goatapi logs                         # Transmitir registros de solicitudes
goatapi health                       # Salud detallada (interruptores, caché, memoria)
goatapi --version                    # Imprimir versión
goatapi --help                       # Mostrar todos los comandos
```

### Configuración e Inicialización

```bash
goatapi setup                        # Asistente de configuración interactivo
goatapi setup --non-interactive      # Modo CI/automatización (lee vars de entorno + flags)
goatapi setup --password '<value>'   # Establecer la contraseña del administrador directamente
goatapi setup --add-provider \
  --provider openai \
  --api-key '<value>' \
  --test-provider                      # Agregar y probar un proveedor en un solo paso
```

Variables de entorno reconocidas para configuración no interactiva:

| Var                 | Propósito                                                                        |
| ------------------- | -------------------------------------------------------------------------------- |
| `OMNIROUTE_API_KEY` | Clave API del proveedor (vinculada a `--api-key` a través de Commander `.env()`) |
| `DATA_DIR`          | Sobrescribir el directorio de datos de GoatAPI                                 |

Todas las demás entradas no interactivas se pasan como flags, no como variables de entorno:
`--password`, `--provider`, `--provider-name`, `--provider-base-url`, `--default-model`
(ver las opciones de `goatapi setup` arriba).

### Diagnósticos

```bash
goatapi doctor                       # Verificar configuración, DB, puertos, tiempo de ejecución, memoria, disponibilidad
goatapi doctor --json                # JSON legible por máquina
goatapi doctor --no-liveness         # Omitir la prueba de salud HTTP
goatapi doctor --host 0.0.0.0        # Sobrescribir el host de disponibilidad
goatapi doctor --liveness-url <url>  # Sobrescribir la URL del endpoint de salud completo
```

El doctor realiza estas verificaciones: `Configuración`, `Base de datos`, `Almacenamiento/encriptación`,
`Disponibilidad de puertos`, `Tiempo de ejecución de Node`, `Binario nativo` (better-sqlite3),
`Memoria`, y `Disponibilidad del servidor`. Sale con un código distinto de cero si alguna verificación falla.

### Gestión de Proveedores

```bash
goatapi providers available                       # Catálogo de proveedores de GoatAPI
goatapi providers available --search openai       # Filtrar catálogo por id/nombre/alias/categoría
goatapi providers available --category api-key    # Filtrar por categoría (api-key, oauth, free, ...)
goatapi providers available --json                # JSON legible por máquina

goatapi providers list                            # Conexiones de proveedor configuradas
goatapi providers list --json

goatapi providers test <id|name>                  # Probar una conexión configurada
goatapi providers test-all                        # Probar cada conexión activa
goatapi providers validate                        # Validación estructural solo local
goatapi providers add <provider> --credential-env PROVIDER_KEY
goatapi providers import ./providers.json --dry-run --json
goatapi providers auth <provider>                 # Flujo OAuth existente
goatapi providers edit <id|name> --default-model <model>
goatapi providers remove <id|name> --yes
```

`providers add/import/auth/edit/remove` son API-first y, por lo tanto, funcionan contra
el contexto local o remoto activo. La entrada de credenciales debe usar
`--credential-stdin` o `--credential-env`; `--dry-run --json` informa solo
la presencia/forma redactada. `providers available` lee el catálogo de GoatAPI;
`providers list/test/test-all/validate` mantienen su comportamiento local de SQLite y
no requieren que el servidor esté en funcionamiento.

### Recuperación y Restablecimiento

```bash
goatapi reset-password                # Restablecer la contraseña del administrador (también: goatapi-reset-password)
goatapi reset-encrypted-columns       # Mostrar advertencia + prueba en seco para restablecimiento de credenciales encriptadas
goatapi reset-encrypted-columns --force  # Realmente anular las credenciales encriptadas en SQLite
```

### Exportación de Credenciales (⚠ manejar con cuidado)

```bash
goatapi auth export                                 # Mostrar advertencia + puerta de confirmación — sin acceso a DB
goatapi auth export --force                          # Exportar todas las credenciales DESENCRIPTADAS de las conexiones a stdout como JSON
goatapi auth export --force --id <id>                 # Exportar solo la conexión coincidente
goatapi auth export --force --format env               # Emitir líneas OMNIROUTE_<PROVIDER>_<FIELD>=<value>
goatapi auth export --force --out creds.json           # Escribir en un archivo (creado con permisos 0600)
```

`auth export` es **solo local** (lectura directa de SQLite, sin ruta HTTP) y deliberadamente imprime/escribe
valores **en texto plano** `apiKey`/`accessToken`/`refreshToken`/`idToken` — esa es la característica, no un
error. No se lee nada de la base de datos, y nada se desencripta, sin `--force`. Un banner de advertencia en stderr
siempre se imprime antes de que se emita cualquier texto plano. Requiere que `STORAGE_ENCRYPTION_KEY` esté
establecido. Un campo que no se puede desencriptar (clave obsoleta, texto cifrado corrupto) se informa como
`<field>DecryptFailed: true` en lugar de abortar toda la exportación o filtrar el error subyacente.

### Otros subcomandos

Estos asumen un servidor GoatAPI en funcionamiento, a menos que se indique lo contrario:

```bash
goatapi status                       # Estado de tiempo de ejecución integral
goatapi logs                         # Transmitir registros de solicitudes (--json, --search, --follow)
goatapi config show                  # Mostrar configuración actual

goatapi provider list                # Listar proveedores disponibles (alias de providers list)
goatapi provider add                 # Registrar GoatAPI como un proveedor en una herramienta
goatapi keys add | list | remove     # Gestionar claves API
goatapi models [provider]            # Listar modelos (--json, --search)
goatapi combo list | switch | create | delete

goatapi backup                       # Instantánea de configuración + DB
goatapi restore                      # Restaurar desde una instantánea anterior

goatapi health                       # Salud detallada (interruptores, caché, memoria)
goatapi quota                        # Uso de cuota del proveedor
goatapi cache                        # Estado de la caché
goatapi cache clear                  # Limpiar cachés semánticas + de firma

goatapi mcp status | restart         # Estado del servidor MCP / reiniciar
goatapi a2a status | card            # Estado del servidor A2A / tarjeta de agente

goatapi tunnel list | create | stop  # Gestionar túneles (cloudflare/tailscale/ngrok)
goatapi env show | get <k> | set <k> <v>  # Inspeccionar / establecer vars de entorno (temporal)

goatapi test                         # Prueba de conectividad del proveedor
goatapi update                       # Comprobar actualizaciones
goatapi completion                   # Generar finalización de shell
```

### Flags Comunes

| Flag                | Descripción                                               |
| ------------------- | --------------------------------------------------------- |
| `--no-open`         | No abrir automáticamente el navegador al iniciar          |
| `--port <n>`        | Sobrescribir el puerto API (por defecto 20128)            |
| `--mcp`             | Ejecutar como servidor MCP a través de stdio (para IDEs)  |
| `--non-interactive` | Modo CI (sin mensajes; lee de env/flags)                  |
| `--json`            | Salida JSON legible por máquina (doctor, providers, etc.) |
| `--help`, `-h`      | Mostrar ayuda específica del comando                      |
| `--version`, `-v`   | Imprimir la versión instalada                             |

## Puntos finales de API disponibles

| Endpoint                   | Descripción                           | Uso para                                     |
| -------------------------- | ------------------------------------- | -------------------------------------------- |
| `/v1/chat/completions`     | Chat estándar (todos los proveedores) | Todas las herramientas modernas              |
| `/v1/responses`            | API de respuestas (formato OpenAI)    | Codex, flujos de trabajo agenticos           |
| `/v1/completions`          | Completaciones de texto heredadas     | Herramientas más antiguas que usan `prompt:` |
| `/v1/embeddings`           | Embeddings de texto                   | RAG, búsqueda                                |
| `/v1/images/generations`   | Generación de imágenes                | GPT-Image, Flux, etc.                        |
| `/v1/audio/speech`         | Texto a voz                           | ElevenLabs, OpenAI TTS                       |
| `/v1/audio/transcriptions` | Voz a texto                           | Deepgram, AssemblyAI                         |

Ejemplos listos para pegar con una URL de GoatAPI tokenizada:

```txt
Ejemplo de token: sk-a3ab3c080beaee3a-69f4a4-070d71af

Base estándar de OpenAI: http://localhost:20128/v1
Modelos de VS Code: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/models
Chat de VS Code: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/chat/completions
Respuestas de VS Code: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/responses
Etiquetas de Ollama: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/tags
Chat de Ollama: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/chat
```

---

## Solución de problemas

| Error                                                     | Causa                            | Solución                                                   |
| --------------------------------------------------------- | -------------------------------- | ---------------------------------------------------------- |
| `Connection refused`                                      | GoatAPI no está en ejecución   | `goatapi serve`                                          |
| `401 Unauthorized`                                        | Clave API incorrecta             | Verificar en `/dashboard/api-manager`                      |
| `No combo configured`                                     | Sin combo de enrutamiento activo | Configurar en `/dashboard/combos`                          |
| CLI muestra "not installed"                               | Binario no en PATH               | Verificar `which <command>`                                |
| El panel muestra "not detected" después de la instalación | Caché obsoleta                   | Hacer clic en "⟳ Refresh detection" en el panel            |
| Enlace antiguo `/dashboard/cli-tools`                     | Marcador anterior a v3.8.6       | Redirigido automáticamente a `/dashboard/cli-code` (308)   |
| Enlace antiguo `/dashboard/agents`                        | Marcador anterior a v3.8.6       | Redirigido automáticamente a `/dashboard/acp-agents` (308) |
