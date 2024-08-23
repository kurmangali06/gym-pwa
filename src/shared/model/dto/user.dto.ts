export interface BaseUser {
  id: string
  email: string
  full_name: string
  phone: string
  image: string | null
}

export interface UserDTO extends BaseUser {
  cancel_reason: string | null
  created_at: string
  hashed_password: string
  is_active: boolean
  is_manager: boolean
  is_superuser: boolean
  token: string
}
