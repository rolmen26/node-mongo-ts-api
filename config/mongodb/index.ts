import mongoose from 'mongoose';
import logger from '../../lib/utils/logger';

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


const Connection: mongoose.Connection = mongoose.connection;

export { connect, disconnect, Connection };