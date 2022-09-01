import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/useCases/add-account'
import { MongoHelper } from './../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const account = await accountCollection.findOne({ _id: result.insertedId })
    console.log(account)
    const formatedAccount: AccountModel = {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      id: `ObjectId("${account._id}")`,
      email: account.email,
      name: account.name,
      password: account.password

    }
    console.log(formatedAccount)
    return formatedAccount
  }
}
