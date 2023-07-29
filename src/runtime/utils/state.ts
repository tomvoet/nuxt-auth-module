import { useState } from "nuxt/app";
import { LastTokenRefreshAt, User } from "../types";

export const useAuthAccessToken = () => useState<string>('auth.accessToken');
export const useAuthRefreshToken = () => useState<string>('auth.refreshToken');
export const useAuthLastTokenRefreshAt = () => useState<LastTokenRefreshAt>('auth.lastTokenRefreshAt');
export const useAuthUser = () => useState<User>('auth.user');