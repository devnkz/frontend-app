import { Tabs } from "expo-router";

export default function AuthLayout(){
    return(
        <Tabs screenOptions={{headerShown: false}}>
            <Tabs.Screen name="Home"/>
            <Tabs.Screen name="Carrinho"/>
            <Tabs.Screen name="User"/>
        </Tabs>
    )
}