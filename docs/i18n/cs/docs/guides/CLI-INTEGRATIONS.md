# CLI-INTEGRATIONS (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [in](../../../in/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

---

title: "CLI Integrace — nasměrujte jakýkoli kódovací CLI na GoatAPI"
version: 3.8.50
lastUpdated: 2026-08-18
---

# CLI Integrace

GoatAPI dodává rodinu příkazů `setup-*`, které konfiguruje kódovací
CLI (Codex, Claude Code, OpenCode, Cline, …) pro použití GoatAPI jako svého backendu — takže
nástroj komunikuje s **jedním** koncovým bodem a GoatAPI směruje k správnému poskytovateli s
automatickým zálohováním. Každý příkaz čte **živý** katalog modelů z běžícího
GoatAPI (místního nebo vzdáleného) a zapisuje vlastní konfigurační soubor nástroje na **vašem**
počítači. API klíč je odkazován proměnnou prostředí, kdekoliv to nástroj podporuje. Příkazy, které uchovávají místní soubor prostředí nástroje, jsou uvedeny níže.

K dispozici je také generický spouštěč — `goatapi run <target>` — který spouští
`claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` nebo `gemini` s
odpovídajícím prostředím, aniž by zapisoval jakoukoli konfiguraci. Cíle a jejich
aliasy pocházejí z kanonického manifestu `bin/cli/cli-manifest.mjs`
(`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`,
`open-code`, `qwen-code`, `gemini-cli`), a `goatapi completion` nabízí
stejné cílové výrazy odvozené z manifestu. Dědictví per-tool spouštěče —
`goatapi launch` (Claude Code) a `goatapi launch-codex` (Codex) — zůstávají
k dispozici.

Onboarding poskytovatele je k dispozici ze stejného místního/vzdáleného kontextu. Příkazy
API-first níže udržují autentizaci správy oddělenou od pověření poskytovatele a nikdy
nevytištějí pověření ve strukturovaném výstupu:

```bash
goatapi providers add glm --credential-env GLM_API_KEY --name work
goatapi providers import ./providers.json --dry-run --json
goatapi providers auth openai
goatapi providers edit <connection-id> --default-model glm/glm-5.2
goatapi providers remove <connection-id> --yes
```

Pro skripty preferujte `--credential-stdin` nebo `--credential-env`; `--credential`
je zachováno pro kontrolované místní použití. `providers remove` vyžaduje `--yes` na
neinteraktivním terminálu a všech pět příkazů ctí aktivní kontext nebo globální
možnosti `--base-url`/`--api-key`.

Pro jednorázové, ručně psané základní nastavení dvou nejbohatších integrací viz
hloubkové analýzy per-tool:

- [Konfigurace Claude Code](./CLAUDE-CODE-CONFIGURATION.md)
- [Konfigurace Codex CLI](./CODEX-CLI-CONFIGURATION.md)
- [Vzdálený režim](./REMOTE-MODE.md) — ovládejte vzdálený GoatAPI (VPS / Tailnet) ze svého laptopu
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — rozšíření OmniCopilot; může také spouštět tyto
  `setup-*` příkazy za vás zevnitř editoru

---

## Hlavní tabulka

Každý příkaz ctí **aktivní kontext** (nastavený pomocí `goatapi connect`, viz
[Remote Mode](./REMOTE-MODE.md)) nebo explicitní příznaky `--remote <url> --api-key <key>`.
"Lokální vs vzdálený" níže znamená: bez příznaků cílí na `http://localhost:20128`;
s `--remote` (nebo aktivním vzdáleným kontextem) získává katalog z tohoto
serveru a zapisuje konfiguraci lokálně.

