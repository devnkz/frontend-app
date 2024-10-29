import { View, Text, TouchableOpacity } from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { InputComum } from "../components/input/inputComum";
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
        <View style={{ flex: 1 }} className='justify-center items-center bg-zinc-900 p-4 rounded-lg gap-6'>
            <View className='w-4/5'>
                <Text className="text-2xl text-white text-center">Olá {user?.firstName}</Text>
                <View className="w-full flex justify-center items-center mt-4 gap-2">
                   
                    <TouchableOpacity style={{ width: 300, marginTop: 12 }} onPress={handleUpdateProfile}>
                        <View className="flex justify-center items-center bg-black p-2 rounded-md">
                            <Text className="font-bold text-xl text-white">Atualizar seu perfil</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: 300, marginTop: 12 }} onPress={LogoutUser}>
                        <View className="flex justify-center items-center bg-red-600 p-2 rounded-md">
                            <Text className="font-bold text-xl text-white">Sair da conta</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

