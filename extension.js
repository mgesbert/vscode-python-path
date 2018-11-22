const vscode = require("vscode");
const fs = require("fs");
const clipboardy = require("clipboardy");

function getPythonPath(path) {
  const splittedPath = path.split("/");
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
    fs.existsSync([...splittedPath, ["__init__.py"]].join("/"))
  ) {
    pythonPath.unshift(splittedPath.pop());
  }

  return pythonPath.join(".");
}

function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "extension.copyPythonPath",
    function(uri) {
      try {
        const path = uri
          ? uri.fsPath
          : vscode.window.activeTextEditor.document.fileName;
        const pythonPath = getPythonPath(path);
        if (pythonPath) {
          clipboardy.writeSync(pythonPath);
        }
      } catch (e) {
        console.log(e);
      }
    }
  );

  context.subscriptions.push(disposable);
}

exports.activate = activate;

function deactivate() {}
exports.deactivate = deactivate;
