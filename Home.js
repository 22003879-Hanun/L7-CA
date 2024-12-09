import React, { useState, useEffect } from 'react';
import {
    StatusBar,
    Button,
    SectionList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Alert,
} from 'react-native';
import { datasource } from './Data';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const navigation = useNavigation();
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setRefresh((prev) => !prev); // Toggle refresh state on screen focus
        });
        return unsubscribe;
    }, [navigation]);

    const calculateGPA = () => {
        let totalCredits = 0;
        let totalGradePoints = 0;

        datasource.forEach((section) => {
            section.data.forEach((item) => {
                const gradeValue = getGradeValue(item.grade);
                if (gradeValue !== null) {
                    totalGradePoints += gradeValue * 1; // Assuming 1 credit per module
                    totalCredits += 1; // Increment credits
                }
            });
        });

        const gpa = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0;
        Alert.alert('Your GPA', `Your GPA is: ${gpa}`);
    };

    const getGradeValue = (grade) => {
        const gradeMapping = {
            A: 4,
            B: 3,
            C: 2,
            D: 1,
            F: 0,
        };
        return gradeMapping[grade] ?? null;
    };

    const renderItem = ({ item, index, section }) => (
        <TouchableOpacity
            style={styles.opacityStyle}
            onPress={() =>
                navigation.navigate('Edit', {
                    index: index,
                    type: section.title,
                    key: item.grade,
                    name: item.code,
                })
            }
        >
            <Text style={styles.textStyle}>
                {item.code} - Grade: {item.grade}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar />
            <Button
                title="Add Module"
                onPress={() => {
                    navigation.navigate('Add');
                }}
            />
            <Button
                title="Calculate GPA"
                onPress={calculateGPA}
                color="green"
            />
            <SectionList
                sections={datasource}
                keyExtractor={(item, index) => `${item.code}-${index}`}
                renderItem={renderItem}
                renderSectionHeader={({ section: { title, bgcolor } }) => (
                    <Text
                        style={[
                            styles.headerText,
                            { backgroundColor: bgcolor },
                        ]}
                    >
                        {title}
                    </Text>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 15,
        margin: 10,
        textAlign: 'left',
    },
    opacityStyle: {
        borderWidth: 1,
        borderColor: 'gray',
        margin: 5,
        padding: 10,
        borderRadius: 5,
    },
    headerText: {
        fontSize: 20,
        marginVertical: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        padding: 5,
    },
    container: {
        flex: 1,
        padding: 10,
    },
});

export default Home;
