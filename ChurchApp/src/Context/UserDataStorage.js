import AsyncStorage from '@react-native-community/async-storage';

const key = 'userData';

const UserDataStorage = {
    async get(key) {
        try {
            const rawData = await AsyncStorage.getItem(key);
            if(!rawData) {
                throw new Error('No saved' + key);
            }
            const savedData = JSON.parse(rawData);
            return savedData;
        }
        catch (e) {
            throw new Error('Failed to load' + key);
        }
    },

    async set(key, data) {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            throw new Error('Failed to save' + key);
        }
    }

}

export default UserDataStorage;