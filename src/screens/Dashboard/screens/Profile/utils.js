export const formatterName = (name) =>
  name
    .split(' ')
    .map((nameSection) => nameSection.charAt(0).toUpperCase() + nameSection.slice(1).toLowerCase())
    .join(' ');
