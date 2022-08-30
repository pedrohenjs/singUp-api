import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/useCases/add-account'
import { MongoHelper } from './../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const account = await accountCollection.findOne({ _id: result.insertedId })
    const formatedAccount: AccountModel = {
      id: account._id.toString(),
      email: account.email,
      name: account.name,
      password: account.password

    }
    console.log(formatedAccount)
    return formatedAccount
  }
}
