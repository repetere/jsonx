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

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const text = button.dataset.copy;
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      button.textContent = "Copied";
      window.setTimeout(() => {
        button.textContent = "Copy";
      }, 1400);
    } catch {
      button.textContent = "Copy failed";
      window.setTimeout(() => {
        button.textContent = "Copy";
      }, 1400);
    }
  });
});
