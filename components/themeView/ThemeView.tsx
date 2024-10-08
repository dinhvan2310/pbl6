import { View, Text, ViewProps, ViewStyle } from "react-native";
import React from "react";
import { useThemeColor } from "@/hooks/useThemeColor";

interface ThemeViewProps {
    children: React.ReactNode;

    style?: ViewStyle;
}

const ThemeView = (props: ThemeViewProps) => {
    const { children, style } = props;
    const backgroundTheme = useThemeColor({}, "background");
    return (
        <View
            style={{
                backgroundColor: backgroundTheme,
                flex: 1,
                padding: 16,
                ...style,
            }}
        >
            {children}
        </View>
    );
};

export default ThemeView;
