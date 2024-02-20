import * as vscode from "vscode";
import * as path from "path";
import { generateFile } from "./utils/generateFile";

interface TemplateConfig {
  [key: string]: string | undefined; // Allows any string as a key with a string value or undefined
}

function getConfigurationSettings(fileName: string) {
  const config = vscode.workspace.getConfiguration("nextFileGenerator");
  const fileExtension = config.get<string>("fileExtension", ".tsx");
  const template = config.get<TemplateConfig>("templates", {})[fileName];

  return { fileExtension, template: template ?? "" };
}

function activate(context: vscode.ExtensionContext) {
  const generateAll = vscode.commands.registerCommand(
    "nextjs.files.all",
    async (folderUri: vscode.Uri) => {
      let targetPath;
      if (!folderUri) {
        vscode.window.showErrorMessage("Folder not selected");
        return;
      }

      const folderName = await vscode.window.showInputBox({
        placeHolder: "Enter the folder name",
      });

      if (folderName) {
        targetPath = path.join(folderUri.fsPath, folderName);
      } else {
        targetPath = folderUri.fsPath;
      }

      // const { fileExtension, template } = getConfigurationSettings("page");
      // generateFile("page", folderUri.fsPath, template, fileExtension)
      //   .then((fileCreated) => {
      //     if (fileCreated) {
      //       vscode.window.showInformationMessage(
      //         "File was created successfully!"
      //       );
      //     } else {
      //       vscode.window.showErrorMessage(`File already exists`);
      //     }
      //   })
      //   .catch((error) => {
      //     vscode.window.showErrorMessage(`File creation failed: ${error}`);
      //   });

      generateFile("page", targetPath, "");
      generateFile("loading", targetPath, "");
      generateFile("error", targetPath, "");
      generateFile("not-found", targetPath, "");
    }
  );

  const generatePage = vscode.commands.registerCommand(
    "nextjs.file.page",
    async (folderUri: vscode.Uri) => {
      if (!folderUri) {
        vscode.window.showErrorMessage("Folder not selected");
        return;
      }

      const name = await vscode.window.showInputBox({
        placeHolder: "Enter the function name",
      });

      const type = "page";
      const { fileExtension, template } = getConfigurationSettings(type);

      generateFile(type, folderUri.fsPath, template, fileExtension, name || "")
        .then((fileCreated) => {
          if (fileCreated) {
            vscode.window.showInformationMessage(
              "File was created successfully!"
            );
          } else {
            vscode.window.showErrorMessage(`File already exists`);
          }
        })
        .catch((error) => {
          vscode.window.showErrorMessage(`File creation failed: ${error}`);
        });
    }
  );

  const generateMiddleware = vscode.commands.registerCommand(
    "nextjs.file.middleware",
    async (folderUri: vscode.Uri) => {
      if (!folderUri) {
        vscode.window.showErrorMessage("Folder not selected");
        return;
      }

      const type = "middleware";
      const { fileExtension, template } = getConfigurationSettings(type);

      generateFile(type, folderUri.fsPath, template, fileExtension)
        .then((fileCreated) => {
          if (fileCreated) {
            vscode.window.showInformationMessage(
              "File was created successfully!"
            );
          } else {
            vscode.window.showErrorMessage(`File already exists`);
          }
        })
        .catch((error) => {
          vscode.window.showErrorMessage(`File creation failed: ${error}`);
        });
    }
  );

  const generateLayout = vscode.commands.registerCommand(
    "nextjs.file.layout",
    async (folderUri: vscode.Uri) => {
      if (!folderUri) {
        vscode.window.showErrorMessage("Folder not selected");
        return;
      }

      const name = await vscode.window.showInputBox({
        placeHolder: "Enter the function name",
      });

      const type = "layout";
      const { fileExtension, template } = getConfigurationSettings(type);

      generateFile(type, folderUri.fsPath, template, fileExtension, name || "")
        .then((fileCreated) => {
          if (fileCreated) {
            vscode.window.showInformationMessage(
              "File was created successfully!"
            );
          } else {
            vscode.window.showErrorMessage(`File already exists`);
          }
        })
        .catch((error) => {
          vscode.window.showErrorMessage(`File creation failed: ${error}`);
        });
    }
  );

  const generateError = vscode.commands.registerCommand(
    "nextjs.file.error",
    async (folderUri: vscode.Uri) => {
      if (!folderUri) {
        vscode.window.showErrorMessage("Folder not selected");
        return;
      }

      const type = "error";
      const { fileExtension, template } = getConfigurationSettings(type);

      generateFile(type, folderUri.fsPath, template, fileExtension)
        .then((fileCreated) => {
          if (fileCreated) {
            vscode.window.showInformationMessage(
              "File was created successfully!"
            );
          } else {
            vscode.window.showErrorMessage(`File already exists`);
          }
        })
        .catch((error) => {
          vscode.window.showErrorMessage(`File creation failed: ${error}`);
        });
    }
  );

  const generateNotFound = vscode.commands.registerCommand(
    "nextjs.file.not-found",
    async (folderUri: vscode.Uri) => {
      if (!folderUri) {
        vscode.window.showErrorMessage("Folder not selected");
        return;
      }

      const type = "not-found";
      const { fileExtension, template } = getConfigurationSettings(type);

      generateFile(type, folderUri.fsPath, template, fileExtension)
        .then((fileCreated) => {
          if (fileCreated) {
            vscode.window.showInformationMessage(
              "File was created successfully!"
            );
          } else {
            vscode.window.showErrorMessage(`File already exists`);
          }
        })
        .catch((error) => {
          vscode.window.showErrorMessage(`File creation failed: ${error}`);
        });
    }
  );

  const globalError = vscode.commands.registerCommand(
    "nextjs.file.global-error",
    async (folderUri: vscode.Uri) => {
      if (!folderUri) {
        vscode.window.showErrorMessage("Folder not selected");
        return;
      }

      const type = "global-error";
      const { fileExtension, template } = getConfigurationSettings(type);

      generateFile(type, folderUri.fsPath, template, fileExtension)
        .then((fileCreated) => {
          if (fileCreated) {
            vscode.window.showInformationMessage(
              "File was created successfully!"
            );
          } else {
            vscode.window.showErrorMessage(`File already exists`);
          }
        })
        .catch((error) => {
          vscode.window.showErrorMessage(`File creation failed: ${error}`);
        });
    }
  );

  let disposable = vscode.commands.registerCommand(
    "extension.nextjsGenerator",
    async (folderUri: vscode.Uri) => {
      const componentName = await vscode.window.showInputBox({
        placeHolder: "Enter the file name",
      });
      // if (!componentName) {
      //   vscode.window.showErrorMessage("Component name cannot be empty");
      //   return;
      // }

      if (!folderUri) {
        vscode.window.showErrorMessage("Folder not selected");
        return;
      }
      const componentPath = path.join(folderUri.fsPath, `${componentName}.tsx`);

      // Read the template from the extension settings
      const config = vscode.workspace.getConfiguration();
      let template = config.get("nextComponentGenerator.template") as string;
      // template = template.replace(/\$\{componentName\}/g, componentName);

      // fs.writeFile(componentPath, template, "utf8", (err) => {
      //   if (err) {
      //     vscode.window.showErrorMessage(
      //       `Failed to create component: ${err.message}`
      //     );
      //   } else {
      //     vscode.window.showInformationMessage(
      //       `Component ${componentName} created successfully`
      //     );
      //   }
      // });
    }
  );

  context.subscriptions.push(
    disposable,
    generateAll,
    generatePage,
    generateLayout,
    generateError,
    generateMiddleware,
    generateNotFound,
    globalError
  );
}

function deactivate() {}
exports.activate = activate;
exports.deactivate = deactivate;
