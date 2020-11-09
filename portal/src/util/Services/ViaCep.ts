import axios from 'axios';

export const ViaCepService = {
    getAddressByCep: async (cep: string, callback: Function) => {
        const address = await axios
            .get(`https://viacep.com.br/ws/${cep.toString()}/json`)
            .then(({ data }) => data);

        if (address) {
            callback(address);
        }

        return;
    },
};
