const API_URL : string = 'https://api.github.com/repos/binary-studio-academy/stage-2-es6-for-everyone/contents/resources/api/';

function callApi(endpoind : string, method : string) : Promise<any> {
  const url : string = API_URL + endpoind;
  const options : { method : string } = {
    method
  };

  return fetch(url, options)
    .then(response =>  
      response.ok ? response.json() : Promise.reject(Error('Failed to load'))
    )
    .catch(error => {
      throw error;
    });
}

export { callApi }