import sanitizeHtml from "sanitize-html";

// Tags produced by the Tiptap editor (StarterKit + underline). Anything else is stripped.
const allowedTags = [
  "p", "br", "hr", "strong", "b", "em", "i", "u", "s", "strike",
  "h1", "h2", "h3", "h4", "h5", "h6",
  "ul", "ol", "li", "blockquote", "pre", "code", "a",
];

export const sanitizeStoryHtml = (html: string | null | undefined): string =>
  sanitizeHtml(html ?? "", {
    allowedTags,
    allowedAttributes: { a: ["href", "target", "rel"] },
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer", target: "_blank" }),
    },
  });
