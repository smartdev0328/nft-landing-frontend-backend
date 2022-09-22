const editAddressString = (address) => {
  const prefix = address.slice(0, 5);
  const subfix = address.slice(address.length - 5, address.length);
  const updatedString = '(' + prefix + '...' + subfix + ')';
  return updatedString;
};

export { editAddressString };
