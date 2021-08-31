export function getImageUrl(seed: string, width: number, height: number) {
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}

export type HTTPMethod = 'GET' | 'POST';

export async function apiCall(path: string, method: HTTPMethod, body?: object): Promise<any> {
    return fetch(path, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }