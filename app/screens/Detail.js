

import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView,FlatList, TouchableOpacity} from 'react-native';
import axios from 'axios';
import { ActivityIndicator } from 'react-native';
import { Image as ImgLazy } from 'react-native-elements';

export default function Detail({ nom, description}) {

console.log('detail');




    return (
        <View>

            <Text>{nom}</Text>
            <Text>{description}</Text>
        
        </View>
        

    );
}
