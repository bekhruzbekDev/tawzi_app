import React from 'react';
import { ActivityIndicator, Alert, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/theme';
import { useDelete } from '../hooks/use-delete';
import { useThemeColors } from '../hooks/use-theme';


interface Props {
  visible: {open:boolean,path:string};
  onchange: (data:{open:boolean,path:string}) => void;
  queryKey:string  
}
const DeleteModal = ({visible,onchange,queryKey}: Props) => {
  const theme = useThemeColors();

  const {mutate,isLoading} = useDelete(visible.path,queryKey,onchange)
  return (

        <Modal
          animationType="fade"
          transparent={true}
          visible={visible.open}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            onchange({open:false,path:""});
          }}>
          <View style={styles.centeredView}>
            <View style={[styles.modalView,{backgroundColor:theme.surface}]}>
              <Text style={[styles.modalText,styles.textStyle,{color:theme.text}]}>Rostanham o'chirmoqchimisiz ?</Text>
              <View style={{flexDirection:"row",justifyContent:"flex-end",width:"100%",gap:16}}>

              <Pressable
                style={[styles.button, styles.buttonClose]}
            
                onPress={() => onchange({open:false,path:""})}>
                <Text style={styles.textStyle}>Yo'q</Text>
              </Pressable>

              <Pressable
                style={[styles.button,styles.buttonYes]}
                onPress={()=>mutate()}>
                {isLoading ? <ActivityIndicator size="small" color={Colors.primary} /> : <Text style={styles.textStyle}>Ha</Text>}
              </Pressable>

                    </View>
            </View>
          </View>
        </Modal>
       
 
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    paddingHorizontal:30,
    backgroundColor:"rgba(0,0,0,0.5)"
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    width:80,
    borderRadius: 10,
    paddingVertical:10,
    elevation: 2,
  },
 
  buttonClose: {
    backgroundColor:Colors.primary,
  },
  buttonYes: {
    backgroundColor: 'red',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    fontSize:16,
    textAlign:"left"
  },
});

export default DeleteModal;