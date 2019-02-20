const vscode = require("vscode");
const fs = require("fs");
const clipboardy = require("clipboardy");
const path = require("path");

function getPythonPath(filePath) {
  const splittedPath = filePath.split(path.sep);
  if (
    splittedPath.length === 0 ||
    !splittedPath[splittedPath.length - 1].endsWith(".py")
  ) {
    return "";
  }

  const fileName = splittedPath.pop();

  // removing extension
  let pythonPath =
    fileName !== "__init__.py"
      ? [fileName.substring(0, fileName.lastIndexOf("."))]
      : [];

  while (
    splittedPath.length > 0 &&
    fs.existsSync([...splittedPath, ["__init__.py"]].join(path.sep))
  ) {
    pythonPath.unshift(splittedPath.pop());
  }

  return pythonPath.join(".");
}

function copyPythonPath(uri) {
  try {
    const filePath = uri
      ? uri.fsPath
      : vscode.window.activeTextEditor.document.fileName;
    const pythonPath = getPythonPath(filePath);
    const selections = vscode.window.activeTextEditor.selections
      .map(s => vscode.window.activeTextEditor.document.getText(s))
      .filter(s => !!s && !s.includes("\n") && !s.trim().includes(" "));
    if (pythonPath && selections.length > 0) {
      const importStatement = generateImportStatement(pythonPath, selections);
      clipboardy.writeSync(importStatement);
    }
    if (pythonPath && selections.length == 0) {
      clipboardy.writeSync(pythonPath);
    }
  } catch (e) {
    console.log(e);
  }
}

function generateImportStatement(pythonPath, selections) {
  if (selections.length == 0) {
    return `import ${pythonPath}`;
  } else if (selections.length == 1) {
    const selection = selections[0].trim();
    return `from ${pythonPath} import ${selection}`;
  }
  const selection = selections.map(s => `\t${s.trim()},`).join("\n");
  return `from ${pythonPath} import (\n${selection}\n)`;
}

function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "extension.copyPythonPath",
    copyPythonPath
  );
  context.subscriptions.push(disposable);
}

exports.activate = activate;

function deactivate() {}
exports.deactivate = deactivate;
