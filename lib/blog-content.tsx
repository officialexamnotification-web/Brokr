/**
 * Shared blog content renderer with markdown support
 * Handles headings, tables, bullets, and inline bold text
 */

export function renderBlogContent(content: string): JSX.Element[] {
  const lines = content.split("\n");
  const elements: JSX.Element[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Handle headings
    if (line.startsWith("# ")) {
      elements.push(<h1 key={i} className="text-2xl font-black mt-10 mb-4">{line.replace("# ", "")}</h1>);
    } else if (line.startsWith("## ")) {
      elements.push(<h2 key={i} className="text-xl font-bold mt-8 mb-3 text-slate-900 dark:text-white">{line.replace("## ", "")}</h2>);
    } else if (line.startsWith("### ")) {
      elements.push(<h3 key={i} className="text-lg font-bold mt-6 mb-2 text-slate-800 dark:text-slate-200">{line.replace("### ", "")}</h3>);
    }
    // Handle tables
    else if (line.startsWith("|")) {
      const cells = line.split("|").filter(Boolean).map((c) => c.trim());
      
      // Table separator line
      if (cells.every((c) => c.match(/^-+$/))) {
        elements.push(<hr key={i} className="my-2 border-slate-200 dark:border-slate-700" />);
      }
      // Table header (contains bold)
      else if (cells.some((c) => c.startsWith("**"))) {
        elements.push(
          <div key={i} className="flex gap-4 py-2 border-b border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-900 dark:text-white">
            {cells.map((c, j) => <span key={j}>{renderInlineMarkdown(c.replace(/\*\*/g, ""))}</span>)}
          </div>
        );
      }
      // Table data row
      else {
        elements.push(
          <div key={i} className="flex gap-4 py-1.5 border-b border-slate-100 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-400">
            {cells.map((c, j) => <span key={j}>{renderInlineMarkdown(c)}</span>)}
          </div>
        );
      }
    }
    // Handle bullet points
    else if (line.startsWith("- ")) {
      elements.push(<li key={i} className="text-slate-600 dark:text-slate-400 ml-4 list-disc">{renderInlineMarkdown(line.replace("- ", ""))}</li>);
    }
    // Handle empty lines
    else if (line.trim() === "") {
      elements.push(<br key={i} />);
    }
    // Handle regular paragraphs with inline markdown
    else {
      elements.push(<p key={i} className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{renderInlineMarkdown(line)}</p>);
    }

    i++;
  }

  return elements;
}

/**
 * Renders inline markdown elements (bold text)
 */
function renderInlineMarkdown(text: string): (string | JSX.Element)[] {
  const parts: (string | JSX.Element)[] = [];
  let currentText = "";
  let i = 0;

  while (i < text.length) {
    // Check for bold text **text**
    if (text.substring(i, i + 2) === "**") {
      // Find closing **
      const closingIndex = text.indexOf("**", i + 2);
      if (closingIndex !== -1) {
        // Add any text before the bold
        if (currentText) {
          parts.push(currentText);
          currentText = "";
        }
        // Add the bold text
        const boldText = text.substring(i + 2, closingIndex);
        parts.push(<strong key={i} className="font-semibold text-slate-900 dark:text-white">{boldText}</strong>);
        i = closingIndex + 2;
        continue;
      }
    }

    currentText += text[i];
    i++;
  }

  // Add any remaining text
  if (currentText) {
    parts.push(currentText);
  }

  return parts;
}