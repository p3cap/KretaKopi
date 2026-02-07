function formatDate(dateStr) {
  const date = new Date(dateStr);
  if (isNaN(date)) return dateStr; // fallback
  return date.toLocaleDateString('hu-HU', { year: 'numeric', month: '2-digit', day: '2-digit' });
}

export { formatDate };