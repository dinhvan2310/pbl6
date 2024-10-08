import httpRequests from "@/utils/httpRequest"
import { ImagePickerAsset } from "expo-image-picker"

export const getProfileCurrentUser = async () => {
    const response = await httpRequests.get("/user/profile")
    return response
}

// {{host}}/user/update-profile
export const updateProfileCurrentUser = async (
    user_fullname: string,
    user_phone: string,
    user_birthday: string,
    user_gender: string,
    user_email: string,
) => {
    // if (user_avatar) {
    //     const avatarBlob = {
    //         uri: user_avatar.uri,
    //         name: user_avatar.fileName ?? "default_name",
    //         type: user_avatar.type ?? "image/jpeg"
    //     }
    //     const avatarFile = new Blob([JSON.stringify(avatarBlob)], { type: avatarBlob.type })
    //     formData.append("user_avatar", avatarFile, avatarBlob.name)
    // }

    const response = await httpRequests.post("/user/update-profile", {
        user_fullname: user_fullname,
        user_phone: user_phone,
        user_birthday: user_birthday,
        user_gender: user_gender,
        email: user_email,
    })
    return response
}

export const getAllAddress = async () => {
    const response = await httpRequests.get("/receiver-address")
    return response
}