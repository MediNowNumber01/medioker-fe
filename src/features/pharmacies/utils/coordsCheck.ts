export const coordsCheck = (value: string) => {
  if (typeof value !== "string") return false;
  const parts = value.split(".");
  return (
    parts.length === 2 &&
    parts[0].length > 0 &&
    parts[1].length > 7 &&
    !isNaN(Number(parts[0])) &&
    !isNaN(Number(parts[1]))
  );
};

export const coordsInputPass = (value: string) => {
  if (typeof value !== "string") return false;
return /^-?\d*\.?\d*$/.test(value);
};
