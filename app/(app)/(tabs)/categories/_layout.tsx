import { getCartApi } from "@/apis/cart";
import Badge from "@/components/badge/Badge";
import Button from "@/components/button/Button";
import Row from "@/components/row/Row";
import SearchBox from "@/components/searchBox/SearchBox";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router, Stack } from "expo-router";
import {
    Back,
    Notification,
    SearchNormal,
    ShoppingCart,
} from "iconsax-react-native";
import React, { useEffect } from "react";

const _layout = () => {
    const [search, setSearch] = React.useState("");
    const [cartCount, setCartCount] = React.useState(0);
    useEffect(() => {
        (async () => {
            try {
                const carts = await getCartApi();
                setCartCount(carts.data.length);
            } catch (error: any) {
                console.log(error);
            }
        })();
    }, []);
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                header: () => (
                    <Row
                        style={{
                            justifyContent: "space-between",
                            backgroundColor: useThemeColor(
                                {},
                                "itemBackground"
                            ),
                            paddingVertical: 8,
                            paddingHorizontal: 16,
                        }}
                    >
                        <Button
                            type="circle"
                            icon={
                                <Back
                                    size={20}
                                    color={useThemeColor({}, "text")}
                                />
                            }
                            onPress={() => {
                                router.back();
                            }}
                        />
                        <SearchBox
                            value={search}
                            onChangeText={setSearch}
                            placeholder="Search categories"
                            icon={
                                <SearchNormal
                                    size={20}
                                    color={useThemeColor({}, "text")}
                                />
                            }
                        />
                        <Button
                            type="circle"
                            icon={
                                <Notification
                                    size={20}
                                    color={useThemeColor({}, "text")}
                                />
                            }
                            onPress={() => {}}
                        />
                        <Badge count={cartCount}>
                            <Button
                                type="circle"
                                icon={
                                    <ShoppingCart
                                        size={20}
                                        color={useThemeColor({}, "text")}
                                    />
                                }
                                onPress={() => {
                                    router.navigate("cart");
                                }}
                            />
                        </Badge>
                    </Row>
                ),
            }}
        />
    );
};

export default _layout;
