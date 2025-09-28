import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

type Hit = { range: vscode.Range; targetFsPath: string };

const MD_LINK_RE = /\[[^\]]+\]\(\s*(@?(?:\.{1,2}\/|\/)[^)\s]+)\s*\)/g;
const BARE_REF_RE = /(^|[\s(`])(@?(?:\.{1,2}\/|\/)[^\s`)\]]+)/g;
const INLINE_CODE_RE = /`(@?(?:\.{1,2}\/|\/)[^\s`)\]]+)`/g;

function getRefRanges(doc: vscode.TextDocument): Hit[] {
  const text = doc.getText();
  const hits: Hit[] = [];
  const baseDir = path.dirname(doc.uri.fsPath);

  let m: RegExpExecArray | null;

  while ((m = MD_LINK_RE.exec(text))) {
    const full = m[0];
    const rel = m[1];
    const pathOffsetInMatch = full.indexOf(rel);
    const start = doc.positionAt(m.index + pathOffsetInMatch);
    const end = doc.positionAt(m.index + pathOffsetInMatch + rel.length);
    const abs = path.resolve(baseDir, rel.replace(/^@/, ""));
    hits.push({ range: new vscode.Range(start, end), targetFsPath: abs });
  }

  while ((m = BARE_REF_RE.exec(text))) {
    const leading = m[1] || "";
    const rel = m[2];
    const start = doc.positionAt(m.index + leading.length);
    const end = doc.positionAt(m.index + leading.length + rel.length);
    const abs = path.resolve(baseDir, rel.replace(/^@/, ""));
    const rng = new vscode.Range(start, end);
    if (!hits.some(h => h.range.intersection(rng))) {
      hits.push({ range: rng, targetFsPath: abs });
    }
  }

  while ((m = INLINE_CODE_RE.exec(text))) {
    const full = m[0];
    const rel = m[1];
    const pathOffsetInMatch = full.indexOf(rel);
    const start = doc.positionAt(m.index + pathOffsetInMatch);
    const end = doc.positionAt(m.index + pathOffsetInMatch + rel.length);
    const abs = path.resolve(baseDir, rel.replace(/^@/, ""));
    const rng = new vscode.Range(start, end);
    if (!hits.some(h => h.range.intersection(rng))) {
      hits.push({ range: rng, targetFsPath: abs });
    }
  }

  return hits;
}

async function openPathLike(targetFsPath: string) {
  try {
    const stat = await fs.promises.stat(targetFsPath).catch(() => undefined);
    if (stat?.isDirectory()) {
      try {
        await vscode.commands.executeCommand("revealInExplorer", vscode.Uri.file(targetFsPath));
      } catch {
        await vscode.commands.executeCommand("revealFileInOS", vscode.Uri.file(targetFsPath));
      }
      return;
    }
    if (!stat) {
      await fs.promises.mkdir(path.dirname(targetFsPath), { recursive: true });
      await fs.promises.writeFile(targetFsPath, "", "utf8");
    }
    const td = await vscode.workspace.openTextDocument(vscode.Uri.file(targetFsPath));
    await vscode.window.showTextDocument(td);
  } catch {
    vscode.window.showErrorMessage(`Failed to open: ${targetFsPath}`);
  }
}

export function activate(ctx: vscode.ExtensionContext) {
  const commandId = "markdownLinks.open";

  const openCmd = vscode.commands.registerCommand(commandId, async (args?: { path: string }) => {
    if (args?.path) {return openPathLike(args.path);}
    const editor = vscode.window.activeTextEditor;
    if (!editor || editor.document.languageId !== "markdown") {return;}
    const pos = editor.selection.active;
    const hit = getRefRanges(editor.document).find(h => h.range.contains(pos));
    if (hit) {await openPathLike(hit.targetFsPath);}
  });

  const linkProvider: vscode.DocumentLinkProvider = {
    provideDocumentLinks(doc) {
      if (doc.languageId !== "markdown") {return [];}
      return getRefRanges(doc).map(({ range, targetFsPath }) => {
        const cmdUri = vscode.Uri.parse(
          `command:${commandId}?${encodeURIComponent(JSON.stringify({ path: targetFsPath }))}`
        );
        const link = new vscode.DocumentLink(range, cmdUri);
        link.tooltip = "Open path";
        return link;
      });
    },
  };

  const defProvider: vscode.DefinitionProvider = {
    provideDefinition(doc, pos) {
      if (doc.languageId !== "markdown") {return;}
      const hit = getRefRanges(doc).find(h => h.range.contains(pos));
      if (!hit) {return;}
      try {
        const stat = fs.existsSync(hit.targetFsPath) ? fs.statSync(hit.targetFsPath) : undefined;
        if (stat?.isFile()) {
          return new vscode.Location(vscode.Uri.file(hit.targetFsPath), new vscode.Position(0, 0));
        }
      } catch {}
      return;
    },
  };

  ctx.subscriptions.push(
    openCmd,
    vscode.languages.registerDocumentLinkProvider([{ language: "markdown" }], linkProvider),
    vscode.languages.registerDefinitionProvider([{ language: "markdown" }], defProvider)
  );
}

export function deactivate() {}