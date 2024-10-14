import { getProfileCurrentUser, updateProfileCurrentUser } from "@/apis/user";
import Avatar from "@/components/avatar/Avatar";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import Row from "@/components/row/Row";
import Select from "@/components/select/Select";
import Space from "@/components/space/Space";
import ThemeText from "@/components/themeText/ThemeText";
import ThemeView from "@/components/themeView/ThemeView";
import { useThemeColor } from "@/hooks/useThemeColor";
import * as ImagePicker from "expo-image-picker";
import { ImagePickerAsset } from "expo-image-picker";
import { router } from "expo-router";
import { ArrowRotateLeft, Back } from "iconsax-react-native";
import React, { useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { ScrollView } from "react-native-gesture-handler";

const PersonalInfomation = () => {
    useEffect(() => {
        (async () => {
            try {
                const profile = await getProfileCurrentUser();
                setFullName(profile.data.user_fullname);
                setEmail(profile.data.email);
                setGender(profile.data.user_gender);
                setPhone(profile.data.user_phone ?? "");
                setBirthDay(profile.data.user_birthday ?? "");
                setAvatar(profile.data.user_avatar ?? "");
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const [isLoading, setIsLoading] = React.useState(false);

    const [fullName, setFullName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [gender, setGender] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [birthDay, setBirthDay] = React.useState("");
    const [avatar, setAvatar] = React.useState("");
    const [imageFile, setImageFile] = React.useState<ImagePickerAsset>();

    // function
    const handleUpdateAvatar = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            // setImage(result.assets[0].uri);
            setAvatar(result.assets[0].uri);
            setImageFile(result.assets[0]);
        }
    };

    const handleSaveChange = async () => {
        try {
            setIsLoading(true);
            await updateProfileCurrentUser(
                fullName,
                phone,
                birthDay,
                gender,
                email
            );
            router.back();
            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: "Success",
                textBody: "Update profile successfully",
                titleStyle: { color: "black" },
                autoClose: true,
            });
            setIsLoading(false);
        } catch (error: any) {
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: "Warning",
                textBody: error.messages.join("\n"),
                titleStyle: { color: "black" },
                autoClose: true,
            });
            setIsLoading(false);
        }
    };

    return (
        <View style={{ flex: 1 }}>
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

                <ThemeText text="Personal Infomation" type="title" />

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
                <ScrollView>
                    <View
                        style={{
                            backgroundColor: useThemeColor(
                                {},
                                "itemBackground"
                            ),
                            padding: 16,
                        }}
                    >
                        <Row>
                            <Avatar avatarUrl={avatar} size={82} />
                        </Row>
                        <Space size={{ height: 8, width: 0 }} />
                        <Row>
                            <ThemeText
                                type="link"
                                text="Update Avatar"
                                onPress={handleUpdateAvatar}
                            />
                        </Row>
                        <Space size={{ height: 16, width: 0 }} />
                        <Input
                            label="Full Name"
                            value={fullName}
                            onChangeText={setFullName}
                        />
                        <Space size={{ height: 8, width: 0 }} />
                        <Input
                            label="Birth Day"
                            value={birthDay}
                            onChangeText={setBirthDay}
                        />
                        <Space size={{ height: 8, width: 0 }} />
                        <Select
                            label="Gender"
                            onChange={(value) => {
                                setGender(value);
                            }}
                            options={[
                                {
                                    label: "Male",
                                    value: "0",
                                },
                                {
                                    label: "Female",
                                    value: "1",
                                },
                            ]}
                            value={gender.toString()}
                        />

                        <Space size={{ height: 8, width: 0 }} />
                        <Input
                            label="Phone"
                            value={phone}
                            onChangeText={setPhone}
                        />
                        <Space size={{ height: 8, width: 0 }} />
                        <Input
                            label="Email"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    <Space size={{ height: 16, width: 0 }} />
                    <TouchableOpacity
                        style={{
                            backgroundColor: useThemeColor(
                                {},
                                "itemBackground"
                            ),
                        }}
                    >
                        <Row
                            justifyContent="space-between"
                            style={{
                                paddingHorizontal: 16,
                                paddingVertical: 16,
                            }}
                        >
                            <ThemeText
                                type="medium"
                                text="Change Password"
                                style={{ marginLeft: 8, fontWeight: "500" }}
                            />
                            <ArrowRotateLeft
                                size={20}
                                color={useThemeColor({}, "icon")}
                            />
                        </Row>
                    </TouchableOpacity>
                    <Space size={{ height: 32, width: 0 }} />
                </ScrollView>
                <View
                    style={{
                        backgroundColor: useThemeColor({}, "itemBackground"),
                        padding: 16,
                    }}
                >
                    <Button
                        text="Save Change"
                        type="primary"
                        onPress={() => {
                            handleSaveChange();
                        }}
                        loading={isLoading}
                    />
                </View>
            </ThemeView>
        </View>
    );
};

export default PersonalInfomation;
