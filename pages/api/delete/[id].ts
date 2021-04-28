import type { NextApiRequest, NextApiResponse } from "next"
import User from "@models/User"
import dbConnect from "@utils/dataBaseConnection"

export default async (request: NextApiRequest, result: NextApiResponse) => {
  await dbConnect()

  const id  = request.query.id
  const { method } = request
  if (method === "DELETE") {
    try {
      const isUserAlready = await User.findById(id)
      if (isUserAlready) {
        isUserAlready.remove()
        result.json({ message: `Account was deleted` })
      }
      result.status(404).json({ message: "Cannot find user" })
    } catch (err) {
      result.status(400).json({ err })
    }
  } else {
    result.status(400).json({ message: "invalid method" })
  }
}