import { request } from 'd3v4';

export const getNodeDetail = (id) => {
  return request(`http://192.168.21.247:5000/api/v1/nodes/${id}`)
    .response(function (xhr) {
      return JSON.parse(xhr.responseText);
    });
};

export const searchByKeyword = (keyword) => {
  return request(`http://192.168.21.247:5000/api/v1/search?keyword=${keyword}`)
    .response(function (xhr) {
      return JSON.parse(xhr.responseText);
    });
};
