import { StyleSheet } from 'react-native';

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

export default styles;
