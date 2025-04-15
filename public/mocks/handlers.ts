import { doc, docs } from './docs';
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('http://localhost:8080/ping', () => {
    return HttpResponse.json({})
  }),

  http.get('http://localhost:8080/docs', () => {
    return HttpResponse.json(docs)
  }),

  http.get('http://localhost:8080/doc/:docId', () => {
    return HttpResponse.json(doc)
  }),

  http.post('http://localhost:8080/doc/:docId', () => {
    return HttpResponse.json({})
  }),

  http.post('http://localhost:5000/products', () => {
    // const info = req.body;
  }),
]