| Příkaz                     | Nástroj                        | Co zapisuje                                                                                                                                                       | Klíčové příznaky                                                                                                                           | Lokální vs vzdálený |
| -------------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------- |
| `goatapi setup-codex`    | OpenAI Codex CLI               | `~/.codex/<name>.config.toml` — jeden profil pro každý kompatibilní textový model (`codex --profile <name>`)                                                      | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Oba                 |
| `goatapi setup-claude`   | Claude Code                    | `~/.claude/profiles/<name>/settings.json` — jeden profil pro každý odpovídající model (`CLAUDE_CONFIG_DIR`)                                                       | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Oba                 |
| `goatapi setup-opencode` | OpenCode (openai-kompatibilní) | `~/.config/opencode/opencode.json` — `goatapi` poskytovatel se všemi modely katalogu (`opencode -m goatapi/<model>`)                                          | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Oba                 |
| `goatapi setup-cline`    | Cline                          | `~/.cline/data/{globalState,secrets}.json` (CLI režim) + tiskne nastavení rozšíření VS Code                                                                       | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Oba                 |
| `goatapi setup-kilo`     | Kilo Code                      | `~/.local/share/kilo/auth.json` (CLI) + slučuje `kilocode.*` do `settings.json` VS Code, pokud je přítomno                                                        | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Oba                 |
| `goatapi setup-continue` | Continue / `cn` CLI            | `~/.continue/config.yaml` — `provider: openai` modely, klíč přes `${{ secrets.OMNIROUTE_API_KEY }}`                                                               | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Oba                 |
| `goatapi setup-cursor`   | Cursor                         | Nic — tiskne kroky v aplikaci (konfigurace Cursor je neprůhledná SQLite)                                                                                          | `--remote` `--api-key` `--only` `--port`                                                                                                   | Oba                 |
| `goatapi setup-roo`      | Roo Code                       | `~/.goatapi/roo-settings.json` (import doc) + nastaví `roo-cline.autoImportSettingsPath`, pokud existuje `settings.json` VS Code                                | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Oba                 |
| `goatapi setup-crush`    | Crush                          | `~/.config/crush/crush.json` — `openai-compat` poskytovatel, klíč přes `$OMNIROUTE_API_KEY`                                                                       | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Oba                 |
| `goatapi setup-goose`    | Goose                          | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + tiskne recept pro prostředí                                                        | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Oba                 |
| `goatapi setup-aider`    | Aider                          | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + tiskne recept pro prostředí                                                                      | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Oba                 |
| `goatapi setup-qwen`     | Qwen Code                      | `~/.qwen/settings.json` — V4 `modelProviders.openai` pole + `OMNIROUTE_API_KEY` v `~/.qwen/.env`                                                                  | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Oba                 |
| `goatapi run <target>`   | Runtime launch (generic)       | Nic — spouští `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` s odpovídajícím prostředím a argumenty; Qwen a Gemini používají dočasný izolovaný domov | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Oba                 |
| `goatapi launch`         | Claude Code                    | Nic — spouští `claude` s `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN` injektovaným                                                                                 | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Oba                 |
| `goatapi launch-codex`   | OpenAI Codex CLI               | Nic — spouští `codex` s poskytovatelem `goatapi` injektovaným pomocí `-c` příznaků                                                                              | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Oba                 |

Poznámky k příznakům (ověřeno ve zdroji příkazů):

- `--remote <url>` — získává katalog z vzdáleného GoatAPI (přepisuje `--port`
  a aktivní kontext). `--api-key <key>` dodává pověření pro tento
  server (výchozí hodnota je proměnná prostředí `OMNIROUTE_API_KEY`, nebo token aktivního kontextu).
- `--only <patterns>` — čárkami oddělené podřetězce; uchová pouze ID modelů, které odpovídají
  (např. `--only glm,kimi`). K dispozici na `setup-codex`, `setup-claude`,
  `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`.
- `--dry-run` — tiskne přesně to, co by bylo zapsáno, aniž by se dotýkalo
  souborového systému. K dispozici na každém příkazu `setup-*` **kromě** `setup-cursor`
  (který nikdy nezapisuje soubor).
