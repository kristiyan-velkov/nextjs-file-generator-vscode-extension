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

const templates: Record<string, TemplateFunction> = {
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
export const generateFile = async (
  type: string,
  customPath: string,
  name: string = "",
  customType: string = ""
): Promise<void> => {
  const fileName: string = `${type}.tsx`;
  const filePath: string = path.join(customPath, fileName);
  const templateFunction: TemplateFunction | undefined =
    templates[customType || type];

  const template: string = templateFunction(name);

  if (!fs.existsSync(filePath)) {
    fs.ensureDirSync(customPath);
    fs.writeFileSync(filePath, template);
    vscode.window.showInformationMessage("File was created!");
  } else {
    vscode.window.showErrorMessage("File already exists.");
  }
};
