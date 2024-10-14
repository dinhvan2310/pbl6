import httpRequests from "@/utils/httpRequest"

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

export const addAddress = async (
    receiver_name: string,
    receiver_phone: string,
    receiver_address: string,
) => {
    const response = await httpRequests.post("/receiver-address/add", {
        receiver_name: receiver_name,
        receiver_phone: receiver_phone,
        receiver_address: receiver_address,
    })
    return response
}

export const deleteAddress = async (receiver_address_id: number) => {
    const response = await httpRequests.delete(`/receiver-address/delete/${receiver_address_id}`)
    return response
}

export const updateAddress = async (
    receiver_address_id: number,
    receiver_name: string,
    receiver_phone: string,
    receiver_address: string,
) => {
    const response = await httpRequests.post(`/receiver-address/update/${receiver_address_id}`, {
        receiver_name: receiver_name,
        receiver_phone: receiver_phone,
        receiver_address: receiver_address,
    })
    return response
}
