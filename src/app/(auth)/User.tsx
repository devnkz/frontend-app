import { View, Text, Pressable, TextInput, Image, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useState } from "react";


export default function User() {

    const { user } = useUser();
    const [Name, setName] = useState(user?.firstName ?? "");
    const [Lastname, setLastname] = useState(user?.lastName ?? "");
    const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress ?? "");

    async function handleUpdateProfile() {
        try {
            const result = await user?.update({
                firstName: Name,
                lastName: Lastname
            });
            console.log("Usuario atualizado", result)
        } catch (err) {
            console.log("Erro ao atualizar", err);
        }
    }

    const { signOut } = useAuth();
    function LogoutUser() {
        signOut();
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }} className='bg-zinc-900 rounded-lg gap-6 justify-center '>
                <ScrollView>
                    <View className="p-4 flex justify-end gap-2">
                        <View className="border-2 border-zinc-400 p-4 rounded-lg">
                            <Image source={require('../../assets/imgs/logoWhite.png')}
                                className="h-36 w-44"
                            />
                        </View>
                        <View>
                            <Text className="text-white text-center text-xl">{user?.fullName}</Text>
                            <Text className="text-white text-center text-sm">Cliente</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1 }} className="gap-8">
                        <View>
                            <Text className="text-white text-xl">Email:</Text>
                            <TextInput className="border-b-2 border-white w-full placeholder:text-zinc-400"
                                placeholder={user?.emailAddresses[0].emailAddress} />
                        </View>
                        <View>
                            <Text className="text-white text-xl">Nome:</Text>
                            <TextInput className="border-b-2 border-white w-full placeholder:text-zinc-400"
                                placeholder={user?.firstName ?? ''} />
                        </View>
                        <View>
                            <Text className="text-white text-xl">Sobrenome:</Text>
                            <TextInput className="border-b-2 border-white w-full placeholder:text-zinc-400"
                                placeholder={user?.lastName ?? ''} />
                        </View>
                        <Text className="text-white text-center text-2xl">Adicione seu endereço</Text>
                        <View>
                            <Text className="text-white text-xl">Bairro:</Text>
                            <TextInput className="border-b-2 border-white w-full placeholder:text-zinc-400" />
                        </View>
                        <View>
                            <Text className="text-white text-xl">Rua:</Text>
                            <TextInput className="border-b-2 border-white w-full placeholder:text-zinc-400" />
                        </View>
                        <View>
                            <Text className="text-white text-xl">Numero da casa:</Text>
                            <TextInput className="border-b-2 border-white w-full placeholder:text-zinc-400" />
                        </View>
                    </View>
                    <View className="w-full p-4 flex items-center bottom-0 gap-4">
                        <Pressable onPress={handleUpdateProfile} className="bg-transparent p-3 border-2 border-zinc-600 rounded-full w-4/5">
                            <Text className="text-white text-center text-xl">Atualizar</Text>
                        </Pressable>
                        <Pressable onPress={LogoutUser} className="bg-transparent p-3 border-2 border-red-600 rounded-full w-4/5">
                            <Text className="text-white text-center text-xl">Sair da conta</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

