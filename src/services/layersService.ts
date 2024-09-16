export const fetchJson = async (file: string) => {
  const response = await fetch(`http://localhost:3100/api/layer/${file}`);
  if (!response.ok) {
    throw new Error(`Error fetching ${file}: ${response.statusText}`);
  }
  return response.json();
};
