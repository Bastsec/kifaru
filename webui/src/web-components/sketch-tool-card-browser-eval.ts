import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ToolCall } from "../types";
import { SketchTailwindElement } from "./sketch-tailwind-element";
import "./sketch-tool-card-base";

@customElement("sketch-tool-card-browser-eval")
export class SketchToolCardBrowserEval extends SketchTailwindElement {
  @property()
  toolCall: ToolCall;

  @property()
  open: boolean;

  render() {
    // Parse the input to get expression
    let expression = "";
    try {
      if (this.toolCall?.input) {
        const input = JSON.parse(this.toolCall.input);
        expression = input.expression || "";
      }
    } catch (e) {
      console.error("Error parsing eval input:", e);
    }

    // Truncate expression for summary if too long
    const displayExpression =
      expression.length > 50 ? expression.substring(0, 50) + "..." : expression;

    const summaryContent = html`<span class="font-mono text-gray-700 break-all">
      📱 ${displayExpression}
    </span>`;
    const inputContent = html`<div>
      Evaluate:
      <span
        class="font-mono bg-black/[0.05] px-2 py-1 rounded inline-block break-all"
        >${expression}</span
      >
    </div>`;
    const resultContent = this.toolCall?.result_message?.tool_result
      ? html`<pre
          class="bg-gray-200 text-black p-2 rounded whitespace-pre-wrap break-words max-w-full w-full box-border"
        >
${this.toolCall.result_message.tool_result}</pre
        >`
      : "";

    return html`
      <sketch-tool-card-base
        .open=${this.open}
        .toolCall=${this.toolCall}
        .summaryContent=${summaryContent}
        .inputContent=${inputContent}
        .resultContent=${resultContent}
      >
      </sketch-tool-card-base>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sketch-tool-card-browser-eval": SketchToolCardBrowserEval;
  }
}
