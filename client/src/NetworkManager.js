
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
				resolve(result);
			}).catch((err) => {
				console.log(err);
				reject(err);
			});
    });
	}
}

export default NetworkManager;