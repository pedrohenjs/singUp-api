import { BCryptAdapter } from './bcrypt-adapter'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => {
  return {
    async hash (): Promise<string> {
      return await new Promise(resolve => resolve('hashed_password'))
    }
  }
})

describe('BCrypt Adapter', () => {
  test('Should call BCrypt with correct values', async () => {
    const salt = 12
    const sut = new BCryptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('valid_password')
    expect(hashSpy).toHaveBeenCalledWith('valid_password', salt)
  })

  test('Should returns a hash on success', async () => {
    const salt = 12
    const sut = new BCryptAdapter(salt)
    const hashedPassword = await sut.encrypt('valid_password')
    expect(hashedPassword).toEqual('hashed_password')
  })
})
