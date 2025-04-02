import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

interface SearchBarProps {
    placeholder: string;
    value?: string;
    onPress?: () => void;
    onChangeText?: (text: string) => void;
}

const SearchBar = ({
    placeholder,
    onPress,
    value,
    onChangeText,
}: SearchBarProps) => {
    return (
        <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
            <Image
                source={icons.search}
                className="size-5"
                resizeMode="contain"
                tintColor="#ab8bff"
            />
            <TextInput
                placeholder={placeholder}
                onPress={onPress}
                onChangeText={onChangeText}
                value={value}
                placeholderTextColor="#ab8bff"
                className="flex-1 ml-2 text-white"
            />
        </View>
    );
};

export default SearchBar;
