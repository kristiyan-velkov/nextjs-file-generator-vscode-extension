import fs from "fs-extra";
import path from "path";
import * as vscode from "vscode";

import {
  layoutTemplate,
  pageTemplate,
  loadingTemplate,
  errorTemplate,
  globalErrorsTemplate,
  notFoundTemplate,
  templateFile,
  middlewareTemplate,
  routeGetTemplate,
  routePostTemplate,
  routePatchTemplate,
  routeDeleteTemplate,
  routePutTemplate,
  routeHeadTemplate,
} from "./templates";

type TemplateFunction = (name: string) => string;

const defaultTemplates: Record<string, TemplateFunction> = {
  page: pageTemplate,
  loading: loadingTemplate,
  layout: layoutTemplate,
  error: errorTemplate,
  template: templateFile,
  "global-error": globalErrorsTemplate,
  "not-found": notFoundTemplate,
  middleware: middlewareTemplate,
  routeGet: routeGetTemplate,
  routePost: routePostTemplate,
  routeDelete: routeDeleteTemplate,
  routePatch: routePatchTemplate,
  routePut: routePutTemplate,
  routeHead: routeHeadTemplate,
};

export async function generateFile(
  type: string,
  filePath: string,
  fileTemplate: string,
  fileExtension = ".tsx",
  name: string = "",
  customType: string = ""
): Promise<boolean> {
  const fileName = `${type}${fileExtension}`;
  const pathToCreateFile = path.join(filePath, fileName);
  const templateContent =
    fileTemplate || defaultTemplates[type || customType](name);

  try {
    await fs.ensureDir(filePath);
    // Check if the file already exists
    const fileExists = await fs.pathExists(pathToCreateFile);
    if (fileExists) {
      // File exists, return false to indicate no file was created
      return false;
    }

    // If the file doesn't exist, write it
    await fs.writeFile(pathToCreateFile, templateContent, { encoding: "utf8" });
    return true; // File created successfully
  } catch (error) {
    // Optionally, you could throw the error to be handled by the caller
    throw new Error(
      `Error creating file: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}
