import { View, Text, ViewStyle, TouchableOpacity } from "react-native";
import React from "react";
import ThemeText from "../themeText/ThemeText";
import { useThemeColor } from "@/hooks/useThemeColor";
import Row from "../row/Row";
import { ArrowDown2 } from "iconsax-react-native";
import { FlatList } from "react-native-gesture-handler";

export interface OptionType {
    label: string;
    value: string;
}

export interface SelectProps {
    label?: string;
    options: OptionType[];
    value: string;
    onChange: (value: string) => void;

    style?: ViewStyle;
}

const Select = ({ options, value, onChange, label, style }: SelectProps) => {
    const [open, setOpen] = React.useState(false);

    const primaryColor = useThemeColor({}, "primary");
    const backgroundColor = useThemeColor({}, "background");
    const borderColor = useThemeColor({}, "border");
    const itemBackground = useThemeColor({}, "itemBackground");

    return (
        <View>
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
                    borderRadius: 8,
                    flexDirection: "column",
                    ...style,
                }}
            >
                <TouchableOpacity onPress={() => setOpen(!open)}>
                    <Row
                        justifyContent="space-between"
                        style={{
                            flex: 1,
                            paddingHorizontal: 8,
                            paddingVertical: 14,
                        }}
                    >
                        <ThemeText
                            type="medium"
                            text={options.find((o) => o.value === value)?.label}
                        />
                        <ArrowDown2
                            size={20}
                            color={useThemeColor({}, "icon")}
                        />
                    </Row>
                </TouchableOpacity>
                {open &&
                    options.length > 0 &&
                    options.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => {
                                onChange(option.value);
                                setOpen(false);
                            }}
                            style={{
                                borderColor:
                                    option.value === value
                                        ? primaryColor
                                        : backgroundColor,
                                backgroundColor: itemBackground,
                                borderWidth: 1,
                                borderRadius: 8,
                                paddingHorizontal: 8,
                                paddingVertical: 14,
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                position: "relative",
                            }}
                        >
                            <ThemeText type="medium" text={option.label} />
                        </TouchableOpacity>
                    ))}
            </View>
        </View>
    );
};

export default Select;
