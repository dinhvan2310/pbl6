import { getAllAddress } from "@/apis/user";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import Row from "@/components/row/Row";
import Space from "@/components/space/Space";
import ThemeText from "@/components/themeText/ThemeText";
import ThemeView from "@/components/themeView/ThemeView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Address } from "@/type/addressType";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { AddSquare, Back } from "iconsax-react-native";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { View } from "react-native";

const AddressBook = () => {
    const [addressList, setAddressList] = React.useState<Address[]>([]);
    const itemBackground = useThemeColor({}, "itemBackground");
    const white = useThemeColor({}, "white");

    // state
    const [receiverName, setReceiverName] = React.useState("");
    const [receiverPhone, setReceiverPhone] = React.useState("");
    const [receiverAddress, setReceiverAddress] = React.useState("");

    useEffect(() => {
        (async () => {
            try {
                const response = await getAllAddress();
                setAddressList(response.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ["92%"], []);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log("handleSheetChanges", index);
    }, []);

    const handleOpenBottomSheet = () => {
        bottomSheetRef.current?.snapToIndex(1);
    };

    return (
        <View style={{ flex: 1, position: "relative" }}>
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

                <ThemeText text="Address Book" type="title" />

                <Button
                    type="circle"
                    icon={<Back size={20} color={useThemeColor({}, "text")} />}
                    onPress={() => {}}
                    style={{ opacity: 0, pointerEvents: "none" }}
                />
            </Row>

            <ThemeView
                style={{
                    paddingHorizontal: 0,
                }}
            >
                {addressList.map((address, index) => {
                    return (
                        <View
                            key={index}
                            style={{
                                padding: 16,
                                backgroundColor: itemBackground,
                            }}
                        >
                            <Row justifyContent="space-between">
                                <ThemeText
                                    type="medium"
                                    style={{
                                        fontWeight: "bold",
                                    }}
                                    text={address.receiver_name}
                                />
                                <ThemeText
                                    type="link"
                                    style={{}}
                                    text="Update"
                                    onPress={() => {}}
                                />
                            </Row>
                            <Space size={{ height: 8, width: 0 }} />
                            <ThemeText
                                text={address.receiver_phone}
                                type="medium"
                                style={{}}
                            />
                            <Space size={{ height: 8, width: 0 }} />
                            <ThemeText
                                text={address.receiver_address}
                                type="medium"
                                style={{}}
                            />
                        </View>
                    );
                })}
                <Space size={{ height: 32, width: 0 }} />
                <View
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: 16,
                        backgroundColor: itemBackground,
                    }}
                >
                    <Button
                        text="Add address"
                        type="primary"
                        onPress={() => {
                            handleOpenBottomSheet();
                        }}
                        icon={<AddSquare size={20} color={white} />}
                    />
                </View>
            </ThemeView>

            {/* // Bottom Sheet */}
            <BottomSheet
                ref={bottomSheetRef}
                onChange={handleSheetChanges}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                index={-1}
            >
                <BottomSheetView
                    style={{
                        backgroundColor: useThemeColor({}, "background"),
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                    }}
                >
                    <Row
                        style={{
                            padding: 16,
                            backgroundColor: useThemeColor(
                                {},
                                "itemBackground"
                            ),
                        }}
                    >
                        <ThemeText text="Add Address" type="title" />
                    </Row>
                    <Space size={{ height: 16, width: 0 }} />
                    <View
                        style={{
                            padding: 16,
                            backgroundColor: useThemeColor(
                                {},
                                "itemBackground"
                            ),
                        }}
                    >
                        <Input
                            label="Receiver Name"
                            value={receiverName}
                            onChangeText={(value) => {
                                setReceiverName(value);
                            }}
                            placeholder="Enter receiver name"
                        />
                        <Space size={{ height: 16, width: 0 }} />
                        <Input
                            label="Receiver Phone"
                            value={receiverPhone}
                            onChangeText={(value) => {
                                setReceiverPhone(value);
                            }}
                            placeholder="Enter receiver phone"
                        />
                        <Space size={{ height: 16, width: 0 }} />
                        <Input
                            label="Address"
                            value={receiverAddress}
                            onChangeText={(value) => {
                                setReceiverAddress(value);
                            }}
                            placeholder="Enter receiver address"
                        />
                    </View>
                    <Space size={{ height: 16, width: 0 }} />
                    <View
                        style={{
                            padding: 16,
                            backgroundColor: useThemeColor(
                                {},
                                "itemBackground"
                            ),
                        }}
                    >
                        <Button
                            text="Add address"
                            type="primary"
                            onPress={() => {}}
                        />
                    </View>
                </BottomSheetView>
            </BottomSheet>
            {/* // Bottom Sheet */}
        </View>
    );
};

export default AddressBook;
