const outputExamples = {
  html: `<div class="notice">
  <h2>Hello, JSONX</h2>
  <p>Defined in JSON, rendered as React.</p>
</div>`,
  express: `<%- include('header') %>
<div class="notice">
  <h2>Hello, JSONX</h2>
  <p>Defined in JSON, rendered as React.</p>
</div>
<%- include('footer') %>`,
  jsx: `<Notice>
  <Heading>Hello, JSONX</Heading>
  <Text>Defined in JSON, rendered as React.</Text>
</Notice>`,
};

const tabButtons = document.querySelectorAll("[data-output]");
const tabPanel = document.querySelector(".tab-panel code");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const output = button.dataset.output;
    if (!output || !tabPanel) return;

    tabButtons.forEach((tab) => {
      const isSelected = tab === button;
      tab.classList.toggle("is-active", isSelected);
      tab.setAttribute("aria-selected", String(isSelected));
    });

    tabPanel.textContent = outputExamples[output];
  });
});

async function copyText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall through to the selection-based copy path below.
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "-1000px";
  textarea.style.left = "-1000px";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  textarea.setSelectionRange(0, text.length);

  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch {
    copied = false;
  }

  textarea.remove();
  return copied;
}

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const text = button.dataset.copy;
    if (!text) return;

    const copied = await copyText(text);
    if (copied) {
      button.textContent = "Copied";
      window.setTimeout(() => {
        button.textContent = "Copy";
      }, 1400);
      return;
    }

    button.textContent = "Copy failed";
    window.setTimeout(() => {
      button.textContent = "Copy";
    }, 1400);
  });
});
