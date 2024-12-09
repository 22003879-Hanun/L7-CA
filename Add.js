import React, { useState } from 'react';
import { TextInput, View, Text, Button, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { datasource } from './Data';

const Add = ({ navigation }) => {
    const [module, setModule] = useState('');
    const [grade, setGrade] = useState('SELECT GRADE');

    return (
        <View style={{ padding: 10 }}>
            <Text style={styles.label}>Module:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Module Name"
                onChangeText={(text) => setModule(text)}
                value={module}
            />
            <View style={{ padding: 10 }}>
                <RNPickerSelect
                    value={grade}
                    onValueChange={(value) => setGrade(value)}
                    items={[
                        { label: 'A', value: 'A' },
                        { label: 'B', value: 'B' },
                        { label: 'C', value: 'C' },
                        { label: 'D', value: 'D' },
                        { label: 'F', value: 'F' },
                    ]}
                />
            </View>
            <Button
                title="SUBMIT"
                onPress={() => {
                    if (module && grade !== 'SELECT GRADE') {
                        datasource[0].data.push({ code: module, grade });
                        navigation.navigate('Home');
                    } else {
                        alert('Please fill in all fields.');
                    }
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
});

export default Add;
