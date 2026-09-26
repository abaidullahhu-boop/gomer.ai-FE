/**
 * Turns a page Gaspo wrote into the document the runtime frames.
 *
 * A page is generated code, so it only ever runs inside an iframe sandboxed
 * without `allow-same-origin`: an opaque origin that cannot read this site's
 * storage (where the session tokens live), cookies or DOM. On top of that the
 * document gets:
 *
 * - a Content-Security-Policy allowing no network requests at all, and scripts,
 *   styles and fonts only from the public CDNs the model is told it may use;
 * - `window.gaspo.state`, what the page remembers (ticked steps, inputs), saved
 *   for the whole team by the parent, which it reaches by postMessage;
 * - a stand-in localStorage kept in that same state, because a sandboxed frame
 *   has none and pages written for an ordinary browser reach for it;
 * - checkboxes remembered for the whole team without the page wiring them up,
 *   since a plan's ticks must survive a reload whether or not the model
 *   remembered to save them (a page opts a box out with data-gaspo-ignore);
 * - on phones, wide tables scroll sideways instead of widening the page;
 * - link handling: outbound links open a new tab, since the frame may not
 *   navigate the tab itself, and in-page anchors scroll.
 */

const CDNS = [
  "https://cdn.jsdelivr.net",
  "https://cdnjs.cloudflare.com",
  "https://unpkg.com",
  "https://esm.sh",
  "https://cdn.tailwindcss.com",
].join(" ");

export const PAGE_CSP = [
  "default-src 'none'",
  `script-src 'unsafe-inline' 'unsafe-eval' ${CDNS}`,
  `style-src 'unsafe-inline' ${CDNS} https://fonts.googleapis.com`,
  `font-src data: ${CDNS} https://fonts.gstatic.com`,
  "img-src data: blob: https:",
  "media-src data: blob: https:",
  "connect-src 'none'",
  "worker-src blob:",
  "frame-src 'none'",
  "form-action 'none'",
  "base-uri 'none'",
].join("; ");

/** What a page posts to the runtime when it saves something. */
export interface PageStateMessage {
  channel: "gaspo-page";
  type: "state:set";
  key: string;
  value: unknown;
}

export function isPageStateMessage(data: unknown): data is PageStateMessage {
  if (typeof data !== "object" || data === null) return false;
  const message = data as Record<string, unknown>;
  return (
    message.channel === "gaspo-page" &&
    message.type === "state:set" &&
    typeof message.key === "string" &&
    message.key.length > 0 &&
    message.key.length <= 200
  );
}

/** On a phone a wide table scrolls within itself rather than widening the page. */
const PHONE_TABLES =
  "@media (max-width: 640px) { table { display: block; max-width: 100%; overflow-x: auto; } }";

