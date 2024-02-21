<div align="center">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="./next-js-cli.png" />
      <img src="./docs/images/next-js-file-generator.png" height="auto" />
    </picture>

[![Follow me](https://img.shields.io/badge/sponsors-99+-orange.svg)](https://github.com/kristiyan-velkov) [![Sponsors](https://img.shields.io/badge/Follow-120-blue?logo=github&style=social.svg)](https://github.com/kristiyan-velkov) [![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/kristiyan-velkov)

<h1>Next.js File Generator</h1>
</div>

Powerful file genetator extension designed to accelerate the development of Next.js applications by automating the creation of common file types, such as **pages, layouts**, **templates, errors, not-found, route, global-errors, middlewares and more**.

Built with ease of use in mind, it streamlines the setup of new routes and components, allowing developers to focus on building their applications faster.

---

💻 **If you prefer terminal aproach for generating files?**

- [next-cli-turbo](https://www.npmjs.com/package/next-cli-turbo) - A Next.js CLI tool for generating files right from your terminal.

---

## Usage

![demo](https://raw.githubusercontent.com/kristiyan-velkov/nextjs-file-generator-vscode-extension/main/docs/images/demo.gif)

#### Customizing Templates

The extension allows for the customization of file templates through VS Code's settings.

1. Navigate to Settings > Extensions > Next.js File Generator
2. Find Templates and click edit in settings.json
3. Modifying the settings.json under the nextFileGenerator.templates object.

This feature supports customization for all possible file types you can generate, allowing you to align the templates with your project's coding standards and structure seamlessly.

**Example configuration:**

- Use ${name} within a template to insert the specified name dynamically.

```
"nextFileGenerator.templates": {
    "page": "export default function ${name}Page() { return <div>My Page</div>; }"
  },

```

## Features

- **Quick File Generation**: Generate Next.js files like pages, layouts, middleware, and more, with just a couple of clicks.
- **Customizable Templates**: Use the extension's settings to customize file templates to match your coding style or project structure.
- **Multiple File Types**: Supports generating .tsx, .jsx, .js, and .ts files, configurable through extension settings.

---

## Developer Support:

- If you saw some issue/bug 🐛 related to the specific release version.
- If you want some new feature or change to be added/implemented. 😊

Please, contact the creator of the **Next.js File Generator**, so he will be able to fix or improve it:

**Kristiyan Velkov**

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/kristiyan-velkov-763130b3/) [![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://github.com/kristiyan-velkov)

**Take a look my blog in Medium**: [Kristiyan Velkov](https://medium.com/@kristiyan.velkov)

---

## Support my work

If you like my work and want to support me to work hard, please donate via:

| <a href="https://revolut.me/kristiyanvelkov" title="Link to Revolut">Revolut</a>                                                                                                                                                                                      | <a href="https://www.buymeacoffee.com/kristiyanVelkov" title="Link to Buy me a coffee">Buy me a coffee</a>                                                                                                                                                                                                                  |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a href="https://revolut.me/kristiyanvelkov" target="_blank"><img src="https://raw.githubusercontent.com/kristiyan-velkov/nextjs-file-generator-vscode-extension/main/docs/images/kristiyan.velkov-revolut.png" width="200px"  alt="Krisityan Velkov - Revolut"/></a> | <a href="https://www.buymeacoffee.com/kristiyanVelkov" style="background:red,height='500px'"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=kristiyanVelkov&button_colour=000000&font_colour=ffffff&font_family=Lato&outline_colour=ffffff&coffee_colour=FFDD00" width="200px"/></a> |

Thanks a bunch for supporting me! It means a LOT 😍

---

## Contributing

**Contributions are welcome!** ❤️

If you have suggestions for improving `Next.js File Generator `, please open an issue and submit a pull request.

## License

MIT
