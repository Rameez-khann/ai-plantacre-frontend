
export function sortItemsByField(
  array,
  field,
  order
) {
  return array.slice().sort((a, b) => {
    const valA = a[field];
    const valB = b[field];

    if (valA === valB) return 0;

    const comparison = valA > valB ? 1 : -1;
    return order === 'ASC' ? comparison : -comparison;
  });
}
