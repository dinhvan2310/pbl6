import httpRequests from "@/utils/httpRequest"

export const addProductToCartApi = async (productId: string, cartQuantity: number) => {
    // const response = await httpRequests.post(`/cart/add`, { product_id: 290, cart_quantity: 1 })
    // return response
    //Axios post form data
    const response = await httpRequests.post(`/cart/add`, { product_id: productId, cart_quantity: cartQuantity })
    return response
}

export const getCartApi = async () => {
    const response = await httpRequests.get(`/cart`)
    return response
}

export const updateCartApi = async (productId: number, cartQuantity: number) => {
    const response = await httpRequests.post(`/cart/update`, { cart_quantity: cartQuantity, product_id: productId })
    return response
}

export const deleteCardApi = async (productIds: number[]) => {
    const response = await httpRequests.post(`/cart/delete-many`, { ids_cart: productIds })
    return response
}