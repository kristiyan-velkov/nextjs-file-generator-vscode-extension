declare module "next-cli-turbo/generateFileExtension" {
  export default function generateFile(
    type: string,
    filePath: string,
    fileTemplate: string,
    fileExtension?: string,
    name?: string,
    customType?: string
  ): Promise<boolean>;
}

type TemplateFunction = (name: string) => string;

declare module "next-cli-turbo/templates" {
  export const layoutTemplate: TemplateFunction;
  export const pageTemplate: TemplateFunction;
  export const loadingTemplate: TemplateFunction;
  export const errorTemplate: TemplateFunction;
  export const globalErrorsTemplate: TemplateFunction;
  export const notFoundTemplate: TemplateFunction;
  export const templateFile: TemplateFunction;
  export const middlewareTemplate: TemplateFunction;
  export const routeTemplate: TemplateFunction;
  export const defaultFileTemplate: TemplateFunction;
}
