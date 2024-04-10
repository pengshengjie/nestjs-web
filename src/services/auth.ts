import { request } from ".";

export const login = (data) => {
  return request.post('/v1/auth/login', data)
}