- `--model <id>` — vyžaduje se (nebo se vybírá interaktivně) pro nástroje, které nemají
  automatické objevování modelů: Cline, Kilo, Roo, Goose, Qwen, Aider. Tyto nástroje
  také přijímají `--yes` pro neinteraktivní běhy (což pak vyžaduje `--model`).
  `setup-opencode` bere `--model` pro nastavení výchozího nejvyššího modelu.
- `--model <id>` na `goatapi run` následuje propojení per-target manifestu
  (`bin/cli/cli-manifest.mjs`): **aider** přijímá `--model openai/<id>` a
  **opencode** `--model goatapi/<id>` (prefix je přidán pouze tehdy, když id
  jej již nenese); **qwen** a **gemini** přijímají id doslovně;
  **claude** jej získává přes `ANTHROPIC_MODEL`, **goose** přes `GOOSE_MODEL`, a
  **codex** přes `-c model_providers.goatapi.*` argumenty. **Qwen je jediným cílem běhu,
  který tvrdě vyžaduje `--model`** — `goatapi run qwen` bez něj končí
  `2` s explicitní chybou.
- `--port <port>` — místní port GoatAPI (výchozí `20128`, ignorováno, když je nastaveno `--remote`).
  Přítomno na všech `setup-*` a obou spouštěčích.
- Kódy ukončení `goatapi run`: vlastní kód ukončení podřízeného CLI je propagován
  doslovně; `2` = neplatné argumenty (nepodporovaný cíl, chybějící požadovaný
  `--model`, ochrana kontejneru); `127` = cílový binární soubor není v `PATH`;
  `130`/`143`/`129`, když je spuštění ukončeno `SIGINT`/`SIGTERM`/`SIGHUP`;
  `1` = jiná chyba při spuštění.
- Dva spouštěče (`launch`, `launch-codex`) přijímají `--profile <name>` pro výběr
  profilu napsaného pomocí `setup-claude` / `setup-codex`, plus předávací argumenty pro
  podkladový `claude` / `codex` binární soubor.

Interaktivní výběr je také sdílen recepty nastavení:

```bash
# Vyberte z aktivního místního nebo vzdáleného katalogu modelů a nakonfigurujte cíl.
goatapi configure claude
goatapi configure opencode --provider glm
goatapi configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` v současnosti deleguje na testované recepty pro `codex`, `claude`,
`opencode`, `qwen`, `aider`, `goose`, `cline`, `continue` a `kilo`. Pouze pro IDE,
MITM a pouze pro průvodce záznamy zůstávají explicitní `setup-*`/manuální toky a
nejsou prezentovány jako spouštěcí cíle.

> `setup-opencode` je **lehká openai-kompatibilní** integrace OpenCode.
> K dispozici je také bohatší pluginová integrace — `goatapi setup opencode` — která
> instaluje `@goatapi/opencode-plugin`. Jsou to různé příkazy; tabulka
> výše dokumentuje `setup-opencode`.

---

## Místní použití

S GoatAPI běžícím na `localhost:20128`, stačí spustit příkaz pro nastavení vašeho
nástroje. Katalog je načten z místního serveru.

```bash
# Codex: zapisuje profil pro každý shodný model do ~/.codex/
goatapi setup-codex
codex --profile glm52            # použijte vygenerovaný profil

# Claude Code: zapisuje profily pro každý model, poté spustí jeden
goatapi setup-claude
goatapi launch --profile glm52

# OpenCode: zapisuje poskytovatele kompatibilního s openai se všemi modely katalogu
goatapi setup-opencode
export OMNIROUTE_API_KEY=sk-...  # odkazováno přes {env:OMNIROUTE_API_KEY}, nikdy na disku
opencode -m goatapi/glm/glm-5.2 "..."

# Nástroje bez automatického objevování potřebují explicitní model:
goatapi setup-aider --model glm/glm-5.2
goatapi setup-qwen --model qwen/qwen3.8-max-preview

# Náhled bez zápisu čehokoliv:
goatapi setup-continue --dry-run
```

