import { CreateMeterValues } from "@/features/meters/model/types";
import { useCreateMeter } from "@/features/meters/model/use-create-meter";
import { MeterForm } from "@/features/meters/ui/meter-form";
import { useThemeColors } from "@/shared/hooks/use-theme";

import Entypo from '@expo/vector-icons/Entypo';
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
export default function CreateMeterScreen() {
    const router = useRouter(),
     theme = useThemeColors(),
     params = useLocalSearchParams(),
     id :any= params?.id??"",
    device_type:any=params?.device_type??""
   
    
    const {CreteMeterMutate,isPending,meterDetail,updateMeterMutate} = useCreateMeter(id,device_type)


    const  onSubmit = (data:CreateMeterValues) => {
        if(id){
            updateMeterMutate(data)
        }else{
            CreteMeterMutate(data)
        }
    }
    
   return (
        <View style={[styles.container,{backgroundColor:theme.background}]}>
            
                <Pressable  onPress={() => router.back()} style={styles.backBtn}>
                    <Entypo name="chevron-small-left" size={24} color={theme.text} />
                    <Text style={{color:theme.text}}>
                   Orqaga 
                    </Text>
                </Pressable>
          
            <Text style={[styles.title,{color:theme.text}]}>Hisoblagich qo'shish</Text>
            <ScrollView>
            <MeterForm loading={isPending} onSubmit={onSubmit} meter={meterDetail??null}/>
            </ScrollView>
        
        </View>
    );
}


const styles = StyleSheet.create({
    container:{
    paddingHorizontal:20,
    paddingTop:16,
    flex:1
    },
    backBtn:{
        alignSelf:"flex-start",
        borderRadius:12,
        flexDirection:'row',
        display:"flex",
        alignItems:'center',
        justifyContent:"center",
        gap:8,
        marginBottom:16
        
    },
    title :{
    fontSize:20,
    fontWeight:600,
    textAlign:"center",
    marginBottom:16
    }
})