/** Runs first in the page. Plain ES2017 so it works in whatever the page expects. */
const RUNTIME = `
(function () {
  var state = window.__GASPO_STATE__ || {};
  delete window.__GASPO_STATE__;
  var has = function (object, key) { return Object.prototype.hasOwnProperty.call(object, key); };
  var gaspoState = {
    get: function (key) { return has(state, String(key)) ? state[String(key)] : null; },
    set: function (key, value) {
      key = String(key);
      if (value === undefined || value === null) delete state[key];
      else state[key] = value;
      parent.postMessage(
        { channel: "gaspo-page", type: "state:set", key: key, value: value === undefined ? null : value },
        "*"
      );
    },
    remove: function (key) { gaspoState.set(key, null); },
    all: function () { return JSON.parse(JSON.stringify(state)); }
  };
  window.gaspo = { state: gaspoState };

  var PREFIX = "storage:";
  var makeStorage = function (persist) {
    var memory = new Map();
    if (persist) {
      Object.keys(state).forEach(function (key) {
        if (key.indexOf(PREFIX) === 0) memory.set(key.slice(PREFIX.length), String(state[key]));
      });
    }
    var methods = {
      getItem: function (key) { key = String(key); return memory.has(key) ? memory.get(key) : null; },
      setItem: function (key, value) {
        key = String(key);
        memory.set(key, String(value));
        if (persist) gaspoState.set(PREFIX + key, String(value));
      },
      removeItem: function (key) {
        key = String(key);
        memory.delete(key);
        if (persist) gaspoState.set(PREFIX + key, null);
      },
      clear: function () { Array.from(memory.keys()).forEach(methods.removeItem); },
      key: function (index) { return Array.from(memory.keys())[index] || null; }
    };
    Object.defineProperty(methods, "length", { get: function () { return memory.size; } });
    // A Proxy, so that localStorage.foo = "x" and Object.keys(localStorage)
    // behave as they do on the real thing.
    return new Proxy(methods, {
      get: function (target, prop) {
        if (prop in target) return target[prop];
        return typeof prop === "string" && memory.has(prop) ? memory.get(prop) : undefined;
      },
      set: function (target, prop, value) {
        if (typeof prop === "string") methods.setItem(prop, value);
        return true;
      },
      deleteProperty: function (target, prop) {
        if (typeof prop === "string") methods.removeItem(prop);
        return true;
      },
      has: function (target, prop) { return prop in target || memory.has(prop); },
      ownKeys: function () { return Array.from(memory.keys()); },
      getOwnPropertyDescriptor: function (target, prop) {
        return memory.has(prop)
          ? { value: memory.get(prop), enumerable: true, configurable: true, writable: true }
          : undefined;
      }
    });
  };
  [["localStorage", true], ["sessionStorage", false]].forEach(function (entry) {
    try {
      window[entry[0]].getItem("gaspo");
    } catch (error) {
      Object.defineProperty(window, entry[0], { value: makeStorage(entry[1]), configurable: true });
    }
  });

  var BOXES = 'input[type="checkbox"]:not([data-gaspo-ignore])';
  var boxName = function (box) {
    if (box.id) return "#" + box.id;
    if (box.name) return "name:" + box.name + ":" + box.value;
    var text = (box.closest("label") || box.parentElement || box).textContent || "";
    return "text:" + text.replace(/\\s+/g, " ").trim().slice(0, 120);
  };
  // Worked out from the boxes on the page right now, so a list the page
  // re-renders gets the same keys again. Repeated names are told apart by order.
  var boxKey = function (box) {
    var name = boxName(box);
    var same = Array.prototype.filter.call(document.querySelectorAll(BOXES), function (other) {
      return boxName(other) === name;
    });
    var index = same.indexOf(box);
    return "checkbox:" + name + (index > 0 ? "#" + (index + 1) : "");
  };
  var restoring = false;
  var restoreBoxes = function (root) {
    if (!root.querySelectorAll) return;
    restoring = true;
    Array.prototype.forEach.call(root.querySelectorAll(BOXES), function (box) {
      var saved = gaspoState.get(boxKey(box));
      if (typeof saved === "boolean" && box.checked !== saved) {
        box.checked = saved;
        // So the page's own progress counts and styles follow the restored ticks.
        box.dispatchEvent(new Event("change", { bubbles: true }));
      }
    });
    restoring = false;
  };
  document.addEventListener("change", function (event) {
    var box = event.target;
    if (restoring || !(box instanceof HTMLInputElement) || !box.matches(BOXES)) return;
    gaspoState.set(boxKey(box), box.checked);
  }, true);
  window.addEventListener("load", function () {
    restoreBoxes(document);
    new MutationObserver(function (changes) {
      changes.forEach(function (change) {
        change.addedNodes.forEach(function (node) {
          if (node.nodeType === 1) restoreBoxes(node.parentNode || node);
        });
      });
    }).observe(document.body, { childList: true, subtree: true });
  });

  document.addEventListener("click", function (event) {
    var link = event.target instanceof Element ? event.target.closest("a[href]") : null;
    if (!link) return;
    var href = link.getAttribute("href") || "";
    if (href.charAt(0) === "#" && href.length > 1) {
      var target = document.getElementById(decodeURIComponent(href.slice(1)));
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else if (/^(https?:|mailto:)/i.test(href)) {
      event.preventDefault();
      window.open(href, "_blank", "noopener");
    }
  }, true);
})();
`;

/**
 * The page's HTML with the policy and runtime injected at the very top of its
 * head, before any script of its own can run.
 */
export function buildPageDocument(html: string, state: Record<string, unknown>): string {
  // `<` escaped so nothing a page saved can ever close this script tag.
  const initial = JSON.stringify(state).replace(/</g, "\\u003c");
  const inject =
    `<meta http-equiv="Content-Security-Policy" content="${PAGE_CSP}">` +
    `<style>${PHONE_TABLES}</style>` +
    `<script>window.__GASPO_STATE__ = ${initial};${RUNTIME}</script>`;

  const head = /<head(\s[^>]*)?>/i.exec(html);
  if (head) return splice(html, head.index + head[0].length, inject);
  const root = /<html(\s[^>]*)?>/i.exec(html);
  if (root) return splice(html, root.index + root[0].length, `<head>${inject}</head>`);
  // No <html> or <head>: keep a doctype first, so the page stays in standards mode.
  const doctype = /^\s*<!doctype[^>]*>/i.exec(html);
  return splice(html, doctype ? doctype[0].length : 0, `<head>${inject}</head>`);
}

function splice(text: string, at: number, insert: string): string {
  return text.slice(0, at) + insert + text.slice(at);
}