Spusťte bez zápisu jakékoli konfigurace (pouze injekce prostředí):

```bash
goatapi launch                 # Claude Code → místní GoatAPI
goatapi launch-codex           # Codex CLI → místní GoatAPI
goatapi launch-codex --profile glm52
goatapi run claude --model openai/gpt-5.4
goatapi run codex --model openai/gpt-5.4 --dry-run --json
goatapi run aider --model glm/glm-5.2 -- --message "odpověď OK"
goatapi run goose --model glm/glm-5.2
goatapi run opencode --model glm/glm-5.2 -- run "odpověď OK"
goatapi run qwen --model glm/glm-5.2 -- -p "odpověď OK"
goatapi run gemini --model glm/glm-5.2 -- --skip-trust -p "odpověď OK"

# Explicitní cesta příkazu: předat cokoliv, co přijde po --
goatapi run claude -- --print-system-prompt "zkontrolujte tento rozdíl"
```

---

## Vzdálené použití

Nasměrujte jakýkoli příkaz pro nastavení na vzdálený GoatAPI s `--remote` + `--api-key`. Katalog je načten ze vzdáleného serveru; konfigurace je zapsána na vašem místním počítači.

```bash
# OpenCode proti vzdálenému VPS, ponechte pouze glm/kimi modely
goatapi setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m goatapi/glm/glm-5.2 "..."   # nejprve exportujte OMNIROUTE_API_KEY

# Profily Codex z vzdáleného katalogu
goatapi setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Spusťte CLI přímo proti vzdálenému
goatapi launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
goatapi launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Místo předávání `--remote`/`--api-key` pokaždé, přihlaste se jednou a nechte
**aktivní kontext** je dodávat automaticky:

```bash
goatapi connect 192.168.0.15        # vytvoří token s omezeným rozsahem, uloží kontext
goatapi setup-codex                 # ← nyní používá vzdálený katalog
goatapi setup-opencode              # ← stejné
goatapi launch                      # ← Claude Code proti vzdálenému
```

Viz [Vzdálený režim](./REMOTE-MODE.md) pro kontexty, rozsahy a správu tokenů.

---

## Konvence základní URL (které nástroje chtějí `/v1`)

GoatAPI vystavuje OpenAI rozhraní na `/v1`, Anthropic rozhraní na kořenové úrovni,
a nativní Gemini rozhraní na `/v1beta`. Každá integrace je připojena k formátu, který
je pro její nástroj očekáván (ověřeno ve zdroji příkazu):

| Integrace                                                                  | Základní URL zapsáno | `/v1`?                                      |
| -------------------------------------------------------------------------- | -------------------- | ------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | kořen                | Ne — Cline přidává `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | kořen                | Ne — Goose přidává cestu                    |
| `setup-aider` (`OPENAI_API_BASE`)                                          | kořen                | Ne — LiteLLM přidává `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | s `/v1`              | Ano                                         |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | kořen                | Ne — Claude Code přidává `/v1/messages`     |
| `setup-codex`, `launch-codex` (`model_providers.goatapi.base_url`)       | s `/v1`              | Ano                                         |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | s `/v1`              | Ano                                         |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | kořen                | Ne — SDK přidává `/v1beta/models/…`         |

---

## Udržování nativních závislostí při aktualizaci: `--include=optional`

Když aktualizujete pomocí `goatapi update` (po potvrzení nebo s `--apply`),
GoatAPI spouští instalaci s `--include=optional` zabudovaným:

```bash
npm install -g goatapi@latest --include=optional
```

To **není** příznak, který předáváte `goatapi update` — je vždy aplikován
aktualizátorem. Zaručuje, že `optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client`, LLMLingua SLM stack) přežijí aktualizaci, i když je vaše npm konfigurace
nastavena na `omit=optional`, což by jinak tiše odstranilo nativní SQLite
ovladač a vazbu na OS-keyring. Chcete-li si prohlédnout přesný příkaz bez aplikace:

```bash
goatapi update --dry-run
# [DRY RUN] By běžel: npm install -g goatapi@latest --include=optional
```

Další příznaky `goatapi update` (ověřeno ve zdrojovém kódu): `--check` (ukončí s 1, pokud
je zastaralý), `--apply` (nainstaluje bez výzvy), `--changelog`, `--no-backup`,
`--yes`.

---

## Google Gemini CLI přes `goatapi run gemini`

Smlouva ověřena proti `@google/gemini-cli` 0.50.0: CLI respektuje
`GOOGLE_GEMINI_BASE_URL` a vydává `POST /v1beta/models/<model>:generateContent`
(a `:streamGenerateContent?alt=sse`) proti němu — přesně jako nativní
Gemini rozhraní GoatAPI (`/v1beta`). `goatapi run gemini` to automaticky
propojuje:

- `GOOGLE_GEMINI_BASE_URL` → aktivní základní URL GoatAPI (kořen, žádné `/v1`);
- `GEMINI_API_KEY` → vyřešené pověření GoatAPI (volba/env/context);
- **dočasný izolovaný `GEMINI_CLI_HOME`**, jehož `.gemini/settings.json`
  vybírá autentizaci `gemini-api-key`, takže uložená relace Google OAuth (Code Assist)
  nikdy nepřepíše spuštění řízené GoatAPI — odstraněno po ukončení;
- **hygiena prostředí**: dětské prostředí je očištěno od `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` a `GOOGLE_GENAI_USE_GCA` (což by přesměrovalo
  autentizaci na Vertex/Code Assist), a `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` je
  nastaven jako záložní — ostatní cíle `run` dostávají stejnou
  péči pro své vlastní konfliktní proměnné;
- injekce `--model <id>` z `--provider`/`--model`.

```bash
goatapi run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Ochrana důvěry pracovního prostoru Gemini stále platí v bezhlavém režimu — předejte
`--skip-trust` (nebo důvěřujte adresáři interaktivně) sami; spouštěč
úmyslně neobchází tuto ochranu. Tento spouštěč je odlišný od **registrace ACP**
(`src/lib/acp/registry.ts`, `gemini --acp`), která zůstává integrací agent-protokolu pro
`/dashboard/acp-agents`.

