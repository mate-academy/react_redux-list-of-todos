export const ifInclude = (str:string, subStr:string) => (
  str.toLowerCase().includes(subStr.toLowerCase().trim())
);
