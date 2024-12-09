import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { datasource } from './Data';

const Edit = ({ navigation, route }) => {
    const { index, type, key, name } = route.params;

    const [moduleName, setModuleName] = useState(name);
    const [moduleGrade, setModuleGrade] = useState(key);

    return (
        <View style={{ padding: 10 }}>
            <Text style={styles.label}>Edit Module Name:</Text>
            <TextInput
                style={styles.input}
                value={moduleName}
                onChangeText={(text) => setModuleName(text)}
            />
            <Text style={styles.label}>Edit Grade:</Text>
            <View style={{ marginVertical: 10 }}>
                <RNPickerSelect
                    value={moduleGrade}
                    onValueChange={(value) => setModuleGrade(value)}
                    items={[
                        { label: 'A', value: 'A' },
                        { label: 'B', value: 'B' },
                        { label: 'C', value: 'C' },
                        { label: 'D', value: 'D' },
                        { label: 'F', value: 'F' },
                    ]}
                />
            </View>
            <View style={styles.buttonRow}>
                <Button
                    title="SAVE"
                    onPress={() => {
                        const section = datasource.find((sec) => sec.title === type);
                        if (section) {
                            section.data[index] = { code: moduleName, grade: moduleGrade };
                            navigation.navigate('Home');
                        }
                    }}
                />
                <Button
                    title="DELETE"
                    onPress={() => {
                        Alert.alert('Confirm Delete', 'Are you sure?', [
                            {
                                text: 'Yes',
                                onPress: () => {
                                    const section = datasource.find((sec) => sec.title === type);
                                    if (section) {
                                        section.data.splice(index, 1);
                                        navigation.navigate('Home');
                                    }
                                },
                            },
                            { text: 'No' },
                        ]);
                    }}
                />
            </View>
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
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default Edit;
