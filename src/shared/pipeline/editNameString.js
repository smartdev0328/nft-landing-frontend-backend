const editNameString = (address) => {
  const prefix = address.slice(0, 8);
  const updatedString = prefix + '...';
  return updatedString;
};

export { editNameString };
