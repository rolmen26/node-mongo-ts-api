import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI as string;

const connect = async (): Promise<void> => {
    try {
        await mongoose.connect(uri, {});
        console.log('Conectado a MongoDB');
    } catch (error) {
        console.error("Se capturó un error desconocido:", error);

    }
};

const disconnect = async (): Promise<void> => {
    try {
        await mongoose.disconnect();
        console.log('Desconectado de MongoDB');
    } catch (error) {
        console.error('Error desconectando de MongoDB:', error);
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