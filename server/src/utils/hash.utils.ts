import bcrypt from 'bcryptjs'

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(12)
    return bcrypt.hash(password, salt)
}

export const comparePassword = async (password: string, hashed: string): Promise<boolean> => {
    return bcrypt.compare(password, hashed)
}
