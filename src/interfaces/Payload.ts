export interface LoginPayload {
    success: boolean
    user: User
    token: string
}

export interface User {
    avatar: Avatar
    role: string
    _id: string
    name: string
    email: string
    password: string
    createdAt: string
    __v: number
    resetPasswordExpire: string
    resetPasswordToken: string
}

export interface Avatar {
    public_id: string
    url: string
}
