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
): Promise<void> {
  const fileName = `${type}${fileExtension}`;
  const pathToCreateFile = path.join(filePath, fileName);
  const templateContent =
    fileTemplate || defaultTemplates[type || customType](name);

  await fs.ensureDir(filePath);
  await fs.writeFile(pathToCreateFile, templateContent, { encoding: "utf8" });
}
