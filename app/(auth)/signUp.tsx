import Button from "@/components/button/Button";
import HorizontalRule from "@/components/horizontalRule/HorizontalRule";
import Input from "@/components/input/Input";
import Row from "@/components/row/Row";
import Space from "@/components/space/Space";
import ThemeText from "@/components/themeText/ThemeText";
import ThemeView from "@/components/themeView/ThemeView";
import { useAuth } from "@/context/auth";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Href, router } from "expo-router";
import {
    EmojiSad,
    Facebook,
    Gift,
    Google,
    PasswordCheck,
    Personalcard,
} from "iconsax-react-native";
import React from "react";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

const SignUp = () => {
    const { signUp } = useAuth();

    const [fullName, setFullName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");

    return (
        <ThemeView>
            <ThemeText text="Create an" type="large" />
            <ThemeText text="account" type="large" />
            <Space size={{ width: 0, height: 16 }} />
            <Input
                placeholder="Fullname"
                value={fullName}
                onChangeText={(text) => setFullName(text)}
                icon={
                    <Personalcard size={20} color={useThemeColor({}, "icon")} />
                }
            />

            <Space size={{ width: 0, height: 16 }} />
            <Input
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                icon={<EmojiSad size={20} color={useThemeColor({}, "icon")} />}
            />
            <Space size={{ width: 0, height: 16 }} />
            <Input
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                icon={
                    <PasswordCheck
                        size={20}
                        color={useThemeColor({}, "icon")}
                    />
                }
            />
            <Space size={{ width: 0, height: 16 }} />
            <Input
                placeholder="Confirm password"
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
                icon={
                    <PasswordCheck
                        size={20}
                        color={useThemeColor({}, "icon")}
                    />
                }
            />
            <Row
                justifyContent="flex-start"
                style={{
                    marginTop: 8,
                }}
            >
                <ThemeText text="By clicking the" type="small" />
                <Space size={{ width: 4, height: 0 }} />
                <ThemeText text="Register" type="link" />
                <Space size={{ width: 4, height: 0 }} />
                <ThemeText
                    text="button, you agree to the public offer"
                    type="small"
                />
            </Row>

            <Space size={{ width: 0, height: 32 }} />

            <Button
                text="Register"
                onPress={async () => {
                    try {
                        if (
                            !fullName ||
                            !email ||
                            !password ||
                            !confirmPassword
                        ) {
                            Toast.show({
                                type: ALERT_TYPE.WARNING,
                                title: "Warning",
                                textBody: "Please fill all fields",
                                titleStyle: { color: "black" },
                                autoClose: true,
                            });
                            return;
                        }
                        if (password !== confirmPassword) {
                            Toast.show({
                                type: ALERT_TYPE.WARNING,
                                title: "Warning",
                                textBody:
                                    "Password and Confirm password do not match",
                                titleStyle: { color: "black" },
                                autoClose: true,
                            });
                            return;
                        }
                        await signUp(
                            fullName,
                            email,
                            password,
                            confirmPassword
                        );
                        router.navigate(
                            ("/(auth)/verifyEmail/" + email) as Href
                        );
                    } catch (error: any) {
                        Toast.show({
                            type: ALERT_TYPE.WARNING,
                            title: "Warning",
                            textBody: error.messages[0],
                            titleStyle: { color: "black" },
                            autoClose: true,
                        });
                    }
                }}
                type="primary"
            />

            <Space size={{ width: 0, height: 16 }} />

            <HorizontalRule text="OR" />

            <Space size={{ width: 0, height: 16 }} />

            <Row justifyContent="center">
                <Button
                    onPress={() => {}}
                    type="circle"
                    style={{
                        backgroundColor: "transparent",
                        borderWidth: 0.5,
                        borderColor: useThemeColor({}, "icon"),
                        borderStyle: "solid",
                    }}
                    icon={
                        <Google size={20} color={useThemeColor({}, "text")} />
                    }
                />
                <Space size={{ width: 8, height: 0 }} />
                <Button
                    onPress={() => {}}
                    type="circle"
                    style={{
                        backgroundColor: "transparent",
                        borderWidth: 0.5,
                        borderColor: useThemeColor({}, "icon"),
                        borderStyle: "solid",
                    }}
                    icon={
                        <Facebook size={20} color={useThemeColor({}, "text")} />
                    }
                />
                <Space size={{ width: 8, height: 0 }} />
                <Button
                    onPress={() => {}}
                    type="circle"
                    style={{
                        backgroundColor: "transparent",
                        borderWidth: 0.5,
                        borderColor: useThemeColor({}, "icon"),
                        borderStyle: "solid",
                    }}
                    icon={<Gift size={20} color={useThemeColor({}, "text")} />}
                />
            </Row>

            <Space size={{ width: 0, height: 16 }} />

            <Row justifyContent="center">
                <ThemeText text="I already have an account" type="small" />
                <Space size={{ width: 4, height: 0 }} />
                <ThemeText
                    text="Sign In"
                    type="link"
                    onPress={() => {
                        router.navigate("/(auth)/signIn");
                    }}
                />
            </Row>
        </ThemeView>
    );
};

export default SignUp;
