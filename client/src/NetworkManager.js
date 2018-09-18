
class NetworkManager {
  static signIn() {
    return new Promise((resolve, reject) => {
			fetch(`/api/signin`, {
				method: 'POST', 
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				}
			})
			.then(res => res.json())
			.then(result => {
				if (result.err) {
					reject(result.err);
				}
				resolve(result);
			}).catch((err) => {
				console.log(err);
				reject(err);
			});
    });
	}

  static postAnswer(jwt) {
		return new Promise((resolve, reject) => {
			fetch(`https://stack-conf-jwt.herokuapp.com//api/answers`, {
				method: 'POST', 
				headers: {
					Authorization: 'Bearer ' + jwt
				}
			})
			.then(res => res.json())
			.then(payload => {
				resolve(payload);
			}).catch((err) => {
				console.log(err);
				reject(err);
			});	
		});
	}
}

export default NetworkManager;