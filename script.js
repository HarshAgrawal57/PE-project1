const OPENROUTER_API_KEY = "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"; // Replace with your real key

const generateBtn = document.getElementById("generateBtn");
const summary = document.getElementById("summary");
const findings = document.getElementById("findings");
const keywords = document.getElementById("keywords");

generateBtn.addEventListener("click", async () => {
  const inputText = document.getElementById("inputText").value.trim();

  if (!inputText) {
    alert("Please paste some research content.");
    return;
  }

  generateBtn.disabled = true;
  summary.innerHTML = "Generating summary...";
  findings.innerHTML = "Finding key points...";
  keywords.innerHTML = "Extracting keywords...";

  const prompt = `
You are a research assistant AI. Given a research paper paragraph or abstract, your job is to extract:

1. *Summary* – A short, 2-3 sentence summary of the core idea.
2. *Key Findings* – The major outcomes, insights, or innovations mentioned.
3. *Suggested Keywords* – 5–8 relevant tags/keywords that represent the topic.

Respond clearly using labeled sections.

Text:
"${inputText}"
`;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Bearer ${OPENROUTER_API_KEY}
      },
      body: JSON.stringify({
        model: "google/gemini-pro",
        messages: [
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await response.json();
    const result = data?.choices?.[0]?.message?.content || "No response received.";

    // Basic splitting using keywords
    const summaryText = result.match(/summary[:\-]\s(.*)/i)?.[1] || "Not found.";
    const findingsText = result.match(/key findings[:\-]\s(.*)/i)?.[1] || "Not found.";
    const keywordsText = result.match(/keywords[:\-]\s(.*)/i)?.[1] || "Not found.";

    summary.innerHTML = summaryText.replace(/\n/g, "<br>");
    findings.innerHTML = findingsText.replace(/\n/g, "<br>");
    keywords.innerHTML = keywordsText.replace(/\n/g, "<br>");

  } catch (err) {
    console.error(err);
    summary.innerHTML = "❌ Error occurred.";
    findings.innerHTML = "❌";
    keywords.innerHTML = "❌";
  } finally {
    generateBtn.disabled = false;
  }
});