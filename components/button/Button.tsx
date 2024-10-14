import { View, Text, Touchable, ViewStyle } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useThemeColor } from "@/hooks/useThemeColor";
import Space from "../space/Space";
import Row from "../row/Row";
import LottieView from "lottie-react-native";

interface ButtonProps {
    text?: string;
    icon?: React.ReactNode;
    type: "primary" | "secondary" | "circle" | "outline";
    onPress: () => void;
    style?: ViewStyle;

    disabled?: boolean;
    loading?: boolean;
}

const Button = ({
    text,
    type = "primary",
    onPress,
    icon,
    style,
    disabled = false,
    loading = false,
}: ButtonProps) => {
    if (type === "circle") {
        return (
            <TouchableOpacity
                disabled={disabled || loading}
                onPress={onPress}
                style={{
                    backgroundColor: "transparent",
                    padding: 16,
                    borderRadius: 50,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    ...style,
                }}
            >
                {icon && icon}
            </TouchableOpacity>
        );
    }

    if (type === "outline") {
        return (
            <TouchableOpacity
                disabled={disabled || loading}
                onPress={onPress}
                style={{
                    backgroundColor: "transparent",
                    paddingVertical: 4,
                    paddingHorizontal: 16,
                    flexDirection: "row",
                    borderRadius: 4,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 1,
                    borderColor: useThemeColor({}, "primary"),
                    ...style,
                }}
            >
                {icon && icon}
                {icon && <Space size={{ width: 8, height: 0 }} />}
                <Text
                    style={{
                        color: useThemeColor({}, "primary"),
                        fontSize: 14,
                    }}
                >
                    {text}
                </Text>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity
            disabled={disabled || loading}
            onPress={onPress}
            style={{
                backgroundColor:
                    type === "primary"
                        ? useThemeColor({}, "primary")
                        : useThemeColor({}, "secondary"),
                padding: loading ? 0 : 16,
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                ...style,
            }}
        >
            {loading ? (
                <LottieView
                    source={require("@/assets/animation/buttonLoading.json")}
                    autoPlay
                    loop
                    resizeMode="contain"
                    style={{ width: 54, height: 54 }}
                />
            ) : (
                <Row>
                    {icon && icon}
                    {icon && <Space size={{ width: 8, height: 0 }} />}
                    <Text
                        style={{
                            color: type === "primary" ? "#fff" : "#000",
                            fontSize: 16,
                        }}
                    >
                        {text}
                    </Text>
                </Row>
            )}
        </TouchableOpacity>
    );
};

export default Button;
