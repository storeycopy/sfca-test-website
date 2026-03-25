// tina/config.js
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: process.env.TINA_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "page",
        label: "Home Page",
        path: "content/page",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false
          },
          router: () => "/"
        },
        fields: [
          // ── Hero Section ──
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              { type: "string", name: "badge", label: "Badge Text" },
              { type: "string", name: "heading", label: "Heading" },
              { type: "string", name: "subheading", label: "Subheading", ui: { component: "textarea" } },
              { type: "string", name: "primaryButtonText", label: "Primary Button Text" },
              { type: "string", name: "primaryButtonLink", label: "Primary Button Link" },
              { type: "string", name: "secondaryButtonText", label: "Secondary Button Text" },
              { type: "string", name: "secondaryButtonLink", label: "Secondary Button Link" }
            ]
          },
          // ── Features Section ──
          {
            type: "object",
            name: "features",
            label: "Features Section",
            fields: [
              { type: "string", name: "label", label: "Section Label" },
              { type: "string", name: "title", label: "Section Title" },
              { type: "string", name: "description", label: "Section Description", ui: { component: "textarea" } },
              {
                type: "object",
                name: "items",
                label: "Feature Cards",
                list: true,
                fields: [
                  { type: "string", name: "icon", label: "Icon (emoji or HTML entity)" },
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "description", label: "Description", ui: { component: "textarea" } }
                ]
              }
            ]
          },
          // ── Showcase 1 ──
          {
            type: "object",
            name: "showcase1",
            label: "Showcase Section 1 (Platform)",
            fields: [
              { type: "string", name: "label", label: "Section Label" },
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              { type: "string", name: "buttonText", label: "Button Text" },
              { type: "string", name: "buttonLink", label: "Button Link" },
              { type: "image", name: "image", label: "Image" },
              { type: "string", name: "imageAlt", label: "Image Alt Text" }
            ]
          },
          // ── Showcase 2 ──
          {
            type: "object",
            name: "showcase2",
            label: "Showcase Section 2 (Swipe File)",
            fields: [
              { type: "string", name: "label", label: "Section Label" },
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              { type: "string", name: "buttonText", label: "Button Text" },
              { type: "string", name: "buttonLink", label: "Button Link" },
              { type: "image", name: "image", label: "Image" },
              { type: "string", name: "imageAlt", label: "Image Alt Text" }
            ]
          },
          // ── Stats Section ──
          {
            type: "object",
            name: "stats",
            label: "Stats Section",
            fields: [
              { type: "string", name: "label", label: "Section Label" },
              { type: "string", name: "title", label: "Section Title" },
              { type: "string", name: "description", label: "Section Description", ui: { component: "textarea" } },
              {
                type: "object",
                name: "items",
                label: "Stats",
                list: true,
                fields: [
                  { type: "string", name: "number", label: "Number (e.g. $10M+)" },
                  { type: "string", name: "label", label: "Label" }
                ]
              }
            ]
          },
          // ── Logos Section ──
          {
            type: "object",
            name: "logos",
            label: "Logos / Social Proof",
            fields: [
              { type: "string", name: "label", label: "Label Text" },
              {
                type: "string",
                name: "companies",
                label: "Company Names",
                list: true
              }
            ]
          },
          // ── Testimonial Section ──
          {
            type: "object",
            name: "testimonial",
            label: "Testimonial Section",
            fields: [
              { type: "string", name: "label", label: "Section Label" },
              { type: "string", name: "title", label: "Section Title" },
              { type: "string", name: "description", label: "Section Description", ui: { component: "textarea" } },
              { type: "string", name: "quote", label: "Quote", ui: { component: "textarea" } },
              { type: "string", name: "author", label: "Author Name" },
              { type: "string", name: "role", label: "Author Role" }
            ]
          },
          // ── Additional Features ──
          {
            type: "object",
            name: "additionalFeatures",
            label: "Additional Features (Write Across Every Channel)",
            fields: [
              { type: "string", name: "label", label: "Section Label" },
              { type: "string", name: "title", label: "Section Title" },
              { type: "string", name: "description", label: "Section Description", ui: { component: "textarea" } },
              {
                type: "object",
                name: "items",
                label: "Feature Cards",
                list: true,
                fields: [
                  { type: "string", name: "icon", label: "Icon" },
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "description", label: "Description", ui: { component: "textarea" } }
                ]
              }
            ]
          },
          // ── CTA Section ──
          {
            type: "object",
            name: "cta",
            label: "CTA Section",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              { type: "string", name: "primaryButtonText", label: "Primary Button Text" },
              { type: "string", name: "primaryButtonLink", label: "Primary Button Link" },
              { type: "string", name: "secondaryButtonText", label: "Secondary Button Text" },
              { type: "string", name: "secondaryButtonLink", label: "Secondary Button Link" }
            ]
          },
          // ── Footer ──
          {
            type: "object",
            name: "footer",
            label: "Footer",
            fields: [
              { type: "string", name: "description", label: "Brand Description", ui: { component: "textarea" } },
              { type: "string", name: "copyright", label: "Copyright Text" },
              { type: "string", name: "tagline", label: "Tagline" }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
