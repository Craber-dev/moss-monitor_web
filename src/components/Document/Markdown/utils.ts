export interface MarkdownCatalog {
  title?: string;
  level: number;
  subTitle?: MarkdownCatalog[];
}

function getCatalogObject(level: number, title?: string): MarkdownCatalog {
  return { level, title, subTitle: [] };
}

export function getCatalogByMarkdown(markdown: string) {
  const titles = markdown.match(/#+.+\n/g);
  let catalogs: MarkdownCatalog[] = [];
  const catalogStack: MarkdownCatalog[] = [];
  titles?.forEach((item) => {
    const title = item.replace(/#/g, '').replace('\n', '').trim();
    const level = item.match(/#/g)?.length as MarkdownCatalog['level'];
    const currentCatalog = getCatalogObject(level, title);
    let isResolved = false;
    while (!isResolved) {
      if (!catalogStack.length) {
        let rootCatalog: MarkdownCatalog;
        if (level === 1) {
          rootCatalog = currentCatalog;
          isResolved = true;
        } else {
          rootCatalog = getCatalogObject(1);
        }
        catalogs.push(rootCatalog);
        catalogStack.push(rootCatalog);
      } else {
        const stackTop = catalogStack[catalogStack.length - 1];
        if (stackTop.level === level - 1) {
          stackTop.subTitle?.push(currentCatalog);
          catalogStack.push(currentCatalog);
          isResolved = true;
        } else {
          if (level <= stackTop.level) {
            catalogStack.pop();
          } else {
            const virtrulCatalog = getCatalogObject(stackTop.level + 1);
            stackTop.subTitle?.push(virtrulCatalog);
            catalogStack.push(virtrulCatalog);
          }
        }
      }
    }
  });
  let isMostSimple = false;
  while (!isMostSimple) {
    catalogs.forEach((item) => {
      if (item.title) {
        isMostSimple = true;
      }
    });
    if (!isMostSimple) {
      const tempCatalogs: MarkdownCatalog[] = [];
      catalogs.forEach((item) => {
        if (item.subTitle?.length) {
          item.subTitle.forEach((subTitle) => tempCatalogs.push(subTitle));
        }
      });
      catalogs = tempCatalogs;
    }
  }
  return catalogs;
}
