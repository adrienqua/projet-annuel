const API = import.meta.env.VITE_API_URL

export async function compareComponents(id1: number, id2: number) {
  const res = await fetch(`${API}/compare`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id1, id2 }),
  })

  if (!res.ok) {
    throw new Error('Erreur lors de la comparaison.')
  }

  return await res.json()
}
