import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "extension.createNextComponent",
    async (folderUri: vscode.Uri) => {
      const componentName = await vscode.window.showInputBox({
        placeHolder: "Enter the component name",
      });

      if (!componentName) {
        vscode.window.showErrorMessage("Component name cannot be empty");
        return;
      }

      if (!folderUri) {
        vscode.window.showErrorMessage("Folder not selected");
        return;
      }

      const componentPath = path.join(folderUri.fsPath, `${componentName}.tsx`);
      const content = `export default function ${componentName}() {
    return <div>${componentName} works!</div>;
}`;

      fs.writeFile(componentPath, content, "utf8", (err) => {
        if (err) {
          vscode.window.showErrorMessage(
            `Failed to create component: ${err.message}`
          );
        } else {
          vscode.window.showInformationMessage(
            `Component ${componentName} created successfully in ${folderUri.fsPath}`
          );
        }
      });
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
