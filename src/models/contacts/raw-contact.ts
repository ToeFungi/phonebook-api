/**
 * Representation of a raw contact extracted from the database
 */
interface RawContact {
  _id: string
  email: string
  userId: string
  mobile: string
  nickname: string
  lastname: string
  firstname: string
  mobileIDC: string
  createdAt: string
  updatedAt: string
}

export { RawContact }
