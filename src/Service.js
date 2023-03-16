import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
    return axios.get(baseUrl);
};

const create = (newPerson) => {
    return axios.post(baseUrl, newPerson);
};

const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`);
};

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject);
};

const Service = {
    getAll,
    create,
    deletePerson,
    update
};

export default Service;