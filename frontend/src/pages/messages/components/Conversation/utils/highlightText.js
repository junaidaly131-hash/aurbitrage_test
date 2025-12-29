const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

export const highlightText = (text, searchTerm) => {
  if (!searchTerm) {
    return text;
  }

  const escapedSearchTerm = escapeRegExp(searchTerm);
  const regex = new RegExp(`(${escapedSearchTerm})`, "gi");

  return text.replace(
    regex,
    '<mark style="background-color: rgba(219, 164, 45, 0.3); padding: 0;">$1</mark>',
  );
};
