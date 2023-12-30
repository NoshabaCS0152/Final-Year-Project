// DeclinedAppointments.js
import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AppointmentsContext from './AppointmentsContext'; // <-- Make sure the path is correct

const DeclinedAppointments = ({ route }) => {
    const data = route?.params?.data || [];
    const appointments = useContext(AppointmentsContext);
    const DeclinedAppointments = appointments.filter(app => app.status === 'Declined');


    return (
        <View style={styles.container}>
            {DeclinedAppointments.length === 0 ? (
                <Text style={styles.noAppointmentsText}>No Declined appointments.</Text>
            ) : (
                <FlatList
                    data={DeclinedAppointments} // <-- Use acceptedAppointments here
                    keyExtractor={item => item.uuid}
                    renderItem={({ item }) => {
                        return (
                            // Your appointment card rendering logic here
                            <View style={styles.appointmentItem} >
                                <Text style={styles.serviceName}>Service Name: {item.serviceName}</Text>
                                <Text style={styles.dateText}>Date: {item.setDate}</Text>
                                <Text style={styles.dateText}>Time: {item.setTime}</Text>
                                <Text style={styles.descriptionText}>Description: {item.description}</Text>
                                <Text style={styles.statusText}>Status: {item.status}</Text>
                                <Text style={styles.statusText}>Other Suggested time: {item.newAppointmentTime}</Text>
                            </View>
                        )
                    }}
                />
            )}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#f8f9fa'
    },
    noAppointmentsText: {
        fontSize: 18,
        color: '#6c757d',
        textAlign: 'center',
        marginTop: 20
    },
    appointmentItem: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FF7851',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22
    },
    serviceName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FF7851',
        marginBottom: 5
    },
    dateText: {
        fontSize: 16,
        color: '#6c757d',
        marginBottom: 5
    },
    descriptionText: {
        fontSize: 16,
        marginBottom: 10
    },
    statusText: {
        fontSize: 16,
        fontWeight: '500',
    }
});

export default DeclinedAppointments;
