import mongoose from 'mongoose';
import logger from '../utils/winston';

const uri = process.env.MONGODB_URI as string;

const connect = async (): Promise<void> => {
    try {
        await mongoose.connect(uri, {});
        logger.info('Connected to MongoDB');
    } catch (error) {
        logger.error('Error connecting to MongoDB:', error);

    }
};

const disconnect = async (): Promise<void> => {
    try {
        await mongoose.disconnect();
        logger.warn('Disconnected from MongoDB');
    } catch (error) {
        logger.error('Error disconnecting from MongoDB:', error);
    }
};

const checkConnectionStatus = (): string => {
    switch (mongoose.connection.readyState) {
        case 0:
            return 'Disconnected';
        case 1:
            return 'Connected';
        case 2:
            return 'Connecting';
        case 3:
            return 'Disconnecting';
        default:
            return 'Unkown';
    }
};

export { connect, disconnect, checkConnectionStatus };