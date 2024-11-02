import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import api from '../../../services/axiosInstance';

interface DataType {
    id: number;
    title: string;
    body: string;
}

const HomeScreen: React.FC = () => {
    const [data, setData] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/pokemon?limit=100&offset=0');
                if (response.data) {
                    setData(response.data);
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text>Ocorreu um erro: {error}</Text>;
    }

    return (
        <View>
            {data && data.results && data.results.map((item: any) => (
                <Text key={item.name}>{item.name}</Text>
            ))}
        </View>
    );
};

export default HomeScreen;

