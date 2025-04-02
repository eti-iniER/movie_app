import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { images } from "@/constants/images";
import MovieCard from "@/components/MovieCard";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";

const Search = () => {
    const [query, setQuery] = useState("");
    const {
        data: movies,
        loading,
        error,
        refetch: loadMovies,
        reset,
    } = useFetch(() => fetchMovies({ query: query }), false);

    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (query.trim()) {
                await loadMovies();
            } else {
                reset();
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [query]);

    return (
        <View className="flex-1 bg-primary">
            <Image
                source={images.bg}
                className="flex-1 w-full absolute z-0 "
                resizeMode="cover"
            />
            <FlatList
                data={movies}
                keyExtractor={(item) => item?.id?.toString()}
                renderItem={({ item }) => <MovieCard {...item} />}
                columnWrapperStyle={{
                    justifyContent: "flex-start",
                    gap: 16,
                    marginVertical: 16,
                    paddingRight: 5,
                    marginBottom: 10,
                }}
                className="mt-2 pb-32 px-5"
                contentContainerStyle={{
                    paddingBottom: 100,
                }}
                numColumns={3}
                ListHeaderComponent={
                    <>
                        <View className="w-full flex-row justify-center mt-20 items-center">
                            <Image source={icons.logo} className="w-10 h-10" />
                        </View>
                        <View className="my-5">
                            <SearchBar
                                placeholder="Search movies..."
                                value={query}
                                onChangeText={(text) => setQuery(text)}
                            />
                        </View>

                        {loading && (
                            <ActivityIndicator
                                size="large"
                                color="#0000ff"
                                className="my-3"
                            />
                        )}

                        {error && (
                            <Text className="text-red-500 px-5 my-3 text-center">{`Error: ${error.message}`}</Text>
                        )}

                        {!loading &&
                            !error &&
                            query.trim() &&
                            movies?.length > 0 && (
                                <Text className="text-lg text-white mt-5 mb-3 px-5 pl-0">
                                    Search results for:{" "}
                                    <Text className="text-accent italic">
                                        {query}
                                    </Text>
                                </Text>
                            )}
                    </>
                }
                ListEmptyComponent={
                    <>
                        {!loading && !error && (
                            <View className="mt-10 px-5">
                                <Text className="text-gray-500 text-center">
                                    {query.trim()
                                        ? "No movies found"
                                        : "Search for a movie"}
                                </Text>
                            </View>
                        )}
                    </>
                }
            />
        </View>
    );
};

export default Search;
