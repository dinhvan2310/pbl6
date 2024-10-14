import { addProductToCartApi, getCartApi } from "@/apis/cart";
import { getProductByIdApi } from "@/apis/product";
import Badge from "@/components/badge/Badge";
import Button from "@/components/button/Button";
import Row from "@/components/row/Row";
import SearchBox from "@/components/searchBox/SearchBox";
import ThemeText from "@/components/themeText/ThemeText";
import ThemeView from "@/components/themeView/ThemeView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ProductType } from "@/type/productType";
import { router, useLocalSearchParams } from "expo-router";
import { Back, ShoppingCart } from "iconsax-react-native";
import React, { useEffect, useRef } from "react";
import { Image, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ImageViewer, ImageWrapper } from "react-native-reanimated-viewer";

const Product = () => {
    const { productId } = useLocalSearchParams<{
        productId: string;
    }>();

    const [product, setProduct] = React.useState<ProductType>();
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
    useEffect(() => {
        (async () => {
            try {
                const product = await getProductByIdApi(productId);
                setProduct(product.data);
            } catch (error: any) {
                console.log(error);
            }
        })();
    }, [productId]);
    const [search, setSearch] = React.useState("");

    const imageRef = useRef(null);

    return (
        <ThemeView
            style={{
                position: "relative",
                padding: 0,
            }}
        >
            {/* // Header ------------------- */}
            <Row
                style={{
                    justifyContent: "space-between",
                    backgroundColor: useThemeColor({}, "itemBackground"),
                    paddingVertical: 8,
                    paddingHorizontal: 32,
                    marginHorizontal: -16,
                    alignItems: "center",
                }}
            >
                <Button
                    type="circle"
                    icon={<Back size={20} color={useThemeColor({}, "text")} />}
                    onPress={() => {
                        router.back();
                    }}
                />
                <SearchBox
                    value={search}
                    onChangeText={setSearch}
                    placeholder="Search"
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
                            router.navigate("/(app)/cart");
                        }}
                    />
                </Badge>
            </Row>
            {/* // Header ------------------- */}

            <ScrollView>
                <ImageViewer
                    ref={imageRef}
                    data={
                        product?.product_images?.map((el) => ({
                            key: el,
                            source: { uri: el },
                        })) ?? []
                    }
                />
                <View style={{ flexDirection: "row" }}>
                    <ImageWrapper
                        key={product?.product_images?.[0] ?? ""}
                        viewerRef={imageRef}
                        index={0}
                        source={{
                            uri: product?.product_images?.[0],
                        }}
                    >
                        <Image
                            source={{
                                uri: product?.product_images?.[0],
                            }}
                            style={{
                                width: "100%",
                                aspectRatio: 1,
                            }}
                        />
                    </ImageWrapper>
                </View>

                <ThemeView>
                    <ThemeText type="title" text={product?.product_name} />
                    <ThemeText type="medium" text={product?.product_price} />
                </ThemeView>
            </ScrollView>
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
