import { getCartApi } from "@/apis/cart";
import { getCategoryByIdApi } from "@/apis/category";
import { getProductsByCategoryIdApi } from "@/apis/product";
import Badge from "@/components/badge/Badge";
import BreadCrumb from "@/components/breadCrumb/BreadCrumb";
import Button from "@/components/button/Button";
import CategoryCard from "@/components/categoryCard/CategoryCard";
import ProductCard from "@/components/productCard/ProductCard";
import Row from "@/components/row/Row";
import Space from "@/components/space/Space";
import ThemeText from "@/components/themeText/ThemeText";
import ThemeView from "@/components/themeView/ThemeView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { CategoryType } from "@/type/categoryType";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Href, router, useLocalSearchParams } from "expo-router";
import {
    ArrowDown2,
    ArrowUp2,
    Back,
    Filter,
    ShoppingCart,
} from "iconsax-react-native";
import React, { useCallback, useEffect, useRef } from "react";
import { FlatList } from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { ScrollView } from "react-native-gesture-handler";

const Products = () => {
    const { categoryId } = useLocalSearchParams<{
        categoryId: string;
    }>();
    const primaryColor = useThemeColor({}, "primary");
    const textColor = useThemeColor({}, "text");

    const [activeIndex, setActiveIndex] = React.useState<number>(0);
    const [categories, setCategories] = React.useState<CategoryType[]>([]);
    const [products, setProducts] = React.useState<ProductType[]>([]);
    const [cartCount, setCartCount] = React.useState(0);
    const [breadCrumbs, setBreadCrumbs] = React.useState<string[]>([]);

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
                const category = await getCategoryByIdApi(categoryId);
                setCategories(category.data?.children ?? []);
            } catch (error: any) {
                Toast.show({
                    title: "Error",
                    textBody: error.messages[0],
                    type: ALERT_TYPE.DANGER,
                    autoClose: true,
                });
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const category = categories[activeIndex];
                const products = await getProductsByCategoryIdApi(
                    category.category_name
                );
                setProducts(products.data ?? []);
            } catch (error: any) {
                console.log(error);
            }
        })();
    }, [activeIndex]);

    useEffect(() => {
        (async () => {
            const breadCrumbs = [];
            const category = await getCategoryByIdApi(categoryId);
            let temp = category.data;
            while (temp) {
                breadCrumbs.unshift(temp.category_name);
                temp = (await getCategoryByIdApi(temp.category_parent_id + ""))
                    .data;
            }
            setBreadCrumbs(breadCrumbs);
        })();
    }, [categoryId]);

    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log("handleSheetChanges", index);
    }, []);

    return (
        <ThemeView>
            {/* // BottomSheet  */}
            <BottomSheet ref={bottomSheetRef} onChange={handleSheetChanges}>
                <BottomSheetView>
                    <ThemeText type={"link"}>Awesome 🎉</ThemeText>
                </BottomSheetView>
            </BottomSheet>
            {/* // BottomSheet  */}
            <Row
                style={{
                    justifyContent: "space-between",
                    backgroundColor: useThemeColor({}, "itemBackground"),
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    marginTop: -16,
                    marginHorizontal: -16,
                    marginBottom: 16,
                }}
            >
                <Button
                    type="circle"
                    icon={<Back size={20} color={useThemeColor({}, "text")} />}
                    onPress={() => {
                        router.back();
                    }}
                />
                <BreadCrumb breadCrumbs={breadCrumbs} />

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

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{
                    flexGrow: 0,
                }}
            >
                {categories.map((item, index) => (
                    <CategoryCard
                        key={item.category_id}
                        imageUrl={item.category_thumbnail}
                        title={item.category_name}
                        onPress={() => {
                            setActiveIndex(index);
                        }}
                        style={{
                            width: 80,
                            borderRadius: 0,
                        }}
                        imageStyle={{
                            borderWidth: activeIndex === index ? 1 : 0,
                            borderColor: primaryColor,
                            borderRadius: 8,
                            height: 60,
                        }}
                        titleStyle={{
                            color:
                                activeIndex === index
                                    ? primaryColor
                                    : textColor,
                        }}
                    />
                ))}
            </ScrollView>
            <Space size={{ height: 8, width: 0 }} />
            <FlatList
                ListHeaderComponent={() => (
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{
                            flexGrow: 0,
                            borderRadius: 8,
                            padding: 8,
                            backgroundColor: useThemeColor(
                                {},
                                "itemBackground"
                            ),
                        }}
                    >
                        <Button
                            type="outline"
                            text="Filter"
                            onPress={() => {}}
                            icon={
                                <Filter
                                    size={16}
                                    color={useThemeColor({}, "primary")}
                                />
                            }
                        />
                        <Space size={{ width: 8, height: 0 }} />
                        <Button
                            type="outline"
                            text="Price Asc"
                            onPress={() => {}}
                            icon={
                                <ArrowUp2
                                    size={16}
                                    color={useThemeColor({}, "primary")}
                                />
                            }
                        />
                        <Space size={{ width: 8, height: 0 }} />
                        <Button
                            type="outline"
                            text="Price Desc"
                            onPress={() => {}}
                            icon={
                                <ArrowDown2
                                    size={16}
                                    color={useThemeColor({}, "primary")}
                                />
                            }
                        />
                    </ScrollView>
                )}
                data={products}
                renderItem={({ item }) => (
                    <ProductCard
                        key={item.product_id}
                        imageUrls={item.product_images ?? []}
                        title={item.product_name}
                        price={item.product_price}
                        sold={item.product_sold}
                        onPress={() => {
                            router.navigate(
                                ("/(app)/products/product/" +
                                    item.product_id) as Href
                            );
                        }}
                    />
                )}
                keyExtractor={(item) => item.product_id.toString()}
                numColumns={2}
                contentContainerStyle={{ gap: 8 }}
                columnWrapperStyle={{ gap: 8 }}
                style={{
                    flex: 0,
                    height: "50%",
                }}
            />
        </ThemeView>
    );
};

export default Products;
