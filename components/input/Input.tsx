import { View, Text, TextInput } from "react-native";
import React, { ReactNode } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";

interface InputProps {
    placeholder?: string;
    value: string;
    icon?: ReactNode;
    label?: string;

    disabled?: boolean;

    onChangeText?: (text: string) => void;
}

const Input = ({
    placeholder,
    value,
    onChangeText,
    icon,
    label,
    disabled = false,
}: InputProps) => {
    return (
        <View
            style={{
                pointerEvents: disabled ? "none" : "auto",
            }}
        >
            {label && (
                <Text
                    style={{
                        color: useThemeColor({}, "text"),
                        marginBottom: 4,
                        marginLeft: 4,
                        fontSize: 16,
                        fontWeight: "500",
                    }}
                >
                    {label}
                </Text>
            )}
            <View
                style={{
                    backgroundColor: useThemeColor({}, "background"),
                    borderColor: useThemeColor({}, "border"),
                    borderWidth: 1,
                    padding: 8,
                    borderRadius: 8,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    position: "relative",
                    opacity: disabled ? 0.6 : 1,
                }}
            >
                {icon && <View style={{ marginRight: 8 }}>{icon}</View>}
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={useThemeColor({}, "icon")}
                    cursorColor={useThemeColor({}, "text")}
                    style={{
                        flex: 1,
                    }}
                />
            </View>
        </View>
    );
};

export default Input;
