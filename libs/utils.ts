export function cls(...classnames: string[]) {
  return classnames.join("");
}
export const parsedUpdatedAt = (isDetail: boolean, updatedAt: Date) => {
  const parsed = updatedAt.toString();
  const mmdd = `${parsed.slice(5, 10)} ${parsed.slice(11, 16)}`;
  const yymmdd = `${parsed.slice(0, 4)} ${parsed.slice(5, 10)} ${parsed.slice(
    11,
    16
  )}`;
  return !isDetail ? mmdd : yymmdd;
};
