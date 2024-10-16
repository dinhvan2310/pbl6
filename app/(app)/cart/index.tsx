import { deleteCardApi, getCartApi, updateCartApi } from "@/apis/cart";
import Button from "@/components/button/Button";
import CartCard from "@/components/cartCard/CartCard";
import CheckBox from "@/components/checkBox/CheckBox";
import Row from "@/components/row/Row";
import Space from "@/components/space/Space";
import ThemeText from "@/components/themeText/ThemeText";
import ThemeView from "@/components/themeView/ThemeView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { CartItem } from "@/type/cartType";
import { router } from "expo-router";
import { Back } from "iconsax-react-native";
import React, { useEffect } from "react";
import { View } from "react-native";
import { ALERT_TYPE, Dialog, Toast } from "react-native-alert-notification";
import { FlatList } from "react-native-gesture-handler";

const Card = () => {
    const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
    const [checkedList, setCheckedList] = React.useState<number[]>([]);

    const [isCheckedAll, setIsCheckedAll] = React.useState(true);

    useEffect(() => {
        (async () => {
            try {
                const rs = await getCartApi();
                setCartItems(rs.data);

                const checkedList: number[] = [];
                rs.data.forEach((item: CartItem) => {
                    checkedList.push(item.product_id);
                });
                setCheckedList(checkedList);
            } catch (error: any) {
                console.log(error);
            }
        })();
    }, []);

    // function
    const caculateTotal = () => {
        let total = 0;
        cartItems.forEach((item) => {
            if (checkedList.includes(item.product_id))
                total +=
                    Number.parseFloat(item.cart_price) * item.cart_quantity;
        });
        return total;
    };

    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <Row
                style={{
                    justifyContent: "space-between",
                    backgroundColor: useThemeColor({}, "itemBackground"),
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                }}
            >
                <Button
                    type="circle"
                    icon={<Back size={20} color={useThemeColor({}, "text")} />}
                    onPress={() => {
                        router.back();
                    }}
                />

                <ThemeText text="Cart" type="title" />

                <Button
                    type="outline"
                    text="Delete"
                    onPress={() => {
                        Dialog.show({
                            type: ALERT_TYPE.DANGER,
                            closeOnOverlayTap: true,
                            title: "Delete",
                            textBody: "Are you sure you want to delete?",
                            button: "Delete",
                            autoClose: true,
                            onPressButton: async () => {
                                try {
                                    const cartItemDelete = cartItems.filter(
                                        (item) => {
                                            return checkedList.includes(
                                                item.product_id
                                            );
                                        }
                                    );
                                    const rs = await deleteCardApi(
                                        cartItemDelete.map((c) => c.cart_id)
                                    );

                                    const newCartItems = cartItems.filter(
                                        (item) => {
                                            return !checkedList.includes(
                                                item.product_id
                                            );
                                        }
                                    );
                                    setCartItems(newCartItems);
                                } catch (error: any) {
                                    console.log(error);
                                    Toast.show({
                                        title: "Error",
                                        textBody: error.messages[0],
                                        type: ALERT_TYPE.DANGER,
                                        autoClose: true,
                                    });
                                }
                            },
                        });
                    }}
                />
            </Row>

            <ThemeView style={{}}>
                <FlatList
                    data={cartItems}
                    renderItem={({ item }) => (
                        <CartCard
                            onPress={() => {}}
                            cartQuantityChange={async (value) => {
                                try {
                                    const rs = await updateCartApi(
                                        item.product_id,
                                        value
                                    );
                                    console.log(rs);
                                    const newCartItems = cartItems.map(
                                        (cartItem) => {
                                            if (
                                                cartItem.product_id ===
                                                item.product_id
                                            ) {
                                                return {
                                                    ...cartItem,
                                                    cart_quantity: value,
                                                };
                                            }
                                            return cartItem;
                                        }
                                    );
                                    setCartItems(newCartItems);
                                } catch (error: any) {
                                    console.log(error);
                                    Toast.show({
                                        title: "Error",
                                        textBody: error.messages[0],
                                        type: ALERT_TYPE.DANGER,
                                        autoClose: true,
                                    });
                                }
                            }}
                            key={item.product_id}
                            productImage={item.product_images?.[0] ?? ""}
                            productName={item.product_name}
                            cartPrice={Number.parseFloat(item.cart_price)}
                            cartQuantity={item.cart_quantity}
                            isChecked={checkedList.includes(item.product_id)}
                            checkedChange={(value) => {
                                if (value) {
                                    setCheckedList([
                                        ...checkedList,
                                        item.product_id,
                                    ]);
                                } else {
                                    setCheckedList(
                                        checkedList.filter(
                                            (id) => id !== item.product_id
                                        )
                                    );
                                }
                            }}
                        />
                    )}
                    contentContainerStyle={{
                        gap: 8,
                    }}
                />

                <Space size={{ height: 16, width: 0 }} />
                <Row
                    style={{
                        justifyContent: "space-between",
                        borderRadius: 8,
                        padding: 16,
                        backgroundColor: useThemeColor({}, "itemBackground"),
                    }}
                >
                    <CheckBox
                        isChecked={isCheckedAll}
                        label="All"
                        checkedChange={(value) => {
                            setIsCheckedAll(value);
                            if (value) {
                                const checkedList: number[] = [];
                                cartItems.forEach((item) => {
                                    checkedList.push(item.product_id);
                                });
                                setCheckedList(checkedList);
                            } else {
                                setCheckedList([]);
                            }
                        }}
                    />
                    <Row>
                        <View
                            style={{
                                flexDirection: "column",
                                alignItems: "flex-end",
                            }}
                        >
                            <ThemeText text="Total" type="medium" />
                            <ThemeText
                                text={`${caculateTotal()} vnd`}
                                type="large"
                                style={{
                                    fontWeight: "bold",
                                    fontSize: 16,
                                }}
                            />
                        </View>
                        <Space size={{ width: 16, height: 0 }} />
                        <Button
                            type="primary"
                            text="Checkout"
                            onPress={() => {}}
                            style={{
                                paddingVertical: 12,
                                paddingHorizontal: 16,
                            }}
                        />
                    </Row>
                </Row>
            </ThemeView>
        </View>
    );
};

export default Card;
