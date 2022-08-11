import type {
  QueryResolvers,
  MutationResolvers,
  HouseResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const houses: QueryResolvers['houses'] = () => {
  return db.house.findMany()
}

export const house: QueryResolvers['house'] = ({ id }) => {
  return db.house.findUnique({
    where: { id },
  })
}

export const createHouse: MutationResolvers['createHouse'] = ({ input }) => {
  return db.house.create({
    data: input,
  })
}

export const updateHouse: MutationResolvers['updateHouse'] = ({
  id,
  input,
}) => {
  return db.house.update({
    data: input,
    where: { id },
  })
}

export const deleteHouse: MutationResolvers['deleteHouse'] = ({ id }) => {
  return db.house.delete({
    where: { id },
  })
}

export const House: HouseResolvers = {
  users: (_obj, { root }) =>
    db.house.findUnique({ where: { id: root.id } }).users(),
  payments: (_obj, { root }) =>
    db.house.findUnique({ where: { id: root.id } }).payments(),
}
