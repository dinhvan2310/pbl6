import { View, Text, Touchable, ViewStyle } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useThemeColor } from "@/hooks/useThemeColor";
import Space from "../space/Space";
import Row from "../row/Row";

interface ButtonProps {
    text?: string;
    icon?: React.ReactNode;
    type: "primary" | "secondary" | "circle" | "outline";
    onPress: () => void;
    style?: ViewStyle;
}

const Button = ({
    text,
    type = "primary",
    onPress,
    icon,
    style,
}: ButtonProps) => {
    if (type === "circle") {
        return (
            <TouchableOpacity
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
            onPress={onPress}
            style={{
                backgroundColor:
                    type === "primary"
                        ? useThemeColor({}, "primary")
                        : useThemeColor({}, "secondary"),
                padding: 16,
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                ...style,
            }}
        >
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
        </TouchableOpacity>
    );
};

export default Button;
