import { ReactNativeFirebase } from "@react-native-firebase/app";
import {View, Text, StyleSheet} from 'react-native'

const Header = (props) => {
    return (
        <View>
            <Text styles={{fontweight:'bold', }}>Header</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        algnitems: 'center',
        justifycontent: 'center'
    },

});
export default Header;