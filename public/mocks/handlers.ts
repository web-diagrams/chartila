import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('http://localhost:8080/ping', () => {
    return HttpResponse.json({})
  }),

  http.post('http://localhost:5000/products', (req) => {
    // const info = req.body;
  }),
]