---

## Skutečné kouřové testy (opt-in)

Deterministické regresní testy plánu spuštění v CI (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). Pro ověření SKUTEČNÝCH binárních souborů proti SKUTEČNÉMU
serveru GoatAPI existuje opt-in rámec na
`tests/integration/upstream-cli-smoke.int.test.ts`. Nikdy se nespouští automaticky
(všechny podtesty přeskočí, pokud není `RUN_CLI_SMOKE=1`), předává pověření pomocí env-var
NAME (nikdy podle hodnoty), rediguje klíčové řetězce z jakéhokoli zaznamenaného výstupu, přeskočí
cíle, jejichž binární soubor není nainstalován, a klasifikuje selhání jako
auth / upstream / config místo holého booleanu:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Volitelně: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` omezuje testování;
`OMNIROUTE_SMOKE_TIMEOUT_MS` přepisuje časový limit 120s na cíl.

## Viz také

- [Konfigurace Claude Code](./CLAUDE-CODE-CONFIGURATION.md) — hlubší průvodce Claude Code
- [Konfigurace Codex CLI](./CODEX-CLI-CONFIGURATION.md) — jednorázové základní nastavení `[model_providers.goatapi]`
- [Vzdálený režim](./REMOTE-MODE.md) — kontexty, přístupové tokeny s omezeným rozsahem, ovládání vzdáleného serveru
- [Reference nástrojů CLI](../reference/CLI-TOOLS.md) — kompletní katalog podporovaných nástrojů + stránky řídicího panelu
- [Průvodce nastavením](./SETUP_GUIDE.md) — metody instalace a onboarding při prvním spuštění
