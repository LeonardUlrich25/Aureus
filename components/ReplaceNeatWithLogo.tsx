"use client";

import { useEffect } from "react";

/**
 * Replaces all text occurrences of "Neat!" with an inline logo image.
 * Runs once after mount on the client.
 */
export default function ReplaceNeatWithLogo() {
  useEffect(() => {
    function replaceNeatWithLogo() {
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
      );

      const nodesToReplace: Text[] = [];
      let node: Text | null;

      while ((node = walker.nextNode() as Text | null)) {
        if (node && node.nodeValue && node.nodeValue.includes("Neat!")) {
          nodesToReplace.push(node);
        }
      }

      nodesToReplace.forEach((textNode) => {
        const parent = textNode.parentNode as HTMLElement | null;
        if (!parent) return;

        const text = textNode.nodeValue ?? "";
        const parts = text.split("Neat!");

        const fragment = document.createDocumentFragment();

        parts.forEach((part, index) => {
          fragment.appendChild(document.createTextNode(part));

          if (index < parts.length - 1) {
            const img = document.createElement("img");
            // Place your logo inside /public and use that path here.
            img.src = "/lemon-logo.png"; // TODO: add this asset in /public
            img.alt = "Lemon Logo";
            img.style.width = "40px";
            img.style.height = "40px";
            img.style.display = "inline-block";
            img.style.verticalAlign = "middle";
            img.style.margin = "0 4px";
            fragment.appendChild(img);
          }
        });

        parent.replaceChild(fragment, textNode);
      });
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", replaceNeatWithLogo, {
        once: true,
      });
    } else {
      replaceNeatWithLogo();
    }
  }, []);

  return null;
}
