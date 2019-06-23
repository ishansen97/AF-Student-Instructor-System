
export const USERNAME = "USERNAME";
export const ADMINID = "ADMINID";
export const ADMINROLE = "ADMINROLE";

class AuthenticationService {

    clearSession() {
        sessionStorage.clear();
        // this.props.history.push(`/`);
    }

    isLoggedIn()  {
        let username = sessionStorage.getItem(USERNAME);

        if (username !== null) {
            return true;
        }
        else {
            return false;
        }
    }

    setUsername(username) {
        sessionStorage.setItem(USERNAME, username);
    }

    setAdminId(adminId) {
        sessionStorage.setItem(USERNAME, adminId);
    }

    setAdminRole(adminRole) {
        sessionStorage.setItem(ADMINROLE, adminRole);
    }

    getAdminRole() {
        sessionStorage.getItem(ADMINROLE);
    }

    getUsername() {
         return sessionStorage.getItem(USERNAME);
    }

    getAdminId() {
        return sessionStorage.getItem(ADMINID);
    }

    authenticateAdmin(username, password) {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:8080/api/resources/admin-login/verify', {
                method: 'POST',
                headers: {
                    'authorization': 'Basic' + window.btoa(password),
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    "username": username
                })
            })
                .then(response => {
                    return response.json();
                })
                .then(json => {
                    resolve(json);
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    updatePassword(username, password) {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:8080/api/resources/admin-login/update-password/' + username, {
                method: 'PUT',
                headers: {
                    'authorization': 'Basic' + window.btoa(password),
                    'content-type': 'application/json'
                },

            })
                .then(response => {
                    return response.json();
                })
                .then(json => {
                    resolve(json);
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    checkAdminRole() {
        return new Promise((resolve, reject) => {
            fetch('api/resources/admin/get-admin-with-role/' + sessionStorage.getItem(USERNAME))
                .then(response => {
                    console.log('response: ' + response.json());
                    return response.json();
                })
                .then(json => {
                    console.log('json: ' + json);
                    resolve(json);
                })
                .catch(err => {
                    reject(err);
                })
        })
    }
}

export default new AuthenticationService();