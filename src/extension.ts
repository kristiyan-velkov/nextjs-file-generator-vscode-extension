import * as vscode from "vscode";
import * as path from "path";
import generateFile from "next-cli-turbo/generateFileExtension";

interface TemplateConfig {
  [key: string]: string | undefined;
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

      const { fileExtension, template: pageTemplate } =
        getConfigurationSettings("page");
      const loading = getConfigurationSettings("loading");
      const error = getConfigurationSettings("error");
      const notFound = getConfigurationSettings("not-found");

      generateFile("page", targetPath, pageTemplate, fileExtension);
      generateFile("loading", targetPath, loading.template, fileExtension);
      generateFile("error", targetPath, error.template, fileExtension);
      generateFile("not-found", targetPath, notFound.template, fileExtension);
    }
  );

  const generateSelected = vscode.commands.registerCommand(
    "nextjs.files.selected",
    async (folderUri: vscode.Uri) => {
      if (!folderUri) {
        vscode.window.showErrorMessage("Folder not selected");
        return;
      }

      const fileOptions = [
        { label: "page" },
        { label: "loading" },
        { label: "layout" },
        { label: "template" },
        { label: "default" },
        { label: "error" },
        { label: "not-found" },
        { label: "global-error" },
        { label: "middleware" },
        { label: "route" },
      ];

      const selectedFiles = await vscode.window.showQuickPick(fileOptions, {
        canPickMany: true,
        placeHolder: "Select file types to generate",
      });

      if (!selectedFiles) {
        vscode.window.showInformationMessage("No selection made");
        return;
      }

      selectedFiles.forEach((file) => {
        const { fileExtension, template } = getConfigurationSettings(
          file.label
        );
        generateFile(
          file.label,
          folderUri.fsPath,
          template,
          fileExtension
        ).catch((error) => {
          vscode.window.showErrorMessage(`Files creation failed: ${error}`);
        });
      });
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

      try {
        await generateFile(
          type,
          folderUri.fsPath,
          template,
          fileExtension,
          name ?? ""
        );
      } catch (err) {
        console.log(err);
      }

      // generateFile(type, folderUri.fsPath, template, fileExtension, name ?? "")
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
    }
  );

  const generateLoading = vscode.commands.registerCommand(
    "nextjs.file.loading",
    async (folderUri: vscode.Uri) => {
      if (!folderUri) {
        vscode.window.showErrorMessage("Folder not selected");
        return;
      }

      const name = await vscode.window.showInputBox({
        placeHolder: "Enter the function name",
      });

      const type = "loading";
      const { fileExtension, template } = getConfigurationSettings(type);

      generateFile(type, folderUri.fsPath, template, fileExtension, name ?? "")
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

      generateFile(type, folderUri.fsPath, template, fileExtension, name ?? "")
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

  const generateTemplate = vscode.commands.registerCommand(
    "nextjs.file.template",
    async (folderUri: vscode.Uri) => {
      if (!folderUri) {
        vscode.window.showErrorMessage("Folder not selected");
        return;
      }

      const name = await vscode.window.showInputBox({
        placeHolder: "Enter the function name",
      });

      const type = "template";
      const { fileExtension, template } = getConfigurationSettings(type);

      generateFile(type, folderUri.fsPath, template, fileExtension, name ?? "")
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

  const generateGlobalError = vscode.commands.registerCommand(
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

  const generateRoute = vscode.commands.registerCommand(
    "nextjs.file.route",
    async (folderUri: vscode.Uri) => {
      if (!folderUri) {
        vscode.window.showErrorMessage("Folder not selected");
        return;
      }

      const type = "route";
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

  const generateDefaultFile = vscode.commands.registerCommand(
    "nextjs.file.default",
    async (folderUri: vscode.Uri) => {
      if (!folderUri) {
        vscode.window.showErrorMessage("Folder not selected");
        return;
      }

      const type = "default";
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

  context.subscriptions.push(
    generateAll,
    generateSelected,
    generatePage,
    generateLoading,
    generateLayout,
    generateTemplate,
    generateDefaultFile,
    generateError,
    generateMiddleware,
    generateNotFound,
    generateGlobalError,
    generateRoute
  );
}

function deactivate() {}
exports.activate = activate;
exports.deactivate = deactivate;
