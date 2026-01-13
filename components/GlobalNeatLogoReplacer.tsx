"use client";

import { useEffect } from "react";

/**
 * Replaces all text occurrences of "Neat!" with an inline lemon logo image.
 * Uses a TreeWalker over text nodes to avoid touching element attributes.
 */
export default function GlobalNeatLogoReplacer() {
  useEffect(() => {
    const resolveLogoSrc = async (): Promise<string | null> => {
      // Try to load lemon logo from public folder
      try {
        const response = await fetch("/lemon-logo.png");
        if (response.ok) {
          const blob = await response.blob();
          return URL.createObjectURL(blob);
        }
      } catch {
        // fallback to next attempt
      }

      // If file-based approach fails, return null to skip replacement
      return null;
    };

    const replaceNeatWithLogo = async () => {
      const logoSrc = await resolveLogoSrc();
      if (typeof document === "undefined") return;

      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
      );

      const nodesToReplace: Text[] = [];
      let node: Node | null;

      while ((node = walker.nextNode())) {
        if (node.nodeType === Node.TEXT_NODE) {
          const textNode = node as Text;
          if (textNode.nodeValue && textNode.nodeValue.includes("Neat!")) {
            nodesToReplace.push(textNode);
          }
        }
      }

      nodesToReplace.forEach((textNode) => {
        const parent = textNode.parentNode as Node & ParentNode;
        if (!parent) return;

        // Avoid double-replacing inside already injected fragments
        // by skipping if parent already contains our marker images.
        const hasInjected =
          parent instanceof Element &&
          parent.querySelector("img[data-neat-logo]") !== null;
        // We still proceed because a single text node may have more Neat!s.

        const text = textNode.nodeValue || "";
        const parts = text.split("Neat!");

        const fragment = document.createDocumentFragment();

        parts.forEach((part, index) => {
          fragment.appendChild(document.createTextNode(part));

          if (index < parts.length - 1) {
            if (logoSrc) {
              const img = document.createElement("img");
              img.src = logoSrc;
              img.alt = "Lemon Logo";
              img.className = "neat-logo";
              img.decoding = "async";
              img.loading = "lazy";
              img.setAttribute("data-neat-logo", "true");
              img.onerror = () => {
                img.replaceWith(document.createTextNode("Neat!"));
              };
              fragment.appendChild(img);
            } else {
              fragment.appendChild(document.createTextNode("Neat!"));
            }
          }
        });

        parent.replaceChild(fragment, textNode);
      });
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        replaceNeatWithLogo();
      }, {
        once: true,
      });
    } else {
      replaceNeatWithLogo();
    }

    // Optional: rerun on client-side navigations if needed
    // return no cleanup (idempotent replacements on visit)
  }, []);

  return null;
}
