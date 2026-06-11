import integrationNamesRaw from "./integration-names.txt?raw";

export type Integration = {
  name: string;
  iconUrl?: string;
  popular?: boolean;
};

const ICON_URLS: Record<string, string> = {
  Notion: "/integrations/notion.webp",
  Apollo: "https://assets.pipedream.net/s.v0/app_xohxll/logo/orig",
  "Apollo (API Key)": "https://assets.pipedream.net/s.v0/app_168hbN/logo/orig",
  Amplitude: "https://assets.pipedream.net/s.v0/app_XBxh84/logo/orig",
  Mixpanel: "https://assets.pipedream.net/s.v0/app_1M0h0d/logo/orig",
  Datadog: "https://assets.pipedream.net/s.v0/app_168hBq/logo/orig",
  Intercom: "https://assets.pipedream.net/s.v0/app_1pbh0B/logo/orig",
  Zendesk: "https://assets.pipedream.net/s.v0/app_1pbhGX/logo/orig",
  Front: "https://assets.pipedream.net/s.v0/app_1NohJg/logo/orig",
  Gong: "https://assets.pipedream.net/s.v0/app_E7h2va/logo/orig",
  Vercel: "https://assets.pipedream.net/s.v0/app_XaLh2x/logo/orig",
  Brex: "https://assets.pipedream.net/s.v0/app_OrZhwv/logo/orig",
  Ramp: "https://assets.pipedream.net/s.v0/app_m02h8Z/logo/orig",
  QuickBooks:
    "https://integration-icon-worker.peter-272.workers.dev/icon/quickbooks?domain=zetalabs-ai-prod--quickbooks-mcp-server-quickbooks-mcp-server.modal.run&size=128",
  Mercury: "https://assets.pipedream.net/s.v0/app_mjEhzK/logo/orig",
  "QuickBooks Sandbox": "https://assets.pipedream.net/s.v0/app_mqeh3x/logo/orig",
  Gusto: "https://assets.pipedream.net/s.v0/app_X2RhP8/logo/orig",
  Rippling: "https://assets.pipedream.net/s.v0/app_OVWhGl/logo/orig",
  Greenhouse: "https://assets.pipedream.net/s.v0/app_OrZhV7/logo/orig",
  Ashby: "https://assets.pipedream.net/s.v0/app_xohxKJ/logo/orig",
  ClickUp: "https://assets.pipedream.net/s.v0/app_1NohVg/logo/orig",
  Clockify: "https://assets.pipedream.net/s.v0/app_XywhJz/logo/orig",
  Supabase: "https://supabase.com/favicon/favicon-32x32.png",
  Granola:
    "https://integration-icon-worker.peter-272.workers.dev/icon/granola?domain=mcp.granola.ai&size=128",
  "Moz SEO":
    "https://integration-icon-worker.peter-272.workers.dev/icon/mozseo?domain=zetalabs-ai-prod--moz-mcp-server-moz-mcp-server.modal.run&size=128",
  "Customer.io":
    "https://integration-icon-worker.peter-272.workers.dev/icon/customerio?domain=zetalabs-ai-prod--customerio-mcp-server-customerio-mcp-server.modal.run&size=128",
  "Bright Data Social":
    "https://integration-icon-worker.peter-272.workers.dev/icon/brightdatasocial?domain=zetalabs-ai-prod--brightdata-mcp-server-brightdata-mcp-server.modal.run&size=128",
  Baremetrics:
    "https://integration-icon-worker.peter-272.workers.dev/icon/baremetrics?domain=zetalabs-ai-prod--baremetrics-mcp-server-baremetrics-mcp-server.modal.run&size=128",
  NeonPanel:
    "https://integration-icon-worker.peter-272.workers.dev/icon/neonpanel?domain=mcp.neonpanel.com&size=128",
  "Rent A Human":
    "https://integration-icon-worker.peter-272.workers.dev/icon/rentahuman?domain=rentahuman.ai&size=128",
  "OpenAI (ChatGPT)": "https://assets.pipedream.net/s.v0/app_mWnhBo/logo/orig",
  "Google Sheets": "https://assets.pipedream.net/s.v0/app_168hvn/logo/orig",
  Telegram: "https://assets.pipedream.net/s.v0/app_OD5hL6/logo/orig",
  "HTTP / Webhook": "https://assets.pipedream.net/s.v0/app_X7LhNG/logo/orig",
  "Google Calendar": "https://assets.pipedream.net/s.v0/app_13Gh2V/logo/orig",
  Schedule: "https://assets.pipedream.net/s.v0/app_XaLhW4/logo/orig",
  "Pipedream Utils": "https://assets.pipedream.net/s.v0/app_z6hGPq/logo/orig",
  MySQL: "https://assets.pipedream.net/s.v0/app_1YMhwo/logo/orig",
  PostgreSQL: "https://assets.pipedream.net/s.v0/app_1M0hNB/logo/orig",
  AWS: "https://assets.pipedream.net/s.v0/app_Xe3hD1/logo/orig",
  "Twilio SendGrid": "https://assets.pipedream.net/s.v0/app_XKvh3O/logo/orig",
  "Amazon SES": "https://assets.pipedream.net/s.v0/app_m5ghj5/logo/orig",
  "Klaviyo (API Key)": "https://assets.pipedream.net/s.v0/app_X2Rhjl/logo/orig",
  "Microsoft Teams": "https://assets.pipedream.net/s.v0/app_1M0hlk/logo/orig",
  "Zoho CRM": "https://assets.pipedream.net/s.v0/app_XaLh9K/logo/orig",
  WooCommerce: "https://assets.pipedream.net/s.v0/app_OkrhMy/logo/orig",
  Snowflake: "https://assets.pipedream.net/s.v0/app_mWnh8j/logo/orig",
  MongoDB: "https://assets.pipedream.net/s.v0/app_mvNhea/logo/orig",
  Pinterest: "https://assets.pipedream.net/s.v0/app_X7Lh9Z/logo/orig",
  "Azure OpenAI": "https://assets.pipedream.net/s.v0/app_n5hvaY/logo/orig",
  Formatting: "https://assets.pipedream.net/s.v0/app_Xywhwd/logo/orig",
  Exa: "https://assets.pipedream.net/s.v0/app_7Lho5x/logo/orig",
  Airtable: "https://assets.pipedream.net/s.v0/app_XBxhAl/logo/orig",
  Zoom: "https://assets.pipedream.net/s.v0/app_m5ghAd/logo/orig",
  Gmail: "https://assets.pipedream.net/s.v0/app_OQYhq7/logo/orig",
  "Zoom Admin": "https://assets.pipedream.net/s.v0/app_13GhxE/logo/orig",
  Twilio: "https://assets.pipedream.net/s.v0/app_mE7hqO/logo/orig",
  "YouTube Data": "https://assets.pipedream.net/s.v0/app_XKvhQ3/logo/orig",
  Spotify: "https://assets.pipedream.net/s.v0/app_mqeh75/logo/orig",
  "Google Forms": "https://assets.pipedream.net/s.v0/app_mvNh0K/logo/orig",
  Typeform: "https://assets.pipedream.net/s.v0/app_X8PhGQ/logo/orig",
  "Helper Functions": "https://assets.pipedream.net/s.v0/app_OD5h3W/logo/orig",
  Jotform: "https://assets.pipedream.net/s.v0/app_mqehaz/logo/orig",
  Dropbox: "https://assets.pipedream.net/s.v0/app_XGehk1/logo/orig",
  Trello: "https://assets.pipedream.net/s.v0/app_168hnX/logo/orig",
  "Firebase Admin": "https://assets.pipedream.net/s.v0/app_XBxhPD/logo/orig",
  Discord: "https://assets.pipedream.net/s.v0/app_13GhGn/logo/orig",
  Google: "https://assets.pipedream.net/s.v0/app_m02hPO/logo/orig",
  Reddit: "https://assets.pipedream.net/s.v0/app_mo7hbd/logo/orig",
  Mailchimp: "https://assets.pipedream.net/s.v0/app_mE7h2q/logo/orig",
  "Shopify ": "https://assets.pipedream.net/s.v0/app_X7Lhpm/logo/orig",
  Shopify: "https://assets.pipedream.net/s.v0/app_X7Lhpm/logo/orig",
  "Discord Bot": "https://assets.pipedream.net/s.v0/app_OQYhyP/logo/orig",
  Mailgun: "https://assets.pipedream.net/s.v0/app_1P6hVZ/logo/orig",
  Twitch: "https://assets.pipedream.net/s.v0/app_1lxhDk/logo/orig",
  "Google Analytics": "https://assets.pipedream.net/s.v0/app_mJQh5A/logo/orig",
  LinkedIn: "https://assets.pipedream.net/s.v0/app_1dBhRX/logo/orig",
  Netlify: "https://assets.pipedream.net/s.v0/app_1w0hvd/logo/orig",
  ActiveCampaign: "https://assets.pipedream.net/s.v0/app_OrZhQA/logo/orig",
  "Google Cloud": "https://assets.pipedream.net/s.v0/app_mvNhoj/logo/orig",
  Pipedrive: "https://assets.pipedream.net/s.v0/app_1lxhdk/logo/orig",
  Bitbucket: "https://assets.pipedream.net/s.v0/app_XbPhz1/logo/orig",
  GitLab: "https://assets.pipedream.net/s.v0/app_1Z2hw1/logo/orig",
  "Google Docs": "https://assets.pipedream.net/s.v0/app_1pbh98/logo/orig",
  Pushover: "https://assets.pipedream.net/s.v0/app_X7LhbW/logo/orig",
  Todoist: "https://assets.pipedream.net/s.v0/app_mWnhpj/logo/orig",
  Fauna: "https://assets.pipedream.net/s.v0/app_Oz6hle/logo/orig",
  "Microsoft Graph API": "https://assets.pipedream.net/s.v0/app_mArhjw/logo/orig",
  "Dev.to": "https://assets.pipedream.net/s.v0/app_mArhYr/logo/orig",
  Amazon: "https://assets.pipedream.net/s.v0/app_1w0hdO/logo/orig",
  "LINE Messaging": "https://assets.pipedream.net/s.v0/app_E7h2ay/logo/orig",
  Giphy: "https://assets.pipedream.net/s.v0/app_1dBhwR/logo/orig",
  Blogger: "https://assets.pipedream.net/s.v0/app_OkrhoY/logo/orig",
  Calendly: "https://assets.pipedream.net/s.v0/app_Oz6h0D/logo/orig",
  IFTTT: "https://assets.pipedream.net/s.v0/app_1w0hxK/logo/orig",
  "People Data Labs": "https://assets.pipedream.net/s.v0/app_mLNh40/logo/orig",
  Coda: "https://assets.pipedream.net/s.v0/app_XywhN1/logo/orig",
  Coinbase: "https://assets.pipedream.net/s.v0/app_OQYh7O/logo/orig",
  Figma: "https://assets.pipedream.net/s.v0/app_OkrhRR/logo/orig",
  HubSpot: "https://assets.pipedream.net/s.v0/app_XGehRR/logo/orig",
  Slack: "https://assets.pipedream.net/s.v0/app_OQYhRR/logo/orig",
};

const POPULAR_NAMES = new Set(
  integrationNamesRaw
    .trim()
    .split("\n")
    .slice(0, 42)
    .map((name) => name.trim())
    .filter(Boolean),
);

const allNames = integrationNamesRaw
  .trim()
  .split("\n")
  .map((name) => name.trim())
  .filter(Boolean);

export const INTEGRATION_COUNT = allNames.length;

export const integrations: Integration[] = allNames.map((name) => ({
  name,
  iconUrl: ICON_URLS[name],
  popular: POPULAR_NAMES.has(name),
}));
