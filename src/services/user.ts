import { request } from ".";

export type UserInfo = {
  _id: string
  name: string
  age: number
  sex: string
  address: string
}

export type UserID = UserInfo['_id'];

export const fetchAllUser = () => request.get<UserInfo[]>("/v1/user")

export const fetchUserById = (id: UserID) => request.get<UserInfo>(`v1/user/${id}`)

export const fetchCreateUser = (data: Partial<UserInfo>) => {
  return request.post<UserInfo>(`v1/user`, data)
}

export const fetchUpdateUserById = (id: UserID, data: Partial<UserInfo>) => request.patch("v1/user", {
  data,
  params: {id}
})

export const fetchDeleteUserById = (id: UserID) => request.delete(`v1/user/${id}`)
