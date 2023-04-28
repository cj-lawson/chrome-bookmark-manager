import type { Manifest } from "webextension-polyfill";
import pkg from "../package.json";

const manifest: Manifest.WebExtensionManifest = {
  manifest_version: 3,
  name: pkg.displayName,
  version: pkg.version,
  description: pkg.description,
  options_ui: {
    page: "src/pages/options/index.html",
  },
  background: {
    service_worker: "src/pages/background/index.js",
    type: "module",
  },
  permissions: ["bookmarks"],
  action: {
    default_popup: "src/pages/popup/index.html",
    default_icon: "icon-34.png",
  },
  chrome_url_overrides: {
    newtab: "src/pages/newtab/index.html",
  },
  icons: {
    "128": "icon-128.png",
  },
  content_scripts: [
    {
      matches: ["<all_urls>"],
      js: ["src/pages/content/index.js"],
      css: ["contentStyle.css"],
    },
  ],
  devtools_page: "src/pages/devtools/index.html",
  web_accessible_resources: [
    {
      resources: ["contentStyle.css"],
      matches: [],
      extension_ids: ["*"],
    },
  ],
};

export default manifest;
