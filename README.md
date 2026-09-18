# FlowtechAM

Site institucional da FlowtechAM com landing pages por serviço, diagnóstico
comercial, captura de leads e atribuição de campanhas.

## Funcionalidades

- Página institucional com diagnóstico guiado.
- Landing pages para sites, CRM com WhatsApp e sistemas sob medida.
- Captação e validação de leads antes da persistência.
- Redirecionamento para o WhatsApp com mensagem contextual.
- Registro *first-touch* de UTMs, `gclid`, `fbclid`, landing page e referência.
- Hero personalizado conforme a campanha de entrada.
- Eventos próprios, compatíveis com uma `dataLayer` já instalada.

## Tecnologias

- Next.js com App Router
- React e TypeScript
- PostgreSQL
- Zod
- GSAP e Motion
- ESLint
- Test runner nativo do Node.js

## Pré-requisitos

- Node.js e npm compatíveis com a versão do Next.js instalada
- PostgreSQL, caso queira persistir os leads

## Executando localmente

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Crie o arquivo local de configuração:

   ```bash
   cp .env.example .env.local
   ```

3. Preencha as variáveis em `.env.local`:

   ```env
   DATABASE_URL=postgresql://usuario:senha@localhost:5432/flowtech
   NEXT_PUBLIC_WHATSAPP_NUMBER=5592999999999
   ```

   O número do WhatsApp deve conter código do país e DDD, somente com dígitos.

4. Crie a estrutura do banco:

   ```bash
   psql "$DATABASE_URL" -f db/migrations/001_create_leads.sql
   ```

5. Inicie o ambiente de desenvolvimento:

   ```bash
   npm run dev
   ```

6. Acesse [http://localhost:3000](http://localhost:3000).

Sem `DATABASE_URL`, o site pode ser visualizado normalmente, mas o endpoint de
leads responderá com indisponibilidade. Sem `NEXT_PUBLIC_WHATSAPP_NUMBER`, o
link final para o WhatsApp não será gerado.

## Rotas

| Rota | Descrição |
| --- | --- |
| `/` | Página institucional e diagnóstico principal |
| `/sites` | Landing page para criação e melhoria de sites |
| `/crm-whatsapp` | Landing page para CRM e processo comercial |
| `/sistemas` | Landing page para sistemas e automações |
| `/cases` | Apresentação de projetos e soluções |
| `/api/leads` | Endpoint `POST` para criação de leads |

## Fluxo do lead

```text
Campanha → Landing page → Diagnóstico → Lead → WhatsApp
                                      └→ PostgreSQL
```

O endpoint `POST /api/leads` valida os dados com Zod, ignora silenciosamente o
campo-isca `website` quando preenchido e grava leads válidos com o status
inicial `NEW`.

Os estados previstos para evolução comercial são `NEW`, `QUALIFIED`,
`MEETING_BOOKED`, `PROPOSAL_SENT`, `WON` e `LOST`.

## Atribuição de campanhas

São reconhecidos os parâmetros:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`
- `gclid`
- `fbclid`

O primeiro acesso que contém algum desses parâmetros é salvo no `localStorage`
como *first-touch* e não é sobrescrito durante a jornada. Na conversão, o site
envia a atribuição, a primeira landing page, o *referrer* e os horários junto ao
lead.

Exemplo de URL:

```text
http://localhost:3000/crm-whatsapp?utm_source=meta&utm_medium=paid&utm_campaign=crm_whatsapp&utm_content=followup
```

## Eventos

A função `trackEvent` emite o evento de navegador `flowtech:event` e, quando
existe uma `window.dataLayer`, também envia os dados para ela.

Eventos usados pelo site:

- `landing_view`
- `service_view`
- `cta_click`
- `diagnostic_start`
- `diagnostic_step`
- `diagnostic_complete`
- `whatsapp_click`
- `lead_created`
- `qualified_lead`

`meeting_booked`, `proposal_sent` e `deal_won` estão tipados para integrações
futuras, mas não são disparados sem uma ação comercial real. Este repositório
não instala GA4, GTM, Meta Pixel ou outra ferramenta de analytics.

## Estrutura do projeto

```text
app/                 Páginas, layout e endpoint da aplicação
components/
  layout/            Navegação e rodapé
  sections/          Seções das páginas
  ui/                Componentes e contextos compartilhados
config/              Configurações públicas da aplicação
db/migrations/       Estrutura versionada do PostgreSQL
lib/                 Regras de domínio, validação, analytics e banco
tests/               Testes unitários
```

As regras sem dependência de interface ficam em `lib/`; os componentes não
acessam o PostgreSQL diretamente. A única entrada de persistência é a rota
`/api/leads`, que usa `lib/db.ts`.

## Scripts

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera a versão de produção |
| `npm run lint` | Verifica o padrão do código |
| `npm run typecheck` | Verifica os tipos TypeScript |
| `npm test` | Executa os testes unitários |

Antes de publicar uma alteração, execute:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Deploy

O projeto pode ser hospedado em qualquer ambiente compatível com Next.js.
Configure `DATABASE_URL` e `NEXT_PUBLIC_WHATSAPP_NUMBER` no provedor, aplique a
migração do banco e execute `npm run build`.

Não envie arquivos `.env` ao Git. O `.gitignore` já bloqueia esses arquivos e
mantém apenas o `.env.example` como referência.
