module.exports = (text) =>
  text
    .replace(/(?:([^\s\w:.])\s+(?=\S)|(\w)\s+(?=[:.])|(\S)\s+(?=\n)|(\n)\s+(?=\S))/g, '$1$2$3$4')
    .replace(/(\S)\s+(?=\w)/g, '$1 ')
    .replace(/<br\/>/g, '\n')
    .replace(/<.*>/g, '')
    .trim()
    .replace(/(?:(\S)[ \t]+(?=\w)|([^\s\w:.：\(])(?=\w)|(\w)(?=[^\s\w:.\)]))/g, '$1$2$3 ');
