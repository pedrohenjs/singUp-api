import { BCryptAdapter } from './bcrypt-adapter'
import bcrypt from 'bcrypt'

describe('BCrypt Adapter', () => {
  test('Should call BCrypt with correct values', async () => {
    const salt = 12
    const sut = new BCryptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('valid_password')
    expect(hashSpy).toHaveBeenCalledWith('valid_password', salt)
  })
})
