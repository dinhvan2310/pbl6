import { addProductToCartApi } from "@/apis/cart";
import { getProductByIdApi } from "@/apis/product";
import Button from "@/components/button/Button";
import Row from "@/components/row/Row";
import SearchBox from "@/components/searchBox/SearchBox";
import Space from "@/components/space/Space";
import ThemeText from "@/components/themeText/ThemeText";
import ThemeView from "@/components/themeView/ThemeView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router, useLocalSearchParams } from "expo-router";
import {
    Back,
    SearchNormal,
    Notification,
    ShoppingCart,
} from "iconsax-react-native";
import React, { useEffect } from "react";
import { Image, View } from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

const Product = () => {
    const { productId } = useLocalSearchParams<{
        productId: string;
    }>();
    const [product, setProduct] = React.useState<ProductType>();
    useEffect(() => {
        (async () => {
            try {
                const product = await getProductByIdApi(productId);
                setProduct(product.data);
            } catch (error: any) {
                // Toast.show({
                //     title: "Error",
                //     textBody: error.messages[0],
                //     type: ALERT_TYPE.DANGER,
                //     autoClose: true,
                // });
                console.log(error);
            }
        })();
    }, [productId]);
    const [search, setSearch] = React.useState("");

    return (
        <ThemeView
            style={{
                position: "relative",
            }}
        >
            <Row
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: useThemeColor({}, "itemBackground"),
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                }}
                justifyContent="space-between"
            >
                <View
                    style={{
                        flex: 1,
                    }}
                >
                    <Button
                        type="outline"
                        text="Add to cart"
                        onPress={async () => {
                            try {
                                if (product?.product_id) {
                                    const rs = await addProductToCartApi(
                                        product.product_id + "",
                                        1
                                    );
                                    console.log(rs);
                                }
                            } catch (error: any) {
                                // Toast.show({
                                //     title: "Error",
                                //     textBody: error.messages[0],
                                //     type: ALERT_TYPE.DANGER,
                                //     autoClose: true,
                                // });
                                console.log(error);
                            }
                        }}
                        style={{
                            paddingVertical: 12,
                            borderRadius: 8,
                            flex: 1,
                        }}
                    />
                </View>
                <View
                    style={{
                        flex: 1,
                        marginLeft: 16,
                    }}
                >
                    <Button
                        type="primary"
                        text="Buy now"
                        onPress={() => {}}
                        style={{
                            paddingVertical: 12,
                            flex: 1,
                        }}
                    />
                </View>
            </Row>
        </ThemeView>
    );
};

export default Product;
